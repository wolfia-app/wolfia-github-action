import * as core from '@actions/core'
import {createComment, getLastCommitSha, getPullRequestTitle} from './octokit'
import {generateMagicLink} from './wolfia'
import * as github from '@actions/github'

const context = github.context

async function runWolfiaAction(): Promise<void> {
  try {
    const shouldCommentOnPR = core.getBooleanInput('comment-on-pr')

    if (shouldCommentOnPR && !context.payload.pull_request) {
      core.setFailed("Set comment-on-pr to false, if you want to enable wolfia github action for other workflows other than pull_request")
      return
    }

    const linkTitle = `${await getPullRequestTitle()} - ${await getLastCommitSha()}`
    const linkDescription = core.getInput('link-description')
    const binaryPath = core.getInput('binary-path')

    core.info(
      `Uploading binary from path: ${binaryPath} with title: ${linkTitle} and description: ${linkDescription}`
    )

    const magicLink = await generateMagicLink(
      linkTitle,
      linkDescription,
      binaryPath
    )

    core.info(`Wolfia magic link: ${magicLink.data.link}`)

    if (shouldCommentOnPR) {
      await createComment(
        `Try out the app with [Wolfia Magic Link](${magicLink.data.link}) ✨🔮`
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

runWolfiaAction()
