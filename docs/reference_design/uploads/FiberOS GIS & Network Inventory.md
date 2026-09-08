# FiberOS GIS & Network Inventory
## Minimal UI / Frontend Specification

### 1. Product Purpose

FiberOS GIS is the physical network inventory and visualization layer of the wider FiberOS platform.

It combines:

- Fiber-network GIS
- Physical network inventory
- Device inventory
- Port and fiber-core documentation
- Network topology
- Live device telemetry
- Optical signal monitoring
- Capacity monitoring
- Fault and incident visualization

The interface should answer four questions quickly:

1. **What network infrastructure do we have?**
2. **Where is it physically located?**
3. **How is everything connected?**
4. **What is happening in the network right now?**

---

# 2. Primary Application Structure

```text
FiberOS
│
├── Dashboard
├── Network Map
│
├── Organization
│   ├── Branches
│   ├── POPs
│   └── Customers
│
├── Network
│   ├── Sites & Racks
│   ├── OLTs
│   ├── ODFs
│   ├── Routers
│   ├── Switches
│   ├── Fiber Cables
│   ├── Closures
│   ├── Splitters
│   ├── FDB / FAT
│   └── ONUs / ONTs
│
├── Monitoring
│   ├── Network Health
│   ├── Optical Signals
│   ├── Alarms
│   └── Incidents
│
└── Settings
    ├── Users
    ├── Roles & Permissions
    ├── Network Configuration
    ├── Fiber Configuration
    ├── Device Profiles
    └── Map / Survey Settings
```

Do not hide OLTs, splitters, fiber cables, or FDBs inside generic categories. These are core fiber-network objects.

---

# 3. Global Layout

Desktop-first application.

```text
┌──────────────┬──────────────────────────────────────────────┐
│              │ Top Navigation                               │
│              ├──────────────────────────────────────────────┤
│              │                                              │
│   Sidebar    │               Main Workspace                 │
│              │                                              │
│              │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

## Sidebar

Recommended width:

- Expanded: approximately 220–240px
- Optional collapsed state: approximately 64–72px

Sidebar groups:

### Main
- Dashboard
- Network Map

### Organization
- Branches
- POPs
- Customers

### Network Infrastructure
- Sites / Racks
- OLTs
- ODFs
- Routers
- Switches
- Fiber Cables
- Closures
- Splitters
- FDB / FAT
- ONUs / ONTs

### Monitoring
- Network Health
- Optical Signals
- Alarms
- Incidents

### Settings
- Users
- Roles & Permissions
- Fiber Configuration
- Device Profiles
- Survey / Map Settings

Avoid displaying every secondary item permanently if the menu becomes too long. Use expandable menu groups.

---

# 4. Top Bar

Keep the global top navigation minimal.

Left / center:

```text
Search devices, customers, POPs, fibers...
```

Search should support:

- Customer
- ONU serial
- ONU MAC
- POP
- OLT
- PON port
- ODF
- Fiber cable
- Closure
- Splitter
- FDB
- Device IP

Right:

- Active alerts indicator
- Quick-add button
- User/profile menu

Optional:

- Organization / branch selector
- Environment indicator

---

# 5. Dashboard

The dashboard should look like a **live network command center**, not merely an inventory report.

## Dashboard Header

```text
Network Command Center

Live overview of deployment, capacity and network health.
```

Actions:

- Time range
- Branch / POP filter
- Refresh
- Open Network Map

---

# 6. Dashboard — Primary KPI Row

Use 6 compact KPI cards.

### 1. Fiber Deployed

```text
518.4 km
+12.8 km this month
```

Secondary:
- active routes
- growth %

---

### 2. Active Subscribers

```text
18,420
+312 this month
```

---

### 3. Network Nodes

Total:

- POPs
- OLTs
- Closures
- Splitters
- FDBs
- ONUs

Example:

```text
2,481
network assets
```

---

### 4. Network Health

```text
98.7%
Healthy
```

Based on monitored devices and active incidents.

---

### 5. PON Capacity

```text
71%
Average utilization
```

Include:

- Normal
- Near capacity
- Critical

---

### 6. ONUs Online

```text
17,984 / 18,420

97.6%
```

Status breakdown:

- Online
- Offline
- LOS
- Weak signal

---

# 7. Dashboard — Live Network Health

Large section.

Example:

```text
Network Health

Healthy Devices       2,301
Warning                 127
Critical                 18
Offline                  35
```

Include health trend graph.

Possible categories:

- OLT
- Router
- Switch
- ONU
- PON

Clicking any category opens filtered network assets.

---

# 8. Dashboard — Network Map Preview

The dashboard should contain a meaningful live GIS preview.

Example:

```text
┌─────────────────────────────────────────┐
│                                         │
│   ● POP                                 │
│    ╲                                    │
│     ╲ Fiber route                       │
│      ● Closure ───── ● Splitter         │
│                       │  │  │           │
│                       ●  ●  ● FDB       │
│                                         │
└─────────────────────────────────────────┘
```

Overlay:

- Active incident
- Offline devices
- Weak optical areas
- Capacity hotspots

Button:

**Open Network Map**

---

# 9. Dashboard — Attention Required

High-priority operational card.

Example:

```text
Attention Required

🔴 2 critical incidents
🟠 8 PON ports above 85%
🟠 24 ONUs with weak optical signal
🔴 17 ONUs offline unexpectedly
```

Each item is clickable.

---

# 10. Dashboard — Optical Health

Important differentiator from a normal GIS product.

Display:

```text
ONU Optical Health

Excellent     8,412
Good          7,922
Weak          1,204
Critical        442
Unknown         440
```

Suggested signal visualization:

```text
-10        -20        -25        -28       -30
 Excellent   Good       Weak      Critical
```

Thresholds must be configurable because device classes differ.

---

# 11. Dashboard — Capacity

Show PON and physical port utilization.

Example:

```text
PON Capacity

Normal          214
70–85%           48
85–95%           17
>95%               4
```

Also show:

- ODF port usage
- Splitter capacity
- FDB capacity
- Switch ports
- OLT PON ports

---

# 12. Dashboard — Fiber Growth

Chart:

```text
Fiber deployed over time
```

Metrics:

- new routes
- added kilometers
- new POPs
- new FDBs
- new subscribers

Period:

- Week
- Month
- Year
- Custom

---

# 13. Dashboard — Recent Incidents

Example:

```text
INC-1045
Possible distribution fiber fault
8 customers affected
Closure CL-012 → FDB-018
5 minutes ago
```

Another:

```text
PON-03 capacity warning
OLT Bogura-01
92% subscriber capacity
```

---

# 14. Dashboard — POP Performance

Table or ranking.

Columns:

- POP
- Subscribers
- OLTs
- PON usage
- Offline ONUs
- Incidents
- Health

---

# 15. Network Map

This is the primary working screen of FiberOS GIS.

Recommended layout:

```text
┌───────────────┬─────────────────────────────────┬────────────┐
│               │                                 │            │
│ Sidebar       │            MAP                  │ Layers /   │
│               │                                 │ Details    │
│               │                                 │            │
└───────────────┴─────────────────────────────────┴────────────┘
```

---

# 16. Map Top Toolbar

Include:

### Search
```text
Search network...
```

### View modes

- Location
- Network
- Logical topology
- Coordinates

### Tools

- Select
- Add component
- Draw fiber
- Measure distance
- Trace network
- Show affected subscribers

Optional later:

- OTDR fault locator

---

# 17. Map Layers Panel

Recommended structure:

## Sites
- POP
- Rack / Cabinet
- Pole
- Manhole

## Active Equipment
- OLT
- Router
- Switch
- ONU

## Passive Optical
- ODF
- Closure
- Splitter
- FDB / FAT

## Fiber
- Feeder cable
- Distribution cable
- Drop cable

## Operational
- Connections
- Incidents
- Signal warnings
- Capacity warnings

Each layer has:

- visibility toggle
- count
- optional filter

---

# 18. Map Object Interaction

Clicking an object opens a side drawer instead of navigating away immediately.

Example:

```text
OLT — BOG-OLT-01

Status       ● Online
Vendor       Huawei
Model        MA5800
POP          Bogura Main
PON Ports    16
ONUs         836
Warnings     2

[Open Details]
[Trace]
[Monitor]
```

Right-click / context actions may include:

- View
- Edit
- Connect
- Start fiber route
- Splice here
- Add splitter
- Trace upstream
- Trace downstream
- View affected subscribers
- Delete

Context options should depend on object type.

---

# 19. Universal Asset Detail Pattern

All equipment pages should follow the same information architecture.

```text
Asset Name                         Status

Overview | Connectivity | Ports | Monitoring | History
```

Avoid building completely different layouts for every equipment type.

---

# 20. Asset Overview Tab

Example:

```text
General Information
Location
Hardware
Capacity
Installation
Management
Notes
```

---

# 21. Connectivity Tab

Show:

```text
UPSTREAM

OLT / ODF / Fiber / Device
        │
        ▼
CURRENT DEVICE
        │
        ▼
DOWNSTREAM
```

Support:

- logical connection
- physical connection
- fiber trace

---

# 22. Ports Tab

Every port-based asset uses a shared port UI.

Status:

- Available
- Connected
- Reserved
- Faulty
- Disabled

Example:

```text
Port 01
SC/APC
Output

Status: Connected

Front → OLT-01 / PON-03
Back  → Fiber FC-004 / Core 07
```

Actions:

- Connect
- Disconnect
- Reserve
- Mark faulty
- Edit

---

# 23. Monitoring Tab

For monitored devices.

Display:

- Device status
- Last poll
- Ping
- CPU
- Memory
- Temperature
- Interface status
- Traffic
- Optical power
- alarms

Only show metrics relevant to that equipment type.

---

# 24. History Tab

Timeline:

```text
Installed
Port connected
Fiber reassigned
Configuration changed
Signal warning
Device offline
Device restored
```

Include:

- timestamp
- user/system
- event type

---

# 25. Organization Forms

## Branch Form

Required:

- Name
- Code
- Status

Optional:

- Address
- Contact
- Description

---

# 26. POP Form

### Required

- Branch
- Name
- Code
- Type
- Status

### Location

- Latitude
- Longitude
- Map placement

### Optional

- Address
- Contact name
- Phone
- Email
- Description

Do not make unnecessary contact fields mandatory.

---

# 27. Rack Form

### Required

- POP
- Name
- Code
- Rack units

Example:

```text
42U
```

### Optional

- Vendor
- Model
- Serial
- Width
- Depth
- Power capacity
- Description

Rack detail must include visual rack-unit occupancy.

---

# 28. OLT Form

OLT is mandatory in FiberOS.

### Identity

- Name
- Code
- Vendor
- Model
- Serial number
- Firmware

### Placement

- POP
- Rack
- Rack position
- U height

### Management

- Management IP
- MAC
- SNMP version
- API / integration profile
- SSH availability

Credentials should be stored securely outside normal visible form data.

### Hardware

- Number of slots
- PON technology

Options:

- GPON
- EPON
- XG-PON
- XGS-PON
- 10G-EPON

### PON Ports

Configurable port groups.

Example:

```text
16 × GPON
```

Per port:

- Name
- Slot
- Port
- Admin status
- Operational status
- Capacity
- ONU count

---

# 29. ODF Form

### Placement

- POP
- Rack
- Rack position
- U height

### Details

- Name
- Code
- Type
- Vendor
- Model
- Serial
- Status

### Port Configuration

- Number of ports
- Connector type
- Polish type

Examples:

```text
SC/APC
SC/UPC
LC/APC
LC/UPC
```

ODF detail must document both sides of every adapter/port.

Example:

```text
ODF Port 12

FRONT
OLT-01 / PON-04

BACK
Cable FC-012 / Core 07
```

---

# 30. Router Form

Do not overload the first screen.

## Basic

- Name
- Code
- Vendor
- Model
- Router type
- Operating system
- Firmware
- Serial

## Placement

- POP
- Rack
- rack position

## Management

- Management IP
- MAC
- SNMP
- SSH

## Optional Capacity

- CPU
- RAM
- Throughput
- Storage

## Port Groups

Example:

```text
8 × RJ45 1G
4 × SFP+ 10G
2 × QSFP28 100G
```

Ports should be generated automatically from groups.

---

# 31. Switch Form

### Identity

- Name
- Code
- Vendor
- Model
- Layer
- OS
- Firmware

### Placement

- POP
- Rack
- Slot

### Management

- Management IP
- MAC
- VLAN
- SNMP
- SSH

### Port Groups

Example:

```text
24 × RJ45 1G
4 × SFP+ 10G
```

Optional:

- PoE
- PoE budget
- Stackable
- LACP
- STP mode

---

# 32. Fiber Cable Form

This is a core FiberOS object.

### Identity

- Cable name
- Code
- Cable type

Types:

- Feeder
- Distribution
- Drop
- Backbone
- Inter-POP

### Fiber Details

- Core count
- Fiber standard
- Manufacturer
- Installation status

Common standards:

- G.652D
- G.657A1
- G.657A2

### Route

Draw cable on map.

Automatically calculate:

- GIS length

Optional:

- actual installed length
- slack length

### Core Management

Generate cores automatically.

Example:

```text
01 Blue
02 Orange
03 Green
04 Brown
...
```

Each core status:

- Free
- Used
- Reserved
- Faulty

Each used core should be traceable.

---

# 33. Closure / TJ Box Form

Use standard product terminology:

**Fiber Closure**

Allow organization-specific alias:

```text
TJ Box
```

### Identity

- Name
- Code
- Type
- Status

### Location

- Map coordinate
- Pole / manhole association

### Capacity

- Number of trays
- Maximum splices
- Cable entry ports

### Internal Connections

The important part is not just the closure record.

FiberOS must support:

```text
Incoming Cable FC-001 / Core 03
                │
              SPLICE
                │
Outgoing Cable FC-007 / Core 11
```

Store:

- tray
- splice number
- source core
- destination core
- estimated / measured splice loss
- notes

---

# 34. Splitter Form

### Identity

- Name
- Code
- Status

### Ratio

Options:

- 1:2
- 1:4
- 1:8
- 1:16
- 1:32
- 1:64

### Technology

- PLC
- FBT if required

### Location

Can be installed in:

- Closure
- FDB
- FAT
- Cabinet
- Rack
- Other enclosure

### Ports

Automatically create:

```text
INPUT 1

OUTPUT 01
OUTPUT 02
...
```

Store:

- connected fiber/core
- expected insertion loss
- optional measured loss

---

# 35. FDB / FAT Form

### Identity

- Name
- Code
- Type
- Status

### Location

- GIS coordinates
- pole / building / cabinet

### Capacity

- Number of subscriber ports
- internal splitter if applicable

### Ports

Each port:

- Available
- Reserved
- Connected
- Faulty

Connection example:

```text
FDB-023 / Port 07
        │
        ▼
Drop Cable D-834
        │
        ▼
ONU-1843
```

---

# 36. ONU / ONT Form

Keep manual inventory fields separate from telemetry.

## Identity

- Name
- Code
- Serial number
- MAC

## Hardware

- Vendor
- Model
- Firmware

## Customer

- Customer
- Installation address

## Network Assignment

Prefer structured fields:

- OLT
- Slot
- PON port
- ONU ID

When possible this should be synchronized from OLT telemetry rather than entered manually.

## Physical Upstream

- FDB port
- Drop cable

## Location

- Latitude
- Longitude

## Installation

- Technician
- Date

---

# 37. ONU Telemetry

Do NOT place live values in the permanent inventory form.

Telemetry should be system-generated.

Example:

```text
Status          Online
Last Seen       4 sec ago

Rx Power        -21.8 dBm
Tx Power         2.4 dBm
OLT Rx          -23.1 dBm

Distance         4.82 km
Temperature      49°C
Voltage           3.3 V
```

Possible alarm state:

```text
Weak Optical Signal
```

---

# 38. Physical vs Logical Connection

FiberOS must clearly distinguish these.

## Physical

```text
OLT PON
↓
ODF
↓
Fiber core
↓
Closure
↓
Splice
↓
Splitter
↓
FDB
↓
Drop fiber
↓
ONU
```

## Logical

```text
Router
↓
VLAN
↓
OLT
↓
PON
↓
ONU
↓
Subscriber service
```

Never treat these as the same relationship.

---

# 39. Fiber Trace

A major FiberOS feature.

User selects ONU and clicks:

**Trace to OLT**

Display:

```text
Customer
Rahim Telecom

↓
ONU-08392

↓
Drop D-0982

↓
FDB-0032 / Port 05

↓
Distribution Cable DC-017
Core 09

↓
Closure CL-012
Tray 2 / Splice 18

↓
Splitter SP-019
Output 06

↓
Feeder FC-002
Core 11

↓
ODF-01 / Port 31

↓
OLT-01
Slot 02 / PON 07
```

Map highlights the entire route.

---

# 40. Reverse Trace

Select:

```text
OLT-01 / PON-07
```

Display:

- downstream splitters
- FDBs
- ONUs
- subscribers
- total distance
- affected area

---

# 41. Expected Optical Budget

Using inventory data, FiberOS can calculate:

```text
OLT TX
-
Fiber attenuation
-
Connectors
-
Splices
-
Splitters
=
Expected ONU RX
```

Display:

```text
Expected     -20.4 dBm
Live         -25.7 dBm

Variance      -5.3 dB

⚠ Higher loss than expected
```

Keep:

- Calculated value
- Live measured value

visually distinct.

---

# 42. Incident Correlation

The UI should eventually support topology-aware alarms.

Example:

```text
8 ONUs went offline
        ↓
All use FDB-018
        ↓
All use Distribution Cable DC-019
        ↓
Likely shared fiber incident
```

Incident card:

```text
Probable Distribution Fiber Fault

Cable
DC-019

Segment
Closure CL-012 → FDB-018

Affected Subscribers
8

First Detected
14:32

[View on Map]
[Trace]
[Create Work Order]
```

---

# 43. List Page Pattern

All inventory lists should use a common structure.

```text
Page Title                    [+ Add]

Search     Status     POP     Type

----------------------------------------------------
Name     Code     POP     Status     Health     ...
----------------------------------------------------
```

Clicking a row opens details.

Avoid building highly customized tables unless necessary.

---

# 44. Create Form Pattern

Forms should use sections instead of one long unstructured page.

Desktop:

```text
┌─────────────────────────┬────────────────────────┐
│ Identity                │ Location               │
│ Hardware                │ Map                    │
│ Capacity                │                        │
│ Connectivity            │                        │
│ Installation            │                        │
└─────────────────────────┴────────────────────────┘
```

For complex assets use a wizard if required.

---

# 45. Do Not Collect Everything Initially

The reference application contains many fields that are useful for inventory but not necessarily required during initial provisioning.

FiberOS forms should classify fields as:

### Required
Needed to create or connect the network asset.

### Recommended
Important for operations.

### Advanced
Optional engineering/manufacturer information.

The initial UI should display Required + Recommended.

Advanced fields can be inside:

```text
Advanced Details
```

---

# 46. Network Object Statuses

Use a common model where possible.

Planning lifecycle:

- Planned
- Installed
- Active
- Maintenance
- Retired

Operational state:

- Online
- Offline
- Warning
- Critical
- Unknown

Do not mix planning status with live health.

Example:

```text
Lifecycle: Active
Health:    Warning
```

---

# 47. Visual Status System

Use consistent colors conceptually:

```text
Green   Healthy / Available
Amber   Warning / Reserved
Red     Critical / Faulty
Blue    Selected / informational
Gray    Unknown / disabled / planned
```

Do not overuse color.

Map icons should remain understandable without color.

---

# 48. Monitoring Architecture UI Concept

The UI must make it clear that FiberOS has two sources of network knowledge.

```text
                    FiberOS

          ┌────────────────────┐
          │     INVENTORY      │
          │ What should exist  │
          └─────────┬──────────┘
                    │
                    │ correlate
                    │
          ┌─────────▼──────────┐
          │     TELEMETRY      │
          │ What exists now    │
          └────────────────────┘
```

Inventory:

- equipment
- ports
- fiber
- splices
- geography
- topology

Telemetry:

- device status
- optical signals
- port state
- bandwidth
- alarms
- CPU / RAM
- temperature

---

# 49. Recommended Database / Form Entities

Core MVP:

```text
organizations
branches
pops
racks

devices
device_ports

olts
olt_slots
pon_ports

odfs
odf_ports

fiber_cables
fiber_cores
fiber_routes

closures
splice_trays
fiber_splices

splitters
splitter_ports

fdbs
fdb_ports

onus

customers

physical_connections
logical_connections

device_telemetry
optical_measurements
alarms
incidents

asset_locations
asset_history
```

Do not make every equipment type a completely unrelated connection system.

Use shared connection concepts wherever technically appropriate.

---

# 50. Most Important Data Relationship

The physical network should be modeled as a graph.

```text
NODE
+
PORT
+
CONNECTION
```

Examples of Nodes:

- OLT
- ODF
- Closure
- Splitter
- FDB
- ONU
- Router
- Switch

Examples of Ports:

- OLT PON
- ODF adapter
- Splitter input
- Splitter output
- FDB subscriber port
- Ethernet port
- SFP port

Connections:

- fiber core
- patch cord
- splice
- drop fiber
- Ethernet link

This makes future topology tracing possible.

---

# 51. MVP Navigation Recommendation

For the first polished frontend, keep the sidebar smaller.

```text
Dashboard

Network Map

ORGANIZATION
├── POPs
└── Customers

NETWORK
├── Racks
├── OLTs
├── ODFs
├── Routers
├── Switches
├── Fiber Cables
├── Closures
├── Splitters
├── FDB / FAT
└── ONUs

MONITORING
├── Network Health
├── Optical Signals
└── Incidents

SETTINGS
├── Users
├── Network Configuration
└── Fiber Configuration
```

Branches can live under organization settings unless multi-branch administration is central to the demo.

---

# 52. MVP Dashboard Recommendation

For the first investor/demo frontend, build only these sections:

### Row 1
- Fiber Deployed
- Subscribers
- Network Nodes
- Network Health
- PON Capacity
- ONUs Online

### Row 2

Large:

**Live Network Map**

Right:

**Attention Required**

### Row 3

Left:

**Network Health / Optical Health**

Right:

**Capacity Hotspots**

### Row 4

**Recent Incidents**

### Row 5

**Deployment Growth**

This is enough to demonstrate the product without creating a huge analytics system.

---

# 53. Investor Demo Story

Demo should follow this flow:

```text
Dashboard
   ↓
See entire ISP health

Network Map
   ↓
Select problem area

Incident
   ↓
8 subscribers offline

Topology
   ↓
Same FDB / fiber segment

Fiber Trace
   ↓
Locate exact network path

Telemetry
   ↓
Optical degradation detected

Customer
   ↓
See affected subscriber

Operations
   ↓
Send technician / create task
```

This demonstrates why FiberOS is more than a GIS application.

---

# 54. Design Direction

Visual style:

- Professional SaaS
- Network operations focused
- Dense enough for engineers
- Clean enough for executives
- Light theme as default
- Strong typography
- Subtle borders
- Minimal shadows
- Compact cards
- High-information map
- Status-driven visual language

Avoid:

- excessive gradients
- huge decorative cards
- unnecessary illustrations
- excessive rounded UI
- consumer-app styling
- presenting every database field simultaneously

The application should feel closer to:

**GIS + NOC + network inventory + modern enterprise SaaS**

rather than generic CRM software.

---

# 55. Core Design Principle

Every important network object should ultimately answer:

```text
WHAT IS IT?
↓
WHERE IS IT?
↓
WHAT IS IT CONNECTED TO?
↓
WHAT CAPACITY DOES IT HAVE?
↓
WHAT IS USING IT?
↓
IS IT HEALTHY NOW?
↓
WHAT CHANGED?
```

If FiberOS answers these seven questions consistently across OLTs, fiber, ODFs, closures, splitters, FDBs, ONUs and active equipment, the interface will remain coherent even as the platform becomes much larger.