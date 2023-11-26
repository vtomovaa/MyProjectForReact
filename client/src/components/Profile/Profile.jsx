import "./Profile.css";

const Profile = ({ orchids, isEmpty, isLoading, onPageChange, currentPage }) => {
  return (
    <div className="profile-container">
      <div className="title">
        {/* <h1>{orchids?.length > 0 && 'MY ORCHIDS'}</h1> */}
        <h1>My Orchids</h1>
        <h1>{isEmpty && orchids?.length === 0 && 'NO ORCHIDS TO SHOW'}</h1>
        <h1>{isLoading && 'Loading...'}</h1>
      </div>
      <section>
        {orchids && (
          orchids.map(orchid => (
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
      {isLoading && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {orchids?.length > 10 && (
        <div className="pagination">
          <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
          <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
