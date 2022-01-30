import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCart from '../customHooks/useCart';
import useAddToCartIfLoggedIn from '../utils/addToCartIfLoggedIn';
import useDeleteFromCartIfLoggedIn from '../utils/deleteFromCartIfLoggedIn';

import { useMutation, useQueryClient } from 'react-query';
import { ICartItem } from '../types';
import { regroupItemsWrapper, updateItemsSet } from '../utils/commonFunction';
import { BASE_URL } from '../routes';
import useRerouteIfUnauthorized from '../customHooks/useRerouteIfUnauthorized';

interface ICartItemProps {
  uniqueItemName: string;
  uniqueItemId: string;
  initialAmount: number;
  functionToSubtract: () => void;
  functionToAdd: () => void;
}

interface IHideInCertainCondition {
  display: boolean;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0 auto;
  max-width: 300px;
  padding: 1rem;
  width: 100%;

  @media (min-width: 600px) {
    max-width: 450px;
  }
`;

const ContainerForEmptyCartText = styled(Main)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;

  /* border: solid 1px black; */
`;

const Title = styled.h2`
  color: #8c7466;
  font-weight: 900;
  font-size: 1.5em;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 2.5em;
  }
`;

const EmptyCartText = styled(Title)`
  font-size: 1.25em;
  opacity: 0.5;
  @media (min-width: 600px) {
    font-size: 2em;
  }
`;

const ActualBasket = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const BasketItemMain = styled.div<IHideInCertainCondition>`
  align-items: center;
  background-color: #fff;
  color: #8c7466;
  border: solid 2px #8c7466;
  border-radius: 0.1rem;
  display: ${({ display }) => (display ? 'flex' : 'none')};
  flex-direction: column;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  gap: 0.5rem;
  padding: 0.5rem;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const BasketItemTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
`;

const AmountContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const AmountField = styled.input`
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  width: 3rem;

  /* border: solid 1px black; */
`;

const AddRemoveButton = styled.button`
  width: 1rem;
  border-radius: 0.1rem;
`;

const CheckOutButton = styled.button<IHideInCertainCondition>`
  background-color: #95c79d;
  border-radius: 0.1rem;
  color: white;
  display: ${({ display }) => (display ? 'initial' : 'none')};
  font-size: 1em;
  font-weight: 900;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 0.75rem;
`;

const Spacer = styled.div`
  flex-grow: 0;

  @media (min-width: 600px) {
    flex-grow: 1;
  }
`;

function CartItem({
  uniqueItemName,
  initialAmount,
  functionToAdd,
  functionToSubtract,
}: ICartItemProps) {
  const [value, setValue] = useState(initialAmount);
  const previousValue = useRef(initialAmount);

  useEffect(() => {
    if (previousValue.current >= value) {
      while (previousValue.current !== value) {
        previousValue.current = previousValue.current - 1;
        functionToSubtract();
      }
    } else {
      while (previousValue.current !== value) {
        previousValue.current = previousValue.current + 1;
        functionToAdd();
      }
    }
  }, [value]);

  return (
    <BasketItemMain display={value === 0 ? false : true}>
      <BasketItemTitle>{uniqueItemName}</BasketItemTitle>
      <Spacer />
      <AmountContainer>
        <AddRemoveButton onClick={() => setValue((prevValue) => prevValue - 1)}>
          -
        </AddRemoveButton>
        <AmountField
          value={value}
          type={'number'}
          step={1}
          min={0}
          max={50}
          readOnly={true}
        />
        <AddRemoveButton onClick={() => setValue((prevValue) => prevValue + 1)}>
          +
        </AddRemoveButton>
      </AmountContainer>
    </BasketItemMain>
  );
}

export default function Basket() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCart(navigate);
  const [itemsSet, setItemsSet] = useState(new Set([] as string[]));
  const [groupedItems, setGroupedItems] = useState({} as any);
  const [justLoaded, setJustLoaded] = useState(false);
  const previousLoading = useRef(true);
  const queryClient = useQueryClient();
  useRerouteIfUnauthorized();

  const { addToCartIfLoggedIn } = useAddToCartIfLoggedIn(navigate);
  const { deleteFromCartIfLoggedIn } = useDeleteFromCartIfLoggedIn(navigate);

  const { mutateAsync: addToBasketAndUpdate } = useMutation(
    addToCartIfLoggedIn,
    {
      onSuccess: () => queryClient.invalidateQueries('cart'),
    }
  );

  const { mutateAsync: deleteFromBasketAndUpdate } = useMutation(
    deleteFromCartIfLoggedIn,
    {
      onSuccess: () => queryClient.invalidateQueries('cart'),
    }
  );

  function changeJustLoaded(isActuallyLoading: boolean) {
    if (justLoaded === isActuallyLoading) {
      setJustLoaded((prevJustLoaded) => !prevJustLoaded);
    }
  }

  useEffect(() => {
    regroupItemsWrapper(cart, itemsSet, setGroupedItems);
  }, [itemsSet]);

  if (isLoading) {
    previousLoading.current = true;
    changeJustLoaded(true);
    return (
      <Main>
        <Title>YOUR BASKET</Title>
      </Main>
    );
  } else {
    changeJustLoaded(false);
    if (justLoaded !== previousLoading.current) {
      previousLoading.current = true;
      updateItemsSet(cart, ['name', 'id'], setItemsSet);
    }

    // console.log(groupedItems);

    if (cart.length === 0) {
      return (
        <Main>
          <Title>Your Basket</Title>
          <ContainerForEmptyCartText>
            <EmptyCartText>Delicious Coffee Not Found.</EmptyCartText>
          </ContainerForEmptyCartText>
          <CheckOutButton
            display={true}
            onClick={() => navigate(`${BASE_URL}/menu`)}
          >
            Go To Our Menu To Buy Them!
          </CheckOutButton>
        </Main>
      );
    } else {
      return (
        <Main>
          <Title>Your Basket</Title>
          <ActualBasket>
            {Array.from(itemsSet).map((uniqueItemNameAndId) => {
              const [uniqueItemName, uniqueItemId] =
                uniqueItemNameAndId.split('|||');
              // const eachItemsOfTheName = groupedItems[uniqueItemName];
              return (
                <CartItem
                  uniqueItemName={uniqueItemName}
                  uniqueItemId={uniqueItemId}
                  functionToAdd={async () => {
                    await addToBasketAndUpdate(uniqueItemId);
                  }}
                  functionToSubtract={async () =>
                    await deleteFromBasketAndUpdate(uniqueItemId)
                  }
                  initialAmount={
                    cart.filter(
                      (menuItem) => menuItem.menu.name === uniqueItemName
                    ).length
                  }
                />
              );
            })}
          </ActualBasket>
          <CheckOutButton
            display={cart.length === 0 ? false : true}
            onClick={() => navigate(`${BASE_URL}/checkout`)}
          >
            Go To Checkout
          </CheckOutButton>
        </Main>
      );
    }
  }
}
