# Sveltia CMS OAuth Setup

Netlify's default auth endpoint is not working for this project. The CMS login must be switched to a dedicated OAuth endpoint via `backend.base_url`.

## Target config

Update `/src/admin/config.yml` after the OAuth endpoint is live:

```yml
backend:
  name: github
  repo: thegrandheavybold/tghb_studio
  branch: main
  base_url: https://<your-worker-url>
```

## Recommended path

Use the official Sveltia CMS Authenticator:

- Repo: `https://github.com/sveltia/sveltia-cms-auth`
- Runtime: Cloudflare Workers

## Required setup

1. Deploy `sveltia-cms-auth` to Cloudflare Workers.
2. Copy the Worker URL, for example:
   `https://sveltia-cms-auth.<subdomain>.workers.dev`
3. Create a GitHub OAuth App with:
   - Homepage URL: `https://github.com/sveltia/sveltia-cms-auth`
   - Authorization callback URL: `<WORKER_URL>/callback`
4. In the Cloudflare Worker, add these secrets / variables:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `ALLOWED_DOMAINS=tghb.studio`
5. Put the Worker URL into `/src/admin/config.yml` as `backend.base_url`.
6. Deploy the site again.

## Important

- Every editor still needs a GitHub account.
- Every editor must be invited to the GitHub repo `thegrandheavybold/tghb_studio`.
- This replaces the broken Netlify auth popup route.
