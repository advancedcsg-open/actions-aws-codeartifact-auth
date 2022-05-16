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
      durationSeconds: '900'
    }

    const actions = require('../../src/libs/actions')
    const getInputsSpy = jest.spyOn(actions, 'getInputs').mockReturnValue(options)

    const token = 'this-is-a-mock-token'

    const codeArtifact = require('../../src/libs/codeartifact')
    const getAuthTokenSpy = jest.spyOn(codeArtifact, 'getAuthToken').mockReturnValue(token)

    // Run Test
    const action = require('../../src/main')
    await action()

    // Verify results
    expect(getInputsSpy).toHaveBeenCalled()
    expect(getInputsSpy).toHaveReturnedWith(options)
    expect(getAuthTokenSpy).toHaveBeenCalledWith(options)
    expect(getAuthTokenSpy).toHaveReturnedWith(token)

    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(1, 'NPM_TOKEN', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(2, 'TWINE_USERNAME', 'aws')
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(3, 'TWINE_PASSWORD', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(4, 'MAVEN_USERNAME', 'aws')
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(5, 'MAVEN_TOKEN', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(6, 'NUGET_AUTH_TOKEN', token)
  })

  it('test action as module execute - failed', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '39705096351',
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
