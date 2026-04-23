import React, { useEffect, useState } from 'react';
import ChapterView from './components/ChapterView.jsx';
import ExamView from './components/ExamView.jsx';
import ReviewLaterView from './components/ReviewLaterView.jsx';
import PeriodicTrendsView from './components/PeriodicTrendsView.jsx';
import PeriodicTablePopover from './components/PeriodicTableMini.jsx';
import { chapters } from './data/chapters.js';
import { exam, examConfig } from './data/exam.js';
import { storage, resetAll } from './storage';

export default function App() {
  const [active, setActive] = useState(() => localStorage.getItem('studyguide:activeTab') || 'ch1');
  const [progress, setProgress] = useState({});
  const [noteCount, setNoteCount] = useState(0);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => { localStorage.setItem('studyguide:activeTab', active); }, [active]);

  const refreshProgress = async () => {
    const p = {};
    await Promise.all(chapters.map(async (ch) => {
      const reviewed = await Promise.all(ch.blocks.map((b) =>
        storage.get(`studyguide:ch${ch.id}:block${b.id}:reviewed`)
      ));
      p[`ch${ch.id}`] = { reviewed: reviewed.filter(Boolean).length, total: ch.blocks.length };
    }));
    const examAns = await Promise.all(exam.map((_, i) => storage.get(`studyguide:exam:q${i}`)));
    p['exam'] = { reviewed: examAns.filter((s) => s && s.submitted).length, total: exam.length };
    setProgress(p);

    const allKeys = await storage.keys();
    const commentKeys = allKeys.filter((k) => k.endsWith(':comment'));
    const count = (await Promise.all(commentKeys.map((k) => storage.get(k))))
      .filter((v) => v && String(v).trim()).length;
    setNoteCount(count);
  };

  useEffect(() => {
    refreshProgress();
    const interval = setInterval(refreshProgress, 1500);
    return () => clearInterval(interval);
  }, []);

  const currentChapter = chapters.find((c) => `ch${c.id}` === active);

  const navigate = (target, anchor) => {
    setActive(target);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(`block-${anchor}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-slate-200 min-h-screen sticky top-0 max-h-screen overflow-y-auto scrollbar-thin">
        <div className="p-5 border-b border-slate-800">
          <div className="text-xs uppercase tracking-wider text-sky-400 font-bold">CHM 1045</div>
          <div className="text-xl font-bold text-white mt-1">Final Exam Prep</div>
          <div className="text-xs text-slate-400 mt-1">General Chemistry I · Ch 1–12</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {chapters.map((ch) => {
            const p = progress[`ch${ch.id}`] || { reviewed: 0, total: ch.blocks.length };
            const isActive = active === `ch${ch.id}`;
            return (
              <button
                key={ch.id}
                onClick={() => setActive(`ch${ch.id}`)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-start gap-3 ${
                  isActive ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className={`text-xs font-bold mt-0.5 ${isActive ? 'text-sky-100' : 'text-slate-500'}`}>{ch.shortId || ch.id}</span>
                <span className="flex-1">
                  <div className="font-semibold leading-tight">{ch.title}</div>
                  <div className={`text-[10px] mt-0.5 ${isActive ? 'text-sky-100' : 'text-slate-500'}`}>
                    {p.reviewed}/{p.total} reviewed
                  </div>
                </span>
              </button>
            );
          })}
          <div className="my-2 border-t border-slate-800" />
          <button
            onClick={() => setActive('trends')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-start gap-3 ${
              active === 'trends' ? 'bg-teal-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">🧪</span>
            <span className="flex-1">
              <div className="font-semibold">Periodic Trends</div>
              <div className={`text-[10px] mt-0.5 ${active === 'trends' ? 'text-teal-100' : 'text-slate-500'}`}>
                Interactive heatmap + Zeff
              </div>
            </span>
          </button>
          <button
            onClick={() => setActive('exam')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-start gap-3 ${
              active === 'exam' ? 'bg-emerald-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">🎯</span>
            <span className="flex-1">
              <div className="font-semibold">Practice Exam</div>
              <div className={`text-[10px] mt-0.5 ${active === 'exam' ? 'text-emerald-100' : 'text-slate-500'}`}>
                {progress.exam?.reviewed || 0}/{exam.length} answered
              </div>
            </span>
          </button>
          <button
            onClick={() => setActive('review')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition flex items-start gap-3 ${
              active === 'review' ? 'bg-amber-500 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">📝</span>
            <span className="flex-1">
              <div className="font-semibold">Review Later</div>
              <div className={`text-[10px] mt-0.5 ${active === 'review' ? 'text-amber-100' : 'text-slate-500'}`}>
                {noteCount} note{noteCount === 1 ? '' : 's'}
              </div>
            </span>
          </button>
        </nav>
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => setShowReset(true)}
            className="w-full px-3 py-2 text-xs font-semibold bg-red-900/40 text-red-300 rounded hover:bg-red-900/70"
          >
            Reset All Progress
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 inset-x-0 z-20 bg-slate-900 text-white overflow-x-auto scrollbar-thin flex gap-1 px-2 py-2 border-b border-slate-800">
        {chapters.map((ch) => {
          const p = progress[`ch${ch.id}`] || { reviewed: 0, total: ch.blocks.length };
          const isActive = active === `ch${ch.id}`;
          return (
            <button
              key={ch.id}
              onClick={() => setActive(`ch${ch.id}`)}
              className={`whitespace-nowrap px-3 py-1.5 rounded text-xs font-semibold ${isActive ? 'bg-sky-600' : 'bg-slate-800'}`}
            >
              Ch{ch.shortId || ch.id} · {p.reviewed}/{p.total}
            </button>
          );
        })}
        <button
          onClick={() => setActive('trends')}
          className={`whitespace-nowrap px-3 py-1.5 rounded text-xs font-semibold ${active === 'trends' ? 'bg-teal-600' : 'bg-slate-800'}`}
        >
          🧪 Trends
        </button>
        <button
          onClick={() => setActive('exam')}
          className={`whitespace-nowrap px-3 py-1.5 rounded text-xs font-semibold ${active === 'exam' ? 'bg-emerald-600' : 'bg-slate-800'}`}
        >
          Exam
        </button>
        <button
          onClick={() => setActive('review')}
          className={`whitespace-nowrap px-3 py-1.5 rounded text-xs font-semibold ${active === 'review' ? 'bg-amber-500' : 'bg-slate-800'}`}
        >
          📝 {noteCount}
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0 md:pt-0 pt-14">
        {active === 'exam' ? (
          <ExamView exam={exam} chapters={chapters} config={examConfig} />
        ) : active === 'review' ? (
          <ReviewLaterView chapters={chapters} exam={exam} onNavigate={navigate} />
        ) : active === 'trends' ? (
          <PeriodicTrendsView />
        ) : currentChapter ? (
          <ChapterView chapter={currentChapter} />
        ) : (
          <div className="p-10 text-slate-500">Select a chapter.</div>
        )}
        <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-xs text-slate-400">
          CHM 1045 Final Exam Study Dashboard · progress persists via window.storage
        </footer>
      </main>

      <PeriodicTablePopover />

      {showReset && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Reset all progress?</h3>
            <p className="text-sm text-slate-600 mb-5">
              This clears every review checkbox, confidence rating, comment, practice answer, and exam answer.
              This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReset(false)}
                className="px-4 py-2 text-sm font-semibold bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={async () => { await resetAll(); setShowReset(false); window.location.reload(); }}
                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
