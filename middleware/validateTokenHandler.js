const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('Unauthorized user');
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401);
            throw new Error("Token not found or unathorized user.")
        }
    }
});

module.exports = validateToken;