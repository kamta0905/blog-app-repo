import React, { useState } from "react";
import CustomInput from "../../../../components/atoms/CustomInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
const SignUpForm = () => {
  const formFields = [
    { name: "fullName", type: "text", label: "Full Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  return (
    <form>
      {formFields.map((field: any) => {
        return (
          <div key={field.name}>
            <CustomInput
              label={field.label}
              placeholder={field.label}
              type={field.type}
              name={field.name}
              onChange={handleChange}
            />
          </div>
        );
      })}
      <PrimaryButton label="Submit" />
    </form>
  );
};

export default SignUpForm;
