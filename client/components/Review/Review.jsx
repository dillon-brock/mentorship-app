import StarRating from "../StarRating/StarRating";

export default function Review({ stars, detail }) {

  return (
    <div>
      <StarRating value={Number(stars)} editable={false} />
      <p>{detail}</p>
    </div>
  )
}