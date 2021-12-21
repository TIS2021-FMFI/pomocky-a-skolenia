import { Box, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { DUMMY_DATA } from "../../testData";
import { EmployeeData } from "../../types";
import AddEmployeeModal from "../components/AddEmployeeModal";
import TableWrapper from "../components/TableWrapper";

const EmployeeTab = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [surnameInput, setSurnameInput] = useState<string>("");
  const [idInput, setIdInput] = useState<number>(-1);
  const [allData, setAllData] = useState<EmployeeData[]>(DUMMY_DATA);
  const [dataToShow, setDataToShow] = useState(DUMMY_DATA);
  const [skolenieInput, setSkolenieInput] = useState<string>("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] =
    useState<boolean>(false);

  const columns = Object.keys(DUMMY_DATA[0]).map((k) => {
    return {
      id: k,
      label: k,
      minWidth: 120,
      format: null,
    };
  });

  const [columnsToShow, setColumnsToShow] = useState(columns);

  useEffect(() => {
    setDataToShow(
      allData.filter((row) => {
        return (
          row["meno"].toLowerCase().startsWith(nameInput) &&
          row["priezvisko"].toLowerCase().startsWith(surnameInput) &&
          (idInput === -1 ? true : row["id"] === idInput)
        );
      })
    );
  }, [nameInput, idInput, surnameInput, allData]);

  useEffect(() => {
    setColumnsToShow(
      columns.filter((col) => {
        return (
          col["id"] === "meno" ||
          col["id"] === "priezvisko" ||
          col["id"] === "id" ||
          col["id"].toLowerCase().startsWith(skolenieInput)
        );
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skolenieInput, allData]);

  const handleAddEmployee = (data: EmployeeData) => {
    setAllData([...allData, data]);
  };

  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} flexDirection={"row"}>
          <TextField
            id="ID"
            label="ID"
            type="number"
            defaultValue=""
            onChange={(e) =>
              setIdInput(e.target.value !== "" ? parseInt(e.target.value) : -1)
            }
          />
          <TextField
            id="Meno"
            label="Meno"
            defaultValue=""
            onChange={(e) => setNameInput(e.target.value.toLowerCase())}
          />
          <TextField
            id="Priezvisko"
            label="Priezvisko"
            defaultValue=""
            onChange={(e) => setSurnameInput(e.target.value.toLowerCase())}
          />
          <TextField
            id="Skolenie"
            label="Skolenie"
            defaultValue=""
            onChange={(e) => setSkolenieInput(e.target.value.toLowerCase())}
          />
          <Button onClick={() => setShowAddEmployeeModal(true)}>
            Pridaj zamestnanca
          </Button>
        </Box>
        <TableWrapper rows={dataToShow} columns={columnsToShow} />
      </Box>
      <AddEmployeeModal
        open={showAddEmployeeModal}
        handleClose={() => setShowAddEmployeeModal(false)}
        handleSubmit={handleAddEmployee}
      />
    </>
  );
};

export default EmployeeTab
