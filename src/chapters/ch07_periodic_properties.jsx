import React from 'react';
import { Callout, Table } from '../components/Visual.jsx';
import { MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch07_periodic_properties';

export default {
  id: 7,
  shortId: '7',
  title: 'Periodic Properties',
  subtitle: 'Effective nuclear charge, atomic/ionic radii, ionization energy, electron affinity — the trends and their explanations.',
  blocks: [
    {
      id: 'effective-nuclear-charge',
      title: 'Effective Nuclear Charge (Zeff)',
      subtitle: 'The net pull felt by a valence electron',
      images: [{ src: `${IMG}/p3_i0.jpeg`, alt: 'Zeff shielding illustration — core electrons shield outer electrons' }],
      content: (
        <>
          <MathBlock tex={`Z_{\\text{eff}} = Z - S`} />
          <p className="text-sm">
            Z is the actual number of protons. <b>S (shielding)</b> is how much the core electrons "blunt"
            that pull. More core electrons → more shielding.
          </p>
          <Callout kind="tip" title="Slater's rules (shortcut)">
            <ul className="list-disc list-inside text-sm">
              <li>Electrons in the <b>same (ns,np) group</b> as the target: 0.35 each (0.30 for 1s).</li>
              <li>Electrons in shell (n−1): 0.85 each (for s/p targets).</li>
              <li>Electrons in shells (n−2) and deeper: 1.00 each.</li>
              <li>For d or f target: all inner electrons shield 1.00.</li>
            </ul>
          </Callout>
          <Callout kind="info" title="Try the interactive">
            Click the <b>🧪 Periodic Trends</b> tab to see Slater's Zeff worked out for any element, step by step.
          </Callout>
        </>
      )
    },
    {
      id: 'atomic-radius',
      title: 'Atomic Radius',
      subtitle: 'How big is an atom?',
      images: [{ src: `${IMG}/p6_i0.png`, alt: 'Atomic radius trend — decrease across period, increase down group' }],
      content: (
        <>
          <p>
            <b>Across a period (left → right):</b> radius <b>decreases</b>. Protons added to same shell → higher Zeff → electrons pulled closer.
          </p>
          <p>
            <b>Down a group:</b> radius <b>increases</b>. New shells → electrons farther from nucleus despite increasing Z.
          </p>
          <Table
            headers={['Element (group 1A)', 'Radius (pm)', 'Reason']}
            rows={[
              ['Li', '152', 'n=2'],
              ['Na', '186', 'n=3'],
              ['K', '227', 'n=4'],
              ['Rb', '248', 'n=5']
            ]}
          />
        </>
      )
    },
    {
      id: 'ionic-radius',
      title: 'Ionic Radii',
      subtitle: 'Cations shrink, anions grow',
      images: [{ src: `${IMG}/p8_i1.png`, alt: 'Ionic vs atomic radii comparison' }],
      content: (
        <>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><b>Cations</b> are always <i>smaller</i> than the parent atom (often lose outer shell entirely; Zeff per remaining e⁻ increases).</li>
            <li><b>Anions</b> are always <i>larger</i> than the parent (added e⁻ increases repulsion; Zeff per electron decreases).</li>
            <li><b>Isoelectronic species</b> (same # e⁻): radius <i>decreases</i> as Z increases. Example: O²⁻ {'>'} F⁻ {'>'} Ne {'>'} Na⁺ {'>'} Mg²⁺.</li>
          </ul>
          <Callout kind="tip" title="Isoelectronic shortcut">
            More protons → stronger pull on the same number of electrons → smaller ion.
          </Callout>
        </>
      )
    },
    {
      id: 'ionization-energy',
      title: 'Ionization Energy (IE)',
      subtitle: 'Energy to remove an electron — higher means harder to ionize',
      images: [{ src: `${IMG}/p9_i0.png`, alt: 'Ionization energy periodic trend graph' }],
      content: (
        <>
          <p>
            IE₁ is the energy to remove the first (outermost) electron. Trend: <b>increases</b> across a period,
            <b> decreases</b> down a group. Successive IEs always increase: IE₁ {'<'} IE₂ {'<'} IE₃ …
          </p>
          <Callout kind="warn" title="Big jumps reveal core shells">
            A huge jump from IE_n to IE_(n+1) means we've started pulling from a core shell.<br />
            <b>Example:</b> Mg → IE₁ = 738, IE₂ = 1450, IE₃ = 7732 kJ/mol. The giant IE₃ jump = breaking into a noble-gas core.
          </Callout>
          <Callout kind="info" title="Exceptions in the trend">
            IE₁ dips at group 3A (B) and 6A (O) — removing a single p-orbital electron (3A) or breaking a newly-paired p-pair (6A) is slightly easier than the smooth trend predicts.
          </Callout>
        </>
      )
    },
    {
      id: 'electron-affinity',
      title: 'Electron Affinity (EA)',
      subtitle: 'Energy change when an electron is ADDED',
      images: [{ src: `${IMG}/p10_i1.png`, alt: 'Electron affinity vs atomic number plot' }],
      content: (
        <>
          <p>
            <b>More negative EA</b> = atom is happier gaining an electron (releases more energy). Halogens
            have the most negative EAs. Noble gases have EA ≈ 0 (no room in valence shell).
          </p>
          <p>
            Trend: EA becomes more negative <b>across a period</b>, roughly constant down a group (minor exceptions).
          </p>
          <Callout kind="info" title="Signs conventions vary">
            Some textbooks define EA as the <i>energy released</i>, so it's reported as a positive number for halogens.
            Know which sign convention your course uses — this one uses EA = ΔE (more negative = more exothermic).
          </Callout>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Effective nuclear charge (Zeff)', def: 'Net positive charge experienced by valence electrons; Z − S.', tag: 'core concept', tagColor: 'red' },
      { term: 'Shielding', def: 'Core electrons partially cancel the nuclear pull on outer electrons.', tag: 'core', tagColor: 'red' },
      { term: 'Ionization energy', def: 'Energy to remove one electron from a gaseous atom/ion.', tag: 'trend', tagColor: 'blue' },
      { term: 'Electron affinity', def: 'Energy change when a gaseous atom gains one electron.', tag: 'trend', tagColor: 'blue' },
      { term: 'Isoelectronic', def: 'Species with same number of electrons.', tag: 'concept', tagColor: 'violet' }
    ],
    laws: [
      { name: 'Periodic Law', desc: 'Properties vary periodically with atomic number because electron configurations repeat.' },
      { name: 'General trends', desc: '→ across: radius ↓, IE ↑, |EA| ↑, Zeff ↑.   ↓ down: radius ↑, IE ↓, |EA| roughly ↓, Zeff ~constant.' }
    ],
    methods: [
      { name: 'Comparing radii', desc: 'First check period (row), then group (column). Always use Zeff to break ties.' },
      { name: 'Predicting IE', desc: 'Higher Zeff + smaller radius = higher IE. Look for big jumps when removing a core electron.' },
      { name: 'Isoelectronic ordering', desc: 'Given same e⁻ count, more protons → smaller radius.' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'Which has the LARGEST atomic radius?',
      type: 'mcq',
      choices: ['F', 'Cl', 'Br', 'I'],
      correct: 3,
      difficulty: 'E',
      explanation: 'Down group 7A, radius increases as shells are added. I has the largest.'
    },
    {
      q: 'Rank in order of INCREASING first ionization energy: Mg, Na, Al, S.',
      type: 'mcq',
      choices: ['Na < Al < Mg < S', 'Na < Mg < Al < S', 'S < Al < Mg < Na', 'Al < Mg < Na < S'],
      correct: 0,
      difficulty: 'H',
      explanation: 'Across period 3 IE generally increases, but 3A (Al) dips below 2A (Mg) due to removing a p electron vs. s. Order: Na < Al < Mg < S.'
    },
    {
      q: 'Which is LARGEST?',
      type: 'mcq',
      choices: ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'],
      correct: 0,
      difficulty: 'M',
      explanation: 'All have 10 electrons (isoelectronic). Fewer protons → weaker pull → bigger. Z: O=8, F=9, Na=11, Mg=12. O²⁻ biggest.'
    },
    {
      q: 'Element X has IE₁ = 580, IE₂ = 1820, IE₃ = 2750, IE₄ = 11,600 kJ/mol. X is most likely in group:',
      type: 'mcq',
      choices: ['1A', '2A', '3A', '4A'],
      correct: 2,
      difficulty: 'H',
      explanation: 'Big jump between IE₃ and IE₄ → 3 valence electrons → group 3A (e.g., Al).'
    },
    {
      q: 'Using Slater\'s rules, calculate Zeff for a valence electron in oxygen (Z=8). Config 1s² 2s² 2p⁴.',
      type: 'mcq',
      choices: ['3.45', '4.55', '5.95', '6.20'],
      correct: 1,
      difficulty: 'H',
      explanation: 'Target is a 2p electron. Same-group (2s,2p) others: 5 × 0.35 = 1.75. Inner 1s: 2 × 0.85 = 1.70. S = 3.45. Zeff = 8 − 3.45 = 4.55.'
    },
    {
      q: 'Which atom has the MOST exothermic (most negative) electron affinity?',
      type: 'mcq',
      choices: ['O', 'Ne', 'Na', 'Cl'],
      correct: 3,
      difficulty: 'M',
      explanation: 'Halogens (Cl) release the most energy when gaining an electron — one e⁻ away from a full shell.'
    },
    {
      q: 'Which statement about periodic trends is FALSE?',
      type: 'mcq',
      choices: [
        'Atomic radius decreases across a period.',
        'Ionization energy decreases down a group.',
        'Cations are larger than their parent atoms.',
        'Zeff increases across a period.'
      ],
      correct: 2,
      difficulty: 'E',
      explanation: 'Cations are SMALLER than their parent atoms (often lose the whole outer shell). The other three are correct.'
    }
  ]
};
