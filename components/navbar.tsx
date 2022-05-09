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
import Cart from '../public/icons/react-icons/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import Responsive from '../config/Responsive';


type Props = {
    onSidebarOpen: Function,
}





function Navbar({ onSidebarOpen }: Props) {
    const [checked, setChecked] = useState(false);
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Nav className={styles.wrapper}>
                <MenuIcon onClick={() => onSidebarOpen()} />
                {/* <AiOutlineMenu size={'3.2rem'} onMouseOver={() => onSidebarOpen()} style={{ cursor: 'pointer', marginRight: '1.6rem' }} /> */}
                <Link href='/'><HeaderLogoTag src='/assets/logo.svg' className={styles.logo} /></Link>
                <SearchWrapper className={styles.ItemWrappers}><SearchBar /></SearchWrapper>
                {/* <div className={styles.ItemWrappers}><LanguageSwitcher languages={[ 'EN', 'GEO']} /></div> */}
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
                {loggedIn && <Link href='/profile'>
                    <ItemWrapper >
                        <UserIcon />
                        <ItemLabel>პროფილი</ItemLabel>
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
                    </ItemWrapper>
                </Link>
                {/* } */}
                <Link href='/cart'>
                    <ItemWrapper >
                        {/* <AiOutlineShoppingCart size={"3.2rem"} color={"white"} /> */}
                        <CartIcon />
                        <ItemLabel>კალათა</ItemLabel>
                    </ItemWrapper>

                </Link>
            </Nav>
            <HoriontalFixedLine className={styles.curve}></HoriontalFixedLine>
        </>
    );
}

// styles
const HoriontalFixedLine = styled.div`
    ${Responsive.tabletMobile}{
        top: 120px;
        height: 24px;
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
const CartIcon = styled(Cart)`
    height: 30px;
`;
const ItemWrapper = styled.div`
    position: relative;
    cursor: pointer;
    padding: 0px 15px;
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
`;
const HeaderLogoTag = styled.img`
    width: 250px;
    margin-right: 35px;
        ${Responsive.tabletMobile}{
            width: 150px;
            margin-right: auto;
        }
`;


export default Navbar