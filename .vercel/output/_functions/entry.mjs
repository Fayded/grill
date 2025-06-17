import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_D8BEIKvb.mjs';
import { manifest } from './manifest_YQX66Kh1.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/email-newsletter.json.astro.mjs');
const _page4 = () => import('./pages/api/send-email.json.astro.mjs');
const _page5 = () => import('./pages/catering.astro.mjs');
const _page6 = () => import('./pages/location.astro.mjs');
const _page7 = () => import('./pages/menu.astro.mjs');
const _page8 = () => import('./pages/thank-you.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.8.0_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/astro@5.8.0_typescript@5.8.3/node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/email-newsletter.json.ts", _page3],
    ["src/pages/api/send-email.json.ts", _page4],
    ["src/pages/catering.astro", _page5],
    ["src/pages/location.astro", _page6],
    ["src/pages/menu.astro", _page7],
    ["src/pages/thank-you.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_astro-internal_actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "25262d46-1367-4ea8-a355-0dc532e30056",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
