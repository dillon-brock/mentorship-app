import { Button, Form } from "react-bootstrap";
import styles from './pagingButtons.module.css';

export default function PagingButtons({ page, setPage, totalPages }) {
  
  const handlePreviousPage = () => {
    setPage(prev => {
      if (prev > 1) return prev - 1;
      return 1;
    })
  }

  const handleNextPage = () => {
    setPage(prev => {
      if (prev < totalPages) return prev + 1;
      return totalPages;
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} disabled={page == 1} onClick={handlePreviousPage}>Prev</Button>
        <Button className={styles.button} disabled={page == totalPages} onClick={handleNextPage}>Next</Button>
      </div>
      <Form.Text className={styles.info}>Page {page} of {totalPages ? totalPages : 1}</Form.Text>
    </div>
  )
}