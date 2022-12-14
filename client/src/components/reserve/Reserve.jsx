import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, pitchCenterId }) => {
  const [selectedPitches, setSelectedPitches] = useState([]);
  const { data, loading, error } = useFetch(`/pitchCenters/pitch/${pitchCenterId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (pitchNumber) => {
    const isFound = pitchNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedPitches(
      checked
        ? [...selectedPitches, value]
        : selectedPitches.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedPitches.map((pitchId) => {
          const res = axios.put(`/pitches/availability/${pitchId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/paypal");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faClose}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your pitches:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.description}</div>
              <div className="rPrice">Price: ${item.price}</div>
            </div>
            <div className="rSelectPitches">
              {item.pitchNumbers.map((pitchNumber) => (
                <div className="room">
                  <label>{pitchNumber.number}</label>
                  <input
                    type="checkbox"
                    value={pitchNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(pitchNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
