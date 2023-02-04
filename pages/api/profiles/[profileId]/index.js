const {Spot} =  require("@binance/connector");

const { prisma } = require("../../../../prisma/db_client");
import {PLATFORMS} from "../../../../constants";

export default async function profile(req, res) {
    const profileInfo = await prisma.profile.findFirst({
        where: {id: req.query?.profileId}
    });

    let balance, balanceErrorMessage = null;

    if (PLATFORMS[profileInfo?.platformId] === "binance") {
        const client = new Spot(profileInfo?.apiKey, profileInfo?.secretKey)

        try {
            const acc = await client.account();
            balance = acc.data.balances
                .filter(({free}) => +free !== 0)
                .map(({asset, free}) => ({coin: asset, free}))

            // const coins = await client.coinInfo();
            // balance = coins.data.filter(({free}) => free !== "0")
        } catch (error) {
            balanceErrorMessage = error?.response?.data?.msg || error.message;
        }
    }

    // if(PLATFORMS[profileInfo?.platformId] === "whitebit") {
    //     // TODO: will implement the same for whitebit. Maybe some mapping
    // }


    res.status(200).json({
        apiKey: profileInfo?.apiKey.slice(-6),
        platformId: profileInfo?.platformId,
        profileName: profileInfo?.profileName,
        balance,
        balanceErrorMessage,
    });
}
