import { Arwes, SoundsProvider, ThemeProvider, createSounds, createTheme } from 'arwes'
import { BrowserRouter as Router } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import React, { useEffect } from 'react'
import { theme, resources, sounds } from './settings'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { PrimeReactProvider } from 'primereact/api'

const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }, [])

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={createTheme(theme)}>
            <SoundsProvider sounds={createSounds(sounds)}>
              <Arwes animate>
                <Router>
                  <AppLayout resources={resources} />
                </Router>
              </Arwes>
            </SoundsProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

export default App
