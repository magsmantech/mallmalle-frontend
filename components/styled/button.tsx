import styled from "styled-components";
import Responsive from "../../config/Responsive";


type ButtonProps = {
  secondary?: boolean;
  lowercase?: boolean;
  disabled?: boolean;
};

const Button = styled.button`
  display: inline-flex;
  height: 77px;
  background-image: ${(props: ButtonProps) => props.secondary ? 'none' :
    props.disabled ? 'linear-gradient(to right, rgba(34, 213, 174, .4), rgba(58, 123, 213, .4))' : 'linear-gradient(to right, #22D5AE, #3A7BD5)'};
  /* background-color: ${(props: ButtonProps) => props.secondary ? 'white' : 'none'} */
  background-color: white;
  align-items: center;
  justify-content: center;
  color: ${({ secondary }: ButtonProps) => secondary ? '#424F60' : 'white'};
  font-size: 20px;
  font-family: 'helvetica';
  letter-spacing: .05rem;
  border: ${({ secondary }: ButtonProps) => secondary ? '.2rem solid rgba(0, 0, 0, 0.08)' : 'none'};
  border-radius: 14px;
  cursor: pointer;
  /* padding: 0 1.6rem; */
  /* font-family: 'BPG WEB 002 CAPS'; */
  text-transform: ${({ lowercase }: ButtonProps) => lowercase ? 'initial' : 'uppercase'};
  font-feature-settings: ${({ lowercase }: ButtonProps) => lowercase ? 'initial' : '"case" on'};
  font-weight: 600;
  pointer-events: ${(props: ButtonProps) => props.disabled ? 'none' : 'unset'};
  &:hover {
    background-image: ${(props: ButtonProps) => props.secondary ? 'none' : 'linear-gradient(to right, #22D5AE, #22D5AE)'};
  }
    ${Responsive.mobile} {
      height: 64px;
      font-size: 16px;
    }
`;

export default Button;