import { StarIcon } from "@heroicons/react/20/solid";

function StarRating({ totalStars = 5, ratings = 87 }) {
  const likes = ratings.total - ratings.dislikes;
  const averageRating = Math.round((likes / ratings.total) * 5);

  return (
    <div className="ratings flex items-end space-x-2">
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon
          key={index}
          className={index < averageRating ? "fill-rating-rated" : "fill-rating-not-rated"}
        />
      ))}
      <p className="text-sm font-semibold text-discount">({ratings.total})</p>
    </div>
  );
}

export default StarRating;
