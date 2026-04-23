// window.storage wrapper with localStorage fallback.
// Exposes async get/set/remove/keys; also provides loadAll(prefix) helper.

const hasWindowStorage = typeof window !== 'undefined' && window.storage;

const backend = hasWindowStorage
  ? {
      get: async (k) => { try { return await window.storage.get(k); } catch { return null; } },
      set: async (k, v) => { try { return await window.storage.set(k, v); } catch { return null; } },
      remove: async (k) => { try { return await window.storage.remove(k); } catch { return null; } },
      keys: async () => { try { return (await window.storage.keys?.()) ?? []; } catch { return []; } }
    }
  : {
      get: async (k) => {
        try { const v = localStorage.getItem(k); return v == null ? null : JSON.parse(v); }
        catch { return null; }
      },
      set: async (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
      remove: async (k) => { try { localStorage.removeItem(k); } catch {} },
      keys: async () => { try { return Object.keys(localStorage); } catch { return []; } }
    };

export const storage = backend;

export async function loadAll(prefix) {
  const all = await storage.keys();
  const out = {};
  await Promise.all(
    all.filter((k) => k.startsWith(prefix)).map(async (k) => { out[k] = await storage.get(k); })
  );
  return out;
}

export async function resetAll() {
  const all = await storage.keys();
  await Promise.all(all.filter((k) => k.startsWith('studyguide:')).map((k) => storage.remove(k)));
}
