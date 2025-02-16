import React from 'react';
import { useState } from 'react';

const StarField = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `radial-gradient(circle at center, rgba(0,50,50,0.1) 0%, rgba(10,10,10,1) 100%),
                 radial-gradient(circle at 20% 80%, rgba(0,255,255,0.05) 0%, transparent 40%),
                 radial-gradient(circle at 80% 20%, rgba(0,255,255,0.05) 0%, transparent 40%),
                 #0a0a0a`,
    overflow: 'hidden',
    zIndex: -2
  }}>
    {[...Array(200)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          background: '#fff',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random(),
          animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

const AuroraEffect = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.4,
    background: 'transparent',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      width: '200%',
      height: '200%',
      top: '-50%',
      left: '-50%',
      background: `radial-gradient(circle at center, transparent 0%, #0a0a0a 70%),
                   linear-gradient(45deg, 
                     rgba(0,255,255,0.1) 0%, 
                     transparent 70%),
                   linear-gradient(135deg, 
                     rgba(0,255,255,0.1) 0%, 
                     transparent 70%)`,
      animation: 'aurora 15s infinite linear'
    }} />
  </div>
);

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('participant');
  const [error, setError] = useState('');
  const [activeInput, setActiveInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('Demo: Form submission simulated');
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: "'Poppins', sans-serif",
      color: '#fff'
    }}>
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes aurora {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <StarField />
      <AuroraEffect />

      <div style={{
        background: 'rgba(16, 16, 16, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,255,255,0.3)',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid rgba(0,255,255,0.1)',
        transition: 'box-shadow 0.3s ease'
      }}>
        <h2 style={{
          color: '#00ffff',
          fontSize: '24px',
          marginBottom: '20px',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(0,255,255,0.5)'
        }}>
          {isLogin ? 'Sign in to your account' : 'Create new account'}
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setRole('participant')}
            style={{
              padding: '10px 20px',
              background: role === 'participant' ? 'rgba(0,255,255,0.9)' : 'rgba(0,255,255,0.1)',
              color: role === 'participant' ? '#000' : '#00ffff',
              border: '1px solid rgba(0,255,255,0.3)',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)'
            }}
          >
            Participant
          </button>
          <button
            onClick={() => setRole('admin')}
            style={{
              padding: '10px 20px',
              background: role === 'admin' ? 'rgba(0,255,255,0.9)' : 'rgba(0,255,255,0.1)',
              color: role === 'admin' ? '#000' : '#00ffff',
              border: '1px solid rgba(0,255,255,0.3)',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)'
            }}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              color: '#ff4444',
              backgroundColor: 'rgba(255,68,68,0.1)',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '15px',
              border: '1px solid rgba(255,68,68,0.2)'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: '5px',
                color: '#fff',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: activeInput === 'username' ? '0 0 15px rgba(0,255,255,0.3)' : 'none'
              }}
              onFocus={() => setActiveInput('username')}
              onBlur={() => setActiveInput('')}
              placeholder="Username"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: '5px',
                color: '#fff',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: activeInput === 'password' ? '0 0 15px rgba(0,255,255,0.3)' : 'none'
              }}
              onFocus={() => setActiveInput('password')}
              onBlur={() => setActiveInput('')}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              background: 'linear-gradient(45deg, rgba(0,255,255,0.9), rgba(0,200,200,0.9))',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 15px rgba(0,255,255,0.3)'
            }}
          >
            {isLogin ? 'Sign in' : 'Register'}
          </button>

          <div style={{
            textAlign: 'center',
            marginTop: '15px'
          }}>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: '#00ffff',
                cursor: 'pointer',
                fontSize: '14px',
                textShadow: '0 0 5px rgba(0,255,255,0.3)'
              }}
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;