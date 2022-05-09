import styled from "styled-components";
import Responsive from "../../../config/Responsive";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 40px;
    width: 50px;
    justify-content: space-between;
    cursor: pointer;
    margin-right: 35px;
    &:hover .one {
        width: 50px;
    }

    &:hover .two {
        width: 24px;
    }

    &:hover .three {
        width: 44px;
    }

    ${Responsive.tabletMobile} {
        transform: scale(0.6);
        margin-right: 0px;
        width: 40px;
        margin-left: -6px;
    }

`;

const Item = styled.div`
    display: flex;
    height: 8px;
    border: 3px solid white;
    border-radius: 1.4rem;
    transition: width 150ms ease-in-out;
`;

const Item1 = styled(Item)`
    width: 44px;
`;
const Item2 = styled(Item)`
    width: 24px;
`;
const Item3 = styled(Item)`
    width: 50px;
`;

type Props = any;



const Icon = (props: Props) => {
    return (
        <div {...props}>
            <Wrapper >
                <Item1 className="one"/>
                <Item2 className="two"/>
                <Item3 className="three"/>
            </Wrapper>
            
        </div>
    );
}

export default Icon;
