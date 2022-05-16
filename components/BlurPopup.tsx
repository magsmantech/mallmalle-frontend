import React, { useState } from 'react'
import styled from 'styled-components';
import { Scrollbar } from './GlobalStyle';

const BlurPopup: React.FC<{
    boldMessage: string;
    normalMessage?: string;
    routeLink?: string;
    routeText?: string;
    onClose?: boolean;
}> = ({
    boldMessage,
    normalMessage,
    routeLink,
    routeText,
    onClose = false
}) => {

        const [close, setClose] = useState(onClose); //for popup close

        return close === true ? null : (
            <Wrapper>
                <Scrollbar hide={true} />
                <BlurStyle onClick={() => setClose(true)} />
                <Content>
                    <BoldMessage>{boldMessage}</BoldMessage>
                    <NormalMessage>
                        {normalMessage}
                        <RouteLink href={routeLink}>{routeText}</RouteLink>
                    </NormalMessage>
                </Content>
            </Wrapper>
        )
    }

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999999999;
    height: 100%;
    width: 100%;
    user-select: none;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
`;
const Content = styled.div`
    height: fit-content;
    border-radius: 12px;
    background: rgb(3,14,90);
    background: linear-gradient(180deg, rgba(3,14,90,1) 0%, rgba(66,79,96,1) 100%);
    color: #fff;
    padding: 25px;
    margin-top: 50px;
    margin-right: 40px;
    min-width: 450px;
    max-width: 450px;
    position: absolute;
`;
const RouteLink = styled.a`
    margin-left: 5px;
    text-decoration: underline;
        &:hover {
            opacity: 0.8;
        }
`;
const BoldMessage = styled.div`
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
`;
const NormalMessage = styled.div`
    font-size: 14px;
    margin-bottom: 10px;
`;
const BlurStyle = styled.div`
    backdrop-filter: blur(2px);
    height: 100%;
    width: 100%;
`;


export default BlurPopup