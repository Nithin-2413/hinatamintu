# Deploying to Vercel

1) Set env vars in Vercel:
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_USER, GMAIL_FROM_NAME
- GMAIL_REDIRECT_URI_PROD=https://YOUR_VERCEL_DOMAIN.vercel.app/api/google_auth_callback
- GMAIL_REFRESH_TOKEN (after OAuth below)

2) OAuth to get refresh token
- Visit `https://YOUR_VERCEL_DOMAIN.vercel.app/api/auth_google`
- Approve as `thewrittenhug@gmail.com`
- After redirect, copy refresh_token from Vercel logs and set `GMAIL_REFRESH_TOKEN`

3) DB migrations
Run the SQL in README.md under "Database migrations" in Supabase SQL editor.

4) Test endpoints
- POST /api/submitHug
- GET /api/getHugs
- GET /api/getConversation?hugid=... 
- POST /api/sendReply
- GET /api/pollGmail (trigger sync)
# Deploy to Vercel

Your application is now Vercel-compatible! Follow these steps to deploy:

## 1. Deploy to Vercel

1. **Push to GitHub/GitLab**:
   - Create a new repository on GitHub
   - Push your code: `git add . && git commit -m "Deploy to Vercel" && git push`

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the configuration

## 2. Configure Environment Variables

In your Vercel dashboard, add these environment variables:

### Required Secrets:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
MAILJET_API_KEY=your_mailjet_key
MAILJET_API_SECRET=your_mailjet_secret
ADMIN_EMAIL=onaamikasadguru@gmail.com
ADMIN_FROM_EMAIL=your_verified_sender_email
MAILJET_TEMPLATE_ID_SUBMISSION=7221431
MAILJET_TEMPLATE_ID_REPLY=7221146
```

## 3. What Changed

✅ **No Functionality Changes**: Your app works exactly the same
✅ **Same Features**: Form submissions, admin system, email notifications
✅ **Same Database**: Still uses Supabase
✅ **Same Admin**: Login with SonuHoney/Chipmunk@15#

### Technical Changes:
- Converted Express routes to Vercel serverless functions
- Added `vercel.json` configuration
- Created `/api/` folder with serverless functions
- Frontend builds to static files

## 4. Testing

After deployment:
1. Visit your Vercel URL
2. Submit a form (you should receive email)
3. Access admin portal from footer
4. Login and manage conversations

## 5. Custom Domain (Optional)

In Vercel dashboard:
- Go to Domains tab
- Add your custom domain
- Follow DNS configuration steps

Your app will be live at: `https://your-project-name.vercel.app`