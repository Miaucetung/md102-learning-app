// AZ-104 Complete Curriculum - Alle Module in einer Datei
// Verwendung in GitHub Spark: import { AZ104_CURRICULUM } from 'url-to-this-file'

export const AZ104_CURRICULUM = {
  metadata: {
    exam: "AZ-104: Microsoft Azure Administrator",
    lastUpdated: "2025-12-27",
    totalModules: 5,
    microsoftLearnPath: "https://learn.microsoft.com/en-us/certifications/exams/az-104/"
  },
  
  quickReference: {
    identityGovernance: {
      weight: "20-25%",
      topics: ["Azure AD", "Users/Groups", "RBAC", "Policies", "Subscriptions"]
    },
    storage: {
      weight: "15-20%",
      topics: ["Storage Accounts", "Blob Storage", "Azure Files", "Security"]
    },
    compute: {
      weight: "20-25%",
      topics: ["VMs", "VMSS", "Containers (ACI/AKS)", "App Service"]
    },
    networking: {
      weight: "15-20%",
      topics: ["VNets", "NSG", "Load Balancer", "Application Gateway", "DNS"]
    },
    monitoring: {
      weight: "10-15%",
      topics: ["Azure Monitor", "Backup", "Site Recovery", "Update Management"]
    }
  }
};

// GitHub Spark kann diesen Link verwenden:
// https://raw.githubusercontent.com/Miaucetung/Mainlab/main/src/app/lab-az104-learn/curriculum.ts

