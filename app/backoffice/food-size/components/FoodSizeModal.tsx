// "use client";
import {
  Autocomplete,
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
  foodTypes: [];
  isEdit: boolean;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, remark: string, foodTypeId: number, moneyAdded: number) => void;
  onEdit: (id: number, name: string, remark: string, foodTypeId: number, moneyAdded: number) => void;
  children?: ReactNode;
}
const FoodSizeModal: React.FC<ModalProps> = ({
  initialData,
  foodTypes,
  title,
  isOpen,
  isEdit = false,
  onClose,
  onSave,
  onEdit,
  children,
}) => {
  const [foodType, setFoodType] = useState(initialData?.foodType ?? null);
  const [name, setName] = useState(initialData?.name ?? "");
  const [moneyAdded, setMoneyAdded] = useState(initialData?.moneyAdded ?? "");
  const [remark, setRemark] = useState(initialData?.remark ?? "");

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
            {/* {initialData.id != null && (
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
            )} */}
            <Autocomplete
              sx={{ marginLeft: -1, marginBottom: 2 }}
              id="foodType"
              disableClearable
              getOptionLabel={(option) => option.name}
              options={foodTypes.map(({ id, name }) => ({ id, name }))}
              value={foodType}
              onChange={(event, value) => {
                setFoodType(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ประเภทอาหาร"
                  helperText={foodType == null ? "กรุณากรอกข้อมูล" : ""}
                  error={foodType == null}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                />
              )}
            />
            <TextField
              id="outlined-basic"
              label="ชื่อขนาด"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText={name == "" ? "กรุณากรอกข้อมูล" : ""}
              error={name == ""}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="ราคา"
              variant="standard"
              value={moneyAdded}
              onChange={(e) => setMoneyAdded(e.target.value)}
              helperText={moneyAdded == "" ? "กรุณากรอกราคา" : ""}
              error={moneyAdded == ""}
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
              disabled={name == "" || foodType == null}
              onClick={() =>
                isEdit
                  ? onEdit(initialData.id, name, remark, foodType.id, moneyAdded)
                  : onSave(name, remark, foodType.id, moneyAdded)
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
export default FoodSizeModal;
