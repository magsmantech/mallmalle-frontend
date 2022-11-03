import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Responsive from "../config/Responsive";
import styles from "../styles/Home.module.css";
import Fonts from './../styles/Fonts';

const Clock: NextPage<{
  itemDate: Date;
}> = ({
  itemDate
}) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(itemDate);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const x = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + (24 * days)
      );

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);      
      
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div>
        {days<=0 && hours<=0 && minutes<=0 && seconds<=0 ? (
        <>
        <ClockText> 00 </ClockText>
        <ClockText> : 00 </ClockText>
        <ClockText> : 00 </ClockText>
        <ClockSpan >საათი</ClockSpan>
        </>):
        <>
        { hours < 10 ? (
        <ClockText> 0{hours} </ClockText>): <ClockText> {hours} </ClockText>}
        { minutes < 10 ? (
        <ClockText> : 0{minutes} </ClockText>): <ClockText> : {minutes} </ClockText>}
        { seconds < 10 ? (
        <ClockText> : 0{seconds} </ClockText>): <ClockText> : {seconds} </ClockText>}
        <ClockSpan >საათი</ClockSpan>
        </>}
      </div>
    </Wrapper>
  );
};

const ClockText = styled.span`
    font-size: 40px;
    font-family: ${Fonts.FiraGOSemiBold};
    text-transform: uppercase;
    font-feature-settings: '"case" on';
    font-weight: 600;
    line-height: 50px;
    
      ${Responsive.tabletMobile}{
        font-size: 22px;
      }
      ${Responsive.laptop}{
        font-size: 35px;
      }
`;
const ClockSpan = styled.span`
  font-size: 19px;
  font-family: ${Fonts.FiraGOSemiBold};
      ${Responsive.tabletMobile}{
        font-size: 22px;
      }
      ${Responsive.laptop}{
        font-size: 13px;
        letter-spacing: 1px;
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