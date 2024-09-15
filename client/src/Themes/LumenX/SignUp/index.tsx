import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import routes from "../../../constants/routes";
import { Link } from "react-router-dom";
import AuthLayout from "../../../components/template/AuthLayout";

const SignUp = () => {
  return (
    <AuthLayout
      title="Sign Up"
      redirection={
        <div>
          Already have an account? <Link to={routes.signIn}>Sign In</Link>
        </div>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
