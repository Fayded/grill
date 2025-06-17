import { c as createComponent, s as spreadAttributes, u as unescapeHTML, b as renderTemplate } from './astro/server_pDgY8W89.mjs';

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const map = createSvgComponent({"meta":{"src":"/_astro/map.D3R8Ae-z.svg","width":18,"height":22,"format":"svg"},"attributes":{"width":"18","height":"22","viewBox":"0 0 18 22","fill":"none"},"children":"\n<path d=\"M9.0015 0C4.04484 0 0 3.9076 0 8.6996C0 13.3646 8.21784 21.2119 8.54396 21.5593L9 22L9.45604 21.5593C9.81529 21.212 18 13.3646 18 8.6996C18.0025 3.90791 13.9578 0 9.00111 0H9.0015ZM9.0015 12.1653C7.01166 12.1653 5.41421 10.6214 5.41421 8.69833C5.41421 6.77523 7.01166 5.23136 9.0015 5.23136C10.9913 5.23136 12.5888 6.77523 12.5888 8.69833C12.5888 10.6214 10.9913 12.1653 9.0015 12.1653Z\" fill=\"#D9C4A2\" />\n"});

export { map as m };
