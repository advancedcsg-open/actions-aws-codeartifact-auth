const { V3 } = require('jest-aws-simple-mock')

describe('codeartifact', () => {
  afterEach(async () => {
    jest.resetAllMocks()
    jest.resetModules() // Most important - it clears the cache
  })

  it('test getAuthToken - success', async () => {
    // Setup test
    const response = {
      authorizationToken: 'this-is-a-mock-token'
    }

    V3.mockCodeartifact.send(response)

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    // Run Test
    const { getAuthToken } = require('../../../src/libs/codeartifact')
    const token = await getAuthToken(options)

    // Verify results
    expect(token).toEqual(response.authorizationToken)
  })

  it('test getAuthToken - failed', async () => {
    // Setup test
    const response = {
      authorizationToken: undefined
    }

    V3.mockCodeartifact.send(response)

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    // Run Test
    const { getAuthToken } = require('../../../src/libs/codeartifact')
    expect(async () => await getAuthToken(options)).rejects.toThrow('AWS CodeArtifact Authentication Failed')
  })

  it('test getRepositoryUrl - success', async () => {
    // Setup test
    const response = {
      repositoryEndpoint: 'this-is-a-mock-repository-endpoint'
    }

    V3.mockCodeartifact.send(response)

    const options = {
      region: 'eu-west-2',
      domain: 'mock',
      domainOwner: '012345678',
      format: 'npm',
      repository: 'mock',
      durationSeconds: '900'
    }

    // Run Test
    const { getRepositoryUrl } = require('../../../src/libs/codeartifact')
    const repositoryUrl = await getRepositoryUrl(options)

    // Verify results
    expect(repositoryUrl).toEqual(response.repositoryEndpoint)
  })
})
