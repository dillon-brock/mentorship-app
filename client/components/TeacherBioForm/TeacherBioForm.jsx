import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getUser, signUpTeacher, updateUserType } from "../../services/auth";
import { uploadProfilePicture } from "../../services/cloudinary";
import { addTeacherAccount } from "../../services/teacher";
import { getCityFromZipCode } from "../../services/zipcode";
import styles from './teacherBioForm.module.css'

export default function TeacherBioForm({
  email,
  password,
  firstName,
  lastName,
  subjects,
  setUser,
  newUser,
  user
}) {

  const bioInputRef = useRef();
  const zipCodeInputRef = useRef();
  const [showCity, setShowCity] = useState(false);
  const [zipCodeChecked, setZipCodeChecked] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const isFormInvalid = () => {
    let invalid = false;
    
    if (bioInputRef.current.value === '') {
      setFormErrors({ ...formErrors, bio: 'Bio is required. This will help students know if you will be a good fit for them.'});
      invalid = true;
    }

    if (zipCodeInputRef.current.value === '') {
      setFormErrors({ ...formErrors, zipCode: 'Zip code is required'});
      invalid = true;
    }

    if (formErrors.zipCode) invalid = true;

    return invalid;
  };

  const handleChangeBio = () => {
    if (formErrors.bio) setFormErrors({ ...formErrors, bio: ''});
  }

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
    setImageData(formData);
  }

  const handleChangeZipCode = () => {
    if (formErrors.zipCode) setFormErrors({ ...formErrors, zipCode: ''});
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

  const handleSubmit = async (e) => {
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
    let imageUrl = '';
    if (imageData) {
      const uploadImageResponse = await uploadProfilePicture(imageData);
      imageUrl = uploadImageResponse.secure_url;
    }

    if (newUser) {
      await signUpTeacher({
        email,
        password,
        firstName,
        lastName,
        subjects,
        bio: formData.get('bio'),
        zipCode: formData.get('zip'),
        phoneNumber: formData.get('phoneNumber'),
        contactEmail: formData.get('contactEmail'),
        imageUrl: imageUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        city: cityName,
        state: stateName
      });
      const signedInTeacher = await getUser();
      setUser(signedInTeacher);
    }

    else if (!newUser) {
      const teacherData = await addTeacherAccount({
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        subjects,
        bio: formData.get('bio'),
        zipCode: formData.get('zip'),
        phoneNumber: formData.get('phoneNumber'),
        contactEmail: formData.get('contactEmail'),
        city: cityName,
        state: stateName
      })
      await updateUserType('teacher');
      setUser({ ...user, type: 'teacher', teacherId: teacherData.id });
    }
  }

  return (
    <div className={styles.container}>
        <h3 className={styles.title}>Tell us more about you</h3>
        <Form className={styles.form} onSubmit={handleSubmit}>
          {newUser &&
            <Form.Group className="mb-2" controlId="image">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control className={styles.input} type="file" name="image" onChange={handleChangeImage} />
            </Form.Group>
          }
          
          <Form.Group className="mb-2" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control className={styles.input} as="textarea" rows={4} placeholder="Drawing instructor for 10 years" name="bio" ref={bioInputRef} onChange={handleChangeBio}></Form.Control>
            {formErrors.bio &&
              <Form.Text className="text-danger">{formErrors.bio}</Form.Text>
            }
          </Form.Group>
          
          <Form.Group className="mb-1" controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control className={styles.input} type="number" placeholder="97214" name="zip" ref={zipCodeInputRef} onChange={handleChangeZipCode} onBlur={handleEnterZipCode}></Form.Control>
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
          <Form.Text>Fields below are optional, and the information will be displayed on your public profile.</Form.Text>
          <Form.Group className="mb-2" controlId="contactEmail">
            <Form.Label>Contact Email</Form.Label>
            <Form.Control className={styles.input} type="email" placeholder="name@example.com" name="contactEmail"></Form.Control>
          </Form.Group>
          <Form.Group className="mb-2" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control className={styles.input} type="text" placeholder="(555)555-5555" name="phoneNumber"></Form.Control>
          </Form.Group>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} type="submit">Sign Up</Button>
          </div>
      </Form>
    </div>
  )
}