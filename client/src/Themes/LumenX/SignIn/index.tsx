import SignInForm from "./SignInForm";
import AuthLayout from "../../../components/template/AuthLayout";
import { Link } from "react-router-dom";
import routes from "../../../constants/routes";
const SignIn = () => {
  return (
    <AuthLayout
      title="Sign In"
      redirection={
        <div>
          Don't have account? <Link to={routes.signUp}>Sign Up</Link>
        </div>
      }
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;
