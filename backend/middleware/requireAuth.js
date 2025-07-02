import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const requireAuth = async (req, res, next) => {

    const {authorization} = req.headers;

    if(!authorization) {
       return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    

    try {
        const {_id, email} =  jwt.verify(token, process.env.JWT_SECRET); // might throw an error if token is expired or invalid so put it inside try catch block
        req.user = await User.findOne({_id, email}).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }


}

export default requireAuth;