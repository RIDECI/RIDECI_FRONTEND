import React from "react";
import { useToast } from "./ToastContext";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type?: "info" | "success" | "error") => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type?: "info" | "success" | "error") => {
    switch (type) {
      case "success":
        return "#f0fdf4";
      case "error":
        return "#fef2f2";
      default:
        return "#eff6ff";
    }
  };

  const getBorderColor = (type?: "info" | "success" | "error") => {
    switch (type) {
      case "success":
        return "#22c55e";
      case "error":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      maxWidth: "400px"
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            minWidth: 280,
            padding: "16px",
            borderRadius: 12,
            background: getBgColor(toast.type),
            color: "#1f2937",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
            fontWeight: 500,
            fontSize: 14,
            opacity: 0.98,
            transition: "all 0.3s ease",
            border: `2px solid ${getBorderColor(toast.type)}`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideIn 0.3s ease"
          }}
        >
          {getIcon(toast.type)}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.6,
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 0.98;
          }
        }
      `}</style>
    </div>
  );
}
