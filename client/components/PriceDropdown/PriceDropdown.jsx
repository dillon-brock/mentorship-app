import { Form } from 'react-bootstrap';
import styles from './priceDropdown.module.css';

export default function PriceDropdown({ minPrice, setMinPrice, maxPrice, setMaxPrice }) {

  return (
    <div className={styles.container}>
      <Form.Group className="mb-2" controlId="minPrice">
        <Form.Label className={styles.label}>MIN</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="number"
          name="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="maxPrice">
        <Form.Label className={styles.label}>MAX</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="number" 
          name="maxPrice" 
          value={maxPrice} 
          onInput={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>
    </div>
  )
}