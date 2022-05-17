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
      domainOwner: '39705096351',
      durationSeconds: '900'
    }

    actionsCore.getInput
      .mockReturnValueOnce(config.region)
      .mockReturnValueOnce(config.domain)
      .mockReturnValueOnce(config.domainOwner)
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

    const token = 'this-is-a-mock-token'

    // Run Test
    const { exportVariables } = require('../../../src/libs/actions')
    exportVariables(token)

    // Verify Test
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(1, 'NPM_TOKEN', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(2, 'TWINE_USERNAME', 'aws')
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(3, 'TWINE_PASSWORD', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(4, 'MAVEN_USERNAME', 'aws')
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(5, 'MAVEN_TOKEN', token)
    expect(actionsCore.exportVariable).toHaveBeenNthCalledWith(6, 'NUGET_AUTH_TOKEN', token)
  })
})
