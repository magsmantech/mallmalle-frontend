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
import styled from 'styled-components';

import MenuIcon from '../public/icons/react-icons/MenuIcon';
import Bookmark from '../public/icons/react-icons/bookmark'
import Cart from '../public/icons/react-icons/cart';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';


type Props = {
    onSidebarOpen: Function,
}

const ItemWrapper = styled.div`
    position: relative;
    &:hover span{
        visibility: visible;
    }
`;

const ItemLabel = styled.span`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
    font-size: 1.6rem;
    font-family: 'helvetica';
    font-weight: 600;
`;


export default function Navbar({ onSidebarOpen }: Props) {
    const [checked, setChecked] = useState(false);
    const {loggedIn} = useSelector((state: RootState) => state.auth);

    return (
        <>
            <nav className={styles.wrapper}>
                <MenuIcon onClick={() => onSidebarOpen()} style={{ marginRight: '1.6rem' }}/>
                {/* <AiOutlineMenu size={'3.2rem'} onMouseOver={() => onSidebarOpen()} style={{ cursor: 'pointer', marginRight: '1.6rem' }} /> */}
                <Link href='/'><img src='/assets/logo.svg' className={styles.logo} /></Link>
                <div className={styles.ItemWrappers}><SearchBar /></div>
                {/* <div className={styles.ItemWrappers}><LanguageSwitcher languages={[ 'EN', 'GEO']} /></div> */}
                <div className={styles.ItemWrappers}><Toggle on="₾" off="$" onCheckChange={(val: boolean) => setChecked(val)} checked={checked} /></div>
                {/* <Link href='/auth'><BiUser size={"3.2rem"} color={"white"} style={{ cursor: 'pointer', marginLeft: '2.4rem' }} /></Link> */}
                {/* <Link href='/profile'><BiUser size={"3.2rem"} color={"white"} style={{ cursor: 'pointer', marginLeft: '2.4rem' }} /></Link> */}
                <div className={styles.divider}></div>
                {!loggedIn && <Link href='/auth'>
                    <ItemWrapper style={{ cursor: 'pointer', marginLeft: '2.0rem' }}>
                        <User width={'3.6rem'} height={'3.6rem'} color="white" />
                        <ItemLabel>ავტორიზაცია</ItemLabel>
                    </ItemWrapper>
                </Link>}
                {loggedIn && <Link href='/profile'>
                    <ItemWrapper style={{ cursor: 'pointer', marginLeft: '2.6rem' }}>
                        <User width={'3.6rem'} height={'3.6rem'} color="white" />
                        <ItemLabel>პროფილი</ItemLabel>
                    </ItemWrapper>
                </Link>}

                {/* {loggedIn && */}
                <Link href={{
                    pathname: '/profile',
                    query: { tab: 'bookmark' },
                }}>
                    <ItemWrapper style={{ cursor: 'pointer', marginLeft: '2.6rem' }}>
                        {/* <BsBookmark size={"3.2rem"} color={"white"} /> */}
                        <Bookmark width={'3.6rem'} height={'3.6rem'}/>
                        <ItemLabel>რჩეულები</ItemLabel>
                    </ItemWrapper>
                </Link>
                {/* } */}
                <Link href='/cart'>
                    <ItemWrapper style={{ cursor: 'pointer', marginLeft: '2.6rem' }}>
                        {/* <AiOutlineShoppingCart size={"3.2rem"} color={"white"} /> */}
                        <Cart width={'3.6rem'} height={'3.6rem'}/>
                        <ItemLabel>კალათა</ItemLabel>
                    </ItemWrapper>

                </Link>
            </nav>
            <div className={styles.curve}></div>
        </>
    );
}