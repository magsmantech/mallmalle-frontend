import styled from "styled-components";

type Props= {
    color?: string,
    hoverColor?: string,
};

export const ChipWrapper = styled.div`
    display: flex;
    max-height: 48px;
    height: 100vh;
    border-radius: 25px;
    padding: 0px 15px;
    align-items: center;
    margin-right: 25px;
        &:last-child {
            margin-right: 0px;
        }
    background-color: ${(props: Props)=> props.color ??  '#F2F2F2'};
    cursor: pointer;
    transition: all 150ms ease-in-out;
    &:hover {
        background-color: ${(props: Props)=> props.hoverColor ??  '#F2F2F2'};
    }
`;

export const ChipTitle = styled.span`
    font-size: 16px;
    text-align: center;
    font-family: 'helvetica';
    color: var(--text-color);
    font-weight: 600;
    letter-spacing: .5px;
`;

export const ChipIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    margin-left: 2.0rem;
`;


