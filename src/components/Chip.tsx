import React from 'react';
import Image from 'next/image';
import { User } from '@/utils/models';

interface ChipProps {
  index: number;
  user: User;
  deleteUser: (delUser: User) => void;
}

const Chip = ({index,user,deleteUser}:ChipProps) => {
  return (
    <div
    className="w-[150px] bg-slate-300 rounded-[20px] flex  justify-between items-center p-[5px]"
    key={"select" + index}
  >
    <div className="w-[25px] h-[25px] relative">
      <Image
        src={user.imageUrl}
        alt={""}
        layout="fill"
        objectFit="cover"
        className="mr-[4px] rounded-full"
      />
    </div>
    <p>{user.name}</p>
    <button onClick={() => deleteUser(user)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="16"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
  );
}

export default Chip;
