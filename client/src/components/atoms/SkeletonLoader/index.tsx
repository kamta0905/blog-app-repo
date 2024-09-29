import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import "./SkeletonLoader.css";

type SkeletonLoaderProps = {
  variant?: "text" | "rectangular" | "circular";
  animation?: "pulse" | "wave" | false;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = "text",
  animation = "pulse",
  width = "100%",
  height,
  className = "",
}) => {
  const classNames = `skeleton-loader ${className}`;
  return (
    <Box className={classNames}>
      <Skeleton variant={variant} animation={animation} width={width} height={height} />
    </Box>
  );
};

export default SkeletonLoader;
