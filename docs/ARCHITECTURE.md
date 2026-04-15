# Enterprise IT Training Platform - Architecture

## 🎯 Product Positioning

**"Practical Microsoft 365 Admin Training Platform for Companies"**

This platform transforms from a quiz-based learning app into a **B2B-grade enterprise training simulation** where IT administrators practice real-world Microsoft 365 scenarios.

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (Next.js 14)                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  Scenario UI    │  │  Dashboard      │  │  Admin Portal   │                  │
│  │  - Simulation   │  │  - Progress     │  │  - Team Mgmt    │                  │
│  │  - Decisions    │  │  - Analytics    │  │  - Reports      │                  │
│  │  - Labs         │  │  - Skills       │  │  - Billing      │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER (Next.js API Routes)                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  /api/scenarios │  │  /api/progress  │  │  /api/admin     │                  │
│  │  /api/decisions │  │  /api/analytics │  │  /api/orgs      │                  │
│  │  /api/labs      │  │  /api/skills    │  │  /api/billing   │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  PostgreSQL     │  │  Redis          │  │  Blob Storage   │                  │
│  │  - Users        │  │  - Sessions     │  │  - Screenshots  │                  │
│  │  - Orgs         │  │  - Cache        │  │  - Diagrams     │                  │
│  │  - Progress     │  │  - Rate Limits  │  │  - Exports      │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧱 Core Components

### 1. Scenario Engine

The heart of the platform - transforms static content into interactive simulations.

```typescript
interface EnterpriseScenario {
  // Metadata
  id: string;
  category: ScenarioCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  tier: "free" | "premium" | "enterprise";

  // Context
  context: ScenarioContext;
  environment: TenantEnvironment;

  // Interactive Flow
  decisionPoints: DecisionPoint[];
  consequences: ConsequenceMap;
  solutionPath: SolutionStep[];

  // Learning
  technicalExplanation: TechnicalExplanation;
  relatedScenarios: string[];
}
```

### 2. Multi-Tenant Architecture

```
Organization
├── Teams
│   ├── Team Members
│   └── Team Permissions
├── Licenses (Free/Premium/Enterprise)
├── Progress Tracking
├── Analytics Dashboard
└── Admin Controls
```

### 3. Feature Gating

| Feature           | Free     | Premium   | Enterprise |
| ----------------- | -------- | --------- | ---------- |
| Scenarios         | 5        | Unlimited | Unlimited  |
| Categories        | 2        | All       | All        |
| Progress Tracking | Personal | Personal  | Team       |
| Analytics         | Basic    | Advanced  | Full       |
| Team Management   | ❌       | ❌        | ✅         |
| API Access        | ❌       | ❌        | ✅         |
| Custom Scenarios  | ❌       | ❌        | ✅         |
| Export Reports    | ❌       | ✅        | ✅         |

---

## 📁 Directory Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   └── skills/
│   ├── (admin)/
│   │   ├── team/
│   │   ├── reports/
│   │   └── settings/
│   ├── scenarios/
│   │   ├── [category]/
│   │   │   └── [id]/
│   │   └── page.tsx
│   └── api/
│       ├── scenarios/
│       ├── progress/
│       ├── orgs/
│       └── analytics/
├── components/
│   ├── scenarios/
│   │   ├── ScenarioPlayer.tsx
│   │   ├── DecisionTree.tsx
│   │   ├── ConsequenceView.tsx
│   │   ├── EnvironmentPanel.tsx
│   │   └── SolutionExplainer.tsx
│   ├── dashboard/
│   │   ├── ProgressChart.tsx
│   │   ├── SkillRadar.tsx
│   │   └── ActivityFeed.tsx
│   └── admin/
│       ├── TeamManager.tsx
│       ├── ReportExporter.tsx
│       └── BillingSettings.tsx
├── content/
│   └── scenarios/
│       ├── identity-access/
│       ├── conditional-access/
│       ├── defender/
│       ├── exchange/
│       ├── intune/
│       └── tenant-admin/
├── lib/
│   ├── db/
│   │   ├── prisma.ts
│   │   └── schema.prisma
│   ├── auth/
│   ├── scenarios/
│   │   ├── engine.ts
│   │   └── evaluator.ts
│   └── analytics/
└── types/
    ├── scenarios.ts
    ├── organizations.ts
    └── analytics.ts
```

---

## 🎓 Didactic Model

### Learning Science Principles Applied

1. **Active Recall**
   - Force decisions before revealing solutions
   - No passive reading - all content is interactive

2. **Error-Based Learning**
   - Show consequences of wrong decisions
   - "What happens if you do X" simulations

3. **Progressive Difficulty**
   - Beginner → Intermediate → Advanced
   - Prerequisites system

4. **Scenario Chaining**
   - Related scenarios linked
   - "What if the problem was X instead?"

5. **Reflection Prompts**
   - Post-scenario analysis
   - "Why did this solution work?"

---

## 🔒 Security Considerations

- OAuth 2.0 / OIDC authentication
- Role-based access control (RBAC)
- API rate limiting
- Audit logging
- Data encryption at rest
- GDPR compliance ready

---

## 🚀 Scaling Strategy

1. **Phase 1**: MVP with core scenarios
2. **Phase 2**: Multi-tenant support
3. **Phase 3**: Analytics & reporting
4. **Phase 4**: API for LMS integration
5. **Phase 5**: Custom scenario builder
