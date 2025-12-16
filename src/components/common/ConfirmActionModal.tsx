import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmActionModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'primary' | 'warning';
    loading?: boolean;
}

export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
    open,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    description = "Esta acción no se puede deshacer.",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = 'primary',
    loading = false,
}) => {
    if (!open) return null;

    const getVariantClasses = () => {
        switch (variant) {
            case 'danger':
                return {
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    confirmBtn: 'bg-red-600 hover:bg-red-700 text-white'
                };
            case 'warning':
                return {
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    confirmBtn: 'bg-yellow-600 hover:bg-yellow-700 text-white'
                };
            default:
                return {
                    iconBg: 'bg-[#0B8EF5]/10',
                    iconColor: 'text-[#0B8EF5]',
                    confirmBtn: 'bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white'
                };
        }
    };

    const styles = getVariantClasses();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full ${styles.iconBg} flex items-center justify-center mb-4`}>
                        <AlertTriangle className={`w-8 h-8 ${styles.iconColor}`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed max-w-xs">{description}</p>

                    <div className="flex gap-3 w-full">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 h-11 text-base font-medium rounded-xl"
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={loading}
                            className={`flex-1 h-11 text-base font-bold rounded-xl shadow-md hover:shadow-lg transition-all ${styles.confirmBtn}`}
                        >
                            {loading ? "Procesando..." : confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
