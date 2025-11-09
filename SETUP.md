# Beach Walk Grand - Complete Setup Guide

This guide will help you set up the email backend for your Beach Walk Grand website.

## 📋 Overview

The website now has a complete email integration system that:
- Sends all form submissions to your email via GoDaddy SMTP
- Shows a nice green checkmark with success message (multilingual)
- Works with all forms: Newsletter, Brochure, Reservation, and Offers
- Backend folder is excluded from frontend deployment via `.gitignore`

## 🚀 Quick Setup Steps

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your GoDaddy email credentials:
   ```env
   PORT=3000
   EMAIL_HOST=smtpout.secureserver.net
   EMAIL_PORT=465
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASS=your-email-password
   RECIPIENT_EMAIL=your-email@yourdomain.com
   ```

### 2. GoDaddy Email Settings

Your GoDaddy email settings are:
- **SMTP Server**: `smtpout.secureserver.net`
- **Port**: `465` (SSL)
- **Username**: Your full email address
- **Password**: Your email password
- **Security**: SSL/TLS

If you need to find or reset your GoDaddy email password:
1. Log in to GoDaddy
2. Go to Email & Office → Manage
3. Click on the email account
4. Reset password if needed

### 3. Running the Backend

**Development mode** (auto-restarts on changes):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will run on `http://localhost:3000`

### 4. Frontend Configuration

The frontend is already configured! But if you need to change the API URL:

1. Edit `config.js` in the root folder
2. Change the `API_URL` to your backend URL:
   ```javascript
   const CONFIG = {
       API_URL: 'http://localhost:3000/api'  // Development
       // or
       // API_URL: 'https://your-backend-domain.com/api'  // Production
   };
   ```

## 📧 Email Endpoints

The backend has these API endpoints:

- `POST /api/newsletter` - Newsletter subscription
- `POST /api/brochure` - Brochure download request
- `POST /api/reservation` - Reservation/booking request
- `POST /api/bid` - Confidential offer submission

## ✅ Success Messages (Multilingual)

When a form is submitted successfully, users will see a green checkmark animation with the message:

- **English**: "We will get back to you within 24 hours"
- **German**: "Wir werden uns innerhalb von 24 Stunden bei Ihnen melden"
- **Italian**: "Ti risponderemo entro 24 ore"
- **French**: "Nous vous répondrons dans les 24 heures"
- **Russian**: "Мы свяжемся с вами в течение 24 часов"
- **Arabic**: "سنتواصل معك خلال 24 ساعة"

## 🔒 Security Notes

1. The `backend/` folder is in `.gitignore` and won't be pushed to your frontend hosting
2. Never commit your `.env` file
3. Use environment variables for sensitive data
4. The `.env.example` file is safe to commit (it has no real credentials)

## 🌐 Deployment

### Frontend Deployment
Your frontend can be deployed normally. The `backend/` folder will be ignored.

### Backend Deployment
You'll need to deploy the backend separately to a Node.js hosting service like:
- Heroku
- DigitalOcean
- AWS
- Vercel (with serverless functions)
- Railway

After deploying the backend:
1. Update `config.js` with your backend URL
2. Set all environment variables in your hosting platform
3. Test all forms to ensure emails are being sent

## 🧪 Testing

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Open your website in a browser

3. Test each form:
   - Newsletter subscription
   - Brochure request
   - Reservation form
   - Offer/Bid form

4. Check your email for the submissions

5. You should see the green checkmark with success message after each submission

## 📝 Email Format

All emails sent will include:
- Form data (name, email, etc.)
- Timestamp
- Clear subject line indicating the type of request

## 🐛 Troubleshooting

**Backend won't start:**
- Check if port 3000 is available
- Verify all dependencies are installed (`npm install`)
- Check `.env` file exists and has correct values

**Emails not sending:**
- Verify GoDaddy email credentials are correct
- Check spam folder
- Look at backend console for error messages
- Ensure `RECIPIENT_EMAIL` is set correctly

**Frontend shows error:**
- Check if backend server is running
- Verify `config.js` has correct API URL
- Check browser console for errors
- Ensure backend URL is accessible from frontend

**Success message not showing:**
- Check browser console for JavaScript errors
- Verify `config.js` is loaded before `script.js`
- Clear browser cache

## 📞 Support

If you encounter issues:
1. Check the backend console logs
2. Check browser console (F12)
3. Verify email credentials with GoDaddy
4. Test the API endpoints directly with Postman or curl

Example curl test:
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

You should receive a success response and an email at your configured `RECIPIENT_EMAIL`.

---

**That's it! Your email system is ready to go. 🎉**
