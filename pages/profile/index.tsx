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
import { removeAccessToken, getUserData, addAddress } from '../../services/auth-services';
import Responsive from "../../config/Responsive";
import Loader from "../../components/Loader";
import api from "../../features/api";
import { profile } from "console";
import { Modal } from "react-bootstrap";

import { Address } from '../../domain/shop';
import { Alert, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { WindowSharp } from "@mui/icons-material";
require('dayjs/locale/ka');


type TabItemProps = {
  selected?: boolean;
};


const TabStyle = styled(Tab)`
  height: 100%;
    ${Responsive.tablet}{
      width: 100%;
    }
    ${Responsive.tabletMobile}{
      width: 100%;
    }
    ${Responsive.laptop}{
      width: 180px;
    }
`;
const TabItem = styled.div`
  color: ${({ selected }: TabItemProps) =>
    !selected ? "var(--text-color)" : "#FFFFFF"};
  background-image: ${({ selected }: TabItemProps) =>
    selected ? `var(--header-gradient)` : "none"};
  font-size: 18px;
  font-family: "helvetica";
  padding: 30px 95px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.4rem 1.4rem 0 0;
  font-weight: 700;
  text-align: center;
  width: 100%;
  height: 100%;
  height: 102px;
    ${Responsive.tablet} {
      /* background-color: green; */
      font-size: 16px;
      padding: 25px 30px;
      height: fit-content;
    }
    ${Responsive.tabletMobile}{
      border-radius: 0px;
      height: 75px;
      font-size: 14px;
      border-bottom: 1px solid rgba(34, 34, 34, 0.2);
    }
    ${Responsive.laptop} {
      height: 70px;
      border-radius: 1.1rem 1.1rem 0 0;
      font-size: 12px;
    }
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
  ${Responsive.laptop} {
    height: 60px;
    width: 100%;
  }
`;

const InputModified = styled(Input)`
  padding-left: 64px;
  font-family: fira-go;
  font-weight: 600;
  font-size: 18px;
    ${Responsive.tabletMobile} {
      font-size: 18px;
      height: 70px;
    }
    ${Responsive.laptop}{
      height: 50px;
      border-radius: 8px;
      margin-top: -5px;
      font-size: 13px;
    }
`;
const EmailIconStyle = styled(EmailIcon)`
${Responsive.laptop}{
  height: 15px;
  margin-top: -8px;
}
`;
const PhoneIconStyle = styled(PhoneIcon)`
${Responsive.laptop}{
  height: 15px;
  margin-top: -8px;
}
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
    ${Responsive.tablet}{
      justify-content: space-between;
    }
    ${Responsive.tabletMobile}{
      flex-direction: column;
    }
`;
const PersonalInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
    ${Responsive.tabletMobile} {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
`;
const SectionTitleStyle = styled(SectionTitle)`
    ${Responsive.laptop} {
      font-size: 30px;
      margin-top: -10px;
    }
`;
const BreadcrumbsStyle = styled(Breadcrumbs)`
    ${Responsive.laptop} {
      margin-top: -10px;
      font-size: 12px;
    }
`;
const TabsWrapperStyle = styled(Tabs)`
    ${Responsive.laptop} {
      width: 100%;
      margin-top: -10px;
    }
`;
const GridItem = styled.div`
  padding: 65px 70px 0px 70px;
    &:first-child {
      padding-left: 0px;
    }
    ${Responsive.laptop} {
    padding: 45px 40px 45px 40px;
      width: 400px;
    }
    ${Responsive.tablet}{
      padding: 40px 15px 0px 15px;
    }
    ${Responsive.tabletMobile}{
      padding: 60px 0px 0px 0px;
      width: 100%;
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
    ${Responsive.tablet} {
      height: 60px;
      min-width: 60px;
      width: 60px;
      margin-right: 15px;
        svg {
          width: 22px;
        }
    }
    ${Responsive.tabletMobile}{
      width: 78px;
      height: 78px;
      margin-right: 10px;
    }
    ${Responsive.laptop}{
      width: 80px;
      height: 80px;
      border-radius: 6px;
    }
`;
const ProfileIconStyle = styled(ProfileIcon)`
  width: 35px;
  ${Responsive.laptop} {
    width: 25px;
  }
`;
const UnlockIconStyle = styled(UnlockIcon)`
  width: 35px;
  ${Responsive.laptop} {
    width: 25px;
    margin-top: -5px;
  }
`;
const ButtonStyle = styled(Button)`
  ${Responsive.laptop} {
    width: 100%;
  }
`;
const UserName = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
  margin-top: 8px;
    ${Responsive.tablet} {
      font-size: 20px;
    }
    ${Responsive.tabletMobile}{
      font-size: 18px;
      margin-top: 0px;
      margin-bottom: 0px;
    }
    ${Responsive.laptop} {
      font-size: 20px;
    }
`;
const OrderNo = styled.div`
  font-size: 18px;
    ${Responsive.tablet} {
      font-size: 16px;
    }
    ${Responsive.tabletMobile} {
      font-size: 14px;
    }
    ${Responsive.laptop} {
      font-size: 12px;
    }
`;
const HeaderStyle = styled.div`
  margin-bottom: 40px;
`;
const IoLogOutStyle = styled(IoLogOut)`
  height: 30px;
`;
const LogOutStyle = styled.div`
    svg {
      font-size: 44px;
    }
    span {
      font-size: 20px;
      margin-top: -1px;
    }
    ${Responsive.tabletMobile} {
      margin-left: 87px;
      margin-top: -68px;
      svg {
        font-size: 28px;
      }
      span {
        font-size: 13px;
        margin-top: 0px;
        margin-left: 10px;
      }
    }
    ${Responsive.laptop} {
      span {
        font-size: 13px;
        margin-left: 10px;
      }
    }
    ${Responsive.mobile} {
      margin-top: -25px;
      margin-left: 0px;
    }
`;
const AddressTitle = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
    ${Responsive.tablet} {
      font-size: 20px;
      margin-top: 10px;
    }
    ${Responsive.tabletMobile}{
        margin-top: 10px;
        font-size: 18px;
        margin-bottom: 30px;
    }
    ${Responsive.laptop} {
      font-size: 18px;
    }
`;
const ChangePassTitle = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
  margin-top: 100px;
  ${Responsive.laptop} {
    font-size: 18px;
  }
`;
const LabelText = styled.span`
  font-size: 18px;
  margin-bottom: 16px;
    ${Responsive.tabletMobile} {

    }
    ${Responsive.laptop} {
      font-size: 12px;
      margin-top: -10px;
    }
`;
const AddressItem = styled.div`
`;
const AddressItemText = styled.div`
  ${Responsive.tabletMobile}{
    padding-right: 25px;
  }
`;
const LocationIconStyle = styled(IoLocationSharp)`
  font-size: 22px;
  margin-right: 10px;
  margin-top: 4px;
    ${Responsive.tablet}{
      width: 35px;
    }
    ${Responsive.tabletMobile}{
      width: 35px;
    }
    ${Responsive.laptop}{
      width: 15px;
    }
  /* margin-top: 4px; */
`;
const CityStyle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  ${Responsive.laptop} {
    font-size: 14px;
  }
`;
const AddressStyle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
    ${Responsive.tabletMobile} {
    }
    ${Responsive.laptop} {
      font-size: 14px;
    }
`;
const ZipCodeStyle = styled.div`
  font-size: 20px;
  ${Responsive.laptop} {
    font-size: 14px;
  }
`;
const EditIconStyle = styled(EditIcon)`
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  ${Responsive.laptop} {
    width: 15px;
  }
`;
const DividerStyle = styled.div`
    border-bottom: .1rem solid rgba(34, 34, 34, 0.2);
    ${Responsive.tabletMobile} {
      border: 0px;
    }
`;
const CustomBorder = styled.div`
  ${Responsive.tabletMobile} {
    display: none;
  }
`;
const BootstrapModalWrapper = styled(Modal)`
    font-family: "BPG WEB 002 Caps"; 
`;
const ModalContent = styled.div`
  min-height: 140px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const TwoInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
    input {
      flex-basis: 49%;
    }
    ${Responsive.mobile} {
      flex-direction: column;
      flex-basis: 100%;
    }
`;

const InputStyle = styled.input`
  width: 100%;
  margin-bottom: 20px;
  height: 64px;
  min-height: 64px;
  border-radius: 14px;
  border: 2px solid #EBEBEB;
  outline: none;
  font-size: 16px;
  padding: 0px 15px;
    &:focus {
      border-color: #94EBD8;
    }
    ::placeholder{
      opacity: 0.4;
    }
`;

const DeleteAddressBtn = styled(AddressButton)`
  border-color: #FF4A4A !important;
  color: #FF4A4A;
  margin-top: 25px;
  background-image: linear-gradient(to right,#FF4A4A,#FF4A4A) !important;
`;
const AddressPrimaryButton = styled.button`
  position: absolute;
  right: 0;
  top: 38px;
  transform: rotate(180deg);
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 6px solid #22D5AE;
  background-color: transparent;
`;


type Props = {
  show: boolean;
  address: Address[];
  onHide: () => void;
}

type AddAddressProps = {
  show: boolean;
  onHide: () => void;
}









const PersonalInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = api.useGetCartQuery(undefined);
  const { data: favorites, isLoading: isFavoritesLoading, refetch: refetchFavorites } = api.useGetFavoritesQuery(undefined);
  const _logOut = () => {
    removeAccessToken(dispatch);
    router.push("/");
    refetchCart();
    refetchFavorites();
  };

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackMsgStatus, setsnackMsgStatus] = useState<any>('' || 'warning'); // error | warning | info | success

  const getYearFromDate = (dateString: string): string | number => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.getFullYear();
  };

  const formatMobile = (mobile: string): string => {
    return mobile.slice(4);
  };

  const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile, isSuccess: isProfileSucces } = api.useProfileQuery(undefined);

  const [deleteAddress, { isLoading: isDeleteAddressLoading }] = api.useDeleteAddressMutation();
  const [Address, { isLoading: isUpdateAddressLoading }] = api.useUpdateAddressMutation();
  const [addAddress, { isLoading: isAddAddressLoading }] = api.useAddAddressMutation();
  const [addPrimaryAddress, { isLoading: isAddPrimaryAddressLoading }] = api.useAddPrimaryAddressMutation();
  const [changePassword, { isLoading: isChangePasswordLoading }] = api.useChangePasswordMutation();

  const isMainLoader = isProfileLoading || isDeleteAddressLoading || isUpdateAddressLoading || isAddPrimaryAddressLoading || isChangePasswordLoading;

  const [updateAddresId, setupdateAddresId] = useState<number>(0);
  const [modalShow, setModalShow] = useState(false);
  const [addAddressModalShow, setAddAddressModalShow] = useState(false);


  const makeAddressPrimary = (event: { currentTarget: { id: any; }; }) => {
    console.log(event.currentTarget.id);

    const addPrimaryAddressPost = async () => {
      if (event.currentTarget.id) {
        try {
          await addPrimaryAddress(event.currentTarget.id);
          refetchProfile();
        } catch (error) {
        }
      }
      else {
        alert("address primary error")
      }
    };
    addPrimaryAddressPost();
  };


  // 
  const [currentPassword, setcurrentPassword] = useState<string>("");
  const [newPassword, setnewPassword] = useState<string>("");
  const [repeatNewPassword, setrepeatNewPassword] = useState<string>(""); //TODO for davit osadze

  

  const changePasswordPost = async () => {
    try {
      await changePassword({ currentPassword: currentPassword, newPassword: newPassword })
      .then((res) => {
        console.log(res)
        setSnackMessage("პაროლი წარმატებით შეიცვალა");
        setOpenSnack(true);
        setsnackMsgStatus('success');
        setcurrentPassword("")
        setnewPassword("")
      }).catch((err) => {
        console.log(err)
        setSnackMessage("გთხოვთ სცადოთ თავიდან !");
        setOpenSnack(true);
        setsnackMsgStatus('error');
      })
      console.log("password update try error ")
    } catch (error) {
      console.log("password update chtch error ")
    }
  };


  function UpdateAddressFunction(props: Props) { //onClick={props.onHide}
    const [newAddress, setnewAddress] = useState();

    const findAddress = props.address?.find(x => x.id == updateAddresId);

    const [updateStreet, setupdateStreet] = useState<string>(findAddress?.address_1 || "");
    const [updateCity, setupdateCity] = useState<string>(findAddress?.city || "");
    const [updateCountry, setupdateCountry] = useState<string>(findAddress?.country || "");
    const [updateState, setupdateState] = useState<string>(findAddress?.state || "");
    const [updateZipCode, setupdateZipCode] = useState<string>(findAddress?.zip || "");
    const [updateFullName, setupdateFullName] = useState<string>(findAddress?.full_name || "");

    const [addressSubmitBtn, setaddressSubmitBtn] = useState<boolean>();




    const updateAddressPut = async () => {
      setModalShow(false);

      try {
        await Address({
          address_1: updateStreet,
          country: updateCountry,
          state: updateState,
          city: updateCity,
          zip: updateZipCode,
          id: updateAddresId,
          full_name: updateFullName
        });
        setaddressSubmitBtn(true);
        // alert("form submited");
        setSnackMessage("მისამართი წარმატები განახლდა");
        setOpenSnack(true);
        setsnackMsgStatus('success');
        console.log(updateStreet + " " + updateCountry + " " + updateState + " " + updateCity + " " + updateZipCode + " " + updateAddresId);
        console.log(Address)
      } catch (error) {
        setaddressSubmitBtn(false);
        console.log("login error", error);
        // alert("form not submited")
        setSnackMessage("ვერ მოხერხდა მისამართის განახლება");
        setOpenSnack(true);
        setsnackMsgStatus('error');
      }

      refetchProfile();
    };

    const deleteSelectedAddress = async () => {
      deleteAddress(updateAddresId);
      setModalShow(false);
      refetchProfile();
      window.location.reload();
      setSnackMessage("მისამართი წარმატებით წაიშალა");
      setOpenSnack(true);
      setsnackMsgStatus('success');
    }

    return (

      <BootstrapModalWrapper
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            მისამართის ჩასწორება {updateAddresId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContent>
            <InputStyle type="text" placeholder="ქუჩის სახელი / კორპუსი / სადარბაზო / ბინა" value={updateStreet} onChange={(e: any) => setupdateStreet(e.target.value)} />
            <TwoInputWrapper>
              <InputStyle type="text" placeholder="ქალაქი" value={updateCity} onChange={(e: any) => setupdateCity(e.target.value)} />
              <InputStyle type="text" placeholder="ქვეყანა" value={updateCountry} onChange={(e: any) => setupdateCountry(e.target.value)} />
            </TwoInputWrapper>
            <InputStyle type="text" placeholder="რეგიონი / რაიონი" value={updateState} onChange={(e: any) => setupdateState(e.target.value)} />
            <InputStyle type="text" placeholder="Zip კოდი" value={updateZipCode} onChange={(e: any) => setupdateZipCode(e.target.value)} />
            <InputStyle type="text" placeholder="მიმღების სახელი და გვარი" value={updateFullName} onChange={(e: any) => setupdateFullName(e.target.value)} />

            <AddressButton onClick={updateAddressPut}>
              ჩასწორება
            </AddressButton>

            <DeleteAddressBtn onClick={deleteSelectedAddress}>მისამართის წაშლა</DeleteAddressBtn>


          </ModalContent>
        </Modal.Body>


      </BootstrapModalWrapper>
    );
  }


  function AddAddress(props: AddAddressProps) {


    const [addAddressStreet, setAddAddressStreet] = useState<string>('');
    const [addAddressCity, setAddAddressCity] = useState<string>('');
    const [addAddressCountry, setAddAddressCountry] = useState<string>('');
    const [addAddressState, setAddAddressState] = useState<string>('');
    const [addAddressZipCode, setAddAddressZipCode] = useState<string>('');
    const [addFullName, setAddFullName] = useState<string>('');




    const addNewAddress = async () => {
      setAddAddressModalShow(false);

      try {
        await addAddress({
          address_1: addAddressStreet,
          country: addAddressCity,
          state: addAddressCountry,
          city: addAddressState,
          zip: addAddressZipCode,
          full_name: addFullName
        });

        window.location.reload();
        // alert("form submited");
        setSnackMessage("მისამართი წარმატებით დაემატა");
        setOpenSnack(true);
        setsnackMsgStatus('success');

        console.log(addAddressStreet + " " + addAddressCountry + " " + addAddressState + " " + addAddressCity + " " + addAddressZipCode);
      } catch (error) {

        // alert("form not submited")
        setSnackMessage("ვერ მოხერხდა მისამართის დამატება!");
        setOpenSnack(true);
        setsnackMsgStatus('error');
      }
      refetchProfile();
    };

    return (
      <BootstrapModalWrapper
        {...props}
        size="lg"
        aria-labelledby="add-address"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-address">
            ახალი მისამართის დამატება
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalContent>
            <InputStyle type="text" placeholder="ქუჩის სახელი / კორპუსი / სადარბაზო / ბინა" value={addAddressStreet} onChange={(e: any) => setAddAddressStreet(e.target.value)} />
            <TwoInputWrapper>
              <InputStyle type="text" placeholder="ქალაქი" value={addAddressCity} onChange={(e: any) => setAddAddressCity(e.target.value)} />
              <InputStyle type="text" placeholder="ქვეყანა" value={addAddressCountry} onChange={(e: any) => setAddAddressCountry(e.target.value)} />
            </TwoInputWrapper>
            <InputStyle type="text" placeholder="რეგიონი / რაიონი" value={addAddressState} onChange={(e: any) => setAddAddressState(e.target.value)} />
            <InputStyle type="text" placeholder="Zip კოდი" value={addAddressZipCode} onChange={(e: any) => setAddAddressZipCode(e.target.value)} />
            <InputStyle type="text" placeholder="მიმღების სახელი და გვარი" value={addFullName} onChange={(e: any) => setAddFullName(e.target.value)} />

            <AddressButton onClick={addNewAddress}>
              დამატება
            </AddressButton>

          </ModalContent>
        </Modal.Body>
      </BootstrapModalWrapper>
    );
  }

  const warningMessage = async () => {
        setSnackMessage("სამზე მეტი მისამართის დამატება არ არის შესაძლებელი !");
        setOpenSnack(true);
        setsnackMsgStatus('error');
  };

  const addresses=profile?.profile?.addresses;

  return isMainLoader ? (
    <Loader />
  ) : !profile ? (
    <span>Not Found</span>
  ) : (
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
                {profile.profile?.user.first_name} {profile.profile?.user.last_name}
              </UserName>
              <OrderNo className={styles.orderNo}>
                რეგისტრაციის დრო: {dayjs(profile.profile?.user.created_at).locale('ka').format('DD / MMMM / YYYY')} წელი
              </OrderNo>
            </div>
          </HeaderStyle>
          <LogOutStyle onClick={_logOut} className={styles.logout}>
            <IoLogOutStyle />
            <span>გასვლა</span>
          </LogOutStyle>
        </GridItem>
        <GridItem
          className={styles.gridItem}
          style={{
            position: "relative",
          }}
        >
          <CustomBorder
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "42.0rem",
              borderLeft: ".1rem solid rgba(34, 34, 34, .2)",
              borderRight: ".1rem solid rgba(34, 34, 34, .2)",
            }}
          ></CustomBorder>
          <AddressTitle
            className={styles.addressTitle}

          >
            პირადი ინფორმაცია
          </AddressTitle>
          <LabelText className={styles.labels}>
            ელ-ფოსტა
          </LabelText>
          <InputWrapper >
            <InputModified
              placeholder="ელ-ფოსტა"
              defaultValue={profile.profile?.user.email}
            />
            <InputIconWrapper>
              <EmailIconStyle />
            </InputIconWrapper>
          </InputWrapper>
          <LabelText className={styles.labels}>
            მობილური ტელეფონი
          </LabelText>
          <InputWrapper>
            <InputModified
              placeholder="(+955) 555 78 97 93"
              defaultValue={"+995 " + profile.profile?.user.mobile}
            />
            <InputIconWrapper>
              <PhoneIconStyle />
            </InputIconWrapper>
            <InputIconWrapper style={{ left: "auto", right: "1.4rem", marginTop: "-3px" }}>
              <EditIcon />
            </InputIconWrapper>
          </InputWrapper>

          <ChangePassTitle
            className={styles.addressTitle}

          >
            პაროლის შეცვლა
          </ChangePassTitle>
          <InputWrapper >
            <InputModified placeholder="ძველი პაროლი" value={currentPassword} onChange={(e: any) => setcurrentPassword(e.target.value)}  />
            <InputIconWrapper>
              <UnlockIconStyle />
            </InputIconWrapper>
          </InputWrapper>
          <InputWrapper>
            <InputModified placeholder="ახალი პაროლი" value={newPassword} onChange={(e: any) => setnewPassword(e.target.value)} />
            <InputIconWrapper> 
              <UnlockIconStyle />
            </InputIconWrapper>
          </InputWrapper>
          {/* <InputWrapper>
            <InputModified placeholder="გაიმეორე ახალი პაროლი" />
            <InputIconWrapper>
              <UnlockIcon />
            </InputIconWrapper>
          </InputWrapper> */}

          <ButtonStyle onClick={changePasswordPost} disabled={currentPassword.trim().length <= 0 || newPassword.trim().length <= 0 ? true : false} >შეცვლა</ButtonStyle>
        </GridItem>
        <GridItem className={styles.gridItem}>
          <AddressTitle className={styles.addressTitle}>მისამართი:</AddressTitle>

          {profile.profile?.addresses.map((a, index) => (
            <AddressItem className={styles.addressItem}>

              <EditIconStyle onClick={() => [setModalShow(true), setupdateAddresId(a.id)]} />

              <LocationIconStyle color={"var(--text-color)"} />
              {/* {`${a.is_primary}`} */}
              {addresses?.length==1?(
              <AddressPrimaryButton id={`${a.id}`} style={a.is_primary === 1 ? { backgroundColor: "transparent", borderColor: "#22D5AE" } : { backgroundColor: "#EDEDED", borderColor: "#EDEDED" }} onClick={makeAddressPrimary}></AddressPrimaryButton>
              ):
              <AddressPrimaryButton id={`${a.id}`} style={a.is_primary === 0 ? { backgroundColor: "#EDEDED", borderColor: "#EDEDED" } : { backgroundColor: "transparent", borderColor: "#22D5AE" }} onClick={makeAddressPrimary}></AddressPrimaryButton>
              }
              <AddressItemText key={index} className={styles.addressItemText}>
                <CityStyle className={styles.city}>{a.country}, {a.city}</CityStyle>
                <AddressStyle className={styles.address}>
                  {a.address_1}
                </AddressStyle>
                <ZipCodeStyle className={styles.zip}>ZIP კოდი: {a.zip}</ZipCodeStyle>
              </AddressItemText>

            </AddressItem>
          ))}

          <UpdateAddressFunction
            show={modalShow}
            address={profile.profile?.addresses}
            onHide={() => setModalShow(false)}
          />
          {addresses?.length != 3 ? (
          <AddressButton onClick={() => setAddAddressModalShow(true)}>
            მისამართის დამატება
          </AddressButton>
          ):
          <AddressButton onClick={ () => warningMessage()}>
            მისამართის დამატება
          </AddressButton>}
          <AddAddress
            show={addAddressModalShow}
            onHide={() => setAddAddressModalShow(false)}
          />
        </GridItem>
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
    if (router?.query?.tab === "profile") {
      setTabIndex(0);
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
          // console.log(res.data.profile);
          const { data } = res;
          setUserInfo(data?.profile?.user);
          setLoadPage(true);
        })
        .catch((err) => console.log(err));
    } else {
      router.push("/auth");
    }
  }, []);

  const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile, isSuccess: isProfileSucces } = api.useProfileQuery(undefined);

  const displayName = profile?.profile?.user.first_name;

  const tabTitles = ["პროფილი", "ყიდვის ისტორია", "რჩეულები",];

  const tabIndicators = ["", " / ყიდვის ისტორია", " / რჩეულები", ""];

  const sectionTitles = [
    displayName,
    "ყიდვის ისტორია",
    "რჩეულები",
  ];

  return (
    <>
      <SectionTitleStyle>
        {sectionTitles[tabIndex]}
      </SectionTitleStyle>
      <BreadcrumbsStyle>
        მთავარი / ჩემი პროფილი{tabIndicators[tabIndex]}
      </BreadcrumbsStyle>
      {loadPage ? (
        <div className={styles.tabsWrapper}>
          <TabsWrapperStyle
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
            style={{ width: "100%" }}
          >
            <TabItemList className={styles.tabList}>
              {tabTitles.map((item, i) => (
                <TabStyle key={i}>
                  <TabItem selected={tabIndex === i}>{item}</TabItem>
                </TabStyle>
              ))}
            </TabItemList>
            <DividerStyle className={styles.divider}></DividerStyle>

            <div className={styles.tabPanels}>
              <TabPanel className={styles.tabPanel}>
                <PersonalInfo />
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <OrdersList userInfo={userInfo} />
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <Favorites />
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <MyPayments />
              </TabPanel>
            </div>
          </TabsWrapperStyle>
        </div>
      ) : (
        // <h1 style={{ margin: "2rem 0 50rem 0" }}>Loading...</h1>
        <Loader />
      )}
    </>
  );
};

export default Profile;
