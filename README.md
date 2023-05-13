# bitBites Auth API

An authentication and proxy api for bitBites. After successful authentication the service routes the request to the
appropriate microservice.

## Getting started

### Prerequisites

* The service routes request to `bitBites bites api`, therefore setting up that first would make the most sense.

The following environment variables need to be configured:
* JWKS_URL - Json Web Key url, acquired from auth0
* BITES_API - The bitbites-api service url

After successful configuration run the following the command to start the development server:
```shell
npm run dev
```

### Docker

To run the dockerized version of the application check [bitbites-infra](https://github.com/sxmlet/bitbites-infra).
The docker network is external therefore it needs to be created first. Use the provided `make` command from the infra
repository.

## Deployment & CI/CD

Circle CI takes care of the automated build process. A new image is getting pushed on every tag. The git tag will be
used for the image tag as well. As part of the deployment process, the new image gets released into production.g

To build docker image locally:
```shell
TAG=mytag make build
```
To push docker images:
```shell
TAG=mytag REPO=myrepo make push
```

## Used sources

* Udacity cloud dev courses
* https://expressjs.com/
