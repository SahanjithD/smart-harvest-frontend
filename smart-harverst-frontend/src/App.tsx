import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/farmUser/Dashboard'
import OwnerDashboard from './pages/farmUser/OwnerDashboard'
import SupervisorDashboard from './pages/farmUser/SupervisorDashboard'
import TaskList from './pages/farmUser/TaskList'
import FertilizerPlans from './pages/farmUser/FertilizerPlans'
import BedDetails from './pages/farmUser/BedDetails'
import LoginPage from './pages/farmUser/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import StartingPage from './pages/StartingPage'
import ClientLoginPage from './pages/clientUser/ClientLoginPage'
import EndUserPortal from './pages/endUser/EndUserPortal'
import './styles/animations.css'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Starting page */}
          <Route path="/" element={<StartingPage />} />

          {/* Farm user login */}
          <Route path="/farm-user/login" element={<LoginPage />} />

          {/* Client user login */}
          <Route path="/client-user/login" element={<ClientLoginPage />} />

          {/* End user portal */}
          <Route path="/end-user/portal" element={<EndUserPortal />} />

          {/* Routes with navbar */}
          <Route element={<ProtectedRoute />}>
            <Route 
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main className="pt-16">
                    <Outlet />
                  </main>
                </div>
              }
            >
              {/* Routes for all authenticated users */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} />
              <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
              <Route path="/beds/:bedId" element={<BedDetails />} />
            </Route>
          </Route>
          
          {/* Routes with role restrictions */}
          <Route element={<ProtectedRoute allowedRoles={['supervisor']} />}>
            <Route 
              element={
                <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main className="pt-16">
                    <Outlet />
                  </main>
                </div>
              }
            >
              <Route path="/fertilizer-plans" element={<FertilizerPlans />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
