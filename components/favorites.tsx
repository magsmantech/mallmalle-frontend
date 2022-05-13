import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import FilterSelect from "./filterSelect";
import Item from './item';
import Button from "./styled/button";

import FilterIcon from '../public/icons/react-icons/filter';

import { ChipIconWrapper, ChipTitle, ChipWrapper } from './styled/Chips';
import { useDispatch } from 'react-redux';
import { showFeedback } from '../features/feedbackSlice';
import Responsive from "../config/Responsive";


const Grid = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
  grid-row-gap: 30px;
    ${Responsive.mobile} {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-gap: 10px;
        grid-row-gap: 25px;
    }
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

type Props = {
    imageUrl: string,
    price: string,
    oldPrice?: string,
    name: string,
    currency?: string,
    style?: { [p: string]: string | number },
};


const CartButton = styled(Button)`
    border-radius: 8px;
    background-image: none;
    height: 54px; 
    color: #2EA4CA;
    border: .2rem solid #2EA4CA;
    font-size: 18px;
    font-family: fira-go;
    margin-top: 18px;
    &:hover {
        /* background-color: #2EA4CA; */
        border: none;
        color: white;
        background-image: var(--button-gradient);
    }
    ${Responsive.mobile} {
        font-size: 12px;
        letter-spacing: 0px;
    }
`;



export default function Favorites() {
    const dispatch = useDispatch();

    const _showFeedback = () => {
      dispatch(
        showFeedback({ show: true }),
      );
    }  

    
    const ItemWithButton = ({ imageUrl, style, price, oldPrice, name, currency = 'gel' }: Props) => {
        return (
            <>
                <ItemWrapper>
                    <Item name={name} price={price} oldPrice={oldPrice} currency={currency} imageUrl={imageUrl}></Item>
                    <CartButton
                        onClick={_showFeedback}
                    >კალათაში დამატება</CartButton>
                </ItemWrapper>
            </>
        )
    }

    return (<>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '97.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4.0rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <FilterSelect style={{marginRight: '2.4rem'}} />
                    <ChipWrapper style={{marginRight: '2.4rem'}}>
                        <ChipTitle>ბრენდი</ChipTitle>
                        <ChipIconWrapper>
                            <BsChevronDown size={'1.6rem'}></BsChevronDown>
                        </ChipIconWrapper>
                    </ChipWrapper>

                    <ChipWrapper style={{marginRight: '2.4rem'}}>
                        <ChipTitle>ფასი</ChipTitle>
                        <ChipIconWrapper>
                            <BsChevronDown size={'1.6rem'}></BsChevronDown>
                        </ChipIconWrapper>
                    </ChipWrapper>
                    
                    <ChipWrapper>
                        <ChipTitle>მეტი ფილტრი</ChipTitle>
                        <ChipIconWrapper>
                            <FilterIcon width={'2.4rem'} height={'2.4rem'}/>
                        </ChipIconWrapper>
                    </ChipWrapper>                    
                </div>
                <span style={{fontSize: '1.6rem', color: 'var(--text-color)', opacity: 0.8, fontWeight: 500}}>სულ მოიძებნა: <span style={{fontWeight: 700,  fontFamily: 'fira-go'}}>13 შენახული</span></span>
            </div>

            <Grid>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/2.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/5.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/4.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/6.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/2.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/5.png'}></ItemWithButton>
            </Grid>
        </div>
    </>)
};
