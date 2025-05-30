"use client";
import { useEffect, useState } from "react";
import FoodSizeModal from "./components/FoodSizeModal";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/ModeEditOutline";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import config from "@/app/config";
import axios from "axios";
import { title } from "process";
import ConfirmDialog from "../components/ConfirmDialog";

export default function FoodType() {
  const initialConfirmDialog = {
    id: null,
    isOpen: false,
    type: "confirm",
    title: "ยืนยันทำรายการ",
    message: "คุณต้องการที่จะ บันทึก ใช่ หรือ ไม่",
  };

  const initialEdit = {
    id: null,
    isEdit: true,
    isOpen: false,
    name: "",
    remark: "",
    foodType: null,
    moneyAdded: null,
  };

  const [foodTypes, setFoodTypes] = useState([]);
  const [foodSizes, setFoodSizes] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] =
    useState(initialConfirmDialog);
  const [showModal, setShowModal] = useState(initialEdit);

  useEffect(() => {
    fetchData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const onSaveFoodSize = async (name: string, remark: string, foodTypeId: Number, moneyAdded: number) => {
    try {
      const payload = {
        name: name,
        remark: remark,
        foodTypeId: foodTypeId,
        moneyAdded: moneyAdded
      };

      const respone = await axios.post(
        config.apiServer + "/api/foodSize/create",
        payload
      );
      if (respone?.status == 200) {
        <Alert variant="filled" severity="success">
          บันทึกสำเร็จ.
        </Alert>;
        setShowModal(initialEdit);
        fetchData();
      } else {
        <Alert variant="filled" severity="error">
          บันทึกไม่สำเร็จสำเร็จ.
        </Alert>;
      }
    } catch (ex) {
      <Alert variant="filled" severity="error">
        บันทึกไม่สำเร็จสำเร็จ.
      </Alert>;
      // dialog error
    }
  };

  const onEditFoodSize = async (id: number ,name: string, remark: string, foodTypeId: Number, moneyAdded: number) => {
    try {
      const payload = {
        name: name,
        remark: remark,
        foodTypeId: foodTypeId,
        moneyAdded: moneyAdded
      };

      const respone = await axios.put(
        config.apiServer + "/api/foodSize/update/" + id,
        payload
      );
      if (respone?.status == 200) {
        <Alert variant="filled" severity="success">
          บันทึกสำเร็จ.
        </Alert>;
        setShowModal(initialEdit);
        fetchData();
      } else {
        <Alert variant="filled" severity="error">
          บันทึกไม่สำเร็จสำเร็จ.
        </Alert>;
      }
    } catch (ex) {
      <Alert variant="filled" severity="error">
        บันทึกไม่สำเร็จสำเร็จ.
      </Alert>;
      // dialog error
    }
  };

  const onRemoveFoodSize = async (id: any) => {
    try {

      const respone = await axios.delete(
        config.apiServer + "/api/foodSize/remove/" + id
      );
      if (respone?.status == 200) {
        <Alert variant="filled" severity="success">
          ลบรายการสำเร็จ.
        </Alert>;
        setShowConfirmDialog(initialConfirmDialog);
        fetchData();
      } else {
        <Alert variant="filled" severity="error">
          ลบรายการไม่สำเร็จสำเร็จ.
        </Alert>;
      }
    } catch (ex) {
      <Alert variant="filled" severity="error">
        ลบรายการไม่สำเร็จสำเร็จ.
      </Alert>;
      // dialog error
    }
  };

  const fetchData = async () => {
    const res = await axios.post(config.apiServer + "/api/foodType/list");
    setFoodTypes(res.data.dataList);

    const foodSizes = await axios.post(config.apiServer + "/api/foodSize/list");
    setFoodSizes(foodSizes.data.dataList);
  };
  return (
    <>
      <Grid container>
        <Grid size={12} sx={{ marginTop: 1, marginLeft: 1 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ขนาดอาหาร
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12} sx={{ marginTop: 1, marginLeft: 1 }}>
          <Card>
            <CardContent>
              <Grid size={12} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  onClick={() =>
                    setShowModal({
                      ...initialEdit,
                      isOpen: true,
                      isEdit: false,
                    })
                  }
                >
                  เพิ่มรายการ
                </Button>
              </Grid>
              <Grid size={12}>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>name</StyledTableCell>
                        <StyledTableCell align="right">remark</StyledTableCell>
                        <StyledTableCell>foodTypeName</StyledTableCell>
                        <StyledTableCell>moneyAdded</StyledTableCell>
                        <StyledTableCell align="right">action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foodSizes?.map((row: any) => (
                        <StyledTableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.remark}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.FoodType?.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.moneyAdded}
                          </TableCell>
                          <TableCell component="th" scope="row" align="right">
                            <Button
                              variant="outlined"
                              color="warning"
                              onClick={() => {
                                setShowModal({
                                  ...initialEdit,
                                  id: row.id,
                                  name: row.name,
                                  remark: row.remark,
                                  moneyAdded: row.moneyAdded,
                                  foodType: row.FoodType,
                                  isEdit: true,
                                  isOpen: true,
                                });
                              }}
                            >
                              <EditIcon sx={{ color: "wraning" }}></EditIcon>
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setShowConfirmDialog({
                                  ...initialConfirmDialog,
                                  id: row.id,
                                  isOpen: true,
                                  title: "ยืนยันการลบข้อมูล",
                                  message:
                                    "คุณการต้องที่จะลบข้อมูล ใช่ หรือ ไม่",
                                  type: "error",
                                });
                              }}
                            >
                              <DeleteOutlinedIcon
                                sx={{ color: "red" }}
                              ></DeleteOutlinedIcon>
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {showModal.isOpen && (
        <FoodSizeModal
          title={"เพิ่มประเภทอาหาร"}
          onClose={() => setShowModal(initialEdit)}
          foodTypes={foodTypes}
          isOpen={showModal.isOpen}
          onSave={(name, remark, foodTypeId, moneyAdded) => onSaveFoodSize(name, remark, foodTypeId, moneyAdded)}
          initialData={showModal}
          isEdit={showModal.isEdit}
          onEdit={(id, name, remarkม , foodTypeId, moneyAdded) => onEditFoodSize(id, name, remarkม , foodTypeId, moneyAdded)}
        ></FoodSizeModal>
      )}
      <ConfirmDialog
        title={showConfirmDialog.title}
        message={showConfirmDialog.message}
        type={showConfirmDialog.type}
        isOpen={showConfirmDialog.isOpen}
        onClose={() => {
          setShowConfirmDialog({
            ...showConfirmDialog,
            isOpen: false,
          });
        }}
        onConfirm={() => onRemoveFoodSize(showConfirmDialog.id)}
      ></ConfirmDialog>
    </>
  );
}
