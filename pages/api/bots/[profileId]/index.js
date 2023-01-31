const { prisma } = require("../../../../prisma/db_client");

// http://localhost:3000/api/bots/55e48f5f-25eb-4c77-abfc-8032da81ba80
export default async function botsByProfile(req, res) {
    const result = await prisma.profile.findMany({
        where: { id: req.query?.profileId }
    });

    res.status(200).json(result);

    // sample for bot creation
    // const bot = await prisma.bot.create({
    //     data: {
    //         profileId: '55e48f5f-25eb-4c77-abfc-8032da81ba80',
    //         profit: '123',
    //         pair: "String",
    //     },
    // })
}
