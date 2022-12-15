import { Form } from 'react-bootstrap';
import styles from './priceDropdown.module.css';

export default function PriceDropdown({ 
  minPrice, 
  setMinPrice, 
  maxPrice, 
  setMaxPrice, 
  showPriceDropdown 
}) {

  return (
    <div className={styles.container} style={{ visibility: showPriceDropdown ? 'visible' : 'hidden' }}>
      <Form.Group className="mb-2" controlId="minPrice">
        <Form.Label className={styles.label}>MIN</Form.Label>
        <div className={styles.inputContainer}>
          <p className={styles.currency}>$</p>
          <Form.Control 
            className={styles.input} 
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-2" controlId="maxPrice">
        <Form.Label className={styles.label}>MAX</Form.Label>
        <div className={styles.inputContainer}>
          <p className={styles.currency}>$</p>
          <Form.Control 
            className={styles.input} 
            type="number" 
            name="maxPrice" 
            value={maxPrice} 
            onInput={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </Form.Group>
    </div>
  )
}