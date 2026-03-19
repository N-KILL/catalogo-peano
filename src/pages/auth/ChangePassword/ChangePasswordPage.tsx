import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Stores
import { useAuthStore } from "../../../store/authStore";
import { useChangePasswordStore } from "./ChangePasswordStore";

// Utils
import { PASSWORD_REGEX } from "../../../utils/regexp";

// Icons
import { MdLock } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Components
import { MessageModal } from "../../../components/ui/MessageModal/MessageModal";

// Css
import "../AuthPages.css";

export default function ChangePasswordPage() {
  const {
    isLoading,
    error,
    setPassError,
    passError,
    updatePassword,
    clearError,
    isPasswordRecovery,
  } = useAuthStore();

  const {
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    setPassword,
    setConfirmPassword,
    resetForm,
    toggleShowPassword,
    toggleShowConfirmPassword,
  } = useChangePasswordStore();

  const [modalConfig, setModalConfig] = useState<{isOpen: boolean, message: string, title: string, type: "success" | "error" | "info"}>({
    isOpen: false,
    message: "",
    title: "",
    type: "info"
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Si no estamos en flujo de recuperación y no hay hash en la URL (al momento de cargar), no permitir acceso
    const hash = window.location.hash;
    if (!isPasswordRecovery && !hash.includes("type=recovery")) {
      navigate("/login", { replace: true });
    }
  }, [isPasswordRecovery, navigate]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      setPassError("Las contraseñas no coinciden");
      return;
    }
    if (!PASSWORD_REGEX.test(password)) {
      setPassError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    try {
      await updatePassword(password);
      setModalConfig({
        isOpen: true,
        title: "¡Éxito!",
        message: "Contraseña actualizada con éxito.",
        type: "success"
      });
      resetForm();
    } catch (err) {
      // Error is handled in store
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            fontSize: "24px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          Cambiar Contraseña
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <div className="form-header">
              <label className="form-label">Nueva Contraseña</label>
            </div>
            <div className="input-wrapper">
              <MdLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
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
            {passError && (
              <div className="input-error-message">{passError}</div>
            )}
          </div>

          <div className="form-group">
            <div className="form-header">
              <label className="form-label">Confirmar Nueva Contraseña</label>
            </div>
            <div className="input-wrapper">
              <MdLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
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
            {passError && (
              <div className="input-error-message">{passError}</div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Actualizar Contraseña"}
          </button>
        </form>
      </div>

      <MessageModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => {
          setModalConfig({...modalConfig, isOpen: false});
          if (modalConfig.type === "success") {
            navigate("/home", { replace: true });
          }
        }}
      />
    </div>
  );
}