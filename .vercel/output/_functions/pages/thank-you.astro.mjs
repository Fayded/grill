import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_pDgY8W89.mjs';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_DYKAH4Yp.mjs';
export { renderers } from '../renderers.mjs';

const $$ThankYou = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "w-full" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container grid grid-cols-24"> <section class="flex flex-col items-center justify-center my-8 col-span-22 col-start-2 border border-primary pt-10 pb-8 text-primary"> <h3 class="text-4xl mb-10">THANK YOU!</h3> <p class="text-lg font-light">Your request has been received.</p> <p class="text-lg font-light">We will be in touch soon.</p> </section> </main> ` })}`;
}, "/Users/kevinfay/Sites/astro/grill/src/pages/thank-you.astro", void 0);

const $$file = "/Users/kevinfay/Sites/astro/grill/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ThankYou,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
