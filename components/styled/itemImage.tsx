import styled from 'styled-components';
type Props = {
    backgroundImage: string,
};

export const ItemImage = styled.div`
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: 100%;
  transition: all 150ms ease-in-out;
  background-image: url(${(props: Props)=> props.backgroundImage});
  border-radius: 1.4rem;
  width: 100%;
  height: 30.7rem;

  &:hover {
    background-size: 110%;
  }
`;