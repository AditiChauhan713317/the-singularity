import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    }, 
    profileUrl: {
        type: String,
    }, 
    githubUsername: {
        type: String,
        default: null,
    },
    widgets: {
         type: [Object],
         default: [],
    }, 
    lastLogin: {
        type: Date,
        default: Date.now,
    }, 
    theme: {
        type: String,
        default: 'dark'
    },
 

}, {timestamps: true}) // createdAt, updatedAt


// static methods for signup and login
userSchema.statics.signup = async function (username, email, password) {

    if(!username || !email || !password) {
        throw Error('All fields must be filled');
    }

    // validate email
    if(!validator.isEmail(email)) {
        throw Error('Enter valid email');
    }

    // check if password is strong
    if(!validator.isStrongPassword(password)) {
        throw Error('Use a strong password');
    }

    // check if this email is already in use (stored in db)
    const exists = await this.findOne({email});

    if(exists) {
        throw Error('Email is already in use');
    }


    // all clear

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // make a user
    const user = await this.create({username, email, password: hash});

    return user;



}


userSchema.statics.login = async function (email, password) {

    if(!email || !password) {
        throw Error('All fields must be filled');
    }

    // checl if a user with this email exists
    const  user = await this.findOne({email});

    if(!user) {
        throw Error("Enter the correct email");
    }

    // check if passwd is correct
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error("Enter the correct password");
    }

    return user;

}




const user = mongoose.model('User', userSchema);
export default user;