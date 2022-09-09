import * as core from '@actions/core'
import * as octokit from './octokit'
import { generateMagicLink } from './wolfia'
import * as github from '@actions/github'

const context = github.context

async function runWolfiaAction(): Promise<void> {
  try {
    const shouldCommentOnPR = core.getBooleanInput('comment-on-pr')

    if (shouldCommentOnPR && !context.payload.pull_request) {
      core.setFailed("Set comment-on-pr to false, if you want to enable wolfia github action for other workflows other than pull_request")
      return
    }

    const linkDescription = core.getInput('link-description')
    const binaryPath = core.getInput('binary-path')

    const pullRequestInfo = await octokit.getPullRequestInfo()
    const magicLink = await generateMagicLink(linkDescription, binaryPath, JSON.stringify(pullRequestInfo))

    core.info(`Wolfia magic link: ${magicLink.data.link}`)

    if (shouldCommentOnPR) {
      await octokit.createComment(
        `Try out the app with [Wolfia Magic Link](${magicLink.data.link}) ✨🔮`
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

runWolfiaAction()
