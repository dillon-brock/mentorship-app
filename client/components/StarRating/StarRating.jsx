import ReactStars from 'react-stars'

export default function StarRating({ value, editable, ratingChanged, half }) {
  
  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      color2={'#ffd700'}
      edit={editable}
      value={value}
      half={half}
      />
  )
}


