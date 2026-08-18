import React from 'react';

function InventoryFilters({
  searchQuery,
  setSearchQuery,
  monthsFilter,
  setMonthsFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  onOpenAddModal
}) {
  const timeFilters = [
    { key: 'all', label: 'All Items' },
    { key: 'soon', label: 'Expiring Soon (≤3d)' },
    { key: 'expired', label: 'Expired' },
    { key: '1', label: 'Within 1 Month' },
    { key: '3', label: 'Within 3 Months' }
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or UPC barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-90 active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Expiry Timeframe Filter & Category Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
        {/* Timeframe Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {timeFilters.map((tf) => (
            <button
              key={tf.key}
              onClick={() => setMonthsFilter(tf.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                monthsFilter === tf.key
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Category Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default InventoryFilters;
