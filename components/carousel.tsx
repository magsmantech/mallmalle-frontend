import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../styles/Carousel.module.css';
import styled from 'styled-components';
import Clock from './clock';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Button from './styled/button';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Responsive from '../config/Responsive';
import Fonts from '../styles/Fonts';
import api, { uploadUrl } from '../features/api';
import { useState } from 'react';
import router from 'next/router';


type Props = {
  images: string[],
}

type BackgroundProps = {
  backgroundImage: string,
};


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

  const { data: DashboardData, isLoading: isDashboardDataLoading, refetch: refetchDashboardData } = api.useGetDashboardDataQuery(undefined);

  const allDiscounts = DashboardData?.data.discounts;
  const dateNow = new Date();
  const activeSliders = allDiscounts?.filter(o => o.on_slider == 1 && !(o.expire_date < dateNow));
  return (
    <div style={{ overflow: 'hidden' }}>
      <SwiperWrapper
        // {...params}
        className={styles.slider}
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 6000 }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        {activeSliders?.length ?
        (
        <>
        {activeSliders?.map((o,index) =>
        <SwiperSlide className={styles.slide} key={index}>
            <Background className="background" backgroundImage={uploadUrl(o.background_image)}>
              <SlideText >
                <SliderTitle>ფასდაკლება.</SliderTitle>
                <Clock itemDate={o.expire_date} />

              </SlideText>
            </Background>
          </SwiperSlide>
        )}
        </>)
        : 
          <SwiperSlide className={styles.slide}
          // onClick={() => {router.push(`/discounts/`);}}
                >
            <Background className="background" backgroundImage={images[0]}>
              <SlideText >
                {/* <SliderTitle>ფასდაკლებები</SliderTitle> */}
              </SlideText>
            </Background>
          </SwiperSlide>}

        <SwiperLeftBtn className='swiper-button-prev'><HiOutlineChevronLeft size={'22px'} /></SwiperLeftBtn>
        <SwiperRightBtn className='swiper-button-next'><HiOutlineChevronRight size={'22px'} /></SwiperRightBtn>
      </SwiperWrapper>
    </div>
  );
};

const SliderTitle = styled.span`
  padding-left: 15%;
  font-size: 39px;
  text-transform: uppercase;
  font-feature-settings: '"case" on';
  font-weight: 600;
  user-select: none;
  font-family: ${Fonts.FiraGOSemiBold};
    ${Responsive.tabletMobile}{
      padding-left: 0px;
      font-size: 23px;
    }
    ${Responsive.laptop}{
      font-size: 29px;
      letter-spacing: 1px;
    }
`;
const SwiperLeftBtn = styled.div`
  top: calc(100% - 230px);
  left: 34px;
  height: 56px!important;
  width: 56px!important;
  background-color: white;
  border: 6px solid #EDEDED;
  color: var(--text-color)!important;
  border-radius: 50%;
    ${Responsive.tabletMobile} {
      top: calc(100% - 190px);
      left: 5px;
    }
    ${Responsive.laptop} {
      height: 40px!important;
      width: 40px!important;
      margin-top: 60px;
      margin-left: -8px;
    }
`;
const SwiperRightBtn = styled.div`
  top: calc(100% - 230px);
  right: 34px;
  height: 56px!important;
  width: 56px!important;
  background-color: white;
  border: 6px solid #EDEDED;
  color: var(--text-color)!important;
  border-radius: 50%;
    ${Responsive.tabletMobile} {
      top: calc(100% - 190px);
      right: 5px;
    }
    ${Responsive.laptop} {
      height: 40px!important;
      width: 40px!important;
      margin-top: 60px;
      margin-left: 8px;
    }
`;
const SwiperWrapper = styled(Swiper)`
  height: 425px;
  margin-bottom: 90px;
    .swiper-pagination-horizontal {
      bottom: -50px !important;
    }
    ${Responsive.tabletMobile} {
        height: 370px;
        margin-bottom: 44px;
        .swiper-pagination-horizontal {
            bottom: 0px !important;
            display: none !important;
        }
    }
    ${Responsive.laptop} {
      margin-top: 60px;
      margin-bottom: 60px;
      height: 240px;
      .swiper-pagination-horizontal {
        bottom: -30px !important;
      }
    }
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-position: center;
  background-image: url(${(props: BackgroundProps) => props.backgroundImage});
  background-size: cover;
  background-position: center bottom;
  border-radius: 28px;
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${Responsive.laptop} {
    margin-top: -55px;
    height: 340px;
  }
  ${Responsive.desktop} {
    height: 90%;
  }
`;

const SlideText = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
    ${Responsive.tabletMobile} {
      align-items: center;
    }
`;


export default Carousel;