import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; 

const createToken = (_id: string, email: string) => {
    return jwt.sign({_id, email}, process.env.JWT_SECRET!, {expiresIn: '3d'});
}

export const loginUser = async (req: Request, res: Response) => {


    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, user.email);
        res.status(200).json({email, token});

    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

export const signupUser = async (req: Request, res: Response) => {

    const {username, email, password, profileUrl} = req.body;

    try {
        const user = await User.signup(username, email, password, profileUrl);
        const token = createToken(user.id, user.email);
        res.status(200).json({email, token});

    } catch (error: any) {
        res.status(400).json({error: error.message});
    }

}

