"use client";
import React, { useState, useEffect, useRef } from "react";
import UserChips from "@/components/UserChips";
import { User } from "../utils/models";
import {allUsers } from "../utils/helper";
import ShowSuggestions from "@/components/ShowSuggestions";

export default function UserSelector() {
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [userList, setUserList] = useState<User[]>(allUsers);
  const [showUserList, setShowUserList] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setShowUserList(true);
    if (value !== "") {
      const filterUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filterUsers);
    } else {
      setFilteredUsers(userList);
    }
  };

  const handleUserSelect = (user: User,showSuggestions:boolean) => {
    setBackspaceCount(0);
    const newUsers = userList.filter((u) => u.id !== user.id);
    setUserList(newUsers);
    setSelectedUser([...selectedUser, user]);
    showSuggestions ? setShowUserList(true) : setShowUserList(false);
    setInputValue("");
    setFilteredUsers(newUsers);
  };
  const handleFocus = () => {
    setShowUserList(true);
  };
  const deleteUser = (delUser: User) => {
    const newUsers = selectedUser.filter((user) => user.id !== delUser.id);
    setSelectedUser(newUsers);
    setUserList([...userList, delUser]);
    setFilteredUsers([...filteredUsers, delUser]);
  };

  useEffect(() => {
    const handleKeyDown = (event:KeyboardEvent) => {
      if (event.key === "Backspace") {
        if (inputValue === "") {
          setBackspaceCount((prev) => prev + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (
      inputValue === "" &&
      selectedUser.length > 0 &&
      backspaceCount > 0 &&
      backspaceCount % 2 === 0
    ) {
      const lastUser = selectedUser[selectedUser.length - 1];
      deleteUser(lastUser);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowUserList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [backspaceCount, showUserList]);

  return (
    <div className="py-[60px] w-[60%] mx-auto">
      <h1 className="mb-[30px] text-blue-700 text-center text-[24px] font-bold">
        Pick Users
      </h1>
      <div className="flex flex-wrap gap-[10px] items-start border-b-[5px] border-blue-500 border-solid pb-[10px]">
        <UserChips
          selectedUsers={selectedUser}
          deleteUser={deleteUser}
          count={backspaceCount}
          inputVal={inputValue}
        />
        <div className="relative mt-[5px]" ref={divRef}>
          <input
            type="text"
            placeholder="Add new user..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className="border-none outline-none focus:ring-0"
          />

          {showUserList && filteredUsers.length > 0 ? (
            <ShowSuggestions
              filteredUsers={filteredUsers}
              inputValue={inputValue}
              handleUserSelect={handleUserSelect}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
