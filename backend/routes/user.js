import express from 'express';

const router = express.Router();

import { signupUser, loginUser } from '../controllers/user.js';

router.post('/login', loginUser);

router.post('/signup', signupUser);

export default router;


