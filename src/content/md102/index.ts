// ============================================================================
// MD-102 Content Index
// ============================================================================

// Topics and Tracks
export { md102Certification, md102Topics, md102Tracks } from "./topics";

// Individual Modules
export { appDeploymentModule } from "./modules/app-deployment";
export { autopilotModule } from "./modules/autopilot";
export { compliancePoliciesModule } from "./modules/compliance-policies";
export { deviceConfigurationModule } from "./modules/device-configuration";
export { deviceEnrollmentModule } from "./modules/device-enrollment";
export { securityBaselinesModule } from "./modules/security-baselines";
export { updateManagementModule } from "./modules/update-management";

// All modules combined
import type { LearningModule } from "../types";
import { appDeploymentModule } from "./modules/app-deployment";
import { autopilotModule } from "./modules/autopilot";
import { compliancePoliciesModule } from "./modules/compliance-policies";
import { deviceConfigurationModule } from "./modules/device-configuration";
import { deviceEnrollmentModule } from "./modules/device-enrollment";
import { securityBaselinesModule } from "./modules/security-baselines";
import { updateManagementModule } from "./modules/update-management";

export const md102LearningModules: LearningModule[] = [
  autopilotModule,
  deviceEnrollmentModule,
  compliancePoliciesModule,
  deviceConfigurationModule,
  appDeploymentModule,
  securityBaselinesModule as unknown as LearningModule,
  updateManagementModule as unknown as LearningModule,
];

// Module lookup by slug
export const md102ModuleBySlug = new Map<string, LearningModule>(
  md102LearningModules.map((m) => [m.slug, m]),
);

// Module lookup by ID
export const md102ModuleById = new Map<string, LearningModule>(
  md102LearningModules.map((m) => [m.id, m]),
);
