import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { LogInPage } from './Components/LogInPage';
import SignUpPage from './Components/SignUpPage';
import UserPage from './Components/UserPage';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div >
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<LogInPage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/dashboard' element={<UserPage />}/>
          <Route path='*' element = {<h1>page not found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
