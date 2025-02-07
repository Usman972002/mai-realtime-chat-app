// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import useLogin from "../hooks/useLogin";

// const Login = () => {

// 	const [username,setUsername] = useState("");
// 	const [password,setPassword] = useState("");

// 	const {loading,login} = useLogin();

// 	const handleLogin = async(e) =>{
// 		e.preventDefault();
// 		await login(username,password);
// 	}

//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-600">
//           Login
//           <span className="text-blue-500"> ChatApp</span>
//         </h1>

//         <form onSubmit={handleLogin}>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               className="w-full input input-bordered h-10"
// 			  value={username}
// 			  onChange={(e)=>setUsername(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="label">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="w-full input input-bordered h-10"
// 			  value={password}
// 			  onChange={(e)=>setPassword(e.target.value)}
//             />
//           </div>
//           <Link
//             to={"/SignUp"}
//             className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
//           >
//             {"Don't"} have an account?
//           </Link>

//           <div>
//             <button className="btn btn-block btn-sm mt-2 btn-primary" disabled={loading}>

// 			{loading ? <span className="loading loading-spinner"></span> : "LogIn"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { AiOutlineEye } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const { loading, login } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full max-w-md p-8 bg-slate-200 shadow-2xl rounded-3xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login <span className="text-blue-600">MAI Chat App</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-2 top-6 flex items-center cursor-pointer">
              {visible && (
                <AiOutlineEye size={22} onClick={() => setVisible(!visible)} />
              )}
              {!visible && (
                <FaEyeSlash size={22} onClick={() => setVisible(!visible)} />
              )}
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/SignUp"
              className="text-sm text-blue-600 hover:underline"
            >
              {"Don't"} have an account?
            </Link>
          </div>

          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
