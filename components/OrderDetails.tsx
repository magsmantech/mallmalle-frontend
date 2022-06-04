import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { Input } from '../pages/auth';
import styles from '../styles/OrderDetails.module.css';
import Button from './styled/button';

import ProfileIcon from '../public/icons/react-icons/profile';
import EditIcon from '../public/icons/react-icons/edit';
import { Address, calculateCartPrices, Cart } from '../domain/shop';
import api from '../features/api';
import Responsive from '../config/Responsive';
import Loader from './Loader';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
`;
const ProfileIconStyle = styled(ProfileIcon)`
    width: 26px;
    height: 26px;
        ${Responsive.mobile}{
            width: 18px;
            height: 18px;
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
        ${Responsive.mobile}{
            font-size: 13px;
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
        &:first-of-type {
            opacity: 1;
            font-size: 20px;
            font-family: 'BPG WEB 002 CAPS';
                ${Responsive.mobile}{
                    font-size: 15px;
                }
        }
`;
const BootstrapModalWrapper = styled(Modal)`
    font-family: "BPG WEB 002 Caps"; 
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





type Props = {
    show: boolean;
    address: Address[];
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
        
        const cartPrices = calculateCartPrices(cart);
        const {
            itemsSubtotalOriginalPrice,
            itemsSubtotal,
            hasDiscount,
            shippingCost,
            cartTotal,
        } = cartPrices;

        const [createOrder, { isLoading: isCreateOrderLoading }] = api.useCreateOrderMutation();
        const [initiatePayment, { isLoading: isInitiatePaymentLoading }] = api.useInitiatePaymentMutation();

        const [Address, {isLoading: isUpdateAddressLoading}] = api.useUpdateAddressMutation();
        const [deleteAddress, { isLoading: isDeleteAddressLoading }] = api.useDeleteAddressMutation();


        const [updateAddresId, setupdateAddresId] = useState<number>(0);
        const [modalShow, setModalShow] = useState(false);

        const primaryAddress = profile?.profile?.addresses.find(x => x.is_primary == 1);

        const isMainLoader = isProfileLoading || isDeleteAddressLoading || isUpdateAddressLoading;
        


        function UpdateProfileItem(props: Props) { //onClick={props.onHide}
            const [newAddress, setnewAddress] = useState();

            const findAddress = props.address?.find(x => x.id == updateAddresId);

            const [updateStreet, setupdateStreet] = useState<string>(findAddress?.address_1 || "");
            const [updateCity, setupdateCity] = useState<string>(findAddress?.city || "");
            const [updateCountry, setupdateCountry] = useState<string>(findAddress?.country || "");
            const [updateState, setupdateState] = useState<string>(findAddress?.state || "");
            const [updateZipCode, setupdateZipCode] = useState<string>(findAddress?.zip || "");

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
                        id: updateAddresId
                    });
                    setaddressUpdatedMsg("ინფორმაცია წარმატებით გაიგზავნა");
                    console.log("contact form submit");
                    setaddressSubmitBtn(true);
                    alert("form submited");
                    console.log(updateStreet + " " + updateCountry + " " + updateState + " " + updateCity + " " + updateZipCode + " " + updateAddresId);
                    console.log(Address)
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
                            <UpdateInputStyle type="text" placeholder="ქუჩის სახელი" value={updateStreet} onChange={(e: any) => setupdateStreet(e.target.value)} />
                            <TwoInputWrapper>
                                <UpdateInputStyle type="text" placeholder="ქალაქი" value={updateCity} onChange={(e: any) => setupdateCity(e.target.value)} />
                                <UpdateInputStyle type="text" placeholder="ქვეყანა" value={updateCountry} onChange={(e: any) => setupdateCountry(e.target.value)} />
                            </TwoInputWrapper>
                            <UpdateInputStyle type="text" placeholder="რეგიონი / რაიონი" value={updateState} onChange={(e: any) => setupdateState(e.target.value)} />
                            <UpdateInputStyle type="text" placeholder="Zip კოდი" value={updateZipCode} onChange={(e: any) => setupdateZipCode(e.target.value)} />

                            <AddressButton onClick={updateAddressPut}>
                                ჩასწორება
                            </AddressButton>

                            <DeleteAddressBtn onClick={deleteSelectedAddress}>მისამართის წაშლა</DeleteAddressBtn>


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
                        <OrderNoStyle>ორდერის ID: 124532</OrderNoStyle>
                    </div>
                </HeaderStyle>
                <div>
                    <AddressTitleStyle>მისამართი:</AddressTitleStyle>
                   
                            
                        <AddressItemStyle>
                            <EditIconStyle onClick={() => [setModalShow(true), setupdateAddresId(primaryAddress?.id ? primaryAddress?.id : 0 )]} />
                            <IoLocationSharpStyle />
                           
                            <AddressItemTextStyle >
                                <div className={styles.city}>{primaryAddress?.city}</div>
                                <div className={styles.address}>{primaryAddress?.address_1}</div>
                                <div className={styles.zip}>ZIP კოდი: {primaryAddress?.zip}</div>
                            </AddressItemTextStyle>

                        </AddressItemStyle>

                 

                    <UpdateProfileItem
                        show={modalShow}
                        address={profile.profile?.addresses}
                        onHide={() => setModalShow(false)}
                    />




                    <AddressItemStyle>
                        {/* <div>Icon</div> */}
                        <BsFillTelephoneFillStyle color={'var(--text-color)'} />
                        <AddressItemTextStyle>
                            (+995) {profile.profile?.user.mobile}
                        </AddressItemTextStyle>
                    </AddressItemStyle>

                    <AddressTitleStyle>პრომო კოდი:</AddressTitleStyle>
                </div>

                <InputWrapperStyle>
                    <InputStyle placeholder="PROMO CODE"></InputStyle>
                    <CustomButton>შემოწმება</CustomButton>
                </InputWrapperStyle>

                <DividerStyle></DividerStyle>

                <div className={styles.paymentWrapper}>

                    <PaymentItemStyle >
                        <span>სრული თანხა</span>
                        <span>$ {cartTotal}</span>
                    </PaymentItemStyle>
                    {cartPrices.hasDiscount ? (
                        <PaymentItemStyle>
                            <span>ფასდაკლება</span>
                            <span >-$ {itemsSubtotal}</span>
                        </PaymentItemStyle>
                    ) : null}
                    <PaymentItemStyle>
                        <span>{cart?.items?.length} ნივთი</span>
                        <span>$ {itemsSubtotalOriginalPrice}</span>
                    </PaymentItemStyle>
                    <PaymentItemStyle>
                        <span>მიტანა</span>
                        <span>$ {shippingCost}</span>
                    </PaymentItemStyle>
                </div>

                <Button onClick={async () => {
                    if (!selectedAddressId) {
                        alert('გთხოვთ, მონიშნოთ მიტანის მისამართი');
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
                }}>გადახდაზე გადასვალა</Button>
            </ContainerStyle>
        )
    }

export default OrderDetails;