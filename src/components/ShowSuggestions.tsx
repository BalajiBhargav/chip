import { renderHighlightedText } from '@/utils/helper';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from "../app/index.module.scss"
import { User } from '@/utils/models';

interface ShowSuggestionsProps{
    filteredUsers: User[];
    inputValue: string;
    handleUserSelect: (user: User,showSuggestions:boolean) => void;
}

const ShowSuggestions = ({ filteredUsers, inputValue, handleUserSelect }: ShowSuggestionsProps) => {
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.focus();
    }
  }, [ulRef]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setSelectedSuggestionIndex(prevIndex => Math.min(prevIndex + 1, filteredUsers.length - 1));
    } else if (event.key === "ArrowUp") {
      setSelectedSuggestionIndex(prevIndex => Math.max(prevIndex - 1, -1));
    } else if (event.key === "Enter" && selectedSuggestionIndex !== -1) {
      handleUserSelect(filteredUsers[selectedSuggestionIndex],true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredUsers,selectedSuggestionIndex]);

  return (
    <div className={`absolute top-[30px] shadow-lg pl-6 pt-6 bg-white rounded-md `}>
      <ul
        tabIndex={1}
        ref={ulRef}
        className={`w-[320px] h-[160px] overflow-auto flex flex-col gap-[25px] pr-3 focus:outline-none ${styles.scroll}`}
      >
        {filteredUsers.map((user: User, index: number) => (
          <li
            key={"filter" + user.id}
            onClick={() => handleUserSelect(user,false)}
            className={`flex justify-between ${selectedSuggestionIndex === index ? 'bg-gray-200' : ''}`}
          >
            <div className="flex gap-[10px]">
              <div className="w-[25px] h-[25px] relative">
                <Image
                  src={user.imageUrl}
                  alt={""}
                  layout="fill"
                  objectFit="cover"
                  className="mr-[4px] rounded-full"
                />
              </div>
              <p className="font-[500]">
                {renderHighlightedText(user.name, inputValue)}
              </p>
            </div>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowSuggestions;
