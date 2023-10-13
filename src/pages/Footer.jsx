import React from "react";

export const FOoter = () => {
  return (
    <div>
      <div className="flex justify-between py-10 border-b flex-wrap">
        <div>
          <div className="italic text-3xl ">
            <span className="main-color">bash</span>mohands.
            <span className="text-sm">com</span>
          </div>
          <p className="pt-5">
            A free access to the most talented professionals in the Middle East
            and Africa. Join the wave!
          </p>
        </div>

        <div className="flex gap-10 sm:pt-5 ">
          <ul>
            <li className="cursor-pointer">Our story</li>
            <li className="cursor-pointer py-3">Meet the team</li>
            <li className="cursor-pointer">How it work</li>
          </ul>
          <ul className="">
            <li className="pb-3 cursor-pointer">Find instructor</li>
            <li className="cursor-pointer">Become instructor</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between pt-5">
        <div>© Copyright 2023 - BashMohands.com</div>
        <div>Privacy Policy • Terms & Conditions</div>
      </div>
    </div>
  );
};
