import { prisma } from "../../../../prisma/db_client";

export default async function ordersByBot(req, res) {
    const result = await prisma.order.findMany({
        where: { botId: req.query?.botId }
    });

    res.status(200).json(result);
}
