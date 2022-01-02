import { getStore } from "../../store/store";
import CoursesTableWrapper from "../components/CoursesTableWrapper";

const CoursesTab = () => {
  const { skoleniaZamestnancov } = getStore();

  const columns = Object.keys(skoleniaZamestnancov[0] || []).map((k) => {
    return {
      id: k,
      label: k,
      minWidth: 120,
      format: null,
    };
  });
  return <CoursesTableWrapper columns={columns} rows={skoleniaZamestnancov} />;
};

export default CoursesTab;
