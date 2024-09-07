import React from "react";
import "./AuthLayout.css";
const AuthLayout = (props: any) => {
  return (
    <div className="containerSignUp">
      <div className="signUpBg">
        <div className="formContainer">
          <h2 className="title">{props.title}</h2>
          {props.children}
          <div className="haveAccount">{props.redirection}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
