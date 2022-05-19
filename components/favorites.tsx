import styled from "styled-components";
import Item from './item';
import Button from "./styled/button";
import { useDispatch } from 'react-redux';
import { showFeedback } from '../features/feedbackSlice';
import Responsive from "../config/Responsive";
import DropDown from "./customStyle/DropDown";
import RadioButton from "./customStyle/RadioButton";
import { useState } from "react";
import SidebarFilter from "./customStyle/SidebarFilter";








function Favorites() {
    const dispatch = useDispatch();

    const _showFeedback = () => {
        dispatch(
            showFeedback({ show: true }),
        );
    }

    const [popular, setPopular] = useState();
    const [brand, setBrand] = useState();
    const [price, setPrice] = useState();

    const [openModal, setOpenModal] = useState(false);


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
        <Wrapper>
            <TopSideWrapper>
                <FilterWrapper>
                    <FilltersBox>
                        <DropDown dropdownTitle="პოპულარული">
                            <RadioButton
                                id="popular-id"
                                onChange={(value) => setPopular(value)}
                                options={[
                                    { label: "პოპულარული 1", value: "პოპულარული 1" },
                                    { label: "პოპულარული 2", value: "პოპულარული 2" },
                                ]}
                                value={popular}
                            />
                        </DropDown>{popular === undefined ? null : popular}
                    </FilltersBox>
                    <FilltersBox>
                        <DropDown dropdownTitle="ბრენდი">
                            <RadioButton
                                id="brand-id"
                                onChange={(value) => setBrand(value)}
                                options={[
                                    { label: "ბრენდი 1", value: "ბრენდი 1" },
                                    { label: "ბრენდი 2", value: "ბრენდი 2" },
                                ]}
                                value={brand}
                            />
                        </DropDown>{brand === undefined ? null : brand}
                    </FilltersBox>

                    <FilltersBox>
                        <DropDown dropdownTitle="ფასი">
                            <RadioButton
                                id="price-id"
                                onChange={(value) => setPrice(value)}
                                options={[
                                    { label: "ფასი 1", value: "ფასი 1" },
                                    { label: "ფასი 2", value: "ფასი 2" },
                                ]}
                                value={price}
                            />
                        </DropDown>{price === undefined ? null : price}
                    </FilltersBox>

                    <FilltersBox>
                        <button onClick={() => setOpenModal(true)}>მეტი ფილტრი</button>
                    </FilltersBox>

                    {openModal && <SidebarFilter openModal={setOpenModal} />}


                </FilterWrapper>
                <FavoriteCount>სულ მოიძებნა: <span>13 შენახული</span></FavoriteCount>
            </TopSideWrapper>

            <Grid>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/2.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/5.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/4.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/6.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/2.png'}></ItemWithButton>
                <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/5.png'}></ItemWithButton>
            </Grid>
        </Wrapper>
    </>)
};




const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const FilltersBox = styled.div`
    margin-right: 24px;
    margin-bottom: 20px;
        &:last-child {
            margin-right: 0px;
        }
        ${Responsive.tabletMobile}{
            margin-bottom: 20px;
        }
`;
const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
        ${Responsive.tabletMobile} {
            flex-wrap: wrap;
        }
        
`;
const TopSideWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 65px;
    padding-bottom: 40px;
        ${Responsive.tabletMobile}{
            align-items: flex-start;
        }
`;
const FavoriteCount = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color);
    opacity: 0.8;
    margin-left: 20px;
    margin-top: 3px;
    white-space: nowrap;
        span {
            font-weight: 700;
            font-family: 'fira-go';
        }
        ${Responsive.mobile}{
            display: none;
        }
`;

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


export default Favorites
