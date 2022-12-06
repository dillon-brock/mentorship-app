import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
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
    <div className={styles.container}>
      <p className={styles.title}>Filters</p>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group controlId="subject">
          <Form.Control className={styles.subjectInput} type="text" placeholder="SUBJECT" name="subject" />
        </Form.Group>

        <Form.Group controlId="lessonType">
          <Form.Select className={styles.select} name="lessonType" defaultValue={""}>
            <option value="" disabled>LESSON FORMAT</option>
            <option value="Any">ANY</option>
            <option value="In person">IN PERSON</option>
            <option value="Remote">REMOTE</option>
          </Form.Select>
        </Form.Group>

        <div className={styles.dropdownContainer}>
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
        <div className={styles.dropdownContainer}>
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
            SEARCH
          </Button>
        </div>
      </Form>
    </div>
  )
}