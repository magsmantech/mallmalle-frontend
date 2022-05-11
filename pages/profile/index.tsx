import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoLocationSharp, IoLogOut } from "react-icons/io5";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";
import Favorites from "../../components/favorites";
import MyPayments from "../../components/myPayments";
import OrdersList from "../../components/OrdersList";
import { Breadcrumbs } from "../../components/styled/breadcrumbs";
import Button from "../../components/styled/button";
import styles from "../../styles/Profile.module.css";
import { Input } from "../auth";
import { SectionTitle } from "../cart";

import PhoneIcon from "../../public/icons/react-icons/phone";
import EmailIcon from "../../public/icons/react-icons/email";
import UnlockIcon from "../../public/icons/react-icons/unlock";
import ProfileIcon from "../../public/icons/react-icons/profile";
import EditIcon from "../../public/icons/react-icons/edit";
import { relative } from "path/posix";
import { useDispatch } from "react-redux";
import { removeAccessToken, getUserData } from "../../services/auth-services";

type TabItemProps = {
  selected?: boolean;
};

const TabItem = styled.div`
  color: ${({ selected }: TabItemProps) =>
    !selected ? "var(--text-color)" : "#FFFFFF"};
  background-image: ${({ selected }: TabItemProps) =>
    selected ? `var(--header-gradient)` : "none"};
  font-size: 18px;
  font-family: "helvetica";
  padding: 30px 100px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.4rem 1.4rem 0 0;
  font-weight: 700;
  text-align: center;
  width: 100%;
`;

const AddressButton = styled(Button)`
  /* background-image: none; */
  height: 77px;
  /* color: #22D5AE; */
  border: 0.2rem solid #22d5ae;
  margin-top: 55px;
  background: -webkit-linear-gradient(to right, #22d2af 0%, #3885d1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &:hover {
    /* background-color: #22D5AE; */
    -webkit-background-clip: border-box;
    -webkit-text-fill-color: white;
    border: none;
    /* color: white; */
    background-image: var(--header-gradient);
  }
`;

const InputModified = styled(Input)`
  padding-left: 64px;
  font-family: fira-go;
  font-weight: 600;
  font-size: 18px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 25px;
`;

const InputIconWrapper = styled.div`
  position: absolute;
  /* top: 2.0rem; */
  top: 51%;
  transform: translateY(-50%);
  left: 23px;
    svg {
      width: 20px;
    }
`;
const TabItemList = styled(TabList)`
  /* background-color: red; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const PersonalInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* margin-top: 65px; */
`;
const GridItem = styled.div`
  padding: 65px 70px 0px 70px;
    &:first-child {
      padding-left: 0px;
    }
    &:last-child {
      padding-right: 0px;
    }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 115px;
  width: 115px;
  border-radius: 12px;
  background-image: linear-gradient(15deg, rgba(34, 210, 175, 0.14) 0%, rgba(56, 133, 209, 0.14) 100%);
  margin-right: 20px;
`;
const ProfileIconStyle = styled(ProfileIcon)`
  width: 35px;
`;
const UserName = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
  margin-top: 8px;
`;
const OrderNo = styled.div`
  font-size: 18px;
`;
const HeaderStyle = styled.div`
  margin-bottom: 40px;
`;
const LogOutStyle = styled.div`
    svg {
      font-size: 44px;
    }
    span {
      font-size: 20px;
      margin-top: -1px;
    }
`;
const AddressTitle = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`;
const ChangePassTitle = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
  margin-top: 100px;
`;
const LabelText = styled.span`
  font-size: 18px;
  margin-bottom: 16px;
`;
const AddressItem = styled.div`
`;
const LocationIconStyle = styled(IoLocationSharp)`
  font-size: 22px;
  margin-right: 10px;
  /* margin-top: 4px; */
`;
const CityStyle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;
const AddressStyle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;
const ZipCodeStyle = styled.div`
  font-size: 20px;
`;
const EditIconStyle = styled(EditIcon)`
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 0;
`;





type ProfileTabProps = {
  userInfo: any;
};

const PersonalInfo = ({ userInfo }: ProfileTabProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const _logOut = () => {
    removeAccessToken(dispatch);
    router.push("/");
  };

  const getYearFromDate = (dateString: string): string | number => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.getFullYear();
  };

  const formatMobile = (mobile: string): string => {
    return mobile.slice(4);
  };

  return (
    <>
      <PersonalInfoWrapper className={styles.personalInfoWrapper}>
        <GridItem className={styles.gridItem}>
          <HeaderStyle className={styles.header}>
            <IconWrapper className={styles.iconWrapper}>
              {/* <FaUserAlt size={'3.6rem'} color={'#2EAAC1'} /> */}
              <ProfileIconStyle />
            </IconWrapper>
            <div className={styles.headerText}>
              <UserName className={styles.name}>
                {userInfo.first_name} {userInfo.last_name}
              </UserName>
              <OrderNo className={styles.orderNo}>
                რეგისტრაციის დრო: {getYearFromDate(userInfo.created_at)} წელი
              </OrderNo>
            </div>
          </HeaderStyle>
          <LogOutStyle onClick={_logOut} className={styles.logout}>
            <IoLogOut />
            <span>გასვლა</span>
          </LogOutStyle>
        </GridItem>
        <GridItem
          className={styles.gridItem}
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "42.0rem",
              borderLeft: ".1rem solid rgba(34, 34, 34, .2)",
              borderRight: ".1rem solid rgba(34, 34, 34, .2)",
            }}
          ></div>
          <AddressTitle
            className={styles.addressTitle}
            
          >
            პირადი ინფორმაცია
          </AddressTitle>
          <LabelText className={styles.labels} style={{ marginBottom: "1.6rem" }}>
            ელ-ფოსტა
          </LabelText>
          <InputWrapper >
            <InputModified
              placeholder="ელ-ფოსტა"
              defaultValue={userInfo.email}
            />
            <InputIconWrapper>
              <EmailIcon  />
            </InputIconWrapper>
          </InputWrapper>
          <LabelText className={styles.labels} style={{ marginBottom: "1.6rem" }}>
            მობილური ტელეფონი
          </LabelText>
          <InputWrapper>
            <InputModified
              placeholder="(+955) 555 78 97 93"
              defaultValue={formatMobile(userInfo.mobile)}
            />
            <InputIconWrapper>
              <PhoneIcon  />
            </InputIconWrapper>
            <InputIconWrapper style={{ left: "auto", right: "2.4rem" }}>
              <EditIcon />
            </InputIconWrapper>
          </InputWrapper>

          <ChangePassTitle
            className={styles.addressTitle}
           
          >
            პაროლის შეცვლა
          </ChangePassTitle>
          <InputWrapper >
            <InputModified placeholder="ძველი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon  />
            </InputIconWrapper>
          </InputWrapper>
          <InputWrapper>
            <InputModified placeholder="ახალი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon  />
            </InputIconWrapper>
          </InputWrapper>
          <InputWrapper>
            <InputModified placeholder="გაიმეორე ახალი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon  />
            </InputIconWrapper>
          </InputWrapper>

          <Button>შეცვლა</Button>
        </GridItem>
        <GridItem className={styles.gridItem}>
          <AddressTitle className={styles.addressTitle}>მისამართი:</AddressTitle>
          <AddressItem className={styles.addressItem}>
            <EditIconStyle
              
            />
            {/* <div> */}
            <LocationIconStyle color={"var(--text-color)"} />
            {/* </div> */}
            <div className={styles.addressItemText}>
              <CityStyle className={styles.city}>Tbilisi</CityStyle>
              <AddressStyle className={styles.address}>
                მუხიანი, ალეკო გობრონიძის #11 / ბინა 177
              </AddressStyle>
              <ZipCodeStyle className={styles.zip}>ZIP კოდი: 01103</ZipCodeStyle>
            </div>
          </AddressItem>
          <AddressButton>
            მისამართის დამატება
          </AddressButton>
        </GridItem>
      </PersonalInfoWrapper>
    </>
  );
};

const Profile: NextPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loadPage, setLoadPage] = useState(false);

  const [userInfo, setUserInfo] = useState<any>({});

  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    if (router?.query?.tab === "bookmark") {
      setTabIndex(2);
      // console.log(router);
    }
    if (router?.query?.tab === "orders-history") {
      setTabIndex(1);
    }
  }, [router.query.tab]);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("access_token");
    if (loggedIn) {
      getUserData()
        .then((res) => {
          if (!res.data || !res.data.profile) {
            removeAccessToken(dispatch);
            router.push("/auth");
            return;
          }
          console.log(res.data.profile);
          const { data } = res;
          setUserInfo(data?.profile?.user);
          setLoadPage(true);
        })
        .catch((err) => console.log(err));
    } else {
      router.push("/auth");
    }
  }, []);

  const tabTitles = ["პროფილი", "ყიდვის ისტორია", "რჩეულები", "ჩემი ბარათები"];

  const tabIndicators = ["", " / ყიდვის ისტორია", " / ფავორიტები", ""];

  const sectionTitles = [
    "პროფილი",
    "ყიდვის ისტორია",
    "ფავორიტები",
    "ჩემი ბარათები",
  ];

  return (
    <>
      <SectionTitle>
        {sectionTitles[tabIndex]}
      </SectionTitle>
      <Breadcrumbs>
        მთავარი / ჩემი პროფილი{tabIndicators[tabIndex]}
      </Breadcrumbs>
      {loadPage ? (
        <div className={styles.tabsWrapper}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
            style={{ width: "100%" }}
          >
            <TabItemList className={styles.tabList}>
              {tabTitles.map((item, i) => (
                <Tab key={i}>
                  <TabItem selected={tabIndex === i}>{item}</TabItem>
                </Tab>
              ))}
            </TabItemList>
            <div className={styles.divider}></div>

            <div className={styles.tabPanels}>
              <TabPanel className={styles.tabPanel}>
                <PersonalInfo userInfo={userInfo}></PersonalInfo>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <OrdersList></OrdersList>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <Favorites></Favorites>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <MyPayments />
              </TabPanel>
            </div>
          </Tabs>
        </div>
      ) : (
        <h1 style={{ margin: "2rem 0 50rem 0" }}>Loading...</h1>
      )}
    </>
  );
};

export default Profile;
