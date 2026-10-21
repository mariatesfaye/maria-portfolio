export function SectionHeading({
  index,
  title,
  headingId,
}: {
  index: string
  title: string
  headingId: string
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">{index}</p>
      <h2
        id={headingId}
        tabIndex={-1}
        className="focus-target mt-2 scroll-mt-24 text-2xl font-medium tracking-tight text-balance"
      >
        {title}
      </h2>
    </div>
  )
}
