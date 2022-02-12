# Verifier API

The API for [Verifier](https://verifier.mx) project.

* [Documentation in Spanish](/docs/README_ES.md)

## Environment variables

* `API_HOST`
* `API_PORT`
* `AUTH_KEY`
* `AUTH_HEADER`

## Deploy

1. Copy the files `id_github` and `production` of the symlink `.env` to root.

2. Follow [this guide for Google Run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/nodejs), which is a simple solution for this project.

Example:

```sh
gcloud builds submit --tag gcr.io/clear-267122/verifier-production

gcloud run deploy verifier-api
  --image gcr.io/clear-267122/verifier-production
  --platform managed
  --region us-central1
  --allow-unauthenticated
```

**Pulling private repositories:**
1. Create a new SSH key: `ssh-keygen -t rsa -b 4096 -N '' -f id_github -C [github-email]`
1. Add it to [Github](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. Add the [private SSH key to the container](https://stackoverflow.com/a/24937401/1628009)
