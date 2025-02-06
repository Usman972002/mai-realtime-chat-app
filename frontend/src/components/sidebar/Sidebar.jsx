import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = ({ onConversationSelect }) => {
  // return (
  //   <div className='border-r border-slate-500 w-full lg:w-[100%] flex flex-col'>
  //     <SearchInput />
  //     <div className='divider px-3'></div>
  //     <Conversations onConversationSelect={onConversationSelect} />
  //     <LogoutButton />
  //   </div>
  // );
  return (
    <div className="border-r border-gray-300 w-full flex flex-col bg-white shadow-lg rounded-lg p-4">
      <SearchInput />
      <div className="border-b border-gray-300 my-3"></div>
      <Conversations onConversationSelect={onConversationSelect} />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
