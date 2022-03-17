import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../styles/Carousel.module.css';
import styled from 'styled-components';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from './styled/button';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';


type Props = {
  images: string[],
}

type BackgroundProps = {
  backgroundImage: string,
};

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: center;
  background-image: url(${(props: BackgroundProps) => props.backgroundImage});
  background-size: cover;
  background-position: center bottom;
  border-radius: 2.8rem;
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SlideText = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;

const Carousel = ({ images = [] }: Props) => {
  const params = {
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    //   renderBullet: (index: number, className: string) => {
    //     return `<span class="${className}"></span>`;
    //   }
    // }
    navigation: {
    },
    // renderPrevButton: () => <Button className="swiper-button-prev">Prev</Button>,
    // renderNextButton: () => <Button className="swiper-button-next">Next</Button>,
  }


  return (
    <div style={{overflow: 'hidden'}}>

      <Swiper
        // {...params}
        className={styles.slider}
        // install Swiper modules
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {images.map((image, index) =>
          <SwiperSlide className={styles.slide} key={index}>
            <Background backgroundImage={image}>
              <SlideText  style={{marginLeft: '28.6rem'}}>
                <span style={{fontSize: '4.0rem', textTransform: 'uppercase', fontFeatureSettings: '"case" on', fontWeight: 600}}>ფასდაკლება</span>
                <div>
                  <span style={{fontSize: '5.0rem', fontFamily: 'fira-go', textTransform: 'uppercase', fontFeatureSettings: '"case" on', fontWeight: 600}}>03 : 12 : 54 </span>
                  <span style={{fontSize: '2.0rem'}}>საათი</span>
                </div>

              </SlideText>
            </Background>
          </SwiperSlide>
        )}
      <div className='swiper-button-prev'><HiOutlineChevronLeft size={'2.4rem'}/></div>
      <div className='swiper-button-next'><HiOutlineChevronRight size={'2.4rem'}/></div>
      </Swiper>
    </div>
  );
};

export default Carousel;