import {
  Arwes,
  SoundsProvider,
  ThemeProvider,
  createSounds,
  createTheme,
} from "arwes";
import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import React, { useEffect, useState } from "react";
import { theme, resources, sounds } from "./settings";
import "./App.css";

const App = () => {
  useEffect(() => {
    document.documentElement.requestFullscreen();
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Arwes animate>
          {(anim) => (
            <Router>
              <AppLayout show={anim.entered} resources={resources} />
            </Router>
          )}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
};

export default App;
