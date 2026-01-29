'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/app/hooks/useTheme';

/**
 * ThemeProvider - Initializes theme system
 * Must wrap application to enable theme switching
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { mounted: themeMounted } = useTheme();

  // Wait for client-side hydration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || !themeMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
