import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import LocationDropdown from "../LocationDropdown/LocationDropdown.jsx";
import PriceDropdown from "../PriceDropdown/PriceDropdown.jsx";
import styles from './teacherSearchForm.module.css';

export default function TeacherSearchForm({ errorMessage, setErrorMessage, handleSubmit }) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [radius, setRadius] = useState(25);
  const [zipCode, setZipCode] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p className={styles.title}>Filters</p>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="subject">
          <Form.Control className={styles.input} type="text" placeholder="SUBJECT" name="subject" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="lessonType">
          <Form.Select className={styles.input} name="lessonType">
            <option value="Any">Any</option>
            <option value="In person">In person</option>
            <option value="Remote">Remote</option>
          </Form.Select>
        </Form.Group>

        <div style={{ position: 'relative' }}>
          <div className={styles.dropdown} onClick={() => setShowLocationDropdown(prev => !prev)}>
            <p className={styles.dropdownName}>DISTANCE</p>
            <FaChevronDown />
          </div>
          {showLocationDropdown && 
            <LocationDropdown 
              radius={radius} 
              setRadius={setRadius}
              zipCode={zipCode}
              setZipCode={setZipCode} 
              setErrorMessage={setErrorMessage} 
            />
          }
        </div>
        <div style={{ position: 'relative' }}>
          <div className={styles.dropdown} onClick={() => setShowPriceDropdown(prev => !prev)}>
            <p className={styles.dropdownName}>PRICE</p>
            <FaChevronDown />
          </div>
          {showPriceDropdown &&
            <PriceDropdown
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          }
        </div>
        {errorMessage && 
          <Form.Text className="text-danger">{errorMessage}</Form.Text>
        }
        <div className={styles.buttonContainer}>
          <Button className={styles.button} type="submit">
            Update Results
          </Button>
        </div>
      </Form>
    </div>
  )
}