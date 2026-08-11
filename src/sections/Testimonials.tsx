import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  // Duplicated once for a seamless CSS marquee loop.
  const loop = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-bg py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by clients, backed by results"
          highlight="backed by results"
          description="Direct feedback from clients and Upwork engagements — unedited."
        />
      </Container>

      <div className="group relative mt-16 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-6 group-hover:[animation-play-state:paused]">
          {loop.map((testimonial, i) => (
            <TestimonialCard key={`${testimonial.id}-${i}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
