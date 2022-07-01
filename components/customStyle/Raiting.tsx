import React from 'react'
import { BsStarFill } from 'react-icons/bs';
import styled from 'styled-components';

const Raiting: React.FC<{ raitingCount: number }> = ({ raitingCount }) => {

    const startsToRender = [];
    for (let i = 0; i < raitingCount; i++) {
        startsToRender.push(<BsStarFill size={"20px"} color={"#22D5AE"} />);
    }
    console.log(startsToRender);

    return (
        <Wrapper>{startsToRender}</Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 5px;
    /* min-width: 120px; */
`;

export default Raiting;