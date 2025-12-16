import React from "react";
import { useToast } from "./ToastContext";

export default function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            minWidth: 220,
            padding: "14px 20px",
            borderRadius: 10,
            background: "#ffffff",
            color: "#1f2937",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
            fontWeight: 500,
            fontSize: 14,
            opacity: 0.98,
            transition: "all 0.3s",
            border: "1px solid #e5e7eb",
            borderLeft: toast.type === "success" ? "4px solid #22c55e" : toast.type === "error" ? "4px solid #ef4444" : "4px solid #3b82f6"
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
