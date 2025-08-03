import {useState} from "react";
import {Link} from "react-router";

const Register = ({setCount}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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
            backgroundColor: "blue",
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
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              console.log("Form submitted");
              console.log(formData);
            }}
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
                Register
              </span>
              <span style={{color: "#333", fontSize: "1.2em"}}>
                Enter your details to register
              </span>
            </div>
            <input
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="input"
              type="text"
              placeholder="Enter your full name"
            />
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
              Register
            </button>
            <span>
              Already have an account? <Link to="/">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
