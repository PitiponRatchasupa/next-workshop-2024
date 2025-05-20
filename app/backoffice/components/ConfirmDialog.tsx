import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  message: string;
  type: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}
const ConfirmDialog: React.FC<ModalProps> = ({
  title,
  message,
  type = "confirm",
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={onClose}>
            ยกเลิก
          </Button>
          {
            (type == "confirm" ? (
              <Button variant="outlined" color="success" onClick={onConfirm}>
                ตกลง
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={onConfirm}>
                ตกลง
              </Button>
            ))
          }
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ConfirmDialog;
