import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useClient } from 'sanity';
import Papa from 'papaparse';
import { Card, Text, Stack, Button, Flex, Box, Badge, Code, Spinner } from '@sanity/ui';

/* ───────────────────────────────────────────────────────────────
 *  Inline styles – keeps the tool self‑contained, no CSS file.
 * ─────────────────────────────────────────────────────────────── */
const S: any = {
  page: { maxWidth: 1200, margin: '0 auto', padding: 24 },
  toolbar: {
    display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
    padding: '12px 16px', background: '#1a1a2e', borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1, minWidth: 180, padding: '8px 12px', border: '1px solid #444',
    borderRadius: 6, background: '#111', color: '#eee', fontSize: 14,
  },
  selectInput: {
    padding: '8px 12px', border: '1px solid #444', borderRadius: 6,
    background: '#111', color: '#eee', fontSize: 14,
  },
  bulkBar: {
    display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
    padding: '10px 16px', background: '#1e3a5f', borderRadius: 8, marginBottom: 16,
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 14 },
  th: {
    padding: '10px 12px', textAlign: 'left' as const, borderBottom: '2px solid #333',
    color: '#aaa', fontWeight: 600, fontSize: 12, textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  td: { padding: '10px 12px', borderBottom: '1px solid #222', verticalAlign: 'middle' as const },
  thumb: { width: 36, height: 36, objectFit: 'cover' as const, borderRadius: 4 },
  thumbPlaceholder: {
    width: 36, height: 36, borderRadius: 4, background: '#333',
    display: 'inline-block',
  },
  badge: (color: string) => ({
    display: 'inline-block', padding: '2px 8px', borderRadius: 20,
    fontSize: 11, fontWeight: 600, color: '#fff', background: color,
  }),
  section: {
    marginTop: 32, padding: 20, border: '1px solid #333', borderRadius: 8,
    background: '#111',
  },
  btn: (bg: string) => ({
    padding: '7px 14px', border: 'none', borderRadius: 6,
    background: bg, color: '#fff', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap' as const,
  }),
  modal: {
    position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
  },
  modalContent: {
    background: '#1a1a2e', borderRadius: 12, padding: 24,
    maxWidth: 900, width: '90%', maxHeight: '80vh', overflowY: 'auto' as const,
    boxShadow: '0 20px 60px rgba(0,0,0,.5)',
  },
  priceModal: {
    background: '#1a1a2e', borderRadius: 12, padding: 24,
    maxWidth: 400, width: '90%',
    boxShadow: '0 20px 60px rgba(0,0,0,.5)',
  },
};

/* ───────────────────────────────────────────────────────────────
 *  Component
 * ─────────────────────────────────────────────────────────────── */
export function BulkImportTool() {
  const client = useClient({ apiVersion: '2024-01-01' });

  // ── State ──
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Import
  const [importFile, setImportFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [importResult, setImportResult] = useState<{ s: number; f: number; errors: string[] } | null>(null);

  // Price adjuster
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceMode, setPriceMode] = useState<'percent' | 'flat'>('percent');
  const [priceAmount, setPriceAmount] = useState('');

  // ── Fetch Products ──
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await client.fetch(
        `*[_type == "product"] | order(sortOrder asc, _createdAt desc) {
          _id, name, slug, category, subcategory, price, priceLabel,
          inStock, featured, availability, description,
          "imageUrl": image.asset->url
        }`,
      );
      setProducts(data ?? []);
    } catch (e) {
      console.error('Fetch failed', e);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Helpers ──
  const slug = (t: string) =>
    t.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      .replace(/-{2,}/g, '-').replace(/^-|-$/g, '');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name?.toLowerCase().includes(search.toLowerCase())) return false;
      if (catFilter && p.category !== catFilter) return false;
      return true;
    });
  }, [products, search, catFilter]);

  const toggle = (id: string) => setSelected((s) => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const allSelected = filtered.length > 0 && filtered.every((p) => selected.has(p._id));
  const toggleAll = () => {
    setSelected(allSelected ? new Set() : new Set(filtered.map((p) => p._id)));
  };

  // ── Bulk Actions ──
  const runBulk = async (fn: () => Promise<void>) => {
    setActionLoading(true);
    try { await fn(); } catch (e) { console.error(e); }
    setActionLoading(false);
  };

  const bulkDelete = () => runBulk(async () => {
    if (!confirm(`Delete ${selected.size} product(s)? This cannot be undone.`)) return;
    await Promise.all(Array.from(selected).map((id) => client.delete(id)));
    setProducts((p) => p.filter((x) => !selected.has(x._id)));
    setSelected(new Set());
  });

  const bulkPatch = (patch: Record<string, any>) => runBulk(async () => {
    await Promise.all(Array.from(selected).map((id) => client.patch(id).set(patch).commit()));
    setProducts((prev) => prev.map((p) => selected.has(p._id) ? { ...p, ...patch } : p));
  });

  const bulkPriceAdjust = () => runBulk(async () => {
    const amt = Number(priceAmount);
    if (isNaN(amt) || amt === 0) return;
    const updates = Array.from(selected).map((id) => {
      const p = products.find((x) => x._id === id);
      if (!p) return null;
      const cur = Number(p.price) || 0;
      const nv = priceMode === 'percent' ? cur * (1 + amt / 100) : cur + amt;
      const rounded = Math.round(Math.max(0, nv));
      return client.patch(id).set({ price: rounded }).commit().then(() => ({ id, price: rounded }));
    }).filter(Boolean);
    const results = await Promise.all(updates as Promise<{ id: string; price: number }>[]);
    const map = Object.fromEntries(results.map((r) => [r.id, r.price]));
    setProducts((prev) => prev.map((p) => map[p._id] != null ? { ...p, price: map[p._id] } : p));
    setShowPriceModal(false);
    setPriceAmount('');
  });

  // ── CSV Export ──
  const exportCSV = () => {
    const rows = filtered.map((p) => ({
      name: p.name,
      slug: p.slug?.current ?? slug(p.name),
      category: p.category,
      subcategory: p.subcategory,
      price: p.price,
      priceLabel: p.priceLabel ?? '',
      description: p.description ?? '',
      inStock: p.inStock ?? true,
      availability: p.availability ?? 'In Store',
      featured: p.featured ?? false,
      imageUrl: p.imageUrl ?? '',
    }));
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wetpets-catalog.csv';
    a.click();
  };

  // ── CSV Template Download ──
  const downloadTemplate = () => {
    const header = 'name,slug,category,subcategory,price,priceLabel,description,inStock,availability,featured,imageUrl';
    const example = 'Neon Tetra,neon-tetra,livestock,freshwater-fish,80,each,Bright schooling fish,true,In Store,true,https://example.com/neon-tetra.jpg';
    const csv = header + '\n' + example;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wetpets-import-template.csv';
    a.click();
  };

  // ── CSV Import ──
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImportFile(e.target.files[0]);
  };

  const parseCSV = () => {
    if (!importFile) return;
    Papa.parse(importFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const rows = (result.data as any[]).map((row, i) => {
          const s = row.slug?.trim() || slug(row.name || row.Name || `product-${i}`);
          const existing = products.find((p) => p.slug?.current === s || p.name === (row.name || row.Name));
          return { ...row, _slug: s, _action: existing ? '🔄 Update' : '🆕 Create' };
        });
        setPreview(rows);
        setShowPreview(true);
        setImportResult(null);
      },
      error: (err: any) => alert(`CSV parse error: ${err.message}`),
    });
  };

  const commitImport = async () => {
    if (!preview) return;
    setActionLoading(true);
    let s = 0, f = 0;
    const errors: string[] = [];
    for (let i = 0; i < preview.length; i++) {
      const row = preview[i];
      const doc: any = {
        _type: 'product',
        name: row.name || row.Name || 'Unnamed',
        slug: { _type: 'slug', current: row._slug },
        category: row.category || row.Category || 'livestock',
        subcategory: row.subcategory || row.Subcategory || 'freshwater-fish',
        price: Number(row.price || row.Price || 0),
        priceLabel: row.priceLabel || row.PriceLabel || '',
        description: row.description || row.Description || '',
        inStock: String(row.inStock ?? row.InStock ?? 'true').toLowerCase() !== 'false',
        availability: row.availability || row.Availability || 'In Store',
        featured: String(row.featured ?? row.Featured ?? 'false').toLowerCase() === 'true',
      };
      try {
        let finalDoc = { ...doc };
        const imageUrl = row.imageUrl || row.ImageUrl || row.image || row.Image;
        if (imageUrl) {
          try {
            const res = await fetch(imageUrl);
            const blob = await res.blob();
            const asset = await client.assets.upload('image', blob);
            finalDoc.image = {
              _type: 'image',
              asset: { _type: 'reference', _ref: asset._id }
            };
          } catch (imgErr) {
            console.warn(`Could not upload image for ${doc.name}:`, imgErr);
          }
        }

        if (row._action.includes('Update')) {
          const ex = products.find((p) => p.slug?.current === row._slug || p.name === doc.name);
          if (ex) await client.patch(ex._id).set(finalDoc).commit();
          else await client.create(finalDoc);
        } else {
          await client.create(finalDoc);
        }
        s++;
      } catch (err: any) {
        f++;
        errors.push(`Row ${i + 1} (${doc.name}): ${err.message}`);
      }
    }
    setImportResult({ s, f, errors });
    setActionLoading(false);
    await fetchProducts();
    setShowPreview(false);
    setPreview(null);
    setImportFile(null);
  };

  // ── Category labels ──
  const catLabel: Record<string, string> = {
    'special-offers': 'Special Offers', livestock: 'Livestock',
    tanks: 'Tanks', equipment: 'Equipment', maintenance: 'Maintenance',
  };

  /* ─── RENDER ────────────────────────────────────────────────── */
  return (
    <div style={S.page}>
      {/* ──── Header ──── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28, color: '#eee' }}>📦 Bulk Catalog Manager</h1>
        <p style={{ margin: '6px 0 0', color: '#888', fontSize: 14 }}>
          View, search, bulk-edit, export, and import products via CSV / Excel
        </p>
      </div>

      {/* ──── Toolbar ──── */}
      <div style={S.toolbar}>
        <input
          style={S.searchInput}
          placeholder="🔍 Search products by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={S.selectInput} value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="">All Categories</option>
          {Object.entries(catLabel).map(([v, t]) => <option key={v} value={v}>{t}</option>)}
        </select>
        <button style={S.btn('#2563eb')} onClick={exportCSV}>⬇ Export CSV</button>
        <button style={S.btn('#059669')} onClick={downloadTemplate}>📄 Download Template</button>
        <button style={S.btn('#7c3aed')} onClick={fetchProducts} disabled={loading}>🔄 Refresh</button>
      </div>

      {/* ──── Bulk Actions Bar ──── */}
      {selected.size > 0 && (
        <div style={S.bulkBar}>
          <span style={{ color: '#93c5fd', fontWeight: 700, fontSize: 14 }}>{selected.size} selected</span>
          <button style={S.btn('#dc2626')} onClick={bulkDelete} disabled={actionLoading}>🗑 Delete</button>
          <button style={S.btn('#16a34a')} onClick={() => bulkPatch({ inStock: true })} disabled={actionLoading}>✅ In Stock</button>
          <button style={S.btn('#ca8a04')} onClick={() => bulkPatch({ inStock: false })} disabled={actionLoading}>❌ Out of Stock</button>
          <button style={S.btn('#0ea5e9')} onClick={() => bulkPatch({ featured: true })} disabled={actionLoading}>⭐ Feature</button>
          <button style={S.btn('#64748b')} onClick={() => bulkPatch({ featured: false })} disabled={actionLoading}>☆ Un-Feature</button>
          <button style={S.btn('#a855f7')} onClick={() => setShowPriceModal(true)} disabled={actionLoading}>💰 Adjust Prices</button>
        </div>
      )}

      {/* ──── Product Count ──── */}
      <div style={{ marginBottom: 8, color: '#888', fontSize: 13 }}>
        Showing {filtered.length} of {products.length} products
      </div>

      {/* ──── Product Table ──── */}
      <div style={{ overflowX: 'auto', border: '1px solid #222', borderRadius: 8, background: '#0d0d1a' }}>
        <table style={S.table}>
          <thead>
            <tr>
              <th style={S.th}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              </th>
              <th style={S.th}>Image</th>
              <th style={S.th}>Product Name</th>
              <th style={S.th}>Category</th>
              <th style={S.th}>Sub­category</th>
              <th style={S.th}>Price (₹)</th>
              <th style={S.th}>Stock</th>
              <th style={S.th}>Featured</th>
              <th style={S.th}>Availability</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} style={{ ...S.td, textAlign: 'center', padding: 40, color: '#888' }}>
                <Spinner /> Loading products…
              </td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={9} style={{ ...S.td, textAlign: 'center', padding: 40, color: '#666' }}>
                No products found. Upload a CSV to get started!
              </td></tr>
            ) : (
              filtered.map((p) => (
                <tr key={p._id} style={{ background: selected.has(p._id) ? '#1e3a5f22' : 'transparent' }}>
                  <td style={S.td}>
                    <input type="checkbox" checked={selected.has(p._id)} onChange={() => toggle(p._id)} />
                  </td>
                  <td style={S.td}>
                    {p.imageUrl
                      ? <img src={`${p.imageUrl}?w=72&h=72&fit=crop`} alt={p.name} style={S.thumb} />
                      : <span style={S.thumbPlaceholder} />}
                  </td>
                  <td style={{ ...S.td, fontWeight: 600, color: '#eee' }}>{p.name}</td>
                  <td style={S.td}><span style={S.badge('#334155')}>{catLabel[p.category] ?? p.category}</span></td>
                  <td style={{ ...S.td, color: '#999' }}>{p.subcategory}</td>
                  <td style={{ ...S.td, fontWeight: 700, color: '#22c55e' }}>₹{p.price ?? '—'}</td>
                  <td style={S.td}>
                    <span style={S.badge(p.inStock ? '#16a34a' : '#dc2626')}>{p.inStock ? 'In Stock' : 'Out'}</span>
                  </td>
                  <td style={S.td}>
                    {p.featured ? <span style={S.badge('#eab308')}>⭐ Yes</span> : <span style={{ color: '#555' }}>—</span>}
                  </td>
                  <td style={{ ...S.td, color: '#aaa' }}>{p.availability ?? '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ──── Import Section ──── */}
      <div style={S.section}>
        <h2 style={{ margin: '0 0 8px', fontSize: 20, color: '#eee' }}>📥 Import Products from CSV / Excel</h2>
        <p style={{ margin: '0 0 16px', color: '#888', fontSize: 13 }}>
          Upload a <code>.csv</code> file (save your Excel as CSV first). The importer auto-detects
          whether each row is a <strong>new product</strong> or an <strong>update</strong> to an existing
          one (matched by slug or name).
        </p>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <input type="file" accept=".csv" onChange={handleFile} />
          <button style={S.btn('#2563eb')} onClick={parseCSV} disabled={!importFile}>
            👁 Preview Import
          </button>
        </div>

        <div style={{ padding: 12, background: '#0d0d1a', borderRadius: 6, fontSize: 12, color: '#aaa' }}>
          <strong style={{ color: '#ccc' }}>Expected CSV Headers:</strong><br />
          <code style={{ color: '#93c5fd' }}>
            name, slug, category, subcategory, price, priceLabel, description, inStock, availability, featured, imageUrl
          </code>
          <br /><br />
          <strong style={{ color: '#ccc' }}>Category values:</strong> special-offers, livestock, tanks, equipment, maintenance<br />
          <strong style={{ color: '#ccc' }}>Subcategory values:</strong> freshwater-fish, marine-fish, shrimp-inverts, live-plants, combo-deals, starter-kits, filtration, fish-food, etc.
        </div>

        {/* Import result banner */}
        {importResult && (
          <div style={{ marginTop: 16, padding: 12, borderRadius: 6, background: importResult.f > 0 ? '#7f1d1d' : '#14532d' }}>
            <strong style={{ color: '#fff' }}>Import Complete!</strong>{' '}
            <span style={{ color: '#bbb' }}>✅ {importResult.s} succeeded{importResult.f > 0 && `, ❌ ${importResult.f} failed`}</span>
            {importResult.errors.length > 0 && (
              <ul style={{ margin: '8px 0 0', paddingLeft: 20, color: '#fca5a5', fontSize: 12 }}>
                {importResult.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* ──── Preview Modal ──── */}
      {showPreview && preview && (
        <div style={S.modal} onClick={() => setShowPreview(false)}>
          <div style={S.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 12px', color: '#eee' }}>📋 Import Preview — {preview.length} rows</h2>
            <div style={{ overflowX: 'auto', maxHeight: '55vh', overflowY: 'auto' }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Action</th>
                    <th style={S.th}>Name</th>
                    <th style={S.th}>Slug</th>
                    <th style={S.th}>Category</th>
                    <th style={S.th}>Price</th>
                    <th style={S.th}>Stock</th>
                    <th style={S.th}>Featured</th>
                    <th style={S.th}>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, i) => (
                    <tr key={i} style={{ background: row._action.includes('Update') ? '#1e3a5f33' : '#14532d33' }}>
                      <td style={S.td}><span style={S.badge(row._action.includes('Update') ? '#2563eb' : '#16a34a')}>{row._action}</span></td>
                      <td style={{ ...S.td, color: '#eee', fontWeight: 600 }}>{row.name || row.Name}</td>
                      <td style={{ ...S.td, color: '#888' }}>{row._slug}</td>
                      <td style={S.td}>{row.category || row.Category}</td>
                      <td style={S.td}>₹{row.price || row.Price}</td>
                      <td style={S.td}>{String(row.inStock ?? row.InStock ?? 'true')}</td>
                      <td style={S.td}>{String(row.featured ?? row.Featured ?? 'false')}</td>
                      <td style={S.td}>{row.imageUrl || row.image ? '📸 Yes' : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
              <button style={S.btn('#64748b')} onClick={() => setShowPreview(false)}>Cancel</button>
              <button style={S.btn('#16a34a')} onClick={commitImport} disabled={actionLoading}>
                {actionLoading ? '⏳ Importing…' : `✅ Commit ${preview.length} Products`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──── Price Adjuster Modal ──── */}
      {showPriceModal && (
        <div style={S.modal} onClick={() => setShowPriceModal(false)}>
          <div style={S.priceModal} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 16px', color: '#eee' }}>💰 Bulk Price Adjustment</h2>
            <p style={{ color: '#aaa', fontSize: 13, marginBottom: 16 }}>
              Adjust prices for <strong style={{ color: '#93c5fd' }}>{selected.size}</strong> selected products.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <select
                style={S.selectInput}
                value={priceMode}
                onChange={(e) => setPriceMode(e.target.value as 'percent' | 'flat')}
              >
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
              <input
                style={{ ...S.searchInput, flex: 'unset', width: 120 }}
                type="number"
                placeholder={priceMode === 'percent' ? 'e.g. 10 or -5' : 'e.g. 50 or -50'}
                value={priceAmount}
                onChange={(e) => setPriceAmount(e.target.value)}
              />
            </div>
            <p style={{ color: '#888', fontSize: 12, marginBottom: 16 }}>
              {priceMode === 'percent'
                ? 'Positive = increase, negative = decrease. e.g. "10" means +10%.'
                : 'Positive = add, negative = subtract. e.g. "-50" means minus ₹50.'}
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button style={S.btn('#64748b')} onClick={() => setShowPriceModal(false)}>Cancel</button>
              <button style={S.btn('#16a34a')} onClick={bulkPriceAdjust} disabled={actionLoading}>
                {actionLoading ? '⏳ Updating…' : 'Apply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
