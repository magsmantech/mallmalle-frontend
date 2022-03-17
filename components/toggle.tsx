import styles from '../styles/Navbar.module.css';

type Props = {
    off: string,
    on: string,  
    checked?: boolean,
    [key: string]: any,  
};

const Toggle = ({checked, on, off, onCheckChange}: Props) => {
    return(
        <div className={styles.toggleWrapper} onClick={()=>onCheckChange(!checked)}>
            <div className={`${styles.toggleBall} ${checked ? styles.active: ''}`}></div>
            <span style={{zIndex: 10, fontSize: '2.0rem'}}>{on}</span>
            <span style={{zIndex: 10, fontSize: '2.0rem'}}>{off}</span>
        </div>
    );
};

export default Toggle;