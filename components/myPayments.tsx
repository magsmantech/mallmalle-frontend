import styled from "styled-components";
import styles from '../styles/Profile.module.css';
import RemoveCardIcon from '../public/icons/react-icons/remove-card';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2.0rem;

    width: 100%;
    min-height: 66.0rem;
`;

const CardBackground = styled.div`
    display: flex;
    flex-direction: column;
    height: 23.8rem;
    background-image: linear-gradient(to right, #00D2FF 0%, #3A7BD5 100%);
    border-radius: 1.2rem;
`;

const Card= ()=> {
    return(
        <>
            <CardBackground>
                
            </CardBackground>
        </>
    );
}


export default function MyPayments() {
    return (
        <>
            <Grid>
                {/* <Card></Card> */}
                {/* <img src="/assets/card.svg"  style={{maxWidth: '44.4rem'}}></img> */}
                <div className={styles.cardWrapper}>
                    <div className={styles.cardWrapperTopLevel}>
                        <img src="/assets/visa-white.png" className={styles.visaIcon}/>
                        <div className={styles.deleteIconWrapper}>
                            <RemoveCardIcon width={'2.4rem'} height={'2.4rem'} className={styles.deleteIcon} />
                            <div className={styles.deleteIconText}>
                                წაშლა
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.cardName}>
                            Gagi Murjikneli
                        </div>
                        <div className={styles.cardNumber}>
                            <div className={styles.cardNumberItem}>3433</div>
                            <div className={styles.cardNumberItem}>
                                <div className={styles.cardPoint}></div>
                                <div className={styles.cardPoint}></div>
                                <div className={styles.cardPoint}></div>
                                <div className={styles.cardPoint}></div>
                            </div>
                            <div className={styles.cardNumberItem}>
                                <div className={styles.cardPoint}></div>
                                <div className={styles.cardPoint}></div>
                                <div className={styles.cardPoint}></div>
                                <div className={styles.cardPoint}></div>
                            </div>
                            <div className={styles.cardNumberItem}>9235</div>
                        </div>
                    </div>
                </div>
                <img src="/assets/add.svg" style={{cursor: 'pointer', maxWidth: '44.4rem'}}></img>
            </Grid>
        </>
    )
}