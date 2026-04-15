// ============================================================================
// MS-102 Content Index
// ============================================================================

// Individual Modules
export { entraSecurityModule } from "./modules/entra-security";
export { tenantManagementModule } from "./modules/tenant-management";
export { userManagementModule } from "./modules/user-management";

// All modules combined
import type { LearningModule } from "../types";
import { entraSecurityModule } from "./modules/entra-security";
import { tenantManagementModule } from "./modules/tenant-management";
import { userManagementModule } from "./modules/user-management";

export const ms102LearningModules: LearningModule[] = [
  tenantManagementModule,
  userManagementModule as LearningModule,
  entraSecurityModule as LearningModule,
];

// Module lookup by slug
export const ms102ModuleBySlug = new Map<string, LearningModule>(
  ms102LearningModules.map((m) => [m.slug, m]),
);

// Module lookup by ID
export const ms102ModuleById = new Map<string, LearningModule>(
  ms102LearningModules.map((m) => [m.id, m]),
);
