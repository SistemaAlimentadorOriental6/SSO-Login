// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://022a5c57db30132aead96c0e0cd9c284@o4509238414278656.ingest.us.sentry.io/4509567291555840",

  // Integrations for browser tracing
  integrations: [Sentry.browserTracingIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Define tracePropagationTargets to get around possible Browser CORS issues
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
}); 