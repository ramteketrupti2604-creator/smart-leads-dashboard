import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// असाइनमेंट की शर्त: Protected Route Component (सुरक्षित रास्ता)
// यह चेक करता है कि यूजर लॉगिन है या नहीं, अगर नहीं है तो उसे सीधे लॉगिन पेज पर भेज देता है
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // लॉगिन टोकन चेक करना
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes - जिन्हें कोई भी देख सकता है */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard - लॉगिन के बिना यह नहीं खुलेगा */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* डिफ़ॉल्ट रूप से अगर कोई सिर्फ localhost:5173 खोले, तो वह सीधे लॉगिन या डैशबोर्ड पर ट्रांसफर हो जाए */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* अगर कोई गलत URL टाइप करे (404 Page Not Found Redirect) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;