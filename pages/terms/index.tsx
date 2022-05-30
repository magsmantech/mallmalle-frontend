import type { NextPage } from "next";
import styled from "styled-components";
import styles from '../../styles/Terms.module.css';

import { Breadcrumbs } from "../../components/styled/breadcrumbs";


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
`;



const Home: NextPage = () => {
  return (
    <>
      <SectionTitle style={{ marginBottom: "1.7rem", fontSize: "3.2rem" }}>
        წესები და პირობები
      </SectionTitle>
      <Breadcrumbs style={{ marginBottom: "3.2rem" }}>
        მთავარი / წესები და პირობები
      </Breadcrumbs>
      <div className={styles.column}>
        <span className={styles.item}>წესები და პირობები</span>
        <span className={styles.item}>ხშირად დასმული კითხვები</span>
        <span className={styles.item}>დაბრუნების და გაცვლის პოლიტიკა</span>
        <span className={styles.item}>კონფიდენციალურობა</span>
        <span className={styles.item}>დახმარება</span>
        <span className={styles.item}>MallMalle-ს შესახებ</span>
        <span className={styles.item}>კონტაქტი</span>
      </div>
    </>
  );
};

export default Home;
