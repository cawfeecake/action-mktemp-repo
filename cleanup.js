const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");


async function run() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({
    auth: token,
  });

  const owner = 'cawfeecake';
  const repo = core.getState('repo_name');

  try {
    const {
      status: deleteStatus,
    } = await octokit.rest.repos.delete({
      owner,
      repo,
    });
    core.info(`DELETE: ${deleteStatus}`);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
