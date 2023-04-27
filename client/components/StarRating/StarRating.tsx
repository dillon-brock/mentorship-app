import ReactStars from 'react-stars';

type Props = {
  value: number;
  editable: boolean;
  half?: boolean;
  ratingChanged?: (newRating: number) => void;
}

export default function StarRating({ value, editable, ratingChanged, half }: Props) {
  
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


