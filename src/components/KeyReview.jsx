import React from 'react';
import { Card, Pill } from './Visual.jsx';

export default function KeyReview({ keyReview }) {
  if (!keyReview) return null;
  const { vocab = [], laws = [], methods = [], diagrams = [] } = keyReview;
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-600 to-sky-600 text-white rounded-xl p-5">
        <h2 className="text-2xl font-bold">Key Review — Fast Recall</h2>
        <p className="text-violet-100 text-sm mt-1">Vocab, laws, methods & diagrams for quick recap before the exam.</p>
      </div>

      {vocab.length > 0 && (
        <Card title="Key Vocabulary">
          <div className="grid gap-3 md:grid-cols-2">
            {vocab.map((v, i) => (
              <div key={i} className="border border-slate-200 rounded p-3 bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900">{v.term}</span>
                  {v.tag && <Pill color={v.tagColor || 'blue'}>{v.tag}</Pill>}
                </div>
                <div className="text-sm text-slate-700">{v.def}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {laws.length > 0 && (
        <Card title="Laws, Rules & Principles">
          <ul className="space-y-3">
            {laws.map((l, i) => (
              <li key={i} className="border-l-4 border-violet-400 pl-3 py-1">
                <div className="font-semibold text-slate-900">{l.name}</div>
                <div className="text-sm text-slate-700">{l.desc}</div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {methods.length > 0 && (
        <Card title="Methods, Mnemonics & Procedures">
          <div className="grid gap-3 md:grid-cols-2">
            {methods.map((m, i) => (
              <div key={i} className="border border-slate-200 rounded p-3">
                <div className="font-bold text-slate-900 mb-1">{m.name}</div>
                {m.expand && <div className="text-xs text-slate-500 mb-2">{m.expand}</div>}
                <div className="text-sm text-slate-700">{m.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {diagrams.length > 0 && (
        <Card title="Helpful Diagrams & Charts">
          <div className="grid gap-4 md:grid-cols-2">
            {diagrams.map((d, i) => (
              <div key={i} className="border border-slate-200 rounded p-3 bg-white">
                <div className="font-semibold text-slate-800 mb-2">{d.title}</div>
                <div className="flex justify-center">{d.visual}</div>
                {d.caption && <div className="text-xs text-slate-600 mt-2 italic">{d.caption}</div>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
