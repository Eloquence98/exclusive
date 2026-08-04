"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    // Demonstration only — logs submissions, no backend
    console.log("[Contact Form Submission]", form);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Message received", {
      description: "Thanks for reaching out. We'll get back to you shortly.",
    });

    setForm({ name: "", email: "", subject: "", message: "" });
    setIsPending(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
          Get in Touch
        </h1>
        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          Have a question about your order or just want to say hello? We&apos;d
          love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left: Contact Info */}
        <div className="space-y-10">
          <div>
            <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    support@exclusive.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Fashion Street, New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Response Time
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24–48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo information */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              This is a demo application. Contact form submissions are logged to
              the console and no emails are sent.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-foreground"
            >
              Subject
            </label>
            <Input
              id="subject"
              placeholder="What's this about?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Tell us how we can help..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
