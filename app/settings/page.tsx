import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Icon } from '@/components/ui/icon';

export const metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-6 flex items-center gap-3">
          <Icon name="Settings" size={20} className="text-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </header>

        <section className="mb-8">
          <p className="text-sm text-muted-foreground">
            Configure theme, accent, base neutral, style, radius, menu accent, and fonts.
          </p>
        </section>

        <section className="space-y-4">
          <ThemeSwitcher />
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-lg font-medium">Icon Preview</h2>
          <div className="flex flex-wrap gap-4">
            <Icon name="Sun" size={20} className="text-foreground" />
            <Icon name="Moon" size={20} className="text-foreground" />
            <Icon name="Palette" size={20} className="text-foreground" />
            <Icon name="Type" size={20} className="text-foreground" />
            <Icon name="MousePointer" size={20} className="text-foreground" />
          </div>
        </section>
      </div>
    </div>
  );
}
