import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from './pagingButtons.module.css';
import { Teacher } from "../../types";

type Props = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  loading: boolean;
  teachers: Teacher[];
}

export default function PagingButtons({ page, setPage, totalPages, loading, teachers }: Props) {
  
  const [showLoader, setShowLoader] = useState<boolean>(true);

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
          disabled={page == 1 || loading || showLoader || !teachers.length} 
          onClick={handlePreviousPage}>
          Prev
        </Button>
        <Button 
          className={styles.button} 
          disabled={page == totalPages || loading || showLoader || !teachers.length} 
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