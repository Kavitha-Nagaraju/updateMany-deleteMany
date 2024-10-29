import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import TopNavigation from './components/TopNavigation';
import EditProfile from './components/EditProfile';
import Leaves from './components/Leaves';
import Tasks from './components/Tasks';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/topnavigation" element={<TopNavigation/>}></Route>
      <Route path="/editprofile" element={<EditProfile/>}></Route>
      <Route path="/leaves" element={<Leaves/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
