import { Words, withStyles } from 'arwes'
import { Helmet } from 'react-helmet'
import TimelineFrame from '../../../components/world/desktop/TimelineFrame'
const styles = () => ({
  root: {
    width: 1200,
    marginLeft: '20%',
  },
  '@media (max-width: 800px)': {
    root: {
      margin: '0 12px',
    },
  },
})

const Timeline = () => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <TimelineFrame />
    </>
  )
}
export default withStyles(styles)(Timeline)
