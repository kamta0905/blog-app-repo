import React, { useState } from "react";
import CustomInput from "../../../../components/atoms/CustomInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";

const SignInForm = () => {
  const formFields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
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

export default SignInForm;
