# Wolfia-GitHub-Action v1

This generates a magic link for every commit of your PR. Also, optionally updates the PR with a comment to view the magic link.

Refer [here](https://github.com/actions/wolfia-github-action/tree/releases/) for the previous version

## Usage

See [action.yml](action.yml). 

| Key                   | Value                                                                                                                                                                               | Suggested Type | Required | Default |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|----------|---------|
| github-token          | Use github's automatically created [github token](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#example-1-passing-the-github_token-as-an-input) | secret env     | true     | N/A     |
| wolfia-api-key-id     | API Key ID for accessing the [Wolfia API](https://wolfia.com/docs/#generate-an-api-key)                                                                                             | secret env     | true     | N/A     |
| wolfia-api-key-secret | API Key Secret for accessing the [Wolfia API](https://wolfia.com/docs/#generate-an-api-key)                                                                                         | secret env     | true     | N/A     |
| binary-path           | Path to binary file to be uploaded to wolfia                                                                                                                                        | inline         | true     | N/A     |
| link-description      | Description for the magic link                                                                                                                                                      | inline         | false    | ""      |
| comment-on-pr         | Whether to comment the generated magic link on PR                                                                                                                                   | inline         | false    | true    |

Here's an [example configuration](.github/workflows/build.yml).

### Upload a binary to wolfia (on [pull request](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request), with comment)

```yaml
steps:
- uses: wolfia-app/wolfia-github-action@v1.0.1-alpha
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    wolfia-api-key-id: ${{ secrets.WOLFIA_API_KEY_ID }}
    wolfia-api-key-secret: ${{ secrets.WOLFIA_API_KEY_SECRET }}
    binary-path: path/to/artifact/binary.apk
    link-description: Custom link description
```

### Upload a binary to wolfia (on [push](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push), without comment)

```yaml
steps:
- uses: wolfia-app/wolfia-github-action@v1.0.1-alpha
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    wolfia-api-key-id: ${{ secrets.WOLFIA_API_KEY_ID }}
    wolfia-api-key-secret: ${{ secrets.WOLFIA_API_KEY_SECRET }}
    binary-path: path/to/artifact/binary.apk
    link-description: Custom link description
    comment-on-pr: false
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
