import { Col, Container, Image } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";

export default function Review({ stars, detail, firstName, lastName, imageUrl, anonymous, createdAt }) {

  const splitDate = new Date(createdAt).toString().split(' ');
  const date = `${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;

  return (
    <div style={{ position: 'relative' }}>
      {!anonymous &&
      <Container className="d-flex align-items-center" style={{ gap: '12px' }}>
        <Image src={imageUrl} roundedCircle style={{ width: '42px', height: '42px', display: "inline-block" }} />
        <Col>
          <p style={{ margin: 0 }}>{firstName} {lastName}</p>
          <p className="text-muted" style={{ margin: 0, fontStyle: 'italic' }}>{date}</p>
        </Col>
      </Container>
      }
      <StarRating value={Number(stars)} editable={false} />
      <p>{detail}</p>
      <hr />
    </div>
  )
}