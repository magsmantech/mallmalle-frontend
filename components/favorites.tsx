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
import MoreFilterIcon from '../public/icons/more-filter-icon.svg'
import api from "../features/api";
import Loader from "./Loader";
import { removeFromFavorite } from '../services/checkout-services';







const Favorites: React.FC<{}> = ({ }) => {

    const { data: favorites, isLoading: isFavoritesLoading, refetch: refetchFavorites } = api.useGetFavoritesQuery(undefined);
    const [removeFromFavorite, { isLoading: isRemoveFromFavoriteLoading }] = api.useRemoveFromFavoriteMutation();
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


    // const ItemWithButton = ({ imageUrl, style, price, oldPrice, name, currency = 'gel' }: Props) => {
    //     return (
    //         <>

    //         </>
    //     )
    // }

    // const result = Object.keys(favorites).map((key) => {
    //     return { [key]: favorites[key as keyof typeof favorites] };
    // });

    // console.log(result)


    return isFavoritesLoading ? <Loader /> : !favorites ? (<span>Not Fount Favorites</span>) : (
        <>




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
                            <MoreFilterBtn onClick={() => setOpenModal(true)}>
                                მეტი ფილტრი
                                <MoreFilterIconStyle />
                            </MoreFilterBtn>
                        </FilltersBox>

                        {openModal && <SidebarFilter openModal={setOpenModal} />}


                    </FilterWrapper>
                    <FavoriteCount>სულ მოიძებნა: <span>13 შენახული</span></FavoriteCount>
                </TopSideWrapper>

                <Grid>

                    <button onClick={async () => { //works
                        const result = await removeFromFavorite({
                            productId: 1,
                            // variationId: item.variation_id,
                        });
                        await refetchFavorites();
                        console.log('removeFromFavorite result:', result);
                    }}>washla</button>

                    {/* {favorites.map((f, index) => (
                        <h1>{f.}</h1>
                    ))} */}
                    {/* {favorites.product.map((f, index) => (
                        <ItemWrapper>
                            <h1>
                                {index}
                            </h1>
                            <Item name={`levani${f.product}`} price={"80"} oldPrice={"50"} currency={"gelll"} imageUrl={"dasdas"}></Item>
                            <CartButton
                                onClick={_showFeedback}
                            >კალათაში დამატება</CartButton>
                        </ItemWrapper>
                    ))} */}
                    {/* <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/2.png'}></ItemWithButton>
                    <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/5.png'}></ItemWithButton>
                    <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/4.png'}></ItemWithButton>
                    <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/6.png'}></ItemWithButton>
                    <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/2.png'}></ItemWithButton>
                    <ItemWithButton name="საზაფხულო ფეხსაცმელი" price="80.00" oldPrice='125.00' currency='gel' imageUrl={'/assets/5.png'}></ItemWithButton> */}
                </Grid>
            </Wrapper>
        </>)
};



const MoreFilterBtn = styled.button`
    display: flex;
    align-items: center;
    box-shadow: unset !important;
    padding: 10px 10px 10px 15px;
    border: 0px;
    border-radius: 25px;
    font-size: 18px;
    color: #424F60;
    user-select: none;
    font-family: 'helvetica';
    font-weight: 500;
    background-color: #F2F2F2;
    color: #424F60;
    position: relative;
    &:hover {
        background-color: #C9F5EB;
        color: #424F60;
    }
    &::after {
        content: '';
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: 0px;
        margin-left: 20px;
        cursor: pointer;
    }
`;
const MoreFilterIconStyle = styled(MoreFilterIcon)`
    position: absolute;
    right: 13.2px;
    transform: scale(0.75);
    
`;
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
