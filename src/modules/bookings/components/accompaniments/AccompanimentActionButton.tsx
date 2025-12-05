interface AccompanimentActionButtonProps {
  label: string;
  onClick: () => void;
}

export function AccompanimentActionButton({ label, onClick }: AccompanimentActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      {label}
    </button>
  );
}