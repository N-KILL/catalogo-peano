import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Stores
import { useAuthStore } from "../../../store/authStore";

// Icons
import { MdEmail } from "react-icons/md";

// Components
import { MessageModal } from "../../../components/ui/MessageModal/MessageModal";

// Css
import "../AuthPages.css";

export default function ForgotPasswordPage() {
  const { isLoading, error, resetPasswordForEmail, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean, message: string, title: string, type: "success" | "error" | "info"}>({
    isOpen: false,
    message: "",
    title: "",
    type: "info"
  });
  
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await resetPasswordForEmail(email);
      setModalConfig({
        isOpen: true,
        title: "Correo enviado",
        message: "Se ha enviado un correo con las instrucciones para recuperar tu contraseña.",
        type: "success"
      });
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
          Recuperar Contraseña
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <div className="form-header">
              <label className="form-label">Email</label>
            </div>
            <div className="input-wrapper">
              <MdEmail className="input-icon" />
              <input
                type="email"
                className="form-input"
                placeholder="tu-correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Correo"}
          </button>
        </form>

        <button 
          className="social-btn" 
          onClick={() => navigate("/login")} 
          disabled={isLoading} 
          type="button"
          style={{ marginTop: '16px', marginBottom: '0' }}
        >
          <span>Volver al inicio de sesión</span>
        </button>

      </div>

      <MessageModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => {
          setModalConfig({...modalConfig, isOpen: false});
          if (modalConfig.type === "success") {
            navigate("/login", { replace: true, state: { defaultMode: "login" } });
          }
        }}
      />
    </div>
  );
}
