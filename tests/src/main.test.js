describe('test runs', () => {
  jest.setTimeout(10000)

  afterEach(async () => {
    jest.resetAllMocks()
    jest.resetModules() // Most important - it clears the cache
  })

  it('test action as module execute - success', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '39705096351',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    const actions = require('../../src/libs/actions')
    const getInputsSpy = jest.spyOn(actions, 'getInputs').mockReturnValue(options)

    const token = 'this-is-a-mock-token'
    const repositoryUrl = 'this-is-a-mock-endpoint'

    const codeArtifact = require('../../src/libs/codeartifact')
    const getAuthTokenSpy = jest.spyOn(codeArtifact, 'getAuthToken').mockReturnValue(token)
    const getRepositoryUrlSpy = jest.spyOn(codeArtifact, 'getRepositoryUrl').mockReturnValue(repositoryUrl)

    // Run Test
    const action = require('../../src/main')
    await action()

    // Verify results
    expect(getInputsSpy).toHaveBeenCalled()
    expect(getInputsSpy).toHaveReturnedWith(options)
    expect(getAuthTokenSpy).toHaveBeenCalledWith(options)
    expect(getRepositoryUrlSpy).toHaveBeenCalledWith(options)
    expect(getAuthTokenSpy).toHaveReturnedWith(token)
    expect(getRepositoryUrlSpy).toHaveReturnedWith(repositoryUrl)

    expect(actionsCore.exportVariable).toHaveBeenCalledWith('NPM_TOKEN', token)
  })

  it('test action as module execute - failed', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '39705096351',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    const actions = require('../../src/libs/actions')
    const getInputsSpy = jest.spyOn(actions, 'getInputs').mockReturnValue(options)

    const codeArtifact = require('../../src/libs/codeartifact')
    const getAuthTokenSpy = jest.spyOn(codeArtifact, 'getAuthToken').mockImplementation(() => {
      throw new Error('AWS CodeArtifact Authentication Failed')
    })

    // Run Test
    const action = require('../../src/main')
    await action()

    // Verify Results
    expect(getInputsSpy).toHaveBeenCalled()
    expect(getInputsSpy).toHaveReturnedWith(options)

    expect(getAuthTokenSpy).toHaveBeenCalledWith(options)

    expect(actionsCore.setFailed).toHaveBeenCalledWith('AWS CodeArtifact Authentication Failed')
  })
})
