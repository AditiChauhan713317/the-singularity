import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// shape of your User document
export interface IUser extends Document {
    _id: string; // TS was creating a problem, it wanted _id to be a string in jwt token user._id 
  username: string;
  email: string;
  password: string;
  profileUrl?: string;
  theme: string;
  widgets: Object[];
  lastLogin: Date;
}

// shape of static methods --> TS doenst know about them
export interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
  signup(username: string, email: string, password: string, profileUrl?: string): Promise<IUser>;
}


const Schema = mongoose.Schema;

const userSchema = new Schema<IUser, IUserModel>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
    },
    theme: {
        type: String,
        default: 'dark',
    },
    widgets: {
        type: [Object],
        default: [],
    }, 
    lastLogin: {
        type: Date,
        default: Date.now
    }

},{ timestamps: true })



userSchema.statics.signup = async function (username, email, password, profileUrl) : Promise<IUser> {


    if(!email || !password || !username) {
        throw Error("All fields must be filled");
    }

    if(!validator.isEmail(email)) {
        throw Error("Enter correct email");
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("Use a strong password");
    }

    const exists = await this.findOne({email});

    if(exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({username, email, password: hash, profileUrl})

    return user;
}

userSchema.statics.login = async function (email, password) : Promise<IUser> {

    

    if(!password || !email) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error("Enter the correct email and username");
    }

    const matches = await bcrypt.compare(password, user.password);

    if(!matches) {
        throw Error("Enter correct password");
    }

    return user;

}

// exporting the model with correct types
const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;