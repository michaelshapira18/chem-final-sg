import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function Math({ tex, display = false, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, { displayMode: display, throwOnError: false });
    } catch (e) {
      return tex;
    }
  }, [tex, display]);
  const Tag = display ? 'div' : 'span';
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MathBlock({ tex, className = '' }) {
  return <Math tex={tex} display={true} className={`my-2 ${className}`} />;
}
