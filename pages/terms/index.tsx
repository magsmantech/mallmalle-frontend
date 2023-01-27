import type { NextPage } from "next";
import styled from "styled-components";
import styles from '../../styles/Terms.module.css';
import Responsive from '../../config/Responsive';

import { Breadcrumbs } from "../../components/styled/breadcrumbs";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const Grid = styled.div`
  /* display: grid; */
  /* row-gap: 5.0rem; */
  /* grid-template-columns: repeat(3, 1fr); */
  width: 100%;
  margin-right: 1.5rem;
  height: min-content;
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: stretch;
`;

export const SectionTitle = styled.div`
  color: var(--text-color);
  font-family: "BPG WEB 002 Caps";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */

  font-size: 4.4rem;
    ${Responsive.laptop} {
      font-size: 2rem!important;
      margin-top: 10px;
    }
`;



const Home: NextPage = () => {
const {t, i18n} = useTranslation();

  return (
    <>
      <SectionTitle style={{ marginBottom: "1.7rem", fontSize: "3.2rem" }}>
        {t('termsConditions')}
      </SectionTitle>
      <Breadcrumbs style={{ marginBottom: "3.2rem" }}>
      {t('main')} / {t('termsConditions')}
      </Breadcrumbs>
      <div className={styles.column}>
        <span className={styles.item}>{t('termsConditions')}</span>
        <span className={styles.item}>{t('faq')}</span>
        <span className={styles.item}>{t('returnPolicy')}</span>
        <span className={styles.item}>{t('confidentiality')}</span>
        <span className={styles.item}>{t('help')}</span>
        <span className={styles.item}>{t('aboutMallmalle')}</span>
        <span className={styles.item}>{t('contact')}</span>
      </div>
    </>
  );
};

export default Home;
