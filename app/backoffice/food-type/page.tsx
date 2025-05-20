"use client";
import { useEffect, useState } from "react";
import FoodTypeModal from "./components/FoodTypeModal";
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
  };

  const [foodTypes, setFoodTypes] = useState([]);
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

  const onSaveFoodType = async (name: string, remark: string) => {
    try {
      const payload = {
        name: name,
        remark: remark,
      };

      const respone = await axios.post(
        config.apiServer + "/api/foodType/create",
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

  const onEditFoodType = async (id: number ,name: string, remark: string) => {
    try {
      const payload = {
        name: name,
        remark: remark,
      };

      const respone = await axios.put(
        config.apiServer + "/api/foodType/update/" + id,
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

  const onRemoveFoodType = async (id: any) => {
    try {

      const respone = await axios.delete(
        config.apiServer + "/api/foodType/remove/" + id
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
    console.log(foodTypes);
  };
  return (
    <>
      <Grid container>
        <Grid size={12} sx={{ marginTop: 1, marginLeft: 1 }}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ประเภทอาหารและเครื่องดื่ม
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
                        <StyledTableCell align="right">action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foodTypes?.map((row: any) => (
                        <StyledTableRow
                          key={row.name}
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
        <FoodTypeModal
          title={"เพิ่มประเภทอาหาร"}
          onClose={() => setShowModal(initialEdit)}
          isOpen={showModal.isOpen}
          onSave={(name, remark) => onSaveFoodType(name, remark)}
          initialData={showModal}
          isEdit={showModal.isEdit}
          onEdit={(id, name, remark) => onEditFoodType(id, name, remark)}
        ></FoodTypeModal>
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
        onConfirm={() => onRemoveFoodType(showConfirmDialog.id)}
      ></ConfirmDialog>
    </>
  );
}
