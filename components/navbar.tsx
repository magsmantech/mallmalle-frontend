import styles from '../styles/Navbar.module.css'

import { AiOutlineMenu } from 'react-icons/ai';
// import Logo from '../public/assets/brand-logo@2x.png';
import SearchBar from './search-bar';
import LanguageSwitcher from './language-switcher';
import Toggle from './toggle';

import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

import Image from 'next/image'

import { useState } from 'react';
import Link from 'next/link';
// import IconWrapper from '../utilities/IconWrapper';
import User from '../public/icons/react-icons/user';
import HdUser from '../public/icons/react-icons/HdUser';
import styled from 'styled-components';

import MenuIcon from '../public/icons/react-icons/MenuIcon';
import Bookmark from '../public/icons/react-icons/bookmark'
import CartIcon from '../public/icons/react-icons/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import Responsive from '../config/Responsive';
import api from '../features/api';
import Loader from './Loader';
import { Cart, Favorite } from '../domain/shop';
import UsFlag from '../public/icons/react-icons/usFlag';
import GeoFlag from '../public/icons/react-icons/geoFlag';
import i18next from 'i18next';



const Navbar: React.FC<{
    onSidebarOpen: Function;
    cart: Cart;
    favorite: Favorite[];
    displayName: any;
}> = ({
    onSidebarOpen,
    cart,
    favorite,
    displayName
}) => {

        const [checked, setChecked] = useState(false);
        const { loggedIn } = useSelector((state: RootState) => state.auth);

        const toggleLanguage = async () => {
            {i18next.language == 'en' ? i18next.changeLanguage('ge') : i18next.changeLanguage('en')}
              window.location.reload();
          };

        return (
            <>
                <Nav className={styles.wrapper}>
                    <MenuIcon onClick={() => onSidebarOpen()} />
                    {/* <AiOutlineMenu size={'3.2rem'} onMouseOver={() => onSidebarOpen()} style={{ cursor: 'pointer', marginRight: '1.6rem' }} /> */}
                    {i18next.language == 'en' ?
                    <Link href='/'><HeaderLogoTag src='/assets/logo.svg' className={styles.logo} /></Link>
                    : 
                    <Link href='/'><HeaderLogoTagGeo src='/assets/mallmalleGeo.png' className={styles.logo} /></Link>
                    }
                    <SearchWrapper className={styles.ItemWrappers}><SearchBarStyle /></SearchWrapper>
                    {/* <LanguageSwitcherWrapper>
                        <LanguageSwitcherStyle languages={[ 'EN', 'GEO']} />
                    </LanguageSwitcherWrapper> */}
                    <Language>

                    <div onClick={toggleLanguage}>
                    {i18next.language == 'en' ?
                        <GeoFlagStyle />
                        :
                        <UsFlagStyle />
                    }
                    </div>
                    </Language>
                    {/* <div className={styles.ItemWrappers}><Toggle on="₾" off="$" onCheckChange={(val: boolean) => setChecked(val)} checked={checked} /></div> */}
                    {/* <Link href='/auth'><BiUser size={"3.2rem"} color={"white"} style={{ cursor: 'pointer', marginLeft: '2.4rem' }} /></Link> */}
                    {/* <Link href='/profile'><BiUser size={"3.2rem"} color={"white"} style={{ cursor: 'pointer', marginLeft: '2.4rem' }} /></Link> */}
                    <VerticalLine className={styles.divider}></VerticalLine>
                    {!loggedIn && <Link href='/auth'>
                        <ItemWrapper style={{ cursor: 'pointer', marginLeft: '2.0rem' }}>
                            <UserIcon />
                            <ItemLabel>ავტორიზაცია</ItemLabel>
                        </ItemWrapper>
                    </Link>}
                    {loggedIn && <Link href={{
                        pathname: '/profile',
                        query: { tab: 'profile' },
                    }}>
                        <ItemWrapper >
                            <UserIcon />
                            <ItemLabel>{displayName}</ItemLabel>
                        </ItemWrapper>
                    </Link>}

                    {/* {loggedIn && */}
                    <Link href={{
                        pathname: '/profile',
                        query: { tab: 'bookmark' },
                    }}>
                        <ItemWrapper >
                            {/* <BsBookmark size={"3.2rem"} color={"white"} /> */}
                            <BookmarkIcon />
                            <ItemLabel>რჩეულები</ItemLabel>
                            {loggedIn === false ? null : (
                                favorite.length <= 0 ? null : favorite.length == undefined ? null : (
                                    <FavoriteCount>{favorite.length}</FavoriteCount>
                                )
                            )}
                        </ItemWrapper>
                    </Link>
                    {/* } */}
                    {loggedIn === false ? null : (
                        <Link href='/cart'>
                            <ItemWrapper >
                                {/* <AiOutlineShoppingCart size={"3.2rem"} color={"white"} /> */}
                                <CartIconStyle />
                                <ItemLabel>კალათა</ItemLabel>
                                {loggedIn === true ? (
                                    cart.items?.length <= 0 || cart.items?.length == undefined ? null : (<CountLenght>{cart.items?.length}</CountLenght>)
                                ) : null}
                            </ItemWrapper>
                        </Link>
                    )}

                </Nav>
                <HoriontalFixedLine className={styles.curve}></HoriontalFixedLine>
            </>
        )
    }

// styles
const CountLenght = styled.div`
    position: absolute;
    top: -3px;
    right: 0px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-family: 'helvetica';
        ${Responsive.tabletMobile}{
            right: -8px;
            top: -5px;
        }
`;
const FavoriteCount = styled.div`
    position: absolute;
    top: -3px;
    right: 5px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-family: 'helvetica';
        ${Responsive.tabletMobile}{
            right: -8px;
            top: -5px;
        }
`;
const HoriontalFixedLine = styled.div`
    ${Responsive.tabletMobile}{
        top: 100px; //TODO Levan Madurashvili
        height: 24px;
    }
    ${Responsive.laptop}{
        margin-top: -40px;
        margin-right: -1px;
        margin-left: -1px;
    }
`;
const SearchWrapper = styled.div`
    ${Responsive.tabletMobile}{
        margin-right: 15px;
        margin-left: 15px;
    }
    ${Responsive.mobile}{
        display: none;
    }
`;
const VerticalLine = styled.div`
    ${Responsive.tabletMobile} {
        display: none;
    }
`;
const Nav = styled.nav`
    padding: 0px 40px;
        ${Responsive.tabletMobile} {
            padding: 20px 24px 0px 24px;
            height: 120px;
        }
        ${Responsive.laptop} {
            padding: 20px 44px 0px 44px;
            height: 110px;
            margin-top: -10px;
        }
`;
const UserIcon = styled(HdUser)`
    height: 30px;
        &:hover {
            color: red;
        }
`;
const BookmarkIcon = styled(Bookmark)`
    height: 30px;
  
`;
const CartIconStyle = styled(CartIcon)`
    height: 30px;
`;
const ItemWrapper = styled.div`
    position: relative;
    cursor: pointer;
    padding: 0px 5px;
    margin: 0px 4px;

    &:last-child {
        margin-right: -11px;
    }
    &:hover span{
        visibility: visible;
    }
    ${Responsive.tabletMobile} {
        transform: scale(0.8);
        padding: 0px 0px;
        margin-top: -19px;
        &:last-child {
            margin-right: 0px;
        }
    }
    ${Responsive.laptop} {
        width: 35px;
    }
`;
const ItemLabel = styled.span`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
    font-size: 16px;
    font-family: 'helvetica';
    font-weight: 600;
    ${Responsive.laptop} {
        font-size: 12px;
        margin-left: 5px;
    }
`;
const HeaderLogoTag = styled.img`
    width: 250px;
    margin-right: 35px;
        ${Responsive.tabletMobile}{
            width: 150px;
            margin-right: auto;
        }
        ${Responsive.laptop}{
            width: 170px;
            margin-right: 10px;
            margin-left: -30px;
            margin-top: 5px;
        }
`;
const HeaderLogoTagGeo = styled(HeaderLogoTag)`
    width: 220px;
    margin-right: 65px;
    margin-top: 10px;
        ${Responsive.tabletMobile}{
            width: 150px;
            margin-right: auto;
        }
        ${Responsive.laptop}{
            width: 145px;
            margin-right: 35px;
            margin-left: -30px;
            margin-top: 10px;
        }
`;
const LanguageSwitcherWrapper = styled.div`
    width: 50px;
    margin-left: 20px;
    ${Responsive.mobile}{
        display: none;
    }
`;
const SearchBarStyle = styled(SearchBar)`
    ${Responsive.laptop}{
        width:100%;
    }
`;
const LanguageSwitcherStyle = styled(LanguageSwitcher)`
    ${Responsive.laptop}{
        font-size: 12px;
    }
`;
const UsFlagStyle = styled(UsFlag)`
    ${Responsive.laptop} {
        margin-left: -10px;
    }
    ${Responsive.mobile} {
        margin-left: 50px;
    }
`;
const GeoFlagStyle = styled(GeoFlag)`
    ${Responsive.laptop} {
        margin-left: -10px;
    }
    ${Responsive.mobile} {
        margin-left: 50px;
    }
`;
const Language = styled.div`
        display: block;
        width: 30px;
        margin-left: 20px;
        align-items: center;
    ${Responsive.mobile} {
        display: none;
    }
`;

export default Navbar