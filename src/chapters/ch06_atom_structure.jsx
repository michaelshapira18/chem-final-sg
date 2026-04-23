import React from 'react';
import { Callout, Table } from '../components/Visual.jsx';
import { MathBlock } from '../components/MathInline.jsx';

const IMG = 'ch06_atom_structure';

export default {
  id: 6,
  shortId: '6',
  title: 'The Structure of Atoms',
  subtitle: 'Electromagnetic radiation, the Bohr model, quantum mechanics, orbitals, quantum numbers, and electron configurations.',
  blocks: [
    {
      id: 'em-radiation',
      title: 'Electromagnetic Radiation: λ, ν, E',
      subtitle: 'Light is a wave — sometimes a particle',
      images: [{ src: `${IMG}/p13_i0.png`, alt: 'Wavelength, frequency, amplitude of a wave' }],
      content: (
        <>
          <MathBlock tex={`c = \\lambda \\nu`} />
          <p className="text-sm">
            Speed of light c = 3.00 × 10⁸ m/s in vacuum. Wavelength λ (m, nm); frequency ν (Hz = 1/s).
            Wavelength and frequency are <b>inversely</b> related.
          </p>
          <MathBlock tex={`E = h\\nu = \\frac{hc}{\\lambda}`} />
          <p className="text-sm">
            Planck's relation: energy of a photon. h = 6.626 × 10⁻³⁴ J·s.
            <b> Shorter wavelength → higher frequency → higher energy.</b>
          </p>
          <Callout kind="tip" title="Spectrum order (low → high E)">
            Radio → microwave → IR → <b>visible (red → violet)</b> → UV → X-ray → γ-ray.
          </Callout>
        </>
      )
    },
    {
      id: 'photoelectric-bohr',
      title: 'Photoelectric Effect & the Bohr Model',
      subtitle: 'Quantized energy levels in atoms',
      images: [{ src: `${IMG}/p14_i0.jpeg`, alt: 'Bohr model — electron orbits at discrete radii' }],
      content: (
        <>
          <p>
            Einstein's photoelectric effect: light ejects electrons only if ν exceeds a threshold — light is
            quantized (photons). Bohr applied this to atoms: electrons exist in <b>discrete orbits</b> (n = 1, 2, 3…).
            They absorb a photon to jump up (excited state) and emit a photon to drop down.
          </p>
          <MathBlock tex={`E_n = -\\frac{R_H}{n^2}, \\quad R_H = 2.18 \\times 10^{-18}\\text{ J}`} />
          <MathBlock tex={`\\Delta E = R_H \\left( \\frac{1}{n_i^2} - \\frac{1}{n_f^2} \\right)`} />
          <p className="text-sm">
            Absorption: n_i {'<'} n_f (ΔE {'>'} 0). Emission: n_i {'>'} n_f (ΔE {'<'} 0).
          </p>
          <Callout kind="info" title="Hydrogen spectrum series">
            Transitions to n=1 → <b>Lyman</b> (UV). To n=2 → <b>Balmer</b> (visible). To n=3 → <b>Paschen</b> (IR).
          </Callout>
        </>
      )
    },
    {
      id: 'quantum-mechanics',
      title: 'Quantum Mechanics & the Uncertainty Principle',
      subtitle: 'Electrons are waves — we get probability, not trajectories',
      images: [{ src: `${IMG}/p15_i0.jpeg`, alt: 'de Broglie wave-particle duality' }],
      content: (
        <>
          <p>
            <b>de Broglie:</b> any particle has a wavelength <MathBlock tex={`\\lambda = \\frac{h}{mv}`} />
            This is measurable for electrons, negligible for a baseball.
          </p>
          <p>
            <b>Heisenberg's Uncertainty Principle:</b> you cannot simultaneously know position and momentum precisely.
            For electrons, this means we describe <b>probability distributions</b> (orbitals), not orbits.
          </p>
          <MathBlock tex={`\\Delta x \\cdot \\Delta (mv) \\geq \\frac{h}{4\\pi}`} />
        </>
      )
    },
    {
      id: 'quantum-numbers',
      title: 'Quantum Numbers: n, ℓ, mℓ, ms',
      subtitle: 'The four addresses of every electron',
      images: [{ src: `${IMG}/p19_i0.png`, alt: 'Quantum numbers chart' }],
      content: (
        <>
          <Table
            headers={['Symbol', 'Name', 'Values', 'Meaning']}
            rows={[
              ['n', 'Principal', '1, 2, 3, …', 'Shell → size & main energy'],
              ['ℓ', 'Angular momentum', '0 to n−1', 'Subshell shape (s=0, p=1, d=2, f=3)'],
              ['mℓ', 'Magnetic', '−ℓ … 0 … +ℓ', 'Orbital orientation (how many orbitals in the subshell)'],
              ['m_s', 'Spin', '+½ or −½', 'Electron spin']
            ]}
          />
          <Callout kind="warn" title="Pauli Exclusion Principle">
            No two electrons in the same atom can share all four quantum numbers → only <b>2 electrons per orbital</b> (opposite spins).
          </Callout>
          <Table
            headers={['Subshell', '# orbitals (2ℓ+1)', 'Max e⁻']}
            rows={[
              ['s (ℓ=0)', '1', '2'],
              ['p (ℓ=1)', '3', '6'],
              ['d (ℓ=2)', '5', '10'],
              ['f (ℓ=3)', '7', '14']
            ]}
          />
        </>
      )
    },
    {
      id: 'orbital-shapes',
      title: 'Orbital Shapes',
      subtitle: 'Where the electron probability density lives',
      images: [{ src: `${IMG}/p22_i0.png`, alt: 's, p, d orbital shapes' }],
      content: (
        <>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><b>s:</b> spherical. 1 orbital per shell. Nodes grow with n (1s has 0, 2s has 1, etc.).</li>
            <li><b>p:</b> two-lobed "dumbbell" on x, y, z axes. 3 orbitals per shell (from n=2 up).</li>
            <li><b>d:</b> four-lobed clover (plus one "donut-and-dumbbell"). 5 orbitals (from n=3 up).</li>
            <li><b>f:</b> complicated 8-lobed shapes. 7 orbitals (from n=4 up).</li>
          </ul>
          <Callout kind="info" title="Nodes">
            A node is where ψ = 0 (probability of finding the electron is zero). Total nodes = n − 1. Angular nodes = ℓ, radial = n − ℓ − 1.
          </Callout>
        </>
      )
    },
    {
      id: 'electron-config',
      title: 'Electron Configurations',
      subtitle: 'Aufbau + Pauli + Hund',
      images: [{ src: `${IMG}/p24_i0.jpeg`, alt: 'Aufbau diagonal filling order' }],
      content: (
        <>
          <p className="font-semibold">Three rules:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li><b>Aufbau</b>: fill from lowest energy up. Standard order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d…</li>
            <li><b>Pauli</b>: max 2 e⁻ per orbital with opposite spins.</li>
            <li><b>Hund's rule</b>: fill degenerate orbitals singly first (all spins parallel) before pairing.</li>
          </ul>
          <div className="bg-slate-50 rounded p-3 text-sm">
            Example: <b>Fe (Z=26)</b> → 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ or [Ar] 4s² 3d⁶.<br />
            <b>Se (Z=34)</b> → [Ar] 4s² 3d¹⁰ 4p⁴.
          </div>
          <Callout kind="warn" title="Anomalies (memorize)">
            <b>Cr:</b> [Ar] 4s¹ 3d⁵ (half-filled d is more stable). <br />
            <b>Cu:</b> [Ar] 4s¹ 3d¹⁰ (fully filled d).
          </Callout>
          <Callout kind="info" title="Ions">
            For cations of transition metals: remove s electrons FIRST, then d. So Fe²⁺ = [Ar] 3d⁶ (not 4s²3d⁴).
          </Callout>
        </>
      )
    },
    {
      id: 'valence-paramagnetism',
      title: 'Valence Electrons, Magnetism & Noble-Gas Shorthand',
      subtitle: 'What the outermost shell tells us',
      images: [{ src: `${IMG}/p26_i0.jpeg`, alt: 'Paramagnetic vs diamagnetic — box diagrams' }],
      content: (
        <>
          <p>
            <b>Valence electrons</b> = outermost shell (for main group, the group number = # valence e⁻). These dictate chemistry.
          </p>
          <p>
            <b>Paramagnetic</b>: has ≥ 1 unpaired electron → weakly attracted to a magnet.
            <b> Diamagnetic</b>: all paired → weakly repelled. Tell by drawing the orbital box diagram.
          </p>
          <div className="bg-slate-50 rounded p-3 text-sm">
            Example: O = [He] 2s² 2p⁴. Box diagram for 2p: ↑↓  ↑  ↑ → 2 unpaired → <b>paramagnetic</b>.
          </div>
        </>
      )
    }
  ],
  keyReview: {
    vocab: [
      { term: 'Wavelength (λ)', def: 'Distance between wave crests; λ × ν = c.', tag: 'light', tagColor: 'violet' },
      { term: 'Frequency (ν)', def: 'Cycles per second (Hz); E = hν.', tag: 'light', tagColor: 'violet' },
      { term: 'Photon', def: 'Quantum (packet) of EM radiation, E = hν.', tag: 'light', tagColor: 'violet' },
      { term: 'Orbital', def: 'Region with ≥90% probability of finding an electron.', tag: 'QM', tagColor: 'blue' },
      { term: 'Valence electrons', def: 'Outermost-shell electrons; govern chemistry.', tag: 'config', tagColor: 'green' },
      { term: 'Paramagnetic', def: 'At least one unpaired electron; magnet-attracted.', tag: 'magnetism', tagColor: 'red' },
      { term: 'Diamagnetic', def: 'All electrons paired.', tag: 'magnetism', tagColor: 'red' }
    ],
    laws: [
      { name: 'Planck', desc: 'E = hν — energy is quantized in packets.' },
      { name: 'de Broglie', desc: 'λ = h/(mv) — particles have wave character.' },
      { name: 'Heisenberg', desc: 'Uncertainty: Δx·Δp ≥ h/4π.' },
      { name: 'Pauli Exclusion', desc: 'No two electrons share all four quantum numbers.' },
      { name: 'Hund\'s Rule', desc: 'Fill degenerate orbitals singly with parallel spins before pairing.' },
      { name: 'Aufbau Principle', desc: 'Fill orbitals from lowest energy up.' }
    ],
    methods: [
      { name: 'Photon energy', desc: 'E = hc/λ. Convert nm → m (×10⁻⁹) before plugging in.' },
      { name: 'Electron config', desc: 'Follow diagonal arrow chart; use noble-gas shorthand [Ne], [Ar], etc.' },
      { name: 'Counting unpaired e⁻', desc: 'Draw the box diagram for the last-filled subshell; each lone arrow = 1 unpaired.' }
    ],
    diagrams: []
  },
  questions: [
    {
      q: 'Light with wavelength 650 nm has frequency:',
      type: 'mcq',
      choices: ['4.61 × 10¹⁴ Hz', '2.17 × 10⁻⁶ Hz', '1.95 × 10⁻¹⁷ Hz', '3.06 × 10⁻¹⁹ Hz'],
      correct: 0,
      difficulty: 'M',
      explanation: 'ν = c/λ = 3.00 × 10⁸ / (650 × 10⁻⁹) = 4.62 × 10¹⁴ Hz.'
    },
    {
      q: 'What is the energy of a single photon of light with λ = 500 nm? (h = 6.626 × 10⁻³⁴ J·s)',
      type: 'mcq',
      choices: ['3.98 × 10⁻¹⁹ J', '1.32 × 10⁻²⁷ J', '6.00 × 10¹⁴ J', '2.50 × 10⁻⁶ J'],
      correct: 0,
      difficulty: 'M',
      explanation: 'E = hc/λ = (6.626e−34)(3.00e8)/(500e−9) = 3.97 × 10⁻¹⁹ J.'
    },
    {
      q: 'Which set of quantum numbers is NOT allowed?',
      type: 'mcq',
      choices: ['n=3, ℓ=2, mℓ=−2, m_s=+½', 'n=2, ℓ=1, mℓ=0, m_s=−½', 'n=3, ℓ=3, mℓ=0, m_s=+½', 'n=4, ℓ=0, mℓ=0, m_s=−½'],
      correct: 2,
      difficulty: 'M',
      explanation: 'ℓ must range from 0 to n−1. For n=3, max ℓ = 2; ℓ=3 is illegal.'
    },
    {
      q: 'How many unpaired electrons are in a ground-state N atom?',
      type: 'mcq',
      choices: ['0', '1', '2', '3'],
      correct: 3,
      difficulty: 'E',
      explanation: 'N: 1s² 2s² 2p³. Three 2p electrons fill the 3 degenerate p orbitals singly (Hund) → 3 unpaired.'
    },
    {
      q: 'The ground-state electron configuration of Cr (Z=24) is:',
      type: 'mcq',
      choices: ['[Ar] 4s² 3d⁴', '[Ar] 4s¹ 3d⁵', '[Ar] 4s² 3d⁶', '[Ne] 3s² 3p⁶ 3d⁶'],
      correct: 1,
      difficulty: 'M',
      explanation: 'Chromium is an anomaly — half-filled d subshell is extra stable → [Ar] 4s¹ 3d⁵.'
    },
    {
      q: 'Which ion is DIAMAGNETIC?',
      type: 'mcq',
      choices: ['Fe²⁺', 'Cu²⁺', 'Zn²⁺', 'Mn²⁺'],
      correct: 2,
      difficulty: 'H',
      explanation: 'Zn²⁺ = [Ar] 3d¹⁰ — all paired. Fe²⁺ = 3d⁶ (4 unpaired), Cu²⁺ = 3d⁹ (1 unpaired), Mn²⁺ = 3d⁵ (5 unpaired).'
    },
    {
      q: 'For a hydrogen atom, what is the energy released when an electron falls from n=3 to n=1? (R_H = 2.18 × 10⁻¹⁸ J)',
      type: 'mcq',
      choices: ['1.94 × 10⁻¹⁸ J', '2.42 × 10⁻¹⁹ J', '5.45 × 10⁻¹⁹ J', '2.18 × 10⁻¹⁸ J'],
      correct: 0,
      difficulty: 'M',
      explanation: 'ΔE = R_H(1/n_i² − 1/n_f²) → but for emission, energy of photon = |R_H(1/1² − 1/3²)| = 2.18e−18 × (1 − 1/9) = 2.18e−18 × 8/9 = 1.94 × 10⁻¹⁸ J.'
    },
    {
      q: 'How many orbitals are in the n=3 shell?',
      type: 'mcq',
      choices: ['3', '6', '9', '18'],
      correct: 2,
      difficulty: 'M',
      explanation: 'n=3: ℓ = 0, 1, 2 → 1 (s) + 3 (p) + 5 (d) = 9 orbitals total. (Max electrons = 2 × 9 = 18.)'
    }
  ]
};
