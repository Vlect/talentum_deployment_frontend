import React from 'react';
import sytles from './app.module.css';
import  Weather from './components/weather';
const App = () => {
  return (
    <div className={sytles.app}>
      <Weather />
    </div>
  );
}

export default App;
