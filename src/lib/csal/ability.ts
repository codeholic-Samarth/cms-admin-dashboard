import { AbilityBuilder } from "@casl/ability";

import { AppAbility, AppAbilityClass, Subjects } from "./csal";

/**
 * Build CASL ability from permissions
 * @param permissions raw permission codenames
 * @param isSuperAdmin whether user is super admin
 */
export function defineAbilityFor(
  permissions: string[],
  isSuperAdmin: boolean
): AppAbility {
  const { can, build } = new AbilityBuilder(AppAbilityClass);

  // SUPER ADMIN → FULL ACCESS
  if (isSuperAdmin) {
    can("manage", "all");
    return build();
  }

  // Normal permission parsing
  permissions.forEach((perm) => {
    /**
     * Supported formats:
     * can_read_user
     * can_update_subscription
     * create_role
     */
    let action = "";
    let subject = "";

    if (perm.startsWith("can_")) {
      const [, actionRaw, subjectRaw] = perm.split("_");
      action = actionRaw;
      subject =
        subjectRaw.charAt(0).toUpperCase() +
        subjectRaw.slice(1);
    } else {
      const [actionRaw, subjectRaw] = perm.split("_");
      action = actionRaw;
      subject =
        subjectRaw.charAt(0).toUpperCase() +
        subjectRaw.slice(1);
    }

    can(action as any, subject as Subjects);
  });

  return build();
}
