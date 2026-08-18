import React from 'react';

function ProductModal({
  isOpen,
  isEditing,
  formData,
  setFormData,
  formLoading,
  onSubmit,
  onClose,
  onOpenScanner
}) {
  if (!isOpen) return null;

  const categories = ['General', 'Dairy', 'Bakery', 'Produce', 'Poultry', 'Meat', 'Beverages', 'Pantry', 'Frozen', 'Pharmacy'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-100">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Organic Whole Milk"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* UPC Barcode with Scanner Trigger */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                UPC / Barcode
              </label>
              <button
                type="button"
                onClick={onOpenScanner}
                className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Scan Barcode
              </button>
            </div>
            <input
              type="text"
              placeholder="e.g. 012345678905"
              value={formData.upc}
              onChange={(e) => setFormData({ ...formData, upc: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 font-mono text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Amount / Quantity */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quantity / Size
              </label>
              <input
                type="text"
                placeholder="e.g. 1 L or 500g"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Expiry Date *
            </label>
            <input
              type="date"
              required
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-90 disabled:opacity-50"
            >
              {formLoading ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
