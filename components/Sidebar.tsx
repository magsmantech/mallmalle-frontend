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
import router from 'next/router';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';



type Props = {
    onSidebarClose: Function,
    categories?: any,
}

type PromoItemProps = any;

const Divider = styled.div`
    border-bottom: .1rem solid rgba(122, 112, 112, .2);
    margin: 28px 0;
    display: flex;
    ${Responsive.laptop} {
        margin-top: -30px;
    }
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
    padding: 18px;
    position: relative;
    :hover{
        cursor: pointer;
    }
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
        ${Responsive.mobile} {
            display: block;
        }
`;
const HideInMobile = styled.div`
    height: 100%;
  
    ${Responsive.tablet}{
        display: none !important;
    }
    ${Responsive.mobile}{
        display: none !important;
    }
`;
const HideInMobileDetailMenu = styled.div`
    height: 100%;
    background-color: white;
    max-width: 390px;
    overflow-y: scroll;
  
    ${Responsive.tablet}{
        display: none !important;
    }
    ${Responsive.mobile}{
        display: none !important;
    }
`;
const DetailMenuStyle = styled.div`
  padding: 45px 40px;
    ${Responsive.laptop}{
        width: 330px;
    }
`;
const HideInDesktop = styled.div`
    height: 100%;
    display: none;
    ${Responsive.tablet}{
        display: block !important;
    }
    ${Responsive.mobile}{
        display: block !important;
    }
`;
const MobileSubMenu = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    max-width: 390px;
    width: 100%;
    background-color: #fff;
    height: 100vh;
`;
const MobileSubMenuContent = styled.div`
    margin-right: 0px !important;
    padding: 45px 24px;
`;
const DetailMenuTittle = styled.div`
    font-size: 24px;
`;


const Sidebar = ({ onSidebarClose, categories }: Props) => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showDetailMenu, setShowDetailMenu] = useState(false);
    const [inSubMenu, setInSubMenu] = useState(false);
    const [subMenuItems, setSubMenuItems] = useState<any>([]);
    const [detailMenuItems, setDetailMenuItems] = useState<any>([]);
    const [selectedItemTitle, setSelectedItemTitle] = useState<string>('');
    // const [selectedSubItemIndex, setSelectedSubItemIndex] = useState<number>(0);

    const [shoMobileSecondSideBar, setshoMobileSecondSideBar] = useState(false);



    const uploadUrl = "https://mallmalle-images.s3.eu-central-1.amazonaws.com/";



    const mouseEnterItem = (index: number) => {
        const items = categories[index]?.childrens;
        const title = categories[index]?.category_name;
        const titleEn = categories[index]?.category_name_en;
        {i18next.language == "ge" ? 
        setSelectedItemTitle(title)
        :
        setSelectedItemTitle(titleEn)
        }
        if (!items) {
            setSubMenuItems([]);
            return;
        }
        setSubMenuItems(items);
        setShowSubMenu(false);
        setTimeout(() =>setShowSubMenu(true), 100);
        
    };

    const {t, i18n} = useTranslation();


    const PromoItem = ({ imageUrl = '/assets/testt.png' }: PromoItemProps) => {
        return (<>
            <Link href={'/discounts'}>
                <PromoItemBackground onClick={() => onSidebarClose()} className={styles.promoItemBackground} style={{ backgroundImage: `url(${imageUrl})` }}>
                    <div className={styles.promoItemText}>
                        <PromoItemTextSale className={styles.promoItemTextSale}>{t('sale')}</PromoItemTextSale>
                        <PromoItemTextTime className={styles.promoItemTextTime}>03:12:34 {t('hours')}</PromoItemTextTime>
                    </div>
                    <div className={styles.promoItemOverlay}></div>
                </PromoItemBackground>
            </Link>
        </>)
    }

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
                            onClick={() => [onSidebarClose()]}
                            onMouseEnter={() => mouseEnterItem(index)}
                            onMouseLeave={mouseLeaveItem}
                        >
                            <SidebarItemIconWrapper className={styles.iconWrapper}>
                                {/* <IoWoman size={'2.5rem'} className={item.color} /> */}
                                <img className={styles.iconImgWrapper} src={uploadUrl + `${item.icon ? item.icon : "not found icon"}`} alt="item icon" />
                            </SidebarItemIconWrapper>
                            {i18next.language == "ge" ?
                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name}</SideBarItemTitle>
                            :
                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name_en}</SideBarItemTitle>
                            }
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
                                <img className={styles.iconImgWrapper} src={uploadUrl + `${item.icon ? item.icon : "not founc icon"}`} alt="item icon" />
                            </SidebarItemIconWrapper>
                            {i18next.language == "ge" ?
                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name}</SideBarItemTitle>
                            :
                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name_en}</SideBarItemTitle>
                            }
                        </div>
                    </Link>
                )}
            </SidebarItemWrapper>
        );
    };


    const DetailMenu = () => {
        return (<DetailMenuStyle>
            <SubmenuTitle className={styles.detailMenuTitle}>
                {t('offeredCategories')}
            </SubmenuTitle>
            <Divider></Divider>
            {i18next.language == "ge" ?
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
            :
            <div >
                {detailMenuItems.map((item: any, index: number) =>
                    <Link href={'/catalog/' + item.id} key={index}>
                        <MainTittleStyle
                            onClick={() => onSidebarClose()}
                            className={styles.detailMenuitem}>
                            {item.category_name_en}
                        </MainTittleStyle>
                    </Link>
                )}
            </div>
            }
            {/* <Button>ყველა კატეგორია</Button> */}
            <div className={styles.promoItemsWrapper}>
                <PromoItem></PromoItem>
                <PromoItem></PromoItem>
            </div>
        </DetailMenuStyle>)
    };


    return (
        <>
            <BackgroundShadow onClick={() => onSidebarClose()} />
            <div className={styles.wrapper}>
                <SideBarWrapper className={styles.container}>
                    <SideBarTopSideWrapper className={styles.header}>
                        <SideBarMainIcon src={'/assets/mallmalle.png'} />
                        <CloseBtnWrapper className={styles.iconWrapper} onClick={() => onSidebarClose()}>
                            <CloseIcon color='#424F60' />
                        </CloseBtnWrapper>
                    </SideBarTopSideWrapper>
                    <div className={styles.content}>
                        <SideBarTitle className={styles['content-title']}>{t('categories')}</SideBarTitle>
                        <HideInMobile>
                            <SidebarItems />
                        </HideInMobile>

                        <HideInDesktop>
                            <SidebarItemWrapper className={styles.itemsContainer}>
                                {categories.map((item: any, index: number) =>
                                    <div key={index} onClick={() => [setshoMobileSecondSideBar(!!subMenuItems.length ? true : false), () => mouseEnterItem(index)]}>
                                        <SidebarItem className={styles.item}
                                            onMouseEnter={() => mouseEnterItem(index)}
                                            onMouseLeave={mouseLeaveItem}
                                        >
                                            <SidebarItemIconWrapper className={styles.iconWrapper}>
                                                <img className={styles.iconImgWrapper} src={uploadUrl + `${item.icon ? item.icon : "not founc icon"}`} alt="item icon" />
                                            </SidebarItemIconWrapper>
                                            {i18next.language == "ge" ?
                                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name}</SideBarItemTitle>
                                            :
                                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name_en}</SideBarItemTitle>
                                            }
                                            </SidebarItem>
                                    </div>
                                )}
                        </SidebarItemWrapper>
                        </HideInDesktop>

                    </div>
                </SideBarWrapper>

                <HideInMobile>
                    {showSubMenu && !!subMenuItems.length && <SideBarWrapper className={styles.container}
                        onMouseLeave={() => setInSubMenu(false)}
                        onMouseEnter={() => setInSubMenu(true)}>

                        <div className={styles.content}>
                            <SubmenuTitle className={styles.submenuTitle}>{selectedItemTitle}</SubmenuTitle>
                            <SideBarSubMenuTitle className={styles.submenuSubtitle}>{t('selectCategory')}</SideBarSubMenuTitle>
                            <SubmenuItems />
                        </div>
                    </SideBarWrapper>}
                </HideInMobile>

                <HideInMobileDetailMenu>
                    {showDetailMenu && !!detailMenuItems.length && <div className={styles.container}
                        onMouseLeave={() => setShowDetailMenu(false)}
                        onMouseEnter={() => setShowDetailMenu(true)}>
                        <DetailMenu />
                    </div>}
                </HideInMobileDetailMenu>

                {shoMobileSecondSideBar === true ? (
                    <MobileSubMenu className={styles.container}
                        onMouseLeave={() => setInSubMenu(false)}
                        onMouseEnter={() => setInSubMenu(true)}>

                        <MobileSubMenuContent className={styles.content}>
                            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "35px" }}>
                                <CloseBtnWrapper className={styles.iconWrapper} onClick={() => setshoMobileSecondSideBar(false)}>
                                    <HiArrowLeft size={30} color='#424F60' />
                                </CloseBtnWrapper>
                                <CloseBtnWrapper className={styles.iconWrapper} onClick={() => onSidebarClose()}>
                                    <CloseIcon color='#424F60' />
                                </CloseBtnWrapper>
                            </div>
                            <SubmenuTitle style={{marginBottom: "10px"}} className={styles.submenuTitle}>{selectedItemTitle}</SubmenuTitle>
                            <SideBarSubMenuTitle style={{fontSize: '16px'}} className={styles.submenuSubtitle}>{t('selectCategory')}</SideBarSubMenuTitle>
                            <SidebarItemWrapper className={styles.itemsContainer}>
                                {subMenuItems.map((item: any, index: number) =>
                                    <Link href={'/catalog/' + item.id} key={index}>
                                        <div className={styles.item} onClick={() => onSidebarClose()}
                                            onMouseLeave={() => setShowDetailMenu(false)}
                                            onMouseEnter={() => mouseEnterSubItem(index)}>
                                            <SidebarItemIconWrapper className={styles.iconWrapper}>
                                                <img className={styles.iconImgWrapper} src={uploadUrl + `${item.icon ? item.icon : "not found icon"}`} alt="item icon" />
                                            </SidebarItemIconWrapper>
                                            {i18next.language == "ge" ?
                                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name}</SideBarItemTitle>
                                            :
                                            <SideBarItemTitle className={styles.itemTitle}>{item.category_name_en}</SideBarItemTitle>
                                            }
                                        </div>
                                    </Link>
                                )}
                            </SidebarItemWrapper>
                        </MobileSubMenuContent>
                    </MobileSubMenu>
                ) : null}



            </div>
        </>);
};



const MainTittleStyle = styled.div`
    font-size: 20px;
    font-family: "fira-go";
    padding: 5px 0px;
    margin: 5px 0px;
`;
const SubmenuTitle = styled.div`
    margin-top: 14px;
    font-size: 32px;
    line-height: 33px;
    margin-bottom: 48px;
    ${Responsive.laptop} {
        font-size: 25px;
        line-height: 20px;
    }
`;
const SideBarSubMenuTitle = styled.div`
    font-size: 24px;
    /* margin-top: 38px; */
    width: fit-content;
    ${Responsive.laptop} {
        font-size: 12px;
        margin-top: -34px;
    }
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
        ${Responsive.tablet} {
            padding: 45px 24px;
        }
        ${Responsive.mobile} {
            padding: 45px 24px;
        }
        ${Responsive.laptop} {
            width: 70vw;
            max-width: 280px;
            padding: 30px 30px;
        }

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
    ${Responsive.laptop} {
        height: 26px;
    }
    ${Responsive.mobile} {
        height: 30px;
        width: 140px;
    }
`;
const CloseBtnWrapper = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 8px;
    ${Responsive.laptop} {
        width: 42px;
        height: 42px;
        margin-right: -10px;
    }
`;
const SideBarTopSideWrapper = styled.div`
    margin-bottom: 40px;
`;
const SideBarTitle = styled.span`
    font-size: 24px;
    width: fit-content;
    ${Responsive.laptop} {
        font-size: 18px;
        margin-top: -10px;
    }
`;
const SidebarItemWrapper = styled.div`
    margin-top: 37px;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    grid-gap: 28px;
    ${Responsive.laptop} {
        grid-gap: 18px;
    }
`;
const SidebarItem = styled.div`
`;
const SidebarItemIconWrapper = styled.div`
    height: 52px;
    width: 52px;
    border-radius: 8px;
    margin-right: 20px  !important;
    ${Responsive.laptop} {
        height: 38px;
        width: 38px;
        margin-right: 10px  !important;
    }
`;
const SideBarItemTitle = styled.div`
    font-size: 20px;
    ${Responsive.laptop} {
        font-size: 15px;
    }
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
