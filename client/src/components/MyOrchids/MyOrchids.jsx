import "./MyOrchids.css";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { useOrchidsData } from "../../hooks/useOrchidsData.js";
import { Link } from "react-router-dom";


const MyOrchid = () => {
    const { email } = useContext(AuthContext);

    const { orchidsData, fetchOrchids } = useOrchidsData();

    useEffect(() => {
      fetchOrchids();
    }, []);
  

    const myOrchids = orchidsData.filter(
        (orchid) => orchid.owner === email);
        
  return (
    <div className="profile-container">
      <div className="title">
        {/* <h1>{orchids?.length > 0 && 'MY ORCHIDS'}</h1> */}
        <h1>My Orchids</h1>
        <h1>{myOrchids?.length === 0 && 'NO ORCHIDS TO SHOW'}</h1>
      </div>
      <section>
        {myOrchids && (
          myOrchids.map(orchid => (
            <article key={orchid._id}>
              {orchid?.imageUrl?.includes('http') ? (
                <div className="image">
                  {orchid.imageUrl.includes('http') && (
                    <>
                      {orchid.imageUrl.includes('res.cloudinary.com') ? (
                        <img src={orchid.imageUrl} className="uploadedImage" alt="no-img" />
                      ) : (
                        <img src={orchid.imageUrl} alt="no-img" />
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="image">
                  {orchid.orchidImages[0].imageUrl.includes('http') && (
                    <>
                      {orchid.orchidImages[0]?.imageUrl.includes('res.cloudinary.com') ? (
                        <img src={orchid.orchidImages[0].imageUrl} className="uploadedImage" alt="no-img" />
                      ) : (
                        <img src={orchid.orchidImages[0]} alt="no-img" />
                      )}
                    </>
                  )}
                </div>
              )}
              <div className="info">
                <h1>{orchid.type}</h1>
                <button className='btns'><Link className='details-card-btn' to={`/all-orchids/${orchid._id}`}>Details</Link></button>

              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default MyOrchid;
