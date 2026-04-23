import React from 'react';
import { Callout, Table, Pill } from '../components/Visual.jsx';
import { Math, MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch02_atoms_molecules_ions';

export default {
  id: 2,
  shortId: '2',
  title: 'Atoms, Molecules & Ions',
  subtitle: 'Atomic structure, isotopes, the periodic table, ions, ionic vs. molecular compounds, nomenclature, and the mole.',
  blocks: [
    {
      id: 'atomic-structure',
      title: 'Atomic Structure: p⁺, n⁰, e⁻',
      subtitle: 'Atomic number Z, mass number A, and how to read an isotope symbol',
      images: [{ src: `${IMG}/p11_i1.jpeg`, alt: 'Atomic structure — nucleus with protons/neutrons, electrons in shells' }],
      content: (
        <>
          <p>
            Every atom has a dense nucleus of <b>protons</b> (+, mass ≈ 1 amu) and <b>neutrons</b> (0, mass ≈ 1 amu),
            surrounded by an electron cloud (e⁻, negligible mass, −1 charge). The <b>atomic number Z</b> = number of
            protons — it <i>defines</i> the element. The <b>mass number A</b> = p⁺ + n⁰.
          </p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            Isotope symbol: <MathBlock tex={`{}_{Z}^{A}\\text{X}`} /> — e.g., <MathBlock tex={`{}_{6}^{14}\\text{C}`} /> has 6 p⁺, 8 n⁰ (14 − 6), and 6 e⁻ (neutral).
          </div>
          <Callout kind="info" title="In an ion">
            # electrons = Z − charge. So <b>Na⁺</b> has 11 p⁺, 10 e⁻. <b>O²⁻</b> has 8 p⁺, 10 e⁻.
          </Callout>
        </>
      )
    },
    {
      id: 'isotopes-atomic-weight',
      title: 'Isotopes & Average Atomic Weight',
      subtitle: 'Why atomic masses on the table are non-integer',
      images: [{ src: `${IMG}/p14_i0.png`, alt: 'Isotopes of carbon — 12C, 13C, 14C diagrams' }],
      content: (
        <>
          <p>
            <b>Isotopes</b> are atoms of the same element (same Z) with different numbers of neutrons (different A).
            The atomic mass listed on the periodic table is a <b>weighted average</b> across natural isotopic abundances:
          </p>
          <MathBlock tex={`\\bar{m} = \\sum_i (f_i \\cdot m_i)`} />
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> Chlorine is 75.77% ³⁵Cl (34.969 amu) and 24.23% ³⁷Cl (36.966 amu).<br />
            <MathBlock tex={`\\bar{m} = (0.7577)(34.969) + (0.2423)(36.966) = 35.45\\text{ amu}`} />
          </div>
          <Callout kind="warn" title="Atomic weight vs. mass number">
            Atomic <b>weight</b> (on the PT) is a weighted average in amu. Mass <b>number</b> A is an integer for one specific isotope. Don't confuse them.
          </Callout>
        </>
      )
    },
    {
      id: 'periodic-table-groups',
      title: 'The Periodic Table: Groups, Periods & Families',
      subtitle: 'Metals, nonmetals, metalloids + chemical families',
      images: [{ src: `${IMG}/p16_i2.png`, alt: 'Periodic table with groups and metal/nonmetal divisions' }],
      content: (
        <>
          <p>
            <b>Groups (columns)</b> share valence-electron count → similar chemistry. <b>Periods (rows)</b> are
            shells. Key families you must know:
          </p>
          <Table
            headers={['Family', 'Group', 'Typical charge', 'Character']}
            rows={[
              ['Alkali metals', '1A', '+1', 'Very reactive, soft metals (not H)'],
              ['Alkaline earth metals', '2A', '+2', 'Reactive metals'],
              ['Transition metals', '3–12', 'Variable', 'Form colored compounds, variable oxidation states'],
              ['Halogens', '7A', '−1', 'Very reactive nonmetals; diatomic'],
              ['Noble gases', '8A', '0', 'Unreactive — full valence shell']
            ]}
          />
          <Callout kind="tip" title="Metalloid staircase">
            The zigzag step that starts at B and runs to At separates metals (left) from nonmetals (right).
            Elements touching the line (B, Si, Ge, As, Sb, Te) are <b>metalloids</b>.
          </Callout>
        </>
      )
    },
    {
      id: 'ions-charges',
      title: 'Ion Charges from Periodic Position',
      subtitle: 'Predicting main-group ion charges',
      images: [{ src: `${IMG}/p18_i1.png`, alt: 'Main-group ion charges chart' }],
      content: (
        <>
          <p>
            Atoms gain or lose electrons to reach a noble-gas configuration. Main-group charges follow the group number:
          </p>
          <Table
            headers={['Group', 'Typical ion', 'Example']}
            rows={[
              ['1A', '+1', 'Na⁺, K⁺'],
              ['2A', '+2', 'Mg²⁺, Ca²⁺'],
              ['3A', '+3', 'Al³⁺'],
              ['5A', '−3', 'N³⁻, P³⁻'],
              ['6A', '−2', 'O²⁻, S²⁻'],
              ['7A', '−1', 'F⁻, Cl⁻']
            ]}
          />
          <Callout kind="warn" title="Transition metals">
            TMs often have multiple oxidation states (Fe²⁺ vs Fe³⁺). The Roman numeral in the name tells you the charge: <b>iron(II) chloride</b> = FeCl₂.
          </Callout>
        </>
      )
    },
    {
      id: 'nomenclature',
      title: 'Nomenclature — Ionic, Molecular & Acids',
      subtitle: 'Naming compounds with zero ambiguity',
      images: [{ src: `${IMG}/p24_i0.png`, alt: 'Nomenclature rules summary' }],
      content: (
        <>
          <Table
            headers={['Compound type', 'Rule', 'Example']}
            rows={[
              ['Ionic (metal + nonmetal)', 'Cation name + anion name (drop ending, add -ide)', 'NaCl → sodium chloride'],
              ['Ionic with TM', 'Add Roman numeral for metal charge', 'Fe₂O₃ → iron(III) oxide'],
              ['Polyatomic', 'Memorize sulfate SO₄²⁻, nitrate NO₃⁻, phosphate PO₄³⁻, carbonate CO₃²⁻, hydroxide OH⁻, ammonium NH₄⁺', 'Ca(NO₃)₂ → calcium nitrate'],
              ['Molecular (two nonmetals)', 'Greek prefixes for BOTH atoms (mono- on 2nd only)', 'N₂O₄ → dinitrogen tetroxide'],
              ['Binary acid', 'hydro-(anion root)-ic acid', 'HCl (aq) → hydrochloric acid'],
              ['Oxyacid (-ate ion)', '-ic acid', 'H₂SO₄ → sulfuric acid'],
              ['Oxyacid (-ite ion)', '-ous acid', 'H₂SO₃ → sulfurous acid']
            ]}
          />
          <Callout kind="tip" title="Polyatomic ions worth memorizing">
            nitrate NO₃⁻ / nitrite NO₂⁻ · sulfate SO₄²⁻ / sulfite SO₃²⁻ · phosphate PO₄³⁻ · carbonate CO₃²⁻ · hydroxide OH⁻ · acetate CH₃COO⁻ · ammonium NH₄⁺ · hydrogen carbonate (bicarbonate) HCO₃⁻ · perchlorate ClO₄⁻
          </Callout>
        </>
      )
    },
    {
      id: 'mole-molar-mass',
      title: 'The Mole & Molar Mass',
      subtitle: 'The bridge between atomic-scale and lab-scale chemistry',
      images: [{ src: `${IMG}/p27_i0.png`, alt: 'Mole concept — Avogadro number illustration' }],
      content: (
        <>
          <p>
            1 mole = <b>6.022 × 10²³</b> particles (Avogadro's number, Nₐ). The <b>molar mass</b> of a substance
            (in g/mol) is numerically equal to the sum of its atomic weights in amu.
          </p>
          <MathBlock tex={`\\text{moles} = \\frac{\\text{grams}}{\\text{molar mass}} \\qquad \\text{particles} = \\text{moles} \\times N_A`} />
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> How many molecules of H₂O are in 9.00 g?<br />
            Molar mass of H₂O = 2(1.008) + 16.00 = 18.02 g/mol.<br />
            <MathBlock tex={`n = \\frac{9.00}{18.02} = 0.499\\text{ mol}`} />
            <MathBlock tex={`0.499\\text{ mol} \\times 6.022\\times 10^{23} = 3.01\\times 10^{23}\\text{ molecules}`} />
          </div>
          <Callout kind="info" title="Percent composition">
            % of element X in compound = (n × m_X / M_compound) × 100%, where n is the subscript in the formula.
          </Callout>
        </>
      )
    },
    {
      id: 'percent-composition',
      title: 'Percent Composition & Empirical Formulas',
      subtitle: 'Working backward from mass data',
      images: [{ src: `${IMG}/p12_i0.png`, alt: 'Percent composition example' }],
      content: (
        <>
          <p>
            <b>Empirical formula</b> = simplest whole-number ratio of atoms. <b>Molecular formula</b> is a
            whole-number multiple of the empirical. Strategy when given percent composition:
          </p>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Assume 100 g total → each % becomes grams.</li>
            <li>Convert each mass to moles (÷ molar mass).</li>
            <li>Divide all by the smallest mole value.</li>
            <li>If ratios aren't integers, multiply all by a small factor (2, 3…) until they are.</li>
            <li>To get the molecular formula, divide given molar mass by empirical mass → multiplier.</li>
          </ol>
          <div className="bg-slate-50 rounded p-3 text-sm mt-2">
            <b>Example:</b> 40.0% C, 6.7% H, 53.3% O. Assume 100 g:<br />
            C: 40.0/12.01 = 3.33 mol · H: 6.7/1.008 = 6.65 mol · O: 53.3/16.00 = 3.33 mol<br />
            Divide by 3.33 → C₁H₂O₁ → empirical CH₂O (mass 30). If molar mass is 180 → multiplier 6 → <b>C₆H₁₂O₆</b> (glucose).
          </div>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Atomic number (Z)', def: 'Number of protons; defines the element.', tag: 'structure', tagColor: 'blue' },
      { term: 'Mass number (A)', def: 'Protons + neutrons, always an integer.', tag: 'structure', tagColor: 'blue' },
      { term: 'Isotope', def: 'Same Z, different A.', tag: 'structure', tagColor: 'blue' },
      { term: 'Cation', def: 'Positive ion — metal lost electrons.', tag: 'ion', tagColor: 'green' },
      { term: 'Anion', def: 'Negative ion — nonmetal gained electrons.', tag: 'ion', tagColor: 'green' },
      { term: 'Mole', def: '6.022 × 10²³ particles; SI unit for amount.', tag: 'math', tagColor: 'amber' },
      { term: 'Molar mass', def: 'Mass of one mole, in g/mol, numerically = sum of atomic weights.', tag: 'math', tagColor: 'amber' }
    ],
    laws: [
      { name: 'Law of Multiple Proportions', desc: 'When two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in small whole-number ratios.' },
      { name: 'Avogadro\'s Number', desc: 'Nₐ = 6.022 × 10²³ particles per mole.' }
    ],
    methods: [
      { name: 'Empirical-formula flow', desc: '% → grams → moles → divide by smallest → multiply to integers.' },
      { name: 'Ionic formula from names', expand: 'Cross-over rule', desc: 'Write cation & anion with charges as superscripts; swap magnitudes as subscripts; reduce.' },
      { name: 'Molecular compound naming', desc: 'Two nonmetals → Greek prefix for both. Drop "mono-" on the first only. Last element gets "-ide".' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'An ion has 20 protons and 18 electrons. What is it?',
      type: 'mcq',
      choices: ['Ca²⁺', 'Ca²⁻', 'Ar', 'K⁺'],
      correct: 0,
      difficulty: 'E',
      explanation: 'Z = 20 → calcium. 20 p⁺ − 18 e⁻ = +2 charge → Ca²⁺.'
    },
    {
      q: 'Boron has two stable isotopes: ¹⁰B (10.013 amu, 19.9%) and ¹¹B (11.009 amu, 80.1%). Average atomic mass?',
      type: 'mcq',
      choices: ['10.51 amu', '10.81 amu', '10.21 amu', '11.00 amu'],
      correct: 1,
      difficulty: 'M',
      explanation: '(0.199)(10.013) + (0.801)(11.009) = 1.993 + 8.818 = 10.81 amu.'
    },
    {
      q: 'What is the correct formula for aluminum sulfate?',
      type: 'mcq',
      choices: ['AlSO₄', 'Al₂SO₄', 'Al₂(SO₄)₃', 'Al(SO₄)₃'],
      correct: 2,
      difficulty: 'M',
      explanation: 'Al³⁺ and SO₄²⁻. Crossover: Al₂(SO₄)₃ — balances to zero net charge.'
    },
    {
      q: 'Name the compound N₂O₅.',
      type: 'mcq',
      choices: ['Nitrogen oxide', 'Nitrogen(V) oxide', 'Dinitrogen pentoxide', 'Nitric oxide'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Two nonmetals → Greek prefixes. Di- (2 N) + pent- (5 O) + -oxide. "Mono-" is dropped on the first atom.'
    },
    {
      q: 'How many atoms of oxygen are in 3.00 mol of Al₂(SO₄)₃?',
      type: 'mcq',
      choices: ['6.02 × 10²³', '2.17 × 10²⁵', '1.08 × 10²⁵', '5.42 × 10²⁴'],
      correct: 1,
      difficulty: 'H',
      explanation: '12 O per formula unit × 3.00 mol = 36.0 mol O × Nₐ = 2.17 × 10²⁵ atoms.'
    },
    {
      q: 'A compound is 52.2% C, 13.0% H, and 34.8% O. Its molar mass is 46.0 g/mol. What is the molecular formula?',
      type: 'mcq',
      choices: ['CH₃O', 'C₂H₆O', 'C₃H₈O', 'CHO'],
      correct: 1,
      difficulty: 'H',
      explanation: 'Moles (100 g basis): C = 4.35, H = 12.9, O = 2.18. Divide by 2.18 → C₂H₆O₁. Empirical mass = 46 → matches molar mass → C₂H₆O.'
    },
    {
      q: 'Which of the following is a METALLOID?',
      type: 'mcq',
      choices: ['Iron', 'Selenium', 'Silicon', 'Magnesium'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Silicon sits on the zig-zag staircase. Iron is a transition metal, Se is a nonmetal, Mg is an alkaline earth metal.'
    },
    {
      q: 'What is the mass of 0.250 mol Fe₂O₃? (Fe = 55.85, O = 16.00)',
      type: 'mcq',
      choices: ['39.9 g', '79.9 g', '159.7 g', '19.9 g'],
      correct: 0,
      difficulty: 'M',
      explanation: 'M(Fe₂O₃) = 2(55.85) + 3(16.00) = 159.7 g/mol. 0.250 × 159.7 = 39.9 g.'
    }
  ]
};
