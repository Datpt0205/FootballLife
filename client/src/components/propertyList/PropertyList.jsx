import "./propertyList.css";
import useFetch from "../../hooks/useFetch"
import sportCenter from "../../images/sportcenter.jpg";
import Personal from "../../images/personal.jpg";

const PropertyList = () => {

  const { data, loading, error } = useFetch("/pitchCenters/countByType");
  
  const images = [
    "https://hoacuongbac.danang.gov.vn/wp-content/uploads/2020/09/cung-the-thao-1.jpg",
    "https://images.pexels.com/photos/396300/pexels-photo-396300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  ]
  return (
    <div className="pList">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data && 
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt ="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
