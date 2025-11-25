interface AppMainCardProps {
    children: React.ReactNode;
}

function AppMainCard({ children }: AppMainCardProps){
    return (
        <div className="flex flex-1 flex-col p-6">
            <div className="bg-white rounded-2xl shadow-xl h-full w-full p-8 overflow-auto">
                {children}
            </div>
        </div>
    )
}

export default AppMainCard;