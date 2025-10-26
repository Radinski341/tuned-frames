import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactRequestSchema } from "@/lib/photography/contact";

const RATE_LIMIT_WINDOW = 1000 * 60 * 15; // 15 minutes
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function getClientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "anonymous";
  }
  return  "anonymous";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || entry.reset < now) {
    rateLimitMap.set(key, { count: 1, reset: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true };
}

async function sendEmail(data: ReturnType<typeof ContactRequestSchema.parse>) {
 const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false,
   auth: {
     user: "pecinski5@gmail.com",
     pass: process.env.GMAIL_PASS,
   },
 });

  const bodyLines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    `Project Type: ${data.projectType}`,
    data.budget ? `Budget: ${data.budget}` : null,
    "",
    "Message:",
    data.message,
  ].filter(Boolean);

  const mailOptions = {
      from: "pecinski5@gmail.com",
      to: [
        "tunedframes@gmail.com",
        "radinskikire@gmail.com",
        "pecinski5@gmail.com"
      ],
      subject: `New photography inquiry — ${data.projectType}`,
      text: bodyLines.join("\n"),
    };

  await transporter.sendMail(mailOptions);
  return true;
}

export async function POST(request: NextRequest) {
  const ipKey = getClientKey(request);
  const limit = checkRateLimit(ipKey);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again soon." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }

  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parseResult = ContactRequestSchema.safeParse(json);
  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.flatten() }, { status: 422 });
  }

  const data = parseResult.data;
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ success: true, skipped: true });
  }

  let delivered = false;
  try {
    delivered = await sendEmail(data);
  } catch (error) {
    console.error("Failed to send contact email", error);
  }

  return NextResponse.json({ success: true, delivered });
}