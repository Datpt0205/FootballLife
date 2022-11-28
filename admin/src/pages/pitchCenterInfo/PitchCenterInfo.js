import "./pitchCenterInfo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {useLocation} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";

const PitchCenterInfo = ({item}) => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {data, loading, error } = useFetch(`/pitchCenters/find/${id}`)
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src = {data.photos}
                className = "itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{data.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance:</span>
                  <span className="itemValue">{data.distance}m from city center</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">CheapestPrice:</span>
                  <span className="itemValue">{data.cheapestPrice}$</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchCenterInfo;
