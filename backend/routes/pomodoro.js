import express from 'express';

import {logPomodoroSession, deletePomodoroSession, getSessions} from '../controllers/pomodoro.js';

const router = express.Router();

router.get('/sessions', getSessions); // ?date=YYYY-MM-DD (date is sent in query, cause a get route doesnt have a body so no req.body)

router.post('/sessions', logPomodoroSession);

router.delete('/sessions/:id', deletePomodoroSession);

export default router;