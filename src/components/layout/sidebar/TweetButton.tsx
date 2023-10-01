import Button from "@/components/common/Button";
import { FaFeather } from "react-icons/fa";

const TweetButton = () => {
  return (
    <>
      <Button btnWidth="full" className="hidden lg:block rounded-full !mt-6">
        Tweet
      </Button>
      <Button btnType="iconOnly" btnSize="lg" className="block lg:hidden">
        <FaFeather size={22} />
      </Button>
    </>
  );
};
export default TweetButton;
