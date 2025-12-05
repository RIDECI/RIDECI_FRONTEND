interface RateUsersButtonProps {
  onClick: () => void;
}

export function RateUsersButton({ onClick }: RateUsersButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
    >
      Calificar usuarios
    </button>
  );
}
