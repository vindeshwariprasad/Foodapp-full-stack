



// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useError } from "../common/ErrorDisplay"
// import { useState } from "react";
// import ApiService from "../../services/ApiService";

// const LoginPage = () => {
//     const { ErrorDisplay, showError } = useError();
//     const navigate = useNavigate();
//     const { state } = useLocation();
//     const redirectPath = state?.from?.pathname || "/home"

//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.email || !formData.password) {
//             showError('Email and password are required.');
//             return;
//         }

//         try {
//             const response = await ApiService.loginUser(formData);
//             if (response.statusCode === 200) {
//                 ApiService.saveToken(response.data.token)
//                 ApiService.saveRole(response.data.roles)
//                 navigate(redirectPath, {replace: true})
//             } else {
//                 showError(response.message)
//             }
//         } catch (error) {
//             showError(error.response?.data?.message || error.message);
//         }
//     };

//     // Inline styles (single source of truth)
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
//             maxWidth: 460,
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
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 14
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
//             fontSize: 13
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
//             gap: 12
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
//             gap: 10
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
//         github: { background: '#24292e' },
//         // small helper to apply focus style using inline onFocus/onBlur
//     };

//     // helper to set focus styling per input (local state)
//     const [focusedField, setFocusedField] = useState(null);

//     return (
//         <div style={styles.page}>
//             {/* Render the ErrorDisplay component */}
//             <ErrorDisplay />
//             <div style={styles.card}>
//                 <div style={styles.header}>
//                     <h2 style={styles.title}>Login</h2>
//                     <p style={styles.subtitle}>Login to your account to order delicious food!</p>
//                 </div>

//                 <div>
//                     <form style={styles.form} onSubmit={handleSubmit}>
//                         <div>
//                             <label htmlFor="email" style={styles.label}>Email</label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Your Email Address"
//                                 style={{
//                                     ...styles.input,
//                                     ...(focusedField === 'email' ? styles.inputFocus : {})
//                                 }}
//                                 onFocus={() => setFocusedField('email')}
//                                 onBlur={() => setFocusedField(null)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password" style={styles.label}>Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Password"
//                                 style={{
//                                     ...styles.input,
//                                     ...(focusedField === 'password' ? styles.inputFocus : {})
//                                 }}
//                                 onFocus={() => setFocusedField('password')}
//                                 onBlur={() => setFocusedField(null)}
//                             />
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 style={styles.button}
//                                 onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
//                                 onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
//                             >
//                                 Login
//                             </button>
//                         </div>

//                         <div style={styles.smallTextCenter}>
//                             <Link to="/register" style={styles.registerLink}>
//                                 Don't Have an Account? Register
//                             </Link>
//                         </div>
//                     </form>

                    
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;



import { useNavigate, Link, useLocation } from "react-router-dom";
import { useError } from "../common/ErrorDisplay";
import { useState } from "react";
import ApiService from "../../services/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { ErrorDisplay, showError } = useError();
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirectPath = state?.from?.pathname || "/home";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const isInvalidCreds = (status, msg) => {
    return (
      [400, 401].includes(Number(status)) ||
      /invalid|wrong|mismatch|credential/i.test(msg || "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await ApiService.loginUser(formData);
      const respStatus = Number(response?.statusCode);
      const respMsg = response?.message || "Login failed";

      if (respStatus === 200) {
        ApiService.saveToken(response.data.token);
        ApiService.saveRole(response.data.roles);
        navigate(redirectPath, { replace: true });
      } else {
        if (isInvalidCreds(respStatus, respMsg)) {
          toast.error("Invalid email or password");
        } else {
          toast.error(respMsg);
          showError(respMsg);
        }
      }
    } catch (error) {
      const status = error?.response?.status ?? error?.response?.data?.statusCode;
      const msg = error?.response?.data?.message || error?.message || "Login failed";
      if (isInvalidCreds(status, msg)) {
        toast.error("Invalid email or password");
      } else {
        toast.error(msg);
        showError(msg);
      }
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
      padding: 32,
      background: "#f5f6f8",
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    },
    card: {
      width: "100%",
      maxWidth: 480,
      background: "#ffffff",
      borderRadius: 14,
      boxShadow: "0 14px 36px rgba(20,30,60,0.10)",
      padding: 36,
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
    form: { marginTop: 20, display: "flex", flexDirection: "column", gap: 14 },
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
      transition: "box-shadow 0.12s ease, border 0.12s ease, transform 0.05s",
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
    actionsRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 6,
    },
    link: { color: "#0b63d6", textDecoration: "none", fontWeight: 700 },
    smallTextCenter: { textAlign: "center", marginTop: 12, fontSize: 13 },
    helper: { marginTop: 4, fontSize: 12, color: "#9aa0a6" },
  };

  return (
    <div style={styles.page}>
      <ErrorDisplay />
      <ToastContainer position="top-right" autoClose={2500} newestOnTop />
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>
            Login to your account to order delicious food!
          </p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <div style={styles.inputWrap}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                style={{
                  ...styles.input,
                  ...(focusedField === "email" ? styles.inputFocus : {}),
                }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <div style={styles.helper}>Use your registered email address.</div>
          </div>

          <div>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <div style={styles.inputWrap}>
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                style={{
                  ...styles.input,
                  ...(focusedField === "password" ? styles.inputFocus : {}),
                }}
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
            <div style={styles.actionsRow}>
              <span />
              <Link to="/forgot-password" style={styles.link}>
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "translateY(1px)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div style={styles.smallTextCenter}>
            <Link to="/register" style={styles.link}>
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
