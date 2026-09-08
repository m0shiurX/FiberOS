# Network Map Redesign — Spec

## Problem Statement

The current Network Map is a proof-of-concept with a flat sidebar of checkboxes, uniform circle markers, and a basic detail panel. The reference design (`docs/reference_design/`) shows a production-grade GIS & Network Inventory console — the actual product FiberOS needs to be. The gap between what we have and what the reference design demonstrates is the difference between a demo and a sellable product.

The reference design includes: a collapsible sidebar with grouped navigation and alarm badges, a global top bar with search and alarm indicator, a map toolbar with view modes and tool palette, a right panel with Layers/Details/Trace tabs, a bottom incident bar, and a map surface that renders 14 distinct node types with status-driven styling, cable types, and telemetry overlays.

## Solution

Redesign the Network Map page to match the reference design's information architecture, visual language, and interaction patterns. This means:

1. **New data model** — add the missing network entities (Rack, ODF, Router, Switch, FDB/FAT, Pole, Manhole, Incident, Alarm, Telemetry, Splice, Port) so the map can render the full network hierarchy
2. **New design tokens** — adopt the reference design's color system (amber/red/violet, status colors), typography (Space Grotesk + Inter), spacing, radius, elevation, and motion tokens
3. **New UI components** — sidebar with collapsible groups, top bar, map toolbar, right panel with tabs, incident bar
4. **New map rendering** — distinct shapes per node type, cable styling by type, status rings, trace highlighting, incident beacons, telemetry halos
5. **New API payloads** — extend the network map payload to include new asset types, telemetry, and incidents
6. **New seeder** — populate the reference design's dataset (Bogura region, 12 POPs, 9 OLTs, 5,214 subscribers)

## User Stories

### Navigation & Layout

1. As an ISP operator, I want a collapsible sidebar with grouped navigation, so that I can quickly switch between Dashboard, Network Map, Organization, Network, Monitoring, and Settings sections
2. As an ISP operator, I want alarm badges on sidebar items, so that I can see at a glance which sections require attention
3. As an ISP operator, I want an environment indicator in the sidebar footer, so that I know which region/POP I'm viewing
4. As an ISP operator, I want a global search bar in the top navigation, so that I can search across all asset types from anywhere in the application
5. As an ISP operator, I want an alarm bell with critical count in the top bar, so that I can see active alarms without navigating away
6. As an ISP operator, I want a quick-add button in the top bar, so that I can rapidly create new assets
7. As an ISP operator, I want an account chip in the top bar, so that I can see who is logged in and access profile actions

### Map Toolbar

8. As an ISP operator, I want view mode options (Location, Network, Logical, Coordinates), so that I can switch between physical and logical network representations
9. As an ISP operator, I want a tool palette (Select, Add, Draw, Measure, Trace, Impact), so that I can perform common map interactions
10. As an ISP operator, I want a live telemetry indicator, so that I know the map is receiving real-time data
11. As an ISP operator, I want a status line showing current selection and coordinates, so that I have context for my current view

### Map Surface

12. As an ISP operator, I want distinct visual shapes for each node type (POP, Rack, OLT, Router, Switch, ODF, Closure, Splitter, FDB, ONU, Pole, Manhole), so that I can instantly identify asset types on the map
13. As an ISP operator, I want status-driven coloring (green=healthy, amber=warning, red=critical, gray=offline), so that I can spot problems at a glance
14. As an ISP operator, I want cable styling by type (feeder=blue thick, distribution=cyan medium, drop=gray dashed), so that I can distinguish cable roles
15. As an ISP operator, I want selection rings on selected assets, so that I can see what's currently selected
16. As an ISP operator, I want trace highlighting that dims unrelated assets and brightens the path, so that I can follow a network trace visually
17. As an ISP operator, I want incident beacons (pulsing red markers), so that I can see active faults on the map
18. As an ISP operator, I want telemetry halos (amber circles for signal/capacity warnings), so that I can see live problem areas
19. As an ISP operator, I want connection links between assets, so that I can see the physical wiring

### Right Panel — Layers Tab

20. As an ISP operator, I want grouped layer controls (Sites, Active Equipment, Passive Optical, Fiber, Operational), so that I can organize what I see on the map
21. As an ISP operator, I want visibility toggles with counts per layer, so that I can see how many assets are in each layer and toggle them on/off
22. As an ISP operator, I want color swatches next to layer labels, so that I can identify layers by their map color
23. As an ISP operator, I want show/hide all buttons, so that I can quickly reset layer visibility

### Right Panel — Details Tab

24. As an ISP operator, I want asset details with kind label, name, and status pill, so that I can see what I've selected
25. As an ISP operator, I want a fields list with label-value pairs, so that I can see all asset properties
26. As an ISP operator, I want a telemetry block with live metrics (Rx/Tx power, distance, temperature), so that I can see device health
27. As an ISP operator, I want an expected vs live optical budget comparison, so that I can detect signal degradation
28. As an ISP operator, I want a connectivity chain showing upstream/downstream relationships, so that I can understand network topology
29. As an ISP operator, I want action buttons (Open Details, Trace, Monitor), so that I can drill into assets or run operations

### Right Panel — Trace Tab

30. As an ISP operator, I want a physical path visualization with hops, so that I can see the full route from subscriber to OLT
31. As an ISP operator, I want route statistics (distance, splice count), so that I can assess the trace
32. As an ISP operator, I want a zoom-to-route button, so that I can frame the entire trace on the map
33. As an ISP operator, I want a clear trace button, so that I can reset the trace state

### Bottom Incident Bar

34. As an ISP operator, I want an active incident indicator at the bottom of the map, so that I can see the current fault without navigating away
35. As an ISP operator, I want incident details (ID, cable, affected subscribers, segment), so that I can assess the incident
36. As an ISP operator, I want an open button on the incident bar, so that I can navigate to the full incident record

### Asset Types

37. As an ISP operator, I want to see Racks on the map, so that I can identify where equipment is housed
38. As an ISP operator, I want to see ODFs on the map, so that I can identify fiber handover points
39. As an ISP operator, I want to see Routers on the map, so that I can identify edge routing equipment
40. As an ISP operator, I want to see Switches on the map, so that I can identify aggregation switches
41. As an ISP operator, I want to see FDBs/FATs on the map, so that I can identify subscriber distribution points
42. As an ISP operator, I want to see Poles on the map, so that I can identify aerial infrastructure
43. As an ISP operator, I want to see Manholes on the map, so that I can identify underground infrastructure

### Data & Seeding

44. As an ISP operator, I want the map seeded with a realistic Bogura region dataset (12 POPs, 9 OLTs, 5,214 subscribers), so that the demo reflects a real network
45. As an ISP operator, I want telemetry data seeded for each device, so that the map shows live metrics
46. As an ISP operator, I want at least one active incident seeded, so that the incident bar is populated

## Implementation Decisions

### New Models & Migrations

The following new Eloquent models and migrations are required:

- **Rack** — belongs to POP, has many OLTs, ODFs, Switches. Fields: `code`, `name`, `rack_units`, `occupied_units`, `vendor`, `model`, `power_capacity`, `location`
- **Odf** — belongs to Rack. Fields: `code`, `name`, `type`, `vendor`, `model`, `serial`, `port_count`, `connector_type`, `polish_type`, `location`
- **OdfPort** — belongs to Odf. Fields: `port_number`, `front_connection`, `back_connection`, `status` (available/connected/reserved/faulty/disabled)
- **Router** — belongs to Rack. Fields: `code`, `name`, `vendor`, `model`, `router_type`, `os`, `firmware`, `serial`, `management_ip`, `mac`, `location`
- **Switch** — belongs to Rack. Fields: `code`, `name`, `vendor`, `model`, `layer`, `os`, `firmware`, `serial`, `management_ip`, `mac`, `vlan`, `location`
- **Fdb** (Fiber Distribution Box / Fiber Access Terminal) — belongs to Pole or standalone. Fields: `code`, `name`, `type`, `port_count`, `ports_used`, `fed_by_cable`, `fed_by_core`, `location`
- **FdbPort** — belongs to Fdb. Fields: `port_number`, `status` (available/reserved/connected/faulty), `drop_cable_id`, `onu_id`
- **Pole** — standalone. Fields: `code`, `name`, `type`, `height`, `owner`, `location`
- **Manhole** — standalone. Fields: `code`, `name`, `type`, `duct_count`, `slack_length`, `location`
- **Splice** — belongs to SpliceClosure. Fields: `tray_number`, `splice_number`, `source_cable_id`, `source_core`, `dest_cable_id`, `dest_core`, `loss_db`, `technician`, `date`
- **Incident** — belongs to FiberCable (optional). Fields: `code`, `type`, `severity`, `cable_id`, `affected_subscribers`, `first_detected`, `duration`, `status`, `description`
- **Alarm** — belongs to any asset (polymorphic). Fields: `code`, `severity`, `message`, `asset_type`, `asset_id`, `acknowledged`
- **Telemetry** — belongs to any asset (polymorphic). Fields: `asset_type`, `asset_id`, `rx_power`, `tx_power`, `olt_rx`, `distance`, `temperature`, `voltage`, `last_seen`

### Model Relationships

The graph model follows the reference design's NODE + PORT + CONNECTION pattern:

- **Nodes**: Pop, Rack, Olt, Odf, Router, Switch, SpliceClosure, Splitter, Fdb, Onu, Pole, Manhole
- **Ports**: Olt PonPort, OdfPort, SplitterPort, FdbPort, SwitchPort
- **Connections**: FiberCable (edge between nodes), Splice (edge within closure), DropCable (edge from FDB to ONU)

### API Contract Changes

The `BuildNetworkMapPayload` action must be extended to include:

- New GeoJSON layers: `racks`, `odfs`, `routers`, `switches`, `fdbs`, `poles`, `manholes`, `incidents`
- New detail records: `rack`, `odf`, `router`, `switch`, `fdb`, `pole`, `manhole`, `incident`
- Telemetry data per asset: `rx_power`, `tx_power`, `olt_rx`, `distance`, `temperature`, `voltage`, `last_seen`
- Layer counts per group for the Layers tab
- Active alarm count for the sidebar badge
- Active incident for the bottom bar

New API endpoints:

- `GET /api/telemetry/{asset}/{id}` — returns live telemetry for an asset
- `GET /api/incidents` — returns active incidents
- `GET /api/alarms` — returns active alarms with counts by severity

### Design Token Integration

The reference design's design system (`docs/reference_design/_ds/fiberos-design-system-29ce8d0f-059e-49bc-b6de-dd013c1ceecb/`) must be integrated into the Tailwind config:

- **Colors**: blue ramp, cyan ramp, green ramp, amber ramp, red ramp, violet, neutral ramp, ink-900
- **Semantic aliases**: bg-canvas, bg-subtle, surface-card, text-primary, text-secondary, text-muted, border-hairline, action-primary, status-ok, status-warn, status-critical, status-info, status-active, status-idle
- **Typography**: Space Grotesk (display), Inter (body), with specific sizes, weights, line-heights, and letter-spacing
- **Spacing**: 4px base unit, with specific values (4, 8, 12, 17, 16, 20, 24, 32, 40, 48, 80)
- **Radius**: xs(5px), sm(8px), md(11px), lg(18px), xl(22px), pill(9999px), full(50%)
- **Elevation**: hairline borders, popover shadow, dialog shadow, focus ring, frosted glass
- **Motion**: instant(80ms), fast(140ms), base(220ms), slow(380ms), ease-standard, ease-out, ease-in

### Map Rendering

The `NetworkMapCanvas` component must be extended to render 14 distinct node types with distinct shapes:

| Node Type | Shape | Size | Color |
|-----------|-------|------|-------|
| POP | Rounded square | 16px | blue-600 |
| Rack | White square with border | 11px | n-600 border |
| OLT | Rounded square | 14px | violet-500 |
| Router | Rounded square | 12px | ink-900 |
| Switch | Rounded square | 12px | n-600 |
| ODF | Square | 12px | cyan-500 |
| Closure | Diamond (rotated square) | 12px | cyan-500 |
| Splitter | Circle | 11px | ink-900 |
| FDB | White square with thick border | 12px | ink-900 border |
| ONU | Circle | 9px | green-500 |
| Pole | Circle | 7px | n-400 |
| Manhole | White square with border | 9px | n-400 border |
| Incident | Circle with pulse | 16px | red-500 |
| Warning | Circle halo | 13px | amber-500 |

Cable styling:
- Feeder: blue-600, 3.5px, 0.85 opacity
- Distribution: cyan-500, 2.5px, 0.85 opacity
- Drop: n-400, 1.5px, 0.9 opacity, dashed (3 4)

### UI Component Breakdown

New Vue components:

- `AppSidebar.vue` — collapsible sidebar with grouped navigation, badges, environment indicator
- `TopBar.vue` — global search, alarm bell, quick-add button, account chip
- `MapToolbar.vue` — view mode segmented control, tool palette, telemetry indicator, status line
- `RightPanel.vue` — tabbed panel (Layers, Details, Trace)
- `LayersTab.vue` — grouped layer controls with toggles, counts, swatches
- `DetailsTab.vue` — asset details with fields, telemetry block, connectivity chain, action buttons
- `TraceTab.vue` — physical path visualization with hops, route stats, zoom/clear buttons
- `IncidentBar.vue` — bottom incident indicator with details and open button

### Seeder

A new `ReferenceDesignSeeder` must be created that populates the full dataset from the reference design's JavaScript data (the `NODES`, `ONUS`, `CABLES`, `UPSTREAM`, `LAYER_GROUPS` arrays in `FiberOS Network Map.dc.html`). This replaces the current `NetworkTopologySeeder` for demo purposes.

### Testing Strategy

- Feature tests for the Network Map page must verify all new layers are present in the payload
- Feature tests for the trace endpoint must verify the full hop sequence
- Feature tests for telemetry endpoints must verify correct data structure
- Feature tests for the seeder must verify all asset types are created
- Unit tests for the `BuildNetworkMapPayload` action must verify the new structure

## Testing Decisions

### What to Test

- **External behavior only**: Test that the API returns the correct data structure, not how the data is assembled
- **Page rendering**: Test that the Network Map page renders with all required props
- **Trace correctness**: Test that the trace endpoint returns the correct hop sequence from subscriber to OLT
- **Impact analysis**: Test that splitter and fiber impact endpoints return correct affected counts
- **Seeder completeness**: Test that the seeder creates all required asset types with correct counts
- **Telemetry structure**: Test that telemetry data is correctly associated with assets

### Prior Art

- `tests/Feature/NetworkMapTest.php` — existing tests for layers, details, trace, and impact
- `tests/Feature/NetworkMapTest.php` — pattern for inertia page assertions
- `tests/Feature/Auth/` — pattern for feature test structure

### Test Data

- Use the reference design's dataset (Bogura region, 12 POPs, 9 OLTs, 5,214 subscribers)
- Seed at least one active incident (INC-1045, DC-019, 8 subscribers offline)
- Seed telemetry for each ONU (Rx power, distance, temperature)

## Out of Scope

- **Authentication** — the POC skips auth per `tech-decisions.md`
- **Real telemetry** — all telemetry is seeded/static, not live-polled
- **Mobile Technician View** — separate POC screen, not part of this redesign
- **Asset Details page** — separate POC screen, not part of this redesign
- **Dashboard page** — separate page, not part of this redesign
- **Settings pages** — not part of this redesign
- **Organization/Network list pages** — not part of this redesign
- **Monitoring pages** (Network Health, Optical Signals, Alarms, Incidents) — not part of this redesign
- **CRUD forms** — the redesign focuses on the map surface, not asset creation/editing
- **Offline/PWA support** — deferred per `tech-decisions.md`
- **Multi-tenancy** — single-tenant POC
- **Bangla localization** — English only for now

## Further Notes

- The reference design's `fiber-map.js` uses Leaflet, but the current codebase uses MapLibre GL JS. The redesign should stick with MapLibre (already a dependency) and adapt the rendering concepts (distinct shapes, cable styling, status rings) to MapLibre's circle/symbol layers.
- The design system CSS files in `docs/reference_design/_ds/fiberos-design-system-29ce8d0f-059e-49bc-b6de-dd013c1ceecb/` should be referenced for exact token values, not recreated from scratch.
- The reference design's dataset (`NODES`, `ONUS`, `CABLES`, `UPSTREAM` arrays in `FiberOS Network Map.dc.html`) is the source of truth for the new seeder.
- The current `NetworkTopologySeeder` uses real Bogura coordinates from OpenStreetMap — the new seeder should preserve this approach for the expanded dataset.
