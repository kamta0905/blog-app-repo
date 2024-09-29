import React from "react";
import { Skeleton, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface SkeletonLoaderProps {
  type: "text" | "rectangular" | "circular" | "list" | "table" | "card";
  count?: number;
  height?: number | string;
  width?: number | string;
  variant?: "text" | "rectangular" | "circular";
}

const CustomSkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1, height, width, variant = "text" }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "text":
        return (
          <Box sx={{ width: "100%" }}>
            {[...Array(count)].map((_, index) => (
              <Skeleton key={index} variant={variant} width={width || "100%"} height={height} sx={{ my: 0 }} />
            ))}
          </Box>
        );
      case "rectangular":
        return <Skeleton variant="rectangular" width={width || "100%"} height={height || 118} />;
      case "circular":
        return <Skeleton variant="circular" width={width || 40} height={height || 40} />;
      case "list":
        return (
          <Box sx={{ width: "100%" }}>
            {[...Array(count)].map((_, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Box>
            ))}
          </Box>
        );
      case "table":
        return (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", mb: 1 }}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} variant="text" width="33%" sx={{ mr: 1 }} />
              ))}
            </Box>
            {[...Array(count)].map((_, rowIndex) => (
              <Box key={rowIndex} sx={{ display: "flex", mb: 1 }}>
                {[...Array(3)].map((_, colIndex) => (
                  <Skeleton key={colIndex} variant="text" width="33%" sx={{ mr: 1 }} />
                ))}
              </Box>
            ))}
          </Box>
        );
      case "card":
        return (
          <Box sx={{ width: width || 300, my: 2 }}>
            <Skeleton variant="rectangular" width="100%" height={140} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return <>{renderSkeleton()}</>;
};

export default CustomSkeletonLoader;
