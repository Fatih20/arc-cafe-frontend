import { group } from 'console';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useCart from '../customHooks/useCart';
import useAddToCartIfLoggedIn from '../utils/addToCartIfLoggedIn';
import { deleteFromCart } from '../utils/api';

import { useMutation, useQueryClient } from 'react-query';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.h2`
  color: #8c7466;
  font-weight: 900;
  font-size: 1.5em;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 2.5em;
  }
`;

const ActualBasket = styled.div`
  display: flex;
  flex-direction: column;
`;

const BasketItem = styled.div`
  display: flex;
`;

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
              <BasketItem>
                <h3>{uniqueItemName}</h3>
                <button
                  onClick={() => {
                    deleteFromBasketAndUpdateCart(
                      groupedItems[uniqueItemName][
                        groupedItems[uniqueItemName].length - 1
                      ].id
                    );
                    regroupItems();
                  }}
                >
                  minus
                </button>
                <p>
                  {
                    cart.filter((menuItem) => {
                      return menuItem.menu.name === uniqueItemName;
                    }).length
                  }
                </p>
                <button onClick={() => addToBasketAndUpdateCart(uniqueItemId)}>
                  plus
                </button>
              </BasketItem>
            );
          })}
        </ActualBasket>
      </Main>
    );
  }
}
