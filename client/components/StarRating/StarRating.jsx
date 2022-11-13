import ReactStars from 'react-stars'

export default function StarRating({ value, editable }) {
  
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  
  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      color2={'#ffd700'}
      edit={editable}
      value={value}
      />
  )
}


