import './App.css';
import BoardHome from '../src/components/BoardHome';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BoardDetail from './components/BoardDetail';
import BoardSubmit from './components/BoardSubmit';
import BoardList from './components/BoardList';
import BoardUpdate from './components/BoardUpdate';
// import BoardSearch from './components/BoardSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<BoardHome />} />
        <Route path='/list' element={<BoardList />} />
        <Route path='/:index/:search' element={<BoardList/>} />
        <Route path='/detail/:id' element={<BoardDetail/>} />
        <Route path='/submit' element={<BoardSubmit/>} />
        <Route path='/update/:id' element={<BoardUpdate/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;