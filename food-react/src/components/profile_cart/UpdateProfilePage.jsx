// import { useState, useEffect, useRef } from 'react';
// import ApiService from '../../services/ApiService';
// import { useNavigate } from 'react-router-dom';
// import { useError } from '../common/ErrorDisplay';



// const UpdateProfilePage = () => {

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');

//     const [profileImage, setProfileImage] = useState(null); // this will hold a multimedia fil to upload

//     const [previewImage, setPreviewImage] = useState(''); //this will hold the exisitng profile url from the response

//     const fileInputRef = useRef(null); // useRef can be used to reference a DOM element directly

//     const navigate = useNavigate();
//     const { ErrorDisplay, showError } = useError();


//     useEffect(() => {

//         const fetchUserProfile = async () => {

//             try {
//                 const response = await ApiService.myProfile();
//                 if (response.statusCode === 200) {

//                     const userData = response.data;
//                     setName(userData.name);
//                     setEmail(userData.email);
//                     setPhoneNumber(userData.phoneNumber);
//                     setAddress(userData.address);
//                     setPreviewImage(userData.profileUrl);
//                 }

//             } catch (error) {
//                 showError(error.response?.data?.message || error.message);
//             }
//         }

//         fetchUserProfile();
//     }, [])


//     const handleImageChange = (e) => {

//         const file = e.target.files[0];
//         if (file) {
//             setProfileImage(file)
//             setPreviewImage(URL.createObjectURL(file))
//         }
//     }

//     //Programmatically triggers a click on the hidden file input.
//     const triggerFileInput = () => {
//         fileInputRef.current.click()
//     };

//     const handleUpdateProfile = async (e) => {
//         e.preventDefault();

//         if (!window.confirm('Are you sure you want to update your profile?')) {
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('email', email);
//             formData.append('phoneNumber', phoneNumber);
//             formData.append('address', address);

//             if (profileImage) {
//                 formData.append('imageFile', profileImage)
//             }

//             const response = await ApiService.updateProfile(formData);

//             if (response.statusCode === 200) {
//                 navigate("/profile");
//             }

//         } catch (error) {
//             showError(error.response?.data?.message || error.message);
//         }
//     }


//     const handleDeactivateProfile = async () => {

//         if (!window.confirm('Are you sure you want to Close your account? This action cannot be undone.')) {
//             return;
//         }

//         try {
//             const response = await ApiService.deactivateProfile();

//             if (response.statusCode === 200) {
//                 ApiService.logout();
//                 navigate('/home')
//             }

//         } catch (error) {
//             showError(error.response?.data?.message || error.message);

//         }
//     }

//     return (
//         <div className="profile-container">
//             <ErrorDisplay />

//             <div className="profile-header">
//                 <h1 className="profile-title">Update Profile</h1>
//                 <div className="profile-image-container">
//                     <img
//                         src={previewImage}
//                         alt="Profile"
//                         className="profile-image"
//                         onClick={triggerFileInput}
//                     />
//                     <input
//                         type="file"
//                         ref={fileInputRef} //pointing to the actual DOM element
//                         onChange={handleImageChange}
//                         accept="image/*"
//                         style={{ display: 'none' }}
//                     />
//                     <button
//                         className="profile-image-upload"
//                         onClick={triggerFileInput}
//                     >
//                         Change Photo
//                     </button>
//                 </div>
//             </div>


//             <form className="profile-form" onSubmit={handleUpdateProfile}>
//                 <div className="form-grid">
//                     <div className="profile-form-group">
//                         <label htmlFor="name" className="profile-form-label">Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="profile-form-input"
//                             required
//                         />
//                     </div>
//                     <div className="profile-form-group">
//                         <label htmlFor="email" className="profile-form-label">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="profile-form-input"
//                             required
//                         />
//                     </div>
//                     <div className="profile-form-group">
//                         <label htmlFor="phoneNumber" className="profile-form-label">Phone:</label>
//                         <input
//                             type="tel"
//                             id="phoneNumber"
//                             value={phoneNumber}
//                             onChange={(e) => setPhoneNumber(e.target.value)}
//                             className="profile-form-input"
//                             required
//                         />
//                     </div>
//                     <div className="profile-form-group">
//                         <label htmlFor="address" className="profile-form-label">Address:</label>
//                         <input
//                             type="text"
//                             id="address"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             className="profile-form-input"
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="form-actions">
//                     <button type="submit" className="btn btn-primary">
//                         Update Profile
//                     </button>
//                     <button
//                         type="button"
//                         className="btn btn-danger"
//                         onClick={handleDeactivateProfile}
//                     >
//                         Deactivate Account
//                     </button>
//                 </div>
//             </form>



//         </div>
//     )


// }
// export default UpdateProfilePage;



import { useState, useEffect, useRef } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { useError } from '../common/ErrorDisplay';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { ErrorDisplay, showError } = useError();

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.myProfile();
        if (response.statusCode === 200) {
          const userData = response.data;
          setName(userData.name);
          setEmail(userData.email);
          setPhoneNumber(userData.phoneNumber);
          setAddress(userData.address);
          setPreviewImage(userData.profileUrl);
        }
      } catch (error) {
        showError(error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const doUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('address', address);
      if (profileImage) formData.append('imageFile', profileImage);

      const response = await ApiService.updateProfile(formData);
      if (response.statusCode === 200) {
        navigate('/profile');
      }
    } catch (error) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const doDeactivateProfile = async () => {
    try {
      const response = await ApiService.deactivateProfile();
      if (response.statusCode === 200) {
        ApiService.logout();
        navigate('/home');
      }
    } catch (error) {
      showError(error.response?.data?.message || error.message);
    }
  };

  const openModal = (title, message, action) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalAction(() => action);
    setModalOpen(true);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    openModal(
      'Update Profile',
      'Are you sure you want to update your profile?',
      doUpdateProfile
    );
  };

  const handleDeactivateProfile = () => {
    openModal(
      'Deactivate Account',
      'Are you sure you want to close your account? This action cannot be undone.',
      doDeactivateProfile
    );
  };

  return (
    <div className="profile-container">
      <ErrorDisplay />

      <ConfirmationModal
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onConfirm={() => {
          setModalOpen(false);
          if (modalAction) modalAction();
        }}
        onCancel={() => setModalOpen(false)}
      />

      <div className="profile-header">
        <h1 className="profile-title">Update Profile</h1>
        <div className="profile-image-container">
          <img
            src={previewImage}
            alt="Profile"
            className="profile-image"
            onClick={triggerFileInput}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button className="profile-image-upload" onClick={triggerFileInput}>
            Change Photo
          </button>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleUpdateProfile}>
        <div className="form-grid">
          <div className="profile-form-group">
            <label htmlFor="name" className="profile-form-label">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-form-input"
              required
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="email" className="profile-form-label">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="profile-form-input"
              required
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="phoneNumber" className="profile-form-label">Phone:</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="profile-form-input"
              required
            />
          </div>
          <div className="profile-form-group">
            <label htmlFor="address" className="profile-form-label">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="profile-form-input"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeactivateProfile}
          >
            Deactivate Account
          </button>
        </div>
      </form>

      {/* Inline CSS for modal */}
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          z-index: 9999;
        }
        .modal-box {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          animation: popup 0.2s ease-out;
        }
        .modal-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .modal-message {
          font-size: 0.95rem;
          color: #444;
          margin-bottom: 20px;
        }
        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .modal-btn {
          padding: 8px 14px;
          border-radius: 5px;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease;
        }
        .modal-btn.cancel {
          background: #e5e5e5;
        }
        .modal-btn.cancel:hover {
          background: #d4d4d4;
        }
        .modal-btn.confirm {
          background: #dc2626;
          color: #fff;
        }
        .modal-btn.confirm:hover {
          background: #b91c1c;
        }
        @keyframes popup {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default UpdateProfilePage;







