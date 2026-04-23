import React, { useEffect, useState } from 'react';
import { storage } from '../storage';

function timeAgo(iso) {
  if (!iso) return '';
  const delta = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(delta / 1000);
  if (sec < 10) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

export default function CommentBox({ storageKey, label = 'Note', onChange }) {
  const commentKey = `${storageKey}:comment`;
  const tsKey = `${storageKey}:comment_ts`;
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [savedTs, setSavedTs] = useState(null);
  const [open, setOpen] = useState(false);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    (async () => {
      const t = await storage.get(commentKey);
      const ts = await storage.get(tsKey);
      if (t) { setText(t); setSavedText(t); setOpen(true); }
      if (ts) setSavedTs(ts);
    })();
  }, [commentKey, tsKey]);

  // Auto-update "time ago" every 30s
  useEffect(() => {
    if (!savedTs) return;
    const id = setInterval(() => forceRerender((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, [savedTs]);

  const save = async () => {
    if (!text.trim()) return;
    const ts = new Date().toISOString();
    await storage.set(commentKey, text);
    await storage.set(tsKey, ts);
    setSavedText(text);
    setSavedTs(ts);
    onChange?.();
  };

  const clear = async () => {
    await storage.remove(commentKey);
    await storage.remove(tsKey);
    setText('');
    setSavedText('');
    setSavedTs(null);
    onChange?.();
  };

  const hasNote = !!savedText;
  const dirty = text !== savedText;

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2"
        aria-expanded={open}
      >
        <span>📝</span>
        <span>{hasNote ? `${label} saved` : `Add ${label.toLowerCase()}`}</span>
        {hasNote && <span className="text-xs text-emerald-600">✓</span>}
        <span className="text-xs text-slate-400">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="mt-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to come back to? Questions, unclear parts, things to ask the professor..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-y"
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={save}
              disabled={!text.trim() || !dirty}
              className="px-3 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {hasNote && dirty ? 'Update' : 'Save'}
            </button>
            {hasNote && (
              <button
                onClick={clear}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
              >
                Clear
              </button>
            )}
            {savedTs && !dirty && (
              <span className="text-xs text-slate-500 ml-auto">saved {timeAgo(savedTs)}</span>
            )}
            {dirty && (
              <span className="text-xs text-amber-600 ml-auto">unsaved changes</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
