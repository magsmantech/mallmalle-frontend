import styled from "styled-components";
import Responsive from "../../config/Responsive";

export const Input = styled.input.attrs({ type: "checkbox" })`
    height: 22px;
    width: 22px;
    background-color: #DBDBDB;
    border-radius: 6px;
`;

export const Label = styled.label`
  align-items: center;
  display: flex;
  gap: .8rem;
  margin-bottom: .8rem;
`

export const LabelText = styled.span`
  color: var(--text-color);
  font-size: 18px;
  font-family: 'helvetica';
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 0.65;
}
  /* res */
  ${Responsive.mobile} {
    font-size: 14px;
  }
`;
