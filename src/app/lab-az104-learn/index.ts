// AZ-104 Microsoft Azure Administrator - Komplettes Curriculum
// Erstellt für Mainlab Learn Platform
// Integriert mit Microsoft Learn Links

export const AZ104_COMPLETE_CURRICULUM = {
  lastUpdated: "2025-01-27",
  examWeight: {
    identityGovernance: "20-25%",
    storage: "15-20%", 
    compute: "20-25%",
    networking: "15-20%",
    monitoring: "10-15%"
  },
  officialMicrosoftLearn: "https://learn.microsoft.com/en-us/certifications/exams/az-104/",
  
  modules: [
    // Alle Module hier (werden im nächsten Schritt eingefügt)
  ]
};

// Exportiere auch einzelne Module
export { MODULE_1_PART_1, MODULE_1_PART_2, MODULE_1_PART_3, MODULE_1_PART_4 } from './module1-identity';
export { MODULE_2_PART_1, MODULE_2_PART_2 } from './module2-storage';
export { MODULE_3_COMPUTE } from './module3-compute';
export { MODULE_4_NETWORKING } from './module4-networking';
export { MODULE_5_MONITORING } from './module5-monitoring';
