import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../routes';

interface IGridBoxProps {
  column: string;
  isProfile?: boolean;
  isBill?: boolean;
  isPrice?: boolean;
  row: string;
}

interface IEndToEndTextContainerProps {
  isTotal?: boolean;
}

type boughtItems = {
  amount: number;
  name: string;
  price: number;
};

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  padding: 1.5rem min(2rem, 10%);
`;

const TotalsContainer = styled.div`
  column-gap: 1.5rem;
  display: grid;
  font-size: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(8, 1fr);
  row-gap: 1.5rem;
  width: 100%;

  @media (min-width: 600px) {
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 4fr 4fr 1fr;
  }
`;

const Title = styled.h2`
  align-self: flex-start;
  color: #8c7466;
  font-size: 1.5em;
  font-weight: 800;
`;

const GridContainer = styled.div<IGridBoxProps>`
  align-items: ${(props) => (props.isProfile ? 'flex-start' : 'center')};
  box-sizing: border-box;
  border: solid 2px black;
  display: flex;
  flex-direction: column;
  grid-area: ${({ isBill, isProfile, isPrice }) => {
    if (isBill) {
      return '1/1/5/2';
    } else if (isProfile) {
      return '5/1/7/2';
    } else if (isPrice) {
      return '7/1/9/2';
    }
  }};

  padding: ${(props) => (props.isBill ? '2.25rem 1.5rem' : '1.5rem')};

  @media (min-width: 600px) {
    grid-area: ${({ isBill, isProfile, isPrice }) => {
      if (isBill) {
        return '1/1/4/2';
      } else if (isProfile) {
        return '1/2/2/3';
      } else if (isPrice) {
        return '2/2/3/3';
      }
    }};
  }
`;

const CoreBill = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 1fr 4fr;
  grid-template-rows: repeat(4, 1fr);
`;

const BackButton = styled.button`
  background-color: #95c79d;
  border-radius: 0.1rem;
  color: white;
  font-size: 1em;
  font-weight: 900;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 0.75rem;
`;

const Name = styled.h2`
  align-self: flex-start;
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const BillTitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const BillTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
`;

const FormattedShortText = styled.p``;

const EndToEndTextContainer = styled.div<IEndToEndTextContainerProps>`
  display: flex;
  margin-bottom: ${(props) => (props.isTotal ? '2.25rem' : '0')};

  margin-top: ${(props) => (props.isTotal ? '0.75rem' : '0')};
  width: 100%;

  & > p {
    font-weight: ${(props) => (props.isTotal ? 'bold' : 'normal')};
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

export default function Checkout() {
  const navigate = useNavigate();

  const orders: boughtItems[] = [];

  function processCheckout() {
    navigate(`${BASE_URL}/checked`);
  }

  return (
    <Main>
      <Title>MY BASKET</Title>
      <TotalsContainer>
        <GridContainer isBill={true} column="1/2" row="1/4">
          <BillTitleContainer>
            <BillTitle>COFFEE HOUR</BillTitle>
            <FormattedShortText>
              Jl. Braga No. 21, Kota Bandung
            </FormattedShortText>
          </BillTitleContainer>

          <Spacer />
          <FormattedShortText>022 88885478</FormattedShortText>
          <FormattedShortText>coffeehour@cafe.co.id</FormattedShortText>
        </GridContainer>
        <GridContainer isProfile={true} column="2/3" row="1/2">
          <Name>DITRA AMADIA</Name>
          <FormattedShortText>ditraamadia@gmail.com</FormattedShortText>
          <FormattedShortText>082320881088</FormattedShortText>
          <FormattedShortText>
            Jl. Setra Dago No.27 Arcamanik
          </FormattedShortText>
          <Spacer />
          <FormattedShortText>member since 2022</FormattedShortText>
        </GridContainer>
        <GridContainer isPrice={true} column="2/3" row="2/3">
          <EndToEndTextContainer>
            <FormattedShortText>Subtotal</FormattedShortText>
            <Spacer />
            <FormattedShortText>Amount</FormattedShortText>
          </EndToEndTextContainer>
          <EndToEndTextContainer>
            <FormattedShortText>Shipping</FormattedShortText>
            <Spacer />
            <FormattedShortText>Amount</FormattedShortText>
          </EndToEndTextContainer>
          <EndToEndTextContainer>
            <FormattedShortText>Tax</FormattedShortText>
            <Spacer />
            <FormattedShortText>Amount</FormattedShortText>
          </EndToEndTextContainer>
          <EndToEndTextContainer isTotal={true}>
            <FormattedShortText>Total</FormattedShortText>
            <Spacer />
            <FormattedShortText>Amount</FormattedShortText>
          </EndToEndTextContainer>
          <BackButton onClick={processCheckout}>CHECKOUT</BackButton>
        </GridContainer>
      </TotalsContainer>
    </Main>
  );
}
