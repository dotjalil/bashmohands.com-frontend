import React from "react";

export const Cards = () => {
  return (
    <div>
      <div className="border text-center p-3 rounded up-card">
        <img
          src="http://via.placeholder.com/284x284"
          alt=""
          className="rounded"
        />
        <p className="text-xl font-bold text-left pt-5">Mona Essawy</p>
        <p className="text-sm text-left">Software Engineer at Vodafone</p>

        <div>
          <div className="flex justify-between my-5">
            <div className="exp text-left">
              <p className="text-sm">Experience</p>
              <p className="text-sm">8 Years</p>
            </div>
            <div className="rate text-left border-l pl-3 pr-10">
              <p className="text-sm">Rate</p>
              <p className="line-through text-sm main-color">$20/hr</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <p className="details mt-2 text-left py-2 px-3 rounded-3xl w-fit text-xs">
              🔥 Free 30-min session
            </p>
            <p className="details mt-2 text-left py-2 px-3 rounded-3xl w-fit text-xs">
              🧑 Teaching
            </p>
            <p className="details mt-2 text-left py-2 px-3 rounded-3xl w-fit text-xs">
              💼 Career Mentoring
            </p>
            <p className="text-xs text-left mt-2">+10 more...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
