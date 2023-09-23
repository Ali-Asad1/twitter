import { FaFeather } from "react-icons/fa";

const TweetButton = () => {
  return (
    <div className="select-none">
      <button className="mt-6 w-14 h-14 p-4 flex lg:hidden justify-center items-center bg-blue-9 hover:bg-blue-10 active:bg-blue-11 rounded-full cursor-pointer transition">
        <FaFeather size={24} color="white" />
      </button>
      <button className="w-full mt-6 hidden lg:block xp-6 py-2 bg-blue-9 hover:bg-blue-10 active:bg-blue-11 rounded-full cursor-pointer transition">
        <p className="text-xl font-semibold text-white">Tweet</p>
      </button>
    </div>
  );
};
export default TweetButton;
