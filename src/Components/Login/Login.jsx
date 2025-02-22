import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../UserContext/UserContext";
import bg from "../../Images/1.jpeg";
import { GiControlTower } from "react-icons/gi";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMess, seterrorMess] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async function (loginData) {
      try {
        setisLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          loginData
        );
        if (data.message === "success") {
          navigate("/");
          setToken(data.token);
        }
      } catch {
        seterrorMess("Email or Password incorrect");
      } finally {
        setisLoading(false);
      }
    },
  });

  return (
    <div
      className="w-full h-screen bg-cover bg-no-repeat bg-top"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <GiControlTower className="md:text-8xl sm:text-6xl text-5xl text-[#CB5884]" />
          <span className="md:text-6xl sm:text-5xl text-2xl font-bold ms-3 text-white">
            Gaming Login Form
          </span>
        </div>

        <div className="block mt-5 rounded-lg p-6 bg-[#063333ac] transition-all duration-200 hover:bg-[#042727c1]">
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto rounded-lg w-xs sm:w-lg"
          >
            <div className="mb-5">
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none peer"
                placeholder="name@gmail.com"
                required
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              ></label>
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="mb-5">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white focus:outline-none peer"
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              ></label>
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
            {errorMess && (
              <div className="text-red-500 text-sm mb-5">{errorMess}</div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white">
                Don&apos;t Have An Account?
                <Link to="/register">
                  <span className="ms-1 text-[#D65B88] hover:text-[#4680AD] duration-300 cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </h2>
              <Link to="/forget-password">
                <span className="text-[#D65B88] hover:text-[#4680AD] duration-300 cursor-pointer">
                  Forgot Password?
                </span>
              </Link>
            </div>
            <button
              type="submit"
              className="text-white bg-[#D65B88] hover:bg-[#4680AD] duration-300 cursor-pointer focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}