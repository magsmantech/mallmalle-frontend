import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { Input } from '../pages/auth';
import styles from '../styles/OrderDetails.module.css';
import Button from './styled/button';

import ProfileIcon from '../public/icons/react-icons/profile';
import EditIcon from '../public/icons/react-icons/edit';
import { Address, Cart } from '../domain/shop';
import api from '../features/api';
import Responsive from '../config/Responsive';
import Loader from './Loader';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Snackbar } from "@mui/material";

const CustomButton = styled.button`
    
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    color: var(--text-color);

    font-family: fira-go;
    font-size: 20px;
    font-weight: 700;
    height: 70%;
    display: inline-flex;
    align-items: center;
    z-index: 2;
    cursor: pointer;
    padding: 0 25px 0 25px;
    border-left: rgba(66, 79, 96, 0.3) solid 0.1rem;
        ${Responsive.mobile}{
            font-size: 14px;
            padding: 0 10px 0 10px;
        }
`;

const ContainerStyle = styled.div`
 display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px;
    background-color: #F8FEFF;
    border: 2px solid rgba(0, 210, 255, 0.09);
    border-radius: 14px;
        ${Responsive.mobile}{
            padding: 15px;
        }
        ${Responsive.laptop}{
            margin-top: -50px;
        }
`;
const IconWrapperStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    width: 64px;
    border-radius: 12px;
    background-image: linear-gradient(15deg, rgba(34, 210, 175, 0.14) 0%, rgba(56, 133, 209, 0.14) 100%);
    margin-right: 25px;
        ${Responsive.mobile}{
            height: 44px;
            width: 44px;
            margin-right: 12px;
        }
        ${Responsive.laptop}{
            height: 44px;
            width: 44px;
            border-radius: 6px;
        }
`;
const ProfileIconStyle = styled(ProfileIcon)`
    width: 26px;
    height: 26px;
        ${Responsive.mobile}{
            width: 18px;
            height: 18px;
        }
        ${Responsive.laptop}{
            width: 20px;
            height: 20px;
        }
`;
const NameStyle = styled.div`
    color: var(--text-color);
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 600;
    font-family: fira-go;
        ${Responsive.mobile}{
            font-size: 20px;
            margin-bottom: 0px;
        }
        ${Responsive.laptop}{
            font-size: 17px;
        }
`;
const OrderNoStyle = styled.div`
      
    font-size: 16px;
    font-family: 'helvetica';
    opacity: 0.5;
    font-weight: 500;
`;
const HeaderStyle = styled.div`
    display: flex;
    margin-bottom: 30px;
        ${Responsive.mobile}{
            margin-bottom: 38px;
        }
        ${Responsive.laptop}{
            margin-top: -10px;
        }
`;
const AddressTitleStyle = styled.div`
    color: var(--text-color);
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 18px;
    font-family: fira-go;
        ${Responsive.mobile}{
            font-size: 12px;
            margin-bottom: 15px;
        }
        ${Responsive.laptop}{
            font-size: 14px;
            margin-top: -10px;
        }
`;
const AddressItemStyle = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 15px;
    gap: 15px;
        ${Responsive.mobile}{
            gap: 10px;
            margin-bottom: 15px;
        }
        ${Responsive.laptop}{
            margin-top: -10px;
        }
`;
const EditIconStyle = styled(EditIcon)`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
        ${Responsive.mobile}{
            width: 19px;
            height: 19px;
            margin-top: -2px;
        }
        ${Responsive.laptop}{
            width: 19px;
            height: 19px;
        }
`;
const IoLocationSharpStyle = styled(IoLocationSharp)`
    height: 32px;
    width: 32px;
    min-width: 32px;
    color: var(--text-color);
    margin-top: 2px;
        ${Responsive.mobile}{
            height: 18px;
            width: 18px;
            min-width: 18px;
            margin-top: 0px;
        }
        ${Responsive.laptop}{
            height: 18px;
            width: 18px;
        }
`;
const BsFillTelephoneFillStyle = styled(BsFillTelephoneFill)`
    height: 23px;
    width: 23px;
    color: var(--text-color);
    margin-left: 5px;
    margin-right: 2px;
        ${Responsive.mobile}{
            height: 16px;
            width: 16px;
            min-width: 16px;
            margin-top: -1px;
        }
        ${Responsive.laptop}{
            height: 18px;
            width: 18px;
        }
`;
const AddressItemTextStyle = styled.div`
    color: var(--text-color);
    font-size: 20px;
    display: flex;
    flex-direction: column;
    font-family: fira-go;
    padding-right: 20px;
        ${Responsive.mobile}{
            font-size: 14px;
        }
        ${Responsive.laptop}{
            font-size: 14px;
        }
`;
const InputWrapperStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;
const InputStyle = styled(Input)`
    font-size: 20px;
    font-family: fira-go;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 5px;
        ${Responsive.mobile}{
            font-size: 13px;
        }
`;
const ButtonStyle = styled(Button)`
        ${Responsive.laptop}{
            width: 100%;
            border-radius: 8px;
            margin-top: -40px;
        }
`;
const UpdateInputStyle = styled.input`
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
`;
const DividerStyle = styled.div`
    border-bottom: .1rem solid rgba(42, 114, 129, .3);
    margin: 40px 0px 35px 0px;
    display: flex;
        ${Responsive.mobile}{
            margin: 40px 0px 20px 0px;
        }
        ${Responsive.laptop}{
            margin-top: 10px;
        }
`;
const PaymentItemStyle = styled.div`
    display: flex;
    justify-content: space-between;
    opacity: 0.5;
    font-size: 18px;
    font-family: fira-go;
    color: var(--text-color);
    margin-bottom: 10px;
    font-weight: 500;
        ${Responsive.mobile}{
            font-size: 14px;
        }
        &:last-of-type {
            opacity: 1;
            font-size: 20px;
            font-family: 'BPG WEB 002 CAPS';
                ${Responsive.mobile}{
                    font-size: 15px;
                }
        }
        ${Responsive.laptop}{
            margin-top: -5px;
            span{
            font-size: 12px;
            }
        }
`;
const BootstrapModalWrapper = styled(Modal)`
    font-family: "BPG WEB 002 Caps"; 
`;
const AddressButton = styled(Button)`
  /* background-image: none; */
  height: 77px;
  width: 100%;
  /* color: #22D5AE; */
  border: 0.2rem solid #22d5ae;
  /* margin-top: 55px; */
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

const ModalContent = styled.div`
  min-height: 140px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const DeleteAddressBtn = styled(AddressButton)`
  border-color: #FF4A4A !important;
  color: #FF4A4A;
  margin-top: 25px;
  background-image: linear-gradient(to right,#FF4A4A,#FF4A4A) !important;
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
const GridItem = styled.div`
  padding: 65px 70px 0px 70px;
    &:first-child {
      padding-left: 0px;
    }
    &:last-child {
      padding-right: 0px;
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




type Props = {
    show: boolean;
    address: Address[];
    onHide: () => void;
}

type AddAddressProps = {
    show: boolean;
    onHide: () => void;
  }

const OrderDetails: React.FC<{
    cart?: Cart;
    selectedAddressId?: number;
}> = ({
    cart,
    selectedAddressId,
}) => {
        const { data: addresses, isLoading: isAddressesLoading, refetch: refetchAddresses } = api.useGetAddressesQuery(undefined);
        const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile } = api.useProfileQuery(undefined);
        
        // const cartPrices = calculateCartPrices(cart);
        // const {
        //     itemsSubtotalOriginalPrice,
        //     itemsSubtotal,
        //     hasDiscount,
        //     shippingCost,
        //     cartTotal,
        // } = cartPrices;

        const [createOrder, { isLoading: isCreateOrderLoading }] = api.useCreateOrderMutation();
        const [initiatePayment, { isLoading: isInitiatePaymentLoading }] = api.useInitiatePaymentMutation();

        const [Address, {isLoading: isUpdateAddressLoading}] = api.useUpdateAddressMutation();
        const [deleteAddress, { isLoading: isDeleteAddressLoading }] = api.useDeleteAddressMutation();
        const [addAddress, { isLoading: isAddAddressLoading }] = api.useAddAddressMutation();
        const [addPrimaryAddress, { isLoading: isAddPrimaryAddressLoading }] = api.useAddPrimaryAddressMutation();


        const [updateAddresId, setupdateAddresId] = useState<number>(0);
        const [modalShow, setModalShow] = useState(false);
        const [addAddressModalShow, setAddAddressModalShow] = useState(false);

        const primaryAddress = profile?.profile?.addresses.find(x => x.is_primary == 1);

        const isMainLoader = isProfileLoading || isDeleteAddressLoading || isUpdateAddressLoading;
        
        const [openSnack, setOpenSnack] = useState(false);
        const [snackMessage, setSnackMessage] = useState('');
        const [snackMsgStatus, setsnackMsgStatus] = useState<any>('' || 'warning'); // error | warning | info | success


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

        function UpdateProfileItem(props: Props) { //onClick={props.onHide}
            const [newAddress, setnewAddress] = useState();

            const findAddress = props.address?.find(x => x.id == updateAddresId);

            const [updateStreet, setupdateStreet] = useState<string>(findAddress?.address_1 || "");
            const [updateCity, setupdateCity] = useState<string>(findAddress?.city || "");
            const [updateCountry, setupdateCountry] = useState<string>(findAddress?.country || "");
            const [updateState, setupdateState] = useState<string>(findAddress?.state || "");
            const [updateZipCode, setupdateZipCode] = useState<string>(findAddress?.zip || "");
            const [updateFullName, setupdateFullName] = useState<string>(findAddress?.full_name || "");

            const [addressUpdatedMsg, setaddressUpdatedMsg] = useState<string>();
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
                    setaddressUpdatedMsg("ინფორმაცია წარმატებით გაიგზავნა");
                    console.log("contact form submit");
                    setaddressSubmitBtn(true);
                    // alert("form submited");
                    console.log(updateStreet + " " + updateCountry + " " + updateState + " " + updateCity + " " + updateZipCode + " " + updateAddresId);
                    console.log(Address);
                    window.location.reload();
                  } catch (error) {
                    setaddressUpdatedMsg("გთხოვთ სცადოთ თავიდან ");
                    setaddressSubmitBtn(false);
                    console.log("login error", error);
                    alert("form not submited")
                }
                refetchProfile();
            };

            const deleteSelectedAddress = async () => {
                deleteAddress(updateAddresId);
                setModalShow(false);
                window.location.reload();
                refetchProfile();
            }

            return  (

                <BootstrapModalWrapper
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter-1"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter-1">
                            მისამართის ჩასწორება 
                            {/* {updateAddresId} */}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalContent>
                            <UpdateInputStyle type="text" placeholder="ქუჩის სახელი / კორპუსი / სადარბაზო / ბინა" value={updateStreet} onChange={(e: any) => setupdateStreet(e.target.value)} />
                            <TwoInputWrapper>
                                <UpdateInputStyle type="text" placeholder="ქალაქი" value={updateCity} onChange={(e: any) => setupdateCity(e.target.value)} />
                                <UpdateInputStyle type="text" placeholder="ქვეყანა" value={updateCountry} onChange={(e: any) => setupdateCountry(e.target.value)} />
                            </TwoInputWrapper>
                            <UpdateInputStyle type="text" placeholder="რეგიონი / რაიონი" value={updateState} onChange={(e: any) => setupdateState(e.target.value)} />
                            <UpdateInputStyle type="text" placeholder="Zip კოდი" value={updateZipCode} onChange={(e: any) => setupdateZipCode(e.target.value)} />
                            <UpdateInputStyle type="text" placeholder="მიმღების სახელი და გვარი" value={updateFullName} onChange={(e: any) => setupdateFullName(e.target.value)} />


                            <AddressButton onClick={updateAddressPut}>
                                ჩასწორება
                            </AddressButton>

                            <DeleteAddressBtn onClick={deleteSelectedAddress}>მისამართის წაშლა</DeleteAddressBtn>


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

        function AddAddress(props: AddAddressProps) {


            const [addAddressStreet, setAddAddressStreet] = useState<string>('');
            const [addAddressCity, setAddAddressCity] = useState<string>('');
            const [addAddressCountry, setAddAddressCountry] = useState<string>('');
            const [addAddressState, setAddAddressState] = useState<string>('');
            const [addAddressZipCode, setAddAddressZipCode] = useState<string>('');
            const [addAddressFullName, setAddAddressFullName] = useState<string>('');
        
        
        
        
            const addNewAddress = async () => {
              setAddAddressModalShow(false);
        
              try {
                await addAddress({
                  address_1: addAddressStreet,
                  country: addAddressCity,
                  state: addAddressCountry,
                  city: addAddressState,
                  zip: addAddressZipCode,
                  full_name: addAddressFullName
                });
        
                // alert("form submited");
                setSnackMessage("მისამართი წარმატებით დაემატა");
                setOpenSnack(true);
                setsnackMsgStatus('success');
                window.location.reload();
        
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
                    <InputStyle type="text" placeholder="მიმღების სახელი და გვარი" value={addAddressFullName} onChange={(e: any) => setAddAddressFullName(e.target.value)} />
        
                    <AddressButton onClick={addNewAddress}>
                      დამატება
                    </AddressButton>
        
                  </ModalContent>
                </Modal.Body>
              </BootstrapModalWrapper>
            );
          }
        


        return isMainLoader ? <Loader /> : !profile ? (<span>not found profile</span>) : (
            <ContainerStyle className={styles.container}>
                <HeaderStyle>
                    <IconWrapperStyle className={styles.iconWrapper}>
                        {/* <FaUserAlt size={'2.0rem'} color={'#2EAAC1'}/> */}
                        <ProfileIconStyle />
                    </IconWrapperStyle>
                    <div className={styles.headerText}>
                        <NameStyle>{profile.profile?.user.first_name} {profile.profile?.user.last_name}</NameStyle>
                        <OrderNoStyle></OrderNoStyle>
                    </div>
                </HeaderStyle>
                <div>
        <AddressTitleStyle>მისამართი:</AddressTitleStyle>
                   
          {profile.profile?.addresses.map((a, index) => (
                            
                        <AddressItemStyle>
                            <EditIconStyle onClick={() => [setModalShow(true), setupdateAddresId(a.id)]} />
                            <IoLocationSharpStyle />
                           
                            <AddressPrimaryButton id={`${a.id}`} style={a.is_primary === 0 ? { backgroundColor: "#EDEDED", borderColor: "#EDEDED" } : { backgroundColor: "transparent", borderColor: "#22D5AE" }} onClick={makeAddressPrimary}></AddressPrimaryButton>
                            <AddressItemTextStyle >
                                <div className={styles.city}>{a.city}</div>
                                <div className={styles.address}>{a.address_1}</div>
                                <div className={styles.zip}>ZIP კოდი: {a.zip}</div>
                            </AddressItemTextStyle>


                        </AddressItemStyle>))
}
          <UpdateProfileItem
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

                    {/* <AddressTitleStyle>პრომო კოდი:</AddressTitleStyle> */}
                </div>

                {/* <InputWrapperStyle>
                    <InputStyle placeholder="PROMO CODE"></InputStyle>
                    <CustomButton>შემოწმება</CustomButton>
                </InputWrapperStyle> */}

                <DividerStyle></DividerStyle>

                <div className={styles.paymentWrapper}>

                    <PaymentItemStyle >
                        <span>სრული ღირებულება</span>
                        <span>₾ {cart?.withoutDiscount}</span>
                    </PaymentItemStyle>
                        <PaymentItemStyle>
                            <span>ფასდაკლება</span>
                            <span >-₾ {Number(cart?.discount)}</span>
                        </PaymentItemStyle>
                    <PaymentItemStyle>
                        <span>ტრანსპორტირება</span>
                        {/* <span>₾ {shippingCost}</span> */}
                        <span>₾ 0</span>
                    </PaymentItemStyle>

                    <DividerStyle></DividerStyle>

                    <PaymentItemStyle >
                        <span>ჯამი</span>
                        <span>₾ {cart?.summary}</span>
                    </PaymentItemStyle>
                </div>

                <ButtonStyle onClick={async () => {
                    if (!selectedAddressId) {
                      setSnackMessage("გთხოვთ, მონიშნოთ მიტანის მისამართი !");
                      setOpenSnack(true);
                      setsnackMsgStatus('info');
                      return;
                    }
                    if (!primaryAddress) {
                      setSnackMessage("გთხოვთ, მონიშნოთ მიტანის მისამართი !");
                      setOpenSnack(true);
                      setsnackMsgStatus('info');
                      return;
                  }
                    // @ts-ignore
                    const { data: response } = await createOrder({ addressId: selectedAddressId });
                    if ('success' in response && response.success) {
                        const orderId = response.data.id;
                        // redirect to payment
                        // alert(response.success + ' -- TODO redirect to card payment URL');
                        // @ts-ignore
                        const { data: payment } = await initiatePayment({ orderId });
                        const { redirect_url } = payment;
                        document.location.href = redirect_url;
                    } else {
                        alert(response.address_id[0] ?? 'მოხდა შეცდომა. გთხოვთ, სცადოთ მოგვიანებით.');
                    }
                }}>გადახდაზე გადასვლა</ButtonStyle>
            </ContainerStyle>
        )
    }

export default OrderDetails;