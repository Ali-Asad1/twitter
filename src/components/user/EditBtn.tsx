"use client";

import { BiPencil } from "react-icons/bi";

import Button from "../common/Button";

const EditBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button onClick={onClick} btnSize="sm" btnType="iconOnly">
      <BiPencil size={24} />
    </Button>
  );
};
export default EditBtn;
