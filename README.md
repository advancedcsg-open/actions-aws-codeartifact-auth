# AWS CodeArtifact Auth
<p align="center">
  <a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"></a>
  <a href="https://github.com/advancedcsg-open/actions-aws-codeartifact-auth/actions"><img alt="javscript-action status" src="https://github.com/advancedcsg-open/actions-aws-codeartifact-auth/workflows/units-test/badge.svg"></a>
<a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fadvancedcsg-open%2Factions-aws-codeartifact-auth?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fadvancedcsg-open%2Factions-aws-codeartifact-auth.svg?type=shield"/></a>
  <a href="https://sonarcloud.io/dashboard?id=advancedcsg-open_actions-aws-codeartifact-auth"><img alt="Quality Gate Status" src="https://sonarcloud.io/api/project_badges/measure?project=advancedcsg-open_actions-aws-codeartifact-auth&metric=alert_status"></a>
</p>

---

Used to authorize with AWS CodeArtifact in order to publish packages.

## Usage

### Pre-requisites
---
Requires `aws-actions/configure-aws-credentials` to have been ran first with an appropriate role that can access CodeArtifact.

### Inputs

#### `region`

The AWS region.

#### `domain`

The name of the domain that is in scope for the generated authorization token.

#### `domain-owner`

The 12-digit account number of the AWS account that owns the domain. It does not include dashes or spaces.

#### `duration`

The time, in seconds, that the generated authorization token is valid. Valid values are 0 and any number between 900 (15 minutes) and 43200 (12 hours). A value of 0 will set the expiration of the authorization token to the same expiration of the user's role's temporary credentials. Defaults to 0.

### Exported Variables

The action will export the following variables. These can then be used in conjunction with the package managers to publish artifacts.

#### NPM

| Name                 | Description              |
|----------------------|--------------------------|
| NPM_TOKEN            | The authentication token |

#### PYPI

| Name                 | Description                               |
|----------------------|-------------------------------------------|
| TWINE_USERNAME       | The authentication username. Set as `aws` |
| TWINE_PASSWORD       | The authentication token                  |

#### Maven

| Name                 | Description                               |
|----------------------|-------------------------------------------|
| MAVEN_USERNAME       | The authentication username. Set as `aws` |
| MAVEN_PASSWORD          | The authentication token                  |

#### Nuget

| Name                 | Description                               |
|----------------------|-------------------------------------------|
| NUGET_AUTH_TOKEN     | The authentication token                  |

### Example
---
```yaml
# .github/workflows/aws-codeartifact-auth.yml
name: AWS CodeArtifact Auth
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: ${{ secrets.AWS_REGION }}
      - name: AWS CodeArtifact Auth
        uses: advancedcsg-open/actions-aws-codeartifact-auth
        with:
          region: ${{ secrets.AWS_REGION }}
          domain: ${{ secrets.AWS_CODEARTIFACT_DOMAIN }}
          domain-owner: ${{ secrets.AWS_CODEARTIFACT_DOMAIN_OWNER }}
      - name: Publish npm
        run: |
          npm publish
```

### License

actions-aws-codeartifact-auth is licensed under the MIT License. See the LICENSE file for more info.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fadvancedcsg-open%2Factions-aws-codeartifact-auth.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fadvancedcsg-open%2Factions-aws-codeartifact-auth?ref=badge_large)