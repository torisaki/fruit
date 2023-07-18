import { Route, Routes} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Contact from './components/Contact';
import About from './components/About';
import Detail1 from './components/Detail1';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Protected from './components/Protected';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import Edit from './components/Edit';
import Cart from './components/Cart';


function App() {
  return (
    <div className="App">
      
      <Navigation/>
      
     
      <Routes>     
        <Route path='/' exact element={<MainPage/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/detail/:id' element={<Detail1/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Dashboard' element={<Protected><Dashboard/></Protected>}></Route>
        <Route path='/Add' element={<Protected><Add/></Protected>}></Route>
        <Route path='Dashboard/Edit/:id' element={<Protected><Edit/></Protected>}></Route>
        <Route path='/Cart' element={<Protected><Cart/></Protected>}></Route>
      </Routes>  

      
      
      <Footer/>
      
    </div>
  );
}

export default App;
