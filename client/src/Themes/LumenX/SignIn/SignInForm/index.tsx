import React from "react";
import { useFormik } from "formik";
import CustomInput from "../../../../components/atoms/CustomInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import InputErrorMsg from "../../../../components/atoms/InputErrorMsg";
import validationSchemas from "../../../../utils/ValidationSchema";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { admin } from "../../../../API";

const SignInForm = () => {
  const { login, showSnackbar } = useAuth();
  const navigate = useNavigate();

  const formFields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemas.login,
    onSubmit: async (values) => {
      try {
        const res = (await admin.signIn({
          email: values.email,
          password: values.password,
        })) as any;

        if (res && res.accessToken) {
          login(res.accessToken);
          navigate("/");
          showSnackbar("Successfully signed in!", "success");
        } else {
          console.log("Login failed:", res.message);
          showSnackbar("Login failed. Please check your credentials.", "error");
          formik.setErrors({ email: res.message });
        }
      } catch (error) {
        console.log("An error occurred during sign in:", error);
        formik.setErrors({ email: "An unexpected error occurred. Please try again." });
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

export default SignInForm;
