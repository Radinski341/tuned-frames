import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "lynkai.contact@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message, privacy } = await request.json();

    if (!name || !email || !phone || !message || privacy !== true) {
      return NextResponse.json(
        { message: "All required fields must be filled and privacy policy accepted" },
        { status: 400 }
      );
    }

    const messageBody = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service || "Not selected"}
      Message: ${message}
      Privacy Policy Accepted: ${privacy ? "Yes" : "No"}
    `;

    const mailOptions = {
      from: "lynkai.contact@gmail.com",
      to: [
        "lynkai.contact@gmail.com",
        "radinskikire@gmail.com"
      ],
      subject: "Lynk AI - Contact Form Submission",
      text: messageBody,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Message sent successfully! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "An error occurred while sending the message" },
      { status: 500 }
    );
  }
}