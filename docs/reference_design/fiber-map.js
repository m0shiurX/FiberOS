/* FiberOS GIS map surface — real OSM tiles via Leaflet, driven by `fos:map-state` events.
   Pure rendering: all inventory data arrives in the event detail. */
(() => {
  const tok = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || '#888';
  let P = null;
  const palette = () => P || (P = {
    blue: tok('--blue-600'), ink: tok('--ink-900'), cyan: tok('--cyan-500'),
    green: tok('--green-500'), violet: tok('--viz-4'), amber: tok('--amber-500'),
    red: tok('--red-500'), grey: tok('--n-400'), mid: tok('--n-600'),
    hair: tok('--border-hairline'), card: '#fff',
  });

  const statusColor = (s, p) => s === 'offline' || s === 'critical' ? p.red
    : s === 'warning' ? p.amber : null;

  const SHAPE = {
    pop:      p => ({ size: 16, css: `background:${p.blue};border-radius:5px` }),
    rack:     p => ({ size: 11, css: `background:#fff;border:2px solid ${p.mid};border-radius:2px` }),
    pole:     p => ({ size: 7,  css: `background:${p.grey};border-radius:50%` }),
    manhole:  p => ({ size: 9,  css: `background:#fff;border:2px solid ${p.grey};border-radius:2px` }),
    olt:      p => ({ size: 14, css: `background:${p.violet};border-radius:4px` }),
    router:   p => ({ size: 12, css: `background:${p.ink};border-radius:4px` }),
    switch:   p => ({ size: 12, css: `background:${p.mid};border-radius:4px` }),
    odf:      p => ({ size: 12, css: `background:${p.cyan};border-radius:2px` }),
    closure:  p => ({ size: 12, css: `background:${p.cyan};border-radius:2px;transform:rotate(45deg)` }),
    splitter: p => ({ size: 11, css: `background:${p.ink};border-radius:50%` }),
    fdb:      p => ({ size: 12, css: `background:#fff;border:3px solid ${p.ink};border-radius:3px` }),
    onu:      p => ({ size: 9,  css: `background:${p.green};border-radius:50%` }),
  };

  const CABLE = {
    feeder:       p => ({ color: p.blue, weight: 3.5, opacity: .85 }),
    distribution: p => ({ color: p.cyan, weight: 2.5, opacity: .85 }),
    drop:         p => ({ color: p.grey, weight: 1.5, opacity: .9, dashArray: '3 4' }),
  };

  class FiberMap extends HTMLElement {
    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      this.style.cssText = 'display:block;position:relative;width:100%;height:100%';
      this._host = document.createElement('div');
      this._host.style.cssText = 'position:absolute;inset:0';
      this.appendChild(this._host);
      this._onState = e => { this._state = e.detail; this._draw(); };
      window.addEventListener('fos:map-state', this._onState);
      this._boot();
    }
    disconnectedCallback() { window.removeEventListener('fos:map-state', this._onState); }

    async _boot() {
      for (let i = 0; i < 200 && !window.L; i++) await new Promise(r => setTimeout(r, 40));
      if (!window.L) return;
      const L = window.L;
      this.map = L.map(this._host, {
        center: [24.8478, 89.3735], zoom: 15, zoomControl: false,
        attributionControl: true, preferCanvas: false,
      });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors', maxZoom: 19, opacity: .92,
      }).addTo(this.map);
      L.control.zoom({ position: 'topright' }).addTo(this.map);
      this.groups = {};
      this._state = this._state || window.__FOS_MAP_STATE;
      this._draw();
    }

    _layer(key) {
      if (!this.groups[key]) this.groups[key] = window.L.layerGroup().addTo(this.map);
      this.groups[key].clearLayers();
      return this.groups[key];
    }

    _draw() {
      const s = this._state, L = window.L;
      if (!this.map || !s || !s.data) return;
      const p = palette();
      const on = k => s.visible && s.visible[k] !== false;
      const trace = new Set(s.trace || []);
      const sel = s.selected;
      const byId = {};
      s.data.nodes.forEach(n => { byId[n.id] = n; });

      s.data.cables.forEach(c => {
        const g = this._layer('cable:' + c.id);
        if (!on(c.type)) return;
        const base = CABLE[c.type](p);
        const hot = trace.has(c.id);
        L.polyline(c.path, hot ? { ...base, color: p.blue, weight: base.weight + 3, opacity: .28, dashArray: null } : { ...base, opacity: base.opacity * .001 }).addTo(g);
        L.polyline(c.path, { ...base, color: hot ? p.blue : base.color, weight: hot ? base.weight + 1 : base.weight })
          .addTo(g).on('click', () => this._emit(c.id));
      });

      const links = this._layer('links');
      if (on('connections')) s.data.links.forEach(([a, b]) => {
        if (!byId[a] || !byId[b]) return;
        L.polyline([[byId[a].lat, byId[a].lng], [byId[b].lat, byId[b].lng]],
          { color: p.grey, weight: 1, opacity: .55, dashArray: '2 5', interactive: false }).addTo(links);
      });

      const halos = this._layer('halos');
      s.data.nodes.forEach(n => {
        const warnSignal = on('signal') && n.flag === 'signal';
        const warnCap = on('capacity') && n.flag === 'capacity';
        if ((warnSignal || warnCap) && on(n.type)) {
          L.circleMarker([n.lat, n.lng], {
            radius: 13, color: p.amber, weight: 1.5, opacity: .7,
            fillColor: p.amber, fillOpacity: .12, interactive: false,
          }).addTo(halos);
        }
      });

      const nodes = this._layer('nodes');
      s.data.nodes.forEach(n => {
        if (!on(n.type)) return;
        const shape = (SHAPE[n.type] || SHAPE.onu)(p);
        const sc = statusColor(n.status, p);
        const fill = sc && (n.type === 'onu' || n.type === 'fdb') ? `background:${sc};border-color:${sc}` : '';
        const ring = n.id === sel
          ? `box-shadow:0 0 0 3px #fff,0 0 0 6px ${p.blue}66`
          : sc ? `box-shadow:0 0 0 2px #fff,0 0 0 4px ${sc}55`
          : trace.has(n.id) ? `box-shadow:0 0 0 2px #fff,0 0 0 4px ${p.blue}55` : `box-shadow:0 0 0 2px #fff`;
        const marker = L.marker([n.lat, n.lng], {
          zIndexOffset: n.id === sel ? 1000 : 0,
          icon: L.divIcon({
            className: '', iconSize: [shape.size, shape.size],
            iconAnchor: [shape.size / 2, shape.size / 2],
            html: `<div title="${n.name}" style="width:${shape.size}px;height:${shape.size}px;${shape.css};${fill};${ring};cursor:pointer"></div>`,
          }),
        }).addTo(nodes);
        marker.on('click', () => this._emit(n.id));
      });

      const incidents = this._layer('incidents');
      if (on('incidents')) (s.data.incidents || []).forEach(i => {
        L.circleMarker([i.lat, i.lng], {
          radius: 16, color: p.red, weight: 1.5, fillColor: p.red, fillOpacity: .1,
        }).addTo(incidents).on('click', () => this._emit(i.id));
        L.marker([i.lat, i.lng], {
          icon: L.divIcon({
            className: '', iconSize: [22, 22], iconAnchor: [11, 11],
            html: `<div style="width:22px;height:22px;border-radius:50%;background:${p.red};box-shadow:0 0 0 3px #fff;display:flex;align-items:center;justify-content:center;color:#fff;font:600 12px/1 Inter,sans-serif;cursor:pointer">!</div>`,
          }),
        }).addTo(incidents).on('click', () => this._emit(i.id));
      });

      if (sel && byId[sel] && s.follow !== this._lastFollow) {
        this._lastFollow = s.follow;
        this.map.panTo([byId[sel].lat, byId[sel].lng], { animate: true, duration: .4 });
      }
      if (s.fit && s.fit !== this._lastFit) {
        this._lastFit = s.fit;
        const pts = s.data.nodes.filter(n => trace.has(n.id)).map(n => [n.lat, n.lng]);
        if (pts.length > 1) this.map.fitBounds(pts, { padding: [70, 70] });
      }
    }

    _emit(id) { window.dispatchEvent(new CustomEvent('fos:map-select', { detail: { id } })); }
  }
  if (!window.customElements.get('fiber-map')) window.customElements.define('fiber-map', FiberMap);
})();
