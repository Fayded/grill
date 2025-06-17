import { c as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_pDgY8W89.mjs';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_DYKAH4Yp.mjs';
export { renderers } from '../renderers.mjs';

const cateringMenu = "/_astro/catering-menu.Ciac8S1m.pdf";

const $$Catering = createComponent(async ($$result, $$props, $$slots) => {
  const menu = [
    {
      course: "Complete Packages",
      additionalInfo: [
        { name: "One-Meat, Two Side-Items Meal Package" },
        { name: "Two-Meats, Two Side-Items Meal Package" },
        { name: "Three-Meats, Two Side-Items Meal Package" },
        { name: "\xBD Rack of Baby-Back Ribs, Two Side-Items Meal Package" },
        { name: "Full Rack of Baby-Back Ribs, Two Side-Items Meal Package" },
        { name: "\xBD Rack Combo, Two Side-Items Meal Package" },
        {
          name: "All packages include a choice of two side-items and a choice of bread. All meals are served with BBQ sauce on the side.",
          disclaimer: true
        }
      ]
    },
    {
      course: "Meat Choices:",
      additionalInfo: [
        { name: "Pork, Chicken, Turkey, Beef or Sausage" }
      ]
    },
    {
      course: "Side-Item Choices:",
      items: [
        { name: "Baked Beans" },
        { name: "Lima Beans" },
        { name: "Green Beans" },
        { name: "Coleslaw" },
        { name: "Black-eyed Peas" },
        { name: "New Potatoes" },
        { name: "Roasted Corn Salad" },
        { name: "Collard Greens" },
        { name: "Macaroni & Cheese" }
      ],
      additionalInfo: [
        { name: "Add a 3rd Side-Item" },
        { name: "Substitute Sweet Potato or Baked Potato" },
        { name: "Drinks: Sweetened or Unsweetened Tea, includes cups and ice." }
      ]
    },
    {
      course: "Delivery Available",
      additionalInfo: [
        { name: "Delivery fees apply" },
        { name: "Subject to Restrictions" }
      ]
    },
    {
      course: "Set Up & Serve",
      additionalInfo: [
        { name: "Service charge for this service to be negotiated by management" }
      ]
    },
    {
      course: "ALA CARTE",
      additionalInfo: [
        { name: "PORK (pound) (1/2 pound)" },
        { name: "BEEF (pound) (1/2 pound)" },
        { name: "TURKEY (pound) (1/2 pound)" },
        { name: "CHICKEN (whole) (half) (single grilled chicken breast)" },
        { name: "RIBS (full) (half)" },
        { name: "COLESLAW (gallon) (quart) (pint)" },
        { name: "BAKED BEANS (gallon) (quart) (pint)" },
        { name: "DAILY VEGGIE (gallon) (quart) (pint)" },
        { name: "BBQ SAUCE (gallon) (quart) (pint squeeze bottle)" },
        { name: "SALAD DRESSING (squeeze bottle)" },
        { name: "TEA" }
      ]
    },
    {
      course: "Large Salad Pans Each Pan",
      additionalInfo: [
        { name: "Serves 15-20 People" }
      ]
    },
    {
      course: "Salad Pans (each)",
      items: [
        { name: "Feta Chicken" },
        { name: "Oriental Chicken" }
      ]
    },
    {
      course: "Salad Pans (each)",
      items: [
        { name: "House Salad" }
      ]
    },
    {
      course: "Half Pan Of Any The Grill Salad",
      additionalInfo: [
        { name: "(all salads come with the salad dressing of your choice)" }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "w-full" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <section class="container grid grid-cols-24 py-10"> <div class="col-span-22 col-start-2 lg:col-span-8 lg:col-start-2 text-4xl uppercase items-center justify-start mb-4"> <h3>Catering</h3> </div> <div class="col-start-2 col-span-22 lg:col-span-8 lg:col-start-16 flex flex-row items-center justify-between lg:justify-end lg:gap-4"> <a${addAttribute(cateringMenu, "href")} target="_blank" class="catering-link border border-primary lg:border-0 col-span-6 lg:col-span-6 text-nowrap font-normal uppercase px-[28px] py-[16px] leading-none hover:bg-primary hover:text-[#273E5B] flex items-center mt-4 lg:mt-0">Menu
<svg class="ml-4" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.794922 17.5H0.793945V17.499L8.43945 9.85352L0.794922 17.5ZM0.794922 0.500977L9.29297 9L8.4541 9.83789L8.46094 9.83105C8.58831 9.68679 8.73558 9.44496 8.78027 9.14941C8.82287 8.86761 8.76835 8.54897 8.5459 8.26562L8.43945 8.14648L0.793945 0.500977H0.794922Z"></path> </svg> </a> <a href="#" id="orderNow" class="catering-link border border-primary lg:border-0 col-span-6 lg:col-span-6 text-nowrap font-normal uppercase px-[28px] py-[16px] leading-none hover:bg-primary hover:text-[#273E5B] flex items-center mt-4 lg:mt-0">Order Now
<svg class="ml-4" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.794922 17.5H0.793945V17.499L8.43945 9.85352L0.794922 17.5ZM0.794922 0.500977L9.29297 9L8.4541 9.83789L8.46094 9.83105C8.58831 9.68679 8.73558 9.44496 8.78027 9.14941C8.82287 8.86761 8.76835 8.54897 8.5459 8.26562L8.43945 8.14648L0.793945 0.500977H0.794922Z"></path> </svg> </a> </div> </section> <form method="POST" action="/api/send-email.json" enctype="application/x-www-form-urlencoded" class="container mt-8 pb-10 grid grid-cols-24 catering-form transition-all transition-discrete hidden"> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4"> <label class="text-base uppercase" for="name">Name:</label> <input type="text" id="name" name="name" required class="bg-primary w-full p-4 mt-2 outline-none text-primary-blue font-medium uppercase"> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-14 mt-4"> <label class="text-base uppercase" for="address">Event Address:</label> <input type="text" id="address" name="address" required class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4"> <label class="text-base uppercase" for="email">Email:</label> <input type="email" id="email" name="email" required class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-14 col-start-2 lg:col-span-6 lg:col-start-14 mt-4"> <label class="text-base uppercase" for="city">City:</label> <input type="text" id="city" name="city" required class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-6 col-start-18 lg:col-span-3 lg:col-start-21 mt-4"> <label class="text-base uppercase" for="zip">Zip:</label> <input type="text" id="zip" name="zip" required class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-22 col-start-2 lg:col-span-6 lg:col-start-2 xl:col-start-0 mt-4"> <label class="text-base uppercase text-primary" for="date">Event Date:</label> <input type="date" id="date" name="date" class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-22 col-start-2 lg:col-span-3 lg:col-start-9 xl:col-start-9 mt-4"> <label class="text-base uppercase" for="time">Event Time:</label> <input type="time" id="time" name="time" class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase fill-red-500"> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-14 mt-4"> <label class="text-base uppercase" for="phone">Phone Number:</label> <input type="text" id="phone" name="phone" required minlength="6" class="w-full p-4  mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4"> <label class="text-base uppercase" for="people">Number of People:</label> <input type="number" id="people" name="people" required class="w-full p-4  mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-14 mt-4"> <label class="text-base uppercase" for="service">Service Type:</label> <select id="service" name="service" class="w-full p-4  mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"> <option value="pickup">Pick it up</option> <option value="delivered">Have it Delivered (Delivery Fee)</option> <option value="catered">Have it catered by our staff (Service charge)</option> </select> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-0 mt-4"> <label class="text-base uppercase" for="order">Order:</label> <textarea id="order" name="order" required class="bg-primary w-full p-4 mt-2 outline-none text-primary-blue font-medium uppercase"></textarea> </div> <div class="col-span-22 col-start-2 lg:col-span-10 lg:col-start-14 mt-4"> <label class="text-base uppercase" for="address">Special requests:</label> <textarea id="requests" name="requests" required class="w-full p-4 mt-2 outline-none text-primary-blue bg-primary font-medium uppercase"></textarea> </div> <button class="catering-link border border-primary col-span-8 col-start-16 lg:col-start-20 lg:col-span-4 cursor-pointer text-nowrap font-normal uppercase px-[28px] py-[16px] leading-none hover:bg-primary hover:text-[#273E5B] flex items-center mt-10 justify-between lg:justify-center">Submit
<svg class="ml-4" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.794922 17.5H0.793945V17.499L8.43945 9.85352L0.794922 17.5ZM0.794922 0.500977L9.29297 9L8.4541 9.83789L8.46094 9.83105C8.58831 9.68679 8.73558 9.44496 8.78027 9.14941C8.82287 8.86761 8.76835 8.54897 8.5459 8.26562L8.43945 8.14648L0.793945 0.500977H0.794922Z"></path> </svg> </button> </form> <section class="container mt-8 pb-10 grid"> ${menu.map((course) => renderTemplate`<div> <section class="grid grid-cols-24"> <h3 class="text-2xl text-[#EDE1CD] grid-cols-24 uppercase mt-10 mb-2 col-span-22 col-start-2">${course.course}</h3> </section> ${course.items && renderTemplate`<ul class="grid grid-cols-24"> ${course.items.map((item) => renderTemplate`<li class="col-span-22 col-start-2 md:col-span-24 md:col-start-2 pr-5 mt-4"> <p class="text-lg text-primary uppercase">${item.name}</p> ${item.description && renderTemplate`<p class="text-[#F0DBBA] uppercase">${item.description}</p>`} </li>`)} </ul>`} ${course.additionalInfo && renderTemplate`<ul class="grid grid-cols-24"> ${course.additionalInfo.map((item) => renderTemplate`<li class="col-span-22 col-start-2 md:col-span-24 md:col-start-2 pr-5 mt-6"> <p class="text-lg text-primary uppercase">${item.name}</p> </li>`)} </ul>`} </div>`)} </section> </main> ` })} ${renderScript($$result, "/Users/kevinfay/Sites/astro/grill/src/pages/catering.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/kevinfay/Sites/astro/grill/src/pages/catering.astro", void 0);

const $$file = "/Users/kevinfay/Sites/astro/grill/src/pages/catering.astro";
const $$url = "/catering";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Catering,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
