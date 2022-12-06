import { Button, Form } from "react-bootstrap";

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
    <div>
      <Button disabled={page == 1} onClick={handlePreviousPage}>Prev</Button>
      <Button disabled={page == totalPages} onClick={handleNextPage}>Next</Button>
      <Form.Text>Page {page} of {totalPages ? totalPages : 1}</Form.Text>
    </div>
  )
}