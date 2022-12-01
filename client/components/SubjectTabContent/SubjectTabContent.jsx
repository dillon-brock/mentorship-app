export default function SubjectTabContent({ id, minPrice, maxPrice, lessonType }) {
  return (
    <>
      <p>{lessonType}</p>
      <p>{minPrice}</p>
      <p>{maxPrice}</p>
    </>
  )
}