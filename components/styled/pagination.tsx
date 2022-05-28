import styled from "styled-components";

type WrapperProps = {
    gap?: string,
};

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    & > * {
        margin-right: ${(props: WrapperProps) => props.gap ?? '1.4rem'};
    }
    & > *:last-child {
        margin-right: 0;
    } 
`;

type ItemProps = {
    selected?: boolean,
};


export const Number=styled.span`
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-family: noto-sans;
    font-weight: 600;
    background-color: ${({selected}: ItemProps)=> selected? '#22D5AE': 'transparent'};
    color: ${({selected}: ItemProps)=> selected? 'white': 'var(--text-color)'};
    height: 52px;
    width: 52px;
    cursor: pointer;
`;