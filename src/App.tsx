import React from 'react';
import {Route,Routes, useLocation} from "react-router-dom"
import Home from './components/home';
import Details from './components/details';
import NotFoundPage from './components/notFoundpage';
import Header from './components/header';
import Toast from './common/toast';

function App() {
  const location = useLocation();
  let isShowHeader = false;
  if(location?.pathname === "/" || (location?.pathname.includes("/details") && !location?.pathname.includes("/",1))){
    isShowHeader = true; // ?fruit=
  }

  return (
    <div>
      {isShowHeader ? <Header /> : null}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/details' element={<Details />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
        <Toast />
    </div>
  );
}

export default App;
