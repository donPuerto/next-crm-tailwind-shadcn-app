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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get theme from cookie
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('active_theme');
  const initialTheme = themeCookie?.value || 'vercel';

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontVariables} antialiased bg-background`}
        suppressHydrationWarning
      >
        <ActiveThemeProvider initialTheme={initialTheme}>
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
