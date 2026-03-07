import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { userRoutes } from '../../worker/user-routes';
import { Env as BaseEnv } from '../../worker/core-utils';

interface Env extends BaseEnv {
  DISCORD_WEBHOOK_URL: string;
}

const app = new Hono<{ Bindings: Env }>();

// Middleware to check for DO binding
app.use('*', async (c, next) => {
  if (!c.env?.GlobalDurableObject) {
    console.warn('[PAGES] GlobalDurableObject binding is missing. Stateful operations will fail.');
  }
  await next();
});

// Health check
app.get('/api/health', (c) => c.json({ success: true, data: { status: 'healthy', timestamp: new Date().toISOString(), platform: 'pages', hasDO: !!c.env?.GlobalDurableObject }}));

// Get client IP
app.get('/api/client-ip', (c) => {
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
  return c.json({ success: true, data: { ip } });
});

// Submit form data to Discord (server-side to keep webhook secret)
app.post('/api/submit-form', async (c) => {
  try {
    const body = await c.req.json();
    const webhookUrl = c.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('[SERVER] DISCORD_WEBHOOK_URL not configured');
      return c.json({ success: false, error: 'Webhook not configured' }, 500);
    }

    const clientIP = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const formType = body.formType || 'General';

    const payload = {
      embeds: [{
        title: `New ${formType} Submission`,
        description: `A new form has been submitted.`,
        color: 0x5865f2,
        fields: [
          ...Object.entries(body).filter(([key]) => key !== 'formType').map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: String(value),
            inline: true
          })),
          {
            name: 'IP Address',
            value: clientIP,
            inline: true
          }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return c.json({ success: true });
  } catch (error: any) {
    console.error('[SERVER] Failed to send to Discord:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Register user routes
userRoutes(app);

// Fallback
app.notFound((c) => c.json({ success: false, error: 'Not Found' }, 404));

export const onRequest = handle(app);
