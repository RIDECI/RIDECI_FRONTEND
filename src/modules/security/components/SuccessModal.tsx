import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  reportId: string;
}

function SuccessModal({ isVisible, onClose, reportId }: SuccessModalProps) {
  if (!isVisible) return null;

  return (
      <div
        className="fixed inset-0 bg-[rgba(11,142,245,0.15)] flex items-center justify-center p-4 z-50 transition-opacity duration-300"
        onClick={onClose}
      >


      <div
        className="bg-white w-full max-w-xs p-6 rounded-xl shadow-xl text-center transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="border-4 border-green-600 rounded-full p-2 inline-block animate-[bounce-in_0.5s_ease-out]">
            <Check className="h-12 w-12 text-green-600" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {reportId}
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          El reporte fue enviado exitosamente
        </p>

        <Button
          onClick={onClose}
          className="w-full py-2 px-3 text-md font-semibold text-green-800 bg-green-100 border-2 border-green-600 rounded-lg shadow-md hover:bg-green-200"
        >
          Confirmar
        </Button>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-\\[bounce-in_0\\.5s_ease-out\\] {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SuccessModal;
