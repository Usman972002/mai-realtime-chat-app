import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversation } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term Must Contain at least 3 characters");
    }

    const conv = conversation.find((c) =>
      c.fullname.toLowerCase().includes(search.toLocaleLowerCase())
    );
    console.log(conv);
    if (conv) {
      setSelectedConversation(conv);
      setSearch("");
    } else {
      toast.error("No Such user Found!");
    }
  };

  // return (
  //   <form onClick={handleSubmit} className="flex items-center gap-2">
  //     <input
  //       type="text"
  //       placeholder="Search…"
  //       className="input input-bordered rounded-full w-[300px]"
	// 	value={search}
	// 	onChange={(e)=>setSearch(e.target.value)}
  //     />
  //     <button type="submit" className="btn btn-circle bg-sky-500 text-white">
  //       <IoSearchSharp className="w-6 h-6 outline-none" />
  //     </button>
  //   </form>
  // );
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3">
      <input
        type="text"
        placeholder="Search…"
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition duration-300">
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );

};
export default SearchInput;
