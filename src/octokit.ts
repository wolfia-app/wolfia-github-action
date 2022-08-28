import * as core from '@actions/core'
import * as github from '@actions/github'

const githubToken = core.getInput('github-token')
const octokit = github.getOctokit(githubToken)
const context = github.context

export async function createComment(comment: string): Promise<any> {
  return octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.payload.pull_request!.number,
    body: comment
  })
}

export async function getPullRequestTitle(): Promise<string> {
  const pullRequest = await octokit.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request!.number
  })
  return pullRequest.data.title
}

export async function getLastCommitSha(): Promise<string> {
  const pullRequest = await octokit.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request!.number
  })
  return pullRequest.data.head.sha.slice(0,7)
}
