import { useAuth } from "../../../contexts/AuthContext";
import CustomSnackbar from "../../atoms/CustomSnackbar";

const SnackbarWrapper = () => {
  const { snackbar, hideSnackbar } = useAuth();
  return (
    <>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        severity={snackbar.severity}
      />
    </>
  );
};

export default SnackbarWrapper;
