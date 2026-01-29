import { useCan } from "./useCan";

export function usePermissions() {
  const ability = useCan();

  return {
    // User
    canReadUser: ability?.can("read", "User") ?? false,
    canCreateUser: ability?.can("create", "User") ?? false,
    canUpdateUser: ability?.can("update", "User") ?? false,
    canDeleteUser: ability?.can("delete", "User") ?? false,

    // Subscription
    canReadSubscription: ability?.can("read", "Subscription") ?? false,
    canUpdateSubscription: ability?.can("update", "Subscription") ?? false,
    canCreateSubscription: ability?.can("create", "Subscription") ?? false,
    canDeleteSubscription: ability?.can("delete", "Subscription") ?? false,

    // Role
    canReadRole: ability?.can("read", "Role") ?? false,
    canCreateRole: ability?.can("create", "Role") ?? false,
    canUpdateRole: ability?.can("update", "Role") ?? false,
    canDeleteRole: ability?.can("delete", "Role") ?? false,
  };
}