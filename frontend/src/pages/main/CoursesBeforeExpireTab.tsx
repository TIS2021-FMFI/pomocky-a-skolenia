import BeforeExpireTableWrapper from '../components/BeforeExpireTableWrapper'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

const CoursesBeforeExpireTab = () => {
  const konciaceSkolenia = useSelector(
    (state: RootState) => state.konciaceSkolenia.value
  )

  const columns = Object.keys(konciaceSkolenia[0] || []).map((k) => {
    return {
      id: k,
      label: k,
      minWidth: 120,
      format: null,
    }
  })
  return <BeforeExpireTableWrapper columns={columns} rows={konciaceSkolenia} />
}
export default CoursesBeforeExpireTab
