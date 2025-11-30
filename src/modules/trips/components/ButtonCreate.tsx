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
            className="w-full md:w-auto px-8 py-6 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base border-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {title}
        </Button>
    )
}

export default ButtonCreate;