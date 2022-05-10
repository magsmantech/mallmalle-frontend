import classNames from 'classnames';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import styled from 'styled-components';
import { IWBWrapper, IWBInput, IWBButton } from '../pages/auth';
import styles from '../styles/Footer.module.css';
import FacebookIcon from '../public/icons/react-icons/facebook';
import YoutubeIcon from '../public/icons/react-icons/youtube';
import InstagramIcon from '../public/icons/react-icons/instagram';
import Responsive from '../config/Responsive';


const Footer = () => {
    return (
        <>
            <FooterWrapper className={styles.wrapper}>
                <FooterColumn className={styles.column}>
                    <FooterMainIcon src={'/assets/mallmalle.png'} className={styles.logo} />
                    <FooterIconText className={styles.motto}>ამერიკული პროდუქტის ხელმისაწვდომობა საქართველოში</FooterIconText>
                    <SocialIconsWrapper className={styles.socials}>
                        <a href='https://facebook.com'>
                            <FbIcon />
                        </a>
                        <a href='https://instagram.com'>
                            <InstIcon />
                        </a>
                        <a href='https://youtube.com'>
                            <YouTICon />
                        </a>
                        {/* <AiFillFacebook size={'2.4rem'} />
                    <AiFillInstagram size={'2.4rem'} />
                    <AiFillYoutube size={'2.4rem'} /> */}
                    </SocialIconsWrapper>
                </FooterColumn>
                <FooterColumn className={styles.column}>
                    <FooterListTitle className={styles.title}>პირობები</FooterListTitle>
                    <FooterListItem className={styles.item}>წესები და პირობები</FooterListItem>
                    <FooterListItem className={styles.item}>ხშირად დასმული კითხვები</FooterListItem>
                    <FooterListItem className={styles.item}>დაბრუნების და გაცვლის პოლიტიკა</FooterListItem>
                    <FooterListItem className={styles.item}>კონფიდენციალურობა</FooterListItem>
                    <FooterListItem className={styles.item}>დახმარება</FooterListItem>
                </FooterColumn>

                <FooterColumn className={styles.column}>
                    <FooterListTitle className={styles.title}>ჩვენს შესახებ</FooterListTitle>
                    <FooterListItem className={styles.item}>MallMalle-ს შესახებ</FooterListItem>
                    <FooterListItem className={styles.item}>კონტაქტი</FooterListItem>
                </FooterColumn>

                <FooterColumn className={classNames({ [styles.column]: true, [styles.lastColumn]: true })}>
                    <FooterListTitle className={styles.title}>სიახლეების გამოწერა</FooterListTitle>
                    <InputWrapper>
                        <IWBInput placeholder="ელ-ფოსტა" />
                        <IWBButton lowercase>გამოწერა</IWBButton>
                    </InputWrapper>

                </FooterColumn>
            </FooterWrapper>
            <RightsReserved className={styles.rightsReserved}>
                <div className={styles.rightsReservedTitle}>ყველა უფლება დაცულია</div>
            </RightsReserved>
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
         
    }
    &:nth-child(2){
        /* background-color: yellow; */
        min-width: 275px;
            ${Responsive.tablet} {
                min-width: 230px;
            }
    }
    &:nth-child(3){
        /* background-color: brown; */
        min-width: 150px;
    }
    &:nth-child(4){
        /* background-color: #171163; */
        margin-right: 0px;
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
    font-size: 18px;
    margin-bottom: 20px;
    user-select: none;
`;
const FooterListItem = styled.span`
    font-size: 16px;
    margin: 2px 0px;
    padding: 5px 0px;
`;
const FbIcon = styled(FacebookIcon)`
    width: 24px;
    height: 27px;
`;
const InstIcon = styled(InstagramIcon)`
    width: 25px;
    height: 27px;
`;
const YouTICon = styled(YoutubeIcon)`
    width: 32px;
    height: 27px;
`;
const FooterIconText = styled.div`
    font-size: 18px;
    margin-bottom: 25px;
`;
const FooterMainIcon = styled.img`
    height: 42px;
    margin-bottom: 20px;
`;
const FooterWrapper = styled.div`
    /* background-color: red; */
    padding: 50px 100px;
    display: flex;
    align-items: flex-start;
    grid-gap: 0px;
    gap: 0px;
        ${Responsive.laptop} {
            padding: 40px 40px;
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
        }
`;


export default Footer;
