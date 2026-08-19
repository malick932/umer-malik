"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-cyan/50 focus:bg-white/[0.05]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 700);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
        <input
          type="email"
          required
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>
      <textarea
        required
        rows={5}
        placeholder="Tell me about your project..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={cn(fieldClass, "resize-none")}
      />

      <motion.button
        type="submit"
        onClick={addRipple}
        disabled={status === "sending"}
        whileTap={{ scale: 0.97 }}
        data-cursor-hover
        className="relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple via-blue to-cyan px-8 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_-6px_var(--color-purple)] disabled:opacity-70"
      >
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ left: ripple.x, top: ripple.y }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
          />
        ))}

        <AnimatePresence mode="wait" initial={false}>
          {status === "sending" && (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </motion.span>
          )}
          {status === "sent" && (
            <motion.span
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              Message sent
            </motion.span>
          )}
          {status === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <AlertCircle size={16} />
              Failed — try again
            </motion.span>
          )}
          {status === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <Send size={16} />
              Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {status === "error" && (
        <p className="text-xs text-white/40">
          Something went wrong. You can also reach out directly at{" "}
          <a href={siteConfig.social.email} className="text-cyan hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
