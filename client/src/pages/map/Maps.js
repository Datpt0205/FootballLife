import React, { useState }from "react";
import MapHelper from "../../components/mapHelper/MapHelper";
import SearchBox from "../../components/mapHelper/SearchBox";


 const Maps = () => {

  const [selectPosition, setSelectedPosition] = useState(null)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width:"50vw", height:"100%"}}>
        <MapHelper selectPosition={selectPosition}/>
      </div>
      <div style={{border: "2px solid darkblue", width:"50vw"}}>
        <SearchBox selectPosition={selectPosition} setSelectedPosition={setSelectedPosition}/>
      </div>
    </div>
  );
}

export default Maps;
