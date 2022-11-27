import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getCityFromZipCode } from "../../services/zipcode";

export default function TeacherLessonForm({ setSubject, setZipCode, setStep, cityName, setCityName, stateName, setStateName }) {

  const subjectInputRef = useRef();
  const zipCodeInputRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [showCity, setShowCity] = useState(false);
  const [zipCodeChecked, setZipCodeChecked] = useState(false);

  console.log(formErrors);

  const isFormInvalid = () => {
    let invalid = false;

    if (zipCodeInputRef.current.value === '') {
      setFormErrors({ ...formErrors, zipCode: 'Zip code is required'});
      invalid = true;
    }

    if (formErrors.zipCode) invalid = true;
    
    if (subjectInputRef.current.value === '') {
      setFormErrors({ ...formErrors, subject: 'Subject is required'});
      invalid = true;
    }

    return invalid;
  };

  const handleChangeSubject = () => {
    if (formErrors.subject) setFormErrors({ ...formErrors, subject: ''});
  }

  const handleChangeZipCode = () => {
    if (formErrors.zipCode) setFormErrors({ ...formErrors, zipCode: ''});
  }

  const handleNext = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    if (!zipCodeChecked) {
      const zipCodeResponse = await getCityFromZipCode(formData.get('zip'));
      if (zipCodeResponse.city && zipCodeResponse.state) {
        setCityName(zipCodeResponse.city);
        setStateName(zipCodeResponse.state);
        setZipCodeChecked(true);
      }
      else if (zipCodeResponse.error_msg) {
        setFormErrors({ zipCode: 'Please enter a valid zip code'});
        return;
      }
    }
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zip'));
    setStep(3);
  }

  const handleEnterZipCode = async (e) => {
    if (Number(e.target.value) && e.target.value.length === 5) {
      const zipCodeResponse = await getCityFromZipCode(e.target.value);
      if (zipCodeResponse.city && zipCodeResponse.state) {
        setShowCity(true);
        setCityName(zipCodeResponse.city);
        setStateName(zipCodeResponse.state);
        setZipCodeChecked(true);
      }
      else if (zipCodeResponse.error_msg) {
        setFormErrors({ zipCode: 'Please enter a valid zip code'});
        setZipCodeChecked(true);
      }
    }
  }
  
  return (
    <Form onSubmit={handleNext}>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name="subject" ref={subjectInputRef} onChange={handleChangeSubject}></Form.Control>
        {formErrors.subject &&
          <Form.Text className="text-danger">{formErrors.subject}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-1" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="number" placeholder="97214" name="zip" ref={zipCodeInputRef} onChange={handleChangeZipCode} onBlur={handleEnterZipCode}></Form.Control>
        {formErrors.zipCode &&
          <Form.Text className="text-danger">{formErrors.zipCode}</Form.Text>
        }
      </Form.Group>

      {showCity &&
      <div>
        <Form.Text>
          {cityName}, {stateName}
        </Form.Text>
      </div>
      }
      <Button type="submit">Next</Button>
    </Form>
  );
}