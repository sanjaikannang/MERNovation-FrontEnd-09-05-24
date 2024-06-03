import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const res = await fetch(`http://localhost:4000/user/signup`, {
        method: "POST",
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password,
          role: values.role,
          phoneNo: values.phoneno
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        // localStorage.setItem("username", values.username); // Save username in local storage
        navigate("/login");
      } else {
        setError(data.message || "Error during signup. Please try again.");
      }
    } catch (error) {
      setError("Error during signup. Please try again.");
    } finally {
      setSubmitting(false);
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

      <div className="bg-zinc-100 min-h-screen flex items-center justify-center ">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6 shadow-2xl rounded-3xl">
            <div className="text-xl text-grey font-bold">
              <span className=" text-green-600 font-bold">Harvest </span> Hub
            </div>
            <br />
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
              Register
            </h2>

            {/* Error message */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                phoneno: "",
                role: "Farmer",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = "Username is required";
                }
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
                } else if (values.password.length < 6) {
                  errors.password = "Password must be at least 6 characters";
                }
                if (!values.phoneno) {
                  errors.phoneno = "Phone number is required";
                } else if (!/^\d{10}$/.test(values.phoneno)) {
                  errors.phoneno = "Phone number must be exactly 10 digits";
                }
                return errors;
              }}
              onSubmit={handleSignup}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border rounded-lg"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 mt-2"
                  />

                  <Field
                    type="email"
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

                  <Field
                    type="text"
                    name="phoneno"
                    placeholder="Phone Number"
                    className="w-full p-2 mb-4 border rounded-lg"
                  />
                  <ErrorMessage
                    name="phoneno"
                    component="div"
                    className="text-red-500 mt-2"
                  />

                  <div>
                    <p className="mb-2 font-semibold">Select Role:</p>
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
                    className="w-full font-medium bg-green-500 rounded-lg text-white py-2 relative hover:bg-green-600"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white mr-2"></div>
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-gray-600 mt-2">
              Already have an account?
              <Link to="/login" className="text-green-500">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
