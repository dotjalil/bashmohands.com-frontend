import { NavBar } from "../NavBar";
import "./Home.module.css";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Cards } from "./Cards";
import { FOoter } from "../Footer";
import { Footer } from "antd/es/layout/layout";

const HomePage = () => {
  return (
    <div>
      <div className="border-b">
        <NavBar />
      </div>
      <div className="container mx-auto px-4 my-14">
        <h2 className="text-4xl font-bold text-left">Search instructors</h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-5">
          <div className="search my-5 relative">
            <input
              type="search"
              className="border rounded-lg"
              placeholder="Search by company, role, name..."
            />
            <img src="imgs/3.svg" className="search-icon" alt="" />
          </div>
          <div className="flex items-center">
            <div className="mr-4 border rounded-lg available w-5/6 flex justify-between items-center px-3">
              <p className="font-medium">Show only available instructors</p>
              <Switch defaultChecked />
            </div>
            <div className="border rounded-lg p-4 w-1/6 flex justify-center items-center filter cursor-pointer">
              <img
                src="imgs/2.svg"
                alt="icon"
                style={{ width: "26px", height: "22px" }}
              />
              <p className="pl-3 text-base">Filter</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center my-14 test">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="rounded-full bg-gray-200 w-9 py-2.5 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center">
            <img src="imgs/4.svg" alt="" />
            <p className="text-sm	pt-1 text-center">Academy</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="imgs/1.svg" alt="" />
            <p className="text-sm	pt-1 text-center" style={{ width: "171px" }}>
              Science & Engineering
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="imgs/5.svg" alt="" />
            <p className="text-sm	pt-1 text-center" style={{ width: "171px" }}>
              Computer <br /> Programming
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="imgs/6.svg" alt="" />
            <p className="text-sm	pt-1 text-center">Soft Skills</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="imgs/1.svg" alt="" />
            <p className="text-sm	pt-1 text-center" style={{ width: "171px" }}>
              Science & Engineering
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="imgs/5.svg" alt="" />
            <p className="text-sm	pt-1 text-center">
              Computer <br /> Programming
            </p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="rounded-full bg-gray-200 w-9 py-2.5 cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>

        <div className="text-center mt-10">
          <button className="bg-second text-white py-5 px-10 rounded">
            Load more instructors
          </button>
        </div>
      </div>

      <Footer>
        <FOoter />
      </Footer>
    </div>
  );
};

export default HomePage;
