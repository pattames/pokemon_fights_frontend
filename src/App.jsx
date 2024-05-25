import Landing from "./components/Landing";

import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';


function App() {

  const { theme } = useTheme();

  React.useEffect(() => {
    document.body.className = theme; // Assumes you have .dark and .light classes
  }, [theme]);

  return (
    <div>
          <Landing />
    </div>
  );
}

export default App;
