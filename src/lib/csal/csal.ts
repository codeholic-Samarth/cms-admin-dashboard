import { PureAbility, AbilityClass } from "@casl/ability";

/**
 * All actions supported by your system
 * These MUST match backend permission naming
 */
export type Actions =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "assign"
  | "unassign"
  | "deactivate"
  | "manage"; // optional (for super-admin)

/**
 * All subjects (domains) in your app
 * Add here when backend adds new permission domains
 */
export type Subjects =
  | "User"
  | "Role"
  | "Permission"
  | "Subscription"
  | "all"; // required if you use manage:all

/**
 * CASL Ability type
 */
export type AppAbility = PureAbility<[Actions, Subjects]>;

/**
 * Ability class instance (required by CASL)
 */
export const AppAbilityClass =
  PureAbility as AbilityClass<AppAbility>;