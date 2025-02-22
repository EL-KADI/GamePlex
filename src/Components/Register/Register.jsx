import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../UserContext/UserContext";
import bg from "../../Images/1.jpeg";
import { GiControlTower } from "react-icons/gi";

export default function Register() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMess, setErrorMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Name must contain more than five characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message === "success") {
          navigate("/");
          setToken(data.token);
        }
      } catch {
        setErrorMess("Email already exists");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat bg-top"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="text-center mb-6">
        <GiControlTower className="text-6xl text-[#CB5884]" />
        <h2 className="text-4xl font-bold text-white mt-3">
          Gaming Register Form
        </h2>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto p-6 bg-[#063333ac] rounded-lg w-xs sm:w-lg"
      >
        {[
          { name: "name", label: "Your Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "rePassword", label: "Confirm Password", type: "password" },
          { name: "phone", label: "Phone Number", type: "tel" },
        ].map(({ name, label, type }) => (
          <div key={name} className="relative z-0 w-full mb-5 group">
            <input
              type={type}
              name={name}
              id={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name]}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none peer"
              placeholder=" "
              required
            />
            <label
              htmlFor={name}
              className="absolute text-sm text-gray-400 transform -translate-y-6 scale-75 top-3 left-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
            >
              {label}
            </label>
            {formik.errors[name] && formik.touched[name] && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors[name]}
              </div>
            )}
          </div>
        ))}
        {errorMess && (
          <div className="text-red-500 text-sm mb-5">{errorMess}</div>
        )}
        <h2 className="text-white mb-4">
          Have An Account?
          <Link
            to="/login"
            className="text-[#D65B88] hover:text-[#4680AD] duration-300 cursor-pointer ml-1"
          >
            Sign In
          </Link>
        </h2>
        <button
          type="submit"
          className="text-white bg-[#D65B88] hover:bg-[#4680AD] duration-300 cursor-pointer focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
        </button>
      </form>
    </div>
  );
}
