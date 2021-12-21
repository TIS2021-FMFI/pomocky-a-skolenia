import BeforeExpireTableWrapper from "../components/BeforeExpireTableWrapper"
import { CoursesBeforeExpireColumns } from "../../constants"
import { expCourses } from "../../testData"

const CoursesBeforeExpireTab = () => {
    return(
        <BeforeExpireTableWrapper columns={CoursesBeforeExpireColumns} rows={expCourses}/>
    )
}
export default CoursesBeforeExpireTab