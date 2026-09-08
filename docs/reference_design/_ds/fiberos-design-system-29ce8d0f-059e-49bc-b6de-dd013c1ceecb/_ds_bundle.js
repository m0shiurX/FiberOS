/* @ds-bundle: {"format":4,"namespace":"FiberOSDesignSystem_29ce8d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"DonutGauge","sourcePath":"components/data/DonutGauge.jsx"},{"name":"Heatmap","sourcePath":"components/data/Heatmap.jsx"},{"name":"MetricList","sourcePath":"components/data/MetricList.jsx"},{"name":"SparkArea","sourcePath":"components/data/SparkArea.jsx"},{"name":"StackedBar","sourcePath":"components/data/StackedBar.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"UtilizationBar","sourcePath":"components/data/UtilizationBar.jsx"},{"name":"AlertItem","sourcePath":"components/feedback/AlertItem.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SearchField","sourcePath":"components/forms/SearchField.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AccountChip","sourcePath":"components/navigation/AccountChip.jsx"},{"name":"AppRail","sourcePath":"components/navigation/AppRail.jsx"},{"name":"NavPanel","sourcePath":"components/navigation/NavPanel.jsx"},{"name":"Topbar","sourcePath":"components/navigation/Topbar.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"92fe4381ed76","components/core/Button.jsx":"50528af8b888","components/core/Card.jsx":"3a258babc1fa","components/core/Icon.jsx":"5a2a28990667","components/core/IconButton.jsx":"0b98bbc37ac6","components/core/StatusPill.jsx":"02f57f2ab023","components/core/Tag.jsx":"68154e0acec2","components/data/BarChart.jsx":"62ef019856bf","components/data/DataTable.jsx":"6d5f2da736af","components/data/DonutGauge.jsx":"0e1517a8aa41","components/data/Heatmap.jsx":"047fa6f432af","components/data/MetricList.jsx":"7c3f561e64b5","components/data/SparkArea.jsx":"16d17a6d6b99","components/data/StackedBar.jsx":"07df7effd134","components/data/StatTile.jsx":"592988fdc6db","components/data/UtilizationBar.jsx":"3363b7012584","components/feedback/AlertItem.jsx":"ea19055ef66a","components/feedback/EmptyState.jsx":"b5c5e98290a6","components/forms/Checkbox.jsx":"965ab4a4d2a4","components/forms/Input.jsx":"d32c510400b6","components/forms/SearchField.jsx":"ff3e68112621","components/forms/SegmentedControl.jsx":"9357be7cfeb5","components/forms/Select.jsx":"a3ef2fc27393","components/forms/Switch.jsx":"85989daadfc1","components/navigation/AccountChip.jsx":"5e22db80a313","components/navigation/AppRail.jsx":"9056f7b11d8e","components/navigation/NavPanel.jsx":"541e8b56bbd2","components/navigation/Topbar.jsx":"a6953555b471","ui_kits/fiberos-console/App.jsx":"2536ee7a6645","ui_kits/fiberos-console/Screens.jsx":"a61fd5a2f3d2","ui_kits/fiberos-console/data.js":"bb0e3a309e5d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FiberOSDesignSystem_29ce8d = window.FiberOSDesignSystem_29ce8d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    bg: 'var(--n-100)',
    fg: 'var(--text-secondary)'
  },
  brand: {
    bg: 'var(--blue-50)',
    fg: 'var(--blue-700)'
  },
  ok: {
    bg: 'var(--green-50)',
    fg: 'var(--green-700)'
  },
  warn: {
    bg: 'var(--amber-50)',
    fg: 'var(--amber-700)'
  },
  critical: {
    bg: 'var(--red-50)',
    fg: 'var(--red-700)'
  }
};
function Badge({
  tone = 'neutral',
  children,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20px',
      height: '20px',
      padding: '0 7px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-micro-size)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '0.2px',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      color: t.fg,
      background: t.bg,
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: '32px',
    padding: '0 14px',
    fontSize: '13px',
    gap: '6px'
  },
  md: {
    height: '40px',
    padding: '0 20px',
    fontSize: '15px',
    gap: '8px'
  },
  lg: {
    height: '48px',
    padding: '0 28px',
    fontSize: '17px',
    gap: '10px'
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-on-accent)',
    borderColor: 'transparent',
    hover: 'var(--action-primary-hover)'
  },
  secondary: {
    background: 'var(--action-secondary-bg)',
    color: 'var(--text-primary)',
    borderColor: 'var(--action-secondary-border)',
    hover: 'var(--n-50)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderColor: 'transparent',
    hover: 'var(--action-ghost-hover)'
  },
  accent: {
    background: 'var(--cyan-500)',
    color: '#fff',
    borderColor: 'transparent',
    hover: 'var(--cyan-600)'
  },
  success: {
    background: 'transparent',
    color: 'var(--green-600)',
    borderColor: 'var(--green-500)',
    hover: 'var(--green-50)'
  },
  danger: {
    background: 'var(--red-500)',
    color: '#fff',
    borderColor: 'transparent',
    hover: 'var(--red-600)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  iconLeft,
  iconRight,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest, {
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-body)',
      fontSize: s.fontSize,
      fontWeight: 'var(--weight-medium)',
      letterSpacing: '-0.1px',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      color: v.color,
      background: disabled ? 'var(--n-100)' : hover ? v.hover : v.background,
      border: `1px solid ${disabled ? 'transparent' : v.borderColor}`,
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 1 : 1,
      transform: press && !disabled ? `scale(${pill ? 'var(--press-scale-large)' : 'var(--press-scale)'})` : 'scale(1)',
      transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-instant) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)',
      ...(disabled ? {
        color: 'var(--text-disabled)'
      } : null),
      ...style
    }
  }), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  title,
  subtitle,
  actions,
  footer,
  padding,
  inverse = false,
  bleed = false,
  children,
  style,
  ...rest
}) {
  const pad = padding != null ? padding : 'var(--card-padding)';
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: inverse ? 'var(--surface-inverse)' : 'var(--surface-card)',
      border: `1px solid ${inverse ? 'var(--border-on-dark)' : 'var(--border-hairline)'}`,
      borderRadius: 'var(--radius-lg)',
      color: inverse ? 'var(--text-on-dark)' : 'var(--text-primary)',
      overflow: 'hidden',
      ...style
    }
  }), (title || actions) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-sm)',
      padding: `${pad} ${pad} ${subtitle ? '12px' : '14px'}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-heading-sm-size)',
      fontWeight: 'var(--type-heading-sm-weight)',
      letterSpacing: 'var(--type-heading-sm-ls)',
      lineHeight: 1.3,
      color: inverse ? 'var(--text-on-dark)' : 'var(--text-primary)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--type-body-sm-size)',
      color: inverse ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: '0 0 auto'
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      padding: bleed ? 0 : title ? `0 ${pad} ${pad}` : pad
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: `12px ${pad}`,
      borderTop: `1px solid ${inverse ? 'var(--border-on-dark)' : 'var(--border-hairline)'}`,
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-muted)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = 'https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/';

/* Renders a Lucide glyph as a CSS mask so it inherits currentColor. */
function Icon({
  name,
  size = 16,
  color = 'currentColor',
  style,
  ...rest
}) {
  const url = `url("${BASE}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      flex: '0 0 auto',
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 28,
  md: 34,
  lg: 40
};
function IconButton({
  icon,
  name,
  size = 'md',
  variant = 'ghost',
  round = false,
  disabled = false,
  active = false,
  label,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const px = SIZES[size] || SIZES.md;
  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const bg = solid ? hover ? 'var(--action-primary-hover)' : 'var(--action-primary)' : active || hover ? 'var(--action-ghost-hover)' : 'transparent';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      color: disabled ? 'var(--text-disabled)' : solid ? '#fff' : active ? 'var(--text-primary)' : 'var(--text-muted)',
      background: disabled ? 'transparent' : bg,
      border: outline ? '1px solid var(--border-hairline)' : '1px solid transparent',
      borderRadius: round ? 'var(--radius-full)' : 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transform: press && !disabled ? 'scale(var(--press-scale))' : 'scale(1)',
      transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-instant) var(--ease-standard)',
      ...style
    }
  }), icon || /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: size === 'sm' ? 14 : 16
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  ok: {
    bg: 'var(--status-ok-bg)',
    fg: 'var(--status-ok-text)',
    dot: 'var(--status-ok)'
  },
  warn: {
    bg: 'var(--status-warn-bg)',
    fg: 'var(--status-warn-text)',
    dot: 'var(--status-warn)'
  },
  critical: {
    bg: 'var(--status-critical-bg)',
    fg: 'var(--status-critical-text)',
    dot: 'var(--status-critical)'
  },
  info: {
    bg: 'var(--status-info-bg)',
    fg: 'var(--status-info-text)',
    dot: 'var(--status-info)'
  },
  active: {
    bg: 'var(--status-active-bg)',
    fg: 'var(--status-active-text)',
    dot: 'var(--status-active)'
  },
  idle: {
    bg: 'var(--status-idle-bg)',
    fg: 'var(--status-idle-text)',
    dot: 'var(--status-idle)'
  }
};
function StatusPill({
  tone = 'ok',
  children,
  dot = true,
  outline = false,
  icon,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.ok;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      height: '24px',
      padding: '0 10px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-caption-size)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      color: t.fg,
      background: outline ? 'transparent' : t.bg,
      border: `1px solid ${outline ? t.dot : 'transparent'}`,
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }), icon, !icon && dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: t.dot,
      flex: '0 0 auto'
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  onRemove,
  selected = false,
  icon,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      height: '28px',
      padding: onRemove ? '0 6px 0 12px' : '0 12px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1,
      color: selected ? 'var(--blue-700)' : 'var(--text-secondary)',
      background: selected ? 'var(--blue-50)' : 'var(--n-0)',
      border: `1px solid ${selected ? 'var(--blue-200)' : 'var(--border-hairline)'}`,
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }), icon, children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      marginLeft: 2,
      padding: 0,
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      fontSize: 14,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BarChart({
  data = [],
  series = [{
    key: 'in',
    label: 'Traffic In',
    color: 'var(--n-400)'
  }, {
    key: 'out',
    label: 'Traffic Out',
    color: 'var(--viz-tx)'
  }],
  height = 260,
  yTicks = 5,
  unit = '',
  legend = true,
  style,
  ...rest
}) {
  const max = Math.max(1, ...data.flatMap(d => series.map(s => d[s.key] || 0)));
  const top = Math.ceil(max / 20) * 20 || 20;
  const lines = Array.from({
    length: yTicks + 1
  }, (_, i) => Math.round(top / yTicks * i)).reverse();
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height,
      paddingBottom: 22,
      flex: '0 0 auto'
    }
  }, lines.map(v => /*#__PURE__*/React.createElement("span", {
    key: v,
    style: {
      fontSize: 'var(--type-caption-size)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, v, unit && ' ' + unit))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      height
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 0 22px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, lines.map(v => /*#__PURE__*/React.createElement("span", {
    key: v,
    style: {
      borderTop: '1px dashed var(--viz-grid)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      height: height - 22,
      gap: '2px'
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '3px',
      flex: 1,
      height: '100%'
    }
  }, series.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.key,
    title: `${s.label}: ${d[s.key]}`,
    style: {
      width: '38%',
      maxWidth: 16,
      height: `${(d[s.key] || 0) / top * 100}%`,
      background: s.color,
      borderRadius: '3px 3px 0 0'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      height: 22,
      alignItems: 'flex-end'
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      textAlign: 'center',
      fontSize: 'var(--type-caption-size)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, d.label))))), legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'
    }
  }, series.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.key,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      background: s.color,
      borderRadius: '2px'
    }
  }), s.label))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DataTable({
  columns = [],
  rows = [],
  onRowClick,
  dense = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(-1);
  const pad = dense ? '10px 12px' : '13px 16px';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      width: '100%',
      overflowX: 'auto',
      ...style
    }
  }), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      padding: pad,
      textAlign: c.align || 'left',
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--weight-regular)',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      borderBottom: '1px solid var(--border-hairline)',
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.id != null ? r.id : i,
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    onClick: () => onRowClick && onRowClick(r, i),
    style: {
      background: hover === i ? 'var(--surface-sunken)' : 'transparent',
      cursor: onRowClick ? 'pointer' : 'default',
      transition: 'background var(--dur-fast) var(--ease-standard)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: pad,
      textAlign: c.align || 'left',
      fontSize: 'var(--type-body-size)',
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, c.render ? c.render(r[c.key], r, i) : r[c.key])))))));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/DonutGauge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DonutGauge({
  segments = [],
  total,
  caption,
  size = 180,
  dots = 44,
  style,
  ...rest
}) {
  const sum = segments.reduce((s, x) => s + (x.value || 0), 0) || 1;
  const r = size / 2 - 8;
  let acc = 0;
  const marks = [];
  segments.forEach((seg, si) => {
    const count = Math.max(1, Math.round(seg.value / sum * dots));
    for (let i = 0; i < count && marks.length < dots; i++) {
      const idx = acc + i;
      const a = idx / dots * Math.PI * 2 - Math.PI / 2;
      marks.push({
        x: size / 2 + r * Math.cos(a),
        y: size / 2 + r * Math.sin(a),
        color: seg.color || `var(--viz-${si % 6 + 1})`
      });
    }
    acc += count;
  });
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: '0 0 auto',
      ...style
    }
  }), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    role: "img"
  }, marks.map((m, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: m.x,
    cy: m.y,
    r: 3.5,
    fill: m.color
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-metric-xl-size)',
      fontWeight: 600,
      letterSpacing: '-0.6px',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, total), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-muted)'
    }
  }, caption)));
}
Object.assign(__ds_scope, { DonutGauge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DonutGauge.jsx", error: String((e && e.message) || e) }); }

// components/data/Heatmap.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Heatmap({
  values = [],
  columns = 12,
  cell = 14,
  gap = 3,
  color = 'var(--viz-1)',
  labels = [],
  legend = true,
  style,
  ...rest
}) {
  const max = Math.max(1, ...values);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, ${cell}px)`,
      gap
    }
  }, values.map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: String(v),
    style: {
      width: cell,
      height: cell,
      borderRadius: '3px',
      background: color,
      opacity: v === 0 ? 0.06 : 0.15 + v / max * 0.85
    }
  }))), (labels.length > 0 || legend) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '18px',
      fontSize: 'var(--type-caption-size)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, labels.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l))), legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: 'var(--type-caption-size)',
      color: 'var(--text-muted)'
    }
  }, "Less", [0.15, 0.45, 0.75, 1].map(o => /*#__PURE__*/React.createElement("span", {
    key: o,
    style: {
      width: 10,
      height: 10,
      borderRadius: '2px',
      background: color,
      opacity: o
    }
  })), "More")));
}
Object.assign(__ds_scope, { Heatmap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Heatmap.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MetricList({
  items = [],
  labelHeader,
  valueHeader,
  showSwatch = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }), (labelHeader || valueHeader) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '10px',
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-muted)',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", null, labelHeader), /*#__PURE__*/React.createElement("span", null, valueHeader)), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.label + i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '11px 0',
      borderBottom: i < items.length - 1 ? '1px solid var(--border-hairline)' : 'none'
    }
  }, showSwatch && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-full)',
      background: it.color || 'var(--viz-1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--type-body-size)',
      color: 'var(--text-primary)'
    }
  }, it.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--type-body-size)',
      fontWeight: 'var(--weight-medium)',
      fontVariantNumeric: 'tabular-nums',
      color: it.valueColor || 'var(--text-primary)'
    }
  }, it.value))));
}
Object.assign(__ds_scope, { MetricList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricList.jsx", error: String((e && e.message) || e) }); }

// components/data/SparkArea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SparkArea({
  data = [],
  height = 120,
  color = 'var(--viz-1)',
  fill = true,
  strokeWidth = 2,
  style,
  ...rest
}) {
  const w = 300,
    h = height;
  const max = Math.max(...data, 1),
    min = Math.min(...data, 0);
  const span = max - min || 1;
  const step = data.length > 1 ? w / (data.length - 1) : w;
  const pts = data.map((d, i) => [i * step, h - (d - min) / span * (h * 0.8) - h * 0.1]);
  const path = pts.map((p, i) => {
    if (i === 0) return `M ${p[0]} ${p[1]}`;
    const prev = pts[i - 1];
    const cx = (prev[0] + p[0]) / 2;
    return `C ${cx} ${prev[1]}, ${cx} ${p[1]}, ${p[0]} ${p[1]}`;
  }).join(' ');
  const id = React.useId ? React.useId().replace(/:/g, '') : 'sp';
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${w} ${h}`,
    preserveAspectRatio: "none",
    width: "100%",
    height: height
  }, rest, {
    style: {
      display: 'block',
      ...style
    }
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.22"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), fill && /*#__PURE__*/React.createElement("path", {
    d: `${path} L ${w} ${h} L 0 ${h} Z`,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    vectorEffect: "non-scaling-stroke"
  }));
}
Object.assign(__ds_scope, { SparkArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SparkArea.jsx", error: String((e && e.message) || e) }); }

// components/data/StackedBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StackedBar({
  segments = [],
  height = 8,
  gap = 4,
  style,
  ...rest
}) {
  const total = segments.reduce((s, x) => s + (x.value || 0), 0) || 1;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      gap,
      width: '100%',
      ...style
    }
  }), segments.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: `${s.label || ''} ${s.value}`,
    style: {
      flex: s.value / total,
      height,
      background: s.color || `var(--viz-${i % 6 + 1})`,
      borderRadius: 'var(--radius-pill)'
    }
  })));
}
Object.assign(__ds_scope, { StackedBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StackedBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatTile({
  icon,
  label,
  value,
  unit,
  delta,
  deltaTone = 'ok',
  style,
  ...rest
}) {
  const tone = deltaTone === 'critical' ? 'var(--status-critical-text)' : deltaTone === 'warn' ? 'var(--status-warn-text)' : 'var(--status-ok-text)';
  const toneBg = deltaTone === 'critical' ? 'var(--status-critical-bg)' : deltaTone === 'warn' ? 'var(--status-warn-bg)' : 'var(--status-ok-bg)';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      minHeight: '64px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-lg)',
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      flex: '0 0 auto',
      background: 'var(--n-50)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-secondary)'
    }
  }, typeof icon === 'string' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  }) : icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '5px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-metric-lg-size)',
      fontWeight: 600,
      letterSpacing: '-0.4px',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--text-primary)'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-muted)'
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      height: 22,
      padding: '0 8px',
      fontSize: 'var(--type-caption-size)',
      fontWeight: 'var(--weight-medium)',
      color: tone,
      background: toneBg,
      borderRadius: 'var(--radius-pill)'
    }
  }, delta));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/data/UtilizationBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function toneFor(pct) {
  if (pct >= 90) return 'var(--status-critical)';
  if (pct >= 75) return 'var(--status-warn)';
  return 'var(--status-ok)';
}
function UtilizationBar({
  label,
  icon,
  value = 0,
  ticks = 40,
  tone,
  style,
  ...rest
}) {
  const color = tone || toneFor(value);
  const filled = Math.round(value / 100 * ticks);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--type-body-size)',
      color: 'var(--text-primary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-metric-sm-size)',
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums',
      color
    }
  }, value, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '2px',
      height: 22
    }
  }, Array.from({
    length: ticks
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      borderRadius: '1px',
      background: i < filled ? color : 'var(--viz-track)',
      opacity: i < filled ? 1 : 1
    }
  }))));
}
Object.assign(__ds_scope, { UtilizationBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/UtilizationBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/AlertItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  critical: {
    color: 'var(--status-critical)',
    icon: 'globe'
  },
  warn: {
    color: 'var(--status-warn)',
    icon: 'triangle-alert'
  },
  info: {
    color: 'var(--status-info)',
    icon: 'info'
  },
  ok: {
    color: 'var(--status-ok)',
    icon: 'circle-check'
  }
};
function AlertItem({
  tone = 'warn',
  title,
  description,
  time,
  icon,
  divider = true,
  onClick,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.warn;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick
  }, rest, {
    style: {
      display: 'flex',
      gap: '12px',
      padding: '14px 0',
      borderBottom: divider ? '1px solid var(--border-hairline)' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      flex: '0 0 auto',
      color: t.color
    }
  }, icon || /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-size)',
      fontWeight: 'var(--weight-semibold)',
      color: t.color
    }
  }, title), time && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--type-caption-size)',
      color: 'var(--text-muted)',
      flex: '0 0 auto'
    }
  }, time)), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--type-body-sm-size)',
      lineHeight: 1.5,
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, description)));
}
Object.assign(__ds_scope, { AlertItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/AlertItem.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  icon = 'radio',
  title,
  description,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: 'var(--space-xxl) var(--space-lg)',
      textAlign: 'center',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      marginBottom: '4px',
      background: 'var(--n-50)',
      borderRadius: 'var(--radius-full)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-heading-sm-size)',
      fontWeight: 500,
      letterSpacing: '-0.15px',
      color: 'var(--text-primary)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '38ch',
      fontSize: 'var(--type-body-size)',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '6px'
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled,
  style,
  ...rest
}) {
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      flex: '0 0 auto',
      background: on ? 'var(--action-primary)' : disabled ? 'var(--n-50)' : 'var(--n-0)',
      border: `1px solid ${on ? 'var(--action-primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-xs)',
      color: '#fff',
      transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    readOnly: !onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), indeterminate ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 12
  }) : checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 12
  }) : null), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--type-body-size)',
      color: disabled ? 'var(--text-disabled)' : 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  suffix,
  size = 'md',
  disabled = false,
  id,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === 'sm' ? 'var(--control-height-sm)' : 'var(--control-height-md)';
  const borderColor = error ? 'var(--red-500)' : focus ? 'var(--border-focus)' : 'var(--border-hairline)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...wrapperStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontSize: 'var(--type-label-size)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      height,
      padding: '0 12px',
      background: disabled ? 'var(--n-50)' : 'var(--n-0)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: size === 'sm' ? '13px' : 'var(--type-body-size)',
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums',
      ...style
    }
  })), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)'
    }
  }, suffix), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, iconRight)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: '4px',
      fontSize: 'var(--type-caption-size)',
      color: error ? 'var(--red-600)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SearchField({
  placeholder = 'Search',
  value,
  onChange,
  onClear,
  width,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      height: 'var(--control-height-md)',
      padding: '0 14px',
      width: width || '100%',
      background: 'var(--n-0)',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-hairline)'}`,
      borderRadius: 'var(--radius-pill)',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    type: "search",
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-size)',
      color: 'var(--text-primary)'
    }
  })), value && onClear && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClear,
    "aria-label": "Clear search",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style,
  ...rest
}) {
  const height = size === 'sm' ? '30px' : 'var(--control-height-sm)';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      padding: '3px',
      height: 'auto',
      background: 'var(--n-100)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const active = opt.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(opt.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        height,
        padding: '0 12px',
        fontFamily: 'var(--font-body)',
        fontSize: size === 'sm' ? '12px' : '13px',
        fontWeight: 'var(--weight-medium)',
        lineHeight: 1,
        color: active ? 'var(--text-primary)' : 'var(--text-muted)',
        background: active ? 'var(--n-0)' : 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        boxShadow: active ? '0 1px 2px rgba(11,18,32,.08)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)'
      }
    }, opt.icon, opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  value,
  onChange,
  size = 'md',
  iconLeft,
  disabled,
  style,
  wrapperStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === 'sm' ? 'var(--control-height-sm)' : 'var(--control-height-md)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...wrapperStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--type-label-size)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      height,
      padding: '0 12px',
      background: disabled ? 'var(--n-50)' : 'var(--n-0)',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-hairline)'}`,
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-primary)',
      transition: 'border-color var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      flex: 1,
      appearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: size === 'sm' ? '13px' : 'var(--type-body-size)',
      fontWeight: 'var(--weight-medium)',
      color: 'inherit',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    color: "var(--text-muted)"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked = false,
  onChange,
  label,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block',
      width: 40,
      height: 24,
      flex: '0 0 auto',
      background: checked ? 'var(--green-500)' : 'var(--n-300)',
      borderRadius: 'var(--radius-pill)',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    readOnly: !onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 20,
      height: 20,
      background: '#fff',
      borderRadius: 'var(--radius-full)',
      boxShadow: '0 1px 2px rgba(11,18,32,.20)',
      transition: 'left var(--dur-base) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--type-body-size)',
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AccountChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AccountChip({
  name,
  role,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      height: 'var(--control-height-md)',
      padding: '0 12px',
      background: hover ? 'var(--n-50)' : 'var(--n-0)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-user-round",
    size: 16,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("span", null, name), role && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400
    }
  }, role), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    color: "var(--text-muted)"
  }));
}
Object.assign(__ds_scope, { AccountChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AccountChip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AppRail({
  logoSrc,
  items = [],
  activeId,
  onSelect,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      width: 'var(--rail-width)',
      flex: '0 0 auto',
      padding: '10px 0',
      background: 'var(--surface-inverse)',
      borderRight: '1px solid var(--border-on-dark)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      marginBottom: '10px',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: logoSrc ? 'transparent' : 'var(--action-primary)',
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 700,
      color: '#fff'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "FiberOS",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : 'F'), items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      title: it.label,
      "aria-label": it.label,
      onClick: () => onSelect && onSelect(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--surface-inverse-hover)' : 'transparent',
        color: active ? '#fff' : 'var(--text-on-dark-muted)',
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 18
    }));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, footer));
}
Object.assign(__ds_scope, { AppRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppRail.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavPanel({
  title = 'Dashboard',
  items = [],
  activeId,
  onSelect,
  onCollapse,
  search,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({}, rest, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      width: 'var(--sidebar-width)',
      flex: '0 0 auto',
      padding: '14px 12px',
      background: 'var(--surface-inverse)',
      borderRight: '1px solid var(--border-on-dark)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '2px 4px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '17px',
      fontWeight: 500,
      letterSpacing: '-0.15px',
      color: 'var(--text-on-dark)'
    }
  }, title), onCollapse && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCollapse,
    "aria-label": "Collapse sidebar",
    style: {
      display: 'flex',
      border: 'none',
      background: 'transparent',
      color: 'var(--text-on-dark-muted)',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "panel-left",
    size: 17
  }))), search, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      marginTop: '8px'
    }
  }, items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onSelect && onSelect(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        height: '38px',
        padding: '0 10px',
        width: '100%',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--type-body-size)',
        fontWeight: active ? 'var(--weight-medium)' : 'var(--weight-regular)',
        textAlign: 'left',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--surface-inverse-hover)' : 'transparent',
        color: active ? 'var(--text-on-dark)' : 'var(--text-on-dark-muted)',
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.trailing);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, footer));
}
Object.assign(__ds_scope, { NavPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavPanel.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Topbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Topbar({
  title,
  subtitle,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-md)',
      minHeight: 'var(--topbar-height)',
      padding: '0 var(--space-lg)',
      background: 'var(--bg-subtle)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--type-heading-md-size)',
      fontWeight: 500,
      letterSpacing: '-0.2px',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 'var(--type-body-sm-size)',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flex: '0 0 auto'
    }
  }, children));
}
Object.assign(__ds_scope, { Topbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fiberos-console/App.jsx
try { (() => {
const {
  AppRail,
  NavPanel,
  Topbar,
  AccountChip,
  SearchField,
  IconButton,
  StatusPill,
  Card,
  EmptyState
} = window.FiberOSDesignSystem_29ce8d;
const D = window.FOS_DATA;
const SCREENS = {
  overview: {
    title: 'Welcome Back, ADM1013-10',
    render: () => /*#__PURE__*/React.createElement(window.OverviewScreen, null)
  },
  traffic: {
    title: 'Welcome Back, ADM1013-10',
    render: () => /*#__PURE__*/React.createElement(window.TrafficScreen, null)
  },
  inventory: {
    title: 'Inventory',
    render: () => /*#__PURE__*/React.createElement(window.InventoryScreen, null)
  },
  alarm: {
    title: 'Alarm',
    render: () => /*#__PURE__*/React.createElement(window.AlarmScreen, null)
  }
};
function App() {
  const [view, setView] = React.useState('overview');
  const screen = SCREENS[view];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      minHeight: 900,
      background: 'var(--bg-subtle)'
    }
  }, /*#__PURE__*/React.createElement(AppRail, {
    logoSrc: "../../assets/app-icon.png",
    items: D.rail,
    activeId: "net",
    onSelect: () => {}
  }), /*#__PURE__*/React.createElement(NavPanel, {
    title: "Dashboard",
    items: D.nav,
    activeId: view,
    onSelect: setView,
    onCollapse: () => {},
    search: /*#__PURE__*/React.createElement(SearchField, {
      placeholder: "Search"
    })
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: screen ? screen.title : 'FiberOS',
    style: {
      padding: '14px 24px 6px'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    tone: "ok"
  }, "24 mbps"), /*#__PURE__*/React.createElement(IconButton, {
    name: "bell",
    label: "Alerts",
    variant: "outline"
  }), /*#__PURE__*/React.createElement(AccountChip, {
    name: "ADM1013-10"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 24px 28px'
    }
  }, screen ? screen.render() : /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "construction",
    title: "Not part of this kit",
    description: "This surface was not present in the source screens, so it is intentionally left blank."
  })))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fiberos-console/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fiberos-console/Screens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Card,
  StatusPill,
  IconButton,
  Button,
  Badge,
  Tag,
  StatTile,
  DataTable,
  MetricList,
  StackedBar,
  UtilizationBar,
  DonutGauge,
  SparkArea,
  BarChart,
  Heatmap,
  AlertItem,
  EmptyState,
  SegmentedControl,
  Select,
  SearchField,
  Checkbox,
  Switch,
  Input,
  Icon
} = window.FiberOSDesignSystem_29ce8d;
const D = window.FOS_DATA;
const grid = (cols, gap = 16) => ({
  display: 'grid',
  gridTemplateColumns: cols,
  gap
});
const stack = (gap = 16) => ({
  display: 'flex',
  flexDirection: 'column',
  gap
});
function CardMenu() {
  return /*#__PURE__*/React.createElement(IconButton, {
    name: "ellipsis",
    label: "Card options"
  });
}
function OverviewScreen() {
  const [range, setRange] = React.useState('Today');
  return /*#__PURE__*/React.createElement("div", {
    style: stack()
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Network Traffic",
    subtitle: "Thu, 30 October 2025",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      options: ['Today', 'Yesterday', 'Last 7 days'],
      value: range,
      onChange: e => setRange(e.target.value),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 14
      })
    }), /*#__PURE__*/React.createElement(SegmentedControl, {
      size: "sm",
      value: "bar",
      onChange: () => {},
      options: [{
        value: 'bar',
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "chart-column",
          size: 14
        })
      }, {
        value: 'line',
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "chart-line",
          size: 14
        })
      }]
    }), /*#__PURE__*/React.createElement(IconButton, {
      name: "upload",
      label: "Export",
      variant: "outline"
    }))
  }, /*#__PURE__*/React.createElement(BarChart, {
    unit: "Mbps",
    height: 260,
    data: D.hourly
  })), /*#__PURE__*/React.createElement("div", {
    style: grid('1fr 1fr 1.2fr')
  }, /*#__PURE__*/React.createElement(Card, {
    title: "IP Availability",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 150,
      height: 120,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 10,
      width: 96,
      height: 96,
      borderRadius: '50%',
      background: 'var(--green-500)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      fontWeight: 600
    }
  }, "74%"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 84,
      top: 0,
      width: 58,
      height: 58,
      borderRadius: '50%',
      background: 'var(--amber-500)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 600
    }
  }, "24%"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 74,
      top: 64,
      width: 38,
      height: 38,
      borderRadius: '50%',
      background: 'var(--violet-500)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      fontWeight: 600
    }
  }, "2%")), /*#__PURE__*/React.createElement(MetricList, {
    showSwatch: true,
    style: {
      flex: 1
    },
    items: [{
      label: 'Available',
      value: '2.994',
      color: 'var(--green-500)'
    }, {
      label: 'Used',
      value: '971',
      color: 'var(--amber-500)'
    }, {
      label: 'Transient',
      value: '81',
      color: 'var(--violet-500)'
    }]
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Severity Ticket",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DonutGauge, {
    size: 140,
    total: "22",
    caption: "Ticket",
    segments: D.severity.map(s => ({
      value: Number(s.value),
      color: s.color
    }))
  }), /*#__PURE__*/React.createElement(MetricList, {
    showSwatch: true,
    style: {
      flex: 1
    },
    items: D.severity
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Alarms Alert",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, D.alarms.slice(0, 3).map((a, i) => /*#__PURE__*/React.createElement(AlertItem, _extends({
    key: a.title
  }, a, {
    divider: i < 2
  }))))), /*#__PURE__*/React.createElement("div", {
    style: grid('1fr 1.6fr')
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Memory Utilization",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, /*#__PURE__*/React.createElement("div", {
    style: stack(18)
  }, /*#__PURE__*/React.createElement(UtilizationBar, {
    icon: "server",
    label: "Server",
    value: 72
  }), /*#__PURE__*/React.createElement(UtilizationBar, {
    icon: "router",
    label: "Cisco-Router 2800s",
    value: 93
  }), /*#__PURE__*/React.createElement(UtilizationBar, {
    icon: "hard-drive",
    label: "Storage Array",
    value: 41
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Devices Monitoring",
    actions: /*#__PURE__*/React.createElement(CardMenu, null),
    bleed: true
  }, /*#__PURE__*/React.createElement(DataTable, {
    dense: true,
    rows: D.devices,
    onRowClick: () => {},
    columns: [{
      key: 'mac',
      header: 'Mac Address'
    }, {
      key: 'ip',
      header: 'IP Address'
    }, {
      key: 'name',
      header: 'Device Name'
    }, {
      key: 'rx',
      header: 'RX (Mbps)',
      align: 'right',
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--status-ok-text)'
        }
      }, v)
    }, {
      key: 'tx',
      header: 'TX (Mbps)',
      align: 'right',
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--status-critical-text)'
        }
      }, v)
    }, {
      key: 'id',
      header: '',
      align: 'right',
      render: () => /*#__PURE__*/React.createElement(Icon, {
        name: "chevron-right",
        size: 16,
        color: "var(--text-muted)"
      })
    }]
  }))));
}
function TrafficScreen() {
  const [range, setRange] = React.useState('Last 1 Hour');
  return /*#__PURE__*/React.createElement("div", {
    style: stack()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    size: "sm",
    options: ['Today', 'Yesterday', 'Last 7 days'],
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 14
    })
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: range,
    onChange: setRange,
    options: ['Last 1 Hour', '6 Hours', '24 Hours']
  })), /*#__PURE__*/React.createElement("div", {
    style: grid('repeat(4, 1fr)')
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: "arrow-up-down",
    label: "Total Traffic",
    value: "192.0",
    unit: "GB"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "chart-column",
    label: "Peak Bandwidth",
    value: "360",
    unit: "mbps"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "clock",
    label: "Latency (avg)",
    value: "15.6",
    unit: "ms"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "triangle-alert",
    label: "Packet Loss",
    value: "0.26",
    unit: "%",
    delta: "0.4%"
  })), /*#__PURE__*/React.createElement("div", {
    style: grid('1.1fr 1fr 1fr')
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Running Traffic",
    actions: /*#__PURE__*/React.createElement(CardMenu, null),
    bleed: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement(MetricList, {
    labelHeader: "Department",
    valueHeader: "Network Traffic",
    items: D.departments
  })), /*#__PURE__*/React.createElement(SparkArea, {
    data: D.spark,
    height: 120
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Traffic by Application",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 34,
      fontWeight: 600,
      letterSpacing: '-0.6px'
    }
  }, "76%"), /*#__PURE__*/React.createElement(StatusPill, {
    tone: "ok",
    dot: false
  }, "0.4% vs last hour")), /*#__PURE__*/React.createElement(StackedBar, {
    segments: D.applications.map(a => ({
      value: parseInt(a.value),
      color: a.color
    })),
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement(MetricList, {
    showSwatch: true,
    labelHeader: "Application",
    valueHeader: "Usage (%)",
    items: D.applications
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Hourly Heatmap",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Avg Traffic Rate"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-0.4px'
    }
  }, "3.8 GB/h")), /*#__PURE__*/React.createElement(Heatmap, {
    values: D.heat,
    columns: 14,
    labels: ['10.00', '11.00', '12.00', '13.00', '14.00']
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Top Sources & Destinations",
    actions: /*#__PURE__*/React.createElement(CardMenu, null),
    bleed: true
  }, /*#__PURE__*/React.createElement(DataTable, {
    rows: D.flows,
    columns: [{
      key: 'id',
      header: '#',
      width: 48
    }, {
      key: 'src',
      header: 'Sources IP Address'
    }, {
      key: 'dst',
      header: 'Destination IP Address'
    }, {
      key: 'proto',
      header: 'Protocol'
    }, {
      key: 'port',
      header: 'Port'
    }, {
      key: 'rx',
      header: 'RX (GB)',
      align: 'right',
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--status-ok-text)'
        }
      }, v)
    }, {
      key: 'tx',
      header: 'TX (GB)',
      align: 'right',
      render: v => /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--status-critical-text)'
        }
      }, v)
    }, {
      key: 'status',
      header: 'Status',
      render: v => /*#__PURE__*/React.createElement(StatusPill, {
        tone: v
      }, D.statusLabel[v])
    }]
  })));
}
function InventoryScreen() {
  const [q, setQ] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const rows = D.devices.filter(d => (d.name + d.ip + d.mac).toLowerCase().includes(q.toLowerCase()));
  const toggle = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : s.concat(id));
  return /*#__PURE__*/React.createElement("div", {
    style: stack()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(SearchField, {
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ(''),
    placeholder: "Search device, IP or MAC",
    width: 320
  }), /*#__PURE__*/React.createElement(Tag, {
    selected: true,
    onRemove: () => {}
  }, "Site: HQ"), /*#__PURE__*/React.createElement(Tag, null, "Online only"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "upload",
      size: 15
    })
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    })
  }, "Add device"))), /*#__PURE__*/React.createElement("div", {
    style: grid('repeat(4, 1fr)')
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: "box",
    label: "Devices",
    value: "1.284"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "circle-check",
    label: "Online",
    value: "1.211"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "triangle-alert",
    label: "Degraded",
    value: "61"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "circle-x",
    label: "Offline",
    value: "12"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "All devices",
    subtitle: `${rows.length} shown · ${selected.length} selected`,
    bleed: true,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      disabled: selected.length === 0
    }, "Assign group")
  }, rows.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "search-x",
    title: "No devices match that search",
    description: "Try an IP prefix such as 192.168.1 or clear the filters.",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => setQ('')
    }, "Clear search")
  }) : /*#__PURE__*/React.createElement(DataTable, {
    rows: rows,
    columns: [{
      key: 'id',
      header: '',
      width: 44,
      render: v => /*#__PURE__*/React.createElement(Checkbox, {
        checked: selected.includes(v),
        onChange: () => toggle(v)
      })
    }, {
      key: 'name',
      header: 'Device Name'
    }, {
      key: 'mac',
      header: 'Mac Address'
    }, {
      key: 'ip',
      header: 'IP Address'
    }, {
      key: 'rx',
      header: 'RX (Mbps)',
      align: 'right'
    }, {
      key: 'tx',
      header: 'TX (Mbps)',
      align: 'right'
    }, {
      key: 'status',
      header: 'Status',
      render: v => /*#__PURE__*/React.createElement(StatusPill, {
        tone: v
      }, D.statusLabel[v])
    }]
  })));
}
function AlarmScreen() {
  const [live, setLive] = React.useState(true);
  const [page, setPage] = React.useState(true);
  const [digest, setDigest] = React.useState(false);
  const [sev, setSev] = React.useState('All');
  const list = sev === 'All' ? D.alarms : D.alarms.filter(a => a.tone === sev.toLowerCase());
  return /*#__PURE__*/React.createElement("div", {
    style: stack()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: sev,
    onChange: setSev,
    options: ['All', 'Critical', 'Warn', 'Ok']
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: live,
    onChange: () => setLive(!live),
    label: "Auto-refresh"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Acknowledge all"))), /*#__PURE__*/React.createElement("div", {
    style: grid('1.6fr 1fr')
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Alarms Alert",
    subtitle: `${list.length} active`,
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, list.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "bell-off",
    title: "No active alarms",
    description: "Every monitored device reported healthy in the last hour."
  }) : list.map((a, i) => /*#__PURE__*/React.createElement(AlertItem, _extends({
    key: a.title
  }, a, {
    divider: i < list.length - 1
  })))), /*#__PURE__*/React.createElement("div", {
    style: stack()
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Severity Ticket",
    actions: /*#__PURE__*/React.createElement(CardMenu, null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(DonutGauge, {
    size: 130,
    total: "22",
    caption: "Ticket",
    segments: D.severity.map(s => ({
      value: Number(s.value),
      color: s.color
    }))
  }), /*#__PURE__*/React.createElement(MetricList, {
    showSwatch: true,
    style: {
      flex: 1
    },
    items: D.severity
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Notification rules"
  }, /*#__PURE__*/React.createElement("div", {
    style: stack(14)
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Utilization threshold",
    defaultValue: "90",
    suffix: "%"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: page,
    onChange: () => setPage(!page),
    label: "Page on-call for critical"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: digest,
    onChange: () => setDigest(!digest),
    label: "Daily email digest"
  }))))));
}
Object.assign(window, {
  OverviewScreen,
  TrafficScreen,
  InventoryScreen,
  AlarmScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fiberos-console/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fiberos-console/data.js
try { (() => {
window.FOS_DATA = {
  rail: [{
    id: 'home',
    icon: 'house',
    label: 'Home'
  }, {
    id: 'net',
    icon: 'radio',
    label: 'Network'
  }, {
    id: 'inv',
    icon: 'box',
    label: 'Inventory'
  }, {
    id: 'mon',
    icon: 'monitor',
    label: 'Monitors'
  }, {
    id: 'sto',
    icon: 'database',
    label: 'Storage'
  }, {
    id: 'hist',
    icon: 'clock',
    label: 'History'
  }, {
    id: 'sec',
    icon: 'lock',
    label: 'Security'
  }],
  nav: [{
    id: 'overview',
    icon: 'layout-dashboard',
    label: 'Overview'
  }, {
    id: 'traffic',
    icon: 'chart-line',
    label: 'Traffic'
  }, {
    id: 'service',
    icon: 'shield-check',
    label: 'Service'
  }, {
    id: 'inventory',
    icon: 'box',
    label: 'Inventory'
  }, {
    id: 'server',
    icon: 'cloud',
    label: 'Server'
  }, {
    id: 'storage',
    icon: 'folder',
    label: 'Storage'
  }, {
    id: 'alarm',
    icon: 'bell',
    label: 'Alarm'
  }, {
    id: 'virtualization',
    icon: 'layers',
    label: 'Virtualization'
  }],
  hourly: [{
    label: '06.00',
    in: 80,
    out: 65
  }, {
    label: '07.00',
    in: 74,
    out: 50
  }, {
    label: '08.00',
    in: 60,
    out: 68
  }, {
    label: '09.00',
    in: 43,
    out: 46
  }, {
    label: '10.00',
    in: 86,
    out: 73
  }, {
    label: '11.00',
    in: 29,
    out: 42
  }, {
    label: '12.00',
    in: 66,
    out: 64
  }, {
    label: '13.00',
    in: 78,
    out: 80
  }, {
    label: '14.00',
    in: 51,
    out: 51
  }, {
    label: '15.00',
    in: 70,
    out: 55
  }, {
    label: '16.00',
    in: 63,
    out: 72
  }, {
    label: '17.00',
    in: 69,
    out: 60
  }, {
    label: '18.00',
    in: 43,
    out: 60
  }],
  departments: [{
    label: 'IT Support',
    value: '9.1 GB/s'
  }, {
    label: 'Marketing',
    value: '7.8 GB/s'
  }, {
    label: 'Operations',
    value: '4.6 GB/s'
  }, {
    label: 'HR',
    value: '2.4 GB/s'
  }],
  applications: [{
    label: 'Zoom',
    value: '32%',
    color: 'var(--viz-1)'
  }, {
    label: 'Microsoft Office 365',
    value: '24%',
    color: 'var(--viz-2)'
  }, {
    label: 'Spotify',
    value: '18%',
    color: 'var(--viz-3)'
  }, {
    label: 'Youtube',
    value: '16%',
    color: 'var(--viz-4)'
  }, {
    label: 'Netflix',
    value: '10%',
    color: 'var(--viz-5)'
  }],
  severity: [{
    label: 'Low Ticket',
    value: '8',
    color: 'var(--status-ok)'
  }, {
    label: 'Medium Ticket',
    value: '6',
    color: 'var(--status-warn)'
  }, {
    label: 'Critical Ticket',
    value: '3',
    color: 'var(--status-critical)'
  }, {
    label: 'High Ticket',
    value: '5',
    color: 'var(--amber-500)'
  }],
  devices: [{
    id: 1,
    mac: '04:A1:51:3C:9E:12',
    ip: '192.168.1.23',
    name: 'iPhone-15',
    rx: '38.4',
    tx: '12.7',
    status: 'ok'
  }, {
    id: 2,
    mac: '8C:85:90:AF:11:7B',
    ip: '192.168.1.45',
    name: 'Office-NAS',
    rx: '6.2',
    tx: '1.1',
    status: 'ok'
  }, {
    id: 3,
    mac: '3C:5A:B4:0E:72:99',
    ip: '192.168.1.50',
    name: 'MacBook-Design',
    rx: '112.8',
    tx: '94.3',
    status: 'warn'
  }, {
    id: 4,
    mac: '00:1B:63:84:45:E6',
    ip: '10.0.0.41',
    name: 'CCTV-Lobby-01',
    rx: '3.7',
    tx: '0.5',
    status: 'ok'
  }, {
    id: 5,
    mac: '58:EF:68:22:44:7C',
    ip: '10.10.0.10',
    name: 'AP-Hall-East',
    rx: '85.6',
    tx: '73.2',
    status: 'warn'
  }, {
    id: 6,
    mac: 'A4:83:E7:19:0C:2D',
    ip: '10.10.0.24',
    name: 'Printer-Floor-2',
    rx: '0.8',
    tx: '0.2',
    status: 'idle'
  }, {
    id: 7,
    mac: 'F0:18:98:5B:71:AA',
    ip: '192.168.1.77',
    name: 'Guest-Laptop-04',
    rx: '22.1',
    tx: '9.9',
    status: 'critical'
  }],
  flows: [{
    id: 1,
    src: '192.168.1.23',
    dst: '172.217.0.46',
    proto: 'HTTPS',
    port: '5392',
    rx: '2.92',
    tx: '0.43',
    status: 'warn'
  }, {
    id: 2,
    src: '192.168.1.45',
    dst: '8.8.8.8',
    proto: 'NTP',
    port: '8955',
    rx: '4.07',
    tx: '0.33',
    status: 'ok'
  }, {
    id: 3,
    src: '192.168.1.50',
    dst: '13.226.69.102',
    proto: 'SSH',
    port: '7956',
    rx: '2.96',
    tx: '2.60',
    status: 'ok'
  }, {
    id: 4,
    src: '10.0.0.41',
    dst: '52.22.23.10',
    proto: 'HTTPS',
    port: '7996',
    rx: '3.70',
    tx: '0.99',
    status: 'warn'
  }, {
    id: 5,
    src: '10.10.0.10',
    dst: '172.217.0.46',
    proto: 'DNS',
    port: '5696',
    rx: '1.95',
    tx: '0.49',
    status: 'critical'
  }, {
    id: 6,
    src: '10.10.0.10',
    dst: '172.217.0.46',
    proto: 'DNS',
    port: '5696',
    rx: '1.95',
    tx: '0.49',
    status: 'warn'
  }, {
    id: 7,
    src: '10.0.0.41',
    dst: '52.22.23.10',
    proto: 'HTTPS',
    port: '7996',
    rx: '3.70',
    tx: '0.99',
    status: 'warn'
  }],
  alarms: [{
    tone: 'critical',
    title: 'DNS Client Alert',
    time: '4 Min',
    description: 'Server-03 experienced a temporary issue resolving domain names. Network connectivity may be affected.'
  }, {
    tone: 'warn',
    title: 'System Resource Alert',
    time: '1 h',
    description: 'Server-01 is running low on available system resources (such as memory or CPU).'
  }, {
    tone: 'warn',
    title: 'Interface Utilization',
    time: '2 h',
    description: 'Cisco-Router 2800s has sustained 93% memory utilization for 20 minutes.'
  }, {
    tone: 'ok',
    title: 'Link Restored',
    time: '3 h',
    description: 'Uplink to AP-Hall-East recovered after 42 seconds of packet loss.'
  }],
  spark: [12, 18, 14, 26, 19, 31, 22, 38, 26, 20, 34, 28, 44, 33, 47],
  heat: Array.from({
    length: 70
  }, (_, i) => [0, 0, 1, 3, 4, 2, 0, 1, 4, 3][i * 3 % 10]),
  statusLabel: {
    ok: 'Good',
    warn: 'Warning',
    critical: 'Blocked',
    idle: 'Idle'
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fiberos-console/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.DonutGauge = __ds_scope.DonutGauge;

__ds_ns.Heatmap = __ds_scope.Heatmap;

__ds_ns.MetricList = __ds_scope.MetricList;

__ds_ns.SparkArea = __ds_scope.SparkArea;

__ds_ns.StackedBar = __ds_scope.StackedBar;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.UtilizationBar = __ds_scope.UtilizationBar;

__ds_ns.AlertItem = __ds_scope.AlertItem;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AccountChip = __ds_scope.AccountChip;

__ds_ns.AppRail = __ds_scope.AppRail;

__ds_ns.NavPanel = __ds_scope.NavPanel;

__ds_ns.Topbar = __ds_scope.Topbar;

})();
