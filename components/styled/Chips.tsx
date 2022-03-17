import styled from "styled-components";

type Props= {
    color?: string,
    hoverColor?: string,
};

export const ChipWrapper = styled.div`
    display: flex;
    height: 4.8rem;
    border-radius: 2.5rem;
    padding: .8rem;
    align-items: center;
    background-color: ${(props: Props)=> props.color ??  '#F2F2F2'};
    cursor: pointer;
    transition: all 150ms ease-in-out;
    &:hover {
        background-color: ${(props: Props)=> props.hoverColor ??  '#F2F2F2'};
    }
`;

export const ChipTitle = styled.span`
    margin-left: .8rem;
    font-size: 1.6rem;
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


