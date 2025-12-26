import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Form from './components/Form/Form.jsx';
import Detail from './components/Detail/Detail.jsx';
import './App.scss';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/create' element={<Form />} />
      <Route path='/game/:id' element={<Detail />} />
    </Routes>
  );
}

export default App;
