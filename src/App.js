
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from './checkout';
function App() {
 
  return (
    <div className="App">
  <BrowserRouter>
        <Routes> 
        <Route element={<Checkout />} path="/:id"></Route>

        </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
