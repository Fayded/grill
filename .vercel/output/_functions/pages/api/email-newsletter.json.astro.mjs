export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  console.log("Received request to /api/email-newsletter.json");
  const data = await request.formData();
  const email = data.get("email");
  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields"
      }),
      { status: 400 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
