
# Immersive Kathak Portfolio Website

This is a code bundle for Immersive Kathak Portfolio Website. The original project is available at https://www.figma.com/design/UQj8dhONGkjOAzb0z3oznf/Immersive-Kathak-Portfolio-Website.

## Running locally

Install dependencies with `pnpm install`, then start the development server with `pnpm dev`.

## Deploying to Vercel

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the project root as the repository root. Vercel uses `vercel.json` to run `pnpm run build` and publish the `dist` directory.
4. If using the registration and contact forms, add `VITE_GOOGLE_SHEETS_WEBHOOK_URL` in the Vercel project's **Settings → Environment Variables**. Set it to the deployed Google Apps Script web app URL, and enable it for each environment you deploy (Production, Preview, and/or Development).
5. Deploy the project. After changing environment variables, redeploy for the changes to take effect.

The webhook URL is included in the client-side build because it uses the `VITE_` prefix. Do not put secrets in this variable.
  