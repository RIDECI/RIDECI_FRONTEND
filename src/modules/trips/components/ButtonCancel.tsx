import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export interface ButtonProps{
    readonly title: string
}

function ButtonCancel({title}: Readonly<ButtonProps>){
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/app/sectionTravel')
    }
    
    return (
        <Button 
            variant="outline" 
            onClick={handleSubmit}
            className="w-full md:w-auto px-8 py-6 rounded-2xl border-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400 font-semibold text-base shadow-lg hover:shadow-[0_10px_40px_-15px_rgba(239,68,68,0.4)] transition-all duration-300 backdrop-blur-sm"
        >
            {title}
        </Button>
    )
}

export default ButtonCancel;