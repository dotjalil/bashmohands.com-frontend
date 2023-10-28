import "./Cover.css";

export default function CoverPhoto({ cover }) {
  return (
    <div className="cover">
      <div
        className="cover-img"
        style={{ backgroundImage: `url("${cover || "/default-cover.jpg"}")` }}
      ></div>
    </div>
  );
}
