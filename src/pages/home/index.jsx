import { FilterOutlined } from "@ant-design/icons";
import { NavBar } from "../NavBar";
import "./Home.module.css";
import { Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDesktop,
  faGraduationCap,
  faMagnet,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Cards } from "./Cards";
import { FOoter } from "../Footer";
import { Footer } from "antd/es/layout/layout";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 my-14">
        <h2 className="text-4xl font-bold sm:text-center lg:text-left">
          Search instructors
        </h2>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-5">
          <div className="search my-5">
            <input
              type="search"
              className="border  p-4 rounded-lg lg:search sm:w-full "
              placeholder="Search by company, role, name..."
            />
          </div>
          <div className="flex justify-center items-center up m-5">
            <div className="mr-4 border rounded-lg p-4 w-5/6 flex justify-between">
              <p className="font-medium">Show only available instructors</p>
              <Switch defaultChecked />
            </div>
            <div className="border rounded-lg p-4 w-1/6 flex justify-around">
              <FilterOutlined />
              <p>Filter</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center my-14">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="rounded-full bg-gray-200 w-9 py-2.5"
          />
          <div className="text-center">
            <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
            <p className="text-sm	pt-1">Academy</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faMagnet} className="text-2xl" />
            <p className="text-sm	pt-1">Science & Engineering</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faDesktop} className="text-2xl" />
            <p className="text-sm	pt-1">Computer Programming</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
            <p className="text-sm	pt-1">Soft Skills</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faMagnet} className="text-2xl" />
            <p className="text-sm	pt-1">Science & Engineering</p>
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faDesktop} className="text-2xl" />
            <p className="text-sm	pt-1">Computer Programming</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="rounded-full bg-gray-200 w-9 py-2.5"
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
          <button className="bg-btn text-white py-5 px-10 rounded">
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
