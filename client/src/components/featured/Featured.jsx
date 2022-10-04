import "./featured.css";
import useFetch from "../../hooks/useFetch";
import DaNang from "../../images/danang.jpg"
import HaNoi from "../../images/hanoi.jpg"
import SaiGon from "../../images/saigon.jpg"


const Featured = () => {
  const { data, loading, error } = useFetch(
    "/pitchCenters/countByCity?cities=Da Nang,Ha Noi,Ho Chi Minh"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src={DaNang}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[0]} pitches</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src={HaNoi}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[1]} pitches</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src={SaiGon}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[2]} pitches</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
