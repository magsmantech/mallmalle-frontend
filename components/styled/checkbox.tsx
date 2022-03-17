import styled from "styled-components";

export const Input = styled.input.attrs({ type: "checkbox" })`
    height: 2.2rem;
    width: 2.2rem;
    background-color: #DBDBDB;
    border-radius: .6rem;
`;

export const Label = styled.label`
  align-items: center;
  display: flex;
  gap: .8rem;
  margin-bottom: .8rem;
`

export const LabelText = styled.span`
  color: var(--text-color);
  font-size: 1.8rem;
  font-family: 'helvetica';
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 0.65;
}

`;
