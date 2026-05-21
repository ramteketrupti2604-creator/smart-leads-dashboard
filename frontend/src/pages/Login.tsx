import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    localStorage.setItem('token', 'mock-token-smart-leads-2026');
    localStorage.setItem('user', JSON.stringify({ email: email || 'trupti@test.com', role: 'Admin' }));

    
    navigate('/dashboard');

    
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 100);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1e3a8a', fontSize: '2rem', fontWeight: 'bold' }}>Log In</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4b5563', fontWeight: '500' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ramteketrupti2604@gmail.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#4b5563', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#1d4ed8',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.9rem', color: '#6b7280' }}>
          Don't have an account? <span style={{ color: '#1d4ed8', cursor: 'pointer' }}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;