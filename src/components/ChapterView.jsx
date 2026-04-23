import React, { useEffect, useState } from 'react';
import StudyBlock, { confidenceColors } from './StudyBlock.jsx';
import QuestionItem from './QuestionItem.jsx';
import KeyReview from './KeyReview.jsx';
import { storage } from '../storage';

const SUBTABS = [
  { id: 'study', label: 'Study Guide' },
  { id: 'review', label: 'Key Review' },
  { id: 'practice', label: 'Practice Questions' }
];

export default function ChapterView({ chapter }) {
  const [subtab, setSubtab] = useState('study');
  const [reviewedState, setReviewedState] = useState({});
  const [confState, setConfState] = useState({});
  const [qState, setQState] = useState({});
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const r = {}, c = {}, q = {};
      await Promise.all(chapter.blocks.map(async (b) => {
        r[b.id] = await storage.get(`studyguide:ch${chapter.id}:block${b.id}:reviewed`);
        c[b.id] = await storage.get(`studyguide:ch${chapter.id}:block${b.id}:confidence`);
      }));
      await Promise.all(chapter.questions.map(async (_, i) => {
        q[i] = await storage.get(`studyguide:ch${chapter.id}:q${i}`);
      }));
      if (!cancel) { setReviewedState(r); setConfState(c); setQState(q); }
    })();
    return () => { cancel = true; };
  }, [chapter.id, tick]);

  const reviewedCount = chapter.blocks.filter((b) => reviewedState[b.id]).length;
  const totalBlocks = chapter.blocks.length;
  const pct = totalBlocks ? Math.round((reviewedCount / totalBlocks) * 100) : 0;

  const correctCount = Object.values(qState).filter((s) => s && s.correct).length;
  const answeredCount = Object.values(qState).filter((s) => s && s.submitted).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-3xl font-bold text-slate-900">{chapter.title}</h1>
          <div className="text-sm text-slate-500">Chapter {chapter.id}</div>
        </div>
        {chapter.subtitle && <p className="text-slate-600 mt-1">{chapter.subtitle}</p>}
      </header>

      <div className="flex gap-1 border-b border-slate-200 mb-6">
        {SUBTABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubtab(t.id)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition ${
              subtab === t.id
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subtab === 'study' && (
        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-slate-900">Progress & Table of Contents</h2>
              <div className="text-sm font-semibold text-slate-700">{reviewedCount}/{totalBlocks} reviewed · {pct}%</div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <ul className="space-y-1.5">
              {chapter.blocks.map((b) => {
                const isReviewed = !!reviewedState[b.id];
                const conf = Number(confState[b.id] || 0);
                return (
                  <li key={b.id}>
                    <a href={`#block-${b.id}`} className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-slate-50">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${isReviewed ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {isReviewed ? '✓' : '○'}
                      </span>
                      <span className={`inline-block w-3 h-3 rounded-full ${conf ? confidenceColors[conf].split(' ')[0] : 'bg-slate-200'}`} />
                      <span className="text-sm text-slate-700 flex-1">{b.title}</span>
                      {conf > 0 && <span className="text-[11px] text-slate-500">{conf}/5</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {chapter.blocks.map((b) => (
            <StudyBlock key={b.id} chapterId={chapter.id} block={b} onStateChange={() => setTick((t) => t + 1)} />
          ))}
        </div>
      )}

      {subtab === 'review' && <KeyReview keyReview={chapter.keyReview} />}

      {subtab === 'practice' && (
        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 flex flex-wrap gap-4 items-center justify-between shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Practice Questions</h2>
              <p className="text-sm text-slate-600">{chapter.questions.length} questions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{correctCount}</div>
                <div className="text-xs text-slate-500">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{answeredCount}/{chapter.questions.length}</div>
                <div className="text-xs text-slate-500">Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600">{answeredCount ? Math.round((correctCount/answeredCount)*100) : 0}%</div>
                <div className="text-xs text-slate-500">Score</div>
              </div>
            </div>
          </div>
          {chapter.questions.map((q, i) => (
            <QuestionItem
              key={i}
              storageKey={`studyguide:ch${chapter.id}:q${i}`}
              q={q}
              index={i}
              onAnswered={() => setTick((t) => t + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
