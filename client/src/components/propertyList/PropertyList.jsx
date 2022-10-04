import "./propertyList.css";
import useFetch from "../../hooks/useFetch"
// import sportCenter from "../images/sportcenter.jpg";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/pitchCenters/countByType");
  const images = [
    ""
  ]
  return (
    <div className="pList">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data && 
            images.map((img, i) => {
              <div className="pListItem">
                <img src={img} alt ="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i].type}</h1>
                  <h2>{data[i].count} {data[i].type}</h2>
                </div>
              </div>
            })
          }
        </>
      )}
    </div>
  );
};

export default PropertyList;
