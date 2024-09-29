import { Box, Typography } from "@mui/material";
import React from "react";

interface DemoPageContentProps {
  pathname: string;
}

const PageContent: React.FC<DemoPageContentProps> = ({ pathname }) => {
  return <Typography>{pathname}</Typography>;
};

export default PageContent;
