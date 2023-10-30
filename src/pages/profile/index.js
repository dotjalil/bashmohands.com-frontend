import "./Style.css";
import { Suspense } from "react";
import { Layout } from "antd";
import {
  defer,
  json,
  useRouteLoaderData,
  useLoaderData,
  Await,
} from "react-router-dom";
import CoverPhoto from "./ui/Cover";
import ProfileHeader from "./ui/Header";
import About from "./ui/About";
import getAuthData from "../../shared/model/getAuthData";
import ProfileSkeleton from "./ui/Skeleton";
import ErrorElement from "../../components/Error";
const { Content } = Layout;

const ProfilePage = () => {
  const { data } = useLoaderData();

  // const { firstName, lastName, photo, bio, country, topics, isMine } = data;
  return (
    <>
      <Suspense fallback={<ProfileSkeleton />}>
        <Await resolve={data} errorElement={<ErrorElement />}>
          {(profileData) => (
            <div>
              <CoverPhoto />
              <Content style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                <ProfileHeader
                  firstName={profileData.firstName}
                  photo={profileData.photo}
                  lastName={profileData.lastName}
                  jobTitle={"Software Developer"}
                  company={"Vodafone"}
                  handler={profileData.handler}
                  isMine={profileData.isMine}
                />
                <About bio={profileData.bio} />
              </Content>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default ProfilePage;

async function asyncProfilePageLoader(request, params) {
  console.log("profile loader");
  // extract handler from url
  const handler = params.handler;

  // determine is this handler mine or not
  let isMine = false;
  const { user } = getAuthData();
  if (user.handler === handler) {
    isMine = true;
  }

  // request public profile info
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_API}user/public/${handler}`
  );

  if (!response.ok) {
    // Error handling
    throw json({ message: "Couldn't load user profile!" }, { status: 500 });
  } else {
    const resJson = await response.json();
    //   // Send the isMine along with user data
    const data = { ...resJson.data, isMine, handler };
    // send data to the component and render
    // return {
    //   firstName: "Mohamed",
    //   lastName: "Kadri",
    //   photo: null,
    //   bio: "lorem ipsum ya 3m el 7g 3lshan nrwa2",
    //   country: "Egypt",
    //   topics: ["JS"],
    //   isMine: false,
    // };
    return data;
  }
}

export function profilePageLoader({ request, params }) {
  // console.log(params);
  return defer({
    data: asyncProfilePageLoader(request, params),
  });
}
