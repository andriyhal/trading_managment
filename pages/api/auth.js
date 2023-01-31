const {prisma} = require("../../prisma/db_client.js");

const getUserByName = async (name) => {
    return await prisma.user.findFirst({
        where: { name },
    });
}

export default async function auth(req, res) {
    const userInfo = await getUserByName(req.body.userName);

    if (userInfo) {
        const { password, ...rest } = userInfo;

        if (req.body?.password === password) {
            return res.status(200).json({
                auth: {
                    accessToken: '12345',
                    refreshToken: '67890', // potential UX enhancement
                },
                userInfo: rest,
            })
        }
    }

    res.status(401).send();
}
