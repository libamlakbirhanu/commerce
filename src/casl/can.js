import { Ability, AbilityBuilder } from "@casl/ability";
import { store } from "../redux/store";

const ability = new Ability();

const checkAbility = (action, subject) => {
  return ability.can(action, subject);
};

store.subscribe(() => {
  let auth = store.getState().auth;

  auth?.user?.roles &&
    ability.update(defineRulesFor(auth?.user?.roles[0]?.name));
});

const defineRulesFor = (role) => {
  const { can, rules } = new AbilityBuilder();

  switch (role) {
    case "customer":
      can("manage", "all");
      break;
    case "vendor":
      can("manage", "store");
      break;
    default:
      break;
  }

  return rules;
};

export default checkAbility;
