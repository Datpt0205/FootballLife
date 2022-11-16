import {
  faCalendarDays,
  faPerson,
  faFootball,
  faMap,
  faUserFriends,
  faCloudSunRain
} from "@fortawesome/free-solid-svg-icons";
import {FaFootballBall} from "react-icons/fa"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    person: 5,
    pitch: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/pitchCenters", { state: { destination, dates, options } });
  };

  const handleClickBook = () => {
    navigate("/")
  }
  const handleClickMap = () => {
    navigate("/map")
  }
  const handleClickMatch = () => {
    navigate("/match")
  }
  const handleClickWeather = () => {
    navigate("/weather")
  }

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faFootball}  />
            <span button onClick={handleClickBook}>Booking</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faMap} />
            <span button onClick = {handleClickMap}>Map</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUserFriends} />
            <span button onClick = {handleClickMatch}>Matches</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCloudSunRain} />
            <span button onClick = {handleClickWeather}>Weather</span>
          </div>
        </div>
        {type !== "list" && (
          <>
           <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your activities – unlock instant savings of 10% or
              more with a free REFU account
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <input
                  type="text"
                  placeholder="Where you wanna rent?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    className="date"
                    ranges={dates}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.person} person · ${options.pitch} pitch`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Person</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.person <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("person", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.person}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("person", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Pitch</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.pitch <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("pitch", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.pitch}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("pitch", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
