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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SERVICES = new Set(["pickup", "delivered", "catered"]);
const MIN_SUBMIT_MS = 2000;

function str(data: FormData, key: string, maxLen: number): string {
  return (data.get(key)?.toString() || "").slice(0, maxLen);
}

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");
  const siteUrl = import.meta.env.SITE || import.meta.env.VERCEL_URL;
  if (origin && siteUrl && !siteUrl.startsWith(origin) && !origin.endsWith(new URL(siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`).hostname)) {
    return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
  }

  const data = await request.formData();

  if (data.get("website")?.toString()) {
    return new Response(null, { status: 302, headers: { Location: "/thank-you" } });
  }

  const timestamp = data.get("_t")?.toString();
  if (timestamp) {
    const elapsed = Date.now() - Number(timestamp);
    if (elapsed < MIN_SUBMIT_MS) {
      return new Response(null, { status: 302, headers: { Location: "/thank-you" } });
    }
  }

  const container = await experimental_AstroContainer.create();

  const name = str(data, "name", 200);
  const address = str(data, "address", 500);
  const email = str(data, "email", 254);
  const city = str(data, "city", 100);
  const zip = str(data, "zip", 10);
  const date = str(data, "date", 10);
  const time = str(data, "time", 5);
  const phone = str(data, "phone", 20);
  const peopleValue = data.get("people");
  const people = peopleValue !== null ? Math.max(1, Math.min(10000, parseInt(peopleValue.toString(), 10) || 1)) : 1;
  const service = str(data, "service", 20);
  const order = str(data, "order", 5000);
  const requests = str(data, "requests", 5000);

  if (!name || !email || !address || !city || !zip || !phone || !order) {
    return new Response(
      JSON.stringify({ message: "Fill out all required fields." }),
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return new Response(
      JSON.stringify({ message: "Invalid email address." }),
      { status: 400 },
    );
  }

  if (!ALLOWED_SERVICES.has(service)) {
    return new Response(
      JSON.stringify({ message: "Invalid service type." }),
      { status: 400 },
    );
  }

  const emailCateringHtml = await container.renderToString(CateringTemplate, {
    props: { name, address, email, city, zip, date, time, phone, people, service, order, requests },
  });

  const sendCateringResend = await resend.emails.send({
    from: 'catering@thegrillatlj.com',
    to: ['bridgette@thegrillatlj.com', email],
    subject: `Catering for ${name.slice(0, 100)}`,
    html: emailCateringHtml,
  });

  if (sendCateringResend.data) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    });
  } else {
    return new Response(
      JSON.stringify({ message: "Failed to send. Please try again." }),
      { status: 500 },
    );
  }
}
