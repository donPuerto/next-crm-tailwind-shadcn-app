import {
    Architects_Daughter,
    DM_Sans,
    Fira_Code,
    Geist,
    Geist_Mono,
    Instrument_Sans,
    Inter,
    Mulish,
    Noto_Sans_Mono,
    Outfit,
    Space_Mono
} from 'next/font/google';

import { cn } from '@/lib/utils';

// Define all fonts
export const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap'
});

export const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap'
});

export const fontInstrument = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-instrument',
    display: 'swap'
});

export const fontNotoMono = Noto_Sans_Mono({
    subsets: ['latin'],
    variable: '--font-noto-mono',
    display: 'swap'
});

export const fontMullish = Mulish({
    subsets: ['latin'],
    variable: '--font-mullish',
    display: 'swap'
});

export const fontInter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

export const fontArchitectsDaughter = Architects_Daughter({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-architects-daughter',
    display: 'swap'
});

export const fontDMSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap'
});

export const fontFiraCode = Fira_Code({
    subsets: ['latin'],
    variable: '--font-fira-code',
    display: 'swap'
});

export const fontOutfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap'
});

export const fontSpaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-space-mono',
    display: 'swap'
});

// Export combined font variables for body className
export const fontVariables = cn(
    fontSans.variable,
    fontMono.variable,
    fontInstrument.variable,
    fontNotoMono.variable,
    fontMullish.variable,
    fontInter.variable,
    fontArchitectsDaughter.variable,
    fontDMSans.variable,
    fontFiraCode.variable,
    fontOutfit.variable,
    fontSpaceMono.variable
);

// Export font classNames for direct use
export const fonts = {
    sans: fontSans.className,
    mono: fontMono.className,
    instrument: fontInstrument.className,
    notoMono: fontNotoMono.className,
    mullish: fontMullish.className,
    inter: fontInter.className,
    architectsDaughter: fontArchitectsDaughter.className,
    dmSans: fontDMSans.className,
    firaCode: fontFiraCode.className,
    outfit: fontOutfit.className,
    spaceMono: fontSpaceMono.className
};