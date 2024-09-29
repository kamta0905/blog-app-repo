import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomSkeletonLoader from "../../../components/atoms/CustSkeletonLoader";

const ProfileSkeleton: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid size={6} key={index}>
            <CustomSkeletonLoader type="text" height={90} />
          </Grid>
        ))}
      </Grid>
      <Box>
        <CustomSkeletonLoader type="rectangular" height={50} />
      </Box>
    </>
  );
};

export default ProfileSkeleton;
