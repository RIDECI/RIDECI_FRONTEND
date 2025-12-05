import { Button } from "@/components/ui/button"

export interface ButtonProps {
  title: string
  onClick?: () => void
  disabled?: boolean
}

function ButtonSecondary({ title, onClick, disabled = false }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full md:w-auto px-8 py-6 rounded-2xl border-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400 font-semibold text-base transition-all"
      variant="outline"
    >
      {title}
    </Button>
  )
}

export default ButtonSecondary
