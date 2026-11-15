// Thin line illustrations used in place of photographs on the Explore page.
// Each one sits in the same ".ph" container as the placeholder it replaces, so size, position,
// background and the reveal animation stay exactly the same.

import type { ReactNode } from "react";

const INK = "#4a443e";
const line = { fill: "none", stroke: INK, strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const soft = { ...line, strokeWidth: 0.7, opacity: 0.55 } as const;

function Frame({ tone = 1, label, viewBox = "0 0 400 300", children }: { tone?: 1 | 2 | 3; label: string; viewBox?: string; children: ReactNode }) {
  const bg = tone === 1 ? "var(--stone)" : tone === 2 ? "var(--stone-2)" : "var(--stone-3)";
  return (
    <div className="ph" style={{ aspectRatio: "4 / 3", background: bg, padding: "22px 26px" }} role="img" aria-label={label}>
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ flex: 1, minHeight: 0, width: "100%" }}>
        {children}
      </svg>
    </div>
  );
}

/** Tile lines fanning between a roof's lower and upper edge. */
function roofLines(y1: number, y2: number, bx0: number, bx1: number, tx0: number, tx1: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / (n + 1);
    return <line key={i} x1={bx0 + (bx1 - bx0) * t} y1={y1} x2={tx0 + (tx1 - tx0) * t} y2={y2} />;
  });
}

/** A small window with a cross lattice. */
function Lattice({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} {...soft} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} {...soft} />
    </g>
  );
}

function Flags({ points, size = 4 }: { points: [number, number][]; size?: number }) {
  return (
    <g>
      {points.map(([x, y], i) => (
        <path key={i} d={`M${x - size} ${y} L${x + size} ${y} L${x} ${y + size * 2} Z`} />
      ))}
    </g>
  );
}

/** Old City Nearby: a pagoda temple, a stone shikhara temple and a historic Newari house. */
export function OldCityIllustration({ tone = 1 }: { tone?: 1 | 2 | 3 }) {
  return (
    <Frame tone={tone} viewBox="0 58 400 242" label="Line drawing of a Kathmandu pagoda temple, a stone temple and a historic house">
      <g {...line}>
        {/* ground and steps */}
        <path d="M18 262 H382" />
        <path d="M112 262 V253 H288 V262" />
        <path d="M126 253 V244 H274 V253" />

        {/* pagoda: walls */}
        <rect x="160" y="207" width="80" height="36" />
        <path d="M180 207 V243 M220 207 V243" {...soft} />
        <path d="M192 243 V226 a8 8 0 0 1 16 0 V243" />
        <rect x="172" y="170" width="56" height="16" />
        <rect x="182" y="137" width="36" height="13" />
        <Lattice x={178} y={173} w={11} h={10} />
        <Lattice x={211} y={173} w={11} h={10} />
        <Lattice x={194} y={140} w={12} h={7} />
        {/* pagoda: roofs, lowest to highest */}
        <path d="M118 204 Q124 209 133 207 H267 Q276 209 282 204 L238 186 H162 Z" />
        <g {...soft}>{roofLines(207, 186, 138, 262, 168, 232, 9)}</g>
        <path d="M140 167 Q146 172 153 170 H247 Q254 172 260 167 L228 150 H172 Z" />
        <g {...soft}>{roofLines(170, 150, 156, 244, 177, 223, 7)}</g>
        <path d="M158 135 Q163 139 170 137 H230 Q237 139 242 135 L218 121 H182 Z" />
        <g {...soft}>{roofLines(137, 121, 173, 227, 186, 214, 5)}</g>
        {/* roof supports */}
        <path d="M160 226 L141 208 M240 226 L259 208 M168 222 L155 208 M232 222 L245 208" {...soft} />
        <path d="M173 183 L159 171 M227 183 L241 171" {...soft} />
        {/* pinnacle */}
        <path d="M192 121 V113 H208 V121" />
        <path d="M196 113 L198 99 H202 L204 113" />
        <path d="M192 99 H208 M195 93 H205 M200 93 V84" />
        <circle cx="200" cy="80" r="2.5" />
        {/* eave bells */}
        <g fill={INK} stroke="none">
          <circle cx="118" cy="206" r="1.6" />
          <circle cx="282" cy="206" r="1.6" />
          <circle cx="140" cy="169" r="1.4" />
          <circle cx="260" cy="169" r="1.4" />
        </g>

        {/* stone shikhara temple */}
        <path d="M44 262 V256 H96 V262" />
        <path d="M52 256 V228 C52 196 61 164 70 134 C79 164 88 196 88 228 V256 Z" />
        <g {...soft}>
          {[236, 216, 198, 181, 165, 150].map((y) => {
            const h = Math.min(18, (18 * (y - 134)) / 94);
            return <line key={y} x1={70 - h} y1={y} x2={70 + h} y2={y} />;
          })}
        </g>
        <path d="M63 256 V244 a7 7 0 0 1 14 0 V256" />
        <path d="M64 134 H76 M70 134 V120 M70 118 V106" />
        <circle cx="70" cy="117" r="3" />

        {/* prayer flags between the two towers */}
        <path d="M70 106 Q135 104 200 80" {...soft} />
        <Flags points={[[96, 104.5], [122, 101], [148, 96], [174, 89]]} size={3.6} />

        {/* historic brick house */}
        <rect x="302" y="206" width="74" height="56" />
        <path d="M294 208 L339 184 L384 208 Z" />
        <g {...soft}>
          <path d="M324 192 H354 M309 200 H369" />
          <path d="M302 234 H376" />
        </g>
        <Lattice x={310} y={214} w={16} h={16} />
        <Lattice x={331} y={214} w={16} h={16} />
        <Lattice x={352} y={214} w={16} h={16} />
        <path d="M331 262 V241 H349 V262" />
        <Lattice x={310} y={242} w={14} h={12} />
        <Lattice x={357} y={242} w={12} h={12} />
        {/* brick texture */}
        <g {...soft} strokeDasharray="5 4">
          <path d="M303 240 H328 M351 240 H375 M303 258 H330 M350 258 H375" />
        </g>

        {/* paving */}
        <g {...soft} strokeDasharray="6 5">
          <path d="M30 271 H370 M60 280 H340" />
        </g>
      </g>
    </Frame>
  );
}

/** Gateway to the Himalaya: snow peaks, terraced hills, a trail and a small mountain house. */
export function HimalayaIllustration({ tone = 3 }: { tone?: 1 | 2 | 3 }) {
  return (
    <Frame tone={tone} label="Line drawing of Himalayan peaks, a trekking trail and a small traditional house">
      <g {...line}>
        {/* sun and cloud */}
        <circle cx="330" cy="50" r="13" />
        <g {...soft}>
          <path d="M40 62 H86 M52 70 H90" />
        </g>

        {/* mountain range */}
        <path d="M0 196 L52 148 L78 166 L132 96 L158 120 L212 54 L248 104 L276 84 L338 164 L366 142 L400 172" />
        {/* snow lines */}
        <path d="M188 84 L197 91 L204 82 L213 93 L221 84 L230 95 L238 90 L245 100" />
        <path d="M112 122 L120 128 L126 118 L133 130 L141 120 L148 126 L154 116" />
        <path d="M254 99 L262 104 L268 96 L276 106 L283 99 L290 105 L295 108" />
        {/* shaded ridges */}
        <g {...soft}>
          <path d="M205 96 L196 140 M214 94 L212 150 M225 98 L232 150 M238 98 L252 140" />
          <path d="M135 128 L128 160 M142 124 L150 160" />
          <path d="M290 112 L282 150 M300 120 L306 160" />
          <path d="M60 156 L56 178 M68 160 L70 184" />
        </g>

        {/* hills and terraces */}
        <path d="M0 206 C50 190 100 212 160 200 C220 188 270 214 330 200 C360 194 380 198 400 196" />
        <g {...soft}>
          <path d="M250 214 C290 206 340 214 400 208" />
          <path d="M240 226 C290 216 350 226 400 220" />
          <path d="M210 240 C270 230 340 240 400 234" />
        </g>

        {/* small mountain house with prayer flags */}
        <rect x="336" y="194" width="34" height="18" />
        <path d="M331 196 L353 180 L375 196 Z" />
        <path d="M339 190 H367" {...soft} />
        <path d="M349 212 V202 H356 V212" />
        <rect x="340" y="199" width="6" height="6" />
        <path d="M326 212 H382" />
        <path d="M318 212 V186" />
        <path d="M318 187 Q335 192 353 180" {...soft} />
        <Flags points={[[328.3, 188.4], [337, 187.4], [345.8, 184.1]]} size={2.8} />

        {/* trekking trail and cairn */}
        <path d="M96 298 C170 286 130 262 200 252 S262 236 300 226 S322 218 336 212" strokeDasharray="5 4" />
        <ellipse cx="252" cy="238" rx="6" ry="2.8" />
        <ellipse cx="252" cy="233.5" rx="4.5" ry="2.4" />
        <ellipse cx="252" cy="229.5" rx="3" ry="2" />

        {/* foreground ground and pines */}
        <path d="M0 268 C60 256 130 276 220 268 S340 258 400 264" />
        <path d="M46 272 V264 M46 214 L36 236 H56 Z M46 226 L33 250 H59 Z M46 240 L30 264 H62 Z" />
        <path d="M76 270 V263 M76 226 L68 244 H84 Z M76 236 L65 256 H87 Z M76 247 L62 263 H90 Z" />
        <path d="M20 270 V266 M20 242 L14 256 H26 Z M20 250 L11 264 H29 Z" />
      </g>
    </Frame>
  );
}
