import { Button, Form, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import styles from './updateTeacherProfileForm.module.css';
import globalStyles from '../../global.module.css';

export default function UpdateTeacherProfileForm({
  teacher,
  setTeacher,
  showImageEditButton, 
  setShowImageEditButton, 
  setUserWantsToEditProfile,
  zipCode,
  setZipCode,
  cityName,
  stateName,
  handleChangeZipCode,
  handleSubmit
}) {

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
            value={teacher.firstName} 
            onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value })}
          />
          <Form.Label className={styles.label}>Last Name</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text" 
            value={teacher.lastName} 
            onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value })} 
          />
          <Form.Label className={styles.label}>Zip Code</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="number" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
            onBlur={handleChangeZipCode}
          />
          <p className={styles.formCity}>{cityName}, {stateName}</p>
          <Form.Label className={styles.label}>Phone Number</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text" 
            value={teacher.phoneNumber} 
            onChange={(e) => setTeacher({ ...teacher, phoneNumber: e.target.value })} 
          />
          <Form.Label className={styles.label}>Contact Email</Form.Label>
          <Form.Control 
            type="email" 
            className={styles.input} 
            value={teacher.contactEmail} 
            onChange={(e) => setTeacher({ ...teacher, contactEmail: e.target.value })} 
          />
          <Form.Label className={styles.label}>Bio</Form.Label>
          <Form.Control 
            as="textarea"
            rows="6" 
            className={styles.input} 
            value={teacher.bio} 
            onChange={(e) => setTeacher({ ...teacher, bio: e.target.value })} 
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