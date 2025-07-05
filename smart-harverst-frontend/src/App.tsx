import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import OwnerDashboard from './pages/OwnerDashboard'
import SupervisorDashboard from './pages/SupervisorDashboard'
import TaskList from './pages/TaskList'
import FertilizerPlans from './pages/FertilizerPlans'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Routes with navbar */}
          <Route element={<ProtectedRoute />}>
            <Route 
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main>
                    <Outlet />
                  </main>
                </div>
              }
            >
              {/* Routes for all authenticated users */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/fertilizer-plans" element={<FertilizerPlans />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
            </Route>
          </Route>
          
          {/* Default route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
