"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/app/hooks/useTheme";
import {
  AVAILABLE_THEMES,
  THEME_CONFIG,
  AVAILABLE_COLORS,
  COLOR_CONFIG,
  AVAILABLE_RADII,
  AVAILABLE_STYLES,
  STYLE_CONFIG
} from "@/lib/constants/themes";

export function Navbar() {
  const {
    theme,
    color,
    radius,
    style,
    fontSans,
    fontSerif,
    fontMono,
    setTheme,
    setColor,
    setRadius,
    setStyle,
    setFonts,
    layoutMode,
    setLayoutMode,
    isDark,
    setDarkMode,
    mounted
  } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="navbar-container layout-container layout-padding mx-auto flex h-12 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
            <Logo size="sm" />
            <span>Don Puerto</span>
          </Link>
          {mounted && (
            <span className="ml-2 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {THEME_CONFIG[theme]?.name ?? theme}
            </span>
          )}
        </div>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings">Settings</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/sales">Sales</Link>
          </Button>

          <Separator orientation="vertical" className="mx-1 h-6" />

          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Theme settings">
                  <Icon name="Palette" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 p-2" align="end">
                <DropdownMenuLabel>Theme settings</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <span className="text-xs text-muted-foreground">Selecting theme</span>
                    <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                      <SelectTrigger aria-label="Select Theme" size="sm" className="w-full">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_THEMES.map((t) => (
                          <SelectItem key={t} value={t} aria-label={`Switch to ${THEME_CONFIG[t].name}`}>
                            {THEME_CONFIG[t].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-xs text-muted-foreground">Selecting theme color</span>
                    <Select value={color} onValueChange={(v) => setColor(v as any)}>
                      <SelectTrigger aria-label="Select Accent Color" size="sm" className="w-full">
                        <SelectValue placeholder="Accent Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_COLORS.map((c) => (
                          <SelectItem key={c} value={c} aria-label={`Select ${COLOR_CONFIG[c].name} color`}>
                            {COLOR_CONFIG[c].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-xs text-muted-foreground">Radius</span>
                    <Select value={radius} onValueChange={(v) => setRadius(v as any)}>
                      <SelectTrigger aria-label="Select Radius" size="sm" className="w-full">
                        <SelectValue placeholder="Radius" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_RADII.map((r) => (
                          <SelectItem key={r} value={r} aria-label={`Set radius ${r}`}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-xs text-muted-foreground">Change font</span>
                    <div className="grid grid-cols-3 gap-2">
                      <Select value={fontSans} onValueChange={(v) => setFonts({ sans: v as any })}>
                        <SelectTrigger aria-label="Select Sans Font" size="sm" className="w-full">
                          <SelectValue placeholder="Sans" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="noto">Noto Sans</SelectItem>
                          <SelectItem value="nunito">Nunito Sans</SelectItem>
                          <SelectItem value="figtree">Figtree</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={fontSerif} onValueChange={(v) => setFonts({ serif: v as any })}>
                        <SelectTrigger aria-label="Select Serif Font" size="sm" className="w-full">
                          <SelectValue placeholder="Serif" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="georgia">Georgia</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={fontMono} onValueChange={(v) => setFonts({ mono: v as any })}>
                        <SelectTrigger aria-label="Select Mono Font" size="sm" className="w-full">
                          <SelectValue placeholder="Mono" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="geist-mono">Geist Mono</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-xs text-muted-foreground">Style</span>
                    <Select value={style} onValueChange={(v) => setStyle(v as any)}>
                      <SelectTrigger aria-label="Select Style" size="sm" className="w-full">
                        <SelectValue placeholder="Style" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_STYLES.map((s) => (
                          <SelectItem key={s} value={s} aria-label={`Switch to ${STYLE_CONFIG[s].name} style`}>
                            {STYLE_CONFIG[s].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-xs text-muted-foreground">Toggle layout</span>
                    <Select value={layoutMode} onValueChange={(v) => setLayoutMode(v as any)}>
                      <SelectTrigger aria-label="Select Layout" size="sm" className="w-full">
                        <SelectValue placeholder="Layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="layout-full">
                          <div className="flex items-center gap-2">
                            <Icon name="GalleryHorizontal" size={14} />
                            <span>Layout Full</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="layout-fixed">
                          <div className="flex items-center gap-2">
                            <Icon name="PanelLeft" size={14} />
                            <span>Layout Fixed</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="icon" aria-label="Theme settings" disabled>
              <Icon name="Palette" size={16} />
            </Button>
          )}

          {mounted && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Toggle layout mode" 
                  onClick={() => setLayoutMode(layoutMode === 'layout-full' ? 'layout-fixed' : 'layout-full')}
                >
                  <Icon name={layoutMode === 'layout-full' ? "GalleryHorizontal" : "PanelLeft"} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {layoutMode === 'layout-full' ? "Switch to fixed width" : "Switch to full width"}
              </TooltipContent>
            </Tooltip>
          )}

          {mounted && (
              <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Toggle dark mode" onClick={() => setDarkMode(!isDark)}>
                  <Icon name={isDark ? "Sun" : "Moon"} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isDark ? "Switch to light" : "Switch to dark"}</TooltipContent>
            </Tooltip>
          )}
        </nav>
      </div>
    </header>
  );
}
