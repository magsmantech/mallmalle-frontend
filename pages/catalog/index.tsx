import type { NextPage } from 'next'
import { BsBookmarkPlusFill, BsChevronDown, BsFilterLeft, BsStarFill } from 'react-icons/bs';
import styled from 'styled-components';
import styles from '../../styles/Catalog.module.css'

import { Wrapper as Pagination, Number } from '../../components/styled/pagination';

import { ChipIconWrapper, ChipTitle, ChipWrapper } from '../../components/styled/Chips';
import Link from 'next/link';
import Button from '../../components/styled/button';
import { useState, useEffect } from 'react';
import { Wrapper, Item as RadioItem, RadioButtonLabel, RadioButton } from '../../components/styled/radioButton';
import Slider from '../../components/slider';
import FilterSelect from '../../components/filterSelect';
import { Breadcrumbs } from '../../components/styled/breadcrumbs';
import ColorSelector from '../../components/ColorSelector';

import FilterIcon from '../../public/icons/react-icons/filter';
import { useDispatch } from 'react-redux';
import { showFeedback } from '../../features/feedbackSlice';
import { getProducts, getProductsById } from '../../services/products-service';

const Heading = styled.h1`
    color: var(--text-color);
    font-size: 4.4rem;
    font-family: 'BPG WEB 002 Caps';
    font-weight: 400;
    margin: 0;
    /* text-transform: uppercase;
    font-feature-settings: "case" on; */

`;

const Quantity = styled.span`
    font-weight: 500;
    color: var(--text-color);
    opacity: 0.5;
    font-family: fira-go;
    font-size: 1.6rem;
    transform: translateY(-0.9rem);
    margin-left: 2.2rem;
`;

const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3.2rem;
`;


const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    /* z-index: ; */
    /* &:hover {
        z-index: 3;
    } */
`;

const ItemBackground = styled.div`
    position: absolute;
    top: -1.0rem;
    bottom: -8.0rem;
    left: -1.0rem;
    right: -1.0rem;
    background-color: white;
    border-radius: 1.4rem;
    z-index: 1;
    box-shadow: 1.0rem 1.0rem 1.0rem rgba(0, 0, 0, 0.16);
    
`;

const Img = styled.div`
    width: 100%;
    height: 54.2rem;
    background-image: ${(props: { backgroundImage: string }) => `url(${props.backgroundImage})`};
    background-size: 105%;
    background-repeat: no-repeat;
    
    transition: all 150ms ease-in-out;
    position: center;
    border-radius: 1.4rem;
    position: relative;
    &:hover {
        background-size: 110%;
    } 
`;

const ItemOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    /* opacity: 0.3; */
    
    border-radius: 1.4rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 2.0rem;
`;

const BookmarkWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 9.5rem;
    height: 9.5rem;
    border-radius: 100%;
    backdrop-filter: blur(10px);
    /* -webkit-backdrop-filter: blur(10px); */
    background-color: rgba(0, 0, 0, 0.7);
`;

const ItemButton = styled(Button)`
    position: absolute;
    width: 100%;
    bottom: -7.0rem;
    z-index: 1;
    height: 5.6rem;
    font-weight: 600;
    font-family: fira-go;
    font-size: 1.6rem;
    background-image: var(--button-gradient);
    /* margin-top: 2.0rem; */
    /* display: none; */

`;

const Price = styled.span`
    font-size: 2.8rem;
    color: var(--text-color);
    font-weight: 700;
    font-family: fira-go;
`;

const OldPrice = styled.span`
    font-size: 1.8rem;
    
    font-family: 'helvetica';
    color: var(--text-color);
    font-weight: 700;

    opacity: 0.5;
    text-decoration: line-through;
`;

const Title = styled.span`
    color: var(--text-color);
    /* font-family: 'BPG WEB 002 Caps'; */
    text-transform: uppercase;
    font-feature-settings: "case" on;

    font-weight: 700;
    font-size: 1.8rem;
    
    font-family: 'helvetica';
`;


export const Count = styled.span`
    font-size: 1.4rem;
    font-family: 'helvetica';
    color: var(--text-color);

`;

const Badge = styled.span`
    font-size: 1.8rem;
    font-family: 'helvetica';
    color: #22D5AE;
    padding: .2rem .8rem;
    border-radius: 2.1rem;
    border: .15rem solid #22D5AE;
    display: flex;
    font-weight: bold;
    align-items: center;
`;
const HoverButton = styled(Button)`
    background-image: none;
    /* height: 5.4rem;  */
    color: #22D5AE;
    border: .2rem solid #22D5AE;
    &:hover {
        /* background-color: #22D5AE; */
        border: none;
        color: white;
        background-image: linear-gradient(to right, #22D5AE, #3A7BD5);
    }
`;


const Item = ({ imgSrc, id }: any) => {
    const [hovered, setHovered] = useState(false);

    const dispatch = useDispatch();
    
    const _addToCart = () => {
        dispatch(showFeedback({
            show: true,
        }))
    }

    return <><Link href={ "/detail/"+ id }><ItemWrapper className={styles.wrapper}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <Img backgroundImage={imgSrc} className={styles.child}>
            {(hovered)  && <ItemOverlay>
                <BookmarkWrapper style={{zIndex: 20}}>                    
                    <BsBookmarkPlusFill size={'3.6rem'} color={'#ffffff'}/>
                </BookmarkWrapper>
            </ItemOverlay>
            }
        </Img>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.8rem 0 1.5rem 0' }} className={styles.child}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <Price style={{ marginRight: '1.6rem' }}>85,99 ₾</Price>
                <OldPrice>120,00 ₾</OldPrice>
            </div>
            <Badge>-10%</Badge>
        </div>
        <span className={styles.child} style={{
            marginBottom: '1.0rem',
            color: 'var(--text-color)',
            fontFamily: "'helvetica", fontSize: '1.6rem',
            textTransform: 'uppercase',
            fontFeatureSettings: '"case" on'}}><Title >ზედა სული</Title> / შავი ზედა...</span>
        <div style={{ display: 'flex', alignItems: 'center' }} className={styles.child}>
            <div style={{ display: 'flex', gap: '.4rem', marginRight: '.8rem' }} >
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
                <BsStarFill size={'1.8rem'} color={'#22D5AE'} />
            </div>
            <Count>402 ნახვა</Count>
        </div>
        {hovered && <ItemButton
            className={styles.child}
            // onClick={_addToCart}
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >კალათაში დამატება</ItemButton>}
        {hovered && <ItemBackground />}
    </ItemWrapper></Link></>
}

type FilterSideBarProps = {
    onClose: Function,
    onEnter: Function,
};

const FilterSideBar = ({onClose, onEnter}: FilterSideBarProps) => {
    const [select, setSelect] = useState('all');
    const handleSelectChange = (event: any) => {
        const value = event.target.value;
        setSelect(value);
    };

    const array1 = [
        {
            label: 'ყველა',
            value: 'all'
        },
        {
            label: 'ახალდამატებული',
            value: 'new'
        },
        {
            label: 'ზედები',
            value: 'tops'
        },
        {
            label: 'შარვლები',
            value: 'pants'
        },
        {
            label: 'კაბები',
            value: 'dresses'
        },
        {
            label: 'კორსეტები და პიჯაკები',
            value: 'coreset'
        },
        {
            label: 'ფეხსაცმელები',
            value: 'shoes'
        },
        
        {
            label: 'დიდი ზომები',
            value: 'big'
        },
        {
            label: 'აქსესუარები',
            value: 'accessories'
        },
    ];

    const array2 = [
        {
            label: 'ფასდაკლებები',
            value: 'sale'
        },
        {
            label: 'პოპულარულები',
            value: 'popular'
        },
        {
            label: 'ექსკლუზიურები',
            value: 'exclusive'
        },
        {
            label: 'დაბალ ბიუჯეტურები',
            value: 'low-budget'
        },
        {
            label: 'შეთავაზებები',
            value: 'offers'
        },
    ];

    const [colors, setColors] = useState([
        '#000000',
        '#794428',
        '#f6881b',
        '#fee41f',
        '#2bb430',
        '#345fec',
        '#a527f3',
        '#fea6fb',
      ]);
    const [arr1, setArr1] = useState(array1)
    const [arr2, setArr2] = useState(array2)


    return (<>
        <div className={styles.filterSideBar}>
            <div className={styles.filterTitle} >კატეგორიები</div>
            <Wrapper>
                {arr1.map((item, i) => 
                    <RadioItem 
                        key={i}>
                        <RadioButton
                            type="radio"
                            name="radio"
                            value={item.value}
                            checked={select === item.value}
                            onChange={(event) => handleSelectChange(event)}
                            />
                        <RadioButtonLabel />
                        <div className={styles.radioButtonLabel}>{item.label}</div>
                    </RadioItem>            
                )}
            </Wrapper>
            <div className={styles.divider}></div>
            <div className={styles.filterTitle} >ფასი</div>
            <Slider></Slider>
            <Wrapper style={{marginTop: '5.0rem'}}>
            {arr2.map((item, i) => 
                    <RadioItem key={i}>
                        <RadioButton
                            type="radio"
                            name="radio"
                            value={item.value}
                            checked={select === item.value}
                            onChange={(event) => handleSelectChange(event)}
                            />
                        <RadioButtonLabel />
                        <div>{item.label}</div>
                    </RadioItem>            
                )}
            </Wrapper>
            <div className={styles.filterTitle} style={{marginTop: '4.2rem'}} >ფერები</div>
            <div>
                {/* @ts-ignore */}
                <ColorSelector colors={colors} small style={{justifyContent: 'space-between'}}/>
            </div>
            <div className={styles.filterFooter}>
                <HoverButton style={{fontWeight: 500, height: '7.1rem'}} lowercase onClick={()=> onClose()}>გაუქმება</HoverButton>
                <Button style={{fontWeight: 500, height: '7.1rem'}} lowercase onClick={()=> onEnter()}>აჩვენე 124</Button>
            </div>

        </div>
    </>)
}


const Catalog: NextPage = () => {
    const [openFilters, setOpenFilters] = useState(false)

    useEffect(() => {
        document.body.style.overflow = openFilters ? "hidden": 'auto';
    }, [openFilters])

    useEffect(() => {
        getProductsById(1).then((res) => {
            console.log(res);
            
        })
        .catch(err => {
            console.log(err);
            
        })
    }, []);

    return (
        <>
            {openFilters && <div className={styles.overlay} onClick={()=> setOpenFilters(false)}></div>}
            {openFilters && <FilterSideBar onClose={()=> setOpenFilters(false) } onEnter={()=>setOpenFilters(false)}/>}
            <Breadcrumbs style={{marginBottom: '2.0rem'}}>მთავარი / კატეგორიები / ტანსაცმელი</Breadcrumbs>
            <div style={{ margin: '2.0rem 0 6.0rem 0', display: 'flex', alignItems: 'flex-end' }}>
                <Heading>ტანსაცმელი</Heading>
                <Quantity>12 323 პროდუქტი</Quantity>
            </div>
            <div style={{ display: 'flex',
                    alignItems: 'center',
                    gap: '2.4rem',
                    padding: '1.7rem',
                    height: '8.2rem',
                    backgroundColor: 'white',
                    position: 'fixed',
                    zIndex: 3,
                    borderRadius: '4.2rem',
                    top: '21.0rem',
                    right: '2.4rem',
                }}>
                <FilterSelect/>
                <ChipWrapper>
                    <ChipTitle>ბრენდი</ChipTitle>
                    <ChipIconWrapper>
                        <BsChevronDown size={'2.0rem'}></BsChevronDown>
                    </ChipIconWrapper>
                </ChipWrapper>

                <ChipWrapper>
                    <ChipTitle>ფასი</ChipTitle>
                    <ChipIconWrapper>
                        <BsChevronDown size={'2.0rem'}></BsChevronDown>
                    </ChipIconWrapper>
                </ChipWrapper>
                <ChipWrapper onClick={()=> setOpenFilters(true)}>
                    <ChipTitle>მეტი ფილტრი</ChipTitle>
                    <ChipIconWrapper>
                        <FilterIcon width={'2.4rem'} height={'2.4rem'}/>
                    </ChipIconWrapper>
                </ChipWrapper>
            </div>
            <Grid>
                <Item id={1} imgSrc={'/assets/2.png'}></Item>
                <Item id={2} imgSrc={'/assets/3112.png'}></Item>
                <Item id={3} imgSrc={'/assets/6.png'}></Item>
                <Item id={4} imgSrc={'/assets/3112.png'}></Item>

                <Item id={1} imgSrc={'/assets/6.png'}></Item>
                <Item id={2} imgSrc={'/assets/2.png'}></Item>
                <Item id={3} imgSrc={'/assets/2.png'}></Item>
                <Item id={4} imgSrc={'/assets/3112.png'}></Item>

                <Item id={1} imgSrc={'/assets/6.png'}></Item>
                <Item id={1} imgSrc={'/assets/3112.png'}></Item>
                <Item id={1} imgSrc={'/assets/3112.png'}></Item>
                <Item id={1} imgSrc={'/assets/2.png'}></Item>
            </Grid>

            <Pagination style={{ margin: '3.2rem 0 3.7rem 0' }} gap={'1.4rem'}>
                <Number selected>1</Number>
                <Number>2</Number>
                <Number>3</Number>
                <Number>4</Number>
            </Pagination>

        </>
    )
}

export default Catalog;

// import { NextPage } from "next"

// const Catalog: NextPage = () => {
//     return <h1>Test</h1>
// }

// export default Catalog;
