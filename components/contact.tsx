"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { Button } from "./button";
import { Logo } from "./Logo";
import { useState } from "react";
import { motion } from "framer-motion";

// Define the form schema with phone and privacy fields
const formSchema = z.object({
  name: z
    .string({ required_error: "Please enter your name" })
    .min(1, "Please enter your name"),
  email: z
    .string({ required_error: "Please enter your email" })
    .email("Please enter a valid email")
    .min(1, "Please enter your email"),
  phone: z
    .string({ required_error: "Please enter your phone number" })
    .min(1, "Please enter your phone number")
    .regex(/^\+?\d{10,15}$/, "Please enter a valid phone number"),
  company: z
    .string({ required_error: "Please enter your company's name" })
    .min(1, "Please enter your company's name"),
  service: z
    .string()
    .optional(),
  message: z
    .string({ required_error: "Please enter your message" })
    .min(1, "Please enter your message"),
  privacy: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy policy",
    }),
});

export type ContactFormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
      privacy: false,
    },
  });

  async function onSubmit(values: ContactFormData) {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        form.reset();
      } else {
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while sending the message.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const socials = [
    {
      title: "twitter",
      href: "#", 
      icon: (
        <IconBrandX className="h-5 w-5 text-muted dark:text-muted-dark hover:text-blue-500 transition-colors" />
      ),
    },
    {
      title: "github",
      href: "#",
      icon: (
        <IconBrandGithub className="h-5 w-5 text-muted dark:text-muted-dark hover:text-blue-500 transition-colors" />
      ),
    },
    {
      title: "linkedin",
      href: "#", 
      icon: (
        <IconBrandLinkedin className="h-5 w-5 text-muted dark:text-muted-dark hover:text-blue-500 transition-colors" />
      ),
    },
  ];

  return (
    <Form {...form}>
      <div className="flex relative z-20 items-center w-full justify-center px-4 py-4 lg:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-muted dark:text-muted-dark text-sm max-w-sm"
            >
              Please reach out to us and we will get back to you at the speed of light
            </motion.p>
          </div>

          <div className="py-10">
            {successMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-600 text-sm mb-4"
              >
                {successMessage}
              </motion.p>
            )}
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm mb-4"
              >
                {errorMessage}
              </motion.p>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                    >
                      Full Name
                    </label>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                    >
                      Email Address
                    </label>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-2"
                      >
                        <input
                          id="email"
                          type="email"
                          placeholder="john.doe@company.com"
                          className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                    >
                      Phone Number
                    </label>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-2"
                      >
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+1234567890"
                          className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                    >
                      Company
                    </label>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="mt-2"
                      >
                        <input
                          id="company"
                          type="text"
                          placeholder="Acentry Labs, LLC"
                          className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                    >
                      Service of Interest (Optional)
                    </label>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="mt-2"
                      >
                        <select
                          id="service"
                          className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                          {...field}
                        >
                          <option value="">Select a service</option>
                          <option value="web-development">Web Development</option>
                          <option value="app-optimization">App Optimization</option>
                          <option value="cloud-migration">Cloud Migration</option>
                          <option value="seo">SEO Services</option>
                          <option value="custom-solutions">Custom Solutions</option>
                        </select>
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium leading-6 text-neutral-700 dark:text-muted-dark"
                    >
                      Message
                    </label>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="mt-2"
                      >
                        <textarea
                          rows={5}
                          id="message"
                          placeholder="Tell us about your project or challenge"
                          className="block w-full bg-white dark:bg-neutral-900 px-4 rounded-md border-0 py-1.5 shadow-aceternity text-black placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm sm:leading-6 dark:text-white"
                          {...field}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="mt-2 flex items-center"
                      >
                        <input
                          id="privacy"
                          type="checkbox"
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label
                          htmlFor="privacy"
                          className="ml-2 text-sm text-neutral-700 dark:text-muted-dark"
                        >
                          I agree to the{" "}
                          <Link href="/privacy" className="text-blue-500 hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
              >
                <Button className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </motion.div>
            </form>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center space-x-4 py-4"
          >
            {socials.map((social) => (
              <Link href={social.href} key={social.title} target="_blank">
                {social.icon}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </Form>
  );
}