import { LoginForm } from "../components/LoginForm";
import "./login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;