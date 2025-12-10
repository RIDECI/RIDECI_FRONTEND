import "./forgot-password.css";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

import RideciLogo from "../../../assets/rideci-logo-blanco.png";
import ForgotImage from "../../../assets/forgotPerson.png";

function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <ForgotPasswordForm />
      </div>

      <div className="images-column">
        <img src={RideciLogo} alt="RIDECI" className="image-logo" />

        <img
          src={ForgotImage}
          alt="Forgot password person"
          width={600}
          height={600}
          className="image-large"
        />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
