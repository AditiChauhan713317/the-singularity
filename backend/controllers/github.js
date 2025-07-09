import User from '../models/user.js';

// PATCH /api/user/github
const updateGitHubUsername = async (req, res) => {
  const userId = req.user._id;
  const { githubUsername } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { githubUsername },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save GitHub username' });
  }
};

const getGithubData = async (req, res) => {

    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({error: 'No such user'});
        }
        if(!user.githubUsername) {
            console.log(user.githubUsername);
            return res.status(400).json({error: 'Github username not linked'});
        }
        console.log("github username", user.githubUsername);
        const githubResponse = await fetch( `https://api.github.com/users/${user.githubUsername}/repos?sort=updated&per_page=5`)
        
        if (!githubResponse.ok) {
            return res.status(githubResponse.status).json({ error: 'Failed to fetch repos from GitHub' });
        }

        const data = await githubResponse.json();

        if (data.length === 0) {
            return res.status(200).json({ message: 'No repositories found' });
        }   

        const repoData = data.map(repo => ({
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
        }));


        res.status(200).json(repoData);

    } catch (error) {
        res.status(404).json({ error: 'Failed to fetch GitHub data' });
    }

}


const getCommits = async(req, res) => {

    const {repo} = req.body;

   const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({error: 'No such user'});
        }
        if(!user.githubUsername) {
            return res.status(400).json({error: 'Github username not linked'});
        }


        const githubResponse = await fetch(`https://api.github.com/repos/${user.githubUsername}/${repo}/commits?per_page=10`);
        
        if (!githubResponse.ok) {
            return res.status(githubResponse.status).json({ error: 'Failed to fetch commits from GitHub' });
        }
        
        const commits = await githubResponse.json();

        const result = commits.map(commit => ({
            message: commit.commit.message,
            author: commit.commit.author.name,
            url: commit.html_url,
            date: commit.commit.author.date
        }));

        res.status(200).json(result);

    } catch (error) {
        res.status(404).json({ error: 'Failed to fetch GitHub data' });
    }
}

export { updateGitHubUsername, getGithubData, getCommits };