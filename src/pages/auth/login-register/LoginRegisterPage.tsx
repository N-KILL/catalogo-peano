import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Stores
import { useAuthStore } from '../../../store/authStore';
import { useLoginUIStore } from '../../../store/loginUIStore';

// Utils
import { PASSWORD_REGEX } from '../../../utils/regexp';

// Icons
import { FcGoogle } from 'react-icons/fc';
import { MdEmail, MdLock } from 'react-icons/md';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// Css
import './LoginRegisterPage.css';

export default function LoginRegisterPage() {
  const {
    isLoading, error, setPassError, passError,
    user, signInWithOAuth, signInWithPassword, signUp, clearError
  } = useAuthStore();

  const {
    isLogin, email, password, confirmPassword, showPassword, showConfirmPassword,
    setEmail, setPassword, setConfirmPassword, toggleMode, resetForm, setIsLogin,
    toggleShowPassword, toggleShowConfirmPassword
  } = useLoginUIStore();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get('defaultMode');
    if (mode === 'register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams, setIsLogin]);

  const handleGoogleLogin = async () => {
    await signInWithOAuth();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!isLogin) {
      if (password !== confirmPassword) {
        setPassError('Las contraseñas no coinciden');
        return;
      }
      if (!PASSWORD_REGEX.test(password)) {
        setPassError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        return;
      }
    }

    if (isLogin) {
      await signInWithPassword(email, password);
    } else {
      await signUp(email, password);
      alert('Revisa tu correo para confirmar tu cuenta.');
      resetForm();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="auth-page-container">
      <div className="auth-card">

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={!isLogin ? toggleMode : undefined}
            type="button"
          >
            Iniciar Sesión
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={isLogin ? toggleMode : undefined}
            type="button"
          >
            Registrarse
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="social-btn" onClick={handleGoogleLogin} disabled={isLoading} type="button">
          <FcGoogle className="google-icon" />
          <span>Continuar con Google</span>
        </button>

        <div className="divider">
          <span className="divider-text"> O {isLogin ? 'INICIAR SESIÓN' : 'REGISTRARSE'} CON EMAIL</span>
        </div>

        <form onSubmit={handleAuth}>
          <div className="form-group">
            <div className="form-header">
              <label className="form-label">Email</label>
            </div>
            <div className="input-wrapper">
              <MdEmail className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="nombre@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-header">
              <label className="form-label">Contraseña</label>
              {isLogin && (
                <button type="button" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </button>
              )}
            </div>
            <div className="input-wrapper">
              <MdLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={toggleShowPassword}
                tabIndex={-1}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {isLogin && passError && <div className="input-error-message">{passError}</div>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <div className="form-header">
                <label className="form-label">Confirmar Contraseña</label>
              </div>
              <div className="input-wrapper">
                <MdLock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={toggleShowConfirmPassword}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {!isLogin && passError && <div className="input-error-message">{passError}</div>}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}

