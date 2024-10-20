import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import CustomInput from "../../../../components/atoms/CustomInput";
import PrimaryButton from "../../../../components/atoms/PrimaryButton";
import InputErrorMsg from "../../../../components/atoms/InputErrorMsg";
import validationSchemas from "../../../../utils/ValidationSchema";
import { useAuth } from "../../../../contexts/AuthContext";
import { admin } from "../../../../API";
import Grid from "@mui/material/Grid2";
import ProfileSkeleton from "../ProfileSkeleton";
import CustomSelect from "../../../../components/atoms/CustomSelect";
import { formatDate } from "../../../../utils/DateFormat";

const ProfileForm = ({ setActiveSinceDate }: any) => {
  const { showSnackbar } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formFields = [
    { name: "fullName", type: "text", label: "Full Name" },
    { name: "email", type: "email", label: "Email" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    { name: "profession", type: "text", label: "Profession" },
    { name: "dateOfBirth", type: "date", label: "Date of Birth" },
    { name: "bio", type: "text", label: "Bio" },
  ];

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      profession: "",
      bio: "",
    },
    validationSchema: validationSchemas.profile,
    onSubmit: async (values) => {
      try {
        const res = await admin.updateProfile({
          name: values.fullName,
          email: values.email,
          gender: values.gender,
          dateOfBirth: values.dateOfBirth,
          bio: values.bio,
          profession: values.profession,
        });
        console.log("res", res);
        if (res) {
          showSnackbar("Profile updated successfully!", "success");
          setIsEditing(false);
        } else {
          console.error("Profile update failed:", res);
          showSnackbar("Profile update failed. Please try again.", "error");
        }
      } catch (error) {
        console.error("An error occurred during profile update:", error);
        showSnackbar("An unexpected error occurred. Please try again.", "error");
      }
    },
  });

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const res = await admin.getProfile();
      setActiveSinceDate(res.data.user.createdAt);
      if (res) {
        formik.setValues({
          fullName: res.data.user.name || "",
          email: res.data.user.email || "",
          gender: res.data.user.gender || "",
          dateOfBirth: formatDate(res.data.user.dateOfBirth) || "01-10-1999",
          bio: res.data.user.bio || "",
          profession: res.data.user.profession || "",
        });
      } else {
        console.error("Failed to fetch profile data:", res.message);
        showSnackbar("Failed to load profile data. Please try again.", "error");
      }
    } catch (error) {
      console.error("An error occurred while fetching profile data:", error);
      showSnackbar("An error occurred while loading profile data. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    formik.resetForm();
    fetchProfileData();
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {formFields.map((field) => (
          <Grid size={6} key={field.name}>
            <div>
              {field.type === "select" ? (
                <CustomSelect
                  label={field.label}
                  options={field.options}
                  value={formik.values[field.name as keyof typeof formik.values]}
                  onChange={(value) => formik.setFieldValue(field.name, value)}
                  onBlur={formik.handleBlur}
                  name={field.name}
                  disabled={!isEditing}
                />
              ) : (
                <CustomInput
                  label={field.label}
                  placeholder={field.label}
                  type={field.type}
                  name={field.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name as keyof typeof formik.values]}
                  disabled={!isEditing || field.name === "email"}
                />
              )}
              {isEditing &&
                formik.touched[field.name as keyof typeof formik.touched] &&
                formik.errors[field.name as keyof typeof formik.errors] && (
                  <InputErrorMsg>{formik.errors[field.name as keyof typeof formik.errors]}</InputErrorMsg>
                )}
            </div>
          </Grid>
        ))}
      </Grid>
      {isEditing ? (
        <Grid container spacing={2}>
          <Grid size={6}>
            <PrimaryButton label="Save Changes" disabled={formik.isSubmitting} type="submit" />
          </Grid>
          <Grid size={6}>
            <PrimaryButton label="Cancel" onClick={handleCancel} type="button" />
          </Grid>
        </Grid>
      ) : (
        <PrimaryButton label="Edit Profile" onClick={handleEdit} type="button" />
      )}
    </form>
  );
};

export default ProfileForm;
