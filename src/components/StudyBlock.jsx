import React, { useEffect, useState } from 'react';
import { storage } from '../storage';
import { AnchorImage } from './Visual.jsx';
import CommentBox from './CommentBox.jsx';

export const confidenceColors = {
  0: 'bg-slate-200 text-slate-500',
  1: 'bg-red-500 text-white',
  2: 'bg-orange-500 text-white',
  3: 'bg-yellow-400 text-slate-900',
  4: 'bg-lime-500 text-white',
  5: 'bg-green-600 text-white'
};

export default function StudyBlock({ chapterId, block, onStateChange }) {
  const prefix = `studyguide:ch${chapterId}:block${block.id}`;
  const reviewedKey = `${prefix}:reviewed`;
  const confKey = `${prefix}:confidence`;

  const [reviewed, setReviewed] = useState(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    (async () => {
      const r = await storage.get(reviewedKey);
      const c = await storage.get(confKey);
      if (r) setReviewed(!!r);
      if (c != null) setConfidence(Number(c) || 0);
    })();
  }, [reviewedKey, confKey]);

  const toggleReviewed = async () => {
    const nv = !reviewed;
    setReviewed(nv);
    await storage.set(reviewedKey, nv);
    onStateChange?.();
  };

  const setConf = async (n) => {
    setConfidence(n);
    await storage.set(confKey, n);
    onStateChange?.();
  };

  return (
    <section id={`block-${block.id}`} className="scroll-mt-24 bg-white border border-slate-200 rounded-xl shadow-sm mb-6">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{block.title}</h3>
          {block.subtitle && <p className="text-sm text-slate-500 mt-0.5">{block.subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded ${confidenceColors[confidence]}`}>
            {confidence ? `Confidence ${confidence}/5` : 'Not rated'}
          </span>
          {reviewed && <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-semibold">Reviewed ✓</span>}
        </div>
      </header>

      <div className="px-5 py-5 space-y-4 text-slate-800 leading-relaxed">
        {/* Anchor images — ALWAYS first visual */}
        {block.images && block.images.length > 0 && (
          <div className={block.images.length > 1 ? 'grid md:grid-cols-2 gap-3' : ''}>
            {block.images.map((img, i) => (
              <AnchorImage key={i} src={img.src} alt={img.alt} caption={img.caption} />
            ))}
          </div>
        )}
        {/* Block content (explanation + supporting visuals) */}
        {block.content}
      </div>

      <footer className="px-5 py-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={reviewed} onChange={toggleReviewed} className="w-5 h-5 accent-emerald-600" />
            <span className="text-sm font-medium text-slate-700">I've reviewed this</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 mr-1">Confidence:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setConf(n)}
                className={`w-8 h-8 rounded-full text-sm font-bold transition ${
                  confidence >= n ? confidenceColors[n] : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                }`}
                title={`Rate ${n}/5`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <CommentBox storageKey={prefix} label="Note" onChange={onStateChange} />
      </footer>
    </section>
  );
}
