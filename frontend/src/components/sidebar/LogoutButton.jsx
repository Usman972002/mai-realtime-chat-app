import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  // return (
  //   <div className="mt-auto">
  //     {!loading ? (
  //       <BiLogOut className="w-6 h-6 cursor-pointer" onClick={logout} />
  //     ) : (
  //       <span className="loading loading-spinner"></span>
  //     )}
  //   </div>
  // );
  return (
    <div className="mt-auto flex items-center justify-center p-4">
      {!loading ? (
        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          onClick={logout}
        >
          <BiLogOut className="w-6 h-6" /> Logout
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );

};
export default LogoutButton;
