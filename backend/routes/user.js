import express from 'express';
import { profileUpload } from '../middleware/profileUpload.js';

const router = express.Router();

import { signupUser, loginUser} from '../controllers/user.js';

// auth routes
router.post('/login', loginUser);

router.post('/signup', profileUpload.single('profile'), signupUser);


export default router;


