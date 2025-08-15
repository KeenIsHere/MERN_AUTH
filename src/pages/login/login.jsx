import {useState} from "react";
import toast from "react-hot-toast";
import {Link} from "react-router";
import {baseUrl} from "../../constant";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function login(e) {
    try {
      e.preventDefault();

      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);

      var response = await fetch(`${baseUrl}/auth/login.php`, {
        method: "POST",
        body: form,
      });
      var data = await response.json();

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
      } else {
        toast.error(data.message ?? "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);

      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundImage: "url(./assets/register-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            flex: 1,
          }}
        ></div>
        <div
          style={{
            flex: 1,
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={login}
            style={{
              display: "flex",
              maxWidth: "400px",
              width: "100%",
              height: "100%",
              alignItems: "start",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <span
                style={{color: "#333", fontSize: "1.8em", fontWeight: "bold"}}
              >
                Login
              </span>
              <span style={{color: "#333", fontSize: "1.2em"}}>
                Enter your details to login
              </span>
            </div>

            <input
              required
              className="input"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
            <input
              required
              className="input"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
            <button className="button" type="submit">
              Login
            </button>
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
