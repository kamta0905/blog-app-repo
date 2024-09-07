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
          {/* <h2 className="title">Admin Register</h2> */}
          {/* <GaugeChart
            id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.7, 0.3, 0.2]}
            colors={["#5BE12C", "#F5CD19", "#EA4228"]}
            percent={0.8}
            arcPadding={0}
            textColor="#FF0000"
            textRenderer={(value: any) => <div style={{ color: "#FF0000", fontSize: "20px" }}>Custom Text</div>} // Replace wit
          /> */}
          {/* <div style={{ position: "relative", display: "inline-block" }}>
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.7, 0.3, 0.2]}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              percent={0.8}
              arcPadding={0}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "12px",
                background: "#FF0000",
                borderRadius: "10px",
                padding: "5px",
                fontWeight: "bold",
              }}
            >
              Custom Text
            </div>
          </div> */}
          {/* <div style={{ position: "relative", display: "inline-block" }}>
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.7, 0.3, 0.2]}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              percent={percentage}
              arcPadding={0}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "12px",
                background: "#FF0000",
                borderRadius: "10px",
                paddingLeft: "6px",
                paddingTop: "3px",
                paddingRight: "6px",
                paddingBottom: "3px",
                fontWeight: "bold",
              }}
            >
              {getTextForPercentage(percentage)}
            </div>
          </div> */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={420}
              arcsLength={[0.7, 0.2, 0.4]}
              colors={["#5BE12C", "#F5CD19", "#EA4228"]}
              percent={percentage}
              arcPadding={0}
              cornerRadius={0}
              arcWidth={0.3}
              animateDuration={5000}
            />
            <div
              style={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "12px",
                background: backgroundColor,
                borderRadius: "10px",
                paddingLeft: "6px",
                paddingTop: "3px",
                paddingRight: "6px",
                paddingBottom: "3px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {text}
            </div>
          </div>
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
