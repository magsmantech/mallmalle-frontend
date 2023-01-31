import type { NextPage } from "next";
import styles from "../../styles/Auth.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Button from "../../components/styled/button";
// import Image from 'next/image';
import {
  Input as Check,
  Label,
  LabelText,
} from "../../components/styled/checkbox";
import Link from "next/link";

import EyeIcon from "../../public/icons/react-icons/eye";

import * as yup from "yup";
import { FormikValues, useFormik } from "formik";
import * as AuthService from "../../services/auth-services";
import {
  AddAddressParams,
  LogInParams,
  ResetPasswordParams,
} from "../../interfaces/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showFeedback } from "../../features/feedbackSlice";
import Responsive from "../../config/Responsive";
import BlurPopup from "../../components/BlurPopup";
import api from "../../features/api";
import { Alert, Snackbar } from "@mui/material";
import Fonts from "../../styles/Fonts";
import dayjs from "dayjs";
require('dayjs/locale/ka');
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';





type TabItemProps = {
  selected?: boolean;
};

const Icon = () => {
  return <button>Show</button>;
};

const TabItem = styled.div`
  color: ${({ selected }: TabItemProps) =>
    selected ? "#1FD5AE" : "var(--text-color)"};
  font-size: 16px;
  /* font-family: 'helvetica'; */
  padding: 15px;
  border-bottom: ${({ selected }: TabItemProps) =>
    selected ? ".1rem solid #1FD5AE" : "none"};
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "BPG WEB 002 Caps";
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */
    ${Responsive.mobile} {
      font-size: 13px;
      padding: 14px 5px;
    }
    ${Responsive.laptop} {
      font-size: 11px;
      padding: 14px 5px;
      font-weight: 500;
      margin-top: 20px;
    }
`;

const Title = styled.span`
  color: var(--text-color);
  font-size: 32px;
  font-family: "BPG WEB 002 Caps";
  margin-bottom: 20px;
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */
    ${Responsive.mobile} {
      margin-bottom: 18px;
    }
    ${Responsive.laptop} {
      font-size: 22px;
      margin-top: -20px;
    }
`;
const ImageWithTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  color: var(--text-color);
  font-size: 16px;
  font-family: "helvetica";
  opacity: 0.5;
  margin-bottom: 30px;
    ${Responsive.mobile} {
      margin-bottom: 25px;
      font-size: 14px;
    }
    ${Responsive.laptop} {
      font-size: 11px;
      font-weight: 600;
      margin-top: -5px;
    }
`;

//--------------//
const TabsWrapper = styled.div`
`;
const SectionWrapper = styled.div`
  /* background-color: red; */
  justify-content: space-between;
    ${TabsWrapper} {
      /* background-color: green; */
      flex-basis: 40%;
        ${Responsive.tablet} {
          flex-basis: 43%;
        }
        ${Responsive.mobile} {
          flex-basis: 100%;
          margin-bottom: 60px;
        }
        ${Responsive.laptop} {
          width: 1230px;
          margin-top: -25px;
        }
    }
    ${ImageWithTextWrapper} {
      /* background-color: aqua; */
      flex-basis: 54%;
      ${Responsive.mobile} {
          flex-basis: 100%;
        }
    }
    /* res */
    ${Responsive.tabletMobile} {
      flex-direction: column;
    }
`;
const TabPanelsWrapper = styled.div`
  padding-top: 50px;
`;

const LabelTextStyle = styled(LabelText)`
  ${Responsive.laptop} {
    font-size: 12px;
  }
`;

const CheckStyle = styled(Check)`
  ${Responsive.laptop} {
    height: 15px;
  }
`;


//--------------//

type InputProps = {
  invalid: boolean;
  [s: string]: any;
};

export const Input = styled.input.attrs((props: InputProps) => ({
  // we can define static props
  type: props.type || "text",

  // or we can define dynamic ones
  // size: props.size || "1em",
}))`
  color: var(--text-color);
  font-size: 16px;
  font-family: "helvetica";
  font-weight: 500;
  border: 0.2rem solid
    ${(props: InputProps) =>
    props.invalid ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.08)"};
  border-radius: 14px;
  /* height: 64px; */
  padding: 20px 15px;
  background-color: rgba(255, 255, 255, 0.22);
  &::placeholder {
    opacity: 0.5;
  }
  &:focus {
    outline: none;
    border: 0.2rem solid rgba(34, 210, 175, 0.45);
  }

  /* res */
  ${Responsive.mobile} {
    font-size: 14px;
    height: 48px;
    padding: 5px 0px 7px 15px;
  }

  /* here we use the dynamically computed prop */
`;

const FormLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.6rem;
  ${Responsive.laptop} {
    font-size: 14px;
    width: 100%;
    grid-gap: 1.0rem;
  }
`;

const TextButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  font-family: "helvetica";
  opacity: 0.5;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  margin-bottom: 25px;
  margin-left: 3px;
  &:hover {
    opacity: 0.65;
  }
    ${Responsive.mobile} {
      text-decoration-line: underline;
    }
    ${Responsive.laptop} {
      font-size: 10px;
    }
`;



const Img = styled.img`
  width: 100%;
  height: 540px;
  object-fit: cover;
  object-position: center;
  border-radius: 14px;
  margin-bottom: 30px;
    ${Responsive.mobile} {
      height: 200px;
      margin-bottom: 25px;
    }
    ${Responsive.tabletMobile} {
      margin-top: 70px;
    }
    ${Responsive.laptop} {
      height: 360px;
    }
`;

const ImgTitle = styled.span`
  color: var(--text-color);
  font-size: 24px;
  font-family: "BPG WEB 002 Caps";
  margin-bottom: 18px;
  /* text-transform: uppercase;
  font-feature-settings: "case" on; */
  ${Responsive.mobile} {
      font-size: 18px;
      margin-bottom: 18px;
  }
  ${Responsive.laptop} {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.8px;
    margin-top: -5px;
    margin-bottom: 14px;
}
`;

const ImgText = styled.span`
  color: var(--text-color);
  font-size: 18px;
  font-family: "helvetica";
  font-weight: 500;
  margin-bottom: 24px;
  ${Responsive.mobile} {
      font-size: 16px;
  }
  ${Responsive.laptop} {
    font-size: 14px;
}
`;

const DoubleInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.6rem;
`;
const InputStyle = styled(Input)`
  ${Responsive.laptop} {
    height: 40px;
    width: 100%;
    font-size: 12px;
  }
`;

export const IWBInput = styled(Input)`
  border-radius: 14px 0 0 14px;
  ${Responsive.laptop} {
    height: 40px;
    width: 100%;
    font-size: 12px;
  }
`;

export const IWBButton = styled(Button)`
  border-radius: 0 14px 14px 0;
  height: 64px;
  font-size: 20px;
    ${Responsive.mobile} {
      height: 48px;
      padding: 0px 30px;
      font-size: 14px;
    }
    ${Responsive.laptop} {
      height: 47px;
      font-size: 12px;
      width: 140px;
    }
`;

export const IWBWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const PasswordInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const EyeIconStyle = styled(EyeIcon)`
${Responsive.laptop}{
  height: 15px;
  width: 20px;
}
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 18px;
  top: 54%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.3;
  user-select: none;
  &:hover {
    opacity: 0.5;
  }
`;
const EmailIconStyle = styled.img`
  margin-right: 30px;
  width: 100px;
    ${Responsive.mobile}{
      width: 70px;
    }
`;
const UserEmailStyle = styled.span`
    font-size: 16px;
    font-family: ${Fonts.FiraGOMedium};
`;
const DateStyle = styled.span`
    font-size: 16px;
    font-family: ${Fonts.FiraGORegular};
    opacity: 0.5;
    margin-top: 12px;
`;
const BackToMainPageStyle = styled.span`
    cursor: pointer;
    font-size: 16px;
    font-family: ${Fonts.FiraGORegular};
    color: var(--text-color);
    text-decoration: underline;
      ${Responsive.mobile}{
        margin-top: 30px;
      }
`;
const SendedEmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
    ${Responsive.mobile}{
      flex-direction: column;
      margin-top: 40px;
    }
`;


const MailItem = () => {
  return (
    <div style={{ display: "flex" }}>
      <EmailIconStyle src="/assets/mail.png" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1.6rem",
          color: "var(--text-color)",
        }}
      >
        <UserEmailStyle>gagi.murjikneli@gmail.com</UserEmailStyle>
        <DateStyle>23/23/23</DateStyle>
      </div>
    </div>
  );
};

const PasswordInputWrapperTest = ({
  placeholder,
  id,
  name,
  value,
  onChange,
  invalid,
}: any) => {
  const [type, setType] = useState("password");
  const _eyeClick = () => {
    const tempType = type === "password" ? "text" : "password";
    setType(tempType);
  };

  return (
    <PasswordInputWrapper>
      <InputStyle
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        invalid={invalid}
      />
      <IconWrapper>
        <EyeIconStyle width={"2.62rem"} onClick={_eyeClick} />
      </IconWrapper>
    </PasswordInputWrapper>
  );
};

type RecoverElementParams = {
  token?: string;
  activeStep?: string;
};

const Auth: NextPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [recover, setRecover] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>("");
  const [authStep, setAuthStep] = useState("email");
  const [passwordSuccessfullyChanged, setpasswordSuccessfullyChanged] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackMsgStatus, setsnackMsgStatus] = useState<any>('' || 'warning'); // error | warning | info | success

  const { data: cart, isLoading: isCartLoading, refetch: refetchCart } = api.useGetCartQuery(undefined);
  const { data: favorites, isLoading: isFavoritesLoading, refetch: refetchFavorites } = api.useGetFavoritesQuery(undefined);

  const [recoverPasswordEmailRequist, setrecoverPasswordEmailRequist] = useState<string>('');

  var passwordRecoverRequistDate = dayjs(new Date()).locale('ka').format('DD.MM.YYYY');

  if (typeof window !== 'undefined') {
    var hostname = window.location.search;
  }

  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (router?.query && router?.query["change-password"]) {
      // setStep('change-password');
      console.log(router);
      console.log(router?.query["change-password"]);
      if (typeof router?.query["change-password"] === "string") {
        setToken(router?.query["change-password"]);
      } else {
        setToken(router?.query["change-password"][0]);
      }
      setRecover(true);
      setAuthStep("change-password");
    }
    // console.log(hostname.split('=')[0])
    if (hostname.split('=')[0] === '?token') {
      setRecover(true);
      setAuthStep("change-password");
    }
  }, []);

  const AuthForm = () => {
    const [loading, setLoading] = useState(false);




    const validationSchema = yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    });
    const initialValues: LogInParams = {
      email: "",
      password: "",
    };

    type LoginResponse = {
      data: string;
      [x: string]: any;
    };

    const onSubmit = async (values: LogInParams) => {
      console.log(values);
      setLoading(true);
      AuthService.logIn(values)
        .then((res: LoginResponse) => {
          console.log(res);
          setLoading(false);

          AuthService.setAccessToken(res.data, dispatch);
          window.location.replace("/");
          refetchCart();
          refetchFavorites();
        })
        .catch((err) => {
          setLoading(false);
          // dispatch(
          //   showFeedback({
          //     show: true,
          //     type: "error",
          //   })
          // );
          // alert(err)
          {i18next.language == "ge"?
          setSnackMessage("გადააამოწმეთ თქვენი მონაცემები")
          :
          setSnackMessage("Check your information")
          }
          setOpenSnack(true);
          setsnackMsgStatus('error');
          console.log(err);
        });
    };

    const formik = useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

    return (
      <>
        <Title>{t('authorization')}</Title>
        <Text>
        {t('enterCredentials')}
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormLayout>
            <InputStyle
              placeholder={t('email')}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              invalid={formik.touched.email && formik.errors.email}
            />
            <PasswordInputWrapperTest
              placeholder={t('password')}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              invalid={formik.touched.password && formik.errors.password}
            />
            <div style={{ display: 'flex', flexDirection: "column-reverse" }}>
              <Button disabled={loading} type="submit">
              {t('authorize')}
              </Button>
              <TextButton onClick={() => setRecover(!recover)}>
              {t('forgotPassword')}
              </TextButton>
            </div>
          </FormLayout>
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
        </form>

      </>
    );
  };

  const RecoverForm = ({ token }: RecoverElementParams) => {
    // const [step, setStep] = useState(activeStep);
    const [loading, setLoading] = useState(false);

    const recoverValidationForm = yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    });

    const recoverInitialValues: FormikValues = {
      email: "",
    };

    const onRecoverSubmit = (values: FormikValues) => {
      const { email } = values;
      setrecoverPasswordEmailRequist(email);
      setLoading(true);
      AuthService.forgotPassword(email)
        .then((res) => {

          setLoading(false);
          setAuthStep("success");
          console.log(res);
          sessionStorage.setItem("test_token", res.data?.test_token);
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid email")

          setLoading(false);
        });
    };

    const recoverFormik = useFormik({
      initialValues: recoverInitialValues,
      validationSchema: recoverValidationForm,
      onSubmit: onRecoverSubmit,
    });

    const newPasswordValidationForm = yup.object({
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
      confirm: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
    });

    const newPasswordInitialValues: ResetPasswordParams = {
      password: "",
      confirm: "",
    };

    if (typeof window !== 'undefined') {
      var urlToken = window.location.search;
    }
    const [recoverPassword, { isLoading: isRecoverPasswordLoading }] = api.useRecoverPasswordMutation();

    const onNewPasswordSubmit = async (values: ResetPasswordParams) => {
      const { password } = values;
      let token = urlToken.split('=')[1];

      // setLoading(true);
      // let test_token = sessionStorage.getItem("test_token");
      // let token = urlToken.split('=')[1]
      // // console.log(test_token);
      // if (!token) return;
      // AuthService.resetPassword({ password, token: token })
      //   .then((res) => {
      //     setLoading(false);
      //     console.log(res);
      //     router.push("/auth");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setLoading(false);

      //     dispatch(
      //       showFeedback({
      //         show: true,
      //         type: "error",
      //       })
      //     );
      //   });
      setLoading(true);
      try {
        const result = await recoverPassword({
          token,
          new_password: password
        }).unwrap()
        if (result.success) {
          setpasswordSuccessfullyChanged(true);
          {i18next.language == "ge"?
          setSnackMessage("პაროლი წარმატებით განახლდა")
          :
          setSnackMessage("Password successfully updated")
          }
          setOpenSnack(true);
          setsnackMsgStatus('success');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setpasswordSuccessfullyChanged(false);
        {i18next.language == "ge"?
        setSnackMessage("მოხდა შეცდომა, გთხოვთ სცადოთ მოგვიანებით!")
        :
        setSnackMessage("Error, please try again later")
        }
        setOpenSnack(true);
        setsnackMsgStatus('error');
        console.log(error)
        
      }
    };

    const newPasswordFormik = useFormik({
      initialValues: newPasswordInitialValues,
      validationSchema: newPasswordValidationForm,
      onSubmit: onNewPasswordSubmit,
    });

    return (
      <>
        {authStep === "email" ? (
          <>
            <Title>{t('resetPassword')}</Title>
            <Text>
            {t('enterEmail')}
            </Text>
            <form onSubmit={recoverFormik.handleSubmit}>
              <FormLayout>
                <InputStyle
                  placeholder={t('email')}
                  id="email"
                  name="email"
                  value={recoverFormik.values.email}
                  onChange={recoverFormik.handleChange}
                  invalid={
                    recoverFormik.touched.email && recoverFormik.errors.email
                  }
                />
                <br />
                <Button type="submit" disabled={loading}>
                {t('send')}
                </Button>
              </FormLayout>
            </form>
          </>
        ) : authStep === "success" ? (
          <Success />
        ) : null}

        {authStep === "change-password" ? (
          <>
            {passwordSuccessfullyChanged === true ? (
              <>
                <Title>{t('passwordSuccessfullyUpdated')}</Title>
                <br />
                <Link href="/auth">
                  <BackToMainPageStyle onClick={() => setRecover(false)}>
                  {t('authorize')}
                  </BackToMainPageStyle>
                </Link>
             
              </>
            ) :
              <form onSubmit={newPasswordFormik.handleSubmit}>
                <FormLayout>
                  <Title>{t('enterNewPassword')}</Title>
                  <PasswordInputWrapperTest
                    placeholder={t('newPassword')}
                    id="password"
                    name="password"
                    value={newPasswordFormik.values.password}
                    onChange={newPasswordFormik.handleChange}
                    invalid={
                      newPasswordFormik.touched.password &&
                      newPasswordFormik.errors.password
                    }
                  />
                  <PasswordInputWrapperTest
                    placeholder={t('repeatPassword')}
                    id="confirm"
                    name="confirm"
                    value={newPasswordFormik.values.confirm}
                    onChange={newPasswordFormik.handleChange}
                    invalid={
                      newPasswordFormik.touched.confirm &&
                      newPasswordFormik.errors.confirm
                    }
                  />
                  <Button type="submit" disabled={loading}>
                    პაროლის შეცვლა
                  </Button>
                </FormLayout>
              </form>
            }
          </>
        ) : null}

      </>
    );
  };

  const Register = () => {
    const [step, setStep] = useState("personal-info");
    const [loading, setLoading] = useState(false);
    const [popOnCLose, setPopOnCLose] = useState(true);


    const validationSchema = yup.object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      phone: yup.string().required("Phone is required"),
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
      confirm: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
      agreed: yup
        .boolean()
        .oneOf([true], "You Need to agree to terms and conditions"),
    });
    const initialValues: FormikValues = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirm: "",
      agreed: false,
    };

    type RegisterResponse = {
      data: string;
      [x: string]: any;
    };

    const onSubmit = async (values: FormikValues) => {
      setLoading(true);
      console.log(values);
      const { firstName, lastName, phone, email, password } = values;
      AuthService.register({ firstName, lastName, phone, email, password })
        .then((res: RegisterResponse) => {
          setStep("add-address");
          setPopOnCLose(false);
          const { data } = res;
          AuthService.setAccessToken(data, dispatch);
          const jwt = AuthService.decodeJwt();
          console.log(data, jwt);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          dispatch(
            showFeedback({
              show: true,
              type: "error",
            })
          );

          console.log(err);
        });
    };

    const formik = useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit: onSubmit,
    });

    const addressValidationSchema = yup.object({
      address: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
      state: yup.string().required(),
      zip: yup.string().required(),
      full_name: yup.string().required(),
    });

    const {t, i18n} = useTranslation();

    const initialAddressValues: AddAddressParams = {
      address: "",
      city: "",
      country: "საქართველო/Georgia",
      state: "",
      zip: "",
      full_name: "",
    };




    const addressSubmit = (values: AddAddressParams) => {

      setLoading(true);
      console.log(values);
      AuthService.addAddress(values)
        .then((res: any) => {
          // setStep('add-address');
          const { data } = res;
          console.log(data);
          setLoading(false);
          window.location.replace("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          // dispatch(
          //   showFeedback({
          //     show: true,
          //     type: "error",
          //   })
          // );
        });
    };

    const addressFormik = useFormik({
      initialValues: initialAddressValues,
      validationSchema: addressValidationSchema,
      onSubmit: addressSubmit,
    });

    // <div>{JSON.stringify(formik.errors)}</div>

    return (
      <>
        {step === "personal-info" && (
          <>

            <Title>{t('registration')}</Title>
            <Text>
            {t('enterCredentials')}
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <FormLayout>
                <InputStyle
                  placeholder={t('name')}
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  invalid={formik.touched.firstName && formik.errors.firstName}
                />
                <InputStyle
                  placeholder={t('surname')}
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  invalid={formik.touched.lastName && formik.errors.lastName}
                />
                <InputStyle
                  placeholder={t('email')}
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  invalid={formik.touched.email && formik.errors.email}
                />
                <InputStyle
                  placeholder={t('mobile')}
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  invalid={formik.touched.phone && formik.errors.phone}
                />
                {/* <PasswordInputWrapper>
                <Input placeholder="პაროლი" type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  invalid={formik.touched.password && formik.errors.password}
                />
                <IconWrapper><EyeIcon width={'2.62rem'} /></IconWrapper>
              </PasswordInputWrapper>
              <PasswordInputWrapper>
                <Input placeholder="გაიმეორე პაროლი" type="password"
                  id="confirm"
                  name="confirm"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  invalid={formik.touched.confirm && formik.errors.confirm}
                />
                <IconWrapper><EyeIcon width={'2.62rem'} /></IconWrapper>
              </PasswordInputWrapper> */}
                <PasswordInputWrapperTest
                  placeholder={t('offeredCategories')}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  invalid={formik.touched.password && formik.errors.password}
                />
                <PasswordInputWrapperTest
                  placeholder={t('repeatPassword')}
                  id="confirm"
                  name="confirm"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  invalid={formik.touched.confirm && formik.errors.confirm}
                />
                <Label>
                  <CheckStyle
                    id="agreed"
                    name="agreed"
                    checked={formik.values.agreed}
                    onChange={formik.handleChange}
                  />
                  <LabelTextStyle>{t('agree')}</LabelTextStyle>
                </Label>
                <Button disabled={loading} type="submit">
                {t('registration')}
                </Button>
              </FormLayout>
            </form>
          </>
        )}
        {step === "add-address" && (
          <>
            <Title>
            {t('addAddress')}
            </Title>
            <Text>
            {t('enterCredentials')}
            </Text>
            <form onSubmit={addressFormik.handleSubmit}>
              <FormLayout>
                <InputStyle
                  placeholder={t('street')}
                  name="address"
                  value={addressFormik.values.address}
                  onChange={addressFormik.handleChange}
                  invalid={
                    addressFormik.touched.address &&
                    addressFormik.errors.address
                  }
                />
                <DoubleInputWrapper>
                  <InputStyle
                    placeholder={t('city')}
                    name="city"
                    value={addressFormik.values.city}
                    onChange={addressFormik.handleChange}
                    invalid={
                      addressFormik.touched.city && addressFormik.errors.city
                    }
                  />
                  <InputStyle
                    placeholder={t('country')}
                    name="country"
                    value={addressFormik.values.country}
                    // onChange={addressFormik.handleChange}
                    invalid={
                      addressFormik.touched.country &&
                      addressFormik.errors.country
                    }
                  />
                </DoubleInputWrapper>
                <InputStyle
                  placeholder={t('region')}
                  name="state"
                  value={addressFormik.values.state}
                  onChange={addressFormik.handleChange}
                  invalid={
                    addressFormik.touched.state && addressFormik.errors.state
                  }
                />
                <InputStyle
                  placeholder={t('zipCode')}
                  name="zip"
                  value={addressFormik.values.zip}
                  onChange={addressFormik.handleChange}
                  invalid={
                    addressFormik.touched.zip && addressFormik.errors.zip
                  }
                />
                <InputStyle
                  placeholder={t('receiver')}
                  name="full_name"
                  value={addressFormik.values.full_name}
                  onChange={addressFormik.handleChange}
                  invalid={
                    addressFormik.touched.full_name && addressFormik.errors.full_name
                  }
                />
                <Button type="submit" disabled={loading} >
                {t('addAddress')}
                </Button>
              </FormLayout>
            </form>
          </>
        )}
      </>
    );
  };

  const Success = () => {

    return (
      <>
        <Title>
        {t('successfullySent')}
        </Title>
        <Text>
        {t('pleaseCheck')}
        </Text>
        <SendedEmailDiv>
          <div style={{ display: "flex" }}>
            <EmailIconStyle src="/assets/mail.png" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "1.6rem",
                color: "var(--text-color)",
              }}
            >
              <UserEmailStyle>{recoverPasswordEmailRequist}</UserEmailStyle>
              <DateStyle>{passwordRecoverRequistDate}</DateStyle>
            </div>
          </div>
          <Link href="/">
            <BackToMainPageStyle>
            {t('backMain')}
            </BackToMainPageStyle>
          </Link>
        </SendedEmailDiv>
      </>
    );
  };

  return (
    <>
      <SectionWrapper className={styles.sectionWrapper}>
        <TabsWrapper className={styles.tabsWrapper}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
            style={{ width: "100%" }}
          >
            <TabList className={styles.tabList}>
              <Tab>
                <TabItem selected={tabIndex === 0} onClick={() => setRecover(false)}>{t('authorize')}</TabItem>
              </Tab>
              <Tab>
                <TabItem selected={tabIndex === 1}>{t('createAccount')}</TabItem>
              </Tab>
            </TabList>
            <TabPanelsWrapper className={styles.tabPanelsWrapper}>
              <TabPanel className={styles.tabContent}>
                {!recover ? <AuthForm /> : <RecoverForm token={token} />}
              </TabPanel>
              <TabPanel className={styles.tabContent}>
                <Register />
              </TabPanel>
            </TabPanelsWrapper>
          </Tabs>
        </TabsWrapper>
        <ImageWithTextWrapper>
          <Img src={"/assets/auth.png"} />
          <ImgTitle>
          {t('subscribeForNews')}
          </ImgTitle>
          <ImgText>
          {t('addMail')}
          </ImgText>
          <IWBWrapper>
            <IWBInput placeholder={t('email')} />
            <IWBButton lowercase>{t('subscribe')}</IWBButton>
          </IWBWrapper>
        </ImageWithTextWrapper>
      </SectionWrapper>
    </>
  );
};

export default Auth;
