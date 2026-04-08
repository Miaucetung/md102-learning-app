/**
 * Layout Components Export
 * Central export for all reusable layout components
 */

// Page structure
export { PageHeader, type PageHeaderProps } from "./PageHeader";

// Learning metadata
export {
  Badge,
  ExamCallout,
  LearningObjectives,
  NextSteps,
  Prerequisites,
  type Difficulty,
  type ExamRelevance,
} from "./LearningMeta";

// Cards
export {
  ExamCard,
  LabCard,
  ModuleCard,
  Section,
  type ExamCardProps,
  type LabCardProps,
  type ModuleCardProps,
} from "./Cards";

// Navigation
export { ProgressStepper, StickyNav } from "./StickyNav";

// Learning Paths
export { LearningPathCard, PathOverview } from "./LearningPath";
