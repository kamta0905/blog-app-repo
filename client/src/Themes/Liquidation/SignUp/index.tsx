import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import "./SignUpStyle.css";
import routes from "../../../constants/routes";
import { Link } from "react-router-dom";
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";

const SignUp = () => {
  const [percentage, setPercentage] = useState(0.5);
  const getTextForPercentage = (percent: any) => {
    if (percent >= 0.8) {
      return { text: "High", backgroundColor: "#EA4228" };
    } else if (percent > 0.5) {
      return { text: "Medium", backgroundColor: "#F5CD19" };
    } else {
      return { text: "Just a bit more will get you there", backgroundColor: "#5BE12C" };
    }
  };
  const { text, backgroundColor } = getTextForPercentage(percentage);

  return (
    <div className="containerSignUp">
      <div className="signUpBg">
        <div className="formContainer">
          <h2 className="title">Admin Register</h2>
          <SignUpForm />
          <div className="haveAccount">
            Already Have an Account <Link to={routes.signIn}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
