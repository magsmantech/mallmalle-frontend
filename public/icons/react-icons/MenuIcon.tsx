import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 4.5rem;
    width: 4.5rem;
    justify-content: space-between;
    cursor: pointer;
    &:hover .one {
        width: 4.5rem
    }

    &:hover .two {
        width: 3.0rem
    }

    &:hover .three {
        width: 3.5rem
    }


`;

const Item = styled.div`
    display: flex;
    height: .8rem;
    border: .3rem solid white;
    border-radius: 1.4rem;
    transition: width 150ms ease-in-out;
`;

const Item1 = styled(Item)`
    width: 4.0rem;
`;

const Item2 = styled(Item)`
    width: 2.0rem;
`;
const Item3 = styled(Item)`
    width: 4.5rem;
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
