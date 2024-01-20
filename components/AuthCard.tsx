"use client";
import { useFormik } from "formik";
import clsx from "clsx";
import loginSchema from "@/validationSchemas/loginSchema";
import registerSchema from "@/validationSchemas/registerSchema";
import Image from "next/image";
import googleIcon from "@/public/google.png";
import { post } from "@/utils/apiClient";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";
import { authenticate } from "@/app/lib/actions";
type FormType = "login" | "register";

export default function AuthCard({ formType }: { formType: FormType }) {
  const login = formType === "login";
  const register = formType === "register";
  const validationSchema = login ? loginSchema : registerSchema;

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema,
      onSubmit: () => {
        login ? handleLogin() : handleRegistration();
      },
    });

  const { name, email, password, confirmPassword } = values;

  async function handleRegistration() {
    const response = await post({
      endpoint: "/users",
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    });

    if (response.status === 201) {
      console.log("Signup successful");
    } else {
      console.log(response.data.error);
    }
  }

  async function handleLogin() {
    try {
      await authenticate(email, password);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return "Invalid credentials.";
          default:
            return "Something went wrong.";
        }
      }
      throw error;
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="z-20 relative mx-auto w-2/3 md:w-2/3 lg:w-1/3  flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="w-full p-6 md:p-20">
          <h2 className="font-mono mb-4 text-4xl font-bold text-center">
            {login ? "Log In" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            {register && (
              <div className="relative mb-6">
                <label className="hidden" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "w-full mt-3 p-3 border rounded-md placeholder:font-sans placeholder:font-light",
                    {
                      [errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"]: true,
                    }
                  )}
                />
                {errors.name && touched.name && (
                  <p className="pl-3 text-sm text-red-500 absolute">
                    {`*${errors.name}`}
                  </p>
                )}
              </div>
            )}
            <div className="mb-6 relative">
              <label className="hidden" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(
                  "w-full p-3 border rounded-md placeholder:font-sans placeholder:font-light",
                  {
                    [errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"]: true,
                  }
                )}
              />
              {errors.email && touched.email && (
                <p className="pl-3 text-sm text-red-500 absolute">{`*${errors.email}`}</p>
              )}
            </div>
            <div className="mb-6 relative">
              <label className="hidden" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={clsx(
                  "w-full p-3 border rounded-md placeholder:font-sans placeholder:font-light",
                  {
                    [errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"]: true,
                  }
                )}
              />

              {errors.password && touched.password && (
                <p className="pl-3 text-sm text-red-500 absolute">
                  {`*${errors.password}`}
                </p>
              )}
            </div>
            {register && (
              <div className="mb-9 relative">
                <label className="hidden" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={clsx(
                    "w-full p-3 border rounded-md placeholder:font-sans placeholder:font-light",
                    {
                      [errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"]: true,
                    }
                  )}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="pl-3 text-sm text-red-500 absolute">
                    {`*${errors.confirmPassword}`}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col items-center justify-between mt-6 space-y-6">
              {login && (
                <div className="cursor-pointer text-blue-500">
                  Forgot password
                </div>
              )}

              <button
                type="submit"
                className="w-11/12 md:w-1/2 flex justify-center items-center p-4 font-sans font-bold text-white rounded-md px-9 bg-blue-500  shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border"
              >
                <span>{login ? "Next" : "Continue"}</span>
              </button>
              {register && (
                <div className="cursor-pointer text-blue-500">
                  Already have an account?
                </div>
              )}
            </div>
          </form>

          <div className="mt-4 border border-b-gray-300"></div>

          <p className={`py-3 text-sm font-light text-center`}>{`or ${
            login ? "log in" : "sign up"
          } with`}</p>

          {/* <!-- Bottom Buttons Container --> */}
          <div className="flex justify-center md:space-x-4 md:space-y-0">
            <button className="flex w-11/12 md:w-1/2 items-center justify-center py-2  space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150">
              <Image src={googleIcon} alt="" className="w-9" />
              <span className="font-thin">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
