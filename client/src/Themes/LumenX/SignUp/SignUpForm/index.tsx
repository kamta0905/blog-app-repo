import React from "react";
import { useFormik } from "formik";
import CustomInput from "../../../../components/atoms/CustomInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import InputErrorMsg from "../../../../components/atoms/InputErrorMsg";
import validationSchemas from "../../../../utils/ValidationSchema";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { admin } from "../../../../API";

const SignUpForm = () => {
  const { login, showSnackbar } = useAuth();
  const navigate = useNavigate();
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
    onSubmit: async (values) => {
      try {
        const res = (await admin.signUp({
          email: values.email,
          password: values.password,
          name: values.fullName,
          isAdmin: 1,
        })) as any;

        if (res.success) {
          navigate("/login");
          showSnackbar("Successfully registered!", "success");
        } else {
          console.error("Registration failed:", res.message);
          showSnackbar("Registration failed. Please try again.", "error");
          formik.setErrors({ email: res.message || "Registration failed" });
        }
      } catch (error) {
        console.error("An error occurred during registration:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        formik.setErrors({ email: errorMessage });
        showSnackbar("An unexpected error occurred. Please try again.", "error");
      }
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
