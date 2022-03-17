import styled from "styled-components";



type ItemType = any;

const ItemName= styled.span`
color: var(--text-color);
font-size: 2.4rem;
font-family: fira-go;
font-weight: 600;
margin-bottom: 1.0rem;
`;

const ItemLabel= styled.span`
color: var(--text-color);
font-size: 1.8rem;
font-family: 'helvetica';
opacity: 0.5;
font-weight: 500;
`;

const ItemValue= styled.span`
color: var(--text-color);
font-size: 1.8rem;
font-weight: 500;
font-family: fira-go ;
`;

const ItemImg = styled.img`
height: 13.0rem;
width: 13.0rem;
border-radius: 1.4rem;
object-fit: cover;
object-position: center;
margin-right: 2.0rem;
`;

const ItemTextWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const ItemWrapper = styled.div`
display: flex;
width: 100%;
max-width: 40.0rem;

`;


const Item = ({name, size, color, style}: ItemType) =>
<ItemWrapper style={{...style}}>
    <ItemImg src={'/assets/photo-3.jpg'}/>
    <ItemTextWrapper>
        <ItemName>{name}</ItemName>
        <div style={{marginBottom: '.5rem'}}><ItemLabel>ზომა:</ItemLabel> <ItemValue>{size}</ItemValue></div>
        <div><ItemLabel>ფერი:</ItemLabel> <ItemValue>{color}</ItemValue></div>
    </ItemTextWrapper>
</ItemWrapper>;

export default Item;
