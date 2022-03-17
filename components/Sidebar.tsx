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
import ShoeIcon  from '../public/icons/react-icons/sidebar-icons/shoe';
import WatchIcon from '../public/icons/react-icons/sidebar-icons/watch';
import ToyIcon from '../public/icons/react-icons/sidebar-icons/toy';



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



const PromoItem = ({imageUrl= '/assets/testt.png'}: PromoItemProps) => {
    return(<>
        <div className={styles.promoItemBackground} style={{backgroundImage: `url(${imageUrl})`}}>
            <div className={styles.promoItemText}>
                <div className={styles.promoItemTextSale}>ფასდაკლება</div>
                <div className={styles.promoItemTextTime}>03:12:34 საათი</div>
            </div>
            <div className={styles.promoItemOverlay}></div>
        </div>
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


    const tree = [
        {
            title: 'ქალი',
            color: styles.itemIconWoman,
            icon: <><WomanIcon className={styles.itemIconWoman}/></>,
            subItems: [
                {
                    title: 'ტანსაცმელი',
                    icon: <><ShirtIcon className={styles.itemIconClothes}/></>,
                    color: styles.itemIconClothes,
                    subItems: [
                        {
                            title: 'პერანგი'
                        },
                        {
                            title: 'მაისური'
                        },
                        {
                            title: 'კაბა'
                        },
                        {
                            title: 'შარვალი'
                        },
                        {
                            title: 'პიჯაკი'
                        },
                        {
                            title: 'ქვედაბოლო'
                        },
                        {
                            title: 'ქურთუკი'
                        },
                    ],
                },
                {
                    title: 'ფეხსაცმელი',
                    icon: <><ShoeIcon className={styles.itemIconShoes}/></>,
                    color: styles.itemIconShoes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'დაბალძირიანი'
                        },
                        {
                            title: 'ქუსლიანი'
                        },
                    ],
                },
                {
                    title: 'აქსესუარები',
                    icon: <><WatchIcon className={styles.itemIconAccessories}/></>,
                    color: styles.itemIconAccessories,
                },
            ],
        },
        {
            title: 'კაცი',
            icon: <><ManIcon className={styles.itemIconMan}/></>,
            color: styles.itemIconMan,
            subItems: [
                {
                    title: 'ტანსაცმელი',
                    icon: <><ShirtIcon className={styles.itemIconClothes}/></>,
                    color: styles.itemIconClothes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'შარვალი'
                        },
                        {
                            title: 'პიჯაკი'
                        },
                    ],

                },
                {
                    title: 'ფეხსაცმელი',
                    icon: <><ShoeIcon className={styles.itemIconShoes}/></>,
                    color: styles.itemIconShoes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'დაბალძირიანი'
                        },
                        {
                            title: 'ქუსლიანი'
                        },
                    ],
                },
                {
                    title: 'აქსესუარები',
                    icon: <><WatchIcon className={styles.itemIconAccessories}/></>,
                    color: styles.itemIconAccessories,
                },
            ],
        },
        {
            title: 'ბავშვი',
            icon: <><ChildIcon className={styles.itemIconChild}/></>,
            color: styles.itemIconChild,
            subItems: [
                {
                    title: 'ტანსაცმელი',
                    icon: <><ShirtIcon className={styles.itemIconClothes}/></>,
                    color: styles.itemIconClothes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'შარვალი'
                        },
                        {
                            title: 'პიჯაკი'
                        },
                    ],
                },
                {
                    title: 'ფეხსაცმელი',
                    icon: <><ShoeIcon className={styles.itemIconShoes}/></>,
                    color: styles.itemIconShoes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'დაბალძირიანი'
                        },
                        {
                            title: 'ქუსლიანი'
                        },
                    ],
                },
                {
                    title: 'აქსესუარები',
                    icon: <><WatchIcon className={styles.itemIconAccessories}/></>,
                    color: styles.itemIconAccessories,
                },
                {
                    title: 'სათამაშოები',
                    icon: <><ToyIcon className={styles.itemIconToys}/></>,
                    color: styles.itemIconToys,
                },
            ],
        },
        {
            title: 'სხვადასხვა',
            icon: <><MessageIcon className={styles.itemIconOther}/></>,
            color: styles.itemIconOther,
            subItems: [
                {
                    title: 'ტანსაცმელი',
                    icon: <><ShirtIcon className={styles.itemIconClothes}/></>,
                    color: styles.itemIconClothes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'შარვალი'
                        },
                        {
                            title: 'პიჯაკი'
                        },
                    ],
                },
                {
                    title: 'ფეხსაცმელი',
                    icon: <><ShoeIcon className={styles.itemIconShoes}/></>,
                    color: styles.itemIconShoes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'დაბალძირიანი'
                        },
                        {
                            title: 'ქუსლიანი'
                        },
                    ],
                },
                {
                    title: 'აქსესუარები',
                    icon: <><WatchIcon className={styles.itemIconAccessories}/></>,
                    color: styles.itemIconAccessories,
                },
                {
                    title: 'სათამაშოები',
                    icon: <><ToyIcon className={styles.itemIconToys}/></>,
                    color: styles.itemIconToys,
                },
            ],
        },
        {
            title: 'ბოქსები',
            icon: <><BoxesIcon className={styles.itemIconBoxes}/></>,

            color: styles.itemIconBoxes,
            subItems: [
                {
                    title: 'ტანსაცმელი',
                    icon: <><ShirtIcon className={styles.itemIconClothes}/></>,
                    color: styles.itemIconClothes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'შარვალი'
                        },
                        {
                            title: 'პიჯაკი'
                        },
                    ],
                },
                {
                    title: 'ფეხსაცმელი',
                    icon: <><ShoeIcon className={styles.itemIconShoes}/></>,
                    color: styles.itemIconShoes,
                    subItems: [
                        {
                            title: 'სპორტული'
                        },
                        {
                            title: 'კლასიკური'
                        },
                        {
                            title: 'ყოვედღიური'
                        },
                        {
                            title: 'დაბალძირიანი'
                        },
                        {
                            title: 'ქუსლიანი'
                        },
                    ],
                },
                {
                    title: 'აქსესუარები',
                    icon: <><WatchIcon className={styles.itemIconAccessories}/></>,
                    color: styles.itemIconAccessories,
                },
                {
                    title: 'სათამაშოები',
                    icon: <><ToyIcon className={styles.itemIconToys}/></>,
                    color: styles.itemIconToys,
                },
            ],
        },
    ]

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
            return;
        }
        setShowSubMenu(false);
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
            <div className={styles.itemsContainer}>
                {categories.map((item:any , index: number) => <Link href={'/catalog/' + item.id} key={index}>
                    <div className={styles.item}
                        onClick={() => onSidebarClose()}
                        onMouseEnter={()=> mouseEnterItem(index)}
                        onMouseLeave={mouseLeaveItem}>
                        <div className={styles.iconWrapper}>
                            {/* <IoWoman size={'2.5rem'} className={item.color} /> */}
                            {item.icon || tree[index].icon}
                        </div>
                        <div className={styles.itemTitle}>{item.category_name}</div>
                    </div>
                </Link>
                )}
            </div>
        );
    };


    const SubmenuItems = () => {
        return (
            <div className={styles.itemsContainer}>
                {subMenuItems.map((item: any, index: number) => 
                    <Link href={'/catalog/' + item.id} key={index}>
                    <div className={styles.item} onClick={() => onSidebarClose()}
                        onMouseLeave={() => setShowDetailMenu(false)}
                        onMouseEnter={() => mouseEnterSubItem(index)}>
                        <div className={styles.iconWrapper}>
                            {/* <FaTshirt size={'2.5rem'} className={item.color} /> */}
                            {item.icon}
                        </div>

                        <div className={styles.itemTitle}>{item.category_name}</div>
                    </div>
                </Link>
                
                )}
            </div>
        );
    };


    const DetailMenu = () => {
        return (<>
            <div className={styles.detailMenuTitle}>
                შემოთავაზებული კატეგორიები
            </div>
            <Divider></Divider>
            <div >
                {detailMenuItems.map((item: any, index: number)=>                 
                    <Link href={'/catalog/' + item.id} key={index}>
                        <div 
                            onClick={() => onSidebarClose()}
                            className={styles.detailMenuitem}>
                            {item.category_name}
                        </div>
                    </Link>
                )}
            </div>
            <Button>ყველა კატეგორია</Button>
            <div className={styles.promoItemsWrapper}>
                <PromoItem></PromoItem>
                <PromoItem></PromoItem>
            </div>
        </>)
    };


    return (<>
        <div className={styles.wrapper} onClick={(e) => console.log(e)}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={'/assets/mallmalle.png'} style={{width:'20.0rem', height: '3.65rem'}} />
                    <a className={styles.iconWrapper} onClick={() => onSidebarClose()}>
                        <CloseIcon color='#424F60' />
                    </a>
                </div>
                <div className={styles.content}>
                    <span className={styles['content-title']}>კატეგორიები</span>
                    <SidebarItems />
                </div>
            </div>

            {showSubMenu && !!subMenuItems.length && <div className={styles.container}
                onMouseLeave={() => setInSubMenu(false)}
                onMouseEnter={() => setInSubMenu(true)}>
                {/* <div className={styles.header}>
                    <a className={styles.iconWrapper}>
                        <HiArrowLeft size={'2.0rem'} color='#424F60'/>
                    </div>

                    <a className={styles.iconWrapper}>
                        <CgClose size={'2.0rem'} color='#424F60'/>
                    </div>
                </div> */}

                <div className={styles.content}>
                    <div className={styles.submenuTitle}>{selectedItemTitle}</div>
                    <div className={styles.submenuSubtitle}>აირჩიე კატეგორია</div>
                    <SubmenuItems />
                </div>
            </div>}

            {showDetailMenu && !!detailMenuItems.length&& <div className={styles.container}
                onMouseLeave={() => setShowDetailMenu(false)}
                onMouseEnter={() => setShowDetailMenu(true)}>
                <DetailMenu />
            </div>}

        </div>
    </>);
};

export default Sidebar;
