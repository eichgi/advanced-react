import {list} from "@keystone-next/keystone/schema";
import {text, password, relationship} from "@keystone-next/fields";

export const User = list({
  //access:
  //ui:
  fields: {
    name: text({isRequired: true}),
    email: text({isRequired: true, isUnique: true}),
    password: password(/*{isRequired: true, minLength: 6}*/),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: {fieldMode: 'hidden'},
        itemView: {fieldMode: 'read'},
      }
    }),
    //Todo: add roles and orders
  }
});