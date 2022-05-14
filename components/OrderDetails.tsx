import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { Input } from '../pages/auth';
import styles from '../styles/OrderDetails.module.css';
import Button from './styled/button';

import ProfileIcon from '../public/icons/react-icons/profile';
import EditIcon from '../public/icons/react-icons/edit';
import { calculateCartPrices, Cart } from '../domain/shop';
import api from '../features/api';

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
`;

const ContainerStyle = styled.div`
 display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30px;
    background-color: #F8FEFF;
    border: 2px solid rgba(0, 210, 255, 0.09);
    border-radius: 14px;
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
`;
const ProfileIconStyle = styled(ProfileIcon)`
    width: 26px;
    height: 26px;
`;
const NameStyle = styled.div`
    color: var(--text-color);
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 600;
    font-family: fira-go;
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
`;
const AddressTitleStyle = styled.div`
    color: var(--text-color);
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 18px;
    font-family: fira-go;
`;
const AddressItemStyle = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 15px;
    gap: 15px;
`;
const EditIconStyle = styled(EditIcon)`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
`;
const IoLocationSharpStyle = styled(IoLocationSharp)`
    height: 32px;
    width: 32px;
    color: var(--text-color);
    margin-top: 2px;
`;
const BsFillTelephoneFillStyle = styled(BsFillTelephoneFill)`
    height: 23px;
    width: 23px;
    color: var(--text-color);
    margin-left: 5px;
    margin-right: 2px;
`;
const AddressItemTextStyle = styled.div`
    color: var(--text-color);
    font-size: 20px;
    display: flex;
    flex-direction: column;
    font-family: fira-go;
    padding-right: 20px;
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
`;
const DividerStyle = styled.div`
    border-bottom: .1rem solid rgba(42, 114, 129, .3);
    margin: 40px 0px 35px 0px;
    display: flex;
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
        &:first-of-type {
            opacity: 1;
            font-size: 20px;
            font-family: 'BPG WEB 002 CAPS';
        }
`;




const OrderDetails: React.FC<{
    cart?: Cart;
    selectedAddressId?: number;
}> = ({
    cart,
    selectedAddressId,
}) => {

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

        return (
            <>
                <ContainerStyle className={styles.container}>
                    <HeaderStyle>
                        <IconWrapperStyle className={styles.iconWrapper}>
                            {/* <FaUserAlt size={'2.0rem'} color={'#2EAAC1'}/> */}
                            <ProfileIconStyle />
                        </IconWrapperStyle>
                        <div className={styles.headerText}>
                            <NameStyle>გაგი მურჯიკნელი</NameStyle>
                            <OrderNoStyle>ორდერის ID: 124532</OrderNoStyle>
                        </div>
                    </HeaderStyle>
                    <div>
                        <AddressTitleStyle>მისამართი:</AddressTitleStyle>
                        <AddressItemStyle>
                            <EditIconStyle />
                            {/* <div> */}
                            <IoLocationSharpStyle />
                            {/* </div> */}
                            <AddressItemTextStyle >
                                <div className={styles.city}>Tbilisi</div>
                                <div className={styles.address}>მუხიანი, ალეკო გობრონიძის #11 / ბინა 177</div>
                                <div className={styles.zip}>ZIP კოდი: 01103</div>
                            </AddressItemTextStyle>
                        </AddressItemStyle>
                        <AddressItemStyle>
                            {/* <div>Icon</div> */}
                            <BsFillTelephoneFillStyle color={'var(--text-color)'} />
                            <AddressItemTextStyle>
                                (+995) 577 48 88 96
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
            </>
        )
    }

export default OrderDetails;