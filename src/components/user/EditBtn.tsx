"use client";

import { BiPencil } from "react-icons/bi";

import Button from "../common/Button";

type EditBtnProps = {
  onClick: () => any;
  btnType: "icon" | "default";
};

const EditBtn: React.FC<EditBtnProps> = ({ onClick, btnType }) => {
  return (
    <>
      {btnType === "icon" ? (
        <Button onClick={onClick} btnSize="sm" btnType="iconOnly">
          <BiPencil size={24} />
        </Button>
      ) : (
        <Button onClick={onClick} btnSize="sm" btnStyle="secondary">
          Edit
        </Button>
      )}
    </>
  );
};
export default EditBtn;
