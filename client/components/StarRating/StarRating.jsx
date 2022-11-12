// import { useState } from "react";
// import { Rating } from "react-simple-star-rating";

// export default function StarRating({ initialValue, readOnly }) {
//   const [rating, setRating] = useState(initialValue);

//   const handleRating = (rate) => {
//     setRating(rate)
//   }

//   if (readOnly) return <Rating initialValue={initialValue} readonly={readOnly} />
//   return <Rating initialValue={initialValue} onClick={handleRating} />
// }

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


