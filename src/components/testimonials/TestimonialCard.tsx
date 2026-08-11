import { CheckCircle2, Quote, Star } from "lucide-react";
import { SiUpwork } from "react-icons/si";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass flex h-full w-[380px] shrink-0 flex-col rounded-2xl p-6 sm:w-[420px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-cyan text-cyan" />
          ))}
        </div>
        {testimonial.source === "upwork" ? (
          <SiUpwork size={16} className="text-[#14a800]" />
        ) : (
          <CheckCircle2 size={16} className="text-cyan" />
        )}
      </div>

      <Quote size={22} className="mt-4 text-white/15" />
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
        {testimonial.quote}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <p className="text-sm font-medium text-white">{testimonial.author}</p>
          <p className="text-xs text-white/40">{testimonial.role}</p>
        </div>
        <span className="font-mono text-[11px] text-white/30">{testimonial.date}</span>
      </div>
    </div>
  );
}
