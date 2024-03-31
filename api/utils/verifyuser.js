import jwt from 'jsonwebtoken';
import { errorMsg }  from './errorMsg.js';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorMsg(401, 'Unauthorized, No token'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return next(errorMsg(401, 'Unauthorized, Invalid token'));
        }   

        req.user = user;
        next();
    });
};