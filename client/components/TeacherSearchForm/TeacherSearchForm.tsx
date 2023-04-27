import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import LocationDropdown from "../LocationDropdown/LocationDropdown";
import PriceDropdown from "../PriceDropdown/PriceDropdown";
import styles from './teacherSearchForm.module.css';

type Props = {
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
}

export default function TeacherSearchForm({ errorMessage, setErrorMessage, handleSubmit }: Props) {
  const [showLocationDropdown, setShowLocationDropdown] = useState<boolean>(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(25);
  const [zipCode, setZipCode] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

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
          <LocationDropdown 
            radius={radius} 
            setRadius={setRadius}
            zipCode={zipCode}
            setZipCode={setZipCode} 
            setErrorMessage={setErrorMessage}
            showLocationDropdown={showLocationDropdown} 
          />
        </div>
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown} onClick={() => setShowPriceDropdown(prev => !prev)}>
            <p className={styles.dropdownName}>PRICE</p>
            <FaChevronDown />
          </div>
          <PriceDropdown
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            showPriceDropdown={showPriceDropdown}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} type="submit">
            SEARCH
          </Button>
        </div>
      </Form>
      {errorMessage && 
        <Form.Text className="text-danger">{errorMessage}</Form.Text>
      }
    </div>
  )
}