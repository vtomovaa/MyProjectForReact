import "./MyOrchids.css";
import * as orchidService from "../../services/orchidService.jsx";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext.jsx";

const MyOrchid = () => {
    const { email } = useContext(AuthContext);

   const [orchids, setOrchids] = useState([]);

    useEffect(() => {
        orchidService.getAll()
            .then(result => setOrchids(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    const myOrchids = orchids.filter(
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
                <button onClick={() => onPageChange(orchid._id)}>Details</button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default MyOrchid;
