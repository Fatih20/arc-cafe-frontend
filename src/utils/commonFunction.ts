import { ICartItem } from "../types";
import { menuItemIdentity } from "../types";


export function boughtItemsCreator () {

}

export function regroupItemsWrapper(cart : ICartItem[], setOfUniqueItemNameAndId : Set<string>, groupedItemStateSetter : (updateSet: any) => void) {
    groupedItemStateSetter(regroupItems(cart, setOfUniqueItemNameAndId));
    // console.log(intermediateGroupedItems);
}

export function regroupItems(cart : ICartItem[], setOfUniqueItemNameAndId : Set<string>) {
    let intermediateGroupedItems = {} as any;
    setOfUniqueItemNameAndId.forEach((uniqueItemNameAndId) => {
      const [uniqueItemName, uniqueItemId] = uniqueItemNameAndId.split('|||');
      intermediateGroupedItems[uniqueItemName] = cart.filter(
        (menuItems) => menuItems.menu.name === uniqueItemName
      );
    });
    return intermediateGroupedItems;
}

export function updateItemsSet(cart : ICartItem[],  whatIsEncoded : menuItemIdentity[], setOfUniqueItemNameAndIdStateSetter : (updatedSet : any) => void) {
    setOfUniqueItemNameAndIdStateSetter(createItemsSet(cart, whatIsEncoded))
}

export function createItemsSet(cart : ICartItem[], whatIsEncoded : menuItemIdentity[]) {
    let intermediateSetOfUniqueItemNameAndId = new Set([] as string[]);
    cart.forEach((cartItem) => {
        let encodedInformationArray : string[] = [];
        if (whatIsEncoded.includes("name")){
            encodedInformationArray.push(cartItem.menu.name)
        }
        if (whatIsEncoded.includes("id")){
            encodedInformationArray.push(cartItem.menu.id)

        }if (whatIsEncoded.includes("price")){
            encodedInformationArray.push((cartItem.menu.price).toString())
        }
        intermediateSetOfUniqueItemNameAndId.add(encodedInformationArray.join("|||"));
      });
      return intermediateSetOfUniqueItemNameAndId;
}



