import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import PitchCenter from "./pages/pitchCenter/PitchCenter";
import List from "./pages/list/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/pitchCenters" element={<List/>}/>
        <Route path="/pitchCenters/:id" element={<PitchCenter/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
