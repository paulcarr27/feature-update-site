# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)

## Talli September 2026 edition

This checkout publishes tallipos.com (Sites project in `.openai/hosting.json`). The separate `talli-website-motion` checkout is a companion concept, not this domain's source.

The September 23 content update preserves the five-feature layout, orbit hero, original social image, progress navigation, heading animations, expandable previews, and contact links. Five chapters cover Overwatch chat, Quick Pay/change orders, subscription packages, embedded invoice checkout, and QSR improvements. QuickBooks Online is explicitly labeled a sandbox preview, not a live-business release. No native app version or new store release is claimed.

Content sources in the parent product: `docs/overwatch-chat-v1.md`, `docs/subscription-packages.md`, `docs/billing-follow-through-2026-09-09.md`, `docs/quickbooks-integration-plan.md`, and September production invoice-checkout/Overwatch and QSR/Quick Pay commits. Merchant-specific accounting repairs are not advertised as general features.

The five feature images are actual browser screenshots captured September 23 from current app components running locally with in-memory sample data. They replace the original SVG illustrations. No UI was redrawn and no live customer data was used. Source components: `src/components/overwatch/OverwatchChat.js`, `src/components/subscriptions/PackageWorkspace.js`, `src/minimalpos/QuickPayScreen.js`, `src/minimalpos/QsrTerminal.js`, and the real invoice payment renderer via `functions/tools/serve-invoice-checkout-test.cjs`. The local capture harness is `outputs/september-app-captures/` in the parent app. Service hooks use sample fixtures; network access is blocked. Unused native-only device integrations are stubbed for browser capture; the displayed screen components and styles are imported unchanged. Quick Pay was captured in a 430 × 932 iframe for its phone layout. All five JPEGs are unedited screenshots. Captions identify sample data. No messages, customer emails, or payments were sent.

Validation: production build; ESLint (no errors, two existing image-element warnings); responsive browser checks at 1440, 1024, and 390 pixels, including all five lightboxes and Escape dismissal. The repository's old `tests/rendered-html.test.mjs` still targets the discarded starter loading skeleton, not this site. Whole-project TypeScript checking has pre-existing missing Cloudflare worker type declarations in `db/index.ts` and `worker/index.ts`.
