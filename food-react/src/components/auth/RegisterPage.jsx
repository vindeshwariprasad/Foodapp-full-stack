


// import { useNavigate, Link } from "react-router-dom";
// import { useError } from "../common/ErrorDisplay"
// import { useState } from "react";
// import ApiService from "../../services/ApiService";

// const RegisterPage = () => {
//     const { ErrorDisplay, showError } = useError();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         phoneNumber: '',
//         address: '',
//         confirmPassword: '',
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (
//             !formData.name ||
//             !formData.email ||
//             !formData.password ||
//             !formData.phoneNumber ||
//             !formData.confirmPassword ||
//             !formData.address
//         ) {
//             showError("All fields are required")
//             return;
//         }

//         if (formData.password !== formData.confirmPassword) {
//             showError('Passwords do not match.');
//             return;
//         }

//         const registrationData = {
//             name: formData.name,
//             email: formData.email,
//             password: formData.password,
//             phoneNumber: formData.phoneNumber,
//             address: formData.address,
//         };

//         try {
//             const response = await ApiService.registerUser(registrationData);
//             if (response.statusCode === 200) {
//                 setFormData({
//                     name: '', email: '', password: '', phoneNumber: '', address: '', confirmPassword: ''
//                 });
//                 navigate("/login")
//             } else {
//                 showError(response.message)
//             }
//         } catch (error) {
//             showError(error.response?.data?.message || error.message);
//         }
//     };

//     const styles = {
//         page: {
//             minHeight: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '32px',
//             background: '#f5f6f8',
//             fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
//         },
//         card: {
//             width: '100%',
//             maxWidth: 520,
//             background: '#ffffff',
//             borderRadius: 12,
//             boxShadow: '0 10px 30px rgba(20,30,60,0.08)',
//             padding: '34px',
//             boxSizing: 'border-box',
//             border: '1px solid rgba(20,30,60,0.03)'
//         },
//         header: {
//             textAlign: 'center',
//             marginBottom: 18
//         },
//         title: {
//             margin: 0,
//             fontSize: 28,
//             color: '#f36f00',
//             fontWeight: 800,
//             letterSpacing: '-0.02em'
//         },
//         subtitle: {
//             marginTop: 8,
//             marginBottom: 0,
//             fontSize: 14,
//             color: '#6b7280',
//             fontWeight: 500
//         },
//         form: {
//             marginTop: 18,
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: 14
//         },
//         fullRow: {
//             gridColumn: '1 / -1'
//         },
//         label: {
//             display: 'block',
//             fontSize: 13,
//             color: '#374151',
//             fontWeight: 600,
//             marginBottom: 6
//         },
//         input: {
//             width: '100%',
//             padding: '12px 14px',
//             fontSize: 15,
//             borderRadius: 8,
//             border: '1px solid #e6e9ee',
//             outline: 'none',
//             boxSizing: 'border-box',
//             transition: 'box-shadow 0.12s ease, border 0.12s ease',
//             background: '#fbfbfd'
//         },
//         inputFocus: {
//             borderColor: '#f36f00',
//             boxShadow: '0 6px 20px rgba(243,111,0,0.12)',
//             background: '#fff'
//         },
//         button: {
//             width: '100%',
//             padding: '12px 16px',
//             borderRadius: 10,
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: 16,
//             fontWeight: 700,
//             color: '#fff',
//             background: 'linear-gradient(90deg,#ff7b20,#f36f00)',
//             boxShadow: '0 8px 20px rgba(243,111,0,0.18)',
//             transition: 'transform 0.12s ease, box-shadow 0.12s ease'
//         },
//         smallTextCenter: {
//             textAlign: 'center',
//             marginTop: 12,
//             fontSize: 13,
//             gridColumn: '1 / -1'
//         },
//         registerLink: {
//             color: '#0b63d6',
//             textDecoration: 'none',
//             fontWeight: 600
//         },
//         separatorWrap: {
//             marginTop: 18,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 12,
//             gridColumn: '1 / -1'
//         },
//         separatorLine: {
//             flex: 1,
//             height: 1,
//             background: '#eef0f3'
//         },
//         separatorText: {
//             fontSize: 13,
//             color: '#9aa0a6',
//             fontWeight: 600
//         },
//         socialRow: {
//             marginTop: 14,
//             display: 'flex',
//             gap: 10,
//             gridColumn: '1 / -1'
//         },
//         socialBtn: {
//             flex: 1,
//             padding: '10px 12px',
//             borderRadius: 8,
//             border: 'none',
//             cursor: 'pointer',
//             color: '#fff',
//             fontWeight: 700,
//             fontSize: 13,
//             boxShadow: '0 6px 14px rgba(10,10,10,0.06)'
//         },
//         google: { background: '#db4437' },
//         facebook: { background: '#4267B2' },
//         github: { background: '#24292e' }
//     };

//     const [focusedField, setFocusedField] = useState(null);

//     return (
//         <div style={styles.page}>
//             <div style={styles.card}>
//                 <div style={styles.header}>
//                     <h2 style={styles.title}>Register</h2>
//                     <p style={styles.subtitle}>Create an account to order delicious food!</p>
//                 </div>

//                 <form style={styles.form} onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="name" style={styles.label}>Full Name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             placeholder="Your Full Name"
//                             style={{
//                                 ...styles.input,
//                                 ...(focusedField === 'name' ? styles.inputFocus : {})
//                             }}
//                             onFocus={() => setFocusedField('name')}
//                             onBlur={() => setFocusedField(null)}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="email" style={styles.label}>Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             placeholder="Your Email Here"
//                             style={{
//                                 ...styles.input,
//                                 ...(focusedField === 'email' ? styles.inputFocus : {})
//                             }}
//                             onFocus={() => setFocusedField('email')}
//                             onBlur={() => setFocusedField(null)}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="password" style={styles.label}>Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             placeholder="Password"
//                             style={{
//                                 ...styles.input,
//                                 ...(focusedField === 'password' ? styles.inputFocus : {})
//                             }}
//                             onFocus={() => setFocusedField('password')}
//                             onBlur={() => setFocusedField(null)}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                             placeholder="Confirm Password"
//                             style={{
//                                 ...styles.input,
//                                 ...(focusedField === 'confirmPassword' ? styles.inputFocus : {})
//                             }}
//                             onFocus={() => setFocusedField('confirmPassword')}
//                             onBlur={() => setFocusedField(null)}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="phoneNumber" style={styles.label}>Phone Number</label>
//                         <input
//                             type="text"
//                             id="phoneNumber"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             required
//                             placeholder="Your Phone Number"
//                             style={{
//                                 ...styles.input,
//                                 ...(focusedField === 'phoneNumber' ? styles.inputFocus : {})
//                             }}
//                             onFocus={() => setFocusedField('phoneNumber')}
//                             onBlur={() => setFocusedField(null)}
//                         />
//                     </div>

//                     <div style={styles.fullRow}>
//                         <label htmlFor="address" style={styles.label}>Address</label>
//                         <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                             placeholder="Your Address Here"
//                             style={{
//                                 ...styles.input,
//                                 ...(focusedField === 'address' ? styles.inputFocus : {})
//                             }}
//                             onFocus={() => setFocusedField('address')}
//                             onBlur={() => setFocusedField(null)}
//                         />
//                     </div>

//                     {/* Error display placed inside the form for visibility */}
//                     <div style={styles.fullRow}>
//                         <ErrorDisplay />
//                     </div>

//                     <div style={styles.fullRow}>
//                         <button
//                             type="submit"
//                             style={styles.button}
//                             onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
//                             onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                         >
//                             Register
//                         </button>
//                     </div>

//                     <div style={styles.smallTextCenter}>
//                         <Link to="/login" style={styles.registerLink}>
//                             Already Have Account? Login
//                         </Link>
//                     </div>


//                 </form>
//             </div>
//         </div>
//     )
// }

// export default RegisterPage;



import { useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Live helpers
  const passwordsFilled = formData.password.length > 0 && formData.confirmPassword.length > 0;
  const passwordsMatch = useMemo(
    () => formData.password === formData.confirmPassword && passwordsFilled,
    [formData.password, formData.confirmPassword, passwordsFilled]
  );
  const phoneDigits = useMemo(() => formData.phoneNumber.replace(/\D/g, ""), [formData.phoneNumber]);
  const isPhone10 = phoneDigits.length === 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Enforce strictly 10 digits for phone (no country code)
    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, phoneNumber: digitsOnly }));
      return;
    }
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const { name, email, password, confirmPassword, address } = formData;

    // All fields required
    if (!name || !email || !password || !confirmPassword || !phoneDigits || !address) {
      toast.error("All fields are required");
      return false;
    }

    // Email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    // Password rules
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    // Phone: exactly 10 digits, no country code
    if (!isPhone10) {
      toast.error("Enter a 10-digit mobile number (no country code)");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phoneNumber: phoneDigits, // send normalized 10-digit number
      address: formData.address.trim(),
    };

    try {
      setLoading(true);
      const response = await ApiService.registerUser(payload);

      if (response?.statusCode === 200) {
        toast.success("Registration successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          address: "",
        });
        navigate("/login");
      } else {
        toast.error(response?.message || "Registration failed");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px",
      background: "#f5f6f8",
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    },
    card: {
      width: "100%",
      maxWidth: 560,
      background: "#ffffff",
      borderRadius: 14,
      boxShadow: "0 14px 36px rgba(20,30,60,0.10)",
      padding: "36px",
      boxSizing: "border-box",
      border: "1px solid rgba(20,30,60,0.05)",
    },
    header: { textAlign: "center", marginBottom: 20 },
    title: {
      margin: 0,
      fontSize: 28,
      color: "#f36f00",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    subtitle: {
      marginTop: 8,
      marginBottom: 0,
      fontSize: 14,
      color: "#6b7280",
      fontWeight: 500,
    },
    form: {
      marginTop: 18,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
    },
    fullRow: { gridColumn: "1 / -1" },
    label: {
      display: "block",
      fontSize: 13,
      color: "#374151",
      fontWeight: 600,
      marginBottom: 6,
    },
    inputWrap: { position: "relative" },
    input: {
      width: "100%",
      padding: "12px 44px 12px 14px",
      fontSize: 15,
      borderRadius: 10,
      border: "1px solid #e6e9ee",
      outline: "none",
      boxSizing: "border-box",
      transition: "box-shadow 0.12s ease, border 0.12s ease",
      background: "#fbfbfd",
    },
    inputFocus: {
      borderColor: "#f36f00",
      boxShadow: "0 6px 20px rgba(243,111,0,0.12)",
      background: "#fff",
    },
    toggleBtn: {
      position: "absolute",
      right: 8,
      top: 8,
      height: 32,
      padding: "0 10px",
      borderRadius: 8,
      border: "1px solid #e6e9ee",
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      color: "#374151",
    },
    helper: { marginTop: 4, fontSize: 12, color: "#6b7280" },
    helperWarn: { marginTop: 4, fontSize: 12, color: "#f36f00", fontWeight: 600 },
    helperOk: { marginTop: 4, fontSize: 12, color: "#374151" },
    button: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 800,
      color: "#fff",
      background: "linear-gradient(90deg,#ff7b20,#f36f00)",
      boxShadow: "0 10px 22px rgba(243,111,0,0.20)",
      transition: "transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s",
    },
    buttonDisabled: { opacity: 0.7, cursor: "not-allowed" },
    link: { color: "#0b63d6", textDecoration: "none", fontWeight: 700 },
    smallTextCenter: { textAlign: "center", marginTop: 12, fontSize: 13, gridColumn: "1 / -1" },
  };

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={2500} newestOnTop />
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Register</h2>
          <p style={styles.subtitle}>Create an account to order delicious food!</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Full Name"
              style={{ ...styles.input, ...(focusedField === "name" ? styles.inputFocus : {}) }}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              style={{ ...styles.input, ...(focusedField === "email" ? styles.inputFocus : {}) }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="At least 6 characters"
                style={{ ...styles.input, ...(focusedField === "password" ? styles.inputFocus : {}) }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                type="button"
                aria-label={showPwd ? "Hide password" : "Show password"}
                onClick={() => setShowPwd((s) => !s)}
                style={styles.toggleBtn}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <div style={styles.inputWrap}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPwd ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
                style={{
                  ...styles.input,
                  ...(focusedField === "confirmPassword" ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
              />
              <button
                type="button"
                aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                onClick={() => setShowConfirmPwd((s) => !s)}
                style={styles.toggleBtn}
              >
                {showConfirmPwd ? "Hide" : "Show"}
              </button>
            </div>
            {passwordsFilled && (
              <div style={passwordsMatch ? styles.helperOk : styles.helperWarn}>
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" style={styles.label}>Mobile Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="10-digit number (no country code)"
              style={{ ...styles.input, ...(focusedField === "phoneNumber" ? styles.inputFocus : {}) }}
              onFocus={() => setFocusedField("phoneNumber")}
              onBlur={() => setFocusedField(null)}
            />
            <div style={isPhone10 ? styles.helper : styles.helperWarn}>
              {isPhone10
                ? "Looks good: 10-digit mobile number."
                : "Enter exactly 10 digits. Don’t add +91 or country code."}
            </div>
          </div>

          <div style={styles.fullRow}>
            <label htmlFor="address" style={styles.label}>Address</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Your Address Here"
              style={{ ...styles.input, ...(focusedField === "address" ? styles.inputFocus : {}) }}
              onFocus={() => setFocusedField("address")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div style={styles.fullRow}>
            <button
              type="submit"
              disabled={loading}
              style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <div style={styles.smallTextCenter}>
            <Link to="/login" style={styles.link}>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;



