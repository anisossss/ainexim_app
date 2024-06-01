import React, { useState, useEffect } from 'react'
import { withStyles } from 'arwes'
import { selectUser } from '../../../redux/Auth/authSelectors'
import { useSelector } from 'react-redux'
import MacOSLayout from './layout/macOSLayout'
import WindowsLayout from './layout/windowsLayout'
import UbuntuLayout from './layout/ubuntuLayout'
import KaliLayout from './layout/kaliLayout'

const styles = (theme) => ({
  desktop: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    color: 'black',
    backgroundSize: 'cover',
  },
})
const MyDesktopDock = (props) => {
  const { classes } = props
  const userData = useSelector(selectUser)
  const userName = userData ? userData.name : 'User'
  const [selectedOS, setSelectedOS] = useState('macOS')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const selectOS = (os) => {
    setSelectedOS(os)
  }

  // Render the layout based on the selected OS
  const renderLayout = () => {
    switch (selectedOS) {
      case 'Windows':
        return (
          <WindowsLayout userName={userName} formattedTime={formattedTime} selectOS={selectOS} />
        )
      case 'Ubuntu':
        return (
          <UbuntuLayout userName={userName} formattedTime={formattedTime} selectOS={selectOS} />
        )
      case 'Kali':
        return <KaliLayout userName={userName} formattedTime={formattedTime} selectOS={selectOS} />
      default:
        return <MacOSLayout userName={userName} formattedTime={formattedTime} selectOS={selectOS} />
    }
  }

  return <div className={classes.desktop}>{renderLayout()}</div>
}

export default withStyles(styles)(MyDesktopDock)
