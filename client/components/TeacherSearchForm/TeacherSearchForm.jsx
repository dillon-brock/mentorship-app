import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import styles from './teacherSearchForm.module.css';

export default function TeacherSearchForm({ errorMessage, setErrorMessage, handleSubmit }) {

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

        <div className={styles.dropdown}>
          <p className={styles.dropdownName}>Distance</p>
          <FaChevronDown />
        </div>
        <div className={styles.dropdown}>
          <p className={styles.dropdownName}>Price</p>
          <FaChevronDown />
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