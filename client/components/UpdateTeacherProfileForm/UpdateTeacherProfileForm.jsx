import { Button, Form, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import styles from './updateTeacherProfileForm.module.css';
import globalStyles from '../../global.module.css';
import { updateAccount } from "../../services/teacher";
import { useRef, useState } from "react";
import { getCityFromZipCode } from "../../services/zipcode.js";

export default function UpdateTeacherProfileForm({
  teacher,
  setTeacher,
  showImageEditButton, 
  setShowImageEditButton, 
  setUserWantsToEditProfile,
  setUserWantsToEditImage,
  zipCode,
  setZipCode,
  cityName,
  setCityName,
  stateName,
  setStateName,
}) {

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const zipCodeInputRef = useRef();
  const emailInputRef = useRef();
  const [zipCodeChecked, setZipCodeChecked] = useState(false);
  const [showCity, setShowCity] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const isFormInvalid = () => {
    let invalid = false;
    let errors = {};
    if (firstNameInputRef.current.value === '') {
      errors = { ...errors, firstName: 'First name is required.' }
      invalid = true;
    }
    if (lastNameInputRef.current.value === '') {
      errors = { ...errors, lastName: 'Last name is required.' }
      invalid = true;
    }
    if (zipCode === '') {
      errors = { ...errors, zipCode: 'Zip code is required.' }
      invalid = true;
    }
    if (emailInputRef.current.value !== '' && !emailInputRef.current.checkValidity()) {
      errors = { ...errors, email: 'Email is invalid.' }
      invalid = true;
    }
    setFormErrors(prev => ({ ...prev, ...errors }));
    return invalid;
  }

  const handleEnterZipCode = async (e) => {
    if (e.target.value.length === 5) {
      const zipCodeResponse = await getCityFromZipCode(e.target.value);
      if (zipCodeResponse.city && zipCodeResponse.state) {
        setCityName(zipCodeResponse.city);
        setStateName(zipCodeResponse.state);
        setZipCodeChecked(true);
        setShowCity(true);
      }
      else if (zipCodeResponse.error_msg) {
        setFormErrors({ ...formErrors, zipCode: 'Please enter a valid zip code.' });
        setZipCodeChecked(true);
        setShowCity(false);
      }
    }
    else if (e.target.value !== '') {
      setFormErrors({
        ...formErrors, 
        zipCode: 'Please enter a valid zip code.' 
      });
      setShowCity(false);
    }
  }

  const handleChangeFirstName = () => {
    if (formErrors.firstName) 
      setFormErrors({ ...formErrors, firstName: '' });
  }

  const handleChangeLastName = () => {
    if (formErrors.lastName)
      setFormErrors({ ...formErrors, lastName: '' });
  }

  const handleChangeZipCode = (e) => {
    setZipCode(e.target.value);
    if (formErrors.zipCode)
      setFormErrors({ ...formErrors, zipCode: '' });
    if (zipCodeChecked)
      setZipCodeChecked(false);
  }

  const handleChangeEmail = () => {
    if (formErrors.email)
      setFormErrors({ ...formErrors, email: '' });
  }

  const handleChangePhoneNumber = (e) => {
    e.target.value = e.target.value.replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid() || formErrors.zipCode) return;
    let city = cityName;
    let state = stateName;
    const formData = new FormData(e.target);
    if (!zipCodeChecked) {
      if (formData.get('zipCode')) {
        const zipCodeResponse = await getCityFromZipCode(formData.get('zipCode'));
        if (zipCodeResponse.city && zipCodeResponse.state) {
          setCityName(zipCodeResponse.city);
          setStateName(zipCodeResponse.state);
          city = zipCodeResponse.city;
          state = zipCodeResponse.state;
          setShowCity(true);
        }
        else if (zipCodeResponse.error_msg) {
          setFormErrors({ ...formErrors, zipCode: 'Please enter a valid zip code.' });
          setShowCity(false);
          return;
        }
      }
    }
    const formDataObj = Object.fromEntries(formData);
    const updateData = { ...formDataObj, city, state}
    console.log(updateData);
    await updateAccount({ 
      ...updateData,
      imageUrl: teacher.imageUrl
    });
    setTeacher({ ...teacher, ...updateData })
    setUserWantsToEditProfile(false);
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.form} >
      <div className={styles.formContent}>
        <div 
          className={styles.imageContainer}
          onMouseEnter={() => setShowImageEditButton(true)}
          onMouseLeave={() => setShowImageEditButton(false)}
        >
          {showImageEditButton &&
            <Button className={styles.imageEditButton} onClick={() => setUserWantsToEditImage(true)}>
              <FaEdit />
            </Button>
          }
          <Image 
            roundedCircle 
            src={teacher.imageUrl} 
            style={{ width: '300px', height: '300px' }} 
            />
        </div>
        <div>
          <h3 className={styles.editTitle}>Edit Your Profile</h3>
          <Form.Label className={styles.label}>First Name</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text"
            ref={firstNameInputRef}
            name="firstName"
            defaultValue={teacher.firstName}
            onChange={handleChangeFirstName}
          />
          {formErrors.firstName &&
          <div>
            <Form.Text className="text-danger">{formErrors.firstName}</Form.Text>
          </div>
          }
          <Form.Label className={styles.label}>Last Name</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text" 
            ref={lastNameInputRef}
            name="lastName"
            defaultValue={teacher.lastName}
            onChange={handleChangeLastName}
          />
          {formErrors.lastName &&
          <div>
            <Form.Text className="text-danger">{formErrors.lastName}</Form.Text>
          </div>
          }
          <Form.Label className={styles.label}>Zip Code</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="number" 
            ref={zipCodeInputRef}
            name="zipCode"
            defaultValue={zipCode} 
            onChange={handleChangeZipCode} 
            onBlur={handleEnterZipCode}
          />
          {formErrors.zipCode &&
          <div>
            <Form.Text className="text-danger">{formErrors.zipCode}</Form.Text>
          </div>
          }
          {showCity &&
            <p className={styles.formCity}>{cityName}, {stateName}</p>
          }
          <Form.Label className={styles.label}>Phone Number</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text" 
            name="phoneNumber"
            defaultValue={teacher.phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          <Form.Label className={styles.label}>Contact Email</Form.Label>
          <Form.Control 
            type="email" 
            className={styles.input} 
            ref={emailInputRef}
            name="contactEmail"
            defaultValue={teacher.contactEmail}
            onChange={handleChangeEmail}
          />
          {formErrors.email &&
          <div>
            <Form.Text className="text-danger">{formErrors.email}</Form.Text>
          </div>
          }
          <Form.Label className={styles.label}>Bio</Form.Label>
          <Form.Control 
            as="textarea"
            rows="6" 
            name="bio"
            className={styles.input} 
            defaultValue={teacher.bio} 
          />
          <div className={styles.buttonContainer}>
            <Button className={globalStyles.cancelButton} onClick={() => setUserWantsToEditProfile(false)}>Cancel</Button>
            <Button className={styles.saveButton} type="submit">Save Changes</Button>
          </div>
        </div>
      </div>
    </Form>
  )
}