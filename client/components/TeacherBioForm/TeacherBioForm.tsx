import { ChangeEvent, FocusEvent, FormEvent, useRef, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { getUser, signUpTeacher, updateUserType } from "../../services/auth/auth";
import { uploadProfilePicture } from "../../services/cloudinary";
import { addTeacherAccount } from "../../services/teacher";
import { getCityFromZipCode } from "../../services/zipcode";
import styles from './teacherBioForm.module.css'
import globalStyles from '../../global.module.css';
import { FormErrors, NewUserProps, Props } from "./types";

export default function TeacherBioForm({
  email,
  password,
  firstName,
  lastName,
  subjects,
  setUser,
  newUser,
  user
}: NewUserProps) {

  const bioInputRef = useRef<HTMLTextAreaElement>(null);
  const zipCodeInputRef = useRef<HTMLInputElement>(null);
  const [showCity, setShowCity] = useState<boolean>(false);
  const [zipCodeChecked, setZipCodeChecked] = useState<boolean>(false);
  const [imageData, setImageData] = useState<FormData | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isFormInvalid = () => {
    let invalid: boolean = false;
    
    if (bioInputRef.current && bioInputRef.current.value === '') {
      setFormErrors({ 
        ...formErrors, 
        bio: 'Bio is required. This will help students know if you will be a good fit for them.'
      });
      invalid = true;
    }

    if (zipCodeInputRef.current && zipCodeInputRef.current.value === '') {
      setFormErrors({ ...formErrors, zipCode: 'Zip code is required'});
      invalid = true;
    }

    if (formErrors.zipCode) invalid = true;

    return invalid;
  };

  const handleChangeBio = () => {
    if (formErrors.bio) setFormErrors({ ...formErrors, bio: ''});
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : undefined;
    if (file != undefined) {
      setImagePreviewUrl(URL.createObjectURL(file));
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
      setImageData(formData);
    }
  }

  const handleChangeZipCode = () => {
    if (formErrors.zipCode) setFormErrors({ ...formErrors, zipCode: ''});
  }

  const handleEnterZipCode = async (e: FocusEvent<HTMLInputElement>) => {
    if (Number(e.target.value) && e.target.value.length === 5) {
      const zipCodeResponse = await getCityFromZipCode(e.target.value);
      if (zipCodeResponse.valid) {
        setShowCity(true);
        setCityName(zipCodeResponse.city);
        setStateName(zipCodeResponse.state);
        setZipCodeChecked(true);
      }
      else {
        setFormErrors({ zipCode: 'Please enter a valid zip code'});
        setZipCodeChecked(true);
      }
    }
  }

  const handleEnterPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/^(\d{3})(\d{3})(\d+)$/, "($1)$2-$3");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target as HTMLFormElement);
    if (!zipCodeChecked) {
      const zipCodeResponse = await getCityFromZipCode(formData.get('zip') as string);
      if (zipCodeResponse.valid) {
        setCityName(zipCodeResponse.city);
        setStateName(zipCodeResponse.state);
        setZipCodeChecked(true);
      }
      else {
        setFormErrors({ zipCode: 'Please enter a valid zip code' });
        return;
      }
    }
    let imageUrl: string = '';
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
        bio: formData.get('bio') ? formData.get('bio') as string : null,
        zipCode: formData.get('zip') as string,
        phoneNumber: formData.get('phoneNumber') ? formData.get('phoneNumber') as string : null,
        contactEmail: formData.get('contactEmail') ? formData.get('contactEmail') as string : null,
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
        <h3 className={styles.title}>Tell us more about you.</h3>
        <Form className={styles.form} onSubmit={handleSubmit}>
          {newUser &&
            <Form.Group className="mb-2" controlId="image">
              <Form.Label className={globalStyles.authFormLabel}>Profile Picture</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="file"
                name="image" 
                onChange={handleChangeImage} 
              />
            </Form.Group>
          }
          {imagePreviewUrl &&
            <div className={styles.imageContainer}>
              <Image src={imagePreviewUrl} className={styles.image} />
            </div>
          }
          <Form.Group className="mb-2" controlId="bio">
            <Form.Label className={globalStyles.authFormLabel}>Bio</Form.Label>
            <Form.Control 
              className={styles.input} 
              as="textarea" 
              rows={4} 
              placeholder="Drawing instructor for 10 years" 
              name="bio" 
              ref={bioInputRef} 
              onChange={handleChangeBio}
            />
            {formErrors.bio &&
              <Form.Text className="text-danger">{formErrors.bio}</Form.Text>
            }
          </Form.Group>
          
          <Form.Group className="mb-1" controlId="zipCode">
            <Form.Label className={globalStyles.authFormLabel}>Zip Code</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="number" 
              placeholder="97214" 
              name="zip" 
              ref={zipCodeInputRef} 
              onChange={handleChangeZipCode} onBlur={handleEnterZipCode} 
            />
            {formErrors.zipCode &&
              <Form.Text className="text-danger">{formErrors.zipCode}</Form.Text>
            }
          </Form.Group>

          {showCity &&
          <div>
            <p className={styles.cityDisplay}>
              {cityName}, {stateName}
            </p>
          </div>
          }
          <Form.Text>Fields below are optional, and the information will be displayed on your public profile.</Form.Text>
          <Form.Group className="mb-2" controlId="contactEmail">
            <Form.Label className={globalStyles.authFormLabel}>Contact Email</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="email" 
              placeholder="name@example.com" 
              name="contactEmail"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="phoneNumber">
            <Form.Label className={globalStyles.authFormLabel}>Phone Number</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="text" 
              placeholder="(555)555-5555" 
              name="phoneNumber"
              onChange={handleEnterPhoneNumber}
            ></Form.Control>
          </Form.Group>
          <div className={styles.buttonContainer}>
            <Button className={styles.button} type="submit">Sign Up</Button>
          </div>
      </Form>
    </div>
  )
}