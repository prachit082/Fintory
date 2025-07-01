import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const createUserDocument = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateSignup = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signUpWithEmail = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await createUserDocument(user);
      toast.success("Successfully Signed Up!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing up with email and password: ",
        error.message
      );
      setLoading(false);
    }
  };

  const signInWithEmail = async (e) => {
    
    e.preventDefault();

    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Invalid email format" });
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      toast.success("Logged In Successfully!");
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.error(
        "Error signing in with email and password: ",
        error.message
      );
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="signup-signin-container">
          <h2 style={{ textAlign: "center" }}>
            {flag ? "Log In on" : "Sign Up on"} <span className="blue-text">Fintory.</span>
          </h2>
          <form onSubmit={flag ? signInWithEmail : signUpWithEmail}>
            {!flag && (
              <div className="input-wrapper">
                <p>Full Name</p>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            )}
            <div className="input-wrapper">
              <p>Email</p>
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-wrapper" style={{ position: "relative" }}>
              <p>Password</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Example123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 10, top: 36, cursor: "pointer" }}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {!flag && (
              <div className="input-wrapper" style={{ position: "relative" }}>
                <p>Confirm Password</p>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: "absolute", right: 10, top: 36, cursor: "pointer" }}
                >
                  {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <button type="submit" className="btn" disabled={loading}>
              {loading
                ? "Loading..."
                : flag
                ? "Log In with Email and Password"
                : "Sign Up with Email and Password"}
            </button>
          </form>
          <p style={{ textAlign: "center", margin: 0 }}>or</p>
          <button disabled={loading} className="btn btn-blue" onClick={signInWithGoogle}>
            {loading ? "Loading..." : flag ? "Log In with Google" : "Sign Up with Google"}
          </button>
          <p
            onClick={() => {
              setErrors({});
              setFlag(!flag);
            }}
            style={{
              textAlign: "center",
              marginBottom: 0,
              marginTop: "0.5rem",
              cursor: "pointer",
            }}
          >
            {flag
              ? "Or Don't Have An Account? Click Here."
              : "Or Have An Account Already? Click Here."}
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpSignIn;