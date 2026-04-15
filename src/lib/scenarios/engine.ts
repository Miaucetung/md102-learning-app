// ============================================================================
// Enterprise IT Training Platform - Scenario Engine
// ============================================================================
// Core engine for evaluating decisions and tracking scenario progress
// ============================================================================

import type {
  AttemptDecision,
  Consequence,
  DecisionPoint,
  EnterpriseScenario,
} from "@/types";

// ============================================================================
// Types
// ============================================================================

export interface ScenarioSession {
  scenarioId: string;
  attemptId: string;
  currentDecisionIndex: number;
  decisions: AttemptDecision[];
  totalScore: number;
  maxScore: number;
  startedAt: Date;
  status: "in-progress" | "completed";
}

export interface DecisionResult {
  isCorrect: boolean;
  isOptimal: boolean;
  score: number;
  consequence: Consequence;
  nextDecisionId: string | null;
  explanation: string;
}

export interface ScenarioCompletion {
  attemptId: string;
  scenarioId: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  decisions: AttemptDecision[];
  optimalDecisions: number;
  totalDecisions: number;
  timeSpentSeconds: number;
  feedback: CompletionFeedback;
}

export interface CompletionFeedback {
  grade: "excellent" | "good" | "fair" | "needs-improvement";
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendedNext: string[];
}

// ============================================================================
// Scenario Engine
// ============================================================================

export class ScenarioEngine {
  private scenario: EnterpriseScenario;
  private session: ScenarioSession | null = null;

  constructor(scenario: EnterpriseScenario) {
    this.scenario = scenario;
  }

  /**
   * Start a new scenario attempt
   */
  startSession(attemptId: string): ScenarioSession {
    const maxScore = this.calculateMaxScore();

    this.session = {
      scenarioId: this.scenario.id,
      attemptId,
      currentDecisionIndex: 0,
      decisions: [],
      totalScore: 0,
      maxScore,
      startedAt: new Date(),
      status: "in-progress",
    };

    return this.session;
  }

  /**
   * Get current session state
   */
  getSession(): ScenarioSession | null {
    return this.session;
  }

  /**
   * Get the current decision point
   */
  getCurrentDecision(): DecisionPoint | null {
    if (!this.session || this.session.status === "completed") {
      return null;
    }

    const decisionPoints = this.scenario.decisionPoints;
    if (this.session.currentDecisionIndex >= decisionPoints.length) {
      return null;
    }

    return decisionPoints[this.session.currentDecisionIndex];
  }

  /**
   * Submit a decision and get the result
   */
  submitDecision(
    decisionPointId: string,
    optionId: string,
    timeSpentSeconds: number,
  ): DecisionResult | null {
    if (!this.session || this.session.status === "completed") {
      return null;
    }

    // Find the decision point
    const decisionPoint = this.scenario.decisionPoints.find(
      (dp) => dp.id === decisionPointId,
    );
    if (!decisionPoint) {
      throw new Error(`Decision point not found: ${decisionPointId}`);
    }

    // Find the selected option
    const option = decisionPoint.options.find((o) => o.id === optionId);
    if (!option) {
      throw new Error(`Option not found: ${optionId}`);
    }

    // Get the consequence
    const consequence = this.scenario.consequences[option.consequenceId];
    if (!consequence) {
      throw new Error(`Consequence not found: ${option.consequenceId}`);
    }

    // Record the decision
    const decision: AttemptDecision = {
      decisionPointId,
      selectedOptionId: optionId,
      isOptimal: option.isOptimal,
      score: option.score,
      timeSpentSeconds,
      timestamp: new Date().toISOString(),
    };

    this.session.decisions.push(decision);
    this.session.totalScore += option.score;

    // Determine next decision
    if (option.nextDecisionId) {
      const nextIndex = this.scenario.decisionPoints.findIndex(
        (dp) => dp.id === option.nextDecisionId,
      );
      if (nextIndex !== -1) {
        this.session.currentDecisionIndex = nextIndex;
      }
    } else {
      // If no next decision, move to next sequential decision or complete
      this.session.currentDecisionIndex++;
    }

    // Check if scenario is complete
    if (
      this.session.currentDecisionIndex >=
        this.scenario.decisionPoints.length ||
      !option.nextDecisionId
    ) {
      // Could be complete if this was the last decision or it's a terminal option
      if (!option.nextDecisionId) {
        this.session.status = "completed";
      }
    }

    return {
      isCorrect: option.score > 0,
      isOptimal: option.isOptimal,
      score: option.score,
      consequence,
      nextDecisionId: option.nextDecisionId,
      explanation: consequence.technicalReason,
    };
  }

  /**
   * Complete the scenario and get final results
   */
  completeScenario(): ScenarioCompletion | null {
    if (!this.session) {
      return null;
    }

    this.session.status = "completed";
    const totalTimeSeconds = Math.floor(
      (new Date().getTime() - this.session.startedAt.getTime()) / 1000,
    );

    const optimalDecisions = this.session.decisions.filter(
      (d) => d.isOptimal,
    ).length;
    const percentage = Math.round(
      (this.session.totalScore / this.session.maxScore) * 100,
    );

    const feedback = this.generateFeedback(
      percentage,
      optimalDecisions,
      this.session.decisions.length,
    );

    return {
      attemptId: this.session.attemptId,
      scenarioId: this.scenario.id,
      totalScore: this.session.totalScore,
      maxScore: this.session.maxScore,
      percentage,
      decisions: this.session.decisions,
      optimalDecisions,
      totalDecisions: this.session.decisions.length,
      timeSpentSeconds: totalTimeSeconds,
      feedback,
    };
  }

  /**
   * Calculate maximum possible score
   */
  private calculateMaxScore(): number {
    // Sum of max scores for each decision point
    return this.scenario.decisionPoints.reduce((sum, dp) => {
      const maxOption = dp.options.reduce((max, opt) =>
        opt.score > max.score ? opt : max,
      );
      return sum + maxOption.score;
    }, 0);
  }

  /**
   * Generate feedback based on performance
   */
  private generateFeedback(
    percentage: number,
    optimalCount: number,
    totalCount: number,
  ): CompletionFeedback {
    let grade: CompletionFeedback["grade"];
    let summary: string;

    if (percentage >= 90) {
      grade = "excellent";
      summary =
        "Outstanding performance! You demonstrated expert-level understanding of this scenario.";
    } else if (percentage >= 75) {
      grade = "good";
      summary =
        "Good job! You handled this scenario well with some room for optimization.";
    } else if (percentage >= 50) {
      grade = "fair";
      summary =
        "You completed the scenario but some decisions could be improved. Review the solution path.";
    } else {
      grade = "needs-improvement";
      summary =
        "This scenario presented challenges for you. We recommend reviewing the concepts and trying again.";
    }

    // Analyze decisions for strengths and improvements
    const strengths: string[] = [];
    const improvements: string[] = [];

    for (const decision of this.session?.decisions || []) {
      const dp = this.scenario.decisionPoints.find(
        (d) => d.id === decision.decisionPointId,
      );
      const option = dp?.options.find(
        (o) => o.id === decision.selectedOptionId,
      );

      if (decision.isOptimal) {
        strengths.push(`Optimal decision at: ${dp?.question.slice(0, 50)}...`);
      } else if (option && option.score < 50) {
        improvements.push(`Review decision: ${dp?.question.slice(0, 50)}...`);
      }
    }

    // Recommend related scenarios
    const recommendedNext = this.scenario.relatedScenarios.slice(0, 3);

    return {
      grade,
      summary,
      strengths: strengths.slice(0, 3),
      improvements: improvements.slice(0, 3),
      recommendedNext,
    };
  }

  /**
   * Get scenario context for display
   */
  getScenarioContext(): {
    title: string;
    description: string;
    environment: object;
    context: object;
    totalDecisions: number;
  } {
    return {
      title: this.scenario.title,
      description: this.scenario.description,
      environment: this.scenario.environment,
      context: this.scenario.context,
      totalDecisions: this.scenario.decisionPoints.length,
    };
  }

  /**
   * Get solution path for review
   */
  getSolutionPath(): object[] {
    return this.scenario.solutionPath;
  }

  /**
   * Get technical explanation
   */
  getExplanation(): object {
    return this.scenario.explanation;
  }
}

// ============================================================================
// Factory Function
// ============================================================================

export function createScenarioEngine(
  scenario: EnterpriseScenario,
): ScenarioEngine {
  return new ScenarioEngine(scenario);
}
