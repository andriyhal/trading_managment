const { prisma } = require("../../../../prisma/db_client");

export default async function botsByProfile(req, res) {
    if(req.method === "POST"){
        console.log(req.body)
        const result = await prisma.bot.create({
            data: req.body,
        });

        res.status(200).json(result);
    }

    const result = await prisma.bot.findMany({
        where: { profileId: req.query?.profileId }
    });

    res.status(200).json(result);

    // sample for bot creation
    // const bot = await prisma.bot.create({
    //     data: {
    //         profileId: 'e3b0d9c0-800c-4a3d-9001-e9a7a7215853',
    //         profit: '123',
    //         pair: "USDTUAH",
    //         isActive: true,
    //         isSellFirst: false,
    //         buyPrice: "39.80",
    //         sellPrice: "40.00",
    //         buyQuantity: "11"
    //     },
    // })
}
