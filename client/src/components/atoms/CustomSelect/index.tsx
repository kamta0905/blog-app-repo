import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options?: Option[]; // Make options optional
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  disabled?: boolean;
  minWidth?: number;
  fullWidth?: boolean;
}

export default function CustomSelect({
  label,
  options = [],
  value,
  onChange,
  onBlur,
  name,
  disabled = false,
  minWidth = 120,
  fullWidth = true,
}: CustomSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: minWidth }}>
      <FormControl fullWidth={fullWidth}>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value as string}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
