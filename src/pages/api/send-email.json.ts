export const prerender = false; 

import type { APIRoute } from "astro";
import { experimental_AstroContainer } from 'astro/container';
import { Resend } from "resend";
import CateringTemplate from "../../components/catering/index.astro";

const resendApiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not defined in environment variables.");
}
const resend = new Resend(resendApiKey);

export const POST: APIRoute = async ({ request }) => {
  const container = await experimental_AstroContainer.create();

  const data = await request.formData();
  const name = data.get("name")?.toString() || "";
  const address = data.get("address")?.toString() || "";
  const email = data.get("email")?.toString() || "";
  const city = data.get("city")?.toString() || "";
  const zip = data.get("zip")?.toString() || "";
  const date = data.get("date")?.toString() || "";
  const time = data.get("time")?.toString() || "";
  const phone = data.get("phone")?.toString() || "";
  const peopleValue = data.get("people");
  const people = peopleValue !== null ? parseInt(peopleValue.toString(), 10) : 1;
  const service = data.get("service")?.toString() || "pickup";
  const order = data.get("order")?.toString() || "";
  const requests = data.get("requests")?.toString() || "";
  
  if (!name) {
    return new Response(
      JSON.stringify({
        message: `Fill out all fields.`,
      }),
      {
        status: 400,
        statusText: "Did not provide the right data",
      }
    );
  }

  const emailCateringHtml = await container.renderToString(CateringTemplate, {
    props: { name, address, email, city, zip, date, time, phone, people, service, order, requests },
  });

  const sendCateringResend = await resend.emails.send({
    from: 'catering@thegrillatlj.com',
    to: ['bridgette@thegrillatlj.com', email],
    subject: `Catering for ${name}`,
    html: emailCateringHtml,
  }); 

  if (sendCateringResend.data) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/thank-you",
      },
    });
  } else {
    return new Response(
      JSON.stringify({
        message: `Messages failed to send: User- ${JSON.stringify(sendCateringResend.error)}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: User- ${JSON.stringify(sendCateringResend.error)}`,
      },
    );
  }
}
