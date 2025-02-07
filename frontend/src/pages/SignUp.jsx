import React, { useState } from "react";

import GenderCheckbox from "../components/GenderCheckBox/GenderCheckbox";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { AiOutlineEye } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);
  const { signup, loading } = useSignUp();
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const handlecheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  // return (
  //   <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
  //     <div className="w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
  //       <h1 className="text-3xl font-semibold text-center text-gray-600">
  //         Signup <span className="text-blue-500"> MAI Chat App</span>
  //       </h1>

  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label className="label p-2">
  //             <span className="text-base label-text">Full Name</span>
  //           </label>
  //           <input
  //             value={inputs.fullName}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, fullName: e.target.value })
  //             }
  //             type="text"
  //             placeholder="John Doe"
  //             className="w-full input input-bordered  h-10"
  //           />
  //         </div>

  //         <div>
  //           <label className="label p-2 ">
  //             <span className="text-base label-text">Username</span>
  //           </label>
  //           <input
  //             type="text"
  //             placeholder="johndoe"
  //             className="w-full input input-bordered h-10"
  // 		  value={inputs.userName}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, userName: e.target.value })
  //             }
  //           />
  //         </div>

  //         <div>
  //           <label className="label">
  //             <span className="text-base label-text">Password</span>
  //           </label>
  //           <input
  //             type="password"
  //             placeholder="Enter Password"
  //             className="w-full input input-bordered h-10"
  // 		  value={inputs.password}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, password: e.target.value })
  //             }
  //           />
  //         </div>

  //         <div>
  //           <label className="label">
  //             <span className="text-base label-text">Confirm Password</span>
  //           </label>
  //           <input
  //             type="password"
  //             placeholder="Confirm Password"
  //             className="w-full input input-bordered h-10"
  // 		  value={inputs.confirmPassword}
  //             onChange={(e) =>
  //               setInputs({ ...inputs, confirmPassword: e.target.value })
  //             }
  //           />
  //         </div>

  //         <GenderCheckbox oncheckBoxChange={handlecheckBoxChange} selectedGender={inputs.gender}/>

  //         <Link
  //           to={"/Login"}
  //           className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
  //           href="#"
  //         >
  //           Already have an account?
  //         </Link>

  //         <div>
  //           <button className="btn btn-block btn-sm mt-2 border border-slate-700 btn-primary" disabled={loading}>
  //             {loading ? <span className="loading loading-spinner"></span> : "SignUp"}
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Signup <span className="text-blue-600">MAI Chat App</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={visiblePass ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <div className="absolute inset-y-0 right-2 top-6 flex items-center cursor-pointer">
              {visiblePass && (
                <AiOutlineEye
                  size={22}
                  onClick={() => setVisiblePass(!visiblePass)}
                />
              )}
              {!visiblePass && (
                <FaEyeSlash
                  size={22}
                  onClick={() => setVisiblePass(!visiblePass)}
                />
              )}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={visibleConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
            <div className="absolute inset-y-0 right-2 top-6 flex items-center cursor-pointer">
              {visibleConfirmPass && (
                <AiOutlineEye
                  size={22}
                  onClick={() => setVisibleConfirmPass(!visibleConfirmPass)}
                />
              )}
              {!visibleConfirmPass && (
                <FaEyeSlash
                  size={22}
                  onClick={() => setVisibleConfirmPass(!visibleConfirmPass)}
                />
              )}
            </div>
          </div>

          <GenderCheckbox
            oncheckBoxChange={handlecheckBoxChange}
            selectedGender={inputs.gender}
          />

          <div className="text-right">
            <Link to="/Login" className="text-sm text-blue-600 hover:underline">
              Already have an account?
            </Link>
          </div>

          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
