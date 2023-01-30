export default function auth(req, res) {
    if(req.body.userName === 'andrew' && req.body.password === "Solemio1969"){
        return res.status(200).json({ auth: true })
    }
    res.status(401).json({ auth: false })
}