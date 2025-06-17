import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_pDgY8W89.mjs';
import { $ as $$Layout } from '../chunks/Layout_DYKAH4Yp.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const blue = new Proxy({"src":"/_astro/blue-marlin.D1IkA-YU.png","width":308,"height":747,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/kevinfay/Sites/astro/grill/src/assets/blue-marlin.png";
							}
							
							return target[name];
						}
					});

const food = new Proxy({"src":"/_astro/aboutUs-food.vd0oiwh1.jpg","width":396,"height":301,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/kevinfay/Sites/astro/grill/src/assets/aboutUs-food.jpg";
							}
							
							return target[name];
						}
					});

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "w-full" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="text-base font-inter font-regular"> <section class="my-8 col-span-24 text-[#E9D8BF] items-center justify-center text-center px-4 sm:pl-0"> <h3 class="text-4xl mb-2 uppercase leading-13">Where Great Food <br>Meets Great People.</h3> </section> <section class="py-1 bg-[#E9D8BF] text-[#273E5B] mb-20 px-4 sm:pl-0"> <div class="container sm:grid sm:grid-cols-24"> <div class="sm:col-span-24 text-3xl uppercase items-center justify-start mt-10 mb-4"> <h3 class="leading-10">Welcome to the Grill <i class="ml-5 border-l h-9 border-blue"></i><span class="ml-10 text-xl">at Lake Jackson</span></h3> </div> <div class="col-span-24 sm:col-span-8 col-start-2 items-center justify-start"> <p class="tracking-normal text-lg mt-6 leading-7 first-letter:font-stint first-letter:leading-none first-letter:text-3xl first-letter:pr-1">At The Grill at Lake Jackson, we believe a great dining experience is about more than just delicious food (though we've got plenty of that!). It's about community, consistency, and feeling right at home the moment you walk through our doors.</p> <img class="w-full my-6"${addAttribute(food.src, "src")} alt="Food"> <p class="text-lg mt-6 leading-7 text-w tracking-wide first-letter:font-stint first-letter:leading-none first-letter:text-3xl first-letter:pr-1">Our goal is simple: to be your go-to spot for full-service casual dining — the place you think of first for a great meal, generous portions, and a warm welcome. Whether it's a weeknight dinner, a weekend lunch, or a special celebration, we're here to make every visit a memorable one.</p> </div> <div class="col-span-24 sm:col-span-8 items-center justify-center m-auto"> <img class="hidden sm:block my-10"${addAttribute(blue.src, "src")} alt="Food"> </div> <div class="col-span-24 sm:col-span-8 items-center justify-start"> <p class="tracking-normal text-lg mt-6 leading-7 first-letter:font-stint first-letter:leading-none first-letter:text-3xl">We run our restaurant with a straightforward approach: experienced management, a knowledgeable and friendly staff, and an easy-going vibe that makes you feel like part of the family. Add in fair prices and a comfortable setting, and you've got a recipe for a great time — every time.</p> <h4 class="text-base mt-6 uppercase font-medium">Our Philosophy –</h4> <h4 class="text-xl mt-2 uppercase leading-7">Keep it Simple.
<br>Keep it Good.
<br>Keep it Consistent.</h4> <p class="text-lg mt-6 leading-7 tracking-normal first-letter:font-stint first-letter:leading-none first-letter:text-3xl first-letter:pr-1">We're proud to be part of the Sebring community, and we hope you'll think of us not just as a restaurant, but as your neighborhood gathering place. So come hungry, bring your people, and see why The Grill at Lake Jackson is quickly becoming a local favorite.</p> <h4 class="text-base mt-6 uppercase font-medium">We cannot wait to <br> Serve you</h4> </div> </div></section> </main> ` })}`;
}, "/Users/kevinfay/Sites/astro/grill/src/pages/about.astro", void 0);

const $$file = "/Users/kevinfay/Sites/astro/grill/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
