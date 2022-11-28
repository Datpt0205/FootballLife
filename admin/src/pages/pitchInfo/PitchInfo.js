import "./pitchInfo.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {useLocation} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";

const PitchInfo = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {data, loading, error } = useFetch(`/pitches/find/${id}`)
  
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
              <div className="details">
                <h1 className="itemTitle">{data.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{data.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.price}$</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Pitch number:</span>
                  <span className="itemValue">{data.pitchNumbers}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchInfo;
