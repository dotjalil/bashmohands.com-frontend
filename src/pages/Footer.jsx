import React from "react";

export const FOoter = () => {
  return (
    <div>
      <div className="flex justify-between py-10 border-b flex-wrap">
        <div>
          <div className="italic text-3xl font-bold">
            <span className="main-color">bash</span>mohands.
            <span className="text-base">com</span>
          </div>
          <p className="pt-5">
            A free access to the most talented professionals in the Middle East
            and Africa. Join the wave!
          </p>
        </div>

        <div className="flex gap-10 sm:pt-5 ">
          <ul>
            <li>Our story</li>
            <li className="py-3">Meet the team</li>
            <li>How it work</li>
          </ul>
          <ul className="">
            <li className="pb-3">Find instructor</li>
            <li>Become instructor</li>
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
