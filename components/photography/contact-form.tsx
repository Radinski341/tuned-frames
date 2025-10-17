"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactRequestSchema, ContactRequest } from "@/lib/photography/contact";

export type ContactFormValues = ContactRequest;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
      projectType: "car-photo",
      budget: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/photography-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-colors dark:border-slate-800 dark:bg-neutral-900"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400"
            autoComplete="name"
          />
          {errors.name && <p className="mt-2 text-sm text-rose-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400"
            autoComplete="email"
          />
          {errors.email && <p className="mt-2 text-sm text-rose-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100" htmlFor="phone">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400"
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100" htmlFor="projectType">
            Project type
          </label>
          <select
            id="projectType"
            {...register("projectType")}
            className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400"
          >
            <option value="car-photo">Car Photography</option>
            <option value="portrait">Portrait Session</option>
            <option value="auto-video">Automotive Video</option>
            <option value="portrait-video">Portrait Videography</option>
            <option value="editing">Photo / Video Editing</option>
            <option value="event">Event Coverage</option>
            <option value="other">Something Else</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100" htmlFor="budget">
            Budget (optional)
          </label>
          <input
            id="budget"
            type="text"
            {...register("budget")}
            className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="text-sm font-semibold text-slate-900 transition-colors dark:text-neutral-100" htmlFor="message">
          Tell me about your build or event
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none dark:border-slate-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-400"
        />
        {errors.message && <p className="mt-2 text-sm text-rose-500">{errors.message.message}</p>}
      </div>
      <div className="sr-only">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
          aria-hidden="true"
        />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {status === "success" && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Thanks! I’ll be in touch within 24 hours.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-rose-500">
            Something went wrong. Please email tunedframes@gmail.com.
          </p>
        )}
      </div>
    </form>
  );
}