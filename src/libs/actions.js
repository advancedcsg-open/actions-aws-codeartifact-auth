const core = require('@actions/core')
module.exports.getInputs = () => {
  return {
    region: core.getInput('region', { required: true }),
    domain: core.getInput('domain', { required: true }),
    domainOwner: core.getInput('domain-owner', { required: true }),
    durationSeconds: core.getInput('duration-seconds', { required: false })
  }
}

module.exports.exportVariables = (token) => {
  core.exportVariable('NPM_TOKEN', token)
  core.exportVariable('TWINE_USERNAME', 'aws')
  core.exportVariable('TWINE_PASSWORD', token)
  core.exportVariable('MAVEN_USERNAME', 'aws')
  core.exportVariable('MAVEN_PASSWORD', token)
  core.exportVariable('NUGET_AUTH_TOKEN', token)
}
