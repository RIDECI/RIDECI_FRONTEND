import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


export interface ButtonProps{
    title: string
}
function ButtonCreate({title}:ButtonProps){
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/detailsOfTravel')
    }

    return (
        <Button
            onClick={handleSubmit}
            className="w-full md:w-auto px-8 py-6 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base border-0"
        >
            {title}
        </Button>
    )
}

export default ButtonCreate;