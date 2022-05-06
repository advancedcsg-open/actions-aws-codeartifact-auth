const core = require('@actions/core')

const { getInputs, exportVariables } = require('./libs/actions')

const { getAuthToken, getRepositoryUrl } = require('./libs/codeartifact')

async function run () {
  try {
    const options = getInputs()

    const token = await getAuthToken(options)
    const repositoryUrl = await getRepositoryUrl(options)

    core.setSecret(token)
    core.setSecret(repositoryUrl)

    exportVariables(options, { token, repositoryUrl })
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = run

/* istanbul ignore next */
if (require.main === module) {
  run()
}
