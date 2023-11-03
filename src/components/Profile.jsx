import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { analytics, storage } from "../firebase-config";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { logEvent } from "firebase/analytics";

const Profile = () => {
  const user = useContext(AppContext);
  const [image, setImage] = React.useState(null);
  const [photoUrl, setPhotoUrl] = React.useState(
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
  );

  React.useEffect(() => {
    logEvent(analytics, "Profile_view");
  }, []);

  const uploadPicture = async (file) => {
    const fileRef = ref(storage, user?.uid + ".png");
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    console.log("THE URL IS", url);
    setPhotoUrl(url);
    updateProfile(user, { photoURL: url });
    toast.success("Image has been changed successfully");
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClick = () => {
    uploadPicture(image);
  };

  React.useEffect(() => {
    if (user?.photoURL) {
      setPhotoUrl(user?.photoURL);
    }
  }, [user?.photoURL]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <img src={photoUrl} alt="User Avatar" className="img-fluid rounded-circle mt-4 avatar" />
          <h3 className="mt-3">{user?.email}</h3>
          <hr />
          <h6>Update Photo</h6>
          <input type="file" className="form-control" placeholder="Choose Image" onChange={(e) => handleChange(e)} />
          <button disabled={!image} onClick={() => handleClick()}>
            Update Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
