"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';

const AfteLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/users/profile",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        const { username } = response.data.user;        
        setUsername(username);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="relative">
        <button
          className="flex flex-row gap-2 w-auto px-4 h-[50px] items-center justify-center rounded-xl shadow-sm hover:border-[#D9D9D9] hover:border"
          onClick={toggleDropdown}
        >
          {username ? (
            <>
              Welcome, {username.length > 6 ? `${username.substring(0, 7)}...` : username}
            </>
          ) : (
            "Loading..."
          )}
          {isOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 15L12 9L6 15" stroke="#33363F" strokeWidth="2" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="#33363F" strokeWidth="2" />
            </svg>
          )}
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-auto px-24 shadow-md rounded-md bg-white z-55 pl-2 right-0">
            <ul className="px-2 py-5 flex flex-col gap-4">
              <li>
                <Link href="/profile">
                  <button className="hover:font-medium">Profile</button>
                </Link>
              </li>
              <li>
                <Link href="/setting">
                  <button className="hover:font-medium">Setting</button>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <button className="text-red-400 hover:font-medium items-start justify-start">
                    Log Out
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AfteLogin;
