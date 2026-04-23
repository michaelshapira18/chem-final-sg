import React, { useState } from 'react';

// Compact periodic table reference widget with popover.
// Shows element symbol + atomic number. Hovering shows fuller info.
// Categories color-coded.

const ELEMENTS = [
  // row, col, symbol, number, name, mass, category
  [1, 1, 'H', 1, 'Hydrogen', 1.008, 'nonmetal'],
  [1, 18, 'He', 2, 'Helium', 4.003, 'noble'],
  [2, 1, 'Li', 3, 'Lithium', 6.94, 'alkali'],
  [2, 2, 'Be', 4, 'Beryllium', 9.012, 'alkaline'],
  [2, 13, 'B', 5, 'Boron', 10.81, 'metalloid'],
  [2, 14, 'C', 6, 'Carbon', 12.01, 'nonmetal'],
  [2, 15, 'N', 7, 'Nitrogen', 14.01, 'nonmetal'],
  [2, 16, 'O', 8, 'Oxygen', 16.00, 'nonmetal'],
  [2, 17, 'F', 9, 'Fluorine', 19.00, 'halogen'],
  [2, 18, 'Ne', 10, 'Neon', 20.18, 'noble'],
  [3, 1, 'Na', 11, 'Sodium', 22.99, 'alkali'],
  [3, 2, 'Mg', 12, 'Magnesium', 24.31, 'alkaline'],
  [3, 13, 'Al', 13, 'Aluminum', 26.98, 'post'],
  [3, 14, 'Si', 14, 'Silicon', 28.09, 'metalloid'],
  [3, 15, 'P', 15, 'Phosphorus', 30.97, 'nonmetal'],
  [3, 16, 'S', 16, 'Sulfur', 32.06, 'nonmetal'],
  [3, 17, 'Cl', 17, 'Chlorine', 35.45, 'halogen'],
  [3, 18, 'Ar', 18, 'Argon', 39.95, 'noble'],
  [4, 1, 'K', 19, 'Potassium', 39.10, 'alkali'],
  [4, 2, 'Ca', 20, 'Calcium', 40.08, 'alkaline'],
  [4, 3, 'Sc', 21, 'Scandium', 44.96, 'transition'],
  [4, 4, 'Ti', 22, 'Titanium', 47.87, 'transition'],
  [4, 5, 'V', 23, 'Vanadium', 50.94, 'transition'],
  [4, 6, 'Cr', 24, 'Chromium', 52.00, 'transition'],
  [4, 7, 'Mn', 25, 'Manganese', 54.94, 'transition'],
  [4, 8, 'Fe', 26, 'Iron', 55.85, 'transition'],
  [4, 9, 'Co', 27, 'Cobalt', 58.93, 'transition'],
  [4, 10, 'Ni', 28, 'Nickel', 58.69, 'transition'],
  [4, 11, 'Cu', 29, 'Copper', 63.55, 'transition'],
  [4, 12, 'Zn', 30, 'Zinc', 65.38, 'transition'],
  [4, 13, 'Ga', 31, 'Gallium', 69.72, 'post'],
  [4, 14, 'Ge', 32, 'Germanium', 72.63, 'metalloid'],
  [4, 15, 'As', 33, 'Arsenic', 74.92, 'metalloid'],
  [4, 16, 'Se', 34, 'Selenium', 78.97, 'nonmetal'],
  [4, 17, 'Br', 35, 'Bromine', 79.90, 'halogen'],
  [4, 18, 'Kr', 36, 'Krypton', 83.80, 'noble'],
  [5, 1, 'Rb', 37, 'Rubidium', 85.47, 'alkali'],
  [5, 2, 'Sr', 38, 'Strontium', 87.62, 'alkaline'],
  [5, 3, 'Y', 39, 'Yttrium', 88.91, 'transition'],
  [5, 4, 'Zr', 40, 'Zirconium', 91.22, 'transition'],
  [5, 5, 'Nb', 41, 'Niobium', 92.91, 'transition'],
  [5, 6, 'Mo', 42, 'Molybdenum', 95.95, 'transition'],
  [5, 7, 'Tc', 43, 'Technetium', 98, 'transition'],
  [5, 8, 'Ru', 44, 'Ruthenium', 101.1, 'transition'],
  [5, 9, 'Rh', 45, 'Rhodium', 102.9, 'transition'],
  [5, 10, 'Pd', 46, 'Palladium', 106.4, 'transition'],
  [5, 11, 'Ag', 47, 'Silver', 107.9, 'transition'],
  [5, 12, 'Cd', 48, 'Cadmium', 112.4, 'transition'],
  [5, 13, 'In', 49, 'Indium', 114.8, 'post'],
  [5, 14, 'Sn', 50, 'Tin', 118.7, 'post'],
  [5, 15, 'Sb', 51, 'Antimony', 121.8, 'metalloid'],
  [5, 16, 'Te', 52, 'Tellurium', 127.6, 'metalloid'],
  [5, 17, 'I', 53, 'Iodine', 126.9, 'halogen'],
  [5, 18, 'Xe', 54, 'Xenon', 131.3, 'noble'],
  [6, 1, 'Cs', 55, 'Cesium', 132.9, 'alkali'],
  [6, 2, 'Ba', 56, 'Barium', 137.3, 'alkaline'],
  [6, 17, 'At', 85, 'Astatine', 210, 'halogen'],
  [6, 18, 'Rn', 86, 'Radon', 222, 'noble'],
  [7, 1, 'Fr', 87, 'Francium', 223, 'alkali'],
  [7, 2, 'Ra', 88, 'Radium', 226, 'alkaline']
];

export const CATEGORY_COLORS = {
  alkali: 'bg-red-200 hover:bg-red-300 border-red-400',
  alkaline: 'bg-orange-200 hover:bg-orange-300 border-orange-400',
  transition: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-400',
  post: 'bg-sky-100 hover:bg-sky-200 border-sky-400',
  metalloid: 'bg-teal-200 hover:bg-teal-300 border-teal-400',
  nonmetal: 'bg-green-200 hover:bg-green-300 border-green-400',
  halogen: 'bg-purple-200 hover:bg-purple-300 border-purple-400',
  noble: 'bg-pink-200 hover:bg-pink-300 border-pink-400'
};

export { ELEMENTS };

export function PeriodicTableInline({ onClickElement, colorOverride, legend = true }) {
  return (
    <div className="inline-block">
      <div className="grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(18, minmax(2.2rem, 1fr))' }}>
        {ELEMENTS.map((el) => {
          const [row, col, sym, num, name, mass, cat] = el;
          const bg = colorOverride ? colorOverride(el) : CATEGORY_COLORS[cat];
          return (
            <button
              key={sym}
              onClick={() => onClickElement?.(el)}
              style={{ gridRow: row, gridColumn: col }}
              className={`border rounded text-[0.55rem] md:text-[0.65rem] leading-tight p-0.5 text-left ${bg} text-slate-900 transition`}
              title={`${name} (Z=${num}, mass ${mass})`}
            >
              <div className="text-[0.5rem] text-slate-600">{num}</div>
              <div className="font-bold text-xs md:text-sm">{sym}</div>
            </button>
          );
        })}
      </div>
      {legend && (
        <div className="flex flex-wrap gap-2 mt-3 text-[10px]">
          {Object.entries(CATEGORY_COLORS).map(([k, cls]) => (
            <span key={k} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${cls}`}>
              <span className="capitalize">{k === 'post' ? 'post-transition' : k}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PeriodicTablePopover() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-30 bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-semibold"
        title="Periodic Table"
      >
        🧪 Periodic Table
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl max-w-5xl w-full p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Periodic Table — Quick Reference</h3>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-900 text-xl">✕</button>
            </div>
            <div className="overflow-x-auto">
              <PeriodicTableInline />
            </div>
            <p className="text-xs text-slate-500 mt-3">Hover an element for name / atomic mass. Click × to close.</p>
          </div>
        </div>
      )}
    </>
  );
}
