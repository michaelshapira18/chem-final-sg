import React, { useMemo, useState } from 'react';
import { ELEMENTS } from './PeriodicTableMini.jsx';
import { Callout } from './Visual.jsx';
import { Math, MathBlock } from './MathInline.jsx';

// Approximate values (standard reference data)
// Atomic radius (pm), IE1 (kJ/mol), EA (kJ/mol, more negative = more exothermic), EN (Pauling)
const DATA = {
  1:  { r: 53,  ie: 1312, ea: -73,  en: 2.20 },
  2:  { r: 31,  ie: 2372, ea: 0,    en: null },
  3:  { r: 167, ie: 520,  ea: -60,  en: 0.98 },
  4:  { r: 112, ie: 899,  ea: 0,    en: 1.57 },
  5:  { r: 87,  ie: 801,  ea: -27,  en: 2.04 },
  6:  { r: 67,  ie: 1086, ea: -154, en: 2.55 },
  7:  { r: 56,  ie: 1402, ea: 7,    en: 3.04 },
  8:  { r: 48,  ie: 1314, ea: -141, en: 3.44 },
  9:  { r: 42,  ie: 1681, ea: -328, en: 3.98 },
  10: { r: 38,  ie: 2081, ea: 0,    en: null },
  11: { r: 190, ie: 496,  ea: -53,  en: 0.93 },
  12: { r: 145, ie: 738,  ea: 0,    en: 1.31 },
  13: { r: 118, ie: 577,  ea: -43,  en: 1.61 },
  14: { r: 111, ie: 786,  ea: -134, en: 1.90 },
  15: { r: 98,  ie: 1012, ea: -72,  en: 2.19 },
  16: { r: 88,  ie: 1000, ea: -200, en: 2.58 },
  17: { r: 79,  ie: 1251, ea: -349, en: 3.16 },
  18: { r: 71,  ie: 1521, ea: 0,    en: null },
  19: { r: 243, ie: 419,  ea: -48,  en: 0.82 },
  20: { r: 194, ie: 590,  ea: -2,   en: 1.00 },
  21: { r: 184, ie: 633,  ea: -18,  en: 1.36 },
  22: { r: 176, ie: 659,  ea: -8,   en: 1.54 },
  23: { r: 171, ie: 651,  ea: -51,  en: 1.63 },
  24: { r: 166, ie: 653,  ea: -64,  en: 1.66 },
  25: { r: 161, ie: 717,  ea: 0,    en: 1.55 },
  26: { r: 156, ie: 762,  ea: -15,  en: 1.83 },
  27: { r: 152, ie: 760,  ea: -64,  en: 1.88 },
  28: { r: 149, ie: 737,  ea: -112, en: 1.91 },
  29: { r: 145, ie: 745,  ea: -119, en: 1.90 },
  30: { r: 142, ie: 906,  ea: 0,    en: 1.65 },
  31: { r: 136, ie: 579,  ea: -29,  en: 1.81 },
  32: { r: 125, ie: 762,  ea: -119, en: 2.01 },
  33: { r: 114, ie: 947,  ea: -78,  en: 2.18 },
  34: { r: 103, ie: 941,  ea: -195, en: 2.55 },
  35: { r: 94,  ie: 1140, ea: -324, en: 2.96 },
  36: { r: 88,  ie: 1351, ea: 0,    en: 3.00 },
  37: { r: 265, ie: 403,  ea: -47,  en: 0.82 },
  38: { r: 219, ie: 549,  ea: -5,   en: 0.95 },
  53: { r: 115, ie: 1008, ea: -295, en: 2.66 },
  54: { r: 108, ie: 1170, ea: 0,    en: 2.60 },
  55: { r: 298, ie: 376,  ea: -46,  en: 0.79 },
  56: { r: 253, ie: 503,  ea: -14,  en: 0.89 }
};

const TRENDS = [
  { key: 'r',  label: 'Atomic radius (pm)',   unit: 'pm',      higher: 'larger', color: 'sky',    reverse: true },
  { key: 'ie', label: 'Ionization energy IE₁ (kJ/mol)', unit: 'kJ/mol', higher: 'higher', color: 'red', reverse: false },
  { key: 'ea', label: 'Electron affinity (kJ/mol)',     unit: 'kJ/mol', higher: 'more exothermic', color: 'purple', reverse: true },
  { key: 'en', label: 'Electronegativity (Pauling)',    unit: '',       higher: 'higher', color: 'emerald', reverse: false },
  { key: 'zeff', label: "Effective Z (Slater's)",       unit: '',       higher: 'higher', color: 'amber', reverse: false }
];

// Slater's rules
// Group orbitals: [1s] [2s,2p] [3s,3p] [3d] [4s,4p] [4d] [4f] [5s,5p] ...
const SLATER_GROUPS = [
  { group: '1s', ns: [1], ls: ['s'] },
  { group: '2s2p', ns: [2], ls: ['s', 'p'] },
  { group: '3s3p', ns: [3], ls: ['s', 'p'] },
  { group: '3d', ns: [3], ls: ['d'] },
  { group: '4s4p', ns: [4], ls: ['s', 'p'] },
  { group: '4d', ns: [4], ls: ['d'] },
  { group: '4f', ns: [4], ls: ['f'] },
  { group: '5s5p', ns: [5], ls: ['s', 'p'] },
  { group: '5d', ns: [5], ls: ['d'] },
  { group: '5f', ns: [5], ls: ['f'] },
  { group: '6s6p', ns: [6], ls: ['s', 'p'] }
];

// Aufbau order for building simple configurations (valence shells only for Z<=56)
const CONFIG = {
  1: [['1s', 1]],
  2: [['1s', 2]],
  3: [['1s', 2], ['2s', 1]],
  4: [['1s', 2], ['2s', 2]],
  5: [['1s', 2], ['2s', 2], ['2p', 1]],
  6: [['1s', 2], ['2s', 2], ['2p', 2]],
  7: [['1s', 2], ['2s', 2], ['2p', 3]],
  8: [['1s', 2], ['2s', 2], ['2p', 4]],
  9: [['1s', 2], ['2s', 2], ['2p', 5]],
  10:[['1s', 2], ['2s', 2], ['2p', 6]],
  11:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 1]],
  12:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2]],
  13:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 1]],
  14:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 2]],
  15:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 3]],
  16:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 4]],
  17:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 5]],
  18:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6]],
  19:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 1]],
  20:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2]],
  35:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['3d', 10], ['4s', 2], ['4p', 5]],
  36:[['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['3d', 10], ['4s', 2], ['4p', 6]]
};

function orbitalToGroup(orb) {
  const n = parseInt(orb[0], 10);
  const l = orb.slice(1);
  if (n === 1) return '1s';
  if (l === 's' || l === 'p') return `${n}s${n}p`;
  if (l === 'd') return `${n}d`;
  if (l === 'f') return `${n}f`;
  return null;
}

/**
 * Compute shielding S for the LAST-added electron using Slater's rules.
 * Returns { S, Zeff, steps: [...] }
 */
function slaterZeff(Z) {
  const cfg = CONFIG[Z];
  if (!cfg) return null;
  const targetOrb = cfg[cfg.length - 1][0];
  const targetGroup = orbitalToGroup(targetOrb);
  const targetIsSP = targetGroup.includes('s') && !targetGroup.endsWith('d') && !targetGroup.endsWith('f');
  const targetN = parseInt(targetOrb[0], 10);
  const targetIsD_or_F = targetOrb.endsWith('d') || targetOrb.endsWith('f');

  const steps = [];
  let S = 0;

  // Build electron count per group
  const byGroup = {};
  cfg.forEach(([orb, n]) => {
    const g = orbitalToGroup(orb);
    byGroup[g] = (byGroup[g] || 0) + n;
  });

  // Contribution from same-group electrons (minus the electron itself)
  const sameGroupCount = byGroup[targetGroup] - 1;
  if (sameGroupCount > 0) {
    let coeff = (targetGroup === '1s') ? 0.30 : 0.35;
    const contrib = sameGroupCount * coeff;
    S += contrib;
    steps.push({
      label: `Same group (${targetGroup})`,
      count: sameGroupCount,
      coeff,
      contrib,
      rule: targetGroup === '1s' ? 'Each other e⁻ in 1s: 0.30' : 'Each other e⁻ in same (ns,np) group: 0.35'
    });
  }

  if (targetIsSP && targetN > 1) {
    // n-1 shell: 0.85 each
    const prevGroupSP = `${targetN - 1}s${targetN - 1}p`;
    const prevGroupD = `${targetN - 1}d`;
    const prevGroupF = `${targetN - 1}f`;
    const prevSP = byGroup[prevGroupSP] || 0;
    const prevD = byGroup[prevGroupD] || 0;
    const prevF = byGroup[prevGroupF] || 0;
    const prevShellTotal = prevSP + prevD + prevF;
    if (prevShellTotal > 0) {
      const contrib = prevShellTotal * 0.85;
      S += contrib;
      steps.push({
        label: `Shell n−1 (n=${targetN - 1})`,
        count: prevShellTotal,
        coeff: 0.85,
        contrib,
        rule: 'Each e⁻ in shell n−1 (for ns/np target): 0.85'
      });
    }
    // n-2 and deeper: 1.00 each
    let deeper = 0;
    Object.keys(byGroup).forEach((g) => {
      const n = parseInt(g[0], 10);
      if (n < targetN - 1) deeper += byGroup[g];
    });
    if (deeper > 0) {
      const contrib = deeper * 1.00;
      S += contrib;
      steps.push({
        label: 'Shells n−2 and deeper',
        count: deeper,
        coeff: 1.00,
        contrib,
        rule: 'Each e⁻ in shells ≤ n−2: 1.00 (fully shielding)'
      });
    }
  } else if (targetIsD_or_F) {
    // Everything in shells <= same n but to the left: 1.00
    let inner = 0;
    Object.keys(byGroup).forEach((g) => {
      if (g === targetGroup) return;
      const n = parseInt(g[0], 10);
      if (n < targetN) inner += byGroup[g];
      else if (n === targetN && g !== targetGroup) inner += byGroup[g]; // same-n s/p shield d/f fully
    });
    if (inner > 0) {
      const contrib = inner * 1.00;
      S += contrib;
      steps.push({
        label: 'All inner electrons (for d/f target)',
        count: inner,
        coeff: 1.00,
        contrib,
        rule: 'Each e⁻ in (n,s/p) same shell OR any lower shell: 1.00 shielding'
      });
    }
  }

  const Zeff = Z - S;
  return { S, Zeff, steps, config: cfg, targetOrb };
}

function formatConfig(cfg) {
  return cfg.map(([o, n]) => `${o}<sup>${n}</sup>`).join(' ');
}

function interp(v, min, max) {
  if (v == null) return null;
  return Math.max(0, Math.min(1, (v - min) / (max - min)));
}

function gradient(t, reverse = false, color = 'red') {
  if (t == null) return 'bg-slate-100 border-slate-200 text-slate-400';
  const p = reverse ? 1 - t : t;
  const stops = {
    red:     ['bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500'],
    sky:     ['bg-sky-50', 'bg-sky-100', 'bg-sky-200', 'bg-sky-300', 'bg-sky-400', 'bg-sky-500'],
    purple:  ['bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500'],
    emerald: ['bg-emerald-50', 'bg-emerald-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500'],
    amber:   ['bg-amber-50', 'bg-amber-100', 'bg-amber-200', 'bg-amber-300', 'bg-amber-400', 'bg-amber-500']
  }[color];
  const idx = Math.min(stops.length - 1, Math.floor(p * stops.length));
  return `${stops[idx]} border-slate-300 ${p > 0.6 ? 'text-white' : 'text-slate-900'}`;
}

export default function PeriodicTrendsView() {
  const [trendKey, setTrendKey] = useState('ie');
  const [selected, setSelected] = useState(null);

  // Pre-compute Zeff for all elements we have config for
  const zeffMap = useMemo(() => {
    const m = {};
    Object.keys(CONFIG).forEach((Z) => {
      const r = slaterZeff(Number(Z));
      if (r) m[Z] = r.Zeff;
    });
    return m;
  }, []);

  const enhancedData = useMemo(() => {
    const out = {};
    Object.keys(DATA).forEach((Z) => {
      out[Z] = { ...DATA[Z], zeff: zeffMap[Z] ?? null };
    });
    return out;
  }, [zeffMap]);

  const trend = TRENDS.find((t) => t.key === trendKey);

  // Compute min/max for chosen trend
  const { min, max } = useMemo(() => {
    const vals = Object.values(enhancedData).map((d) => d[trendKey]).filter((v) => v != null && !isNaN(v));
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [enhancedData, trendKey]);

  const slaterResult = selected ? slaterZeff(selected[3]) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600 text-white rounded-xl p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold">🧪 Periodic Trends Explorer</h1>
        <p className="text-teal-100 mt-1">
          Toggle trend overlays and click any element to see Slater's-rules Z<sub>eff</sub> calculated step-by-step.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {TRENDS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTrendKey(t.key)}
              className={`px-3 py-1.5 text-sm font-semibold rounded border transition ${
                trendKey === t.key
                  ? 'bg-sky-600 text-white border-sky-700 shadow'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
          <span>Low ({Math.round(min * 100) / 100})</span>
          <div className="flex-1 h-3 rounded bg-gradient-to-r from-slate-100 via-amber-200 to-red-500" />
          <span>High ({Math.round(max * 100) / 100})</span>
          <span className="ml-3 text-slate-500">{trend.unit}</span>
        </div>
        <Callout kind="tip" title="General trends">
          → Across a period: radius <b>decreases</b>, IE <b>increases</b>, EN <b>increases</b>, Z<sub>eff</sub> <b>increases</b>.
          <br />↓ Down a group: radius <b>increases</b>, IE <b>decreases</b>, EN <b>decreases</b>, Z<sub>eff</sub> varies modestly.
        </Callout>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm overflow-x-auto">
        <div className="grid gap-[2px] min-w-[720px]" style={{ gridTemplateColumns: 'repeat(18, minmax(2.4rem, 1fr))' }}>
          {ELEMENTS.map((el) => {
            const [row, col, sym, num] = el;
            const val = enhancedData[num]?.[trendKey];
            const t = val == null ? null : interp(val, min, max);
            const cls = gradient(t, trend.reverse, trend.color);
            const active = selected && selected[3] === num;
            return (
              <button
                key={sym}
                onClick={() => setSelected(el)}
                style={{ gridRow: row, gridColumn: col }}
                className={`border rounded text-[0.55rem] md:text-[0.65rem] p-0.5 text-left transition ${cls} ${active ? 'ring-2 ring-sky-500 scale-105' : ''}`}
                title={`${sym} (Z=${num}) ${val != null ? `${trend.label.split(' ')[0]}: ${val}` : 'no data'}`}
              >
                <div className="text-[0.5rem]">{num}</div>
                <div className="font-bold text-sm">{sym}</div>
                {val != null && <div className="text-[0.5rem]">{typeof val === 'number' ? (Math.abs(val) >= 100 ? Math.round(val) : val.toFixed(2)) : val}</div>}
              </button>
            );
          })}
        </div>
      </div>

      {selected && slaterResult && (
        <div className="bg-white border-2 border-sky-400 rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {selected[4]} ({selected[2]}) — Z = {selected[3]}
            </h2>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-900 text-xl">✕</button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="bg-slate-50 rounded p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Electron configuration</div>
              <div className="text-base" dangerouslySetInnerHTML={{ __html: formatConfig(slaterResult.config) }} />
            </div>
            <div className="bg-slate-50 rounded p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Reference values</div>
              <div className="text-sm space-y-0.5">
                {DATA[selected[3]] ? <>
                  <div>Atomic radius: <b>{DATA[selected[3]].r} pm</b></div>
                  <div>IE₁: <b>{DATA[selected[3]].ie} kJ/mol</b></div>
                  <div>EA: <b>{DATA[selected[3]].ea} kJ/mol</b></div>
                  <div>Electronegativity: <b>{DATA[selected[3]].en ?? '—'}</b></div>
                </> : <div className="text-slate-500">No data for this element.</div>}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Slater's Z<sub>eff</sub> — Work Shown</h3>
            <p className="text-sm text-slate-700 mb-3">
              Calculating the effective nuclear charge felt by a single electron in the outermost orbital
              (<b>{slaterResult.targetOrb}</b>).
            </p>
            <MathBlock tex={`Z_{\\mathrm{eff}} = Z - S`} />

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200 rounded">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left border-b">Electron group</th>
                    <th className="px-3 py-2 text-right border-b">Count</th>
                    <th className="px-3 py-2 text-right border-b">Slater coeff.</th>
                    <th className="px-3 py-2 text-right border-b">Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {slaterResult.steps.map((s, i) => (
                    <tr key={i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-3 py-2 border-b">
                        <div className="font-semibold">{s.label}</div>
                        <div className="text-xs text-slate-500">{s.rule}</div>
                      </td>
                      <td className="px-3 py-2 text-right border-b">{s.count}</td>
                      <td className="px-3 py-2 text-right border-b">× {s.coeff}</td>
                      <td className="px-3 py-2 text-right border-b font-mono">= {s.contrib.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-amber-50">
                    <td className="px-3 py-2 font-bold">Total shielding <i>S</i></td>
                    <td></td><td></td>
                    <td className="px-3 py-2 text-right font-bold font-mono">{slaterResult.S.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-sky-50 border border-sky-200 rounded p-3">
              <MathBlock tex={`Z_{\\mathrm{eff}} = ${selected[3]} - ${slaterResult.S.toFixed(2)} = \\boxed{${slaterResult.Zeff.toFixed(2)}}`} />
            </div>

            <Callout kind="info" title="Interpretation">
              A higher Z<sub>eff</sub> means the outermost electron feels a stronger net pull from the nucleus →
              smaller atomic radius, higher ionization energy, and (for nonmetals) more exothermic electron affinity.
              Z<sub>eff</sub> rises sharply across a period because added protons add charge faster than same-shell
              electrons shield.
            </Callout>
          </div>
        </div>
      )}

      {!selected && (
        <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 text-center text-slate-600">
          <p className="text-sm">Click any element above to see its electron configuration and Slater's-rules Z<sub>eff</sub> breakdown.</p>
        </div>
      )}
    </div>
  );
}
