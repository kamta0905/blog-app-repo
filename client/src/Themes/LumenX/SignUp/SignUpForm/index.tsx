import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../components/atoms/CustomInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import InputErrorMsg from "../../../../components/atoms/InputErrorMsg";
import validationSchemas from "../../../../utils/ValidationSchema";

const SignUpForm = () => {
  const formFields = [
    { name: "fullName", type: "text", label: "Full Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirmPassword", type: "password", label: "Confirm Password" },
  ];
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemas.register,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name}>
          <CustomInput
            label={field.label}
            placeholder={field.label}
            type={field.type}
            name={field.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name as keyof typeof formik.values]}
          />
          {formik.touched[field.name as keyof typeof formik.touched] &&
            formik.errors[field.name as keyof typeof formik.errors] && (
              <InputErrorMsg>{formik.errors[field.name as keyof typeof formik.errors]}</InputErrorMsg>
            )}
        </div>
      ))}
      <PrimaryButton label="Submit" type="submit" />
    </form>
  );
};

export default SignUpForm;
