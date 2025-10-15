// import { useNavigate, Link } from "react-router-dom";
// import ApiService from "../../services/ApiService";

// const Navbar = () => {

//     const isAuthenticated = ApiService.isAthenticated();
//     const isAdmin = ApiService.isAdmin();
//     const isCustomer = ApiService.isCustomer();
//     const isDeliveryPerson = ApiService.isDeliveryPerson();
//     const navigate = useNavigate();


//     const handleLogout = () => {
//         const isLogout = window.confirm("Are you sure you want to logout?")
//         if (isLogout) {
//             ApiService.logout();
//             navigate("/login")
//         }
//     }


//     return (
//         <nav>
//             <div className="logo">
//                 <Link to="/" className="logo-link">
//                     Food App</Link>
//             </div>

//             <div className="desktop-nav">
//                 <Link to="/home" className="nav-link">Home</Link>
//                 <Link to="/menu" className="nav-link">Menu</Link>
//                 <Link to="/categories" className="nav-link">Categories</Link>

//                 {isAuthenticated ? (
//                     <>
//                         {isCustomer && (
//                             <Link to="/orders" className="nav-link">Orders</Link>,
//                             <Link to="/cart" className="nav-link">Cart</Link>

//                         )}
//                         {isDeliveryPerson && (
//                             <Link to="/deliveries" className="nav-link">Deliveries</Link>
//                         )}
//                         {isAdmin && (
//                             <Link to="/admin" className="nav-link">Admin</Link>
//                         )}
//                         <Link to="/profile" className="nav-link">Profile</Link>
//                         <button className="nav-button" onClick={handleLogout}>
//                             Logout
//                         </button>


//                     </>
//                 ) : (
//                     <>
//                         <Link to="/login" className="nav-link">Login</Link>
//                         <Link to="/register" className="nav-link">Register</Link>

//                     </>
//                 )}
//             </div>
//         </nav>
//     )



// }
// export default Navbar;


import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ApiService from "../../services/ApiService";

const Navbar = () => {
  const isAuthenticated = ApiService.isAthenticated();
  const isAdmin = ApiService.isAdmin();
  const isCustomer = ApiService.isCustomer();
  const isDeliveryPerson = ApiService.isDeliveryPerson();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const confirmLogout = () => {
    ApiService.logout();
    closeLogoutModal();
    navigate("/login");
  };

  const styles = {
    // Modal
    backdrop: {
      position: "fixed",
      inset: 0,
      background: "rgba(15,20,30,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      zIndex: 1000,
    },
    modal: {
      width: "100%",
      maxWidth: 420,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 22px 60px rgba(15,20,30,0.25)",
      border: "1px solid rgba(20,30,60,0.06)",
      overflow: "hidden",
    },
    modalHeader: {
      padding: "18px 20px",
      borderBottom: "1px solid #eef0f3",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    modalTitle: {
      margin: 0,
      fontSize: 18,
      fontWeight: 800,
      color: "#111827",
    },
    modalBody: { padding: "16px 20px", color: "#4b5563", fontSize: 14, lineHeight: 1.45 },
    modalFooter: {
      padding: "14px 20px",
      display: "flex",
      gap: 10,
      justifyContent: "flex-end",
      borderTop: "1px solid #eef0f3",
    },
    btn: {
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #e6e9ee",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
    },
    btnPrimary: {
      color: "#fff",
      border: "none",
      background: "linear-gradient(90deg,#ff7b20,#f36f00)",
      boxShadow: "0 8px 20px rgba(243,111,0,0.18)",
    },
    closeX: {
      border: "none",
      background: "transparent",
      fontSize: 18,
      cursor: "pointer",
      color: "#6b7280",
      padding: 6,
      borderRadius: 8,
    },
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/" className="logo-link">Food App</Link>
        </div>

        <div className="desktop-nav">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/categories" className="nav-link">Categories</Link>

          {isAuthenticated ? (
            <>
              {isCustomer && (
                <>
                  {/* <Link to="/orders" className="nav-link">Orders</Link> */}
                  <Link to="/cart" className="nav-link">Cart</Link>
                </>
              )}
              {isDeliveryPerson && (
                <Link to="/deliveries" className="nav-link">Deliveries</Link>
              )}
              {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}

              <Link to="/profile" className="nav-link">Profile</Link>

              {/* Open modal instead of window.confirm */}
              <button className="nav-button" onClick={openLogoutModal}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>

      {showLogoutModal && (
        <ConfirmModal
          title="Logout"
          message="Are you sure you want to logout?"
          onCancel={closeLogoutModal}
          onConfirm={confirmLogout}
          styles={styles}
        />
      )}
    </>
  );
};

export default Navbar;

/* -------- Reusable Confirm Modal (inline) -------- */
const ConfirmModal = ({ title, message, onCancel, onConfirm, styles }) => {
  const modalRef = useRef(null);
  const cancelRef = useRef(null);

  // Lock scroll + focus management
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
      if ((e.key === "Enter" || e.key === " ") && document.activeElement === cancelRef.current) {
        e.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

  // Click outside to close
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div style={styles.backdrop} onMouseDown={handleBackdrop}>
      <div
        ref={modalRef}
        style={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <div style={styles.modalHeader}>
          <h3 id="logout-title" style={styles.modalTitle}>{title}</h3>
          <button
            type="button"
            style={styles.closeX}
            aria-label="Close"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <div style={styles.modalBody}>{message}</div>

        <div style={styles.modalFooter}>
          <button
            ref={cancelRef}
            type="button"
            style={styles.btn}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};











