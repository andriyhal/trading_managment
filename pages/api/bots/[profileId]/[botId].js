const { prisma } = require("../../../../prisma/db_client");

const EMPTY_ORDERS = [];

export default async function bot(req, res) {
    if(req.method === "PUT"){
        console.log(req.method, req.query)
        const updatedBotInfo = await prisma.bot.update({
            where: { id: req.query.botId},
            data: req.body,
        })

        res.status(200).json(updatedBotInfo);
    }

    if(req.method === "GET"){

        const botInfo = await prisma.bot.findFirst({
            where: { id: req.query.botId},
        })

        const botOrders = await prisma.order.findMany({
            where: { botId: req.query.botId},
        })

        res.status(200).json({botInfo, orders: botOrders});
    }
}
