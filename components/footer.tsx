import classNames from 'classnames';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube } from 'react-icons/ai';
import styled from 'styled-components';
import { IWBWrapper, IWBInput, IWBButton } from '../pages/auth';
import styles from '../styles/Footer.module.css';
import FacebookIcon from '../public/icons/react-icons/facebook';
import YoutubeIcon from '../public/icons/react-icons/youtube';
import InstagramIcon from '../public/icons/react-icons/instagram';


const Footer = () => {
    return (
        <>
            <FooterWrapper className={styles.wrapper}>
                <div className={styles.column}>
                    <img src={'/assets/mallmalle.png'} className={styles.logo} />
                    <div className={styles.motto}>ამერიკული პროდუქტის ხელმისაწვდომობა საქართველოში</div>
                    <div className={styles.socials}>
                        <a href='https://facebook.com'>
                            <FacebookIcon width={'2.4rem'} height={'2.4rem'} />
                        </a>
                        <a href='https://instagram.com'>
                            <InstagramIcon width={'2.4rem'} height={'2.4rem'} />
                        </a>
                        <a href='https://youtube.com'>
                            <YoutubeIcon width={'3.4rem'} height={'2.4rem'} />
                        </a>
                        {/* <AiFillFacebook size={'2.4rem'} />
                    <AiFillInstagram size={'2.4rem'} />
                    <AiFillYoutube size={'2.4rem'} /> */}
                    </div>
                </div>
                <div className={styles.column}>
                    <span className={styles.title}>პირობები</span>
                    <span className={styles.item}>წესები და პირობები</span>
                    <span className={styles.item}>ხშირად დასმული კითხვები</span>
                    <span className={styles.item}>დაბრუნების და გაცვლის პოლიტიკა</span>
                    <span className={styles.item}>კონფიდენციალურობა</span>
                    <span className={styles.item}>დახმარება</span>
                </div>

                <div className={styles.column}>
                    <span className={styles.title}>ჩვენს შესახებ</span>
                    <span className={styles.item}>MallMalle-ს შესახებ</span>
                    <span className={styles.item}>კონტაქტი</span>
                </div>

                <div className={classNames({ [styles.column]: true, [styles.lastColumn]: true })}>
                    <span className={styles.title}>სიახლეების გამოწერა</span>
                    <InputWrapper>
                        <IWBInput placeholder="ელ-ფოსტა" />
                        <IWBButton lowercase>გამოწერა</IWBButton>
                    </InputWrapper>

                </div>
            </FooterWrapper>
            <div className={styles.rightsReserved}>
                <div className={styles.rightsReservedTitle}>ყველა უფლება დაცულია</div>
            </div>
        </>);
};



const FooterWrapper = styled.div`
    /* background-color: red; */
    padding: 50px 120px;
`;
const InputWrapper = styled(IWBWrapper)`
    /* grid-template-columns: 2fr 1fr; */
`;


export default Footer;
