import { group } from 'console';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCart from '../customHooks/useCart';
import useAddToCartIfLoggedIn from '../utils/addToCartIfLoggedIn';
import { deleteFromCart } from '../utils/api';

import { useMutation, useQueryClient } from 'react-query';
import { ICartItem } from '../types';

interface ICartItemProps {
  uniqueItemName: string;
  initialAmount: number;
  // setAmount: () => void;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 300px;
  padding: 1rem;
  width: 100%;

  @media (min-width: 600px) {
    max-width: 450px;
  }
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

const ActualBasket = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const BasketItemMain = styled.div`
  align-items: center;
  background-color: #fff;
  color: #8c7466;
  border: solid 2px #8c7466;
  border-radius: 0.1rem;
  display: flex;
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

const CheckOutButton = styled.button`
  background-color: #95c79d;
  border-radius: 0.1rem;
  color: white;
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

function CartItem({ uniqueItemName, initialAmount }: ICartItemProps) {
  const [value, setValue] = useState(initialAmount);
  return (
    <BasketItemMain>
      <BasketItemTitle>{uniqueItemName}</BasketItemTitle>
      <Spacer />
      <AmountContainer>
        <AddRemoveButton>-</AddRemoveButton>
        <AmountField value={value} />
        <AddRemoveButton>+</AddRemoveButton>
      </AmountContainer>
    </BasketItemMain>
  );
}

export default function Basket() {
  const navigate = useNavigate();
  const { cart, isLoading } = useCart(navigate);
  const [itemsSet, setItemsSet] = useState(new Set([] as string[]));
  const [justLoaded, setJustLoaded] = useState(false);
  const [groupedItems, setGroupedItems] = useState({} as any);
  const previousLoading = useRef(true);
  const queryClient = useQueryClient();

  const { addToCartIfLoggedIn } = useAddToCartIfLoggedIn(navigate);

  const { mutateAsync: addToBasketAndUpdateCart } = useMutation(
    addToCartIfLoggedIn,
    {
      onSuccess: () => queryClient.invalidateQueries('cart'),
    }
  );

  const { mutateAsync: deleteFromBasketAndUpdateCart } = useMutation(
    deleteFromCart,
    {
      onSuccess: () => queryClient.invalidateQueries('cart'),
    }
  );

  function updateItemsSet() {
    cart.forEach((cartItem) => {
      setItemsSet((prevItemsSet) => {
        prevItemsSet.add(
          `${cartItem.menu.name.toString()}|||${cartItem.menu.id.toString()}`
        );
        return prevItemsSet;
      });
    });
  }

  function changeJustLoaded(isActuallyLoading: boolean) {
    if (justLoaded === isActuallyLoading) {
      setJustLoaded((prevJustLoaded) => !prevJustLoaded);
    }
  }

  function regroupItems() {
    let intermediateGroupedItems = {} as any;
    itemsSet.forEach((uniqueItemNameAndId) => {
      const [uniqueItemName, uniqueItemId] = uniqueItemNameAndId.split('|||');
      intermediateGroupedItems[uniqueItemName] = cart.filter(
        (menuItems) => menuItems.menu.name === uniqueItemName
      );
    });
    setGroupedItems(intermediateGroupedItems);
  }

  useEffect(() => {
    regroupItems();
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
      updateItemsSet();
    }

    // console.log(groupedItems);

    return (
      <Main>
        <Title>YOUR BASKET</Title>
        <ActualBasket>
          {Array.from(itemsSet).map((uniqueItemNameAndId) => {
            const [uniqueItemName, uniqueItemId] =
              uniqueItemNameAndId.split('|||');
            // const eachItemsOfTheName = groupedItems[uniqueItemName];
            return (
              <CartItem
                uniqueItemName={uniqueItemName}
                initialAmount={
                  cart.filter(
                    (menuItem) => menuItem.menu.name === uniqueItemName
                  ).length
                }
              />
              // <BasketItem>
              //   <h3>{uniqueItemName}</h3>
              //   <button
              //     onClick={() => {
              //       deleteFromBasketAndUpdateCart(
              //         groupedItems[uniqueItemName][
              //           groupedItems[uniqueItemName].length - 1
              //         ].id
              //       );
              //       regroupItems();
              //     }}
              //   >
              //     minus
              //   </button>
              //   <p>
              //     {
              //       cart.filter((menuItem) => {
              //         return menuItem.menu.name === uniqueItemName;
              //       }).length
              //     }
              //   </p>
              //   <button onClick={() => addToBasketAndUpdateCart(uniqueItemId)}>
              //     plus
              //   </button>
              // </BasketItem>
            );
          })}
        </ActualBasket>
        <CheckOutButton>Go To Checkout</CheckOutButton>
      </Main>
    );
  }
}
