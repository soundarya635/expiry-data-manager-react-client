import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import BarcodeScannerModal from '../components/BarcodeScannerModal';
import InventoryFilters from '../components/InventoryFilters';
import { API_BASE_URL } from '../config/api';

function DashboardPage({ user, onLogout, serverHealth, checkHealth }) {
  const token = localStorage.getItem('token');

  // State management for products and pagination
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [monthsFilter, setMonthsFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    upc: '',
    amount: '1 pc',
    category: 'General',
    expiryDate: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  const categoriesList = ['Dairy', 'Bakery', 'Produce', 'Poultry', 'Meat', 'Beverages', 'Pantry', 'Frozen', 'Pharmacy', 'General'];

  const getFutureDate = (daysAhead) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  // Local fallback handler
  const useLocalFallback = useCallback(() => {
    const saved = localStorage.getItem('inventory_items');
    let localItems = [];
    if (saved) {
      try { localItems = JSON.parse(saved); } catch (e) {}
    }
    if (!localItems.length) {
      localItems = [
        { _id: '1', title: 'Organic Whole Milk 1L', upc: '012345678905', expiryDate: getFutureDate(2), category: 'Dairy', amount: '1 L' },
        { _id: '2', title: 'Greek Yogurt (Blueberry)', upc: '098765432109', expiryDate: getFutureDate(5), category: 'Dairy', amount: '500g' },
        { _id: '3', title: 'Whole Wheat Bread', upc: '742309812401', expiryDate: getFutureDate(-1), category: 'Bakery', amount: '1 loaf' },
        { _id: '4', title: 'Fresh Strawberries', upc: '883492019482', expiryDate: getFutureDate(0), category: 'Produce', amount: '250g' },
        { _id: '5', title: 'Free Range Eggs (12pk)', upc: '036000291452', expiryDate: getFutureDate(12), category: 'Poultry', amount: '12 pcs' },
        { _id: '6', title: 'Cheddar Cheese Block', upc: '041196910759', expiryDate: getFutureDate(45), category: 'Dairy', amount: '200g' }
      ];
    }

    let filtered = [...localItems];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => item.title.toLowerCase().includes(q) || (item.upc && item.upc.includes(q)));
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    if (monthsFilter !== 'all') {
      filtered = filtered.filter(item => {
        const days = getDaysRemaining(item.expiryDate);
        if (monthsFilter === 'expired') return days < 0;
        if (monthsFilter === 'soon') return days >= 0 && days <= 3;
        if (monthsFilter === '1') return days <= 30;
        if (monthsFilter === '3') return days <= 90;
        return true;
      });
    }

    setProducts(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / limit) || 1);
  }, [searchQuery, categoryFilter, monthsFilter, limit]);

  // Fetch Products from Backend API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    if (searchQuery.trim()) query.append('search', searchQuery.trim());
    if (monthsFilter !== 'all') query.append('monthsFilter', monthsFilter);
    if (categoryFilter !== 'all') query.append('category', categoryFilter);

    try {
      const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setTotalItems(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        useLocalFallback();
      }
    } catch (err) {
      useLocalFallback();
    } finally {
      setLoading(false);
    }
  }, [token, page, limit, searchQuery, monthsFilter, categoryFilter, useLocalFallback]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getDaysRemaining = (expiryStr) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const expiry = new Date(expiryStr);
    expiry.setHours(0,0,0,0);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryBadgeClass = (days) => {
    if (days < 0) return { label: 'Expired', class: 'bg-red-500/10 border-red-500/20 text-red-400' };
    if (days <= 3) return { label: days === 0 ? 'Today' : `Soon (${days}d)`, class: 'bg-amber-500/10 border-amber-500/20 text-amber-400' };
    return { label: `Good (${days}d)`, class: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' };
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({ title: '', upc: '', amount: '1 pc', category: 'General', expiryDate: getFutureDate(7) });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || '',
      upc: product.upc || '',
      amount: product.amount || '1 pc',
      category: product.category || 'General',
      expiryDate: product.expiryDate ? product.expiryDate.split('T')[0] : getFutureDate(7)
    });
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const isEdit = !!editingProduct;
    const url = isEdit
      ? `${API_BASE_URL}/products/${editingProduct._id || editingProduct.id}`
      : `${API_BASE_URL}/products`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsAddModalOpen(false);
        fetchProducts();
      } else {
        saveLocally(formData, editingProduct);
      }
    } catch (err) {
      saveLocally(formData, editingProduct);
    } finally {
      setFormLoading(false);
    }
  };

  const saveLocally = (data, editItem) => {
    const saved = localStorage.getItem('inventory_items');
    let localItems = saved ? JSON.parse(saved) : [];
    if (editItem) {
      localItems = localItems.map(item =>
        (item._id === editItem._id || item.id === editItem.id) ? { ...item, ...data } : item
      );
    } else {
      const newItem = { _id: Date.now().toString(), ...data };
      localItems.unshift(newItem);
    }
    localStorage.setItem('inventory_items', JSON.stringify(localItems));
    setIsAddModalOpen(false);
    useLocalFallback();
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      } else {
        deleteLocally(id);
      }
    } catch (err) {
      deleteLocally(id);
    }
  };

  const deleteLocally = (id) => {
    const saved = localStorage.getItem('inventory_items');
    if (saved) {
      const localItems = JSON.parse(saved).filter(item => item._id !== id && item.id !== id);
      localStorage.setItem('inventory_items', JSON.stringify(localItems));
    }
    useLocalFallback();
  };

  const handleScanSuccess = (scannedItem) => {
    setFormData(prev => ({
      ...prev,
      upc: scannedItem.upc,
      title: prev.title || scannedItem.name,
      category: scannedItem.category || prev.category
    }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Dashboard Top Header & Stats */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100">Product Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Welcome back, <span className="font-semibold text-cyan-400">{user?.name || 'User'}</span>! Manage your product expiration dates.
          </p>
        </div>

        {/* Server Status Indicator */}
        <div className="flex items-center gap-3">
          <button onClick={checkHealth} className="group flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs backdrop-blur-md hover:border-slate-700">
            <span className={`h-2.5 w-2.5 rounded-full ${serverHealth.status === 'online' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="font-medium text-slate-300">
              {serverHealth.status === 'online' ? 'API Online' : 'Local Offline Mode'}
            </span>
          </button>

          <button onClick={onLogout} className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white">
            Log Out
          </button>
        </div>
      </div>

      {/* Inventory Filters & Controls */}
      <InventoryFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        monthsFilter={monthsFilter}
        setMonthsFilter={setMonthsFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categoriesList}
        onOpenAddModal={handleOpenAddModal}
      />

      {/* Product List Grid */}
      <div className="mt-8">
        {loading ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            <p className="mt-3 text-xs text-slate-400">Fetching inventory items...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
            <svg className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-3 text-base font-semibold text-slate-300">No products found</p>
            <p className="mt-1 text-xs text-slate-500">Try adjusting your search criteria or add a new product item.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <ProductCard
                key={item._id || item.id}
                product={item}
                getDaysRemaining={getDaysRemaining}
                getExpiryBadgeClass={getExpiryBadgeClass}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <p className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-200">{(page - 1) * limit + 1}</span> to{' '}
            <span className="font-semibold text-slate-200">{Math.min(page * limit, totalItems)}</span> of{' '}
            <span className="font-semibold text-slate-200">{totalItems}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-xs font-medium text-slate-400">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Product Form Modal (Add & Edit) */}
      <ProductModal
        isOpen={isAddModalOpen}
        isEditing={!!editingProduct}
        formData={formData}
        setFormData={setFormData}
        formLoading={formLoading}
        onSubmit={handleFormSubmit}
        onClose={() => setIsAddModalOpen(false)}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </div>
  );
}

export default DashboardPage;
