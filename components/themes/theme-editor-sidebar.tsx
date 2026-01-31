'use client';

import * as React from 'react';
import { Settings2, RotateCcw, Save, Download, Trash2, ChevronDown, Grid3x3, List, Search, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ThemeEditorSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CustomTheme {
  baseTheme: string;
  customizations: Record<string, string>;
  savedAt?: string;
}

const COLOR_VARIABLES = [
  { id: '--background', label: 'Background', group: 'primary' },
  { id: '--foreground', label: 'Foreground', group: 'primary' },
  { id: '--primary', label: 'Primary', group: 'primary' },
  { id: '--primary-foreground', label: 'Primary Foreground', group: 'primary' },
  { id: '--secondary', label: 'Secondary', group: 'secondary' },
  { id: '--secondary-foreground', label: 'Secondary Foreground', group: 'secondary' },
  { id: '--muted', label: 'Muted', group: 'secondary' },
  { id: '--muted-foreground', label: 'Muted Foreground', group: 'secondary' },
  { id: '--accent', label: 'Accent', group: 'accent' },
  { id: '--accent-foreground', label: 'Accent Foreground', group: 'accent' },
  { id: '--destructive', label: 'Destructive', group: 'accent' },
  { id: '--destructive-foreground', label: 'Destructive Foreground', group: 'accent' },
  { id: '--card', label: 'Card', group: 'base' },
  { id: '--card-foreground', label: 'Card Foreground', group: 'base' },
  { id: '--popover', label: 'Popover', group: 'base' },
  { id: '--popover-foreground', label: 'Popover Foreground', group: 'base' },
  { id: '--border', label: 'Border', group: 'base' },
  { id: '--input', label: 'Input', group: 'base' },
  { id: '--ring', label: 'Ring', group: 'base' },
];

// Tailwind color palette
const TAILWIND_COLORS = [
  { name: 'Red', shades: ['#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'] },
  { name: 'Orange', shades: ['#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412'] },
  { name: 'Yellow', shades: ['#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e'] },
  { name: 'Green', shades: ['#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'] },
  { name: 'Blue', shades: ['#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'] },
  { name: 'Purple', shades: ['#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8'] },
  { name: 'Pink', shades: ['#ffe4e6', '#fccce7', '#fbcfe8', '#f472b6', '#ec4899', '#db2777', '#be185d', '#831843'] },
  { name: 'Slate', shades: ['#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b'] },
  { name: 'Gray', shades: ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937'] },
  { name: 'Black', shades: ['#ffffff', '#f5f5f5', '#e0e0e0', '#999999', '#666666', '#333333', '#1a1a1a', '#000000'] },
];

// Simple oklch-like string (for display purposes, using hex internally)
function getCurrentColorAsHex(variable: string, customizations: Record<string, string>): string {
  if (customizations[variable]) {
    return customizations[variable];
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  // If it's already hex, return it
  if (value.startsWith('#')) {
    return value;
  }

  // Try to convert oklch to hex (basic approximation)
  // For now, return a default if we can't parse
  return '#808080';
}

export function ThemeEditorSidebar({ open, onOpenChange }: ThemeEditorSidebarProps) {
  const [customizations, setCustomizations] = React.useState<Record<string, string>>({});
  const [radius, setRadius] = React.useState<number>(0.5);
  const [hasChanges, setHasChanges] = React.useState(false);
  const [hasSavedTheme, setHasSavedTheme] = React.useState(false);
  const [openSection, setOpenSection] = React.useState<string | null>('primary'); // Accordion mode
  
  // Color picker popover state
  const [pickerVariable, setPickerVariable] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');

  // Load saved custom theme on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('app-custom-theme');
    if (savedTheme) {
      try {
        const parsed: CustomTheme = JSON.parse(savedTheme);
        setCustomizations(parsed.customizations || {});
        setHasSavedTheme(true);
        
        if (parsed.customizations['--radius']) {
          const radiusValue = parseFloat(parsed.customizations['--radius']);
          if (!isNaN(radiusValue)) {
            setRadius(radiusValue);
          }
        }
      } catch (e) {
        console.error('Failed to load custom theme:', e);
      }
    }

    const currentRadius = getComputedStyle(document.documentElement)
      .getPropertyValue('--radius')
      .trim();
    if (currentRadius) {
      const radiusValue = parseFloat(currentRadius);
      if (!isNaN(radiusValue)) {
        setRadius(radiusValue);
      }
    }
  }, []);

  // Apply customizations to CSS variables in real-time
  React.useEffect(() => {
    Object.entries(customizations).forEach(([variable, value]) => {
      if (value && variable !== '--radius') {
        document.documentElement.style.setProperty(variable, value);
      }
    });
  }, [customizations]);

  // Apply radius in real-time
  React.useEffect(() => {
    document.documentElement.style.setProperty('--radius', `${radius}rem`);
  }, [radius]);

  const handleColorChange = (variable: string, value: string) => {
    setCustomizations(prev => ({ ...prev, [variable]: value }));
    setHasChanges(true);
  };

  const handleResetToDefault = () => {
    setCustomizations({});
    setRadius(0.5);
    setHasChanges(false);

    COLOR_VARIABLES.forEach(({ id }) => {
      document.documentElement.style.removeProperty(id);
    });
    document.documentElement.style.setProperty('--radius', '0.5rem');

    window.dispatchEvent(new CustomEvent('theme-changed', { 
      detail: { reset: true } 
    }));
  };

  const handleSaveCustomTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'vercel';
    
    const customTheme: CustomTheme = {
      baseTheme: currentTheme,
      customizations: {
        ...customizations,
        '--radius': `${radius}rem`,
      },
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem('app-custom-theme', JSON.stringify(customTheme));
    setHasSavedTheme(true);
    setHasChanges(false);

    window.dispatchEvent(new CustomEvent('theme-changed', { 
      detail: { saved: true } 
    }));
  };

  const handleClearSavedTheme = () => {
    localStorage.removeItem('app-custom-theme');
    setHasSavedTheme(false);
    handleResetToDefault();
  };

  const handleExportTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'vercel';
    
    const exportData: CustomTheme = {
      baseTheme: currentTheme,
      customizations: {
        ...customizations,
        '--radius': `${radius}rem`,
      },
      savedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTheme}-custom-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const colorsByGroup = React.useMemo(() => {
    return {
      primary: COLOR_VARIABLES.filter(c => c.group === 'primary'),
      secondary: COLOR_VARIABLES.filter(c => c.group === 'secondary'),
      accent: COLOR_VARIABLES.filter(c => c.group === 'accent'),
      base: COLOR_VARIABLES.filter(c => c.group === 'base'),
    };
  }, []);

  const handleOpenPicker = (variable: string) => {
    setPickerVariable(variable);
    setSearchQuery('');
  };

  const handleSelectColor = (color: string) => {
    if (pickerVariable) {
      handleColorChange(pickerVariable, color);
    }
  };

  // Get all color options with labels
  const getAllColorOptions = () => {
    const options: Array<{ label: string; hex: string; colorName: string }> = [];
    TAILWIND_COLORS.forEach(colorGroup => {
      colorGroup.shades.forEach((shade, index) => {
        const label = `${colorGroup.name.toLowerCase()}-${(index + 1) * 50}`;
        options.push({ label, hex: shade, colorName: colorGroup.name });
      });
    });
    return options;
  };

  const allColorOptions = getAllColorOptions();
  const filteredColors = React.useMemo(() => {
    if (!searchQuery) return allColorOptions;
    return allColorOptions.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.colorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderColorSection = (groupKey: string, groupLabel: string, colors: typeof COLOR_VARIABLES) => {
    const isOpen = openSection === groupKey;

    return (
      <div key={groupKey} className="border border-border rounded-lg mb-3 overflow-hidden">
        <button
          onClick={() => setOpenSection(isOpen ? null : groupKey)}
          className="w-full flex items-center justify-between py-4 px-4 hover:bg-muted/50 transition-colors group bg-background"
        >
          <span className="text-sm font-semibold">{groupLabel}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="border-t border-border px-4 py-4 space-y-4 bg-muted/20">
            {colors.map(({ id, label }) => {
              const hexColor = getCurrentColorAsHex(id, customizations);
              return (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id} className="text-xs font-medium block">
                    {label}
                  </Label>
                  <div className="flex gap-2 items-center">
                    {/* Clickable color swatch for HTML5 picker */}
                    <div className="relative flex-shrink-0">
                      <input
                        type="color"
                        value={hexColor}
                        onChange={(e) => handleColorChange(id, e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div
                        className="h-7 w-7 rounded border border-border cursor-pointer hover:border-primary transition-colors"
                        style={{ backgroundColor: hexColor }}
                        title={hexColor}
                      />
                    </div>
                    
                    {/* Hex input */}
                    <Input
                      type="text"
                      value={hexColor}
                      onChange={(e) => {
                        if (e.target.value.startsWith('#')) {
                          handleColorChange(id, e.target.value);
                        }
                      }}
                      placeholder="#000000"
                      className="font-mono text-xs flex-1"
                    />

                    {/* Tailwind Palette Popover */}
                    <Popover open={pickerVariable === id} onOpenChange={(isOpen) => {
                      if (isOpen) {
                        handleOpenPicker(id);
                      } else {
                        setPickerVariable(null);
                      }
                    }}>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <Palette className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom" align="end" className="w-[400px] p-0 border-border">
                        <div className="space-y-4 p-4">
                          {/* Header with search */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Tailwind v4</h3>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search Tailwind colors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-9"
                              />
                            </div>
                          </div>

                          {/* View toggle */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setViewMode('list')}
                              className={`p-2 rounded border transition-colors ${
                                viewMode === 'list'
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'border-border text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <List className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setViewMode('grid')}
                              className={`p-2 rounded border transition-colors ${
                                viewMode === 'grid'
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'border-border text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <Grid3x3 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Color content */}
                          <div className="max-h-[400px] overflow-y-auto">
                            {viewMode === 'list' ? (
                              <div className="space-y-1">
                                {filteredColors.length === 0 ? (
                                  <p className="text-sm text-muted-foreground text-center py-8">No colors found</p>
                                ) : (
                                  filteredColors.map((option) => (
                                    <button
                                      key={option.label}
                                      onClick={() => handleSelectColor(option.hex)}
                                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors text-left text-sm"
                                    >
                                      <div
                                        className="h-5 w-5 rounded border border-border flex-shrink-0"
                                        style={{ backgroundColor: option.hex }}
                                      />
                                      <span className="font-medium capitalize">{option.label}</span>
                                    </button>
                                  ))
                                )}
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {TAILWIND_COLORS.map((colorGroup) => (
                                  <div key={colorGroup.name} className="space-y-2">
                                    <h4 className="text-xs font-semibold text-muted-foreground">{colorGroup.name}</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                      {colorGroup.shades.map((shade) => (
                                        <button
                                          key={shade}
                                          onClick={() => handleSelectColor(shade)}
                                          className="group relative"
                                        >
                                          <div
                                            className="h-10 w-full rounded border border-border hover:border-primary transition-colors"
                                            style={{ backgroundColor: shade }}
                                          />
                                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded bg-black/50">
                                            <span className="text-xs text-white font-mono">{shade}</span>
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[900px] overflow-hidden flex flex-col p-0">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Theme Customization
          </SheetTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Customize colors, typography, radius, and more. Changes are temporary until saved.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="colors" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-background px-4 h-auto">
            <TabsTrigger 
              value="colors" 
              className="rounded-none py-3 px-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent text-foreground/70 data-[state=active]:text-foreground font-semibold hover:bg-muted/50 transition-colors flex items-center justify-center"
            >
              Colors
            </TabsTrigger>
            <TabsTrigger 
              value="typography" 
              className="rounded-none py-3 px-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent text-foreground/70 data-[state=active]:text-foreground font-semibold hover:bg-muted/50 transition-colors flex items-center justify-center"
            >
              Typography
            </TabsTrigger>
            <TabsTrigger 
              value="other" 
              className="rounded-none py-3 px-4 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent text-foreground/70 data-[state=active]:text-foreground font-semibold hover:bg-muted/50 transition-colors flex items-center justify-center"
            >
              Other
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="flex-1 overflow-y-auto mt-0">
            <div className="px-4 py-4 space-y-0">
              {renderColorSection('primary', 'Primary Colors', colorsByGroup.primary)}
              {renderColorSection('secondary', 'Secondary Colors', colorsByGroup.secondary)}
              {renderColorSection('accent', 'Accent Colors', colorsByGroup.accent)}
              {renderColorSection('base', 'Base Colors', colorsByGroup.base)}
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="flex-1 overflow-y-auto mt-0">
            <div className="flex items-center justify-center h-full px-6 py-6">
              <p className="text-xs text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>

          {/* Other Tab */}
          <TabsContent value="other" className="flex-1 overflow-y-auto mt-0">
            <div className="px-4 py-4 space-y-6">
              {/* Radius */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-semibold block mb-4">Border Radius</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">Radius</Label>
                    <span className="text-xs text-muted-foreground font-mono">
                      {radius.toFixed(2)}rem
                    </span>
                  </div>
                  <Slider
                    value={[radius]}
                    onValueChange={(value) => {
                      setRadius(value[0]);
                      setHasChanges(true);
                    }}
                    min={0}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Spacing - Placeholder */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Spacing</h3>
                <p className="text-xs text-muted-foreground">Coming soon...</p>
              </div>

              <div className="h-px bg-border" />

              {/* Shadow - Placeholder */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Shadow</h3>
                <p className="text-xs text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions Footer */}
        <div className="border-t border-border bg-background/95 backdrop-blur-sm px-4 py-3 space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetToDefault}
              className="flex-1"
              disabled={!hasChanges && !hasSavedTheme}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleSaveCustomTheme}
              className="flex-1"
              disabled={!hasChanges}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExportTheme}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {hasSavedTheme && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSavedTheme}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>

          {hasChanges && (
            <p className="text-xs text-muted-foreground text-center">
              You have unsaved changes
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
