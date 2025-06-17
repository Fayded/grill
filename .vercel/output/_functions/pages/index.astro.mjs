import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_pDgY8W89.mjs';
/* empty css                                 */
import '../chunks/index_DfOMS8cV.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D-DnBHHf.mjs';
import { $ as $$Layout } from '../chunks/Layout_DYKAH4Yp.mjs';
import { m as map } from '../chunks/map_CcVrYm_b.mjs';
export { renderers } from '../renderers.mjs';

const chicken = new Proxy({"src":"/_astro/chicken.BJccVR1a.png","width":356,"height":356,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/kevinfay/Sites/astro/grill/src/assets/chicken.png";
							}
							
							return target[name];
						}
					});

const cow = new Proxy({"src":"/_astro/cow.5Dy0uf2z.png","width":383,"height":254,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/kevinfay/Sites/astro/grill/src/assets/cow.png";
							}
							
							return target[name];
						}
					});

const pig = new Proxy({"src":"/_astro/pig.CND0jDbp.png","width":388,"height":217,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/kevinfay/Sites/astro/grill/src/assets/pig.png";
							}
							
							return target[name];
						}
					});

const building = new Proxy({"src":"/_astro/building.CPsGuI9y.png","width":268,"height":109,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/kevinfay/Sites/astro/grill/src/assets/building.png";
							}
							
							return target[name];
						}
					});

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const getRandomImage = () => {
    const images = [chicken, cow, pig];
    return images[Math.floor(Math.random() * images.length)];
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "w-full" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container grid grid-cols-24"> <section class="flex flex-col items-center justify-start my-8 col-span-22 col-start-2 md:col-span-8 md:col-start-0 border border-primary pt-10 pb-8 text-primary"> <h3 class="text-4xl mb-10">HOURS</h3> <div class="flex flex-col items-center"> <p class="font-medium">TUESDAY – SATURDAY</p> <p class="font-regular">11:00 AM – 8:00 PM</p> </div> <div class="my-8 font-extralight opacity-50">–––––––––––––––––––––</div> <div class="flex flex-col items-center"> <p class="font-medium">SUNDAY</p> <p class="font-regular">11:00 AM – 3:00 PM</p> </div> <div class="my-8 font-extralight opacity-50">–––––––––––––––––––––</div> <div class="flex flex-col items-center"> <p class="font-medium">MONDAY</p> <p class="font-regular">CLOSED</p> </div> </section> <section class="items-center justify-center flex flex-col col-span-22 col-start-2 md:col-span-8 md:col-start-0"> ${getRandomImage() === chicken ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "brightness-50 opacity-75", "src": chicken, "alt": "Chicken" })}` : getRandomImage() === cow ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "mix-blend-multiply opacity-70 w-[90%]", "src": cow, "alt": "Cow" })}` : renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "mix-blend-multiply opacity-50 w-[90%]", "src": pig, "alt": "Pig" })}`} </section> <section class="p-10 flex flex-col items-center justify-between col-span-22 col-start-2 md:col-span-8 md:col-start-0 my-8 text-primary"> <div> <h3 class="text-4xl mb-10 flex justify-between items-center">FIND US <a href="https://maps.app.goo.gl/SPYKC3gLM7L8DhgX9" target="_blank" class="block ml-6"><img${addAttribute(map.src, "src")} alt="Find Us"></a></h3> <p class="text-lg uppercase text-center leading-10">The grill is located
<br>just south west
<br>of lake jackson
</p> <img${addAttribute(building.src, "src")} alt="Building" class="w-full mt-10 opacity-90"> </div> </section> </main> ` })}`;
}, "/Users/kevinfay/Sites/astro/grill/src/pages/index.astro", void 0);

const $$file = "/Users/kevinfay/Sites/astro/grill/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
