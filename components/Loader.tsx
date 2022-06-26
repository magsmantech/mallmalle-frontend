import React from 'react';
import styled from 'styled-components'; //ims
import { Scrollbar } from './GlobalStyle';
import Fonts from './../styles/Fonts';

const Loader: React.FC = () => {
    return (
        <Wrapper>
            <Scrollbar hide={true} />
            <Content>
                <LoaderValue>m</LoaderValue>
                <LoaderValue>a</LoaderValue>
                <LoaderValue>l</LoaderValue>
                <LoaderValue>l</LoaderValue>
                <LoaderValue>m</LoaderValue>
                <LoaderValue>a</LoaderValue>
                <LoaderValue>l</LoaderValue>
                <LoaderValue>l</LoaderValue>
                <LoaderValue>e</LoaderValue>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: linear-gradient(45deg, #3885d1 0%, #22d2af 100%);
    background: linear-gradient(45deg, #22d2af 0%, #3885d1 100%); 
    height: 100%;
    width: 100%;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Content = styled.div`
    display: flex;
`;
const LoaderValue = styled.div`
    animation: zoom-in-zoom-out ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 1.5s;
    margin: 0px 10px;
    font-size: 20px;
    font-family: ${Fonts.FiraGORegular};
    background-color: white;
    text-transform: capitalize;
    //TODO need ts-styled-plugin
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

        &:first-child {
            margin-left: 0px;
        }
        &:nth-child(1){
            animation-delay: -800ms;
            font-weight: 600;
        }
        &:nth-child(2){
            animation-delay: -700ms;
            font-weight: 600;
        }
        &:nth-child(3){
            animation-delay: -600ms;
            font-weight: 600;
        }
        &:nth-child(4){
            animation-delay: -500ms;
            font-weight: 600;
        }
        &:nth-child(5){
            animation-delay: -400ms;
        }
        &:nth-child(6){
            animation-delay: -300ms;
        }
        &:nth-child(7){
            animation-delay: -200ms;
        }
        &:nth-child(8){
            animation-delay: -100ms;
        }
        &:nth-child(9){
            animation-delay: 100ms;
        }

    @keyframes zoom-in-zoom-out {
        0% {
                transform: scale(1, 1);
            }
        50% {
                transform: scale(2, 2);
            }
        100% {
                transform: scale(1, 1);
            }
        }
`;

export default Loader;