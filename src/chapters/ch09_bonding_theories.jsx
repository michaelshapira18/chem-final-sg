import React from 'react';
import { Callout, Table } from '../components/Visual.jsx';
import { MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch09_bonding_theories';

export default {
  id: 9,
  shortId: '9',
  title: 'Bonding Theories',
  subtitle: 'Valence Bond theory, hybridization, σ/π bonds, Molecular Orbital theory, bond order from MO diagrams, magnetism.',
  blocks: [
    {
      id: 'valence-bond-hybridization',
      title: 'Valence Bond Theory & Hybridization',
      subtitle: 'Mixing atomic orbitals to match observed geometry',
      images: [{ src: `${IMG}/image1.png`, alt: 'Hybrid orbital mixing diagram' }],
      content: (
        <>
          <p>
            Experimental geometries (e.g., CH₄\'s four equivalent 109.5° bonds) don\'t match plain s + p orbitals.
            Solution: <b>hybridize</b> — mix atomic orbitals to create new degenerate hybrid orbitals that point
            toward the observed bond directions.
          </p>
          <Table
            headers={['Electron domains', 'Hybridization', 'Geometry', 'Angle', 'Orbitals used']}
            rows={[
              ['2', 'sp', 'Linear', '180°', '1 s + 1 p (2 remain as p)'],
              ['3', 'sp²', 'Trig. planar', '120°', '1 s + 2 p (1 remains as p)'],
              ['4', 'sp³', 'Tetrahedral', '109.5°', '1 s + 3 p'],
              ['5', 'sp³d', 'Trig. bipyramidal', '90°/120°', '1 s + 3 p + 1 d'],
              ['6', 'sp³d²', 'Octahedral', '90°', '1 s + 3 p + 2 d']
            ]}
          />
          <Callout kind="tip" title="Key rule"># atomic orbitals used = # hybrid orbitals produced.</Callout>
        </>
      )
    },
    {
      id: 'sigma-pi',
      title: 'Sigma (σ) & Pi (π) Bonds',
      subtitle: 'Direct overlap vs. side-by-side overlap',
      images: [{ src: `${IMG}/p10_i2.jpeg`, alt: 'Sigma vs pi bond overlap' }],
      content: (
        <>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><b>σ bond:</b> end-to-end overlap along internuclear axis. Every single bond is σ.</li>
            <li><b>π bond:</b> side-to-side overlap of unhybridized p orbitals (above & below axis).</li>
          </ul>
          <Table
            headers={['Bond type', '# σ bonds', '# π bonds']}
            rows={[
              ['Single', '1', '0'],
              ['Double', '1', '1'],
              ['Triple', '1', '2']
            ]}
          />
          <Callout kind="info" title="Rotation around bonds">
            σ bonds freely rotate (C−C single bonds in ethane). π bonds lock rotation — C=C double bonds give rise to cis/trans isomerism.
          </Callout>
        </>
      )
    },
    {
      id: 'hybridization-examples',
      title: 'Determining Hybridization from Lewis Structure',
      subtitle: 'Count domains on the central atom',
      images: [{ src: `${IMG}/p17_i0.jpeg`, alt: 'Hybridization examples — CH4, C2H4, C2H2' }],
      content: (
        <>
          <div className="bg-slate-50 rounded p-3 text-sm space-y-1">
            <div><b>CH₄:</b> C has 4 bonds → 4 domains → <b>sp³</b>.</div>
            <div><b>C₂H₄ (ethene):</b> each C has 3 domains (2 C−H + 1 C=C) → <b>sp²</b>.</div>
            <div><b>C₂H₂ (ethyne):</b> each C has 2 domains → <b>sp</b>.</div>
            <div><b>NH₃:</b> N has 3 bonds + 1 LP = 4 domains → <b>sp³</b>.</div>
            <div><b>H₂O:</b> O has 2 bonds + 2 LPs = 4 domains → <b>sp³</b>.</div>
            <div><b>CO₂:</b> C has 2 domains (2 double bonds) → <b>sp</b>.</div>
          </div>
          <Callout kind="warn" title="Quick counting">
            Each bond (single/double/triple) counts as <b>1 domain</b>. Each lone pair is also 1 domain.
          </Callout>
        </>
      )
    },
    {
      id: 'mo-theory',
      title: 'Molecular Orbital (MO) Theory',
      subtitle: 'Atomic orbitals combine to form molecular orbitals',
      images: [{ src: `${IMG}/p20_i0.jpeg`, alt: 'Molecular orbital diagram for diatomic molecules' }],
      content: (
        <>
          <p>
            Two atomic orbitals combine → two molecular orbitals: a <b>bonding MO</b> (lower energy) and an
            <b> antibonding MO</b> (higher, marked with *). Electrons fill lowest-energy MOs first, obey Pauli and Hund
            just like atomic orbitals.
          </p>
          <Table
            headers={['MO', 'Shape', 'Effect']}
            rows={[
              ['σ (bonding)', 'Constructive overlap on internuclear axis', 'Favors bond'],
              ['σ* (antibonding)', 'Node between nuclei', 'Destabilizes bond'],
              ['π, π*', 'Side-to-side overlap of p orbitals', 'Accounts for multiple bonds']
            ]}
          />
          <MathBlock tex={`\\text{Bond order} = \\frac{(\\text{bonding e}^-) - (\\text{antibonding e}^-)}{2}`} />
          <Callout kind="info" title="Interpreting MO bond order">
            Bond order > 0 → molecule exists (stable).<br />
            Bond order = 0 → no net bonding (molecule doesn\'t exist, like He₂).<br />
            Higher order → stronger, shorter bond.
          </Callout>
        </>
      )
    },
    {
      id: 'mo-examples',
      title: 'MO Examples: H₂, He₂, N₂, O₂',
      subtitle: 'Using MO diagrams to predict stability and magnetism',
      images: [{ src: `${IMG}/p22_i0.jpeg`, alt: 'MO diagram for O2 showing unpaired electrons' }],
      content: (
        <>
          <div className="bg-slate-50 rounded p-3 text-sm space-y-2">
            <div><b>H₂:</b> 2 e⁻ → both in σ1s. Bond order = (2−0)/2 = <b>1</b>. Stable.</div>
            <div><b>He₂:</b> 4 e⁻ → 2 in σ1s, 2 in σ*1s. Order = (2−2)/2 = <b>0</b>. Doesn\'t exist.</div>
            <div><b>N₂:</b> 10 valence e⁻. σ2s², σ*2s², π2p⁴, σ2p². Order = (8−2)/2 = <b>3</b>. All paired → <b>diamagnetic</b>.</div>
            <div><b>O₂:</b> 12 valence e⁻. Two e⁻ end up in degenerate π*2p orbitals (Hund → parallel). Order = (8−4)/2 = <b>2</b>. Two unpaired → <b>paramagnetic</b> (liquid O₂ sticks to a magnet!).</div>
          </div>
          <Callout kind="warn" title="Why MO beats Lewis for O₂">
            Lewis predicts O=O with all paired e⁻ — would be diamagnetic. But O₂ IS paramagnetic. MO theory correctly predicts the 2 unpaired e⁻.
          </Callout>
        </>
      )
    },
    {
      id: 'paramagnetism',
      title: 'Paramagnetic vs. Diamagnetic',
      subtitle: 'Looking at MO (or atomic) diagrams',
      images: [{ src: `${IMG}/p24_i0.png`, alt: 'Paramagnetic diamagnetic illustration' }],
      content: (
        <>
          <p>
            <b>Paramagnetic:</b> ≥1 unpaired electron → attracted to magnetic fields.
            <b> Diamagnetic:</b> all electrons paired → weakly repelled.
          </p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            Examples: <b>O₂</b> paramagnetic · <b>N₂</b> diamagnetic · <b>F₂</b> diamagnetic · <b>B₂</b> paramagnetic (π2p₁, π2p₁ singly occupied).
          </div>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Hybrid orbital', def: 'Orbital formed by mixing atomic orbitals on the same atom.', tag: 'VB', tagColor: 'blue' },
      { term: 'σ bond', def: 'End-to-end overlap; every single bond is σ.', tag: 'bond', tagColor: 'green' },
      { term: 'π bond', def: 'Side-by-side overlap of p orbitals; present in double and triple bonds.', tag: 'bond', tagColor: 'green' },
      { term: 'Bonding MO', def: 'Lower-energy MO formed by constructive interference.', tag: 'MO', tagColor: 'violet' },
      { term: 'Antibonding MO (*)', def: 'Higher-energy MO with node between nuclei.', tag: 'MO', tagColor: 'violet' },
      { term: 'Bond order (MO)', def: '½(bonding e⁻ − antibonding e⁻).', tag: 'MO', tagColor: 'violet' }
    ],
    laws: [
      { name: 'Hybridization rule', desc: '# atomic orbitals mixed = # hybrid orbitals produced.' },
      { name: 'Bond composition', desc: 'Single = 1σ. Double = 1σ + 1π. Triple = 1σ + 2π.' },
      { name: 'MO filling', desc: 'Obey Aufbau, Pauli, Hund. Bond order > 0 → molecule exists.' }
    ],
    methods: [
      { name: 'Assign hybridization', desc: '(1) Draw Lewis structure. (2) Count domains on central atom. (3) Look up: 2→sp, 3→sp², 4→sp³, 5→sp³d, 6→sp³d².' },
      { name: 'Count σ and π', desc: 'In the Lewis structure: every bond line = 1 σ. Double adds +1 π. Triple adds +2 π.' },
      { name: 'Use MO diagram', desc: 'Fill electrons lowest-first. Bond order = ½(b − a*). Unpaired e⁻ → paramagnetic.' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'What is the hybridization of the central atom in BF₃?',
      type: 'mcq',
      choices: ['sp', 'sp²', 'sp³', 'sp³d'],
      correct: 1,
      difficulty: 'E',
      explanation: 'B has 3 single bonds, 0 lone pairs → 3 domains → sp².'
    },
    {
      q: 'How many σ bonds and how many π bonds are in H₂C=CH−C≡N?',
      type: 'mcq',
      choices: ['6 σ, 3 π', '5 σ, 2 π', '6 σ, 2 π', '4 σ, 3 π'],
      correct: 0,
      difficulty: 'H',
      explanation: 'Single bonds: 2 C−H + 1 C−H + 1 C−C = 4 σ. Double C=C: 1 σ + 1 π. Triple C≡N: 1 σ + 2 π. Total: σ = 4 + 1 + 1 = 6; π = 1 + 2 = 3.'
    },
    {
      q: 'Hybridization of the O in H₂O?',
      type: 'mcq',
      choices: ['sp', 'sp²', 'sp³', 'unhybridized'],
      correct: 2,
      difficulty: 'E',
      explanation: 'O has 2 bonds + 2 lone pairs = 4 domains → sp³.'
    },
    {
      q: 'Calculate the bond order of O₂⁻ using the MO diagram.',
      type: 'mcq',
      choices: ['1.0', '1.5', '2.0', '2.5'],
      correct: 1,
      difficulty: 'H',
      explanation: 'O₂⁻ has 13 valence e⁻. Bonding: 8; antibonding (π*2p): 5. Order = (8−5)/2 = 1.5.'
    },
    {
      q: 'Which species is DIAMAGNETIC?',
      type: 'mcq',
      choices: ['O₂', 'B₂', 'N₂', 'NO'],
      correct: 2,
      difficulty: 'M',
      explanation: 'N₂ has 10 valence e⁻ all paired → diamagnetic. O₂, B₂, NO have unpaired e⁻.'
    },
    {
      q: 'Hybridization of the central atom in XeF₂?',
      type: 'mcq',
      choices: ['sp', 'sp²', 'sp³', 'sp³d'],
      correct: 3,
      difficulty: 'H',
      explanation: 'Xe has 2 bonds + 3 lone pairs = 5 domains → sp³d (trigonal bipyramidal electron geometry).'
    },
    {
      q: 'Which ion has the LARGEST bond order?',
      type: 'mcq',
      choices: ['O₂²⁻', 'O₂⁻', 'O₂', 'O₂⁺'],
      correct: 3,
      difficulty: 'H',
      explanation: 'Adding electrons to O₂ goes into π*, lowering bond order. Removing an electron RAISES it. O₂²⁻=1, O₂⁻=1.5, O₂=2, O₂⁺=2.5.'
    },
    {
      q: 'A triple bond consists of:',
      type: 'mcq',
      choices: ['3 σ bonds', '3 π bonds', '1 σ + 2 π bonds', '2 σ + 1 π bonds'],
      correct: 2,
      difficulty: 'E',
      explanation: 'Every bond between two atoms starts with a σ. Triple has 1 σ plus 2 π.'
    }
  ]
};
