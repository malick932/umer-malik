/** Simple Icons dropped LinkedIn's mark, and Lucide never carried brand logos —
 * this recreates the standard "in" badge convention rather than an inaccurate
 * hand-drawn substitute. */
export function LinkedInBadge({ size = 15 }: { size?: number }) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.62 }}
      className="inline-flex shrink-0 items-center justify-center rounded-[3px] bg-[#0A66C2] font-bold leading-none text-white"
    >
      in
    </span>
  );
}
