import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useTeachingMaterials from "../../hooks/useTeachingMaterials";
import Header from "../Header/Header";
import MaterialsSubjectSection from "../MaterialsSubjectSection/MaterialsSubjectSection";
import MaterialUploadModal from "../MaterialUploadModal/MaterialUploadModal";
import styles from './teachingMaterialsPage.module.css';
import globalStyles from '../../global.module.css';

export default function TeachingMaterialsPage() {
  const { user, doneGettingUser} = useUserContext();
  const { pathname } = useLocation();
  const {
    teachingMaterials,
    setTeachingMaterials,
    subjects,
    loading
  } = useTeachingMaterials(user?.teacherId);

  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  if (!user && doneGettingUser) 
    return <Navigate to={`/auth/sign-up/teacher?callback=${pathname}`} />

  return (
    <>
      <Header />
        <h1 className={styles.title}>Your Teaching Materials</h1>
        {loading ?
          <div className={styles.loaderContainer}>
            <div className={globalStyles.loader}></div>
          </div>
          :
          <>
            {teachingMaterials.length > 0 ?
            <>
              <div className={styles.uploadButtonContainer}>
                <Button 
                  className={styles.uploadButton} 
                  onClick={() => setShowUploadModal(true)}>
                  Upload Materials
                </Button>
              </div>
              <Container className={styles.body}>
                {subjects.map(subject => <MaterialsSubjectSection
                  key={subject.id}
                  subject={subject}
                  teachingMaterials={teachingMaterials}
                  setTeachingMaterials={setTeachingMaterials}
                  subjects={subjects} />)}
              </Container>
            </>
            :
            <div>
              <h3 className={styles.emptySubtitle}>You currently have no saved teaching materials.</h3>
              <div className={styles.firstButtonContainer}>
                <Button 
                  className={styles.firstButton} 
                  onClick={() => setShowUploadModal(true)}>
                  Upload Your First File
                </Button>
              </div>
            </div>
            }
            <MaterialUploadModal
              showUploadModal={showUploadModal}
              setShowUploadModal={setShowUploadModal}
              subjects={subjects}
              setTeachingMaterials={setTeachingMaterials}
            />
          </>
        }
    </>
  )
}