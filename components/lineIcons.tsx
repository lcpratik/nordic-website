// Thin black and white line drawings used in the icon rows.
// Each one is a simple SVG so it stays sharp at any size.

import type { ReactElement } from "react";

const common = {
  width: 120,
  height: 100,
  viewBox: "0 0 120 100",
  fill: "none",
  stroke: "#5E6862",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const lineIcons: Record<string, ReactElement> = {
  chair: (
    <svg {...common}>
      <path d="M86 4V28" /><path d="M72 44Q86 22 100 44Z" /><path d="M83 47Q86 51 89 47" /><path d="M24 34C20 52 24 64 34 66L64 64" /><path d="M34 66C30 70 30 72 34 72L66 70C70 70 70 66 64 64" /><path d="M38 72L32 92" /><path d="M62 70L68 92" /><path d="M76 74H100" /><path d="M88 74V92" /><path d="M80 92H96" /><path d="M86 74C84 66 86 62 88 58" /><path d="M90 74C92 66 95 64 98 61" /><path d="M10 92H110" />
    </svg>
  ),
  flags: (
    <svg {...common}>
      <path d="M14 92V18" /><path d="M106 92V30" /><path d="M14 20Q60 46 106 32" /><path d="M24 27H32V36H24Z" /><path d="M38 32H46V41H38Z" /><path d="M52 35H60V44H52Z" /><path d="M65 37H73V46H65Z" /><path d="M79 36H87V45H79Z" /><path d="M93 34H101V43H93Z" /><path d="M24 92V64L36 58L48 64V92" /><path d="M52 92V60H80V92" /><path d="M84 92V68H98V92" /><path d="M32 72H40V80H32Z" /><path d="M58 68H64V76H58Z" /><path d="M68 68H74V76H68Z" /><path d="M62 92V84H70V92" /><path d="M6 92H114" />
    </svg>
  ),
  backpack: (
    <svg {...common}>
      <path d="M6 78L34 36L48 54L66 24L96 70L114 78" /><path d="M59 35L66 24L73 35" /><path d="M60 33L63 36L66 32L69 35L72 33" /><path d="M28 45L34 36L40 45" /><rect x="44" y="56" width="32" height="36" rx="8" /><path d="M46 66Q60 56 74 66" /><rect x="50" y="74" width="20" height="12" rx="3" /><path d="M54 56Q60 48 66 56" /><path d="M8 92H112" />
    </svg>
  ),
  kettle: (
    <svg {...common}>
      <path d="M24 88L28 52Q50 44 72 52L76 88Z" /><path d="M38 48Q50 40 62 48" /><circle cx="50" cy="40" r="3" /><path d="M28 60L14 50L18 48" /><path d="M72 56Q88 60 76 78" /><rect x="84" y="68" width="18" height="20" rx="2" /><path d="M102 72Q110 76 102 84" /><path d="M90 62Q86 56 90 50" /><path d="M96 62Q92 56 96 50" /><path d="M8 92H112" />
    </svg>
  ),
  bed: (
    <svg {...common}>
      <path d="M86 14A12 12 0 1 0 100 32A9 9 0 1 1 86 14Z" /><path d="M62 18V26" /><path d="M58 22H66" /><path d="M40 30V35" /><path d="M37.5 32.5H42.5" /><path d="M14 92V48" /><path d="M14 66H106V92" /><path d="M14 80H106" /><rect x="20" y="56" width="20" height="10" rx="4" /><path d="M44 66Q52 58 106 60V66" /><path d="M6 92H114" />
    </svg>
  ),
  pagoda: (
    <svg {...common}>
      <path d="M60 26V12" /><circle cx="60" cy="9" r="2.5" /><path d="M36 37Q50 34 60 26Q70 34 84 37" /><path d="M46 37V47" /><path d="M74 37V47" /><path d="M26 56Q44 52 60 44Q76 52 94 56" /><path d="M40 55V66" /><path d="M80 55V66" /><path d="M16 74Q40 70 60 62Q80 70 104 74" /><path d="M32 73V86" /><path d="M88 73V86" /><path d="M54 86V78Q60 73 66 78V86" /><path d="M26 86H94V92" /><path d="M26 86V92" /><path d="M18 92H102" />
    </svg>
  ),
  tea: (
    <svg {...common}>
      <path d="M50 46Q44 38 50 30Q56 22 50 14" /><path d="M64 46Q58 38 64 30Q70 22 64 14" /><path d="M32 54H88Q88 80 60 82Q32 80 32 54Z" /><path d="M88 60Q102 60 100 68Q98 76 84 72" /><path d="M20 84Q60 96 100 84" /><path d="M30 84Q60 89 90 84" />
    </svg>
  ),
};
