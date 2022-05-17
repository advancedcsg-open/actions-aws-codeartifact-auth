const core = require('@actions/core')

const { getInputs, exportVariables } = require('./libs/actions')

const { getAuthToken } = require('./libs/codeartifact')

async function run () {
  try {
    const options = getInputs()

    const token = await getAuthToken(options)

    core.setSecret(token)

    exportVariables(token)
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = run

/* istanbul ignore next */
if (require.main === module) {
  run()
}
