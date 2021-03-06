import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { Input } from '../pages/auth';
import styles from '../styles/OrderDetails.module.css';
import Button from './styled/button';

import ProfileIcon from '../public/icons/react-icons/profile';
import EditIcon from '../public/icons/react-icons/edit';

const CustomButton = styled.button`
    
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    color: var(--text-color);

    font-family: fira-go;
    font-size: 2.0rem;
    font-weight: 700;
    height: 4.5rem;
    display: inline-flex;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    padding: 0 2.3rem 0 2.7rem;
    border-left: rgba(66, 79, 96, 0.3) solid 0.1rem;
`;

const OrderDetails = () => {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>
                        {/* <FaUserAlt size={'2.0rem'} color={'#2EAAC1'}/> */}
                        <ProfileIcon height={'2.5rem'} width={'2.0rem'} />
                    </div>
                    <div className={styles.headerText}>
                        <div className={styles.name}>გაგი მურჯიკნელი</div>
                        <div className={styles.orderNo}>ორდერის ID: 124532</div>
                    </div>
                </div>
                <div>
                    <div className={styles.addressTitle}>მისამართი:</div>
                    <div className={styles.addressItem}>
                        <EditIcon width={'2.4rem'} style={{position: 'absolute', right: 0, top: 0}}/>
                        {/* <div> */}
                            <IoLocationSharp size={'3.2rem'} color={'var(--text-color)'}/>
                        {/* </div> */}
                        <div className={styles.addressItemText}>
                            <div className={styles.city}>Tbilisi</div>
                            <div className={styles.address}>მუხიანი, ალეკო გობრონიძის #11 / ბინა 177</div>
                            <div className={styles.zip}>ZIP კოდი: 01103</div>
                        </div>
                    </div>
                    <div className={styles.addressItem} style={{alignItems: 'center'}}>
                        {/* <div>Icon</div> */}
                        <BsFillTelephoneFill size={'3.2rem'} color={'var(--text-color)'}/>
                        <div className={styles.addressItemText}>
                            (+995) 577 48 88 96
                        </div>
                    </div>

                    <div className={styles.addressTitle}>პრომო კოდი:</div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <Input placeholder="Kme23m2313434m4" style={{fontSize: '2.0rem', fontFamily: 'fira-go', fontWeight: 500}}></Input>
                        <CustomButton>შემოწმება</CustomButton>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.paymentWrapper}>

                        <div className={styles.paymentItem}>
                            <span>სრული თანხა</span>
                            <span style={{fontFamily: 'fira-go', fontWeight: 600, fontSize: '2.4rem'}}>$ 405</span>
                        </div>
                        <div className={styles.paymentItem}>
                            <span>ფასდაკლება</span>
                            <span >-$ 105</span>
                        </div>
                        <div className={styles.paymentItem}>
                            <span>3 ნივთი</span>
                            <span>$ 205</span>
                        </div>
                        <div className={styles.paymentItem}>
                            <span>მიტანა</span>
                            <span>$ 5</span>
                        </div>
                    </div>

                    <Button>გადახდაზე გადასვალა</Button>
            </div>
        </>
    )
}

export default OrderDetails;