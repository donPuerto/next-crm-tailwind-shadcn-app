import { ThemeSwitcher } from '@/components/themes/theme-switcher';
import { Icon } from '@/components/ui/icon';

export const metadata = {
  title: 'Settings',
};

/**
 * Settings page for theme customization and previews.
 * @returns Settings layout content
 */
export default function SettingsPage() {
  return (
    // Full-page settings wrapper
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Centered content container */}
      <div className="layout-container layout-padding mx-auto py-10">
        {/* Page header */}
        <header className="mb-6 flex items-center gap-3">
          <Icon name="Settings" size={20} className="text-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </header>

        {/* Settings intro */}
        <section className="mb-8">
          <p className="text-sm text-muted-foreground">
            Configure theme, accent, base neutral, style, radius, menu accent, and fonts.
          </p>
        </section>

        {/* Theme controls */}
        <section className="space-y-4">
          <ThemeSwitcher />
        </section>

        {/* Icon preview area */}
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
