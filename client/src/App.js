import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import PitchCenter from "./pages/pitchCenter/PitchCenter";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import OnBoarding from "./pages/onBoarding/OnBoarding";
import Paypal from "./pages/paypal/Paypal";
import Maps from "./pages/map/Maps";
import Weather from "./pages/weather/Weather";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/onboarding" element={<OnBoarding/>}/>
        <Route path="/pitchCenters" element={<List/>}/>
        <Route path="/pitchCenters/:id" element={<PitchCenter/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/paypal" element={<Paypal/>}/>
        <Route path="/map" element={<Maps />}/>
        <Route path="/weather" element={<Weather />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
