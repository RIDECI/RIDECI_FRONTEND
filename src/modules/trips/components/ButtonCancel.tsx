import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export interface ButtonProps{
    title: string
}

function ButtonCancel({title}: ButtonProps){
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/sectionTravel')
    }
    
    return (
        <Button 
            variant="outline" 
            onClick={handleSubmit}
            className="w-full md:w-auto px-8 py-6 rounded-2xl border-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400 font-semibold text-base"
        >
            {title}
        </Button>
    )
}

export default ButtonCancel;