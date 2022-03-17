

import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  title?: string,
  text?: string,
  className?: string,
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: rgba(0, 0, 0, .9);
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
type StyledCheckBoxProps = {
    checked?: boolean, 
};

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 2.7rem;
  height: 2.7rem;
  background: ${(props: StyledCheckBoxProps) => (props.checked ? 'white' : 'rgba(0, 0, 0, .5)')};
  border-radius: 7px;
  transition: all 150ms;
/* 
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  } */

  ${Icon} {
    visibility: ${(props: StyledCheckBoxProps) => (props.checked ? 'visible' : 'hidden')};
  }
`

type CheckBoxType = {
    className?: string,
    checked?: boolean,
    [p: string]: any,
};
const Checkbox = ({ className, checked=false, ...props }: CheckBoxType) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

const Label = styled.div`
    color: white;
    font-size: 1.4rem;
    font-weight: 600;
    /* font-family: fira-go; */
`;

const Text = styled.div`
    color: white;
    font-size: 1.4rem;
    font-weight: 400;
    opacity: 0.8;
    line-height: 1.35;
    /* font-family: fira-go; */
`;


const Feedback = ({ title, text, className }: Props) => {
    const [checked, setChecked] = useState(true);
    return (
        <>
        <div className={className}>
            {/* <Label> */}
            <label>
            <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            {/* <span>ascasc</span> */}
            </label>
            <div style={{marginLeft: '1.4rem'}}>
                <Label style={{marginBottom: '.6rem'}}>
                    პროდუქტი წარმატებით დაემატა კალათაში
                </Label>
                <Text >
                    <div>
                        თქვენს კალათაში დამატებული
                    </div>
                    <div>
                        პროდუქტების სანახავად 
                        <span style={{textDecoration: 'underline', cursor: 'pointer', fontWeight: 500}}>დააჭირეთ აქ</span>
                    </div>
                </Text>
            </div>
                {/* <span style={{ marginLeft: 8 }}>პროდუქტი წარმატებით დაემატა კალათაში</span>
            </Label> */}

        </div>
        </>);
}

export default Feedback;

