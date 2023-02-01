const { prisma } = require("../../../prisma/db_client");

const DEFAULT_USER_ID = "72a9d92c-95e3-466b-ba2e-0f3584c334bd";

export default async function index(req, res) {
    if(req.method === "POST"){
        const profileInfo = await prisma.profile.create({
            data: {
                apiKey: req.body.apiKey,
                secretKey: req.body.secretKey,
                platformId: req.body.platformId,
                profileName: req.body.profileName,
                userId: DEFAULT_USER_ID
            },
        })

        res.status(200).json(profileInfo);
    }

    const result = await prisma.profile.findMany({
        where: { userId: DEFAULT_USER_ID }
    });

    res.status(200).json(result.map(item => ({
        name: item.profileName,
        id: item.id,
        platformId: item.platformId
    })));
}