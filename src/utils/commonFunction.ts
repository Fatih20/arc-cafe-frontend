import { ICartItem } from "../types";

export function regroupItems(cart : ICartItem[], setOfUniqueItemNameAndId : Set<string>, groupedItemStateSetter : (updateSet: any) => void) {
    let intermediateGroupedItems = {} as any;
    setOfUniqueItemNameAndId.forEach((uniqueItemNameAndId) => {
      const [uniqueItemName, uniqueItemId] = uniqueItemNameAndId.split('|||');
      intermediateGroupedItems[uniqueItemName] = cart.filter(
        (menuItems) => menuItems.menu.name === uniqueItemName
      );
    });
    groupedItemStateSetter(intermediateGroupedItems);
}

export function updateItemsSet(cart : ICartItem[], setOfUniqueItemNameAndIdStateSetter : (updatedSet : any) => void) {
    let intermediateSetOfUniqueItemNameAndId = new Set([] as string[]);
    cart.forEach((cartItem) => {
        intermediateSetOfUniqueItemNameAndId.add(`${cartItem.menu.name.toString()}|||${cartItem.menu.id.toString()}`);
      });
      setOfUniqueItemNameAndIdStateSetter(intermediateSetOfUniqueItemNameAndId);
}

