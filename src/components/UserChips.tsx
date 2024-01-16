import React from "react";
import Chip from "./Chip";
import { User } from "../utils/models";
import styles from "../app/index.module.scss";

interface UserChipsProps  {
  selectedUsers:User[];
  count: number;
  inputVal: string;
  deleteUser: (delUser: User) => void;

}

const UserChips = ({ selectedUsers, deleteUser, count, inputVal }: UserChipsProps) => {
  return (
    <div
      className={`flex gap-[10px]  ${
        inputVal === "" && count % 2 === 1 ? styles.root : ""
      }`}
    >
      {selectedUsers.map((user: User, index: number) => {
        return <Chip key={user.id} user={user} index={index} deleteUser={deleteUser} />;
      })}
    </div>
  );
};

export default UserChips;
