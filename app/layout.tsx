import type { Metadata } from "next";
import "./styles/globals.css";
import ThemeProvider from "@/components/themes/theme-provider";
import { ActiveThemeProvider } from "@/components/themes/active-theme";
import { fontVariables } from "@/components/themes/font.config";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "CRM Dashboard - Next.js",
  description: "Modern CRM Dashboard with Next.js, Shadcn UI, and Supabase",
};

/**
 * Root layout with theme and font variables wired on first render.
 * @param children - App content tree
 * @returns Root HTML shell with theme providers
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read active theme and color from cookies for SSR parity
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('active_theme');
  const colorCookie = cookieStore.get('active_color');
  const initialTheme = themeCookie?.value || 'vercel';
  const initialColor = colorCookie?.value;

  return (
    // Root document with initial theme and color for consistent fonts
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
      data-theme={initialTheme}
      data-color={initialColor}
    >
      {/* Body container for global theme providers */}
      <body
        className="antialiased bg-background"
        suppressHydrationWarning
      >
        {/* Active theme context for style and color selection */}
        <ActiveThemeProvider initialTheme={initialTheme} initialColor={initialColor}>
          {/* Next-themes handles light/dark class toggling */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </ActiveThemeProvider>
      </body>
    </html>
  );
}
