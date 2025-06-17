import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_pDgY8W89.mjs';
import { $ as $$Layout } from '../chunks/Layout_DYKAH4Yp.mjs';
import { m as map } from '../chunks/map_CcVrYm_b.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Location = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Location;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <section class="container grid grid-cols-24 py-10"> <div class="col-span-24 text-4xl uppercase col-start-2 items-center justify-start"> <h3 class="flex items-center">Location <a href="https://maps.app.goo.gl/SPYKC3gLM7L8DhgX9"><img class="ml-4"${addAttribute(map.src, "src")} alt="map"></a></h3> <p class="text-lg mt-2">751 U.S. Hwy 27 S, Sebring, FL 33870</p> </div> </section> <section class="pb-10"> <div class="container mt-8 grid grid-cols-24"> <iframe class="w-full h-[500px] sm:h-[600px] col-span-24" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.123456789012!2d-81.50000000000001!3d27.500000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88ddc12345678901%3A0x1234567890123456!2s751%20US%20Hwy%2027%20S%2C%20Sebring%2C%20FL%2033870%2C%20USA!5e0!3m2!1sen!2sin!4v1612345678901" allowfullscreen="" loading="lazy"></iframe> </div> </section> </main> ` })}`;
}, "/Users/kevinfay/Sites/astro/grill/src/pages/location.astro", void 0);

const $$file = "/Users/kevinfay/Sites/astro/grill/src/pages/location.astro";
const $$url = "/location";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Location,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
