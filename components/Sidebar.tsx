import styles from '../styles/Sidebar.module.css'
import Image from 'next/image';
import { CgClose } from 'react-icons/cg';
import { IoMan, IoWoman } from 'react-icons/io5';
import { FaChild, FaTshirt } from 'react-icons/fa';
import { GiPresent, GiConverseShoe } from 'react-icons/gi';
import { HiArrowLeft } from 'react-icons/hi';
import { BsWatch } from 'react-icons/bs';
import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SiGooglemessages } from 'react-icons/si';

import CloseIcon from '../public/icons/react-icons/close';

import WomanIcon from '../public/icons/react-icons/sidebar-icons/woman';
import ManIcon from '../public/icons/react-icons/sidebar-icons/man';
import ChildIcon from '../public/icons/react-icons/sidebar-icons/child';
import MessageIcon from '../public/icons/react-icons/sidebar-icons/message';
import BoxesIcon from '../public/icons/react-icons/sidebar-icons/box';
import ShirtIcon from '../public/icons/react-icons/sidebar-icons/shirt';
import ShoeIcon from '../public/icons/react-icons/sidebar-icons/shoe';
import WatchIcon from '../public/icons/react-icons/sidebar-icons/watch';
import ToyIcon from '../public/icons/react-icons/sidebar-icons/toy';
import Responsive from '../config/Responsive';




type Props = {
    onSidebarClose: Function,
    categories?: any,
}

type PromoItemProps = any;

const Divider = styled.div`
    border-bottom: .1rem solid rgba(122, 112, 112, .2);
    margin: 2.8rem 0;
    display: flex;
`;

const Button = styled.div`
    display: inline-flex;
    height: 4.0rem;
    align-items: center;
    justify-content: center;
    /* font-family: 'BPG WEB 002 CAPS'; */
    text-transform: uppercase;
    font-feature-settings: "case" on;
    font-weight: 600;
    color: var(--text-color);
    background-color: #f0f0f0;
    font-size: 1.6rem;
    font-family: fira-go;
    border-radius: .4rem;
    /* font-weight: bold; */
    cursor: pointer;

    &:hover {
        background-color: #e9e9e9;

    }
`;
const PromoItemBackground = styled.div`
    display: flex;
    flex-direction: column;
    height: 230px;
    width: 100%;
    border-radius: 14px;
    justify-content: flex-end;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 1.8rem;
    position: relative;
`;
const PromoItemTextSale = styled.div`
    font-size: 16px;
`;
const PromoItemTextTime = styled.div`
    font-size: 16px;
`;
const MibileSecondMenuWrapper = styled.div`
    display: none;
        ${Responsive.tablet} {
            display: block;
        }
`;
const ForMobile = styled.div`
    height: 100%;
    ${Responsive.tablet}{
        display: none !important;
    }
    ${Responsive.mobile}{
        display: none !important;
    }
`;


const PromoItem = ({ imageUrl = '/assets/testt.png' }: PromoItemProps) => {
    return (<>
        <PromoItemBackground className={styles.promoItemBackground} style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className={styles.promoItemText}>
                <PromoItemTextSale className={styles.promoItemTextSale}>ფასდაკლება</PromoItemTextSale>
                <PromoItemTextTime className={styles.promoItemTextTime}>03:12:34 საათი</PromoItemTextTime>
            </div>
            <div className={styles.promoItemOverlay}></div>
        </PromoItemBackground>
    </>)
}

const Sidebar = ({ onSidebarClose, categories }: Props) => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showDetailMenu, setShowDetailMenu] = useState(false);
    const [inSubMenu, setInSubMenu] = useState(false);
    const [subMenuItems, setSubMenuItems] = useState<any>([]);
    const [detailMenuItems, setDetailMenuItems] = useState<any>([]);
    const [selectedItemTitle, setSelectedItemTitle] = useState<string>('');
    // const [selectedSubItemIndex, setSelectedSubItemIndex] = useState<number>(0);

    const [showSiteBarInMobile, setshowSiteBarInMobile] = useState(false);

    const uploadUrl = "https://mallmalle-images.s3.eu-central-1.amazonaws.com/";

    // const tree = [
    //     {
    //         title: 'ქალი',
    //         color: styles.itemIconWoman,
    //         icon: <><WomanIcon className={styles.itemIconWoman} /></>,
    //         subItems: [
    //             {
    //                 title: 'ტანსაცმელი',
    //                 icon: <><ShirtIcon className={styles.itemIconClothes} /></>,
    //                 color: styles.itemIconClothes,
    //                 subItems: [
    //                     {
    //                         title: 'პერანგი'
    //                     },
    //                     {
    //                         title: 'მაისური'
    //                     },
    //                     {
    //                         title: 'კაბა'
    //                     },
    //                     {
    //                         title: 'შარვალი'
    //                     },
    //                     {
    //                         title: 'პიჯაკი'
    //                     },
    //                     {
    //                         title: 'ქვედაბოლო'
    //                     },
    //                     {
    //                         title: 'ქურთუკი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'ფეხსაცმელი',
    //                 icon: <><ShoeIcon className={styles.itemIconShoes} /></>,
    //                 color: styles.itemIconShoes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'დაბალძირიანი'
    //                     },
    //                     {
    //                         title: 'ქუსლიანი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'აქსესუარები',
    //                 icon: <><WatchIcon className={styles.itemIconAccessories} /></>,
    //                 color: styles.itemIconAccessories,
    //             },
    //         ],
    //     },
    //     {
    //         title: 'კაცი',
    //         icon: <><ManIcon className={styles.itemIconMan} /></>,
    //         color: styles.itemIconMan,
    //         subItems: [
    //             {
    //                 title: 'ტანსაცმელი',
    //                 icon: <><ShirtIcon className={styles.itemIconClothes} /></>,
    //                 color: styles.itemIconClothes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'შარვალი'
    //                     },
    //                     {
    //                         title: 'პიჯაკი'
    //                     },
    //                 ],

    //             },
    //             {
    //                 title: 'ფეხსაცმელი',
    //                 icon: <><ShoeIcon className={styles.itemIconShoes} /></>,
    //                 color: styles.itemIconShoes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'დაბალძირიანი'
    //                     },
    //                     {
    //                         title: 'ქუსლიანი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'აქსესუარები',
    //                 icon: <><WatchIcon className={styles.itemIconAccessories} /></>,
    //                 color: styles.itemIconAccessories,
    //             },
    //         ],
    //     },
    //     {
    //         title: 'ბავშვი',
    //         icon: <><ChildIcon className={styles.itemIconChild} /></>,
    //         color: styles.itemIconChild,
    //         subItems: [
    //             {
    //                 title: 'ტანსაცმელი',
    //                 icon: <><ShirtIcon className={styles.itemIconClothes} /></>,
    //                 color: styles.itemIconClothes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'შარვალი'
    //                     },
    //                     {
    //                         title: 'პიჯაკი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'ფეხსაცმელი',
    //                 icon: <><ShoeIcon className={styles.itemIconShoes} /></>,
    //                 color: styles.itemIconShoes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'დაბალძირიანი'
    //                     },
    //                     {
    //                         title: 'ქუსლიანი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'აქსესუარები',
    //                 icon: <><WatchIcon className={styles.itemIconAccessories} /></>,
    //                 color: styles.itemIconAccessories,
    //             },
    //             {
    //                 title: 'სათამაშოები',
    //                 icon: <><ToyIcon className={styles.itemIconToys} /></>,
    //                 color: styles.itemIconToys,
    //             },
    //         ],
    //     },
    //     {
    //         title: 'სხვადასხვა',
    //         icon: <><MessageIcon className={styles.itemIconOther} /></>,
    //         color: styles.itemIconOther,
    //         subItems: [
    //             {
    //                 title: 'ტანსაცმელი',
    //                 icon: <><ShirtIcon className={styles.itemIconClothes} /></>,
    //                 color: styles.itemIconClothes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'შარვალი'
    //                     },
    //                     {
    //                         title: 'პიჯაკი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'ფეხსაცმელი',
    //                 icon: <><ShoeIcon className={styles.itemIconShoes} /></>,
    //                 color: styles.itemIconShoes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'დაბალძირიანი'
    //                     },
    //                     {
    //                         title: 'ქუსლიანი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'აქსესუარები',
    //                 icon: <><WatchIcon className={styles.itemIconAccessories} /></>,
    //                 color: styles.itemIconAccessories,
    //             },
    //             {
    //                 title: 'სათამაშოები',
    //                 icon: <><ToyIcon className={styles.itemIconToys} /></>,
    //                 color: styles.itemIconToys,
    //             },
    //         ],
    //     },
    //     {
    //         title: 'ბოქსები',
    //         icon: <><BoxesIcon className={styles.itemIconBoxes} /></>,

    //         color: styles.itemIconBoxes,
    //         subItems: [
    //             {
    //                 title: 'ტანსაცმელი',
    //                 icon: <><ShirtIcon className={styles.itemIconClothes} /></>,
    //                 color: styles.itemIconClothes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'შარვალი'
    //                     },
    //                     {
    //                         title: 'პიჯაკი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'ფეხსაცმელი',
    //                 icon: <><ShoeIcon className={styles.itemIconShoes} /></>,
    //                 color: styles.itemIconShoes,
    //                 subItems: [
    //                     {
    //                         title: 'სპორტული'
    //                     },
    //                     {
    //                         title: 'კლასიკური'
    //                     },
    //                     {
    //                         title: 'ყოვედღიური'
    //                     },
    //                     {
    //                         title: 'დაბალძირიანი'
    //                     },
    //                     {
    //                         title: 'ქუსლიანი'
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'აქსესუარები',
    //                 icon: <><WatchIcon className={styles.itemIconAccessories} /></>,
    //                 color: styles.itemIconAccessories,
    //             },
    //             {
    //                 title: 'სათამაშოები',
    //                 icon: <><ToyIcon className={styles.itemIconToys} /></>,
    //                 color: styles.itemIconToys,
    //             },
    //         ],
    //     },
    // ]

    const mouseEnterItem = (index: number) => {
        const items = categories[index]?.childrens;
        const title = categories[index]?.category_name;
        setSelectedItemTitle(title);
        if (!items) {
            setSubMenuItems([]);
            return;
        }
        setSubMenuItems(items);
        setShowSubMenu(true);
    };

    const mouseLeaveItem = () => {
        if (inSubMenu) {
            setShowSubMenu(true);
            return
        }
        // if (!inSubMenu) {
        //     setShowSubMenu(false);
        //     return
        // }
    };


    const mouseEnterSubItem = (index: number) => {
        const items = subMenuItems[index]?.childrens;
        if (!items) {
            setDetailMenuItems([]);
            return;
        }
        setDetailMenuItems(items);
        setShowDetailMenu(true);
    };



    const SidebarItems = () => {
        return (
            <SidebarItemWrapper className={styles.itemsContainer}>
                {categories.map((item: any, index: number) =>
                    <Link href={'/catalog/' + item.id} key={index}>
                        <SidebarItem className={styles.item}
                            onClick={() => [onSidebarClose(), () => setshowSiteBarInMobile(true)]}
                            onMouseEnter={() => mouseEnterItem(index)}
                            onMouseLeave={mouseLeaveItem}
                        >
                            <SidebarItemIconWrapper className={styles.iconWrapper}>
                                {/* <IoWoman size={'2.5rem'} className={item.color} /> */}
                                <img src={uploadUrl + `${item.icon ? item.icon : "not founc icon"}`} alt="item icon" />
                            </SidebarItemIconWrapper>
                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name}</SideBarItemTitle>
                        </SidebarItem>
                    </Link>
                )}
            </SidebarItemWrapper>
        );
    };




    const SubmenuItems = () => {
        return (
            <SidebarItemWrapper className={styles.itemsContainer}>
                {subMenuItems.map((item: any, index: number) =>
                    <Link href={'/catalog/' + item.id} key={index}>
                        <div className={styles.item} onClick={() => onSidebarClose()}
                            onMouseLeave={() => setShowDetailMenu(false)}
                            onMouseEnter={() => mouseEnterSubItem(index)}>
                            <SidebarItemIconWrapper className={styles.iconWrapper}>
                                {/* <FaTshirt size={'2.5rem'} className={item.color} /> */}
                                <img src={uploadUrl + `${item.icon ? item.icon : "not founc icon"}`} alt="item icon" />
                            </SidebarItemIconWrapper>

                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name}</SideBarItemTitle>
                        </div>
                    </Link>

                )}
            </SidebarItemWrapper>
        );
    };


    const DetailMenu = () => {
        return (<>
            <SubmenuTitle className={styles.detailMenuTitle}>
                შემოთავაზებული კატეგორიები
            </SubmenuTitle>
            <Divider></Divider>
            <div >
                {detailMenuItems.map((item: any, index: number) =>
                    <Link href={'/catalog/' + item.id} key={index}>
                        <MainTittleStyle
                            onClick={() => onSidebarClose()}
                            className={styles.detailMenuitem}>
                            {item.category_name}
                        </MainTittleStyle>
                    </Link>
                )}
            </div>
            {/* <Button>ყველა კატეგორია</Button> */}
            <div className={styles.promoItemsWrapper}>
                <PromoItem></PromoItem>
                <PromoItem></PromoItem>
            </div>
        </>)
    };


    return (
        <>
            <BackgroundShadow onClick={() => onSidebarClose()} />
            <div className={styles.wrapper} onClick={(e) => console.log(e)}>
                <SideBarWrapper className={styles.container}>
                    <SideBarTopSideWrapper className={styles.header}>
                        <SideBarMainIcon src={'/assets/mallmalle.png'} />
                        <CloseBtnWrapper className={styles.iconWrapper} onClick={() => onSidebarClose()}>
                            <CloseIcon color='#424F60' />
                        </CloseBtnWrapper>
                    </SideBarTopSideWrapper>
                    <div className={styles.content}>
                        <SideBarTitle className={styles['content-title']}>კატეგორიები</SideBarTitle>
                        <SidebarItems />
                    </div>
                </SideBarWrapper>
                <ForMobile>
                    {showSubMenu && !!subMenuItems.length && <SideBarWrapper className={styles.container}
                        onMouseLeave={() => setInSubMenu(false)}
                        onMouseEnter={() => setInSubMenu(true)}>

                        <div className={styles.content}>
                            <SubmenuTitle className={styles.submenuTitle}>{selectedItemTitle}</SubmenuTitle>
                            <SideBarSubMenuTitle className={styles.submenuSubtitle}>აირჩიე კატეგორია</SideBarSubMenuTitle>
                            <SubmenuItems />
                        </div>
                    </SideBarWrapper>}
                </ForMobile>
                <ForMobile>
                    {showDetailMenu && !!detailMenuItems.length && <div className={styles.container}
                        onMouseLeave={() => setShowDetailMenu(false)}
                        onMouseEnter={() => setShowDetailMenu(true)}>
                        <DetailMenu />
                    </div>}
                </ForMobile>
                {showSiteBarInMobile === true ? (
                    <MibileSecondMenuWrapper>
                        <SubmenuTitle className={styles.submenuTitle}>{selectedItemTitle}</SubmenuTitle>
                        <SideBarSubMenuTitle className={styles.submenuSubtitle}>აირჩიე კატეგორია</SideBarSubMenuTitle>
                        <SubmenuItems />
                    </MibileSecondMenuWrapper>
                ) : null}
            </div>
        </>);
};



const MainTittleStyle = styled.div`
    font-size: 20px;
    font-family: "fira-go";
    padding: 10px 0px;
    margin: 5px 0px;
`;
const SubmenuTitle = styled.div`
    margin-top: 14px !important;
    font-size: 32px;
    line-height: 33px;
    margin-bottom: 48px;
`;
const SideBarSubMenuTitle = styled.div`
    font-size: 24px;
    /* margin-top: 38px; */
    width: fit-content;
`;
const SideBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 45px 40px;
    width: 100vw;
    max-width: 390px;
    overflow-x: hidden;
    height: 100vh;

`;
const SecondSideBar = styled.div`
    /* background-color: aqua; */
    /* margin-left: -5px; */
    /* position: absolute;
    left: 400px;
    top: 0;
    width: 400px; */
    /* height: 100vh; */
`;
const SideBarMainIcon = styled.img`
    width: unset;
    height: 36px;
    user-select: none;
    pointer-events: none;
`;
const CloseBtnWrapper = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 8px;
`;
const SideBarTopSideWrapper = styled.div`
    margin-bottom: 40px;
`;
const SideBarTitle = styled.span`
    font-size: 24px;
    width: fit-content;
`;
const SidebarItemWrapper = styled.div`
    margin-top: 37px;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    grid-gap: 28px;
    
`;
const SidebarItem = styled.div`
`;
const SidebarItemIconWrapper = styled.div`
    height: 52px;
    width: 52px;
    border-radius: 8px;
    margin-right: 20px  !important;
`;
const SideBarItemTitle = styled.div`
    font-size: 20px;
`;
const SecondSideBarWrapper = styled.div`
`;
const BackgroundShadow = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    background-color: #000000;
    opacity: 0.49;
    height: 100%;
    width: 100%;
        ${Responsive.tablet} {
            /* background-color: red; */
        }
`;



export default Sidebar;
