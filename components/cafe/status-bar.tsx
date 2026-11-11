export function StatusBar() {
  return (
    <footer className="border-t bg-card/80">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[11px] text-muted-foreground uppercase md:px-6">
        <p className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary-foreground/50" />
            <span className="relative inline-flex size-2 rounded-full bg-secondary-foreground" />
          </span>
          Kitchen open · 7:00–14:00
        </p>
        <p className="hidden sm:block">Dogs, cats &amp; humans welcome</p>
        <p>Avg. prep 8 min</p>
      </div>
    </footer>
  )
}
