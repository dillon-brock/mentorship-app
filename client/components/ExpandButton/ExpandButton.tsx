import { Button } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from './expandButton.module.css';
import { Dispatch, SetStateAction } from "react";

type Props = {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function ExpandButton({ expanded, setExpanded }: Props) {
  if (expanded) {
    return (
      <Button className={styles.chevronButton} onClick={() => setExpanded(false)}>
        <FaChevronUp />
      </Button>
    )
  }
  return (
    <Button className={styles.chevronButton} onClick={() => setExpanded(true)}>
      <FaChevronDown />
    </Button>
  )
}