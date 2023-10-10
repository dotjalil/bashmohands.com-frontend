import React from "react";

export const NavBar = () => {
  return (
    <div>
      <div className="border-b">
        <div className="container px-5 flex justify-between items-center py-4">
          <div className="italic fs-title font-bold">
            <span className="main-color">bash</span>mohands.
            <span className="text-base">com</span>
          </div>
          <ul className="lg:flex justify-center align-center sm:hidden">
            <li className="font-bold">Home</li>
            <li className="px-4">Instructors</li>
            <li>My Sessions</li>
          </ul>
          <div className="flex sm:rounded-full lg:rounded-3xl border lg:px-4 lg:py-2 sm:p-1 items-center">
            <div className="img sm:pr-0 lg:pr-3">
              <img
                src="imgs/cat-02.jpg"
                className="logo-img rounded-full"
                alt=""
              />
            </div>
            <div className="img lg:inline-block sm:hidden">
              Abdelrhman Elsayed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
