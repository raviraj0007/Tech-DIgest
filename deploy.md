# 🚀 Deploy Tech-Digest to Netlify

## Quick Deploy (Recommended)

### Option 1: Drag & Drop (Easiest)
1. Run `npm run build` in your project directory
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Drag the `build` folder to the Netlify dashboard
4. Your site will be live instantly!

### Option 2: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Click "Deploy site"

## Manual Deployment Steps

### 1. Build the Project
```bash
npm install
npm run build
```

### 2. Deploy to Netlify
- Go to [Netlify](https://netlify.com)
- Sign up or log in
- Click "Add new site" → "Deploy manually"
- Drag and drop the `build` folder
- Wait for deployment to complete

### 3. Configure Custom Domain (Optional)
- In your Netlify dashboard, go to "Domain settings"
- Click "Add custom domain"
- Follow the DNS configuration instructions

## Environment Variables (If Needed)

If you need to add environment variables later:
1. Go to Site settings → Environment variables
2. Add any required variables (e.g., API keys)

## Build Settings

The project is configured with:
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18.x
- **Source Maps**: Disabled for production

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Ensure Node.js version is 16+ or 18+
- Check the build logs in Netlify dashboard

### Routing Issues
- The `_redirects` file handles React Router
- All routes redirect to `index.html` for SPA behavior

### Performance Issues
- Images are optimized with lazy loading
- Code splitting is enabled
- Source maps are disabled for smaller bundle size

## Post-Deployment

1. **Test all pages** - Navigate through your site
2. **Check mobile responsiveness** - Test on different devices
3. **Verify API calls** - Ensure news articles load properly
4. **Test forms** - Newsletter signup should work
5. **Check performance** - Use Lighthouse in browser dev tools

## Support

For issues:
- Check Netlify build logs
- Verify all files are committed to Git
- Ensure `package.json` has correct scripts
- Contact: raviraj04066@gmail.com

---

**Your Tech-Digest site is now ready for deployment! 🎉** 