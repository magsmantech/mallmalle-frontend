import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { FiPercent } from 'react-icons/fi';
import styles from '../styles/Home.module.css';
import Responsive from "../config/Responsive";
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


type Props = {
    imageUrl: string,
    style?: {[p: string]: string | number},
    big?: boolean,
    gradient?: boolean,
    id: number
};

const SaleItem = ({ imageUrl, id, style, big=false, gradient=false }: Props) => {

    const router = useRouter();

    const wrapperClasses = classNames({
        [styles.saleItemWrapper]: true,
        [styles.big]: big,
        [styles.gradientOverlay]: gradient,
        
    });

    const {t, i18n} = useTranslation();

    return (
        <>
            <div className={wrapperClasses} style={{
                // backgroundImage: `url(${imageUrl})`,
                cursor: 'pointer',
                height: '100%',
                ...style,
            }} onClick={() => {
                // TODO go to specific categories
                router.push(`/discounts/${id}`);
            }}>
            <img src={imageUrl} className={styles.saleItemImg}/>    
            <div className={styles.gradient}></div>
            <div className={styles.label}>
                <div className={styles.iconBackgroundSecond}>
                    <div className={styles.iconBackgroundFirst}>
                        <FiPercent size={big? '3.2rem': '2.0rem'}/>
                    </div>
                </div>
                <span className={styles.labelText}>{t('sale')}</span>
            </div>
            </div>
        </>);
}

export default SaleItem;

