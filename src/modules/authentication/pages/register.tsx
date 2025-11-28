import { RegisterForm } from "../components/RegisterForm";
import "./register.css";

function Register() {
  return (
    <div className="login-page">
      <div className="login-container">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;