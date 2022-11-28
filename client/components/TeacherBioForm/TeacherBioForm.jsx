import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getUser, signUpTeacher } from "../../services/auth";

export default function TeacherBioForm({
  setImageUrl,
  imageUrl,
  email,
  password,
  firstName,
  lastName,
  subject,
  cityName,
  setCityName,
  stateName,
  setStateName,
  setUser
}) {

  const bioInputRef = useRef();
  const zipCodeInputRef = useRef();
  const [showCity, setShowCity] = useState(false);
  const [zipCodeChecked, setZipCodeChecked] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const isFormInvalid = () => {
    let invalid = false;

    if (zipCodeInputRef.current.value === '') {
      setFormErrors({ ...formErrors, zipCode: 'Zip code is required'});
      invalid = true;
    }

    if (formErrors.zipCode) invalid = true;

    if (bioInputRef.current.value === '') {
      setFormErrors({ ...formErrors, bio: 'Bio is required. This will help students know if you will be a good fit for them.'});
      invalid = true;
    }

    return invalid;
  };

  const handleChangeBio = () => {
    if (formErrors.bio) setFormErrors({ ...formErrors, bio: ''});
  }

  const handleChangeImage = (e) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
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
    await signUpTeacher({
      email,
      password,
      firstName,
      lastName,
      subject,
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2" controlId="image">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChangeImage} />
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
      <Form.Group className="mb-2" controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Drawing instructor for 10 years" name="bio" ref={bioInputRef} onChange={handleChangeBio}></Form.Control>
        {formErrors.bio &&
          <Form.Text className="text-danger">{formErrors.bio}</Form.Text>
        }
      </Form.Group>
      <Form.Text>Fields below are optional, and the information will be displayed on your public profile.</Form.Text>
      <Form.Group className="mb-2" controlId="contactEmail">
        <Form.Label>Contact Email</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" name="contactEmail"></Form.Control>
      </Form.Group>
      <Form.Group className="mb-2" controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="(555)555-5555" name="phoneNumber"></Form.Control>
      </Form.Group>
      <Button type="submit">Submit</Button>
  </Form>
  )
}