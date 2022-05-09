import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { FiPercent } from 'react-icons/fi';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

type Props = {
    imageUrl: string,
    style?: {[p: string]: string | number},
    big?: boolean,
    gradient?: boolean,
};

const SaleItem = ({ imageUrl, style, big=false, gradient=false }: Props) => {

    const router = useRouter();

    const wrapperClasses = classNames({
        [styles.saleItemWrapper]: true,
        [styles.big]: big,
        [styles.gradientOverlay]: gradient,
    });

    return (
        <>
            <div className={wrapperClasses} style={{
                // backgroundImage: `url(${imageUrl})`,
                cursor: 'pointer',
                ...style,
            }} onClick={() => {
                router.push('/catalog/3');
            }}>
            <img src={imageUrl} className={styles.saleItemImg}/>    
            <div className={styles.gradient}></div>
            <div className={styles.label}>
                <div className={styles.iconBackgroundSecond}>
                    <div className={styles.iconBackgroundFirst}>
                        <FiPercent size={big? '3.2rem': '2.0rem'}/>
                    </div>
                </div>
                <span className={styles.labelText}>ფასდაკლება</span>
            </div>
            </div>
        </>);
}

export default SaleItem;

