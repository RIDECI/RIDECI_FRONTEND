import { Button } from "@/components/ui/button"

export interface ButtonProps {
  title: string
  onClick?: () => void
  disabled?: boolean
}

function ButtonPrimary({ title, onClick, disabled = false }: ButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full px-8 py-6 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base border-0 transition-all"
    >
      {title}
    </Button>
  )
}

export default ButtonPrimary
