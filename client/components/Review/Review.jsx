import { Col, Container, Image } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";
import styles from './review.module.css';

export default function Review({ stars, detail, firstName, lastName, imageUrl, anonymous, createdAt }) {

  const splitDate = new Date(createdAt).toString().split(' ');
  const date = `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;

  return (
    <div style={{ position: 'relative' }}>
      {!anonymous &&
      <Container className={styles.container}>
        <Image className={styles.image} src={imageUrl} roundedCircle style={{ width: '42px', height: '42px', display: "inline-block" }} />
        <Col>
          <p className={styles.name}>{firstName} {lastName}</p>
          <p className={styles.date}>{date}</p>
        </Col>
      </Container>
      }
      <StarRating value={Number(stars)} editable={false} />
      <p>{detail}</p>
      <hr />
    </div>
  )
}