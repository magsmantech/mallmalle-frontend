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
  font-size: 1.8rem;
  font-family: "helvetica";
  padding: 2.5rem 0 3rem 0;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.4rem 1.4rem 0 0;
  font-weight: 700;

  max-width: 30.5rem;
  width: 100%;
`;

const AddressButton = styled(Button)`
  /* background-image: none; */
  height: 7.7rem;
  /* color: #22D5AE; */
  border: 0.2rem solid #22d5ae;
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
  padding-left: 6.4rem;
  font-family: fira-go;
  font-weight: 600;
  font-size: 1.8rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 6.4rem;
`;

const InputIconWrapper = styled.div`
  position: absolute;
  /* top: 2.0rem; */
  top: 50%;
  transform: translateY(-50%);
  left: 2.5rem;
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
      <div className={styles.personalInfoWrapper}>
        <div className={styles.gridItem}>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              {/* <FaUserAlt size={'3.6rem'} color={'#2EAAC1'} /> */}
              <ProfileIcon width={"3.6rem"} height={"4.5rem"} />
            </div>
            <div className={styles.headerText}>
              <div className={styles.name}>
                {userInfo.first_name} {userInfo.last_name}
              </div>
              <div className={styles.orderNo}>
                რეგისტრაციის დრო: {getYearFromDate(userInfo.created_at)} წელი
              </div>
            </div>
          </div>
          <div onClick={_logOut} className={styles.logout}>
            <IoLogOut size={"3.6rem"} />
            <span>გასვლა</span>
          </div>
        </div>
        <div
          className={styles.gridItem}
          style={{
            paddingLeft: "9.8rem",
            paddingRight: "9.8rem",
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
          <div
            className={styles.addressTitle}
            style={{ marginBottom: "2.6rem" }}
          >
            პირადი ინფორმაცია
          </div>
          <span className={styles.labels} style={{ marginBottom: "1.6rem" }}>
            ელ-ფოსტა
          </span>
          <InputWrapper style={{ marginBottom: "2.0rem" }}>
            <InputModified
              placeholder="ელ-ფოსტა"
              defaultValue={userInfo.email}
            />
            <InputIconWrapper>
              <EmailIcon width={"2.4rem"} />
            </InputIconWrapper>
          </InputWrapper>
          <span className={styles.labels} style={{ marginBottom: "1.6rem" }}>
            მობილური ტელეფონი
          </span>
          <InputWrapper style={{ marginBottom: "10.0rem" }}>
            <InputModified
              placeholder="(+955) 555 78 97 93"
              defaultValue={formatMobile(userInfo.mobile)}
            />
            <InputIconWrapper>
              <PhoneIcon width={"2.4rem"} />
            </InputIconWrapper>
            <InputIconWrapper style={{ left: "auto", right: "2.4rem" }}>
              <EditIcon width={"2.4rem"} />
            </InputIconWrapper>
          </InputWrapper>

          <span
            className={styles.addressTitle}
            style={{ marginBottom: "2.6rem" }}
          >
            პაროლის შეცვლა
          </span>
          <InputWrapper style={{ marginBottom: "1.6rem" }}>
            <InputModified placeholder="ძველი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon width={"2.4rem"} />
            </InputIconWrapper>
          </InputWrapper>
          <InputWrapper style={{ marginBottom: "1.6rem" }}>
            <InputModified placeholder="ახალი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon width={"2.4rem"} />
            </InputIconWrapper>
          </InputWrapper>
          <InputWrapper style={{ marginBottom: "1.6rem" }}>
            <InputModified placeholder="გაიმეორე ახალი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon width={"2.4rem"} />
            </InputIconWrapper>
          </InputWrapper>

          <Button>შეცვლა</Button>
        </div>
        <div className={styles.gridItem} style={{ paddingLeft: "9.8rem" }}>
          <div className={styles.addressTitle}>მისამართი:</div>
          <div className={styles.addressItem}>
            <EditIcon
              width={"2.4rem"}
              style={{ position: "absolute", right: 0, top: 0 }}
            />
            {/* <div> */}
            <IoLocationSharp size={"3.2rem"} color={"var(--text-color)"} />
            {/* </div> */}
            <div className={styles.addressItemText}>
              <div className={styles.city}>Tbilisi</div>
              <div className={styles.address}>
                მუხიანი, ალეკო გობრონიძის #11 / ბინა 177
              </div>
              <div className={styles.zip}>ZIP კოდი: 01103</div>
            </div>
          </div>
          <AddressButton style={{ marginTop: "4.8rem" }}>
            მისამართის დამატება
          </AddressButton>
        </div>
      </div>
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
      <SectionTitle style={{ marginBottom: "1.7rem", fontSize: "4.4rem" }}>
        {sectionTitles[tabIndex]}
      </SectionTitle>
      <Breadcrumbs style={{ marginBottom: "3.2rem", opacity: 0.8 }}>
        მთავარი / ჩემი პროფილი{tabIndicators[tabIndex]}
      </Breadcrumbs>
      {loadPage ? (
        <div className={styles.tabsWrapper}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
            style={{ width: "100%" }}
          >
            <TabList className={styles.tabList}>
              {tabTitles.map((item, i) => (
                <Tab key={i}>
                  <TabItem selected={tabIndex === i}>{item}</TabItem>
                </Tab>
              ))}
            </TabList>
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
