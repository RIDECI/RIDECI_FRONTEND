import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-green-500/10"></div>
            
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-md animate-in fade-in duration-500">
                <ForgotPasswordForm />
            </div>
        </div>
    );
}

export default ForgotPasswordPage;