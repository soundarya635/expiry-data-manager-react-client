import React from 'react';

function ProductCard({ product, getDaysRemaining, getExpiryBadgeClass, onEdit, onDelete }) {
  const daysLeft = getDaysRemaining(product.expiryDate);
  const badgeStyle = getExpiryBadgeClass(daysLeft);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-cyan-500/5">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-cyan-400">
            {product.category || 'General'}
          </span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeStyle.class}`}>
            {badgeStyle.label}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-slate-100 group-hover:text-cyan-300">
          {product.title}
        </h3>

        <div className="mt-2 space-y-1 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">UPC:</span>
            <code className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-slate-300">{product.upc || 'N/A'}</code>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Quantity:</span>
            <span className="text-slate-300">{product.amount || '1 pc'}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Expiry Date:</span>
            <span className="font-medium text-slate-200">{product.expiryDate}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-800/80 pt-3">
        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-cyan-400"
          title="Edit product"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>

        <button
          onClick={() => onDelete(product._id || product.id)}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
          title="Delete product"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
