## Key product screen: proof-of-concept specification

Build the POC around **one unified GIS workspace**, not a full dashboard with many disconnected pages. The screen should prove that FiberOS understands both geography and network relationships.

### 1. Screen layout

```text
┌──────────────────────────────────────────────────────────────────┐
│ FiberOS   [Search customer, ONU, splitter, fiber, OLT...]   User │
├──────────────┬───────────────────────────────────────┬───────────┤
│              │                                       │           │
│ Map Layers   │                                       │ Selected  │
│              │          INTERACTIVE MAP              │ Asset     │
│ □ POP        │                                       │ Details   │
│ □ OLT        │      POP ─ Fiber ─ Closure            │           │
│ □ Fiber      │                    │                  │ Customer  │
│ □ Closure    │                 Splitter              │ ONU       │
│ □ Splitter   │                 /   |   \              │ Splitter  │
│ □ Customer   │           Customer Customer Customer  │ OLT/PON   │
│              │                                       │           │
│ Filters      │                                       │ [Trace]   │
│ Zone         │                                       │ [Impact]  │
│ Status       │                                       │ [Edit]    │
├──────────────┴───────────────────────────────────────┴───────────┤
│ Trace: Customer → ONU → Splitter → Closure → Fiber → OLT → POP  │
└──────────────────────────────────────────────────────────────────┘
```

The three main areas are:

- **Left:** layers and filters
- **Center:** interactive network map
- **Right:** contextual asset details
- **Bottom:** network trace timeline

### 2. POC data scope

Use a small but believable real-world dataset:

```text
1 POP
1 OLT
2 PONs
2 fiber cables
1 splice closure
3 splitters
8–12 customers
```

Do not use hundreds of fake records. A carefully designed small topology will communicate the idea better.

Suggested example:

```text
POP-BGR-01
└── OLT-BGR-01
    └── PON-01
        └── Fiber FC-001
            └── Closure CL-001
                ├── Splitter SP-001
                │   ├── Customer C-1001
                │   ├── Customer C-1002
                │   └── Customer C-1003
                └── Splitter SP-002
                    ├── Customer C-1004
                    └── Customer C-1005
```

### 3. Core interactions to implement

#### Search

The user searches for:

```text
C-1004
```

The application should:

1. Find the customer.
2. Zoom to the location.
3. Animate or pulse the customer marker.
4. Open the customer side panel.
5. Display the connection summary.

Example:

```text
Customer: C-1004
Status: Active
ONU: VSOL-V2802RH
ONU Serial: VSL23001922
Splitter: SP-002
Port: 03
PON: PON-01
OLT: OLT-BGR-01
POP: POP-BGR-01
```

#### Trace network

When the user clicks **Trace Network**, highlight the route progressively:

```text
Customer
→ ONU
→ Splitter Port
→ Splitter
→ Closure
→ Fiber
→ PON
→ OLT
→ POP
```

Use a simple visual sequence:

- Dim unrelated assets.
- Highlight the customer.
- Highlight each upstream connection.
- Draw or brighten the route.
- Show the textual path in the bottom panel.

This animation will probably be the strongest part of the pitch.

#### Impact analysis

When the user clicks a fiber or splitter, show:

```text
Asset: Fiber FC-001
Connected Splitters: 2
Connected ONUs: 5
Potentially Affected Customers: 5
```

For a splitter:

```text
Asset: Splitter SP-001
Type: 1:8
Occupied Ports: 3
Available Ports: 5
Potentially Affected Customers: 3
```

The first POC does not need sophisticated graph calculations. You can derive these values from predefined relationships.

### 4. Right-side detail panel

Make the side panel reusable for every asset type.

#### Customer panel

- Customer name and ID
- Connection status
- Phone
- Address
- ONU
- Splitter and port
- OLT/PON
- Trace Network button
- View History button

#### Splitter panel

- Splitter ID
- Type: 1:8 or 1:16
- Parent closure
- Input fiber/core
- Occupied ports
- Available ports
- Connected customers
- Impact Analysis button

#### Fiber panel

- Fiber ID
- Type
- Core capacity
- Used cores
- Available cores
- Source and destination
- Length
- Estimated affected customers
- Trace Downstream button

#### OLT panel

- OLT name
- Vendor/model
- POP
- Total PON ports
- Used PON ports
- Connected splitters
- Connected subscribers

### 5. Recommended visual design

The interface should feel like a modern infrastructure product rather than traditional ERP software.

Use:

- Spacious neutral layout
- Dark text on a light background
- Clear map contrast
- Compact floating panels
- Rounded but professional controls
- Small status indicators
- Monospace styling for asset IDs
- Simple icons for POP, OLT, splitter, closure, and customer
- Subtle animation only for tracing and selection

Avoid:

- Large marketing gradients inside the application
- Excessive cards
- Dense tables on the primary screen
- Too many colors
- Complicated GIS toolbars
- Enterprise-style menus with dozens of items

### 6. Suggested POC pages

Only build four screens for the initial visualization:

1. **Network Overview**
   - Summary metrics
   - Small network health section
   - Open Network Map button

2. **Network Map**
   - Main product screen
   - Search, layers, side panel, trace and impact analysis

3. **Asset Details**
   - Splitter or fiber details
   - Ports, cores, connections and history

4. **Mobile Technician View**
   - Current GPS
   - Add asset
   - Take photo
   - Scan QR
   - Update splitter port
   - Save field update

The Network Map should receive roughly 70% of the POC effort.

### 7. Suggested technical implementation

For the testing environment:

```text
Laravel
Vue 3
Inertia.js
PostgreSQL + PostGIS
MapLibre GL JS
Tailwind CSS
```

For the first visual POC, you can simplify further:

- Store fixed example assets in PostgreSQL or JSON fixtures.
- Use GeoJSON sources for markers and fiber lines.
- Maintain topology relationships using IDs.
- Calculate the trace in the frontend or through one Laravel endpoint.
- Use a drawer component for the right-side asset panel.
- Use a bottom sheet for the trace sequence.
- Skip authentication if the POC is only for a controlled presentation.

Example simplified relationship structure:

```json
{
  "customer_id": "C-1004",
  "onu_id": "ONU-004",
  "splitter_id": "SP-002",
  "closure_id": "CL-001",
  "fiber_id": "FC-001",
  "pon_id": "PON-01",
  "olt_id": "OLT-BGR-01",
  "pop_id": "POP-BGR-01"
}
```

### 8. Two-minute pitch sequence

The presentation should follow this exact story:

1. Show the network overview.
2. Explain that most ISPs cannot accurately visualize their physical network.
3. Open the map.
4. Search for one customer.
5. Show the customer's physical location.
6. Click **Trace Network**.
7. Animate the full path from customer to POP.
8. Select the upstream fiber.
9. Show how many customers would be affected by its failure.
10. Open the mobile technician view.
11. Demonstrate adding or updating a splitter in the field.
12. End with the long-term platform modules: GIS, monitoring, AAA, billing and logs.

The central pitch is:

> **FiberOS gives an ISP a living digital model of its network—from the POP to every individual subscriber.**