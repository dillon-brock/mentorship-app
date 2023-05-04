import { Button, Image } from "react-bootstrap"
import { FaEdit } from "react-icons/fa";
import styles from './editableProfilePicture.module.css';

type Props = {
  showButton: boolean;
  imgSrc: string;
  onClick: () => void;
}

export default function EditableProfilePicture({ showButton, imgSrc, onClick }: Props) {
  return (
    <>
      {showButton &&
        <Button className={styles.button} onClick={onClick}>
          <FaEdit />
        </Button>
      }
      <Image 
        roundedCircle 
        src={imgSrc} 
        style={{ width: '300px', height: '300px' }} 
        />
    </>
  )
}