import { Badge } from "@material-ui/core";
import { unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";

export const SingleContent = ({ id, title, poster, date, media_type, vote_average }) => {
  const posterImage = poster !== "N/A" ? poster : unavailable;
  // Only display the Badge if vote_average is not "N/A"
  const displayVoteAverage = vote_average !== "N/A" && vote_average !== undefined ? vote_average : null;

  const handleImageError = (event) => {
    event.target.src = unavailable;
  };

  return (
    <ContentModal media_type={media_type} id={id}>
      {displayVoteAverage && (
        <Badge badgeContent={displayVoteAverage} color={displayVoteAverage > 5.99 ? "primary" : "secondary"} />
      )}
      <img
        className="poster"
        src={posterImage}
        alt={title}
        onError={handleImageError}
      />
      <b className={title.length > 16 ? "title-1" : "title"}>{title}</b>
      <div className="details">
        <span>{media_type === "movie" ? "Movie" : "TV Series"}</span>
        <span>{date}</span>
      </div>
    </ContentModal>
  );
};
