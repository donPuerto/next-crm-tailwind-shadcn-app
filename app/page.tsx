import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Icon } from "@/components/ui/icon";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="layout-container mx-auto px-6 py-10">
        <section className="mb-8">
          <div className="flex items-center gap-3">
            <Icon name="Home" size={22} className="text-foreground" />
            <h1 className="text-2xl font-semibold tracking-tight">Theming Demo</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Switch themes, accents, base neutrals, styles, radius, and fonts below.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-2 text-lg font-medium">Theme & Colors</h2>
            <ThemeSwitcher />
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h2 className="mb-3 text-lg font-medium">Tokens Preview</h2>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded border border-border bg-background p-3">
                <div className="mb-2 h-8 w-full rounded bg-primary" />
                <div className="mb-2 h-8 w-full rounded bg-secondary" />
                <div className="mb-2 h-8 w-full rounded bg-muted" />
                <div className="h-8 w-full rounded bg-accent" />
              </div>
              <div className="rounded border border-border bg-background p-3">
                <button className="mb-2 w-full rounded bg-primary px-3 py-2 text-primary-foreground">Primary</button>
                <button className="mb-2 w-full rounded bg-secondary px-3 py-2 text-secondary-foreground">Secondary</button>
                <button className="mb-2 w-full rounded bg-muted px-3 py-2 text-muted-foreground">Muted</button>
                <button className="w-full rounded bg-accent px-3 py-2 text-accent-foreground">Accent</button>
              </div>
              <div className="rounded border border-border bg-background p-3">
                <input className="mb-2 w-full rounded border border-input bg-background px-3 py-2 outline-ring/50" placeholder="Input" />
                <div className="mb-2 h-8 w-full rounded bg-card" />
                <div className="mb-2 h-8 w-full rounded bg-popover" />
                <div className="h-8 w-full rounded bg-sidebar" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <a href="/settings" className="inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-2 text-sm hover:bg-muted">
            <Icon name="Settings" size={18} className="text-foreground" />
            Open Settings
          </a>
        </section>
      </main>
    </div>
  );
}
