import styled from "styled-components";

export const Wrapper = styled.div`
height: auto;
width: 100%;
box-sizing: border-box;
font-size: 1.8rem;
font-family: 'helvetica';
color: var(--text-color);
font-weight: 500;
`;

export const Item = styled.div`
display: flex;
align-items: center;
height: 4.8rem;
position: relative;
`;

export const RadioButtonLabel = styled.label`
position: absolute;
top: 25%;
left: .4rem;
width: 2.4rem;
height: 2.4rem;
border-radius: 50%;
/* background: white; */
background-color: #EDEDED;
/* border: .1rem solid #bebebe; */
`;
export const RadioButton = styled.input`
opacity: 0;
z-index: 1;
border-radius: 50%;
width: 2.4rem;
height: 2.4rem;
margin-right: 1.0rem;
&:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 1.2rem;
    height: 1.2rem;
    margin: .6rem;
    /* background: #eeeeee; */
  }
}
${(props) =>
        props.checked &&
        ` 
  &:checked + ${RadioButtonLabel} {
    background: #22D5AE;
    border: .1rem solid #22D5AE;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 1.2rem;
      height: 1.2rem;
      margin: .5rem;
      box-shadow: .1rem .3rem .3rem .1rem rgba(0, 0, 0, 0.1);
      background: white;
    }
  }
`}
`;