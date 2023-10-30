import BookModal from "./BookSession";
import "./Header.css";

export default function ProfileHeader({
  firstName,
  lastName,
  bio,
  photo,
  coverImage,
  country,
  topics,
  jobTitle,
  company,
  isMine,
  handler,
}) {
  return (
    <div className="photo-name">
      <div
        className="img"
        style={{ backgroundImage: `url("${photo}")`, backgroundSize: "cover" }}
      ></div>
      <div className="txt-container">
        <div className="txt">
          <p>{firstName + " " + lastName}</p>
          <p>{jobTitle + " at " + company}</p>
        </div>

        {!isMine && (
          <BookModal
            firstName={firstName}
            lastName={lastName}
            flag="🇪🇬"
            title={jobTitle}
            company={company}
            topics={topics}
            handler={handler}
            photo={photo}
          />
        )}
      </div>
    </div>
  );
}
