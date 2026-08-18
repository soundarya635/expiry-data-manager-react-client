import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import { API_BASE_URL } from './config/api'

function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [serverHealth, setServerHealth] = useState({ status: 'checking', message: '', isDbFallback: false })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { return null }
    }
    return null
  })
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')
  const [authMessage, setAuthMessage] = useState(null)
  
  // Expiry Items State
  const [items, setItems] = useState([
    { id: '1', name: 'Organic Whole Milk', expiryDate: getFutureDate(2), category: 'Dairy' },
    { id: '2', name: 'Greek Yogurt (Blueberry)', expiryDate: getFutureDate(5), category: 'Dairy' },
    { id: '3', name: 'Whole Wheat Bread', expiryDate: getFutureDate(-1), category: 'Bakery' },
    { id: '4', name: 'Fresh Strawberries', expiryDate: getFutureDate(0), category: 'Produce' },
    { id: '5', name: 'Free Range Eggs', expiryDate: getFutureDate(12), category: 'Poultry' }
  ])
  const [newItemName, setNewItemName] = useState('')
  const [newItemExpiry, setNewItemExpiry] = useState('')
  const [newItemCategory, setNewItemCategory] = useState('General')
  const [searchQuery, setSearchQuery] = useState('')

  function getFutureDate(daysAhead) {
    const d = new Date()
    d.setDate(d.getDate() + daysAhead)
    return d.toISOString().split('T')[0]
  }

  // Check Server Health
  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`)
      if (res.ok) {
        setServerHealth({
          status: 'online',
          message: 'Server is online. Database in fallback memory mode.',
          isDbFallback: true
        })
      } else {
        setServerHealth({ status: 'offline', message: 'Server returned unhealthy status', isDbFallback: false })
      }
    } catch (e) {
      setServerHealth({ status: 'offline', message: 'Could not connect to server', isDbFallback: false })
    }
  }

  useEffect(() => {
    checkHealth()
    // Check if token exists on load
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token) {
      setIsLoggedIn(true)
      if (savedUser) {
        try { setCurrentUser(JSON.parse(savedUser)) } catch (e) {}
      }
      setCurrentView('dashboard')
    }
  }, [])

  // Handle Authentication submit
  const handleAuthSubmit = async (e, mode) => {
    e.preventDefault()
    setAuthMessage(null)
    
    const isLogin = mode === 'login'
    const endpoint = isLogin ? 'login' : 'register'
    const payload = isLogin 
      ? { email: authEmail, password: authPassword }
      : { name: authName, email: authEmail, password: authPassword }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      
      if (res.ok) {
        setAuthMessage({ 
          type: 'success', 
          text: isLogin ? 'Welcome back! Authentication successful.' : 'Account registered successfully! You can log in now.' 
        })
        if (isLogin) {
          localStorage.setItem('token', data.token || 'mock_token_value')
          setIsLoggedIn(true)
          // Redirect to dashboard on login
          setTimeout(() => {
            setCurrentView('dashboard')
            setAuthMessage(null)
          }, 800)
        } else {
          // Redirect to login on register
          setTimeout(() => {
            setCurrentView('login')
            setAuthMessage(null)
          }, 1200)
        }
      } else {
        setAuthMessage({ type: 'error', text: data.message || 'Authentication failed' })
      }
    } catch (err) {
      setAuthMessage({ type: 'error', text: 'Error connecting to backend server. Make sure port 5001 is open.' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setCurrentUser(null)
    setCurrentView('landing')
  }

  // Handle adding new items
  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemName || !newItemExpiry) return

    const item = {
      id: Math.random().toString(36).substring(2, 9),
      name: newItemName,
      expiryDate: newItemExpiry,
      category: newItemCategory
    }

    setItems([item, ...items])
    setNewItemName('')
    setNewItemExpiry('')
    setNewItemCategory('General')
  }

  // Helper to calculate days remaining
  const getDaysRemaining = (expiryStr) => {
    const today = new Date()
    today.setHours(0,0,0,0)
    const expiry = new Date(expiryStr)
    expiry.setHours(0,0,0,0)
    
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get status class/badge for display
  const getExpiryStatus = (days) => {
    if (days < 0) return { label: 'Expired', class: 'bg-red-500/10 border-red-500/20 text-red-400' }
    if (days <= 3) return { label: `${days === 0 ? 'Today' : 'Soon (' + days + 'd)'}`, class: 'bg-amber-500/10 border-amber-500/20 text-amber-400' }
    return { label: `Good (${days}d)`, class: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' }
  }

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg text-slate-100">
      
      {/* Navigation Header */}
      <Header 
        onNavigate={setCurrentView} 
        currentView={currentView}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Render Landing Page */}
        {currentView === 'landing' && (
          <LandingPage onNavigate={setCurrentView} />
        )}

        {/* Render Login Page */}
        {currentView === 'login' && (
          <LoginPage 
            onNavigate={setCurrentView} 
            onLoginSuccess={(user) => {
              setIsLoggedIn(true)
              setCurrentUser(user)
              setCurrentView('dashboard')
            }} 
          />
        )}

        {/* Render Register Page */}
        {currentView === 'register' && (
          <RegisterPage onNavigate={setCurrentView} />
        )}

        {/* Render Dashboard */}
        {currentView === 'dashboard' && (
          <DashboardPage 
            user={currentUser} 
            onLogout={handleLogout} 
            serverHealth={serverHealth} 
            checkHealth={checkHealth} 
          />
        )}

      </main>

      {/* Footer Area */}
      <Footer />
    </div>
  )
}

export default App
