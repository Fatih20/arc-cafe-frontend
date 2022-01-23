import styled from 'styled-components';

import store1 from '../../assets/store-1.jpg';
import store2 from '../../assets/store-2-resized.png';
import store3 from '../../assets/store-3-resized.png';

interface IStoreImagesProps {
  column: string;
  row: string;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  /* grid-template-columns: 1fr;
  grid-template-rows: repeat(8, calc()); */
  gap: 2rem;
  padding: 0.5rem min(2rem, 5%);

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
  }
`;

const TextContainer = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  grid-column: 3/5;
  grid-row: 1;
  max-width: 20rem;

  & > h2 {
    color: #8c7466;
    font-size: 1.5rem;
  }

  & > p {
  }
`;

const StoreImages = styled.img<IStoreImagesProps>`
  height: auto;
  width: 100%;
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
`;

function Store() {
  return (
    <Main id="Store">
      <TextContainer>
        <h2>Our Store</h2>
        <p>
          Jl. Braga No. 21, Braga, Kecamatan Sumur Bandung, Kota Bandung, Jawa
          Barat 40111
        </p>
      </TextContainer>
      <StoreImages src={store1} column={'1/3'} row={'1/3'} />
      <StoreImages src={store2} column={'1/3'} row={'3/5'} />
      <StoreImages src={store3} column={'3/5'} row={'2/5'} />
    </Main>
  );
}

export default Store;
