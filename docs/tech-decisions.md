# FiberOS — Technology Decisions

Running decision log from the pre-build planning session. No code is written against this
document; it exists so the pitch and the future build phases can proceed with a defensible,
recorded rationale for every package/tool choice.

Each entry: **Decision** — what we chose. **Why** — the reasoning. **Status** — POC-now vs
future-phase (recorded but not built).

---

## Session scope

- **Decision:** This session covers two separate tracks — (1) the POC pitch app (static-data,
  Laravel/Vue, per `docs/context.md`) and (2) the forward-looking architecture for the
  Python-based connectivity/telemetry layer (the future "FiberOS Monitor" module, per
  `docs/fiberos_plan.md` §6). Track 2 is decided and recorded here, not built.
- **Why:** `docs/fiberos_plan.md` §14 scopes the MVP as a single-language Laravel monolith and
  explicitly excludes live device connectivity (§10) from the first release. The POC pitch must
  stay within that scope. But the user wants the Python/connectivity plan settled and written
  down now so the pitch can speak to it with confidence, without actually building it this
  session.
- **Status:** decided.

---

## POC pitch app (docs/context.md)

- **Decision:** Data storage is PostgreSQL + PostGIS, seeded via a Laravel seeder — not a raw
  JSON fixture file.
  **Why:** The main platform already runs Postgres/PostGIS (fiberos_plan.md §14); seeding real
  tables costs little extra and means the demo runs on the actual production data model instead
  of a throwaway fixture path.
  **Status:** decided — POC.

- **Decision:** Trace and impact-analysis results are computed by one Laravel endpoint
  (e.g. `GET /assets/{id}/trace`), not walked client-side in Vue.
  **Why:** Server-side computation is reusable once this becomes a real (non-static) feature;
  Vue only ever renders a path array, so there's no client-side graph-walking logic to delete
  later.
  **Status:** decided — POC.

- **Decision:** No authentication in the POC pitch build.
  **Why:** Basic auth already exists in the app for later use; the pitch is a controlled
  presentation (context.md §7 explicitly allows skipping it), so it adds no value to the demo.
  **Status:** decided — POC.

---

## Future: Laravel ↔ Python integration shape (Monitor module)

- **Decision:** A Python service (FastAPI) owns device polling. It writes results into the
  shared PostgreSQL database (single source of truth) and publishes change events onto Redis
  for anything Laravel needs to react to in real time (e.g. a live status dot on the map).
  **Why:** Avoids Laravel blocking synchronously on slow SNMP/SSH round-trips; avoids a second
  versioned API contract for routine data; matches fiberos_plan.md §15 ("PostgreSQL can support
  the initial graph model, no separate graph DB required").
  **Status:** decided — future phase, recorded only.

- **Decision:** Python, confirmed for the objective (not team-fit) reason below.
  **Why:** Device polling (SNMP/SSH into OLTs, routers, switches) is I/O-bound, not CPU-bound —
  the bottleneck is device response latency, not language speed. Python's `asyncio` handles
  thousands of concurrent connections fine in this regime since the GIL releases during I/O
  waits. Go's real advantage (goroutines, lower per-connection memory, static binary) only
  matters at very high single-instance concurrency (tens of thousands of simultaneous polls,
  carrier-NMS scale) or CPU-bound work — neither applies here, since deployments are
  **per-tenant/standalone** (confirmed below), each polling at most low-hundreds of devices.
  At this scale Python is not just team-preferred but the objectively correct choice, and it
  comes with a materially more mature networking-library ecosystem (Netmiko, NAPALM, Scrapli,
  Nornir have no comparable Go equivalent).
  **Status:** decided — future phase, recorded only.

- **Decision:** Deployment model is per-tenant/standalone — one FiberOS instance (Laravel app +
  its Python connectivity service) per ISP client, not a shared multi-tenant SaaS instance
  serving all clients from one deployment.
  **Why:** Network topology and telemetry data is sensitive; the client explicitly wants data
  isolation per ISP rather than a shared multi-tenant database/service. This is also what keeps
  the Python service's polling load bounded to one ISP's device count, which is what makes the
  Python-over-Go call above hold at scale.
  **Status:** decided.

- **Decision:** Device connectivity libraries: **Netmiko + pysnmp** as the core pair (SSH/CLI
  and SNMP respectively). Scrapli noted as a later swap-in only if polling latency becomes a
  measured bottleneck.
  **Why:** At per-tenant/low-hundreds-of-devices scale, Netmiko's maturity and multi-vendor
  coverage matter more than Scrapli's raw asyncio-native speed edge; most FTTx OLT gear exposes
  useful data over SNMP alongside CLI.
  **Status:** decided — future phase, recorded only.

- **Decision:** Task scheduling for periodic polling is **APScheduler**, running in-process
  inside the FastAPI service — not Celery.
  **Why:** Celery's distributed-worker machinery solves a scale problem this deployment doesn't
  have (single instance, per-tenant). Redis is already present for the pub/sub events (see
  Laravel↔Python decision above), so APScheduler keeps polling as one deployable unit without
  introducing a task-queue broker pattern prematurely.
  **Status:** decided — future phase, recorded only.

---

## Deployment model

- **Decision:** On-prem, single instance per ISP client — one Docker Compose stack (Laravel +
  Postgres/PostGIS + Redis + Python/FastAPI poller) running on a server inside the ISP's own
  network. Not a centrally cloud-hosted multi-tenant service.
  **Why:** Routers/OLTs/switches sit on the ISP's private LAN and are not internet-routable —
  a cloud-hosted poller cannot reach them without a tunnel or on-site agent. On-prem also
  matches the per-tenant data-isolation decision above (sensitive topology/telemetry data
  stays on the client's own network) and matches "single instance, managed by the client."
  Python dependency management via Poetry; the stack ships as Docker images for reproducible
  installs across every client site.
  **Status:** decided.

- **Decision:** Updates are pulled, not pushed: the on-prem box dials **outbound** to a central
  release server to check for and download updates. No inbound connection into the ISP's
  network is ever required.
  **Why:** Outbound-only is safe by default (no firewall/port-forwarding changes needed at the
  client site) and is the standard pattern for self-hosted appliance software.
  **Status:** decided.

- **Decision:** Field/mobile technician access to the on-prem app uses an **outbound tunnel to
  a cloud edge** (Cloudflare Tunnel; self-hosted alternatives: Tailscale Funnel, frp), giving
  each client a stable HTTPS URL (e.g. `isp-name.fiberos.app`). No VPN client required on the
  technician's phone.
  **Why:** The technician's phone is off the ISP's LAN in the field; a plain HTTPS URL is the
  lowest-friction way to reach an on-prem box behind NAT/CGNAT, and it reuses the same
  dial-out-only posture as the update mechanism.
  **Status:** decided — future phase (Field Technician module), recorded only.

- **Decision:** Offline-first PWA support for the Field Technician view (service worker cache +
  local edit queue + background sync) is **flagged as a known gap, deferred** — not built in
  the first version of that module.
  **Why:** fiberos_plan.md §16 Principle 7 and §9 Module 9 both call out low-bandwidth/offline
  field conditions, so this is real scope, not optional — but it's explicitly out of the first
  cut so it doesn't block the rest of the module. Must be revisited before the Field Technician
  view goes to real field use.
  **Status:** deferred, tracked.

- **Decision:** Licensing for the per-month subscription uses **phone-home signed-token
  validation** over the same outbound update channel: a central billing service issues a signed
  token (tenant ID, expiry, feature flags); the on-prem app validates it locally and tolerates
  a grace period (7–14 days) of no connectivity before degrading.
  **Why:** Matches the pattern used by other on-prem commercial software (GitLab self-managed,
  Zabbix, WHMCS); avoids the app locking out a client mid-incident purely because of a temporary
  internet outage at their site — which would be especially bad for a network-fault tool.
  **Status:** decided — future phase, recorded only.
