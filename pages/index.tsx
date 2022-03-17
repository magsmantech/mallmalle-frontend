import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Carousel from '../components/carousel';
import SaleItem from '../components/saleItem';
import Item from '../components/item';
import ArrowTop from '../public/icons/react-icons/arrow-top';

const Home: NextPage = () => {

  const _scrollToTop= () =>{
    window.scrollTo(0, 0);
  }

  const images = [
    '/assets/cover.png',
    '/assets/cover.png',
    '/assets/cover.png',
    '/assets/cover.png',
  ];

  return (
    <>
      <Carousel images={images}/>
      <div className={styles.container}>
        <SaleItem imageUrl={'/assets/122.png'} style={{gridArea: 'a'}}  big/>
        <SaleItem imageUrl={'/assets/3.png'} style={{gridArea: 'b'}} />
        <SaleItem imageUrl={'/assets/31.png'} style={{gridArea: 'c'}} />
        <SaleItem imageUrl={'/assets/311.png'} style={{gridArea: 'd'}} />
        <SaleItem imageUrl={'/assets/photo-1.jpg'} style={{gridArea: 'e'}} />
      </div>
      <div className={styles.dividerWrapper}>
        <div className={styles.divider}></div>
        <img className={styles.dividerImage} src={'/assets/mallmalle.png'}/>
      </div>

      <h3 className={styles.sectionTitle}>შემოთავაზება</h3>
      <div className={styles.itemsContainer}>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/5.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
      </div>

      <div className={styles.middleContainer}>
        <SaleItem big imageUrl={'/assets/122.png'} gradient/>
        <SaleItem big imageUrl={'/assets/122.png'} gradient/>
      </div>

      
      <h3 className={styles.sectionTitle}>ახალი დამატებული</h3>
      <div className={styles.itemsContainer} style={{marginBottom: '17.5rem'}}>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/231.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/4.png'}></Item>
        <Item name="საზაფხულო ფეხსაცმელი" price="85,99" oldPrice='120,00' currency='gel' imageUrl={'/assets/photo-1.jpg'}></Item>
      </div>

      <div className={styles.scrollToTopButton} onClick={_scrollToTop}>
        <ArrowTop className={styles.scrollButtonIcon}/>
      </div>

    </>
  )
}

export default Home
