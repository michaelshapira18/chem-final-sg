import React, { useEffect, useState } from 'react';
import { storage } from '../storage';
import CommentBox from './CommentBox.jsx';
import { DifficultyChip } from './Visual.jsx';

/**
 * QuestionItem supports multiple question types:
 * - mcq: standard 4-option multiple choice
 * - short: free-text short answer with reveal-key
 * - math: numeric/formula input with tolerance (if q.tolerance given)
 * - diagram: image-based MCQ (question body can include <img>)
 * - fillblank: single-blank free text
 * - tf: true/false with justification textarea
 *
 * Every question gets a comment box for "review later" notes.
 */
export default function QuestionItem({ storageKey, q, index, onAnswered }) {
  const type = q.type || 'mcq';
  const [selected, setSelected] = useState(null);      // MCQ-style
  const [freeText, setFreeText] = useState('');        // short / math / fillblank / tf justification
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(null);

  useEffect(() => {
    (async () => {
      const saved = await storage.get(storageKey);
      if (saved && typeof saved === 'object') {
        setSelected(saved.selected ?? null);
        setFreeText(saved.freeText ?? '');
        setSubmitted(!!saved.submitted);
        setCorrect(saved.correct ?? null);
      }
    })();
  }, [storageKey]);

  const gradeShort = (answer, key) => {
    if (Array.isArray(key)) return key.some((k) => gradeShort(answer, k));
    const a = String(answer || '').trim().toLowerCase();
    const k = String(key || '').trim().toLowerCase();
    return a && (a === k || a.includes(k) || k.includes(a));
  };

  const gradeMath = (answer, key, tolerance = 0.01) => {
    const a = parseFloat(String(answer).replace(/[^0-9eE+\-.]/g, ''));
    const k = parseFloat(key);
    if (Number.isNaN(a) || Number.isNaN(k)) return false;
    return Math.abs(a - k) <= Math.abs(k * tolerance);
  };

  const submit = async () => {
    let isCorrect = false;
    if (type === 'mcq' || type === 'diagram') {
      if (selected == null) return;
      isCorrect = selected === q.correct;
    } else if (type === 'tf') {
      if (selected == null) return;
      isCorrect = selected === q.correct;  // expected to be 0 (true) or 1 (false)
    } else if (type === 'short' || type === 'fillblank') {
      if (!freeText.trim()) return;
      isCorrect = gradeShort(freeText, q.correct);
    } else if (type === 'math') {
      if (!freeText.trim()) return;
      isCorrect = gradeMath(freeText, q.correct, q.tolerance);
    }
    setSubmitted(true);
    setCorrect(isCorrect);
    await storage.set(storageKey, { selected, freeText, submitted: true, correct: isCorrect });
    onAnswered?.(isCorrect);
  };

  const reset = async () => {
    setSelected(null);
    setFreeText('');
    setSubmitted(false);
    setCorrect(null);
    await storage.remove(storageKey);
    onAnswered?.(null, true);
  };

  const showMCQ = type === 'mcq' || type === 'diagram' || type === 'tf';
  const showText = type === 'short' || type === 'math' || type === 'fillblank';
  const choices = type === 'tf' ? ['True', 'False'] : q.choices;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="font-semibold text-slate-800 flex-1">
          <span className="text-slate-500 mr-2">Q{index + 1}.</span>{q.q}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {q.difficulty && <DifficultyChip level={q.difficulty} />}
          {submitted && (
            <span className={`text-xs px-2 py-1 rounded font-semibold whitespace-nowrap ${correct ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {correct ? 'Correct ✓' : 'Incorrect ✗'}
            </span>
          )}
        </div>
      </div>
      {q.visual && <div className="my-3">{q.visual}</div>}

      {showMCQ && (
        <div className="space-y-2">
          {choices.map((choice, i) => {
            const isSelected = selected === i;
            const isCorrectAnswer = submitted && i === q.correct;
            const isWrongSelected = submitted && isSelected && i !== q.correct;
            return (
              <label
                key={i}
                className={`flex items-start gap-3 p-2.5 rounded border cursor-pointer transition ${
                  isCorrectAnswer ? 'border-emerald-400 bg-emerald-50' :
                  isWrongSelected ? 'border-red-400 bg-red-50' :
                  isSelected ? 'border-sky-400 bg-sky-50' :
                  'border-slate-200 hover:bg-slate-50'
                } ${submitted ? 'cursor-default' : ''}`}
              >
                <input
                  type="radio"
                  name={storageKey}
                  disabled={submitted}
                  checked={isSelected}
                  onChange={() => setSelected(i)}
                  className="mt-1 accent-sky-600"
                />
                <div className="text-sm text-slate-800 flex-1">
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                  {choice}
                </div>
              </label>
            );
          })}
          {type === 'tf' && q.justificationRequired && (
            <div className="mt-2">
              <label className="text-xs text-slate-500 mb-1 block">Justify your answer:</label>
              <textarea
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                disabled={submitted}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}
        </div>
      )}

      {showText && (
        <div>
          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            disabled={submitted}
            placeholder={type === 'math' ? 'Numeric answer (e.g., 42 or 3.14)' : 'Your answer...'}
            rows={type === 'math' || type === 'fillblank' ? 1 : 3}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {submitted && (
            <div className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">Accepted answer:</span> {Array.isArray(q.correct) ? q.correct.join(' / ') : q.correct}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={submit}
            disabled={showMCQ ? selected == null : !freeText.trim()}
            className="px-4 py-2 text-sm font-semibold bg-sky-600 text-white rounded hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
          >
            Try Again
          </button>
        )}
      </div>

      {submitted && (
        <div className={`mt-3 p-3 rounded-md text-sm leading-relaxed ${correct ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'}`}>
          <div className="font-semibold mb-1">Explanation</div>
          <div>{q.explanation}</div>
        </div>
      )}

      <CommentBox storageKey={storageKey} label="Note" />
    </div>
  );
}
