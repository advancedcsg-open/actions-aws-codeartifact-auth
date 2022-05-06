const core = require('@actions/core')
module.exports.getInputs = () => {
  return {
    region: core.getInput('region', { required: true }),
    domain: core.getInput('domain', { required: true }),
    domainOwner: core.getInput('domain-owner', { required: true }),
    format: core.getInput('format', { required: true }),
    repository: core.getInput('format', { required: true }),
    durationSeconds: core.getInput('duration-seconds', { required: false })
  }
}

module.exports.exportVariables = (options, { token, repositoryUrl }) => {
  switch (options.format) {
    case 'npm':
      core.exportVariable('NPM_TOKEN', token)
      break
    case 'pypi':
      core.exportVariable('TWINE_USERNAME', 'aws')
      core.exportVariable('TWINE_PASSWORD', token)
      core.exportVariable('TWINE_REPOSITORY_URL', repositoryUrl)
      break
    case 'maven':
      core.exportVariable('MAVEN_USERNAME', 'aws')
      core.exportVariable('MAVEN_TOKEN', token)
      break
    case 'nuget':
      core.exportVariable('NUGET_AUTH_TOKEN', token)
      break
  }
}
