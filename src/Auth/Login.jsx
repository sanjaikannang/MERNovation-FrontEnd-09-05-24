import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const res = await fetch(`https://sanjai-kannan-g-mernovation-backend.onrender.com/user/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role); // Save the role from backend response
        navigateUser(data.user.role); // Navigate based on the role from backend
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Function to navigate user based on role
  const navigateUser = (role) => {
    switch (role) {
      case "admin": 
        navigate("/admin");
        break;
      case "Farmer":
        navigate("/farmer");
        break;
      case "Buyer":
        navigate("/buyer");
        break;
      default:
        navigate("/homepage");
    }
  };

  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span> Hub
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Signup
          </button>
        </div>
      </nav>

      <div className="bg-zinc-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl">
            <div className="text-xl text-grey font-bold">
              <span className=" text-green-500 font-bold">Harvest </span> Hub
            </div>
            <br />
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center ">
              Login
            </h2>

            <Formik
              initialValues={{
                email: "",
                password: "",
                role: "Farmer", // Default role is farmer
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                }
                return errors;
              }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-2"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded-lg"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 mt-2"
                  />

                  <div>
                    <p className="mb-2 font-semibold">Select Role:</p>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="role"
                        value="admin"
                        className="mr-2"
                      />
                      Admin
                    </label>
                    <label className="mr-4">
                      <Field
                        type="radio"
                        name="role"
                        value="Farmer"
                        className="mr-2"
                      />
                      Farmer
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="role"
                        value="Buyer"
                        className="mr-2"
                      />
                      Buyer
                    </label>
                  </div>
                  <br />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-medium bg-green-500 text-white py-2 relative rounded-lg hover:bg-green-600"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white mr-2"></div>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>

                  {error && <div className="text-red-500 mt-2">{error}</div>}
                </Form>
              )}
            </Formik>

            <p className="text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-500">
                Signup here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
