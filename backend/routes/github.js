import express from 'express';

const router = express.Router();


import { updateGitHubUsername, getGithubData, getCommits  } from '../controllers/github.js';


// github routes
router.patch('/github', updateGitHubUsername);

router.get('/github', getGithubData);

router.post('/github/commits', getCommits);

export default router;
