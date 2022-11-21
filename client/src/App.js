import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PitchCenter from "./pages/pitchCenter/PitchCenter";
import List from "./pages/list/List";
import AuthLayout from "./pages/authLayout/AuthLayout";
import Paypal from "./pages/paypal/Paypal";
import Maps from "./pages/map/Maps";
import Weather from "./pages/weather/Weather";
import ActivateLayout from "./pages/activateLayout/ActivateLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pitchCenters" element={<List />} />
        <Route path="/pitchCenters/:id" element={<PitchCenter />} />
        <Route path="/login" element={<AuthLayout/>} />
        <Route path="/paypal" element={<Paypal />} />
        <Route path="/map" element={<Maps />} />
        <Route path="/weather" element={<Weather />} />
        <Route
          path="api/auth/activate/:activation_token"
          exact
          element={<ActivateLayout />}
        />
        {/* <Route path="/match" element={<Match/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
