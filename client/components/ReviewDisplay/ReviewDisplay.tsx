import { Col, Container, Image } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";
import styles from './reviewDisplay.module.css';

type Props = {
  stars: string;
  detail: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  anonymous: boolean;
  createdAt: string;
}

export default function Review({ 
  stars, detail, firstName, lastName, 
  imageUrl, anonymous, createdAt }: Props) {

  const splitDate: string[] = new Date(createdAt).toString().split(' ');
  const date: string = `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;

  return (
    <div className={styles.reviewContainer}>
      {!anonymous &&
      <Container className={styles.container}>
        <Image className={styles.image} src={imageUrl} roundedCircle />
        <Col>
          <p className={styles.name}>{firstName} {lastName}</p>
          <p className={styles.date}>{date}</p>
        </Col>
      </Container>
      }
      <StarRating 
        value={Number(stars)} 
        editable={false} 
        half={false}
        ratingChanged={null}
      />
      <p>{detail}</p>
      <hr />
    </div>
  )
}