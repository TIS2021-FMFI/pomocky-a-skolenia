import { Box, Button } from "@mui/material";
import { useState } from "react";
import { getStore } from "../../store/store";
import CoursesTableWrapper from "../components/CoursesTableWrapper";
import PridajSkolenieZamestnancoviModal from "../components/PridajSkolenieZamestnancoviModal";
import SkolenieModal from "../components/SkolenieModal";
import UpravSkolenieModal from "../components/UpravSkolenieModal";

const CoursesTab = () => {
  const { skoleniaZamestnancov } = getStore();

  // const [nameInput, setNameInput] = useState<string>("");
  // const [surnameInput, setSurnameInput] = useState<string>("");
  // const [skolenieInput, setSkolenieInput] = useState<string>("");
  const [showAddSkolenieModal, setShowAddSkolenieModal] =
    useState<boolean>(false);
  const [showUpravSkolenieModal, setShowUpravSkolenieModal] =
    useState<boolean>(false);

  const [showPridajSkolenieZamestnancovi, setShowPridajSkolenieZamestnancovi] =
    useState<boolean>(false);

  const columns = Object.keys(skoleniaZamestnancov[0] || []).map((k) => {
    return {
      id: k,
      label: k,
      minWidth: 120,
      format: null,
    };
  });
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        style={{ width: "fit-content" }}
      >
        <Box display={"flex"} flexDirection={"row"}>
          {/* <TextField
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
          /> */}
          <Button
            onClick={() => setShowAddSkolenieModal(true)}
            variant="contained"
          >
            Pridaj skolenie
          </Button>
          <Button
            onClick={() => setShowUpravSkolenieModal(true)}
            variant="contained"
          >
            Uprav skolenie
          </Button>
          <Button
            onClick={() => setShowPridajSkolenieZamestnancovi(true)}
            variant="contained"
          >
            Pridaj skolenie zamestnancom
          </Button>
        </Box>
        <CoursesTableWrapper columns={columns} rows={skoleniaZamestnancov} />
      </Box>
      <SkolenieModal
        open={showAddSkolenieModal}
        handleClose={() => setShowAddSkolenieModal(false)}
      />
      <UpravSkolenieModal
        open={showUpravSkolenieModal}
        handleClose={() => setShowUpravSkolenieModal(false)}
      />
      <PridajSkolenieZamestnancoviModal
        open={showPridajSkolenieZamestnancovi}
        handleClose={() => setShowPridajSkolenieZamestnancovi(false)}
      />
    </>
  );
};

export default CoursesTab;
