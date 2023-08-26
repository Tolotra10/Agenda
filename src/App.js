import React from 'react';
// import GoogleDrivePicker from './components/GoogleDrivePicker';
import {Routes,Route} from 'react-router-dom'
import Calendar from './components/Calendar';


const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/drive" element={<GoogleDrivePicker/>}></Route> */}
        <Route path="/" element={<Calendar/>}></Route>
      </Routes>
    </div>
  );
};

export default App;