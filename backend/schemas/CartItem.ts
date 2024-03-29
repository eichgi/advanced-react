import {list} from "@keystone-next/keystone/schema";
import {integer, relationship, select, text} from "@keystone-next/fields";

export const CartItem = list({
  //access:
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    }
  },
  fields: {
    //TODO: custom label in here
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ref: 'Product'}),
    user: relationship({ref: 'User.cart'}),
  }
});