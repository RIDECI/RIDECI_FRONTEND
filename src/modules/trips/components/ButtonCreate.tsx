import { Button } from "@/components/ui/button"

export interface ButtonProps{
    readonly title: string
    readonly onClick?: () => void
    readonly disabled?: boolean
}
function ButtonCreate({title, onClick, disabled}: Readonly<ButtonProps>){
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className="w-full md:w-auto px-8 py-6 rounded-2xl bg-[#0B8EF5] hover:bg-[#0B8EF5]/90 text-white font-semibold text-base border-2 border-[#0B8EF5]/50 hover:border-[#0B8EF5] shadow-lg hover:shadow-[0_10px_40px_-15px_rgba(11,142,245,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        >
            {title}
        </Button>
    )
}

export default ButtonCreate;