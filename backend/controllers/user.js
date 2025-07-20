import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const createToken = (_id, email) => {

    return jwt.sign({_id, email}, process.env.JWT_SECRET, {expiresIn: '3d'});


}

const signupUser = async (req, res) => {
    
    const {username, email, password, profileUrl} = req.body;

    try {
        const user = await User.signup(username, email, password, profileUrl);
        const token = createToken(user._id, email);
        res.status(200).json({
            user: {_id: user._id, 
                username: user.username, 
                email: user.email, 
                theme: user.theme, 
                widgets: user.widgets, 
                lastLogin: user.lastLogin,
                profileUrl: user.profileUrl,
                githubUsername: user.githubUsername
            }, 
            token}); 
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }


}

const loginUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, email);
        res.status(200).json({
            user: {_id: user._id, 
                username: user.username, 
                email: user.email, 
                theme: user.theme, 
                widgets: user.widgets, 
                lastLogin: user.lastLogin,
                profileUrl: user.profileUrl,
                githubUsername: user.githubUsername
            }, 
            token}); 
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }

}





export {signupUser, loginUser};