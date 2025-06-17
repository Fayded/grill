import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_pDgY8W89.mjs';
import { $ as $$Layout } from '../chunks/Layout_DYKAH4Yp.mjs';
export { renderers } from '../renderers.mjs';

const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const menu = [
    {
      course: "Get Started",
      items: [
        { name: "Onion Rings", price: 9 },
        { name: "Side Salad", price: 6 },
        { name: "Fried Mushrooms", price: 8 },
        { name: "Corn Fritters", price: 9 },
        { name: "Bowl of Chili", price: 6 },
        { name: "Chicken Tenders", price: 12, description: "Ranch or Honey Mustard" }
      ]
    },
    {
      course: "Fresh Salads",
      price: 14,
      items: [
        { name: "Feta Chicken", description: "Dried Cranberries & Candied Walnuts" },
        { name: "Chef", description: "Turkey, Ham, Egg, Tomato, Cheese, Onion, & Cucumber" },
        { name: "Grilled Chicken", description: "Egg, Tomato, Onions, Cheese, & Cucumber" },
        { name: "Southern Fried", description: "Bacon, Egg, Cheese, Tomato, & Croutons" },
        { name: "Cobb", description: "Chicken, Blue Cheese, Bacon, Egg, Onion, & Tomato" },
        { name: "Greek", description: "Feta, Olives, Tomato, Onions, Cucumber, & Peppers" }
      ],
      additionalItems: [
        { name: "Soup & Salad Combo", price: 12 }
      ]
    },
    {
      course: "Sandwiches",
      price: 12,
      description: "Served with One Side",
      items: [
        { name: "Pulled Pork", price: 11 },
        { name: "Corn Beef-N-Swiss", price: 12 },
        { name: "Fried Flounder", price: 12 },
        { name: "French Dip Choice Beef", price: 13 },
        { name: "Grilled Chicken", price: 12 },
        { name: "Turkey Ciabatta", price: 13, description: "With Tarragon mayo" },
        { name: "Mahi Sandwich", price: 14, description: "Blackened or Lemon Pepper" },
        { name: "Daily Sandwich", price: "MP", description: "Ask your server!" }
      ]
    },
    {
      course: "Plates",
      description: "Served with Two Side",
      items: [
        { name: "Pulled Pork", price: 13 },
        { name: "Turkey", price: 14 },
        { name: "Grilled Chicken", price: 14 },
        { name: "Hand Breaded Chickentenders", price: 16 },
        { name: "Sliced Beef AuJus", price: 14 },
        { name: "Full Rack Baby Back Ribs", price: 19 },
        { name: "Fried Flounder", price: 14 },
        { name: "Half Rack Baby Back Ribs", price: 15 },
        { name: "Grilled Mahi", price: 16 },
        { name: "Daily Fried Fish", price: "MP" },
        { name: "1/2 Roasted Chicken", price: 16 },
        { name: "Combo Ribs", price: 19, description: "Choice of Chicken, Beef, Pork or Turkey" },
        { name: "", price: "" },
        { name: "Two Meat Combo", price: 17, description: "Choice of Chicken, Beef, Pork or Turkey" }
      ]
    },
    {
      course: "Grilled Steak Burgers",
      description: "Served with One Side",
      items: [
        { name: "Traditional Burger", price: 12 },
        { name: "Cheddar Burger", price: 13 },
        { name: "Swiss Burger", price: 13 },
        { name: "Blackened Blue Cheese", price: 14 }
      ]
    },
    {
      course: "Hand Breaded Chicken Tenders",
      items: [
        { name: "Appetizer Basket", price: 12, description: "Ranch or Honey Mustard" },
        { name: "Kids Tenders", price: 6, description: "Served with One Side" },
        { name: "Tenders Platter", price: 16 },
        { name: "Southern Fried Salad", price: 14, description: "Bacon, Egg, Cheese, Tomato, & Croutons" }
      ]
    },
    {
      course: "Sides",
      price: 3,
      items: [
        { name: "French Fries" },
        { name: "Collard Greens" },
        { name: "Corn Fritters" },
        { name: "Mac N Cheese" },
        { name: "Sweet Potato" },
        { name: "Lima Beans" },
        { name: "Baked Beans" },
        { name: "Onion Rings" },
        { name: "Baked Potato" },
        { name: "Roasted Corn Sald" },
        { name: "Sweet Potato Fries" },
        { name: "Fried Okra" }
      ]
    },
    {
      course: "Beverages",
      price: 3,
      items: [
        { name: "Tea, Soda, Lemonade" }
      ]
    },
    {
      course: "Alcoholic Beverages",
      items: [
        { name: "Beer, Wine, Seltzer" }
      ],
      additionalItems: [
        { name: "Ask your server for Selections" }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container grid grid-cols-24 py-10"> <div class="col-span-22 col-start-2 lg:col-span-8 lg:col-start-2 text-4xl uppercase items-center justify-start mb-4"> <h3>Menu</h3> </div> </section> <section class="container mt-8 pb-10 grid"> ${menu.map(
    (course) => renderTemplate`<div> <section class="grid grid-cols-24"> <h3 class="text-2xl text-[#EDE1CD] grid-cols-24 uppercase mb-2 col-span-22 col-start-2">${course.course} ${course.price && renderTemplate`<span>${course.price}</span>`}</h3> </section> <ul class="grid grid-cols-24 mb-10"> ${course.items?.map((menuItem) => renderTemplate`<li class="col-span-22 col-start-2 md:col-span-24 md:col-start-2 pr-5 mt-4"> <p${addAttribute(menuItem.description ? "text-[#F0DBBA] uppercase" : "text-lg font-base uppercase text-primary", "class")}> ${menuItem.name} ${menuItem.price ? menuItem.price : null} </p> <p class="uppercase"> ${menuItem.description && renderTemplate`<span>${menuItem.description}</span>`} </p> </li>`)} ${course.additionalItems?.map((additionalItem) => renderTemplate`<li class="col-span-24 pr-5 my-12 text-center"> <p class="text-[#F0DBBA] uppercase">${additionalItem.name} ${additionalItem.price ? additionalItem.price : null}</p> </li>`)} </ul> </div>`
  )} </section> ` })}`;
}, "/Users/kevinfay/Sites/astro/grill/src/pages/menu.astro", void 0);

const $$file = "/Users/kevinfay/Sites/astro/grill/src/pages/menu.astro";
const $$url = "/menu";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Menu,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
