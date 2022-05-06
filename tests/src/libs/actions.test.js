describe('actions', () => {
  afterEach(async () => {
    jest.resetAllMocks()
    jest.resetModules() // Most important - it clears the cache
  })

  it('test getInputs - success', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const config = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    actionsCore.getInput
      .mockReturnValueOnce(config.region)
      .mockReturnValueOnce(config.domain)
      .mockReturnValueOnce(config.domainOwner)
      .mockReturnValueOnce(config.format)
      .mockReturnValueOnce(config.repository)
      .mockReturnValueOnce(config.durationSeconds)

    // Run Test
    const { getInputs } = require('../../../src/libs/actions')
    const result = getInputs()

    // Verify Results
    expect(result).toMatchObject(config)
  })

  it('test exportVariables - npm success', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    const token = 'this-is-a-mock-token'
    const repositoryUrl = 'this-is-a-mock-endpoint'

    // Run Test
    const { exportVariables } = require('../../../src/libs/actions')
    exportVariables(options, { token, repositoryUrl })

    // Verify Test
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(1, 'NPM_TOKEN', token)
  })

  it('test exportVariables - pypi success', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'pypi',
      repository: 'mock',
      durationSeconds: '900'
    }

    const token = 'this-is-a-mock-token'
    const repositoryUrl = 'this-is-a-mock-endpoint'

    // Run Test
    const { exportVariables } = require('../../../src/libs/actions')
    exportVariables(options, { token, repositoryUrl })

    // Verify Test
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(1, 'TWINE_USERNAME', 'aws')
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(2, 'TWINE_PASSWORD', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(3, 'TWINE_REPOSITORY_URL', repositoryUrl)
  })

  it('test exportVariables - maven success', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'maven',
      repository: 'mock',
      durationSeconds: '900'
    }

    const token = 'this-is-a-mock-token'
    const repositoryUrl = 'this-is-a-mock-endpoint'

    // Run Test
    const { exportVariables } = require('../../../src/libs/actions')
    exportVariables(options, { token, repositoryUrl })

    // Verify Test
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(1, 'MAVEN_USERNAME', 'aws')
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(2, 'MAVEN_TOKEN', token)
  })

  it('test exportVariables - nuget success', async () => {
    // Setup test
    const actionsCore = require('@actions/core')
    jest.mock('@actions/core')

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'nuget',
      repository: 'mock',
      durationSeconds: '900'
    }

    const token = 'this-is-a-mock-token'
    const repositoryUrl = 'this-is-a-mock-endpoint'

    // Run Test
    const { exportVariables } = require('../../../src/libs/actions')
    exportVariables(options, { token, repositoryUrl })

    // Verify Test
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(1, 'NUGET_AUTH_TOKEN', token)
  })
})
