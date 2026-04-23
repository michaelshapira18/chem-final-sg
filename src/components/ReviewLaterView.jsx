import React, { useEffect, useState } from 'react';
import { storage } from '../storage';

/**
 * Global "Review Later" tab. Surfaces every block and question that has
 * a saved comment. Groups by chapter. Lets user click through to the item
 * and export everything as Markdown.
 */
export default function ReviewLaterView({ chapters, exam, onNavigate }) {
  const [notes, setNotes] = useState([]);

  const load = async () => {
    const allKeys = await storage.keys();
    const commentKeys = allKeys.filter((k) => k.endsWith(':comment'));
    const entries = await Promise.all(commentKeys.map(async (k) => {
      const text = await storage.get(k);
      if (!text || !String(text).trim()) return null;
      const ts = await storage.get(k.replace(/:comment$/, ':comment_ts'));
      return { key: k.replace(/:comment$/, ''), text, ts };
    }));
    setNotes(entries.filter(Boolean));
  };

  useEffect(() => { load(); }, []);

  const parse = (key) => {
    // studyguide:ch{N}:block{M}
    // studyguide:ch{N}:q{X}
    // studyguide:exam:q{X}
    const chBlock = key.match(/^studyguide:ch(\d+):block(.+)$/);
    if (chBlock) {
      const chId = Number(chBlock[1]);
      const blockId = chBlock[2];
      const ch = chapters.find((c) => c.id === chId);
      const block = ch?.blocks.find((b) => b.id === blockId);
      return {
        group: ch?.title || `Chapter ${chId}`,
        label: `📘 Block: ${block?.title || blockId}`,
        link: `ch${chId}`,
        blockAnchor: blockId
      };
    }
    const chQ = key.match(/^studyguide:ch(\d+):q(\d+)$/);
    if (chQ) {
      const chId = Number(chQ[1]);
      const qIdx = Number(chQ[2]);
      const ch = chapters.find((c) => c.id === chId);
      const q = ch?.questions[qIdx];
      return {
        group: ch?.title || `Chapter ${chId}`,
        label: `❓ Q${qIdx + 1}: ${(q?.q || '').slice(0, 80)}${q && q.q.length > 80 ? '…' : ''}`,
        link: `ch${chId}`
      };
    }
    const ex = key.match(/^studyguide:exam:q(\d+)$/);
    if (ex) {
      const qIdx = Number(ex[1]);
      const q = exam[qIdx];
      return {
        group: 'Practice Exam',
        label: `🎯 Exam Q${qIdx + 1}: ${(q?.q || '').slice(0, 80)}${q && q.q.length > 80 ? '…' : ''}`,
        link: 'exam'
      };
    }
    return { group: 'Other', label: key, link: null };
  };

  const grouped = notes.reduce((acc, n) => {
    const parsed = parse(n.key);
    (acc[parsed.group] ||= []).push({ ...n, ...parsed });
    return acc;
  }, {});

  const exportMarkdown = () => {
    const lines = ['# Review Later Notes', ''];
    Object.entries(grouped).forEach(([group, items]) => {
      lines.push(`## ${group}`, '');
      items.forEach((n) => {
        lines.push(`### ${n.label}`);
        if (n.ts) lines.push(`*Saved: ${new Date(n.ts).toLocaleString()}*`, '');
        lines.push(n.text, '');
      });
    });
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `review-later-${new Date().toISOString().slice(0,10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl p-5 mb-6 shadow-lg flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">📝 Review Later</h1>
          <p className="text-amber-100 text-sm mt-1">Everything you flagged with a note. {notes.length} item{notes.length === 1 ? '' : 's'} saved.</p>
        </div>
        {notes.length > 0 && (
          <button
            onClick={exportMarkdown}
            className="px-4 py-2 bg-white text-orange-700 rounded font-semibold hover:bg-orange-50 text-sm"
          >
            Export as Markdown
          </button>
        )}
      </div>

      {notes.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
          No notes yet. Add a note on any block or question and it will appear here.
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{group}</h2>
              <span className="text-xs text-slate-500">{items.length} note{items.length === 1 ? '' : 's'}</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {items.map((n, i) => (
                <li key={i} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <button
                      onClick={() => {
                        if (n.link) onNavigate(n.link, n.blockAnchor);
                      }}
                      className="text-left text-sm font-semibold text-sky-700 hover:text-sky-900 hover:underline flex-1"
                    >
                      {n.label}
                    </button>
                    {n.ts && <span className="text-xs text-slate-400 shrink-0">{new Date(n.ts).toLocaleDateString()}</span>}
                  </div>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap bg-amber-50 border-l-2 border-amber-300 pl-3 py-2 rounded-r">
                    {n.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
