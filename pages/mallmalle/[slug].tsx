import type { NextPage } from "next";
import api from "../../features/api";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";
import styles from '../../styles/Terms.module.css';

import { Breadcrumbs } from "../../components/styled/breadcrumbs";
import ReactHtmlParser from "html-react-parser";
import Responsive from "../../config/Responsive";

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
        margin-top: 10px;
        font-size: 2.0rem!important;
      }
`;


const Title = styled.h1`
  color: var(--text-color);
  font-size: 4.4rem;
  font-family: fira-go;
`;

const Subtitle = styled.span`
  color: var(--text-color);
  font-weight: bold;
  font-size: 1.8rem;
  font-family: "helvetica";
`;

const Text = styled.span`
  color: var(--text-color);
  font-size: 1.8rem;
  font-family: "helvetica";
    ${Responsive.laptop}{
      font-size: 20px;
    }
`;
const BreadcrumbsStyle = styled(Breadcrumbs)`
        ${Responsive.laptop}{
            font-size: 12px;
            margin-top: -10px;
        }
`;

const TextPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading: isPageLoading } = api.useGetPageQuery(slug as string);
  const page = data?.data;
  return isPageLoading ? (
    <span>იტვირთება..</span>
  ) : !page ? (
      <span>Not Found</span>
    ) : (
    <>
      <SectionTitle style={{ marginBottom: "1.7rem", fontSize: "3.2rem" }}>
        წესები და პირობები
      </SectionTitle>

      <BreadcrumbsStyle style={{ marginBottom: "3.2rem" }}>
        მთავარი / {page.title}
      </BreadcrumbsStyle>

      {/* <Title style={{ marginBottom: "1.6rem" }}>{page.title}</Title> */}

      {page.text && <Text>{ReactHtmlParser(page.text)}</Text>}

      {/* <div className={styles.column}>
                <span className={styles.item}>წესები და პირობები</span>
                <span className={styles.item}>ხშირად დასმული კითხვები</span>
                <span className={styles.item}>დაბრუნების და გაცვლის პოლიტიკა</span>
                <span className={styles.item}>კონფიდენციალურობა</span>
                <span className={styles.item}>დახმარება</span>
                <span className={styles.item}>MallMalle-ს შესახებ</span>
                <span className={styles.item}>კონტაქტი</span>
            </div> */}
    </>
  );
}
export default TextPage;
