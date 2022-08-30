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

export async function getPullRequestInfo() {
  const pullRequest = await octokit.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.payload.pull_request!.number
  });
  return {
    latestSha: pullRequest.data.head.sha.slice(0, 7),
    branchName: pullRequest.data.head.ref,
    branchUrl: pullRequest.data.html_url,
    pullRequestTitle: pullRequest.data.title,
    pullRequestCreatedAt: pullRequest.data.created_at,
    pullRequestUpdatedAt: pullRequest.data.updated_at,
    repoName: pullRequest.data.head.repo?.full_name,
    repoUrl: pullRequest.data.head.repo?.html_url,
    repoDescription: pullRequest.data.head.repo?.description,
    creatorId: pullRequest.data.user?.login,
    creatorProfileUrl: pullRequest.data.user?.html_url,
    creatorAvatarUrl: pullRequest.data.user?.avatar_url,
  }
}
