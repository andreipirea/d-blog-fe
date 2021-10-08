import { useState } from "react";
import styles from "../styles/Popup.module.scss";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Popup = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  
  return (
    <div className={`${styles.popupBackground} ${props.showPopup === true ? styles.open_popup : styles.close_popup}`} style={props.popupStyles}>
      <div className={styles.popupContainer}>
        <HighlightOffIcon onClick={props.onClickClose} className={styles.close_icon} />
        <img src={props.imgSrc} />
      </div>
    </div>
  );
};

export default Popup;