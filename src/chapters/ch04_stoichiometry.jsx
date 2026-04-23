import React from 'react';
import { Callout, Table } from '../components/Visual.jsx';
import { MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch04_stoichiometry';

export default {
  id: 4,
  shortId: '4',
  title: 'Stoichiometry',
  subtitle: 'Using balanced equations as recipes: mole ratios, limiting reactants, theoretical & percent yield, solution stoichiometry.',
  blocks: [
    {
      id: 'mole-ratios',
      title: 'Mole Ratios from a Balanced Equation',
      subtitle: 'The coefficient ratio is the mole ratio',
      images: [{ src: `${IMG}/p1_i0.jpeg`, alt: 'Balanced equation mole interpretation' }],
      content: (
        <>
          <p>
            Coefficients in a balanced equation give the <b>mole ratio</b> between species. This is the only ratio
            guaranteed — never just gram-to-gram.
          </p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            For <MathBlock tex={`N_2 + 3\\,H_2 \\rightarrow 2\\,NH_3`} />
            → 1 mol N₂ : 3 mol H₂ : 2 mol NH₃.
          </div>
          <Callout kind="tip" title="The universal stoichiometry map">
            <b>grams A → moles A → moles B → grams B</b> (or particles, or volume of gas, or volume of solution).
            Each arrow is a conversion factor.
          </Callout>
        </>
      )
    },
    {
      id: 'mass-mass',
      title: 'Mass–Mass Stoichiometry',
      subtitle: 'The bread-and-butter calculation',
      images: [{ src: `${IMG}/p17_i0.jpeg`, alt: 'Mass-to-mass stoichiometry flow' }],
      content: (
        <>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> How many grams of H₂O are produced when 16.0 g CH₄ burns?<br />
            <MathBlock tex={`CH_4 + 2\\,O_2 \\rightarrow CO_2 + 2\\,H_2O`} />
            <ol className="list-decimal list-inside text-sm space-y-1 mt-1">
              <li>Moles CH₄: 16.0 / 16.04 = 0.998 mol.</li>
              <li>Mole ratio: 2 H₂O / 1 CH₄ → 1.996 mol H₂O.</li>
              <li>Mass: 1.996 × 18.02 = <b>36.0 g H₂O</b>.</li>
            </ol>
          </div>
        </>
      )
    },
    {
      id: 'limiting-reactant',
      title: 'Limiting Reactant',
      subtitle: 'The reactant that runs out first controls how much product forms',
      images: [{ src: `${IMG}/p19_i0.png`, alt: 'Limiting reactant visualization' }],
      content: (
        <>
          <p>
            The <b>limiting reactant</b> is consumed first; the other is in <b>excess</b>. Two-step method:
          </p>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Convert each reactant mass to moles.</li>
            <li>Divide each by its coefficient. The <b>smallest</b> quotient is the limiting reactant.</li>
            <li>Use the limiting reactant to calculate product.</li>
          </ol>
          <div className="bg-slate-50 rounded p-3 text-sm mt-2">
            <b>Example:</b> 50.0 g N₂ + 15.0 g H₂ → how much NH₃?<br />
            <MathBlock tex={`N_2 + 3\\,H_2 \\rightarrow 2\\,NH_3`} />
            Moles: N₂ = 50.0/28.02 = 1.78; H₂ = 15.0/2.016 = 7.44.<br />
            Divide by coefficients: 1.78/1 = 1.78; 7.44/3 = 2.48.<br />
            N₂ is smaller → <b>N₂ is limiting</b>. Product: 1.78 × (2/1) = 3.56 mol NH₃ × 17.03 g/mol = <b>60.6 g NH₃</b>.
          </div>
          <Callout kind="warn" title="Common trap">
            You cannot just compare masses or even moles directly — you MUST divide each by its coefficient first.
          </Callout>
        </>
      )
    },
    {
      id: 'theoretical-percent-yield',
      title: 'Theoretical Yield & Percent Yield',
      subtitle: 'Real reactions rarely give 100%',
      images: [{ src: `${IMG}/p32_i0.jpeg`, alt: 'Theoretical vs actual yield' }],
      content: (
        <>
          <p>
            <b>Theoretical yield</b>: maximum possible product, calculated from the limiting reactant.<br />
            <b>Actual yield</b>: what you really got (from the lab).<br />
          </p>
          <MathBlock tex={`\\% \\text{ yield} = \\frac{\\text{actual}}{\\text{theoretical}} \\times 100\\%`} />
          <Callout kind="info" title="Why < 100%?">
            Side reactions, incomplete reactions, lost product during filtering/washing, or reversible equilibria.
          </Callout>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> Theoretical = 60.6 g NH₃, actual = 45.0 g. % yield = 45.0/60.6 × 100 = <b>74.3%</b>.
          </div>
        </>
      )
    },
    {
      id: 'solution-stoichiometry',
      title: 'Solution Stoichiometry & Molarity',
      subtitle: 'Using concentration as a conversion factor',
      images: [{ src: `${IMG}/p24_i2.png`, alt: 'Molarity and dilution' }],
      content: (
        <>
          <MathBlock tex={`M = \\frac{\\text{moles solute}}{\\text{liters solution}}`} />
          <p>
            Molarity is a bridge between volume and moles. Dilution problem:
          </p>
          <MathBlock tex={`M_1V_1 = M_2V_2`} />
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Titration example:</b> 25.0 mL of HCl is neutralized by 32.5 mL of 0.100 M NaOH. What is [HCl]?<br />
            Moles NaOH = 0.0325 × 0.100 = 3.25 × 10⁻³ mol.<br />
            Net ionic: H⁺ + OH⁻ → H₂O (1:1). Moles HCl = 3.25 × 10⁻³.<br />
            [HCl] = 3.25 × 10⁻³ / 0.0250 = <b>0.130 M</b>.
          </div>
          <Callout kind="tip" title="Watch the units">
            M × L = moles. Or M × mL = millimoles (sometimes faster for titrations).
          </Callout>
        </>
      )
    },
    {
      id: 'excess-remaining',
      title: 'How Much Excess Reactant Is Left?',
      subtitle: 'After the reaction stops, what remains?',
      images: [{ src: `${IMG}/p33_i0.png`, alt: 'Excess reactant remaining calculation' }],
      content: (
        <>
          <p>Once you know the limiting reactant, calculate how much of the OTHER reactant was consumed, then subtract from what you started with.</p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            Back to N₂ + 3 H₂ → 2 NH₃ with 1.78 mol N₂ and 7.44 mol H₂ (N₂ limiting).<br />
            H₂ consumed: 1.78 × (3/1) = 5.34 mol.<br />
            H₂ remaining: 7.44 − 5.34 = 2.10 mol × 2.016 = <b>4.23 g excess H₂</b>.
          </div>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Mole ratio', def: 'Ratio from coefficients in balanced equation.', tag: 'core', tagColor: 'blue' },
      { term: 'Limiting reactant', def: 'Reactant consumed first; limits product.', tag: 'core', tagColor: 'red' },
      { term: 'Theoretical yield', def: 'Maximum product from limiting reactant (ideal).', tag: 'yield', tagColor: 'amber' },
      { term: 'Actual yield', def: 'Real measured amount of product.', tag: 'yield', tagColor: 'amber' },
      { term: 'Percent yield', def: '(actual/theoretical) × 100%.', tag: 'yield', tagColor: 'amber' },
      { term: 'Molarity (M)', def: 'Moles of solute per liter of solution.', tag: 'solution', tagColor: 'green' }
    ],
    laws: [
      { name: 'Conservation of Mass', desc: 'Sum of reactant masses = sum of product masses (closed system).' },
      { name: 'Dilution equation', desc: 'M₁V₁ = M₂V₂ — moles of solute are conserved when adding solvent.' }
    ],
    methods: [
      { name: 'Stoichiometry roadmap', desc: 'grams → moles (÷ M_molar) → moles (× mole ratio) → grams (× M_molar).' },
      { name: 'Finding the LR', desc: 'Convert both reactants to moles, divide each by its coefficient, pick the smaller quotient.' },
      { name: 'Titration', desc: 'M × V → moles; use mole ratio of the neutralization; back-calculate unknown concentration.' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'Given 4 Fe + 3 O₂ → 2 Fe₂O₃, how many grams of Fe₂O₃ form from 28.0 g Fe? (Fe = 55.85, O = 16.00)',
      type: 'mcq',
      choices: ['20.0 g', '40.0 g', '60.0 g', '80.0 g'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Moles Fe: 28.0/55.85 = 0.501. Mole Fe₂O₃: 0.501 × (2/4) = 0.251. Mass: 0.251 × 159.7 = 40.0 g.'
    },
    {
      q: 'Consider 2 H₂ + O₂ → 2 H₂O. If 4.0 g H₂ reacts with 16 g O₂, which is LIMITING?',
      type: 'mcq',
      choices: ['H₂', 'O₂', 'Both are used completely', 'Cannot determine'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Moles: H₂ = 4.0/2.016 = 1.98; O₂ = 16/32.00 = 0.500. Divide by coeff: H₂ → 1.98/2 = 0.99; O₂ → 0.500/1 = 0.500. O₂ smaller → O₂ limiting.'
    },
    {
      q: 'In a reaction, the theoretical yield is 38.4 g and the actual yield is 29.5 g. What is the percent yield?',
      type: 'mcq',
      choices: ['130%', '8.9%', '76.8%', '55.3%'],
      correct: 2,
      difficulty: 'E',
      explanation: '(29.5/38.4) × 100 = 76.8%.'
    },
    {
      q: 'How many mL of 6.0 M HCl are needed to prepare 250 mL of 0.50 M HCl?',
      type: 'mcq',
      choices: ['12 mL', '21 mL', '42 mL', '83 mL'],
      correct: 1,
      difficulty: 'M',
      explanation: 'M₁V₁ = M₂V₂ → V₁ = (0.50)(250)/6.0 = 20.8 ≈ 21 mL.'
    },
    {
      q: 'A solution is prepared by dissolving 9.8 g H₂SO₄ in enough water to make 500.0 mL. What is its molarity? (M(H₂SO₄) = 98.08)',
      type: 'mcq',
      choices: ['0.050 M', '0.10 M', '0.20 M', '0.40 M'],
      correct: 2,
      difficulty: 'M',
      explanation: 'Moles = 9.8/98.08 = 0.100; M = 0.100/0.500 L = 0.20 M.'
    },
    {
      q: 'If 30.0 mL of 0.200 M NaOH is required to titrate 25.0 mL of HCl, what is the molarity of the HCl?',
      type: 'mcq',
      choices: ['0.167 M', '0.240 M', '0.260 M', '0.300 M'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Moles NaOH = 0.0300 × 0.200 = 0.00600. 1:1 with HCl → 0.00600 mol HCl in 0.0250 L → 0.240 M.'
    },
    {
      q: 'For 2 Al + 6 HCl → 2 AlCl₃ + 3 H₂, if 10.0 g Al reacts with 50.0 g HCl, which is limiting and how many mol H₂ form?',
      type: 'mcq',
      choices: ['Al; 0.557 mol H₂', 'HCl; 0.685 mol H₂', 'Al; 0.556 mol H₂', 'HCl; 0.457 mol H₂'],
      correct: 0,
      difficulty: 'H',
      explanation: 'Moles: Al = 10.0/26.98 = 0.371; HCl = 50.0/36.46 = 1.371. Divide by coeff: Al → 0.371/2 = 0.185; HCl → 1.371/6 = 0.229. Al limiting. H₂ = 0.371 × (3/2) = 0.557 mol.'
    },
    {
      q: 'Which statement about theoretical yield is CORRECT?',
      type: 'mcq',
      choices: [
        'It is always greater than actual yield',
        'It is calculated from the excess reactant',
        'It equals the actual yield for complete reactions',
        'It is always ≥ actual yield (ideal maximum)'
      ],
      correct: 3,
      difficulty: 'E',
      explanation: 'Theoretical yield is the ideal max from the LIMITING reactant; actual ≤ theoretical (≤ 100% yield).'
    }
  ]
};
