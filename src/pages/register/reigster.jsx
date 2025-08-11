import {useState} from "react";
import {Link, useNavigate} from "react-router";
import { baseUrl } from "../../constant";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate= useNavigate()


  async function reigster(e){
    try {
    e.preventDefault();

  const form= new FormData();
    form.append("full_name", formData.fullName);
    form.append("email", formData.email);
    form.append("password", formData.password);


    var response= await fetch(`${baseUrl}/auth/register.php`,{
      method:"POST",
      body: form,
    });   
    var data = await response.json();

    if(data.success){
      toast.success(data.message ?? "User registered successfully!");
      navigate("/login");
    }else{
      toast.error(data.message ?? "Registration failed. Please try again.");
    }
  }catch (error) {
    console.error("Error during registration:", error);
   
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
            onSubmit={reigster}
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
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
