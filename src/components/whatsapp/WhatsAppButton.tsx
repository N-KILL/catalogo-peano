import React from 'react'
import './WhatsAppButton.css'

interface WhatsAppButtonProps {
    phoneNumber: string
    message?: string
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
    phoneNumber,
    message = '¡Hola! Me gustaría obtener más información.',
}) => {
    const encodedMessage = encodeURIComponent(message)
    const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Contactar por WhatsApp"
        >
            <span className="whatsapp-tooltip">¡Chateá con nosotros!</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="whatsapp-icon"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.817 1.788 6.851L2 30l7.338-1.752A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.527a11.491 11.491 0 0 1-5.863-1.601l-.42-.25-4.355 1.04 1.07-4.24-.274-.435A11.452 11.452 0 0 1 4.527 16c0-6.33 5.148-11.476 11.476-11.476S27.473 9.67 27.473 16c0 6.33-5.147 11.527-11.47 11.527zm6.3-8.614c-.346-.173-2.046-1.01-2.363-1.126-.317-.115-.548-.173-.778.173-.23.346-.893 1.126-1.095 1.356-.202.23-.403.26-.75.087-.346-.173-1.46-.538-2.78-1.716-1.028-.916-1.722-2.047-1.924-2.393-.202-.346-.022-.533.151-.705.156-.155.346-.404.52-.606.173-.202.23-.346.346-.577.115-.23.058-.433-.029-.606-.087-.173-.778-1.875-1.066-2.566-.281-.673-.566-.582-.778-.592l-.663-.012c-.23 0-.606.087-.923.433-.317.346-1.21 1.183-1.21 2.884s1.239 3.347 1.412 3.577c.173.23 2.441 3.726 5.914 5.224.827.357 1.472.57 1.976.73.83.264 1.586.226 2.183.137.666-.1 2.046-.836 2.335-1.644.288-.807.288-1.5.202-1.644-.086-.144-.317-.23-.663-.404z" />
            </svg>
        </a>
    )
}
