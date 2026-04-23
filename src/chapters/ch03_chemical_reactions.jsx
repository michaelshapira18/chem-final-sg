import React from 'react';
import { Callout, Table } from '../components/Visual.jsx';
import { MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch03_chemical_reactions';

export default {
  id: 3,
  shortId: '3',
  title: 'Chemical Reactions',
  subtitle: 'Balancing equations, electrolytes, precipitation, acid–base, gas-forming, and redox reactions.',
  blocks: [
    {
      id: 'balancing',
      title: 'Writing & Balancing Chemical Equations',
      subtitle: 'Atoms in = atoms out (Law of Conservation of Mass)',
      images: [{ src: `${IMG}/p5_i0.jpeg`, alt: 'Balanced equation example' }],
      content: (
        <>
          <p>
            A balanced equation has the same number of atoms of each element on both sides and equal total charge.
            Adjust coefficients (numbers in front of formulas) — NEVER change subscripts, which would make it a different compound.
          </p>
          <Callout kind="tip" title="Strategy">
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Balance the most complex compound first.</li>
              <li>Save pure elements (especially O₂, H₂) for last.</li>
              <li>Use fractions if needed, then multiply through to clear them.</li>
              <li>Check every element AND the total charge.</li>
            </ol>
          </Callout>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> combustion of propane.<br />
            <MathBlock tex={`C_3H_8 + 5\\,O_2 \\rightarrow 3\\,CO_2 + 4\\,H_2O`} />
          </div>
        </>
      )
    },
    {
      id: 'electrolytes',
      title: 'Electrolytes: Strong, Weak & Non-',
      subtitle: 'How well does it conduct electricity in solution?',
      images: [{ src: `${IMG}/p10_i0.jpeg`, alt: 'Strong vs weak vs nonelectrolyte conductivity' }],
      content: (
        <>
          <Table
            headers={['Class', 'Dissociation', 'Examples']}
            rows={[
              ['Strong electrolyte', 'Fully (≈100%) ionizes', 'NaCl, HCl, HNO₃, NaOH, most ionic salts'],
              ['Weak electrolyte', 'Only partial ionization', 'Acetic acid, NH₃, weak acids/bases'],
              ['Nonelectrolyte', 'Stays molecular, no ions', 'Sugar, ethanol, most molecular covalent compounds']
            ]}
          />
          <Callout kind="info" title="The 7 strong acids">
            HCl, HBr, HI, HNO₃, HClO₄, HClO₃, H₂SO₄ (first proton). Memorize these — everything else is a weak acid.
          </Callout>
          <Callout kind="info" title="Strong bases">
            Group 1A hydroxides (LiOH, NaOH, KOH…) and heavy group 2A hydroxides (Ca(OH)₂, Sr(OH)₂, Ba(OH)₂).
          </Callout>
        </>
      )
    },
    {
      id: 'precipitation',
      title: 'Precipitation Reactions & Solubility Rules',
      subtitle: 'Metathesis (double displacement): which combo makes a solid?',
      images: [{ src: `${IMG}/p11_i0.png`, alt: 'Precipitation reaction — forming an insoluble salt' }],
      content: (
        <>
          <p>
            When two aqueous solutions are mixed, swap cations & anions. If one product is insoluble, it forms a solid
            precipitate (s). Use solubility guidelines:
          </p>
          <Table
            headers={['Usually soluble', 'Exceptions']}
            rows={[
              ['NO₃⁻, ClO₃⁻, ClO₄⁻, C₂H₃O₂⁻', 'None'],
              ['Group 1A & NH₄⁺ salts', 'None'],
              ['Cl⁻, Br⁻, I⁻', 'Ag⁺, Pb²⁺, Hg₂²⁺ (insoluble)'],
              ['SO₄²⁻', 'Ba²⁺, Pb²⁺, Sr²⁺, Ca²⁺ (low sol.), Ag⁺']
            ]}
          />
          <Table
            headers={['Usually insoluble', 'Exceptions (soluble)']}
            rows={[
              ['OH⁻', 'Group 1A, NH₄⁺; Ba(OH)₂, Ca(OH)₂ moderate'],
              ['CO₃²⁻, PO₄³⁻, S²⁻', 'Group 1A and NH₄⁺']
            ]}
          />
          <Callout kind="tip" title="Net ionic equation">
            Spectator ions stay aqueous on both sides — cancel them. What's left is the net ionic equation:
            <MathBlock tex={`\\text{Ag}^+(aq) + \\text{Cl}^-(aq) \\rightarrow \\text{AgCl}(s)`} />
          </Callout>
        </>
      )
    },
    {
      id: 'acid-base',
      title: 'Acid–Base (Neutralization) Reactions',
      subtitle: 'H⁺ + OH⁻ → H₂O',
      images: [{ src: `${IMG}/p16_i0.jpeg`, alt: 'Acid-base neutralization' }],
      content: (
        <>
          <p>
            An Arrhenius <b>acid</b> produces H⁺ in water; a <b>base</b> produces OH⁻. Strong acid + strong base →
            salt + water, and the net ionic equation is always:
          </p>
          <MathBlock tex={`\\text{H}^+(aq) + \\text{OH}^-(aq) \\rightarrow \\text{H}_2\\text{O}(l)`} />
          <Callout kind="info" title="Oxide chemistry">
            <b>Metal oxides</b> + water → base (e.g., Na₂O + H₂O → 2 NaOH). <br />
            <b>Nonmetal oxides</b> + water → acid (e.g., SO₃ + H₂O → H₂SO₄).
          </Callout>
        </>
      )
    },
    {
      id: 'gas-forming',
      title: 'Gas-Forming Reactions',
      subtitle: 'When a product decomposes to release a gas',
      images: [{ src: `${IMG}/p21_i0.png`, alt: 'Gas-forming reaction example — CO2 from carbonate + acid' }],
      content: (
        <>
          <p>
            Some products formed by metathesis are unstable and fall apart to produce a gas:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><b>Carbonate/bicarbonate + acid</b> → H₂CO₃ → H₂O + CO₂↑</li>
            <li><b>Sulfite + acid</b> → H₂SO₃ → H₂O + SO₂↑</li>
            <li><b>Sulfide + acid</b> → H₂S↑</li>
            <li><b>Ammonium salt + strong base</b> → NH₃↑ + H₂O</li>
          </ul>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <MathBlock tex={`\\text{NaHCO}_3(aq) + \\text{HCl}(aq) \\rightarrow \\text{NaCl}(aq) + \\text{H}_2\\text{O}(l) + \\text{CO}_2(g)`} />
          </div>
        </>
      )
    },
    {
      id: 'redox',
      title: 'Oxidation Numbers & Redox Reactions',
      subtitle: 'Following electron transfers',
      images: [{ src: `${IMG}/p23_i0.png`, alt: 'Oxidation state assignment rules' }],
      content: (
        <>
          <p className="font-semibold">Assignment rules (in priority order):</p>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Free element: ox state = 0 (O₂, Na(s), Cl₂).</li>
            <li>Monatomic ion: ox state = ion charge (Na⁺ → +1).</li>
            <li>Group 1A always +1, group 2A always +2.</li>
            <li>F: always −1. H: usually +1 (except −1 in metal hydrides like NaH).</li>
            <li>O: usually −2 (peroxide H₂O₂ → −1; OF₂ → +2).</li>
            <li>Sum of ox states = overall charge (0 for neutral compound, charge for ion).</li>
          </ol>
          <Callout kind="tip" title="OIL RIG / LEO GER">
            <b>O</b>xidation <b>I</b>s <b>L</b>oss (of e⁻) · <b>R</b>eduction <b>I</b>s <b>G</b>ain (of e⁻) <br />
            The <b>oxidizing agent</b> is reduced; the <b>reducing agent</b> is oxidized.
          </Callout>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> In Zn + 2 HCl → ZnCl₂ + H₂, Zn goes 0 → +2 (oxidized, reducing agent);
            H goes +1 → 0 (reduced, oxidizing agent).
          </div>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Electrolyte', def: 'Solute that produces ions in solution.', tag: 'solution', tagColor: 'blue' },
      { term: 'Net ionic equation', def: 'Equation showing only species that change (spectators removed).', tag: 'technique', tagColor: 'violet' },
      { term: 'Precipitate', def: 'Insoluble solid formed from mixing two aqueous solutions.', tag: 'product', tagColor: 'amber' },
      { term: 'Oxidation number', def: 'Hypothetical charge if bonds were ionic; tracks electron assignment.', tag: 'redox', tagColor: 'red' },
      { term: 'Oxidizing agent', def: 'Accepts electrons (is reduced).', tag: 'redox', tagColor: 'red' },
      { term: 'Reducing agent', def: 'Donates electrons (is oxidized).', tag: 'redox', tagColor: 'red' }
    ],
    laws: [
      { name: 'Law of Conservation of Mass', desc: 'Total atoms of each element and total charge must balance.' },
      { name: 'Solubility rules (summary)', desc: 'Nitrates, Group 1A, NH₄⁺: always soluble. Most carbonates/phosphates/sulfides: insoluble unless paired with Group 1A or NH₄⁺.' }
    ],
    methods: [
      { name: 'Writing a net ionic equation', desc: '(1) Balance molecular eq. (2) Split strong electrolytes into ions. (3) Cancel spectator ions on both sides.' },
      { name: 'Assigning ox states', desc: 'Use priority rules; sum must equal net charge. Work from outside in.' },
      { name: 'Classifying reactions', desc: 'Precipitation (forms (s)), Acid–base (forms water), Gas-forming (forms a gas), Redox (changes in ox states).' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'Balance: ___ C₄H₁₀ + ___ O₂ → ___ CO₂ + ___ H₂O. What are the coefficients?',
      type: 'mcq',
      choices: ['2, 13, 8, 10', '1, 7, 4, 5', '2, 9, 8, 10', '1, 13, 4, 5'],
      correct: 0,
      difficulty: 'M',
      explanation: 'Balance C → 4 CO₂ each side × 2 = 8. H → 10 H₂O. Oxygen: 8(2) + 10(1) = 26 → 13 O₂. Multiply by 2: 2, 13, 8, 10.'
    },
    {
      q: 'Which of the following is a STRONG acid?',
      type: 'mcq',
      choices: ['HF', 'H₂SO₃', 'CH₃COOH', 'HClO₄'],
      correct: 3,
      difficulty: 'E',
      explanation: 'Perchloric acid (HClO₄) is one of the 7 strong acids. HF is weak, H₂SO₃ is weak, acetic acid is weak.'
    },
    {
      q: 'When aqueous Pb(NO₃)₂ is mixed with aqueous KI, the net ionic equation is:',
      type: 'mcq',
      choices: [
        'Pb(NO₃)₂ + 2 KI → PbI₂ + 2 KNO₃',
        'Pb²⁺(aq) + 2 I⁻(aq) → PbI₂(s)',
        'K⁺(aq) + NO₃⁻(aq) → KNO₃(s)',
        'No reaction occurs'
      ],
      correct: 1,
      difficulty: 'M',
      explanation: 'PbI₂ is insoluble (exception to the halide rule). K⁺ and NO₃⁻ are spectators → net ionic is Pb²⁺ + 2 I⁻ → PbI₂(s).'
    },
    {
      q: 'In the reaction 2 Al + 3 Cl₂ → 2 AlCl₃, which species is the OXIDIZING AGENT?',
      type: 'mcq',
      choices: ['Al', 'Cl₂', 'AlCl₃', 'None — not a redox reaction'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Al goes 0 → +3 (oxidized). Cl goes 0 → −1 (reduced). The reduced species is the oxidizing agent → Cl₂.'
    },
    {
      q: 'What is the oxidation number of S in SO₄²⁻?',
      type: 'mcq',
      choices: ['+2', '+4', '+6', '−2'],
      correct: 2,
      difficulty: 'M',
      explanation: 'Sum = −2 (ion charge). 4 O × (−2) = −8. So S = −2 + 8 = +6.'
    },
    {
      q: 'Which reaction produces a GAS?',
      type: 'mcq',
      choices: [
        'AgNO₃(aq) + NaCl(aq)',
        'Na₂SO₄(aq) + BaCl₂(aq)',
        'Na₂CO₃(aq) + 2 HCl(aq)',
        'NaOH(aq) + HCl(aq)'
      ],
      correct: 2,
      difficulty: 'M',
      explanation: 'Carbonate + acid → H₂CO₃ → H₂O + CO₂↑. The others form precipitates or water only.'
    },
    {
      q: 'Which of these compounds is a NONELECTROLYTE in water?',
      type: 'mcq',
      choices: ['NaOH', 'HCl', 'C₆H₁₂O₆ (glucose)', 'KBr'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Glucose dissolves but stays molecular — no ions. The other three dissociate completely (strong electrolytes).'
    },
    {
      q: 'When SO₃ reacts with water, what is formed?',
      type: 'mcq',
      choices: ['A weak base', 'Sulfurous acid (H₂SO₃)', 'Sulfuric acid (H₂SO₄)', 'Hydrogen sulfide'],
      correct: 2,
      difficulty: 'M',
      explanation: 'Nonmetal oxide + water → acid. SO₃ + H₂O → H₂SO₄.'
    }
  ]
};
