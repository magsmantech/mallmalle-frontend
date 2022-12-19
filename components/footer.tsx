import classNames from 'classnames';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import styled from 'styled-components';
import { IWBWrapper, IWBInput, IWBButton } from '../pages/auth';
import styles from '../styles/Footer.module.css';
import FacebookIcon from '../public/icons/react-icons/facebook';
import YoutubeIcon from '../public/icons/react-icons/youtube';
import InstagramIcon from '../public/icons/react-icons/instagram';
import Responsive from '../config/Responsive';
import Link from "next/link";
import { useState } from 'react';
import api from '../features/api';
import Loader from './Loader';
import { Alert, Snackbar } from '@mui/material';
import Fonts from '../styles/Fonts';
import LanguageSwitcher from './language-switcher';

const Footer = () => {

    const [subscribeEmail, setsubscribeEmail] = useState<string>('');
    const [subscribe, { isLoading: isSubscribeLoading }] = api.useSubscribeMutation();

    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [snackMsgStatus, setsnackMsgStatus] = useState<any>('' || 'warning'); // error | warning | info | success

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const subscribePost = async () => {
        if (emailRegex.test(subscribeEmail)) {
            try {
                await subscribe({
                    email: subscribeEmail
                });
                setsubscribeEmail('');
                setSnackMessage("იმეილი წარმატებით გაიგზავნა");
                setOpenSnack(true);
                setsnackMsgStatus('success');
            } catch (error) {
                setSnackMessage("გთხოვთ შეიყვანოთ სწორი მეილი");
                setOpenSnack(true);
                setsnackMsgStatus('error');
            }
        }
        else {
            setSnackMessage("გთხოვთ შეიყვანოთ სწორი მეილი");
            setOpenSnack(true);
            setsnackMsgStatus('error');
        }

    };

    return (
        <>
            <FooterWrapper className={styles.wrapper}>
                <FooterColumn className={styles.column}>
                    <FirstColumn>
                    <FooterMainIcon src={'/assets/mallmalle.png'} className={styles.logo} />
                    <LanguageSwitcherWrapper>
                                <LanguageSwitcherStyle languages={[ 'EN', 'GEO']} />
                    </LanguageSwitcherWrapper>
                    </FirstColumn>
                    <FooterIconText className={styles.motto}>ამერიკული პროდუქტის ხელმისაწვდომობა საქართველოში</FooterIconText>
                    <SocialIconsWrapper className={styles.socials}>
                        <a href='https://facebook.com' target={"_blank"}>
                            <FbIcon />
                        </a>
                        <a href='https://instagram.com' target={"_blank"}>
                            <InstIcon />
                        </a>
                        <a href='https://youtube.com' target={"_blank"}>
                            <YouTICon />
                        </a>
                        {/* <AiFillFacebook size={'2.4rem'} />
                    <AiFillInstagram size={'2.4rem'} />
                    <AiFillYoutube size={'2.4rem'} /> */}
                    </SocialIconsWrapper>
                </FooterColumn>
                <FooterColumn className={styles.column}>
                    <FooterListTitle className={styles.title}>პირობები</FooterListTitle>
                    {/* <FooterListItem className={styles.item} */}
                    <FooterListItem>
                        <FooterLink href="/mallmalle/terms-and-conditions">წესები და პირობები</FooterLink>
                    </FooterListItem>
                    <FooterListItem>
                        <FooterLink href="/mallmalle/faq">ხშირად დასმული კითხვები</FooterLink>
                    </FooterListItem>
                    <FooterListItem>
                        <FooterLink href="/mallmalle/return-policy">დაბრუნების და გაცვლის პოლიტიკა</FooterLink>
                    </FooterListItem>
                    <FooterListItem>
                        <FooterLink href="/mallmalle/privacy-policy">კონფიდენციალურობა</FooterLink>
                    </FooterListItem>
                    <FooterListItem>
                        <FooterLink href="/mallmalle/support">დახმარება</FooterLink>
                    </FooterListItem>
                </FooterColumn>

                <FooterColumn className={styles.column}>
                    <FooterListTitle className={styles.title}>ჩვენს შესახებ</FooterListTitle>
                    <FooterListItem>
                        <FooterLink href="/mallmalle/about-us">MallMalle-ს შესახებ</FooterLink>
                    </FooterListItem>
                    <FooterListItem>
                        <FooterLink href="/mallmalle/contact">კონტაქტი</FooterLink>
                    </FooterListItem>
                </FooterColumn>

                <FooterColumn className={classNames({ [styles.column]: true, [styles.lastColumn]: true })}>
                    <FooterListTitle className={styles.title}>სიახლეების გამოწერა</FooterListTitle>
                    <InputWrapper>
                        <IWBInput placeholder="ელ-ფოსტა" type='email' value={subscribeEmail} onChange={(e: any) => setsubscribeEmail(e.target.value)} />
                        <IWBButton lowercase onClick={subscribePost} >გამოწერა</IWBButton>
                    </InputWrapper>
                </FooterColumn>
            </FooterWrapper>
            <RightsReserved className={styles.rightsReserved}>
                <div className={styles.rightsReservedTitle}>ყველა უფლება დაცულია</div>
            </RightsReserved>
            <Snackbar
                open={openSnack}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                autoHideDuration={5000}
                onClose={() => setOpenSnack(false)}>
                <Alert severity={snackMsgStatus}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </>);
};





const SocialIconsWrapper = styled.div`
    ${Responsive.mobile} {
        gap: 1.2rem;
    }
`;
const FooterColumn = styled.div`
    margin: 0px 2px;
    ${Responsive.tabletMobile}{
                margin-bottom: 40px;
                    &:last-child {
                        margin-bottom: 0px;
                    }
            }
    &:nth-child(1) {
        /* background-color: aqua; */
        margin-left: 0px;
        min-width: 260px;
            ${Responsive.tablet} {
                min-width: 235px;
            }
            ${Responsive.laptop} {
                min-width: 480px;
            }
         
    }
    &:nth-child(2){
        /* background-color: yellow; */
        min-width: 275px;
            ${Responsive.laptop} {
                width: 270px;
            }
    }
    &:nth-child(3){
        /* background-color: brown; */
        min-width: 150px;
    }
    &:nth-child(4){
        /* background-color: #171163; */
        margin-right: 0px;
        ${Responsive.laptop} {
            width: 500px;
        }
    }
`;
const RightsReserved = styled.div`
    height: 77px;
    /* background-color: green; */
        div {
            font-size: 18px;
        }
`;
const FooterListTitle = styled.span`
    font-size: 14px;
    margin-bottom: 20px;
    user-select: none;
    font-family: ${Fonts.FiraGOSemiBold};
`;
const FooterListItem = styled.span`
  a {
    font-size: 15px;
    font-weight: 600;
    margin: 2px 0px;
    padding: 5px 0px;
    font-family: 'helvetica';
    cursor: pointer;
    display: block;
    color: #000;
    text-decoration: none;
        &:hover {
            opacity: 0.8;
        }
    ${Responsive.laptop} {
        font-size: 12px;
    }
  }
`;
const FooterLink = styled(Link)`
    font-size: 15px;
    font-family: ${Fonts.FiraGORegular};
    color: #000;
`;


const FbIcon = styled(FacebookIcon)`
    width: 24px;
    height: 27px;
    ${Responsive.laptop} {
        width: 18px;
        height: 18px;
    }
`;
const InstIcon = styled(InstagramIcon)`
    width: 25px;
    height: 27px;
    ${Responsive.laptop} {
        width: 18px;
        height: 18px;
        margin-left: -24px;
    }
`;
const YouTICon = styled(YoutubeIcon)`
    width: 32px;
    height: 27px;
    ${Responsive.laptop} {
        width: 22px;
        height: 18px;
        margin-left: -28px;
    }
`;
const FooterIconText = styled.div`
    font-size: 12px;
    margin-bottom: 25px;
    padding-right: 10px;
    font-family: ${Fonts.FiraGORegular};
    font-weight: 200;
`;
const FooterMainIcon = styled.img`
    height: 40px;
    margin-bottom: 20px;
    ${Responsive.laptop} {
        height: 30px;
    }
`;
const FooterWrapper = styled.div`
    /* background-color: red; */
    padding: 50px 90px;
    display: flex;
    align-items: flex-start;
    grid-gap: 0px;
    gap: 0px;
        ${Responsive.laptop} {
            margin-top: 70px;
        }
        ${Responsive.tablet} {
            padding: 40px 40px;
        }
        ${Responsive.tabletMobile}{
            padding: 40px 24px 90px 24px;
            flex-direction: column;
        }
`;
const InputWrapper = styled(IWBWrapper)`
    display: flex;
    align-items: center;
        input {
            height: 60px;
            border-top-left-radius: 14px;
            border-bottom-left-radius: 14px;
            font-size: 16px;
                ${Responsive.tablet} {
                    width: 150px;
                }
                ${Responsive.tabletMobile} {
                    width: unset;
                }
                ${Responsive.mobile}{
                    width: 178px;
                }
                ${Responsive.laptop}{
                    height: 20px;
                    width: 140px;
                    font-size: 12px;
                }
        }
        button {
            height: 60px;
            border-top-right-radius: 14px;
            border-bottom-right-radius: 14px;
            font-size: 18px;
            padding: 0px 18px;
                ${Responsive.tablet} {
                    font-size: 16px;
                    padding: 0px 14px;
                }
                ${Responsive.tablet} {
                    font-size: 18px;
                    padding: 0px 18px;
                }
                ${Responsive.laptop}{
                    width: 100px;
                    height: 45px;
                    font-size: 12px;
                }
        }
`;
const LanguageSwitcherWrapper = styled.div`
    display: none;
    ${Responsive.mobile}{
        display: block;
        width: 10px;
        margin-top: 5px;
        margin-left: 80px;
        z-index: 10;
    }
`;
const LanguageSwitcherStyle = styled(LanguageSwitcher)`
    z-index: 10;

    ${Responsive.laptop}{
        font-size: 12px;
    }
`;
const FirstColumn = styled.div`
        display: flex;
`;


export default Footer;
