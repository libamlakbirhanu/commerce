import { Ability, AbilityBuilder } from "@casl/ability";
import { store } from "../redux/store";

const ability = new Ability();

const checkAbility = (action, subject) => {
  return ability.can(action, subject);
};

store.subscribe(() => {
  let auth = store.getState().auth;
  ability.update(defineRulesFor(auth?.user.role));
});

const defineRulesFor = (role) => {
  const { can, rules } = new AbilityBuilder();

  switch (role) {
    case "admin":
      can("manage", "all");
      break;
    case "manager":
      can("manage", "PurchaseOrder");
      can("manage", "Report");
      can("read", "Product");
      can("read", "Inventory");
      break;
    case "projectLead":
      can("manage", "Report");
      break;
    case "sales":
      can("manage", "SalesOrder");
      break;
    default:
      can("read", "all");
  }

  return rules;
};

export default checkAbility;
