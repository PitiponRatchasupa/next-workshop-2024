// "use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ReactNode, useState } from "react";

interface ModalProps {
  initialData: any;
  isEdit: boolean;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, remark: string) => void;
  onEdit: (id: number, name: string, remark: string) => void;
  children?: ReactNode;
}
const FoodTypeModal: React.FC<ModalProps> = ({
  initialData,
  title,
  isOpen,
  isEdit = false,
  onClose,
  onSave,
  onEdit,
  children,
}) => {
  const [name, setName] = useState(initialData.name);
  const [remark, setRemark] = useState(initialData.remark);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={350}>
          <DialogTitle variant="h6">{title}</DialogTitle>
          <DialogContent dividers>
            {initialData.id != null && (
              <>
                <TextField
                  id="outlined-basic"
                  label="รหัส"
                  variant="standard"
                  value={initialData.id}
                  disabled={true}
                  sx={{ marginBottom: 2 }}
                />
              </>
            )}
            <TextField
              id="outlined-basic"
              label="ชื่อประเภท"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={name == "" ? "กรุณากรอกข้อมูล" : ""}
              error={name == ""}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="หมายเหตุ"
              variant="standard"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={onClose}>
              ยกเลิก
            </Button>
            <Button
              variant="outlined"
              color="success"
              disabled={name == ""}
              onClick={() =>
                isEdit
                  ? onEdit(initialData.id, name, remark)
                  : onSave(name, remark)
              }
            >
              บันทึก
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
export default FoodTypeModal;
