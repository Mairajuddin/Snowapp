
import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
    navigate("/admin");
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0B1523 0%, #1a2332 30%, #2a3441 70%, #3a4450 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      position: 'relative'
    },
    card: {
      backgroundColor: 'rgba(11, 21, 35, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    },
    cardContent: {
      padding: '40px',
      position: 'relative',
      zIndex: 1
    },
    title: {
      textAlign: 'center',
      marginBottom: '40px',
      color: '#ffffff',
      fontSize: '2.25rem',
      fontWeight: 300,
      margin: '0 0 40px 0',
      letterSpacing: '0.5px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputContainer: {
      position: 'relative'
    },
    icon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255, 255, 255, 0.6)',
      zIndex: 1,
      width: '20px',
      height: '20px'
    },
    input: {
      width: '100%',
      padding: '16px 16px 16px 48px',
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxSizing: 'border-box',
      backdropFilter: 'blur(10px)'
    },
    inputFocus: {
      borderColor: 'rgba(100, 181, 246, 0.6)',
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      boxShadow: '0 0 0 2px rgba(100, 181, 246, 0.2)',
      transform: 'translateY(-1px)'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      accentColor: '#2563eb',
      cursor: 'pointer'
    },
    checkboxLabel: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      cursor: 'pointer',
      userSelect: 'none'
    },
    button: {
      width: '100%',
      padding: '16px',
      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonHover: {
      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)'
    },
    linksContainer: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    link: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      textDecoration: 'underline',
      cursor: 'pointer',
      transition: 'color 0.2s ease'
    },
    linkHover: {
      color: 'white'
    },
    signupText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      margin: 0
    },
    signupLink: {
      color: 'white',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'text-decoration 0.2s ease'
    },
    signupLinkHover: {
      textDecoration: 'underline'
    }
  };

  const [hoveredButton, setHoveredButton] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredForgotLink, setHoveredForgotLink] = useState(false);
  const [hoveredSignupLink, setHoveredSignupLink] = useState(false);

  const navigate=useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardContent}>
          <h1 style={styles.title}>Login</h1>
          
          <div style={styles.formContainer}>
            <div style={styles.inputContainer}>
              <User style={styles.icon} />
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'email' ? styles.inputFocus : {})
                }}
                required
              />
            </div>
            
            <div style={styles.inputContainer}>
              <Lock style={styles.icon} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                style={{
                  ...styles.input,
                  ...(focusedInput === 'password' ? styles.inputFocus : {})
                }}
                required
              />
            </div>
            
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="remember" style={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                ...styles.button,
                ...(hoveredButton ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              LOGIN
            </button>
            
            <div style={styles.linksContainer}>
              <a 
                href="#" 
                style={{
                  ...styles.link,
                  ...(hoveredForgotLink ? styles.linkHover : {})
                }}
                onMouseEnter={() => setHoveredForgotLink(true)}
                onMouseLeave={() => setHoveredForgotLink(false)}
                onClick={(e) => e.preventDefault()}
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}