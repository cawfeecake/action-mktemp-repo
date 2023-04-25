const crypto = require('crypto');
const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");


async function run() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = new Octokit({
    auth: token,
  });

  const owner = 'cawfeecake';

  let name = core.getInput('name');
  if (name == '') {
    const prefix = core.getInput('prefix');
    name = `${prefix}${ crypto.randomUUID() }`;
  }

  try {
    const {
      data: { name: repo, html_url: url }
    } = await octokit.rest.repos.createUsingTemplate({
      template_owner: owner,
      template_repo: 'test-repo',
      name,
    });

    core.info(`Created: ${repo}`);
    core.saveState('repo_name', repo);
    core.info(`Link: ${url}`);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
