# FiberOS Design System

A minimal UI design system for **FiberOS**, a network monitoring platform. It exists to make network operations legible: dense telemetry, calm surfaces, one blue that means "act".

The system is deliberately small. It is built to assemble monitoring dashboards — rails, cards, tables, meters and charts — not to cover every UI pattern a product might one day need.

---

## Sources this system was built from

| Source | What it gave us | Path |
|---|---|---|
| FiberOS brand sheet (PNG) | Logo lockups, app mark, the six brand colours, Space Grotesk + Inter, sample UI pills and buttons | `uploads/fiberos.png`, extracted to `assets/` |
| Apple design analysis (Markdown) | The *structural* language — spacing rhythm, radius ladder, hairline-not-shadow elevation, press-scale interaction, one-accent discipline. **Its colours were explicitly replaced with the FiberOS palette.** | `uploads/DESIGN-apple.md` |
| Product screenshots (5 × WebP) | The console's information architecture, card inventory, table columns, copy and chart types | mounted folder `Network/`, copied to `sources/` |

**No application source code, Figma file or font binaries were provided.** Everything below was derived from the brand sheet, the written design analysis and the rendered screenshots. Where the screenshots and the brand sheet disagreed (the screenshots run a dark, orange-accented theme), the brief resolved it: **FiberOS brand colours win.**

---

## Content fundamentals

FiberOS copy sounds like a competent operator on a quiet shift: factual, specific, unexcited.

- **Voice.** Third person about the system, never first person. "Server-03 experienced a temporary issue resolving domain names." Not "We noticed…", not "Your server is in trouble!"
- **Second person only for the operator's own things.** "Welcome Back, ADM1013-10" addresses the person; everything else describes machines.
- **Casing.** Title Case for card titles, nav items and column headers — *Traffic by Application*, *Top Sources & Destinations*, *Mac Address*, *RX (Mbps)*. Sentence case for descriptive body copy. **Never all-caps**, not even for table headers or eyebrows.
- **Length.** Card titles are 1–4 words. Alarm bodies are one or two sentences: what happened, on which host, what it affects. Status labels are one or two words — Online, Healthy, Warning, Blocked, Maintenance.
- **Numbers carry the meaning, words carry the label.** A metric is a quiet grey label and a loud tabular figure: `Latency (avg)` · **15.6** `ms`. Units are always separated, smaller, and muted.
- **Precision.** Real IPs, MACs, ports, hostnames and device names (`iPhone-15`, `Cisco-Router 2800s`, `AP-Hall-East`). One decimal for rates, two for volumes, percentages whole. Relative time in the alarm feed — "4 Min", "1 h".
- **No emoji. No exclamation marks. No jokes.** Anywhere.
- **Empty states are usually good news.** "No active alarms — every monitored device reported healthy in the last hour."
- **Buttons are verbs**: Add device, Export, Acknowledge all, Assign group. Never "Submit", never "Click here".

---

## Visual foundations

### Colour
Six brand colours, taken verbatim from the brand sheet: Action Blue `#2563EB` (primary), Ink `#0B1220` (navigation/depth), Cyan `#00B8D9` (accent, live/realtime), Green `#16C784` (success), Surface `#F5F7FA`, Background `#FFFFFF`. Amber `#F5A524` and Red `#E5484D` are **intentional additions** — a monitoring product cannot express warning and critical without them; they are semantic only and never used decoratively.

One accent rule: every "click me" is Action Blue. Cyan marks *live* state, not action. Green means healthy, not "primary".

The neutral ramp is hue-locked to Ink 900, so greys read as the same family as the navigation rail rather than as a separate cool grey.

### Type
**Space Grotesk** (500/600/700) for display, headings, card titles and every metric. **Inter** (400/500/600) for body, labels, table content and captions. Negative tracking at every size ≥ 17px; the ladder is 400 / 500 / 600 / 700 — weight 300 is not used.

Body runs at **15px** in the app (the density a NOC needs), with 17px reserved for empty states and marketing surfaces. There is **no monospace font**: addresses, ports and figures use Inter with `font-variant-numeric: tabular-nums`, which aligns columns without introducing a third family.

### Backgrounds
Flat colour only. `#F5F7FA` page, `#FFFFFF` cards, `#0B1220` navigation. **No gradients**, no photography, no illustration, no texture, no pattern. The single gradient in the system is the fade under a `SparkArea` curve, and it fades to zero.

### Cards
White fill, **1px `#DDE3EC` hairline, 18px radius, no shadow**, 20px padding. Depth comes from the hairline and the grey page behind it. Card title is Space Grotesk 17/500; an optional muted 13px subtitle; a right-aligned action slot that is nearly always the "…" IconButton.

### Elevation
Four levels, and only two of them cast: flat (everything), hairline (cards, inputs, table rules), popover shadow (menus), dialog shadow (modals). Sticky bars use `rgba(245,247,250,.80)` + `saturate(180%) blur(20px)`. Shadows never appear on cards, buttons, text or charts.

### Corner radii
`5` chips · `8` inputs and compact utility buttons · `11` buttons, menus, segmented controls · `18` cards and dialogs · `22` app tiles · `pill` status pills, search fields and the single hero CTA. Nothing in between; don't invent a 12 or a 16.

### Borders
One hairline weight, 1px. `#DDE3EC` on light, `rgba(255,255,255,.10)` on Ink. Borders separate; they never decorate. No coloured left-border accents on cards.

### Spacing
4px base: 4 · 8 · 12 · **17** · 24 · 32 · 48 · 80 (17 comes from the source kit and is kept exactly). Dense-data additions: 16 (grid gutter) and 20 (card padding). Layout constants: rail 56, sidebar 248, topbar 56, table row 48, content max 1440.

### Hover, press, focus
- **Hover** lightens or tints — never moves, never scales, never shadows. Ghost controls take `#EDF0F5`; table rows take `#F5F7FA`; primary buttons step to `#1D4ED8`.
- **Press** is `scale(0.97)` (0.95 for pill CTAs) at 80ms. The scale *is* the press feedback; the colour does not flash.
- **Focus** is a 2px Action Blue ring plus a 3px 28%-blue halo. Always visible, never removed.

### Motion
80 / 140 / 220 / 380ms with `cubic-bezier(.4, 0, .2, 1)`. Colour and opacity transitions only, plus the press scale. **No entrance animation on data** — a chart that animates in is a chart you can't read at a glance. No bounce, no parallax, no marquee. Reduced-motion is honoured globally.

### Transparency & blur
Used in exactly two places: the frosted sticky bar/topbar treatment, and the 6%-white active fill in the dark navigation. Nothing else is translucent.

### Imagery
There is none, by design. The product surface carries no photography or illustration; the only raster assets are the FiberOS logo lockups and app mark. If a future surface needs imagery, it should be cool-toned, low-saturation and never placed behind text.

### Data visualisation
Fixed series order `--viz-1…6` (blue, cyan, green, violet, amber, red). RX is green, TX is blue, inbound-vs-outbound bar pairs are neutral grey vs Action Blue. Grids are 1px dashed `#DDE3EC`. Heatmaps are single-hue with opacity carrying magnitude. Composition rings are drawn as **dots, never as solid pie wedges**. Utilisation colour is derived from thresholds (≥90 critical, ≥75 warning) so the same number is always the same colour product-wide.

---

## Iconography

**Lucide** (`lucide-static`, loaded from jsDelivr, masked to `currentColor` by the `Icon` component). The source screenshots use a thin, rounded, single-weight outline set; Lucide is the closest CDN-available match. **This is a substitution — flagged.** If FiberOS ships its own icon set, drop the SVGs into `assets/icons/` and repoint `components/core/Icon.jsx`.

- Outline only. No filled glyphs, no duotone, no brand-coloured icons except where a status colour applies.
- Sizes: **14** inside pills and badges, **16** in tables, buttons and nav lists, **18–20** in the rail and topbar.
- Icons are decorative companions to a label; icon-only controls always carry a `label` prop for the tooltip and screen reader.
- Recurring glyphs: `house`, `radio`, `box`, `monitor`, `database`, `clock`, `lock`, `layout-dashboard`, `chart-line`, `chart-column`, `shield-check`, `cloud`, `folder`, `bell`, `layers`, `search`, `calendar`, `ellipsis`, `chevron-right`, `chevron-down`, `upload`, `refresh-cw`, `triangle-alert`, `circle-check`, `server`, `router`, `hard-drive`.
- **No emoji, ever.** No unicode symbols used as icons except the arrow glyphs inside delta pills.
- The brand mark is the only non-Lucide graphic: `assets/app-icon.png` in the rail, `assets/logo-fiberos.png` on light chrome, `assets/logo-fiberos-mono.png` where a single colour is required.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link (imports only)
- `readme.md` — this file
- `SKILL.md` — Agent Skills wrapper
- `thumbnail.html` — homepage tile

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css`

**`assets/`** — `logo-fiberos.png`, `logo-fiberos-mono.png`, `app-icon.png`, `brand-sheet.png`

**`guidelines/`** — 16 specimen cards across Colors, Type, Spacing and Brand

**`sources/`** — the five product screenshots this system was recreated from

### Components

| Group | Components |
|---|---|
| `components/core/` | **Icon**, **Button**, **IconButton**, **StatusPill**, **Badge**, **Card**, **Tag** |
| `components/forms/` | **Input**, **SearchField**, **Select**, **Checkbox**, **Switch**, **SegmentedControl** |
| `components/navigation/` | **AppRail**, **NavPanel**, **Topbar**, **AccountChip** |
| `components/data/` | **StatTile**, **DataTable**, **MetricList**, **StackedBar**, **UtilizationBar**, **DonutGauge**, **SparkArea**, **BarChart**, **Heatmap** |
| `components/feedback/` | **AlertItem**, **EmptyState** |

### UI kits
- `ui_kits/fiberos-console/` — the monitoring console: Overview, Traffic, Inventory, Alarm

### Intentional additions
No source defined a component inventory, so the set above was authored to the product's needs. Three additions are worth naming explicitly:
- **Icon** — a wrapper over the substituted Lucide set, so the glyph source can be swapped in one file.
- **Amber and red ramps** — the brand sheet has no warning or critical colour; a monitoring product requires both.
- **Space tokens 16 / 20 / 40** — the source spacing scale is tuned for marketing density; dashboards need the intermediate steps.

### Known gaps
- No font binaries were supplied; Space Grotesk and Inter load from Google Fonts (both are the genuine families named on the brand sheet, so this is a delivery mechanism, not a substitution).
- The icon set is a substitution (see Iconography).
- No dark theme is defined. The screenshots show a dark product; the brand sheet defines a light one. Ink 900 is currently scoped to navigation only — say the word and a full dark surface set can be added.
- Service, Server, Storage and Virtualization screens have no source material and are deliberately blank in the UI kit.
