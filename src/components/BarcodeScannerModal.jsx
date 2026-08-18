import React, { useState } from 'react';

function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const mockBarcodes = [
    { upc: '012345678905', name: 'Organic Milk 1L', category: 'Dairy' },
    { upc: '098765432109', name: 'Greek Yogurt 500g', category: 'Dairy' },
    { upc: '742309812401', name: 'Whole Wheat Bread', category: 'Bakery' },
    { upc: '883492019482', name: 'Fresh Strawberries 250g', category: 'Produce' }
  ];

  const handleSimulateScan = (item) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onScanSuccess(item);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-pulse"></span>
            <h2 className="text-lg font-bold text-slate-100">UPC Barcode Scanner</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Viewfinder Frame */}
        <div className="relative mt-6 flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-cyan-500/40 bg-slate-950/80 p-4 text-center">
          <div className="absolute inset-x-4 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400 animate-pulse"></div>
          
          <svg className="h-12 w-12 text-slate-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          <p className="text-xs text-slate-400">Position barcode inside camera viewfinder</p>
          <span className="mt-1 text-[10px] text-slate-500">Camera active • Auto-detecting...</span>
        </div>

        {/* Quick Simulation Options */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Simulate Scanned Product Barcode:
          </p>
          <div className="space-y-2">
            {mockBarcodes.map((item) => (
              <button
                key={item.upc}
                disabled={isSimulating}
                onClick={() => handleSimulateScan(item)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-left transition-all hover:border-cyan-500/50 hover:bg-slate-800/80"
              >
                <div>
                  <p className="text-xs font-medium text-slate-200">{item.name}</p>
                  <p className="font-mono text-[10px] text-cyan-400">{item.upc}</p>
                </div>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                  {item.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BarcodeScannerModal;
