# Setting Up Your Anthropic API Key

The AI Coach feature in this program is powered by Anthropic's Claude AI. Follow these steps to get your API key.

## Step 1 — Create an Anthropic account

Go to https://console.anthropic.com and sign in or create a free account.

## Step 2 — Create an API key

1. In the left sidebar, click **"API Keys"**
2. Click **"Create Key"**
3. Give your key a name (e.g. `Job Readiness Program`)
4. Click **Create** and **copy the key immediately** — you won't be able to see it again

## Step 3 — Add the key to your project

In your project root folder, create a file called `.env`:

```
ANTHROPIC_API_KEY=sk-ant-api03-...your-key-here...
```

> **Important:** Never commit your `.env` file to GitHub. It is already listed in `.gitignore`.

## Step 4 — Verify it works

Start the app with `npm run dev` and navigate to any module page. Click the **AI Coach** button — if the AI responds, your key is working.

Alternatively, visit `/setup` in the app and use the **Test Connection** button.

## Deploying to Render

When deploying to Render, do NOT put the key in any file. Instead:

1. In your Render dashboard, open your web service
2. Go to **Environment → Environment Variables**
3. Click **Add Environment Variable**
4. Set **Key** = `ANTHROPIC_API_KEY` and **Value** = your API key
5. Click **Save Changes** — Render will redeploy automatically

## Pricing

Anthropic offers free trial credits for new accounts. For school use, the Claude claude-sonnet-4-6 model used in this app is cost-effective. Monitor usage at https://console.anthropic.com/usage.

## Troubleshooting

| Problem | Solution |
|---|---|
| "AI Coach is not set up yet" | Add your API key to `.env` and restart the server |
| "AI Coach is taking a break" | Check your API key is valid and has credits remaining |
| API calls failing in production | Verify the env var is set in Render's dashboard |
