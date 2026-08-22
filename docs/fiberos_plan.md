# FiberOS ISP Infrastructure Platform — Company & Product Plan

## 1. Document Purpose

This document defines the operating model, long-term product architecture, first product scope, technical direction, development roadmap, team structure, investment plan, and proof-of-concept direction for a new ISP software company.

The company is designed as an independent product business, not a custom software agency.

---

## 2. Company Thesis

### Working Company Name

**FiberOS**  
Temporary internal name until branding is finalized.

### Mission

> Build infrastructure software that makes ISP networks easier to visualize, operate, monitor, automate, and scale.

### Initial Market

- Bangladesh
- Small and mid-sized ISPs
- Regional ISP groups
- Resellers and sub-ISPs
- Network operators with undocumented or partially documented FTTx infrastructure

### Long-Term Market

- South Asia
- Southeast Asia
- Africa
- Other emerging broadband markets

### Category

The company should not position itself only as an ISP billing software provider.

Preferred category:

> **ISP Network Operations Platform**

Long-term category:

> **Broadband Infrastructure Operating Platform**

### Core Message

> Know your network. Operate your network. Automate your network.

---

## 3. Company Structure

### Ownership

Assuming four equal partners:

- Founder and Operating Partner — 25%
- Investor A — 25%
- Investor B — 25%
- Investor C — 25%

### Founder Role

**Founder & Chief Executive Officer**

The founder also acts as:

- Product lead
- Technical architect
- Engineering lead
- Budget owner
- Hiring authority
- Business operator

A separate CEO is not required at the beginning.

### Investor Role

Investors provide:

- Capital
- Industry access
- ISP network access
- Domain expertise
- Distribution relationships
- Initial product testing environments
- Market validation support

Investors should not be involved in daily operations unless specifically required.

### Management Authority

The CEO controls:

- Hiring
- Product direction
- Engineering
- Architecture
- Approved operating budget
- Vendor selection
- Product pricing
- Customer onboarding
- Day-to-day commercial activity

### Reserved Matters

Board approval should be required for:

- Issuing new shares
- Changing ownership
- Selling the company
- Selling major intellectual property
- Large borrowing
- Major unbudgeted spending
- Company shutdown
- Acquisitions
- Dividends
- Founder removal
- Related-party transactions
- Changes to the company's primary business

### Deadlock Protection

Equal ownership creates possible 2–2 deadlocks.

Recommended structure:

- Operational decisions: CEO decides
- Significant reserved matters: 75% approval
- Exceptional matters: unanimous approval
- Formal deadlock process defined in shareholder agreement

---

## 4. Funding Structure

### Initial Capital Plan

**Base operating budget:** BDT 40 lakh  
**Contingency authorization:** BDT 8–10 lakh

### Funding Commitment

The investors should legally commit to the approved first-year capital requirement.

Possible structure:

- Quarter 1 — BDT 10 lakh
- Quarter 2 — BDT 10 lakh
- Quarter 3 — BDT 10 lakh
- Quarter 4 — BDT 10 lakh

The company should always maintain at least 3–4 months of operating runway.

### Funding Failure Protection

The shareholder agreement should define what happens if an investor does not provide their committed capital.

Possible outcomes:

- Another shareholder may cover the shortfall
- The non-funding investor is diluted
- Unpaid capital becomes a formal shareholder obligation
- The company may raise outside capital
- Voting rights may be restricted until the commitment is fulfilled

### Founder Salary

Recommended founder salary:

**BDT 100,000 per month**

This is separate from equity.

Salary compensates for full-time work.  
Equity compensates for risk, company creation, leadership, and long-term value.

---

## 5. Intellectual Property

### New Company IP

The new company owns:

- New product source code
- Product designs
- Documentation
- Infrastructure created for the new ISP platform
- New integrations
- New product brands

### Founder Pre-Existing IP

The founder retains ownership of:

- Lavloss
- Ryzan
- Spaceworks
- Existing codebases
- Existing client systems
- Existing business assets
- Existing brands and domains

The new company must not automatically gain ownership of previous projects or reusable assets unless separately licensed in writing.

### Market Independence

The company may sell to:

- Investor-owned ISPs
- Their resellers
- Their competitors
- National ISP operators
- International ISP operators

The company should maintain an independent market identity.

---

## 6. Long-Term Product Architecture

The company should build one modular platform rather than disconnected applications.

```text
                    FiberOS PLATFORM

               ┌──────────────────┐
               │    FiberOS GIS   │
               │ Network Inventory│
               └────────┬─────────┘
                        │
               ┌────────▼─────────┐
               │    Monitor       │
               │ NMS / Telemetry  │
               └────────┬─────────┘
                        │
        ┌───────────────┼────────────────┐
        │               │                │
   Subscriber        Billing           Logs
   AAA/RADIUS        CRM/ERP         Compliance
        │               │                │
        └───────────────┼────────────────┘
                        │
                  Integration API
                        │
     MikroTik / OLT / ONU / Router / Payments
```

### Planned Product Modules

1. FiberOS GIS
2. FiberOS Monitor
3. FiberOS AAA
4. FiberOS Billing
5. FiberOS Logs
6. Field Operations
7. Integration API
8. Analytics and AI Assistance

---

## 7. First Product

### Working Product Name

**FiberOS**

Temporary product name until branding is finalized.

### Positioning

> A visual FTTx network management system that allows ISPs to map, understand, document, and operate their full fiber network from POP to subscriber.

### Primary Questions FiberOS Must Answer

1. Where is this network asset?
2. What is connected to it?
3. Which customer depends on it?
4. What happens if it fails?
5. Who changed it and when?

### Product Category

- FTTx GIS
- Network inventory
- Network topology
- Field operations
- Impact analysis
- Infrastructure documentation

---

## 8. Product Experience

An ISP manager should open FiberOS and immediately see the network condition and inventory.

Example dashboard:

```text
Bogura Network

12 POPs
18 OLTs
143 PONs
417 Fiber Segments
829 Splitters
7,342 ONUs
9,184 Subscribers
```

The interactive map should show:

```text
POP
 ↓
OLT
 ↓
PON
 ↓
Fiber Cable
 ↓
Closure
 ↓
Splitter
 ↓
Distribution Fiber
 ↓
ONU
 ↓
Customer
```

Clicking any object should open a contextual side panel with:

- Asset details
- Physical location
- Parent connection
- Downstream dependencies
- Photos
- Notes
- Current status
- Change history
- Assigned technician
- Associated customers

---

## 9. FiberOS MVP Modules

### Module 1 — Organization

Entities:

- Company
- Branch
- Region
- Zone
- POP
- Team
- User
- Role

Initial roles:

- Owner
- Administrator
- NOC
- Network Engineer
- Field Technician
- Viewer

---

### Module 2 — GIS Map

Recommended technologies:

- MapLibre
- OpenStreetMap
- PostgreSQL
- PostGIS

Map objects:

- POP
- OLT
- ODF
- Splice closure
- Splitter
- Pole
- Cabinet
- Customer
- ONU

Linear objects:

- Backbone fiber
- Distribution fiber
- Drop cable

Essential interactions:

- Click to add an asset
- Draw a fiber route
- Connect assets
- Move an asset
- Edit asset details
- View dependencies
- Filter map layers
- Search assets and customers

---

### Module 3 — Fiber Inventory

Example:

```text
Cable: FC-00291
Type: Single-mode
Capacity: 24 Core
Length: 1.84 km
From: POP-03
To: Closure-14
Installed: 12 May 2026

Core 01 → PON 2
Core 02 → PON 3
Core 03 → Unused
Core 04 → Corporate Connection
```

The system should track:

- Cable type
- Cable capacity
- Route
- Length
- Installation date
- Source
- Destination
- Core usage
- Spare cores
- Damage history
- Photos
- Notes

---

### Module 4 — Fiber Splicing

FiberOS should model splice relationships.

Example:

```text
Incoming Cable A
Core 01 ───────── Core 07 Outgoing Cable B
Core 02 ───────── Splitter SP-119
Core 03 ───────── Core 04 Outgoing Cable C
```

Capabilities:

- Splice core-to-core
- Splice core-to-splitter
- Track closure location
- Record technician
- Record splice date
- Preserve change history
- Trace end-to-end paths

---

### Module 5 — Splitter Management

Example:

```text
Splitter: SP-1922
Type: 1:8

Input
  ↑
Fiber Core #7

Outputs

01 → Customer 10092
02 → Customer 10294
03 → Customer 10311
04 → Vacant
05 → Customer 10992
06 → Customer 11773
07 → Vacant
08 → Customer 11827
```

The system should track:

- Splitter type
- Input connection
- Output ports
- Occupied ports
- Vacant ports
- Connected customers
- Installation location
- Technician history
- Replacement history

---

### Module 6 — Customer Endpoint

The first version should not become a complete CRM.

Minimum customer information:

- Customer ID
- Name
- Phone
- Address
- Coordinates
- ONU serial
- ONU MAC
- ONU vendor
- Splitter connection
- OLT/PON relationship

Example topology:

```text
Customer
 ↓
ONU
 ↓
Splitter Port 05
 ↓
Fiber
 ↓
PON 3
 ↓
OLT-BOG-01
```

---

### Module 7 — Network Trace

Search by:

- Customer ID
- ONU serial
- Phone number
- Splitter ID
- OLT
- PON
- Fiber cable
- POP

Example result:

```text
Customer
   ↓
ONU
   ↓
Splitter SP-82 / Port 4
   ↓
Closure JC-32
   ↓
Distribution Cable FC-88 / Core 12
   ↓
Backbone Cable FC-20 / Core 7
   ↓
PON 4
   ↓
OLT-BOG-03
   ↓
POP Satmatha
```

The system should highlight the full path on the map.

---

### Module 8 — Impact Analysis

Clicking an asset should show estimated downstream impact.

Examples:

```text
Fiber FC-21
Estimated Subscribers Affected: 287
```

```text
Splitter SP-18
Connected Subscribers: 7
```

```text
OLT-02
Potentially Affected Subscribers: 683
```

Impact analysis initially depends on static topology data.

Later it should integrate with live monitoring.

---

### Module 9 — Field Technician Mode

Mobile-first field workflows should include:

- GPS location
- Add pole
- Add splitter
- Add closure
- Add ONU
- Take a photo
- Scan a QR code
- Update ports
- Connect fiber
- Report damage
- Add notes
- Record completion

Example QR workflow:

```text
Scan QR
   ↓
Open Splitter SP-BGR-00219
   ↓
View Ports
   ↓
Update Port 03
   ↓
Attach Customer
   ↓
Save with GPS and Timestamp
```

---

### Module 10 — Audit and History

Every important change should be recorded.

Example:

```text
14 Aug, 11:43 AM
Splitter SP-119 moved 27 meters
Changed by Rahim
```

```text
14 Aug, 11:46 AM
Customer 1028 moved from Port 3 to Port 7
Changed by Karim
```

Audit history should include:

- User
- Timestamp
- Previous value
- New value
- Location
- Device
- Optional reason
- Related work order

---

## 10. MVP Exclusions

The first FiberOS release should not include:

- Full accounting
- Payroll
- HR
- Full CRM
- Invoicing
- Payment gateway
- FreeRADIUS
- Bandwidth control
- MikroTik provisioning
- Complete NMS
- Syslog platform
- Native mobile application
- AI chatbot
- Predictive maintenance
- Advanced analytics
- Full customer support ticketing

These belong to later phases.

---

## 11. MVP Completion Definition

The MVP is complete when:

> An ISP can digitally map one real FTTx zone containing at least 500 customers and accurately trace the physical network from POP, OLT, and PON through fibers, closures, splitters, ONUs, and subscriber endpoints.

This must work with real field data, not demo-only data.

---

## 12. Design Partner Strategy

The investor ISP group should be treated as:

> **Design Partner 01**

It is not merely a client.

Every feature request should be tested against this question:

> Is this a reusable product feature that creates value for multiple ISPs?

Custom requests that only benefit one company should be handled carefully.

---

## 13. Pilot Scope

Recommended first pilot:

```text
1 POP
2 OLTs
12 PONs
50 Fiber Segments
40 Closures
70 Splitters
500 Customers
```

The pilot must use real data and real technicians.

Key questions:

- How long does mapping take?
- Who collects the data?
- Who verifies the data?
- How accurate is GPS?
- How are existing records imported?
- How are field changes updated?
- How are topology mistakes prevented?
- How are historical changes preserved?
- How does the system behave when an asset is moved?

---

## 14. Technical Architecture

### Application Stack

- Laravel
- Vue 3
- Inertia.js
- PostgreSQL
- PostGIS
- Redis
- Queue workers
- Object storage
- MapLibre
- OpenStreetMap or compatible map tiles

### Initial Architecture

```text
Vue 3
   ↓
Laravel
   ↓
PostgreSQL + PostGIS
   ↓
Redis
   ↓
Queues
   ↓
Object Storage
```

### Mapping Layer

```text
MapLibre
   ↓
OpenStreetMap / Tile Provider
```

### Future Integration Layer

```text
FiberOS
   ↓
Events / API
   ↓
Monitoring Services
   ↓
Telemetry Storage
```

The first version should remain a modular monolith.

Avoid premature use of:

- Kubernetes
- Kafka
- Microservices
- ClickHouse
- Multiple programming languages
- Distributed event architecture

Add them only when justified by scale.

---

## 15. Domain Architecture

The domain should behave like a graph.

### Nodes

A node may represent:

- POP
- OLT
- PON
- ODF
- Closure
- Splitter
- ONU
- Customer endpoint
- Pole
- Cabinet

### Edges

An edge represents a relationship.

Examples:

```text
OLT
 ──connected_to──>
PON
```

```text
PON
 ──uses──>
Fiber Core
```

```text
Fiber Core
 ──spliced_to──>
Fiber Core
```

```text
Fiber Core
 ──feeds──>
Splitter
```

PostgreSQL can support the initial graph model.

A separate graph database is not required for the MVP.

---

## 16. Product Principles

### Principle 1

A field engineer should understand the interface without formal training.

### Principle 2

Common operations should require fewer than three primary interactions where practical.

### Principle 3

The system should avoid duplicate data entry.

### Principle 4

Mobile field workflows are as important as desktop workflows.

### Principle 5

Every important network change should have an audit trail.

### Principle 6

Integrate with existing systems before forcing replacement.

### Principle 7

The product must remain usable in low-bandwidth environments.

### Principle 8

The product must support Bangla and English interfaces over time.

### Principle 9

The internal data model should remain international and localization-ready.

### Principle 10

The product should favor operational simplicity over technical impressiveness.

---

## 17. Six-Month Product Roadmap

### Month 1 — Product Definition

Deliverables:

- Network domain model
- Workflow map
- Product requirement document
- Clickable UI prototype
- Technical architecture
- Design system
- GIS proof of concept
- Pilot zone selection

### Month 2 — Mapping Foundation

Build:

- Authentication
- Organization
- Roles
- Map
- POP
- OLT
- PON
- Poles
- Closures
- Splitters
- Fiber route drawing

Outcome:

> A real ISP network begins to appear digitally.

### Month 3 — Topology

Build:

- Fiber cables
- Fiber cores
- Connections
- Splices
- Splitter ports
- ONU
- Customer endpoint
- Network relationships

Outcome:

> The system understands network connectivity.

### Month 4 — Operations

Build:

- Search
- Network trace
- Customer trace
- Downstream dependency analysis
- Impact analysis
- Photos
- Notes
- Audit history

Outcome:

> Engineers can use the platform in real work.

### Month 5 — Field Workflow

Build:

- Responsive mobile interface
- GPS capture
- Field editing
- QR tagging
- Technician workflows
- Damage reporting
- Offline strategy if needed

Outcome:

> Field technicians can update network data directly.

### Month 6 — Productization

Build:

- Tenant onboarding
- Configuration
- Import tools
- User management
- Documentation
- Backups
- Support tools
- Deployment automation
- Pilot reports

Outcome:

> Three to five external ISP pilots can begin.

---

## 18. Team Plan

### Founder

Role:

- CEO
- Product
- Architecture
- Engineering leadership
- Hiring
- Budget control
- Customer discovery
- Investor communication

### Engineer 1

Preferred profile:

- Strong Laravel
- PostgreSQL
- Queues
- APIs
- Vue familiarity
- Ownership mindset
- System design capability

### Product Designer

Contract role:

- Information architecture
- GIS interaction design
- UX research
- Design system
- Mobile workflows
- Prototype creation

### Network Engineer

Contract or advisor role:

- FTTx domain validation
- Equipment workflows
- Fiber topology
- OLT/PON logic
- Field process review

### Later Hires

- Engineer 2
- QA engineer
- Implementation engineer
- Support engineer
- Sales and marketing staff

---

## 19. Hiring Sequence

```text
Month 1
Founder
Designer
Network Advisors

Month 2
+ Engineer 1

Month 4
+ Engineer 2 if justified

Month 5 or 6
+ QA / Implementation Engineer

Month 6+
+ Sales / Support as required
```

Hiring should follow product milestones, not happen all at once.

---

## 20. First-Year Budget Framework

| Category                             | Annual Estimate |
| ------------------------------------ | --------------: |
| Founder salary and tools             |     BDT 12 lakh |
| Engineering salaries                 |  BDT 11–14 lakh |
| Design and consultants               |    BDT 3–4 lakh |
| Office, internet, utilities          |    BDT 3–4 lakh |
| Cloud and development infrastructure |    BDT 2–3 lakh |
| Devices and testing equipment        |      BDT 2 lakh |
| Legal, accounting, company setup     |    BDT 1.5 lakh |
| Travel and customer research         |      BDT 1 lakh |
| Miscellaneous                        |    BDT 1.5 lakh |
| Operational reserve                  |    BDT 2–3 lakh |

Estimated total:

**BDT 39–44 lakh**

Recommended:

- Core plan: BDT 40 lakh
- Additional contingency: BDT 8–10 lakh

---

## 21. Product KPIs

### Product KPIs

- One production-ready GIS platform
- Accurate topology mapping
- Reliable network tracing
- Real field adoption
- Auditable network history
- Stable backup and recovery

### Adoption Targets

Suggested operating targets:

- Month 3 — 1 internal network
- Month 6 — 3–5 external pilots
- Month 9 — 15 paying ISPs
- Month 12 — 30–50 paying ISPs

These are targets, not legal commitments.

---

## 22. Commercial Model

### Subscription Revenue

Possible pricing dimensions:

- Subscriber count
- Number of OLTs
- Number of PONs
- Number of assets
- Number of users
- Number of modules
- Storage usage
- Monitoring usage

Possible plans:

- Starter
- Growth
- Enterprise

### Implementation Revenue

Charge separately for:

- Initial mapping
- Network digitization
- Data migration
- Asset import
- Custom onboarding
- Training
- Field implementation

### Expansion Revenue

Future modules:

```text
GIS              Base Subscription
NMS              Additional Subscription
Billing / AAA    Additional Subscription
Logs             Additional Subscription
Field Operations Additional Subscription
```

---

## 23. Product Sequence

### Product 1

**FiberOS GIS**

- FTTx mapping
- Inventory
- Topology
- Trace
- Impact analysis
- Field workflow

### Product 2

Likely:

**FiberOS Monitor**

- Device availability
- Latency
- Packet loss
- Traffic
- PON status
- ONU status
- Optical power
- Alerts
- Outage impact

### Product 3

Likely:

**FiberOS AAA**

- FreeRADIUS integration
- PPPoE
- Session management
- Subscriber provisioning
- Disconnect and reconnect
- Package control

### Product 4

**FiberOS Billing**

- CRM
- Packages
- Invoices
- Payments
- Resellers
- Suspensions
- Customer portal

### Product 5

**FiberOS Logs**

Possible scope:

- RADIUS accounting logs
- Authentication logs
- NAT/session logs
- Syslog
- Historical search
- Subscriber-to-IP lookup
- Retention
- Compliance export

---

## 24. Competitive Advantage

The moat is not only technology.

The long-term advantages may become:

- Deep ISP operational knowledge
- Best user experience in the market
- Strong local implementation support
- Installed network topology data
- Device integrations
- Historical outage data
- Field adoption
- High switching cost
- Network intelligence

The combination of topology, telemetry, customer, and historical data may later support advanced analytics and AI.

---

## 25. Long-Term Intelligence Layer

Future questions the platform may answer:

- Why are customers in this area experiencing poor quality?
- Which fiber segment is probably damaged?
- Which PON is approaching capacity?
- Which subscribers are affected by this outage?
- Which splitters are overused?
- Which network zones have poor documentation?
- Which devices require replacement?
- Which routes have the highest operational risk?

---

## 26. Company Culture

### Product Over Projects

Avoid unrelated custom software contracts.

### Simplicity Over Complexity

Build the easiest ISP operations platform to use.

### Field Reality Over Assumptions

Validate workflows with real technicians.

### Small Releases Over Large Delays

One working POP is more valuable than hundreds of unfinished screens.

### Recurring Revenue Over One-Time Revenue

Implementation income is useful. Subscription income builds the company.

### Documentation Over Founder Dependency

The company must not depend permanently on one person.

---

## 27. Twelve-Month Mission

> Digitize and operationalize ISP fiber networks.

The Year 1 mission is not to build every ISP software module.

---

## 28. First Six Weeks

### Week 1

- Company structure
- Legal setup
- Bank account
- Accounting
- Investor alignment
- Product workshops

### Week 2

- Field observation
- Real network documentation
- Pilot area selection
- Interview owners, NOC, engineers, and technicians

### Week 3

- Finalize domain model
- Finalize GIS workflows
- Finalize technical architecture
- Prepare UI direction

### Week 4

- Build clickable prototype
- Test with at least five ISP professionals
- Document feedback

### Week 5

- Build GIS proof of concept
- Use real coordinates
- Map a real POP and route

### Week 6

- Start production development
- Demonstrate real POP, fiber, splitter, and subscriber connection

---

## 29. FiberOS Version 1

### Name

**FiberOS 1.0 — Network Mapping and FTTx Inventory**

### Features

- Organization
- Users
- Roles
- GIS
- POP
- OLT
- PON
- Fiber cable
- Fiber core
- Closure
- Splitter
- ONU
- Customer endpoint
- Topology
- Network trace
- Impact analysis
- Mobile field updates
- Audit log

---

## 30. Key Product Screen

The most important early screen is the unified network map and trace screen.

```text
-------------------------------------------------------
 Search customer, POP, OLT, splitter...
-------------------------------------------------------

                  INTERACTIVE MAP

       ● POP
         │
         ├──────────── Fiber ──────────────┐
         │                                  │
       Splitter                           Splitter
       ●                                  ●

                          [ Customer ● ]

-------------------------------------------------------
 Selected: Customer 10429

 ONU: VSOL...
 OLT: BOG-OLT-04
 PON: 06
 Splitter: SP-188 / Port 07

 [ Trace Network ]

 Customer → Splitter → Closure → Fiber → OLT → POP

 Estimated dependent assets: ...
-------------------------------------------------------
```

This screen should demonstrate:

- Search
- Map visualization
- Asset selection
- Customer topology
- Network trace
- Impact analysis
- Clear hierarchy
- Simple interaction
- Real network value

---

## 31. Pre-Pitch Proof of Concept

The pre-pitch proof of concept should not attempt to implement the complete product.

It should visually demonstrate:

1. A real network map
2. One POP
3. One OLT
4. One PON
5. One backbone fiber
6. One closure
7. One splitter
8. Three to five customers
9. Search
10. Asset selection
11. Network trace animation
12. Impact count

### Suggested Demo Flow

1. Open dashboard
2. Show network overview
3. Search for a customer
4. Zoom to customer location
5. Open customer side panel
6. Click **Trace Network**
7. Highlight the route from customer to POP
8. Click a fiber segment
9. Show affected customer count
10. Switch to mobile technician view
11. Add or update a splitter
12. Save with GPS and photo

### Pre-Pitch Goal

The viewer should understand the product within two minutes.

Desired reaction:

> I can finally see my network and understand exactly what is connected to what.

---

## 32. Required Internal Documents

Before full development begins, create:

1. Founders and Investment Term Sheet
2. Shareholder Agreement
3. Twelve-Month Operating Budget
4. FiberOS Product Requirements Document
5. Technical Architecture Document
6. Six-Month Product Roadmap
7. Pilot Implementation Plan
8. Product Design Prototype
9. Data Ownership and Security Policy
10. Initial Pricing and Packaging Study

---

## 33. Final Operating Principle

The company should not try to build every ISP tool at once.

The first objective is:

> Build the simplest and most useful FTTx GIS and network inventory product for small and mid-sized ISPs, prove it in a real network, and turn it into a repeatable SaaS product.

Everything else should be built on top of that foundation.
