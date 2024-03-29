import { Form } from "react-bootstrap";
import styles from './locationDropdown.module.css';
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  radius: number;
  setRadius: Dispatch<SetStateAction<number>>;
  zipCode: string;
  setZipCode: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  showLocationDropdown: boolean;
}

export default function LocationDropdown({ radius, setRadius, zipCode, setZipCode, setErrorMessage, showLocationDropdown }: Props) {

  const handleChangeZipCode = (e: ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    setErrorMessage('');
  }

  return (
    <div className={styles.container} style={{ visibility: showLocationDropdown ? 'visible' : 'hidden' }}>
      <Form.Group className="mb-2" controlId="zipCode">
        <Form.Control 
          className={styles.input} 
          type="number"
          minLength={5}
          maxLength={5}
          placeholder="ZIP CODE" 
          name="zipCode"
          value={zipCode} 
          onChange={handleChangeZipCode} 
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="radius">
        <Form.Control 
          className={styles.input} 
          type="range" 
          min="0" 
          max="50" 
          step="5" 
          name="radius" 
          value={radius} 
          onInput={(e: ChangeEvent<HTMLInputElement>) => setRadius(Number(e.target.value))}
        />
        <Form.Text className={styles.radiusDisplay}>{radius} miles</Form.Text>
      </Form.Group>
    </div>
  );
}