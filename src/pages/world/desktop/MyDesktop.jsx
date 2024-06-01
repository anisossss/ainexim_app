import { withStyles } from 'arwes'

import { Words, Frame } from 'arwes'
import MyDekstopDock from '../../../components/world/desktop/MyDesktopDock'
import { Helmet } from 'react-helmet'

const styles = () => ({
  root: {},
  '@media (max-width: 800px)': {
    root: {
      margin: '0 12px',
    },
  },
})

const MyDesktop = (props) => {
  const { classes, className } = props
  return (
    <>
      <Helmet title="My Desktop | AINEXIM" />
      <MyDekstopDock />
    </>
  )
}

export default withStyles(styles)(MyDesktop)
