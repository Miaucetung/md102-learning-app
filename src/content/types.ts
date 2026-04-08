// ============================================================================
// MD-102 / MS-102 Learning Platform - Content Types
// ============================================================================
// These types define the structure of all learning content following
// cognitive science principles from the Linux/Azure Gold Standard.
// Content is immutable and read-only to prevent accidental modifications.
// ============================================================================

// ----------------------------------------------------------------------------
// Certification IDs
// ----------------------------------------------------------------------------

export type CertificationId = "md102" | "ms102";

// ----------------------------------------------------------------------------
// Core Question Types (Original Content - IMMUTABLE)
// ----------------------------------------------------------------------------

export interface QuestionOption {
  readonly key: string;
  readonly text: string;
  readonly isCorrect?: boolean;
}

export interface OriginalQuestion {
  readonly id: string;
  readonly number?: number;
  readonly question: string | readonly string[];
  readonly options: readonly QuestionOption[];
  readonly correctAnswers: readonly string[];
  readonly explanation?: string;
  readonly area?: string;
  readonly difficulty?: "easy" | "medium" | "hard";
  readonly type?: QuestionType;
  readonly references?: readonly string[];
}

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "yes-no"
  | "yes-no-matrix"
  | "dropdown-single"
  | "dropdown-multi"
  | "sequence"
  | "matching"
  | "hot-area";

// ----------------------------------------------------------------------------
// Block System Types (Cognitive Science Based)
// ----------------------------------------------------------------------------

/**
 * PredictionBlock - Activate prior knowledge
 * "What do you think happens if..."
 */
export interface PredictionBlock {
  readonly type: "prediction";
  readonly id?: string;
  readonly question: string;
  readonly options: readonly string[];
  readonly correctAnswer: string;
  readonly explanation: string;
  readonly skillTags?: readonly string[];
}

/**
 * ConceptBlock - Core theory explanation (chunked)
 */
export interface ConceptBlock {
  readonly type: "concept";
  readonly id?: string;
  readonly title: string;
  readonly content: string;
  readonly keyTakeaways?: readonly string[];
  readonly visualAid?: {
    readonly type: "diagram" | "flowchart" | "table" | "image";
    readonly description: string;
    readonly src?: string;
  };
  readonly skillTags?: readonly string[];
}

/**
 * ScenarioBlock - Real-world admin context
 * "As IT admin at Contoso..."
 */
export interface ScenarioBlock {
  readonly type: "scenario";
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly situation: string;
  readonly challenge: string;
  readonly options: readonly {
    readonly label: string;
    readonly isCorrect: boolean;
    readonly feedback: string;
  }[];
  readonly realWorldTip?: string;
  readonly skillTags?: readonly string[];
}

/**
 * GuidedDecisionBlock - Interactive decision tree
 * "Which solution would you choose?"
 */
export interface GuidedDecisionBlock {
  readonly type: "guided-decision";
  readonly id?: string;
  readonly title: string;
  readonly scenario: string;
  readonly steps: readonly {
    readonly question: string;
    readonly options: readonly {
      readonly label: string;
      readonly isCorrect: boolean;
      readonly nextStep?: number;
    }[];
    readonly explanation: string;
  }[];
  readonly summary: string;
  readonly skillTags?: readonly string[];
}

/**
 * PracticeBlock - Hands-on commands/steps
 */
export interface PracticeBlock {
  readonly type: "practice";
  readonly id?: string;
  readonly title: string;
  readonly instruction: string;
  readonly steps: readonly string[];
  readonly hints?: readonly string[];
  readonly expectedOutcome: string;
  readonly skillTags?: readonly string[];
}

/**
 * MistakeBlock - Common errors and how to avoid them
 * "A common error is..."
 */
export interface MistakeBlock {
  readonly type: "mistake";
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly mistakes: readonly {
    readonly wrong: string;
    readonly correct: string;
    readonly explanation: string;
    readonly consequence: string;
  }[];
  readonly skillTags?: readonly string[];
}

/**
 * ComparisonBlock - Compare technologies/approaches
 */
export interface ComparisonBlock {
  readonly type: "comparison";
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly {
    readonly name: string;
    readonly characteristics: readonly string[];
  }[];
  readonly keyDifferences: readonly {
    readonly aspect: string;
    readonly optionA: string;
    readonly optionB: string;
  }[];
  readonly recommendation?: string;
  readonly skillTags?: readonly string[];
}

/**
 * TerminalBlock - PowerShell/CLI simulation
 */
export interface TerminalBlock {
  readonly type: "terminal";
  readonly id?: string;
  readonly title: string;
  readonly description: string;
  readonly commands: readonly {
    readonly command: string;
    readonly output?: string;
    readonly explanation: string;
  }[];
  readonly tips?: readonly string[];
  readonly skillTags?: readonly string[];
}

/**
 * ExamTrapBlock - Certification pitfalls
 * "In the exam, watch out for..."
 */
export interface ExamTrapBlock {
  readonly type: "exam-trap";
  readonly id?: string;
  readonly title: string;
  readonly trapDescription: string;
  readonly commonMistake: string;
  readonly correctApproach: string;
  readonly examPhrasing: readonly string[];
  readonly skillTags?: readonly string[];
}

/**
 * SummaryBlock - Key takeaways
 */
export interface SummaryBlock {
  readonly type: "summary";
  readonly id?: string;
  readonly title: string;
  readonly keyPoints: readonly string[];
  readonly examRelevance?: {
    readonly weight: string;
    readonly frequentTopics: readonly string[];
  };
  readonly nextSteps?: readonly string[];
  readonly skillTags?: readonly string[];
}

/**
 * All block types union
 */
export type LearningBlock =
  | PredictionBlock
  | ConceptBlock
  | ScenarioBlock
  | GuidedDecisionBlock
  | PracticeBlock
  | MistakeBlock
  | ComparisonBlock
  | TerminalBlock
  | ExamTrapBlock
  | SummaryBlock;

// ----------------------------------------------------------------------------
// Learning Module Types (Complete Lesson Structure)
// ----------------------------------------------------------------------------

export interface LabStep {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly detailedInstructions?: readonly string[];
  readonly command?: string;
  readonly codeExample?: {
    readonly language: string;
    readonly code: string;
  };
  readonly expectedOutput?: string;
  readonly tip?: string;
  readonly warning?: string;
  readonly screenshot?: string;
}

export interface LabScenario {
  readonly slug: string;
  readonly title?: string;
  readonly description?: string;
  readonly environment?: string;
  readonly steps: readonly LabStep[];
  readonly validation?: string;
  readonly estimatedMinutes?: number;
}

export interface Checkpoint {
  readonly questionId: string;
  readonly order: number;
  readonly introText?: string;
}

export interface ModuleExplanation {
  readonly why: string;
  readonly how: string;
  readonly deepDive?: string;
  readonly commonQuestions?: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
}

export interface TransferTask {
  readonly title: string;
  readonly description: string;
  readonly expectedOutcome?: string;
  readonly hints?: readonly string[];
}

export interface LearningModule {
  readonly id: string;
  readonly slug: string;
  readonly title: string;

  // Cognitive Science Structure
  readonly realWorldProblem: string;
  readonly context: readonly string[];
  readonly blocks?: readonly LearningBlock[];
  readonly labScenario?: LabScenario;
  readonly checkpoints: readonly Checkpoint[];
  readonly explanation: ModuleExplanation;
  readonly transferTask?: TransferTask;

  // Metadata
  readonly topic: string;
  readonly track: string;
  readonly difficulty: "beginner" | "intermediate" | "advanced";
  readonly estimatedMinutes: number;
  readonly prerequisites: readonly string[];
  readonly relatedModules: readonly string[];
  readonly skillTags: readonly string[];
}

// ----------------------------------------------------------------------------
// Topic & Curriculum Types
// ----------------------------------------------------------------------------

export interface Subtopic {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed?: boolean;
  readonly keyPoints?: readonly string[];
  readonly detailedExplanation?: string;
  readonly realWorldExample?: string;
  readonly comparison?: string;
  readonly learningModuleId?: string;
}

export interface Topic {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
  readonly bgColor?: string;
  readonly weight: string;
  readonly estimatedTime: string;
  readonly totalLessons: number;
  readonly completedLessons: number;
  readonly track: string;
  readonly subtopics?: readonly Subtopic[];
}

export interface Track {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
  readonly order: number;
  readonly topics: readonly string[];
  readonly estimatedHours: number;
  readonly difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Certification {
  readonly id: string;
  readonly name: string;
  readonly code?: string;
  readonly fullName?: string;
  readonly description: string;
  readonly color?: string;
  readonly bgGradient?: string;
  readonly icon?: string;
  readonly passingScore?: number;
  readonly totalQuestions?: number;
  readonly examDuration?: string;
  readonly tracks: readonly Track[];
  readonly topics?: readonly Topic[];
  readonly totalTopics?: number;
  readonly estimatedHours?: number;
}

// ----------------------------------------------------------------------------
// User Progress Types
// ----------------------------------------------------------------------------

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly category:
    | "identity"
    | "security"
    | "device-management"
    | "app-management"
    | "compliance"
    | "troubleshooting";
  readonly level: 1 | 2 | 3 | 4 | 5;
  readonly maxLevel: 5;
  readonly xp: number;
  readonly xpToNextLevel: number;
}

export interface UserProgress {
  readonly completedModules: readonly string[];
  readonly completedCheckpoints: readonly string[];
  readonly completedLabs: readonly string[];
  readonly skills: readonly Skill[];
  readonly totalXP: number;
  readonly streakDays: number;
  readonly lastActivity: string;
}
