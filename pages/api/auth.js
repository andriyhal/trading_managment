const {prisma} = require("../../prisma/db_client.js");

const getUserByName = async (name = "andrew") => {
    const userInfo = await prisma.user.findFirst({
        where: { name },
    })

    return userInfo;
}

export default async function auth(req, res) {
    const userInfo = await getUserByName(req.body.userName)

    if(req.body.userName === userInfo.name && req.body.password === userInfo.password){
        return res.status(200).json({ auth: true, userInfo })
    }
    res.status(401).json({ auth: false })
}

getUserByName("andrew").then(info => console.log(info))