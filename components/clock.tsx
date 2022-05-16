import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Responsive from "../config/Responsive";
import styles from "../styles/Home.module.css";

const Clock: NextPage = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("12/31/2022 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div>
        {/* <span style={{fontSize: '5.0rem', fontFamily: 'fira-go', textTransform: 'uppercase', fontFeatureSettings: '"case" on', fontWeight: 600}}>{days} </span>
        <span style={{fontSize: '2.0rem'}}>დღე</span> */}
        <ClockText> {hours} </ClockText>
        {/* <span style={{fontSize: '2.0rem'}}>საათი</span> */}
        <ClockText> : {minutes} </ClockText>
        {/* <span style={{fontSize: '2.0rem'}}>წუთი</span> */}
        <ClockText> : {seconds} </ClockText>
        <ClockSpan >საათი</ClockSpan>
      </div>
    </Wrapper>
  );
};

const ClockText = styled.span`
    font-size: 50px;
    font-family: "fira-go";
    text-transform: uppercase;
    font-feature-settings: '"case" on';
    font-weight: 600;
    
      ${Responsive.tabletMobile}{
        font-size: 22px;
      }
`;
const ClockSpan = styled.span`
  font-size: 2.0rem;
      ${Responsive.tabletMobile}{
        font-size: 22px;
      }
`;

const Wrapper = styled.div`
  user-select: none;
  margin-left: 15%;
  ${Responsive.tabletMobile}{
    margin-left: 0px;
  }
`;

export default Clock;