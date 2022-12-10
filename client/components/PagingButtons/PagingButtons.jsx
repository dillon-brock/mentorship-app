import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from './pagingButtons.module.css';

export default function PagingButtons({ page, setPage, totalPages, loading }) {
  
  const [showLoader, setShowLoader] = useState(true);

  setTimeout(() => setShowLoader(false), 2000);

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
        <Button 
          className={styles.button} 
          disabled={page == 1 || loading || showLoader} 
          onClick={handlePreviousPage}>
          Prev
        </Button>
        <Button 
          className={styles.button} 
          disabled={page == totalPages || loading || showLoader} 
          onClick={handleNextPage}>
          Next
        </Button>
      </div>
      {!loading && !showLoader &&
        <Form.Text className={styles.info}>
          Page {page} of {totalPages ? totalPages : 1}
        </Form.Text>
      }
    </div>
  )
}