export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  console.log("Received request to /api/email-newsletter.json");
  const data = await request.formData();
  const email = data.get("email");
  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
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