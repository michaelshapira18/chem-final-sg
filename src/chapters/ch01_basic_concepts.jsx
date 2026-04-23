import React from 'react';
import { Callout, Table, Pill } from '../components/Visual.jsx';
import { Math, MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch01_basic_concepts';

export default {
  id: 1,
  shortId: '1',
  title: 'Basic Concepts of Chemistry',
  subtitle: 'Matter, measurement, units, significant figures, density, and the scientific vocabulary of chemistry.',
  blocks: [
    {
      id: 'matter-classification',
      title: 'Classifying Matter: Substances vs. Mixtures',
      subtitle: 'Pure substances (elements + compounds) vs. homogeneous & heterogeneous mixtures',
      images: [{ src: `${IMG}/p10_i0.jpeg`, alt: 'Matter classification flowchart', caption: 'Matter is either a pure substance or a mixture.' }],
      content: (
        <>
          <p>
            All matter is either a <b>pure substance</b> (fixed composition, cannot be physically separated) or a
            <b> mixture</b> (two or more substances physically combined). Pure substances split further into
            <b> elements</b> (one kind of atom — cannot be chemically decomposed) and <b>compounds</b>
            (two or more elements chemically bonded in fixed ratios, e.g., H₂O).
          </p>
          <p>
            Mixtures split into <b>homogeneous</b> (uniform composition throughout — salt water, brass, air) and
            <b> heterogeneous</b> (composition varies — sand + iron, oil + water). A solution is always homogeneous.
          </p>
          <Callout kind="tip" title="Quick test">
            If you can physically separate components (filter, magnet, distill, decant) it's a <b>mixture</b>.
            If you need a chemical reaction to break it apart, it's a <b>compound</b>.
          </Callout>
        </>
      )
    },
    {
      id: 'physical-chemical',
      title: 'Physical vs. Chemical Properties & Changes',
      subtitle: 'Intensive vs. extensive; identifying a reaction',
      images: [{ src: `${IMG}/p11_i0.png`, alt: 'Physical vs chemical change illustration' }],
      content: (
        <>
          <p>
            A <b>physical change</b> alters form but not composition (melting, dissolving, shattering). A
            <b> chemical change</b> produces new substances with different composition — look for gas evolution,
            color change, precipitate, heat/light, or odor.
          </p>
          <Table
            headers={['Property type', 'Depends on amount?', 'Examples']}
            rows={[
              ['Intensive', 'No', 'Density, color, temperature, boiling point, melting point'],
              ['Extensive', 'Yes', 'Mass, volume, length, total energy']
            ]}
          />
          <Callout kind="info" title="Why it matters">
            Intensive properties identify a substance. Density is intensive — 1 mL and 1 L of water both have ρ ≈ 1.00 g/mL.
          </Callout>
        </>
      )
    },
    {
      id: 'measurement-sig-figs',
      title: 'Measurement, Scientific Notation & Significant Figures',
      subtitle: 'Getting the right number of digits in your answer',
      images: [{ src: `${IMG}/p14_i0.png`, alt: 'Significant figures rules chart' }],
      content: (
        <>
          <p className="mb-2"><b>Sig fig rules:</b></p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>All nonzero digits are significant.</li>
            <li>Zeros <i>between</i> nonzero digits are significant (1004 → 4 sig figs).</li>
            <li>Leading zeros are <i>not</i> significant (0.0042 → 2 sig figs).</li>
            <li>Trailing zeros <i>after a decimal</i> are significant (1.20 → 3 sig figs).</li>
            <li>Trailing zeros in a whole number without a decimal are ambiguous (100 → 1–3 sig figs; use scientific notation to clarify).</li>
          </ul>
          <Callout kind="warn" title="Operations">
            <b>Multiplication/division:</b> answer keeps the <i>fewest sig figs</i>. <br />
            <b>Addition/subtraction:</b> answer keeps the <i>fewest decimal places</i>.
          </Callout>
          <div className="bg-slate-50 p-3 rounded mt-2">
            <div className="text-xs text-slate-500 mb-1">Example</div>
            <MathBlock tex={`4.27 \\times 10^{-3}\\text{ g} \\times \\frac{1000\\text{ mg}}{1\\text{ g}} = 4.27\\text{ mg}`} />
          </div>
        </>
      )
    },
    {
      id: 'units-si',
      title: 'SI Units & Unit Conversions',
      subtitle: 'Dimensional analysis: the universal problem-solving strategy',
      images: [{ src: `${IMG}/p13_i0.jpeg`, alt: 'SI units and prefixes' }],
      content: (
        <>
          <Table
            headers={['Prefix', 'Symbol', 'Factor']}
            rows={[
              ['giga',  'G',  '10⁹'],
              ['mega',  'M',  '10⁶'],
              ['kilo',  'k',  '10³'],
              ['centi', 'c',  '10⁻²'],
              ['milli', 'm',  '10⁻³'],
              ['micro', 'µ',  '10⁻⁶'],
              ['nano',  'n',  '10⁻⁹'],
              ['pico',  'p',  '10⁻¹²']
            ]}
          />
          <Callout kind="tip" title="Dimensional analysis">
            Always build conversion factors so that the unit you don't want cancels. Write the chain:
            <MathBlock tex={`x\\text{ (given)} \\times \\frac{\\text{want}}{\\text{given}} = \\text{answer}`} />
          </Callout>
          <div className="bg-slate-50 p-3 rounded text-sm mt-2">
            <b>Example:</b> Convert 2.54 cm to m.<br />
            <MathBlock tex={`2.54\\text{ cm} \\times \\frac{1\\text{ m}}{100\\text{ cm}} = 0.0254\\text{ m}`} />
          </div>
        </>
      )
    },
    {
      id: 'density',
      title: 'Density',
      subtitle: 'An intensive property relating mass and volume',
      images: [{ src: `${IMG}/p18_i0.jpeg`, alt: 'Density visual — comparing equal volumes of different liquids' }],
      content: (
        <>
          <p>Density is the ratio of mass to volume:</p>
          <MathBlock tex={`\\rho = \\frac{m}{V}`} />
          <p>
            Standard units are <b>g/mL</b> for liquids/solids and <b>g/L</b> for gases (because gases have
            much lower density). Water at 4 °C: ρ = 1.000 g/mL.
          </p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Worked example:</b> A block of zinc has mass 28.4 g and volume 4.0 cm³. Find density.
            <MathBlock tex={`\\rho = \\frac{28.4\\text{ g}}{4.0\\text{ cm}^{3}} = 7.1\\text{ g/cm}^{3}`} />
            (Two sig figs because 4.0 has two.)
          </div>
          <Callout kind="info" title="Will it float?">
            An object floats if its density is less than the fluid's. Ice (0.917 g/mL) floats on water (1.00 g/mL).
          </Callout>
        </>
      )
    },
    {
      id: 'temp-scales',
      title: 'Temperature Scales & Temperature vs. Heat',
      subtitle: 'Celsius, Kelvin, Fahrenheit — when to use which',
      images: [{ src: `${IMG}/p17_i0.jpeg`, alt: 'Comparison of Celsius, Kelvin, Fahrenheit scales' }],
      content: (
        <>
          <MathBlock tex={`T_{\\mathrm{K}} = T_{^{\\circ}\\mathrm{C}} + 273.15`} />
          <MathBlock tex={`T_{^{\\circ}\\mathrm{F}} = \\frac{9}{5}T_{^{\\circ}\\mathrm{C}} + 32`} />
          <Callout kind="warn" title="Always use Kelvin in gas-law problems">
            Kelvin is an absolute scale — no negative values. Gas laws (PV = nRT) break if you plug in °C.
          </Callout>
          <p className="text-sm mt-2">
            Temperature is a measure of average kinetic energy of particles. <b>Heat</b> is <i>energy transferred</i> due to a
            temperature difference — two different concepts.
          </p>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Element', def: 'A pure substance of one type of atom; cannot be chemically decomposed.', tag: 'matter', tagColor: 'blue' },
      { term: 'Compound', def: 'Two or more elements chemically combined in fixed ratios.', tag: 'matter', tagColor: 'blue' },
      { term: 'Mixture', def: 'Physical combination of substances; composition can vary.', tag: 'matter', tagColor: 'blue' },
      { term: 'Intensive property', def: 'Independent of sample size (density, T, color).', tag: 'property', tagColor: 'green' },
      { term: 'Extensive property', def: 'Depends on sample size (mass, volume).', tag: 'property', tagColor: 'green' },
      { term: 'Density', def: 'ρ = m/V; intensive; units g/mL or g/cm³.', tag: 'formula', tagColor: 'amber' },
      { term: 'Significant figures', def: 'Digits carrying meaningful information about precision.', tag: 'math', tagColor: 'violet' }
    ],
    laws: [
      { name: 'Law of Conservation of Mass', desc: 'Mass of reactants = mass of products in a closed system.' },
      { name: 'Law of Definite Proportions', desc: 'A compound always contains the same elements in the same mass ratio.' }
    ],
    methods: [
      { name: 'Dimensional Analysis', expand: '"Factor-label method"', desc: 'Multiply by conversion ratios so unwanted units cancel. Write each step; check cancellation before computing.' },
      { name: 'Sig-fig count', desc: 'For ×/÷: answer has fewest sig figs of inputs. For +/−: answer has fewest decimal places.' },
      { name: 'K ↔ °C', desc: 'Add 273.15 to go °C → K; subtract to reverse. °F uses ⁹⁄₅ and +32.' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'Which of the following is a homogeneous mixture?',
      type: 'mcq',
      choices: ['Sand and iron filings', 'Salt dissolved in water', 'Oil and water', 'Granite'],
      correct: 1,
      difficulty: 'E',
      explanation: 'A salt solution is uniform on the molecular scale — one phase throughout. The others have visibly distinct regions.'
    },
    {
      q: 'A piece of metal has mass 54.68 g and volume 20.3 cm³. What is its density (to correct sig figs)?',
      type: 'mcq',
      choices: ['2.69 g/cm³', '2.693 g/cm³', '2.7 g/cm³', '2.6935 g/cm³'],
      correct: 0,
      difficulty: 'M',
      explanation: 'ρ = 54.68 / 20.3 = 2.6935… g/cm³. Division → fewest sig figs = 3 (from 20.3). Answer: 2.69 g/cm³.'
    },
    {
      q: 'How many significant figures are in the measurement 0.003040 mol?',
      type: 'mcq',
      choices: ['3', '4', '5', '6'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Leading zeros are not significant; the 3, 0 (between), 4, and trailing 0 after the decimal all are → 4 sig figs.'
    },
    {
      q: 'Which property is INTENSIVE?',
      type: 'mcq',
      choices: ['Mass', 'Volume', 'Density', 'Length'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Density (m/V) is a ratio and does not depend on sample size. The rest scale with amount.'
    },
    {
      q: 'Convert 85.0 °F to Kelvin.',
      type: 'mcq',
      choices: ['302 K', '358 K', '187 K', '245 K'],
      correct: 0,
      difficulty: 'M',
      explanation: 'First °F → °C: (85.0 − 32) × 5/9 = 29.4 °C. Then + 273.15 = 302.6 K ≈ 302 K.'
    },
    {
      q: 'Which change is CHEMICAL?',
      type: 'mcq',
      choices: ['Ice melts to water', 'Sugar dissolves in tea', 'Iron rusts to form iron(III) oxide', 'Salt is ground to a powder'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Rusting produces a new substance (Fe₂O₃·xH₂O) with different composition — a chemical change.'
    },
    {
      q: 'An irregularly shaped object raises water level in a graduated cylinder from 25.0 mL to 38.5 mL and has mass 108.2 g. Density?',
      type: 'mcq',
      choices: ['2.81 g/mL', '8.01 g/mL', '7.86 g/mL', '4.33 g/mL'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Volume by displacement = 38.5 − 25.0 = 13.5 mL. ρ = 108.2 / 13.5 = 8.01 g/mL.'
    },
    {
      q: 'The number 1.20 × 10³ has how many significant figures?',
      type: 'mcq',
      choices: ['2', '3', '4', 'Ambiguous'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Scientific notation removes ambiguity — every digit in the coefficient counts. 1.20 → 3 sig figs.'
    }
  ]
};
