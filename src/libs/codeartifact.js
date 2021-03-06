const core = require('@actions/core')
const codeArtifact = require('@aws-sdk/client-codeartifact')

module.exports.getAuthToken = async ({ region, domain, domainOwner, durationSeconds }) => {
  const client = new codeArtifact.CodeartifactClient({ region })

  const authCommand = new codeArtifact.GetAuthorizationTokenCommand({
    domain,
    domainOwner,
    durationSeconds
  })

  const { authorizationToken } = await client.send(authCommand)

  if (authorizationToken === undefined) {
    throw Error('AWS CodeArtifact Authentication Failed')
  }

  core.debug(`AWS CodeArtifact Auth: ${domain}-${domainOwner} for ${durationSeconds} seconds`)

  return authorizationToken
}
