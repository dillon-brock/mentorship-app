import { useState } from "react";
import { Form } from "react-bootstrap";
import styles from './locationDropdown.module.css';

export default function LocationDropdown({ setErrorMessage }) {

  const [radiusForDisplay, setRadiusForDisplay] = useState(25);

  return (
    <div className={styles.container}>
      <Form.Group className="mb-2" controlId="zipCode">
        <Form.Control 
          className={styles.input} 
          type="number"
          minLength="5"
          maxLength="5"
          placeholder="ZIP CODE" 
          name="zipCode" 
          onChange={() => setErrorMessage('')} 
        />
      </Form.Group>
      <Form.Group controlId="radius">
        <Form.Control 
          className={styles.input} 
          type="range" 
          min="0" 
          max="50" 
          step="5" 
          name="radius" 
          value={radiusForDisplay} 
          onInput={(e) => setRadiusForDisplay(e.target.value)}
        />
        <Form.Text className={styles.radiusDisplay}>{radiusForDisplay} miles</Form.Text>
      </Form.Group>
    </div>
  );
}