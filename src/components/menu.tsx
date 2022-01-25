import styled from 'styled-components';
import { useState } from 'react';

import Footer from './home/footer';

import logo from '../assets/coffeehour.png';
import flatWhite from '../assets/flat-white.png';
import espresso from '../assets/espresso.png';
import cappuccino from '../assets/cappucino.png';
import fries from '../assets/fries.png';
import macaron from '../assets/macaron.png';

type whatCanBeShown = 'all' | 'food' | 'coffee';

type compositionOfMenu = {
  name: string;
  percentage: number;
};

type menuItems = {
  type: 'food' | 'coffee';
  name: string;
  composition?: compositionOfMenu[];
  price: number;
  imageId: number;
};

const images = [espresso, cappuccino, flatWhite, fries, macaron];

const Main = styled.div`
  --menuImageOverlap: 7.5rem;
  --sidePadding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 var(--sidePadding);
`;

const Header = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
`;

const TitleContainer = styled.div`
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;

  /* border: solid 1px black; */
`;

const Title = styled.h2`
  color: #8c7466;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: 600px) {
    align-self: flex-end;
    font-size: 2.5rem;
    text-align: right;
  }
`;

const HeaderLogo = styled.img`
  display: inline-block;
  height: 1rem;
`;

const Navigation = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: 0.5rem;
`;

const NavigationButton = styled.a`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  gap: 0.25rem;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const BasketCounter = styled.div`
  align-items: center;
  aspect-ratio: 1/1;
  background-color: #f27070;
  border-radius: 50%;
  box-sizing: border-box;
  color: white;
  display: flex;
  height: auto;
  justify-content: center;
  width: 1rem;

  & p {
    font-size: 0.7em;
  }
`;

const ActualMenu = styled.div`
  --cardBaseWidth: 250px;
  --cardBaseGap: 1em;
  --totalSpaceForCardMinusGap: calc(100vw - 2 * var(--sidePadding));
  --amountOfCardInOneScreen: 1;
  --cardWidth: calc(
    (
        var(--totalSpaceForCardMinusGap) - (var(--amountOfCardInOneScreen) - 1) *
          var(--cardBaseGap)
      ) / var(--amountOfCardInOneScreen)
  );

  align-items: center;
  display: flex;
  flex-grow: 1;
  gap: var(--cardBaseGap);
  overflow: auto;
  padding-top: var(--menuImageOverlap);
  padding-bottom: 1rem;
  scroll-snap-type: mandatory;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgb(51, 51, 51);
  scroll-snap-points-x: repeat(var(--cardWidth));
  width: 100%;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #d7cdc7;
    border-radius: 1em;
  }

  &::-webkit-scrollbar-thumb {
    background: #8c7466;
    border-radius: 1em;
  }

  @media (min-width: 600px) {
    --amountOfCardInOneScreen: 2;
  }

  @media (min-width: 900px) {
    --amountOfCardInOneScreen: 4;
    --cardWidth: calc(
      (
          var(--totalSpaceForCardMinusGap) - (var(--amountOfCardInOneScreen)) *
            var(--cardBaseGap)
        ) / var(--amountOfCardInOneScreen)
    );
  }
`;

const MenuItemCard = styled.div`
  --normalPrimaryTextColor: #8c7466;
  --normalSecondaryTextColor: #8c7466;
  --hoveredPrimaryTextColor: #ffffff;
  --hoveredSecondaryTextColor: #194c2d;
  --normalBackground: #d7cdc7;
  --hoveredBackground: #478660;

  align-items: center;
  background-color: var(--normalBackground);
  box-sizing: border-box;
  border-radius: 1.25rem;
  color: var(--normalPrimaryTextColor);
  display: flex;
  flex-direction: column;
  height: 25rem;
  min-width: var(--cardWidth);
  scroll-snap-align: start;
  padding: 0 1.25rem 1.25rem 1.25rem;
  user-select: none;

  &:hover {
    background-color: var(--hoveredBackground);
    color: var(--hoveredPrimaryTextColor);
  }
`;

const MenuItemImage = styled.img`
  pointer-events: none;
  margin-top: calc(var(--menuImageOverlap) * -1);

  @media (min-width: 600px) {
    height: auto;
    width: 250px;
  }
`;
const MenuItemTitle = styled.h2`
  align-self: flex-start;
  font-size: 1.2em;
`;

const MenuItemPrice = styled.div`
  align-items: center;
  display: flex;
  font-size: 2em;

  & > *:nth-child(2) {
    font-size: 2em;
    font-weight: 800;
  }
`;

const CompositionContainer = styled.div`
  align-items: center;
  color: var(--normalSecondaryTextColor);
  display: flex;
  flex-direction: column;
  width: 100%;

  ${MenuItemCard}:hover > & {
    color: var(--hoveredSecondaryTextColor);
  }
`;

const AddToBasketButton = styled.button`
  background-color: var(--normalPrimaryTextColor);
  border-radius: 1.5rem;
  color: var(--normalBackground);
  font-size: 1em;
  font-weight: 900;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 0.75rem;

  ${MenuItemCard}:hover>& {
    background-color: var(--hoveredPrimaryTextColor);
    color: var(--hoveredBackground);
  }

  @media (min-width: 900px) {
    display: none;
    ${MenuItemCard}:hover>& {
      display: initial;
    }
  }
`;

const EndToEndTextContainer = styled.div`
  display: flex;
  width: 100%;
`;

function Menu() {
  const [whatIsShown, setWhatIsShown] = useState('all' as whatCanBeShown);

  function priceMaker(price: number) {
    return (
      <MenuItemPrice>
        <h2>Rp</h2>
        <h2>{price}</h2>
        <h2>k</h2>
      </MenuItemPrice>
    );
  }

  const menuContent: menuItems[] = [
    {
      name: 'Espresso',
      type: 'coffee',
      composition: [
        {
          name: 'Espresso',
          percentage: 20,
        },
      ],
      price: 23,
      imageId: 0,
    },
    {
      name: 'Espresso',
      type: 'coffee',
      composition: [
        {
          name: 'Espresso',
          percentage: 20,
        },
      ],
      price: 23,
      imageId: 0,
    },
    {
      name: 'Espresso',
      type: 'coffee',
      composition: [
        {
          name: 'Espresso',
          percentage: 20,
        },
      ],
      price: 23,
      imageId: 0,
    },
    {
      name: 'Espresso',
      type: 'coffee',
      composition: [
        {
          name: 'Espresso',
          percentage: 20,
        },
      ],
      price: 23,
      imageId: 0,
    },
    {
      name: 'Espresso',
      type: 'coffee',
      composition: [
        {
          name: 'Espresso',
          percentage: 20,
        },
      ],
      price: 23,
      imageId: 0,
    },
    {
      name: 'Espresso',
      type: 'coffee',
      composition: [
        {
          name: 'Espresso',
          percentage: 20,
        },
      ],
      price: 23,
      imageId: 0,
    },
  ];

  const shownMenuContent = menuContent.filter((menuItem) => {
    if (whatIsShown === 'all') {
      return true;
    } else {
      return menuItem.type === whatIsShown;
    }
  });
  return (
    <Main>
      <Header>
        <HeaderLogo src={logo} />
        <NavigationButton onClick={() => setWhatIsShown('all')}>
          ALL
        </NavigationButton>
        <NavigationButton onClick={() => setWhatIsShown('food')}>
          FOOD
        </NavigationButton>
        <NavigationButton onClick={() => setWhatIsShown('coffee')}>
          COFFEE
        </NavigationButton>
        <Spacer />
        <NavigationButton>
          <BasketCounter>
            <p>1</p>
          </BasketCounter>
          MY BASKET
        </NavigationButton>
      </Header>
      <TitleContainer>
        <Title>COFFEE IS</Title>
        <Title>A HUG IN A MUG</Title>
      </TitleContainer>
      <ActualMenu>
        {shownMenuContent.map((menuItem) => {
          return (
            <MenuItemCard>
              <MenuItemImage src={images[menuItem.imageId]} />
              <MenuItemTitle>{menuItem.name}</MenuItemTitle>
              <CompositionContainer>
                {menuItem.composition === undefined
                  ? null
                  : menuItem.composition.map((menuItemComposition) => {
                      return (
                        <EndToEndTextContainer>
                          <p>{menuItemComposition.name}</p>
                          <Spacer />
                          <p>{menuItemComposition.percentage}%</p>
                        </EndToEndTextContainer>
                      );
                    })}
              </CompositionContainer>
              <Spacer />
              {priceMaker(menuItem.price)}
              <AddToBasketButton>ADD TO BASKET</AddToBasketButton>
            </MenuItemCard>
          );
        })}
      </ActualMenu>

      <Footer />
    </Main>
  );
}

export default Menu;
