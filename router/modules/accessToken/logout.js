const jwt = require('jsonwebtoken');
const redisToken = require('../../../redisClass/redisToken');
const {
    decode
} = require('../../../service/encodeForToken');
exports.logout = async (req, res) => {
    let cookie = req.cookies._srf;
    if (cookie == null) {
        res.clearCookie("_srf", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 1000,
        });
        return res.status(401).json({
            message: "You are not authorised please login.",
            status: 401
        })
    } else {
        const decodedToken = jwt.decode(cookie);
        if (decodedToken == null) {
            res.clearCookie("_srf", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 1000,
            });
            return res.status(401).json({
                message: "You are not authorised please login.",
                status: 401
            })
        } else {
            let tokenId = decodedToken.tokenID;
            await redisToken.delete(tokenId);
            
                res.clearCookie("_srf", {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    path: "/",
                    maxAge: 60 * 60 * 1000,
                });
                return res.status(200).json({
                    message: "Logout confirmed.",
                    status: 200,
                     })
            

        }




    }

}