const { prisma } = require("../../prisma/db_client");

export default async function platforms(req, res) {
    if(req.method === "POST"){
        const platformInfo = await prisma.platform.create({
            data: {
                name: req.body.name
            },
        })

        res.status(200).json(platformInfo);
    }
}