import React from 'react';
import { Callout, Table } from '../components/Visual.jsx';
import { MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch10_gases';

export default {
  id: 10,
  shortId: '10',
  title: 'Gases',
  subtitle: 'Gas laws, the ideal gas equation, gas density, molar mass, partial pressures, and kinetic-molecular theory.',
  blocks: [
    {
      id: 'properties-of-gases',
      title: 'Properties of Gases & Pressure',
      subtitle: 'What makes a gas different',
      images: [{ src: `${IMG}/p2_i0.jpeg`, alt: 'Gas particles in random motion' }],
      content: (
        <>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Gases are highly compressible.</li>
            <li>Gases mix completely (miscible in all proportions).</li>
            <li>Gases exert pressure equal in all directions.</li>
            <li>State variables: P, V, T (must be Kelvin!), n.</li>
          </ul>
          <Table
            headers={['Unit', 'Conversion']}
            rows={[
              ['1 atm', '= 760 mmHg = 760 torr = 101.325 kPa = 1.01325 bar'],
              ['1 bar', '≈ 0.987 atm (SI-flavored)'],
              ['STP (IUPAC 1982)', '0 °C (273.15 K), 1 atm · 1 mol ideal gas = 22.4 L']
            ]}
          />
        </>
      )
    },
    {
      id: 'simple-gas-laws',
      title: 'Boyle, Charles, Gay-Lussac, Avogadro',
      subtitle: 'The four limits of the ideal gas',
      images: [{ src: `${IMG}/p4_i0.jpeg`, alt: 'Simple gas laws graphs' }],
      content: (
        <>
          <Table
            headers={['Law', 'Relation', 'Held constant', 'Equation']}
            rows={[
              ['Boyle', 'P ∝ 1/V (inverse)', 'n, T', 'P₁V₁ = P₂V₂'],
              ['Charles', 'V ∝ T (direct)', 'n, P', 'V₁/T₁ = V₂/T₂'],
              ['Gay-Lussac', 'P ∝ T (direct)', 'n, V', 'P₁/T₁ = P₂/T₂'],
              ['Avogadro', 'V ∝ n (direct)', 'T, P', 'V₁/n₁ = V₂/n₂']
            ]}
          />
          <Callout kind="warn" title="T must be in Kelvin">
            Every gas law uses absolute temperature. Always convert °C → K (+ 273.15) before calculating.
          </Callout>
        </>
      )
    },
    {
      id: 'ideal-gas',
      title: 'The Ideal Gas Law',
      subtitle: 'Unifies everything: PV = nRT',
      images: [{ src: `${IMG}/p8_i0.png`, alt: 'Ideal gas law equation' }],
      content: (
        <>
          <MathBlock tex={`PV = nRT`} />
          <p className="text-sm">
            <b>R = 0.08206 L·atm/(mol·K)</b> when using atm &amp; L. Also <b>8.314 J/(mol·K)</b> for energy work.
          </p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> How many moles of N₂ are in a 20.0-L tank at 25 °C and 3.50 atm?<br />
            T = 298 K. <MathBlock tex={`n = \\frac{PV}{RT} = \\frac{(3.50)(20.0)}{(0.08206)(298)} = 2.86\\text{ mol}`} />
          </div>
          <Callout kind="info" title="Combined gas law (fixed n)">
            <MathBlock tex={`\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}`} />
          </Callout>
        </>
      )
    },
    {
      id: 'gas-density-molar-mass',
      title: 'Gas Density & Molar Mass',
      subtitle: 'From PV = nRT in disguise',
      images: [{ src: `${IMG}/p12_i0.png`, alt: 'Gas density calculation' }],
      content: (
        <>
          <MathBlock tex={`d = \\frac{m}{V} = \\frac{P \\cdot M}{RT}`} />
          <p className="text-sm">where M is molar mass. Rearrange for molar mass:</p>
          <MathBlock tex={`M = \\frac{d R T}{P}`} />
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> A 0.256-g sample of an unknown gas occupies 125 mL at 20.0 °C and 750 torr. Find its molar mass.<br />
            P = 750/760 = 0.987 atm. V = 0.125 L. T = 293 K. Density = 0.256/0.125 = 2.048 g/L.<br />
            <MathBlock tex={`M = \\frac{(2.048)(0.08206)(293)}{0.987} = 49.9\\text{ g/mol}`} />
          </div>
        </>
      )
    },
    {
      id: 'daltons-law',
      title: "Dalton's Law of Partial Pressures",
      subtitle: 'Non-reacting gases add up independently',
      images: [{ src: `${IMG}/p14_i0.jpeg`, alt: "Dalton's law — gas mixture" }],
      content: (
        <>
          <MathBlock tex={`P_{\\text{total}} = P_1 + P_2 + P_3 + \\dots`} />
          <MathBlock tex={`P_i = \\chi_i \\cdot P_{\\text{total}} \\quad \\text{where } \\chi_i = \\frac{n_i}{n_{\\text{total}}}`} />
          <Callout kind="info" title="Water-displacement correction">
            When collecting a gas over water, subtract water's vapor pressure at that temperature from total P to get the dry-gas partial pressure.
          </Callout>
          <div className="bg-slate-50 rounded p-3 text-sm">
            <b>Example:</b> A 2.00-L flask contains 0.050 mol N₂ and 0.030 mol O₂ at 20 °C.<br />
            n_total = 0.080 mol. P_total = nRT/V = 0.080 × 0.08206 × 293 / 2.00 = 0.962 atm.<br />
            χ_N₂ = 0.050/0.080 = 0.625 → P_N₂ = 0.625 × 0.962 = <b>0.601 atm</b>.
          </div>
        </>
      )
    },
    {
      id: 'kinetic-molecular-theory',
      title: 'Kinetic-Molecular Theory (KMT) & Real Gases',
      subtitle: 'What the ideal gas assumes — and when it fails',
      images: [{ src: `${IMG}/p17_i0.png`, alt: 'Maxwell-Boltzmann distribution at different temperatures' }],
      content: (
        <>
          <p className="font-semibold">KMT postulates:</p>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Gases are made of tiny particles in constant, random motion.</li>
            <li>Particle volume is negligible compared to container.</li>
            <li>No attractive or repulsive forces between particles.</li>
            <li>Collisions are elastic (no KE lost).</li>
            <li>Average KE ∝ absolute temperature.</li>
          </ol>
          <MathBlock tex={`KE_{\\text{avg}} = \\frac{3}{2}RT, \\quad u_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}`} />
          <Callout kind="warn" title="Real gases deviate">
            At <b>high P</b> (particle volume becomes non-negligible) and <b>low T</b> (attractive forces matter). Most deviation shows up near condensation conditions. Van der Waals equation corrects for both.
          </Callout>
          <Callout kind="info" title="Effusion & Graham's Law">
            Lighter molecules effuse faster: <MathBlock tex={`\\frac{\\text{rate}_A}{\\text{rate}_B} = \\sqrt{\\frac{M_B}{M_A}}`} />
          </Callout>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Pressure', def: 'Force per area; gas molecules colliding with container.', tag: 'property', tagColor: 'blue' },
      { term: 'STP (IUPAC)', def: '0 °C (273.15 K), 1 atm. 1 mol ideal gas = 22.4 L.', tag: 'constant', tagColor: 'amber' },
      { term: 'Partial pressure', def: 'Pressure a gas would exert alone in the container.', tag: 'mixtures', tagColor: 'green' },
      { term: 'Mole fraction (χ)', def: 'n_i / n_total; dimensionless; sums to 1.', tag: 'mixtures', tagColor: 'green' },
      { term: 'u_rms', def: 'Root-mean-square speed; √(3RT/M).', tag: 'KMT', tagColor: 'violet' },
      { term: 'Effusion', def: 'Escape of gas through a tiny hole; rate ∝ 1/√M.', tag: 'KMT', tagColor: 'violet' }
    ],
    laws: [
      { name: 'Ideal Gas Law', desc: 'PV = nRT. R = 0.08206 L·atm/(mol·K).' },
      { name: 'Combined Gas Law', desc: 'P₁V₁/T₁ = P₂V₂/T₂ (fixed n).' },
      { name: "Dalton\'s Law", desc: 'Total P = sum of partial Ps.' },
      { name: "Graham\'s Law", desc: 'rate_A / rate_B = √(M_B / M_A).' }
    ],
    methods: [
      { name: 'Gas law selection', desc: 'Which variables change? Pick the law that fixes the others.' },
      { name: 'Gas density', desc: 'd = PM/RT. Useful when you know pressure & temperature at a given identity.' },
      { name: 'Mole fraction shortcut', desc: 'P_i / P_total = χ_i = n_i / n_total.' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'A gas at 2.50 atm occupies 8.00 L at 300. K. What volume will it occupy at 4.00 atm and 450. K?',
      type: 'mcq',
      choices: ['4.00 L', '5.00 L', '7.50 L', '12.0 L'],
      correct: 2,
      difficulty: 'M',
      explanation: 'P₁V₁/T₁ = P₂V₂/T₂ → V₂ = (2.50·8.00·450)/(4.00·300) = 9000/1200 = 7.50 L.'
    },
    {
      q: 'Calculate the pressure (atm) of 0.500 mol of a gas in a 10.0-L container at 27 °C.',
      type: 'mcq',
      choices: ['0.123 atm', '1.23 atm', '12.3 atm', '123 atm'],
      correct: 1,
      difficulty: 'E',
      explanation: 'T = 300 K. P = nRT/V = (0.500)(0.08206)(300)/10.0 = 1.23 atm.'
    },
    {
      q: 'The density of an unknown gas at STP is 1.96 g/L. What is the molar mass? (At STP, 1 mol = 22.4 L)',
      type: 'mcq',
      choices: ['22 g/mol', '32 g/mol', '44 g/mol', '64 g/mol'],
      correct: 2,
      difficulty: 'M',
      explanation: 'M = d × V_m = 1.96 × 22.4 = 43.9 ≈ 44 g/mol (CO₂).'
    },
    {
      q: 'A mixture of 2.00 mol N₂, 1.00 mol O₂, and 1.00 mol Ar at 2.00 atm total. What is P_O₂?',
      type: 'mcq',
      choices: ['0.25 atm', '0.50 atm', '1.00 atm', '2.00 atm'],
      correct: 1,
      difficulty: 'M',
      explanation: 'χ_O₂ = 1/(2+1+1) = 0.25. P_O₂ = 0.25 × 2.00 = 0.50 atm.'
    },
    {
      q: 'Which of the following gases effuses the FASTEST at the same T?',
      type: 'mcq',
      choices: ['N₂', 'O₂', 'CO₂', 'He'],
      correct: 3,
      difficulty: 'E',
      explanation: "Graham's law: rate ∝ 1/√M. He (4 g/mol) is smallest → fastest."
    },
    {
      q: 'If the temperature of a gas at constant volume and mol is tripled, its pressure will:',
      type: 'mcq',
      choices: ['Stay the same', 'Be halved', 'Triple', 'Be 1/3'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Gay-Lussac: P ∝ T at fixed V, n. Triple T → triple P.'
    },
    {
      q: 'A sample of hydrogen gas is collected over water at 25 °C. Total pressure = 745 torr. Vapor pressure of water = 23.8 torr. What is P_H₂?',
      type: 'mcq',
      choices: ['721 torr', '768 torr', '745 torr', '23.8 torr'],
      correct: 0,
      difficulty: 'M',
      explanation: 'P_H₂ = 745 − 23.8 = 721 torr (dry gas partial pressure).'
    },
    {
      q: 'The rms speed of O₂ molecules at 25 °C is about:',
      type: 'mcq',
      choices: ['170 m/s', '480 m/s', '1100 m/s', '2400 m/s'],
      correct: 1,
      difficulty: 'H',
      explanation: 'u_rms = √(3RT/M). R = 8.314, T = 298, M = 0.032 kg/mol. u = √(3·8.314·298/0.032) = √232,467 ≈ 482 m/s.'
    }
  ]
};
