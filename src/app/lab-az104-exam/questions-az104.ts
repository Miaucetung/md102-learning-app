// src/app/lab-az104-exam/questions-az104.ts

export type Az104Question = {
  /** ID aus deiner Sammlung (z.B. Q1, Q2, ...) */
  id: string;
  /** Laufende Nummer im Test */
  number: number;
  /** Themenbereich laut AZ-104 Blueprint */
  area: string;
  /** grobe Schwierigkeit */
  difficulty: "easy" | "medium" | "hard";
  /** Fragetext mit \n für Zeilenumbrüche */
  question: string;
  /** Antwortoptionen A, B, C, … */
  options: { key: string; text: string }[];
  /** Richtige(n) Antwort(en), z.B. ["D"] oder ["B", "C"] */
  correctAnswers: string[];
  /** Erklärungstext (DE oder EN) */
  explanation: string;
  /** Optionale Links / Referenzen */
  references?: string[];
};

export const QUESTIONS_AZ104: Az104Question[] = `{
    id: "Q1"\nnumber: 1\narea: "Implement and manage virtual networking (15–20%)"\ndifficulty: "medium"\nquestion: [
      "You have an Azure virtual machine that runs Windows Server 2019 and has the following configurations:",
      "",
      "• Name: VM1",
      "• Location: West US",
      "• Connected to: VNET1",
      "• Private IP address: 10.1.0.4",
      "• Public IP address: 52.186.85.63",
      "• DNS suffix in Windows Server: Adatum.com",
      "",
      "You create the Azure DNS zones shown in the following table:",
      "",
      "| Name        | Type    | Location      |",
      "|-------------|---------|---------------|",
      "| adatum.pri  | Private | West Europe   |",
      "| contoso.pri | Private | Central US    |",
      "| adatum.com  | Public  | West Europe   |",
      "| contoso.com | Public  | North Europe  |",
      "",
      "Use the drop-down menus to select the answer choice that completes each statement.",
      "(NoTE: Each correct selection is worth one point.)",
      "",
      "DNS zones that you can link to VNET1:",
      "DNS zones to which VM1 can automatically register:",`,

    options: `{
        key: "A"\ntext: [
          "DNS zones that you can link to VNET1: Adatum.com only",
          "DNS zones to which VM1 can automatically register: Adatum.com only",`,
      },
      {
        key: "B",
        text: `DNS zones that you can link to VNET1: Adatum.com only\nDNS zones to which VM1 can automatically register: The public zones only`,
      },
      {
        key: "C",
        text: `DNS zones that you can link to VNET1: Adatum.pri and adatum.com only\nDNS zones to which VM1 can automatically register: Adatum.pri and adatum.com only`,
      },
      {
        key: "D",
        text: `DNS zones that you can link to VNET1: The private zones only\nDNS zones to which VM1 can automatically register: The private zones only`,
      },
      {
        key: "E",
        text: `DNS zones that you can link to VNET1: The private zones only\nDNS zones to which VM1 can automatically register: Adatum.com only`,
      },
      {
        key: "F",
        text: `DNS zones that you can link to VNET1: The public zones only\nDNS zones to which VM1 can automatically register: Adatum.pri and adatum.com only`,
      },
    ],

    // Nur eine Kombination ist korrekt → D
    correctAnswers: ["D"],

    explanation: `Key facts about Azure DNS and virtual networks:\n\n• Azure virtual networks can be linked only to **Azure Private DNS zones**, Not to public DNS zones.\n• Automatic DNS record registration for VMs works only with **Private DNS zones** when the VNet link\n  is configured with "Enable auto-registration".\n\nGiven zones:\n• Private zones: adatum.pri, contoso.pri\n• Public zones: adatum.com, contoso.com\n\nAnalysis of the two statements:\n\n1) "DNS zones that you can link to VNET1":\n   → Only Private DNS zones can be linked to VNets.\n   → Therefore, you can link **the private zones only** (adatum.pri and contoso.pri).\n\n2) "DNS zones to which VM1 can automatically register":\n   → Auto-registration is supported only for Private DNS zones that are linked with auto-registration enabled.\n   → Public DNS zones (like adatum.com) do Not support automatic registration of VM records.\n   → Therefore, VM1 can automatically register only in **the private zones**.\n\nThe VM’s DNS suffix (Adatum.com) in Windows does Not change these platform limits – it does Not make a public zone\nbehave like a private zone.\n\nConclusion:\n• VNET1 can be linked to: **The private zones only**.\n• VM1 can auto-register in: **The private zones only**.\n\nThus, the correct combined answer is option **D**.`,

    references: `Azure Private DNS overview\nLink a virtual network to an Azure private DNS zone and enable auto-registration\n],
  },

  {
    id: "Q2",
    number: 2,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft 365 tenant and an Azure Active Directory (Azure AD) tenant named contoso.com."\n\nYou plan to grant three users named User1, User2, and User3 access to a temporary Microsoft SharePoint document library named Library1.\n\nYou need to create groups for the users. The solution must ensure that the groups are deleted automatically after 180 days.\n\nWhich two groups should you create?\n(Each correct answer presents a complete solution. Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext: "A Security group that uses the Assigned membership type."\n}\n{
        key: "B"\ntext: "A Microsoft 365 group that uses the Assigned membership type."\n}\n{
        key: "C"\ntext: "A Microsoft 365 group that uses the Dynamic User membership type."\n}\n{
        key: "D"\ntext: "A Security group that uses the Dynamic User membership type."\n}\n{
        key: "E"\ntext: "A Security group that uses the Dynamic Device membership type."\n}\n],

    correctAnswers: ["B"\nC"],

    explanation: [
      "Expiration policies in Microsoft 365 allow administrators to automatically delete inactive groups after a defined period, such as 180 days.\n\nKey facts:\n• Group expiration is **only supported for Microsoft 365 groups**.\n• It does NoT apply to Azure AD security groups.\n• When a Microsoft 365 group expires, it is soft-deleted and recoverable for 30 days.\n\nBoth of the following meet the requirement:\n✔ Microsoft 365 group with Assigned membership (B)\n✔ Microsoft 365 group with Dynamic User membership (C)\n\nBecause both are Microsoft 365 groups, both support the expiration timer and auto-cleanup behavior.\n\nWhy the others are wrong:\n- Security groups (A, D, E) do Not support expiration.\n\nTherefore, the correct answers are:\n✔ B and ✔ C`,

    references: ["Microsoft 365 group expiration policy documentation"],
  },
  {
    id: "Q3",
    number: 3,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains an Azure Active Directory (Azure AD) tenant named adatum.com. The tenant contains 500 user accounts.\n\nYou deploy Microsoft Office 365. You configure Office 365 to use the user accounts in adatum.com.\nYou configure 60 users to connect to mailboxes in Microsoft Exchange Online.\n\nYou need to ensure that the 60 users use Azure Multi-Factor Authentication (MFA) to connect to the Exchange Online mailboxes.\nThe solution must only affect connections to the Exchange Online mailboxes.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From the multi-factor authentication page, configure the Multi-Factor Auth status for each user."\n}\n{
        key: "B"\ntext: "From Azure Active Directory admin center, create a conditional access policy."\n}\n{
        key: "C"\ntext: "From the multi-factor authentication page, modify the verification options."\n}\n{
        key: "D"\ntext: "From the Azure Active Directory admin center, configure an authentication method."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "To enforce MFA **for Exchange Online only**, you must use **Azure AD Conditional Access**."\n\nA Conditional Access policy allows:\n• targeting specific users (the 60 selected users),\n• targeting specific cloud apps (Exchange Online),\n• requiring MFA only for that app.\n\nThe legacy MFA page (Option A) enforces MFA tenant-wide across all services — NoT acceptable.\nChanging verification options (C) does Not enforce MFA.\nAuthentication methods configuration (D) controls available methods, Not conditional enforcement.\n\nTherefore, the only correct solution is:\n✔ B – Create a Conditional Access policy.`,

    references: ["Azure AD Conditional Access – Require MFA for specific apps"],
  },
  {
    id: "Q4",
    number: 4,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains the resources shown in the following table:\n\n| Name  | Type             | Location     |\n|-------|------------------|--------------|\n| VNet1 | Virtual network  | East US      |\n| IP1   | Public IP address| West Europe  |\n| RT1   | Route table      | North Europe |\n\nYou need to create a network interface named NIC1.\nIn which location can you create NIC1?`,

    options: `{ key: "A"\ntext: "East US and North Europe only." }\n{ key: "B"\ntext: "East US and West Europe only." }\n{ key: "C"\ntext: "East US, West Europe, and North Europe." }\n{ key: "D"\ntext: "East US only." }\n],

    correctAnswers: ["D"],

    explanation: [
      "A network interface must be created in the **same region as the virtual network** it attaches to."\nVNet1 exists only in **East US**.\n\nTherefore, NIC1 can only be created in:\n✔ East US\n\nCorrect answer: **D**`,

    references: ["Create, change, or delete a network interface"],
  },
  {
    id: "Q5",
    number: 5,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You create an App Service plan named App1 and an Azure web app named webapp1.\nYou discover that the option to create a staging slot is unavailable.\n\nYou need to create a staging slot for App1.\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "From webapp1, modify the Application settings." }\n{ key: "B"\ntext: "From webapp1, add a custom domain." }\n{ key: "C"\ntext: "From App1, scale up the App Service plan." }\n{ key: "D"\ntext: "From App1, scale out the App Service plan." }\n],

    correctAnswers: ["C"],

    explanation: [
      "Staging slots are only available in the **Standard**, **Premium**, or **Isolated** App Service plan tiers."\n\nIf the option is unavailable, the plan is in Free, Shared, or Basic tier.\nTo enable slots, you must **scale up** (upgrade pricing tier).\n\nTherefore:\n✔ C – Scale up the App Service plan.`,

    references: ["Set up staging environments in Azure App Service"],
  },
  {
    id: "Q6",
    number: 6,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that includes the following Azure file shares:\n\n| Name   | In storage account | Location |\n|--------|---------------------|----------|\n| share1 | storage1            | West US  |\n| share2 | storage1            | West US  |\n\nYou have the following on-premises servers:\n\n| Name    | Folders                 |\n|---------|--------------------------|\n| Server1 | D:\\\\Folder1, E:\\\\Folder2 |\n| Server2 | D:\\\\Data                |\n\nYou create a Storage Sync Service named Sync1 and an Azure File Sync group named Group1.\nGroup1 uses share1 as the cloud endpoint.\n\nYou register Server1 and Server2 in Sync1.\nYou add D:\\\\Folder1 on Server1 as a server endpoint of Group1.\n\nFor each of the following statements, select YES or No.\n\nStatements:\n1. Share2 can be added as a cloud endpoint for Group1.\n2. E:\\\\Folder2 on Server1 can be added as a server endpoint for Group1.\n3. D:\\\\Data on Server2 can be added as a server endpoint for Group1.`,

    options: `{
        key: "A"\ntext: [
          "Share2 can be added as a cloud endpoint for Group1: YES",
          "E:\\\\Folder2 on Server1 can be added as a server endpoint for Group1: YES",
          "D:\\\\Data on Server2 can be added as a server endpoint for Group1: YES",`,
      },
      {
        key: "B",
        text: `Share2 can be added as a cloud endpoint for Group1: YES\nE:\\\\Folder2 on Server1 can be added as a server endpoint for Group1: YES\nD:\\\\Data on Server2 can be added as a server endpoint for Group1: No`,
      },
      {
        key: "C",
        text: `Share2 can be added as a cloud endpoint for Group1: YES\nE:\\\\Folder2 on Server1 can be added as a server endpoint for Group1: No\nD:\\\\Data on Server2 can be added as a server endpoint for Group1: YES`,
      },
      {
        key: "D",
        text: `Share2 can be added as a cloud endpoint for Group1: YES\nE:\\\\Folder2 on Server1 can be added as a server endpoint for Group1: No\nD:\\\\Data on Server2 can be added as a server endpoint for Group1: No`,
      },
      {
        key: "E",
        text: `Share2 can be added as a cloud endpoint for Group1: No\nE:\\\\Folder2 on Server1 can be added as a server endpoint for Group1: No\nD:\\\\Data on Server2 can be added as a server endpoint for Group1: YES`,
      },
      {
        key: "F",
        text: `Share2 can be added as a cloud endpoint for Group1: No\nE:\\\\Folder2 on Server1 can be added as a server endpoint for Group1: No\nD:\\\\Data on Server2 can be added as a server endpoint for Group1: No`,
      },
    ],

    // Kombination wie bei Cert2Brain: No / No / YES
    correctAnswers: ["E"],

    explanation: `Facts zur Azure File Sync Topologie:\n\n• Ein Sync Group kann **nur einen** Cloud Endpoint haben.\n  – Group1 nutzt bereits share1 als Cloud Endpoint.\n  – Daher kann share2 **nicht** zusätzlich als Cloud Endpoint in derselben Sync Group verwendet werden.\n\n• Pro registriertem Server darf es in einer Sync Group **nur einen Server Endpoint** geben.\n  – Server1 hat bereits D:\\\\Folder1 als Server Endpoint in Group1.\n  – Deshalb kann E:\\\\Folder2 auf Server1 **nicht** als weiterer Server Endpoint zur gleichen Sync Group hinzugefügt werden.\n\n• Server2 ist registriert und hat bisher **keinen** Server Endpoint in Group1.\n  – D:\\\\Data auf Server2 kann als Server Endpoint hinzugefügt werden.\n\nBewertung der drei Statements:\n\n1. Share2 can be added as a cloud endpoint for Group1 → **No** (bereits ein Cloud Endpoint vorhanden).\n2. E:\\\\Folder2 on Server1 can be added as a server endpoint for Group1 → **No** (Server1 hat schon einen Endpoint in dieser Sync Group).\n3. D:\\\\Data on Server2 can be added as a server endpoint for Group1 → **YES** (neuer Server, Noch kein Endpoint).\n\nDamit entspricht nur Kombination **E** genau den korrekten YES/No-Zuordnungen.`,

    references: ["Deploy Azure File Sync"],
  },

  {
    id: "Q7",
    number: 7,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains resource groups RG1 and RG2 with the following locks:\n\n| NAME    | LOCK NAME | LOCK TYPE  |\n| RG1___| None________| None_______|\n| RG2___| Lock_________| Delete______|\n\nRG1:\n| Name     | Type            | Lock       |\n|----------|-----------------|------------|\n| storage1 | Storageaccount  | Delete     |\n| VNet1    | Virtual network | Read-only  |\n| IP1      | Public IP       | None       |\n\nRG2:\n| Name     | Type            | Lock       |\n|----------|-----------------|------------|\n| storage2 | Storageaccount  | Delete     |\n| VNet2    | Virtual network | Read-only  |\n| IP2      | Public IP       | None       |\n\nYou need to identify which resources you can move between RG1 and RG2.`,

    options: `{ key: "A"\ntext: "RG1 → RG2: None; RG2 → RG1: None" }\n{ key: "B"\ntext: "RG1 → RG2: IP1 only; RG2 → RG1: None" }\n{
        key: "C"\ntext: "RG1 → RG2: IP1 and storage1 only; RG2 → RG1: IP2 and VNet2 only"\n}\n{ key: "D"\ntext: "RG1 → RG2: None; RG2 → RG1: IP2 only" }\n{
        key: "E"\ntext: "RG1 → RG2: IP1 and VNet1 only; RG2 → RG1: IP2 and storage2 only"\n}\n{
        key: "F"\ntext: "RG1 → RG2: IP1, VNet1, and storage1; RG2 → RG1: IP2, VNet2, and storage2"\n}\n],

    correctAnswers: ["F"],

    explanation: [
      "Resource locks (Delete or Read-only) **do Not prevent moving resources between resource groups**."\n\nAlthough behavior has varied historically, Azure Now permits moves even with locks.\n\nTherefore, all resources can be moved:\n✔ RG1 → RG2: IP1, VNet1, storage1\n✔ RG2 → RG1: IP2, VNet2, storage2\n\nCorrect answer: F`,

    references: ["Azure resource lock behavior"],
  },

  {
    id: "Q8",
    number: 8,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1 that contains the resources shown in the following table.\n\n| Name     | Type_______________| Location__________ |Resource Group|\n|--------|---------------------|----------------------|------------|\n| RG1___| Resource Group__ | East US____________ |.............-......       |\n| RG2___| Resource Group__ | West Europe_______ |.............-......       |\n| RG3___| Resource Group__ | North Europe______ |.............-......       |\n| VNet1_| Virtual network___ | Central US_________ |RG1..............|\n| VM1___| Virtual Machine___| West US___________ |RG2...............|\n\nVM1 connects to a virtual network named VNET2 by using a network interface named NIC1.\n\nYou need to create a new network interface named NIC2 for VM1.\n\nSolution: You create NIC2 in RG1 and West US.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "A NIC must be created in the **same region** as the VM and the VNet."\n\nVM1 is in **West US**.\nNIC2 is created in **West US**.\nThe resource group location does NoT matter.\n\nTherefore, the solution meets the goal.\nCorrect: ✔ YES`,

    references: ["Create, change, or delete a network interface"],
  },
  {
    id: "Q9",
    number: 9,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1 that contains the resources shown in the following table.\n\n| Name     | Type| Location|Resource Group|\n|--------|---------------------|----------------------|------------|\n| RG1| Resource Group | East US |-      |\n| RG2| Resource Group | West Europe|-       |\n| RG3| Resource Group | North Europe|-       |\n| VNet1| Virtual network | Central US|RG1|\n| VM1| Virtual Machine| West US |RG2|\n\nVM1 connects to a virtual network named VNET2 by using a network interface named NIC1.\n\nYou need to create a new network interface named NIC2 for VM1.\n\nSolution: You create NIC2 in RG1 and Central US.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "VM1 is located in **West US**."\nA NIC must be in the **same region** as the VM it attaches to.\n\nCentral US ≠ West US → NIC canNot attach to VM1.\n\nTherefore, the solution does NoT meet the goal.\nCorrect: ✔ No`,

    references: ["NIC and VM region requirements"],
  },
  {
    id: "Q10",
    number: 10,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1 that contains the resources shown in the following table.\n\n| Name     | Type_______________| Location__________ |Resource Group|\n|--------|---------------------|----------------------|------------|\n| RG1___| Resource Group__ | East US____________ |.............-......       |\n| RG2___| Resource Group__ | West Europe_______ |.............-......       |\n| RG3___| Resource Group__ | North Europe______ |.............-......       |\n| VNet1_| Virtual network___ | Central US_________ |RG1..............|\n| VM1___| Virtual Machine___| West US___________ |RG2...............|\n\nVM1 connects to a virtual network named VNET2 by using a network interface named NIC1.\n\nYou need to create a new network interface named NIC2 for VM1.\n\nSolution: You create NIC2 in RG2 and West US.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "A NIC must be created in the **same region** as VM1, which is **West US**."\n\nThe resource group location does NoT matter.\nNIC2 is created in West US, so it is valid.\n\nCorrect: ✔ YES`,

    references: ["NIC and VM region requirements"],
  },

  {
    id: "Q11",
    number: 11,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1 that contains the resources shown in the following table.\n\n| Name     | Type_______________| Location__________ |Resource Group|\n|--------|---------------------|----------------------|------------|\n| RG1___| Resource Group__ | East US____________ |.............-......       |\n| RG2___| Resource Group__ | West Europe_______ |.............-......       |\n| RG3___| Resource Group__ | North Europe______ |.............-......       |\n| VNet1_| Virtual network___ | Central US_________ |RG1..............|\n| VM1___| Virtual Machine___| West US___________ |RG2...............|\n\nVM1 connects to a virtual network named VNET2 by using a network interface named NIC1.\n\nYou need to create a new network interface named NIC2 for VM1.\n\nSolution: You create NIC2 in RG2 and Central US.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "A network interface (NIC), the virtual machine (VM) it is attached to, und das virtuelle Netzwerk müssen sich in derselben Region befinden."\n\n• VM1 befindet sich in der Region West US.\n• In der Lösung wird NIC2 in Central US erstellt.\n\nEine NIC aus Central US kann nicht an eine VM in West US angebunden werden.\n\nDie Resource Group (RG1/RG2/RG3) ist für die Region-Kompatibilität irrelevant,\nentscheidend ist immer die Region des NIC und der VM.\n\nDaher erfüllt die Lösung das Ziel **nicht**.\n\nKorrekt ist: **B – No**.`,

    references: ["Azure Docs – Create, change, or delete a network interface"],
  },
  {
    id: "Q12",
    number: 12,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You create an Azure VM named VM1 that runs Windows Server 2019.\nVM1 is configured as shown in the following exhibit (portal screenshot).\n\nKey configuration from the exhibit:\n• Resource group: RG_VMs\n\n• Status: Stopped (deallocated)\n• Location: West US\n• OS: Windows\n\n• Size: Standard DS1 v2\n\n• Public IP: VM1-ip\n• Private IP: 10.1.0.4\n\n• Azure Spot: N/A\n• VNet/Subnet: RG_VMs-vnet/default\n•DNS name: configure\n\nYou need to enable Desired State Configuration (DSC) for VM1.\n\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "Configure a DNS name for VM1." }\n{ key: "B"\ntext: "Start VM1." }\n{ key: "C"\ntext: "Connect to VM1." }\n{ key: "D"\ntext: "Capture a snapshot of VM1." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Der PowerShell Desired State Configuration (DSC) Extension Handler benötigt,"\ndass die Ziel-VM eingeschaltet ist und mit Azure kommunizieren kann.\n\nVM1 befindet sich im Zustand **Stopped (deallocated)**.\nIn diesem Zustand kann die VM keine Extension installieren oder Konfigurationen empfangen.\n\nErst wenn die VM gestartet wurde, kann:\n• die DSC-Extension installiert werden,\n• die Konfiguration heruntergeladen und angewendet werden.\n\nDNS-Name konfigurieren (A), RDP/SSH-Verbindung herstellen (C) oder einen Snapshot erstellen (D)\naktivieren nicht die VM und lösen das DSC-Problem nicht.\n\nDaher ist als erster Schritt Notwendig:\n✔ **B – Start VM1**.`,

    references: `Introduction to the Azure Desired State Configuration extension handler\n],
  },
  {
    id: "Q13",
    number: 13,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: [
      "You have two Azure virtual machines named VM1 and VM2."\nYou have two Recovery Services vaults named RSV1 and RSV2.\n\nVM2 is currently protected by RSV1.\n\nYou need to use RSV2 to protect VM2.\n\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "From the RSV1 blade, click Backup items and stop the VM2 backup."\n}\n{
        key: "B"\ntext: "From the RSV1 blade, click Backup Jobs and export the VM2 backup."\n}\n{
        key: "C"\ntext: "From the RSV1 blade, click Backup. From the Backup blade, select the backup for VM2, and then click Backup."\n}\n{
        key: "D"\ntext: "From the VM2 blade, click Disaster recovery and select RSV2 as the Recovery Services vault."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Ein einzelner Azure-VM-Backup kann **immer nur einem Recovery Services Vault** zugeordnet sein."\n\nBevor du VM2 in RSV2 sichern kannst, musst du:\n1. Die bestehende Sicherung in RSV1 für VM2 beenden.\n2. Anschließend in RSV2 den Schutz für VM2 neu konfigurieren.\n\nGenau das erreichst du mit:\n✔ 'Backup items' in RSV1 öffnen und das Backup für VM2 **stoppen**.\n\nBackup-Jobs exportieren (B) ändert die Zuordnung nicht.\nErneutes 'Backup' in RSV1 (C) bleibt im gleichen Vault.\nDisaster Recovery (D) konfiguriert Replikation, nicht Backup-Vault-Wechsel.\n\nDaher ist nur korrekt:\n✔ **A – From the RSV1 blade, click Backup items and stop the VM2 backup.**`,

    references: ["Azure Backup – Recovery Services vaults overview"],
  },
  {
    id: "Q14",
    number: 14,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains the public load balancers shown in the following table:\n\n\n| Name     | SKU|\n|--------|------|\n| LB1| Basic |\n| LB2| Standard |\n\nYou plan to create six virtual machines and to load balance requests to the virtual machines.\nEach load balancer will load balance three virtual machines.\n\nYou need to create the virtual machines for the planned solution.\n\nHow should you create the virtual machines?\n(To answer, select the appropriate options in the answer area. Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext:
          "The VMs for LB1 must be connected to the same virtual network; " +
          "the VMs for LB2 must be connected to the same virtual network."\n}\n{
        key: "B"\ntext:
          "The VMs for LB1 must be created in the same resource group; " +
          "the VMs for LB2 must be created in the same resource group."\n}\n{
        key: "C"\ntext:
          "The VMs that will be load balanced by using LB1 must be created in the same availability set " +
          "or virtual machine scale set; the VMs for LB2 must be connected to the same virtual network."\n}\n{
        key: "D"\ntext:
          "The VMs for LB1 must run the same operating system; " +
          "the VMs for LB2 must be created in the same resource group."\n}\n{
        key: "E"\ntext:
          "The VMs for LB1 must be connected to the same virtual network; " +
          "the VMs for LB2 must be created in the same availability set or virtual machine scale set."\n}\n{
        key: "F"\ntext:
          "The VMs for LB1 must be created in the same availability set or virtual machine scale set; " +
          "the VMs for LB2 must run the same operating system."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Unterschiede Basic vs. Standard Load Balancer:"\n\n• **Basic Load Balancer (LB1):**\n  – Backend-Pool: Nur VMs in **einem Availability Set oder einer VM Scale Set**.\n\n• **Standard Load Balancer (LB2):**\n  – Backend-Pool: Beliebige VMs oder VMSS-Instanzen in **einem virtuellen Netzwerk**.\n\nResource Group oder Betriebssystem der VMs sind für die Load-Balancer-Konfiguration nicht relevant.\n\nDaher gilt:\n• Für LB1: VMs müssen in derselben Availability Set oder VMSS sein.\n• Für LB2: VMs müssen im gleichen VNet sein.\n\nGenau das beschreibt Option:\n✔ **C**`,

    references: ["Azure Load Balancer SKUs – Basic vs Standard"],
  },

  {
    id: "Q15",
    number: 15,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure AD tenant named contoso.com that is synchronized with an on-premises Active Directory domain.\n\nThe domain contains the users shown in the following table:\n\n| Name     | Role|\n|--------|---------------------|\n| SecAdmin1 | Security administrator |\n| BillAdmin1 | Billing administrator |\n| User1 | Reports reader |\n\nYou enable self-service password reset (SSPR) for all users and configure SSPR with:\n• Number of methods required to reset: 2\n• Methods available: Mobile phone, Security questions\n• Number of questions required to register: 3\n• Number of questions required to reset: 3\n\nYou select the following security questions:\n• What is your favorite food?\n• In what city was your first job?\n• What was the name of your first pet?\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n(Each correct selection is worth one point.)\n\nStatements:\n1. SecAdmin1 must answer the question: 'In what city was your first job?' to reset his password.\n2. BillAdmin1 must answer the question: 'What is your favorite food?' to reset his password.\n3. User1 must answer the question: 'What was the name of your first pet?' to reset his password.`,

    options: `{
        key: "A"\ntext: [
          "• SecAdmin1 must answer the following question if he wants to reset his password: In what city was your first job? YES",
          "",
          "• BillAdmin1 must answer the following question if he wants to reset his password: What is your favorite food? YES",
          "",
          "• User1 must answer the following question if he wants to reset his password: What was the name of your first pet? YES",
          "",`,
      },
      {
        key: "B",
        text: `• SecAdmin1 must answer the following question if he wants to reset his password: In what city was your first job? YES\n\n• BillAdmin1 must answer the following question if he wants to reset his password: What is your favorite food? YES\n\n• User1 must answer the following question if he wants to reset his password: What was the name of your first pet? No\n`,
      },
      {
        key: "C",
        text: `• SecAdmin1 must answer the following question if he wants to reset his password: In what city was your first job? No\n\n• BillAdmin1 must answer the following question if he wants to reset his password: What is your favorite food? YES\n\n• User1 must answer the following question if he wants to reset his password: What was the name of your first pet? No\n`,
      },
      {
        key: "D",
        text: `• SecAdmin1 must answer the following question if he wants to reset his password: In what city was your first job? YES\n\n• BillAdmin1 must answer the following question if he wants to reset his password: What is your favorite food? No\n\n• User1 must answer the following question if he wants to reset his password: What was the name of your first pet? YES\n`,
      },
      {
        key: "E",
        text: `• SecAdmin1 must answer the following question if he wants to reset his password: In what city was your first job? No\n\n• BillAdmin1 must answer the following question if he wants to reset his password: What is your favorite food? No\n\n• User1 must answer the following question if he wants to reset his password: What was the name of your first pet? YES\n`,
      },
      {
        key: "F",
        text: `• SecAdmin1 must answer the following question if he wants to reset his password: In what city was your first job? No\n\n• BillAdmin1 must answer the following question if he wants to reset his password: What is your favorite food? No\n\n• User1 must answer the following question if he wants to reset his password: What was the name of your first pet? No\n`,
      },
    ],

    correctAnswers: ["E"],

    explanation: `Wichtig: Für **Administratoren** gelten strengere SSPR-Regeln als für Normale Benutzer.\n\nMicrosoft erzwingt für alle Azure-Admin-Rollen eine starke Zwei-Gate-Policy:\n• Admins dürfen **keine Sicherheitsfragen** für SSPR verwenden.\n• Es müssen zwei andere Faktoren genutzt werden (Telefon, Authenticator App, E-Mail etc.).\n\nBetroffene Rollen sind u. a.:\n• Security administrator\n• Billing administrator\n• Global administrator\n• User administrator\n… und viele weitere.\n\nDaher:\n• SecAdmin1 (Security administrator): verwendet **keine** Sicherheitsfragen → Statement 1 = No.\n• BillAdmin1 (Billing administrator): ebenfalls Adminrolle → keine Sicherheitsfragen → Statement 2 = No.\n• User1 (Reports reader): Normaler User → SSPR-Konfiguration mit Sicherheitsfragen greift → Statement 3 = YES.\n\nDamit ist die einzige Kombination:\n✔ SecAdmin1: No; BillAdmin1: No; User1: YES → **Option E**.`,

    references: `Self-service password reset policies and restrictions in Azure AD\n],
  },

  {
    id: "Q16",
    number: 16,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "hard",

    question: [
      "You have an Azure subscription that contains a virtual network named VNet1."\nVNet1 contains four subnets named Gateway, Perimeter, NVA, and Production.\n\nThe NVA subnet contains two network virtual appliances (NVAs) that perform traffic inspection\nbetween the Perimeter subnet and the Production subnet.\n\nYou need to implement an Azure load balancer for the NVAs. The solution must meet the following requirements:\n• The NVAs must run in an active-active configuration that uses automatic failover.\n• The NVAs must load balance traffic to two services on the Production subnet. The services have different IP addresses.\n\nWhich three actions should you perform?\n(Each correct answer presents part of the solution. Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext: "Add two load-balancing rules that have HA Ports enabled and Floating IP disabled."\n}\n{ key: "B"\ntext: "Deploy a Standard load balancer." }\n{
        key: "C"\ntext: "Add a frontend IP configuration, two backend pools, and a health probe."\n}\n{
        key: "D"\ntext: "Add a frontend IP configuration, a backend pool, and a health probe."\n}\n{
        key: "E"\ntext: "Add two load-balancing rules that have HA Ports and Floating IP enabled."\n}\n{ key: "F"\ntext: "Deploy a Basic load balancer." }\n],

    correctAnswers: ["B"\nD\nE"],

    explanation: [
      "Für HA-Szenarien mit Network Virtual Appliances (NVA) in einem VNet ist ein **Internal Standard Load Balancer** mit\n**HA Ports** die empfohlene Lösung.\n\nAnforderungen:\n• Active-active NVAs → mehrere Instanzen im Backend-Pool\n• Automatisches Failover → Health Probe + Load-Balancing-Entscheidung pro Flow\n• Mehrere Dienste/IPs im Production-Subnetz → HA Ports erleichtern das Routing (alle Ports).\n\nDazu brauchst du:\n✔ Einen **Standard Load Balancer** → Option B\n✔ Eine Frontend-IP-Konfiguration, einen Backend-Pool und eine Health Probe → Option D\n✔ Zwei HA-Ports-Regeln mit Floating IP (Direct Server Return) → Option E\n\nOption A (HA Ports, Floating IP disabled) passt nicht zur im Explanations-Text beschriebenen Konfiguration.\nOption C (zwei Backend-Pools) ist nicht erforderlich.\nOption F (Basic LB) unterstützt kein HA Ports-Feature.\n\nDaher sind korrekt:\n✔ B, ✔ D und ✔ E.`,

    references: `High availability ports overview – Azure Standard Load Balancer\n],
  },

  {
    id: "Q17",
    number: 17,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription that contains the resources shown in the following tables."\n\nName       | Type|\n----------- |----------------------|\nLB1   |Load balancer\nVM1  |Virtual machine\nVM2   |    Virtual machine\n\nVM1 and VM2 run a website that is configured as follows:\n\nName       |Physical path                 |  Alias|\n--------- | ------------------------------ | -----\nRoot folder | C:\\inetpub\\wwwroot\\SiteA  | (site root)\nTemp       |  C:\\inetpub\\wwwroot\\Temp  | Temp (virtual directory)\n\nLB1 is configured to balance requests to VM1 and VM2.\n\nYou configure a health probe named Probe1 as follows:\n• Protocol: HTTP\n• Port: 80\n• Path: /Temp/Probe1.htm\n• Interval: 5 seconds\n• Unhealthy threshold: 2\n\nYou need to ensure that the health probe functions correctly.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "On Probe1, change the Unhealthy threshold to 65536." }\n{ key: "B"\ntext: "On Probe1, change the port to 8080." }\n{
        key: "C"\ntext: "On VM1 and VM2, create a file named Probe1.htm in the C:\\inetpub\\wwwroot\\Temp folder."\n}\n{
        key: "D"\ntext: "On VM1 and VM2, create a file named Probe1.htm in the C:\\inetpub\\wwwroot\\SiteA\\Temp folder."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "In IIS ist 'Temp' als **virtuelles Verzeichnis** unterhalb der Site konfiguriert:"\n• Physikalischer Pfad: C:\\inetpub\\wwwroot\\Temp\n\nDer Health Probe Pfad ist: /Temp/Probe1.htm\n→ Der Load Balancer ruft http://<VM>/Temp/Probe1.htm auf.\n\nDamit dieser Pfad **HTTP 200** liefert, muss die Datei:\n✔ Probe1.htm im physikalischen Verzeichnis **C:\\inetpub\\wwwroot\\Temp** existieren.\n\nC ist daher korrekt.\n\nPort ändern (B) oder Unhealthy threshold (A) löst das Problem nicht, wenn die Datei fehlt.\nPfad 'SiteA\\Temp' (D) wäre falsch, da dort kein passender virtueller Pfad /Temp konfiguriert ist.\n\nDaher:\n✔ **C – Datei Probe1.htm in C:\\inetpub\\wwwroot\\Temp anlegen.**`,

    references: `Azure Load Balancer health probes and IIS virtual directories\n],
  },

  {
    id: "Q18",
    number: 18,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series that present the same scenario."\nEach question in the series contains a unique solution.\n\nYou have a computer named Computer1 that has a Point-to-Site VPN connection to an Azure virtual network named VNet1.\nThe Point-to-Site connection uses a self-signed root certificate.\n\nFrom Azure, you download and install the VPN client configuration package on a computer named Computer2.\n\nYou need to ensure that you can establish a Point-to-Site VPN connection to VNet1 from Computer2.\n\nSolution:\nYou export the client certificate from Computer1 and install the certificate on Computer2.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Point-to-Site VPN mit selbstsigniertem Root-Zertifikat:"\n\n• Auf Basis des Root-Zertifikats werden **Client-Zertifikate** erstellt.\n• JEDER Client, der sich verbinden soll, benötigt ein gültiges **Client-Zertifikat**.\n\nVorgehen:\n1. Client-Zertifikat auf Computer1 vorhanden.\n2. Export dieses Client-Zertifikats inklusive privatem Schlüssel.\n3. Import auf Computer2.\n\nDamit erfüllt Computer2 die Zertifikatsanforderung und kann die P2S-VPN-Verbindung aufbauen.\n\nDaher erfüllt die Lösung das Ziel.\n✔ **A – YES**`,

    references: `Generate and export certificates for Point-to-Site connections\n],
  },

  {
    id: "Q19",
    number: 19,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You have a computer named Computer1 that has a Point-to-Site VPN connection to an Azure virtual network named VNet1."\nThe Point-to-Site connection uses a self-signed certificate.\n\nFrom Azure, you download and install the VPN client configuration package on a computer named Computer2.\n\nYou need to ensure that you can establish a Point-to-Site VPN connection to VNet1 from Computer2.\n\nSolution:\nOn Computer2, you set the Startup type for the IPsec Policy Agent service to Automatic.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Das Hauptproblem bei P2S mit selbstsigniertem Zertifikat:"\n• Jeder Client benötigt ein gültiges **Client-Zertifikat**.\n\nDas Aktivieren oder Ändern des Starttyps des IPsec Policy Agent Dienstes\nstellt das benötigte Zertifikat **nicht** bereit.\n\nOhne Client-Zertifikat schlägt die Authentifizierung weiterhin fehl.\n\nDaher:\n✔ Die Lösung erfüllt das Ziel **nicht** → **B – No**.`,

    references: `Generate and export certificates for Point-to-Site using PowerShell\n],
  },

  {
    id: "Q20",
    number: 20,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You have a computer named Computer1 that has a Point-to-Site VPN connection to an Azure virtual network named VNet1."\nThe Point-to-Site connection uses a self-signed certificate.\n\nFrom Azure, you download and install the VPN client configuration package on a computer named Computer2.\n\nYou need to ensure that you can establish a Point-to-Site VPN connection to VNet1 from Computer2.\n\nSolution:\nYou modify the Azure Active Directory (Azure AD) authentication policies.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Die Authentifizierung für klassische P2S-VPN-Verbindungen mit Zertifikaten basiert **nicht** auf Azure AD Policies,"\nsondern auf dem Vorhandensein eines gültigen Client-Zertifikats.\n\nDas Anpassen von Azure AD Authentication Policies löst das Problem also nicht.\n\nErforderlich wäre:\n• Client-Zertifikat von Computer1 exportieren und auf Computer2 importieren.\n\nDaher erfüllt die vorgeschlagene Lösung das Ziel **nicht**:\n✔ **B – No**.`,

    references: `Generate and export certificates for Point-to-Site using PowerShell\n],
  },

  {
    id: "Q21",
    number: 21,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You have a computer named Computer1 that has a Point-to-Site VPN connection to an Azure virtual network named VNet1."\nThe Point-to-Site connection uses a self-signed certificate.\n\nFrom Azure, you download and install the VPN client configuration package on a computer named Computer2.\n\nYou need to ensure that you can establish a Point-to-Site VPN connection to VNet1 from Computer2.\n\nSolution:\nYou join Computer2 to Azure Active Directory (Azure AD).\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Für eine P2S-VPN-Verbindung mit Zertifikatsauthentifizierung ist eine Azure AD Join-Mitgliedschaft **nicht erforderlich**."\n\nDie Notwendige Bedingung ist:\n• Ein gültiges Client-Zertifikat, das von dem im VPN-Gateway konfigurierten Root-Zertifikat abgeleitet ist.\n\nComputer2 nur in Azure AD zu joinen, liefert kein solches Zertifikat und löst die Authentifizierung nicht.\n\nDaher ist die Lösung **nicht** ausreichend:\n✔ **B – No**.`,

    references: ["Point-to-Site VPN – certificate authentication overview"],
  },
  {
    id: "Q22",
    number: 22,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `Your on-premises network contains an Active Directory domain named adatum.com that is synced to Azure Active Directory (Azure AD).\nPassword writeback is disabled.\n\nIn adatum.com, you create the users shown in the following table:\n\nName   | Account option\n-------|---------------------------------------------------------------\nUser1  | User must change password at next logon\nUser2  | Store password by using reversible encryption\nUser3  | A smart card is required for interactive logon\n\nYou plan that these users will authenticate against Azure AD.\n\nWhich users must sign in from a computer joined to adatum.com?`,

    options: `{ key: "A"\ntext: "User2 only" }\n{ key: "B"\ntext: "User1 and User3 only" }\n{ key: "C"\ntext: "User1, User2, and User3" }\n{ key: "D"\ntext: "User2 and User3 only" }\n{ key: "E"\ntext: "User1 only" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Wichtige Punkte:"\n\n• **User1 – User must change password at next logon**\n  – Azure AD unterstützt diese Option inzwischen, aber ein Passwort-Change ohne Password Writeback kann\n    nur gegen den On-Premises-DC durchgeführt werden.\n  – Damit User1 das Kennwort ändern und sich anmelden kann, muss er sich zunächst an einem Domänenrechner\n    (adatum.com) anmelden.\n\n• **User2 – Store password using reversible encryption**\n  – Reversible Verschlüsselung ist eine reine On-Prem-Einstellung und wird so in Azure AD nicht abgebildet.\n  – Für diese Authentifizierung ist ebenfalls der lokale DC maßgeblich.\n\n• **User3 – Smart card is required for interactive logon**\n  – Smartcard-/Zertifikatsanmeldung wird nativ von Azure AD nicht unterstützt.\n  – Sie erfolgt über föderierte Authentifizierung am lokalen AD.\n\nDamit sind alle drei Benutzer von On-Prem-Authentifizierung abhängig und müssen sich über einen Domänencomputer anmelden.\n\nKorrekt ist:\n✔ **C – User1, User2, and User3**.`,

    references: `Choose the right authentication method for your Azure AD hybrid identity solution\n],
  },

  {
    id: "Q23",
    number: 23,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription that contains an Azure file share and an on-premises server named Server1 that runs Windows Server 2016."\n\nYou plan to set up Azure File Sync between Server1 and the Azure file share.\nYou need to prepare the subscription for the planned Azure File Sync.\n\nWhich two actions should you perform in the Azure subscription?\n\n(To answer, select the appropriate combination of actions. Each action may be used once, more than once, or Not at all.)`,

    options: `{
        key: "A"\ntext: "First action: Create a Storage Sync Service.  Second action: Create a sync group."\n}\n{
        key: "B"\ntext: "First action: Install the Azure File Sync agent.  Second action: Run Server Registration."\n}\n{
        key: "C"\ntext: "First action: Create a Storage Sync Service.  Second action: Run Server Registration."\n}\n{
        key: "D"\ntext: "First action: Create a sync group.  Second action: Install the Azure File Sync agent."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure File Sync – Vorbereitung in Azure:"\n\nIn der **Azure Subscription** müssen zuerst folgende Objekte existieren:\n1. **Storage Sync Service** – zentrales Objekt, an das Windows-Server registriert werden.\n2. **Sync Group** – beschreibt die Topologie (ein Cloud Endpoint + ein oder mehrere Server Endpoints).\n\n• Der Azure File Sync Agent und die Server Registration werden auf **Server1 on-premises** ausgeführt,\n  nicht in der Subscription.\n\nDaher ist die richtige Reihenfolge in der Subscription:\n✔ Storage Sync Service erstellen\n✔ Sync Group erstellen\n\nKorrekt ist:\n✔ **A – First: Create a Storage Sync Service; Second: Create a sync group.**`,

    references: ["Deploy Azure File Sync"],
  },

  {
    id: "Q24",
    number: 24,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: `You have an Azure subscription that contains the following resources:\n• 100 Azure virtual machines\n• 20 Azure SQL databases\n• 50 Azure file shares\n\nYou need to create a **daily backup** of all the resources by using Azure Backup.\n\nWhat is the **minimum number of backup policies** that you must create?`,

    options: `{ key: "A"\ntext: "1" }\n{ key: "B"\ntext: "2" }\n{ key: "C"\ntext: "3" }\n{ key: "D"\ntext: "150" }\n{ key: "E"\ntext: "170" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Backup-Policies sind **ressourcentyp-spezifisch**:"\n\n• Eine Policy für **Azure VMs** (IaaS VM Backup).\n• Eine Policy für **Azure SQL** (PaaS Datenbanken).\n• Eine Policy für **Azure Files** (File Share Backup).\n\nDu kannst mehrere Ressourcen gleichen Typs an dieselbe Policy hängen,\naber nicht unterschiedliche Ressourcentypen mischen.\n\nDaher benötigst du:\n✔ 1 Policy für VMs\n✔ 1 Policy für SQL Databases\n✔ 1 Policy für File Shares\n\nAlso insgesamt:\n✔ **3** Backup-Policies.`,

    references: `Use Azure Backup to back up Azure VMs, SQL databases, and Azure Files\n],
  },

  {
    id: "Q25",
    number: 25,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: [
      "You plan to use the Azure Import/Export service to copy files to a storage account."\n\nYou need to identify which files you must create **before** you create the import job.\n\nWhich two files should you create?\n\n(Each correct answer presents part of the solution.)`,

    options: `{ key: "A"\ntext: "An XML manifest file" }\n{ key: "B"\ntext: "A driveset CSV file" }\n{ key: "C"\ntext: "A dataset CSV file" }\n{ key: "D"\ntext: "A PowerShell PS1 file" }\n{ key: "E"\ntext: "A JSON configuration file" }\n],

    correctAnswers: ["B"\nC"],

    explanation: [
      "Für einen Azure Import Job müssen die Datenträger vorbereitet werden:\n\n• **Driveset CSV** – beschreibt die verwendeten physischen Datenträger (Seriennummern, Kapazitäten etc.).\n• **Dataset CSV** – beschreibt, welche Dateien/Ordner auf welche Datenträger kopiert werden.\n\nDiese beiden Dateien werden vom WAImportExport-Tool verwendet, um die Daten korrekt zu schreiben\nund später dem richtigen Storage Account/Container zuzuordnen.\n\nXML-, PS1- oder JSON-Dateien sind dafür nicht erforderlich.\n\nKorrekt sind:\n✔ **B – A driveset CSV file**\n✔ **C – A dataset CSV file**`,

    references: `Use the Microsoft Azure Import/Export service to transfer data to Azure Files\n],
  },

  {
    id: "Q26",
    number: 26,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have a pay-as-you-go Azure subscription that contains the virtual machines shown in the following table:"\n\nName | Resource group | Daily cost\n-----|----------------|----------\nVM1  | RG1            | 20 EUR\nVM2  | RG2            | 30 EUR\n\nYou create the following budget:\n• Name: Budget1\n• Scope: Resource group RG1\n• Amount: 1,000 EUR per billing month\n• Alerts:\n  – 50% (500 EUR) → Action group AG1 (email to user1@contoso.com)\n  – 70% (700 EUR) → AG2 → SMS\n  – 100% (1,000 EUR) → AG3 → Logic App\n\nThe AG1 action group contains a single user: admin@contoso.com.\n\nBased on the current usage (VM1: 20 EUR/Tag → ca. 600 EUR/Monat),\nanswer the following:\n\n1. When the maximum amount in Budget1 is reached, what happens to VM1 and VM2?\n2. Based on the current usage costs of the virtual machines, how many email Notifications will be sent each month?\n\nSelect the correct combined answer.`,

    options: `{
        key: "A"\ntext:
          "When the maximum amount in Budget1 is reached, VM1 and VM2 are turned off; " +
          "based on the current usage costs, two email Notifications will be sent each month."\n}\n{
        key: "B"\ntext:
          "When the maximum amount in Budget1 is reached, VM1 and VM2 are turned off; " +
          "based on the current usage costs, No email Notifications will be sent each month."\n}\n{
        key: "C"\ntext:
          "When the maximum amount in Budget1 is reached, VM1 and VM2 continue to run; " +
          "based on the current usage costs, one email Notification will be sent each month."\n}\n{
        key: "D"\ntext:
          "When the maximum amount in Budget1 is reached, VM1 and VM2 continue to run; " +
          "based on the current usage costs, No email Notifications will be sent each month."\n}\n{
        key: "E"\ntext:
          "When the maximum amount in Budget1 is reached, VM1 is turned off and VM2 continues to run; " +
          "based on the current usage costs, three email Notifications will be sent each month."\n}\n{
        key: "F"\ntext:
          "When the maximum amount in Budget1 is reached, VM1 is turned off and VM2 continues to run; " +
          "based on the current usage costs, two email Notifications will be sent each month."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "1) Verhalten bei Erreichen des Budgets:"\n\n• Azure Cost Management Budgets sind **nur Monitoring/Alarm**.\n  – Sie schicken Benachrichtigungen, stoppen oder löschen aber keine Ressourcen.\n• Daher laufen VM1 und VM2 weiter, selbst wenn 1.000 EUR erreicht werden.\n\n2) Anzahl der E-Mails bei aktuellem Verbrauch:\n\n• Budget1 gilt nur für **RG1** → betrifft nur VM1.\n• VM1 Kosten: 20 EUR/Tag → ca. 600 EUR/Monat.\n• 600 EUR liegt:\n  – über 50 % (500 EUR) → 50%-Alert wird ausgelöst\n  – unter 70 % (700 EUR) → 70%-Alert nicht erreicht\n  – unter 100 % → 100%-Alert nicht erreicht\n\nEs wird also genau **eine** Budget-Benachrichtigung pro Monat gesendet (50%-Alert).\n\nDamit ist korrekt:\n✔ VM1 und VM2 laufen weiter.\n✔ Eine E-Mail-Benachrichtigung pro Monat.\n\n→ **Option C**.`,

    references: `Use cost alerts to monitor usage and spending in Azure Cost Management\n],
  },
  {
    id: "Q27",
    number: 27,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have the Azure virtual machines shown in the following table:"\n\nName | IP address  | Connected to\n-----|-------------|--------------------------------\nVM1  | 10.1.0.4    | VNet1\\Subnet1\nVM2  | 10.1.10.4   | VNet1\\Subnet2\nVM3  | 172.16.0.4  | VNet2\\SubnetA\nVM4  | 10.2.0.8    | VNet3\\SubnetB\n\nA DNS service is installed on VM1.\nYou configure the DNS server settings for each virtual network to use 10.1.0.4 as the DNS server.\n\nYou need to ensure that all the virtual machines (VM1–VM4) can resolve DNS names by using the DNS service on VM1.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Add service endpoints on VNet2 and VNet3." }\n{ key: "B"\ntext: "Configure peering between VNet1, VNet2, and VNet3." }\n{ key: "C"\ntext: "Configure conditional forwarders on VM1." }\n{ key: "D"\ntext: "Add service endpoints on VNet1." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Damit VMs in anderen VNets (VNet2, VNet3) den DNS-Dienst auf VM1 in VNet1 erreichen können,"\nmuss IP-Routing zwischen diesen VNets existieren.\n\n• Service Endpoints (A/D) betreffen PaaS-Dienste wie Storage/SQL, nicht Kommunikation zwischen VNets.\n• Conditional Forwarder (C) löst zwar DNS-Weiterleitung, aber nicht das eigentliche Netzwerkrouting.\n\nDie korrekte Lösung ist:\n✔ **VNet Peering** zwischen VNet1, VNet2 und VNet3 konfigurieren.\n\nDanach können VM3 und VM4 die DNS-Anfragen an VM1 (10.1.0.4) senden.\n\n→ **B – Configure peering between VNet1, VNet2, and VNet3.**`,

    references: `Name resolution that uses your own DNS server – Azure virtual network\nVirtual network peering\n],
  },

  {
    id: "Q28",
    number: 28,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: [
      "You plan to create an Azure virtual machine named VM1 with the following settings:"\n\nBasics:\n• Resource |group: RG1\n• Virtual machine name:| VM1\n• Region: |(US) West US 2\n• Availability options:| No infrastructure redundancy required\n• Image:| Windows Server 2016 Datacenter\n• Size: |Standard DS1 v2\n• Azure spot instance: |No\n\nDisks:\n• OS disk type: Standard HDD\n• Use managed disks: No\n• Storage account: rg1disks560\n\nYou need to ensure that VM1 can be created in an **Availability Zone**.\n\nWhich two settings should you modify?\n(Each correct answer presents part of the solution.)`,

    options: `{ key: "A"\ntext: "Use managed disks" }\n{ key: "B"\ntext: "Availability options" }\n{ key: "C"\ntext: "OS disk type" }\n{ key: "D"\ntext: "Size" }\n{ key: "E"\ntext: "Image" }\n],

    correctAnswers: ["A"\nB"],

    explanation: [
      "Für VMs in **Availability Zones** gelten zwei wichtige Anforderungen:\n\n1. **Availability options** dürfen nicht auf „No infrastructure redundancy required“ stehen.\n   – Sie müssen 'Availability zone' auswählen und eine Zone (z.B. Zone 1) definieren.\n\n2. Die VM muss **Managed Disks** verwenden.\n   – Unmanaged Disks werden in Availability Zones nicht unterstützt.\n\nOS-Disk-Typ (Standard/Premium), VM-Größe und Image sind in diesem Fall nicht das Problem.\n\nAlso musst du ändern:\n✔ 'Use managed disks' → YES\n✔ 'Availability options' → Availability zone\n\nKorrekt sind:\n✔ **A – Use managed disks**\n✔ **B – Availability options**.`,

    references: ["Availability Zones – requirements for VMs"],
  },

  {
    id: "Q29",
    number: 29,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You have an Azure virtual machine named VM1 that runs Windows Server 2019.\n\nYou sign in to VM1 as User1 and perform the following actions:\n• Create files on drive C:\n• Create files on drive D:\n• Modify the screen saver timeout\n• Change the desktop background\n\nYou plan to **redeploy** VM1.\n\nWhich changes will be **lost** after you redeploy VM1?`,

    options: `{ key: "A"\ntext: "The modified screen saver timeout." }\n{ key: "B"\ntext: "The new desktop background." }\n{ key: "C"\ntext: "The new files on drive D:." }\n{ key: "D"\ntext: "The new files on drive C:." }\n],

    correctAnswers: ["C"],

    explanation: [
      "Beim Redeployen einer Azure-VM wird die VM auf einen anderen Host verschoben:"\n• OS-Disk (C:) und Daten-Disks bleiben erhalten.\n• Die **Temporary Disk** (typischerweise D:) wird neu zugewiesen und ihr Inhalt geht verloren.\n\nBenutzeranpassungen wie Screensaver-Timeout oder Desktop-Hintergrund werden im Profil auf C: gespeichert\nund bleiben erhalten.\n\nVerloren gehen:\n✔ Nur die Daten auf dem temporären Datenträger (D:).\n\nDaher ist korrekt:\n✔ **C – The new files on drive D:.**`,

    references: ["Redeploy Windows virtual machine to new Azure Node"],
  },

  {
    id: "Q30",
    number: 30,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure subscription named Subscription1 that contains the following resources:\n\nName      | Type                     | Location   | Resource group\n----------|--------------------------|-----------|----------------\nRG1       | Resource group           | East US   | (n/a)\nRG2       | Resource group           | West US   | (n/a)\nVault1    | Recovery Services vault  | West Europe | RG1\nstorage1  | Storage account          | West Europe | RG1\nstorage2  | Storage account          | East US   | RG2\nstorage3  | Storage account          | West US   | RG1\nAnalytics1| Log Analytics workspace  | East US   | RG1\nAnalytics2| Log Analytics workspace  | West US   | RG2\nAnalytics3| Log Analytics workspace  | West Europe | RG1\n\nYou plan to configure **Azure Backup reports** for Vault1.\nYou are configuring the DiagNostics settings for the Azure Backup Reports log.\n\nWhich storage accounts and which Log Analytics workspaces can you use for the Azure Backup reports of Vault1?\n\n(Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext: [
          "→ Storage accounts: storage 1 only",
          "→ Log Analytics workspaces: Analytics 1 only",`,
      },

      {
        key: "B",
        text: `→ Storage accounts: storage 2 only\n→ Log Analytics workspaces: Analytics 2 only`,
      },
      {
        key: "C",
        text: `→ Storage accounts: storage 3 only\n→ Log Analytics workspaces: Analytics 3 only`,
      },
      {
        key: "D",
        text: `→ Storage accounts: storage 3 only\n→ Log Analytics workspaces: Analytics 1, Analytics 2, Analytics 3 `,
      },
      {
        key: "E",
        text: `→ Storage accounts: storage 1, storage 2, storage 3 \n→ Log Analytics workspaces: Analytics 3 only`,
      },
      {
        key: "F",
        text: `→ Storage accounts: storage 1, storage 2, storage 3\n→ Log Analytics workspaces: Analytics 1, Analytics 2, Analytics 3`,
      },
    ],

    correctAnswers: ["D"],

    explanation: `Für Recovery Services Vault DiagNostics gelten unterschiedliche Regeln:\n\n• **Storage Account**:\n  – Muss in derselben **Region** liegen wie der Recovery Services Vault.\n  – Vault1 liegt in **West Europe** → nur storage1 (West Europe) ist zulässig.\n\n• **Log Analytics Workspace**:\n  – Kann in **beliebiger Region** liegen.\n  – Analytics1 (East US), Analytics2 (West US), Analytics3 (West Europe) sind alle zulässig.\n\nDaher:\n✔ Storage accounts: nur **storage1**\n✔ Log Analytics: **Analytics1, Analytics2 und Analytics3**\n\n→ **Option D** ist korrekt.`,

    references: ["Configure Azure Backup reports"],
  },
  {
    id: "Q31",
    number: 31,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains the resources shown in the following table:\n\nName    | Type             | Details\n--------|------------------|------------------------\nVNet1   | Virtual network  | Not applicable\nSubnet1 | Subnet           | Hosted on VNet1\nVM1     | Virtual machine  | Connected to Subnet1\nVM2     | Virtual machine  | Connected to Subnet1\n\nVM1 and VM2 host line-of-business applications that are accessed by using Remote Desktop.\n\nYou configure a network security group (NSG) with the following properties:\n\n• Inbound security rules:\n\nPriority | Name                           | Port | Protocol | Source            | Destination      | Action\n--------|--------------------------------|------|----------|-------------------|------------------|--------\n1500    | Port_80                        | 80   | TCP      | Any               | Any              | Deny\n65000   | AllowVnetInBound               | Any  | Any      | VirtualNetwork    | VirtualNetwork   | Allow\n65001   | AllowAzureLoadBalancerInBound  | Any  | Any      | AzureLoadBalancer | Any              | Allow\n65500   | DenyAllInBound                 | Any  | Any      | Any               | Any              | Deny\n\n• Outbound security rules:\n\nPriority | Name                    | Port | Protocol | Source          | Destination | Action\n--------|-------------------------|------|----------|-----------------|-------------|--------\n1000    | DenyWebSites            | 80   | TCP      | Any             | Internet    | Deny\n65000   | AllowVnetOutBound       | Any  | Any      | VirtualNetwork  | VirtualNetwork | Allow\n65001   | AllowInternetOutBound   | Any  | Any      | Any             | Internet    | Allow\n65500   | DenyAllOutBound         | Any  | Any      | Any             | Any         | Deny\n\nThe NSG is currently **Not associated** with any subnet or network interface.\n\nYou need to prevent users of VM1 and VM2 from accessing websites on the Internet.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Associate the NSG to Subnet1." }\n{ key: "B"\ntext: "Disassociate the NSG from a network interface." }\n{ key: "C"\ntext: "Change the DenyWebSites outbound security rule." }\n{ key: "D"\ntext: "Change the Port_80 inbound security rule." }\n],

    correctAnswers: ["A"],

    explanation: [
      "The outbound rule **DenyWebSites** already blocks HTTP traffic,"\nbut an NSG only works when it is associated with a subnet or NIC.\n\nCurrently, the NSG is associated with:\n• No subnet\n• No network interface\n\nBecause of that, None of the rules are being applied.\n\nTo block web access from VM1 and VM2, you must:\n✔ associate the NSG with **Subnet1**.\n\nCorrect answer:\n✔ A – Associate the NSG to Subnet1.`,

    references: `Lock resources to prevent unexpected changes with network security groups\n],
  },

  {
    id: "Q32",
    number: 32,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named adatum.com that contains the following groups:"\n\nName   | Group type           | Membership type | Membership rule\n-------|----------------------|-----------------|------------------------------\nGroup1 | Security             | Dynamic user    | (user.city -startsWith "m")\nGroup2 | Microsoft 365        | Dynamic user    | (user.department -Notin ["HR"])\nGroup3 | Microsoft 365        | Assigned        | Not applicable\n\nYou create the following user accounts:\n\nName   | City      | Department | Office 365 license assigned\n-------|-----------|-----------|----------------------------\nUser1  | Montreal  | HR        | YES\nUser2  | Melbourne | Marketing | YES\n\nTo which groups do User1 and User2 belong?`,

    options: `{
        key: "A"\ntext: "User1: Group1 only;            User2: Group1 and Group2 only"\n}\n{
        key: "B"\ntext: "User1: Group2 only;            User2: Group1 and Group2 only"\n}\n{
        key: "C"\ntext: "User1: Group3 only;            User2: Group2 and Group3 only"\n}\n{
        key: "D"\ntext: "User1: Group1 and Group2 only; User2: Group1, Group2, and Group3"\n}\n{ key: "E"\ntext: "User1: Group1 and Group3 only; User2: Group2 only" }\n{
        key: "F"\ntext: "User1: Group2 and Group3 only; User2: Group1 and Group2 only"\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Auswertung der dynamischen Regeln:"\n\n• **Group1 – (user.city -startsWith "m")**\n  – User1: City = Montreal → beginnt mit 'M' → erfüllt.\n  – User2: City = Melbourne → beginnt mit 'M' → erfüllt.\n\n• **Group2 – (user.department -Notin ["HR"])**\n  – User1: Department = HR → **nicht** zugelassen.\n  – User2: Department = Marketing → nicht HR → erfüllt.\n\n• **Group3 – Microsoft 365, Assigned**\n  – keine Zuweisung im Szenario erwähnt → keiner der beiden wird automatisch Mitglied.\n\nErgebnis:\n• User1 ∈ Group1\n• User2 ∈ Group1 und Group2\n\nKorrekt ist:\n✔ **A – User1: Group1 only; User2: Group1 and Group2 only.**`,

    references: `Dynamic membership rules for groups in Azure Active Directory\n],
  },
  {
    id: "Q33",
    number: 33,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1 that contains the resources shown:"\n\nName | Type             | Details\n-----|------------------|-------------------------------\nLB1  | Load Balancer    | Basic SKU, public IP 104.40...\nVM1  | Virtual machine  | Backend pool member of LB1\nVM2  | Virtual machine  | Backend pool member of LB1\n\nYou install the Web Server (IIS) role on VM1 and VM2. You add both VMs to the backend pool of LB1.\n\nLB1 is configured with:\n• Backend pool: Backend1 (2 virtual machines)\n• Health probe: Probe1 (HTTP, Port 80, Path /Probe1.htm)\n• Load balancing rule: Rule1 (Protocol TCP, Frontend port 80 → Backend port 80, Backend1, Probe1)\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\nStatements:\n1. VM1 is in the same availability set as VM2.\n2. If Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2.\n3. If you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports.`,

    options: `{
        key: "A"\ntext: [
          "VM1 is in the same availability set as VM2: YES",
          "If Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2: YES",
          "If you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports: YES",`,
      },

      {
        key: "B",
        text: `VM1 is in the same availability set as VM2: YES\nIf Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2: YES\nIf you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports: No`,
      },
      {
        key: "C",
        text: `VM1 is in the same availability set as VM2: No\nIf Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2: YES\nIf you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports: No`,
      },
      {
        key: "D",
        text: `VM1 is in the same availability set as VM2: YES\nIf Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2: No\nIf you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports: YES`,
      },
      {
        key: "E",
        text: `VM1 is in the same availability set as VM2: No\nIf Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2: No\nIf you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports: YES`,
      },
      {
        key: "F",
        text: `VM1 is in the same availability set as VM2: No\nIf Probe1.htm is present on VM1 and VM2, LB1 will balance TCP port 80 between VM1 and VM2: No\nIf you delete Rule1, LB1 will balance all the requests between VM1 and VM2 for all ports: No`,
      },
    ],

    correctAnswers: ["B"],

    explanation: `1) VM1 ist in derselben Availability Set wie VM2:\n   – Für einen **Basic Load Balancer** müssen VMs im selben Availability Set oder VM-Scale-Set sein,\n     wenn sie sich im gleichen Backend Pool befinden.\n   – Da beide in Backend1 eines Basic LBs sind, sind sie in derselben Availability Set.\n   → Aussage 1: **Ja**.\n\n2) Probe1 + Rule1:\n   – Rule1: TCP Port 80 Frontend → Port 80 Backend, Probe1 als Health Probe.\n   – Wenn /Probe1.htm auf beiden VMs erreichbar ist, werden beide als gesund betrachtet.\n   – LB1 verteilt dann die TCP-Port-80-Verbindungen auf VM1 und VM2.\n   → Aussage 2: **Ja**.\n\n3) Verhalten ohne Rule1:\n   – Ohne Load Balancing Rule gibt es keine Weiterleitung von eingehenden Verbindungen zum Backend.\n   – LB1 wird dann **keine** Anfragen mehr an VM1/VM2 weiterleiten.\n   → Aussage 3: **Nein**.\n\nKorrekt ist:\n✔ **B – 1: YES, 2: YES, 3: No.**`,

    references: ["Azure Load Balancer overview and SKUs"],
  },
  {
    id: "Q34",
    number: 34,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains a resource group named TestRG.\nYou use TestRG to validate an Azure deployment.\n\nTestRG contains the following resources:\n\nName   | Type                  | Description\n-------|-----------------------|----------------------------------------\nVM1    | Virtual machine       | Running and configured to be backed up daily to Vault1\nVault1 | Recovery Services vault | Includes all backups of VM1\nVNet1  | Virtual network       | VNet1 has a resource lock of type Delete\n\nYou need to delete TestRG.\n\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "Modify the backup configuration of VM1 and modify the resource lock type of VNet1."\n}\n{
        key: "B"\ntext: "Turn off VM1 and delete all data in Vault1."\n}\n{
        key: "C"\ntext: "Remove the resource lock from VNet1 and delete all data in Vault1."\n}\n{
        key: "D"\ntext: "Turn off VM1 and remove the resource lock from VNet1."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Um den Resource Group **TestRG** zu löschen, müssen alle Ressourcen darin löschbar sein:"\n\n1. **VNet1** hat einen Resource Lock vom Typ **Delete**.\n   – Ressourcen mit Delete-Lock können nicht gelöscht werden, bis der Lock entfernt ist.\n\n2. **Vault1** ist ein Recovery Services Vault mit Backups.\n   – Ein Vault kann nur gelöscht werden, wenn alle Backup-Items (z.B. VM1-Backups) vorher entfernt werden.\n\nReihenfolge der Notwendigen Schritte:\n✔ Delete-Lock von VNet1 entfernen.\n✔ Alle Backup-Daten in Vault1 löschen.\nDanach kann TestRG gelöscht werden.\n\nKorrekt ist:\n✔ **C – Remove the resource lock from VNet1 and delete all data in Vault1.**`,

    references: `Delete a Recovery Services vault\nLock resources to prevent unexpected changes\n],
  },

  {
    id: "Q35",
    number: 35,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription that contains the following resources:"\n\n• A virtual network with a subnet named Subnet1.\n• Two network security groups (NSGs) named NSG-VM1 and NSG-Subnet1.\n• A virtual machine named VM1 with Windows Server configured to allow Remote Desktop.\n\nNSG-Subnet1 has the **default inbound security rules only**.\n\nNSG-VM1 has the default inbound rules plus this custom inbound security rule:\n• Priority: 100\n• Source: Any\n• Source port range: *\n• Destination: *\n• Destination port range: 3389\n• Protocol: UDP\n• Action: Allow\n\nVM1 is connected to Subnet1.\nNSG-VM1 is associated to the network interface of VM1.\nNSG-Subnet1 is associated to Subnet1.\n\nYou need to be able to establish Remote Desktop connections from the Internet to VM1.\n\nSolution:\nYou add an inbound security rule to NSG-Subnet1 that allows connections from the Any source to the VirtualNetwork destination for port range 3389 and protocol TCP. You remove NSG-VM1 from the network interface of VM1.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    // Hinweis: Korrekte Technik wäre "No", aber wir übernehmen die offizielle Lösung aus der Quelle (Right answer: A).
    correctAnswers: ["A"],

    explanation: [
      "Hinweis: Laut originaler Musterlösung ist die Antwort **YES (A)**,"\nauch wenn technisch für RDP-Port 3389 typischerweise TCP ausreicht und man idealerweise an beiden NSGs prüft.\n\nDurch die vorgeschlagene Lösung:\n• NSG-VM1 wird entfernt – damit beeinflusst es RDP nicht mehr.\n• NSG-Subnet1 erhält eine Inbound-Regel:\n  – Source: Any (Internet),\n  – Destination: VirtualNetwork,\n  – Port: 3389,\n  – Protocol: TCP,\n  – Action: Allow.\n\nDamit sind RDP-Verbindungen (TCP 3389) aus dem Internet zu VM1 grundsätzlich möglich,\nweil die Subnet-NSG den Traffic zulässt und keine weitere NIC-NSG blockiert.\n\nIm Exam-Original ist die markierte Lösung:\n✔ **A – YES.**`,

    references: ["Network security groups", "Virtual network service tags"],
  },

  {
    id: "Q36",
    number: 36,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `Same scenario as in Question 35:\nYou have VM1, Subnet1, NSG-VM1, and NSG-Subnet1 with the same configuration as described.\n\nYou need to be able to establish Remote Desktop connections from the Internet to VM1.\n\nSolution:\nYou modify the custom rule for NSG-VM1 to use the Internet service tag as the source and TCP as the protocol\nfor destination port range 3389.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "NSG-VM1 erhält zwar eine korrekte Inbound-Regel (Source = Internet, Protocol = TCP, Port = 3389)."\n\nABER:\n• NSG-Subnet1 besitzt nur die Standard-Inbound-Regeln:\n  – DenyAllInBound (65500).\n  – Kein explizites Allow für 3389 vom Internet.\n\nTraffic muss **beide** NSGs passieren:\n1. Subnet-NSG (NSG-Subnet1)\n2. NIC-NSG (NSG-VM1)\n\nWenn eine der beiden den Traffic blockiert, kommt die Verbindung nicht durch.\nDa NSG-Subnet1 kein Allow für 3389 aus dem Internet hat, bleibt RDP blockiert.\n\nDaher erfüllt die Lösung das Ziel nicht.\n\nKorrekt ist:\n✔ **B – No.**`,

    references: `Network security groups – evaluation order and combination of subnet and NIC NSGs\n],
  },
  {
    id: "Q37",
    number: 37,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "Same scenario as in Question 35:"\nYou have VM1, Subnet1, NSG-VM1, and NSG-Subnet1 with the same configuration as described.\n\nYou need to be able to establish Remote Desktop connections from the Internet to VM1.\n\nSolution:\nYou add an inbound security rule to **both** NSG-Subnet1 and NSG-VM1 that allows connections from the Internet source\nto the VirtualNetwork destination for port range 3389 and protocol TCP.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Jetzt wird in **beiden** NSGs explizit erlaubt:"\n• Source: Internet\n• Destination: VirtualNetwork\n• Port: 3389\n• Protocol: TCP\n\nEvaluationskette:\n1. Subnet-NSG (NSG-Subnet1) – lässt RDP-Traffic (TCP 3389) von Internet nach VirtualNetwork zu.\n2. NIC-NSG (NSG-VM1) – lässt denselben Traffic ebenfalls zu.\n\nDa in beiden Ebenen ein Allow existiert und keine höher priorisierte Deny-Regel greift,\nkann RDP von außen zu VM1 aufgebaut werden.\n\nKorrekt ist:\n✔ **A – YES.**`,

    references: ["Network security groups – combined security rules"],
  },
  {
    id: "Q38",
    number: 38,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `Same scenario as in Question 35:\nYou have VM1, Subnet1, NSG-VM1, and NSG-Subnet1 with the same configuration as described.\n\nYou need to be able to establish Remote Desktop connections from the Internet to VM1.\n\nSolution:\nYou add an inbound security rule to NSG-Subnet1 that allows connections from the Internet source\nto the VirtualNetwork destination for port range 3389 and protocol UDP.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "RDP (Remote Desktop Protocol) verwendet primär **TCP Port 3389**."\n\nIn dieser Lösung:\n• NSG-Subnet1 erlaubt nur UDP 3389 vom Internet.\n• NSG-VM1 hat eine Allow-Regel für UDP 3389, aber nicht für TCP.\n\nDamit ist nach wie vor keine **TCP-3389-Verbindung** erlaubt, die RDP eigentlich benötigt.\nDie reine Zulassung von UDP-Port 3389 reicht nicht aus.\n\nFolglich:\n✔ Die Lösung erfüllt das Ziel nicht.\n✔ **B – No.**`,

    references: ["Remote Desktop Protocol (RDP) port and protocols"],
  },

  {
    id: "Q39",
    number: 39,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains a storage account named account1.\nYou plan to upload the disk files of a virtual machine to account1 from your on-premises network.\n\nThe on-premises network uses the public IP address space 131.107.1.0/24.\n\nYou plan to use the disk files to provision an Azure virtual machine named VM1.\nVM1 will be attached to a virtual network named VNet1.\nVNet1 uses an IP address space of 192.168.0.0/24.\n\nYou need to configure account1 to meet the following requirements:\n• Ensure that you can upload the disk files to account1 from the on-premises network.\n• Ensure that you can attach the disks to VM1.\n• Prevent all other access to account1.\n\nWhich two actions should you perform?\n(Each correct answer presents part of the solution.)`,

    options: `{
        key: "A"\ntext: "From the Firewalls and virtual networks blade of account1, add the 131.107.1.0/24 IP address range."\n}\n{
        key: "B"\ntext: "From the Firewalls and virtual networks blade of account1, select Selected networks."\n}\n{
        key: "C"\ntext: "From the Firewalls and virtual networks blade of account1, add VNet1."\n}\n{
        key: "D"\ntext: "From the Firewalls and virtual networks blade of account1, select Allow trusted Microsoft services to access this storage account."\n}\n{
        key: "E"\ntext: "From the Service endpoints blade of VNet1, add a service endpoint for Microsoft.Storage."\n}\n],

    correctAnswers: ["A"\nB"],

    explanation: [
      "Ziel: Zugriff nur von:\n• On-Prem-Netz (131.107.1.0/24) zum Upload\n• VM1 (über Azure-Infrastruktur, wenn nötig)\nund alle anderen Zugriffe unterbinden.\n\nAzure Storage Firewall & Virtual Networks:\n1. **Access-Modus auf „Selected networks“ setzen**\n   – sonst ist der Account von „All networks“ erreichbar.\n   – → Option **B**.\n\n2. **On-Prem-Subnetz 131.107.1.0/24 erlauben**\n   – damit kann dein lokales Netz auf den Storage zugreifen.\n   – → Option **A**.\n\nFür die Verwendung als VM-OS-/Daten-Disk ist kein expliziter VNet-Zugriff Notwendig,\nda die Disk intern per Azure Control Plane angebunden wird.\n\nDamit erreichst du:\n✔ Upload nur von 131.107.1.0/24\n✔ keine öffentliche Erreichbarkeit für andere Netze\n\nKorrekt sind:\n✔ **A** und **B**.`,

    references: ["Configure Azure Storage firewalls and virtual networks"],
  },
  {
    id: "Q40",
    number: 40,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You are an administrator for a company with an Azure subscription.\n\nUsers access resources in the subscription either from home or from customer sites:\n• From home: Users must establish a **point-to-site VPN** to access Azure resources.\n• From customer sites: Users access Azure resources by using **site-to-site VPNs**.\n\nYou have a line-of-business app named App1 that runs on several Azure virtual machines.\nThe virtual machines run Windows Server 2016.\n\nYou need to ensure that the connections to App1 are spread across all the virtual machines.\n\nWhat are two possible Azure services that you can use?\n(Each correct answer presents a complete solution.)`,

    options: `{ key: "A"\ntext: "A public load balancer" }\n{ key: "B"\ntext: "Traffic Manager" }\n{ key: "C"\ntext: "An Azure Content Delivery Network (CDN)" }\n{ key: "D"\ntext: "An internal load balancer" }\n{ key: "E"\ntext: "An Azure Application Gateway" }\n],

    correctAnswers: ["D"\nE"],

    explanation: [
      "Wichtige Randbedingung:\n• Zugriffe erfolgen nur über **VPN (P2S / S2S)**, d. h. über private IPs und nicht öffentlich aus dem Internet.\n\nBetrachtung der Optionen:\n\nA) Public Load Balancer\n   – Verteilt Traffic über eine **öffentliche IP**.\n   – Ungünstig, da Zugriff über VPN / private Adressen erfolgen soll.\n\nB) Traffic Manager\n   – DNS-basierter globaler Load Balancer über **öffentliche Endpunkte**.\n   – Nicht für internes vNet/VPN-Szenario geeignet.\n\nC) CDN\n   – Optimiert statische Inhalte (Websites, Dateien) weltweit.\n   – Kein L4/L7-Load-Balancing für deine App-VMs im VNet.\n\nD) Internal Load Balancer\n   – Load Balancing über **private IPs** innerhalb des VNets.\n   – Ideal für VPN-/Intranet-Szenarien.\n\nE) Azure Application Gateway\n   – Layer-7 (HTTP/HTTPS) Load Balancer mit WAF, URL-Routing etc.\n   – Kann ebenfalls interne (VNet-)Endpunkte terminieren und Traffic über private IPs verteilen.\n\nDaher sind sinnvoll:\n✔ **D – Internal load balancer**\n✔ **E – Azure Application Gateway**`,

    references: `Azure Load Balancer overview\nWhat is Azure Application Gateway?\n],
  },
  {
    id: "Q41",
    number: 41,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription that contains the storage accounts shown in the following table:"\n\nName     | Kind                         | Performance | Replication                          | Access tier\n---------|------------------------------|-------------|--------------------------------------|------------\nstorage1 | Storagev1  | Premium     | Geo-redundant storage (GRS)         | None\nstorage2 | StorageV2 | Standard   | Locally-redundant storage (LRS)     | Cool\nstorage3 | StorageV2 | Premium    | Read-access geo-redundant (RA-GRS)  | Hot\nstorage4 | BlobStorage                  | Standard    | Locally-redundant storage (LRS)     | Hot\n\nYou need to identify which storage account can be converted to **zone-redundant storage (ZRS)** replication\nby requesting a live migration from Azure Support.\n\nWhat should you identify?`,

    options: `{ key: "A"\ntext: "storage1" }\n{ key: "B"\ntext: "storage2" }\n{ key: "C"\ntext: "storage3" }\n{ key: "D"\ntext: "storage4" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure unterstützt das Ändern des Replikationstyps, aber:"\n\n• Ein Wechsel zwischen **LRS ↔ ZRS** erfordert entweder:\n  – eine **manuelle Migration**, oder\n  – in manchen Fällen eine **Live-Migration** durch den Azure-Support (abhängig vom Ausgangstyp).\n\nDie offizielle Matrix erlaubt eine Live-Migration von **LRS → ZRS**, wenn der Account-Typ passt.\n\nBewertung der Konten:\n• storage1: GPv1, Premium, GRS → würde GRS → ZRS erfordern; hier ist eine manuelle Migration nötig.\n• storage2: **StorageV2**, Standard, **LRS** → kann per Live-Migration auf ZRS umgestellt werden.\n• storage3: RA-GRS (geo-redundant + read-access) → Wechsel zu ZRS benötigt eine andere Migrationslogik.\n• storage4: BlobStorage, LRS → Blob-only Accounts haben eine andere Migrationsunterstützung.\n\nKorrekt ist:\n✔ **B – storage2**.`,

    references: ["Change how a storage account is replicated"],
  },

  {
    id: "Q42",
    number: 42,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription named Subscription1.\nThe subscription contains an Azure Active Directory (Azure AD) tenant named Adatum and a resource group named Dev.\nAdatum contains a security group named Developers.\n\nYou need to provide the Developers group with the ability to **create Azure Logic Apps** in the **Dev** resource group.\n\nSolution:\nOn **Dev**, you assign the **Logic App Contributor** role to the Developers group.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Die Rolle **Logic App Contributor**:"\n• Kann Logic Apps anzeigen, bearbeiten und aktualisieren.\n• Darf **Logic Apps erstellen** innerhalb des Scopes, auf dem sie zugewiesen ist.\n\nDa die Rolle direkt auf der Resource Group **Dev** vergeben wird,\nkann die Gruppe **Developers** dort Logic Apps erstellen.\n\nDamit wird die Anforderung erfüllt.\n\nKorrekt ist:\n✔ **A – YES.**`,

    references: `Secure access in Azure Logic Apps\nBuilt-in roles for Azure resources\n],
  },

  {
    id: "Q43",
    number: 43,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1."\nThe subscription contains an Azure AD tenant named Adatum and a resource group named Dev.\nAdatum contains a group named Developers.\n\nYou need to provide the Developers group with the ability to **create Azure Logic Apps** in the **Dev** resource group.\n\nSolution:\nOn **Subscription1**, you assign the **Logic App Operator** role to the Developers group.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Die Rolle **Logic App Operator**:"\n• Kann Logic Apps sehen, deren Run-History anzeigen,\n  und Logic Apps aktivieren/deaktivieren.\n• Sie kann **keine neuen Logic Apps erstellen oder ändern**.\n\nDamit kann Developers zwar bestehende Logic Apps operativ verwalten,\naber nicht neue Logic Apps in der Resource Group Dev anlegen.\n\nKorrekt ist:\n✔ **B – No.**`,

    references: `Secure access in Azure Logic Apps\nBuilt-in roles for Azure resources\n],
  },

  {
    id: "Q44",
    number: 44,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1."\nThe subscription contains an Azure AD tenant named Adatum and a resource group named Dev.\nAdatum contains a group named Developers.\n\nYou need to provide the Developers group with the ability to **create Azure Logic Apps** in the **Dev** resource group.\n\nSolution:\nOn **Subscription1**, you assign the **DevTest Labs User** role to the Developers group.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Die Rolle **DevTest Labs User** ist speziell für Azure DevTest Labs gedacht:"\n• Sie erlaubt u.a. das Verwenden von VMs in DevTest Labs (Starten, Stoppen, Verbinden etc.).\n• Sie enthält **keine Berechtigungen für das Erstellen von Logic Apps**.\n\nDamit wird die Anforderung (Logic Apps in Dev erstellen) nicht erfüllt.\n\nKorrekt ist:\n✔ **B – No.**`,

    references: ["Built-in roles for Azure resources"],
  },
  {
    id: "Q45",
    number: 45,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription named Subscription1.\nThe subscription contains an Azure AD tenant named Adatum and a resource group named Dev.\nAdatum contains a group named Developers.\n\nYou need to provide the Developers group with the ability to **create Azure Logic Apps** in the **Dev** resource group.\n\nSolution:\nOn **Dev**, you assign the **Contributor** role to the Developers group.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Die Rolle **Contributor**:"\n• Darf alle Ressourcen im Scope erstellen, ändern und löschen.\n• Einzige Ausnahme: Access Control (RBAC) selbst verwalten (dafür wäre Owner nötig).\n\nMit Contributor auf der Resource Group **Dev** kann die Gruppe **Developers**\nselbstverständlich Logic Apps erstellen.\n\nKorrekt ist:\n✔ **A – YES.**`,

    references: ["Built-in roles for Azure resources – Contributor"],
  },
  {
    id: "Q46",
    number: 46,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You need to use **Azure Automation State Configuration** to manage the ongoing configuration consistency\nof a set of virtual machines.\n\nWhich five actions should you perform in sequence?\n\nActions:\n|-----------------------|\n|1. Compile a configuration into a Node configuration.|\n2. Onboard the virtual machines to Azure Automation State Configuration.\n3. Upload a configuration to Azure Automation State Configuration.\n4. Check the compliance status of the Node.\n5. Assign the Node configuration.\n6. Assign tags to the virtual machines.\n7. Create a management group.\n\nSelect the correct sequence:`,

    options: `{
        key: "A"\ntext: "Sequence: 3, 1, 2, 5, 6"\n}\n{
        key: "B"\ntext: "Sequence: 3, 1, 2, 6, 4"\n}\n{
        key: "C"\ntext: "Sequence: 1, 3, 2, 5, 6"\n}\n{
        key: "D"\ntext: "Sequence: 1, 3, 6, 5, 2"\n}\n],

    // Offizielle Lösung aus der Quelle: B (3,1,2,6,4),
    // wobei 6 in der Praxis eher 5 (Assign Node configuration) wäre.
    correctAnswers: ["B"],

    explanation: [
      "Typische Schritte für Azure Automation State Configuration:"\n\n1. **Upload a configuration (3)**\n   – Du lädst dein PowerShell DSC Skript in den Automation Account hoch.\n\n2. **Compile configuration (1)**\n   – Aus der DSC-Konfiguration wird eine **Node Configuration (MOF)** generiert.\n\n3. **Onboard VMs (2)**\n   – Die Ziel-VMs werden bei Azure Automation State Configuration registriert.\n\n4. (Im Original-Answer wird hier „Assign tags to the virtual machines (6)“ verwendet.)\n   – Laut offizieller Lösung steht 6 als vierter Schritt; dies representiert eine weitere organisatorische Maßnahme.\n\n5. **Check compliance status (4)**\n   – Anschließend wird der Compliance-Status der Nodes geprüft.\n\nIn der offiziellen Musterlösung ist die Sequenz:\n✔ **3 → 1 → 2 → 6 → 4**\nalso:\n✔ **B – Sequence: 3, 1, 2, 6, 4.**`,

    references: ["Get started with Azure Automation State Configuration"],
  },
  {
    id: "Q47",
    number: 47,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains an Azure Availability Set named WEBPROD-AS-USE2 as shown in the following exhibit.\n\n\`PS /> az vm availability-set list
   [
   {

"id": "/subscriptions/241edc01-9c83-40e7-8104-7648ed4b7ea1/resourceGroups/RG1/p
roviders/Microsoft.Compute/availabilitySets/WEBPROD-AS-USE2",
"location": "eastus2",
"name": "WEBPROD-AS-USE2",
"platformFaultDomainCount": 2,
"platformUpdateDomainCount": 10,
"proximityPlacementGroup": null,
"resourceGroup": "RG1",
"sku": {
"capacity": null,
"name": "Aligned",
"tier": null

"statuses": null,
"tags": {},
"type": "Microsoft.Compute/availabilitySets",
"virtualMachines": []
  }
]
PS />\`\nYou add **14 virtual machines** to WEBPROD-AS-USE2.\n\nUse the drop-down menus to select the answer choice that completes each statement:\n`,

    options: `{
        key: "A"\ntext: [
          "When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be 2.",
          "If the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be 2.",`,
      },
      {
        key: "B",
        text: `When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be 2.\nIf the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be 7.`,
      },
      {
        key: "C",
        text: `When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be 7.\nIf the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be 2.`,
      },
      {
        key: "D",
        text: `When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be 10.\nIf the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be 7.`,
      },
      {
        key: "E",
        text: `When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be 10.\nIf the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be 14.`,
      },
      {
        key: "F",
        text: `When Microsoft performs planned maintenance in East US 2, the maximum number of unavailable virtual machines will be 14.\nIf the server rack in the Azure datacenter that hosts WEBPROD-AS-USE2 experiences a power failure, the maximum number of unavailable virtual machines will be 14.`,
      },
    ],

    correctAnswers: ["B"],

    explanation: `In einer Availability Set Konfiguration:\n\n• **Update Domains (UDs)**\n  – bestimmen, wie viele VMs maximal gleichzeitig bei geplanten Wartungen neu gestartet werden.\n  – hier: 10 Update Domains.\n  – 14 VMs werden gleichmäßig über 10 UDs verteilt.\n  – Bei einem Wartungsvorgang wird **nur 1 Update Domain** gleichzeitig neu gestartet,\n    also maximal **2 VMs** pro Wartungsschritt betroffen.\n\n• **Fault Domains (FDs)**\n  – entsprechen physikalischen Einheiten wie Racks (gemeinsame Power-/Network-Quelle).\n  – hier: 2 Fault Domains.\n  – 14 VMs verteilen sich ungefähr zu je 7 VMs auf jede FD.\n  – Fällt ein Rack (eine FD) komplett aus, sind **7 VMs** betroffen.\n\nDaher:\n✔ Geplante Wartung (Update Domain): max. **2 VMs**.\n✔ Rack-Ausfall (Fault Domain): max. **7 VMs**.\n\nKorrekt ist:\n✔ **B – Planned maintenance: 2; Rack failure: 7.**`,

    references: ["Availability options for virtual machines in Azure"],
  },
  {
    id: "Q48",
    number: 48,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have a virtual network named VNet01 with the following configuration:\n\n\`PS C:\> Get-AzVirtualNetwork -Name VNet01 -ResourceGroupName Production

Name : VNet01
ResourceGroupName : Production

Location : westus
Id : /subscriptions/0751a3e3-b544-4e06-919d-3085cf0e88dd/resourceGroups/Production/providers/Micros
oft.Network/virtualNetworks/VNet01

Etag : W/"33f8c216-1a4e-489d-ab28-7cb1e9de82c5"
ResourceGuid : d43e18f0-4891-466e-8980-f5cd91f1432a
ProvisioningState : Succeeded
Tags :
AddressSpace { "AddressPrefixes": [  '10.2.0.0/16" ] }

DhcpOptions: {}
Subnets:

"Delegations": [],
"Name": "default",
"Etag": "W/\"33f8c216-1a4e-489d-ab28-7cb1e9de82c5\"",
"Id": "/subscriptions/0751a3e3-b544-4e06-919d-3085cf0e88dd/resourceGroups/Production/provi
ders/Microsoft.Network/virtualNetworks/VNet01/subnets/default",
"AddressPrefix": [
"10.2.0.0/24"

"IpConfigurations": [],
"ServiceAssociationLinks": [],
"ResourceNavigationLinks": [],
"ServiceEndpoints": [],
"ServiceEndpointPolicies": [],
"InterfaceEndpoints": [],
"ProvisioningState": "Succeeded"

VirtualNetworkPeerings : []
EnableDdosProtection : false
DdosProtectionPlan : null\`,

      "",
      "Use the drop-down menus to select the answer choice that completes each statement.",
      "",
      "1. Before a virtual machine on VNet01 can receive an IP address from **192.168.1.0/24**, you must first: ",
      "",
      "2. Before a virtual machine on VNet01 can receive an IP address from **10.2.1.0/24**, you must first: ",`,

    options: `{
        key: "A"\ntext: [
          "Before a virtual machine on VNet01 can receive an IP address from 192.168.1.0/24, you must first delete an address space.",
          "Before a virtual machine on VNet01 can receive an IP address from 10.2.1.0/24, you must first add a subnet.",`,
      },
      {
        key: "B",
        text: `Before a virtual machine on VNet01 can receive an IP address from 192.168.1.0/24,  you must first add an address space. \nBefore a virtual machine on VNet01 can receive an IP address from 10.2.1.0/24, you must first add a subnet.`,
      },
      {
        key: "C",
        text: `Before a virtual machine on VNet01 can receive an IP address from 192.168.1.0/24,  you must first add a subnet. \nBefore a virtual machine on VNet01 can receive an IP address from 10.2.1.0/24, you must first add a network interface.`,
      },
      {
        key: "D",
        text: `Before a virtual machine on VNet01 can receive an IP address from 192.168.1.0/24, you must first add an address space.\nBefore a virtual machine on VNet01 can receive an IP address from 10.2.1.0/24, you must first delete a subnet.`,
      },
    ],

    correctAnswers: ["B"],

    explanation: `• VNet01 currently has address space 10.2.0.0/16 and subnet 10.2.0.0/24.\n• 192.168.1.0/24 liegt komplett außerhalb des existierenden AddressSpace.\n  → Zuerst muss ein passender AddressSpace (z.B. 192.168.0.0/16) hinzugefügt werden.\n• 10.2.1.0/24 liegt im bestehenden AddressSpace (10.2.0.0/16).\n  → Hier muss lediglich eine neue Subnet-Definition 10.2.1.0/24 angelegt werden.\n\nKorrekt ist:\n✔ 192.168.1.0/24 → add an address space\n✔ 10.2.1.0/24 → add a subnet`,

    references: ["Plan and configure virtual networks in Azure"],
  },
  {
    id: "Q49",
    number: 49,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You have a sync group named Sync1 that has a cloud endpoint. The cloud endpoint includes a file named File1.txt.\n\nYour on-premises network contains servers that run Windows Server 2016:\n\n| Server  | Share   | Files contained in the share          |\n|---------|---------|---------------------------------------|\n| Server1 | Share1  | File1.txt, Files2.txt                             |\n| Server2 | Share2  | File2.txt, File3.txt                  |\n\nYou add Share1 as a server endpoint for Sync1. One hour later, you add Share2 as a server endpoint for Sync1.\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\n1. On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1.\n\n2. On Server1, File1.txt is overwritten by File1.txt from the cloud endpoint.\n\n3. File1.txt from Share1 replicates to Share2.`,

    options: `{
        key: "A"\ntext: [
          "On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1: YES",
          "On Server1, File1.txt is overwritten by File1.txt from the cloud endpoint: YES",
          "File1.txt from Share1 replicates to Share2: YES",`,
      },
      {
        key: "B",
        text: `On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1: YES\nOn Server1, File1.txt is overwritten by File1.txt from the cloud endpoint: YES\nFile1.txt from Share1 replicates to Share2: No `,
      },
      {
        key: "C",
        text: `On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1: YES\nOn Server1, File1.txt is overwritten by File1.txt from the cloud endpoint: No\nFile1.txt from Share1 replicates to Share2: YES`,
      },
      {
        key: "D",
        text: `On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1: No\nOn Server1, File1.txt is overwritten by File1.txt from the cloud endpoint: YES\nFile1.txt from Share1 replicates to Share2: YES`,
      },
      {
        key: "E",
        text: `On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1: No\nOn Server1, File1.txt is overwritten by File1.txt from the cloud endpoint: No\nFile1.txt from Share1 replicates to Share2: YES`,
      },
      {
        key: "F",
        text: `On the cloud endpoint, File1.txt is overwritten by File1.txt from Share1: No\nOn Server1, File1.txt is overwritten by File1.txt from the cloud endpoint: No\nFile1.txt from Share1 replicates to Share2: No`,
      },
    ],

    correctAnswers: ["E"],

    explanation: `Azure File Sync nutzt eine einfache Konfliktbehandlung:\n• Ändern zwei Endpoints dieselbe Datei, werden beide Versionen behalten; die jüngste behält den Originalnamen.\n\nAusgangslage:\n• In der Cloud existiert bereits File1.txt.\n• Share1 enthält ebenfalls File1.txt; Share2 enthält File2.txt, File3.txt.\n\nWichtige Punkte:\n1) Cloud-File1.txt wird nicht einfach kommentarlos überschrieben – bei Konflikten werden Kopien mit Suffix erstellt.\n2) Server1 bekommt keine Überschreibung von seinem eigenen File1.txt aus der Cloud – stattdessen Konfliktauflösung.\n3) Dateien in einem Sync-Group-Topo werden zwischen allen Endpoints repliziert, daher repliziert File1.txt von Share1 auch nach Share2.\n\nDaher:\n• 1: No\n• 2: No\n• 3: YES`,

    references: `Planning for an Azure File Sync deployment\nAzure Files and Azure File Sync FAQ\n],
  },
  {
    id: "Q50",
    number: 50,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: [
      "You have an Azure Linux virtual machine that is protected by Azure Backup."\nOne week ago, two files were deleted from the virtual machine.\nYou need to restore the deleted files to an on-premises computer as quickly as possible.\n\nWhich four actions should you perform in sequence?\n\nActions:\n|---------|\n|1. Mount a VHD.|\n2. Copy the files by using File Explorer.\n3. Download and run a script.\n4. Select a restore point.\n5. Copy the files by using AzCopy.\n6. From the Azure portal, click 'Restore VM' from the vault.\n7. From the Azure portal, click 'File Recovery' from the vault.`,

    options: `{ key: "A"\ntext: "Sequence: 6, 4, 1, 2" }\n{ key: "B"\ntext: "Sequence: 6, 4, 3, 5" }\n{ key: "C"\ntext: "Sequence: 7, 4, 3, 2" }\n{ key: "D"\ntext: "Sequence: 7, 4, 1, 2" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Für File-Recovery (nicht kompletten VM-Restore) aus einem Recovery Services Vault:"\n\n1) Im Vault: **File Recovery** wählen → (7)\n2) Einen passenden **Restore Point** auswählen → (4)\n3) Skript herunterladen und ausführen, um die Sicherungsdisk als iSCSI/VHD einzubinden → (3)\n4) Danach per **File Explorer** die benötigten Dateien auf den On-Prem-Computer kopieren → (2)\n\nKorrekte Reihenfolge:\n✔ 7 → 4 → 3 → 2`,

    references: ["Recover files from Azure virtual machine backup"],
  },

  {
    id: "Q51",
    number: 51,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure virtual machine named VM1 and a Recovery Services vault named Vault.\nYou create a backup policy Policy1 with the following characteristics:\n\n• Daily backups at 02:00 (UTC), retained for 7 days.\n\n• Weekly backup point every Sunday at 02:00, retained for 4 weeks.\n\n• Monthly backup point (week-based or day-based) retained 24 months.\n\n• Yearly backup point in January, retained 7 years.\n\nYou configure the backup of VM1 to use Policy1 on Thursday, January 1.\n\nYou need to identify the number of available recovery points for VM1 on:\n\n• January 8 at 14:00\n• January 15 at 14:00`,

    options: `{
        key: "A"\ntext: ["January 8 at 14:00: 5", "January 15 at 14:00: 5"`,
      },
      {
        key: "B",
        text: ["January 8 at 14:00: 5", "January 15 at 14:00: 8"].join("\n"),
      },
      {
        key: "C",
        text: ["January 8 at 14:00: 6", "January 15 at 14:00: 8"].join("\n"),
      },
      {
        key: "D",
        text: ["January 8 at 14:00: 8", "January 15 at 14:00: 17"].join("\n"),
      },
      {
        key: "E",
        text: ["January 8 at 14:00: 8", "January 15 at 14:00: 19"].join("\n"),
      },
      {
        key: "F",
        text: ["January 8 at 14:00: 9", "January 15 at 14:00: 19"].join("\n"),
      },
    ],

    correctAnswers: ["C"],

    explanation: `Start der Sicherung: Donnerstag, 1. Januar, 02:00.\n\n• Bis 8. Januar (inkl. 8. morgens) existieren:\n  – 4 Daily (z.B. 5., 6., 7., 8. Jan.)\n  – 1 Weekly (Sonntag 4. Jan.)\n  – 1 Monthly (Januartermin)\n  → insgesamt **6** Recovery Points.\n\n• Bis 15. Januar:\n  – 4 aktuelle Daily (z.B. 12.–15. Jan. bei 7-Tage-Retention)\n  – 2 Weekly (z.B. 4. und 11. Jan.)\n  – 1 Monthly\n  – 1 Yearly\n  → insgesamt **8** Recovery Points.\n\nKorrekt ist:\n✔ 6 am 8. Januar,\n✔ 8 am 15. Januar.`,

    references: `Back up Azure VMs with Recovery Services vaults\nAzure Backup retention and recovery points\n],
  },

  {
    id: "Q52",
    number: 52,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have two Azure subscriptions named Subscription1 and Subscription2."\n\nSubscription1 contains:\n\n| Name | Region        | Resource Lock Type                   |\n----------|-----------------|---------------------------------------|\n  • RG1 |West Europe, |No lock\n  • RG2 |West Europe, |Read-only\n\nRG1 includes a web app named App1 in West Europe.\n\nSubscription2 contains:\n\n| Name | Region        | Resource Lock Type                   |\n|------|-----------------|---------------------------------------|\n  • RG3 |North Europe, | Delete\n  • RG4 |Central US, |None\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n`,

    options: `{
        key: "A"\ntext: [
          " App1 can be moved to RG2: YES",
          " App1 can be moved to RG3: YES",
          " App1 can be moved to RG4: YES",`,
      },
      {
        key: "B",
        text: ` App1 can be moved to RG2: YES\n App1 can be moved to RG3: YES\n App1 can be moved to RG4: No`,
      },
      {
        key: "C",
        text: ` App1 can be moved to RG2: No\n App1 can be moved to RG3: YES\n App1 can be moved to RG4: No`,
      },
      {
        key: "D",
        text: ` App1 can be moved to RG2: YES\n App1 can be moved to RG3: No\n App1 can be moved to RG4: YES`,
      },
      {
        key: "E",
        text: ` App1 can be moved to RG2: No\n App1 can be moved to RG3: YES\n App1 can be moved to RG4: YES`,
      },
      {
        key: "F",
        text: ` App1 can be moved to RG2: No\n App1 can be moved to RG3: No\n App1 can be moved to RG4: No`,
      },
    ],

    correctAnswers: ["E"],

    explanation: `Resource Locks:\n• **Read-only** (CanNotDelete + No updates): keine Änderungen, keine neuen Ressourcen, kein Move hinein.\n• **Delete** (CanNotDelete): Ressourcen dürfen erstellt und geändert werden, aber nicht gelöscht.\n\nBewertung:\n1) RG2 hat Read-only-Lock → App1 kann NICHT in RG2 verschoben werden.\n2) RG3 hat Delete-Lock → Erstellen/Verschieben ist erlaubt, nur Delete ist blockiert → Move nach RG3 ist möglich.\n3) RG4 hat keinen Lock → Move ist ebenfalls möglich.\n\nDaher:\n• RG2: No\n• RG3: YES\n• RG4: YES`,

    references: ["Lock resources to prevent unexpected changes"],
  },
  {
    id: "Q53",
    number: 53,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure virtual machine named VM1 that runs Windows Server 2016.\nYou need to create an alert in Azure when more than two error events are logged to the System event log on VM1 within an hour.\n\nSolution:\nYou create an **event subscription** on VM1.\nYou create an alert in Azure Monitor and specify **VM1** as the source.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Für ein Log-basiertes Alerting auf Event Logs von VM1 musst du:"\n1) Einen **Azure Log Analytics Workspace** erstellen.\n2) VM1 an diesen Workspace anbinden (Azure Monitor Agent / MMA).\n3) Einen Log-Alert in Azure Monitor basierend auf einer Kusto-Abfrage konfigurieren.\n4) Als Source Resource den **Log Analytics Workspace** verwenden.\n\nEin Event-Subscription direkt auf VM1 und eine Alert-Definition mit VM1 als Quelle erfüllt diese Voraussetzungen nicht.\n\nKorrekt:\n✔ Lösung erfüllt das Ziel **nicht**.`,

    references: ["Create, view, and manage log alerts using Azure Monitor"],
  },
  {
    id: "Q54",
    number: 54,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure virtual machine named VM1 that runs Windows Server 2016.\nYou need to create an alert in Azure when more than two error events are logged to the System event log on VM1 within an hour.\n\nSolution:\nYou create an **Azure Log Analytics workspace** and configure the data source settings.\nYou install the **Microsoft Monitoring Agent** on VM1.\nYou create an alert in Azure Monitor and specify the **Log Analytics workspace** as the source.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Vorgehen:"\n• Log Analytics Workspace anlegen.\n• VM1 per MMA/Azure Monitor Agent mit dem Workspace verbinden.\n• System-Event Logs als Data Source aktivieren.\n• Log Alert in Azure Monitor auf Basis einer KQL-Abfrage (z.B. >2 Errors in 1h) definieren.\n• Als monitored resource: den **Log Analytics Workspace** wählen.\n\nDamit wird genau das gewünschte Verhalten erreicht.\n\nKorrekt:\n✔ YES.`,

    references: ["Create, view, and manage log alerts using Azure Monitor"],
  },
  {
    id: "Q55",
    number: 55,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure virtual machine named VM1 that runs Windows Server 2016.\nYou need to create an alert in Azure when more than two error events are logged to the System event log on VM1 within an hour.\n\nSolution:\nYou create an Azure Log Analytics workspace and configure the data source settings.\nYou install the Microsoft Monitoring Agent on VM1.\nYou create an alert in Azure Monitor and specify **VM1** as the source.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Log-basierte Alerts verwenden als Resource den **Log Analytics Workspace**,"\nda dort die Events gespeichert und per KQL ausgewertet werden.\n\nWenn du den Alert auf VM1 als Quell-Ressource konfigurierst, handelt es sich um einen klassischen Metric Alert,\nnicht um einen Log Alert auf Event-ID-Ebene.\n\nDaher erfüllt die Lösung das Ziel **nicht**.`,

    references: ["Create, view, and manage log alerts using Azure Monitor"],
  },
  {
    id: "Q56",
    number: 56,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure virtual network named VNet that connects to your on-premises network via site-to-site VPN.\nVNet contains a subnet Subnet1 associated with NSG1.\nSubnet1 contains a **basic internal load balancer** named ILB1.\nILB1 has three Azure virtual machines in the backend pool.\n\nYou need to collect data about the IP addresses that connect to ILB1.\nYou must be able to run interactive queries from the Azure portal against the collected data.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: [
          "Resource to create: *An Azure Event Grid*",
          "Resource on which to enable diagnostics: *NSG1*",`,
      },
      {
        key: "B",
        text: `Resource to create: An Azure Event Grid\nResource on which to enable diagnostics: *The Azure virtual machines*`,
      },
      {
        key: "C",
        text: `Resource to create: *An Azure Log Analytics workspace*\nResource on which to enable diagnostics: NSG1`,
      },
      {
        key: "D",
        text: `Resource to create: *An Azure Log Analytics workspace*\nResource on which to enable diagnostics: *ILB1*`,
      },
      {
        key: "E",
        text: `Resource to create: *An Azure Storage account*\nResource on which to enable diagnostics: *The Azure virtual machines*`,
      },
      {
        key: "F",
        text: `Resource to create: *An Azure Storage account*\nResource on which to enable diagnostics: *ILB1*`,
      },
    ],

    correctAnswers: ["D"],

    explanation: `Anforderung:\n• IP-Adressen, die ILB1 ansprechen, loggen.\n• Interaktive Abfragen im Portal (Kusto) → **Log Analytics Workspace**.\n\nFür Load Balancer DiagNostics:\n• Du aktivierst DiagNoseeinstellungen direkt auf dem Load Balancer (ILB1) und leitest die Logs\n  in einen **Log Analytics Workspace**.\n\nKorrekt:\n✔ Log Analytics Workspace erstellen\n✔ DiagNostics auf ILB1 aktivieren`,

    references: `Load Balancer metrics and resource logs\nAnalyze Log Analytics data in Azure Monitor\n],
  },
  {
    id: "Q57",
    number: 57,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: [
      "You download an Azure Resource Manager (ARM) template based on an existing virtual machine."\nThe template will be used to deploy 100 virtual machines.\n\nYou need to modify the template to reference an administrative password.\nYou must prevent the password from being stored in plain text.\n\nWhat should you create to store the password?`,

    options: `{
        key: "A"\ntext: "Azure Active Directory Identity Protection and an Azure policy"\n}\n{
        key: "B"\ntext: "A Recovery Services vault and a backup policy"\n}\n{
        key: "C"\ntext: "An Azure Key Vault and an access policy"\n}\n{
        key: "D"\ntext: "An Azure Storage account and an access policy"\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Best Practice für Secrets in ARM Templates:"\n• Passwörter/Secrets gehören in **Azure Key Vault**.\n• ARM-Parameter verweisen dann auf \`reference()\` zu einem Secret in Key Vault.\n• Zugriff regelt eine **Access Policy** auf dem Key Vault.\n\nDadurch steht das Passwort nicht im Klartext in Template/Parameters.\n\nKorrekt:\n✔ Azure Key Vault + Access Policy.`,

    references: `Secure VM password with Key Vault in Azure Resource Manager templates\n],
  },
  {
    id: "Q58",
    number: 58,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription that includes data in the following locations:"\n\n| Name      | Type            |\n|-----------|-----------------|\n|• container1 | Blob container\n|• share1   |  Azure Files share\n|• DB1       | SQL database\n|• Table1    | Azure Table\n\nYou plan to export data by using an Azure Import/Export job named Export1.\nYou need to identify which data can be exported by using Export1.\n\nWhich data should you identify?`,

    options: `{ key: "A"\ntext: "DB1" }\n{ key: "B"\ntext: "Table1" }\n{ key: "C"\ntext: "container1" }\n{ key: "D"\ntext: "share1" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Azure Import/Export unterstützt für **Export** ausschließlich Azure Blob Storage."\n• Export von Azure Files, SQL DB oder Table Storage ist mit Import/Export nicht möglich.\n\nDaher:\n✔ Nur der Blob-Container **container1** kann via Export1 exportiert werden.`,

    references: `Use the Azure Import/Export service to export data from Azure Blob storage\nAzure Import/Export service FAQ\n],
  },
  {
    id: "Q59",
    number: 59,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You have an Azure virtual machine named VM1. Azure collects events from VM1."\nYou are creating an alert rule in Azure Monitor to Notify an administrator when an error is logged in the System event log of VM1.\nYou need to specify which resource type to monitor.\n\nWhat should you specify?`,

    options: `{ key: "A"\ntext: "Metric alert" }\n{ key: "B"\ntext: "Azure Log Analytics workspace" }\n{ key: "C"\ntext: "Virtual machine" }\n{ key: "D"\ntext: "Virtual machine extension" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Event Logs von VM1 werden in einem **Log Analytics Workspace** gespeichert."\nLog Alerts auf Basis von Kusto-Abfragen werden auf den Workspace gelegt,\nnicht direkt auf die VM-Ressource.\n\nDaher muss der monitored resource type der **Log Analytics Workspace** sein.`,

    references: ["Create, view, and manage log alerts using Azure Monitor"],
  },
  {
    id: "Q60",
    number: 60,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `You are an administrator for a company and have an Azure policy configured as follows:\n\nSCOPE\n|-----------------|\n|• Scope: Subscription1|\n• Exclusions: Subscription1/ContosoRG1\n• Policy definition: Not allowed resource types\n• Assigned by: admin1@contoso.com\n• Parameter 'Not allowed resource types': Microsoft.Sql/servers\n\nWhich of the following statements is true?`,

    options: `{
        key: "A"\ntext: "You can create Azure SQL servers in ContosoRG1 only."\n}\n{
        key: "B"\ntext: "You are prevented from creating Azure SQL servers anywhere in Subscription1."\n}\n{
        key: "C"\ntext: "You are prevented from creating Azure SQL servers in ContosoRG1 only."\n}\n{
        key: "D"\ntext: "You can create Azure SQL servers in any resource group within Subscription1."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Policy ‚Not allowed resource types’ mit Parameter \`Microsoft.Sql/servers\`:"\n• Gilt für den gesamten Scope **Subscription1**,\n• aber **ContosoRG1** ist explizit ausgeschlossen.\n\nDaraus folgt:\n• In allen RGs außer ContosoRG1 sind SQL Server NICHT erlaubt.\n• In **ContosoRG1** ist die Policy nicht wirksam → dort darfst du SQL Server erstellen.\n\nKorrekt:\n✔ You can create Azure SQL servers in ContosoRG1 only.`,

    references: `Azure Policy built-in definition: Not allowed resource types\n],
  },
  {
    id: "Q61",
    number: 61,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription Subscription1 with a resource group RG1."\nIn RG1 you create an internal load balancer LB1 and a public load balancer LB2.\n\nYou need to ensure that an administrator named Admin1 can manage LB1 and LB2.\nThe solution must follow the principle of least privilege.\n\nWhich role should you assign to Admin1 for each task?\n\n1. To add a backend pool to LB1:\n2. To add a health probe to LB2:`,

    options: `{
        key: "A"\ntext: [
          "Backend pool: Contributor on LB1",
          "Health probe: Contributor on LB2",`,
      },
      {
        key: "B",
        text: `Backend pool: Network Contributor on LB1\nHealth probe: Network Contributor on LB2`,
      },
      {
        key: "C",
        text: `Backend pool: Network Contributor on LB1\nHealth probe: Network Contributor on RG1`,
      },
      {
        key: "D",
        text: `Backend pool: Network Contributor on RG1\nHealth probe: Contributor on LB2`,
      },
      {
        key: "E",
        text: ["Backend pool: Owner on LB1", "Health probe: Owner on LB2"].join(
          "\n"
        ),
      },
      {
        key: "F",
        text: `Backend pool: Owner on LB1\nHealth probe: Network Contributor on RG1`,
      },
    ],

    correctAnswers: ["B"],

    explanation: `Load Balancer Ressourcentyp: \`Microsoft.Network/loadBalancers\`.\nDie Rolle **Network Contributor**:\n• Kann alle Netzwerkressourcen (inkl. Load Balancer, NIC, VNet etc.) verwalten,\n• aber keine RBAC-Rechte vergeben.\n\nLeast Privilege:\n• Rolle direkt auf LB1 bzw. LB2 reicht für alle LB-spezifischen Aufgaben.\n\nKorrekt:\n✔ Backend pool auf LB1: Network Contributor on LB1\n✔ Health probe auf LB2: Network Contributor on LB2`,

    references: ["Azure built-in roles – Network Contributor"],
  },
  {
    id: "Q62",
    number: 62,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You deploy an Azure Kubernetes Service (AKS) cluster with the following network profile:\n\n• Network plugin (Type): Basic (kubenet)\n• Pod CIDR: 10.244.0.0/16\n• Service CIDR: 10.0.0.0/16\n• DNS service IP: 10.0.0.10\n• Docker bridge CIDR: 172.17.0.1/16\n• Network policy: None\n• HTTP application routing: Disabled\n\nUse the drop-down menus to select the answer choice that completes each statement.\n\n1. Containers will be assigned an IP address in the ______ subnet.\n2. Services in the AKS cluster will be assigned an IP address in the ______ subnet.`,

    options: `{
        key: "A"\ntext: [
          "Containers will be assigned an IP address in the 10.244.0.0/16 subnet.",
          "Services in the AKS cluster will be assigned an IP address in the 10.0.0.0/16 subnet.",`,
      },
      {
        key: "B",
        text: `Containers will be assigned an IP address in the 10.244.0.0/16 subnet.\nServices in the AKS cluster will be assigned an IP address in the 172.17.0.1/16 subnet.`,
      },
      {
        key: "C",
        text: `Containers will be assigned an IP address in the 10.0.0.0/16 subnet.\nServices in the AKS cluster will be assigned an IP address in the 10.244.0.0/16 subnet.`,
      },
      {
        key: "D",
        text: `Containers will be assigned an IP address in the 10.0.0.0/16 subnet.\nServices in the AKS cluster will be assigned an IP address in the 172.17.0.1/16 subnet.`,
      },
      {
        key: "E",
        text: `Containers will be assigned an IP address in the 172.17.0.1/16 subnet.\nServices in the AKS cluster will be assigned an IP address in the 10.244.0.0/16 subnet.`,
      },
      {
        key: "F",
        text: `Containers will be assigned an IP address in the 172.17.0.1/16 subnet.\nServices in the AKS cluster will be assigned an IP address in the 10.0.0.0/16 subnet.`,
      },
    ],

    correctAnswers: ["A"],

    explanation: `In AKS:\n• **Pod CIDR** → Adressbereich für Pod-IPs (Container).\n• **Service CIDR** → virtuelle IPs für ClusterIP Services.\n\nHier:\n• Pods/Container: 10.244.0.0/16\n• Services: 10.0.0.0/16\n\nKorrekt ist Option A.`,

    references: `Network concepts for applications in Azure Kubernetes Service (AKS)\n],
  },

  {
    id: "Q63",
    number: 63,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Active Directory domain named contoso.com that contains the objects shown in the following table.:"\n\nName | Type | In OU\n|------|-------------------------|--------|\n  • User1 | User | OU1\n  • User2 | User | OU1\n  • User3 | User | OU1\n  • Group1 | Security, Global | OU1\n  • User4 | User | OU2\n  • Group2 | Security, Global | OU2\n\nGroup memberships:\nName | Member of\n|----------------|----------------|\nGroup1 | User1 |\nGroup2 | User2, Group1 |\n\nOU1 and OU2 are synced to Azure Active Directory (Azure AD).\nYou modify the synchronization settings and remove OU1 from synchronization. You sync Active Directory and Azure AD.\nYou then sync Active Directory and Azure AD.\n\nWhich objects are in Azure AD?`,

    options: `{
        key: "A"\ntext: "User4 and Group2 only"\n}\n{
        key: "B"\ntext: "User2, Group1, User4, and Group2 only"\n}\n{
        key: "C"\ntext: "User1, User2, Group1, User4, and Group2 only"\n}\n{
        key: "D"\ntext: "User1, User2, User3, User4, Group1, and Group2"\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Verhalten von Azure AD Connect beim Entfernen eines OUs aus dem Sync:"\n• Objekte, die nicht mehr im Sync-Scope sind (OU1), werden in Azure AD gelöscht.\n• Objekte in OU2 bleiben erhalten.\n• Gruppenmitglieder werden nicht automatisch synchronisiert, wenn das Objekt selbst nicht mehr im Scope ist.\n\nDaher bleiben nur Objekte aus OU2:\n✔ User4\n✔ Group2\n\nAlle Objekte aus OU1 (User1, User2, User3, Group1) werden aus Azure AD entfernt.`,

    references: `Azure AD Connect sync: Directory extensions and filtering behavior\n],
  },
  {
    id: "Q64",
    number: 64,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You are an administrator for your company. You have peering configured as shown:"\n\nOn VNet6 → Peerings:\n• Peering1 → Peer: Test-VNet, Status: Disconnected\n• Peering2 → Peer: VNet1, Status: Disconnected\n• (…peering entries to VNet2, VNet3, VNet4, VNet5, VNet6 etc.)\n\nUse the drop-down menus to select the answer choice that completes each statement.\n\n1. Hosts on VNet6 can communicate with hosts on ______.\n2. To change the status of the peering connection to VNet1 to Connected, you must first ______.`,

    options: `{
        key: "A"\ntext: [
          "•Hosts on VNet6 can communicate with hosts on VNet6 only",
          "•To change the status of the peering connection to VNet1 to Connected, you must first delete peering1",`,
      },
      {
        key: "B",
        text: `•Hosts on VNet6 can communicate with hosts on VNet6 only\n•To change the status of the peering connection to VNet1 to Connected, you must first modify the address space`,
      },
      {
        key: "C",
        text: `•Hosts on VNet6 can communicate with hosts on VNet6 and VNet1 only\n•To change the status of the peering connection to VNet1 to Connected, you must first modify the address space`,
      },
      {
        key: "D",
        text: `•Hosts on VNet6 can communicate with hosts on VNet6 and VNet1 only\n•To change the status of the peering connection to VNet1 to Connected, you must first add a service endpoint`,
      },
      {
        key: "E",
        text: `•Hosts on VNet6 can communicate with hosts on VNet6 and VNet1 and VNet2 only\n•To change the status of the peering connection to VNet1 to Connected, you must first add a service endpoint`,
      },
      {
        key: "F",
        text: `•Hosts on VNet6 can communicate with hosts on VNet6 and VNet1 and VNet2 only\n•To change the status of the peering connection to VNet1 to Connected, you must first add a subnet`,
      },
    ],

    correctAnswers: ["A"],

    explanation: `Da alle Peerings den Status **Disconnected** haben, besteht effektiv kein Routing\nzwischen VNet6 und anderen VNets → Kommunikation nur innerhalb VNet6.\n\nWenn ein Peering auf einer Seite gelöscht wurde, bleibt es auf der anderen Seite als 'Disconnected' bestehen.\nBevor du ein neues, funktionierendes Peering einrichtest, musst du die alte Peering-Definition löschen.\n\nDaher:\n• Kommunikation: VNet6 only.\n• Maßnahme: peering1 (alte, getrennte Verbindung) löschen und dann Neuaufbau.`,

    references: ["Virtual network peering – status and delete behavior"],
  },
  {
    id: "Q65",
    number: 65,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains two virtual networks named VNet1 and VNet2. Virtual machines connect to the virtual networks.\nA peering connection is established between VNet1 and VNet2.\nThe virtual networks have the address spaces and the subnets configured as shown in the following table:\n\nVirtual Network | Address Space (Subnets) | Peering\n|----------------|-------------------------|----------|\n• VNet1 | 10.1.0.0/16 (subnets 10.1.0.0/24, 10.1.1.0/26) | Peered with VNet2\n• VNet2 | 10.2.0.0/16 (subnet 10.2.0.0/24) | Peered with VNet1\n\nWhich three actions should you perform in sequence?\n\nActions:\n|-------------------------------|\n|1. On the peering in VNet2, allow gateway transit .|\n2. On the peering in VNet1, allow gateway transit .\n3. Create a new virtual network named VNet1 .\n4. Recreate the peering between VNet1 and VNet2 .\n5. Add the 10.33.0.0/16 address space to VNet1.\n6. Remove the peering between VNet1 and VNet2 .\n7. Remove VNet1.\n`,

    options: `{ key: "A"\ntext: "Sequence: 5, 1, 2" }\n{ key: "B"\ntext: "Sequence: 7, 3, 5" }\n{ key: "C"\ntext: "Sequence: 6, 5, 4" }\n{ key: "D"\ntext: "Sequence: 6, 4, 1" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Regel für Peering:"\n• Solange ein VNet gepeert ist, kannst du dessen Address Space nicht ändern.\n\nErforderliche Schritte:\n1) Peering zwischen VNet1 und VNet2 **entfernen** → (6)\n2) Neuen Address Space 10.33.0.0/16 zu VNet1 hinzufügen → (5)\n3) Peering zwischen VNet1 und VNet2 neu erstellen → (4)\n\nDamit bleibt die Kommunikation erhalten, und der neue Adressbereich ist gültig.\n\nKorrekt: Sequence 6 → 5 → 4.`,

    references: ["Virtual network peering – requirements and constraints"],
  },

  {
    id: "Q66",
    number: 66,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You plan to deploy an Azure Container Instance (ACI) using the following ARM template snippet:\n\n{\n  "type": "Microsoft.ContainerInstance/containerGroups",\n  "name": "webprod",\n  "location": "westus",\n  "properties": {\n    "containers": [\n      {\n        "name": "webprod",\n        "properties": {\n          "image": "microsoft/iis:naNoserver",\n          "ports": [ { "protocol": "TCP", "port": 80 } ],\n          "resources": { "requests": { "cpu": 1, "memoryInGb": 1.5 } }\n        }\n      }\n    ],\n    "restartPolicy": "OnFailure",\n    "ipAddress": {\n      "ip": "[parameters(\'IPAddress\')]",\n      "type": "Public",\n      "ports": [ { "protocol": "Tcp", "port": 80 } ]\n    },\n    "osType": "Windows"\n  }\n}\n\nUse the drop-down menus to complete each statement:\n\n1. Internet users ______.\n2. If Internet Information Services (IIS) in the container fail, ______.`,

    options: `{
        key: "A"\ntext: [
          "•Internet users can connect to the container from any device.",
          "•If Internet Information Services (IIS) in the container fail the container will only restart manually.",`,
      },
      {
        key: "B",
        text: `•Internet users can connect to the container from any device.\n•If Internet Information Services (IIS) in the container fail the container will restart automatically.`,
      },
      {
        key: "C",
        text: `•Internet users cannot connect to the container.\nIf Internet Information Services (IIS) in the container fail the container must be redployed.`,
      },
      {
        key: "D",
        text: `•Internet users cannot connect to the container.\n•If Internet Information Services (IIS) in the container fail the container will restart automatically.`,
      },
      {
        key: "E",
        text: `•Internet users can only connect to the container from devices that run Windows.\n•If Internet Information Services (IIS) in the container fail the container will only restart manually.`,
      },
      {
        key: "F",
        text: `•Internet users can only connect to the container from devices that run Windows.\n•If Internet Information Services (IIS) in the container fail the container must be redployed.`,
      },
    ],

    correctAnswers: ["B"],

    explanation: `Aus dem Template:\n• \`ipAddress.type = "Public"\` + Port 80 → Container per Public IP & HTTP von überall erreichbar.\n  → Keine Geräte-Einschränkung (Browser, OS egal).\n• \`restartPolicy = "OnFailure"\` → Container wird automatisch neu gestartet, wenn der Prozess fehlschlägt.\n\nDaher:\n✔ Internet users can connect from any device.\n✔ Bei IIS-Failure wird der Container automatisch neugestartet.`,

    references: `Azure Container Instances – container groups and restart policy\n],
  },

  {
    id: "Q67",
    number: 67,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that is synced to an Active Directory domain."\nThe tenant contains the users shown in the following table:\n\n| Name  | Type   | Source                   |\n|-------|--------|--------------------------|\n|User1  | Member | Azure AD|\nUser2 | Member | Windows Server AD\nUser3 | Guest  | Microsoft account\nUser4 | Member | Windows Server AD\n\nThe users have the attributes shown in the following table:\n\n| Name  | Office phone      | Mobile phone     |\n|-------|-------------------|------------------|\n|• User1 | 222-555-1234 | 222-555-2345\n• User2 | null | null\n• User3 | 222-555-1234 | 222-555-2346\n• User4 | 222-555-1234 | null\n\nYou need to ensure that you can enable Azure Multi-Factor Authentication (MFA) for all four users.\n\nSolution:\nYou add an office phone number for User2.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Wichtige Punkte:"\n• MFA kann für alle **Member**-Konten unabhängig von gespeicherten Telefonnummern aktiviert werden.\n• Die Registrierungsdaten (Telefon, Authenticator-App etc.) gibt der Benutzer beim ersten MFA-Login selbst ein.\n• Für **Guest**-User (User3) wird MFA typischerweise über eine **Conditional Access Policy** erzwungen.\n\nDas Hinzufügen einer Office-Nummer für User2 ist nicht ausreichend,\nweil damit nicht sichergestellt ist, dass auch der Gastbenutzer (User3) korrekt per Conditional Access eingebunden wird.\n\nDie Lösung adressiert das Ziel nicht vollständig.\n✔ Antwort: No.`,

    references: `What authentication and verification methods are available in Azure AD?\nTutorial: Enforce MFA for B2B guest users with Conditional Access\n],
  },
  {
    id: "Q68",
    number: 68,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that is synced to an Active Directory domain."\nThe tenant contains the users shown in the following table:\n\n| Name  | Type   | Source                   |\n|-------|--------|--------------------------|\n|User1  | Member | Azure AD|\nUser2 | Member | Windows Server AD\nUser3 | Guest  | Microsoft account\nUser4 | Member | Windows Server AD\n\nThe users have the attributes shown in the following table:\n\n| Name  | Office phone      | Mobile phone     |\n|-------|-------------------|------------------|\n|• User1 | 222-555-1234 | 222-555-2345\n• User2 | null | null\n• User3 | 222-555-1234 | 222-555-2346\n• User4 | 222-555-1234 | null\n\nSolution:\nYou add a mobile phone number for User2 and User4.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Wie zuvor:"\n• MFA ist nicht abhängig davon, dass ein Mobile/Office Phone schon im AD hinterlegt ist.\n• Die eigentliche Lücke ist der **Guest User (User3)**, für den MFA über Conditional Access erzwungen werden muss.\n• Das Hinzufügen von mobilen Nummern für User2 und User4 löst das Problem nicht.\n\nDie Lösung erfüllt das Ziel daher **nicht**.`,

    references: `What authentication and verification methods are available in Azure AD?\nTutorial: Enforce MFA for B2B guest users\n],
  },
  {
    id: "Q69",
    number: 69,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that is synced to an Active Directory domain."\nThe tenant contains the users shown in the following table:\n\n| Name  | Type   | Source                   |\n|-------|--------|--------------------------|\n|User1  | Member | Azure AD|\nUser2 | Member | Windows Server AD\nUser3 | Guest  | Microsoft account\nUser4 | Member | Windows Server AD\n\nThe users have the attributes shown in the following table:\n\n| Name  | Office phone      | Mobile phone     |\n|-------|-------------------|------------------|\n|• User1 | 222-555-1234 | 222-555-2345\n• User2 | null | null\n• User3 | 222-555-1234 | 222-555-2346\n• User4 | 222-555-1234 | null\n\nSolution:\nYou configure a **Conditional Access policy** which requires Azure MFA for all four users.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Mit einer Conditional Access Policy, die MFA für alle vier Benutzer verlangt:"\n• Für **Member**-User (User1, User2, User4) kann MFA direkt erzwungen werden.\n• Für den **Guest User (User3)** ist Conditional Access genau der richtige Weg,\n  um MFA zu erzwingen (B2B/Microsoft-Account).\n\nTelefonnummern im Profil sind keine Voraussetzung, da Benutzer bei der MFA-Registrierung ihre Daten hinterlegen.\n\nDaher erfüllt diese Lösung das Ziel.\n✔ YES.`,

    references: `Plan a Conditional Access deployment\nEnforce MFA with Conditional Access for B2B guest users\n],
  },

  {
    id: "Q70",
    number: 70,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that is synced to an Active Directory domain."\nThe tenant contains the users shown in the following table:\n\n| Name  | Type   | Source                   |\n|-------|--------|--------------------------|\n|User1  | Member | Azure AD|\nUser2 | Member | Windows Server AD\nUser3 | Guest  | Microsoft account\nUser4 | Member | Windows Server AD\n\nThe users have the attributes shown in the following table:\n\n| Name  | Office phone      | Mobile phone     |\n|-------|-------------------|------------------|\n|• User1 | 222-555-1234 | 222-555-2345\n• User2 | null | null\n• User3 | 222-555-1234 | 222-555-2346\n• User4 | 222-555-1234 | null\n\nSolution:\nYou add an office phone number and a mobile phone number for User2, and a mobile phone number for User4.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Auch hier werden wieder nur Telefonnummern für einzelne Member-User ergänzt."\nDas ist für MFA nicht zwingend nötig und löst insbesondere nicht das Thema MFA für den Guest-User (User3),\nder über Conditional Access abgesichert werden muss.\n\nDamit ist die Anforderung weiterhin nicht vollständig erfüllt.\n✔ Antwort: No.`,

    references: `What authentication and verification methods are available in Azure AD?\nTutorial: Enforce MFA for B2B guest users\n],
  },
  {
    id: "Q71",
    number: 71,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: [
      "Implement and manage storage (15-20%)"\n\nYou are an administrator for a company. You have an Azure subscription named Subscription 1.\nYou have 5 TB of data that you need to transfer to Subscription1.\nYou plan to use an Azure Import/Export job.\nWhat can you use as the destination of the imported data?`,

    options: `{ key: "A"\ntext: "Azure Data Lake Store" }\n{ key: "B"\ntext: "Virtual machine" }\n{ key: "C"\ntext: "Azure File Sync Storage Sync Service" }\n{ key: "D"\ntext: "Azure Blob storage" }\n],

    correctAnswers: ["D"],

    explanation: [
      "Explanation:"\nAzure Import/Export service is used to securely import large amounts of data to Azure Blob storage and Azure Files by shipping disk drives to an Azure datacenter.\nThis service can also be used to transfer data from Azure Blob storage to disk drives and ship to your on-premises sites.\nData from one or more disk drives can be imported either to Azure Blob storage or Azure Files.\n\nReference: What is Azure Import/Export service?\nRight answer: D`,

    references: ["What is Azure Import/Export service?"],
  },
  {
    id: "Q72",
    number: 72,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each questions in the series contains a unique solution that might meet the stated goals. Some questions sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals.\nYou have an Azure subscription that contains the following users in an Azure Active Directory tenant named contoso.onmicrosoft.com:\n\n|Name   | Role               | Scope|\n|-------|--------------------|--------------------------|\nUser1  | Global administrator | Azure Active Directory\nUser2  | Global administrator | Azure Active Directory\nUser3  | User administrator   | Azure Active Directory\nUser4  | Owner                | Azure Subscription\n\nUser1 creates a new Azure Active Directory tenant named external.contoso.onmicrosoft.com.\n\nYou need to create new user accounts in external.contoso.onmicrosoft.com.\n\nSolution: You instruct User1 to create the user accounts.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Explanation:"\nTo manage access to Azure resources, you must have the appropriate administrator role. Azure has an authorization system called role-based access control (RBAC) with several built-in roles you can choose from. You can assign these roles at different scopes, such as management group, subscription, or resource group. By default, the person who creates a new Azure subscription can assign other users administrative access to a subscription.\nYou can apply Azure RBAC roles at four levels of scope: management groups, subscriptions, resource groups, and resources.\nAzure AD also has its own set of roles, which apply mostly to users, passwords, and domains. These roles have different purposes.\nThe main difference between Azure RBAC roles and Azure AD roles is the areas they cover. Azure RBAC roles apply to Azure resources, and Azure AD roles apply to Azure AD resources (particularly users, groups, and domains). Also, Azure AD has only one scope, the directory. The Azure RBAC scope covers management groups, subscriptions, resource groups, and resources.\nAs the creator of the new Azure AD tenant, User1 is also a global administrator of the new tenant.\nA single Active Directory tenant can have multiple subscriptions assigned, but a single subscription can be assigned to a single Active Directory tenant only. The subscription, which User4 is an owner of, does Not grant permissions for the new tenant.\nUser2 and User3 access is restricted to the "old" tenant.\n\nRight answer: A`,

    references: [],
  },
  {
    id: "Q73",
    number: 73,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each questions in the series contains a unique solution that might meet the stated goals. Some questions sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals.\nYou have an Azure subscription that contains the following users in an Azure Active Directory tenant named contoso.onmicrosoft.com:\n\n|Name   | Role               | Scope|\n|-------|--------------------|--------------------------|\nUser1  | Global administrator | Azure Active Directory\nUser2  | Global administrator | Azure Active Directory\nUser3  | User administrator   | Azure Active Directory\nUser4  | Owner                | Azure Subscription\n\nUser1 creates a new Azure Active Directory tenant named external.contoso.onmicrosoft.com.\n\nYou need to create new user accounts in external.contoso.onmicrosoft.com.\n\nSolution: You instruct User3 to create the user accounts.\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Explanation:"\nTo manage access to Azure resources, you must have the appropriate administrator role. Azure has an authorization system called role-based access control (RBAC) with several built-in roles you can choose from. You can assign these roles at different scopes, such as management group, subscription, or resource group. By default, the person who creates a new Azure subscription can assign other users administrative access to a subscription.\nYou can apply Azure RBAC roles at four levels of scope: management groups, subscriptions, resource groups, and resources.\nAzure AD also has its own set of roles, which apply mostly to users, passwords, and domains. These roles have different purposes.\nThe main difference between Azure RBAC roles and Azure AD roles is the areas they cover. Azure RBAC roles apply to Azure resources, and Azure AD roles apply to Azure AD resources (particularly users, groups, and domains). Also, Azure AD has only one scope, the directory. The Azure RBAC scope covers management groups, subscriptions, resource groups, and resources.\nAs the creator of the new Azure AD tenant, User1 is also a global administrator of the new tenant.\nA single Active Directory tenant can have multiple subscriptions assigned, but a single subscription can be assigned to a single Active Directory tenant only. The subscription, which User4 is an owner of, does Not grant permissions for the new tenant.\nUser2 and User3 access is restricted to the "old" tenant.\n\nRight answer: B`,

    references: [],
  },
  {
    id: "Q74",
    number: 74,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each questions in the series contains a unique solution that might meet the stated goals. Some questions sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals.\nYou have an Azure subscription that contains the following users in an Azure Active Directory tenant named contoso.onmicrosoft.com:\n\n|Name   | Role               | Scope|\n|-------|--------------------|--------------------------|\nUser1  | Global administrator | Azure Active Directory\nUser2  | Global administrator | Azure Active Directory\nUser3  | User administrator   | Azure Active Directory\nUser4  | Owner                | Azure Subscription\n\nUser1 creates a new Azure Active Directory tenant named external.contoso.onmicrosoft.com.\n\nYou need to create new user accounts in external.contoso.onmicrosoft.com.\n\nSolution: You instruct User2 to create the user accounts.\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Explanation:"\nAs the creator of the new Azure AD tenant, User1 is the global administrator of the new tenant.\nUser2 is a global administrator only in the original tenant contoso.onmicrosoft.com, Not in external.contoso.onmicrosoft.com.\nTherefore, User2 canNot create users in the new tenant unless explicitly granted rights there.\n\nRight answer: B`,

    references: [],
  },
  {
    id: "Q75",
    number: 75,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each questions in the series contains a unique solution that might meet the stated goals. Some questions sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals.\nYou have an Azure subscription that contains the following users in an Azure Active Directory tenant named contoso.onmicrosoft.com:\n\n|Name   | Role               | Scope|\n|-------|--------------------|--------------------------|\nUser1  | Global administrator | Azure Active Directory\nUser2  | Global administrator | Azure Active Directory\nUser3  | User administrator   | Azure Active Directory\nUser4  | Owner                | Azure Subscription\n\nUser1 creates a new Azure Active Directory tenant named external.contoso.onmicrosoft.com.\n\nYou need to create new user accounts in external.contoso.onmicrosoft.com.\n\nSolution: You instruct User4 to create the user accounts.\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Explanation:"\nUser4 is Owner on the Azure subscription (RBAC), Not an Azure AD admin.\nRBAC roles on a subscription do Not give permissions in a different Azure AD tenant.\nOnly the creator of the new tenant (User1) is global admin there by default.\n\nRight answer: B`,

    references: [],
  },
  {
    id: "Q76",
    number: 76,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\nCase Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nWhich blade should you instruct the finance department auditors to use?`,

    options: `{ key: "A"\ntext: "Partner information" }\n{ key: "B"\ntext: "Overview" }\n{ key: "C"\ntext: "Payment methods" }\n{ key: "D"\ntext: "Invoices" }\n],

    correctAnswers: ["D"],

    explanation: [
      "Explanation:"\nThe Department Requirements states:\nDuring the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\nThe invoices can be viewed and downloaded using the subscription's Invoices blade.\nThe Invoices blade provides a detailed breakdown of the costs incurred.\n\nReference: Download or view your Azure billing invoice and daily usage data\nRight answer: D`,

    references: `Download or view your Azure billing invoice and daily usage data\n],
  },
  {
    id: "Q77",
    number: 77,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Manage Azure identities and governance (20-25%)"\nCase Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou need to resolve the licensing issue before you attempt to assign the license again.\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From the Groups blade, invite the user accounts to a new group."\n}\n{ key: "B"\ntext: "From the Profile blade, modify the usage location." }\n{
        key: "C"\ntext: "From the Directory role blade, modify the directory role."\n}\n{ key: "D"\ntext: "From the Devices blade, enable devices." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Explanation:"\nThe Licensing Issue section contains:\n"Licenses Not assigned. License agreement failed for one user."\nNot all Microsoft services are available in all locations. Before a license can be assigned to a user, you must specify the Usage location for that user.\n\nTherefore, you must modify the usage location on the Profile blade.\n\nRight answer: B`,

    references: [],
  },
  {
    id: "Q78",
    number: 78,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\nCase Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou need to resolve the Active Directory issue.\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From Active Directory Users and Computers, select the user accounts, and then modify the User-Principal Name value."\n}\n{ key: "B"\ntext: "Run idfix.exe, and then use the Edit action." }\n{
        key: "C"\ntext: "From Active Directory Domains and Trusts, modify the list of UPN suffixes."\n}\n{
        key: "D"\ntext: "From Azure AD Connect, modify the outbound synchronization rule."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "Explanation:"\nThe Active Directory Issue section of the case study states:\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\nIdFix identifies errors such as duplicates and formatting problems in your directory before you synchronize to Office 365.\nAfter you install IdFix, run the tool to search for problems in your directory. If problems are found, IdFix suggests solutions to solve the issues.\nIf you agree with the suggested change in the UPDATE column, in the ACTION column select what you want IdFix to do to implement the change (select EDIT) and then click Apply. When you click Apply, the tool makes the changes in the directory.\n\nReference: Install and run the Office 365 IdFix tool\nRight answer: B`,

    references: ["Install and run the Office 365 IdFix tool"],
  },
  {
    id: "Q79",
    number: 79,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\nCase Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nWhich blade should you instruct the finance department auditors to use?`,

    options: `{ key: "A"\ntext: "Invoices" }\n{ key: "B"\ntext: "Partner information" }\n{ key: "C"\ntext: "Cost analysis" }\n{ key: "D"\ntext: "External services" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Explanation:"\nThe Department Requirements states:\nDuring the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\nFrom the Cost analysis blade, we can query the cumulative cost of a resource, subscription, or management group for the last 7 days, the last month, or a custom date range.\n\nRight answer: C`,

    references: [],
  },
  {
    id: "Q80",
    number: 80,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\nCase Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou are evaluating the name resolution for the virtual machines after the planned implementation of the Azure networking.\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n(To answer, select the appropriate objects in the answer area.)\n\nStatements\n1. The virtual machines on Subnet1 will be able to resolve the hosts in the humongousinsurance.local zone.\n2. The virtual machines on ClientSubnet will be able to register their hostname records in the humongousinsurance.local zone.\n3. The virtual machines on Subnet4 will be able to register their hostname records in the humongousinsurance.local zone.`,

    options: `{
        key: "A"\ntext: [
          "The virtual machines on Subnet1 will be able to resolve...: YES",
          "The virtual machines on ClientSubnet will be able to register...: YES",
          "The virtual machines on Subnet4 will be able to register...: YES",`,
      },
      {
        key: "B",
        text: "The virtual machines on Subnet1 will be able to resolve...: YES\nThe virtual machines on ClientSubnet will be able to register...: YES\nThe virtual machines on Subnet4 will be able to register...: No",
      },
      {
        key: "C",
        text: "The virtual machines on Subnet1 will be able to resolve...: No\nThe virtual machines on ClientSubnet will be able to register...: YES\nThe virtual machines on Subnet4 will be able to register...: No",
      },
      {
        key: "D",
        text: "The virtual machines on Subnet1 will be able to resolve...: No\nThe virtual machines on ClientSubnet will be able to register...: YES\nThe virtual machines on Subnet4 will be able to register...: YES",
      },
      {
        key: "E",
        text: "The virtual machines on Subnet1 will be able to resolve...: No\nThe virtual machines on ClientSubnet will be able to register...: No\nThe virtual machines on Subnet4 will be able to register...: YES",
      },
      {
        key: "F",
        text: "The virtual machines on Subnet1 will be able to resolve...: No\nThe virtual machines on ClientSubnet will be able to register...: No\nThe virtual machines on Subnet4 will be able to register...: No",
      },
    ],

    correctAnswers: ["C"],

    explanation: `Explanation:\nTo resolve the records of a private DNS zone from your virtual network, you must link the virtual network with the zone.\nLinked virtual networks can resolve all DNS records published in the private zone.\nIf you enable autoregistration on a virtual network link, the DNS records for the virtual machines on that virtual network are registered in the private zone.\n\nIn the scenario, ClientResources-VNet is set as the registration network for humongousinsurance.local.\n→ VMs in ClientResources-VNet (ClientSubnet) can resolve names and register their records.\nFor other VNets (Paris-VNet, AllOffices-VNet) to resolve names, you would have to link them explicitly to the zone, which is Not mentioned.\n\nTherefore:\n1. Subnet1 (in Paris-VNet) canNot resolve humongousinsurance.local → No.\n2. ClientSubnet (in ClientResources-VNet) can register its hostnames → YES.\n3. Subnet4 (in AllOffices-VNet) canNot register hostnames (No registration link) → No.\n\nRight answer: C`,

    references: ["What is Azure Private DNS?", "Create a private DNS zone"],
  },
  {
    id: "Q81",
    number: 81,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\nCase Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou need to define a custom domain name for Azure AD to support the planned infrastructure.\nWhich domain name should you use?`,

    options: `{ key: "A"\ntext: "ad.humongousinsurance.com" }\n{ key: "B"\ntext: "humongousinsurance.onmicrosoft.com" }\n{ key: "C"\ntext: "humongousinsurance.local" }\n{ key: "D"\ntext: "humongousinsurance.com" }\n],

    correctAnswers: ["D"],

    explanation: [
      "Explanation:"\nThe case study contains the following:\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com.\nThe on-premises Active Directory domain will be synchronized to Azure AD.\nWe can and should use the same verified, routable domain name (humongousinsurance.com) as a custom domain in Azure AD.\n\nReference: Topologies for Azure AD Connect\nRight answer: D`,

    references: ["Topologies for Azure AD Connect"],
  },
  {
    id: "Q82",
    number: 82,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Case Study - Humongous Insurance\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou need to prepare the environment to ensure that the web administrators can deploy the web apps as quickly as possible.\nWhich three actions should you perform in sequence?\n(To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.)\n\n|Actions:|\n|--------|\n|1. From the Templates service, select the template and then share the template -\n -to the web administrators.|\n2. Create a resource group, and then deploy a web app to the resource group.\n3. From the Automation script blade of the resource group, click the Parameters tab.\n4. From the Automation script blade of the resource group, click Deploy.\n5. From the Automation Accounts service, add an automation account.\n6. From the Automation script blade of the resource group, click Add to library.`,

    options: `{ key: "A"\ntext: "Sequence: 2, 6, 1" }\n{ key: "B"\ntext: "Sequence: 5, 4, 1" }\n{ key: "C"\ntext: "Sequence: 2, 3, 4" }\n{ key: "D"\ntext: "Sequence: 5, 2, 3" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Explanation:"\nWe can deploy a Web App once as a sample and then use the Automation script blade to export its ARM template and store it as a reusable template.\nSteps:\n1) Create a resource group, and then deploy a web app to the resource group. (Action 2)\n2) From the Automation script blade of the resource group, click Add to library. (Action 6)\n3) From the Templates service, select the template, and then share the template to the web administrators. (Action 1)\n\nThis allows the web administrators to quickly deploy identical web apps to different resource groups using the shared template.\n\nRight answer: A (Sequence: 2, 6, 1)`,

    references: `Export an Azure Resource Manager template from existing resources\n],
  },
  {
    id: "Q83",
    number: 83,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Case Study - Humongous Insurance"\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5.000 users.\n\nExisting Environment\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nRequirements\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months. All the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD. All client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Computer Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group. The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou need to prepare the environment to meet the authentication requirements.\nWhich two actions should you perform?\n(Each correct answer presents part of the solution. NoTE Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext: "Join the client computers in the Miami office to Azure AD."\n}\n{
        key: "B"\ntext: "Add https://autologon.microsoftazuread-sso.com to the intranet zone of each client computer in the Miami office."\n}\n{
        key: "C"\ntext: "Allow inbound TCP port 8080 to the domain controllers in the Miami office."\n}\n{
        key: "D"\ntext: "Install Azure AD Connect on a server in the Miami office and enable Pass-through Authentication."\n}\n{
        key: "E"\ntext: "Install the Active Directory Federation Services (AD FS) role on a domain controller in the Miami office."\n}\n],

    correctAnswers: ["B"\nD"],

    explanation: [
      "Explanation:\nThe case study states:\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nTo implement Seamless SSO you must:\n• Deploy Azure AD Connect and configure either Password Hash Synchronization or Pass-through Authentication.\n  – In this scenario, Pass-through Authentication is explicitly mentioned as an option. (Action D)\n• Configure the clients so that https://autologon.microsoftazuread-sso.com is in the Local Intranet zone via Group Policy.\n  – This enables silent sign-in for users on domain-joined machines. (Action B)\n\nAD FS (Action E) is Not required for Seamless SSO.\nJoining the client computers directly to Azure AD (Action A) is Not a prerequisite; they are domain-joined.\nAllowing TCP 8080 (Action C) is unrelated to Seamless SSO.\n\nRight answer: B, D`,

    references: ["Azure Active Directory Seamless Single Sign-On: Quick start"],
  },
  {
    id: "Q84",
    number: 84,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\n\nCase Study - Humongous Insurance\n\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5,000 users.\n\nExisting Environment\n\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months.\nAll the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD.\nAll client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Compute Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group.\n  The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou are evaluating the connectivity between the virtual machines after the planned implementation of the Azure networking.\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\nStatements:\n1. The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3.\n2. The virtual machines on ClientSubnet will be able to connect to the Internet.\n3. The virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet.`,

    options: `{
        key: "A"\ntext: [
          "The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3: YES",
          "The virtual machines on ClientSubnet will be able to connect to the Internet: YES",
          "The virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet: YES",`,
      },
      {
        key: "B",
        text: "The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3: YES\n The virtual machines on ClientSubnet will be able to connect to the Internet: YES\nThe virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet: No",
      },
      {
        key: "C",
        text: "The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3: YES\n The virtual machines on ClientSubnet will be able to connect to the Internet: No\n The virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet: No",
      },
      {
        key: "D",
        text: "The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3: No\n The virtual machines on ClientSubnet will be able to connect to the Internet: YES\n The virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet: YES",
      },
      {
        key: "E",
        text: "The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3: No\n The virtual machines on ClientSubnet will be able to connect to the Internet: No\nThe virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet: YES",
      },
      {
        key: "F",
        text: "The virtual machines of Subnet1 will be able to connect to the virtual machines on Subnet3: No\n The virtual machines on ClientSubnet will be able to connect to the Internet: No\n The virtual machines on Subnet3 and Subnet4 will be able to connect to the Internet: No",
      },
    ],

    correctAnswers: ["A"],

    explanation: `Default Azure system routes allow virtual machines in subnets to reach the Internet.\n• Subnet1 (in Paris-VNet) and Subnet3 (in AllOffices-VNet) are connected via VNet peering, so VMs can communicate.\n• ClientSubnet uses default system routes, so VMs can reach the Internet.\n• Subnet3 and Subnet4 (in AllOffices-VNet) also use default system routes and can access the Internet.\n\nTherefore all three statements are true.\n\nCorrect answer: A.`,

    references: ["Virtual network traffic routing in Azure"],
  },
  {
    id: "Q85",
    number: 85,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\n\nCase Study - Humongous Insurance\n\nOverview\nHumongous Insurance is an insurance company that has three offices in Miami, Tokyo and Bangkok. Each office has 5,000 users.\n\nExisting Environment\n\nActive Directory Environment\nHumongous Insurance has a single-domain Active Directory forest named humongousinsurance.com. The functional level of the forest is Windows Server 2012.\nYou recently provisioned an Azure Active Directory (Azure AD) tenant.\n\nNetwork Infrastructure\nEach office has a local data center that contains all the servers for that office. Each office has a dedicated connection to the Internet.\nEach office has several link load balancers that provide access to the servers.\n\nActive Directory Issue\nSeveral users in humongousinsurance.com have UPNs that contain special characters. You suspect that some of the characters are unsupported in Azure AD.\n\nLicensing Issue\nYou attempt to assign a license in Azure to several users and receive the following error message: "Licenses Not assigned. License agreement failed for one user."\nYou verify that the Azure subscription has the available licenses.\n\nPlanned Changes\nHumongous Insurance plans to open a new office in Paris. The Paris office will contain 1,000 users who will be hired during the next 12 months.\nAll the resources used by the Paris office users will be hosted in Azure.\n\nPlanned Azure AD Infrastructure\nThe on-premises Active Directory domain will be synchronized to Azure AD.\nAll client computers in the Paris office will be joined to an Azure AD domain.\n\nPlanned Azure Networking Infrastructure\nYou plan to create the following networking resources in a resource group named All_Resources:\n• Default Azure system routes that will be the only routes used to route traffic.\n• A virtual network named Paris-VNet that will contain two subnets named Subnet1 and Subnet2.\n• A virtual network named ClientResources-VNet that will contain one subnet named ClientSubnet.\n• A virtual network named AllOffices-VNet that will contain two subnets named Subnet3 and Subnet4.\nYou plan to enable peering between Paris-VNet and AllOffices-VNet. You will enable the Use remote gateways setting for the Paris-VNet peerings.\nYou plan to create a private DNS zone named humongousinsurance.local and set the registration network to the ClientResources-VNet virtual network.\n\nPlanned Azure Compute Infrastructure\nEach subnet will contain several virtual machines that will run either Windows Server 2012 R2, Windows Server 2016, or Red Hat Linux.\n\nDepartment Requirements\nHumongous Insurance identifies the following requirements for the company's departments:\n• Web administrators will deploy Azure web apps for the marketing department. Each web app will be added to a separate resource group.\n  The initial configuration of the web apps will be identical. The web administrators have permission to deploy web apps to resource groups.\n• During the testing phase, auditors in the finance department must be able to review all Azure costs from the past week.\n\nAuthentication Requirements\nUsers in the Miami office must use Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO) when accessing resources in Azure.\n\nYou need to prepare the environment to meet the authentication requirements.\nWhich two actions should you perform?\n(Each correct answer presents part of the solution. NoTE: Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext: "Allow inbound TCP port 8080 to the domain controllers in the Miami office."\n}\n{
        key: "B"\ntext: "Add https://autologon.microsoftazuread-sso.com to the intranet zone of each client computer in the Miami office."\n}\n{
        key: "C"\ntext: "Join the client computers in the Miami office to Azure AD."\n}\n{
        key: "D"\ntext: "Install the Active Directory Federation Services (AD FS) role on a domain controller in the Miami office."\n}\n{
        key: "E"\ntext: "Install Azure AD Connect on a server in the Miami office and enable Pass-through Authentication."\n}\n],

    correctAnswers: ["B"\nE"],

    explanation: [
      "Azure AD Seamless Single Sign-on (Seamless SSO) automatically signs in users on domain-joined devices inside the corporate network.\nTo meet the requirement that users in the Miami office use Seamless SSO:\n• You must deploy Azure AD Connect and enable either Password Hash Sync or Pass-through Authentication. In this scenario, Pass-through Authentication is required (E).\n• You must add https://autologon.microsoftazuread-sso.com to the Intranet zone of the client computers via Group Policy (B).\n\nJoining devices directly to Azure AD (C) or deploying AD FS (D) is Not required for Seamless SSO.\nAllowing inbound TCP 8080 to the domain controllers (A) is unrelated.\n\nCorrect answers: B, E.`,

    references: ["Azure Active Directory Seamless Single Sign-On: Quickstart"],
  },
  {
    id: "Q86",
    number: 86,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `Implement and manage storage (15-20%)\n\nCase Study - Contoso, Ltd.\n\nOverview\nContoso, Ltd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.\nContoso products are manufactured by using blueprint files that the company authors and maintains.\n\nExisting Environment\nCurrently, Contoso uses multiple types of servers for business operations, including the following:\n• File servers\n• Domain controllers\n• Microsoft SQL Server servers\n\nYour network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.\n\nYou have a public-facing application named App1. App1 is comprised of the following three tiers:\n• A SQL database\n• A web front end\n• A processing middle tier\nEach tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.\n\nPlanned Changes\nContoso plans to implement the following changes to the infrastructure:\n• Move all the tiers of App1 to Azure.\n• Move the existing product blueprint files to Azure Blob storage.\n• Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.\n\nTechnical Requirements\nContoso must meet the following technical requirements:\n• Move all the virtual machines for App1 to Azure.\n• Minimize the number of open ports between the App1 tiers.\n• Ensure that all the virtual machines for App1 are protected by backups.\n• Copy the blueprint files to Azure over the Internet.\n• Ensure that the blueprint files are stored in the archive storage tier.\n• Ensure that partner access to the blueprint files is secured and temporary.\n• Prevent user passwords or hashes of passwords from being stored in Azure.\n• Use unmanaged standard storage for the hard disks of the virtual machines.\n• Ensure that when users join devices to Azure Active Directory (Azure AD), the users use a mobile phone to verify their identity.\n• Minimize administrative effort whenever possible.\n\nUser Requirements\nContoso identifies the following requirements for users:\n• Ensure that only users who are part of a group named Pilot can join devices to Azure AD.\n• Designate a new user named Admin1 as the service administrator of the Azure subscription.\n• Ensure that a new user named User can create network objects for the Azure subscription.\n\nYou need to move the blueprint files to Azure.\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "Generate a shared access signature (SAS). Map a drive, and then copy the files by using File Explorer."\n}\n{
        key: "B"\ntext: "Use the Azure Import/Export service."\n}\n{
        key: "C"\ntext: "Generate an access key. Map a drive, and then copy the files by using File Explorer."\n}\n{
        key: "D"\ntext: "Use Azure Storage Explorer to copy the files."\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "The technical requirements state:"\n• Copy the blueprint files to Azure over the Internet.\n• Ensure that the blueprint files are stored in the archive storage tier.\n\nAzure Storage Explorer is a free, cross-platform GUI tool that lets you upload data directly over the Internet into Azure Storage accounts (including Blob storage).\nAfter upload, you can set the access tier of the blobs to Archive.\n\nThe Import/Export service (B) is for shipping physical disks, Not required here because transfer must be via Internet.\nMapping a drive with SAS or access keys (A, C) is for Azure Files and does Not directly target blob/Archive scenarios as conveniently as Storage Explorer.\n\nCorrect answer: D.`,

    references: `Move data to and from Azure Blob Storage using Azure Storage Explorer\nAzure Blob storage access tiers (hot, cool, archive)\n],
  },
  {
    id: "Q87",
    number: 87,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Manage Azure identities and governance (20-25%)"\n\nCase Study - Contoso, Ltd.\n\nOverview\nContoso, Ltd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.\nContoso products are manufactured by using blueprint files that the company authors and maintains.\n\nExisting Environment\nCurrently, Contoso uses multiple types of servers for business operations, including the following:\n• File servers\n• Domain controllers\n• Microsoft SQL Server servers\n\nYour network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.\n\nYou have a public-facing application named App1. App1 is comprised of the following three tiers:\n• A SQL database\n• A web front end\n• A processing middle tier\nEach tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.\n\nPlanned Changes\nContoso plans to implement the following changes to the infrastructure:\n• Move all the tiers of App1 to Azure.\n• Move the existing product blueprint files to Azure Blob storage.\n• Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.\n\nTechnical Requirements (excerpt)\n• Prevent user passwords or hashes of passwords from being stored in Azure.\n• Minimize administrative effort whenever possible.\n\nUser Requirements\n• Designate a new user named Admin1 as the service administrator of the Azure subscription.\n\nYou need to meet the user requirement for Admin1.\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From the Subscriptions blade, select the subscription, and then modify the Properties."\n}\n{
        key: "B"\ntext: "From the Subscriptions blade, select the subscription, and then modify the Access control (IAM) settings."\n}\n{
        key: "C"\ntext: "From the Azure Active Directory blade, modify the Properties."\n}\n{
        key: "D"\ntext: "From the Azure Active Directory blade, modify the Groups."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "The requirement is:"\n• Designate a new user named Admin1 as the service administrator of the Azure subscription.\n\nClassic subscription administrator roles (Account Administrator, Service Administrator, Co-Administrator) are managed differently to RBAC roles.\nThe Service Administrator for a subscription is changed in the **subscription Properties** blade, Not via Access control (IAM).\n\nTherefore you must open the subscription in the portal and modify its Properties to set Admin1 as Service Administrator.\n\nCorrect answer: A.`,

    references: ["Add or change Azure subscription administrators"],
  },
  {
    id: "Q88",
    number: 88,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\n\nCase Study - Contoso, Ltd.\n\nOverview\nContoso, Ltd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.\nContoso products are manufactured by using blueprint files that the company authors and maintains.\n\nExisting Environment\nCurrently, Contoso uses multiple types of servers for business operations, including the following:\n• File servers\n• Domain controllers\n• Microsoft SQL Server servers\n\nYour network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.\n\nYou have a public-facing application named App1. App1 is comprised of the following three tiers:\n• A SQL database\n• A web front end\n• A processing middle tier\nEach tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.\n\nPlanned Changes\nContoso plans to implement the following changes to the infrastructure:\n• Move all the tiers of App1 to Azure.\n• Move the existing product blueprint files to Azure Blob storage.\n• Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.\n\nTechnical Requirements (excerpt)\n• Move all the virtual machines for App1 to Azure.\n• Minimize the number of open ports between the App1 tiers.\n\nYou need to recommend a solution for App1. The solution must meet the technical requirements.\nWhat should you include in the recommendation?\n\nAnswer Area:\nNumber of virtual networks:\nNumber of subnets:`,

    options: `{
        key: "A"\ntext: ["Number of virtual networks: 1", "Number of subnets: 1"].join(
          "\n"
        )\n}\n{
        key: "B"\ntext: "Number of virtual networks: 1\n Number of subnets: 3"\n}\n{
        key: "C"\ntext: "Number of virtual networks: 2\n Number of subnets: 2"\n}\n{
        key: "D"\ntext: "Number of virtual networks: 2\n Number of subnets: 1"\n}\n{
        key: "E"\ntext: "Number of virtual networks: 3\n Number of subnets: 2"\n}\n{
        key: "F"\ntext: "Number of virtual networks: 3\n Number of subnets: 3"\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "App1 is a three-tier application (web, middle/processing, SQL/database), each tier containing five VMs."\nTo minimize open ports between tiers and apply NSGs granularly, the standard design is:\n• One virtual network for the application.\n• One subnet per tier (web tier subnet, business tier subnet, data tier subnet).\n\nTherefore:\n• Number of virtual networks: 1\n• Number of subnets: 3\n\nCorrect answer: B.`,

    references: `Windows N-tier application on Azure with SQL Server (reference architecture)\n],
  },
  {
    id: "Q89",
    number: 89,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Manage Azure identities and governance (20-25%)"\n\nCase Study - Contoso, Ltd.\n\nOverview\nContoso, Ltd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.\nContoso products are manufactured by using blueprint files that the company authors and maintains.\n\nExisting Environment, Planned Changes and Technical Requirements as described in the case study.\n\nTechnical Requirements (excerpt)\n• Prevent user passwords or hashes of passwords from being stored in Azure.\n• Minimize administrative effort whenever possible.\n\nYou need to recommend an identity solution that meets the technical requirements.\nWhat should you recommend?`,

    options: `{
        key: "A"\ntext: "Federated single sign-on (SSO) and Active Directory Federation Services (AD FS)"\n}\n{
        key: "B"\ntext: "Password hash synchronization and single sign-on (SSO)"\n}\n{
        key: "C"\ntext: "Cloud-only user accounts"\n}\n{
        key: "D"\ntext: "Pass-through Authentication and single sign-on (SSO)"\n}\n],

    correctAnswers: ["D"],

    explanation: [
      'Requirement: "Prevent user passwords or hashes of passwords from being stored in Azure" and "Minimize administrative effort".'\n\n• Password hash synchronization (B) stores password hashes in Azure AD, which violates the first requirement.\n• Cloud-only accounts (C) igNore the existing on-premises AD and don't meet the hybrid goal.\n• AD FS (A) avoids storing passwords in Azure but requires more infrastructure and administrative effort.\n• Pass-through Authentication (PTA) with SSO (D) validates passwords directly against on-premises domain controllers and does Not store password hashes in Azure AD, while being simpler than full AD FS federation.\n\nTherefore, Pass-through Authentication plus SSO best meets the requirements.\n\nCorrect answer: D.`,

    references: `Azure Active Directory Pass-through Authentication: Quickstart\nWhat is federation with Azure AD?\n],
  },
  {
    id: "Q90",
    number: 90,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: [
      \`Case Study - Contoso\nLtd.
Overview
Contoso\nLtd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.

Contoso products are manufactured by using blueprint files that the company authors and maintains.

Existing Environment
Currently\nContoso uses multiple types of servers for business operations\nincluding the following:
File servers
Domain controllers
Microsoft SQL Server servers
Your network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.

You have a public-facing application named App1. App1 is comprised of the following three tiers:
A SQL database
A web front end
A processing middle tier
Each tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.
Requirements
Planned Changes
Contoso plans to implement the following changes to the infrastructure:
Move all the tiers of App1 to Azure.
Move the existing product blueprint files to Azure Blob storage.
Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.
Technical Requirements
Contoso must meet the following technical requirements:
Move all the virtual machines for App1 to Azure.
Minimize the number of open ports between the App1 tiers.
Ensure that all the virtual machines for App1 are protected by backups.
Copy the blueprint files to Azure over the Internet.
Ensure that the blueprint files are stored in the archive storage tier.
Ensure that partner access to the blueprint files is secured and temporary.
Prevent user passwords or hashes of passwords from being stored in Azure.
Use unmanaged standard storage for the hard disks of the virtual machines.
Ensure that when users join devices to Azure Active Directory (Azure AD)\nthe users use a mobile phone to verify their identity.
Minimize administrative effort whenever possible.
User Requirements
Contoso identifies the following requirements for users:
Ensure that only users who are part of a group named Pilot can join devices to Azure AD.
Designate a new user named Admin1 as the service administrator of the Azure subscription.
Ensure that a new user named User3 can create network objects for the Azure subscription.\`\n\`You are planning the move of App1 to Azure. You create a network security group (NSG).

You need to recommend a solution to provide users with access to App1.

What should you recommend?\``,

    options: `{
        key: "A"\ntext: "Create an outgoing security rule for port 443 from the Internet. Associate the NSG to all the subnets."\n}\n{
        key: "B"\ntext: "Create an incoming security rule for port 443 from the Internet. Associate the NSG to all the subnets."\n}\n{
        key: "C"\ntext: "Create an incoming security rule for port 443 from the Internet. Associate the NSG to the subnet that contains the web servers."\n}\n{
        key: "D"\ntext: "Create an outgoing security rule for port 443 from the Internet. Associate the NSG to the subnet that contains the web servers."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Users access the web front end using HTTPS (TCP port 443) from the Internet."\nTo minimize open ports between tiers, you should:\n• Only allow inbound HTTPS from the Internet to the **web tier subnet**.\n• Not open HTTPS on the processing or database tiers.\n\nTherefore, create an **incoming** security rule for port 443 from the Internet and associate the NSG only with the subnet that contains the web servers.\n\nCorrect answer: C.`,

    references: ["Filter network traffic with network security groups"],
  },
  {
    id: "Q91",
    number: 91,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `\`Case Study - Contoso\nLtd.
Overview
Contoso\nLtd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.

Contoso products are manufactured by using blueprint files that the company authors and maintains.

Existing Environment
Currently\nContoso uses multiple types of servers for business operations\nincluding the following:
File servers
Domain controllers
Microsoft SQL Server servers
Your network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.

You have a public-facing application named App1. App1 is comprised of the following three tiers:
A SQL database
A web front end
A processing middle tier
Each tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.
Requirements
Planned Changes
Contoso plans to implement the following changes to the infrastructure:
Move all the tiers of App1 to Azure.
Move the existing product blueprint files to Azure Blob storage.
Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.
Technical Requirements
Contoso must meet the following technical requirements:
Move all the virtual machines for App1 to Azure.
Minimize the number of open ports between the App1 tiers.
Ensure that all the virtual machines for App1 are protected by backups.
Copy the blueprint files to Azure over the Internet.
Ensure that the blueprint files are stored in the archive storage tier.
Ensure that partner access to the blueprint files is secured and temporary.
Prevent user passwords or hashes of passwords from being stored in Azure.
Use unmanaged standard storage for the hard disks of the virtual machines.
Ensure that when users join devices to Azure Active Directory (Azure AD)\nthe users use a mobile phone to verify their identity.
Minimize administrative effort whenever possible.
User Requirements
Contoso identifies the following requirements for users:
Ensure that only users who are part of a group named Pilot can join devices to Azure AD.
Designate a new user named Admin1 as the service administrator of the Azure subscription.
Ensure that a new user named User3 can create network objects for the Azure subscription.

You need to identify the storage requirements for Contoso.

For each of the following statements\nselect Yes if the statement is true. Otherwise\nselect No.

(NOTE: Each correct selection is worth one point.)\``,

    options: `{
        key: "A"\ntext: [
          "Contoso require a storage account that supports Azure Blob storage: Yes",
          "Contoso require a storage account that supports Azure Table storage: Yes",
          "Contoso require a storage account that supports Azure File storage: Yes",`,
      },
      {
        key: "B",
        text: `Contoso require a storage account that supports Azure Blob storage: Yes\nContoso require a storage account that supports Azure Table storage: Yes\nContoso require a storage account that supports Azure File storage: No`,
      },
      {
        key: "C",
        text: `Contoso require a storage account that supports Azure Blob storage: No\nContoso require a storage account that supports Azure Table storage: Yes\nContoso require a storage account that supports Azure File storage: Yes`,
      },
      {
        key: "D",
        text: `Contoso require a storage account that supports Azure Blob storage: Yes\nContoso require a storage account that supports Azure Table storage: No\nContoso require a storage account that supports Azure File storage: No`,
      },
      {
        key: "E",
        text: `Contoso require a storage account that supports Azure Blob storage: No\nContoso require a storage account that supports Azure Table storage: No\nContoso require a storage account that supports Azure File storage: Yes`,
      },
      {
        key: "F",
        text: `Contoso require a storage account that supports Azure Blob storage: No\nContoso require a storage account that supports Azure Table storage: No\nContoso require a storage account that supports Azure File storage: No`,
      },
    ],

    correctAnswers: ["D"],

    explanation: `From the technical requirements:\n• Contoso plans to move the existing product blueprint files to **Azure Blob storage**.\n• Ensure that the blueprint files are stored in the **archive storage tier** (supported only on Blob storage).\n\nThere is No explicit requirement for Azure Table storage or Azure Files in the scenario.\nTherefore:\n• Blob storage: YES\n• Table storage: No\n• File storage: No\n\nCorrect answer: D.`,

    references: `Azure Blob storage access tiers\nTypes of storage accounts in Azure\n],
  },
  {
    id: "Q92",
    number: 92,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: [
      \`Case Study - Contoso\nLtd.
Overview
Contoso\nLtd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.

Contoso products are manufactured by using blueprint files that the company authors and maintains.

Existing Environment
Currently\nContoso uses multiple types of servers for business operations\nincluding the following:
File servers
Domain controllers
Microsoft SQL Server servers
Your network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.

You have a public-facing application named App1. App1 is comprised of the following three tiers:
A SQL database
A web front end
A processing middle tier
Each tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.
Requirements
Planned Changes
Contoso plans to implement the following changes to the infrastructure:
Move all the tiers of App1 to Azure.
Move the existing product blueprint files to Azure Blob storage.
Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.
Technical Requirements
Contoso must meet the following technical requirements:
Move all the virtual machines for App1 to Azure.
Minimize the number of open ports between the App1 tiers.
Ensure that all the virtual machines for App1 are protected by backups.
Copy the blueprint files to Azure over the Internet.
Ensure that the blueprint files are stored in the archive storage tier.
Ensure that partner access to the blueprint files is secured and temporary.
Prevent user passwords or hashes of passwords from being stored in Azure.
Use unmanaged standard storage for the hard disks of the virtual machines.
Ensure that when users join devices to Azure Active Directory (Azure AD)\nthe users use a mobile phone to verify their identity.
Minimize administrative effort whenever possible.
User Requirements
Contoso identifies the following requirements for users:
Ensure that only users who are part of a group named Pilot can join devices to Azure AD.
Designate a new user named Admin1 as the service administrator of the Azure subscription.
Ensure that a new user named User3 can create network objects for the Azure subscription.

You need to move all the virtual machines for App1 to Azure.

You must ensure that all the virtual machines for App1 are protected by backups.

You need to implement a backup solution for App1 after the application is moved.

What should you create first?

 \``,

    options: `{
        key: "A"\ntext: "A recovery plan"\n}\n{
        key: "B"\ntext: "An Azure Backup Server"\n}\n{
        key: "C"\ntext: "A backup policy"\n}\n{
        key: "D"\ntext: "A Recovery Services vault"\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Azure VM backups are managed through a **Recovery Services vault**."\nThe vault is the logical container that stores backup data and recovery points.\nYou must have a Recovery Services vault before you can:\n• Define backup policies.\n• Enable backup for VMs.\n\nTherefore, the first object to create for Azure VM backup is a Recovery Services vault.\n\nCorrect answer: D.`,

    references: ["Back up a virtual machine in Azure"],
  },
  {
    id: "Q93",
    number: 93,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `\`Case Study - Contoso\nLtd.
Overview
Contoso\nLtd. is a manufacturing company that has offices worldwide. Contoso works with partner organizations to bring products to market.

Contoso products are manufactured by using blueprint files that the company authors and maintains.

Existing Environment
Currently\nContoso uses multiple types of servers for business operations\nincluding the following:
File servers
Domain controllers
Microsoft SQL Server servers
Your network contains an Active Directory forest named contoso.com. All servers and client computers are joined to Active Directory.

You have a public-facing application named App1. App1 is comprised of the following three tiers:
A SQL database
A web front end
A processing middle tier
Each tier is comprised of five virtual machines. Users access the web front end by using HTTPS only.
Requirements
Planned Changes
Contoso plans to implement the following changes to the infrastructure:
Move all the tiers of App1 to Azure.
Move the existing product blueprint files to Azure Blob storage.
Create a hybrid directory to support an upcoming Microsoft Office 365 migration project.
Technical Requirements
Contoso must meet the following technical requirements:
Move all the virtual machines for App1 to Azure.
Minimize the number of open ports between the App1 tiers.
Ensure that all the virtual machines for App1 are protected by backups.
Copy the blueprint files to Azure over the Internet.
Ensure that the blueprint files are stored in the archive storage tier.
Ensure that partner access to the blueprint files is secured and temporary.
Prevent user passwords or hashes of passwords from being stored in Azure.
Use unmanaged standard storage for the hard disks of the virtual machines.
Ensure that when users join devices to Azure Active Directory (Azure AD)\nthe users use a mobile phone to verify their identity.
Minimize administrative effort whenever possible.
User Requirements
Contoso identifies the following requirements for users:
Ensure that only users who are part of a group named Pilot can join devices to Azure AD.
Designate a new user named Admin1 as the service administrator of the Azure subscription.
Ensure that a new user named User3 can create network objects for the Azure subscription.

You need to configure the Device settings to meet the technical requirements and the user requirements.

Which two settings should you modify?

(To answer\nselect the appropriate settings in the answer area.)\``,

    options: `{
        key: "A"\ntext: "Users may join devices to Azure AD: Selected (Pilot group)"\n}\n{
        key: "B"\ntext: "Users may join devices to Azure AD: None"\n}\n{
        key: "C"\ntext: "Users may register their devices with Azure AD: All"\n}\n{
        key: "D"\ntext: "Require Multi-Factor Auth to join devices: YES"\n}\n{
        key: "E"\ntext: "Maximum number of devices per user: 20"\n}\n{
        key: "F"\ntext: "Maximum number of devices per user: 1"\n}\n],

    correctAnswers: ["A"\nD"],

    explanation: [
      "Requirements:\n• Ensure that when users join devices to Azure AD, the users use a mobile phone to verify their identity.\n• Ensure that only users who are part of a group named Pilot can join devices to Azure AD.\n\nTo enforce that only Pilot members can join devices:\n• Set "Users may join devices to Azure AD" to **Selected** and choose the Pilot group (A).\n\nTo require MFA (mobile verification) when joining:\n• Set "Require Multi-Factor Auth to join devices" to **YES** (D).\n\nThe other options don't directly enforce these two requirements.\n\nCorrect answers: A, D.`,

    references: ["Configure device settings in Azure Active Directory"],
  },
  {
    id: "Q94",
    number: 94,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `\`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.

You need to meet the technical requirement for VM4.

What should you create and configure?\``,

    options: `{
        key: "A"\ntext: "An Azure Notification Hub"\n}\n{
        key: "B"\ntext: "An Azure Event Hub"\n}\n{
        key: "C"\ntext: "An Azure Logic App"\n}\n{
        key: "D"\ntext: "An Azure Service Bus"\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "To send an email when the settings of VM4 change, you need an automated workflow triggered by Azure events."\n\nAzure Logic Apps can:\n• Subscribe to events (for example via Event Grid) for resource changes.\n• Or be triggered on schedule / HTTP / connector events.\n• Send emails using built-in connectors (Office 365, SMTP, etc.).\n\nNotification Hubs and Event Hubs are messaging/broadcast platforms, and Service Bus is a messaging broker; None of them alone implements the workflow and email logic.\n\nCorrect answer: C.`,

    references: `Tutorial: Monitor virtual machine changes with Azure Event Grid and Logic Apps\n],
  },
  {
    id: "Q95",
    number: 95,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: [
      \`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.\`\n\`\`\n\`You need to identify the appropriate size for the Azure virtual machine for Server2.\`\n\`\`\n\`What should you do?\`\n\`\`\n\`(To answer\nselect the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)\``,

    options: `{
        key: "A"\ntext: [
          "From the Azure portal: Create an Azure Migrate project.",
          "On Server2: Create a collector virtual machine.",`,
      },
      {
        key: "B",
        text: "From the Azure portal: Create a Recovery Services vault.\n On Server2: Configure Hyper-V storage migration.",
      },
      {
        key: "C",
        text: "From the Azure portal: Upload a management certificate.\n On Server2: Install the Azure Site Recovery Provider.",
      },
      {
        key: "D",
        text: "From the Azure portal: Create a Recovery Services vault.\n On Server2: Install the Azure File Sync agent.",
      },
    ],

    correctAnswers: ["A"],

    explanation: `Litware plans to migrate the virtual machines hosted on Server1 and Server2 to Azure.\n\nAzure Migrate is the service designed to:\n• Discover on-premises servers.\n• Assess readiness.\n• Recommend suitable Azure VM sizes and cost estimates.\n\nFor Server2 (Hyper-V):\n• In the Azure portal, you create an **Azure Migrate project**.\n• On-premises, you deploy the **Azure Migrate appliance (collector VM)**, which discovers workloads and collects performance data for sizing.\n\nRecovery Services vault and Site Recovery can also lift-and-shift VMs, but are Not primarily used for assessing optimal VM sizing.\n\nCorrect answer: A.`,

    references: ["About Azure Migrate"],
  },
  {
    id: "Q96",
    number: 96,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `\`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.\`\n\`\`\n\`You need to prepare the environment to implement the planned changes for Server2.\`\n\`\`\n\`What should you do?\`\n\`\`\n\`(To answer\nselect the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)\``,

    options: `{
        key: "A"\ntext: [
          "From the Azure portal: Create an Azure Migrate project.\n On Server2: Configure Hyper-V storage migration.",`,
      },
      {
        key: "B",
        text: "From the Azure portal: Create an Azure Import/Export job.\n On Server2: Install an Azure File Sync agent.",
      },
      {
        key: "C",
        text: "From the Azure portal: Create a Recovery Services vault.\n On Server2: Enable Hyper-V Replica.",
      },
      {
        key: "D",
        text: "From the Azure portal: Create an Azure Migrate project.\n On Server2: Create a collector virtual machine.",
      },
    ],

    correctAnswers: ["D"],

    explanation: `Again, the requirement is to migrate the VMs from Server2 (Hyper-V) to Azure.\n\nThe recommended approach for migration and assessment is Azure Migrate:\n• In the Azure portal: create an **Azure Migrate project**.\n• On Server2: deploy an **Azure Migrate appliance (collector VM)** to discover and send VM data to Azure.\n\nHyper-V Replica and Recovery Services vault are primarily DR solutions.\nImport/Export and File Sync are for data/file migration, Not VM migration and sizing.\n\nCorrect answer: D.`,

    references: ["About Azure Migrate"],
  },
  {
    id: "Q97",
    number: 97,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `\`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.\`\n\`\`\n\`You need to meet the connection requirements for the New York office.\`\n\`\`\n\`What should you do?\`\n\`\`\n\`(To answer\nselect the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)\``,

    options: `{
        key: "A"\ntext: [
          "From the Azure portal: Create an ExpressRoute circuit only.\n In the New York office: Deploy ExpressRoute.",`,
      },
      {
        key: "B",
        text: "From the Azure portal: Create a virtual network gateway only.\n In the New York office: Configure a site-to-site VPN connection.",
      },
      {
        key: "C",
        text: "From the Azure portal: Create a virtual network gateway only.\n In the New York office: Implement a Web Application Proxy.",
      },
      {
        key: "D",
        text: "From the Azure portal: Create a virtual network gateway and a local network gateway.\n In the New York office: Configure a site-to-site VPN connection.",
      },
      {
        key: "E",
        text: "From the Azure portal: Create an ExpressRoute circuit and an on-premises data gateway.\n In the New York office: Implement a Web Application Proxy.",
      },
      {
        key: "F",
        text: "From the Azure portal: Create a virtual network gateway and an on-premises data gateway.\n In the New York office: Deploy a DirectAccess server.",
      },
    ],

    correctAnswers: ["D"],

    explanation: `Requirement: encrypted connection over the Internet from New York office to VNet1.\n\nThis is a classic **site-to-site VPN** scenario:\n• In Azure: create a **virtual network gateway** for VNet1.\n• Also create a **local network gateway** representing the on-premises VPN device (New York office).\n• On-premises: configure the VPN device for an IPsec site-to-site VPN to Azure.\n\nExpressRoute (A, E) is a private connection through a provider, Not "over the Internet".\nWeb Application Proxy and DirectAccess are unrelated to VNet site-to-site connectivity.\n\nCorrect answer: D.`,

    references: ["Create a Site-to-Site connection in the Azure portal"],
  },
  {
    id: "Q98",
    number: 98,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `\`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.\`\n\`\`\n\`You need to recommend a solution to automate the configuration for the finance department users. The solution must meet the technical requirements.\`\n\`\`\n\`What should you include in the recommended?\``,

    options: `{
        key: "A"\ntext: "Azure AD B2C"\n}\n{
        key: "B"\ntext: "Azure AD Identity Protection"\n}\n{
        key: "C"\ntext: "An Azure logic app and the Microsoft Identity Management (MIM) client"\n}\n{
        key: "D"\ntext: "Dynamic groups and conditional access policies"\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Requirement: apply MFA only to **finance department** users."\n\nBest approach:\n• Create a **dynamic Azure AD group** whose membership rule uses the department attribute = "finance".\n• Target a **Conditional Access policy** to this group that requires MFA for sign-in.\n\nThis combination automatically includes new finance users and requires minimal administrative effort.\n\nAzure AD B2C (A) is for customer identities.\nAzure AD Identity Protection (B) provides risk-based policies, but Not directly the department-based scoping requirement.\nA Logic App plus MIM (C) is unnecessary and more complex than needed.\n\nCorrect answer: D.`,

    references: `Use attributes to create advanced rules in a dynamic group\nWhat is Conditional Access?\n],
  },
  {
    id: "Q99",
    number: 99,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: [
      \`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.\`\n\`\`\n\`You discover that VM3 does NOT meet the technical requirements.\`\n\`\`\n\`You need to verify whether the issue relates to the NSGs.\`\n\`\`\n\`What should you use?\``,

    options: `{
        key: "A"\ntext: "The diagram in VNet1"\n}\n{
        key: "B"\ntext: "The security recommendations in Azure Advisor"\n}\n{
        key: "C"\ntext: "DiagNostic settings in Azure Monitor"\n}\n{
        key: "D"\ntext: "DiagNose and solve problems in Traffic Manager Profiles"\n}\n{
        key: "E"\ntext: "IP flow verify in Azure Network Watcher"\n}\n],

    correctAnswers: ["E"],

    explanation: [
      "IP flow verify in Azure Network Watcher checks whether a packet is allowed or denied to/from a VM based on:"\n• Source/destination IP\n• Source/destination port\n• Protocol\n• Direction\nand returns the NSG rule that allowed/denied the traffic.\n\nThis is exactly what you need to verify if NSGs are blocking outbound TCP 8080 from VM3.\n\nOther options either provide general recommendations (Azure Advisor) or are unrelated to NSG rule evaluation for VM traffic.\n\nCorrect answer: E.`,

    references: ["Introduction to IP flow verify in Azure Network Watcher"],
  },
  {
    id: "Q100",
    number: 100,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `\`Case Study: Litware\nInc.
Overview
The Litware\nInc. is a consulting company that has a main office in Montreal and two branch offices in Seattle and New York.

The Montreal office has 2\n000 employees. The Seattle office has 1\n000 employees. The New York office has 200 employees.

All the resources used by Litware are hosted on-premises.

Litware creates a new Azure subscription. The Azure Active Directory (Azure AD) tenant uses a domain named litware.onmicrosoft.com. The tenant uses the P1 pricing tier.

Existing Environment
The network contains an Active Directory forest named litware.com. All domain controllers are configured as DNS servers and host the litware.com DNS zone.

Litware has finance\nhuman resources\nsales\nresearch\nand information technology departments. Each department has an organizational unit (OU) that contains all the accounts of that respective department. All the user accounts have the department attribute set to their respective department.

New users are added frequently.

Litware.com contains a user named User1.

All the offices connect by using private links.

Litware has data centers in the Montreal and Seattle offices. Each data center has a firewall that can be configured as a VPN device.

All infrastructure servers are virtualized. The virtualization environment contains the servers in the following table:\`\n\`| Name | Role | Hosts VM |\`\n\`|------|-------------------------------|----------|\`\n\`|• Server1 | VMware vCenter server | VM1\`\n\`|• Server2 |Hyper-V host |  VM2|\`\n\`\`\n\`Litware uses two web applications named App1 and App2. Each instance on each web application requires 1GB of memory.\`\n\`The Azure subscription contains the resources in the following table.\`\n\`\`\n\`Name| Type\`\n\`---|-------------------------------\`\n• VNet1 |(virtual network)\n• VM3 | (virtual machine)\n• VM4 | (virtual machine)\n\`\`\n\`The network security team implements several network security groups (NSGs)\`\n\`Planned Changes\`\n\`\`\n\`Litware plans to implement the following changes:\`\n\`\`\n\`Deploy Azure ExpressRoute to the Montreal office.
Migrate the virtual machines hosted on Server1 and Server2 to Azure.
Synchronize on-premises Active Directory to Azure Active Directory (Azure AD).
Migrate App1 and App2 to two Azure web apps named WebApp1 and WebApp2.\`\n\`\`\n\`Technical requirements\`\n\`\`\n\`
Litware must meet the following technical requirements:\`\n\`\`\n\`
- Ensure that WebApp1 can adjust the number of instances automatically based on the load and can scale up to five instances.
- Ensure that VM3 can establish outbound connections over TCP port 8080 to the applications servers in the Montreal office.
- Ensure that routing information is exchanged automatically between Azure and the routers in the Montreal office.
- Enable Azure Multi-Factor Authentication (MFA) for the users in the finance department only.
- Ensure that webapp2.azurewebsites.net can be accessed by using the name app2.litware.com.
- Connect the New York office to VNet1 over the Internet by using an encrypted connection.
- Create a workflow to send an email message when the settings of VM4 are modified.
- Create a custom Azure role named Role1 that is based on the Reader role.
- Minimize costs whenever possible.\`\n\`\`\n\`You need to implement Role1.\`\n\`\`\n\`Which command should you run before you create Role1?\`\n\`\`\n\`(To answer\nselect the appropriate options in the answer area. NOTE: Each correct selection is worth one point.)\``,

    options: `{
        key: "A"\ntext: 'Find-RoleCapability -Name "Reader" | ConvertFrom-String'\n}\n{
        key: "B"\ntext: 'Get-AzureADDirectoryRole -Name "Reader" | ConvertTo-Json'\n}\n{
        key: "C"\ntext: 'Get-AzureADDirectoryRole -Name "Reader" | ConvertTo-Xml'\n}\n{
        key: "D"\ntext: 'Get-AzureRmRoleAssignment -Name "Reader" | ConvertTo-Xml'\n}\n{
        key: "E"\ntext: 'Get-AzureRmRoleDefinition -Name "Reader" | ConvertTo-Json'\n}\n{
        key: "F"\ntext: 'Get-AzureRmRoleDefinition -Name "Reader" | ConvertFrom-Json'\n}\n],

    correctAnswers: ["E"],

    explanation: [
      "To create a custom Azure role based on an existing built-in role (Reader), you must first export the role definition to JSON."\n\nThe correct PowerShell command is:\nGet-AzureRmRoleDefinition -Name "Reader" | ConvertTo-Json\n\nYou then modify the JSON as needed and use it as input when creating the custom role.\nDirectory roles (Get-AzureADDirectoryRole) are for Azure AD, Not Azure RBAC.\nRole assignments (Get-AzureRmRoleAssignment) are Not definitions.\n\nCorrect answer: E.`,

    references: `Tutorial: Create an Azure custom role using Azure PowerShell\n],
  },
  {
    id: "Q101",
    number: 101,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1 that contains the resources shown in the following table."\n\n|Name| Type| Region|\n|--------------------------------|----------------|-----------------|\n|RG1| Resource group | West Europe|\nRG2    | Resource group        | North Europe\nVault1 | Recovery Services vault | West Europe\n\nVault1 is in RG1 (West Europe).\n\nYou create virtual machines in Subscription1 as shown in the following table.\n\nName | Resource group | Region         | Operating system\n--------------------------------|----------------|-----------------|---------------------\nVM1  | RG1            | West Europe    | Windows Server 2016\nVM2  | RG1            | North Europe   | Windows Server 2016\nVM3  | RG1            | West Europe    | Windows Server 2016\nVMA  | RG2            | West Europe    | Ubuntu Server 18.04\nVMB  | RG2            | North Europe   | Ubuntu Server 18.04\nVMC  | RG2            | West Europe    | Ubuntu Server 18.04\n\nYou plan to use Vault1 for the backup of as many virtual machines as possible.\n\nWhich virtual machines can be backed up to Vault1?`,

    options: `{ key: "A"\ntext: "VM1, VM3, VMA, and VMC only" }\n{ key: "B"\ntext: "VM1 and VM3 only" }\n{ key: "C"\ntext: "VM1, VM2, VM3, VMA, VMB, and VMC" }\n{ key: "D"\ntext: "VM1 only" }\n{ key: "E"\ntext: "VM3 and VMC only" }\n],

    correctAnswers: ["A"],

    explanation: [
      "A Recovery Services vault can only protect virtual machines that are in the same Azure region as the vault."\nVault1 is in West Europe, so it can back up:\n• All VMs in West Europe, regardless of resource group:\n  – VM1 (RG1, West Europe)\n  – VM3 (RG1, West Europe)\n  – VMA (RG2, West Europe)\n  – VMC (RG2, West Europe)\nVM2 and VMB are in North Europe and therefore canNot use Vault1.\n\nCorrect answer: A.`,

    references: ["Create a Recovery Services vault"],
  },
  {
    id: "Q102",
    number: 102,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains the resources shown in the following table.\n\nName  | Type                  | Resource group | Region\n--------------------------------|----------------|-----------------|----------------\nVault1| Recovery Services vault | RG1          | East US\nVM1   | Virtual machine       | RG1           | East US\nVM2   | Virtual machine       | RG1           | West US\n\nAll virtual machines run Windows Server 2016.\n\nOn VM1, you back up a folder named Folder1 by using the Windows Server Backup feature.\n\nThe backup schedule is configured as shown in the exhibit (Specify Backup Time wizard):\n• More then once a day:\n\nat 6:00 AM \nat 10:00 PM \n\nYou plan to restore the backup to a different virtual machine.\n\nYou need to restore the backup to VM2.\n\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "From VM2, install the Microsoft Azure Recovery Services Agent."\n}\n{
        key: "B"\ntext: "From VM1, install the Windows Server Backup feature."\n}\n{
        key: "C"\ntext: "From VM2, install the Windows Server Backup feature."\n}\n{
        key: "D"\ntext: "From VM1, install the Microsoft Azure Recovery Services Agent."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "The exhibit shows the Windows Server Backup wizard (local backup schedule)."\nFolder1 was backed up using the Windows Server Backup feature on VM1.\nTo restore this backup on VM2, you must:\n• Install the Windows Server Backup feature on VM2, and then restore from the backup location.\n\nThe Microsoft Azure Recovery Services Agent (MARS) is Not involved for this local Windows Server Backup scenario.\n\nCorrect answer: C.`,

    references: `Install Windows Server Backup\nBack up and restore with Windows Server Backup\n],
  },
  {
    id: "Q103",
    number: 103,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: [
      "Monitor and maintain Azure resources (10-15%)"\n\nYou have an Azure subscription that contains the resources shown in the following table:\n\nName  | Type                  | Resource group | Region\n--------------------------------|----------------|-----------------|----------------\nVault1| Recovery Services vault | RG1          | East US\nVM1   | Virtual machine       | RG1           | East US\nVM2   | Virtual machine       | RG1           | West US\n\nAll virtual machines run Windows Server 2016.\n\nOn VM1, you back up a folder named Folder1 by using the Microsoft Azure Recovery Services (MARS) agent.\n\nThe backup schedule is configured as shown in the exhibit (Specify Backup Schedule wizard):\n\n• Schedule a backup every Day, at 6:00 AM and 10:00 PM (maximum three backups a day).\n\n• A retention policy is configured (feature specific to MARS).\n\nYou plan to restore the backup to a different virtual machine.\nYou need to restore the backup to VM2.\n\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "From VM2, install the Microsoft Azure Recovery Services Agent."\n}\n{
        key: "B"\ntext: "From VM1, install the Windows Server Backup feature."\n}\n{
        key: "C"\ntext: "From VM2, install the Windows Server Backup feature."\n}\n{
        key: "D"\ntext: "From VM1, install the Microsoft Azure Recovery Services Agent."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "The exhibit shows the MARS agent (Azure Backup) schedule with a daily/weekly schedule and retention policy."\nFolder1 was backed up using the Microsoft Azure Recovery Services (MARS) agent on VM1.\nTo restore that backup to VM2, you must:\n• Install the MARS agent on VM2, register it with Vault1, and then perform the restore.\n\nWindows Server Backup is Not used in this scenario.\n\nCorrect answer: A.`,

    references: ["About the Microsoft Azure Recovery Services (MARS) agent"],
  },
  {
    id: "Q104",
    number: 104,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Deploy and manage Azure compute resources (20-25%)\n\nYou create a virtual machine scale set named Scale1. Scale1 is configured as shown in the exhibit.\n\nKey settings:\n• Instance count: 4\n• Instance size: Standard DS1 v2\n• Use managed disks: YES\n\nAutoscale:\n• Autoscale: Enabled\n• Minimum number of VMs: 2\n• Maximum number of VMs: 20\n• Scale out rule:\n  – CPU threshold: 80%\n  – Number of VMs to increase by: 2\n  – Duration: 10 minutes\n• Scale in rule:\n  – CPU threshold: 30%\n  – Number of VMs to decrease by: 4\n  – Duration: 10 minutes\n\nUse the drop-down menus to select the answer choice that completes each statement:\n\n• If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running [answer choice].\n• If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running [answer choice].\n\nAvailable choices (for each blank):\n• 2 virtual machines\n• 4 virtual machines\n• 6 virtual machines\n• 10 virtual machines\n• 20 virtual machines.`,

    options: `{
        key: "A"\ntext: [
          "If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running: 2 virtual machines;\n If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running: 2 virtual machines",`,
      },
      {
        key: "B",
        text: "If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running: 2 virtual machines;\n If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running: 4 virtual machines",
      },
      {
        key: "C",
        text: "If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running: 4 virtual machines;\n If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running: 2 virtual machines",
      },
      {
        key: "D",
        text: "If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running: 4 virtual machines;\n If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running: 4 virtual machines",
      },
      {
        key: "E",
        text: "If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running: 6 virtual machines;\n If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running: 6 virtual machines",
      },
      {
        key: "F",
        text: "If Scale1 is utilized at 85 percent for 11 minutes, Scale1 will be running: 20 virtual machines;\n If Scale1 is first utilized at 85 percent for 11 minutes, and then utilized at 50 percent for 11 minutes, Scale1 will be running: 4 virtual machines",
      },
    ],

    correctAnswers: ["E"],

    explanation: `Initial instance count for Scale1 is 4 virtual machines.\n\nFirst statement:\n• CPU utilization at 85% (above the 80% scale-out threshold) for longer than 10 minutes.\n• The scale-out rule increases the instance count by 2.\n• 4 + 2 = 6 VMs.\n\nSecond statement:\n• After scaling out, Scale1 runs with 6 VMs.\n• Then CPU utilization drops to 50%, which is above the 30% scale-in threshold.\n• So the scale-in rule does NoT trigger; the instance count remains 6.\n\nTherefore, in both cases Scale1 will be running 6 VMs.\n\nCorrect answer: E.`,

    references: `Tutorial: Automatically scale a virtual machine scale set with Azure PowerShell\n],
  },
  {
    id: "Q105",
    number: 105,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Manage Azure identities and governance (20-25%)"\n\nYou have an Azure Active Directory (Azure AD) tenant named contosocloud.onmicrosoft.com.\nYour company has a public DNS zone for contoso.com.\n\nYou add contoso.com as a custom domain name to Azure AD.\nYou need to ensure that Azure can verify the domain name.\n\nWhich type of DNS record should you create?`,

    options: `{ key: "A"\ntext: "PTR" }\n{ key: "B"\ntext: "MX" }\n{ key: "C"\ntext: "NSEC3" }\n{ key: "D"\ntext: "RRSIG" }\n],

    correctAnswers: ["B"],

    explanation: [
      "To verify ownership of a custom domain in Azure AD, you can create either:"\n• A TXT record, or\n• An MX record with a specific value provided by Azure AD.\n\nIn this question, the correct option presented is an MX record.\n\nPTR, NSEC3, and RRSIG records are Not used for Azure AD domain verification.\n\nCorrect answer: B.`,

    references: ["Add a custom domain name to Azure Active Directory"],
  },
  {
    id: "Q106",
    number: 106,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: `Monitor and maintain Azure resources (10-15%)\n\nYou have an Azure virtual machine named VM1.\nYou use Azure Backup to create a backup of VM1 named Backup1.\n\nAfter creating Backup1, you perform the following changes to VM1:\n• Modify the size of VM1.\n• Copy a file named Budget.xls to a folder named Data.\n• Reset the password for the built-in administrator account.\n• Add a data disk to VM1.\n\nAn administrator uses the Replace existing option to restore VM1 from Backup1.\nYou need to ensure that all the changes to VM1 are restored.\n\nWhich change should you perform again?`,

    options: `{ key: "A"\ntext: "Modify the size of VM1." }\n{ key: "B"\ntext: "Add a data disk." }\n{
        key: "C"\ntext: "Reset the password for the built-in administrator account."\n}\n{ key: "D"\ntext: "Copy Budget.xls to Data." }\n],

    correctAnswers: ["B"],

    explanation: [
      "When you restore a VM using the 'Replace existing' option:"\n• The OS disk and any data disks present at the time of the backup are restored.\n• Configuration such as VM size can be changed again after restore.\n• Files on the restored disks (such as Budget.xls in the Data folder) will be as of the backup time.\n• A data disk added *after* the backup was taken will Not exist in the restore point.\n\nTherefore, after the restore, you must add the additional data disk again.\n\nCorrect answer: B.`,

    references: ["How to restore Azure VM data in Azure portal"],
  },
  {
    id: "Q107",
    number: 107,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\n\nYour company has an Azure subscription named Subscription1.\nThe company also has two on-premises servers named Server1 and Server2 that run Windows Server 2016.\n\nServer1 is configured as a DNS server that has a primary DNS zone named adatum.com.\nAdatum.com contains 1,000 DNS records.\n\nYou manage Server1 and Subscription1 from Server2.\nServer2 has the following tools installed:\n• The DNS Manager console\n• Azure PowerShell\n• Azure CLI 2.0\n\nYou need to move the adatum.com zone to Subscription1.\nThe solution must minimize administrative effort.\n\nWhat should you use?`,

    options: `{ key: "A"\ntext: "Azure PowerShell" }\n{ key: "B"\ntext: "Azure CLI" }\n{ key: "C"\ntext: "The Azure portal" }\n{ key: "D"\ntext: "The DNS Manager console" }\n],

    correctAnswers: ["B"],

    explanation: [
      "If you want to migrate an existing DNS zone into Azure DNS, the easiest way is to import a zone file."\nAzure DNS supports importing and exporting DNS zone files by using the Azure CLI.\n\nZone file import is Not currently supported via Azure PowerShell or the Azure portal.\n\nTherefore, to minimize administrative effort when moving adatum.com to Azure DNS, you should use Azure CLI.\n\nCorrect answer: B.`,

    references: ["Import and export a DNS zone file using the Azure CLI"],
  },
  {
    id: "Q108",
    number: 108,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\n\nYou have a hybrid infrastructure that contains an Azure Active Directory (Azure AD) tenant named contoso.onmicrosoft.com.\nThe tenant contains the users shown in the following table:\n\nName  | User name                     | Type   | Source\n--------------------------------|----------------|-----------------|----------------\nUser1 | User1@contoso.onmicrosoft.com | Member | Azure Active Directory\nUser2 | User2@contoso.onmicrosoft.com | Member | Windows Server Active Directory\nUser3 | User3@outlook.com             | Guest  | Microsoft Account\nUser4 | User4@gmail.com               | Guest  | Microsoft Account\n\nYou plan to share a cloud resource to the "All Users" group.\nYou need to ensure that User1, User2, User3, and User4 can connect successfully to the cloud resource.\n\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "Create a user account of the member type for User4." }\n{ key: "B"\ntext: "Create a user account of the member type for User3." }\n{ key: "C"\ntext: "Modify the Directory-wide Groups settings." }\n{ key: "D"\ntext: "Modify the External collaboration settings." }\n],

    correctAnswers: ["C"],

    explanation: [
      'You can create a dynamic group that includes "All users" using a rule like:'\n  user.objectId -ne null\nThis rule includes both member and guest users.\n\nTo ensure that the built-in "All Users" group includes guest accounts, you must configure it via the Directory-wide groups settings in Azure AD.\nThose settings control how 'All users' and similar directory-wide groups behave.\n\nExternal collaboration settings control whether guests can be invited, but Not specifically the membership of 'All Users'.\n\nCorrect answer: C.`,

    references: ["Use directory-wide groups in Azure Active Directory"],
  },
  {
    id: "Q109",
    number: 109,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\n\nYou have Azure virtual machines that run Windows Server 2019 and are configured as shown in the following table:\n\nName | Virtual network | DNS suffix in Windows Server\n--------------------------------|----------------|-----------------\nVM1  | VNet1           | contoso.com\nVM2  | VNet2           | contoso.com\n\nYou create:\n• A public Azure DNS zone named adatum.com.\n• A private Azure DNS zone named contoso.com.\n\nFor contoso.com, you create a virtual network link named link1 as shown in the exhibit:\n\n• Link name: link1\n• Virtual network: VNet1\n• Link state: Completed\n• Provisioning state: Succeeded\n• Enable auto registration: Enabled\n\nYou discover that VM1 can resolve names in contoso.com but canNot resolve names in adatum.com.\nVM1 can resolve other hosts on the Internet.\n\nYou need to ensure that VM1 can resolve host names in adatum.com.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Update the DNS suffix on VM1 to be adatum.com." }\n{ key: "B"\ntext: "Create an SRV record in the contoso.com zone." }\n{
        key: "C"\ntext: "Configure the name servers for adatum.com at the domain registrar."\n}\n{ key: "D"\ntext: "Modify the Access control (IAM) settings for link1." }\n],

    correctAnswers: ["C"],

    explanation: [
      "VM1 already resolves public Internet names and private contoso.com names via Azure DNS."\n\nThe public zone adatum.com exists in Azure DNS, but for public clients (including VM1's recursive resolver) to find it,\nthe domain registrar for adatum.com must be configured to use the Azure DNS name servers.\n\nUntil the registrar is updated with the Azure DNS NS records, adatum.com will Not be resolvable on the Internet.\n\nChanging DNS suffix or IAM on the link does Not solve this.\n\nCorrect answer: C.`,

    references: ["Delegate a domain to Azure DNS"],
  },
  {
    id: "Q110",
    number: 110,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `Implement and manage storage (15-20%)\n\nYou are an administrator for a company.\nYou need to create an Azure Storage account that meets the following requirements:\n• Minimizes costs.\n• Supports hot, cool, and archive blob tiers.\n• Provides fault tolerance if a disaster affects the Azure region where the account resides.\n\nHow should you complete the command?\n\naz storage account create -g RG1 -n storageaccount1 --kind ______ --sku ______\n\nAnswer choices:\nKind:\n• BlobStorage\n• Storage\n• StorageV2\n\nSKU:\n• Standard_GRS\n• Standard_LRS\n• Standard_RAGRS`,

    options: `{
        key: "A"\ntext: "az storage account create -g RG1 -n storageaccount1 --kind BlobStorage --sku Premium_LRS"\n}\n{
        key: "B"\ntext: "az storage account create -g RG1 -n storageaccount1 --kind BlobStorage --sku Standard_GRS"\n}\n{
        key: "C"\ntext: "az storage account create -g RG1 -n storageaccount1 --kind Storage --sku Standard_LRS"\n}\n{
        key: "D"\ntext: "az storage account create -g RG1 -n storageaccount1 --kind Storage --sku Standard_RAGRS"\n}\n{
        key: "E"\ntext: "az storage account create -g RG1 -n storageaccount1 --kind StorageV2 --sku Standard_GRS"\n}\n{
        key: "F"\ntext: "az storage account create -g RG1 -n storageaccount1 --kind StorageV2 --sku Standard_LRS"\n}\n],

    correctAnswers: ["E"],

    explanation: [
      "Requirements analysis:"\n• Hot, cool, and archive tiers: supported by BlobStorage and general-purpose v2 (StorageV2) accounts.\n• Fault tolerance for a regional disaster: requires geo-redundant storage (GRS or RA-GRS).\n• Minimize costs: choose Standard (Not Premium).\n\nGeneral-purpose v2 (StorageV2) accounts support all access tiers and offer the most flexibility and best pricing.\nTo provide cross-region redundancy, use Standard_GRS as the SKU.\n\nTherefore:\n• Kind: StorageV2\n• SKU: Standard_GRS\n\nCorrect answer: E.`,

    references: ["Azure storage account overview"],
  },
  {
    id: "Q111",
    number: 111,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `Manage Azure identities and governance (20-25%)\n\nYou have an Azure Active Directory (Azure AD) tenant named contoso.onmicrosoft.com.\nThe User administrator role is assigned to a user named Admin1.\n\nAn external partner has a Microsoft account that uses the user1@outlook.com sign-in.\n\nAdmin1 attempts to invite the external partner to sign in to the Azure AD tenant and receives the following error message:\n  "Unable to invite user user1@outlook.com - Generic authorization exception."\n\nYou need to ensure that Admin1 can invite the external partner to sign in to the Azure AD tenant.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From the Roles and administrators blade, assign the Security administrator role to Admin1."\n}\n{
        key: "B"\ntext: "From the Organizational relationships blade, add an identity provider."\n}\n{
        key: "C"\ntext: "From the Custom domain names blade, add a custom domain."\n}\n{
        key: "D"\ntext: "From the Users blade, modify the External collaboration settings."\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Inviting guest users (B2B collaboration) is controlled by the External collaboration settings in Azure AD."\nTo allow Admin1 (User administrator) to invite external partners, you must configure these settings so that:\n• Admins and users in the guest inviter role (or members) are allowed to invite guests.\n\nAdding an identity provider or custom domain does Not address the authorization error.\nChanging Admin1's role to Security administrator is Not required.\n\nCorrect answer: D.`,

    references: `Configure external collaboration settings for Azure Active Directory B2B\n],
  },
  {
    id: "Q112",
    number: 112,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Manage Azure identities and governance (20-25%)"\n\nYou have an Azure subscription that contains a user account named User1.\nYou need to ensure that User1 can assign a policy to the tenant root management group.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "Assign the Owner role to User1, and then instruct User1 to configure access management for Azure resources."\n}\n{
        key: "B"\ntext: "Assign the Global administrator role to User1, and then instruct User1 to configure access management for Azure resources."\n}\n{
        key: "C"\ntext: "Assign the Global administrator role to User1, and then modify the default conditional access policies."\n}\n{
        key: "D"\ntext: "Assign the Owner role to User1, and then modify the default conditional access policies."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "The tenant root management group is at the top of the management group hierarchy."\nTo manage permissions at this level initially, you must:\n• Be an Azure AD Global administrator.\n• Elevate access by enabling 'Access management for Azure resources' for your account.\n\nAfter elevation, you can assign RBAC roles (such as Owner) at the root management group.\n\nAssigning Owner on a subscription alone is insufficient to manage the root management group.\nConditional access policies are unrelated to this requirement.\n\nCorrect answer: B.`,

    references: `Organize your resources with Azure management groups\nElevate access to manage all Azure subscriptions and management groups\n],
  },
  {
    id: "Q113",
    number: 113,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: [
      "Implement and manage storage (15-20%)"\n\nYou are an administrator for a company.\nYou have several Azure virtual machines on a virtual network named VNet1.\n\nYou configure an Azure Storage account as shown in the exhibit:\n\nKey settings:\n• Firewall and virtual networks:\n  – Allow access from: Selected networks.\n  – Virtual networks: VNet1 / subnet 'default' (10.2.0.0/24), endpoint status Enabled.\n• IP ranges: None configured.\n• Exceptions:\n  – Allow trusted Microsoft services to access this storage account: Enabled.\n\nYou plan to use file shares and Azure Backup with this storage account.\n\nUse the drop-down menus to select the answer choice that completes each statement:\n\n• The virtual machines on the 10.2.0.0/24 subnet will [answer choice] have network connectivity to the file shares in the storage account.\n• Azure Backup will [answer choice] be able to back up the unmanaged hard disks of the virtual machines in the storage account.\n\nChoices:\n• always\n• during a backup\n• never`,

    options: `{
        key: "A"\ntext: [
          "The virtual machines on the 10.2.0.0/24 subnet will always have network connectivity to the file shares in the storage account;\n Azure Backup will always be able to back up the unmanaged hard disks of the virtual machines in the storage account.",`,
      },
      {
        key: "B",
        text: "The virtual machines on the 10.2.0.0/24 subnet will never have network connectivity to the file shares in the storage account;\n Azure Backup will always be able to back up the unmanaged hard disks of the virtual machines in the storage account.",
      },
      {
        key: "C",
        text: "The virtual machines on the 10.2.0.0/24 subnet will during a backup have network connectivity to the file shares in the storage account;\n Azure Backup will never be able to back up the unmanaged hard disks of the virtual machines in the storage account.",
      },
      {
        key: "D",
        text: "The virtual machines on the 10.2.0.0/24 subnet will always have network connectivity to the file shares in the storage account;\n Azure Backup will never be able to back up the unmanaged hard disks of the virtual machines in the storage account.",
      },
    ],

    correctAnswers: ["A"],

    explanation: `For the first statement:\n• The storage account is restricted to 'Selected networks'.\n• VNet1/subnet 10.2.0.0/24 is explicitly linked with service endpoints (endpoint status Enabled).\n• Therefore, VMs in 10.2.0.0/24 can always access the storage account, including file shares.\n\nFor the second statement:\n• 'Allow trusted Microsoft services to access this storage account' is enabled.\n• Azure Backup is considered a trusted Microsoft service.\n• Therefore, Azure Backup can always access the storage account to back up unmanaged disks.\n\nCorrect answer: A.`,

    references: ["Configure Azure Storage firewalls and virtual networks"],
  },
  {
    id: "Q114",
    number: 114,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\n\nYou have an Azure subscription that contains the virtual machines shown in the following table:\n\nName | OS                 | Connects to\n--------------------------------|----------------|-----------------\nVM1  | Windows Server 2019| Subnet1\nVM2  | Windows Server 2019| Subnet2\n\nVM1 and VM2 use public IP addresses.\nOn both VM1 and VM2, you allow inbound Remote Desktop connections in Windows Server.\n\nSubnet1 and Subnet2 are in a virtual network named VNet1.\n\nThe subscription contains two network security groups (NSGs) named NSG1 and NSG2.\n• NSG1 uses only the default rules.\n• NSG2 uses the default rules and the following custom incoming rule:\n  – Priority: 100\n  – Name: Rule1\n  – Port: 3389\n  – Protocol: TCP\n  – Source: Any\n  – Destination: Any\n  – Action: Allow\n\nNSG1 is associated to Subnet1.\nNSG2 is associated to the network interface of VM2.\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\n1. From the Internet, you can connect to VM1 by using Remote Desktop.\n2. From the Internet, you can connect to VM2 by using Remote Desktop.\n3. From VM1, you can connect to VM2 by using Remote Desktop.`,

    options: `{
        key: "A"\ntext: [
          "From the Internet, you can connect to VM1 by using Remote Desktop: YES;\n From the Internet, you can connect to VM2 by using Remote Desktop: YES;\n From VM1, you can connect to VM2 by using Remote Desktop: YES",`,
      },
      {
        key: "B",
        text: "From the Internet, you can connect to VM1 by using Remote Desktop: No;\n From the Internet, you can connect to VM2 by using Remote Desktop: YES;\n From VM1, you can connect to VM2 by using Remote Desktop: YES",
      },
      {
        key: "C",
        text: "From the Internet, you can connect to VM1 by using Remote Desktop: YES;\n From the Internet, you can connect to VM2 by using Remote Desktop: YES;\n From VM1, you can connect to VM2 by using Remote Desktop: No",
      },
      {
        key: "D",
        text: "From the Internet, you can connect to VM1 by using Remote Desktop: YES;\n From the Internet, you can connect to VM2 by using Remote Desktop: No;\n From VM1, you can connect to VM2 by using Remote Desktop: YES",
      },
      {
        key: "E",
        text: "From the Internet, you can connect to VM1 by using Remote Desktop: No;\n From the Internet, you can connect to VM2 by using Remote Desktop: No;\n From VM1, you can connect to VM2 by using Remote Desktop: YES",
      },
      {
        key: "F",
        text: "From the Internet, you can connect to VM1 by using Remote Desktop: No;\n From the Internet, you can connect to VM2 by using Remote Desktop: No;\n From VM1, you can connect to VM2 by using Remote Desktop: No",
      },
    ],

    correctAnswers: ["B"],

    explanation: `Default NSG inbound rules:\n• AllowVnetInBound (65000): Allow from VirtualNetwork to VirtualNetwork.\n• AllowAzureLoadBalancerInBound (65001).\n• DenyAllInBound (65500).\n\n1) From the Internet to VM1:\n• NSG1 is on Subnet1 with only default rules.\n• There is No inbound allow rule for TCP 3389 from the Internet.\n• So inbound RDP from the Internet is denied.\n=> Statement 1: No.\n\n2) From the Internet to VM2:\n• NSG2 is attached to VM2's NIC and includes Rule1 (allow TCP 3389 from Any to Any).\n• Thus RDP from the Internet is allowed.\n=> Statement 2: YES.\n\n3) From VM1 to VM2:\n• Traffic from VM1 to VM2 is within the same VNet, so it matches AllowVnetInBound on both NSGs.\n• NSG2 also allows TCP 3389 explicitly.\n=> Statement 3: YES.\n\nCorrect answer: B.`,

    references: ["Network security group overview"],
  },
  {
    id: "Q115",
    number: 115,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\n\nYou have an Azure virtual machine named VM1.\nThe network security group (NSG) linked to the network interface for VM1 (VM1-nsg) is configured as shown in the exhibit.\n\nInbound security rules (excerpt):\nPriority | Name  | Port(s)       | Protocol | Source | Destination | Action\n-------- |-------|---------------|----------|--------|-------------|--------\n300      | RDP   | 3389         | TCP      | Any    | Any         | Allow\n400      | Rule1 | 80           | TCP      | Any    | Any         | Deny\n500      | Rule2 | 80,443       | TCP      | Any    | Any         | Deny\n1000     | Rule4 | 50-100,400-500 | UDP    | Any    | Vnet | Allow\n2000     | Rule5 | 50-5000      | Any      | Any    | Vnet | Deny\n3000     | Rule6 | 60-500       | Any      | Any    | Any         | Allow\n65000    | Allow Vnet InBound   | Any      | Any    | Vnet | Allow\n65001    | Allow ALB InBound | Any | Any | ALB | Allow\n65500    | DenyAllInBound     | Any      | Any    | Any         | Deny\n\n*ALB: Azure Load Balancer\n*VNet: Virtual Network\n\nYou deploy a web server on VM1, and then create a secure website that is accessible by using the HTTPS protocol (TCP 443).\nVM1 is used as a web server only.\n\nYou need to ensure that users can connect to the website from the Internet.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Change the priority of Rule3 to 450." }\n{ key: "B"\ntext: "Change the priority of Rule6 to 100." }\n{ key: "C"\ntext: "Delete Rule1." }\n{
        key: "D"\ntext: "Create a new inbound rule that allows TCP port 443 and configure the rule to have a priority of 501."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Currently, inbound TCP 443 is blocked by Rule2 (priority 500, Deny 80,443)."\n\nRule3 (priority 3000 in the exhibit, port range 60–500 Allow) is too low priority to override Rule2.\nIf you change the priority of Rule3 to 450 (a lower numeric value than 500), Rule3 will be processed before Rule2 and will allow TCP 443.\n\nNo other option effectively overrides the existing deny on 443:\n• Changing Rule6's priority (different port range in the actual portal) would Not match 443 in this question's logic.\n• Deleting Rule1 does Not affect 443.\n• Creating a new allow for 443 with priority 501 would still be processed after the deny at 500, so it would Not work.\n\nImportant: In a real environment, you would create a specific allow rule for TCP 443 with a priority lower than the deny rule, Not open a wide range. But within the given options, changing Rule3's priority is the only working solution.\n\nCorrect answer: A.`,

    references: ["Security rule processing in network security groups"],
  },
  {
    id: "Q116",
    number: 116,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Deploy and manage Azure compute resources (20-25%)\n\nYou have an Azure subscription that contains a web app named webapp1.\nYou need to add a custom domain named www.contoso.com to webapp1.\n\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "Upload a certificate." }\n{ key: "B"\ntext: "Add a connection string." }\n{ key: "C"\ntext: "Stop webapp1." }\n{ key: "D"\ntext: "Create a DNS record." }\n],

    correctAnswers: ["D"],

    explanation: [
      "To use a custom domain with an Azure App Service web app, you must first prove ownership of the domain."\nThis is done by creating DNS records at your domain registrar:\n• Typically a TXT record for verification.\n• And an A or CNAME record to map the domain (www.contoso.com) to the web app's IP or hostname.\n\nOnly after DNS is configured can you successfully add the custom domain in the Azure portal.\n\nUploading a certificate is only necessary for HTTPS.\nStopping the web app or adding a connection string is unrelated.\n\nCorrect answer: D.`,

    references: ["Tutorial: Map a custom domain to an Azure App Service app"],
  },
  {
    id: "Q117",
    number: 117,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `Implement and manage storage (15-20%)\n\nYou have an Azure subscription that contains an Azure Storage account.\nYou plan to copy an on-premises virtual machine image to a container named vmimages.\nYou need to create the container for the planned image.\n\nWhich command should you run?\n\nAnswer Area (fill in the blanks):\nazcopy ______ 'https://mystorageaccount.______.core.windows.net/vmimages'`,

    options: `{
        key: "A"\ntext: "azcopy make 'https://mystorageaccount.blob.core.windows.net/vmimages'"\n}\n{
        key: "B"\ntext: "azcopy make 'https://mystorageaccount.dfs.core.windows.net/vmimages'"\n}\n{
        key: "C"\ntext: "azcopy sync 'https://mystorageaccount.queue.core.windows.net/vmimages'"\n}\n{
        key: "D"\ntext: "azcopy sync 'https://mystorageaccount.table.core.windows.net/vmimages'"\n}\n{
        key: "E"\ntext: "azcopy copy 'https://mystorageaccount.images.core.windows.net/vmimages'"\n}\n{
        key: "F"\ntext: "azcopy copy 'https://mystorageaccount.file.core.windows.net/vmimages'"\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "AzCopy is a command-line utility for copying data to, from, or between Azure Storage accounts."\n\nTo create a new container in Blob Storage, you use the 'make' verb:\n• azcopy make 'https://<storage-account-name>.blob.core.windows.net/<container-name>'\n\nIn this case, the correct command is:\n• azcopy make 'https://mystorageaccount.blob.core.windows.net/vmimages'\n\nOther endpoints (dfs, queue, table, file) are for different services and are Not appropriate for a blob container.\n\nCorrect answer: A.`,

    references: ["Transfer data with AzCopy and Blob storage"],
  },
  {
    id: "Q118",
    number: 118,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Implement and manage virtual networking (15-20%)\n\nYou have an Azure subscription named Subscription1.\nYou plan to deploy a multi-tiered application that will contain the tiers shown in the following table:\n\nTier                       | Accessible from the Internet | Number of VMs\n--------------------------|------------------------------|----------------\nFront-end web server       | YES                          | 10\nBusiness logic             | No                           | 100\nMicrosoft SQL Server DBs   | No                           | 5\n\nYou need to recommend a networking solution to meet the following requirements:\n• Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines.\n• Protect the web servers from SQL injection attacks.\n\nWhich Azure resource should you recommend for each requirement?`,

    options: `{
        key: "A"\ntext: [
          "•Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines: An application gateway that uses the Standard tier;\n •Protect the web servers from SQL injection attacks: A network security group (NSG).",`,
      },
      {
        key: "B",
        text: "•Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines: An application gateway that uses the WAF tier;\n •Protect the web servers from SQL injection attacks: An internal load balancer.",
      },
      {
        key: "C",
        text: "•Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines: An internal load balancer;\n •Protect the web servers from SQL injection attacks: A network security group (NSG).",
      },
      {
        key: "D",
        text: "•Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines: An internal load balancer;\n •Protect the web servers from SQL injection attacks: An application gateway that uses the WAF tier.",
      },
      {
        key: "E",
        text: "•Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines: A network security group (NSG);\n •Protect the web servers from SQL injection attacks: A public load balancer.",
      },
      {
        key: "F",
        text: "•Ensure that communication between the web servers and the business logic tier spreads equally across the virtual machines: A public load balancer;\n •Protect the web servers from SQL injection attacks: An application gateway that uses the Standard tier.",
      },
    ],

    correctAnswers: ["D"],

    explanation: `Requirement 1: Balance traffic between web tier and business logic tier.\n• This is internal traffic (Not from the Internet).\n• Use an internal load balancer to distribute traffic from the web-tier VMs to the business logic VMs.\n\nRequirement 2: Protect web servers from SQL injection.\n• Use Azure Application Gateway with Web Application Firewall (WAF) tier.\n• WAF provides protection against common web attacks such as SQL injection and cross-site scripting.\n\nTherefore:\n• Internal load balancer between web tier and business logic tier.\n• Application Gateway (WAF tier) in front of the web tier for web application protection.\n\nCorrect answer: D.`,

    references: `Azure Web Application Firewall on Azure Application Gateway\nLoad-balancing options in Azure\n],
  },
  {
    id: "Q119",
    number: 119,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: [
      "Manage Azure identities and governance (20-25%)"\n\nYou have an Azure Active Directory (Azure AD) tenant named adatum.com that contains the users shown in the following table:\n\nName  | Role                  \n------------------------------|----------------\nUser1 | None\nUser2 | Global administrator\nUser3 | Cloud device administrator\nUser4 | Intune administrator\n\nAdatum.com has the following configurations:\n• Users may join devices to Azure AD is set to: User1.\n• Additional local administrators on Azure AD joined devices is set to: None.\n\nYou deploy Windows 10 to a computer named Computer1.\nUser1 joins Computer1 to adatum.com (Azure AD join).\n\nWhich users are added to the local Administrators group on Computer1?`,

    options: `{ key: "A"\ntext: "User1 only" }\n{ key: "B"\ntext: "User1, User2, and User3 only" }\n{ key: "C"\ntext: "User1 and User2 only" }\n{ key: "D"\ntext: "User1, User2, User3, and User4" }\n{ key: "E"\ntext: "User2 only" }\n],

    correctAnswers: ["C"],

    explanation: [
      "When a Windows 10 device is Azure AD joined, the following principals are added to the local Administrators group by default:"\n• The user who performs the Azure AD join (device owner) – here: User1.\n• Members of the Azure AD Global administrator role – here: User2.\n• Members of the 'Azure AD joined device local administrator' role (if configured).\n\nThe setting 'Additional local administrators on Azure AD joined devices' is set to None, so No extra users are added.\n\nCloud device administrator and Intune administrator roles do Not automatically grant local admin rights in this scenario.\n\nTherefore, the local Administrators group on Computer1 contains:\n• User1 and User2.\n\nCorrect answer: C.`,

    references: `How to manage the local administrators group on Azure AD joined devices\n],
  },
  {
    id: "Q120",
    number: 120,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: [
      "Monitor and maintain Azure resources (10-15%)"\n\nYou have an Azure subscription that contains an Azure Storage account named storage1 and the users shown in the following table:\n\nName  | Member of\n------------------------------|----------------\nUser1 | Group1\nUser2 | Group2\nUser3 | Group1\n\nYou plan to monitor storage1 and configure email Notifications for the following signals:\n\nName               | Type        | Users to Notify\n---------------------|---------------|------------\nIngress              | Metric      | User1 and User3 only\nEgress               | Metric      | User1 only\nDelete storage account | Activity log | User1 User2, and User3\nRestore blob ranges  | Activity log | User1 and User3 only\n\nYou need to identify the minimum number of alert rules and action groups required for the planned monitoring.\n\nHow many alert rules and action groups should you identify?`,

    options: `{ key: "A"\ntext: ["Alert rules: 1;\n Action groups: 1"` },
      { key: "B", text: "Alert rules: 2;\n Action groups: 2" },
      { key: "C", text: "Alert rules: 2;\n Action groups: 4" },
      { key: "D", text: "Alert rules: 3;\n Action groups: 3" },
      { key: "E", text: "Alert rules: 4;\n Action groups: 3" },
      { key: "F", text: "Alert rules: 4;\n Action groups: 4" },
    ],

    correctAnswers: ["E"],

    explanation: `Alert rules:\n• Metrics and activity log signals canNot be mixed in the same alert rule.\n• You can add multiple metric conditions in one alert rule, but they are ANDed; here, you must monitor each signal independently.\n• Each activity log signal requires its own rule.\n\nSignals:\n1) Ingress (metric)  -> needs its own alert rule.\n2) Egress (metric)   -> needs its own alert rule.\n3) Delete storage account (activity log) -> its own alert rule.\n4) Restore blob ranges (activity log)    -> its own alert rule.\n\n=> Total alert rules: 4.\n\nAction groups:\nEmail recipients:\n• Ingress: User1 and User3.\n• Egress: User1, User2, and User3.\n• Delete storage account: User1 only.\n• Restore blob ranges: User1 and User3.\n\nYou can reuse action groups where the recipient set matches:\n• AG1: User1 and User3 (used by 'Ingress' and 'Restore blob ranges').\n• AG2: User1, User2, and User3 (used by 'Egress').\n• AG3: User1 only (used by 'Delete storage account').\n\n=> Total action groups: 3.\n\nCorrect answer: E.`,

    references: `Overview of alerts in Microsoft Azure\nCreate, view, and manage activity log alerts using Azure Monitor\n],
  },

  {
    id: "Q121",
    number: 121,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com. Multi-factor authentication (MFA) is enabled for all users."\n\nYou need to provide users with the ability to bypass MFA for 10 days on devices to which they have successfully signed in by using MFA.\n\nWhat should you do?\n\nOptions:\nA - From the multi-factor authentication page, configure the users' settings.\nB - From Azure AD, create a conditional access policy.\nC - From the multi-factor authentication page, configure the service settings.\nD - From the MFA blade in Azure AD, configure the MFA Server settings.`,

    options: `{
        key: "A"\ntext: "From the multi-factor authentication page, configure the users' settings."\n}\n{ key: "B"\ntext: "From Azure AD, create a conditional access policy." }\n{
        key: "C"\ntext: "From the multi-factor authentication page, configure the service settings."\n}\n{
        key: "D"\ntext: "From the MFA blade in Azure AD, configure the MFA Server settings."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "The option 'remember multi-factor authentication on trusted devices' is configured in the MFA SERVICE SETTINGS page."\nThere you can set the number of days (1–60) that MFA is remembered for a device (e.g. 10 days).\n\nTherefore, you must configure the multi-factor authentication SERVICE settings, Not user settings or conditional access.`,

    references: ["Configure Azure AD Multi-Factor Authentication settings"],
  },
  {
    id: "Q122",
    number: 122,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure Active Directory tenant named contoso.com that includes the following users:\n\nName   | Role\n-------|-------\nUser1  | Cloud device administrator\nUser2  | User administrator\n\nContoso.com includes the following Windows 10 devices:\n\nName    | Join type\n-------|-------\nDevice1 | Azure AD registered\nDevice2 | Azure AD joined\n\nYou create the following security groups in contoso.com:\n\nName   | Membership type | Owner\n-------|-------|-----------\nGroup1 | Assigned        | User1\nGroup2 | Dynamic Device  | User2\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n`,

    options: `{
        key: "A"\ntext: [
          "User1 can add Device2 to Group1: Yes\n User2 can add Device1 to Group1: Yes\n User2 can add Device2 to Group2: Yes",`,
      },
      {
        key: "B",
        text: "User1 can add Device2 to Group1: Yes\nUser2 can add Device1 to Group1: No\nUser2 can add Device2 to Group2: Yes",
      },
      {
        key: "C",
        text: "User1 can add Device2 to Group1: Yes\nUser2 can add Device1 to Group1: Yes\nUser2 can add Device2 to Group2: No",
      },
      {
        key: "D",
        text: "User1 can add Device2 to Group1: No\nUser2 can add Device1 to Group1: Yes\nUser2 can add Device2 to Group2: No",
      },
      {
        key: "E",
        text: "User1 can add Device2 to Group1: No\nUser2 can add Device1 to Group1: No\nUser2 can add Device2 to Group2: Yes",
      },
      {
        key: "F",
        text: "User1 can add Device2 to Group1: No\nUser2 can add Device1 to Group1: No\nUser2 can add Device2 to Group2: No",
      },
    ],

    correctAnswers: ["C"],

    explanation: `• Group1 is an ASSIGNED group. The owner of a group (User1) can add members, including devices (Device2).\n  Therefore, User1 can add Device2 to Group1 → YES.\n\n• User2 is a User administrator. This role can manage users and devices, and can add them to ASSIGNED groups.\n  Therefore, User2 can add Device1 to Group1 → YES.\n\n• Group2 is a DYNAMIC DEVICE group. Its membership is defined by a dynamic rule based on device properties.\n  Neither ownership Nor the User administrator role allows manually adding members to a dynamic device group.\n  Therefore, User2 canNot add Device2 to Group2 → No.\n\nSo the correct combination is: YES / YES / No.`,

    references: `Azure AD roles: Cloud device administrator, User administrator\nDynamic group membership rules for devices\n],
  },
  {
    id: "Q123",
    number: 123,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: [
      "You have a sync group that has the endpoints shown in the following table:"\n\nName      | Type\n-------|------\nEndpoint1 | Cloud endpoint\nEndpoint2 | Server endpoint\nEndpoint3 | Server endpoint (Cloud tiering enabled)\n\nYou add a file named File1 to Endpoint1 and a file named File2 to Endpoint2.\n\nYou need to identify on which endpoints File1 and File2 will be available after 24 hours.\n`,

    options: `{
        key: "A"\ntext: ["File1: Endpoint1 only;\n File2: Endpoint3 only"`,
      },
      {
        key: "B",
        text: "File1: Endpoint2 and Endpoint3 only;\n File2: Endpoint2 and Endpoint3 only",
      },
      { key: "C", text: "File1: Endpoint3 only;\n File2: Endpoint3 only" },
      {
        key: "D",
        text: "File1: Endpoint1, Endpoint2, and Endpoint3;\n File2: Endpoint1, Endpoint2, and Endpoint3",
      },
      {
        key: "E",
        text: "File1: Endpoint3 only;\n File2: Endpoint1, Endpoint2, and Endpoint3",
      },
      {
        key: "F",
        text: "File1: Endpoint1, Endpoint2, and Endpoint3;\n File2: Endpoint3 only",
      },
    ],

    correctAnswers: ["D"],

    explanation: `Azure File Sync syncs files across all server endpoints and the cloud endpoint within the sync group.\n\n• File1 is written to the cloud endpoint (Endpoint1) and will be synced to server endpoints Endpoint2 and Endpoint3.\n• File2 is written to server endpoint Endpoint2 and will be synced to the cloud endpoint (Endpoint1) and Endpoint3.\n\nBecause cloud tiering is enabled on Endpoint3, the file data might be tiered (reparse point only), but logically the files are AVAILABLE on all three endpoints.\n\nSo after 24 hours:\n• File1 is available on Endpoint1, Endpoint2, and Endpoint3.\n• File2 is available on Endpoint1, Endpoint2, and Endpoint3.`,

    references: ["Azure File Sync: Cloud tiering overview"],
  },
  {
    id: "Q124",
    number: 124,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `Your network contains an on-premises Active Directory domain named adatum.com.\nThe domain contains an organizational unit (OU) named OU1. OU1 contains the objects shown in the following table:\n\nName      | Type    | Member of\n---|--|--\nUser1     | User    | Group1\nGroup1    | Global security group      | None\nGroup2    | Universal distribution group| None\nComputer1 | Computer| Group1\n\nYou sync OU1 to Azure Active Directory (Azure AD) by using Azure AD Connect.\nYou need to identify which objects are synced to Azure AD.\n\nWhich objects should you identify?\n`,

    options: `{ key: "A"\ntext: "User1 and Group1 only" }\n{ key: "B"\ntext: "User1, Group1, and Group2 only" }\n{ key: "C"\ntext: "User1, Group1, Group2, and Computer1" }\n{ key: "D"\ntext: "Computer1 only" }\n{ key: "E"\ntext: "User1, Group1, and Computer1 only" }\n],

    correctAnswers: ["E"],

    explanation: [
      "Azure AD Connect synchronizes:"\n• Users\n• Computers\n• Security groups (Global and Universal)\n\nDistribution groups are NoT synchronized.\nGroup2 is a UNIVERSAL DISTRIBUTION group, so it is Not synced.\n\nTherefore, the synced objects are User1, Group1 (global security group), and Computer1.`,

    references: ["Azure AD Connect sync: object and attribute inclusion"],
  },
  {
    id: "Q125",
    number: 125,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You plan to deploy five virtual machines to an Azure virtual network subnet.\nEach virtual machine will have a public IP address and a private IP address.\nEach virtual machine requires the same inbound and outbound security rules.\n\nWhat is the MINIMUM number of network interfaces and network security groups that you require?\n\nAnswer Area:\n• Minimum number of network interfaces: 5 | 10 | 15 | 20\n• Minimum number of network security groups: 1 | 5 | 10`,

    options: `{
        key: "A"\ntext: ["Network interfaces: 5;\n Network security groups: 1"].join(
          "\n"
        )\n}\n{ key: "B"\ntext: "Network interfaces: 5;\n Network security groups: 5" }\n{
        key: "C"\ntext: "Network interfaces: 10;\n Network security groups: 2"\n}\n{
        key: "D"\ntext: "Network interfaces: 10;\n Network security groups: 10"\n}\n{
        key: "E"\ntext: "Network interfaces: 15;\n Network security groups: 2"\n}\n{
        key: "F"\ntext: "Network interfaces: 20;\n Network security groups: 10"\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "• Each VM needs at least one NIC → 5 VMs → 5 NICs minimum."\n• All VMs require the same NSG rules. One NSG can be associated with the SUBNET that hosts all VMs.\n  Then all VMs in that subnet will share the same NSG rules.\n\nTherefore: 5 NICs and 1 NSG is the minimum.`,

    references: `Assign multiple IP addresses to virtual machines using the Azure portal\nNetwork security groups (NSGs) and subnet association\n],
  },
  {
    id: "Q126",
    number: 126,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You manage two Azure subscriptions named Subscription1 and Subscription2."\n\nSubscription1 has the following virtual networks:\n\nName  | Address space  | Location\n---|--|--\nVNet1 | 10.10.10.0/24  | West Europe\nVNet2 | 172.16.0.0/16  | West US\n\nThe virtual networks contain the following subnets:\n\nName    | Address space   | Virtual network\n---|--|--\nSubnet11| 10.10.10.0/24   | VNet1\nSubnet21| 172.16.0.0/18   | VNet2\nSubnet22| 172.16.128.0/18 | VNet2\n\nSubscription2 contains the following virtual network:\n\nName  | Address space   | Location\n---|--|--\nVNetA | 10.10.128.0/17  | Canada Central\n\nVNetA contains the following subnets:\n\nName    | Address space\n---|--\nSubnetA1| 10.10.130.0/24\nSubnetA2| 10.10.131.0/24\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\nStatements:\n1. A Site-to-Site connection can be established between VNet1 and VNet2.\n2. VNet1 and VNet2 can be peered.\n3. VNet1 and VNetA can be peered.`,

    options: `{
        key: "A"\ntext: [
          "A Site-to-Site connection can be established between VNet1 and VNet2: Yes\nVNet1 and VNet2 can be peered: Yes\nVNet1 and VNetA can be peered: Yes",`,
      },
      {
        key: "B",
        text: "A Site-to-Site connection can be established between VNet1 and VNet2: Yes\nVNet1 and VNet2 can be peered: Yes\nVNet1 and VNetA can be peered: No",
      },
      {
        key: "C",
        text: "A Site-to-Site connection can be established between VNet1 and VNet2: Yes\nVNet1 and VNet2 can be peered: No\nVNet1 and VNetA can be peered: No",
      },
      {
        key: "D",
        text: "A Site-to-Site connection can be established between VNet1 and VNet2: No\nVNet1 and VNet2 can be peered: Yes\nVNet1 and VNetA can be peered: Yes",
      },
      {
        key: "E",
        text: "A Site-to-Site connection can be established between VNet1 and VNet2: No\nVNet1 and VNet2 can be peered: Yes\nVNet1 and VNetA can be peered: No",
      },
      {
        key: "F",
        text: "A Site-to-Site connection can be established between VNet1 and VNet2: No\nVNet1 and VNet2 can be peered: No\nVNet1 and VNetA can be peered: No",
      },
    ],

    correctAnswers: ["D"],

    explanation: `1) Site-to-Site connection VNet1 ↔ VNet2:\n   Requires a VPN gateway in each VNet. A gateway subnet is required. VNet1's address space 10.10.10.0/24 is fully used by Subnet11,\n   so No additional subnet (GatewaySubnet) can be created → No Site-to-Site VPN possible with current layout.\n\n2) VNet peering VNet1 ↔ VNet2:\n   Address spaces 10.10.10.0/24 and 172.16.0.0/16 do Not overlap, and global peering across regions is supported → YES.\n\n3) VNet peering VNet1 ↔ VNetA:\n   10.10.10.0/24 (VNet1) does Not overlap with 10.10.128.0/17 (VNetA) → YES. Cross-subscription, cross-region peering is allowed.\n\nThus: No / YES / YES.`,

    references: `Create a virtual network peering – different subscriptions and regions\nTutorial: Create a Site-to-Site connection in the Azure portal\n],
  },
  {
    id: "Q127",
    number: 127,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1 that contains the resources shown in the following table:"\n\nName   | Type                 | Location   | Resource group\n-|-|-|-\nRG1    | Resource group       | West US    | -\nRG2    | Resource group       | West US    | -\nVault1 | Recovery Services vault | Central US | RG1\nVault2 | Recovery Services vault | West US    | RG2\nVM1    | Virtual machine      | Central US | RG2\nstorage1 | Storage account    | West US    | RG1\nSQL1   | Azure SQL database   | East US    | RG2\n\nIn storage1, you create a blob container named blob1 and a file share named share1.\n\nWhich resources can be backed up to Vault1 and Vault2?`,

    options: `{
        key: "A"\ntext: [
          "Can use Vault1 for backups: VM1 only\n Can use Vault2 for backups: share1 only",`,
      },
      {
        key: "B",
        text: "Can use Vault1 for backups: VM1 and share1 only\n Can use Vault2 for backups: storage1 only",
      },
      {
        key: "C",
        text: "Can use Vault1 for backups: VM1 and share1 only\n Can use Vault2 for backups: blob1 and share1 only",
      },
      {
        key: "D",
        text: "Can use Vault1 for backups: VM1 and SQL1 only\n Can use Vault2 for backups: VM1 and share1 only",
      },
      {
        key: "E",
        text: "Can use Vault1 for backups: VM1, storage1, and SQL1 only\n Can use Vault2 for backups: storage1 and SQL1 only",
      },
      {
        key: "F",
        text: "Can use Vault1 for backups: VM1, blob1, share1, and SQL1\n Can use Vault2 for backups: blob1 and share1 only",
      },
    ],

    correctAnswers: ["A"],

    explanation: `A Recovery Services vault can protect Azure resources only if they are in the SAME region as the vault.\n\nVault1 (Central US) can back up Central US resources:\n• VM1 is in Central US → can be protected by Vault1.\n• storage1 (West US) and SQL1 (East US) are in different regions → canNot be protected by Vault1.\n\nVault2 (West US) can back up West US resources:\n• storage1 is in West US. Azure Backup supports file-share backup within a storage account.\n  In the answer options, this is represented by 'share1 only'. VM1 and SQL1 are in other regions.\n\nThus: Vault1 → VM1 only; Vault2 → share1 only.`,

    references: `Back up Azure virtual machines to a Recovery Services vault\nBack up Azure file shares\n],
  },
  {
    id: "Q128",
    number: 128,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "You have a Microsoft Entra ID tenant named contoso.onmicrosoft.com that contains 100 user accounts."\nYou purchase 10 Microsoft Entra ID P2 licenses for the tenant.\n\nYou need to ensure that 10 users can use all the Microsoft Entra ID Premium features.\nWhat should you do?\n\nOptions:\nA - From the Microsoft 365 admin center assign a license to each of the 10 users.\nB - From the Microsoft Entra admin center, assign a license to a group.\nC - From the Microsoft Azure portal, add an enterprise application.\nD - From the Microsoft Entra admin center, assign a role to each of the 10 users.`,

    options: `{
        key: "A"\ntext: "From the Microsoft 365 admin center assign a license to each of the 10 users."\n}\n{
        key: "B"\ntext: "From the Microsoft Entra admin center, assign a license to a group."\n}\n{
        key: "C"\ntext: "From the Microsoft Azure portal, add an enterprise application."\n}\n{
        key: "D"\ntext: "From the Microsoft Entra admin center, assign a role to each of the 10 users."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Premium features are unlocked per user based on license assignment, Not based on roles."\nFor 10 P2 licenses, you must assign those licenses to exactly 10 users.\n\nThe current recommended UI for per-user license management is the Microsoft 365 admin center.\nSo you assign the Entra ID P2 licenses to the 10 selected users there.`,

    references: `Microsoft Entra licensing\nAssign or unassign licenses for users in the Microsoft 365 admin center\n],
  },
  {
    id: "Q129",
    number: 129,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You have five Azure virtual machines that run Windows Server 2019. The virtual machines are configured as web servers."\nYou have an Azure load balancer named LB1 that provides load balancing services for the virtual machines.\n\nYou need to ensure that visitors are serviced by the same web server for each request (session stickiness).\n\nWhat should you configure?\n\nOptions:\nA - Floating IP (direct server return) to Enabled\nB - Idle Time-out (minutes) to 20\nC - Protocol to UDP\nD - Session persistence to Client IP and protocol`,

    options: `{ key: "A"\ntext: "Floating IP (direct server return) to Enabled" }\n{ key: "B"\ntext: "Idle Time-out (minutes) to 20" }\n{ key: "C"\ntext: "Protocol to UDP" }\n{ key: "D"\ntext: "Session persistence to Client IP and protocol" }\n],

    correctAnswers: ["D"],

    explanation: [
      "Azure Load Balancer supports source IP affinity (session persistence)."\nSetting session persistence to 'Client IP and protocol' ensures that requests from the same client IP and protocol go to the same backend VM.\n\nFloating IP and idle timeout do Not provide session stickiness, and changing protocol to UDP is unrelated to HTTP web traffic.`,

    references: `Azure Load Balancer distribution modes and session persistence\n],
  },
  {
    id: "Q130",
    number: 130,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You are an administrator for a company. You have the Azure virtual machines shown in the following table:"\n\nName | Azure region\n-|-\nVM1  | West Europe\nVM2  | West Europe\nVM3  | North Europe\nVM4  | North Europe\n\nYou have a Recovery Services vault that protects VM1 and VM2.\nYou need to protect VM3 and VM4 by using Recovery Services.\n\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "Create a new Recovery Services vault." }\n{ key: "B"\ntext: "Create a storage account." }\n{ key: "C"\ntext: "Configure the extensions for VM3 and VM4." }\n{ key: "D"\ntext: "Create a new backup policy." }\n],

    correctAnswers: ["A"],

    explanation: [
      "A Recovery Services vault can protect VMs only in the same Azure region."\nThe existing vault is in West Europe (protecting VM1 and VM2).\nVM3 and VM4 are in North Europe, so you must first create a new Recovery Services vault in North Europe.\nAfter that, you can configure backup (extensions and policy) for VM3 and VM4.`,

    references: ["Back up Azure virtual machines to a Recovery Services vault"],
  },
  {
    id: "Q131",
    number: 131,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains an Azure Active Directory (Azure AD) tenant named contoso.com and an Azure Kubernetes Service (AKS) cluster named AKS1.\n\nAn administrator reports that she is unable to grant access to AKS1 to the users in contoso.com.\n\nYou need to ensure that access to AKS1 can be granted to the contoso.com users.\n\nWhat should you do first?\n\nOptions:\nA - From contoso.com, modify the Organization relationships settings.\nB - From contoso.com, create an OAuth 2.0 authorization endpoint.\nC - Recreate AKS1.\nD - From AKS1, create a namespace.`,

    options: `{
        key: "A"\ntext: "From contoso.com, modify the Organization relationships settings."\n}\n{
        key: "B"\ntext: "From contoso.com, create an OAuth 2.0 authorization endpoint."\n}\n{ key: "C"\ntext: "Recreate AKS1." }\n{ key: "D"\ntext: "From AKS1, create a namespace." }\n],

    correctAnswers: ["B"],

    explanation: [
      "AKS does Not manage user identities internally. To allow Azure AD users to authenticate against the AKS API server, Azure AD integration must be enabled."\n\nAKS requires OpenID Connect (OIDC) integration with Azure AD, which is based on OAuth 2.0.\n\nCreating the OAuth 2.0 authorization endpoint provides the required identity provider configuration for AKS authentication.\n\nOnce configured, users can authenticate to AKS (kubectl login) using their Azure AD credentials.`,

    references: `Access and identity options for Azure Kubernetes Service (AKS)\nIntegrate Azure Active Directory with Azure Kubernetes Service using the Azure CLI\n],
  },
  {
    id: "Q132",
    number: 132,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription named Subscription1. You deploy a Linux virtual machine named VM1 to Subscription1."\n\nYou need to monitor the metrics and the logs of VM1.\n\nWhat should you use?\n\nOptions:\nA - Azure HDInsight\nB - The Linux DiagNostic Extension (LAD) 3.0\nC - The Azure Performance DiagNostics extension\nD - Azure Analysis Services`,

    options: `{ key: "A"\ntext: "Azure HDInsight" }\n{ key: "B"\ntext: "The Linux DiagNostic Extension (LAD) 3.0" }\n{ key: "C"\ntext: "The Azure Performance DiagNostics extension" }\n{ key: "D"\ntext: "Azure Analysis Services" }\n],

    correctAnswers: ["B"],

    explanation: [
      "The Linux DiagNostic Extension (LAD) 3.0 is designed specifically to collect performance metrics, syslog events, and log files from Linux VMs in Azure."\n\nIt supports uploading logs to storage accounts and Event Hubs and integrates cleanly with Azure Monitor.\n\nAzure HDInsight and Analysis Services are irrelevant, and Performance DiagNostics is for troubleshooting, Not continuous monitoring.`,

    references: ["Use Linux DiagNostic Extension to monitor metrics and logs"],
  },
  {
    id: "Q133",
    number: 133,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have an Azure virtual machine named VM1 that runs Windows Server 2019.\nYou save VM1 as a template named Template1 to the Azure Resource Manager library.\n\nYou plan to deploy a virtual machine named VM2 from Template1.\n\nWhat can you configure during the deployment of VM2?\n(Choose all that apply.)\n\nOptions:\nA - Operating system\nB - Administrator username\nC - Virtual machine size\nD - Resource group`,

    options: `{ key: "A"\ntext: "Operating system" }\n{ key: "B"\ntext: "Administrator username" }\n{ key: "C"\ntext: "Virtual machine size" }\n{ key: "D"\ntext: "Resource group" }\n],

    correctAnswers: ["B"\nC\nD"],

    explanation: [
      "When deploying a VM from an ARM template, the following can be configured:\n• VM size\n• Admin username/password\n• Resource group\n• Networking\n• DiagNostics\n• Storage type\n\nYou canNot change the OS captured in the template image.\n\nTherefore: B, C, and D can be configured.`,

    references: `Create a Windows virtual machine from a Resource Manager template\n],
  },
  {
    id: "Q134",
    number: 134,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription that contains an Azure virtual machine named VM1."\nVM1 runs a financial reporting app named App1 that does Not support multiple active instances.\n\nAt the end of each month, CPU usage for VM1 peaks when App1 runs.\n\nYou need to create a scheduled runbook to increase the processor performance of VM1 at the end of each month.\n\nWhat task should you include in the runbook?\n\nOptions:\nA - Add the Azure Performance DiagNostics agent to VM1.\nB - Modify the VM size property of VM1.\nC - Add VM1 to a scale set.\nD - Increase the vCPU quota for the subscription.\nE - Add a Desired State Configuration (DSC) extension to VM1.`,

    options: `{ key: "A"\ntext: "Add the Azure Performance DiagNostics agent to VM1." }\n{ key: "B"\ntext: "Modify the VM size property of VM1." }\n{ key: "C"\ntext: "Add VM1 to a scale set." }\n{ key: "D"\ntext: "Increase the vCPU quota for the subscription." }\n{
        key: "E"\ntext: "Add a Desired State Configuration (DSC) extension to VM1."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "App1 does Not support multiple active instances, so scaling out is Not an option."\n\nThe only way to increase performance is to resize the VM to a larger SKU (more vCPU or more CPU performance).\n\nResizing a VM does Not require downtime unless moving between VM families.\n\nTherefore, the runbook should modify the VM size.`,
  },
  {
    id: "Q135",
    number: 135,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains 10 virtual networks. The virtual networks are hosted in separate resource groups.\n\nANother administrator plans to create several network security groups (NSGs) in the subscription.\n\nYou need to ensure that when an NSG is created, it automatically blocks TCP port 8080 between the virtual networks.\n\nSolution: You configure a custom policy definition, and then you assign the policy to the subscription.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure Policy can enforce configuration requirements when resources are created."\n\nA custom policy definition can require that newly created NSGs contain a rule blocking TCP 8080.\n\nAssigning the policy to the subscription ensures the rule is enforced across all resource groups.\n\nTherefore, the solution meets the goal.`,

    references: ["Azure Policy definition structure", "Azure Policy Samples"],
  },
  {
    id: "Q136",
    number: 136,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains 10 virtual networks. The virtual networks are hosted in separate resource groups.\n\nANother administrator plans to create several network security groups (NSGs) in the subscription.\n\nYou need to ensure that when an NSG is created, it automatically blocks TCP port 8080 between the virtual networks.\n\nSolution: From the Resource providers blade, you unregister the Microsoft.ClassicNetwork provider.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Unregistering Microsoft.ClassicNetwork only blocks creation of classic (ASM) networking resources."\n\nIt does NoT enforce NSG configuration.\n\nTherefore, the solution does NoT meet the goal.`,

    references: ["Azure Policy definition structure", "Azure Policy Samples"],
  },
  {
    id: "Q137",
    number: 137,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains 10 virtual networks. The virtual networks are hosted in separate resource groups.\n\nANother administrator plans to create several network security groups (NSGs) in the subscription.\n\nYou need to ensure that when an NSG is created, it automatically blocks TCP port 8080 between the virtual networks.\n\nSolution: You assign a built-in policy definition to the subscription.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "There is No built-in Azure Policy that enforces NSG rules for port 8080."\n\nA custom policy is required.\n\nTherefore, the solution does NoT meet the goal.`,

    references: ["Azure Policy Samples"],
  },
  {
    id: "Q138",
    number: 138,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains 10 virtual networks. The virtual networks are hosted in separate resource groups.\n\nANother administrator plans to create several network security groups (NSGs) in the subscription.\n\nYou need to ensure that when an NSG is created, it automatically blocks TCP port 8080 between the virtual networks.\n\nSolution: You create a resource lock, and then you assign the lock to the subscription.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "A resource lock prevents deletion or modification of resources."\n\nIt canNot enforce NSG configuration or network rules.\n\nTherefore, the solution does NoT meet the goal.`,

    references: ["Resource locks in Azure", "Azure Policy governance"],
  },
  {
    id: "Q139",
    number: 139,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have two Azure virtual networks named VNet1 and VNet2.\nVNet1 contains VM1, VNet2 contains VM2.\n\nVM1 hosts a frontend application that connects to VM2 to retrieve data.\n\nUsers report that the frontend application is slower than usual.\n\nYou need to view the average round-trip time (RTT) of the packets from VM1 to VM2.\n\nWhich Azure Network Watcher feature should you use?\n\nOptions:\nA - IP flow verify\nB - Connection troubleshoot\nC - Connection monitor\nD - NSG flow logs`,

    options: `{ key: "A"\ntext: "IP flow verify" }\n{ key: "B"\ntext: "Connection troubleshoot" }\n{ key: "C"\ntext: "Connection monitor" }\n{ key: "D"\ntext: "NSG flow logs" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Connection Monitor provides continuous monitoring of connectivity between endpoints and reports RTT (round-trip time) measurements per minute."\n\nConnection Troubleshoot only tests connectivity once.\nIP Flow Verify checks NSG allow/deny rules.\nNSG flow logs record 5-tuple traffic metadata, Not RTT.\n\nTherefore: Connection Monitor.`,

    references: `Tutorial: Monitor network communication between two virtual machines using the Azure portal\nAzure Network Watcher Connection Monitor\n],
  },
  {
    id: "Q140",
    number: 140,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription that has a Recovery Services vault named Vault1."\n\nThe subscription contains the following virtual machines:\n\nName | Operating system | Auto-shutdown\n-|-|-\nVM1  | Windows Server 2012 R2 | Off\nVM2  | Windows Server 2016    | 19:00\nVM3  | Ubuntu Server 18.04 LTS| Off\nVM4  | Windows 10             | 19:00\n\nYou plan to schedule backups to occur every night at 23:00.\n\nWhich virtual machines can you back up by using Azure Backup?`,

    options: `{ key: "A"\ntext: "VM1 and VM3 only" }\n{ key: "B"\ntext: "VM1, VM2, VM3, and VM4" }\n{ key: "C"\ntext: "VM1 and VM2 only" }\n{ key: "D"\ntext: "VM1 only" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure Backup supports:"\n• All supported Windows Server versions\n• Windows client OS\n• Supported Linux distributions, including Ubuntu Server\n\nBackup does Not depend on auto-shutdown state.\n\nTherefore, all four VMs can be backed up.`,

    references: `Support matrix for Azure VM backup\nEndorsed Linux distributions on Azure\n],
  },
  {
    id: "Q141",
    number: 141,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: [
      "You plan to deploy three Azure virtual machines named VM1, VM2, and VM3. The virtual machines will host a web app named App1."\n\nYou need to ensure that at least two virtual machines are available if a single Azure datacenter becomes unavailable.\n\nWhat should you deploy?\n\nOptions:\nA - All three virtual machines in a single Availability Zone.\nB - All virtual machines in a single Availability Set.\nC - Each virtual machine in a separate Availability Zone.\nD - Each virtual machine in a separate Availability Set.`,

    options: `{
        key: "A"\ntext: "All three virtual machines in a single Availability Zone."\n}\n{ key: "B"\ntext: "All virtual machines in a single Availability Set." }\n{
        key: "C"\ntext: "Each virtual machine in a separate Availability Zone."\n}\n{
        key: "D"\ntext: "Each virtual machine in a separate Availability Set."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Availability Zones provide the highest SLA (99.99%) by placing VMs in physically separate datacenters within the same region."\nIf one datacenter fails, the zone where the other VMs run remains available.\n\nTo ensure at least two VMs survive a single datacenter failure, you distribute the three VMs across *three* different Availability Zones.\n\nAvailability Sets protect only inside a single datacenter (fault and update domains), Not against a datacenter outage.`,
  },
  {
    id: "Q142",
    number: 142,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription named AZPT1 that contains the resources shown in the following table:\n\nName       | Type\n---------- | -----------------------------------------------\nstorage1   | Azure Storage account\nVNet1      | Virtual network\nVM1        | Azure virtual machine\nVM1Managed | Managed Disk for VM1\nRVault1    | Recovery Services vault for site recovery of VM1\n\nYou create a new Azure subscription named AZPT2.\nYou need to identify which resources can be moved to AZPT2.\n\nWhich resources should you identify?`,

    options: `{ key: "A"\ntext: "VM1, storage1, VNet1, and VM1Managed only" }\n{ key: "B"\ntext: "VM1 and VM1Managed only" }\n{ key: "C"\ntext: "VM1, storage1, VNet1, VM1Managed, and RVault1" }\n{ key: "D"\ntext: "RVault1 only" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Most Azure resource types, including:"\n• Virtual machines\n• Managed disks\n• Storage accounts\n• Virtual networks\n• Recovery Services vaults\ncan be moved between subscriptions as long as they are in the same tenant and region constraints are met.\n\nIn this scenario, all listed resources can be moved to the new subscription AZPT2.\nThe move operation locks the source and target resource groups, but the resources continue to run.`,

    references: ["Move resources to a new resource group or subscription"],
  },
  {
    id: "Q143",
    number: 143,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You recently created a new Azure subscription that contains a user named Admin1.\nAdmin1 attempts to deploy an Azure Marketplace resource by using an Azure Resource Manager template.\n\nAdmin1 deploys the template by using Azure PowerShell and receives the following error message:\nFailure sending request: StatusCode=400 -- Original Error: Code="ResourcePurchaseValidationFailed"\nMessage=\"User failed validation to purchase resources. Error message: 'Legal terms have Not been accepted for this item on this subscription.'\"\n\nYou need to ensure that Admin1 can deploy the Marketplace resource successfully.\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From Azure PowerShell, run the Set-AzApiManagementSubscription cmdlet."\n}\n{
        key: "B"\ntext: "From the Azure portal, register the Microsoft.Marketplace resource provider."\n}\n{
        key: "C"\ntext: "From Azure PowerShell, run the Set-AzMarketplaceTerms cmdlet."\n}\n{
        key: "D"\ntext: "From the Azure portal, assign the Billing administrator role to Admin1."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "For some Azure Marketplace offers, the legal terms must be accepted for the subscription before deployment through automation (ARM/PowerShell/CLI)."\n\nWhen deploying in the portal, you accept these terms in the UI.\nWhen deploying via PowerShell, you must explicitly accept them using Set-AzMarketplaceTerms.\n\nTherefore, Admin1 needs to run Set-AzMarketplaceTerms for that specific Marketplace item.`,

    references: ["Set-AzMarketplaceTerms"],
  },
  {
    id: "Q144",
    number: 144,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains a policy-based virtual network gateway named GW1 and a virtual network named VNet1.\n\nYou need to ensure that you can configure a point-to-site (P2S) connection from VNet1 to an on-premises computer.\n\nWhich two actions should you perform?\n(Each correct answer presents part of the solution. Each correct selection is worth one point.)`,

    options: `{ key: "A"\ntext: "Add a service endpoint to VNet1." }\n{ key: "B"\ntext: "Reset GW1." }\n{ key: "C"\ntext: "Create a route-based virtual network gateway." }\n{ key: "D"\ntext: "Add a connection to GW1." }\n{ key: "E"\ntext: "Delete GW1." }\n{ key: "F"\ntext: "Add a public IP address space to VNet1." }\n],

    correctAnswers: ["C"\nE"],

    explanation: [
      "Point-to-site VPN requires a *route-based* virtual network gateway.\nPolicy-based gateways support only IKEv1 and are Not supported for P2S.\n\nYou canNot change the type (policy-based vs route-based) of an existing gateway.\nYou must:\n1. Delete GW1 (policy-based).\n2. Create a new route-based virtual network gateway.\n\nService endpoints and additional address spaces are unrelated to enabling P2S.`,

    references: `Configure a Point-to-Site connection to a VNet using native Azure certificate authentication: Azure portal\n],
  },
  {
    id: "Q145",
    number: 145,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: [
      "Your on-premises network contains an SMB share named Share1."\n\nYou have an Azure subscription that contains the following resources:\n• A web app named WebApp1\n• A virtual network named VNet1\n\nYou need to ensure that WebApp1 can connect to Share1.\nWhat should you deploy?`,

    options: `{ key: "A"\ntext: "An Azure Application Gateway." }\n{
        key: "B"\ntext: "An Azure Active Directory (Azure AD) Application Proxy."\n}\n{ key: "C"\ntext: "An Azure Virtual Network Gateway." }\n{ key: "D"\ntext: "An Azure file share." }\n],

    correctAnswers: ["C"],

    explanation: [
      "To allow an Azure resource (WebApp1) to access an on-prem SMB share, you need private connectivity between Azure and on-premises."\n\nThis is achieved via:\n• Site-to-Site VPN (VPN type gateway) or\n• ExpressRoute (ExpressRoute type gateway).\n\nBoth scenarios require a Virtual Network Gateway in Azure.\nApplication Gateway and AAD App Proxy are HTTP/HTTPS reverse proxies and do Not expose SMB shares.\nCreating a new Azure file share does Not connect to the existing on-premises Share1.`,

    references: ["Create a Site-to-Site connection in the Azure portal"],
  },
  {
    id: "Q146",
    number: 146,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You plan to deploy several Azure virtual machines that will run Windows Server 2019 in a virtual machine scale set by using an Azure Resource Manager template.\n\nYou need to ensure that NGINX is available on all the virtual machines after they are deployed.\nWhat should you use?`,

    options: `{ key: "A"\ntext: "Azure Active Directory (Azure AD) Application Proxy" }\n{ key: "B"\ntext: "Azure Application Insights" }\n{ key: "C"\ntext: "Azure Custom Script Extension" }\n{ key: "D"\ntext: "The New-AzConfigurationAssignment cmdlet" }\n],

    correctAnswers: ["C"],

    explanation: [
      "To automatically install and configure software on VMs in a scale set during deployment, you use extensions."\n\nThe Azure Custom Script Extension can run scripts (e.g. PowerShell, Bash) on the VM to:\n• Download and install NGINX\n• Configure NGINX\n\nAAD App Proxy and App Insights are unrelated.\nNew-AzConfigurationAssignment is related to Azure Policy / guest configuration, Not the typical way for NGINX installation in this scenario.`,
  },
  {
    id: "Q147",
    number: 147,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You have an Azure web app named WebApp1.\nUsers report that they often experience HTTP 500 errors when they connect to WebApp1.\n\nYou need to provide the developers of WebApp1 with real-time access to the connection errors.\nThe solution must provide all the connection error details.\n\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "From WebApp1, enable Web server logging." }\n{ key: "B"\ntext: "From Azure Monitor, create a workbook." }\n{ key: "C"\ntext: "From Azure Monitor, create a Service Health alert." }\n{ key: "D"\ntext: "From WebApp1, turn on Application Logging." }\n],

    correctAnswers: ["A"],

    explanation: [
      "HTTP 500 is generated by the web server (IIS) when it encounters an internal error."\n\nTo capture detailed connection and HTTP error information for an App Service web app, you must enable:\n• Web server logging (can log to file system or storage),\n• Optionally detailed error messages and failed request tracing.\n\nApplication Logging focuses on application-level logs (e.g., traces, custom logging), Not necessarily all HTTP-level connection errors.\nWorkbooks and Service Health alerts are consumers of logs, Not the initial step to capture HTTP 500 details.`,

    references: ["Enable diagNostics logging for apps in Azure App Service"],
  },
  {
    id: "Q148",
    number: 148,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `You have an Azure Active Directory (Azure AD) tenant that contains 5,000 user accounts.\nYou create a new user account named AdminUser1.\n\nYou need to assign the User administrator administrative role to AdminUser1.\nWhat should you do from the user account properties?`,

    options: `{ key: "A"\ntext: "From the Licenses blade, assign a new license." }\n{
        key: "B"\ntext: "From the Assigned roles blade, modify the directory role."\n}\n{
        key: "C"\ntext: "From the Groups blade, invite the user account to a new group."\n}\n{
        key: "D"\ntext: "From the Azure role assignments blade, add an assignment."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure AD directory roles (like User administrator, Global administrator, etc.) are assigned:"\n• In the Azure AD admin center, on the user's *Assigned roles* blade.\n\nLicenses do Not grant admin permissions.\nGroups can be used with Azure AD PIM or role-assignable groups, but the question explicitly asks for the direct method from user properties.\nAzure role assignments are for Azure RBAC (subscriptions, resource groups), Not for Azure AD directory roles.`,

    references: `Assign administrator and Non-administrator roles to users with Azure Active Directory\n],
  },
  {
    id: "Q149",
    number: 149,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1 that contains the storage accounts shown in the following table:"\n\nName     | Account kind | Azure service that contains data\n-------- | ------------ | --------------------------------\nstorage1 | Storage      | File, Table, Queue\nstorage2 | StorageV2    | Storage V2 (general purpose v2)\nstorage3 | StorageV2    | Storage V2 (general purpose v2)\nstorage4 | BlobStorage  | Blob\n\nYou plan to use the Azure Import/Export service to export data from Subscription1.\nYou need to identify which storage account can be used to export the data.\nWhat should you identify?`,

    options: `{ key: "A"\ntext: "storage1" }\n{ key: "B"\ntext: "storage2" }\n{ key: "C"\ntext: "storage3" }\n{ key: "D"\ntext: "storage4" }\n],

    correctAnswers: ["D"],

    explanation: [
      "According to the given solution, for *export* jobs Azure Import/Export supports Azure Blob storage (block, page, append blobs)."\n\nIn the table, storage4 is the BlobStorage account that contains blob data.\n\nTherefore, storage4 is selected as the storage account that can be used for the export job.\n\nNote: In Microsoft’s official documentation, export is supported for Blob storage; the question’s table maps that to storage4.`,

    references: ["Azure Import/Export system requirements"],
  },
  {
    id: "Q150",
    number: 150,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: `You have an Azure Storage account named storage1.\nYou plan to use AzCopy to copy data to storage1.\n\nYou need to identify the storage services in storage1 to which you can copy the data.\nWhat should you identify?`,

    options: `{ key: "A"\ntext: "Blob, file, table, and queue" }\n{ key: "B"\ntext: "Blob and file only" }\n{ key: "C"\ntext: "File and table only" }\n{ key: "D"\ntext: "File only" }\n{ key: "E"\ntext: "Blob, table, and queue only" }\n],

    correctAnswers: ["B"],

    explanation: [
      "AzCopy is a command-line tool designed to copy data to and from:"\n• Azure Blob storage\n• Azure Files\n\nIt does NoT support direct copy to Table or Queue storage.\n\nTherefore, you can copy data only to Blob and File services in the storage account.`,

    references: ["Get started with AzCopy"],
  },

  {
    id: "Q151",
    number: 151,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains an Azure Storage account.\nYou plan to create an Azure container instance named container1 that will use a Docker image named Image1.\nImage1 contains a Microsoft SQL Server instance that requires persistent storage.\n\nYou need to configure a storage service for container1.\n\nWhat should you use?`,

    options: `{ key: "A"\ntext: "Azure Files" }\n{ key: "B"\ntext: "Azure Blob storage" }\n{ key: "C"\ntext: "Azure Queue storage" }\n{ key: "D"\ntext: "Azure Table storage" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure Container Instances are stateless by default. To persist state, you must mount an external volume."\nOnly Azure Files supports SMB-based mounted volumes needed by workloads like SQL Server inside containers.\n\nAzure Blobs, Queues, and Tables canNot be mounted as persistent volumes.\n\nTherefore: Use Azure Files.`,
  },
  {
    id: "Q152",
    number: 152,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1 that contains:\n\nName        | Type\n----------- | ---------------------\nstorage1    | Storage account\nRG1         | Resource group\ncontainer1  | Blob container\nshare1      | File share\n\nANother administrator deployed a virtual machine (VM1) and a storage account (Storage2) using a SINGLE ARM template.\nYou need to view the template used for that deployment.\n\nFrom which blade can you view the template?`,

    options: `{ key: "A"\ntext: "VM1" }\n{ key: "B"\ntext: "RG1" }\n{ key: "C"\ntext: "storage2" }\n{ key: "D"\ntext: "container1" }\n],

    correctAnswers: ["B"],

    explanation: [
      "ARM templates for deployments are always stored in the **resource group's** Deployments history."\nYou can view and export the template from: Resource group → Deployments → <DeploymentName> → Template.`,
  },
  {
    id: "Q153",
    number: 153,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have an Azure Web App (App1) with deployment slots:\n\nName           | Function\n-------------- | ----------\nwebapp1-prod   | Production\nwebapp1-test   | Staging\n\nYou test changes in webapp1-test.\nYou back up App1.\nYou perform a slot swap (test → prod) and App1 experiences performance issues.\n\nYou need to revert to the previous version as quickly as possible.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Redeploy App1" }\n{ key: "B"\ntext: "Swap the slots" }\n{ key: "C"\ntext: "Clone App1" }\n{ key: "D"\ntext: "Restore the backup of App1" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Slot swapping is reversible."\nAfter swapping test → prod, the old production version Now resides in the test slot.\n\nTo instantly roll back, perform the SAME slot swap again.\nThis restores the last kNown good configuration with No downtime.`,
  },
  {
    id: "Q154",
    number: 154,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You created a file share (share1) and a Shared Access Signature (SAS1) with:\n• Allowed services: File\n• Allowed resource types: Service, Container, Object\n• Allowed permissions: Read, Write, Delete, List, Add, Create, Update, Process\n• Start: 01 Sep 2018 → End: 14 Sep 2018\n• Allowed IPs: 193.77.134.10–193.77.134.50\n\nEvaluate the following statements:\n\n1) On September 2, 2018, from IP 193.77.134.1 using Azure Storage Explorer with SAS1 → You ______.\n\n2) On September 10, 2018, from IP 193.77.134.50 using \`net use\` with SAS1 as password → You ______.`,

    options: `{
        key: "A"\ntext: [
          "Answer choice 1: will have no access\nAnswer choice 2: will have no access",`,
      },
      {
        key: "B",
        text: "Answer choice 1: will be prompted for credentials\nAnswer choice 2: will have no access",
      },
      {
        key: "C",
        text: "Answer choice 1: will have no access\nAnswer choice 2: will have read-only access",
      },
      {
        key: "D",
        text: "Answer choice 1: will have read-only access\nAnswer choice 2: will be prompted for credentials",
      },
      {
        key: "E",
        text: "Answer choice 1: will have read, write, and list access\nAnswer choice 2: will have read, write, and list access",
      },
      {
        key: "F",
        text: "Answer choice 1: will have no access\nAnswer choice 2: will have read, write, and list access",
      },
    ],

    correctAnswers: ["A"],

    explanation: `Statement 1:\nIP 193.77.134.1 is NoT in the allowed IP range → Access denied.\n\nStatement 2:\nMounting Azure Files via SMB requires a **storage account key**, Not SAS.\nTherefore SAS canNot authenticate → Access denied.\n\nBoth answers: will have No access.`,
  },
  {
    id: "Q155",
    number: 155,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: `You created a storage account named contosostorage and a file share named data.\n\nWhich UNC path should be used in a script referencing that Azure File share?`,

    options: `{ key: "A"\ntext: "\\\\blob.portal.azure.com\\blob" }\n{ key: "B"\ntext: "\\\\contosostorage.blob.core.windows.net\\file" }\n{ key: "C"\ntext: "\\\\contosostorage.file.core.windows.net\\data" }\n{ key: "D"\ntext: "\\\\subscription1.blob.core.windows.net\\data" }\n{ key: "E"\ntext: "\\\\subscription1.portal.azure.com\\blob" }\n{ key: "F"\ntext: "\\\\file.file.core.windows.net\\file" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Azure Files UNC format:"\n\\\\<storage-account>.file.core.windows.net\\<share-name>\n\nGiven:\n• storage account: contosostorage\n• share name: data\n\nCorrect UNC: \\\\contosostorage.file.core.windows.net\\data`,
  },
  {
    id: "Q156",
    number: 156,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You plan to create a storage account in East US 2 with the following requirements:\n• SynchroNous replication\n• Must remain available if ONE datacenter in the region fails\n\nHow should you configure the storage account?`,

    options: `{
        key: "A"\ntext: [
          "Replication: Geo-redundant storage (GRS)\nAccount kind: Storage (general purpose v1)",`,
      },
      {
        key: "B",
        text: "Replication: Geo-redundant storage (GRS)\nAccount kind: StorageV2 (general purpose v2)",
      },
      {
        key: "C",
        text: "Replication: Locally redundant storage (LRS)\nAccount kind: Blob storage",
      },
      {
        key: "D",
        text: "Replication: Read-access geo-redundant storage (RA-GRS)\nAccount kind: Storage (general purpose v1)",
      },
      {
        key: "E",
        text: "Replication: Zone-redundant storage (ZRS)\nAccount kind: Blob storage",
      },
      {
        key: "F",
        text: "Replication: Zone-redundant storage (ZRS)\nAccount kind: StorageV2 (general purpose v2)",
      },
    ],

    correctAnswers: ["F"],

    explanation: `ZRS = Zone-redundant storage.\n\n![Create Azure Storage Account with ZRS](/images/create-storage-account-zrs.png)\n\nIt provides *synchronous* replication across 3 availability zones within a region.\nIt survives the loss of a single datacenter.\n\nZRS is only supported in StorageV2 accounts.`,
  },
  {
    id: "Q157",
    number: 157,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: `You need to use AzCopy to copy data to Azure Blob storage and Azure File storage in storage1.\n\n![Create Azure Storage Account with ZRS](/images/azcopy-copydatatoazureblobstorage.png)\n\n![Create Azure Storage Account with ZRS](/images/azcopy-authorization.png)\n\nWhich authentication method should you use for each service?`,

    options: `{
        key: "A"\ntext: [
          "Blob storage: Azure Active Directory (Azure AD) and shared access signatures (SAS) only\nFile storage: Azure Active Directory (Azure AD) and shared access signatures (SAS) only",`,
      },
      {
        key: "B",
        text: "Blob storage: Azure Active Directory (Azure AD), access keys and shared access signatures (SAS)\nFile storage: Azure Active Directory (Azure AD), access keys and shared access signatures (SAS)",
      },
      {
        key: "C",
        text: "Blob storage: Azure Active Directory (Azure AD) and shared access signatures (SAS) only\nFile storage: Shared access signatures (SAS) only",
      },
      {
        key: "D",
        text: "Blob storage: Azure Active Directory (Azure AD) only\nFile storage: Azure Active Directory (Azure AD) only",
      },
      {
        key: "E",
        text: "Blob storage: Azure Active Directory (Azure AD) and shared access signatures (SAS) only\nFile storage: Access keys and shared access signatures (SAS) only",
      },
      {
        key: "F",
        text: "Blob storage: Azure Active Directory (Azure AD) only\nFile storage: Shared access signatures (SAS) only",
      },
    ],

    correctAnswers: ["A"],

    explanation: `AzCopy supports *Azure AD authentication* and *SAS tokens* for both Blob and Files.\n\nAccess keys are optional, Not required.\n\nCorrect: Azure AD and SAS for both services.`,
  },
  {
    id: "Q158",
    number: 158,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have a virtual machine VM1 with a web server (port 80/443) and DNS server (port 53).\n![Create Azure Storage Account with ZRS](/images/q158-sc1.png)\n\n![Create Azure Storage Account with ZRS](/images/q158-sc2.png)\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.`,

    options: `{
        key: "A"\ntext: [
          "Internet users can connect to only the DNS server on VM1.\nIf you delete Rule2, Internet users can connect to only the web server on VM1.",`,
      },
      {
        key: "B",
        text: "Internet users can connect to only the web server on VM1.\nIf you delete Rule2, Internet users can connect to the web server and the DNS server on VM1.",
      },
      {
        key: "C",
        text: "Internet users can connect to only the web server on VM1.\nIf you delete Rule2, Internet users cannot connect to the web server and the DNS server on VM1.",
      },
      {
        key: "D",
        text: "Internet users can connect to only the web server and the DNS server on VM1.\nIf you delete Rule2, Internet users can connect to only the DNS server on VM1.",
      },
      {
        key: "E",
        text: "Internet users cannot connect to the web server and the DNS server on VM1.\nIf you delete Rule2, Internet users can connect to the web server and the DNS server on VM1.",
      },
      {
        key: "F",
        text: "Internet users cannot connect to the web server and the DNS server on VM1.\nIf you delete Rule2, Internet users can connect to only the DNS server on VM1.",
      },
    ],

    correctAnswers: ["B"],

    explanation: `DNS = port 53 → covered by denied range (50–60), so BLOCKED.\nWeb server = 80/443 → ALLOWED via Rule1 (50–500).\n\nIf Rule2 is deleted:\n• Rule1 (50–500 allow) still applies → both HTTP/HTTPS and DNS become allowed.\n\nHowever, per solution: correct mapping:\nInternet users: only web server\nAfter deleting Rule2: only DNS server.`,
  },
  {
    id: "Q159",
    number: 159,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You have an Azure VM (VM1) and Microsoft System Center Service Manager on-premises.\nYou need to ensure that Service Manager receives an alert when VM1 has <10% available memory.\n\nWhat should you do first?\n\nOptions:\nA - Create an automation runbook\nB - Deploy a function app\nC - Deploy the IT Service Management Connector (ITSM)\nD - Create a Notification`,

    options: `{ key: "A"\ntext: "Create an automation runbook" }\n{ key: "B"\ntext: "Deploy a function app" }\n{ key: "C"\ntext: "Deploy the IT Service Management Connector (ITSM)" }\n{ key: "D"\ntext: "Create a Notification" }\n],

    correctAnswers: ["C"],

    explanation: [
      "The IT Service Management Connector integrates Azure Monitor alerts with ITSM tools such as Service Manager."\nTo send alerts to SCSM, you must first deploy and configure the ITSM connector.`,
  },
  {
    id: "Q160",
    number: 160,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: `You have an on-prem server with folder D:\\Folder1.\nYou need to copy its contents to the *public* container in Azure Storage account contosodata.\n\nWhich command should you run?\n\nOptions:\nA - https://contosodata.blob.core.windows.net/public\nB - azcopy sync D:\\folder1 https://contosodata.blob.core.windows.net/public --snapshot\nC - azcopy copy D:\\folder1 https://contosodata.blob.core.windows.net/public --recursive\nD - az storage blob copy start-batch D:\\Folder1 https://contosodata.blob.core.windows.net/public`,

    options: `{ key: "A"\ntext: "https://contosodata.blob.core.windows.net/public" }\n{
        key: "B"\ntext: "azcopy sync D:\\folder1 https://contosodata.blob.core.windows.net/public --snapshot"\n}\n{
        key: "C"\ntext: "azcopy copy D:\\folder1 https://contosodata.blob.core.windows.net/public --recursive"\n}\n{
        key: "D"\ntext: "az storage blob copy start-batch D:\\Folder1 https://contosodata.blob.core.windows.net/public"\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "The correct AzCopy command to copy folder contents recursively is:"\nazcopy copy <local-path> <container-url> --recursive\n\nTherefore: Option C.`,
  },

  {
    id: "Q161",
    number: 161,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You have an on-premises file server named Server1 that runs Windows Server 2016 and an Azure subscription that contains an Azure file share.\nYou deploy an Azure File Sync Storage Sync Service and create a sync group.\n\nYou need to synchronize files from Server1 to Azure.\nWhich THREE actions should you perform in sequence?\n\nActions:\n|-------|\n|1. Create an Azure on-premises data gateway.|\n2. Install the Azure File Sync agent on Server1.\n3. Create a Recovery Services vault.\n4. Register Server1.\n5. Install the DFS Replication server role on Server1.\n6. Add a server endpoint.`,

    options: `{ key: "A"\ntext: "Sequence: 5, 4, 6" }\n{ key: "B"\ntext: "Sequence: 2, 4, 6" }\n{ key: "C"\ntext: "Sequence: 3, 4, 6" }\n{ key: "D"\ntext: "Sequence: 3, 1, 2" }\n],

    // Correct order of steps
    correctAnswers: ["B"],

    explanation: [
      "To onboard a Windows Server to Azure File Sync, you must:"\n1) Install the Azure File Sync agent on the server (Server1).\n2) Register the server with the Storage Sync Service.\n3) Add a server endpoint that points to the local path on Server1.\n\nAzure on-premises data gateway, DFS Replication, and a Recovery Services vault are Not required for Azure File Sync.`,
  },
  {
    id: "Q162",
    number: 162,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You have an app named App1 that runs on two Azure virtual machines named VM1 and VM2.\nYou plan to implement an Azure Availability Set for App1.\nThe solution must ensure that App1 is available during planned maintenance of the hardware hosting VM1 and VM2.\n\nWhat should you include in the Availability Set?`,

    options: `{ key: "A"\ntext: "One update domain" }\n{ key: "B"\ntext: "Two fault domains" }\n{ key: "C"\ntext: "One fault domain" }\n{ key: "D"\ntext: "Two update domains" }\n],

    correctAnswers: ["D"],

    explanation: [
      "Planned maintenance is applied per **update domain**."\nTo ensure at least one VM remains available during planned maintenance, deploy the VMs across at least two update domains.\nTherefore, the Availability Set must have two update domains.`,
  },
  {
    id: "Q163",
    number: 163,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1 with a resource group RG1.\nRG1 contains resources that were deployed by using templates.\nYou need to view the date and time when the resources were created in RG1.\n\nSolution:\nFrom the **Subscriptions** blade, you select the subscription and then click **Programmatic deployment**.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Programmatic deployment only shows which Marketplace items are enabled for programmatic deployment."\nIt does Not show resource creation timestamps.\nTo see when resources were created, use the Activity log or the Deployments blade of RG1.\nTherefore, the solution does NoT meet the goal.`,
  },
  {
    id: "Q164",
    number: 164,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `Same scenario as Q163.\nYou need to view the date and time when the resources were created in RG1.\n\nSolution:\nFrom the **RG1** blade, you click **Automation script**.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "The **Automation script** blade exports an ARM template for the resource group."\nIt does Not show when the resources were created.\nTherefore, the solution does NoT meet the goal.`,
  },
  {
    id: "Q165",
    number: 165,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `Same scenario as Q163.\nYou need to view the date and time when the resources were created in RG1.\n\nSolution:\nFrom the **RG1** blade, you click **Deployments**.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "The **Deployments** blade in the resource group shows each deployment, including its start time."\nSince the resources were deployed via templates, their creation time can be inferred from the deployment timestamps.\nTherefore, the solution meets the goal.`,
  },
  {
    id: "Q166",
    number: 166,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `Same scenario as Q163.\nYou need to view the date and time when the resources were created in RG1.\n\nSolution:\nFrom the **Subscriptions** blade, you select the subscription and then click **Resource providers**.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "The **Resource providers** blade only shows which resource providers (Microsoft.Storage, Microsoft.Network, etc.) are registered."\nIt does Not show creation times for individual resources.\nTherefore, the solution does NoT meet the goal.`,
  },
  {
    id: "Q167",
    number: 167,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `Same scenario as Q163.\nYou need to view the date and time when the resources were created in RG1.\n\nSolution:\nYou use the **Activity log** and filter the events for the resource group RG1.\n\nDoes this meet the goal?\n\nOptions:\nA - YES\nB - No`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "The Activity log contains all control plane operations, including resource creation events."\nBy filtering on RG1 you can see when each resource was created.\nTherefore, the solution meets the goal.`,
  },
  {
    id: "Q168",
    number: 168,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure AD tenant contoso.com with the following users:\n\nName   | Type   | Member of\n-------|--------|----------------\nUser1  | Member | Group1\nUser2  | Guest  | Group1\nUser3  | Member | None\nUserA  | Member | Group2\nUserB  | Guest  | Group2\n\nAdditional info:\n• User3 is the owner of Group1.\n• Group2 is a member of Group1.\n\nYou configure an access review named Review1 with:`,

    options: `{
        key: "A"\ntext: [
          "User3 can perform an access review of User1: Yes\nUser3 can perform an access review of UserA: Yes\nUser3 can perform an access review of UserB: Yes",`,
      },
      {
        key: "B",
        text: "User3 can perform an access review of User1: Yes\nUser3 can perform an access review of UserA: No\nUser3 can perform an access review of UserB: No",
      },
      {
        key: "C",
        text: "User3 can perform an access review of User1: No\nUser3 can perform an access review of UserA: Yes\nUser3 can perform an access review of UserB: Yes",
      },
      {
        key: "D",
        text: "User3 can perform an access review of User1: No\nUser3 can perform an access review of UserA: Yes\nUser3 can perform an access review of UserB: No",
      },
      {
        key: "E",
        text: "User3 can perform an access review of User1: Yes\nUser3 can perform an access review of UserA: No\nUser3 can perform an access review of UserB: Yes",
      },
      {
        key: "F",
        text: "User3 can perform an access review of User1: No\nUser3 can perform an access review of UserA: No\nUser3 can perform an access review of UserB: No",
      },
    ],

    // Map as: [S1, S2, S3]
    correctAnswers: ["F"],

    explanation: `Review1 scope: **Guest users only** who are **members of Group1**.\n![Create Azure Storage Account with ZRS](/images/q168-accessreview-sc1.png)\n\n• Members of Group1: User1 (member), User2 (guest), Group2 (nested group).\n• Nested groups and their members (UserA, UserB) are NoT individually evaluated in access reviews.\n\nThus, only **User2** is in scope for the access review.\nThe statements ask about User1, UserA, and UserB – None of them are in scope.\nTherefore User3 canNot review any of those three users: all answers are No.`,
  },
  {
    id: "Q169",
    number: 169,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription with a storage account and an on-premises server Server1 (Windows Server 2016) with 2 TB of data.\nYou need to transfer the data to the Azure storage account using the Azure Import/Export service.\n\nIn which order should you perform the actions?\n\nActions:\n|-|\n|1. From the Azure portal, create an import job.|\n2. From Server1, run waimportexport.exe.\n3. Attach an external disk to Server1.\n4. From the Azure portal, update the import job.\n5. Detach the external disks from Server1 and ship the disks to an Azure datacenter.`,

    options: `{ key: "A"\ntext: "Sequence: 3, 2, 1, 5, 4" }\n{ key: "B"\ntext: "Sequence: 1, 2, 3, 4, 5" }\n{ key: "C"\ntext: "Sequence: 3, 1, 2, 4, 5" }\n{ key: "D"\ntext: "Sequence: 1, 3, 2, 4, 5" }\n],

    // Correct sequence
    correctAnswers: ["A"],

    explanation: [
      "Typical Azure Import/Export workflow to import data:"\n1) Attach external disk(s) to the on-prem server (step 3).\n2) Run waimportexport.exe to copy data and generate journal files (step 2).\n3) Create the import job in the portal and upload the journal files (step 1).\n4) Detach and ship the disks to the Azure datacenter (step 5).\n5) Update the import job with the shipment tracking number (step 4).`,
  },
  {
    id: "Q170",
    number: 170,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `Your company's local environment consists of a single AD DS domain.\nYou plan to offer users SSO access to Azure-hosted SaaS apps using Azure AD authentication.\nThe tenant's current domain name is companycom.onmicrosoft.com.\n\nYou need to configure Azure AD to use **company.com** as the organization's owned public domain name.\nWhat should you do?\n`,

    options: `{
        key: "A"\ntext: "Add company.com as a UPN suffix to the AD DS domain."\n}\n{
        key: "B"\ntext: "Run Azure AD Connect from a domain member server and specify the custom installation option."\n}\n{
        key: "C"\ntext: "Remove the companycom.onmicrosoft.com domain name from the Azure AD tenant."\n}\n{
        key: "D"\ntext: "Add a DNS verification record at the domain registrar."\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "To prove ownership of a custom domain (company.com) in Azure AD, you must:"\n1) Add the domain in Azure AD.\n2) Create the TXT (or MX) DNS verification record at the domain registrar.\n\nThe key step in this question is: **Add a DNS verification record at the domain registrar**.`,
  },

  {
    id: "Q171",
    number: 171,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You manage an Azure Windows Server virtual machine (VM) that hosts several SQL Server databases.\nYou need to configure backup and retention policies for the VM. The backup policy must include transaction log backups.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "Configure point-in-time and long-term retention policies from the SQL Servers Azure portal blade."\n}\n{
        key: "B"\ntext: "Configure a SQL Server in Azure VM backup policy from the Recovery Services Azure portal blade."\n}\n{
        key: "C"\ntext: "Configure a continuous delivery deployment group from the Virtual Machine Azure portal blade."\n}\n{
        key: "D"\ntext: "Configure a point-in-time snapshot from the Disks Azure portal blade."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure Backup for SQL Server in Azure VM supports full, differential, and transaction log backups."\nThe correct configuration is done from a Recovery Services Vault where you enable the 'SQL in Azure VM' workload.\nOther options (disk snapshots, LTR policies, CD pipelines) do NoT support SQL transaction log chain backups.\n\nCorrect: Configure SQL Server in Azure VM backup policy from Recovery Services Vault.`,
  },
  {
    id: "Q172",
    number: 172,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: `You have a Recovery Services vault that you use to test backups.\nThe test backups contain two protected virtual machines.\n\nYou need to delete the Recovery Services vault.\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "From the Recovery Service vault, stop the backup of each backup item."\n}\n{
        key: "B"\ntext: "From the Recovery Service vault, delete the backup data."\n}\n{
        key: "C"\ntext: "Modify the disaster recovery properties of each virtual machine."\n}\n{ key: "D"\ntext: "Modify the locks of each virtual machine." }\n],

    correctAnswers: ["A"],

    explanation: [
      "A Recovery Services Vault canNot be deleted while it contains protected items."\nFirst step: Stop backup (disable protection) for each backup item.\nOnly after disabling backups AND deleting backup data can the vault be deleted.`,
  },
  {
    id: "Q173",
    number: 173,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains the resources:\n\nName     | Type             | Region  | Resource Group\n-------- | ---------------- | ------- | ---------------\nVNet1    | Virtual Network  | West US | RG1\nVNet2    | Virtual Network  | West US | RG1\nVNet3    | Virtual Network  | East US | RG2\nNSG1     | Network Security Group | East US | RG2\n\nTo which subnets can you apply NSG1?`,

    options: `{ key: "A"\ntext: "The subnets on VNet2 only" }\n{ key: "B"\ntext: "The subnets on VNet1 only" }\n{ key: "C"\ntext: "The subnets on VNet2 and VNet3 only" }\n{ key: "D"\ntext: "The subnets on VNet1, VNet2, and VNet3" }\n{ key: "E"\ntext: "The subnets on VNet3 only" }\n],

    correctAnswers: ["E"],

    explanation: [
      "NSGs can only be applied to NICs or subnets **in the same Azure region**."\nNSG1 is in **East US**, so it can only apply to subnets in **VNet3**, which is also in East US.`,
  },
  {
    id: "Q174",
    number: 174,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have two subscriptions under two different Azure AD tenants.\n\nSubscription1:\n- Contains VNet1 (IP: 10.0.0.0/16), VM1\n\nSubscription2:\n- Contains VNet2 (IP: 10.10.0.0/24), VM2\n\nYou need to connect VNet1 to VNet2.\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Move VNet1 to Subscription2" }\n{ key: "B"\ntext: "Modify the IP address space of VNet2" }\n{ key: "C"\ntext: "Configure virtual network peering" }\n{ key: "D"\ntext: "Provision virtual network gateways" }\n{ key: "E"\ntext: "Move VM1 to Subscription2" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Cross-subscription VNet peering is supported even across different Azure AD tenants."\nIP ranges do Not overlap → peering is possible.\nNo need to move resources or create gateways.`,
  },
  {
    id: "Q175",
    number: 175,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: `You are an administrator for your company. You have an Azure subscription that contains the resources in the following table.\n\nName| Type\n-|-\nStore| Azure Storage Account\nSync1 | Azure File Sync\n\nStore1 contains a file share named Data. Data contains 5,000 files.\n\nYou need to synchronize the files in Data to an on-premises server named Server1.\n\nWhich three actions should you perform?`,

    options: `{ key: "A"\ntext: "Download an automation script." }\n{ key: "B"\ntext: "Create a container instance." }\n{ key: "C"\ntext: "Create a sync group." }\n{ key: "D"\ntext: "Register Server1." }\n{ key: "E"\ntext: "Install the Azure File Sync agent on Server1." }\n],

    correctAnswers: ["C"\nD\nE"],

    explanation: [
      "Azure File Sync workflow:\n1. Install Azure File Sync agent on Server1.\n2. Register Server1 with the Storage Sync Service.\n3. Create Sync Group and configure cloud/server endpoints.\n\nOther options (automation script, container instance) are irrelevant.`,
  },
  {
    id: "Q176",
    number: 176,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have management groups and subscriptions as shown in the tables:\n\nName                 | In Management Group\n-|-\nTenant Root Group    | None\nManagementGroup11    | Tenant Root Group\nManagementGroup12    | Tenant Root Group\nManagementGroup21    | ManagementGroup11\n\nYou add Azure subscriptions to the management groups as shown in the following table:\n\nName                 | Management Group\n-|-\nSubscription1 | ManagementGroup21\nSubscription2 | ManagementGroup12\n\nYou create the Azure policies shown in the following table:\n\nName                 | Parameter| Scope\n-|-|-\nNot allowed resource types| virtualNetworks|  Tenant Root Group\nAllowed resource types| virtualNetworks| ManagementGroup12\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.`,

    options: `{
        key: "A"\ntext: [
          "You can create a virtual network in Subscription1: Yes\nYou can create a virtual machine in Subscription2: Yes\nYou can add Subscription1 to ManagementGroup11: Yes",`,
      },
      {
        key: "B",
        text: "You can create a virtual network in Subscription1: Yes\nYou can create a virtual machine in Subscription2: Yes\nYou can add Subscription1 to ManagementGroup11: No",
      },
      {
        key: "C",
        text: "You can create a virtual network in Subscription1: Yes\nYou can create a virtual machine in Subscription2: No\nYou can add Subscription1 to ManagementGroup11: No",
      },
      {
        key: "D",
        text: "You can create a virtual network in Subscription1: No\nYou can create a virtual machine in Subscription2: Yes\nYou can add Subscription1 to ManagementGroup11: Yes",
      },
      {
        key: "E",
        text: "You can create a virtual network in Subscription1: No\nYou can create a virtual machine in Subscription2: No\nYou can add Subscription1 to ManagementGroup11: Yes",
      },
      {
        key: "F",
        text: "You can create a virtual network in Subscription1: No\nYou can create a virtual machine in Subscription2: No\nYou can add Subscription1 to ManagementGroup11: No",
      },
    ],

    correctAnswers: ["E"],

    explanation: `The Tenant Root Group denies creation of all VNets.\nThis deny canNot be overridden by MG12's 'Allowed virtualNetworks' policy.\n\nTherefore:\n• CanNot create VNets in Subscription1.\n• CanNot create VMs in Subscription2, because VMs require a VNet.\n• Subscription1 can be moved to ManagementGroup11 because both are in same tenant.`,
  },
  {
    id: "Q177",
    number: 177,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains the resources shown in the following table:\n\nName|Type|Resource Group|Tag\n-|-|-|-\nRG6|Resource Group| Not applicable| None\nVNet1|Virtual Network|RG6| Department : D1\n\nYou assign a policy to RG6 as shown in the following table:\n\nSection|Setting|Value\n-|-|-\nScope| Scope|Subscription1/RG6\n→|Exclusions|None\nBasics| Policy definition|Append a tag and its value to resources\n→|Assignment name|Append a tag and its value to resources\nParameters| Tag name |Label\n→|Tag value|Value1\n\nTo RG6, you apply the tag: RGroup: RG6.\n\nYou deploy a virtual network named VNET2 to RG6.\n\nWhich tags apply to VNET1 and VNET2?`,

    options: `{ key: "A"\ntext: ["VNet1: None\nVNet2: None"` },
      {
        key: "B",
        text: "VNet1: Department: D1 only\nVNet2: Label: Value1 only",
      },
      {
        key: "C",
        text: "VNet1: Department: D1, and RGroup: RG6 only\nVNet2: RGroup: RG6 only",
      },
      {
        key: "D",
        text: "VNet1: Department: D1, and Label: Value1 only\nVNet2: RGroup: RG6, and Label: Value1",
      },
      {
        key: "E",
        text: "VNet1: Department: D1, and Label: Value1 only\nVNet2: Label: Value1 only",
      },
      {
        key: "F",
        text: "VNet1: Department: D1, RGroup: RG6, and Label: Value1\nVNet2: RGroup: RG6, and Label: Value1",
      },
    ],

    correctAnswers: ["B"],

    explanation: `• RG tags propagate DOWN to resources **only at creation time**, Not retroactively.\n• The Append-Tag policy adds Label: Value1 only to NEW or UPDATED resources.\n\nVNet1 (existing): Retains only Department:D1\nVNet2 (new): Receives Label:Value1 from policy, but NoT the Group:RG6 tag because resource-group tags do Not auto-inherit.`,
  },
  {
    id: "Q178",
    number: 178,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains a virtual machine scale set. The scale set contains four instances that have the following configurations:\n• Operating system: Windows Server 2016\n• Size: Standard_D1_v2\n• You run the Get-AzVmss cmdlet as shown in the following exhibit:\n\n![Create Azure Storage Account with ZRS](/images/q178-getazvmss-sc1.png)\n\nSelect the answer choice that completes each statement based on the information presented in the graphic.\n![Create Azure Storage Account with ZRS](/images/q178-statement1.png)\n\n• 0\n• 1\n• 2\n• 4\n![Create Azure Storage Account with ZRS](/images/q178-statement2.png)\n\n• 0\n• 1\n• 2\n• 4`,

    options: `{ key: "A"\ntext: ["\nStatement1: 0\nStatement2: 0"` },
      { key: "B", text: "\nStatement1: 0\nStatement2: 4" },
      { key: "C", text: "\nStatement1: 1\nStatement2: 4" },
      { key: "D", text: "\nStatement1: 2\nStatement2: 2" },

      { key: "E", text: "\nStatement1: 4\nStatement2: 0" },
      { key: "F", text: "\nStatement1: 4\nStatement2: 4" },
    ],

    correctAnswers: ["B"],

    explanation: `Statement 1:\nVM size changes apply ONLY to **new instances**, Not to existing ones → 0 affected.\n\nStatement 2:\nAutomatic OS upgrades replace OS disks in batches.\nDefault batch size for a 4-instance VMSS is the full set → up to 4 VMs updated simultaneously.`,
  },
  {
    id: "Q179",
    number: 179,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription named Subscription1. Subscription1 contains the resources in the following table.\nName|Type\n-|-\nRG2|Resource Group\nVNet1| Virtual Network\nVNet2| Virtual Network\nVM5|Virtual machine connected to VNet1\nVM5|Virtual machine connected to VNet1\n\nIn Azure, you create a private DNS zone named adatum.com.\nYou set the registration virtual network to VNet2. The adatum.com zone is configured as shown in the following exhibit.\n![Create Azure Storage Account with ZRS](/images/q179-sc1.png)\n![Create Azure Storage Account with ZRS](/images/q179-sc2.png)\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.`,

    options: `{
        key: "A"\ntext: [
          "\nThe A record for VM5 will be registered automatically in the adatum.com zone: Yes\nVM5 can resolve vm9.adatum.com: Yes\nVM6 can resolve vm9.adatum.com: Yes",`,
      },
      {
        key: "B",
        text: "\nThe A record for VM5 will be registered automatically in the adatum.com zone: Yes\nVM5 can resolve vm9.adatum.com: Yes\nVM6 can resolve vm9.adatum.com: No",
      },
      {
        key: "C",
        text: "\nThe A record for VM5 will be registered automatically in the adatum.com zone: No\nVM5 can resolve vm9.adatum.com: Yes\nVM6 can resolve vm9.adatum.com: No",
      },
      {
        key: "D",
        text: "\nThe A record for VM5 will be registered automatically in the adatum.com zone: No\nVM5 can resolve vm9.adatum.com: Yes\nVM6 can resolve vm9.adatum.com: Yes",
      },
      {
        key: "E",
        text: "\nThe A record for VM5 will be registered automatically in the adatum.com zone: No\nVM5 can resolve vm9.adatum.com: No\nVM6 can resolve vm9.adatum.com: Yes",
      },
      {
        key: "F",
        text: "\nThe A record for VM5 will be registered automatically in the adatum.com zone: No\nVM5 can resolve vm9.adatum.com: No\nVM6 can resolve vm9.adatum.com: No",
      },
    ],

    correctAnswers: ["E"],

    explanation: `• Auto-registration happens ONLY for VMs in the **registration VNet** → VNet2.\nSo VM5 (in VNet1) will NoT register automatically.\n\n• VNet1 is NoT linked to the private DNS zone → VM5 canNot resolve vm9.adatum.com.\n\n• VM6 is in VNet2 → it CAN resolve the record.`,
  },
  {
    id: "Q180",
    number: 180,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains a virtual network named VNet1. VNet1 uses an IP address space of 10.0.0.0/16 and contains the subnets in the following table.\n\nName|IP address range\n-|-\n• Subnet0 | 10.0.0.0/24\n• Subnet1 |10.0.1.0/24\n• Subnet2 |10.0.2.0/24\n• GatewaySubnet | 10.0.254.0/24\n\nSubnet1 contains a virtual appliance named VM1 that operates as a router.\n\nYou create a route table RT1.\n\nYou need to route ALL inbound VNet traffic through VM1.\n\nHow should RT1 be configured?`,

    options: `{
        key: "A"\ntext: [
          "\nAddress prefix: 10.0.0.0/16 \n Next hop type: Virtual appliance \n Assigned to: GatewaySubnet",`,
      },
      {
        key: "B",
        text: "\nAddress prefix: 10.0.0.0/16 \n Next hop type: Virtual network gateway \n Assigned to: Subnet0",
      },
      {
        key: "C",
        text: "\nAddress prefix: 10.0.1.0/24 \nNext hop type: Virtual network\nAssigned to: Subnet1 and Subnet2",
      },
      {
        key: "D",
        text: "\nAddress prefix: 10.0.1.0/24 \n Next hop type: Virtual appliance \n Assigned to: Subnet0",
      },
      {
        key: "E",
        text: "\nAddress prefix: 10.0.254.0/24 \nNext hop type: Virtual network\nAssigned to: Subnet1 and Subnet2",
      },
      {
        key: "F",
        text: "\nAddress prefix: 10.0.254.0/24 \nNext hop type: Virtual network gateway\nAssigned to: GatewaySubnet",
      },
    ],

    correctAnswers: ["A"],

    explanation: `To route ALL VNet traffic through the virtual appliance:\n• Address prefix must match the entire VNet → 10.0.0.0/16\n• Next hop type: Virtual appliance\n• Should be assigned to **GatewaySubnet** to control inbound flows\n\nTherefore option A is correct.`,
  },

  {
    id: "Q181",
    number: 181,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You are an administrator for a company. You have an Azure subscription that contains 10 virtual machines.\nYou need to ensure that you receive an email message when any virtual machines are powered off, restarted, or deallocated.\n\nWhat is the minimum number of rules and action groups that you require?`,

    options: `{ key: "A"\ntext: "Three rules and three action groups." }\n{ key: "B"\ntext: "One rule and one action group." }\n{ key: "C"\ntext: "Three rules and one action group." }\n{ key: "D"\ntext: "One rule and three action groups." }\n],

    correctAnswers: ["C"],

    explanation: [
      "Each event type (power off, restart, deallocated) requires one metric/activity-log rule → 3 rules."\nBut they can all share a single Action Group (email).\n\nTherefore: 3 rules, 1 action group.`,
  },
  {
    id: "Q182",
    number: 182,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: `You have a Recovery Service vault that contains two protected virtual machines.\nYou need to delete the Recovery Services vault.\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "From the Recovery Service vault, stop the backup of each backup item."\n}\n{
        key: "B"\ntext: "From the Recovery Service vault, delete the backup data."\n}\n{
        key: "C"\ntext: "Modify the disaster recovery properties of each virtual machine."\n}\n{ key: "D"\ntext: "Modify the locks of each virtual machine." }\n],

    correctAnswers: ["A"],

    explanation: [
      "A Recovery Services Vault canNot be deleted while backup items are still protected."\nStep 1 is always to disable protection (Stop Backup).`,
  },
  {
    id: "Q183",
    number: 183,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You have an Azure subscription named Subscription1. Subscription1 contains a virtual machine named VM1.\n\nYou have a computer named Computer1 that runs Windows 10. Computer1 is connected to the Internet.\n\nYou add a network interface named Interface1 to VM1 as shown in the following exhibit.\n\n![Create Azure Storage Account with ZRS](/images/q183-sc1.png)\n\n![Create Azure Storage Account with ZRS](/images/q183-sc2.png)`,

    options: `{ key: "A"\ntext: "Start VM1." }\n{ key: "B"\ntext: "Attach a network interface." }\n{ key: "C"\ntext: "Delete the DenyAllOutBound outbound port rule." }\n{ key: "D"\ntext: "Delete the DenyAllInBound inbound port rule." }\n],

    correctAnswers: ["A"],

    explanation: [
      "The screenshot indicates that VM1 is stopped."\nRDP canNot work until the VM is running.`,
  },
  {
    id: "Q184",
    number: 184,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have VM1 (Windows Server) with:\n• Size: D4s_v3\n• 1 NIC, 1 managed disk\nYou plan to:\n• Resize to D8s_v3\n• Add a 500-GB disk\n• Add Puppet Agent extension\n• Add aNother NIC\n\nWhich change will cause downtime?`,

    options: `{ key: "A"\ntext: "Add a 500-GB managed disk." }\n{ key: "B"\ntext: "Attach an additional network interface." }\n{ key: "C"\ntext: "Add the Puppet Agent extension." }\n{ key: "D"\ntext: "Change the size to D8s_v3." }\n],

    correctAnswers: ["D"],

    explanation: [
      "Resizing requires the VM to be stopped if the target size is Not available on the current hardware cluster."\nTherefore VM must be deallocated → downtime.`,
  },
  {
    id: "Q185",
    number: 185,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have two on-premises servers (Server1 DNS with zone adatum.com containing 1000 records, Server2 management machine).\nServer2 has:\n• DNS Manager\n• Azure PowerShell\n• Azure CLI 2.0\n\nYou need to move adatum.com DNS zone to Azure DNS with minimal effort.\n\nWhat should you use?`,

    options: `{ key: "A"\ntext: "Azure PowerShell" }\n{ key: "B"\ntext: "Azure CLI" }\n{ key: "C"\ntext: "The Azure portal" }\n{ key: "D"\ntext: "The DNS Manager console" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Only Azure CLI supports zone file import/export."\nAzure PowerShell and Portal canNot import BIND zone files.`,
  },
  {
    id: "Q186",
    number: 186,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have a virtual network named VNET1 that contains the subnets shown in the following table:\n\nName|Subnet|Network Security Group (NSG)\n-|-|-\n• Subnet1|10.10.1.0/24 | NSG1\n• Subnet2| 10.10.2.0/24 | (No NSG)\n\nYou have two Azure virtual machines that have the network configurations shown in the following table:\n\nName|Subnet|IP address|NSG\n-|-|-|-\n• VM1 | Subnet1 | IP 10.10.1.5 | NSG2\n• VM2 | Subnet2 | IP 10.10.2.5 | No NSG\n• VM3 | Subnet2 |IP 10.10.2.6 | No NSG\n\nFor NSG1, you create the inbound security rule shown in the following table:\nPriority|Source|Destination|Destination port|Action\n-|-|-|-|-\n101|10.10.2.0/24|10.10.1.0/24|1433 TCP|Allow\n\nFor NSG2, you create the inbound security rule shown in the following table:\nPriority|Source|Destination|Destination port|Action\n-|-|-|-|-\n125|10.10.2.5|10.10.1.5|1433 TCP|Block\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.`,

    options: `{
        key: "A"\ntext: [
          "\nVM2 can connect to the TCP port 1433 services on VM1: Yes\nVM1 can connect to the TCP port 1433 services on VM2: Yes\nVM2 can connect to the TCP port 1433 services on VM3: Yes",`,
      },
      {
        key: "B",
        text: "\nVM2 can connect to the TCP port 1433 services on VM1: Yes\nVM1 can connect to the TCP port 1433 services on VM2: Yes\nVM2 can connect to the TCP port 1433 services on VM3: No",
      },
      {
        key: "C",
        text: "\nVM2 can connect to the TCP port 1433 services on VM1: Yes\nVM1 can connect to the TCP port 1433 services on VM2: No\nVM2 can connect to the TCP port 1433 services on VM3: No",
      },
      {
        key: "D",
        text: "\nVM2 can connect to the TCP port 1433 services on VM1: No\nVM1 can connect to the TCP port 1433 services on VM2: Yes\nVM2 can connect to the TCP port 1433 services on VM3: No",
      },
      {
        key: "E",
        text: "\nVM2 can connect to the TCP port 1433 services on VM1: No\nVM1 can connect to the TCP port 1433 services on VM2: Yes\nVM2 can connect to the TCP port 1433 services on VM3: Yes",
      },
      {
        key: "F",
        text: "\nVM2 can connect to the TCP port 1433 services on VM1: No\nVM1 can connect to the TCP port 1433 services on VM2: No\nVM2 can connect to the TCP port 1433 services on VM3: No",
      },
    ],

    correctAnswers: ["E"],

    explanation: `VM2→VM1 is BLOCKED by NSG2 (specific deny from IP 10.10.2.5).\n\nVM1→VM2 inbound to VM2 has No NSG, so it is allowed.\n\nVM2→VM3 is within Subnet2 and there are No NSGs on VM2 or VM3 → allowed.`,
  },
  {
    id: "Q187",
    number: 187,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: `You created a Recovery Services Vault backup policy (Policy1) with the following settings:\n\n![Create Azure Storage Account with ZRS](/images/q187-sc1.png)\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.`,

    options: `{
        key: "A"\ntext: [
          "\nThe backup that occurs on Sunday, March 1., will be retained for 30 days.\nThe backup that occurs on Sunday, November 1., will be retained for 10 weeks.",`,
      },
      {
        key: "B",
        text: "\nThe backup that occurs on Sunday, March 1., will be retained for 10 weeks.\nThe backup that occurs on Sunday, November 1., will be retained for 36 months.",
      },
      {
        key: "C",
        text: "\nThe backup that occurs on Sunday, March 1., will be retained for 10 years.\nThe backup that occurs on Sunday, November 1., will be retained for 36 months.",
      },
      {
        key: "D",
        text: "\nThe backup that occurs on Sunday, March 1., will be retained for 10 years.\nThe backup that occurs on Sunday, November 1., will be retained for 10 weeks.",
      },
      {
        key: "E",
        text: "\nThe backup that occurs on Sunday, March 1., will be retained for 36 months.\nThe backup that occurs on Sunday, November 1., will be retained for 10 years.",
      },
      {
        key: "E",
        text: "\nThe backup that occurs on Sunday, March 1., will be retained for 10 years.\nThe backup that occurs on Sunday, November 1., will be retained for 10 years.",
      },
    ],

    correctAnswers: ["C"],

    explanation: `March 1 backup:\nFalls on a Sunday in March → qualifies as Yearly backup → 10 years.\n\nNovember 1 backup:\nIs Sunday, Not in March → qualifies as Monthly → 36 months.`,
  },
  {
    id: "Q188",
    number: 188,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains two resource groups named RG1 and RG2. RG2 does not contain any resources. RG1 contains the resources in the following table.\nName|Type|Description|Lock\n-|-|-|-\nVNet1|Virtual Network| A virtual network|ReadOnly\nVNet3|Virtual Network| A classic virtual network|None\nW10|Virtual machine| VM/Win10/Stoped/Attached to VNet1|Delete\nWM10_osDisk|Disk| Managed disk/Attached to W10|None\n\nWhich resource can you move to RG2?`,

    options: `{ key: "A"\ntext: "W10_OsDisk" }\n{ key: "B"\ntext: "VNet1" }\n{ key: "C"\ntext: "VNet3" }\n{ key: "D"\ntext: "W10" }\n],

    correctAnswers: ["D"],

    explanation: [
      "• VNet1 canNot be moved because it has a VM attached."\n• VNet3 (classic) canNot be moved between RGs.\n• A disk canNot be moved while attached to a VM.\n• W10 can be moved because VMs can move resource groups.`,
  },
  {
    id: "Q189",
    number: 189,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have a Logic App (App1) that responds to HTTP POST and GET.\nDuring peak periods, App1 must handle 200,000 requests in 5 minutes.\n\nYou need to configure App1 to handle the expected load.\n\nWhat should you configure?`,

    options: `{ key: "A"\ntext: "Access control (IAM)" }\n{ key: "B"\ntext: "API connections" }\n{ key: "C"\ntext: "Workflow settings" }\n{ key: "D"\ntext: "Access keys" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Throughput limits for Logic Apps are increased only through Workflow Settings → High Throughput Mode."\nThis raises the limit from 100,000 actions/5 min to 300,000.`,
  },
  {
    id: "Q190",
    number: 190,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You plan to deploy a VM scale set using Windows Server 2016 Datacenter.\nYou need each VM to automatically install web server components.\n\nWhich two actions should you perform?`,

    options: `{
        key: "A"\ntext: "Modify the extensionProfile section of the ARM template."\n}\n{ key: "B"\ntext: "Create a new VMSS in the portal." }\n{ key: "C"\ntext: "Create an Azure Policy." }\n{ key: "D"\ntext: "Create an automation account." }\n{ key: "E"\ntext: "Upload a configuration script." }\n],

    correctAnswers: ["A"\nE"],

    explanation: [
      "Web server installation is automated via DSC or Custom Script Extension.\nBoth require:\n• Uploading configuration script (E)\n• Adding DSC/custom script extension to extensionProfile in ARM template (A)`,
  },

  {
    id: "Q191",
    number: 191,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.\n\nYour company registers a domain name of contoso.com.\nYou create an Azure DNS zone named contoso.com and then you add an A record to the zone for a host named www that has an IP address of 131.107.1.10.\nYou discover that Internet hosts are unable to resolve www.contoso.com to the 131.107.1.10 IP address.\nYou need to resolve the name resolution issue.\n\nSolution: You modify the name server at the domain registrar.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "To use Azure DNS for a public zone, the NS records at the domain registrar must point to the Azure DNS name servers."\nModifying the name servers at the registrar to the Azure DNS NS records fixes the name resolution issue.\nTherefore, this solution meets the goal.`,
  },
  {
    id: "Q192",
    number: 192,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.\n\nYour company registers a domain name of contoso.com.\nYou create an Azure DNS zone named contoso.com and then you add an A record to the zone for a host named www that has an IP address of 131.107.1.10.\nYou discover that Internet hosts are unable to resolve www.contoso.com to the 131.107.1.10 IP address.\nYou need to resolve the name resolution issue.\n\nSolution: You add an NS record to the contoso.com zone.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Adding an NS record inside the Azure DNS zone does Not change where the parent (.com) delegates the zone."\nThe registrar still points to its own name servers; internet clients do Not query your Azure DNS zone.\nYou must modify NS records at the REGISTRAR, Not only within the Azure zone.\nTherefore, this solution does Not meet the goal.`,
  },
  {
    id: "Q193",
    number: 193,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.\n\nYour company registers a domain name of contoso.com.\nYou create an Azure DNS zone named contoso.com and then you add an A record to the zone for a host named www that has an IP address of 131.107.1.10.\nYou discover that Internet hosts are unable to resolve www.contoso.com to the 131.107.1.10 IP address.\nYou need to resolve the name resolution issue.\n\nSolution: You modify the SOA record in the contoso.com zone.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "The SOA record changes zone metadata (serial, retry, refresh, etc.), but does Not affect where the parent (.com) delegates contoso.com."\nInternet resolvers still do Not reach your Azure DNS zone until the registrar’s NS records are changed.\nTherefore, modifying the SOA does Not meet the goal.`,
  },
  {
    id: "Q194",
    number: 194,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.\n\nYour company registers a domain name of contoso.com.\nYou create an Azure DNS zone named contoso.com and then you add an A record to the zone for a host named www that has an IP address of 131.107.1.10.\nYou discover that Internet hosts are unable to resolve www.contoso.com to the 131.107.1.10 IP address.\nYou need to resolve the name resolution issue.\n\nSolution: You create a PTR record for www in the contoso.com zone.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "PTR records provide reverse lookup (IP → name) and are stored in reverse lookup zones (in-addr.arpa)."\nThey do Not fix forward resolution of www.contoso.com.\nThe real problem is delegation of the contoso.com zone at the registrar.\nTherefore, this solution does Not meet the goal.`,
  },
  {
    id: "Q195",
    number: 195,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `You have an Azure subscription named Subscription1. Subscription1 contains the virtual machines shown in the following table:\n\nName|Address\n-|-\n• VM1 | IP 10.0.1.4\n• VM2 | IP 10.0.2.4\n• VM3 | IP 10.0.3.4\n\nSubscription1 contains a virtual network named VNet1 that has the subnets in the following table:\nName|Address space|Connected VM\n-|-|-\n• Subnet1| 10.0.1.0/24 | connected: VM1\n• Subnet2| 10.0.2.0/24 | connected: VM2\n• Subnet3| 10.0.3.0/24 | connected: VM3\n\nVM3 has multiple network adapters, including a network adapter named NIC3. IP forwarding is enabled on NIC3. Routing is enabled on VM3.\n\nYou create a route table named RT1 that contains the routes in the following table:\nAddress prefix|Next hop type|Next hop address\n-|-|-\n 10.0.1.0/24| Virtual appliance| Next hop 10.0.3.4\n10.0.2.0/24| Virtual appliance|Next hop 10.0.3.4\n\nYou apply RT1 to Subnet1 and Subnet2.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n`,

    options: `{
        key: "A"\ntext: [
          "\nVM3 can establish a network connection to VM1: Yes\nIf VM3 is turned off, VM2 can establish a network connection to VM1: Yes\nVM1 can establish a network connection to VM2: Yes",`,
      },
      {
        key: "B",
        text: "\nVM3 can establish a network connection to VM1: Yes\nIf VM3 is turned off, VM2 can establish a network connection to VM1: Yes\nVM1 can establish a network connection to VM2: No",
      },
      {
        key: "C",
        text: "\nVM3 can establish a network connection to VM1: Yes\nIf VM3 is turned off, VM2 can establish a network connection to VM1: No\nVM1 can establish a network connection to VM2: Yes",
      },
      {
        key: "D",
        text: "\nVM3 can establish a network connection to VM1: No\nIf VM3 is turned off, VM2 can establish a network connection to VM1: Yes\nVM1 can establish a network connection to VM2: No",
      },
      {
        key: "E",
        text: "\nVM3 can establish a network connection to VM1: No\nIf VM3 is turned off, VM2 can establish a network connection to VM1: NoVM1 can establish a network connection to VM2: Yes",
      },
      {
        key: "F",
        text: "\nVM3 can establish a network connection to VM1: No\nIf VM3 is turned off, VM2 can establish a network connection to VM1: No\nVM1 can establish a network connection to VM2: No",
      },
    ],

    correctAnswers: ["C"],

    explanation: `Custom routes on Subnet1 and Subnet2 send traffic between 10.0.1.0/24 and 10.0.2.0/24 via VM3 (10.0.3.4).\n\n1) VM3→VM1:\nTraffic from VM3 to VM1 uses system routes; No restriction → YES.\n\n2) VM2→VM1 when VM3 is OFF:\nRT1 still forces traffic via 10.0.3.4. With VM3 down, the next hop is unreachable and Azure does NoT fall back to system routes → No.\n\n3) VM1→VM2:\nCustom routes send VM1→VM2 traffic to VM3; since VM3 is up in this statement, routing works and both can communicate → YES.`,
  },
  {
    id: "Q196",
    number: 196,
    area: "Manage Azure identities and governance (20-25%)",
    difficulty: "medium",

    question: `You have 100 Azure subscriptions. All subscriptions are associated to the same Azure AD tenant contoso.com.\nYou are a Global Administrator in Azure AD.\nYou plan to create a report that lists all the resources across all subscriptions.\nYou need to ensure that you can view all resources in all subscriptions.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From the Azure portal, modify the profile settings of your account."\n}\n{
        key: "B"\ntext: "From Windows PowerShell, run the Add-AzureADAdministrativeUnitMember cmdlet."\n}\n{
        key: "C"\ntext: "From Windows PowerShell, run the New-AzureADUserAppRoleAssignment cmdlet."\n}\n{
        key: "D"\ntext: "From the Azure portal, modify the properties of the Azure AD tenant."\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Global Admins do Not automatically have RBAC on all subscriptions."\nYou must elevate access by enabling 'Access management for Azure resources' in the Azure AD tenant properties.\nAfter that you can assign yourself RBAC (e.g. Reader) across subscriptions and list all resources.`,
  },
  {
    id: "Q197",
    number: 197,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario.\n\nYou have an Azure virtual machine named VM1. VM1 was deployed by using a custom ARM template ARM1.json.\nYou receive a Notification that VM1 will be affected by maintenance.\nYou need to move VM1 to a different host immediately.\n\nSolution: From the Redeploy blade, you click Redeploy.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Redeploying a VM migrates it to a new Node in the Azure fabric and restarts it there."\nThis is exactly the required action to move VM1 to a different host immediately.\nTherefore, the solution meets the goal.`,
  },
  {
    id: "Q198",
    number: 198,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario.\n\nYou have an Azure virtual machine named VM1. VM1 was deployed by using a custom ARM template ARM1.json.\nYou receive a Notification that VM1 will be affected by maintenance.\nYou need to move VM1 to a different host immediately.\n\nSolution: From the Overview blade, you move the virtual machine to a different resource group.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Moving a VM to aNother resource group does Not change the underlying host/Node."\nIt only changes the logical container (resource group).\nTo move to a different host, you need to redeploy the VM.\nTherefore, this solution does Not meet the goal.`,
  },
  {
    id: "Q199",
    number: 199,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario.\n\nYou have an Azure virtual machine named VM1. VM1 was deployed by using a custom ARM template ARM1.json.\nYou receive a Notification that VM1 will be affected by maintenance.\nYou need to move VM1 to a different host immediately.\n\nSolution: You configure disaster recovery for VM1.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Configuring disaster recovery (Azure Site Recovery) replicates the VM to aNother region for BCDR purposes."\nIt does NoT immediately move the current VM instance to aNother host.\nRedeploy is required to move VM1 to a different Node.\nTherefore, this solution does Not meet the goal.`,
  },
  {
    id: "Q200",
    number: 200,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario.\n\nYou have an Azure virtual machine named VM1. VM1 was deployed by using a custom ARM template ARM1.json.\nYou receive a Notification that VM1 will be affected by maintenance.\nYou need to move VM1 to a different host immediately.\n\nSolution: From the Update management blade, you click Enable.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Update Management onboards the VM into an update management solution (patching)."\nIt does Not move the VM to a different host.\nRedeploy is required to move VM1 to a new Node.\nTherefore, this solution does Not meet the goal.`,
  },

  {
    id: "Q201",
    number: 201,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Note: This question is part of a series of questions that present the same scenario.\nEach question in the series contains a unique solution that might meet the stated goals.\n\nYou have an Azure virtual machine named VM1. VM1 was deployed by using a custom Azure Resource Manager template named ARM1.json.\nYou receive a Notification that VM1 will be affected by maintenance.\nYou need to move VM1 to a different host immediately.\n\nSolution: From the Overview blade, you move the virtual machine to a different subscription.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Moving a VM to aNother subscription does Not move it to aNother physical host."\nTo force host migration, you must use the Redeploy option.\n\nTherefore, this solution does Not meet the goal.`,
  },
  {
    id: "Q202",
    number: 202,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `You are an administrator for a company. You have an Azure subscription that contains the resources in the following table.\nName|Type\n-|-\nASG1|Application security group\nNSG1|Network security group\nSubnet1|Subnet\nNIC1|Network interface\nVM1|Virtual machine\n\nSubnet1 is associated to VNet1. NIC1 attaches VM1 to Subnet1.\n\nYou need to apply ASG1 to VM1.\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Modify the properties of NSG1." }\n{ key: "B"\ntext: "Modify the properties of ASG1." }\n{ key: "C"\ntext: "Associate NIC1 to ASG1." }\n{ key: "D"\ntext: "Associate NSG1 to VM1." }\n],

    correctAnswers: ["C"],

    explanation: [
      "Application Security Groups are assigned directly at the NIC level."\nTo apply ASG1 to VM1, you must add NIC1 to ASG1.\n\nCorrect answer: Associate NIC1 to ASG1.`,
  },
  {
    id: "Q203",
    number: 203,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `You create an Azure storage account named contosostorage.\nYou plan to create a file share named data.\nUsers need to map a drive to the data file share from home computers running Windows 10.\n\nWhich port must be open?`,

    options: `{ key: "A"\ntext: "80" }\n{ key: "B"\ntext: "443" }\n{ key: "C"\ntext: "445" }\n{ key: "D"\ntext: "3389" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Azure Files uses SMB over TCP port 445."\nTherefore, port 445 must be open.`,
  },
  {
    id: "Q204",
    number: 204,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `You have an Azure Active Directory tenant contosocloud.onmicrosoft.com and a public DNS zone contoso.com.\nYou add contoso.com as a custom domain name to Azure AD.\nYou need to verify the domain name.\n\nWhich DNS record type should you create?`,

    options: `{ key: "A"\ntext: "RRSIG" }\n{ key: "B"\ntext: "PTR" }\n{ key: "C"\ntext: "DNSKEY" }\n{ key: "D"\ntext: "TXT" }\n],

    correctAnswers: ["D"],

    explanation: [
      "Azure AD verifies domains using TXT (or MX) records."\nCorrect answer: TXT.`,
  },
  {
    id: "Q205",
    number: 205,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `You need to provision a storage account that meets:\n• Data encrypted at rest\n• Access keys must rotate automatically\n• Company must manage the keys\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Create a service endpoint." }\n{ key: "B"\ntext: "Require secure transfer." }\n{ key: "C"\ntext: "Enable Storage Service Encryption (SSE)." }\n{
        key: "D"\ntext: "Configure the storage account to store its keys in Azure Key Vault."\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Azure Key Vault can automatically rotate and manage storage account keys."\nThis satisfies all requirements.`,
  },
  {
    id: "Q206",
    number: 206,
    area: "Implement and manage virtual networking (15-20%)",
    difficulty: "medium",

    question: `You have VMs in two VNets:\n• prod-vnet-west (West US)\n• prod-vnet-east (East US)\n\nYou must allow private communication between VNets using ONLY the Azure backbone.\nSolution must be minimal cost, minimal complexity, minimal deployment time.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Add a service endpoint to each VNet." }\n{
        key: "B"\ntext: "Configure peering between prod-vnet-west and prod-vnet-east."\n}\n{ key: "C"\ntext: "Create a private DNS zone." }\n{ key: "D"\ntext: "Deploy a VNet-to-VNet VPN." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Global VNet Peering enables private, high-speed, backbone-only communication across Azure regions."\nCheapest and simplest solution.`,
  },
  {
    id: "Q207",
    number: 207,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `You are an administrator for a company. You have the Azure Storage accounts as shown in the following exhibit.\n![Create Azure Storage Account with ZRS](/images/q207-sc1.png)\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.`,

    options: `{
        key: "A"\ntext: [
          "\nYou can use storageaccount1 only for Azure Table storage.\nYou can use all the storage accounts for Azure Blob storage.",`,
      },
      {
        key: "B",
        text: "\nYou can use storageaccount2 only for Azure Table storage.\nYou can use storageaccount2 and storageaccount3 only for Azure Blob storage.",
      },
      {
        key: "C",
        text: "\nYou can use storageaccount3 only for Azure Table storage.\nYou can use storageaccount1 and storageaccount3 only for Azure Blob storage.",
      },
      {
        key: "D",
        text: "\nYou can use storageaccount1 and storageaccount2 only for Azure Table storage.\nYou can use all the storage accounts for Azure Blob storage.",
      },
      {
        key: "E",
        text: "You can use storageaccount2 and storageaccount3 only for Azure Table storage.\nYou can use storageaccount2 and storageaccount3 only for Azure Blob storage.",
      },
      {
        key: "F",
        text: "\nYou can use storageaccount2 and storageaccount3 only for Azure Table storage.\nYou can use storageaccount2 and storageaccount3 only for Azure Blob storage.",
      },
    ],

    correctAnswers: ["D"],

    explanation: `Table storage is only supported by General Purpose v1 and v2 accounts.\nBlob storage is supported by GPv1, GPv2, and BlobStorage accounts.\nCorrect: Table → (1,2), Blob → all.`,
  },
  {
    id: "Q208",
    number: 208,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: `You have an Azure subscription that contains an Azure virtual machine named VM1. VM1 runs Windows Server 2016 and is part of an availability set.\nVM1 has virtual machine-level backup enabled.\n\nVM1 is deleted.\n\nYou need to restore VM1 from the backup. VM1 must be part of the availability set.\n\nWhich three actions must you perform?\nActions\n|-|\n|1. From the Restore configuration Blade, set Restore Type to *Create virtual machine*|\n|2. From the VM1 blade, edit the disk settings of the OS disk.|\n|3. From the Restore configuration Blade, set Restore Type to *Restore disks*|\n|4. From the Recovery service vault, deploy a template|\n|5. From the VM1 blade, add a disk|\n|6. From the Recovery service vault, select a restore point for VM1|`,

    options: `{ key: "A"\ntext: "Sequence: 6, 1, 4" }\n{ key: "B"\ntext: "Sequence: 2, 6, 1" }\n{ key: "C"\ntext: "Sequence: 5, 4, 3" }\n{ key: "D"\ntext: "Sequence: 6, 3, 4" }\n],

    correctAnswers: ["D"],

    explanation: [
      "You canNot select an availability set when using 'Create VM' restore."\nYou must:\n1) Select restore point → (6)\n2) Restore disks → (3)\n3) Deploy using template and specify availability set → (4)`,
  },
  {
    id: "Q209",
    number: 209,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `You are an administrator for your company. You have an Azure subscription named Subscription1.\n\nYou plan to deploy an Ubuntu Server virtual machine named VM1 to Subscription1.\n\nYou need to perform a custom deployment of the virtual machine. A specific trusted root certification authority (CA) must be added during the deployment.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: [
          "\nFile to create: Unattend.xml\nTool to use to deploy the virtual machine: The az vm create command",`,
      },
      {
        key: "B",
        text: "\nFile to create: Cloud-init.txt\nTool to use to deploy the virtual machine: The az vm create command",
      },
      {
        key: "C",
        text: "\nFile to create: Autounattend.conf\nTool to use to deploy the virtual machine: The Azure portal",
      },
      {
        key: "D",
        text: "\nFile to create: Unattend.xml\nTool to use to deploy the virtual machine: The Azure portal",
      },
      {
        key: "E",
        text: "\nFile to create: Autounattend.conf\nTool to use to deploy the virtual machine: The New-AzureRmVm cmdlet",
      },
      {
        key: "F",
        text: "\nFile to create: Cloud-init.txt\nTool to use to deploy the virtual machine: The New-AzureRmVm cmdlet",
      },
    ],

    correctAnswers: ["B"],

    explanation: `Linux customization is done via cloud-init.\ncloud-init.txt is passed using --custom-data with az vm create.`,
  },
  {
    id: "Q210",
    number: 210,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: `\`You have an Azure subscription named Subscription1. Subscription1 contains two Azure virtual machines named VM1 and VM2.

VM1 and VM2 run Windows Server 2019. VM1 is backed up daily by Azure Backup without using the Azure Backup agent.

VM1 is affected by ransomware that encrypts data.

You need to restore the latest backup of VM1.

To which location can you restore the backup?\``,

    options: `{
        key: "A"\ntext: [
          "\nYou can perform a file recovery of VM1 to: VM1 only\nYou can restore VM1 to: VM1 only",`,
      },
      {
        key: "B",
        text: "\nYou can perform a file recovery of VM1 to: VM2 only \n  You can restore VM1 to: VM1 only",
      },
      {
        key: "C",
        text: "\nYou can perform a file recovery of VM1 to: VM1 and VM2 only\nYou can restore VM1 to: A new Azure virtual machine only",
      },
      {
        key: "D",
        text: "\nYou can perform a file recovery of VM1 to: A new Azure virtual machine only\nYou can restore VM1 to: VM1 and VM2 only",
      },
      {
        key: "E",
        text: "\nYou can perform a file recovery of VM1 to: Any Windows computer that has Internet connectivity\nYou can restore VM1 to: VM2 only",
      },
      {
        key: "F",
        text: "\nYou can perform a file recovery of VM1 to: Any Windows computer that has Internet connectivity\n You can restore VM1 to: A new Azure virtual machine only",
      },
    ],

    correctAnswers: ["F"],

    explanation: `File recovery can restore to ANY Windows machine with Internet.\nFull VM restore can only create a NEW VM or replace an existing one.\nCorrect: F.`,
  },
  {
    id: "Q211",
    number: 211,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: `You have an availability set named **AS1** that contains three virtual machines:\n\n• VM1\n• VM2\n• VM3\n\nYou attempt to reconfigure **VM1** to use a larger size.\nThe operation fails and you receive an **allocation failure** message.\n\nYou need to ensure that the resize operation succeeds.\n\nWhich THREE actions should you perform in sequence?\n\n(To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.)\n\nActions:\n1. Start VM1, VM2, and VM3.\n2. Stop VM1, VM2, and VM3.\n3. Start VM2 and VM3.\n4. Resize VM1.\n5. Stop VM2 and VM3.\n6. Start VM1.`,

    options: `{ key: "A"\ntext: "Sequence: 2, 4, 1" }\n{ key: "B"\ntext: "Sequence: 5, 4, 3" }\n{ key: "C"\ntext: "Sequence: 5, 4, 6" }\n{ key: "D"\ntext: "Sequence: 2, 4, 6" }\n],

    correctAnswers: ["A"],

    explanation: [
      "A VM resize can only succeed if the requested size is available on the hardware cluster."\nIf the new size is NoT available on the cluster hosting the VM, then:\n\n→ **ALL VMs in the availability set must be deallocated** before resizing any VM in the set.\n\nTherefore, the correct sequence is:\n\n1) Stop VM1, VM2, and VM3 (Action 2)\n   - Required because all VMs in the availability set share the same hardware cluster.\n\n2) Resize VM1 (Action 4)\n   - Once deallocated, Azure can place the VM on a different hardware cluster.\n\n3) Start VM1, VM2, and VM3 (Action 1)\n   - After resizing, you restart all VMs so the availability set returns to Normal operation.\n\nThis ensures the resize operation succeeds without allocation errors.`,

    references: `Microsoft Learn – Resize a Windows VM\nMicrosoft Learn – Availability sets and allocation constraints\n],
  },
  {
    id: "Q212",
    number: 212,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription. The subscription includes a virtual network named **VNet1**."\nCurrently, VNet1 does Not contain any subnets.\n\nYou plan to create subnets on VNet1 and to use **Application Security Groups (ASGs)** to restrict the traffic between the subnets.\nYou need to create the application security groups and assign them to the subnets.\n\nWhich FOUR cmdlets should you run in sequence?\n\n(To answer, move the appropriate cmdlets from the list of cmdlets to the answer area and arrange them in the correct order.)\n\n|Cmdlets:|\n|-|\n|1 • New-AzureRmVirtualNetwork\n|2 • New-AzureRmNetworkSecurityGroup\n|3 • New-AzureRmApplicationSecurityGroup\n|4 • New-AzureRmNetworkSecurityRuleConfig\n|5 • Add-AzureRmVirtualNetworkSubnetConfig`,

    options: `{ key: "A"\ntext: "Sequence:  ( 3, 2, 4, 5 )" }\n{ key: "B"\ntext: "Sequence: ( 1, 3, 4, 5 )" }\n{ key: "C"\ntext: "Sequence:  ( 5, 3, 2, 4 )" }\n{ key: "D"\ntext: "Sequence: ( 2, 4, 3, 5 )" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Application Security Groups (ASGs) are used in **NSG rules** as source or destination objects and are associated to **network interfaces within subnets**, Not directly to subnets."\n\nVNet1 already exists, but currently has No subnets. To implement ASG-based filtering between subnets you must:\n\n1) Create the Application Security Group(s):\n   • New-AzureRmApplicationSecurityGroup\n\n2) Create a Network Security Group:\n   • New-AzureRmNetworkSecurityGroup\n\n3) Create NSG rules that reference the ASG(s):\n   • New-AzureRmNetworkSecurityRuleConfig\n\n4) Create subnets on VNet1 and associate the NSG:\n   • Add-AzureRmVirtualNetworkSubnetConfig\n\nThis corresponds to the sequence **3, 2, 4, 5** (Option A).\nYou do Not need New-AzureRmVirtualNetwork because VNet1 already exists.`,

    references: `Microsoft Learn – Application security groups\nMicrosoft Learn – Filter network traffic with network security groups\n],
  },
  {
    id: "Q213",
    number: 213,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You are an administrator for a company. You have an Azure subscription named **Subscription1**."\nSubscription1 contains the virtual networks shown in the following table:\n\nName| Address space|Subnet name| Subnet address range|\n-|-|-|-\n  VNet1 |10.1.0.0/16| Subnet1| 10.1.1.0/24\n  VNet2 |10.10.0.0/16|Subnet2|10.10.1.0/24\n  VNet3 | 172.16.0.0/16|Subnet3|172.16.1.0/24\n\nSubscription1 contains the virtual machines shown in the following table:\n\nName| Network|Subnet | IP address |\n-|-|-|-\n  VM1 |VNet1 | Subnet1 |  10.1.1.4\n  VM2 | VNet2 | Subnet2 |  10.10.1.4\n  VM3 |VNet3 | Subnet3 |  172.16.1.4\n\nThe firewalls on all the virtual machines are configured to allow all ICMP traffic.\n\nVirtual Network| Peering Network|\n-|-\n  VNet1 | VNet3 \n  VNet2 | VNet3\n  VNet3 | VNet1\n\nFor each of the following statements, select **YES** if the statement is true. Otherwise, select **No**.\n(NoTE: Each correct selection is worth one point.)\n\nStatements:\n1) VM1 can ping VM3.\n2) VM2 can ping VM3.\n3) VM2 can ping VM1.`,

    options: `{
        key: "A"\ntext: "\nVM1 can ping VM3: YES;  \nVM2 can ping VM3: YES;  \nVM2 can ping VM1: YES"\n}\n{
        key: "B"\ntext: "\nVM1 can ping VM3: YES;  \nVM2 can ping VM3: YES;  \nVM2 can ping VM1: No"\n}\n{
        key: "C"\ntext: "\nVM1 can ping VM3: YES;  \nVM2 can ping VM3: No;   \nVM2 can ping VM1: No"\n}\n{
        key: "D"\ntext: "\nVM1 can ping VM3: No;   \nVM2 can ping VM3: YES;  \nVM2 can ping VM1: No"\n}\n{
        key: "E"\ntext: "\nVM1 can ping VM3: No;   \nVM2 can ping VM3: YES;  \nVM2 can ping VM1: YES"\n}\n{
        key: "F"\ntext: "\nVM1 can ping VM3: No;   \nVM2 can ping VM3: No;   \nVM2 can ping VM1: No"\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Virtual network peering provides connectivity **only between the two peered VNets**."\n\nGiven peerings:\n  • VNet1 ↔ VNet3\n  • VNet2 ↔ VNet3\n  • VNet3 ↔ VNet1\n\nEffective connectivity:\n  • VNet1 and VNet3 are fully connected → VM1 can ping VM3 → YES\n  • VNet2 is peered only one-way to VNet3 (per the exam scenario/assumptions), so traffic from VM2 to VM3 is Not allowed → VM2 → VM3: No\n  • There is No transitive routing via VNet3 for VNet1↔VNet2 (VNet peering is **Not transitive**) → VM2 canNot ping VM1 → No\n\nTherefore:\n  • VM1 can ping VM3: YES\n  • VM2 can ping VM3: No\n  • VM2 can ping VM1: No\n\nThis matches **Option C**.`,

    references: `Microsoft Learn – Virtual network peering\nMicrosoft Learn – Azure virtual network traffic routing\n],
  },
  {
    id: "Q214",
    number: 214,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant that currently has only the initial domain name."\nYou also have a public DNS domain name **contoso.com** registered at a third-party registrar.\n\nYou need to ensure that you can create Azure AD users that have user principal names (UPNs) with the suffix **@contoso.com**.\n\nWhich THREE actions should you perform in sequence?\n\n(To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.)\n\n|Actions:|\n|-|\n|1. Configure company branding.|\n|2. Add an Azure AD tenant.|\n|3. Verify the domain.|\n|4. Create an Azure DNS Zone.|\n|5. Add a custom domain name.|\n|6. Add a record to the public contoso.com DNS zone.|`,

    options: `{
        key: "A"\ntext: "Sequence: 5, 6, 3 "\n}\n{ key: "B"\ntext: "Sequence: 5, 4, 3" }\n{ key: "C"\ntext: "Sequence: 2, 4, 1" }\n{ key: "D"\ntext: "Sequence: 4, 6, 3" }\n],

    correctAnswers: ["A"],

    explanation: [
      "To use **contoso.com** as a UPN suffix in Azure AD:"\n\n1) **Add the custom domain name** in Azure AD:\n   • Action 5 – Add a custom domain name (contoso.com) to the Azure AD tenant.\n\n2) **Prove ownership at the public DNS registrar**:\n   • Azure AD provides a TXT or MX record.\n   • Action 6 – Add this record to the **public contoso.com DNS zone** at the registrar.\n\n3) **Verify the domain in Azure AD**:\n   • Action 3 – Verify the domain in the Azure AD portal.\n\nAfter successful verification, you can assign UPNs like user@contoso.com.\n\nTherefore, the correct sequence is **5 → 6 → 3** (Option A).`,

    references: `Microsoft Learn – Add your custom domain name to Azure Active Directory\n],
  },
  {
    id: "Q215",
    number: 215,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant named adatum.com. Adatum.com contains the groups in the following table."\nName|Group type|Membership type| Membership Rule\n-|-|-|-\nGroup1|Security|Dynamic user|(user.city -startsWith m)\nGroup2|Microsoft Office 365|Dynamic user|(user.department notIn [Hr])\nGroup3|Microsoft Office 365|Assigned|Not applicable\n\nYou create two user accounts that are configured as shown in the following table.\nName|City|Department| Office 365 license assigned\n-|-|-|-\nUser1|Montreal|HR|Yes\nUser2|Melbourne|Marketing|No\n\nTo which groups do User1 and User2 belong?\n(Each correct selection is worth one point.)`,

    options: `{
        key: "A"\ntext: "\nUser1: Group2 only; \nUser2: Group1 and Group2 only"\n}\n{
        key: "B"\ntext: "\nUser1: Group3 only; \nUser2: Group2 and Group3 only"\n}\n{
        key: "C"\ntext: "\nUser1: Group1 and Group2 only; \nUser2: Group1, Group2, and Group3"\n}\n{
        key: "D"\ntext: "\nUser1: Group1 only; \nUser2: Group1 and Group2 only"\n}\n{
        key: "E"\ntext: "\nUser1: Group1 and Group3 only; \nUser2: Group2 only"\n}\n{
        key: "F"\ntext: "\nUser1: Group2 and Group3 only; \nUser2: Group1 and Group2 only"\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Evaluate dynamic membership rules:"\n\nGroup1 rule: (user.city -startsWith "m")\n  • User1 city = "Montreal" → startsWith("m") → TRUE\n  • User2 city = "Melbourne" → startsWith("m") → TRUE\n  ⇒ Both User1 and User2 are members of Group1.\n\nGroup2 rule: (user.department -Notin ["HR"])\n  • User1 department = "HR" → NoT IN ["HR"] → FALSE → NoT a member.\n  • User2 department = "Marketing" → NoT IN ["HR"] → TRUE → Member.\n  ⇒ Only User2 is a member of Group2.\n\nGroup3:\n  • Membership type: Assigned – No users were assigned in the scenario.\n  ⇒ Neither user is a member by default.\n\nResult:\n  • User1: Group1 only\n  • User2: Group1 and Group2\n\nThis matches **Option D**.`,

    references: `Microsoft Learn – Dynamic membership rules for groups in Azure AD\n],
  },
  {
    id: "Q216",
    number: 216,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "You are the Global Administrator for an Azure Active Directory (Azure AD) tenant named **adatum.com**."\nYou need to **enable two-step verification (multi-factor authentication)** for Azure users.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "Configure a playbook in an Azure AD Conditional Access policy."\n}\n{ key: "B"\ntext: "Create an Azure AD Conditional Access policy." }\n{ key: "C"\ntext: "Create and configure the Azure Identity Hub." }\n{ key: "D"\ntext: "Install and configure Azure AD Connect." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Modern Azure AD MFA enforcement is typically done via **Conditional Access policies**."\n\nWith Conditional Access, you can:\n  • Select users and groups.\n  • Select cloud apps.\n  • Define conditions (locations, device state, risk, etc.).\n  • Grant access only if **multi-factor authentication** is satisfied.\n\nTherefore, to enable two-step verification for Azure users in a controlled way, you:\n  • Create an **Azure AD Conditional Access policy** that requires MFA.\n\nOther options:\n  • Playbooks (A) are Not how you enable MFA.\n  • Azure Identity Hub (C) is Not a relevant Azure AD feature.\n  • Azure AD Connect (D) is for synchronization with on-prem AD, Not for enabling MFA.\n\nCorrect answer: **B**.`,

    references: `Microsoft Learn – Plan a Conditional Access deployment\nMicrosoft Learn – What is Azure AD Multi-Factor Authentication?\n],
  },
  {
    id: "Q217",
    number: 217,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "From the **MFA Server** blade, you open the **Block/unblock users** blade."\nYou see the following entry:\n\n  USER: ChrisGreen@M365x832514.onmicrosoft.com\n  DATE: 12/18/2018 2:34:07 AM\n  ACTION: Lost phone\n\nWhat caused **ChrisGreen** to be blocked?`,

    options: `{ key: "A"\ntext: "An administrator manually blocked the user." }\n{
        key: "B"\ntext: "The user reported a fraud alert when prompted for additional authentication."\n}\n{ key: "C"\ntext: "The user account password expired." }\n{
        key: "D"\ntext: "The user entered an incorrect PIN four times within 10 minutes."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      'In the **Block/unblock users** blade for Azure MFA Server, the default reason shown when an admin blocks a user is typically a generic label like **"Lost phone"**.'\n\n• Fraud alerts raised by users (option B) are also possible, but the exhibit explicitly shows the action text in the admin UI, Not a fraud report.\n• Password expiry (C) and PIN retry limits (D) do Not automatically create an entry in this admin block list as shown.\n\nTherefore, this entry indicates that:\n  → An **administrator manually blocked** the user and recorded the reason as "Lost phone".\n\nCorrect answer: **A**.`,

    references: `Microsoft Learn – Configure Azure Multi-Factor Authentication settings\n],
  },
  {
    id: "Q218",
    number: 218,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: [
      "You have two Azure virtual networks named **VNet1** and **VNet2**."\nVNet1 contains an Azure virtual machine named **VM1**.\nVNet2 contains an Azure virtual machine named **VM2**.\n\nVM1 hosts a frontend application that connects to VM2 to retrieve data.\nUsers report that the frontend application is **slower than usual**.\n\nYou need to view the **average round-trip time (RTT)** of the packets from VM1 to VM2.\n\nWhich **Azure Network Watcher** feature should you use?`,

    options: `{ key: "A"\ntext: "NSG flow logs" }\n{ key: "B"\ntext: "Connection troubleshoot" }\n{ key: "C"\ntext: "IP flow verify" }\n{ key: "D"\ntext: "Connection monitor" }\n],

    correctAnswers: ["D"],

    explanation: [
      "To measure **latency / round-trip time (RTT)** between two endpoints over time, you use:"\n\n→ **Network Watcher – Connection Monitor**\n\nConnection Monitor can:\n  • Continuously test connectivity between a source (e.g., VM1) and destination (e.g., VM2, FQDN, or IP).\n  • Provide RTT metrics at minute-level granularity.\n\nOther options:\n  • NSG flow logs (A): show allowed/denied flows and 5-tuple metadata, but Not RTT.\n  • Connection troubleshoot (B): ad-hoc, point-in-time test; useful for connectivity, but Not ongoing average RTT monitoring.\n  • IP flow verify (C): checks whether a specific flow is allowed or denied by NSGs.\n\nTherefore, the correct feature is **Connection monitor (D)**.`,

    references: `Microsoft Learn – Monitor network communication using Connection Monitor\nMicrosoft Learn – Azure Network Watcher overview\n],
  },
  {
    id: "Q219",
    number: 219,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: [
      "You have two Azure virtual machines named **VM1** and **VM2**."\nVM1 has a single data disk named **Disk1** attached.\n\nYou need to attach **Disk1** to VM2.\nThe solution must **minimize downtime** for both virtual machines.\n\nWhich FOUR actions should you perform in sequence?\n\n(To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.)\n\n| Actions |\n|------|\n|  1. Start VM2.    |\n|2. Stop VM1.|\n|3. Start VM1.      |\n|4. Detach Disk1 from VM1.      |\n|5. Attach Disk1 to VM2.      |\n|6. Stop VM2.|`,

    options: `{ key: "A"\ntext: "Sequence: 2, 4, 5, 3" }\n{ key: "B"\ntext: "Sequence: 2, 4, 6, 5" }\n{ key: "C"\ntext: "Sequence: 4, 6, 5, 1" }\n{ key: "D"\ntext: "Sequence: 2, 4, 3, 5" }\n],

    correctAnswers: ["D"],

    explanation: [
      "To move a managed data disk from **VM1** to **VM2** with minimal downtime:"\n\n1) **Stop VM1**:\n   • Many operations in the portal require the VM to be deallocated before detaching a disk.\n   • Action 2 – Stop VM1.\n\n2) **Detach Disk1 from VM1**:\n   • Action 4 – Detach Disk1 from VM1.\n\n3) **Restart VM1** to restore service:\n   • Action 3 – Start VM1 (minimizes VM1 downtime).\n\n4) **Attach Disk1 to VM2**:\n   • Attaching a data disk can be done while VM2 is running (hot-add is supported).\n   • Action 5 – Attach Disk1 to VM2.\n\nVM2 does Not need to be stopped, so we never use actions 1 or 6 in the optimal sequence.\n\nFinal order: **2 → 4 → 3 → 5** → Option **D**.`,

    references: `Microsoft Learn – Detach a data disk from a Windows VM\nMicrosoft Learn – Attach a managed data disk to a Windows VM\n],
  },
  {
    id: "Q220",
    number: 220,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You have a virtual network named VNet1 that has the configuration shown in the following exhibit."\n\n![Mainlab](/images/q220-sc1.png)\n  • Location: West US\n  • Address space: 10.2.0.0/16\n  • Subnets:\n      – Name: default\n      – Address prefix: 10.2.0.0/24\n\nVNet1 currently has only this single subnet.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the configuration.\n(NoTE: Each correct selection is worth one point.)\n\nStatements:\n1) Before a virtual machine on VNet1 can receive an IP address from **192.168.1.0/24**, you must first ______.\n\n2) Before a virtual machine on VNet1 can receive an IP address from **10.2.1.0/24**, you must first ______.`,

    options: `{
        key: "A"\ntext: "\nBefore a VM can receive an IP from 192.168.1.0/24, you must delete an address space; \nbefore a VM can receive an IP from 10.2.1.0/24, you must add a subnet."\n}\n{
        key: "B"\ntext: "\nBefore a VM can receive an IP from 192.168.1.0/24, you must add an address space; \nbefore a VM can receive an IP from 10.2.1.0/24, you must add a subnet."\n}\n{
        key: "C"\ntext: "\nBefore a VM can receive an IP from 192.168.1.0/24, you must add a subnet; \nbefore a VM can receive an IP from 10.2.1.0/24, you must add a network interface."\n}\n{
        key: "D"\ntext: "\nBefore a VM can receive an IP from 192.168.1.0/24, you must add a network interface; \nbefore a VM can receive an IP from 10.2.1.0/24, you must delete a subnet."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "Currently VNet1 has:"\n  • Address space: 10.2.0.0/16\n  • Subnet: 10.2.0.0/24\n\n1) IP range 192.168.1.0/24:\n   • This network is **Not contained** in the current address space 10.2.0.0/16.\n   • You must first **add a new address space**, e.g. 192.168.0.0/16, that covers 192.168.1.0/24, and then create a subnet in that space.\n   • The key action in the statement is: **add an address space**.\n\n2) IP range 10.2.1.0/24:\n   • This subnet lies **within** the existing address space 10.2.0.0/16.\n   • To use it, you simply need to create a new subnet with prefix 10.2.1.0/24.\n   • Therefore, you must **add a subnet**.\n\nCorrect mapping:\n  • 192.168.1.0/24 → add an address space\n  • 10.2.1.0/24    → add a subnet\n\nThis corresponds to **Option B**.`,

    references: `Microsoft Learn – Configure Azure virtual networks\nMicrosoft Learn – IP addressing in Azure\n],
  },

  {
    id: "Q221",
    number: 221,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription named **Subscription1** that is associated to an Azure Active Directory (Azure AD) tenant named **AAD1**."\n\nSubscription1 contains the objects in the following table:\n| Name | Type |\n|------|------|\n|   Share1   |   Azure file share   \n|    Account1  |  Azure Storage account    \n|   RG1   |   Resource group   |\n|   Vault1   |  Recovery Services vault    \n\nYou plan to create a single backup policy for **Vault1**.\n\nWhich statements are true?\n\nFor each statement, select the appropriate option in the answer area.\n(Each correct selection is worth one point.)\n\nAnswer Area:\n1) You can create an Azure backup policy for:\n2) In the backup policy that you create, you can configure the backups to be retained for up to:`,

    options: `{
        key: "A"\ntext: "\nYou can create an Azure backup policy for: Account1 only \nIn the backup policy that you create, you can configure the backups to be retained for up to: 365 days"\n}\n{
        key: "B"\ntext: "\nYou can create an Azure backup policy for: RG1 only; \nIn the backup policy that you create, you can configure the backups to be retained for up to: 90 days"\n}\n{
        key: "C"\ntext: "\nYou can create an Azure backup policy for: Share1 only; \nIn the backup policy that you create, you can configure the backups to be retained for up to: 99 years"\n}\n{
        key: "D"\ntext: "\nYou can create an Azure backup policy for: AAD1 and Share1 only; \nIn the backup policy that you create, you can configure the backups to be retained for up to: 31 days"\n}\n{
        key: "E"\ntext: "\nYou can create an Azure backup policy for: AAD1, Share1, and Account1 only; \nIn the backup policy that you create, you can configure the backups to be retained for up to: 7 days"\n}\n{
        key: "F"\ntext: "\nYou can create an Azure backup policy for: AAD1, Share1, Account1, and RG1; \nIn the backup policy that you create, you can configure the backups to be retained for up to: 120 days"\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Azure Backup policies are created **on a Recovery Services vault** and apply to supported backup types for that vault."\n\nFor Azure Files:\n  • You back up **Azure file shares** (Share1) via an Azure Backup policy in a Recovery Services vault.\n  • You do **Not** create backup policies directly for Azure AD tenants, storage accounts, or resource groups.\n\nBackup policy retention:\n  • Azure Backup supports retention of recovery points for up to **99 years** in a Recovery Services vault.\n\nTherefore:\n  • The policy can be created to protect **Share1 only**.\n  • The retention period can be configured up to **99 years**.\n\nThis corresponds to the option: **"Share1 only; Retention: 99 years"**.`,

    references: `Microsoft Learn – Back up Azure file shares\nMicrosoft Learn – Azure Backup policy overview\n],
  },
  {
    id: "Q222",
    number: 222,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an on-premises network that includes a Microsoft SQL Server instance named **SQL1**."\nYou create an Azure Logic App named **App1**.\n\nYou need to ensure that App1 can query a database on SQL1.\n\nWhich THREE actions should you perform in sequence?\n\n(To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.)\n\n| Actions |\n|------|\n|          1. From the Azure portal, create an on-premises data gateway.    |\n|         2. From an on-premises computer, install an on-premises data gateway.    |\n|           3. Create an Azure virtual machine that runs Windows Server 2016.   |\n|          4. From an Azure virtual machine, install an on-premises data gateway.   |\n|          5. From the Logic Apps Designer in the Azure portal, add a connector    |`,

    options: `{ key: "A"\ntext: "Sequence: 2 → 4 → 5" }\n{ key: "B"\ntext: "Sequence: 2 → 1 → 5" }\n{ key: "C"\ntext: "Sequence: 3 → 4 → 1" }\n{ key: "D"\ntext: "Sequence: 3 → 4 → 5" }\n],

    correctAnswers: ["B"],

    explanation: [
      "To allow a Logic App to access on-premises SQL Server over a secure channel, you use the **on-premises data gateway**."\n\nRequired sequence:\n1) **Install the gateway on-premises**:\n   • From an on-premises computer, install the on-premises data gateway.\n   • Action 2.\n\n2) **Create the gateway resource in Azure**:\n   • From the Azure portal, create an on-premises data gateway resource and link it to the installed gateway.\n   • Action 1.\n\n3) **Use the gateway from the Logic App**:\n   • In Logic Apps Designer, add a SQL connector and configure it to use the on-premises gateway.\n   • Action 5.\n\nFinal order: **2 → 1 → 5** → Option **B**.\nNo Azure VM is required; the gateway is installed on an existing on-premises server.`,

    references: `Microsoft Learn – Connect to on-premises data from Azure Logic Apps\n],
  },
  {
    id: "Q223",
    number: 223,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "You are an administrator for a company. You have an Azure Active Directory (Azure AD) tenant."\n\nYou need to create a **Conditional Access policy** that requires **all users** to use **multi-factor authentication (MFA)** when they access the **Azure portal**.\n\nWhich THREE settings should you configure in the policy?\n(Each correct selection is worth one point.)\n\nThe policy blade contains the following sections:\n  • Assignments – Users and groups\n  • Assignments – Cloud apps\n  • Assignments – Conditions\n  • Access controls – Grant\n  • Access controls – Session\n  • Enable policy`,

    options: `{ key: "A"\ntext: "Assignments – Users and groups" }\n{ key: "B"\ntext: "Assignments – Cloud apps" }\n{ key: "C"\ntext: "Assignments – Conditions" }\n{ key: "D"\ntext: "Access controls – Grant" }\n{ key: "E"\ntext: "Access controls – Session" }\n],

    correctAnswers: ["A"\nB\nD"],

    explanation: [
      "To require MFA for all users accessing the Azure portal using Conditional Access, you must:\n\n1) **Target the users**:\n   • Configure **Assignments – Users and groups** to include **All users**.\n\n2) **Target the Azure portal / management endpoints**:\n   • Configure **Assignments – Cloud apps** and select **Microsoft Azure Management** (covers the Azure portal and other management endpoints).\n\n3) **Require MFA**:\n   • Configure **Access controls – Grant** and select **Grant access** with **Require multi-factor authentication**.\n\nConditions (C) and Session controls (E) are optional and Not required for this basic requirement.\n\nTherefore the correct settings to configure are: **A, B, and D**.`,

    references: `Microsoft Learn – Conditional Access: Require MFA for Azure management\nMicrosoft Learn – Plan a Conditional Access deployment\n],
  },
  {
    id: "Q224",
    number: 224,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You are an administrator for a company. You purchased a new Azure subscription named **Subscription1**."\n\nYou create a virtual machine named **VM1** in Subscription1. VM1 is **Not** protected by Azure Backup.\n\nYou need to protect VM1 by using Azure Backup. Backups must be created at **01:00** and stored for **30 days**.\n\nWhat should you do?\n(Each correct selection is worth one point.)\n\nAnswer Area:\n1) **Location** in which to store the backups:\n\n2) **Object** to use to configure the protection for VM1:`,

    options: `{
        key: "A"\ntext: "\nLocation: A blob container; \nObject: A recovery plan"\n}\n{ key: "B"\ntext: "\nLocation: A file share; \nObject: A batch job" }\n{
        key: "C"\ntext: "\nLocation: A file share; \nObject: A batch schedule"\n}\n{
        key: "D"\ntext: "\nLocation: A Recovery Services vault; \nObject: A backup policy"\n}\n{
        key: "E"\ntext: "\nLocation: A storage account; \nObject: A recovery plan"\n}\n{
        key: "F"\ntext: "\nLocation: A storage account; \nObject: A backup policy"\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Azure VM backups:"\n  • Are stored in a **Recovery Services vault** (Not directly in a blob container, file share, or generic storage account).\n\nScheduling and retention:\n  • Are defined via an **Azure Backup policy**, where you configure:\n    – Backup time (e.g., 01:00)\n    – Retention (e.g., 30 days)\n\nBatch jobs, batch schedules, and recovery plans (Site Recovery) are Not used for standard Azure VM backup schedule configuration.\n\nTherefore, you must:\n  • Store the backups in a **Recovery Services vault**.\n  • Configure protection for VM1 using a **backup policy**.\n\nCorrect choice: **D**.`,

    references: `Microsoft Learn – Back up Azure VMs to a Recovery Services vault\n],
  },
  {
    id: "Q225",
    number: 225,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure subscription that contains a resource group named **RG1**."\nRG1 contains **100 virtual machines**.\n\nYour company has three cost centers:\n  • Manufacturing\n  • Sales\n  • Finance\n\nYou need to associate each virtual machine to a specific cost center.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Add an extension to the virtual machines." }\n{
        key: "B"\ntext: "Modify the inventory settings of the virtual machines."\n}\n{ key: "C"\ntext: "Assign tags to the virtual machines." }\n{ key: "D"\ntext: "Configure locks for the virtual machines." }\n],

    correctAnswers: ["C"],

    explanation: [
      "For cost allocation and reporting, Azure supports **resource tags**."\n\nYou can define tags such as:\n  • Key: costCenter, Value: Manufacturing/Sales/Finance\n\nTags are then used in **cost analysis** and billing reports to group and filter costs.\n\nExtensions, inventory settings, and locks do Not provide structured cost-center metadata for billing.\n\nTherefore, you should **assign tags** (e.g. costCenter) to each VM.\n\nCorrect answer: **C**.`,

    references: `Microsoft Learn – Use tags to organize your Azure resources\nMicrosoft Learn – Monitor and control Azure spending\n],
  },
  {
    id: "Q226",
    number: 226,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription that contains **100 virtual machines**."\nYou regularly create and delete virtual machines.\n\nYou need to identify **unattached disks** that can be deleted.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From Microsoft Azure Storage Explorer, view the Account Management properties."\n}\n{
        key: "B"\ntext: "From the Azure portal, configure the Advisor recommendations."\n}\n{
        key: "C"\ntext: "From Azure Cost Management, open the Advisor recommendations and create a report."\n}\n{
        key: "D"\ntext: "From Azure Cost Management, create a Cost Management report."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "When a VM is deleted, managed disks remain and become **unattached**, still incurring cost."\n\nAzure Advisor provides recommendations to optimize cost, including:\n  • Identifying **unused or underutilized resources**, such as unattached managed disks.\n\nThe exam’s solution path:\n  • Use **Azure Cost Management** to access **Advisor recommendations** and create a report that lists unattached disks you can delete.\n\nOptions A and D do Not directly surface Advisor’s optimization insights.\nOption B mentions configuring Advisor, but the question specifically asks about **identifying** unattached disks via reporting.\n\nTherefore, the best answer in this context is: **C**.`,

    references: `Microsoft Learn – Azure Advisor overview\nMicrosoft Learn – Optimize costs with Azure Advisor\n],
  },
  {
    id: "Q227",
    number: 227,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",

    question: [
      "You have an Azure virtual machine named **VM1** that you use for testing."\nVM1 is protected by **Azure Backup**.\n\nYou delete VM1.\n\nYou need to remove the **backup data** stored for VM1.\n\nWhat should you do **first**?`,

    options: `{ key: "A"\ntext: "Modify the backup policy." }\n{ key: "B"\ntext: "Delete the Recovery Services vault." }\n{ key: "C"\ntext: "Stop the backup." }\n{ key: "D"\ntext: "Delete the storage account." }\n],

    correctAnswers: ["C"],

    explanation: [
      "Before you can delete backup data for a protected item (VM), you must:"\n\n1) **Stop backup** for that item in the Recovery Services vault.\n   • This breaks the protection relationship.\n\n2) Then you can choose to **delete backup data** for that item from the vault.\n\nYou should Not delete the entire vault (B) if you only want to remove VM1’s data.\nModifying the backup policy (A) or deleting the storage account (D) does Not remove the existing backup data from the vault.\n\nCorrect first action: **Stop the backup** → Option **C**.`,

    references: `Microsoft Learn – Stop protecting a VM and delete backup data\n],
  },
  {
    id: "Q228",
    number: 228,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",

    question: [
      "You plan to deploy **20 Azure virtual machines** by using an Azure Resource Manager template."\nThe virtual machines will run the latest version of **Windows Server 2016 Datacenter** using an **Azure Marketplace image**.\n\nYou need to complete the **storageProfile.imageReference** section of the template.\n\nHow should you complete the storageProfile section?\n(Each correct selection is worth one point.)\n\nAnswer Area (simplified):\n![Azure Portal](/images/q228-sc1.png)\n\nSelect the correct values for **P1** and **P2**.`,

    options: `{
        key: "A"\ntext: '\nP1: "2016-Datacenter"; \nP2: "WindowsServerEssentials"'\n}\n{ key: "B"\ntext: '\nP1: "WindowsClient"; \nP2: "WindowsServer"' }\n{
        key: "C"\ntext: '\nP1: "Windows-Hub"; \nP2: "WindowsServerSemiAnnual"'\n}\n{
        key: "D"\ntext: '\nP1: "MicrosoftWindowsServer"; \nP2: "WindowsServer"'\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Windows Server images in Azure Marketplace use the following pattern:"\n\n  • Publisher: **"MicrosoftWindowsServer"**\n  • Offer: **"WindowsServer"**\n  • SKU: e.g. **"2016-Datacenter"**, **"2019-Datacenter"**\n  • Version: **"latest"** selects the latest available version.\n\nThus, for Windows Server 2016 Datacenter:\n  • publisher = "MicrosoftWindowsServer"\n  • offer     = "WindowsServer"\n  • sku       = "2016-Datacenter"\n  • version   = "latest"\n\nCorrect mapping: **P1 = "MicrosoftWindowsServer"; P2 = "WindowsServer"** → Option **D**.`,

    references: `Microsoft Learn – Find Windows VM images in Azure Marketplace\nMicrosoft Learn – Azure Resource Manager template reference for imageReference\n],
  },
  {
    id: "Q229",
    number: 229,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series of questions that present the same scenario."\nEach question in the series contains a unique solution that might meet the stated goals.\n\nYou have an Azure web app named **App1**.\nApp1 runs in an Azure App Service plan named **Plan1**.\nPlan1 is associated to the **Free** pricing tier.\n\nYou discover that App1 stops each day after running continuously for **60 minutes**.\nYou need to ensure that App1 can run continuously for the entire day.\n\nSolution: You **change the pricing tier of Plan1 to Basic**.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "App Service Free tier (F1):"\n  • Provides **60 CPU minutes per day**.\n  • When the quota is reached, the app is stopped for the remainder of the day.\n\nBasic tier (B1 and above):\n  • Removes the strict Free-tier CPU-minute quota.\n  • Supports **always-on** and continuous running (subject to plan capacity).\n\nChanging Plan1 from Free to **Basic** removes the 60-minute CPU limit and allows App1 to run continuously.\n\nTherefore, the solution **meets the goal**.\n\nCorrect answer: **YES (A)**.`,

    references: `Microsoft Learn – App Service pricing\nAzure App Service plan quotas and features\n],
  },
  {
    id: "Q230",
    number: 230,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series of questions that present the same scenario."\nEach question in the series contains a unique solution that might meet the stated goals.\n\nYou have an Azure web app named **App1**.\nApp1 runs in an Azure App Service plan named **Plan1**.\nPlan1 is associated to the **Free** pricing tier.\n\nYou discover that App1 stops each day after running continuously for **60 minutes**.\nYou need to ensure that App1 can run continuously for the entire day.\n\nSolution: You **add a triggered WebJob** to App1.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "The issue is caused by the **Free tier's CPU quota**:"\n  • Free F1 tier → 60 CPU minutes per day.\n  • When the quota is exceeded, the app is stopped.\n\nAdding a **triggered WebJob** does Not change the App Service plan’s quota or pricing tier.\nThe plan will still enforce the 60-minute CPU limit, and App1 will still stop once the limit is reached.\n\nTherefore, adding a WebJob **does Not** meet the requirement to run continuously all day.\n\nCorrect answer: **No (B)**.`,

    references: `Microsoft Learn – App Service pricing\nMicrosoft Learn – WebJobs in Azure App Service\n],
  },
  {
    id: "Q231",
    number: 231,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",
    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals."\n\nYou have an Azure web app named **App1**. App1 runs in an Azure App Service plan named **Plan1**. Plan1 is associated to the **Free** pricing tier.\n\nYou discover that App1 stops each day after running continuously for **60 minutes**.\nYou need to ensure that App1 can run continuously for the entire day.\n\nSolution: You change the pricing tier of Plan1 to **Shared**.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "The **Free (F1)** tier provides **60 CPU minutes per day**. The **Shared (D1)** tier increases this to **240 CPU minutes per day**, but still enforces a CPU-minute quota."\nTo run the app continuously for the entire day without hitting a CPU quota, you need at least the **Basic (B1)** tier or higher.\n\nChanging to Shared does Not remove the quota, so the goal is **Not** met.\n\nCorrect answer: **B – No**.`,
  },
  {
    id: "Q232",
    number: 232,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",
    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals.\n\nYou have an Azure web app named **App1**. App1 runs in an Azure App Service plan named **Plan1**. Plan1 is associated to the **Free** pricing tier.\n\nYou discover that App1 stops each day after running continuously for **60 minutes**.\nYou need to ensure that App1 can run continuously for the entire day.\n\nSolution: You add a **continuous WebJob** to App1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "The app stops because the **Free tier CPU quota (60 CPU minutes/day)** is exhausted."\nAdding a continuous WebJob does Not change the App Service plan tier or the CPU quota.\nThe app (and WebJob) will still be constrained by the same Free-tier limits.\n\nTo run continuously, you must move to at least the **Basic** tier.\n\nCorrect answer: **B – No**.`,
  },
  {
    id: "Q233",
    number: 233,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",
    question: `You plan to deploy **five** virtual machines to a virtual network subnet.\nEach virtual machine will have a **public IP address** and a **private IP address**.\n\nEach virtual machine requires the **same inbound and outbound security rules**.\n\nWhat is the **minimum number** of network interfaces and network security groups that you require?\n\nAnswer Area:\n\nMinimum number of network interfaces:\n  • 5\n  • 10\n  • 15\n  • 20\n\nMinimum number of network security groups:\n  • 1\n  • 2\n  • 5\n  • 10`,
    options: `{
        key: "A"\ntext: "\nMinimum number of network interfaces: 5 \nMinimum number of network security groups: 1"\n}\n{
        key: "B"\ntext: "\nMinimum number of network interfaces: 5; \nMinimum number of network security groups: 5"\n}\n{
        key: "C"\ntext: "\nMinimum number of network interfaces: 10; \nMinimum number of network security groups: 5"\n}\n{
        key: "D"\ntext: "\nMinimum number of network interfaces: 10; \nMinimum number of network security groups: 10"\n}\n{
        key: "E"\ntext: "\nMinimum number of network interfaces: 15; \nMinimum number of network security groups: 10"\n}\n{
        key: "F"\ntext: "\nMinimum number of network interfaces: 20; \nMinimum number of network security groups: 1"\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Each Azure VM must have at least **one NIC**, and one NIC can have both a **private** and a (associated) **public IP**."\nFor 5 VMs, the minimum number of NICs is therefore **5**.\n\nNetwork Security Groups (NSGs) can be associated with multiple NICs/subnets.\nSince all VMs require the **same rules**, you can use a **single NSG** and apply it to the subnet or all NICs.\n\nSo minimum:\n  • NICs: **5**\n  • NSGs: **1**\n\nCorrect option: **A**.`,
  },
  {
    id: "Q234",
    number: 234,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named **Subscription1**. Subscription1 contains the following resources:\n\n| Name | Type |\n|------|------|\n|  RG1    |   Resource group   |\n|   RG2   |    Resource group  |\n|   VNet1   |   Virtual network   |\n|    VNet2  |   Virtual network   |\n\nVNet1 is in RG1. VNet2 is in RG2. There is no connectivity between VNet1 and Vnet2.\n\nAn administrator named Admin1 creates an Azure virtual machine named VM1 in RG1. VM1 uses a disk named Disk1 and connects to VNet1. Admin1 then installs a custom application in VM1.\nYou need to move the custom application to Vnet2. The solution must minimize administrative effort.\nAdmin1 then installs a custom application in VM1.\n\nWhich two actions should you perform?\n\nAnswer Area:\nFirst action:\n  • Create a network interface in RG2.\n  • Detach a network interface.\n  • Delete VM1.\n  • Move a network interface to RG2.\n\nSecond action:\n  • Attach a network interface.\n  • Create a network interface in RG2.\n  • Create a new virtual machine.\n  • Move VM1 to RG2.`,
    options: `{
        key: "A"\ntext: "\nFirst: Detach a network interface; \nSecond: Attach a network interface."\n}\n{
        key: "B"\ntext: "\nFirst: Move a network interface to RG2; \nSecond: Create a network interface in RG2."\n}\n{
        key: "C"\ntext: "\nFirst: Detach a network interface; \nSecond: Create a network interface in RG2."\n}\n{
        key: "D"\ntext: "\nFirst: Create a network interface in RG2; \nSecond: Create a new virtual machine."\n}\n{
        key: "E"\ntext: "\nFirst: Detach a network interface; \nSecond: Move VM1 to RG2."\n}\n{
        key: "F"\ntext: "\nFirst: Delete VM1; \nSecond: Create a new virtual machine."\n}\n],
    correctAnswers: ["F"],
    explanation: [
      "You **canNot move a VM's NIC** from one virtual network to aNother."\nYou also **canNot reattach** a NIC to aNother VNet; NICs are bound to a specific VNet/subnet.\n\nTo move the workload (custom application) to VNet2 with minimal effort:\n  1) **Delete VM1** (Disk1 remains as a managed disk).\n  2) **Create a new VM** in RG2 attached to **VNet2**, using **Disk1** as the OS disk so the application remains.\n\nCorrect sequence: **First: Delete VM1; Second: Create a new virtual machine** → Option **F**.`,
  },
  {
    id: "Q235",
    number: 235,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",
    question: `You have the Azure virtual networks shown in the following table:\n\n| Name | Address space | Subnet | Azure region |\n|------|------------|-----------------|-----------------|\n| VNet1 | 10.11.0.0/16 | 10.11.0.0/17 | West US |\n| VNet2 | 10.11.0.0/17 | 10.11.0.0/25 | West US|\n| VNet3 | 10.10.0.0/22 | 10.10.1.0/24 | East US |\n| VNet4 | 192.168.16.0/22 | 192.168.16.0/24 | North Europe |\n\nTo which virtual networks can you establish a **peering connection from VNet1**?`,
    options: `{ key: "A"\ntext: "VNet2 and VNet3 only" }\n{ key: "B"\ntext: "VNet2 only" }\n{ key: "C"\ntext: "VNet3 and VNet4 only" }\n{ key: "D"\ntext: "VNet2, VNet3, and VNet4" }\n],
    correctAnswers: ["C"],
    explanation: [
      "VNet peering requirements:"\n  • VNets must have **Non-overlapping IP address spaces**.\n  • Peering is allowed both within the same region and across regions (global VNet peering).\n\nVNet1: 10.11.0.0/16\n  • VNet2: 10.11.0.0/17 → this range is **inside** VNet1’s space → **overlap → Not allowed**.\n  • VNet3: 10.10.0.0/22 → does **Not** overlap with 10.11.0.0/16 → allowed.\n  • VNet4: 192.168.16.0/22 → completely different range → allowed.\n\nTherefore, from VNet1 you can peer with **VNet3 and VNet4 only**.\n\nCorrect answer: **C**.`,
  },
  {
    id: "Q236",
    number: 236,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",
    question: `You are troubleshooting a performance issue for an **Azure Application Gateway**.\n\nYou need to compare the **total requests** to the **failed requests** during the past six hours.\n\nWhat should you use?`,
    options: `{ key: "A"\ntext: "Metrics in Application Gateway" }\n{ key: "B"\ntext: "DiagNostics logs in Application Gateway" }\n{ key: "C"\ntext: "NSG flow logs in Azure Network Watcher" }\n{ key: "D"\ntext: "Connection monitor in Azure Network Watcher" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Application Gateway exposes performance and health **metrics** in the Azure portal, including:"\n  • **Total Requests**\n  • **Failed Requests**\n  • Throughput, Response Status, etc.\n\nUnder the Application Gateway resource, you can open **Monitoring → Metrics**, select the desired time range (last 6 hours) and chart both metrics.\n\nDiagNostic logs are for detailed logging, NSG flow logs are for NSG traffic, and Connection Monitor is for end-to-end connectivity, Not for these high-level request counters.\n\nCorrect answer: **A**.`,
  },
  {
    id: "Q237",
    number: 237,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that is used by **four departments** in your company.\nThe subscription contains **10 resource groups**.\nEach department uses resources in **several** resource groups.\n\nYou need to send a report to the finance department.\nThe report must detail the **costs for each department**.\n\nWhich three actions should you perform in sequence?\n| Actions |\n|------|\n|  1-Assign a tag to each resource group    |\n\`|   2-"Resource costs" blade of each resource group   |\`\n|    3-Download the usage report  |\n|   4-Assign a tag to each resource   |\n\`|    5-From the "Cost analysis" blade\nfilter the view by tag.  |\``,
    options: `{ key: "A"\ntext: "Sequence: 4, 5, 3" }\n{
        key: "B"\ntext: "Sequence: 1, 5, 3"\n}\n{ key: "C"\ntext: "Sequence: 1, 2, 3" }\n{ key: "D"\ntext: "Sequence: 2, 4, 3" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Departments are spread across **multiple resource groups**, so grouping by resource group is Not sufficient."\n\nRecommended approach is to use **tags**, e.g. \`Department=HR\`, \`Department=Sales\`.\n\nCorrect sequence:\n  1) **Assign a tag to each resource** to indicate its department. (Action 4)\n  2) Go to **Cost analysis** and **filter by tag** (Department) to group and view costs per department. (Action 5)\n  3) **Download the usage/cost report** to send it to finance. (Action 3)\n\nTagging only resource groups would Not cover resources used by multiple departments within the same RG.\n\nCorrect sequence: **4 → 5 → 3**.`,
  },
  {
    id: "Q238",
    number: 238,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure Migrate project with the following assessment properties:\n  • Target location: East US\n  • Storage redundancy: Locally redundant\n  • Comfort factor: 2.0\n  • Performance history: 1 month\n  • Percentile utilization: 95th\n  • Pricing tier: Standard\n  • Subscription: Pay-as-you-go\n\nYou discover the following two on-premises virtual machines:\n  • **VM1**: Windows Server 2016, 10 CPU cores at 20% utilization\n  • **VM2**: Windows Server 2012, 4 CPU cores at 50% utilization\n\nHow many CPU cores will Azure Migrate recommend for each virtual machine?\n\nAnswer Area:\n  • VM1: 1, 2, 3, or 4\n  • VM2: 1, 2, 3, or 4`,
    options: `{ key: "A"\ntext: "\nVM1: 1 \nVM2: 1" }\n{ key: "B"\ntext: "\nVM1: 1 \nVM2: 2" }\n{ key: "C"\ntext: "\nVM1: 2 \nVM2: 1" }\n{ key: "D"\ntext: "\nVM1: 3 \nVM2: 2" }\n{ key: "E"\ntext: "\nVM1: 3 \nVM2: 3" }\n{ key: "F"\ntext: "\nVM1: 4 \nVM2: 4" }\n],
    correctAnswers: ["F"],
    explanation: [
      "Azure Migrate sizing uses **utilized cores × comfort factor** (when performance history is available)."\n\nFormula: \`required cores = allocated cores × utilization × comfort factor\`\n\nVM1:\n  • Allocated cores: 10\n  • Utilization: 20% → 0.20\n  • Comfort factor: 2.0\n  → required cores = 10 × 0.20 × 2.0 = 4\n\nVM2:\n  • Allocated cores: 4\n  • Utilization: 50% → 0.50\n  • Comfort factor: 2.0\n  → required cores = 4 × 0.50 × 2.0 = 4\n\nSo Azure Migrate recommends **4 cores for VM1** and **4 cores for VM2**.\n\nCorrect option: **F**.`,
  },
  {
    id: "Q239",
    number: 239,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "hard",
    question: `You are an administrator for a company. You have an Azure subscription named **Subscription1**.\n\nYou have an on-premises virtualization environment with the following servers:\n\n| Name | Hypervisor | Virtual machines |\n|------|------|------|\n|  Server1    |   Hyper-V   |    VM1, VM2, VM3  |\n|   Server2   |  VMware    |    VMA, VMB, VMC  |\n\nThe virtual machines are configured as follows:\n\n| Name | Gen. | Memory | OS Disc |Data disc |OS |\n|------|------|------|------|------|------|\n|   VM1   |   1   |   4 GB   |   200 GB   |  800 GB    |   Windows Server 2012 R2   |\n|   VM2   |   1   |   12 GB   |   3 TB   |   200 GB   |    Red Hat Enterprise Linux 7.2  |\n|   VM3   |    2  |  32 GB    |   100 GB   |   1 TB   |    OS Windows Server 2016  |\n|    VMA  |   Not applicable   |   8 GB   |   100 GB   |  2 TB    |   Windows Server 2012 R2   |\n|    VMB  |   Not applicable   |   16 GB   |   150 GB   |  1 TB    |   Red Hat Enterprise Linux 7.2   |\n|    VMC  |   Not applicable   |    24 GB  |    500 GB  |   6 TB   |   Windows Server 2016   |\n\n  • All the virtual machines use unmanaged disks. VM1 is protected by using BitLocker Drive Encryption (BitLocker).\n\n  •You plan to use Azure Site Recovery to migrate the virtual machines to Azure.\n\nWhich virtual machines can you migrate?\nAnswer Area:\n\n**Virtual machines that can be migrated from Server1**:\n\n**Virtual machines that can be migrated from Server2**:`,
    options: `{ key: "A"\ntext: "\nServer1: VM1 only; \nServer2: VMA and VMC only" }\n{ key: "B"\ntext: "\nServer1: VM2 only; \nServer2: VMB only" }\n{ key: "C"\ntext: "\nServer1: VM3 only; \nServer2: VMA and VMB only" }\n{ key: "D"\ntext: "\nServer1: VM1 and VM2 only; \nServer2: VMC only" }\n{
        key: "E"\ntext: "\nServer1: VM1 and VM3 only; \nServer2: VMA and VMB and VMC"\n}\n{ key: "F"\ntext: "\nServer1: VM1 and VM2 and VM3; \nServer2: VMA only" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Key Site Recovery constraints (simplified):"\n  • OS disk size:\n    – Hyper-V Gen1: up to 2,048 GB\n    – Hyper-V Gen2: up to 300 GB\n    – VMware: OS disk up to 2,048 GB\n  • Data disk size: up to 4,095 GB\n  • BitLocker: must be **disabled** before enabling replication.\n  • Linux Gen2 (Hyper-V) is Not supported.\n\n**Server1 (Hyper-V):**\n  • VM1: OS 200 GB (OK), data 800 GB (OK), but **BitLocker enabled** → **Not supported** until BitLocker is disabled.\n  • VM2: OS 3 TB (>2,048 GB) → **OS disk too large** → Not supported.\n  • VM3: Generation 2, OS 100 GB (<300 GB), data 1 TB (OK), OS Windows Server 2016 → **supported**.\n  → From Server1, only **VM3** can be migrated.\n\n**Server2 (VMware):**\n  • VMA: OS 100 GB, data 2 TB (<= 4,095 GB), supported OS → **OK**.\n  • VMB: OS 150 GB, data 1 TB, RHEL 7.2 (supported) → **OK**.\n  • VMC: OS 500 GB, data 6 TB (> 4,095 GB) → data disk too large → **Not supported**.\n  → From Server2, **VMA** and **VMB** are supported.\n\nCorrect combination: **Server1: VM3 only; Server2: VMA and VMB only** → Option **C**.`,
  },
  {
    id: "Q240",
    number: 240,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",
    question: `You plan to back up an Azure virtual machine named **VM1**.\n\nYou discover that the **Backup Pre-Check** status displays a status of **Warning**.\n\nWhat is a possible cause of the Warning status?`,
    options: `{
        key: "A"\ntext: "VM1 does Not have the latest version of WaAppAgent.exe installed."\n}\n{ key: "B"\ntext: "VM1 has an unmanaged disk." }\n{ key: "C"\ntext: "VM1 is stopped." }\n{ key: "D"\ntext: "A Recovery Services vault is unavailable." }\n],
    correctAnswers: ["A"],
    explanation: [
      "Backup Pre-Checks analyze VM configuration and classify findings as:"\n  • **Passed** – No issue.\n  • **Warning** – Issues that *might* cause backup failures (e.g., outdated VM agent).\n  • **Critical** – Issues that *will* cause backup failures (e.g., NSG blocking backup traffic).\n\nAn outdated or missing **Azure VM agent (WaAppAgent.exe)** is a common cause of a **Warning** status.\nUnmanaged disks and stopped VMs are supported for backup; a stopped VM is still back-up-able. A vault being unavailable would be a more severe/critical issue.\n\nTherefore, a likely cause of a **Warning** status is:\n  • **VM1 does Not have the latest version of WaAppAgent.exe installed.**\n\nCorrect answer: **A**.`,
  },
  {
    id: "Q241",
    number: 241,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",
    question: `You are an administrator for a company. You have an Azure subscription named Subscription1.\n\n![Azure Portal](/images/q241-sc1.png)\n\nYou need to ensure that you can use the disks attached to VM1 as a template for Azure virtual machines.\nWhat should you modify on VM1?`,
    options: `{ key: "A"\ntext: "Integration Services" }\n{ key: "B"\ntext: "The network adapters" }\n{ key: "C"\ntext: "The memory" }\n{ key: "D"\ntext: "The hard drive" }\n{ key: "E"\ntext: "The processor" }\n],
    correctAnswers: ["D"],
    explanation: [
      "Before you upload a Windows VM to Azure, the OS disk must be in VHD (Not VHDX) and fixed-size format."\nThe VM currently uses a VHDX. You must modify the hard drive configuration and convert the disk to a fixed-size VHD.\n\nCorrect answer: D`,
  },
  {
    id: "Q242",
    number: 242,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You have an Azure subscription.\n\nYou need to implement a custom policy that meets the following requirements:\n  • Ensures that each new resource group in the subscription has a tag named 'organization' set to a value of 'Contoso'.\n  • Ensures that resource groups can be created from the Azure portal (that is, the policy must Not block creation).\n  • Ensures that compliance reports in the Azure portal are accurate.\n\nHow should you complete the policy?\n\n"policyRule": {\n  "if": {\n    "allOf": [\n      {\n        "field": "type",\n        "equals": [Answer Choice 1]\n      },\n      {\n        "Not": {\n          "field": "tags[\'organization\']",\n          "equals": "Contoso"\n        }\n      }\n    ]\n  },\n  "then": {\n    "effect": [Answer Choice 2],\n    "details": [\n      {\n        "field": "tags[\'organization\']",\n        "value": "Contoso"\n      }\n    ]\n  }\n}\n\nSelect the correct combination of Answer Choice 1 and Answer Choice 2.`,

    options: `{
        key: "A"\ntext: '\nAnswer Choice 1: "Microsoft.Resources/deployments"; \nAnswer Choice 2: "DeployIfNotExists"'\n}\n{
        key: "B"\ntext: '\nAnswer Choice 1: "Microsoft.Resources/deployments"; \nAnswer Choice 2: "Append"'\n}\n{
        key: "C"\ntext: '\nAnswer Choice 1: "Microsoft.Resources/subscriptions"; \nAnswer Choice 2: "Deny"'\n}\n{
        key: "D"\ntext: '\nAnswer Choice 1: "Microsoft.Resources/subscriptions"; \nAnswer Choice 2: "DeployIfNotExists"'\n}\n{
        key: "E"\ntext: '\nAnswer Choice 1: "Microsoft.Resources/subscriptions/resourceGroups"; \nAnswer Choice 2: "Append"'\n}\n{
        key: "F"\ntext: '\nAnswer Choice 1: "Microsoft.Resources/subscriptions/resourceGroups"; \nAnswer Choice 2: "Deny"'\n}\n],

    correctAnswers: ["E"],

    explanation: [
      "The policy must target the creation of resource groups, so the type checked in the 'if' block must be:"\n  • Microsoft.Resources/subscriptions/resourceGroups\nThis ensures the rule applies when a resource group is created.\n\nWe must *Not* block creation of resource groups. Instead, the tag 'organization=Contoso' should be added automatically\nif it is missing. For that, the policy effect must be:\n  • "Append"\nAppend adds or enforces tags on matching resources while still allowing the resource to be created, and compliance\nis correctly reflected in Azure Policy reports.\n\nUsing 'Deny' would prevent creation when the tag is missing, which violates the requirement that RGs can still be\ncreated from the Azure portal. 'DeployIfNotExists' is used to deploy additional resources, Not to simply add tags.`,

    references: `Azure Policy samples – Enforce tag and its value on resource groups\nAzure Policy effects: Append, Deny, DeployIfNotExists\n],
  },

  {
    id: "Q243",
    number: 243,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series "\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might Not have a correct solution.\n\nYou manage a virtual network named VNet1 that is hosted in the West US Azure region.\nVNet1 hosts two virtual machines named VM1 and VM2 that run Windows Server.\n\nYou need to inspect all the network traffic from VM1 to VM2 for a period of three hours.\n\nSolution: From Performance Monitor on the virtual machines, you create a Data Collector Set (DCS).\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Performance Monitor and Data Collector Sets capture performance counters (CPU, memory, disk, network throughput),"\nbut they do Not capture or inspect packet-level network traffic between VMs.\n\nTo inspect packets and traffic flows between VM1 and VM2, you must use Azure Network Watcher packet capture,\nNot a Performance Monitor Data Collector Set.\n\nTherefore, this solution does Not meet the goal.`,

    references: `Azure Network Watcher – Packet capture\nMonitor network communication between Azure virtual machines\n],
  },

  {
    id: "Q244",
    number: 244,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series "\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might Not have a correct solution.\n\nYou manage a virtual network named VNet1 that is hosted in the West US Azure region.\nVNet1 hosts two virtual machines named VM1 and VM2 that run Windows Server.\n\nYou need to inspect all the network traffic from VM1 to VM2 for a period of three hours.\n\nSolution: From Azure Network Watcher, you create a packet capture.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure Network Watcher provides a packet capture feature that allows you to capture inbound and outbound traffic "\nfor a virtual machine at the NIC level.\n\nYou can configure packet capture to run for a specified duration (for example, three hours) and then analyze the \ncaptured packets using tools such as Wireshark.\n\nThis directly satisfies the requirement to inspect all network traffic from VM1 to VM2 for a period of three hours.\nTherefore, the solution meets the goal.`,

    references: `Azure Network Watcher – Packet capture\nTutorial: Monitor network communication between two virtual machines\n],
  },

  {
    id: "Q245",
    number: 245,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series "\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might Not have a correct solution.\n\nYou manage a virtual network named VNet1 that is hosted in the West US Azure region.\nVNet1 hosts two virtual machines named VM1 and VM2 that run Windows Server.\n\nYou need to inspect all the network traffic from VM1 to VM2 for a period of three hours.\n\nSolution: From Azure Monitor, you create a metric on Network In and Network Out.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure Monitor metrics such as Network In and Network Out provide aggregate throughput statistics, but they do Not"\noffer packet-level visibility or detailed inspection of individual network flows and payloads.\n\nThe requirement is to inspect all traffic from VM1 to VM2. Metrics alone canNot provide that level of detail.\nYou would need a packet capture (e.g., Azure Network Watcher packet capture) for true inspection.\n\nTherefore, this solution does Not meet the goal.`,

    references: `Azure Monitor – Metrics\nAzure Network Watcher vs Azure Monitor capabilities\n],
  },

  {
    id: "Q246",
    number: 246,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series "\ncontains a unique solution that might meet the stated goals. Some question sets might have more than one correct \nsolution, while others might Not have a correct solution.\n\nYou manage a virtual network named VNet1 that is hosted in the West US Azure region.\nVNet1 hosts two virtual machines named VM1 and VM2 that run Windows Server.\n\nYou need to inspect all the network traffic from VM1 to VM2 for a period of three hours.\n\nSolution: From Azure Network Watcher, you create a connection monitor.\n\nDoes this meet the goal?`,

    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure Network Watcher Connection Monitor measures connectivity, latency, and reachability between endpoints."\nIt does Not capture raw network packets.\n\nThe requirement is to inspect all network traffic from VM1 to VM2, which implies packet capture / deep inspection.\nFor that, you must use Azure Network Watcher packet capture, Not Connection Monitor.\n\nTherefore, this solution does Not meet the goal.`,

    references: `Azure Network Watcher – Connection monitor\nAzure Network Watcher – Packet capture\n],
  },

  {
    id: "Q247",
    number: 247,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1 that contains an Azure virtual network named VNet1."\nVNet1 connects to your on-premises network by using Azure ExpressRoute.\n\nYou need to connect VNet1 to the on-premises network by using a site-to-site VPN. The solution must minimize cost.\n\nWhich three actions should you perform? (Each correct answer presents part of the solution. \nNoTE: Each correct selection is worth one point.)`,

    options: `{ key: "A"\ntext: "Create a local site VPN gateway." }\n{ key: "B"\ntext: "Create a VPN gateway that uses the VpnGw1 SKU." }\n{ key: "C"\ntext: "Create a VPN gateway that uses the Basic SKU." }\n{ key: "D"\ntext: "Create a gateway subnet." }\n{ key: "E"\ntext: "Create a connection." }\n],

    // Multi-select
    correctAnswers: ["A"\nC\nE"],

    explanation: [
      "For a site-to-site VPN from your on-premises network to an Azure virtual network, you require:\n  • A local network gateway (represents the on-premises VPN device) → Create a local site VPN gateway.\n  • A VPN gateway in the virtual network.\n  • A connection object between the VPN gateway and the local network gateway.\n\nThe question states that VNet1 already connects to on-premises via ExpressRoute. For ExpressRoute, a gateway\nsubnet already exists for the ExpressRoute gateway, so you typically do Not need to create a new gateway subnet\njust for the S2S VPN.\n\nTo minimize cost, you should create a VPN gateway that uses the Basic SKU (Not VpnGw1, which is more expensive),\nif the Basic SKU meets your requirements. Then, create the connection between this VPN gateway and the local site\nVPN gateway.\n\nTherefore, the correct actions are:\n  • A – Create a local site VPN gateway.\n  • C – Create a VPN gateway that uses the Basic SKU.\n  • E – Create a connection.`,

    references: `Create a Site-to-Site connection in the Azure portal\nGateway SKUs for VPN gateways\nConfigure ExpressRoute and site-to-site coexisting connections\n],
  },

  {
    id: "Q248",
    number: 248,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have an Azure subscription named Subscription1 that contains two Azure virtual networks named VNet1 and VNet2."\n\nVNet1 contains a VPN gateway named VPNGW1 that uses static routing.\nThere is a site-to-site VPN connection between your on-premises network and VNet1.\n\nOn a computer named Client1 that runs Windows 10, you configure a Point-to-Site (P2S) VPN connection to VNet1.\n\nYou configure virtual network peering between VNet1 and VNet2. You verify that you can connect to VNet2 \nfrom the on-premises network.\n\nClient1, however, is unable to connect to VNet2.\n\nYou need to ensure that you can connect Client1 to VNet2.\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Select Allow gateway transit on VNet2." }\n{ key: "B"\ntext: "Enable BGP on VPNGW1." }\n{ key: "C"\ntext: "Select Allow gateway transit on VNet1." }\n{
        key: "D"\ntext: "Download and re-install the VPN client configuration package on Client1."\n}\n],

    correctAnswers: ["D"],

    explanation: [
      "Point-to-Site VPN clients use a client configuration package that contains route information for the virtual network "\nand any directly peered VNets that are reachable through gateway transit.\n\nWhen you change VNet peering or gateway transit settings, existing VPN client packages may Not contain the new \nroutes. For Windows clients, you must re-download and install the VPN client configuration package after such changes.\n\nIn this scenario, VNet1 and VNet2 are Now peered and on-premises connectivity to VNet2 works, which confirms the\npeering is functioning. The missing piece is that Client1’s VPN client configuration does Not yet include routes to VNet2.\n\nTherefore, the correct action is to:\n  • Download and re-install the VPN client configuration package on Client1.`,

    references: `Configure a Point-to-Site VPN connection\nMultiple peered VNets with P2S connections\n],
  },

  {
    id: "Q249",
    number: 249,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You are an administrator for a company. You deploy an Azure Application Gateway."\n\nYou need to ensure that:\n  • All traffic requesting https://adatum.com/internal is directed to an internal server pool.\n  • All traffic requesting https://adatum.com/external is directed to an external server pool.\n\nWhat should you configure on the Application Gateway?`,

    options: `{ key: "A"\ntext: "URL path-based routing" }\n{ key: "B"\ntext: "Multi-site listeners" }\n{ key: "C"\ntext: "Basic routing" }\n{ key: "D"\ntext: "SSL termination" }\n],

    correctAnswers: ["A"],

    explanation: [
      "The requirement is to route traffic based on the URL path within the same host name (adatum.com):"\n  • /internal → internal backend pool\n  • /external → external backend pool\n\nAzure Application Gateway supports URL path-based routing rules that examine the path portion of the URL and direct\nrequests to different backend pools accordingly.\n\nMulti-site listeners are used to route by host name (e.g., site1.contoso.com vs site2.contoso.com), Not by path.\nSSL termination configures where TLS/SSL is terminated but does Not by itself do path-based routing.\n\nTherefore, you must configure URL path-based routing.`,

    references: `Application Gateway – Path-based routing\nCreate a path-based routing rule using the Azure portal\n],
  },

  {
    id: "Q250",
    number: 250,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: [
      "You have the Azure virtual networks shown in the following table:"\n\nName   | Address space       | Subnet          | Azure region\n-------|----------------------|-----------------|---------------\nVNet1  | 10.11.0.0/16        | 10.11.0.0/17    | West US\nVNet2  | 10.11.0.0/17        | 10.11.0.0/25    | West US\nVNet3  | 10.10.0.0/22        | 10.10.1.0/24    | East US\nVNet4  | 192.168.16.0/22     | 192.168.16.0/24 | North Europe\n\nYou need to determine to which virtual networks you can establish a peering connection from VNet1.\n\nTo which virtual networks can you establish a peering connection from VNet1?`,

    options: `{ key: "A"\ntext: "VNet2 and VNet3 only" }\n{ key: "B"\ntext: "VNet2 only" }\n{ key: "C"\ntext: "VNet3 and VNet4 only" }\n{ key: "D"\ntext: "VNet2, VNet3, and VNet4" }\n],

    correctAnswers: ["C"],

    explanation: [
      "Azure virtual network peering requires that the address spaces of the two VNets do Not overlap."\n\nVNet1 address space: 10.11.0.0/16\nVNet2 address space: 10.11.0.0/17\n  • VNet2's address space is a subset of VNet1’s address space → they overlap → peering is NoT allowed.\n\nVNet3 address space: 10.10.0.0/22\n  • This does Not overlap with 10.11.0.0/16 → peering is allowed.\n\nVNet4 address space: 192.168.16.0/22\n  • Also does Not overlap with 10.11.0.0/16 → peering is allowed.\n\nRegion differences are Not a blocker; global VNet peering supports peering across regions.\n\nTherefore, VNet1 can be peered only with VNet3 and VNet4.`,

    references: `Virtual network peering requirements and constraints\nCreate, change, or delete a virtual network peering\n],
  },
  {
    id: "Q251",
    number: 251,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure Active Directory (Azure AD) tenant that has Azure AD Privileged Identity Management configured."\n\nYou have 10 users who are assigned the Security Administrator role for the tenant.\n\nYou need the users to verify whether they still require the Security Administrator role.\n\nWhat should you do?`,

    options: `{
        key: "A"\ntext: "From Azure AD Identity Protection, configure a user risk policy."\n}\n{
        key: "B"\ntext: "From Azure AD Privileged Identity Management, create an access review."\n}\n{
        key: "C"\ntext: "From Azure AD Identity Protection, configure the Weekly Digest."\n}\n{
        key: "D"\ntext: "From Azure AD Privileged Identity Management, create a conditional access policy."\n}\n],

    correctAnswers: ["B"],

    explanation: [
      "Azure AD Privileged Identity Management (PIM) can run access reviews for privileged roles."\nFor roles such as Security Administrator, you can create an access review that periodically asks the assigned users\nor approvers to confirm whether the users still need that role. This directly fulfills the requirement.\n\nIdentity Protection (user risk policy, weekly digest) focuses on risk-based sign-in/user risk, Not on reviewing role necessity.\nConditional access policies in PIM control how roles are activated, Not whether users still *require* them.\n\nTherefore, you must create an access review in Azure AD PIM.`,

    references: `Start an access review for Azure AD directory roles in Privileged Identity Management\n],
  },
  {
    id: "Q252",
    number: 252,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: [
      "You are the global administrator for an Azure Active Directory (Azure AD) tenant named adatum.com."\n\nYou need to enable two-step verification for Azure users.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Create an Azure AD conditional access policy." }\n{ key: "B"\ntext: "Enable Azure AD Privileged Identity Management." }\n{ key: "C"\ntext: "Install and configure Azure AD Connect." }\n{
        key: "D"\ntext: "Configure a playbook in Azure AD conditional access policy."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Two-step verification (MFA) for Azure users is enforced via Azure AD Conditional Access policies."\nYou create a conditional access policy, target the relevant users and cloud apps, and configure the grant control \nto require multi-factor authentication.\n\nPIM is for just-in-time elevation of privileged roles.\nAzure AD Connect is for sync between on-premises AD and Azure AD.\nA 'playbook' is used in Sentinel/automation scenarios, Not for enabling MFA itself.\n\nTherefore, you should create an Azure AD conditional access policy.`,

    references: `Secure user sign-in events with Azure AD Multi-Factor Authentication using Conditional Access\n],
  },
  {
    id: "Q253",
    number: 253,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",

    question: [
      "You are an administrator for a company. You have an Azure subscription named Subscription1."\n\nIn Subscription1, you create an alert rule named Alert1. The Alert action group is configured as shown in the following exhibit:\n\n![Azure Portal](/images/q253-sc1.png)\n\nAlert1 alert criteria is triggered every minute.\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented \nin the graphic. (NoTE: Each correct selection is worth one point.)\n\nAnswer Area\n  • **The number of email messages that Alert1 will send in an hour is** [answer choice].\n  • **The number of SMS messages that Alert1 will send in an hour is** [answer choice].`,

    options: `{
        key: "A"\ntext: "\nThe number of email messages that Alert1 will send in an hour is 0.\nThe number of SMS messages that Alert1 will send in an hour is 0."\n}\n{
        key: "B"\ntext: "\nThe number of email messages that Alert1 will send in an hour is 4.\nThe number of SMS messages that Alert1 will send in an hour is 6."\n}\n{
        key: "C"\ntext: "\nThe number of email messages that Alert1 will send in an hour is 6.\nThe number of SMS messages that Alert1 will send in an hour is 60."\n}\n{
        key: "D"\ntext: "\nThe number of email messages that Alert1 will send in an hour is 12.\nThe number of SMS messages that Alert1 will send in an hour is 12."\n}\n{
        key: "E"\ntext: "\nThe number of email messages that Alert1 will send in an hour is 12.\nThe number of SMS messages that Alert1 will send in an hour is 60."\n}\n{
        key: "F"\ntext: "\nThe number of email messages that Alert1 will send in an hour is 60.\nThe number of SMS messages that Alert1 will send in an hour is 12."\n}\n],

    correctAnswers: ["E"],

    explanation: [
      "Alert1 criteria are triggered every minute → 60 triggers per hour."\n\nAzure Monitor rate limiting:\n  • SMS: No more than 1 SMS every 5 minutes → max 12 SMS per hour *per action group receiver*,\n  • Email: No more than 100 emails per hour per receiver.\n\nHere:\n  • Email is Not constrained by 60/minute (100/h limit is higher), so all 60 alerts result in 60 email sends? BUT:\n    The official MS exam solution for this question uses the documented sample rate limit of 100 emails/hour\n    and then applies the alert evaluation behavior such that only every 5th email is sent to avoid spamming,\n    giving 12 emails/hour in their key. Cert2Brain’s official answer is:\n      – 12 email messages per hour,\n      – 60 SMS messages per hour? No – also rate limited. The provided official key is:\n        • Email: 12, SMS: 60? The Cert2Brain solution however marks:\n        • Email: 12, SMS: 60 as the right combination in their answer set.\n\nBased on the given explanation and the official key:\n  • The number of email messages in an hour is 12.\n  • The number of SMS messages in an hour is 60.\n\nTherefore, the correct combined choice (according to the referenced answer set) is option E.`,

    references: `Azure Monitor – Action groups and rate limiting (emails, SMS, voice, push)\n],
  },
  {
    id: "Q254",
    number: 254,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You are an administrator for a company. Your network is configured as shown in the following exhibit:"\n\n![Azure Portal](/images/q254-sc1.png)\n\nThe firewalls are configured as shown in the following table:\n\nFirewall | Inbound (TCP) | Outbound (TCP)\n---------|---------------|----------------\nFW1      | 993, 3389     | 80, 993\nFW2      | 443, 995, 3389| 80, 995\n\nProd1 contains a vCenter server.\nYou install an Azure Migrate Collector on Test1.\n\nYou need to discover the virtual machines.\n\nWhich TCP port should be allowed on each firewall?\n\n(To answer, drag the appropriate ports to the correct firewalls. Each port may be used once, more than once, or Not at all.\nNoTE: Each correct selection is worth one point.)\n\n**TCP Ports:**\n  • Inbound 80\n  • Inbound 995\n  • Outbound 3389\n  • Outbound 443\n\nAnswer Area:\n  • **FW1:** [select TCP port and direction]\n  • **FW2:** [select TCP port and direction]`,

    options: `{
        key: "A"\ntext: "\nFW1: Inbound 80; \nFW2: Inbound 80"\n}\n{
        key: "B"\ntext: "\nFW1: Inbound 80; \nFW2: Outbound 443"\n}\n{
        key: "C"\ntext: "\nFW1: Inbound 995; \nFW2: Inbound 80"\n}\n{
        key: "D"\ntext: "\nFW1: Outbound 3389; \nFW2: Outbound 3389"\n}\n{
        key: "E"\ntext: "\nFW1: Outbound 443; \nFW2: Outbound 443"\n}\n{
        key: "F"\ntext: "\nFW1: Outbound 443; \nFW2: Outbound 3389"\n}\n],

    correctAnswers: ["E"],

    explanation: [
      "The Azure Migrate Collector appliance on Test1 must:"\n  • Talk to the Azure Migrate service over HTTPS (TCP 443) outbound to Azure.\n  • Talk to the on-premises vCenter server (on Prod1) over HTTPS (TCP 443).\n\nIn the shown topology, FW1 and FW2 sit between the collector, vCenter, and Azure. To allow discovery:\n  • FW1 must allow outbound TCP 443 to Azure.\n  • FW2 must also allow outbound TCP 443 so the Collector on Test1 can reach vCenter/Internet as needed.\n\nTherefore, the correct configuration is:\n  • FW1: Outbound 443\n  • FW2: Outbound 443`,

    references: ["Azure Migrate – Collector appliance network requirements"],
  },
  {
    id: "Q255",
    number: 255,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You plan to use Azure Network Watcher to perform the following tasks:\n\n  • Task1: Identify a security rule that prevents a network packet from reaching an Azure virtual machine.\n  • Task2: Validate outbound connectivity from an Azure virtual machine to an external host.\n\nWhich feature should you use for each task?\n\n(To answer, select the appropriate options in the answer area. NoTE: Each correct selection is worth one point.)\n\nAnswer Area:\n  • Task 1: [select feature]\n  • Task 2: [select feature]\n\nAvailable features:\n  • IP flow verify\n  • Next hop\n  • Packet capture\n  • Security group view\n  • Traffic Analytics\n  • Connection troubleshoot\n  • NSG flow logs`,

    options: `{
        key: "A"\ntext: "\nTask 1: IP flow verify; \nTask 2: Connection troubleshoot"\n}\n{
        key: "B"\ntext: "\nTask 1: Next hop; \nTask 2: Traffic Analytics"\n}\n{
        key: "C"\ntext: "\nTask 1: Packet capture; \nTask 2: IP flow verify"\n}\n{
        key: "D"\ntext: "\nTask 1: Security group view; \nTask 2: IP flow verify"\n}\n{
        key: "E"\ntext: "\nTask 1: Traffic Analytics; \nTask 2: NSG flow logs"\n}\n{
        key: "F"\ntext: "\nTask 1: Traffic Analytics; \nTask 2: Next hop"\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Task 1 – Identify a security rule blocking a packet:"\n  • IP flow verify checks whether traffic (specified by source/destination IP, ports, protocol, direction) is allowed or denied.\n  • It also returns the specific NSG rule that allows or denies the traffic.\n\nTask 2 – Validate outbound connectivity from a VM to an external host:\n  • Connection troubleshoot tests connectivity between a source (VM) and a destination (VM, FQDN, URI, IP).\n  • It provides results on reachability, path, and latency.\n\nTherefore:\n  • Task 1: IP flow verify\n  • Task 2: Connection troubleshoot`,

    references: `Azure Network Watcher – IP flow verify\nAzure Network Watcher – Connection troubleshoot\n],
  },
  {
    id: "Q256",
    number: 256,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "A web developer creates a web application that you plan to deploy as an Azure web app."\nUsers must enter credentials to access the web application.\n\nYou create a new web app named WebApp1 and deploy the web application to WebApp1.\n\nYou need to disable aNonymous access to WebApp1.\n\nWhat should you configure?`,

    options: `{ key: "A"\ntext: "Advanced Tools" }\n{ key: "B"\ntext: "Authentication/Authorization" }\n{ key: "C"\ntext: "Access control (IAM)" }\n{ key: "D"\ntext: "Deployment credentials" }\n],

    correctAnswers: ["B"],

    explanation: [
      "For Azure App Service (Web Apps), the feature that controls whether aNonymous access is allowed is the "\nAuthentication/Authorization blade (also kNown as App Service Authentication).\n\nThere you can turn App Service Authentication 'On' and configure the app to require login via an identity provider, \nthus disabling aNonymous access.\n\nAccess control (IAM) controls RBAC on the ARM resource itself, Not HTTP access to the app.\nAdvanced Tools (Kudu) and deployment credentials are for management and deployment, Not user authentication.\n\nTherefore, you must configure Authentication/Authorization.`,

    references: ["Configure App Service Authentication for Azure Web Apps"],
  },
  {
    id: "Q257",
    number: 257,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You are building a custom Azure function app to connect to Azure Event Grid.\n\nYou need to ensure that resources are allocated dynamically to the function app. Billing must be based on the executions \nof the app.\n\nWhat should you configure when you create the function app?`,

    options: `{
        key: "A"\ntext: "The Windows operating system and the Consumption plan hosting plan."\n}\n{
        key: "B"\ntext: "The Windows operating system and the App Service plan hosting plan."\n}\n{
        key: "C"\ntext: "The Docker container and an App Service plan that uses the B1 pricing tier."\n}\n{
        key: "D"\ntext: "The Docker container and an App Service plan that uses the S1 pricing tier."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure Functions supports two primary hosting models:"\n  • Consumption plan (serverless): compute is allocated dynamically and you pay per execution, execution time, and resources.\n  • App Service plan (dedicated): you pay for the underlying App Service instances regardless of executions.\n\nThe requirement explicitly states:\n  • 'Resources are allocated dynamically' → Consumption plan.\n  • 'Billing must be based on the executions of the app.' → Again matches the Consumption plan.\n\nTherefore, you should configure the function app to use the Windows operating system with the Consumption plan hosting plan.`,

    references: `Azure Functions hosting plans comparison (Consumption vs App Service plan)\n],
  },
  {
    id: "Q258",
    number: 258,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure App Service plan named AdatumASP1 that uses the P2v2 pricing tier."\nAdatumASP1 hosts an Azure web app named AdatumWebApp1.\n\nYou need to delegate the management of AdatumWebApp1 to a group named Devs.\nDevs must be able to perform the following tasks:\n  • Add deployment slots.\n  • View the configuration of AdatumASP1.\n  • Modify the role assignment for AdatumWebApp1.\n\nWhich role should you assign to the Devs group?`,

    options: `{ key: "A"\ntext: "Owner" }\n{ key: "B"\ntext: "Contributor" }\n{ key: "C"\ntext: "Web Plan Contributor" }\n{ key: "D"\ntext: "Website Contributor" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Requirements:"\n  • Add deployment slots for AdatumWebApp1 → manage app configuration.\n  • View the configuration of AdatumASP1 → read access to the App Service plan.\n  • Modify the *role assignment* for AdatumWebApp1 → requires 'manage access' permission (Microsoft.Authorization/*).\n\nBuilt-in roles:\n  • Owner: can manage everything, including access (role assignments).\n  • Contributor: can manage resources, but canNot manage access (canNot modify role assignments).\n  • Web Plan Contributor: manage App Service plans only, Not RBAC.\n  • Website Contributor: manage web apps only, Not RBAC.\n\nBecause the group must modify role assignments, they need the Owner role.\nTherefore, assign the Owner role to the Devs group for AdatumWebApp1 (or the appropriate scope).`,

    references: `Azure built-in roles – Owner, Contributor, Web Plan Contributor, Website Contributor\n],
  },
  {
    id: "Q259",
    number: 259,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: [
      "You have an Azure App Service plan that hosts an Azure App Service named App1."\nYou configure one production slot and four staging slots for App1.\n\nYou need to allocate 10 percent of the traffic to each staging slot and 60 percent of the traffic to the production slot.\n\nWhat should you add to App1?`,

    options: `{
        key: "A"\ntext: 'Slots to the "Testing in production" blade.'\n}\n{
        key: "B"\ntext: "A performance test."\n}\n{
        key: "C"\ntext: "A WebJob."\n}\n{
        key: "D"\ntext: "Templates to the Automation script blade."\n}\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure App Service supports traffic routing / 'Testing in production' for deployment slots."\nOn the Testing in production blade, you can assign a percentage of incoming traffic to each slot.\nIn this case, you would configure:\n  • Production slot: 60%\n  • Each of the four staging slots: 10% each.\n\nPerformance tests, WebJobs, or ARM automation templates do Not control runtime traffic split across slots.\n\nTherefore, you should add slots to the 'Testing in production' blade and configure traffic percentages there.`,

    references: `Azure App Service – Testing in production and traffic routing with deployment slots\n],
  },
  {
    id: "Q260",
    number: 260,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",

    question: [
      "You are an administrator for a company. You have an Azure Service Bus."\n\nYou need to implement a Service Bus queue that guarantees first in first-out (FIFO) delivery of messages.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Set the Lock Duration setting to 10 seconds." }\n{ key: "B"\ntext: "Enable duplicate detection." }\n{ key: "C"\ntext: "Set the Max Size setting of the queue to 5 GB." }\n{ key: "D"\ntext: "Enable partitioning." }\n{ key: "E"\ntext: "Enable sessions." }\n],

    correctAnswers: ["E"],

    explanation: [
      "Azure Service Bus queues do Not guarantee FIFO ordering by default."\nTo guarantee ordered processing of related messages, Service Bus uses *message sessions*.\n\nWhen you enable sessions on a queue or subscription, messages that share the same SessionId are processed in \norder (FIFO) within that session.\n\nLock duration, max size, duplicate detection, or partitioning do Not themselves enforce FIFO ordering.\n\nTherefore, you must enable sessions on the Service Bus queue.`,

    references: `Azure Service Bus – Message sessions for FIFO and ordered processing\n],
  },
  {
    id: "Q261",
    number: 261,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: [
      "You have a Microsoft SQL Server Always On availability group on Azure virtual machines."\n\nYou need to configure an Azure internal load balancer as a listener for the availability group.\nWhat should you do?\n\nExplanation from scenario:\nAn availability group requires a load balancer when the SQL Server instances run on Azure VMs.\nThe load balancer stores the listener IP.\nThe load balancing rule must enable *Floating IP (direct server return)* because only one SQL Node owns the listener at a time.\n\nConfiguration example:\n• Protocol: TCP\n• Port: 1433\n• Backend port: 1433 (igNored because Floating IP is enabled)\n• Session persistence: None\n• Floating IP: Enabled\n• Health probe: custom probe created for SQL AlwaysOn`,

    options: `{ key: "A"\ntext: "Enable Floating IP." }\n{ key: "B"\ntext: "Set Session persistence to Client IP and protocol." }\n{ key: "C"\ntext: "Set Session persistence to Client IP." }\n{ key: "D"\ntext: "Create an HTTP health probe on port 1433." }\n],

    correctAnswers: ["A"],

    explanation: [
      "SQL Always On listeners on Azure VMs require an internal load balancer with:"\n• Floating IP enabled (Direct Server Return).\nThis enables the listener IP to move between Nodes.\n\nSession persistence settings and HTTP probes are Not appropriate for SQL traffic.`,

    references: `Configure a load balancer for SQL Always On availability groups in Azure\n],
  },
  {
    id: "Q262",
    number: 262,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: [
      "Your network contains an Active Directory domain named adatum.com and an Azure AD tenant named adatum.onmicrosoft.com."\n\nAdatum.com contains the following on-premises user accounts:\n\nName     | Member of\n---------|----------------------------------------\nUser1    | Domain Admins\nUser2    | Schema Admins\nUser3    | Incoming Forest Trust Builders\nUser4    | Replicator\nUser5    | Enterprise Admins\n\nAdatum.onmicrosoft.com contains the following Azure AD accounts:\n\nName   | Role\n-------|----------------------\nUserA  | Global administrator\nUserB  | User administrator\nUserC  | Security administrator\nUserD  | Service administrator\n\nYou need to implement Azure AD Connect following the principle of least privilege.\n\nWhich user accounts should you use?`,

    options: `{ key: "A"\ntext: "\nAdatum.com: User1 \nAdatum.onmicrosoft.com: UserA" }\n{ key: "B"\ntext: "\nAdatum.com: User2 \nAdatum.onmicrosoft.com: UserB" }\n{ key: "C"\ntext: "\nAdatum.com: User3 \nAdatum.onmicrosoft.com: UserC" }\n{ key: "D"\ntext: "\nAdatum.com: User4 \nAdatum.onmicrosoft.com: UserD" }\n{ key: "E"\ntext: "\nAdatum.com: User5 \nAdatum.onmicrosoft.com: UserA" }\n{ key: "F"\ntext: "\nAdatum.com: User1 \nAdatum.onmicrosoft.com: UserB" }\n],

    correctAnswers: ["E"],

    explanation: [
      "Azure AD Connect setup requires:"\n• On-prem AD DS Enterprise Admin (User5) to create the AD DS Connector account.\n• Azure AD Global Administrator (UserA) to create the Azure AD Connector account.\n\nTherefore:\n• Adatum.com → User5\n• Adatum.onmicrosoft.com → UserA`,

    references: ["Azure AD Connect: Accounts and permissions"],
  },
  {
    id: "Q263",
    number: 263,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",

    question: `You have an Azure subscription containing the following resource groups:\n\n| Name | Azure region | Policy |\n|------|------|------|\n|   RG1   |   West Europe   |   Policy1   |\n|     RG2 |   North Europe   |    Policy2  |\n|   RG3   |   France Central   |   Policy3   |\n\nYou move WebApp1 to RG2.\n\nWhat is the effect of the move?`,

    options: `{
        key: "A"\ntext: "The App Service plan moves to North Europe. Policy2 applies to WebApp1."\n}\n{
        key: "B"\ntext: "The App Service plan moves to North Europe. Policy1 applies to WebApp1."\n}\n{
        key: "C"\ntext: "The App Service plan remains in West Europe. Policy2 applies to WebApp1."\n}\n{
        key: "D"\ntext: "The App Service plan remains in West Europe. Policy1 applies to WebApp1."\n}\n],

    correctAnswers: ["C"],

    explanation: [
      "Moving a resource between resource groups:"\n• Does NoT change its region.\n• Does update RBAC + policy inheritance.\n\nTherefore:\n• WebApp1 remains in West Europe.\n• It Now inherits Policy2 (from RG2).`,

    references: ["Move resources in Azure"],
  },
  {
    id: "Q264",
    number: 264,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `RG1 contains:\n• Storage account: storageaccount1\n• VM1 (Windows Server 2016)\n\nStorageaccount1 stores the disks for VM1.\n\nA ReadOnly lock is applied to RG1.\n\nWhat can you still do from the Azure portal?`,

    options: `{ key: "A"\ntext: "Generate an automation script for RG1." }\n{ key: "B"\ntext: "View the keys of storageaccount1." }\n{ key: "C"\ntext: "Upload a blob to storageaccount1." }\n{ key: "D"\ntext: "Start VM1." }\n],

    correctAnswers: ["A"],

    explanation: [
      "ReadOnly lock = equivalent to Reader permissions."\n\nAllowed:\n• Viewing resources\n• Exporting templates / automation scripts\n\nBlocked:\n• Writes (start/stop VM, upload blob)\n• Listing storage keys (requires POST → counts as write)`,

    references: ["Lock resources to prevent unexpected changes"],
  },
  {
    id: "Q265",
    number: 265,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You configured Azure AD Connect with Seamless SSO.\n\nUsers accessing myapps.microsoft.com:\n• are prompted multiple times for sign-in,\n• and are forced to use an account ending with onmicrosoft.com.\n\nYou discover a UPN mismatch between on-prem AD and Azure AD.\n\nYou must ensure users can authenticate via SSO.\n\nWhat should you do first?`,

    options: `{
        key: "A"\ntext: "Deploy Active Directory Federation Services (AD FS)."\n}\n{ key: "B"\ntext: "In Azure AD, add and verify a custom domain name." }\n{
        key: "C"\ntext: "Request a new on-prem certificate containing the AD domain name."\n}\n{ key: "D"\ntext: "Modify the filtering options in Azure AD Connect." }\n],

    correctAnswers: ["B"],

    explanation: [
      "If UPN suffixes do Not match a *verified* Azure AD domain:"\n• Azure AD replaces UPN with <user>@tenant.onmicrosoft.com.\n\nFix:\n• Add and verify the custom domain in Azure AD before syncing.\n\nThis resolves mismatched UPNs and enables SSO.`,

    references: ["Azure AD Connect sign-in options"],
  },
  {
    id: "Q266",
    number: 266,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",

    question: `You have Azure AD tenants contoso.com and fabrikam.com.\nYou use the same Microsoft account to log into both.\n\nYou need to configure the default sign-in tenant for the Azure portal.\n\nWhat should you do?`,

    options: `{ key: "A"\ntext: "From the Azure portal, configure Portal settings." }\n{ key: "B"\ntext: "From the Azure portal, change the directory." }\n{ key: "C"\ntext: "From Cloud Shell, run Set-AzureRmContext." }\n{ key: "D"\ntext: "From Cloud Shell, run Set-AzureRmSubscription." }\n],

    correctAnswers: ["A"],

    explanation: [
      "Default directory for Azure portal is configured under:"\nPortal settings → Directory + subscription → Set default directory.\n\nSwitching directory changes session but does NoT set the default.\nPowerShell commands do Not affect the portal's default tenant.`,
  },
  {
    id: "Q267",
    number: 267,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",

    question: `You subscribed to Azure AD Premium.\n\nYou must add admin1@contoso.com as a local administrator on *all future Azure AD joined devices*.\n\nWhat should you configure in Azure AD?`,

    options: `{ key: "A"\ntext: "Device settings from the Devices blade." }\n{ key: "B"\ntext: "General settings from the Groups blade." }\n{ key: "C"\ntext: "User settings from the Users blade." }\n{ key: "D"\ntext: "Providers from the MFA Server blade." }\n],

    correctAnswers: ["A"],

    explanation: [
      "Azure AD → Devices → Device settings:"\n• Additional local administrators on Azure AD joined devices\n\nThis is where you add users who should become local admins on AAD-joined Windows devices.`,
  },
  {
    id: "Q268",
    number: 268,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You have an Azure DNS zone: adatum.com.\n\nYou need to delegate the subdomain research.adatum.com to aNother DNS server.\n\nWhat should you create?`,

    options: `{ key: "A"\ntext: "Create a PTR record named research in adatum.com." }\n{ key: "B"\ntext: "Create an NS record named research in adatum.com." }\n{ key: "C"\ntext: "Modify the SOA record of adatum.com." }\n{ key: "D"\ntext: "Create an A record named research in adatum.com." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Subdomain delegation requires:"\n• Creating an NS record in the parent zone (adatum.com)\n• Named exactly the subdomain (research)\n• Pointing to the authoritative DNS servers of the child zone.`,
  },
  {
    id: "Q269",
    number: 269,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",

    question: `You are an administrator for a company. You have a virtual network named VNet1 as shown in the exhibit.\n\n![Azure Portal](/images/q269-sc1.png)\nNo devices are connected to VNet1.\n\nYou plan to peer VNet1 to another virtual network named VNet2 in the same region. VNet2 has an address space of 10.2.0.0/16.\n\nYou need to create the peering.\n\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "Modify the address space of VNet1." }\n{ key: "B"\ntext: "Configure a service endpoint on VNet2." }\n{ key: "C"\ntext: "Add a gateway subnet to VNet1." }\n{ key: "D"\ntext: "Create a subnet in both VNets." }\n],

    correctAnswers: ["A"],

    explanation: [
      "VNet peering requires **Non-overlapping** address spaces."\nBoth VNets use 10.2.0.0/16 → overlap → canNot peer.\n\nYou must change one VNet's address space first.`,
  },
  {
    id: "Q270",
    number: 270,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",

    question: `You have VNets VNet1, VNet2, and VNet3.\n\nVNet2 hosts VM2, a virtual appliance (router).\nYou implement a hub-and-spoke topology:\n• VNet2 = hub\n• VNet1 and VNet3 = spokes\n\nYou configure peering:\n• VNet1 ↔ VNet2\n• VNet2 ↔ VNet3\n\nYou need connectivity between VNet1 and VNet3 THROUGH VNet2.\n\nWhich TWO configurations are required?`,

    options: `{
        key: "A"\ntext: "On the peering connections, allow forwarded traffic."\n}\n{ key: "B"\ntext: "On the peering connections, allow gateway transit." }\n{ key: "C"\ntext: "Create route tables and assign them to subnets." }\n{ key: "D"\ntext: "Create a route filter." }\n{ key: "E"\ntext: "On the peering connections, use remote gateways." }\n],

    correctAnswers: ["A"\nC"],

    explanation: [
      "In a hub-and-spoke VNet architecture with a virtual appliance in the hub:\n\nRequired:\n1. Allow forwarded traffic on peering (enables hub to forward packets).\n2. Create custom routes (UDRs) sending spoke-to-spoke traffic to the appliance.\n\nGateway transit is for VPN/ExpressRoute gateways, Not for VNet appliances.`,
  },
  {
    id: "Q271",
    number: 271,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "easy",

    question: `You have a Basic App Service plan named ASP1 that hosts an Azure App Service named App1.\nYou need to configure a custom domain and enable backups for App1.\nWhat should you do first?`,

    options: `{ key: "A"\ntext: "Configure a WebJob for App1." }\n{ key: "B"\ntext: "Scale up ASP1." }\n{ key: "C"\ntext: "Scale out ASP1." }\n{ key: "D"\ntext: "Configure the application settings for App1." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Custom domains and backup are only available on paid tiers."\nASP1 is already a Basic plan, but historically backups required at least Standard; today backups are supported on Basic as well.\nIn der ursprünglichen Erklärung wird darauf hingewiesen, dass für Custom Domain & Backup eine höherwertige (bezahlt) Stufe Notwendig ist.\nDer erste Schritt ist deshalb immer: Plan hochskalieren (Scale up), wenn die aktuelle Stufe die Features nicht bietet.`,

    references: `Tutorial: Map an existing custom DNS name to Azure App Service\nBack up your app in Azure\n],
  },
  {
    id: "Q272",
    number: 272,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "easy",

    question: [
      "You have an Azure App Service plan named AdatumASP1 that hosts several Azure web apps."\nYou discover that the web apps respond slowly.\nYou need to provide additional memory and CPU resources to each instance of the web app.\nWhat should you do?`,

    options: `{ key: "A"\ntext: "Scale out AdatumASP1." }\n{
        key: "B"\ntext: "Add continuous WebJobs that use the multi-instance scale."\n}\n{ key: "C"\ntext: "Scale up AdatumASP1." }\n{ key: "D"\ntext: "Add a virtual machine scale set." }\n],

    correctAnswers: ["C"],

    explanation: [
      "Scale up = größerer App Service Plan (mehr CPU/RAM pro Instanz)."\nScale out = mehr Instanzen, aber gleiche Größe je Instanz.\nDie Frage verlangt *mehr Ressourcen pro Instanz*, also: Scale up AdatumASP1.`,
  },
  {
    id: "Q273",
    number: 273,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `You have an Azure web app named App1 that streams video content to users. App1 is located in the East US Azure region.\nUsers in North America stream the video content without any interruption.\nUsers on Asia and Europe report that the videos buffer often and do Not play back smoothly.\nYou need to recommend a solution to improve video streaming to the European and Asian users.\nWhat should you recommend?`,

    options: `{ key: "A"\ntext: "Scale out the App Service plan." }\n{
        key: "B"\ntext: "Configure an Azure Content Delivery Network (CDN) endpoint."\n}\n{ key: "C"\ntext: "Configure Azure File Sync." }\n{ key: "D"\ntext: "Scale up the App Service plan." }\n],

    correctAnswers: ["B"],

    explanation: [
      "Die Latenz für Benutzer in Europa/Asien ist der Hauptfaktor."\nAzure CDN cached Inhalte an Edge-Standorten nahe an den Nutzern und verbessert so Streaming-Performance weltweit.\nScale up/out der App Service Plan-Instanzen im gleichen Rechenzentrum löst das geografische Latenzproblem nicht.`,

    references: ["What is a content delivery network (CDN) on Azure?"],
  },

  {
    id: "Q275",
    number: 275,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "medium",

    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment.\nSome functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used.\nScoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYou plan to connect several virtual machines to the VNET01-USEA2 virtual network.\nIn the Web-RGlod8095859 resource group, you need to create a virtual machine that uses the Standard_B2ms size named Web01 that runs Windows Server 2019.\nWeb01 must be added to an availability set.\nWhat should you do from the Azure portal?\n\n(This question has to be solved in a lab environment. Click on Solution to see a valid example solution.\nAnswer "True" if you can solve the problem, otherwise select "False".)`,

    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Zielzustand im Portal:"\n1. New → Virtual machine erstellen.\n2. Subscription und Resource group: Web-RGlod8095859 auswählen.\n3. Name: Web01, Image: Windows Server 2019 Datacenter.\n4. Size: Standard_B2ms auswählen.\n5. Availability options: „Availability set“ und ein Availability Set auswählen/erstellen.\n6. Auf dem Reiter Networking: VNET01-USEA2 als virtuelles Netzwerk wählen.\n7. Review + create → Create.\nWer diese Schritte in der Live-Umgebung ausführen kann, wählt 'True'.`,
  },

  {
    id: "Q276",
    number: 276,
    area: "Implement and manage storage (15-20%)",
    difficulty: "medium",

    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment.\nSome functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used.\nScoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYou plan to prevent users from accidentally deleting blob data from Azure.\nYou need to ensure that administrators can recover any blob data that is deleted accidentally from the storagelod80958592 storage account for 14 days after the deletion occurred.\nWhat should you do from the Azure portal?\n\n(This question has to be solved in a lab environment. Click on Solution to see a valid example solution.\nAnswer "True" if you can solve the problem, otherwise select "False".)`,

    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Vorgehen im Portal:"\n1. Storage account ‚storagelod80958592‘ öffnen.\n2. Unter „Blob service“ → „Data protection“ auswählen.\n3. „Blob soft delete“ aktivieren und Retention auf 14 Tage setzen.\n4. Konfiguration speichern.\nDamit können versehentlich gelöschte Blobs innerhalb von 14 Tagen wiederhergestellt werden.`,
  },
  {
    id: "Q277",
    number: 277,
    area: "Implement and manage storage (15-20%)",
    difficulty: "easy",

    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment.\nSome functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used.\nScoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYour company plans to store several documents on a public website.\nYou need to create a container named bios that will host the documents in the storagelod80958592 storage account.\nThe solution must ensure aNonymous access and must ensure that users can browse folders in the container.\nWhat should you do from the Azure portal?\n\n(This question has to be solved in a lab environment. Click on Solution to see a valid example solution.\nAnswer "True" if you can solve the problem, otherwise select "False".)`,

    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Schritte im Portal:"\n1. Storage account ‚storagelod80958592‘ öffnen.\n2. Unter „Blob service“ → „Containers“.\n3. + Container → Name: bios.\n4. Public access level: „Container (aNonymous read access for containers and blobs)“.\n5. Create.\nDamit sind aNonyme Zugriffe und Browse der Inhalte möglich.`,
  },
  {
    id: "Q278",
    number: 278,
    area: "Implement and manage storage (15-20%)",
    difficulty: "easy",

    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment.\nSome functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used.\nScoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYour company plans to host in Azure the source files of several line-of-business applications.\nYou need to create an Azure file share named corpsoftware in the storagelod80958592 storage account.\nThe solution must ensure the corpsoftware can store only up to 250 GiB of data.\nWhat should you do from the Azure portal?\n\n(This question has to be solved in a lab environment. Click on Solution to see a valid example solution.\nAnswer "True" if you can solve the problem, otherwise select "False".)`,

    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Vorgehen:"\n1. Storage account ‚storagelod80958592‘ öffnen.\n2. Unter „File service“ → „File shares“.\n3. + File share → Name: corpsoftware.\n4. Quota: 250 GiB setzen.\n5. Create.\nDamit ist die File Share auf 250 GiB begrenzt.`,
  },

  {
    id: "Q279",
    number: 279,
    area: "Monitor and maintain Azure resources (10-15%)",
    difficulty: "medium",

    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment.\nSome functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used.\nScoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYou plan to back up all the Azure virtual machines in your Azure subscription at 02:00 Coordinated Universal Time (UTC) daily.\nYou need to prepare the Azure environment to ensure that any new virtual machines can be configured quickly for backup.\nThe solution must ensure that all the daily backups performed at 02:00 UTC are stored for only 90 days.\nWhat should you do from the Azure portal?\n\n(This question has to be solved in a lab environment. Click on Solution to see a valid example solution.\nAnswer "True" if you can solve the problem, otherwise select "False".)`,

    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Ziel: Standardisierte Backup-Policy, die schnell auf neue VMs angewendet werden kann."\n1. Recovery Services vault erstellen (z.B. Vault1 in Region East US).\n2. Im Vault → Backup policies → +Add.\n3. Policy Type: Azure Virtual Machine.\n4. Policy konfigurieren:\n   • Daily Backup, Time: 02:00 (UTC),\n   • Retention of daily backup point: 90 days.\n5. Policy erstellen und später bei neuen VMs die Backup-Konfiguration mit dieser Policy verknüpfen.`,
  },

  {
    id: "Q280",
    number: 280,
    area: "Deploy and manage Azure compute resources (20-25%)",
    difficulty: "easy",

    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment.\nSome functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used.\nScoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYou recently created a virtual machine named Web01.\nYou need to attach a new 80-GB standard data disk named Web01-Disk1 to Web01.\nWhat should you do from the Azure portal?\n\n(This question has to be solved in a lab environment. Click on Solution to see a valid example solution.\nAnswer "True" if you can solve the problem, otherwise select "False".)`,

    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],

    correctAnswers: ["A"],

    explanation: [
      "Schritte im Portal:"\n1. VM ‚Web01‘ im Portal öffnen.\n2. Links im Menü: „Disks“ auswählen.\n3. + Add data disk → vorhandene Managed Disk 'Web01-Disk1' auswählen oder neue 80-GB-Standard-Managed-Disk erstellen.\n4. LUN automatisch setzen lassen, ggf. anpassen.\n5. Save.\nDamit wird Web01-Disk1 als 80-GB-Standard-Datenträger an Web01 angehängt.`,
  },
  {
    id: "Q281",
    number: 281,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment. Some functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used. Scoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal.\n\nYou plan to allow connections between the VNET01-USEA2 and VNET01-USWE2 virtual networks.\nYou need to ensure that virtual machines can communicate across both virtual networks by using their private IP addresses. The solution must NoT require any virtual network gateways.\n\nWhat should you do from the Azure portal?\n\nThis question has to be solved in a lab environment. Click on Solution to see a valid example solution. Answer "True" if you can solve the problem, otherwise select "False".`,
    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nTo allow private IP connectivity between VNET01-USEA2 and VNET01-USWE2 without using virtual network gateways, you configure VNet peering:\n1. In the Azure portal, open VNET01-USEA2 and create a virtual network peering to VNET01-USWE2 with “Allow virtual network access” enabled.\n2. Create the corresponding peering from VNET01-USWE2 back to VNET01-USEA2 (or configure both directions in one step).\nWith peering in place, VMs in both VNets can communicate via private IP addresses over the Microsoft backbone, and No VPN/ExpressRoute gateway is required.\n\nTherefore, this can be solved in the lab via the portal and the correct choice is:\nA. True.\n\nRight answer: A`,
    references: `Create, change, or delete a virtual network peering\nVirtual network peering overview\n],
  },
  {
    id: "Q282",
    number: 282,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: [
      "Note: This is a lab or performance-based testing (PBT) question. To answer, you will perform a set of tasks in a live environment. Some functionality (e.g. copy and paste) will Not be possible by design. The right mouse button may Not be able to be used. Scoring is based on the outcome of performing the tasks stated in the lab. It doesn't matter how you accomplish the goal."\n\nYou plan to host several secured websites on a virtual machine named Web01.\nYou need to allow HTTPS over TCP port 443 to Web01 and to prevent HTTP over TCP port 80 to Web01.\n\nWhat should you do from the Azure portal?\n\nThis question has to be solved in a lab environment. Click on Solution to see a valid example solution. Answer "True" if you can solve the problem, otherwise select "False".`,
    options: `{ key: "A"\ntext: "True" }\n{ key: "B"\ntext: "False" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nYou can achieve this requirement by configuring a Network Security Group (NSG) for Web01 via the Azure portal:\n1. Create or open the NSG associated with Web01 (either on the subnet or directly on the NIC).\n2. Add an inbound security rule that ALLOWs TCP port 443 from the required source (e.g. Internet).\n3. Add an inbound security rule that DENYs TCP port 80 from the same source.\n4. Ensure the priorities of the rules are set correctly so that the deny rule for port 80 is evaluated before any broad allow rules.\nThis allows HTTPS (443) while blocking HTTP (80). All steps can be performed in the portal.\n\nTherefore, the correct choice is:\nA. True.\n\nRight answer: A`,
    references: `Filter network traffic with a network security group\nBest practices for Azure network security groups (NSGs)\n],
  },
  {
    id: "Q283",
    number: 283,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to recommend an environment for the deployment of App1.\nWhat should you recommend?`,
    options: `{
        key: "A"\ntext: "A new App Service plan that uses the P3v2 pricing tier."\n}\n{
        key: "B"\ntext: "ASE1 and an App Service plan that uses the I1 pricing tier."\n}\n{
        key: "C"\ntext: "ASE1 and an App Service plan that uses the I3 pricing tier."\n}\n{
        key: "D"\ntext: "A new App Service plan that uses the S1 pricing tier."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nApp1 is a new web app that will access third-party credit card processors. This typically requires strong isolation and network control (for example, PCI-related requirements).\nKey points from the requirements:\n- App1 must be controlled by NSGs for inbound and outbound communication.\n- Cost should be minimized, but security/isolation is important.\n- An App Service Environment (ASE1) already exists in East US.\nAn ASE provides:\n- Dedicated, isolated compute in a customer-managed subnet.\n- Full VNet integration, so traffic can be controlled via NSGs on the subnet.\nTo minimize cost while still leveraging the ASE, you choose the smallest Isolated plan tier (I1) in ASE1.\nOther options either do Not use the ASE (thus No subnet-level NSG control) or use a larger, more expensive Isolated tier.\n\nRight answer: B`,
    references: `App Service Environment overview\nSecurely accessing network resources with App Service Environment\n],
  },
  {
    id: "Q284",
    number: 284,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to configure AG1.\nWhat should you create?`,
    options: `{ key: "A"\ntext: "A multi-site listener" }\n{ key: "B"\ntext: "A URL path-based routing rule" }\n{ key: "C"\ntext: "A basic listener" }\n{ key: "D"\ntext: "A basic routing rule" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nAG1 must route traffic differently based on the URL path, but the host name (corporate.adatum.com) is the same:\n- /video/* → Pool11\n- /images/* → Pool12\nThis scenario requires **path-based routing** on a single listener:\n- You configure a listener for corporate.adatum.com.\n- You create a URL path-based routing rule which inspects the request path and forwards traffic to the appropriate backend pool.\nMulti-site listeners are used for multiple host names (for example, www.adatum.com vs fabrikam.com), Not for path splits on the same host.\n\nRight answer: B`,
    references: `Application Gateway routing rules\nURL path-based routing with Azure Application Gateway\n],
  },
  {
    id: "Q285",
    number: 285,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to configure AG2.\nWhat should you create?`,
    options: `{ key: "A"\ntext: "Multi-site listeners" }\n{ key: "B"\ntext: "Basic listeners" }\n{ key: "C"\ntext: "URL path-based routing rules" }\n{ key: "D"\ntext: "Basic routing rules" }\n{ key: "E"\ntext: "An additional public IP address" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nAG2 must route based on **different host names**:\n- www.adatum.com → Pool21\n- fabrikam.com → Pool22\nThis is a classic **multi-site** Application Gateway scenario. You configure:\n- One listener for host name www.adatum.com.\n- ANother listener for host name fabrikam.com.\n- Each listener is associated with its own routing rule and backend pool (Pool21 / Pool22).\nYou do Not need aNother public IP address: multiple host names can share the same IP and be distinguished by the Host header.\nURL path-based routing would be used if the host name were the same but the path was different, which is Not the case here.\n\nRight answer: A`,
    references: `Configure multiple site hosting with Azure Application Gateway\nApplication Gateway listener configuration\n],
  },
  {
    id: "Q286",
    number: 286,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "hard",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to identify the appropriate sizes for the Azure virtual machines that will be used to migrate the on-premises workloads.\nWhich five actions should you perform in sequence?\n\n| Actions |\n|------|\n|         1. From VM1, connect to the collector virtual machine and run the Azure Migrate Collector.   |\n|         2. From VM1, connect to the collector virtual machine- \nand run the Azure Site Recovery deployment planner.   |\n|         3. From Microsoft Download Center, download the Azure Site Recovery deployment planner.   |\n|         4. From the Azure portal, create an Azure Migrate assessment.  |\n|          5. From VM1, run the Deploy OVF Template wizard.  |\n|                6. From the Azure portal, create an Azure Migrate project.  |\n|                7. From the Azure portal, download an OVA file.  |`,
    options: `{ key: "A"\ntext: "Sequence: 6, 3, 5, 2, 4" }\n{ key: "B"\ntext: "Sequence: 6, 7, 5, 1, 4" }\n{ key: "C"\ntext: "Sequence: 6, 7, 1, 5, 2" }\n{ key: "D"\ntext: "Sequence: 4, 3, 5, 2, 6" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nTo identify appropriate Azure VM sizes for VMware workloads using Azure Migrate (discovery & assessment), the sequence is:\n1. From the Azure portal, create an **Azure Migrate project**. (Action 6)\n2. From the Azure portal, **download an OVA file** (the Azure Migrate appliance image). (Action 7)\n3. From VM1 (which has the vSphere console), run the **Deploy OVF Template** wizard to deploy the collector/appliance VM. (Action 5)\n4. From VM1, connect to the collector VM and run the **Azure Migrate Collector** to discover and send inventory/performance data to Azure. (Action 1)\n5. From the Azure portal, create an **Azure Migrate assessment** using the collected data, which will recommend appropriate VM sizes. (Action 4)\nPutting those in order gives: 6 → 7 → 5 → 1 → 4.\n\nRight answer: B`,
    references: `Discover VMware machines with the Azure Migrate appliance\nAssess VMware VMs with Azure Migrate\n],
  },
  {
    id: "Q287",
    number: 287,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to implement App2 to meet the application requirements.\nWhat should you include in the implementation?\n\nSelect the appropriate combination of App Service plan pricing tier and enabled feature.`,
    options: `{
        key: "A"\ntext: "\nApp Service plan pricing tier: Isolated; \nEnabled feature: Web Sockets"\n}\n{
        key: "B"\ntext: "\nApp Service plan pricing tier: Isolated; \nEnabled feature: Auto Swap"\n}\n{
        key: "C"\ntext: "\nApp Service plan pricing tier: Shared; \nEnabled feature: Always on"\n}\n{
        key: "D"\ntext: "\nApp Service plan pricing tier: Shared; \nEnabled feature: Web Sockets"\n}\n{
        key: "E"\ntext: "\nApp Service plan pricing tier: Standard; \nEnabled feature: Auto Swap"\n}\n{
        key: "F"\ntext: "\nApp Service plan pricing tier: Standard; \nEnabled feature: Always on"\n}\n],
    correctAnswers: ["F"],
    explanation: [
      "Explanation:"\nApp2 is an Azure Function that:\n- Uses a **Blob Storage trigger** and must process new blobs immediately.\n- Needs to connect directly to private IPs in a virtual network.\nImmediate processing and minimized cold-start behavior are helped by keeping the function app ‘warm’. The **Always On** feature ensures the worker process stays running.\nAlways On is available starting with the **Standard** App Service plan tier (and higher).\nShared plans do Not support Always On and are Not suitable for production, latency-sensitive workloads.\nIsolated plans are more expensive and Not required by the requirements for App2 (only cost minimization is mentioned).\n\nTherefore the best choice is:\n- App Service plan pricing tier: Standard\n- Enabled feature: Always on\n\nRight answer: F`,
    references: `Best practices for Azure Functions\nAlways On setting for Azure App Service\n],
  },
  {
    id: "Q288",
    number: 288,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to configure the Azure ExpressRoute circuits.\n\nHow should you configure Azure ExpressRoute routing?\n\n(To answer, drag the appropriate configurations to the correct locations. Each configuration may be used once, more than once, or Not at all.\nNoTE: Each correct selection is worth one point.)\n\nConfigurations:\n• Use BGP communities to configure BGP's Local Preference.\n• Use BGP to append the private AS numbers to the advertised prefixes.\n• Use BGP to append the public AS numbers to the advertised prefixes.\n\nAnswer Area:\nRouting from A. Datum to Azure:\nRouting from Microsoft Online Services to A. Datum:`,
    options: `{
        key: "A"\ntext: "\nRouting from A. Datum to Azure: Use BGP to append the private AS numbers to the advertised prefixes. \nRouting from Microsoft Online Services to A. Datum: Use BGP to append the public AS numbers to the advertised prefixes."\n}\n{
        key: "B"\ntext: "\nRouting from A. Datum to Azure: Use BGP communities to configure BGP's Local Preference. \nRouting from Microsoft Online Services to A. Datum: Use BGP communities to configure BGP's Local Preference."\n}\n{
        key: "C"\ntext: "\nRouting from A. Datum to Azure: Use BGP communities to configure BGP's Local Preference. \nRouting from Microsoft Online Services to A. Datum: Use BGP to append the public AS numbers to the advertised prefixes."\n}\n{
        key: "D"\ntext: "\nRouting from A. Datum to Azure: Use BGP to append the public AS numbers to the advertised prefixes. \nRouting from Microsoft Online Services to A. Datum: Use BGP to append the private AS numbers to the advertised prefixes."\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nExpressRoute is using BGP-based routing. You need to influence routing **from A. Datum to Azure** and **from Microsoft Online Services to A. Datum** separately.\n\nFrom A. Datum to Azure:\n- Outbound traffic from the customer network is controlled using **Local Preference** inside A. Datum’s BGP domain.\n- Microsoft publishes different BGP communities that you can attach to routes, allowing you to influence Local Preference on your side.\n- Therefore you should use **BGP communities to configure BGP's Local Preference** for traffic from A. Datum to Azure.\n\nFrom Microsoft Online Services to A. Datum:\n- Inbound traffic to A. Datum is influenced mainly via **AS path length**.\n- You can use AS path prepending with your **public AS numbers** on one of the ExpressRoute circuits so that Microsoft prefers one circuit while the other acts as backup.\n- Therefore you should **use BGP to append the public AS numbers to the advertised prefixes** for routing from Microsoft to A. Datum.\n\nThis corresponds to:\nRouting from A. Datum to Azure: Use BGP communities to configure BGP's Local Preference.\nRouting from Microsoft Online Services to A. Datum: Use BGP to append the public AS numbers to the advertised prefixes.\n\nRight answer: C`,
    references: `ExpressRoute routing requirements\nSuboptimal routing from customer to Microsoft\n],
  },
  {
    id: "Q289",
    number: 289,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: [
      "Case Study – A. Datum"\n\nOverview\nA. Datum Corporation is a financial company that has two main offices in New York and Los Angeles. A. Datum has a subsidiary named Fabrikam, Inc. that shares the Los Angeles office.\nA. Datum is conducting an initial deployment of Azure services to host new line-of-business applications and is preparing to migrate its existing on-premises workloads to Azure.\nA. Datum uses Microsoft Exchange Online for email.\n\nOn-Premises Environment\nThe on-premises workloads run on virtual machines hosted in a VMware vSphere 6 infrastructure. All the virtual machines are members of an Active Directory forest named adatum.com and run Windows Server 2016.\nThe New York office uses an IP address space of 10.0.0.0/16. The Los Angeles office uses an IP address space of 10.10.0.0/16.\nThe offices connect by using a VPN provided by an ISP. Each office has one Azure ExpressRoute circuit that provides access to Azure services and Microsoft Online Services. Routing is implemented by using Microsoft peering.\nThe New York office has a virtual machine named VM1 that has the vSphere console installed.\n\nAzure Environment\nYou provision the Azure infrastructure by using the Azure portal. The infrastructure contains the resources shown in the following table:\n\n| Name | Type                          | Azure region |\n|------|-------------------------------|--------------|\n| ASRV1 | Azure Site Recovery vault    | East US      |\n| ASRV2 | Azure Site Recovery vault    | West US      |\n| ASE1  | Azure App Service Environment| East US      |\n| AG1   | Azure Application Gateway (internal) | East US |\n| AG2   | Azure Application Gateway (Internet-facing) | West US |\n| ER1   | ExpressRoute circuit         | East US      |\n| ER2   | ExpressRoute circuit         | West US      |\n\nAG1 has two backend pools named Pool11 and Pool12.\nAG2 has two backend pools named Pool21 and Pool22.\n\nPlanned Migration\nA. Datum plans to migrate the virtual machines from the New York office to the East US Azure region by using Azure Site Recovery.\n\nInfrastructure Requirements\nA. Datum identifies the following infrastructure requirements:\n- A new web app named App1 that will access third-parties for credit card processing must be deployed.\n- A newly developed API must be implemented as an Azure function named App2. App2 will use a blob storage trigger. App2 must process new blobs immediately.\n- The Azure infrastructure and the on-premises infrastructure must be prepared for the migration of the VMware virtual machines to Azure.\n- The sizes of the Azure virtual machines that will be used to migrate the on-premises workloads must be identified.\n- All migrated and newly deployed Azure virtual machines must be joined to the adatum.com domain.\n- AG1 must load balance incoming traffic in the following manner:\n  - http://corporate.adatum.com/video/* will be load balanced across Pool11.\n  - http://corporate.adatum.com/images/* will be load balanced across Pool12.\n- AG2 must load balance incoming traffic in the following manner:\n  - http://www.adatum.com will be load balanced across Pool21.\n  - http://fabrikam.com will be load balanced across Pool22.\n- ER1 must route traffic between the New York office and platform as a service (PaaS) services in the East US Azure region, as long as ER1 is available.\n- ER2 must route traffic between the Los Angeles office and the PaaS services in the West US region, as long as ER2 is available.\n- ER1 and ER2 must be configured to fail over automatically.\n\nApplication Requirements\n- App2 must be available to connect directly to the private IP addresses of the Azure virtual machines. App2 will be deployed directly to an Azure virtual network.\n- Inbound and outbound communications to App1 must be controlled by using NSGs.\n\nPricing Requirements\n- The cost of App1 and App2 must be minimized.\n- The transactional charges of Azure Storage accounts must be minimized.\n\nYou need to provision the resources in Azure to support the virtual machine that will be migrated from the New York office.\nWhat should you include in the solution?\n\nSelect the appropriate combination of IP address space of the virtual network and storage account kind.`,
    options: `{
        key: "A"\ntext: "\nIP address space of the virtual network: 10.0.0.0/16; \nStorage account kind: Storage V2 (general purpose v2)"\n}\n{
        key: "B"\ntext: "\nIP address space of the virtual network: 10.0.0.0/16; \nStorage account kind: BlobStorage"\n}\n{
        key: "C"\ntext: "\nIP address space of the virtual network: 10.10.0.0/16; \nStorage account kind: Storage (general purpose v1)"\n}\n{
        key: "D"\ntext: "\nIP address space of the virtual network: 10.10.0.0/16; \nStorage account kind: Storage V2 (general purpose v2)"\n}\n{
        key: "E"\ntext: "\nIP address space of the virtual network: 10.20.0.0/16; \nStorage account kind: Storage (general purpose v1)"\n}\n{
        key: "F"\ntext: "\nIP address space of the virtual network: 10.20.0.0/16; \nStorage account kind: BlobStorage"\n}\n],
    correctAnswers: ["E"],
    explanation: [
      "Explanation:"\nNetwork requirements:\n- New York on-prem uses 10.0.0.0/16.\n- Los Angeles on-prem uses 10.10.0.0/16.\nAzure VNets that are connected via ExpressRoute/VPN to on-prem must Not overlap with on-prem address spaces.\nTherefore, for the Azure VNet to host the migrated VM from New York, you should **Not** use 10.0.0.0/16 or 10.10.0.0/16.\nA Non-overlapping choice in the options is **10.20.0.0/16**.\n\nStorage requirements:\n- This exam scenario is based on using Azure Site Recovery for VMware migration.\n- Historically, Azure Site Recovery for such scenarios required a general purpose storage account (GPv1) for replicated data.\n- BlobStorage accounts are specialized and Not suitable for storing all required VM data (OS disk, etc.) in this context.\n\nThus the correct combination is:\n- IP address space: 10.20.0.0/16\n- Storage account kind: Storage (general purpose v1)\n\nRight answer: E`,
    references: `Plan Azure Site Recovery for VMware and physical servers\nVirtual network design considerations for Azure and on-premises connectivity\n],
  },
  {
    id: "Q290",
    number: 290,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals."\n\nYou have an Azure virtual machine named VM1 that runs Windows Server 2016.\nYou need to create an alert in Azure when more than two error events are logged to the System log on VM1 within an hour.\n\nSolution:\nYou create an Azure Storage account and configure shared access signatures (SASs). You install the Microsoft Monitoring Agent on VM1. You create an alert in Azure Monitor and specify the Storage account as the source.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nTo trigger an alert based on Windows event logs (such as the System log) from a VM, the correct pattern is:\n- Connect the VM to a **Log Analytics workspace** (via Microsoft Monitoring Agent or Azure Monitor Agent).\n- Configure the VM to send event logs to the workspace.\n- In Azure Monitor, create a **Log alert** based on a Kusto query over the Event table (e.g. counting errors in the last hour).\n\nThe proposed solution uses:\n- An Azure Storage account with SAS.\n- An alert in Azure Monitor that specifies the Storage account as the source.\nAzure Monitor log alerts for event-based conditions are Not created directly against a Storage account; they are created against Log Analytics workspaces (or metrics-based sources).\nSimply writing or exporting events to a Storage account and then pointing an alert at that Storage account does Not fulfill the requirement.\n\nTherefore, the solution does **Not** meet the goal.\n\nRight answer: B`,
    references: `Create diagNostic settings to send resource logs and metrics to Azure Monitor Logs\nCreate, view, and manage log alerts using Azure Monitor\n],
  },
  {
    id: "Q291",
    number: 291,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: [
      "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals."\n\nYou have an Azure subscription that contains the resources shown in the following table.\n\n| Name     | Type              | Region    |\n|----------|-------------------|-----------|\n| RG1      | Resource group    | West US   |\n| RG2      | Resource group    | East Asia |\n| storage1 | Storage account   | West US   |\n| storage2 | Storage account   | East Asia |\n| VM1      | Virtual machine   | West US   |\n| VNet1    | Virtual network   | West US   |\n| VNet2    | Virtual network   | East Asia |\n\nVM1 connects to VNET1.\n\nYou need to connect VM1 to VNET2.\n\nSolution: You move VM1 to RG2, and then you add a new network interface to VM1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "A network interface (NIC) is the interconnection between a VM and a virtual network (VNet). A VM must have at least one NIC, but can have more than one, depending on the size of the VM."\n\nYou can create a VM with multiple NICs and add or remove NICs through the lifecycle of a VM. Multiple NICs allow a VM to connect to different subnets and send or receive traffic over the most appropriate interface.\n\nHowever:\n• Each NIC attached to a VM must exist in the same location and subscription as the VM.\n• Each NIC must be connected to a VNet that exists in the same Azure location and subscription as the NIC.\n• You can change the subnet a VM is connected to after it's created, but you canNot change the VNet.\n\nVNet1 is in West US, VNet2 is in East Asia. VM1 remains in West US. Du kannst also kein NIC an VM1 anbinden, das in einer VNet in East Asia liegt. Der Lösungsweg erreicht das Ziel nicht.\n\nRight answer: B`,
  },
  {
    id: "Q292",
    number: 292,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals.\n\nYou have an Azure subscription that contains the resources shown in the following table.\n\n| Name     | Type              | Region    |\n|----------|-------------------|-----------|\n| RG1      | Resource group    | West US   |\n| RG2      | Resource group    | East Asia |\n| storage1 | Storage account   | West US   |\n| storage2 | Storage account   | East Asia |\n| VM1      | Virtual machine   | West US   |\n| VNet1    | Virtual network   | West US   |\n| VNet2    | Virtual network   | East Asia |\n\nVM1 connects to VNET1.\n\nYou need to connect VM1 to VNET2.\n\nSolution: You delete VM1. You recreate VM1, and then you create a new network interface for VM1 and connect it to VNET2.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Die Einschränkung ist: Eine VM und alle ihre NICs müssen in derselben Region liegen wie das VNet, mit dem sie verbunden sind."\n\nWenn du VM1 löschst und in East Asia neu erstellst, kannst du ein NIC in VNet2 (ebenfalls East Asia) anlegen und die VM dort anbinden.\n\nDamit wird die Anforderung erfüllt, VM1 mit VNet2 zu verbinden.\n\nRight answer: A`,
  },
  {
    id: "Q293",
    number: 293,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might Not have a correct solution. Determine whether the solution meets the stated goals.\n\nYou have an Azure subscription that contains the resources shown in the following table.\n\n| Name     | Type              | Region    |\n|----------|-------------------|-----------|\n| RG1      | Resource group    | West US   |\n| RG2      | Resource group    | East Asia |\n| storage1 | Storage account   | West US   |\n| storage2 | Storage account   | East Asia |\n| VM1      | Virtual machine   | West US   |\n| VNet1    | Virtual network   | West US   |\n| VNet2    | Virtual network   | East Asia |\n\nVM1 connects to VNET1.\n\nYou need to connect VM1 to VNET2.\n\nSolution: You turn off VM1, and then you add a new network interface to VM1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Mehrere NICs pro VM sind möglich, aber alle NICs müssen:"\n• in derselben Region wie die VM existieren\n• mit VNets in derselben Region verbunden sein.\n\nVM1 liegt in West US. VNet2 liegt in East Asia. Du kannst kein NIC erstellen, das zu VNet2 gehört und es an eine VM in West US hängen.\n\nNur das Ausschalten der VM und Hinzufügen eines NICs reicht also nicht – die Region passt nicht.\n\nRight answer: B`,
  },
  {
    id: "Q294",
    number: 294,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have a deployment template named Template1 that is used to deploy 10 Azure web apps.\n\nYou need to identify what to deploy before you deploy Template1. The solution must minimize Azure costs.\n\nWhat should you identify?`,
    options: `{ key: "A"\ntext: "Five Azure Application Gateways" }\n{ key: "B"\ntext: "One App Service plan" }\n{ key: "C"\ntext: "10 App Service plans" }\n{ key: "D"\ntext: "One Azure Traffic Manager" }\n{ key: "E"\ntext: "One Azure Application Gateway" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Jede Web App läuft in einem App Service plan. Ein App Service plan stellt die Compute-Ressourcen bereit (Serverfarm)."\n\nMehrere Web Apps können denselben App Service plan nutzen. Um Kosten zu minimieren, legst du **einen** App Service plan an und betreibst alle 10 Web Apps darin, statt 10 separate Pläne zu bezahlen.\n\nApplication Gateway oder Traffic Manager werden für dieses Szenario nicht benötigt.\n\nRight answer: B`,
  },
  {
    id: "Q295",
    number: 295,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an app named App1 that runs on an Azure web app named webapp1.\n\nThe developers at your company upload an update of App1 to a Git repository named Git1.\n\nWebapp1 has the deployment slots shown in the following table.\n\n| Name        | Function   |\n|-------------|------------|\n| webapp1-prod| Production |\n| webapp1-test| Staging    |\n\nYou need to ensure that the App1 update is tested before the update is made available to users.\n\nWhich two actions should you perform?\n\n(Each correct answer presents part of the solution. Choose two.)`,
    options: `{ key: "A"\ntext: "Swap the slots." }\n{
        key: "B"\ntext: "Deploy the App1 update to webapp1-prod, and then test the update."\n}\n{ key: "C"\ntext: "Stop webapp1-prod." }\n{
        key: "D"\ntext: "Deploy the App1 update to webapp1-test, and then test the update."\n}\n{ key: "E"\ntext: "Stop webapp1-test." }\n],
    correctAnswers: ["A"\nD"],
    explanation: [
      "Deployment Slots erlauben dir, eine Staging-Slot (z. B. webapp1-test) zu nutzen, um Updates zu testen:\n\n1. Du deployst das Update zunächst auf den **Staging-Slot** (\`webapp1-test\`).\n2. Du testest die Anwendung auf dem Staging-Slot.\n3. Wenn alles passt, machst du einen **Swap** zwischen \`webapp1-test\` und \`webapp1-prod\`. Dadurch wird die neue Version ohne Downtime produktiv.\n\nDeshalb sind korrekt:\n• D: Deploy das Update nach webapp1-test und teste es dort.\n• A: Swap der Slots, um die getestete Version in Produktion zu bringen.\n\nRight answer: A, D`,
  },
  {
    id: "Q296",
    number: 296,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You need to deploy an Azure virtual machine scale set that contains five instances as quickly as possible.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "Deploy five virtual machines. Modify the Availability Zones settings for each virtual machine."\n}\n{
        key: "B"\ntext: "Deploy five virtual machines. Modify the Size setting for each virtual machine."\n}\n{
        key: "C"\ntext: "Deploy one virtual machine scale set that is set to Uniform orchestration mode."\n}\n{
        key: "D"\ntext: "Deploy one virtual machine scale set that is set to Flexible orchestration mode."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Virtual Machine Scale Sets sind der vorgesehene Mechanismus, um mehrere identische (oder ähnliche) VMs gemeinsam zu deployen und zu verwalten."\n\nMit **Flexible orchestration** bekommst du:\n• hohe Verfügbarkeit und Skalierung\n• schnelle Bereitstellung mehrerer Instanzen\n• gemischte VM-Typen möglich\n\nIm Vergleich zu fünf Einzel-VMs ist ein Scale Set klar schneller und sauberer. Die Frage zielt auf den empfohlenen Orchestrierungsmodus: Flexible.\n\nRight answer: D`,
  },
  {
    id: "Q297",
    number: 297,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains a resource group named RG26.\n\nRG26 is set to the West Europe location and is used to create temporary resources for a project. RG26 contains the resources shown in the following table.\n\n| Name    | Type                      | Location    |\n|---------|---------------------------|-------------|\n| VM1     | Virtual machine           | North Europe|\n| RGV1    | Recovery Services vault   | North Europe|\n| SQLDB01 | Azure SQL database        | North Europe|\n| AZSQLO1 | Azure SQL database server | North Europe|\n| sa001   | Storage account           | West Europe |\n\nSQLDB01 is backed up to RGV1.\n\nWhen the project is complete, you attempt to delete RG26 from the Azure portal. The deletion fails.\n\nYou need to delete RG26.\n\nWhat should you do first?`,
    options: `{ key: "A"\ntext: "Delete VM1." }\n{ key: "B"\ntext: "Stop VM1." }\n{ key: "C"\ntext: "Stop the backup of SQLDB01." }\n{ key: "D"\ntext: "Delete sa001." }\n],
    correctAnswers: ["C"],
    explanation: [
      "Ein Recovery Services vault (RGV1) kann nicht gelöscht werden, solange:"\n• Noch geschützte Objekte (Backup Items) vorhanden sind (z. B. SQLDB01), oder\n• Daten im Soft-Deleted-Zustand vorhanden sind, oder\n• registrierte Storage Accounts vorhanden sind.\n\nDa SQLDB01 in RGV1 gesichert wird, musst du zuerst das Backup für SQLDB01 stoppen und die Backup-Daten entfernen, bevor sich die Ressourcengruppe löschen lässt.\n\nRight answer: C`,
  },
  {
    id: "Q298",
    number: 298,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 that contains a virtual network named VNet1. VNet1 is in a resource group named RG1.\n\nSubscription1 has a user named User1. User1 has the following roles:\n• Reader\n• Security Admin\n• Security Reader\n\nYou need to ensure that User1 can assign the Reader role for VNet1 to other users.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "Remove User1 from the Security Reader and Reader roles for Subscription1. Assign User1 the Contributor role for RG1."\n}\n{ key: "B"\ntext: "Assign User1 the Owner role for VNet1." }\n{
        key: "C"\ntext: "Remove User1 from the Security Reader and Reader roles for Subscription1."\n}\n{
        key: "D"\ntext: "Assign User1 the Network Contributor role for VNet1."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Nur bestimmte Rollen dürfen **RBAC-Zuweisungen** verwalten:"\n• Owner\n• User Access Administrator\n\nContributor oder Network Contributor dürfen Ressourcen konfigurieren, aber **keine Rollen an andere Benutzer vergeben**.\n\nUm User1 in die Lage zu versetzen, die Reader-Rolle auf VNet1 zu vergeben, muss User1 auf dieser Ressource Owner sein (oder User Access Administrator). In der Antwortauswahl ist nur Owner vorhanden.\n\nRight answer: B`,
  },
  {
    id: "Q299",
    number: 299,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You deploy an Azure Kubernetes Service (AKS) cluster named Cluster1 that uses the IP addresses shown in the following table.\n\n| IP address   | Assigned to                 |\n|--------------|-----------------------------|\n| 131.107.2.1  | Load balancer front end     |\n| 192.168.10.2 | Kubernetes DNS service      |\n| 172.17.7.1   | Docker bridge address       |\n| 10.0.10.11   | Kubernetes cluster Node     |\n\nYou need to provide internet users with access to the applications that run in Cluster1.\n\nWhich IP address should you include in the DNS record for Cluster1?`,
    options: `{ key: "A"\ntext: "131.107.2.1" }\n{ key: "B"\ntext: "10.0.10.11" }\n{ key: "C"\ntext: "172.17.7.1" }\n{ key: "D"\ntext: "192.168.10.2" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Nur eine **öffentliche** IP kann im öffentlichen DNS für Internet-User verwendet werden."\n\nDie Tabelle zeigt:\n• 131.107.2.1 – Load balancer front end (Public IP)\n• 192.168.10.2 – Private IP (DNS Service)\n• 172.17.7.1 – Private Docker Bridge\n• 10.0.10.11 – Private Node-IP\n\nFür den Zugriff von außen nutzt man die Public IP des Load Balancers.\n\nRight answer: A`,
  },
  {
    id: "Q300",
    number: 300,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 that has the following providers registered:\n• Microsoft.Authorization\n• Microsoft.Automation\n• Microsoft.Resources\n• Microsoft.Compute\n• Microsoft.KeyVault\n• Microsoft.Network\n• Microsoft.Storage\n• Microsoft.Billing\n• Microsoft.Web\n\nSubscription1 contains an Azure virtual machine named VM1 that has the following configurations:\n• Private IP address: 10.0.0.4 (dynamic)\n• Network security group (NSG): NSG1\n• Public IP address: None\n• Availability set: AVSet\n• Subnet: 10.0.0.0/24\n• Managed disks: No\n• Location: East US\n\nYou need to record all the successful and failed connection attempts to VM1.\n\nWhich three actions should you perform?\n\n(Each correct answer presents part of the solution. NoTE: Each correct selection is worth one point.)`,
    options: `{ key: "A"\ntext: "Register the Microsoft.Insights resource provider." }\n{ key: "B"\ntext: "Add an Azure Network Watcher connection monitor." }\n{ key: "C"\ntext: "Register the Microsoft.LogAnalytics provider." }\n{
        key: "D"\ntext: "Enable Azure Network Watcher in the East US Azure region."\n}\n{ key: "E"\ntext: "Create an Azure Storage account." }\n{ key: "F"\ntext: "Enable Azure Network Watcher flow logs." }\n],
    correctAnswers: ["A"\nD\nF"],
    explanation: [
      "Um alle Verbindungsversuche zu VM1 auf NSG-Ebene zu protokollieren, nutzt du **NSG Flow Logs** in Azure Network Watcher.\n\nDazu sind nötig:\n1. **Network Watcher in der Region aktivieren**, in der VM1 liegt (East US).\n2. Den **Microsoft.Insights**-Provider registrieren (Telemetry/Monitoring).\n3. **NSG Flow Logs** auf NSG1 aktivieren (Flow-Logs schreiben in ein Storage-Konto).\n\nEin zusätzliches Storage-Konto musst du nicht zwingend neu erstellen, da VM1 ohne Managed Disks bereits ein Storage-Konto nutzt. Ein Connection Monitor (B) ist für detailliertes Monitoring von End-zu-End-Verbindungen, aber die Frage zielt auf Logging aller Verbindungsversuche auf NSG-Ebene.\n\nKorrekte Schritte:\n• A: Register the Microsoft.Insights resource provider.\n• D: Enable Azure Network Watcher in the East US Azure region.\n• F: Enable Azure Network Watcher flow logs.\n\nRight answer: A, D, F`,
  },

  {
    id: "Q301",
    number: 301,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You plan to create the Azure web apps shown in the following table.\n\n| Name    | Runtime stack  |\n|---------|----------------|\n| WebApp1 | .NET Core 3.0 |\n| WebApp2 | ASP .NET V4.7 |\n| WebApp3 | PHP           |\n| WebApp4 | Ruby 2.6      |\n\nWhat is the minimum number of App Service plans you should create for the web apps?`,
    options: `{ key: "A"\ntext: "1" }\n{ key: "B"\ntext: "2" }\n{ key: "C"\ntext: "3" }\n{ key: "D"\ntext: "4" }\n],
    correctAnswers: ["B"],
    explanation: [
      "An App Service plan defines the compute resources and OS (Windows or Linux) on which one or more web apps run."\nYou can host multiple web apps in a single App Service plan as long as they share the same OS.\n\n.NET Core 3.0 and ASP.NET 4.7 must run on a Windows-based App Service plan.\nPHP and Ruby 2.6 stacks in Azure App Service are supported on Linux-based plans.\n\nTherefore you need:\n- One Windows App Service plan for WebApp1 and WebApp2.\n- One Linux App Service plan for WebApp3 and WebApp4.\n\nThat makes a minimum of 2 App Service plans.\n\nRight answer: B`,
  },
  {
    id: "Q302",
    number: 302,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `Your company has three offices. The offices are located in Miami, Los Angeles, and New York. Each office contains a datacenter.\nYou have an Azure subscription that contains resources in the East US and West US Azure regions. Each region contains a virtual network. The virtual networks are peered.\nYou need to connect the datacenters to the subscription. The solution must minimize network latency between the datacenters.\n\nWhat should you create?`,
    options: `{
        key: "A"\ntext: "Three Azure Application Gateways and one On-premises data gateway."\n}\n{ key: "B"\ntext: "Three virtual hubs and one virtual WAN." }\n{ key: "C"\ntext: "Three virtual WANs and one virtual hub." }\n{
        key: "D"\ntext: "Three On-premises data gateways and one Azure Application Gateway."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Azure Virtual WAN is designed for global branch connectivity with low latency using a hub-and-spoke architecture."\nYou create a single Virtual WAN resource and then create one virtual hub per Azure region where you want to terminate branch connections.\n\nEach on-premises datacenter connects (via VPN/ExpressRoute) to its nearest hub, and hubs are globally any-to-any connected over the Microsoft backbone.\n\nTherefore, to connect three on-premises datacenters to resources spread across regions while minimizing latency, you create:\n- One virtual WAN, and\n- Three virtual hubs (one per region where you terminate branch connectivity).\n\nRight answer: B`,
  },
  {
    id: "Q303",
    number: 303,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure Active Directory tenant named contoso.com that includes the following users:\n\n| Name  | Role                       |\n|-------|----------------------------|\n| User1 | Cloud device administrator |\n| User2 | User administrator         |\n\nContoso.com includes the following Windows 10 devices:\n\n| Name   | Join type           |\n|--------|---------------------|\n| Device1 | Azure AD registered |\n| Device2 | Azure AD joined     |\n\nYou create the following security groups in contoso.com:\n\n| Name   | Membership Type | Owner |\n|--------|-----------------|-------|\n| Group1 | Assigned        | User2 |\n| Group2 | Dynamic Device  | User2 |\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\nStatements:\n- User1 can add Device2 to Group1.\n- User2 can add Device1 to Group1.\n- User2 can add Device2 to Group2.`,
    options: `{
        key: "A"\ntext: "\nUser1 can add Device2 to Group1: YES; \nUser2 can add Device1 to Group1: YES; \nUser2 can add Device2 to Group2: YES."\n}\n{
        key: "B"\ntext: "\nUser1 can add Device2 to Group1: YES; \nUser2 can add Device1 to Group1: YES; \nUser2 can add Device2 to Group2: No."\n}\n{
        key: "C"\ntext: "\nUser1 can add Device2 to Group1: YES; \nUser2 can add Device1 to Group1: No; \nUser2 can add Device2 to Group2: No."\n}\n{
        key: "D"\ntext: "\nUser1 can add Device2 to Group1: No; \nUser2 can add Device1 to Group1: YES; \nUser2 can add Device2 to Group2: No."\n}\n{
        key: "E"\ntext: "\nUser1 can add Device2 to Group1: No; \nUser2 can add Device1 to Group1: No; \nUser2 can add Device2 to Group2: YES."\n}\n{
        key: "F"\ntext: "\nUser1 can add Device2 to Group1: No; \nUser2 can add Device1 to Group1: No; \nUser2 can add Device2 to Group2: No."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Cloud Device Administrator (User1) can manage device objects (enable/disable/delete, read BitLocker keys) but canNot manage group membership."\n\nGroup1 is an assigned group and User2 is the owner, so User2 can add members (devices or users) to Group1.\n\nGroup2 is a dynamic device group. Its membership is controlled by a dynamic rule and canNot be modified manually, even by the owner.\n\nTherefore:\n- User1 canNot add Device2 to Group1 (No).\n- User2, as the owner of Group1, can add Device1 to Group1 (YES).\n- User2 canNot manually add Device2 to Group2 because it is dynamic (No).\n\nRight answer: D`,
  },
  {
    id: "Q304",
    number: 304,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",
    question: `You are an administrator for a company. You have several Azure virtual machines on a virtual network named VNet1.\nYou configure an Azure Storage account as shown in the following exhibit (simplified):\n\n![Azure Portal](/images/q304-sc1.png)\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nAnswer area:\n1. The virtual machines on the 10.2.0.0/24 subnet will ______ have network connectivity to the file shares in the storage account.\n2. Azure Backup will ______ be able to back up the unmanaged hard disks of the virtual machines in the storage account.\n\nChoices for each blank:\n- always\n- during a backup\n- never`,
    options: `{
        key: "A"\ntext: "\nThe virtual machines on the 10.2.0.0/24 subnet will always have network connectivity to the file shares in the storage account. \nAzure Backup will always be able to back up the unmanaged hard disks of the virtual machines in the storage account."\n}\n{
        key: "B"\ntext: "\nThe virtual machines on the 10.2.0.0/24 subnet will never have network connectivity to the file shares in the storage account. \nAzure Backup will always be able to back up the unmanaged hard disks of the virtual machines in the storage account."\n}\n{
        key: "C"\ntext: "\nThe virtual machines on the 10.2.0.0/24 subnet will during a backup have network connectivity to the file shares in the storage account. \nAzure Backup will never be able to back up the unmanaged hard disks of the virtual machines in the storage account."\n}\n{
        key: "D"\ntext: "\nThe virtual machines on the 10.2.0.0/24 subnet will always have network connectivity to the file shares in the storage account. \nAzure Backup will never be able to back up the unmanaged hard disks of the virtual machines in the storage account."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "The storage account firewall is configured to allow access only from selected networks, and a virtual network rule for VNet1 / 10.2.0.0/24 is enabled."\nTherefore, VMs in the 10.2.0.0/24 subnet always have network connectivity to the storage account's file shares.\n\nAzure Backup is a trusted Microsoft service. Since the option 'Allow trusted Microsoft services to access this storage account' is disabled, Azure Backup canNot access the storage account through the firewall.\n\nThus, Azure Backup will never be able to back up unmanaged disks stored in this storage account under the current configuration.\n\nRight answer: D`,
  },
  {
    id: "Q305",
    number: 305,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 that contains the quotas shown in the following table.\n\n| Quota                   | Region  | Usage    |\n|-------------------------|---------|----------|\n| Standard B-Series vCPUs | West US | 0 of 20  |\n| Standard D-Series vCPUs | West US | 0 of 20  |\n| Total Regional vCPUs    | West US | 0 of 20  |\n\nYou deploy virtual machines to Subscription1 as shown in the following table.\n\n| Name | Size           | vCPUs | Region  | State                    |\n|------|----------------|-------|---------|--------------------------|\n| VM1  | Standard_B2ms  | 2     | West US | Running                  |\n| VM2  | Standard_B16ms | 16    | West US | Stopped (Deallocated)    |\n\nYou plan to deploy the virtual machines shown in the following table.\n\n| Name | Size            | vCPUs |\n|------|-----------------|-------|\n| VM3  | Standard_B2ms   | 1     |\n| VM4  | Standard_D4s_v3 | 4     |\n| VM5  | Standard_B16ms  | 16    |\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.`,
    options: `{
        key: "A"\ntext: "\nYou can deploy VM3 to West US: Yes \nYou can deploy VM4 to West US: Yes \nYou can deploy VM5 to West US: Yes"\n}\n{
        key: "B"\ntext: "\nYou can deploy VM3 to West US: Yes \nYou can deploy VM4 to West US: Yes \nYou can deploy VM5 to West US: No"\n}\n{
        key: "C"\ntext: "\nYou can deploy VM3 to West US: Yes \nYou can deploy VM4 to West US: No \nYou can deploy VM5 to West US: No"\n}\n{
        key: "D"\ntext: "\nYou can deploy VM3 to West US: No \nYou can deploy VM4 to West US: Yes \nYou can deploy VM5 to West US: No"\n}\n{
        key: "E"\ntext: "\nYou can deploy VM3 to West US: No \nYou can deploy VM4 to West US: No \nYou can deploy VM5 to West US: Yes"\n}\n{
        key: "F"\ntext: "\nYou can deploy VM3 to West US: No \nYou can deploy VM4 to West US: No \nYou can deploy VM5 to West US: No"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "The Total Regional vCPU quota for West US is 20 vCPUs."\n\nVM1 (running) uses 2 vCPUs. VM2 (stopped, deallocated) uses 16 vCPUs but deallocated VMs do Not consume vCPU quota at runtime.\n\nHowever, in the context of the exam explanation, the important point is how the quotas are enforced:\nAccording to the official answer, deallocated VMs still count against the family / regional quota in this scenario.\n\nSo effectively, for B-series in West US:\n- VM1 (2 vCPUs) + VM2 (16 vCPUs) = 18 vCPUs of B-series quota used.\nThis leaves only 2 vCPUs capacity inside the 20 vCPU regional limit.\n\nPlanned VMs:\n- VM3 (1 vCPU): 18 + 1 = 19 vCPUs total → within the B-series and regional quota → allowed.\n- VM4 (4 vCPUs, D-series): would push the regional total beyond allowed limits when combined with existing consumption according to the exam's quota interpretation → Not allowed.\n- VM5 (16 vCPUs, B-series): would clearly exceed the B-series quota and the overall regional limit → Not allowed.\n\nTherefore:\n- VM3: YES.\n- VM4: No.\n- VM5: No.\n\nRight answer: C`,
  },
  {
    id: "Q306",
    number: 306,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have Azure virtual machines that run Windows Server 2019 and are configured as shown in the following table.\n\n| Name | Private IP addr. | Public IP addr. | VirtualNetworkName | DNS suffix conf. in Win. Server |\n|------|--------------------|-------------------|----------------------|-----------------------------------------|\n| VM1  | 10.1.0.4           | 52.186.85.63      | VNET1                | adatum.com                              |\n| VM2  | 10.1.0.5           | 13.92.168.13      | VNET1                | contoso.com                             |\n\nYou create a private Azure DNS zone named adatum.com. You configure the adatum.com zone to allow auto registration from VNET1.\n\nWhich A records will be added to the adatum.com zone for each virtual machine?\n\n(Each correct selection is worth one point.)`,
    options: `{
        key: "A"\ntext: "\nA records for VM1: None; \nA records for VM2: None."\n}\n{
        key: "B"\ntext: "\nA records for VM1: Private IP address only; \nA records for VM2: Private IP address only."\n}\n{
        key: "C"\ntext: "\nA records for VM1: Private IP address only; \nA records for VM2: None."\n}\n{
        key: "D"\ntext: "\nA records for VM1: Private IP address and public IP address; \nA records for VM2: Private IP address only."\n}\n{
        key: "E"\ntext: "\nA records for VM1: Public IP address only; \nA records for VM2: None."\n}\n{
        key: "F"\ntext: "\nA records for VM1: Private IP address and public IP address; \nA records for VM2: Private IP address and public IP address."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Azure DNS private zones with auto-registration create A (and PTR) records automatically for VMs in a linked virtual network, based on their primary NIC private IP addresses."\n\nThe DNS suffix configured inside the OS (adatum.com or contoso.com) does Not control whether the VM is registered into the private zone; the VNet link with auto-registration does.\n\nPublic IP addresses are Not registered in private DNS zones.\n\nBoth VM1 and VM2 are in VNET1, which is linked to the adatum.com private zone with auto-registration enabled.\n\nTherefore, each VM will have an A record in adatum.com pointing to its private IP address only.\n\nRight answer: B`,
  },
  {
    id: "Q307",
    number: 307,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription. The subscription contains virtual machines that run Windows Server 2016 and are configured as shown in the following table.\n\n| Name | Virtual network | DNS suffix configured in Windows Server |\n|------|-----------------|------------------------------------------|\n| VM1  | VNET1           | contoso.com                             |\n| VM2  | VNET1           | (None)                                  |\n| VM3  | VNET1           | adatum.com                              |\n\nYou create a public Azure DNS zone named adatum.com and a private Azure DNS zone named contoso.com.\nYou create a virtual network link for contoso.com as shown in the following exhibit:\n\n![Azure Portal](/images/q307-sc1.png)\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n`,
    options: `{
        key: "A"\ntext: "\nWhen VM1 starts, a record for VM1 is added to the contoso.com DNS zone: YES; \nWhen VM2 starts, a record for VM2 is added to the contoso.com DNS zone: YES; \nWhen VM3 starts, a record for VM3 is added to the adatum.com DNS zone: YES."\n}\n{
        key: "B"\ntext: "\nWhen VM1 starts, a record for VM1 is added to the contoso.com DNS zone: YES; \nWhen VM2 starts, a record for VM2 is added to the contoso.com DNS zone: YES; \nWhen VM3 starts, a record for VM3 is added to the adatum.com DNS zone: No."\n}\n{
        key: "C"\ntext: "\nWhen VM1 starts, a record for VM1 is added to the contoso.com DNS zone: YES; \nWhen VM2 starts, a record for VM2 is added to the contoso.com DNS zone: No; \nWhen VM3 starts, a record for VM3 is added to the adatum.com DNS zone: No."\n}\n{
        key: "D"\ntext: "\nWhen VM1 starts, a record for VM1 is added to the contoso.com DNS zone: No; \nWhen VM2 starts, a record for VM2 is added to the contoso.com DNS zone: YES; \nWhen VM3 starts, a record for VM3 is added to the adatum.com DNS zone: No."\n}\n{
        key: "E"\ntext: "\nWhen VM1 starts, a record for VM1 is added to the contoso.com DNS zone: No; \nWhen VM2 starts, a record for VM2 is added to the contoso.com DNS zone: No; \nWhen VM3 starts, a record for VM3 is added to the adatum.com DNS zone: YES."\n}\n{
        key: "F"\ntext: "\nWhen VM1 starts, a record for VM1 is added to the contoso.com DNS zone: No; \nWhen VM2 starts, a record for VM2 is added to the contoso.com DNS zone: No; \nWhen VM3 starts, a record for VM3 is added to the adatum.com DNS zone: No."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Auto-registration for an Azure DNS private zone works per VNet link; all VMs in the linked VNet with DHCP-assigned primary private IPs are registered."\n\nThe DNS suffix configured inside the OS does Not need to match the zone name to be auto-registered.\n\nFor contoso.com (private zone), VNET1 is linked with auto-registration enabled:\n- VM1 is in VNET1 → an A record for VM1 is added to contoso.com.\n- VM2 is also in VNET1 → an A record for VM2 is added to contoso.com.\n\nThe public zone adatum.com has No VNet link and does Not support auto-registration; records must be created manually.\n- Therefore, VM3 is Not automatically added to adatum.com.\n\nSo the correct combination is: YES / YES / No.\n\nRight answer: B`,
  },
  {
    id: "Q308",
    number: 308,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains the resource groups shown in the following table.\n\n| Name | Location |\n|------|----------|\n| RG1  | West US  |\n| RG2  | East US  |\n\nRG1 contains the resources shown in the following table.\n\n| Name    | Type              | Location |\n|---------|-------------------|----------|\n| storage1| Storage account   | West US  |\n| VNet1   | Virtual network   | West US  |\n| NIC1    | Network interface | West US  |\n| Disk1   | Disk              | West US  |\n| VM1     | Virtual machine   | West US  |\n\nVM1 is running and connects to NIC1 and Disk1. NIC1 connects to VNet1.\n\nRG2 contains a public IP address named IP2 that is in the East US location. IP2 is Not assigned to a virtual machine.\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n\nStatements:\n- You can move storage1 to RG2.\n- You can move NIC1 to RG2.\n- If you move IP2 to RG1, the location of IP2 will change.`,
    options: `{
        key: "A"\ntext: "\nstorage1 → RG2: YES; \nNIC1 → RG2: YES; \nIP2 location changes: YES."\n}\n{
        key: "B"\ntext: "\nstorage1 → RG2: YES; \nNIC1 → RG2: YES; \nIP2 location changes: No."\n}\n{
        key: "C"\ntext: "\nstorage1 → RG2: YES; \nNIC1 → RG2: No; \nIP2 location changes: YES."\n}\n{
        key: "D"\ntext: "\nstorage1 → RG2: YES; \nNIC1 → RG2: No; \nIP2 location changes: No."\n}\n{
        key: "E"\ntext: "\nstorage1 → RG2: No; \nNIC1 → RG2: No; \nIP2 location changes: YES."\n}\n{
        key: "F"\ntext: "\nstorage1 → RG2: No; \nNIC1 → RG2: No; \nIP2 location changes: No."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Most Azure resources can be moved between resource groups within the same subscription without changing their region."\n\nstorage1 is in West US; moving it from RG1 to RG2 (which is only a logical container) is supported and does Not change the storage account's region.\n\nNIC1 can also be moved to a different resource group in the same subscription; its region (West US) remains unchanged.\n\nPublic IP addresses are region-specific. You can move IP2 (which is in East US) to RG1 as long as the subscription is the same, but its region remains East US.\n\nTherefore:\n- You can move storage1 to RG2 → YES.\n- You can move NIC1 to RG2 → YES.\n- Moving IP2 to RG1 does Not change its location → No.\n\nRight answer: B`,
  },
  {
    id: "Q309",
    number: 309,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure web app named WebApp1 that runs in an Azure App Service plan named ASP1. ASP1 is based on the D1 pricing tier.\nYou need to ensure that WebApp1 can be accessed only from computers on your on-premises network. The solution must minimize costs.\n\nWhat should you configure?\n\n(Each correct selection is worth one point.)\n\nAnswer area:\n- Pricing tier for ASP1:\n  * B1\n  * P1v2\n  * S1\n\n- Settings for WebApp1:\n  * Cross-origin resource sharing (CORS)\n  * Networking\n  * SSL`,
    options: `{
        key: "A"\ntext: "\nPricing tier for ASP1: B1; \nSettings for WebApp1: Cross-origin resource sharing (CORS)."\n}\n{
        key: "B"\ntext: "\nPricing tier for ASP1: B1; \nSettings for WebApp1: Networking."\n}\n{
        key: "C"\ntext: "\nPricing tier for ASP1: P1v2; \nSettings for WebApp1: SSL."\n}\n{
        key: "D"\ntext: "\nPricing tier for ASP1: P1v2; \nSettings for WebApp1: Cross-origin resource sharing (CORS)."\n}\n{
        key: "E"\ntext: "\nPricing tier for ASP1: S1; \nSettings for WebApp1: SSL."\n}\n{
        key: "F"\ntext: "\nPricing tier for ASP1: S1; \nSettings for WebApp1: Networking."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Restricting access to an App Service app by client IP is done via IP restrictions under the 'Networking' blade of the web app."\n\nD1 (Shared) does Not support all networking features; the minimum paid tier that supports IP restrictions is B1 (Basic).\n\nTo minimize costs, you upgrade ASP1 from D1 to B1 rather than to S1 or P1v2.\n\nCORS controls browser-based cross-origin requests, Not network-layer access from specific IP ranges.\nSSL controls certificates and HTTPS bindings, Not source-IP-based access management.\n\nTherefore, the correct configuration is:\n- Upgrade ASP1 to B1, and\n- Configure IP restrictions under WebApp1 → Networking.\n\nRight answer: B`,
  },
  {
    id: "Q310",
    number: 310,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You are a cloud administrator for a company. You have an Azure web app named WebApp1.\nYou need to provide developers with a copy of WebApp1 that they can modify without affecting the production WebApp1.\nWhen the developers finish testing their changes, you must be able to switch the current online version of WebApp1 to the new version.\n\nWhich command should you run to prepare the environment?\n\n(Each correct selection is worth one point.)\n\nAnswer area (PowerShell snippets):\n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -SourceWebApp WebApp1 -Slot Staging`,
    options: `{
        key: "A"\ntext: "\nNew-AzureRmWebApp \n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -SourceWebApp \nWebApp1 -Slot Staging"\n}\n{
        key: "B"\ntext: "\nNew-AzureRmWebApp \n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -AseName \nWebApp1 -Slot Staging"\n}\n{
        key: "C"\ntext: "\nNew-AzureRmWebAppBackup \n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -DefaultProfile \nWebApp1 -Slot Staging"\n}\n{
        key: "D"\ntext: "\nNew-AzureRmWebAppSlot \n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -SourceWebApp \nWebApp1 -Slot Staging"\n}\n{
        key: "E"\ntext: "\nSwitch-AzureRmWebAppSlot \n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -AseName \nWebApp1 -Slot Staging"\n}\n{
        key: "F"\ntext: "\nSwitch-AzureRmWebAppSlot \n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -DefaultProfile \nWebApp1 -Slot Staging"\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "The requirement is to create a separate deployment slot for WebApp1 so that developers can deploy and test changes without impacting production, and later swap slots."\n\nDeployment slots are created with the New-AzureRmWebAppSlot cmdlet.\n\nThe parameters here:\n-ResourceGroupName AdatumWebApps -Name WebApp1 -AppServicePlan ADatumASP1 -SourceWebApp WebApp1 -Slot Staging\ncreate a new slot named 'Staging' for the existing WebApp1, copying configuration from the source web app.\n\nSwitch-AzureRmWebAppSlot is used later to swap between production and the staging slot, Not to create the slot.\n\nTherefore, the correct command to prepare the environment is New-AzureRmWebAppSlot.\n\nRight answer: D`,
  },
  {
    id: "Q311",
    number: 311,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains a virtual network named VNet1. VNet 1 has two subnets named Subnet1 and Subnet2.\n\nVNet1 is located in the West Europe Azure region.\n\nThe subscription contains the virtual machines in the following table:\n\nVM Name | Connected to\n-|-\nVM1     | Subnet1\nVM2     | Subnet1\nVM3     | Subnet2\n\nYou need to deploy an Application Gateway named AppGW1 into VNet1.\n\nWhat should you do first?`,
    options: `{ key: "A"\ntext: "Add a service endpoint." }\n{ key: "B"\ntext: "Add a new virtual network." }\n{ key: "C"\ntext: "Move VM3 to Subnet1." }\n{ key: "D"\ntext: "Stop VM1 and VM2." }\n],
    correctAnswers: ["C"],
    explanation: [
      "An Azure Application Gateway must be deployed into a dedicated subnet. This subnet must Not contain any other resources."\n\nCurrently:\n• Subnet1 contains VM1 and VM2 → Not empty.\n• Subnet2 contains VM3 → Not empty.\n\nTherefore, before you can deploy the application gateway, you must ensure that one subnet is completely empty.\n\nThe only way to achieve this with the existing layout is:\n✔ Move VM3 out of Subnet2 so that Subnet2 becomes empty.\n\nThen AppGW1 can be deployed into Subnet2.\n\nWhy the other answers are incorrect:\n• Adding a service endpoint does Not modify subnet occupancy.\n• Adding a new VNet is unnecessary and would Not meet the requirement to deploy AppGW1 in VNet1.\n• Stopping VM1 and VM2 does Not remove them from the subnet.\n\nRight answer: C`,
  },
  {
    id: "Q312",
    number: 312,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 that contains an Azure virtual machine named VM1. VM1 is located in a resource group named RG1.\nServices running on VM1 must be able to deploy and manage resources in RG1 by using the identity of VM1.\n\nYou must ensure that VM1 can authenticate to Azure AD without storing credentials and use its own identity to manage RG1.\n\nWhat should you do?`,
    options: `{ key: "A"\ntext: "Modify the Access control (IAM) settings of VM1." }\n{ key: "B"\ntext: "Modify the Policy settings of RG1." }\n{
        key: "C"\ntext: "Enable the managed identity (system-assigned) for VM1."\n}\n{ key: "D"\ntext: "Modify the Access control (IAM) settings of RG1." }\n],
    correctAnswers: ["C"],
    explanation: [
      "Azure Managed Identities allow Azure resources (such as VMs) to obtain identities without secrets or certificates."\n\nEnabling the system-assigned identity on VM1 creates a service principal representing VM1. VM1 can then request tokens from the IMDS endpoint and authenticate to Azure.\n\nAfter enabling Managed Identity:\n→ You can assign RBAC permissions on RG1 to the VM1 identity.\n\nWhy other answers are wrong:\n• IAM on VM1 only controls access to VM1, Not permissions of VM1 itself.\n• Policies do Not assign identities.\n• IAM on RG1 becomes relevant after the VM has an identity, Not before.\n\nCorrect step:\n✔ Enable the system-assigned managed identity on VM1.\n\nRight answer: C`,
  },
  {
    id: "Q313",
    number: 313,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You are configuring Azure AD Privileged Identity Management (PIM).\n\nA user named Admin1 must be granted read access to a resource group named RG1.\nThe assignment must:\n• Become active immediately\n• Last only one month\n\nWhat should you do?`,
    options: `{ key: "A"\ntext: "Assign an active role with a start and end date." }\n{ key: "B"\ntext: "Assign Admin1 as eligible for the Reader role." }\n{ key: "C"\ntext: "Assign a permanently active role." }\n{
        key: "D"\ntext: "Create a custom role and apply a Conditional Access Policy."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "In PIM, active assignments take effect immediately. Eligible roles require activation by the user."\n\nSince Admin1 must have:\n• Access immediately → requires an active assignment.\n• Access only for one month → you can set an assignment start and end date.\n\nThis matches PIM’s ability to define time-bound active assignments.\n\nWhy others are wrong:\n• Eligible roles require manual activation → violates 'immediately active'.\n• Permanent active role violates 'only one month'.\n• A custom role is unnecessary and unrelated to scheduling access.\n\nTherefore:\n✔ Assign an active time-bound role.\n\nRight answer: A`,
  },
  {
    id: "Q314",
    number: 314,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You plan to create a custom Azure AD role.\n\nThe role must:\n• Allow viewing all resources in the subscription\n• Allow creating support requests to Microsoft\n• Follow the principle of least privilege\n\nYou must complete the JSON definition of the custom role. Which entries should you use?\n\n![Azure Portal](/images/q314-sc1.png)`,
    options: `{ key: "A"\ntext: '\nP1 = "*/*"  \nP2 = "*/*"' }\n{ key: "B"\ntext: '\nP1 = "*/*"  \nP2 = "*/Microsoft.Support"' }\n{ key: "C"\ntext: '\nP1 = "*/read"  \nP2 = "*/Microsoft.Support"' }\n{ key: "D"\ntext: '\nP1 = "*/read"  \nP2 = "Microsoft.Support/*"' }\n{ key: "E"\ntext: '\nP1 = "read/*"  \nP2 = "*/*"' }\n{ key: "F"\ntext: '\nP1 = "read/*"  \nP2 = "Microsoft.Support/*"' }\n],
    correctAnswers: ["D"],
    explanation: [
      '"*/read" grants read-only access to all resource types.'\nThis satisfies the requirement: view all resources in the subscription.\n\nTo allow support request creation, the role must include:\n→ Microsoft.Support/*\n\nWhy the others are wrong:\n• "*/*" would grant full control → violates least privilege.\n• "read/*" is Not valid syntax (Azure requires "*/read").\n• "*/Microsoft.Support" is incomplete — must be "Microsoft.Support/*".\n\nTherefore the correct minimal JSON entries are:\n✔ P1 = "*/read"\n✔ P2 = "Microsoft.Support/*"\n\nRight answer: D`,
  },
  {
    id: "Q315",
    number: 315,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure AD tenant and Subscription1. Azure AD Privileged Identity Management (PIM) is enabled.\n\nMembers of the Lab Creator role should:\n• Not have permanent privileges\n• Be required to request activation (just-in-time)\n\nWhat should you do first?`,
    options: `{
        key: "A"\ntext: "Edit the role settings for the Lab Creator role in PIM."\n}\n{ key: "B"\ntext: "Modify the role members in Subscription1." }\n{
        key: "C"\ntext: "Create a user-risk policy in Azure AD Identity Protection."\n}\n{
        key: "D"\ntext: "Use PIM to discover Azure resources for Subscription1."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "To enforce just-in-time activation, you must configure the role settings inside PIM:"\n• Require activation\n• Define activation duration\n• (Optionally) require MFA or approval\n\nThis transforms permanent assignments into eligible assignments.\n\nWhy wrong:\n• Changing members doesn’t affect JIT behavior.\n• Risk policies do Not impact PIM role activation.\n• Discovery is irrelevant to enforcing activation policy.\n\nCorrect:\n✔ Modify the PIM role settings for Lab Creator.\n\nRight answer: A`,
  },
  {
    id: "Q316",
    number: 316,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You created an Azure subscription associated with a basic Azure AD tenant.\nYou must receive email Notifications whenever any user activates an administrative role.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "Purchase Azure AD Premium P2 and configure PIM Notifications."\n}\n{ key: "B"\ntext: "Purchase EMS E3 and configure conditional access." }\n{
        key: "C"\ntext: "Purchase EMS E5 and create a custom alert rule in Azure Security Center."\n}\n{
        key: "D"\ntext: "Purchase Azure AD Premium P1 and enable Identity Protection."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Only Azure AD Premium P2 includes Privileged Identity Management (PIM)."\nPIM is the service that sends email Notifications for:\n• Role activation\n• Role assignment\n• Approval required Notifications\n\nAzure AD Premium P1 does NoT include PIM.\nEMS E3/E5 do Not, by themselves, satisfy the explicit requirement for PIM-based administrative role activation alerts.\n\nCorrect:\n✔ Purchase Azure AD Premium P2 and configure PIM Notifications.\n\nRight answer: A`,
  },
  {
    id: "Q317",
    number: 317,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure Active Directory (Azure AD) tenant that contains three global administrators named Admin1, Admin2, and Admin3.\n\nThe tenant is associated to an Azure subscription. Access control for the subscription is configured as shown in the following exhibit.\n\n![Azure Portal](/images/q317-sc1.png)\n\nYou sign in to the Azure portal as Admin1 and configure the tenant as shown in the following exhibit.\n![Azure Portal](/images/q317-sc2.png)\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.`,
    options: `{
        key: "A"\ntext: "\nAdmin1 can add Admin2 as an owner of the subscription: Yes  \nAdmin2 can add Admin1 as an owner of the subscription: Yes  \nAdmin2 can create a resource group in the subscription: Yes"\n}\n{
        key: "B"\ntext: "\nAdmin1 can add Admin2 as an owner of the subscription: Yes  \nAdmin2 can add Admin1 as an owner of the subscription: Yes  \nAdmin2 can create a resource group in the subscription: No"\n}\n{
        key: "C"\ntext: "\nAdmin1 can add Admin2 as an owner of the subscription: No  \nAdmin2 can add Admin1 as an owner of the subscription: Yes  \nAdmin2 can create a resource group in the subscription: Yes"\n}\n{
        key: "D"\ntext: "\nAdmin1 can add Admin2 as an owner of the subscription: Yes  \nAdmin2 can add Admin1 as an owner of the subscription: No  \nAdmin2 can create a resource group in the subscription: Yes"\n}\n{
        key: "E"\ntext: "\nAdmin1 can add Admin2 as an owner of the subscription: No  \nAdmin2 can add Admin1 as an owner of the subscription: No  \nAdmin2 can create a resource group in the subscription: Yes"\n}\n{
        key: "F"\ntext: "\nAdmin1 can add Admin2 as an owner of the subscription: No  \nAdmin2 can add Admin1 as an owner of the subscription: No  \nAdmin2 can create a resource group in the subscription: No"\n}\n],
    correctAnswers: ["F"],
    explanation: [
      "Because the tenant setting 'Global admins can manage Azure subscriptions and Management Groups' is disabled,"\n→ Global Administrators have No RBAC rights in the subscription by default.\n\nOnly Admin3 is Owner and thus has subscription-level permissions.\n\nTherefore:\n• Admin1 canNot add an Owner → has No access to the subscription.\n• Admin2 canNot add an Owner → has No access to the subscription.\n• Admin2 canNot create resource groups → requires Contributor or higher permission on the subscription.\n\nCorrect:\n✔ Admin1: No\n✔ Admin2: No\n✔ Admin2 RG create: No\n\nRight answer: F`,
  },
  {
    id: "Q318",
    number: 318,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You manage an Azure AD Conditional Access policy named Policy1.\nPolicy1 enforces that members of the Global Administrators group may authenticate only from Azure AD joined devices when accessing Azure AD from untrusted locations.\n\nNow you must additionally enforce multi-factor authentication from untrusted locations.\n\nWhat should you do?`,
    options: `{ key: "A"\ntext: "Modify the MFA service settings page." }\n{ key: "B"\ntext: "Modify MFA user settings." }\n{ key: "C"\ntext: "Modify the grant controls of Policy1." }\n{ key: "D"\ntext: "Modify the session controls of Policy1." }\n],
    correctAnswers: ["C"],
    explanation: [
      "Conditional Access enforces MFA through Grant controls."\nYou can add:\n✔ Require multi-factor authentication\n\nSession controls affect behavior after authentication (e.g., sign-in frequency, persistent browser sessions), Not the MFA requirement itself.\nMFA service settings and user settings do Not override Conditional Access policies.\n\nCorrect action:\n✔ Edit Policy1 → Grant → Require multi-factor authentication.\n\nRight answer: C`,
  },
  {
    id: "Q319",
    number: 319,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You assign the Conditional Access Administrator role to a user named Admin1 via Azure AD.\n\nAdmin1 must have just-in-time access (eligible, Not permanent).\n\nWhat should you do next?`,
    options: `{ key: "A"\ntext: "Enable MFA." }\n{
        key: "B"\ntext: "Set Admin1 as Eligible for the Privileged Role Administrator role."\n}\n{
        key: "C"\ntext: "Set Admin1 as Eligible for the Conditional Access Administrator role."\n}\n{ key: "D"\ntext: "Enable Azure AD Identity Protection." }\n],
    correctAnswers: ["C"],
    explanation: [
      "Just-in-time access in PIM requires that the role assignment is configured as Eligible (Not Active)."\n\nEligible assignments:\n• Do Not grant continuous permissions.\n• Require the user to activate the role when needed.\n\nTherefore you must set Admin1 as Eligible for the same role (Conditional Access Administrator) in PIM.\n\nWhy others are wrong:\n• Enabling MFA is good practice but does Not create JIT access.\n• Privileged Role Administrator is a different role and Not required here.\n• Identity Protection does Not create eligible PIM assignments.\n\nCorrect:\n✔ Set Admin1 as Eligible for the Conditional Access Administrator role.\n\nRight answer: C`,
  },
  {
    id: "Q320",
    number: 320,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "hard",
    question: `You must migrate an AWS EC2 VM named VM1 to Azure using Azure Site Recovery (ASR).\n\nYou have the following Azure resources:\n• VNet1\n• Recovery Services vault\n• Replication policy ReplPolicy1\n• Azure Storage account\n\nYou must determine the correct sequence of actions.\n\n| Col1 |\n|------|\n|1. Install Azure Site Recovery Unified Setup.      |\n|2. Create an Azure Migrate project.      |\n|3. Enable Windows PowerShell Remoting on VM1.      |\n|4. Deploy an EC2 VM as a configuration server.      |\n|5. Enable replication for VM1.      |\n\nWhich three actions should you perform, and in what order?`,
    options: `{ key: "A"\ntext: "Sequence: 2 → 4 → 5" }\n{ key: "B"\ntext: "Sequence: 4 → 3 → 5" }\n{ key: "C"\ntext: "Sequence: 1 → 3 → 5" }\n{ key: "D"\ntext: "Sequence: 4 → 1 → 5" }\n],
    correctAnswers: ["D"],
    explanation: [
      "When migrating AWS EC2 VMs via Azure Site Recovery, the process is similar to physical server migration:"\n\nStep 1 — Deploy a configuration server (on AWS):\nYou deploy a dedicated configuration server VM inside AWS to handle:\n• Discovery of VM1\n• Replication orchestration\n\nStep 2 — Install Azure Site Recovery Unified Setup on the configuration server:\nThis installs:\n• Configuration server components\n• Process server components\n• Dependency agent\n\nStep 3 — Enable replication for VM1 in Azure Site Recovery:\nOnce the configuration server is registered with the Recovery Services vault, you can enable replication for VM1.\n\nWhy others are wrong:\n• Azure Migrate (Action 2) is a different migration path and is Not required when the question explicitly states Azure Site Recovery.\n• Windows PowerShell remoting (Action 3) is Not a prerequisite for ASR-based AWS-to-Azure replication.\n\nCorrect sequence:\n✔ 4 → Deploy an EC2 VM as a configuration server.\n✔ 1 → Install Azure Site Recovery Unified Setup.\n✔ 5 → Enable replication for VM1.\n\nRight answer: D`,
  },
  {
    id: "Q321",
    number: 321,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an on-premises network that contains a Hyper-V host named Host1.\nHost1 runs Windows Server 2016 and hosts 10 virtual machines that also run Windows Server 2016.\n\nYou plan to replicate these virtual machines to Azure by using Azure Site Recovery (ASR).\n\nYou already created:\n• A Recovery Services vault named ASR1\n• A Hyper-V site named Site1\n\nYou need to add Host1 to ASR1 so that its VMs can be replicated.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "\nDownload the Azure Site Recovery Provider installation \nDownload the vault registration key.\nInstall the Provider on Host1 and register the server."\n}\n{
        key: "B"\ntext: "\nDownload the Azure Site Recovery Provider installation file \nDownload storage account key. \nInstall the Provider on Host1 and register the server."\n}\n{
        key: "C"\ntext: "\nDownload the Azure Site Recovery Provider installation file \nDownload vault registration key. \nInstall the Provider on each virtual machine and register the virtual machines."\n}\n{
        key: "D"\ntext: "\nDownload the Azure Site Recovery Provider installation file \nDownload storage account key. \nInstall the Provider on each virtual machine and register the virtual machines."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "For a Hyper-V–based ASR deployment (without VMM), Site Recovery works at the Hyper-V host level, Not at the guest VM level."\n\nTo bring Host1 under ASR management, you must:\n1. In the Recovery Services vault (ASR1), download:\n   • The Azure Site Recovery Provider installer for Hyper-V, and\n   • The vault registration key (used to bind the host to the vault).\n2. Install the Provider on the Hyper-V host (Host1), Not inside the guest VMs.\n3. During installation, use the registration key to register Host1 to the Hyper-V site (Site1).\n\nAfter Host1 is registered, you can select its virtual machines and enable replication.\n\nWhy the other options are wrong:\n• Using a storage account key is Not how ASR registers Hyper-V hosts. Registration is always done with a vault registration key.\n• Installing the Provider inside each VM is incorrect for Hyper-V scenarios. ASR integrates at the host layer, so it sees and replicates the VMs from there.\n\nTherefore, you must install and register the Provider on Host1 using the vault registration key.\n\nRight answer: A`,
  },
  {
    id: "Q322",
    number: 322,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You plan to move services from your on-premises environment to Azure.\n\nYou identified several virtual machines that might be migrated. The VMs are:\n\nName      | Role                    | OS                    | Environment\n--------- | ----------------------- | --------------------- |-------------------------------\nSea-DC01  | Domain Controller       | Windows Server 2016   | Hyper-V on Windows Server 2016\nNYC-FS01  | File Server             | Windows Server 2012 R2| VMware vCenter 5.1\nBOS-DB01  | Microsoft SQL Server    | Windows Server 2016   | VMware vCenter 6.0\nSea-CA01  | Certification Authority | Windows Server 2012 R2| Hyper-V on Windows Server 2016\nHou-NW01  | DHCP/DNS                | Windows Server 2008 R2| VMware vCenter 5.5\n\nYou want to use Azure Migrate to assess which of these VMs can be discovered and assessed.\n\nWhich two virtual machines can you assess by using Azure Migrate?\n(Each correct answer presents a complete solution.)`,
    options: `{ key: "A"\ntext: "Sea-CA01" }\n{ key: "B"\ntext: "Hou-NW01" }\n{ key: "C"\ntext: "NYC-FS01" }\n{ key: "D"\ntext: "Sea-DC01" }\n{ key: "E"\ntext: "BOS-DB01" }\n],
    correctAnswers: ["B"\nE"],
    explanation: [
      "This scenario describes the classic Azure Migrate behavior:\n\n• Classic Azure Migrate initially supported assessment for VMware VMs managed by vCenter Server versions 5.5, 6.0, or 6.5.\n• Hyper-V–based environments were Not yet supported by Azure Migrate in that mode.\n\nEvaluate each VM:\n• Sea-DC01 → Hyper-V on Windows Server 2016 → Not supported in this classic scenario.\n• NYC-FS01 → vCenter 5.1 → vCenter 5.1 is Not in the supported list (needs 5.5+).\n• BOS-DB01 → vCenter 6.0 → supported.\n• Sea-CA01 → Hyper-V on Windows Server 2016 → Not supported in this classic scenario.\n• Hou-NW01 → vCenter 5.5 → supported.\n\nTherefore, the VMs that can be discovered and assessed by Azure Migrate in this scenario are:\n✔ Hou-NW01 (vCenter 5.5)\n✔ BOS-DB01 (vCenter 6.0)\n\nRight answers: B and E`,
  },
  {
    id: "Q323",
    number: 323,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You create an Azure Migrate project named TestMig in a resource group named test-migration.\n\nYou need to discover which on-premises VMware virtual machines should be assessed for migration.\n\nWhich three actions should you perform, and in what order?\n| Actions |\n|------|\n|1. Create a collector virtual machine.      |\n|2. Download the OVA file for the collector appliance.      |\n|3. Create a migration group in the project.      |\n|4. Configure the collector appliance and start discovery.      |\n|5. Create an assessment in the project.      |`,
    options: `{ key: "A"\ntext: "Sequence: 2, 1, 4" }\n{ key: "B"\ntext: "Sequence: 3, 1, 4" }\n{ key: "C"\ntext: "Sequence: 1, 2, 4" }\n{ key: "D"\ntext: "Sequence: 3, 2, 4" }\n],
    // Multi-select: correct three actions; order explained in the explanation
    correctAnswers: ["A"],
    explanation: [
      "For VMware discovery with Azure Migrate (Server Assessment), you deploy a collector appliance on-premises."\n\nThe correct discovery sequence is:\n\n1. Download the OVA file for the collector appliance.\n   • The OVA is the preconfigured virtual machine image provided by Azure Migrate.\n\n2. Create a collector virtual machine.\n   • Import/deploy the downloaded OVA into your vCenter/ESXi environment.\n\n3. Configure the collector appliance and start discovery.\n   • During configuration, you point the collector to:\n     – The Azure Migrate project, and\n     – vCenter/ESXi (address, credentials, etc.).\n   • Then you start discovery, which collects metadata and performance data from your VMs.\n\nOnly after discovery is running and data is collected do you typically:\n• Create migration groups, and\n• Create assessments.\n\nTherefore, the three actions you must perform are:\n✔ Download the OVA file for the collector appliance (B)\n✔ Create a collector virtual machine (A)\n✔ Configure the collector appliance and start discovery (D)\n`,
  },
  {
    id: "Q324",
    number: 324,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `\`You are an administrator for a company. Your company has offices in New York and Los Angeles.

You have an Azure subscription that contains an Azure virtual network named VNet1. Each office has a site-to-site VPN connection to VNet1.

Each network uses the address spaces shown in the following table:\`\n\n| Location | IP address space |\n|------|------|\n|   VNet1   |   192.168.0.0/20   |\n|  New York     | 10.0.0.0/16     |\n| Los Angeles     | 10.10.0.0/16     |\n\nYou must ensure that all Internet-bound traffic from VNet1 is routed through the New York office (forced tunneling).\n\nWhat should you configure?`,
    options: `{
        key: "A"\ntext: "\nIn Azure, run: New-AzureRmLocalNetworkGateway \nOn a VPN device in the New York office, set the traffic selector to: 0.0.0.0/0."\n}\n{
        key: "B"\ntext: "\nIn Azure, run New-AzureRmLocalNetworkGateway. \nOn a VPN device in the New York office, set the traffic selector to: 192.168.0.0/20"\n}\n{
        key: "C"\ntext: "\nIn Azure, run New-AzureRmVirtualNetworkGatewayConnection. \nOn a VPN device in the New York office, set the traffic selector to: 10.0.0.0/16."\n}\n{
        key: "D"\ntext: "\nIn Azure, run New-AzureRmVirtualNetworkGatewayConnection. \nOn a VPN device in the New York office, set the traffic selector to: 0.0.0.0/0"\n}\n{
        key: "E"\ntext: "\nIn Azure, run Set-AzureRmVirtualNetworkGatewayDefaultSite. \nOn a VPN device in the New York office, set the traffic selector to: 192.168.0.0/20"\n}\n{
        key: "F"\ntext: "\nIn Azure, run: Set-AzureRmVirtualNetworkGatewayDefaultSite \nOn a VPN device in the New York office, set the traffic selector to: 10.0.0.0/16"\n}\n],
    correctAnswers: ["E"],
    explanation: [
      "To force tunnel all Internet traffic from VNet1 through the New York site, you must:"\n\n1. Configure a default site on the Azure VPN gateway.\n   • You use Set-AzureRmVirtualNetworkGatewayDefaultSite to point the VPN gateway’s default site to the New York local network gateway.\n   • This tells Azure: “All 0.0.0.0/0 traffic that is Not otherwise matched should go through the New York VPN.”\n\n2. Configure the traffic selector on the New York VPN device.\n   • The traffic selector (IPsec SA selector) needs to match the VNet’s address space (192.168.0.0/20) so that all traffic from that space is allowed through the tunnel.\n\nWhy the other answers are wrong:\n• Creating or changing only the Local Network Gateway or the Connection does Not by itself enable forced tunneling.\n• The key step for forced tunneling is the DefaultSite configuration on the Virtual Network Gateway.\n\nTherefore, the correct Azure-side action is:\n✔ Use Set-AzureRmVirtualNetworkGatewayDefaultSite to set the New York site as the default,\nand ensure the New York VPN device has a traffic selector matching VNet1’s address range.\n\nRight answer: E`,
  },
  {
    id: "Q325",
    number: 325,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 that contains the resources in the following table.\n\n| Name | Type |\n|------|------|\n|VM1      | virtualMachine     |\n|VM2      | virtualMachine     |\n| AppGW1      |Application gateway      |\n\nVM1 and VM2 run the websites in the following table.\n\n| Name | Host header |\n|------|------|\n|Default      |Not applicable      |\n|Web1      | site1.contoso.com     |\n|Web2      | site2.contoso.com     |\n\nAppGW1 has the backend pools in the following table.\n\n| Name | Virtual machines |\n|------|------|\n|  Pool1    | VM1     |\n|  Pool2    |  VM2    |\n\nDNS resolves site1.contoso.com, site2.contoso.com, and site3.contoso.com to the IP address of AppGW1.\nAppGW1 has the listeners in the following table.\n\n| Name | Protocol | Associated rule | Host name |\n|------|------------|-----------------|-----------------|\n| Listener1 | HTTP | - | site1.contoso.com |\n| Listener2 | HTTP | Rule2 |site2.contoso.com |\n| Listener3 | HTTP | Rule3 | — |\n\nAppGW1 has the rules in the following table.\n| Name | Type | Listener | Backend pool |\n|------|------------|-----------------|-----------------|\n| Rule2 | Basic | Listener2 | Pool1 |\n| Rule3 | Basic | Listener3 |Pool2 |\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.`,
    options: `{
        key: "A"\ntext: "\nIf you browse to site1.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site2.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site3.contoso.com from the Internet, you will be directed to VM1: Yes"\n}\n{
        key: "B"\ntext: "\nIf you browse to site1.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site2.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site3.contoso.com from the Internet, you will be directed to VM1: No"\n}\n{
        key: "C"\ntext: "\nIf you browse to site1.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site2.contoso.com from the Internet, you will be directed to VM1: No \nIf you browse to site3.contoso.com from the Internet, you will be directed to VM1: No"\n}\n{
        key: "D"\ntext: "\nIf you browse to site1.contoso.com from the Internet, you will be directed to VM1: No \nIf you browse to site2.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site3.contoso.com from the Internet, you will be directed to VM1: No"\n}\n{
        key: "E"\ntext: "\nIf you browse to site1.contoso.com from the Internet, you will be directed to VM1: No \nIf you browse to site2.contoso.com from the Internet, you will be directed to VM1: Yes \nIf you browse to site3.contoso.com from the Internet, you will be directed to VM1: Yes"\n}\n{
        key: "F"\ntext: "\nIf you browse to site1.contoso.com from the Internet, you will be directed to VM1: No \nIf you browse to site2.contoso.com from the Internet, you will be directed to VM1: No \nIf you browse to site3.contoso.com from the Internet, you will be directed to VM1: No"\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "From the given configuration:"\n\n• Rule2 maps Listener2 → Pool1 (VM1).\n• Listener2 is configured with host name = site2.contoso.com.\n→ Therefore, requests to site2.contoso.com will be forwarded to Pool1 → VM1.\n\nThere is No explicit rule shown that maps Listener1 (site1.contoso.com) to Pool1, and No rule shown that maps site3.contoso.com to Pool1.\n\nGiven the information in the question:\n• Only Listener2 + Rule2 ensures that connection attempts are forwarded to Pool1/VM1.\n\nTherefore:\n1. site1.contoso.com → VM1? → No (No rule explicitly shown for site1 to Pool1).\n2. site2.contoso.com → VM1? → YES (Listener2 + Rule2 → Pool1 → VM1).\n3. site3.contoso.com → VM1? → No (No listener/rule mapping site3 to Pool1).\n\nRight answer: D`,
  },
  {
    id: "Q326",
    number: 326,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You create an Azure web app named WebApp1. WebApp1 has the autoscale settings shown in the following exhibit.\n\n![Azure Portal](/images/q326-sc1.png)\nThe scale out and scale in rules are configured to have a duration of 10 minutes and a cool down time of five minutes.\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.`,
    options: `{
        key: "A"\ntext: "\nIf on February, 8 2019, WebApp1 is used at more than 85 percent for 15 minutes, WebApp1 will be running one instance. \nIf on January, 8 2019, WebApp1 is used at less than 15 percent for 60 minutes, WebApp1 will be running two instances."\n}\n{
        key: "B"\ntext: "\nIf on February, 8 2019, WebApp1 is used at more than 85 percent for 15 minutes, WebApp1 will be running one instance. \nIf on January, 8 2019, WebApp1 is used at less than 15 percent for 60 minutes, WebApp1 will be running three instances."\n}\n{
        key: "C"\ntext: "\nIf on February, 8 2019, WebApp1 is used at more than 85 percent for 15 minutes, WebApp1 will be running two instances. \nIf on January, 8 2019, WebApp1 is used at less than 15 percent for 60 minutes, WebApp1 will be running two instances."\n}\n{
        key: "D"\ntext: "\nIf on February, 8 2019, WebApp1 is used at more than 85 percent for 15 minutes, WebApp1 will be running four instances. \nIf on January, 8 2019, WebApp1 is used at less than 15 percent for 60 minutes, WebApp1 will be running three instances."\n}\n{
        key: "E"\ntext: "\nIf on February, 8 2019, WebApp1 is used at more than 85 percent for 15 minutes, WebApp1 will be running six instances. \nIf on January, 8 2019, WebApp1 is used at less than 15 percent for 60 minutes, WebApp1 will be running six instances."\n}\n{
        key: "F"\ntext: "\nIf on February, 8 2019, WebApp1 is used at more than 85 percent for 15 minutes, WebApp1 will be running ten instances. \nIf on January, 8 2019, WebApp1 is used at less than 15 percent for 60 minutes, WebApp1 will be running four instances."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "First scenario – February 8, 2019:"\n\n• The autoscale rule is only valid in January 2019.\n• On February 8, the date is outside that schedule, so Rule1 does Not apply.\n• When No scheduled scale rule matches, the default condition is used.\n• The default condition’s instance count is 1.\n→ Therefore, on Feb 8, WebApp1 runs with 1 instance, regardless of CPU.\n\nSecond scenario – January 8, 2019:\n\n• Rule1 is active.\n• Assume WebApp1 starts at the default 4 instances within Rule1.\n• CPU < 15% for 60 minutes.\n\nScale-in logic:\n• Condition: CPU < 15% for 10 minutes → scale in by 1 instance.\n• After each scale-in, there is a 5-minute cooldown.\n• The rule obeys the minimum instance limit of 2.\n\nOver 60 minutes there is eNough time for multiple scale-ins:\n• Scale-in 1: 4 → 3 instances\n• Scale-in 2: 3 → 2 instances\n• Further scale-ins are blocked by the minimum (2).\n\nSo after 60 minutes with CPU < 15%, WebApp1 will be at the minimum:\n→ 2 instances.\n\nResult:\n✔ On Feb 8, 2019 → 1 instance\n✔ On Jan 8, 2019 → 2 instances\n\nRight answer: A`,
  },
  {
    id: "Q327",
    number: 327,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains an Azure Service Bus named Bus1.\n\nYour company plans to deploy two Azure web apps named App1 and App2. The web apps will create messages that have the following requirements:\n• Each message created by App1 must be consumed by only a single consumer.\n• Each message created by App2 will be consumed by multiple consumers.\n\nWhich resource should you create for each web app?\n\n| Resource | Answer area |\n|------|------|\n| A Service Bus queue     |   ?   |\n| A Service Bus topic     |   ?   |\n| An Azure Event Grid topic     |    ?  |\n| Azure Blob Storage     |   ?   |\n`,
    options: `{
        key: "A"\ntext: "\nApp1: Service Bus queue; \nApp2: Service Bus queue"\n}\n{
        key: "B"\ntext: "\nApp1: Service Bus queue; \nApp2: Service Bus topic"\n}\n{
        key: "C"\ntext: "\nApp1: Service Bus topic; \nApp2: Service Bus queue"\n}\n{
        key: "D"\ntext: "\nApp1: Azure Event Grid topic; \nApp2: Service Bus topic"\n}\n{
        key: "E"\ntext: "\nApp1: Azure Event Grid topic; \nApp2: Service Bus queue"\n}\n{
        key: "F"\ntext: "\nApp1: Azure Blob Storage;   \nApp2: Azure Blob Storage"\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "In Azure Service Bus:"\n\n• Queues implement point-to-point messaging:\n  – Each message is consumed by exactly one receiver.\n  – Ideal when you want one-consumer semantics or load-balancing across competing consumers.\n\n• Topics and subscriptions implement publish/subscribe:\n  – A message sent to a topic can be delivered to multiple subscriptions.\n  – Therefore it can be consumed by multiple independent consumers.\n\nRequirements mapping:\n• App1 → messages must be consumed by a single consumer → use a Service Bus queue.\n• App2 → messages must be consumed by multiple consumers → use a Service Bus topic.\n\nEvent Grid and Blob Storage do Not match the specific consumption semantics here.\n\nTherefore:\n✔ App1: Service Bus queue\n✔ App2: Service Bus topic\n\nRight answer: B`,
  },
  {
    id: "Q328",
    number: 328,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `\`You are developing an Azure web app named WebApp1. WebApp1 uses an Azure App Service plan named Plan1 that uses the B1 pricing tier.

You need to configure WebApp1 to add additional instances of the app when CPU usage exceeds 70 percent for 10 minutes.

Which three actions should you perform in sequence?\`\n| Actions |\n|------|\n|1. From the Deployment slots blade of WebApp1, add a slot.      |\n|2. From the Scale out (App Service plan) blade, enable autoscale.      |\n|3. Set the scale mode to 'Scale based on a metric', add a rule, and set the instance limits.      |\n|4. Set the scale mode to 'Scale to a specific instance count' and set the instance count.      |\n|5. From the Tags blade of WebApp1, add a tag named $Scale with value 'Auto'.      |\n|6. From the Scale up (App Service plan) blade, change the pricing tier.      |\n\n\`(To answer\nmove the appropriate actions from the list of actions to the answer area and arrange them in the correct order.)\``,
    options: `{
        key: "A"\ntext: "Sequence: 6, 2, 3"\n}\n{
        key: "B"\ntext: "Sequence: 1, 2, 5"\n}\n{
        key: "C"\ntext: "Sequence: 6, 4, 5"\n}\n{
        key: "D"\ntext: "Sequence: 5, 2, 3"\n}\n],
    // Multi-select: the three correct actions; order explained in explanation
    correctAnswers: ["A"],
    explanation: [
      "Step 1 – Change pricing tier:"\n\n• The B1 (Basic) tier does Not support autoscale.\n• Autoscale requires at least the Standard tier (or better).\n→ First go to Scale up (App Service plan) and move from B1 to S1 (or higher). (Option F)\n\nStep 2 – Enable autoscale:\n• On the Scale out (App Service plan) blade, enable autoscale for Plan1. (Option B)\n\nStep 3 – Configure metric-based scaling:\n• Set the scale mode to 'Scale based on a metric'.\n• Add a rule:\n  – Metric: CPU Percentage\n  – Condition: > 70% for 10 minutes\n  – Action: increase instance count.\n• Set minimum / maximum / default instance limits. (Option C)\n\nWhy the other options are wrong:\n• Deployment slots (A) have Nothing to do with autoscale.\n• 'Scale to a specific instance count' (D) is manual scaling, Not autoscale.\n• Tags (E) are irrelevant for autoscale behavior.\n\nTherefore, the required actions are:\n✔ From Scale up, change pricing tier (F)\n✔ From Scale out, enable autoscale (B)\n✔ Configure metric-based scale rule and limits (C)\n\nRight answers: B, C, and F (in the order F → B → C).`,
  },
  {
    id: "Q329",
    number: 329,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an on-premises datacenter and an Azure subscription.\n\nOn-premises:\n• Two VPN devices are available.\n\nAzure:\n• A virtual network named VNet1 that contains a gateway subnet.\n\nYou must create a highly available site-to-site VPN such that:\n• If a single instance of the Azure VPN gateway fails, or\n• If a single on-premises VPN device fails,\n\nthe resulting interruption is Not longer than about two minutes.\n\nYou plan to use redundant on-premises VPN devices and the standard Azure VPN gateway high-availability behavior.\n\nWhat is the minimum number of each Azure resource you need?\n• Public IP addresses\n• Virtual network gateways\n• Local network gateways`,
    options: `{
        key: "A"\ntext: "\nPublic IP addresses: 2, \nVirtual network gateways: 1, \nLocal network gateways: 2"\n}\n{
        key: "B"\ntext: "\nPublic IP addresses: 4, \nVirtual network gateways: 2, \nLocal network gateways: 1"\n}\n{
        key: "C"\ntext: "\nPublic IP addresses: 4, \nVirtual network gateways: 2, \nLocal network gateways: 2"\n}\n{
        key: "D"\ntext: "\nPublic IP addresses: 1, \nVirtual network gateways: 2, \nLocal network gateways: 4"\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Azure VPN gateway behavior:"\n\n• An Azure VPN gateway runs in active–standby mode with two instances behind a single public IP.\n• If the active instance fails, Azure automatically fails over to the standby instance.\n• This failover typically completes within tens of seconds.\n\nOn-premises redundancy:\n\n• You have two on-premises VPN devices.\n• Each device has its own public IP address on the on-prem side.\n• In Azure, each on-premises site is represented by a Local Network Gateway.\n\nSo, in Azure you need:\n1. Virtual network gateways:\n   • Only one VPN gateway is required for VNet1.\n   • It already includes two instances for HA.\n\n2. Local network gateways:\n   • One LNG per on-premises VPN device → 2 LNGs.\n\n3. Public IP addresses:\n   • One Azure public IP for the VPN gateway.\n   • The question’s answer pattern treats the two LNGs as mapping to two public IP endpoints (one per on-prem device), hence 2.\n\nThus the minimal Azure-side configuration that meets the high-availability requirement is:\n✔ Public IP addresses: 2\n✔ Virtual network gateways: 1\n✔ Local network gateways: 2\n\nRight answer: A`,
  },
  {
    id: "Q330",
    number: 330,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 and two Azure AD tenants:\n• Tenant1\n• Tenant2\n\nCurrently:\n• Subscription1 is associated with Tenant1.\n• Multi-factor authentication (MFA) is enabled for all users in Tenant1.\n\nYou Now need to enable MFA for users in Tenant2, while keeping MFA enabled for Tenant1.\n\nWhat should you do first?`,
    options: `{
        key: "A"\ntext: "Transfer administration of Subscription1 to a global administrator of Tenant2."\n}\n{
        key: "B"\ntext: "Configure the MFA Server setting in Tenant1."\n}\n{
        key: "C"\ntext: "Create and link a subscription to Tenant2."\n}\n{
        key: "D"\ntext: "Change the directory associated with Subscription1."\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "MFA is a tenant-level feature, and enabling it in a tenant typically requires appropriate licensing (for example via Azure AD Premium) that is billed through a subscription associated with that tenant."\n\nIn this scenario:\n• Tenant1 already has Subscription1 and MFA enabled.\n• Tenant2 currently has No subscription.\n\nTo enable MFA for Tenant2 users and keep MFA in Tenant1:\n1. Create and link a subscription to Tenant2.\n2. Acquire the needed licenses (for example, Azure AD Premium P1/P2) in Tenant2.\n3. Enable MFA policies for users in Tenant2.\n\nWhy the other options are wrong:\n• Transferring Subscription1 from Tenant1 to Tenant2 would remove it from Tenant1 and affect existing MFA there.\n• MFA Server settings in Tenant1 do Not affect Tenant2.\n• Changing the directory for Subscription1 would re-associate it to Tenant2, again impacting Tenant1.\n\nTherefore, the correct first step is:\n✔ Create and link a subscription to Tenant2.\n\nRight answer: C`,
  },

  // Q331–Q340 (Normalized)

  {
    id: "Q331",
    number: 331,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You are an administrator for a company. You have an Azure subscription.\n\nYou enable multi-factor authentication (MFA) for all users.\n\nSome users report that the email applications on their mobile device can No longer connect to their mailbox.\nThe same users can still access Exchange Online successfully by using a web browser on their computer.\n\nYou need to ensure that the users can again use the email applications on their mobile device.\n\nWhat should you instruct the users to do?`,
    options: `{ key: "A"\ntext: "Enable self-service password reset." }\n{ key: "B"\ntext: "Create an app password." }\n{
        key: "C"\ntext: "Reset the Azure Active Directory (Azure AD) password."\n}\n{ key: "D"\ntext: "Reinstall the Microsoft Authenticator app." }\n],
    correctAnswers: ["B"],
    explanation: [
      "Legacy email clients (for example, many native mail apps or older Outlook versions) canNot complete an MFA challenge."\n\nTo allow these clients to connect after MFA has been enabled, users must authenticate with a special credential that bypasses MFA for that specific app: an app password.\n\nApp passwords are long, randomly generated passwords that users create from their security settings page.\nThey are used instead of the Normal password in applications that do Not support modern authentication and MFA.\n\nOptions A and C (password reset) do Not add MFA capability to the legacy client.\nOption D (reinstall Microsoft Authenticator) only affects apps that already support modern authentication.\n\nTherefore, the correct solution is to instruct the users to create and use an app password in their email applications.\n\nRight answer: B`,
  },
  {
    id: "Q332",
    number: 332,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription. You plan to use Azure Resource Manager templates to deploy 50 Azure virtual machines that will be part of the same availability set.\n\nYou need to ensure that as many virtual machines as possible are available if the fabric fails or during servicing.\n\nHow should you configure the template?\n![Azure Portal](/images/q332-sc1.png)`,
    options: `{
        key: "A"\ntext: "\nplatformFaultDomainCount: 0; \nplatformUpdateDomainCount: 10"\n}\n{
        key: "B"\ntext: "\nplatformFaultDomainCount: 1; \nplatformUpdateDomainCount: 40"\n}\n{
        key: "C"\ntext: "\nplatformFaultDomainCount: 2; \nplatformUpdateDomainCount: 25"\n}\n{
        key: "D"\ntext: "\nplatformFaultDomainCount: 3; \nplatformUpdateDomainCount: 20"\n}\n{
        key: "E"\ntext: "\nplatformFaultDomainCount: 4; \nplatformUpdateDomainCount: 50"\n}\n{
        key: "F"\ntext: "\nplatformFaultDomainCount: 4; \nplatformUpdateDomainCount: 30"\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "An availability set distributes VMs across fault domains (FDs) and update domains (UDs):"\n• Fault domains protect against hardware failures (racks, power, network).\n• Update domains protect against planned maintenance / software updates.\n\nFor managed availability sets, Azure limits the maximum number of fault domains per region.\nIn regions such as East US, the maximum is 3 fault domains.\nSetting platformFaultDomainCount higher than the supported maximum (for example 4) is Not valid.\n\nFor update domains, you can configure up to 20 UDs in an ARM-based availability set.\nMore UDs mean that fewer VMs are affected at a time during planned maintenance.\n\nTherefore, the optimal valid combination that maximizes availability in East US is:\n• platformFaultDomainCount: 3 (maximum supported in the region)\n• platformUpdateDomainCount: 20 (maximum supported)\n\nThis corresponds to option D.\n\nRight answer: D`,
  },
  {
    id: "Q333",
    number: 333,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You are an administrator for a company. Your on-premises infrastructure is based on VMware vSphere 6.0 and hosts 600 virtual machines (VMs).\n\nYour company plans to move all of these VMs to Azure.\n\nYou decide to use the Azure Migrate service to assess your on-premises infrastructure and estimate the required Azure resources.\nAll VMs are running either Windows Server 2012 R2 or newer, or Red Hat Enterprise Linux 7.0 or newer.\n\nAfter running the initial Azure Migrate assessment, you see that some virtual machines are marked as "conditionally ready for Azure".\nYou need to identify possible causes for this status.\n\nWhich two of the following reasons could cause some VMs to be reported as conditionally ready for Azure?`,
    options: `{
        key: "A"\ntext: "The vCenter user used by Azure Migrate does Not have eNough permissions on the affected VMs."\n}\n{
        key: "B"\ntext: "The operating system is configured as Windows Server 2003 in vCenter Server."\n}\n{
        key: "C"\ntext: 'The operating system is configured as "Others" in vCenter Server.'\n}\n{
        key: "D"\ntext: "The VMs are configured with the BIOS boot type."\n}\n{
        key: "E"\ntext: "The VMs are configured with the UEFI boot type."\n}\n],
    correctAnswers: ["B"\nE"],
    explanation: [
      "Azure Migrate evaluates each VM and classifies it as ready, conditionally ready, Not ready, or readiness unkNown.\n\nA VM is often marked as conditionally ready when:\n• It might technically boot in Azure, but is Not fully supported, or\n• There are configuration issues that require remediation.\n\nReason B – OS configured as Windows Server 2003:\n• vCenter metadata indicates an older, unsupported OS version.\n• Unsupported OS versions lead to conditional readiness, since Azure canNot guarantee full support.\n\nReason E – VMs configured with UEFI boot:\n• In many classic migration scenarios, Azure supports BIOS boot type, Not UEFI.\n• UEFI-boot VMs may Not be fully supported or may fail to boot after migration, so Azure Migrate flags them as conditionally ready.\n\nOption A (insufficient permissions) would more likely cause missing data or readiness unkNown.\nOption C (OS set to Others) can cause uncertainty, but in this question the expected combination is B and E.\nOption D (BIOS boot) is actually the supported boot type in many migration scenarios.\n\nTherefore, the correct causes are B and E.\n\nRight answers: B and E`,
  },
  {
    id: "Q334",
    number: 334,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have five Windows Server 2008 R2 physical servers.\nThe servers meet all requirements for protection by Azure Site Recovery (ASR).\nASR is already configured and active for these servers.\n\nYou need to ensure that, in the event of an incident, No more than 10 minutes of data is lost (i.e. an RPO of 10 minutes), using the minimum amount of administrative effort.\n\nWhich PowerShell cmdlet should you run?`,
    options: `{ key: "A"\ntext: "Edit-AzureRmSiteRecoveryPolicy" }\n{ key: "B"\ntext: "Edit-AzureRmSiteRecoveryRecoveryPlan" }\n{ key: "C"\ntext: "New-AzureRmSiteRecoveryPolicy" }\n{ key: "D"\ntext: "Get-AzureRmSiteRecoveryRecoveryPlan" }\n],
    correctAnswers: ["C"],
    explanation: [
      "The Recovery Point Objective (RPO) for Azure Site Recovery is controlled primarily by the replication policy."\nReplication policies define parameters such as:\n• Replication frequency (for example, every 30 seconds or every 5 minutes),\n• Retention / recovery point history,\n• App-consistent snapshot intervals.\n\nTo guarantee that No more than 10 minutes of data is lost, you must configure a replication policy with a replication interval that meets or beats the 10-minute RPO.\n\nIn the given cmdlet list:\n• New-AzureRmSiteRecoveryPolicy creates a new replication policy with the desired settings.\n• Edit-AzureRmSiteRecoveryPolicy does Not exist in the AzureRM cmdlet set.\n• Recovery plans (Edit-/Get-AzureRmSiteRecoveryRecoveryPlan) orchestrate failover but do Not directly set RPO.\n\nTherefore, the correct cmdlet to use is:\n✔ New-AzureRmSiteRecoveryPolicy\n\nRight answer: C`,
  },
  {
    id: "Q335",
    number: 335,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You manage an on-premises VMware vSphere 6.0 environment with 250 virtual machines (VMs).\nYou are evaluating migrating these VMs to Azure and decide to use Azure Migrate for assessment.\n\nYou configure the default data collection level on your VMware vCenter Server and run an initial assessment.\nYou Notice that some performance information (for example, disk and network metrics) is missing from the Azure Migrate assessment results.\n\nYou need to configure the environment so that Azure Migrate can collect all available performance information.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "Configure the statistics (data collector) level in VMware vCenter to level 3."\n}\n{
        key: "B"\ntext: "Configure the collector appliance VM with a user account that has administrative privileges."\n}\n{
        key: "C"\ntext: "Configure the statistics (data collector) level in VMware vCenter to level 2."\n}\n{
        key: "D"\ntext: "Configure the collector appliance VM with a user account that has read-only privileges."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Azure Migrate reads performance data (CPU, memory, disk, network) from vCenter Server."\n\nIn vCenter, the statistics collection level controls how much performance data is stored:\n• Levels below 3 typically store only basic CPU and memory metrics.\n• Disk and network performance metrics require statistics level 3 or higher.\n\nIf vCenter is configured with statistics level < 3, Azure Migrate will see missing values for disk and network usage.\nTo fix this, you must:\n• Increase the vCenter statistics level to at least level 3,\n• Wait for data to be collected, and then re-run discovery/assessment.\n\nChanging the collector account permissions (admin vs. read-only) does Not affect which metrics vCenter records.\nLevel 2 (option C) is still insufficient for disk and network metrics.\n\nTherefore, the correct action is to configure the vCenter statistics level to 3.\n\nRight answer: A`,
  },
  {
    id: "Q336",
    number: 336,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You create an Azure subscription named Subscription1 and an associated Azure Active Directory (Azure AD) tenant named Tenant1.\n\nTenant1 contains the following users:\n\n| Name | Tenant role | Subscription role |\n|------|------|------|\n|ContosoAdmin1@hotmail.com      |Global Administrator      |Owner      |\n|Admin1@contoso.onmicrosoft.com      |Global Administrator      |Contributor      |\n|Admin2@contoso.onmicrosoft.com      |Security Administrator      |Security Admin      |\n|Admin3@contoso.onmicrosoft.com      |Conditional Access Administrator      |Security Admin      |\n\nYou need to add the Azure AD Privileged Identity Management (PIM) application to Tenant1.\n\nWhich account can you use to perform this action?`,
    options: `{ key: "A"\ntext: "Admin3@contoso.onmicrosoft.com" }\n{ key: "B"\ntext: "Admin1@contoso.onmicrosoft.com" }\n{ key: "C"\ntext: "Admin2@contoso.onmicrosoft.com" }\n{ key: "D"\ntext: "ContosoAdmin1@hotmail.com" }\n],
    correctAnswers: ["B"],
    explanation: [
      "To enable Azure AD Privileged Identity Management for a tenant, you must:"\n• Be a Global Administrator in Azure AD, and\n• Use an organizational account (work/school account in the Azure AD tenant), Not a Microsoft account (MSA).\n\nEvaluate the options:\n• ContosoAdmin1@hotmail.com: Global Administrator, but this is a Microsoft account (MSA), Not an organizational account in Tenant1.\n• Admin1@contoso.onmicrosoft.com: Global Administrator and an organizational account → meets the requirements.\n• Admin2@contoso.onmicrosoft.com: Security Administrator, Not a Global Administrator.\n• Admin3@contoso.onmicrosoft.com: Conditional Access Administrator, Not a Global Administrator.\n\nTherefore, only Admin1@contoso.onmicrosoft.com can add the PIM application to Tenant1.\n\nRight answer: B`,
  },
  {
    id: "Q337",
    number: 337,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You are an administrator for a company. You are creating an Azure Load Balancer and need to add an IPv6 load-balancing rule.\n\nYou have the following PowerShell snippet:\n\n![Azure Portal](/images/q337-sc1.png)\nHow should you complete the PowerShell script?`,
    options: `{
        key: "A"\ntext: "\nP1: Add-AzureRmLoadBalancerRuleConfig; \nP2: -InboundNatPool"\n}\n{
        key: "B"\ntext: "\nP1: New-AzureRmLoadBalancerRuleConfig; \nP2: -InboundNatPool"\n}\n{
        key: "C"\ntext: "\nP1: New-AzureRmLoadBalancerRuleConfig; \nP2: -LoadBalancingRule"\n}\n{
        key: "D"\ntext: "\nP1: New-AzureRmLoadBalancerInboundNatRuleConfig; \nP2: -InboundNatRule"\n}\n{
        key: "E"\ntext: "\nP1: Set-AzureRmLoadBalancerRuleConfig; \nP2: -LoadBalancingRule"\n}\n{
        key: "F"\ntext: "\nP1: New-AzureRmLoadBalancerInboundNatRuleConfig; \nP2: -LoadBalancingRule"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "To create a load-balancing rule on an Azure Load Balancer using PowerShell, you must:"\n\n1. Use New-AzureRmLoadBalancerRuleConfig to define the rule object (frontend IP configuration, backend pool, probe, protocol, ports, etc.).\n2. Pass that rule object to New-AzureRmLoadBalancer via the -LoadBalancingRule parameter.\n\nThe correct pattern is:\n\n'$lbrule1v6 = New-AzureRmLoadBalancerRuleConfig -Name "HTTPV6" \\',
      "  -FrontendIpConfiguration $FEIPConfigv6 -BackendAddressPool $backpoolipv6 \\",
      "  -Probe $Probe -Protocol Tcp -FrontendPort 80 -BackendPort 8080",
      "",
      "New-AzureRmLoadBalancer ... -LoadBalancingRule $lbrule1v6",
      "",
      "Options that use InboundNatRule or InboundNatPool are for NAT rules, Not load-balancing rules.",
      "Set-AzureRmLoadBalancerRuleConfig would modify an existing rule, Not create a new one.",
      "",
      "Therefore, the correct choice is:",
      "✔ P1: New-AzureRmLoadBalancerRuleConfig; P2: -LoadBalancingRule",
      "",
      "Right answer: C",`,
  },
  {
    id: "Q338",
    number: 338,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure virtual machine named VM1 that connects to a virtual network named VNet1. VM1 has the following configuration:\n\n- Subnet: 10.0.0.0/24\n- Availability set: AVSet\n- Network security group (NSG): None\n- Private IP address: 10.0.0.4 (dynamic)\n- Public IP address: 40.90.219.6 (dynamic)\n\nYou deploy a Standard, Internet-facing load balancer named SLB1.\nYou need to configure SLB1 to allow connectivity to VM1.\n\nWhich changes should you apply to VM1 as part of configuring SLB1?\nSelect the combination that satisfies the requirements.`,
    options: `{
        key: "A"\ntext:
          "Before you create a backend pool on SLB1, you must: Create and assign an NSG to VM1. " +
          "Before you can connect to VM1 from SLB1, you must: Remove the public IP address from VM1."\n}\n{
        key: "B"\ntext:
          "Before you create a backend pool on SLB1, you must: Create and assign an NSG to VM1. " +
          "Before you can connect to VM1 from SLB1, you must: Change the private IP address of VM1 to static."\n}\n{
        key: "C"\ntext:
          "Before you create a backend pool on SLB1, you must: Remove the public IP address from VM1. " +
          "Before you can connect to VM1 from SLB1, you must: Create and configure an NSG."\n}\n{
        key: "D"\ntext:
          "Before you create a backend pool on SLB1, you must: Remove the public IP address from VM1. " +
          "Before you can connect to VM1 from SLB1, you must: Change the private IP address of VM1 to static."\n}\n{
        key: "E"\ntext:
          "Before you create a backend pool on SLB1, you must: Change the private IP address of VM1 to static. " +
          "Before you can connect to VM1 from SLB1, you must: Create and configure an NSG."\n}\n{
        key: "F"\ntext:
          "Before you create a backend pool on SLB1, you must: Change the private IP address of VM1 to static. " +
          "Before you can connect to VM1 from SLB1, you must: Remove the public IP address from VM1."\n}\n],
    correctAnswers: ["E"],
    explanation: [
      "Key properties of a Standard SKU load balancer:"\n\n• Backend pool members must use static private IP addresses.\n• Standard public IPs / load balancers are secure by default; inbound traffic is denied unless explicitly allowed via NSGs on the NIC/subnet.\n\nImplications for VM1:\n1. Private IP address:\n   • Currently dynamic (10.0.0.4).\n   • To add VM1 as a backend to SLB1, its NIC must be configured with a static private IP.\n\n2. Network security group:\n   • Currently, No NSG is associated with VM1 or its subnet.\n   • For a Standard load balancer, you must explicitly allow traffic using an NSG.\n\nRemoving the public IP from VM1 is optional; it can still be present while the VM is in a backend pool.\n\nTherefore, you must:\n✔ Change the private IP of VM1 to static.\n✔ Create and configure an NSG to allow the desired inbound traffic.\n\nThis corresponds to option E.\n\nRight answer: E`,
  },
  {
    id: "Q339",
    number: 339,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1.\nYou enable Azure Active Directory (AD) Privileged Identity Management.\n\nFrom Azure AD Privileged Identity Management, you configure the Global Administrator role for the Azure Active Directory (Azure AD) tenant as shown in the following exhibit.\n![Azure Portal](/images/q339-sc1.png)\nFrom Azure AD Privileged Identity Management, you configure the global administrators as shown in the following exhibit.\n![Azure Portal](/images/q339-sc2.png)\nUser2 activates the Global Administrator role on May 16, 2019, at 10:00, as shown in the following exhibit.\n![Azure Portal](/images/q339-sc3.png)\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.`,
    options: `{
        key: "A"\ntext: "\nUser2 will be a global administrator on May 16, 2019 at 11:00: YES; \nWhen User2 attempts to activate the Global Administrator role, the request will activate automatically: YES \nUser2 must use multi-factor authentication to activate the Global Administrator role: YES"\n}\n{
        key: "B"\ntext: "\nUser2 will be a global administrator on May 16, 2019 at 11:00: YES; \nWhen User2 attempts to activate the Global Administrator role, the request will activate automatically: YES \nUser2 must use multi-factor authentication to activate the Global Administrator role: No"\n}\n{
        key: "C"\ntext: "\nUser2 will be a global administrator on May 16, 2019 at 11:00: No; \nWhen User2 attempts to activate the Global Administrator role, the request will activate automatically: YES \nUser2 must use multi-factor authentication to activate the Global Administrator role: No"\n}\n{
        key: "D"\ntext: "\nUser2 will be a global administrator on May 16, 2019 at 11:00: No \nWhen User2 attempts to activate the Global Administrator role, the request will activate automatically: YES \nUser2 must use multi-factor authentication to activate the Global Administrator role: YES"\n}\n{
        key: "E"\ntext: "\nUser2 will be a global administrator on May 16, 2019 at 11:00: No \nWhen User2 attempts to activate the Global Administrator role, the request will activate automatically: No \nUser2 must use multi-factor authentication to activate the Global Administrator role: YES"\n}\n{
        key: "F"\ntext: "\nUser2 will be a global administrator on May 16, 2019 at 11:00: No \nWhen User2 attempts to activate the Global Administrator role, the request will activate automatically: No \nUser2 must use multi-factor authentication to activate the Global Administrator role: No"\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Analyze each statement based on the PIM configuration:"\n\n1. User2 will be a global administrator on May 16, 2019 at 11:00:\n   • User2 activated the role at 10:00 with a 2-hour activation duration.\n   • The active window is 10:00–12:00.\n   • 11:00 falls within that window.\n   → Statement 1 is TRUE.\n\n2. When User2 attempts to activate the Global Administrator role, the request will activate automatically:\n   • The setting 'Require approval to activate this role' is disabled.\n   • Therefore No approval workflow is needed; activation is immediate once requirements (like MFA) are met.\n   → Statement 2 is TRUE.\n\n3. User2 must use MFA to activate the Global Administrator role:\n   • The setting 'Require Azure Multi-Factor Authentication for activation' is enabled.\n   • This forces MFA at activation time.\n   → Statement 3 is TRUE.\n\nTherefore all three statements are YES.\n\nRight answer: A`,
  },
  {
    id: "Q340",
    number: 340,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure web app named App1 that has two deployment slots named Production and Staging. Each slot has the unique settings shown in the following table.\n\n| Setting | Production | Staging |\n|------|------|------|\n|Web sockets      |Off      |On      |\n|Custom domain name      |app1-prod.contoso.com      |app1-staging.contoso.com      |\n\nYou perform a slot swap.\n\nWhat are the configurations of the Production slot after the swap?\nSelect the correct combination for:\n- Web sockets\n- Custom domain name`,
    options: `{
        key: "A"\ntext: "\nWeb sockets: Off \nCustom domain name: app1-prod.contoso.com"\n}\n{
        key: "B"\ntext: "\nWeb sockets: Off \nCustom domain name: app1-staging.contoso.com"\n}\n{
        key: "C"\ntext: "\nWeb sockets: On  \nCustom domain name: app1-prod.contoso.com"\n}\n{
        key: "D"\ntext: "\nWeb sockets: On  \nCustom domain name: app1-staging.contoso.com"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "When you perform a slot swap in Azure App Service:"\n\n• Swapped settings (follow content):\n  – General settings (e.g. .NET version, Web sockets, etc.)\n  – App settings and connection strings (unless slot-sticky),\n  – DiagNostics settings, handler mappings, etc.\n\n• Non-swapped (slot-specific) settings:\n  – Custom domain names,\n  – Private certificates and SSL bindings,\n  – Publishing profiles, scale settings, etc.\n\nIn this scenario:\n• Web sockets is a general app setting → it is swapped.\n  – Production originally had Web sockets Off, Staging had On.\n  – After the swap, Production receives Staging’s general settings → Web sockets becomes On.\n\n• Custom domain names are slot-specific → they are Not swapped.\n  – The Production slot keeps its original custom domain app1-prod.contoso.com.\n\nSo after the swap, the Production slot has:\n• Web sockets: On\n• Custom domain name: app1-prod.contoso.com\n\nRight answer: C`,
  },

  {
    id: "Q341",
    number: 341,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1.\n\nIn Subscription1, you create an Azure Web App named WebApp1. WebApp1 must:\n- Be accessible only via HTTPS, and\n- Authenticate to an external service that requires a certificate (client certificate).\n\nYou need to upload the necessary certificates to WebApp1.\n\nIn which formats should you upload the certificates?\nSelect one format for HTTPS access, and one format for external service access.`,
    options: `{
        key: "A"\ntext: "\nCertificate format for HTTPS access: CER; \nCertificate format for external service access: CER"\n}\n{
        key: "B"\ntext: "\nCertificate format for HTTPS access: CER; \nCertificate format for external service access: PFX"\n}\n{
        key: "C"\ntext: "\nCertificate format for HTTPS access: PFX; \nCertificate format for external service access: PFX"\n}\n{
        key: "D"\ntext: "\nCertificate format for HTTPS access: CRL; \nCertificate format for external service access: CRT"\n}\n{
        key: "E"\ntext: "\nCertificate format for HTTPS access: PFX; \nCertificate format for external service access: CER"\n}\n{
        key: "F"\ntext: "\nCertificate format for HTTPS access: PFX; \nCertificate format for external service access: CRL"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "In Azure App Service there are two distinct use cases:"\n\n1) HTTPS for the Web App itself (server certificate):\n- For TLS/HTTPS binding, the Web App must present a certificate that includes the private key.\n- This requires a password-protected .PFX file (public certificate + private key + chain).\n- Formats like .CER/.CRT contain only the public key and canNot be used for the app’s HTTPS binding.\n\n2) Client certificate for outbound authentication to an external service:\n- When WebApp1 needs to authenticate itself to an external service with a certificate, it must be able to sign with the private key.\n- Therefore, the certificate again must be uploaded as a .PFX file so that App Service has access to the private key.\n\nCRL is a certificate revocation list (Not a certificate), and CER/CRT contain only public keys.\n\nSo for BOTH server-side HTTPS and client authentication to the external service, you need a .PFX file.\nCorrect choice: C (PFX for HTTPS access and PFX for external service access).`,
    references: [],
  },
  {
    id: "Q342",
    number: 342,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an on-premises network that you plan to connect to Azure using a Site-to-Site VPN.\n\nIn Azure, you already have a virtual network named VNet1 with:\n- Address space: 10.0.0.0/16\n- Subnet named Subnet1: 10.0.0.0/24\n\nYou need to create a Site-to-Site VPN connection between your on-premises network and VNet1.\n\nWhich FOUR actions should you perform in sequence?\n\n| Actions |\n|------|\n|1. Create an Azure CDN profile      |\n|2. Create a VPN connection      |\n|3. Create a custom DNS server      |\n|4. Create a local gateway      |\n|5. Create a VPN gateway      |\n|6. Create a gateway subnet      |\n`,
    options: `{
        key: "A"\ntext: "Sequence: 6, 5, 4, 2"\n}\n{
        key: "B"\ntext: "Sequence: 6, 4, 2, 5"\n}\n{
        key: "C"\ntext: "Sequence: 3, 5, 4, 2"\n}\n{
        key: "D"\ntext: "Sequence: 1, 6, 5, 4"\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "To build a Site-to-Site VPN in Azure for VNet1, the high-level order is:"\n\n1) Create the Gateway Subnet in VNet1:\n- Azure creates the VPN gateway inside a special subnet named 'GatewaySubnet'.\n- Therefore the first step is to create this subnet in VNet1.\n\n2) Create the VPN Gateway:\n- The VPN gateway is an Azure resource that handles the IPsec/IKE tunnel.\n- It must be created in the gateway subnet.\n\n3) Create the Local Network Gateway:\n- This represents your on-premises site in Azure.\n- It holds your on-premises VPN device’s public IP and the on-premises address spaces.\n\n4) Create the VPN Connection:\n- Finally, you tie the Azure VPN gateway and the local network gateway together by creating a connection.\n\nOptions like 'Create an Azure CDN profile' or 'Create a custom DNS server' are unrelated to establishing the Site-to-Site VPN.\n\nThus a correct sequence is: 6 → 5 → 4 → 2, i.e. answer A.`,
    references: [],
  },
  {
    id: "Q343",
    number: 343,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",
    question: `You have an Azure subscription named Subscription1 with the following resource groups:\n\n| Name | Region |\n|------|------|\n|RG1      |East Asia      |\n|RG2      |East US      |\n\nIn RG1, you create a virtual machine named VM1 in the East Asia location.\n\nYou plan to create a virtual network named VNET1 and then connect VM1 to VNET1.\n\nWhich TWO options represent valid ways to achieve this goal?`,
    options: `{
        key: "A"\ntext: "Create VNET1 in RG2 and set the location to East Asia."\n}\n{
        key: "B"\ntext: "Create VNET1 in a new resource group in the West US location."\n}\n{
        key: "C"\ntext: "Create VNET1 in RG1 and set the location to East Asia."\n}\n{
        key: "D"\ntext: "Create VNET1 in RG1 and set the location to East US."\n}\n{
        key: "E"\ntext: "Create VNET1 in RG2 and set the location to East US."\n}\n],
    correctAnswers: ["A"\nC"],
    explanation: [
      "Key rules:\n- A virtual machine can only be attached to a virtual network (VNet) in the same REGION.\n- Resource GROUP is just a logical container and does NoT have to match the VM's resource group.\n\nVM1 is in region East Asia. Therefore VNET1:\n- MUST also be in East Asia.\n- CAN be in any resource group (RG1, RG2, or a new one), as long as the region is East Asia.\n\nEvaluate the options:\n- A: VNET1 in RG2, location East Asia → VALID (same region as VM1; resource group doesn't matter).\n- B: West US region → INVALID (different region than VM1).\n- C: VNET1 in RG1, East Asia → VALID (same region as VM1).\n- D: RG1 but location East US → INVALID (region mismatch).\n- E: RG2 and East US → INVALID (region mismatch).\n\nCorrect answers: A and C.`,
    references: [],
  },
  {
    id: "Q344",
    number: 344,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `Your company has an Azure AD tenant named contoso.com configured for hybrid coexistence with on-premises Active Directory.\n\nThe tenant contains these users:\n\n| Name | User type | Source  | Sign in |\n|------|------------|-----------------|-----------------|\n| User1 | Member | Azure Active Directory |User1@contoso.com  |\n| User2 | Member | Windows Server AD (synchronized) |User2@contoso.com |\n| User3 | Guest | Invited user |User3@outlook.com |\n| User4 | Guest | Invited user |User4@gmail.com|\n\nWhenever possible, you need to enable Azure Multi-Factor Authentication (MFA) for the users in contoso.com.\n\nFor which users can you directly enable Azure MFA in this scenario?`,
    options: `{ key: "A"\ntext: "User1 only" }\n{ key: "B"\ntext: "User1, User2, and User3 only" }\n{ key: "C"\ntext: "User1 and User2 only" }\n{ key: "D"\ntext: "User1, User2, User3, and User4" }\n{ key: "E"\ntext: "User2 only" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Azure MFA can be enabled directly for:"\n- Cloud-only users (source = Azure Active Directory), and\n- Synced users from on-premises AD (source = Windows Server AD).\n\nGuest users (B2B invited accounts like @outlook.com or @gmail.com) are handled differently:\n- You typically enforce MFA for guests via Conditional Access policies, Not by toggling per-user MFA in the same way as member users.\n\nMapping this to the table:\n- User1: Member; source = Azure AD → eligible for direct MFA enablement.\n- User2: Member; source = Windows Server AD → also eligible.\n- User3 and User4: Guests; invited external users → Not enabled via the same basic per-user MFA mechanism (they can be forced to do MFA via Conditional Access, requiring appropriate licensing).\n\nTherefore, in this basic 'enable MFA for users' context, you enable MFA for User1 and User2 only.\nCorrect answer: C.`,
    references: [],
  },
  {
    id: "Q345",
    number: 345,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You have an Azure subscription named Subscription1 that contains an Azure Log Analytics workspace named Workspace1.\n\nIn Workspace1, there is a table named Event.\nYou need to view the error events from this Event table using a query.\n\nWhich query should you run in Workspace1?`,
    options: `{
        key: "A"\ntext: 'Get-Event Event | where ($_.EventType -eq "error")'\n}\n{
        key: "B"\ntext: 'Get-Event Event | where ($_.EventType == "error")'\n}\n{
        key: "C"\ntext: 'search in (Event) * | where EventType -eq "error"'\n}\n{
        key: "D"\ntext: 'search in (Event) "error"'\n}\n{
        key: "E"\ntext: 'select * from Event where EventType == "error"'\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Log Analytics uses the Kusto Query Language (KQL), Not PowerShell or SQL."\n\nThe 'search' operator in KQL:\n- Scans all columns (or specified tables) for a given string.\n- Syntax: search in (TableName) "textToFind"\n\nTo find error events in a specific table:\n- You can search for the literal word 'error' in the Event table:\n  search in (Event) "error"\n\nThis is exactly what option D does.\n\nWhy the others are incorrect:\n- A and B: PowerShell syntax, Not KQL.\n- C: 'search in (Event) * | where EventType -eq \"error\"' is syntactically odd and Not the simple pattern expected here.\n- E: SQL syntax; KQL doesn’t use 'select * from'.\n\nTherefore, the correct query is: search in (Event) "error".`,
    references: [],
  },
  {
    id: "Q346",
    number: 346,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains several virtual machines and an Azure Log Analytics workspace named Workspace1.\n\nYou create a log search query as shown in the following exhibit.\n\n![Azure Portal](/images/q346-sc1.png)\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nYou need to determine:\n1) For which time range the query returns events.\n2) How the results are rendered.\n\nUse the answer area to choose:\n- The correct time span, and\n- The correct description of the result visualization.`,
    options: `{
        key: "A"\ntext: "\nEvents from the last 1 day; \nresults shown in a table with two columns"\n}\n{
        key: "B"\ntext: "\nEvents from the last 7 days; \nresults shown in a graph with Computer values on the y-axis"\n}\n{
        key: "C"\ntext: "\nEvents from the last 7 days; \nresults shown in a graph with avg(CounterValue) on the y-axis"\n}\n{
        key: "D"\ntext: "\nEvents from the last 8 days; \nresults shown in a table with three columns"\n}\n{
        key: "E"\ntext: "\nEvents from the last 14 days; \nresults shown in a graph with avg(CounterValue) on the y-axis"\n}\n{
        key: "F"\ntext: "\nEvents from the last 21 days; \nresults shown in a table with three columns"\n}\n],
    correctAnswers: ["E"],
    explanation: [
      "Time range:"\n- The query uses:\n  where TimeGenerated between (startofweek(ago(9d)) .. endofweek(ago(2d)))\n\n- ago(9d): 9 days back from 'Now' (Monday) → this date falls in the week before last.\n- startofweek(ago(9d)): returns the Sunday of that earlier week.\n- ago(2d): 2 days back from 'Now' (Monday) → Saturday of the previous week.\n- endofweek(ago(2d)): returns the Saturday of that same previous week.\n\nSo the interval is from the Sunday of the week before last up to and including the Saturday of last week:\n- That is a full 2 weeks (14 days).\n\nResult shape:\n- 'summarize avg(CounterValue) by Computer, bin(TimeGenerated, 5min)'\n  produces a numeric aggregate (avg(CounterValue)) over time (TimeGenerated) per Computer.\n- 'render timechart' draws a line chart:\n  * X-axis: TimeGenerated (time buckets).\n  * Y-axis: avg(CounterValue) values; one line per Computer.\n\nSo:\n- Time range: Last 14 days.\n- Visualization: Graph (timechart) with avg(CounterValue) values on the y-axis.\n\nCorrect choice: E.`,
    references: [],
  },
  {
    id: "Q347",
    number: 347,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure AD tenant. All administrators are already required to enter a verification code (MFA) to access the Azure portal.\n\nYou Now want to further restrict access:\n- Administrators must only be able to access the Azure portal from your on-premises corporate network.\n\nWhat should you configure to enforce this requirement?`,
    options: `{
        key: "A"\ntext: "An Azure AD Identity Protection user risk policy"\n}\n{
        key: "B"\ntext: "The multi-factor authentication service settings"\n}\n{
        key: "C"\ntext: "The default settings for all roles in Azure AD Privileged Identity Management"\n}\n{
        key: "D"\ntext: "An Azure AD Identity Protection sign-in risk policy"\n}\n{
        key: "E"\ntext: "An Azure AD Conditional Access policy"\n}\n],
    correctAnswers: ["E"],
    explanation: [
      "You need to control WHERE administrators can sign in from (network/location based restriction)."\n\nAzure AD Conditional Access is the correct tool for this scenario:\n- You define a policy that targets:\n  * Specific users or roles (e.g., administrators), and\n  * Specific cloud apps (e.g., Azure Management / Azure portal).\n- Then you define conditions (e.g., sign-in locations).\n- Finally, you define access controls (e.g., allow only from trusted locations, block from untrusted locations, or require MFA, etc.).\n\nIdentity Protection user-risk or sign-in risk policies focus on risk scores, Not on specific corporate IP ranges.\nMFA service settings do Not by themselves restrict access by IP/location.\nPIM default settings control role activation, Not sign-in network location.\n\nTherefore, you should configure an Azure AD Conditional Access policy that:\n- Allows access to the Azure portal only from named (trusted) locations that represent your on-premises network.\n\nCorrect answer: E.`,
    references: [],
  },
  {
    id: "Q348",
    number: 348,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You set the multi-factor authentication (MFA) status for user admin1@contoso.com to Enabled (per-user MFA).\nAdmin1 signs in to the Azure portal using a web browser.\n\nWhich additional security verification methods can Admin1 use when prompted by Azure MFA?`,
    options: `{
        key: "A"\ntext: "A phone call, a text message that contains a verification code, and a Notification or a verification code from the Microsoft Authenticator app."\n}\n{
        key: "B"\ntext: "An app password, a text message that contains a verification code, and a Notification from the Microsoft Authenticator app."\n}\n{
        key: "C"\ntext: "An app password, a text message that contains a verification code, and a verification code from the Microsoft Authenticator app."\n}\n{
        key: "D"\ntext: "A phone call, an email message that contains a verification code, and a text message that contains an app password."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Supported Azure MFA methods (for sign-in verification) include:"\n- Phone call (voice call).\n- SMS with a verification code.\n- Microsoft Authenticator app:\n  * Push Notification ('Approve/Deny'),\n  * One-time verification code in the app.\n\nEmail is NoT a valid second factor for Azure MFA.\nApp passwords are a special type of password used for legacy apps that do Not support modern authentication—they are Not an interactive second factor for portal sign-in.\n\nTherefore, the realistic combination of additional verifications for a browser sign-in is:\n- Phone call,\n- SMS with a one-time verification code,\n- Microsoft Authenticator app (push Notification or verification code).\n\nThis is exactly what option A describes.`,
    references: [],
  },
  {
    id: "Q349",
    number: 349,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `Your company has a main office in London with 100 client computers.\nThree years ago, you migrated to Azure Active Directory (Azure AD).\n\nSecurity policy:\n- All personal devices and corporate-owned devices must be registered or joined to Azure AD.\n\nA remote user named User1 is unable to join a personal device to Azure AD from their home network.\nYou verify that other users can join their devices without issues.\n\nYou must ensure that User1 can join the device to Azure AD.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "From the Device settings blade in Azure AD, modify the 'Users may join devices to Azure AD' setting."\n}\n{
        key: "B"\ntext: "From the Device settings blade in Azure AD, modify the 'Maximum number of devices per user' setting."\n}\n{
        key: "C"\ntext: "Create a point-to-site VPN from User1’s home network to Azure."\n}\n{
        key: "D"\ntext: "Assign the User administrator role to User1."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "In Azure AD, device settings include:"\n- Users may join devices to Azure AD (who is allowed to join).\n- Users may register their devices.\n- Require MFA to join devices.\n- Maximum number of devices per user (default = 20).\n\nOther users can still join devices → the global policy 'Users may join devices to Azure AD' is working.\nOnly User1 canNot join aNother device, which strongly suggests that User1 has already reached the maximum allowed device count.\n\nWhen a user reaches the Maximum number of devices per user limit, they canNot join additional devices until devices are removed or the limit is increased.\n\nTherefore, to fix this issue:\n- Increase the 'Maximum number of devices per user' setting, or\n- Have an admin remove old/unneeded devices registered for User1.\n\nCorrect choice in the context of the question: B.`,
    references: [],
  },
  {
    id: "Q350",
    number: 350,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 with the following virtual networks:\n\n| Name | Subnet |\n|------|------|\n|VNet1      |Subnet11      |\n|VNet2      |Subnet12      |\n|VNet3      |Subnet13      |\n\nSubscripton1 contains the virtual machines shown in the following table.\n\n| Name | IP address | Availabillity set|\n|------|------|------|\n|VM1      |Subnet11      |AS1      |\n|VM2      |Subnet11      |AS1      |\n|VM3      |Subnet11      |None      |\n|VM4      |Subnet11      |None      |\n|VM5      |Subnet12      |None      |\n|VM6      |Subnet12      |None      |\n\nIn Subscription1, you create a load balancer that has the following configurations:\n- Name: LB1\n- SKU: Basic\n- Type: Internal\n- Subnet: Subnet11\n- Virtual network: VNet1\n\nFor each of the following statements, indicate whether it is true or false:`,
    options: `{
        key: "A"\ntext: "\nLB1 can balance the traffic between VM1 and VM2 :YES \nLB1 can balance the traffic between VM3 and VM4: YES \nLB1 can balance the traffic between VM5 and VM6:YES"\n}\n{
        key: "B"\ntext: "VM1 & VM2: YES; VM3 & VM4: YES; VM5 & VM6: No"\n}\n{
        key: "C"\ntext: "VM1 & VM2: YES; VM3 & VM4: No; VM5 & VM6: No"\n}\n{
        key: "D"\ntext: "VM1 & VM2: No; VM3 & VM4: YES; VM5 & VM6: No"\n}\n{
        key: "E"\ntext: "VM1 & VM2: No; VM3 & VM4: YES; VM5 & VM6: YES"\n}\n{
        key: "F"\ntext: "VM1 & VM2: No; VM3 & VM4: No; VM5 & VM6: No"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Key facts about an internal Basic Load Balancer (LB):"\n\n1) Scope of an internal load balancer:\n- It can only load-balance traffic among VMs that are in the same virtual network as the load balancer.\n- LB1 is internal to VNet1, subnet Subnet11.\n\n2) Backend pool configuration (for a Basic LB):\n- You can attach:\n  * An availability set, or\n  * A single VM (or scale set),\n- But this scenario and explanation assume you do NoT configure LB1 with multiple independent single VMs across different subnets.\n- The typical exam assumption here: you configure LB1’s backend pool with the availability set AS1 (which contains VM1 and VM2).\n\nEvaluate each pair:\n\n• VM1 and VM2:\n- Both are in Subnet11 of VNet1.\n- Both are in the same availability set AS1.\n- You can attach AS1 as the backend pool of LB1 → LB1 can load-balance between VM1 and VM2.\n→ Statement 'LB1 can balance the traffic between VM1 and VM2' is TRUE.\n\n• VM3 and VM4:\n- Both are in Subnet11, but neither is in an availability set.\n- For this question’s logic, LB1 is configured to use AS1 as backend, Not these standalone VMs.\n- Therefore, LB1 will Not be balancing traffic between VM3 and VM4.\n→ Statement is FALSE.\n\n• VM5 and VM6:\n- They are in Subnet12 (still in VNet1), but again Not part of the configured availability set AS1.\n- LB1 is bound to Subnet11 and is using a backend of AS1; it does Not include VM5 and VM6.\n→ Statement is FALSE.\n\nSo the correct combination is:\n- VM1 & VM2: YES\n- VM3 & VM4: No\n- VM5 & VM6: No\n\nThat corresponds to option C.`,
    references: [],
  },
  {
    id: "Q351",
    number: 351,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You have an Azure Active Directory (Azure AD) tenant named contoso.onmicrosoft.com.\n\nYou hire a temporary vendor. The vendor uses a personal Microsoft account with the sign-in:\n  user1@outlook.com\n\nYou need to ensure that this vendor can authenticate to your Azure AD tenant using user1@outlook.com.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "From Windows PowerShell, run New-AzureADUser and specify -UserPrincipalName user1@outlook.com."\n}\n{
        key: "B"\ntext: "From the Azure portal, add a custom domain name and create a new Azure AD user with the username user1@outlook.com."\n}\n{
        key: "C"\ntext: "From Azure Cloud Shell, run New-AzureADMSInvitation and specify -UserPrincipalName user1@outlook.com."\n}\n{
        key: "D"\ntext: "From the Azure portal, add a new guest user and specify user1@outlook.com as the email address."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "The vendor already has an external Microsoft account (user1@outlook.com). You don’t want to create a local member user for him, you want to invite him as a B2B guest."\n\nCorrect approach:\n- In the Azure portal, go to Azure Active Directory → Users → New guest user (Invite user).\n- Enter user1@outlook.com as the email address.\n- This creates a guest user object and sends an invitation email.\n\nWhy the others are wrong:\n- A: New-AzureADUser creates a *member* user in your tenant, Not a guest based on an external Microsoft account.\n- B: Adding a custom domain and creating a standard user would create a regular corporate account, Not link to the existing Microsoft account.\n- C: New-AzureADMSInvitation is the correct PowerShell cmdlet to invite guests, but it uses -InvitedUserEmailAddress, Not -UserPrincipalName. The option as written is syntactically incorrect and also Not the portal method they are asking for.\n\nTherefore, the correct answer is D: invite a new guest user in the portal with email user1@outlook.com.`,
    references: [],
  },
  {
    id: "Q352",
    number: 352,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains about 100 virtual machines. You regularly create and delete VMs.\n\nYou want to identify *unused* (unattached) disks that can safely be deleted to reduce cost.\n\nWhich tool or blade should you use?`,
    options: `{
        key: "A"\ntext: "Use Microsoft Azure Storage Explorer and view the Account Management properties."\n}\n{
        key: "B"\ntext: "In the Azure portal, review Azure Advisor recommendations."\n}\n{
        key: "C"\ntext: "In Cloudyn, open the Optimizer tab and create a report."\n}\n{
        key: "D"\ntext: "In Cloudyn, create a Cost Management report."\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Cloudyn (Now integrated into Azure Cost Management) provides optimization reports that can identify:"\n- Idle/underutilized virtual machines.\n- Unattached/unused managed and unmanaged disks.\n\nThe *Optimizer* tab specifically focuses on inefficiencies such as:\n- Idle VMs and disks.\n- Oversized resources.\n\nWhy the other options are less suitable here:\n- A: Storage Explorer can show which disks exist but does Not automatically correlate them with attached/unused status across the whole subscription in a report-style way.\n- B: Azure Advisor mainly gives performance, security, and cost recommendations, but historically the exam refers to Cloudyn Optimizer for this particular scenario.\n- D: Cost Management reports focus on cost breakdown and trends, Not detailed technical optimization like unattached disks.\n\nTherefore, for exam purposes, the expected answer is C: use Cloudyn’s Optimizer to create a report and find unused disks.`,
    references: [],
  },
  {
    id: "Q353",
    number: 353,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an on-premises Active Directory forest named contoso.com.\n\nYou install and configure Azure AD Connect using *password hash synchronization* as the single sign-on (SSO) method.\nCurrently, *staging mode* is enabled on the Azure AD Connect server.\n\nWhen you review the synchronization results in Synchronization Service Manager, you Notice that No sync jobs are displayed.\n\nYou need to ensure synchronization completes successfully.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "In Synchronization Service Manager, run a full import."\n}\n{
        key: "B"\ntext: "Run Azure AD Connect and change the SSO method to Pass-through Authentication."\n}\n{
        key: "C"\ntext: "From Azure PowerShell, run Start-AdSyncSyncCycle -PolicyType Initial."\n}\n{
        key: "D"\ntext: "Run Azure AD Connect and disable staging mode."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Staging mode on Azure AD Connect means:"\n- The server *does* import directory data and run rules,\n- But it does *Not* export changes to Azure AD and it does Not act as the active sync engine.\n- It is used for testing, backup servers, or migrations.\n\nBecause staging mode is enabled:\n- Password hash synchronization and Normal export operations are effectively disabled.\n- That is why you see No active sync jobs completing as expected.\n\nTo make this server the active synchronization server, you must:\n- Run Azure AD Connect and **disable staging mode**.\n\nWhy the others are wrong:\n- A: Full import alone does Not change the staging behavior; the server would still Not export changes.\n- B: Changing to Pass-through Authentication only changes the sign-on method, Not the fact that the server is in staging mode.\n- C: Start-AdSyncSyncCycle triggers a sync cycle, but staging mode still prevents exports to Azure AD.\n\nTherefore, the correct action is D: disable staging mode in Azure AD Connect.`,
    references: [],
  },
  {
    id: "Q354",
    number: 354,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "hard",
    question: `You have an Azure subscription named Subscription1.\n\nVirtual machines:\n- VM1: IP 10.0.1.4 in Subnet1\n- VM2: IP 10.0.2.4 in Subnet2\n- VM3: IP 10.0.3.4 in Subnet3\n\nVirtual network VNet has subnets:\n- Subnet1: 10.0.1.0/24 (contains VM1)\n- Subnet2: 10.0.2.0/24 (contains VM2)\n- Subnet3: 10.0.3.0/24 (contains VM3)\n\nNIC3 (on VM3):\n- IP forwarding is enabled.\n- Routing is enabled on VM3 (it acts as a router/virtual appliance).\n\nYou create a route table RT1 associated to Subnet1 and Subnet2 with routes:\n- 10.0.1.0/24 → next hop type: Virtual appliance, next hop address: 10.0.3.4\n- 10.0.2.0/24 → next hop type: Virtual appliance, next hop address: 10.0.3.4\n\nYou also apply RT1 to Subnet3.\n\nFor each statement below, decide if it is true or false:\n1) Network traffic from VM3 can reach VM1.\n2) If VM3 is turned off, network traffic from VM2 can reach VM1.\n3) Network traffic from VM1 can reach VM2.`,
    options: `{
        key: "A"\ntext: "VM3 → VM1: YES; (VM3 off) VM2 → VM1: YES; VM1 → VM2: YES"\n}\n{
        key: "B"\ntext: "VM3 → VM1: YES; (VM3 off) VM2 → VM1: No;  VM1 → VM2: YES"\n}\n{
        key: "C"\ntext: "VM3 → VM1: YES; (VM3 off) VM2 → VM1: No;  VM1 → VM2: No"\n}\n{
        key: "D"\ntext: "VM3 → VM1: No;  (VM3 off) VM2 → VM1: YES; VM1 → VM2: No"\n}\n{
        key: "E"\ntext: "VM3 → VM1: No;  (VM3 off) VM2 → VM1: YES; VM1 → VM2: YES"\n}\n{
        key: "F"\ntext: "VM3 → VM1: No;  (VM3 off) VM2 → VM1: No;  VM1 → VM2: No"\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Key concepts:"\n- Azure automatically creates system routes (one subnet can reach aNother inside the same VNet).\n- User-defined routes (UDRs) override system routes when associated with a subnet.\n- Here, RT1 is associated with *all three* subnets: Subnet1, Subnet2, and Subnet3.\n- VM3 (10.0.3.4) acts as a virtual appliance (router) because IP forwarding and routing are enabled.\n\n1) VM3 → VM1:\n- Subnet3 has RT1, but RT1 does *Not* define a custom route for 10.0.1.0/24 from Subnet3.\n- However, Subnet3 still has the default system route to all subnets in the VNet.\n- Therefore, VM3 can reach VM1 using the default route from Subnet3 to Subnet1.\n→ Statement 1 is TRUE.\n\n2) If VM3 is turned off, can VM2 → VM1?\n- RT1 is associated with Subnet1 and Subnet2. For traffic from Subnet2 (VM2) to Subnet1 (VM1), the UDR says:\n  * 10.0.1.0/24 → next hop = virtual appliance 10.0.3.4 (VM3).\n- This overrides the default VNet route. All Subnet2→Subnet1 traffic is forced through VM3.\n- If VM3 is off, that route is effectively broken and there is No fallback to the system route.\n→ Statement 2 is FALSE.\n\n3) VM1 → VM2:\n- Similarly, Subnet1 has the UDR:\n  * 10.0.2.0/24 → next hop = virtual appliance 10.0.3.4.\n- So traffic from VM1 to VM2 is routed via VM3.\n- As long as VM3 is running, VM1 can reach VM2 via this virtual appliance.\n→ Statement 3 is TRUE (assuming VM3 is on, which the statement does Not contradict).\n\nTherefore, the correct combination is:\n- VM3 → VM1: YES\n- (VM3 off) VM2 → VM1: No\n- VM1 → VM2: YES\nwhich corresponds to option B.`,
    references: [],
  },
  {
    id: "Q355",
    number: 355,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure virtual network named VNet1 with a subnet named Subnet1.\nSubnet1 contains three Azure virtual machines. Each VM has a public IP address.\n\nThe VMs host applications on TCP port 443 that are accessible from the Internet.\nYour on-premises network is connected to VNet1 by a site-to-site VPN.\n\nYou discover that:\n- The VMs can be accessed with Remote Desktop Protocol (RDP, port 3389) both from the Internet and from the on-premises network.\n\nYou must:\n- Prevent RDP access from the Internet,\n- Allow RDP access only from the on-premises network,\n- Keep the HTTPS applications (port 443) accessible from the Internet.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "Modify the address space of the local network gateway."\n}\n{
        key: "B"\ntext: "Remove the public IP addresses from the virtual machines."\n}\n{
        key: "C"\ntext: "Modify the address space of Subnet1."\n}\n{
        key: "D"\ntext: "Create a deny rule in a network security group (NSG) that is linked to Subnet1."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "You need to *filter* which source IPs are allowed to access RDP while still allowing HTTPS from the Internet."\n\nBest practice:\n- Use a Network Security Group (NSG) on Subnet1 (or on each NIC).\n- Define rules like:\n  * Allow RDP (TCP 3389) from on-premises IP ranges only.\n  * Deny RDP (TCP 3389) from all other Internet sources.\n  * Leave HTTPS (TCP 443) allow rules from Internet unchanged.\n\nWhy the other choices are wrong:\n- A: Changing the local network gateway address space affects the VPN configuration, Not the VM’s RDP exposure.\n- B: Removing public IPs would also break external HTTPS access, which must remain available.\n- C: Changing the subnet address space doesn’t control who can RDP into those VMs.\n\nTherefore, the correct approach is to use an NSG and create an appropriate deny rule for RDP from the Internet on Subnet1 (D).`,
    references: [],
  },
  {
    id: "Q356",
    number: 356,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You have an Azure tenant with two subscriptions: Subscription1 and Subscription2.\n\nIn Subscription1, you deploy a virtual machine named Server1 that runs Windows Server 2016 and uses managed disks.\n\nYou need to move Server1 to Subscription2.\nThe solution must minimize administrative effort (No manual disk-copy and re-create if possible).\n\nWhat should you do first?`,
    options: `{
        key: "A"\ntext: "In Subscription2, create a copy of the virtual disk."\n}\n{
        key: "B"\ntext: "From Azure PowerShell, run Move-AzResource."\n}\n{
        key: "C"\ntext: "Create a snapshot of the virtual disk."\n}\n{
        key: "D"\ntext: "Create a new virtual machine in Subscription2."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Azure supports *moving* many resource types, including VMs with managed disks, across subscriptions in the same tenant."\n\nStandard process:\n1) Ensure the VM and all its dependent resources are in the same resource group (if Not, move them first within the subscription).\n2) Use the move resource operation to move that resource group (or selected resources) from Subscription1 to Subscription2.\n\nIn PowerShell, this is done with:\n- Move-AzResource (or equivalent portal operation).\n\nWhy others are Not ideal:\n- A: Manually copying disks to aNother subscription is unnecessary and more work than using the built-in move capability.\n- C: A snapshot is useful for backup/clone, but it doesn’t move the VM including NICs, config, etc.\n- D: Manually creating a new VM in Subscription2 requires manual reconfiguration and disk attach, which is more administrative work.\n\nTherefore, the first step to minimize effort is to use Move-AzResource (answer B).`,
    references: [],
  },
  {
    id: "Q357",
    number: 357,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "hard",
    question: `You have an Azure subscription named Subscription1 with the ID:\n  c276fc76-9cd4-44c9-99a7-4fd71546436e\n\nYou need to create a custom RBAC role named CR1 with the following requirements:\n- CR1 can be assigned **only** to *resource groups* in Subscription1.\n- CR1 must **Not** allow management of access permissions (i.e., No role assignments) for the resource groups.\n- CR1 must allow viewing, creating, modifying, and deleting resources within those resource groups.\n\nYou are editing the JSON role definition and must set:\n- "AssignableScopes": [ ... ]\n- The appropriate permission element to block access management.\n\nWhat should you specify for AssignableScopes and the permission element?`,
    options: `{
        key: "A"\ntext: 'AssignableScopes: "/"; Permission element: Actions = "Microsoft/Resources/*"'\n}\n{
        key: "B"\ntext: 'AssignableScopes: "/"; Permission element: Actions = "Microsoft/Security/*"'\n}\n{
        key: "C"\ntext: 'AssignableScopes: "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e"; Permission element: Actions = "Microsoft/Resources/*"'\n}\n{
        key: "D"\ntext: 'AssignableScopes: "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e"; Permission element: NotActions = "Microsoft.Authorization/*"'\n}\n{
        key: "E"\ntext: 'AssignableScopes: "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e/resourceGroups"; Permission element: Actions = "Microsoft/Security/*"'\n}\n{
        key: "F"\ntext: 'AssignableScopes: "/subscriptions/c276fc76-9cd4-44c9-99a7-4fd71546436e/resourceGroups"; Permission element: NotActions = "Microsoft.Authorization/*"'\n}\n],
    correctAnswers: ["F"],
    explanation: [
      "1) AssignableScopes:"\n- You want the role to be assignable only *at the resource group level in this subscription*.\n- Using:\n  "/subscriptions/<subscriptionId>/resourceGroups"\nmeans the role can be assigned to any resource group in that subscription, but **Not** at subscription or management group scope.\n\n2) Permissions (Actions / NotActions):\n- To allow full resource management inside the resource groups, CR1 should have:\n  Actions: [ "Microsoft.Resources/*" ] (and possibly provider-specific actions as needed).\n- To prevent managing access permissions (role assignments, etc.), we must block:\n  Microsoft.Authorization/*\nbecause that namespace covers role assignments and related authorization operations.\n- The usual pattern is:\n  Actions: [ "*" ] or as broad as needed for resource management,\n  NotActions: [ "Microsoft.Authorization/*" ]\n\nIn the answer choices, they simplify this to choosing the correct AssignableScopes and the correct permission element to exclude authorization:\n- AssignableScopes: "/subscriptions/.../resourceGroups"\n- Permission element: NotActions = "Microsoft.Authorization/*"\n\nThis corresponds to option F.\n\nSo, CR1:\n- Can only be assigned at resource group scope in Subscription1.\n- Can manage resources but canNot change access control because all Microsoft.Authorization operations are excluded in NotActions.`,
    references: [],
  },
  {
    id: "Q358",
    number: 358,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",
    question: `You have an Azure subscription with about 100 virtual machines.\nYou want to quickly identify *underutilized* VMs that could be resized to a cheaper SKU (to save cost).\n\nWhich Azure portal blade should you use?`,
    options: `{
        key: "A"\ntext: "Metrics"\n}\n{
        key: "B"\ntext: "Customer insights"\n}\n{
        key: "C"\ntext: "Monitor"\n}\n{
        key: "D"\ntext: "Advisor"\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Azure Advisor analyzes resource telemetry and configuration and provides recommendations for:"\n- Cost optimization (including underutilized/idle VMs),\n- Performance,\n- Security,\n- Reliability.\n\nFor underutilized VMs specifically:\n- Advisor looks at CPU, network, and sometimes memory pressure over a 7-day window.\n- It flags VMs that can be shut down or resized and shows potential cost savings.\n\nOther blades:\n- Metrics: lets you visualize performance but does Not automatically suggest optimization.\n- Monitor: aggregates logs/metrics/alerts but does Not directly give optimization recommendations.\n- Customer insights: Not related to VM right-sizing.\n\nTherefore, to quickly identify underutilized VMs suitable for a cheaper tier, you use **Azure Advisor** (answer D).`,
    references: [],
  },
  {
    id: "Q359",
    number: 359,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `Your Azure AD tenant contains the following users:\n\n- User1: member of Group1, No admin role.\n- User2: member of Group2, No admin role.\n- User3: member of Group1 and Group2, role = User administrator.\n\nYou configure Self-Service Password Reset (SSPR) for the tenant:\n- SSPR enabled for: Selected group = Group2 only.\n\nAuthentication methods settings:\n- Number of methods required to reset: 2\n- Methods available:\n  * Mobile app Notification\n  * Mobile app code\n  * Email\n  * Mobile phone\n  * Office phone\n  * Security questions\n- Security questions:\n  * Number of questions required to register: 3\n  * Number of questions required to reset: 4\n\nEvaluate each statement:\n1) After User2 answers three security questions, he can reset his password immediately.\n2) If User1 forgets her password, she can reset the password by using the mobile phone app.\n3) User3 can add security questions to the password reset process.\n\nFor each statement, select YES or No.`,
    options: `{
        key: "A"\ntext: "(1) YES; (2) YES; (3) YES"\n}\n{
        key: "B"\ntext: "(1) YES; (2) YES; (3) No"\n}\n{
        key: "C"\ntext: "(1) YES; (2) No;  (3) YES"\n}\n{
        key: "D"\ntext: "(1) No;  (2) YES; (3) No"\n}\n{
        key: "E"\ntext: "(1) No;  (2) No;  (3) YES"\n}\n{
        key: "F"\ntext: "(1) No;  (2) No;  (3) No"\n}\n],
    correctAnswers: ["F"],
    explanation: [
      "Break down each statement:"\n\nWho is enabled for SSPR?\n- SSPR is enabled only for *Group2*.\n- User1: member of Group1 only → **Not** enabled for SSPR.\n- User2: member of Group2 → **enabled** for SSPR.\n- User3: member of Group1 and Group2 → **enabled** for SSPR, and is also a User administrator.\n\nSSPR method configuration:\n- Number of methods required to reset = 2.\n- Security questions:\n  * Must register 3 questions.\n  * Must answer 4 questions to reset (this is already inconsistent: you canNot answer 4 if only 3 are registered).\n\n1) "After User2 answers three security questions, he can reset his password immediately."\n- Password reset requires 2 methods.\n- Security questions count as *one* method, Not two.\n- Even igNoring the register/reset mismatch, answering security questions alone is still just one method.\n- Therefore, after only 3 questions (and only one method completed), he CANNoT reset.\n→ Statement 1 is FALSE.\n\n2) "If User1 forgets her password, she can reset the password by using the mobile phone app."\n- User1 is Not in Group2 and SSPR is enabled only for Group2.\n- She is Not eligible for SSPR at all, so she canNot use the mobile app or any method.\n→ Statement 2 is FALSE.\n\n3) "User3 can add security questions to the password reset process."\n- User3 has the User administrator role.\n- That role allows managing user accounts, but it does *Not* allow changing the tenant’s SSPR policy configuration (methods, questions, etc.).\n- Policy configuration is done by higher level roles (e.g., Global admin, Authentication policy admin), Not simple User administrators.\n→ Statement 3 is FALSE.\n\nSo the correct combination is:\n- (1) No; (2) No; (3) No\nwhich corresponds to option F.`,
    references: [],
  },
  {
    id: "Q360",
    number: 360,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `Your company has a main office in London with 100 client computers.\nThree years ago, you migrated to Azure Active Directory (Azure AD).\n\nSecurity policy:\n- All personal and corporate devices must be registered or joined to Azure AD.\n\nA remote user, User1, is unable to join a personal device to Azure AD from their home network.\nYou confirm that other users can join their devices without any issue.\n\nYou must ensure that User1 can join this personal device to Azure AD.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "From the Device settings blade, modify the 'Users may join devices to Azure AD' setting."\n}\n{
        key: "B"\ntext: "From the Device settings blade, modify the 'Maximum number of devices per user' setting."\n}\n{
        key: "C"\ntext: "Create a point-to-site VPN from User1’s home network to Azure."\n}\n{
        key: "D"\ntext: "Assign the User administrator role to User1."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Key settings in Azure AD → Devices → Device settings:"\n- Users may join devices to Azure AD.\n- Users may register their devices with Azure AD.\n- Require MFA to join devices.\n- Maximum number of devices per user (default: 20).\n\nSince other users can still join devices:\n- The global setting 'Users may join devices to Azure AD' clearly allows standard users to join.\n- The problem is specific to User1.\n\nMost likely cause:\n- User1 has already reached the configured 'Maximum number of devices per user' limit.\n- When this limit is hit, the user canNot join additional devices until:\n  * An admin removes some existing devices, or\n  * The max devices limit is increased.\n\nWhy other options are Not appropriate:\n- A: If this setting were preventing joins, it would affect all users, Not just User1.\n- C: Network connectivity is Not the issue; others can join from outside as well.\n- D: The User administrator role is about user management, Not about device join eligibility.\n\nTherefore, the correct action is B: adjust the 'Maximum number of devices per user' (or clean up User1’s existing devices) so User1 can join the new device.`,
    references: [],
  },
  {
    id: "Q361",
    number: 361,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You have an Azure subscription that contains the resources shown:\n\n- VNet1 (type: Virtual network) in resource group RG1\n- VM1   (type: Virtual machine)  in resource group RG1\n\nAn Azure Policy assignment of type **Not allowed resource types** is scoped to RG1 with the following parameters:\n- Microsoft.Network/virtualNetworks\n- Microsoft.Compute/virtualMachines\n\nYou must create a new virtual machine named VM2 in RG1 and then connect VM2 to VNet1.\n\nWhat should you do first?`,
    options: `{
        key: "A"\ntext: "Add a subnet to VNet1."\n}\n{
        key: "B"\ntext: "Remove Microsoft.Network/virtualNetworks from the policy."\n}\n{
        key: "C"\ntext: "Create an Azure Resource Manager template."\n}\n{
        key: "D"\ntext: "Remove Microsoft.Compute/virtualMachines from the policy."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "The **Not allowed resource types** policy prevents creation of any resource whose type is listed in the parameters, within the scope (RG1)."\n\nIn this case:\n- \`Microsoft.Compute/virtualMachines\` is blocked, so **No new VMs** can be created in RG1.\n- \`Microsoft.Network/virtualNetworks\` is blocked, so **No new VNets** can be created in RG1.\n\nRG1 already contains VNet1 and VM1, so existing resources are fine. But to create VM2 in RG1 you must first allow the VM resource type.\n\nTherefore you must remove **Microsoft.Compute/virtualMachines** from the policy before creating VM2.\n\nCorrect answer: D.`,
    references: [],
  },
  {
    id: "Q362",
    number: 362,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",
    question: `You have an Azure virtual machine named VM1 that runs Windows Server 2016.\n\nGoal:\n- Create an alert in Azure when **more than two error events** are logged to the **System** event log on VM1 within one hour.\n\nProposed solution:\n1. Create an Azure Log Analytics workspace and configure the data source settings.\n2. Add the Log Analytics agent virtual machine extension to VM1.\n3. Create an alert in Azure Monitor and specify the Log Analytics workspace as the source.\n\nDoes this solution meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "To alert on event log conditions inside a VM you typically:"\n- Create a **Log Analytics workspace**.\n- Install the **Log Analytics / Azure Monitor agent** on the VM.\n- Configure collection of Windows event logs (e.g., System).\n- Use a **Log (KQL) alert** in Azure Monitor against that workspace.\n\nThe proposed solution does exactly this:\n- It streams the System log into the workspace and then creates an alert based on a query (e.g., count of error events in 1 hour).\n\nResult: The solution meets the requirement.\n\nCorrect answer: A.`,
    references: [],
  },
  {
    id: "Q363",
    number: 363,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",
    question: `You have an Azure subscription named Subscription1 with an Azure Log Analytics workspace named Workspace1.\n\nYou need to view **error events** from a table named **Event**.\n\nWhich query should you run in Workspace1?`,
    options: `{
        key: "A"\ntext: 'Get-Event Event | where { $_.EventType == "error" }'\n}\n{
        key: "B"\ntext: 'Event | search "error"'\n}\n{
        key: "C"\ntext: 'select * from Event where EventType == "error"'\n}\n{
        key: "D"\ntext: 'Event | where EventType == "error"'\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Azure Monitor / Log Analytics uses **Kusto Query Language (KQL)**, Not PowerShell or SQL."\n\nTo search for the term "error" in the \`Event\` table you can either:\n- \`search in (Event) "error"\`, or\n- Pipe the table into \`search\`: \`Event | search "error"\`\n\nAmong the options:\n- A uses PowerShell \`Get-Event\` – Not KQL.\n- C/E-like SQL syntax – Not KQL.\n- D (\`where EventType == "error"\`) would filter a specific field, but the official exam explanation for this question expects the **search** operator.\n\nGiven the provided answers, the correct one matching the official solution is:\n- **B. \`Event | search "error"\``,
    references: [],
  },
  {
    id: "Q364",
    number: 364,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an ARM template named Template1 that deploys an Azure virtual machine.\n\nTemplate snippets:\n\nParameter section:\n"location": {\n  "type": "String",\n  "defaultValue": "eastus",\n  "allowedValues": [\n    "canadacentral",\n    "eastus",\n    "westeurope",\n    "westus"\n  ]\n}\n\nVariables section:\n"location": "westeurope"\n\nResources section:\n"type": "Microsoft.Compute/virtualMachines",\n"apiVersion": "2018-10-01",\n"name": "[variables(\'vmName\')]",\n"location": "westeurope",\n\nYou must deploy the VM to the **West US** region using Template1.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: 'Modify the location property in the **resource** section to "westus".'\n}\n{
        key: "B"\ntext: "Select West US during the deployment."\n}\n{
        key: "C"\ntext: 'Modify the location in the **variables** section to "westus".'\n}\n{
        key: "D"\ntext: 'Modify the defaultValue of the location parameter in Template1 to "westus".'\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "The effective location of the VM is determined by the **\`location\` property in the resource definition**:"\n\n"location": "westeurope"\n\nThis is **hard-coded** and does Not reference the parameter or variable:\n- It is Not \`[parameters('location')]\`\n- It is Not \`[variables('location')]\`\n\nTherefore:\n- Changing the parameter default or variable would have No effect until the resource’s \`location\` property is wired to them.\n- To deploy in **westus** using this template as-is, you must change:\n  \`"location": "westeurope"\` → \`"location": "westus"\` in the resource.\n\nCorrect answer: A.`,
    references: [],
  },
  {
    id: "Q365",
    number: 365,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You plan to migrate a distributed on-premises application named App1 to Azure.\n\nAfter the migration, App1 will run on several Azure virtual machines.\nYou must ensure that **App1 always runs on at least eight VMs during planned Azure platform maintenance**.\n\nWhat should you create?`,
    options: `{
        key: "A"\ntext: "One virtual machine scale set that has 10 virtual machine instances."\n}\n{
        key: "B"\ntext: "One Availability Set that has three fault domains and one update domain."\n}\n{
        key: "C"\ntext: "One Availability Set that has 10 update domains and one fault domain."\n}\n{
        key: "D"\ntext: "One virtual machine scale set that has 12 virtual machine instances."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "During **planned maintenance**, Azure updates VMs by **update domain**:"\n- Only one update domain is updated at a time.\n\nScale sets:\n- Use **5 update domains** by default.\n- With 10 VM instances in a scale set, a maximum of **2 instances are updated simultaneously** (10 / 5).\n- That means during maintenance you still have **8 running instances**.\n\nOption analysis:\n- A: 10 instances in a scale set → at most 2 updated at once → 8 remain running → meets the requirement.\n- D: 12 instances also works, but the official exam answer uses the minimal number of VMs that meets the requirement, which is 10.\n- B/C: Availability sets with few or many update domains can help, but the question and explanation point specifically to scale sets and their behavior.\n\nTherefore, the expected answer is: A.`,
    references: [],
  },
  {
    id: "Q366",
    number: 366,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",
    question: `You administer an Azure web app named **webapp1**.\n\nYou have:\n- A virtual network named **VNET1**.\n- An Azure virtual machine named **VM1** that runs MySQL and is connected to VNET1.\n\nYou must ensure that webapp1 can access the MySQL data hosted on VM1.\n\nWhat should you do?`,
    options: `{ key: "A"\ntext: "Deploy an internal load balancer." }\n{ key: "B"\ntext: "Peer VNET1 to aNother virtual network." }\n{ key: "C"\ntext: "Connect webapp1 to VNET1." }\n{ key: "D"\ntext: "Deploy an Azure Application Gateway." }\n],
    correctAnswers: ["C"],
    explanation: [
      "For an App Service web app to reach a VM in a VNet using private IP:"\n- You use **App Service VNet Integration** to connect the web app to an Azure virtual network.\n- Once integrated, the web app can access resources (like VM1’s private IP) in that VNet.\n\nOther options:\n- A: Internal load balancer is Not required just for connectivity.\n- B: Peering is only relevant if you have aNother VNet; it doesn’t connect App Service directly.\n- D: Application Gateway is for HTTP/S reverse-proxy and WAF, Not for outbound access from the web app to the VM.\n\nSo you need to **connect webapp1 to VNET1** using VNet Integration.\n\nCorrect answer: C.`,
    references: [],
  },
  {
    id: "Q367",
    number: 367,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription with a virtual network named **VNET1** in region **East US 2**.\n\nAn ARM template defines two virtual machines:\n- VM1:\n  * location: "EastUS2"\n  * zone: "1"\n- VM2:\n  * location: "EastUS2"\n  * zone: "2"\n\nBoth VMs use network interfaces in the same region.\n\nEvaluate the statements:\n1) VM1 and VM2 can connect to VNET1.\n2) If an Azure **datacenter** (availability zone) becomes unavailable, VM1 or VM2 will still be available.\n3) If the **East US 2 region** becomes unavailable, VM1 or VM2 will still be available.\n\nSelect YES/No for each statement.`,
    options: `{ key: "A"\ntext: "(1) YES; (2) YES; (3) YES" }\n{ key: "B"\ntext: "(1) YES; (2) YES; (3) No" }\n{ key: "C"\ntext: "(1) YES; (2) No;  (3) YES" }\n{ key: "D"\ntext: "(1) No;  (2) YES; (3) No" }\n{ key: "E"\ntext: "(1) No;  (2) No;  (3) YES" }\n{ key: "F"\ntext: "(1) No;  (2) No;  (3) No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "1) Connectivity to VNET1:"\n- VNET1 is in East US 2.\n- Both VMs are deployed in East US 2 (zones 1 and 2).\n- A VNet is scoped to a region, Not to a zone, so both VMs can be attached to and connect within VNET1.\n→ Statement 1: **YES**.\n\n2) Datacenter (zone) failure:\n- VM1 is in zone 1, VM2 is in zone 2.\n- Availability Zones provide resiliency against **datacenter / zone failures** within a region.\n- If one zone fails, the VM in the other zone remains available.\n→ Statement 2: **YES**.\n\n3) Region failure:\n- Both VMs are in the **same region** (East US 2).\n- If the entire region becomes unavailable, both VMs become unavailable.\n→ Statement 3: **No**.\n\nCorrect combination: (1) YES; (2) YES; (3) No → option B.`,
    references: [],
  },
  {
    id: "Q368",
    number: 368,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "easy",
    question: `You have an Azure subscription named Subscription1 that contains an Azure Log Analytics workspace named Workspace1.\n\nYou need to view the **error events** from the **Event** table.\n\nWhich query should you run?`,
    options: `{
        key: "A"\ntext: 'Get-Event Event | where ($_.EventType -eq "error")'\n}\n{
        key: "B"\ntext: 'Get-Event Event | where ($_.EventType == "error")'\n}\n{
        key: "C"\ntext: 'search in (Event) * | where EventType -eq "error"'\n}\n{
        key: "D"\ntext: 'search in (Event) "error"'\n}\n{
        key: "E"\ntext: 'select * from Event where EventType == "error"'\n}\n],
    correctAnswers: ["D"],
    explanation: [
      'In Azure Monitor / Log Analytics, to search for the term "error" within a specific table you can use:'\n- \`search in (Event) "error"\`\n\nThis scans all columns in the **Event** table for the string "error".\n\nOption analysis:\n- A/B: PowerShell syntax, Not KQL.\n- C: Uses KQL syntax but unnecessarily includes \`*\` after \`search in (Event)\`, and is Not the official answer for this Q.\n- E: SQL-like syntax, Not KQL.\n\nThe official answer for this variant is:\n- **D. \`search in (Event) "error"\``,
    references: [],
  },
  {
    id: "Q369",
    number: 369,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",
    question: `You have an Azure Storage account named **storage1**.\n\nYou have:\n- App1: An Azure App Service app using a **managed identity**.\n- App2: An app running in an Azure **container instance**, also using a managed identity.\n\nBoth apps need to **read blobs** from storage1.\nRequirements:\n- Minimize the number of secrets used.\n- Ensure that App2 can only read from storage **for the next 30 days**.\n\nWhat should you configure in the storage account for each app?`,
    options: `{
        key: "A"\ntext: "App1: Access keys;                      App2: Access keys"\n}\n{
        key: "B"\ntext: "App1: Access control (IAM);            App2: Advanced security"\n}\n{
        key: "C"\ntext: "App1: Access control (IAM);            App2: Shared access signatures (SAS)"\n}\n{
        key: "D"\ntext: "App1: Advanced security;               App2: Access keys"\n}\n{
        key: "E"\ntext: "App1: Shared access signatures (SAS);  App2: Shared access signatures (SAS)"\n}\n{
        key: "F"\ntext: "App1: Access control (IAM);            App2: Access control (IAM)"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Goal 1: **Minimize secrets**:"\n- Both apps have **managed identities**.\n- The best practice is to use **Azure RBAC (Access control – IAM)** with managed identities instead of sharing storage account keys or SAS tokens.\n- App1 is a long-lived app → grant it RBAC access using its managed identity to the Blob container, No secrets required.\n\nGoal 2: App2 only for **next 30 days**:\n- RBAC does Not natively support time-limited assignments in this simple way.\n- For time-limited access to storage, you use a **Shared Access Signature (SAS)** with an expiry time (e.g., 30 days).\n- SAS is a temporary secret, but that’s acceptable here because we need time-bounded access.\n\nTherefore:\n- **App1:** Use **Access control (IAM)** with its managed identity.\n- **App2:** Use a **SAS** token with a 30-day expiration.\n\nCorrect answer: C.`,
    references: [],
  },
  {
    id: "Q370",
    number: 370,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "hard",
    question: `You have an Azure subscription that contains the following resources:\n\n- VNET1 (virtual network) in resource group RG1\n- VNET2 (virtual network) in resource group RG2\n- VM1   (virtual machine)  in resource group RG2 (status: Running)\n\nYou assign the **Not allowed resource types** Azure Policy at scope **Subscription1/RG2** with parameters:\n- Microsoft.ClassicNetwork/virtualNetworks\n- Microsoft.Network/virtualNetworks\n- Microsoft.Compute/virtualMachines\n\nEvaluate these statements:\n1) An administrator can move VNET1 to RG2.\n2) The state of VM1 changed to Stopped (deallocated) when the policy was assigned.\n3) An administrator can modify the address space of VNET2.\n\nFor each statement, select YES or No.`,
    options: `{ key: "A"\ntext: "(1) YES; (2) YES; (3) YES" }\n{ key: "B"\ntext: "(1) YES; (2) YES; (3) No" }\n{ key: "C"\ntext: "(1) No;  (2) YES; (3) No" }\n{ key: "D"\ntext: "(1) YES; (2) No;  (3) No" }\n{ key: "E"\ntext: "(1) No;  (2) No;  (3) YES" }\n{ key: "F"\ntext: "(1) No;  (2) No;  (3) No" }\n],
    correctAnswers: ["F"],
    explanation: [
      "What the **Not allowed resource types** policy does:"\n- It prevents creation or updates of resources of specified types in its scope (here: RG2).\n\n1) Can VNET1 be moved to RG2?\n- Moving a resource into RG2 is effectively a **create** of that resource in RG2.\n- Since \`Microsoft.Network/virtualNetworks\` is Not allowed in RG2, the move will be blocked.\n→ Statement 1: **No**.\n\n2) Does VM1’s state change to Stopped (deallocated) when the policy is assigned?\n- Azure Policy is **evaluative**; it doesn’t automatically stop or delete existing resources.\n- It prevents new deployments or updates that violate the policy, but it does Not deallocate running VMs.\n→ Statement 2: **No**.\n\n3) Can an admin modify the address space of VNET2?\n- Changing the address space is an **update** operation on a \`Microsoft.Network/virtualNetworks\` resource in RG2.\n- The policy forbids that resource type; updates are blocked for disallowed types.\n→ Statement 3: **No**.\n\nSo the correct combination is:\n- (1) No; (2) No; (3) No → option F.`,
    references: [],
  },

  {
    id: "Q371",
    number: 371,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have the following App Service plans:\n\nASP1: Windows, West US\nASP2: Windows, Central US\nASP3: Linux,  West US\n\nYou plan to create the following web apps:\n\nWebApp1:\n- Runtime stack: .NET Core 3.0\n- Location: West US\n\nWebApp2:\n- Runtime stack: ASP.NET 4.7\n- Location: West US\n\nYou must identify which App Service plans can be used for each web app.\nNote:\n- Web apps must use an App Service plan in the same Azure region.\n- ASP.NET 4.7 requires a Windows-based App Service plan.\n- .NET Core 3.0 is supported on both Windows and Linux App Service plans.\n\nWhich App Service plans can be used?`,
    options: `{
        key: "A"\ntext: "WebApp1: ASP1 only;                  WebApp2: ASP1 only"\n}\n{
        key: "B"\ntext: "WebApp1: ASP1 and ASP3 only;         WebApp2: ASP1 and ASP3 only"\n}\n{
        key: "C"\ntext: "WebApp1: ASP1 and ASP3 only;         WebApp2: ASP1 only"\n}\n{
        key: "D"\ntext: "WebApp1: ASP1 and ASP2 only;         WebApp2: ASP1 and ASP2 only"\n}\n{
        key: "E"\ntext: "WebApp1: ASP1 only;                  WebApp2: ASP1, ASP2, and ASP3"\n}\n{
        key: "F"\ntext: "WebApp1: ASP1, ASP2, and ASP3;       WebApp2: ASP1, ASP2, and ASP3"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nRegion requirement:\n- Both web apps are in West US.\n- Only ASP1 (Windows, West US) and ASP3 (Linux, West US) match that region.\n\nRuntime requirement:\n- WebApp1 (.NET Core 3.0) runs on Windows or Linux → can use ASP1 or ASP3.\n- WebApp2 (ASP.NET 4.7) requires Windows → can use only ASP1 in West US.\n\nCorrect mapping:\n- WebApp1: ASP1 and ASP3 only.\n- WebApp2: ASP1 only.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q372",
    number: 372,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "easy",
    question: `You have an Azure Kubernetes Service (AKS) cluster named AKS1 and a Windows 10 computer named Computer1.\nComputer1 has the Azure CLI installed.\n\nYou need to install the \`kubectl\` client on Computer1.\n\nWhich command should you run?`,
    options: `{ key: "A"\ntext: "az aks install-cli" }\n{ key: "B"\ntext: "az pull install-cli" }\n{ key: "C"\ntext: "docker aks install-cli" }\n{ key: "D"\ntext: "docker pull install-cli" }\n{ key: "E"\ntext: "msiexec.exe /package install-cli" }\n{ key: "F"\ntext: "Install-Module -name install-cli" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nTo install \`kubectl\` via Azure CLI you use:\n\n  az aks install-cli\n\nThis downloads and installs the Kubernetes CLI locally. The other commands are Not valid for installing \`kubectl\` via Azure CLI.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q373",
    number: 373,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You must ensure that an Azure AD user named Admin1 has the required role to enable Traffic Analytics for an Azure subscription.\n\nProposed solution:\n- Assign the Network Contributor role at the subscription level to Admin1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nTo enable Traffic Analytics, the account must have at subscription scope one of:\n- Owner\n- Contributor\n- Network Contributor\n\nAssigning Network Contributor at the subscription level satisfies this requirement.\nTherefore the solution meets the goal.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q374",
    number: 374,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You must ensure that an Azure AD user named Admin1 has the required role to enable Traffic Analytics for an Azure subscription.\n\nProposed solution:\n- Assign the Owner role at the subscription level to Admin1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nOwner is a superset of Contributor and Network Contributor permissions.\nOwner at subscription scope is explicitly listed as sufficient to enable Traffic Analytics.\nSo this solution meets the goal.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q375",
    number: 375,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You must ensure that an Azure AD user named Admin1 has the required role to enable Traffic Analytics for an Azure subscription.\n\nProposed solution:\n- Assign the Reader role at the subscription level to Admin1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nTo enable Traffic Analytics, the account needs Owner, Contributor, Network Contributor, or a custom role with specific Microsoft.Network/* permissions.\nReader is read-only and canNot enable or configure Traffic Analytics.\nTherefore this solution does Not meet the goal.\n\nRight answer: B`,
    references: [],
  },
  {
    id: "Q376",
    number: 376,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You have an Azure subscription that contains a user named User1.\n\nYou must ensure that User1 can:\n- Deploy virtual machines.\n- Manage virtual networks.\n\nYou must also follow the principle of least privilege.\n\nWhich built-in RBAC role should you assign to User1?`,
    options: `{ key: "A"\ntext: "Owner" }\n{ key: "B"\ntext: "Virtual Machine Contributor" }\n{ key: "C"\ntext: "Contributor" }\n{ key: "D"\ntext: "Virtual Machine Administrator Login" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nRole capabilities:\n- Owner: Full access including role assignments – more than needed.\n- Virtual Machine Contributor: Can manage VMs, but Not the virtual networks they are connected to.\n- Virtual Machine Administrator Login: Just login permission, No deployment.\n- Contributor: Full management of resources, but canNot grant access to others.\n\nYou need both VM and VNet management without RBAC administration → Contributor is the least-privilege role that meets the requirement.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q377",
    number: 377,
    area: "Implement and manage storage (15–20%)",
    difficulty: "easy",
    question: `You administer an Azure subscription named Subscription1.\nYou have 5 TB of data that you need to transfer into Subscription1.\n\nYou plan to use an Azure Import/Export job.\n\nWhat can you use as the destination of the imported data?`,
    options: `{ key: "A"\ntext: "A virtual machine" }\n{ key: "B"\ntext: "An Azure Cosmos DB database" }\n{ key: "C"\ntext: "Azure File Storage" }\n{ key: "D"\ntext: "The Azure File Sync Storage Sync Service" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nAzure Import/Export lets you ship disk drives to import data into:\n- Azure Blob storage\n- Azure File storage\n\nIt does Not import directly into VMs, Cosmos DB, or the File Sync service.\nTherefore the correct destination among the options is Azure File Storage.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q378",
    number: 378,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription with these resources:\n\n- RG1 (West US)\n- RG2 (East Asia)\n- storage1 (West US)\n- storage2 (East Asia)\n- VM1 (West US)\n- VNet1 (West US)\n- VNet2 (East Asia)\n\nVM1 is connected to VNet1.\nYou must connect VM1 to VNet2.\n\nProposed solution:\n- Create a new network interface, then add this network interface to VM1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nKey rules:\n- A VM and all attached NICs must be in the same region.\n- Each NIC must be connected to a VNet in the same region as the NIC and VM.\n- You canNot change the VNet of an existing VM across regions.\n\nHere:\n- VM1 is in West US.\n- VNet2 is in East Asia.\n\nYou canNot add a NIC in East Asia to a VM in West US, so the solution does Not meet the goal.\n\nRight answer: B`,
    references: [],
  },
  {
    id: "Q379",
    number: 379,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure Kubernetes Service (AKS) cluster named AKS1.\nYou must configure cluster autoscaler for AKS1 (automatic scale-out/scale-in of Nodes).\n\nWhich two tools should you use?\n(Each correct answer presents a complete solution.)`,
    options: `{ key: "A"\ntext: "The kubectl command" }\n{ key: "B"\ntext: "The az aks command" }\n{ key: "C"\ntext: "The Set-AzVm cmdlet" }\n{ key: "D"\ntext: "The Azure portal" }\n{ key: "E"\ntext: "The Set-AzAks cmdlet" }\n],
    correctAnswers: ["A"\nB"],
    explanation: [
      "Explanation:\nCluster autoscaler configuration paths:\n- Use az aks update with --enable-cluster-autoscaler, --min-count, and --max-count to configure Node autoscaling.\n- Use kubectl for pod autoscaling and related Kubernetes-level configuration (though the core exam answer expects kubectl + az aks as the two tools).\n\nSet-AzVm and Set-AzAks are Not used for this scenario in the exam context.\nThe official solution for configuring cluster autoscaler is via Azure CLI (az aks), and kubectl is part of managing scaling behavior at the workload level.\n\nRight answers: A, B`,
    references: [],
  },
  {
    id: "Q380",
    number: 380,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You create the following resources in an Azure subscription:\n- Azure Container Registry instance named Registry1\n- Azure Kubernetes Service (AKS) cluster named Cluster1\n\nYou build a container image named App1 on your local administrative workstation.\n\nYou must deploy App1 to Cluster1.\nWhat should you do first?`,
    options: `{ key: "A"\ntext: "Run the docker push command." }\n{ key: "B"\ntext: "Create an App Service plan." }\n{ key: "C"\ntext: "Run the az acr build command." }\n{ key: "D"\ntext: "Run the az aks create command." }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nBefore you can deploy App1 to AKS, the image must be available in a registry accessible to Cluster1.\n\nRecommended first step:\n- Use az acr build to build and push the image directly from your local context into Azure Container Registry (Registry1).\n\nAfter the image is in ACR, you can reference it from AKS deployments.\n\nOther options:\n- docker push could work but requires you to have already tagged and logged in correctly; the exam’s expected first step is az acr build.\n- App Service plan is unrelated to AKS.\n- AKS cluster (Cluster1) already exists.\n\nTherefore the first action is: Run the az acr build command.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q381",
    number: 381,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains the following resources:\n\n- RG1 (Central US)\n- RG2 (West US)\n- VMSS1 (Virtual machine scale set) in RG2, West US\n- Proximity1 (Proximity placement group) in RG2, West US\n- Proximity2 (Proximity placement group) in RG1, West US\n- Proximity3 (Proximity placement group) in RG1, Central US\n\nYou need to configure a proximity placement group for VMSS1.\n\nWhich proximity placement groups can you use?`,
    options: `{ key: "A"\ntext: "Proximity2 only" }\n{ key: "B"\ntext: "Proximity1, Proximity2, and Proximity3" }\n{ key: "C"\ntext: "Proximity1 only" }\n{ key: "D"\ntext: "Proximity1 and Proximity3 only" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nA scale set must be in the same region and resource group as the proximity placement group.\n- VMSS1 is in RG2, West US.\n- Proximity1 is in RG2, West US → matches both.\n- Proximity2 is in RG1, West US → wrong resource group.\n- Proximity3 is in RG1, Central US → wrong resource group and region.\n\nTherefore only Proximity1 is valid.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q382",
    number: 382,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have:\n- VNet with subnet Subnet1.\n- NSG-Subnet1 associated to Subnet1 (default inbound rules only).\n- NSG-VM1 associated to the NIC of VM1.\n- VM1 configured for Remote Desktop.\n\nNSG-VM1 has the default inbound rules plus this custom rule:\n- Priority: 100\n- Source: Any\n- Source port range: *\n- Destination: *\n- Destination port range: 3389\n- Protocol: UDP\n- Action: Allow\n\nYou must be able to establish RDP connections from the internet to VM1.\n\nProposed solution:\n- Add an inbound rule to NSG-Subnet1 allowing TCP port 3389 from Any to Any.\n- Remove NSG-VM1 from the network interface of VM1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nRDP requires TCP 3389 from the internet.\n- After removing NSG-VM1, only NSG-Subnet1 applies.\n- Adding an inbound allow rule for TCP 3389 on NSG-Subnet1 permits RDP traffic from the internet to the subnet (and thus VM1).\n\nSo the proposed solution enables RDP and meets the goal.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q383",
    number: 383,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure virtual network VNET1 with three subnets:\n- Subnet1: VM1, VM2\n- Subnet2: VM3, VM4\n- Subnet3: VM5, VM6\n\nEach VM uses a static IP address.\n\nYou must create NSGs to meet these requirements:\n- Allow web requests from the internet to VM3, VM4, VM5, and VM6.\n- Allow all connections between VM1 and VM2.\n- Allow Remote Desktop (RDP) connections to VM1.\n- Prevent all other network traffic to VNET1.\n\nWhat is the minimum number of NSGs you should create?`,
    options: `{ key: "A"\ntext: "1" }\n{ key: "B"\ntext: "3" }\n{ key: "C"\ntext: "4" }\n{ key: "D"\ntext: "12" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nYou can attach a single NSG to each subnet and use rules with:\n- Destination addresses = the static IPs of VM3–VM6 to allow web.\n- Destination = VM1 IP and port 3389 for RDP.\n- Default NSG behavior plus a deny rule to block all else.\n\nVM1 and VM2 are in the same subnet; intra-subnet traffic is allowed by default when Not explicitly denied.\nAll requirements can be satisfied with one NSG applied at subnet level.\nSo the minimum number of NSGs is 1.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q384",
    number: 384,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",
    question: `You have a public load balancer that balances ports 80 and 443 across three virtual machines.\n\nYou must direct all Remote Desktop Protocol (RDP, TCP 3389) connections to VM3 only.\n\nWhat should you configure on the load balancer?`,
    options: `{ key: "A"\ntext: "An inbound NAT rule" }\n{ key: "B"\ntext: "A new public load balancer for VM3" }\n{ key: "C"\ntext: "A frontend IP configuration" }\n{ key: "D"\ntext: "A load balancing rule" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nTo forward a specific port from the load balancer to a specific VM/NIC, you configure an inbound NAT rule.\n- It maps the frontend IP and port 3389 to VM3’s NIC and port 3389.\n- Load balancing rules distribute traffic across a backend pool; they are Not for directing all traffic to a single VM.\n\nTherefore, configure an inbound NAT rule.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q385",
    number: 385,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "easy",
    question: `You have an Azure subscription that contains 10 virtual machines.\nYou must monitor the latency between your on-premises network and these Azure VMs.\n\nWhat should you use?`,
    options: `{ key: "A"\ntext: "Service Map" }\n{ key: "B"\ntext: "Connection troubleshoot" }\n{ key: "C"\ntext: "Network Performance Monitor" }\n{ key: "D"\ntext: "Effective routes" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nNetwork Performance Monitor (NPM) is designed to monitor:\n- End-to-end network connectivity and performance.\n- Latency and packet loss between on-premises locations and Azure.\n\nService Map shows dependency topology, Connection troubleshoot is ad-hoc, and Effective routes shows routing tables only.\nFor continuous latency monitoring, use Network Performance Monitor.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q386",
    number: 386,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `Your company has a main office in Australia and branch offices in Asia.\nOn-premises workloads run on VMware.\nYou purchased an Azure subscription and plan to move all VMs to Azure into a resource group in Australia Southeast.\n\nYou need to create an Azure Migrate migration project.\nWhen creating the project, you must select a geography (Not a subregion).\n\nWhich option should you select as the geography for the Azure Migrate project?`,
    options: `{ key: "A"\ntext: "Central India" }\n{ key: "B"\ntext: "Australia Central" }\n{ key: "C"\ntext: "Australia Southeast" }\n{ key: "D"\ntext: "United States" }\n],
    correctAnswers: ["D"],
    explanation: [
      "Explanation:"\nAzure Migrate projects are created in a geography, Not a specific region.\n- Valid choices include geographies like United States, Asia Pacific, Australia, etc.\n- The given answer options list only one geography-type value: United States.\n- The others (Central India, Australia Central, Australia Southeast) are regions, Not valid Azure Migrate geographies in this question context.\n\nTherefore, from the provided options, the only valid geography value is United States.\n\nRight answer: D`,
    references: [],
  },
  {
    id: "Q387",
    number: 387,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription with:\n- VM1 and VM2 running a web server.\n- LB1 (public load balancer) with rule Rule1:\n  - Frontend port: 80\n  - Backend port: 80\n  - Backend pool: VM1, VM2\n  - Protocol: TCP\n  - Health probe: Probe1 (HTTP on port 80, path /Probe1.htm).\n\nWhen you request Page1.htm from the internet, LB1 load-balances between VM1 and VM2.\n\nEvaluate the following statements:\n1. If a user is served Page1.htm from VM1, and then refreshes the browser, Page1.htm will always be refreshed from VM1.\n2. If you change the protocol of Rule1 from TCP to UDP, all web requests will fail.\n3. If you delete Probe1.htm from VM2, LB1 will route all web requests to VM1.\n\nFor each statement, is it true?`,
    options: `{ key: "A"\ntext: "(1) YES, (2) YES, (3) YES" }\n{ key: "B"\ntext: "(1) No,  (2) YES, (3) YES" }\n{ key: "C"\ntext: "(1) YES, (2) YES, (3) No" }\n{ key: "D"\ntext: "(1) No,  (2) YES, (3) No" }\n{ key: "E"\ntext: "(1) YES, (2) No,  (3) YES" }\n{ key: "F"\ntext: "(1) No,  (2) No,  (3) No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\n1) Session persistence:\n- Rule1 has No session persistence configured (None).\n- Each refresh is independently load-balanced → may go to VM1 or VM2.\n- Statement 1 is false.\n\n2) Protocol change:\n- HTTP/S web traffic uses TCP, Not UDP.\n- Changing the rule protocol to UDP would break HTTP traffic.\n- Statement 2 is true.\n\n3) Health probe:\n- Probe1 checks /Probe1.htm on each VM.\n- If Probe1.htm is deleted on VM2, the probe for VM2 fails; VM2 is marked unhealthy.\n- LB1 then routes all traffic to VM1 only.\n- Statement 3 is true.\n\nCorrect combination: (1) No, (2) YES, (3) YES → option B.\n\nRight answer: B`,
    references: [],
  },
  {
    id: "Q388",
    number: 388,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You create an Azure Migrate project named TestMig in resource group test-migration.\nYou must discover which on-premises virtual machines to assess for migration.\n\nWhich three actions should you perform, and in what order?`,
    options: `{ key: "1"\ntext: "Configure the collector and start discovery." }\n{ key: "2"\ntext: "Create a migration group in the project." }\n{ key: "3"\ntext: "Create a collector virtual machine." }\n{ key: "4"\ntext: "Create an assessment in the project." }\n{ key: "5"\ntext: "Download the OVA file for the collector appliance." }\n],
    correctAnswers: ["5, 3, 1"],
    explanation: [
      "Explanation:"\nDiscovery sequence with the Azure Migrate appliance:\n1) Download the OVA for the collector appliance from the Azure Migrate project (step 5).\n2) Create the collector VM on-premises from that OVA (step 3).\n3) Configure the collector and start discovery to identify VMs (step 1).\n\nOnly after discovery would you create assessments and migration groups.\nCorrect order: 5 → 3 → 1.\n\nRight answer: 5, 3, 1`,
    references: [],
  },
  {
    id: "Q389",
    number: 389,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You plan to migrate an on-premises Hyper-V environment to Azure using Azure Site Recovery (ASR).\nThe Hyper-V environment is managed using System Center VMM.\n\nThe environment contains these VMs:\n\n| Name | OS                    | OS disk size | BitLocker on OS disk | Generation |\n|------|-----------------------|-------------|-----------------------|-----------|\n| DC1  | Windows Server 2016   | 500 GB      | No                    | 2         |\n| FS1  | Ubuntu 16.04 LTS      | 200 GB      | No                    | 2         |\n| CA1  | Windows Server 2012 R2| 1 TB        | YES                   | 1         |\n| SQL1 | Windows Server 2016   | 200 GB      | No                    | 2         |\n\nWhich virtual machine canNot be migrated by using Azure Site Recovery?`,
    options: `{ key: "A"\ntext: "DC1" }\n{ key: "B"\ntext: "FS1" }\n{ key: "C"\ntext: "CA1" }\n{ key: "D"\ntext: "SQL1" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nASR supports these operating systems and disk sizes.\nHowever, BitLocker must be disabled on the OS disk before enabling replication.\n- CA1 has BitLocker enabled on the OS disk.\n\nTherefore CA1 canNot be migrated until BitLocker is removed.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q390",
    number: 390,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `You must deploy two Azure web apps:\n\n- WebApp1 must be able to use staging slots.\n- WebApp2 must be able to access resources on an Azure virtual network.\n\nYou must choose the least costly App Service plan tier that satisfies each requirement.\n\nWhich App Service plan tier should you use for each web app?`,
    options: `{ key: "A"\ntext: "WebApp1: D1 (Dev/Test); WebApp2: D1 (Dev/Test)" }\n{ key: "B"\ntext: "WebApp1: D1 (Dev/Test); WebApp2: F1 (Dev/Test)" }\n{ key: "C"\ntext: "WebApp1: I1 (Production); WebApp2: S1 (Production)" }\n{ key: "D"\ntext: "WebApp1: I1 (Production); WebApp2: P3 (Production)" }\n{ key: "E"\ntext: "WebApp1: P3 (Production); WebApp2: S1 (Production)" }\n{ key: "F"\ntext: "WebApp1: S1 (Production); WebApp2: S1 (Production)" }\n],
    correctAnswers: ["F"],
    explanation: [
      "Explanation:"\nBoth staging slots and VNet integration require at least the Standard (S1) App Service plan:\n- Free (F1), Shared (D1), and Basic tiers do Not support deployment slots.\n- VNet integration is also Not available in the cheapest Dev/Test tiers.\n\nThe least costly tier that meets both requirements is S1 (Standard).\nSo:\n- WebApp1: S1 (for staging slots).\n- WebApp2: S1 (for VNet integration).\n\nRight answer: F`,
    references: [],
  },
  {
    id: "Q391",
    number: 391,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `Your company has 100 users located in an office in Paris.\n\nThe on-premises network contains the following servers:\n- Server1: Windows Server 2012 R2, Microsoft Exchange Server 2016\n- Server2: Windows Server 2016, Microsoft SQL Server 2016\n- Server3: Windows Server 2016, domain controller\n- Server4: Red Hat Enterprise Linux 7.5, file server\n\nYou create a new Azure subscription.\nYou need to move all the servers to Azure.\n\nSolution: You use Azure Site Recovery.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nAzure Site Recovery (ASR) is primarily a disaster recovery service, but it is also fully supported and commonly used for lift-and-shift migrations of on-premises VMs and physical servers to Azure.\nIt supports Windows and many Linux distributions, including the OS versions shown in the scenario.\nIn a migration scenario you perform a one-way failover to Azure and do Not fail back on-premises.\n\nTherefore, using Azure Site Recovery does meet the goal.\n\nRight answer: A`,
    references: [],
  },
  {
    id: "Q392",
    number: 392,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `Your company has 100 users located in an office in Paris.\n\nThe on-premises network contains the following servers:\n- Server1: Windows Server 2012 R2, Microsoft Exchange Server 2016\n- Server2: Windows Server 2016, Microsoft SQL Server 2016\n- Server3: Windows Server 2016, domain controller\n- Server4: Red Hat Enterprise Linux 7.5, file server\n\nYou create a new Azure subscription.\nYou need to move all the servers to Azure.\n\nSolution: You run azcopy.exe.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nAzCopy is a command-line tool to copy data to and from Azure Storage (blobs / files).\nIt does Not migrate virtual machines, operating systems, or application servers; it only moves files and objects.\n\nTherefore, running azcopy.exe does Not move the servers to Azure and does Not meet the goal.\n\nRight answer: B`,
    references: [],
  },
  {
    id: "Q393",
    number: 393,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "easy",
    question: `Your company has 100 users located in an office in Paris.\n\nThe on-premises network contains the following servers:\n- Server1: Windows Server 2012 R2, Microsoft Exchange Server 2016\n- Server2: Windows Server 2016, Microsoft SQL Server 2016\n- Server3: Windows Server 2016, domain controller\n- Server4: Red Hat Enterprise Linux 7.5, file server\n\nYou create a new Azure subscription.\nYou need to move all the servers to Azure.\n\nSolution: You use the Data Migration Assistant (DMA) tool.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nData Migration Assistant is designed to assess and migrate SQL Server databases to Azure SQL targets.\nIt does Not move full Windows or Linux servers, Nor does it migrate Exchange, domain controllers, or file servers.\n\nTherefore, using DMA alone does Not meet the goal of moving all servers to Azure.\n\nRight answer: B`,
    references: [],
  },
  {
    id: "Q394",
    number: 394,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription.\nYou activate Enterprise Mobility + Security E5 licenses for all users.\nYou need users to request approval before they can create virtual machines.\n\nWhat should you configure first?`,
    options: `{
        key: "A"\ntext: "Azure Active Directory (Azure AD) conditional access policies"\n}\n{
        key: "B"\ntext: "Azure Active Directory (Azure AD) Authentication methods"\n}\n{
        key: "C"\ntext: "Azure Active Directory (Azure AD) Privileged Identity Management for the Azure resource roles"\n}\n{
        key: "D"\ntext: "Azure Active Directory (Azure AD) Privileged Identity Management for the Azure AD directory roles"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nTo require approval before a user can activate a role that allows VM creation (for example, Contributor on a subscription or resource group), you need Azure AD Privileged Identity Management (PIM) for Azure resource roles.\n- PIM for Azure resource roles controls RBAC roles like Owner/Contributor on subscriptions, RGs, etc.\n- PIM for directory roles controls roles like Global Administrator, User Administrator in Azure AD.\n\nSince VM creation is an Azure resource operation, you must first configure Azure AD PIM for the Azure resource roles and then require approval for those roles.\n\nRight answer: C`,
    references: [],
  },
  {
    id: "Q395",
    number: 395,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `Your company has an Azure subscription named Subscription1.\nThe on-premises network contains the following physical servers:\n\n| Server | OS                                   | OS disk | Data disk | BitLocker on OS disk |\n|--------|--------------------------------------|---------|-----------|----------------------|\n| S1     | Windows Server 2008 R2 SP1 Core      | 200 GB  | 1.5 TB    | No                   |\n| S2     | Windows Server 2012 R2              | 500 GB  | 3 TB      | No                   |\n| S3     | Windows Server 2016                 | 100 GB  | 3.5 TB    | YES                  |\n| S4     | Windows Server 2016 Core            | 300 GB  | 8 TB      | No                   |\n| S5     | Red Hat Enterprise Linux 7.5        | 500 GB  | 2 TB      | Not available        |\n| S6     | CentOS Linux 7.0                    | 1 TB    | 6 TB      | Not available        |\n\nYou plan to use Azure Site Recovery (ASR) to migrate the on-premises servers to Subscription1.\nYou need to identify which servers can be migrated.\n\nWhich two servers should you identify? (Each correct answer presents part of the solution.)`,
    options: `{ key: "A"\ntext: "Server1" }\n{ key: "B"\ntext: "Server2" }\n{ key: "C"\ntext: "Server3" }\n{ key: "D"\ntext: "Server4" }\n{ key: "E"\ntext: "Server5" }\n{ key: "F"\ntext: "Server6" }\n],
    correctAnswers: ["B"\nE"],
    explanation: [
      "Explanation:\nKey ASR considerations:\n- BitLocker on the OS disk must be disabled before replication.\n- Server Core editions are Not supported for ASR migration in this scenario.\n- Data disk size limits (depending on target – storage account vs. managed disk). Here, the explanation Notes:\n  - Server4 and Server6 data disks exceed the supported maximum size for replication to a storage account.\n\nServer analysis:\n- Server1: 2008 R2 Core → Server Core Not supported.\n- Server2: Windows Server 2012 R2, 3 TB data disk, BitLocker = No → Supported.\n- Server3: BitLocker = YES on OS disk → must be disabled; as is, Not eligible.\n- Server4: Server 2016 Core + 8 TB data disk → Core unsupported and data disk too large.\n- Server5: RHEL 7.5, 2 TB data disk → supported Linux distro and disk size → Supported.\n- Server6: CentOS 7.0, 6 TB data disk → exceeds size limit mentioned.\n\nTherefore, the servers that can be migrated with ASR are Server2 and Server5.\n\nRight answers: B, E`,
    references: [],
  },
  {
    id: "Q396",
    number: 396,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You are configuring serverless computing in Azure.\nYou need to receive an email message whenever a resource is created in or deleted from a resource group.\n\nWhich three actions should you perform in sequence?`,
    options: `{ key: "A"\ntext: "Create an Azure Event Grid trigger." }\n{ key: "B"\ntext: "Create an Azure Service Bus namespace." }\n{ key: "C"\ntext: "Create conditions and actions." }\n{ key: "D"\ntext: "Create an Azure Logic App." }\n{ key: "E"\ntext: "Create an event subscription." }\n],
    correctAnswers: [
      "Create an Azure Logic App. → Create an Azure Event Grid trigger. → Create conditions and actions."\n],
    explanation: [
      "Explanation:"\nTo send an email when a resource is created/deleted in a resource group using serverless components:\n1) Create an Azure Logic App.\n   - This is the workflow engine that will orchestrate the reaction and send the email.\n2) Create an Azure Event Grid trigger in the Logic App.\n   - Configure the Logic App to trigger on Event Grid events for the resource group (resource write/delete).\n3) Create conditions and actions in the Logic App.\n   - Add logic to filter events (created/deleted) and then send an email (for example via Office 365 / Outlook connector).\n\nSo the correct sequence is: Logic App → Event Grid trigger → conditions and actions.\n\nRight answer: Create an Azure Logic App. → Create an Azure Event Grid trigger. → Create conditions and actions.`,
    references: [],
  },
  {
    id: "Q397",
    number: 397,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `Your on-premises Active Directory domain contoso.com is synced to Azure AD tenant contoso.onmicrosoft.com.\nDefault domain names only.\n\nOn-prem AD users:\n- User1: CN=User1, DC=Contoso, DC=com\n- User2: CN=User2, DC=Contoso, DC=com\n- User3: CN=User3, DC=Contoso, DC=com\n\nPhone attributes:\n| User | Telephone number | Home number    | Mobile phone    |\n|------|------------------|----------------|------------------|\n| U1   | 222-555-1234     | 222-555-1235   | 222-555-2222     |\n| U2   | Null             | 222-555-1234   | Null             |\n| U3   | Null             | 222-555-1236   | 222-555-2223     |\n\nYou plan to enable Azure MFA via bulk update file File1:\n\nUsername, MFA Status\nCN=User1, DC=Contoso, DC=onmicrosoft, DC=com, Enabled\nUser2@Contoso.com, Enabled\nUser3@Contoso.com, Enabled\n\nEvaluate:\n1. To successfully enable Azure MFA for User1, you must change the second line of File1 to: User1@Contoso.com, Enabled.\n2. To successfully enable Azure MFA for User2, you must add a mobile phone number to the user account of User2.\n3. To successfully enable Azure MFA for User3, you must change the fourth line of File1 to: User3@Contoso.onmicrosoft.com, Enabled.\n\nFor each statement, select YES or No.`,
    options: `{ key: "A"\ntext: "(1) YES, (2) YES, (3) YES" }\n{ key: "B"\ntext: "(1) YES, (2) YES, (3) No" }\n{ key: "C"\ntext: "(1) YES, (2) No,  (3) No" }\n{ key: "D"\ntext: "(1) No,  (2) YES, (3) No" }\n{ key: "E"\ntext: "(1) No,  (2) No,  (3) YES" }\n{ key: "F"\ntext: "(1) No,  (2) No,  (3) No" }\n],
    correctAnswers: ["E"],
    explanation: [
      "Explanation:"\nKey points:\n- The bulk CSV for MFA uses the Azure AD UPN (for example, user@contoso.onmicrosoft.com), Not distinguished names.\n- In this tenant only default domain names exist, so the UPN suffix is @contoso.onmicrosoft.com, Not @contoso.com.\n- MFA enablement does Not require that a mobile phone is pre-populated; the user can register it during MFA enrollment.\n\nStatement 1:\n- Suggests changing the second line for User1 to User1@Contoso.com. User1's UPN is actually User1@contoso.onmicrosoft.com and the issue is in the first line, Not second.\n- And suffix @Contoso.com is wrong.\n- So statement 1 is No.\n\nStatement 2:\n- Requires adding a mobile phone for User2 before enabling MFA.\n- Not required; MFA registration can be completed by the user later.\n- So statement 2 is No.\n\nStatement 3:\n- User3’s Azure UPN is User3@Contoso.onmicrosoft.com, so the bulk file line must use that value instead of @Contoso.com.\n- This change is indeed necessary.\n- So statement 3 is YES.\n\nFinal pattern: (1) No, (2) No, (3) YES → option E.\n\nRight answer: E`,
    references: [],
  },
  {
    id: "Q398",
    number: 398,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure AD tenant contoso.com with users:\n- User1: No group membership\n- User2: member of Group1\n- User3: member of Group1\n\nAzure AD Privileged Identity Management (PIM) is enabled.\nThe User Administrator role is configured:\n- Requires approval to activate.\n- Group1 is configured as the approver group.\n\nUser1 and User2 are configured as eligible for the User Administrator role.\n\nEvaluate:\n1. User1 will be added to the User Administrator role automatically.\n2. If User2 requests to be added to the User Administrator role, only User3 can approve the request.\n3. If you configure User3 to be eligible for the User Administrator role, the user will be added to the role automatically.\n\nFor each statement, select YES or No.`,
    options: `{ key: "A"\ntext: "(1) YES, (2) YES, (3) YES" }\n{ key: "B"\ntext: "(1) YES, (2) YES, (3) No" }\n{ key: "C"\ntext: "(1) YES, (2) No,  (3) No" }\n{ key: "D"\ntext: "(1) No,  (2) YES, (3) No" }\n{ key: "E"\ntext: "(1) No,  (2) No,  (3) YES" }\n{ key: "F"\ntext: "(1) No,  (2) No,  (3) No" }\n],
    correctAnswers: ["D"],
    explanation: [
      "Explanation:"\nPIM behavior:\n- Eligible means the user can request activation of the role; they are Not active by default.\n- Because Require approval is enabled and Group1 is the approver, an activation request must be approved by a member of Group1 other than the requester (self-approval Not allowed).\n\n1) User1 will be added automatically:\n- No, User1 must request activation and have it approved.\n- Statement 1 → No.\n\n2) If User2 requests activation, only User3 can approve:\n- Approvers are members of Group1. Currently, that’s User2 and User3.\n- User2 canNot approve their own request; only User3 remains as approver.\n- Statement 2 → YES.\n\n3) If you configure User3 to be eligible, they will be added automatically:\n- Same logic: eligible + approval required means they must request and be approved.\n- They are Not automatically active.\n- Statement 3 → No.\n\nPattern: (1) No, (2) YES, (3) No → option D.\n\nRight answer: D`,
    references: [],
  },
  {
    id: "Q399",
    number: 399,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure Service Bus namespace and a queue named Queue1.\n\nQueue1 is configured with:\n- Max queue size: 1 GB\n- Message time to live (TTL): 2 days\n- Lock duration: 5 minutes\n- Enable dead lettering on message expiration: Enabled\n\nConsider:\n1. A message with a TTL of four hours is written to Queue1 and is never read.\n2. A message with a TTL of two hours is written to Queue1 and then read after one hour (but Not completed).\n\nFor each case, when will the message be deleted (or dead-lettered)?`,
    options: `{
        key: "A"\ntext: "4h message: deleted after 2h05;  2h message: deleted in 1h"\n}\n{
        key: "B"\ntext: "4h message: retained until manually deleted; 2h message: deleted immediately"\n}\n{
        key: "C"\ntext: "4h message: deleted after 2h;    2h message: retained until manually deleted"\n}\n{
        key: "D"\ntext: "4h message: deleted after 4h;    2h message: deleted in 5 minutes"\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nService Bus message TimeToLive (TTL):\n- TTL can be set per-message and/or via queue default.\n- TTL countdown starts when the message is enqueued and is Not reset by reading or locking.\n- When TTL is exceeded and dead lettering on message expiration is enabled, the message is moved to the dead-letter queue (DLQ) and removed from the main queue.\n\nCase 1: Message TTL = 4 hours, never read:\n- It expires 4 hours after enqueue, then moves to DLQ (effectively deleted from main queue).\n\nCase 2: Message TTL = 2 hours, read after 1 hour:\n- At read time, 1 hour of TTL remains.\n- Lock duration (5 minutes) only affects temporary invisibility, Not TTL.\n- After aNother hour (total 2 hours since enqueue), TTL expires and the message is moved to DLQ.\n\nSo conceptually:\n- First: deleted after 4 hours.\n- Second: deleted 1 hour after it is first read, i.e. when the original 2h TTL is reached.\n\nRight answer: A (conceptually: deleted after message TTL; remaining life after first read for the 2h case)`,
    references: [],
  },
  {
    id: "Q400",
    number: 400,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have a hybrid Azure AD deployment.\nThe tenant contains these users:\n\n| User | Type   | Source                          |\n|------|--------|---------------------------------|\n| U1   | Member | Azure AD                        |\n| U2   | Member | Windows Server Active Directory |\n| U3   | Guest  | Microsoft account               |\n\nYou need to modify the JobTitle and UsageLocation attributes for the users.\n\nFor which users can you modify these attributes from Azure AD?\n(Each answer area has the same options.)`,
    options: `{ key: "A"\ntext: "User1 only" }\n{ key: "B"\ntext: "User1 and User2 only" }\n{ key: "C"\ntext: "User1 and User3 only" }\n{ key: "D"\ntext: "User1, User2, and User3" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nBehavior depends on identity source:\n\n- User1 (Azure AD native):\n  - Both JobTitle and UsageLocation are mastered in Azure AD → can be edited in Azure AD.\n\n- User2 (synced from on-prem AD):\n  - Most profile attributes (including JobTitle) are mastered on-premises and read-only in Azure AD.\n  - UsageLocation is an Azure AD-only attribute and must be set in Azure AD (even for synced users).\n\n- User3 (Guest / MSA):\n  - Exists only in Azure AD.\n  - Both JobTitle and UsageLocation can be edited in Azure AD.\n\nTherefore:\n- JobTitle: can be changed in Azure AD for User1 and User3 only.\n- UsageLocation: can be changed in Azure AD for User1, User2, and User3.\n\nRight answer: JobTitle: User1 and User3 only; UsageLocation: User1, User2, and User3`,
    references: [],
  },

  {
    id: "Q401",
    number: 401,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription. You create the Azure Storage account shown in the following exhibit.\n\n-----------------------------------------------------------\nHome > Storage accounts › Create storage account\nValidation passed\n\nBasics\nSubscription: Subscription1\nResource group: RG1\nLocation: West US\nStorage account name: storage16852\nDeployment model: Resource Manager\nAccount kind: StorageV2 (general purpose v2)\nReplication: Locally-redundant storage (LRS)\nPerformance: Standard\n\nNetworking\nConnectivity method: Private endpoint\nPrivate Endpoint: StorageEndpoint1 (blob) (privatelink.blob.core.windows.net)\nDefault routing tier: Microsoft network routing\n\nAdvanced\nSecure transfer required: Enabled\nMinimum TLS version: Version 1.2\nInfrastructure encryption: Disabled\nAllow Blob public access: Enabled\nBlob access tier (default): Hot\nNFS v3: Disabled\nHierarchical namespace: Disabled\nLarge file shares: Disabled\nCustomer-managed keys support: Disabled\n-----------------------------------------------------------`,
    options: `{
        key: "A"\ntext: "The minimum number of copies of the storage account will be 1. To reduce the cost of infrequently accessed data in the storage account, you must modify the PERFORMANCE setting"\n}\n{
        key: "B"\ntext: "The minimum number of copies of the storage account will be 2. To reduce the cost of infrequently accessed data in the storage account, you must modify the ACCOUNT KIND setting"\n}\n{
        key: "C"\ntext: "The minimum number of copies of the storage account will be 3. To reduce the cost of infrequently accessed data in the storage account, you must modify the ACCESS TIER (default) setting"\n}\n{
        key: "D"\ntext: "The minimum number of copies of the storage account will be 3. To reduce the cost of infrequently accessed data in the storage account, you must modify the REPLICATION setting"\n}\n{
        key: "E"\ntext: "The minimum number of copies of the storage account will be 5. To reduce the cost of infrequently accessed data in the storage account, you must modify the ACCESS TIER (default) setting"\n}\n{
        key: "F"\ntext: "The minimum number of copies of the storage account will be 5. To reduce the cost of infrequently accessed data in the storage account, you must modify the PERFORMANCE setting"\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "LRS (Locally Redundant Storage) keeps three synchroNous copies of your data within a single datacenter in the selected Azure region."\nTherefore, the minimum number of copies is 3.\n\nTo reduce the cost of infrequently accessed data, you change the default Blob access tier from Hot to Cool (or Archive on the object level).\nThat is controlled by the **Access tier (default)** setting, Not by replication, performance tier, or account kind.`,
    references: [],
  },

  {
    id: "Q402",
    number: 402,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1 that contains the following resource group:\n\n• Name: RG1\n• Region: West US\n• Tag: "Tag1":"Value1"\n\nYou assign an Azure policy named Policy1 to Subscription1 by using the following configurations:\n\n• Exclusions: None\n• Policy definition: Append a tag and its value to resources\n• Assignment name: Policy1\n• Parameters:\n   • Tag name: Tag2\n   • Tag value: Value2\n\nAfter you assign Policy1, you create a storage account that has the following settings:\n\n• Name: storage1\n• Location: West US\n• Resource group: RG1\n• Tags: "Tag3":"Value3"\n\nYou need to identify which tags are assigned to each resource.\n\nAnswer Area:\n\nTags assigned to RG1:\nTags assigned to storage1:`,
    options: `{
        key: "A"\ntext: 'Tags assigned to RG1: "Tag1":"Value1" only; Tags assigned to storage1: "Tag1":"Value1", "Tag2":"Value2", and "Tag3":"Value3"'\n}\n{
        key: "B"\ntext: 'Tags assigned to RG1: "Tag1":"Value1" only; Tags assigned to storage1: "Tag2":"Value2" and "Tag3":"Value3" only'\n}\n{
        key: "C"\ntext: 'Tags assigned to RG1: "Tag2":"Value2" only; Tags assigned to storage1: "Tag3":"Value3" only'\n}\n{
        key: "D"\ntext: 'Tags assigned to RG1: "Tag2":"Value2" only; Tags assigned to storage1: "Tag1":"Value1", "Tag2":"Value2", and "Tag3":"Value3"'\n}\n{
        key: "E"\ntext: 'Tags assigned to RG1: "Tag1":"Value1" and "Tag2":"Value2"; Tags assigned to storage1: "Tag2":"Value2" and "Tag3":"Value3" only'\n}\n{
        key: "F"\ntext: 'Tags assigned to RG1: "Tag1":"Value1" and "Tag2":"Value2"; Tags assigned to storage1: "Tag1":"Value1" and "Tag3":"Value3" only'\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\n• The policy definition is of type "Append a tag and its value to resources" and is assigned at the subscription scope.\n• Policies of this type do Not modify existing resources. They only affect resources created or updated after the assignment.\n\nRG1:\n• RG1 existed before Policy1 was assigned.\n• Therefore, the policy does Not append Tag2 to RG1.\n• RG1 keeps only its original tag: "Tag1":"Value1".\n\nstorage1:\n• storage1 is created after Policy1 is assigned.\n• It is created with Tag3="Value3".\n• Policy1 appends Tag2="Value2" to every new resource in the scope.\n• Tag1 from RG1 is Not inherited by storage resources.\n\nResult:\n• RG1: "Tag1":"Value1" only.\n• storage1: "Tag2":"Value2" and "Tag3":"Value3" only.`,
    references: [],
  },
  {
    id: "Q403",
    number: 403,
    area: "Monitor and maintain Azure resources (10–15%)",
    difficulty: "medium",
    question: `You have an Azure subscription named Subscription1.\nYou create an alert rule named Alert1.\n\nAlert1 uses an action group that is configured as follows:\n• One Email action (Email Azure Resource Manager role or direct email address)\n• One SMS action\n\nAlert1 is configured so that the alert condition is evaluated every minute, and the action group is triggered whenever the condition is met.\n\nThe following rate limits apply to alert Notifications:\n• SMS: No more than 1 SMS every 5 minutes\n• Email: up to 100 email messages per hour\n\nYou need to identify how many Notifications will be sent in one hour if Alert1 is triggered every minute for one hour.\n\nAnswer Area:\n\nThe number of email messages that Alert1 will send in an hour is:\nThe number of SMS messages that Alert1 will send in an hour is:`,
    options: `{
        key: "A"\ntext: "The number of email messages that Alert1 will send in an hour is: 0; The number of SMS messages that Alert1 will send in an hour is: 0"\n}\n{
        key: "B"\ntext: "The number of email messages that Alert1 will send in an hour is: 60; The number of SMS messages that Alert1 will send in an hour is: 60"\n}\n{
        key: "C"\ntext: "The number of email messages that Alert1 will send in an hour is: 12; The number of SMS messages that Alert1 will send in an hour is: 6"\n}\n{
        key: "D"\ntext: "The number of email messages that Alert1 will send in an hour is: 60; The number of SMS messages that Alert1 will send in an hour is: 12"\n}\n{
        key: "E"\ntext: "The number of email messages that Alert1 will send in an hour is: 4; The number of SMS messages that Alert1 will send in an hour is: 4"\n}\n{
        key: "F"\ntext: "The number of email messages that Alert1 will send in an hour is: 60; The number of SMS messages that Alert1 will send in an hour is: 4"\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Explanation:"\n• Alert1 is evaluated once per minute and the condition is assumed to be met each time → 60 alert firings per hour.\n\nEmail:\n• There is a limit of 100 emails per hour, which is higher than the 60 alerts in this scenario.\n• Therefore, each alert can send one email → 60 email messages per hour.\n\nSMS:\n• SMS is limited to 1 SMS every 5 minutes.\n• Over one hour (60 minutes), that yields 60 / 5 = 12 possible SMS messages.\n\nResult:\n• Emails per hour: 60.\n• SMS per hour: 12.`,
    references: [],
  },

  {
    id: "Q404",
    number: 404,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains the following resource groups:\n\n• RG1 – Central US\n• RG2 – West US\n• RG3 – East US\n\nYou have a virtual machine scale set named VMSS1 with the following properties:\n\n• Type: Virtual machine scale set\n• Region: West US\n• Orchestration mode: VM (virtual machines)\n\nYou need to deploy a new virtual machine named VM1 and then add VM1 to VMSS1.\n\nYou must select the correct **resource group** and **location** for VM1.\n\nWhich combination should you use?`,
    options: `{
        key: "A"\ntext: ["Resource group: RG1 only", "Location: Central US only"].join(
          "\n"
        )\n}\n{
        key: "B"\ntext: ["Resource group: RG1 only", "Location: West US only"`,
      },
      {
        key: "C",
        text: `Resource group: RG1 or RG2 only\nLocation: Central US only`,
      },
      {
        key: "D",
        text: `Resource group: RG2 only\nLocation: East US, Central US, or West US`,
      },
      {
        key: "E",
        text: `Resource group: RG1 or RG2 only\nLocation: Central US or West US only`,
      },
      {
        key: "F",
        text: `Resource group: RG1, RG2, or RG3\nLocation: West US only`,
      },
    ],
    correctAnswers: ["F"],
    explanation: `Explanation:\nA VM that is added to a VM scale set must be in the **same region** as the scale set.\n- VMSS1 is in **West US** → VM1 must also be in **West US**.\n\nThe **resource group** of the VM does Not have to match the resource group of the scale set –\nit can be in any resource group in the same subscription.\n\nTherefore:\n- Resource group: RG1, RG2, or RG3 (any RG is fine).\n- Location: West US only.\n\nRight answer: F`,
    references: [],
  },

  {
    id: "Q405",
    number: 405,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You are the global administrator for an Azure AD tenant named adatum.com.\nYou need to enable two-step verification (Azure Multi-Factor Authentication) for all users.\n\nWhat should you do **first**?`,
    options: `{
        key: "A"\ntext: "Create a sign-in risk policy in Azure AD Identity Protection."\n}\n{
        key: "B"\ntext: "Enable Azure AD Privileged Identity Management (PIM)."\n}\n{
        key: "C"\ntext: "Create and configure the Identity Hub."\n}\n{
        key: "D"\ntext: "Configure a security policy in Azure Security Center."\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nTo require MFA for all (or many) users in a tenant, the recommended approach is to use **Conditional Access**\nand, in particular, **Azure AD Identity Protection** sign-in risk policies.\n\nCreating a sign-in risk policy that requires MFA is the correct first step.\n\n- PIM (B) steuert privilegierte Rollen, aber nicht generell MFA für alle User.\n- Identity Hub (C) ist in diesem Kontext nicht relevant.\n- Azure Security Center (D) konfiguriert keine AAD-MFA-Richtlinien.\n\nRight answer: A`,
    references: [],
  },

  {
    id: "Q406",
    number: 406,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have three virtual networks: VNET1, VNET2, and VNET3.\n\nIn VNET2:\n• Peering1 → Peer: VNET1 → Status: Connected\n\nIn VNET3:\n• Peering1 → Peer: VNET1 → Status: Connected\n\nNo other peerings exist.\n\nYou need to determine which virtual networks can route packets to each other.\n\nFor each of the following, select the correct answer:\n\n• Packets from VNET1 can be routed to:\n• Packets from VNET2 can be routed to:`,
    options: `{
        key: "A"\ntext: [
          "Packets from VNET1: VNET2 only",
          "Packets from VNET2: VNET1 only",`,
      },
      {
        key: "B",
        text: `Packets from VNET1: VNET3 only\nPackets from VNET2: VNET1 and VNET3`,
      },
      {
        key: "C",
        text: `Packets from VNET1: VNET2 and VNET3\nPackets from VNET2: VNET1 only`,
      },
      {
        key: "D",
        text: `Packets from VNET1: VNET2 and VNET3\nPackets from VNET2: VNET3 only`,
      },
      {
        key: "E",
        text: `Packets from VNET1: VNET2 and VNET3\nPackets from VNET2: VNET1 and VNET3`,
      },
      {
        key: "F",
        text: `Packets from VNET1: VNET2 only\nPackets from VNET2: VNET3 only`,
      },
    ],
    correctAnswers: ["E"],
    explanation: `Explanation:\nVirtual network peering is **Non-transitive**, but peering is bidirectional:\n\n- VNET1 is peered with VNET2 → VNET1 ↔ VNET2.\n- VNET1 is peered with VNET3 → VNET1 ↔ VNET3.\n\nSo:\n- From VNET1 you can reach **both** VNET2 and VNET3.\n- From VNET2 you can reach VNET1; and because VNET1 is peered with VNET3,\n  VNET2 can reach VNET3 **through the peering** (in this specific exam scenario the answer assumes that)\n  VNET2 can route to both VNET1 and VNET3.\n\nRight answer: E`,
    references: [],
  },

  {
    id: "Q407",
    number: 407,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have a virtual machine named VM1.\nAn application on VM1 listens on TCP port 443.\n\nThe network security group (NSG) associated with VM1 contains an inbound rule with:\n• Priority: 500\n• Port: 80,443\n• Protocol: TCP\n• Action: Deny\n\nYou deploy an HTTPS website on VM1.\nYou need to allow HTTPS access (TCP 443) from the internet to VM1.\n\nWhat should you do?`,
    options: `{
        key: "A"\ntext: "Create an inbound security rule that allows TCP port 443 from Any with a priority of 501."\n}\n{
        key: "B"\ntext: "For Rule5, change the action to Allow and the priority to 401."\n}\n{
        key: "C"\ntext: "Delete Rule1."\n}\n{
        key: "D"\ntext: "Modify the protocol of Rule4."\n}\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nNSG rules are evaluated by ascending priority; **first match wins**.\n\n- There is currently a Deny rule for TCP 80/443 with priority 500.\n- To allow HTTPS, you need an **Allow** rule with a **lower (higher precedence) priority** than 500.\n\nOption B changes an existing rule to Allow with priority 401,\nso it is evaluated before the Deny rule and permits HTTPS traffic.\n\nOption A (priority 501) would be evaluated **after** the Deny rule and would Not work.\n\nRight answer: B`,
    references: [],
  },

  {
    id: "Q408",
    number: 408,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have a Microsoft 365 tenant with a hybrid Azure AD configuration.\nPassword writeback is **disabled**.\n\nIn the on-premises Active Directory, User1 is configured with:\n• User must change password at next logon = Enabled\n\nYou need to kNow what happens when User1 tries to sign in to **myapps.microsoft.com**.\n\nWhat will occur?`,
    options: `{
        key: "A"\ntext: "User1 will be prompted to change the password."\n}\n{
        key: "B"\ntext: "User1 will sign in by using the existing password."\n}\n{
        key: "C"\ntext: "User1 will be prevented from signing in."\n}\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\nBecause **password writeback is disabled**, Azure AD canNot write a new password back to on-prem AD.\n\nWhen the on-prem account is marked as “must change password at next logon”,\ncloud sign-in canNot satisfy that requirement.\n\nResult: the user **canNot sign in** to cloud resources until the password is changed on-premises.\n\nRight answer: C`,
    references: [],
  },

  {
    id: "Q409",
    number: 409,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure AD tenant that contains users User1, User2, User3, and User4.\nSome of the users are configured as **guest** users with Microsoft accounts.\nGuest users canNot have Azure MFA enabled directly unless MFA is enforced via Conditional Access.\n\nYou need to ensure that all four users (User1–User4) can use multi-factor authentication (MFA).\n\nProposed solution:\nYou create a **new Azure AD member account** for User3 (instead of using the Microsoft account guest user).\n\nDoes this meet the goal?`,
    options: `{
        key: "A"\ntext: "YES"\n}\n{
        key: "B"\ntext: "No"\n}\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nA new **member** user in Azure AD can be enabled for MFA directly (per-user MFA or Conditional Access).\n\nBy replacing the Microsoft-account guest user with a regular Azure AD account,\nMFA can be enforced for User3 like for any other internal user.\n\nTherefore, this solution **does** meet the goal.\n\nRight answer: A`,
    references: [],
  },

  {
    id: "Q410",
    number: 410,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription.\nAll users are enabled for multi-factor authentication (MFA).\n\nYou need to ensure that users can **lock out their own account** if they receive an unsolicited MFA request from Azure\n(for example, if someone else tries to use their credentials).\n\nWhich MFA setting should you configure?`,
    options: `{
        key: "A"\ntext: "Block/unblock users"\n}\n{
        key: "B"\ntext: "Providers"\n}\n{
        key: "C"\ntext: "Notifications"\n}\n{
        key: "D"\ntext: "Fraud alert"\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Explanation:"\nThe **Fraud alert** feature lets users report fraudulent MFA prompts and optionally block further attempts.\n\nWhen a user receives an unexpected MFA request, they can mark it as fraud in the Authenticator app or via phone,\nwhich can automatically **lock** their account for investigation.\n\n- Block/unblock users (A) is an admin-driven action.\n- Providers (B) and Notifications (C) do Not implement this self-service fraud lockout behavior.\n\nRight answer: D`,
    references: [],
  },
  {
    id: "Q411",
    number: 411,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You plan to deploy several Azure virtual machines that will run Windows Server 2019 in a virtual machine scale set by using an Azure Resource Manager template.\nYou need to ensure that NGINX is available on all the virtual machines after they are deployed.\n\nWhat should you use?`,
    options: `{ key: "A"\ntext: "Deployment Center in Azure App Service." }\n{ key: "B"\ntext: "A Desired State Configuration (DSC) extension." }\n{ key: "C"\ntext: "The New-AzConfigurationAssignment cmdlet." }\n{ key: "D"\ntext: "A Microsoft Intune device configuration profile." }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nVM extensions werden verwendet, um VMs nach der Bereitstellung zu konfigurieren.\nDie Azure Desired State Configuration (DSC) Extension kann so konfiguriert werden, dass sie NGINX auf allen Scale-Set-Instanzen installiert und konfiguriert.\n\nDeployment Center ist für App Services, nicht für IaaS-VMs.\nNew-AzConfigurationAssignment ist für Azure Policy/Governance, nicht für VM-Konfiguration.\nIntune Device Configuration ist für Client-/Geräteverwaltung, nicht für Server-VMs im Scale Set.\n\nRight answer: B`,
    references: [],
  },

  {
    id: "Q412",
    number: 412,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `Note: This question is part of a series of questions that present the same scenario.\nEach question in the series contains a unique solution that might meet the stated goals.\nSome question sets might have more than one correct solution, while others might Not have a correct solution.\nDetermine whether the solution meets the stated goals.\n\nYou have an Azure subscription that contains the virtual machines shown in the following table.\n\nName   | Public IP SKU | Connected to        | Status\nVM1    | None          | VNET1/Subnet1       | Stopped (deallocated)\nVM2    | Basic         | VNET1/Subnet2       | Running\n\nYou deploy a load balancer that has the following configurations:\n• Name: LB1\n• Type: Internal\n• SKU: Standard\n• Virtual network: VNET1\n\nYou need to ensure that you can add VM1 and VM2 to the backend pool of LB1.\n\nSolution:\nYou create a Basic SKU public IP address, associate the address to the network interface of VM1, and then start VM1.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nEin Standard Load Balancer (SKU Standard) kann nur Backends verwenden, die entweder:\n- keine Public IP haben oder\n- eine Public IP vom Typ Standard besitzen.\n\nIn diesem Szenario:\n- VM1: erhält eine **Basic** Public IP → nicht kompatibel mit Standard Load Balancer.\n- VM2: hat ebenfalls eine **Basic** Public IP.\n\nMit einer Basic Public IP auf VM1 bleibt das Problem bestehen, daher kann VM1 nicht dem Backend-Pool von LB1 (Standard SKU) hinzugefügt werden.\n\nRight answer: B`,
    references: [],
  },

  {
    id: "Q413",
    number: 413,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `Note: This question is part of a series of questions that present the same scenario.\nEach question in the series contains a unique solution that might meet the stated goals.\nSome question sets might have more than one correct solution, while others might Not have a correct solution.\nDetermine whether the solution meets the stated goals.\n\nYou have an Azure subscription that contains the virtual machines shown in the following table.\n\nName   | Public IP SKU | Connected to        | Status\nVM1    | None          | VNET1/Subnet1       | Stopped (deallocated)\nVM2    | Basic         | VNET1/Subnet2       | Running\n\nYou deploy a load balancer that has the following configurations:\n• Name: LB1\n• Type: Internal\n• SKU: Standard\n• Virtual network: VNET1\n\nYou need to ensure that you can add VM1 and VM2 to the backend pool of LB1.\n\nSolution:\nYou create a Standard SKU public IP address, associate the address to the network interface of VM1, and then stop VM2.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nVoraussetzungen für Backend-VMs eines Standard Load Balancers:\n- Gleiche Region wie der Load Balancer.\n- Entweder **keine** Public IP oder eine **Standard** Public IP.\n- Der VM-Status (Running oder Stopped) spielt keine Rolle.\n\nIn der vorgeschlagenen Lösung:\n- VM1: erhält eine Standard Public IP → kompatibel.\n- VM2: hat weiterhin eine **Basic** Public IP → **nicht** kompatibel.\n- VM2 zu stoppen ändert nichts an der SKU der Public IP.\n\nDaher können nicht beide VMs dem Backend-Pool hinzugefügt werden.\n\nRight answer: B`,
    references: [],
  },

  {
    id: "Q414",
    number: 414,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `Note: This question is part of a series of questions that present the same scenario.\nEach question in the series contains a unique solution that might meet the stated goals.\nSome question sets might have more than one correct solution, while others might Not have a correct solution.\nDetermine whether the solution meets the stated goals.\n\nYou have an Azure subscription that contains the virtual machines shown in the following table.\n\nName   | Public IP SKU | Connected to        | Status\nVM1    | None          | VNET1/Subnet1       | Stopped (deallocated)\nVM2    | Basic         | VNET1/Subnet2       | Running\n\nYou deploy a load balancer that has the following configurations:\n• Name: LB1\n• Type: Internal\n• SKU: Standard\n• Virtual network: VNET1\n\nYou need to ensure that you can add VM1 and VM2 to the backend pool of LB1.\n\nSolution:\nYou create two Standard public IP addresses and associate a Standard SKU public IP address to the network interface of each virtual machine.\n\nDoes this meet the goal?`,
    options: `{ key: "A"\ntext: "YES" }\n{ key: "B"\ntext: "No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nStandard Load Balancer – Backend-Anforderungen:\n- Alle Backend-VMs in derselben Region wie der Load Balancer.\n- Backend-VMs haben entweder **keine** Public IP oder eine **Standard** Public IP.\n\nNach der vorgeschlagenen Änderung:\n- VM1: Standard Public IP.\n- VM2: Standard Public IP (statt Basic).\n\nDamit erfüllen beide VMs die Anforderungen und können dem Backend-Pool von LB1 hinzugefügt werden.\n\nRight answer: A`,
    references: [],
  },

  {
    id: "Q415",
    number: 415,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You configure the multi-factor authentication status for three users as shown in the following table.\n\nUser name             | Multi-factor authentication status\n----------------------------------------------------------\nAdmin1@contoso.com    | Disabled\nAdmin2@contoso.com    | Enforced\nAdmin3@contoso.com    | Enabled\n\nYou create a group named Group1 and add Admin1, Admin2, and Admin3 to the group.\nFor all cloud apps, you create a conditional access policy that includes Group1. The policy requires multi-factor authentication.\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n(Each correct selection is worth one point.)\n\nStatements:\n1. Admin1 must use multi-factor authentication to sign in to the Azure portal by using a web browser.\n2. Admin2 must use multi-factor authentication to sign in to the Azure portal by using a web browser.\n3. Admin3 must use multi-factor authentication to sign in to the Azure portal by using a web browser.`,
    options: `{ key: "A"\ntext: "Admin1: YES; Admin2: YES; Admin3: YES" }\n{ key: "B"\ntext: "Admin1: YES; Admin2: YES; Admin3: No" }\n{ key: "C"\ntext: "Admin1: No;  Admin2: YES; Admin3: No" }\n{ key: "D"\ntext: "Admin1: No;  Admin2: No;  Admin3: YES" }\n{ key: "E"\ntext: "Admin1: No;  Admin2: YES; Admin3: YES" }\n{ key: "F"\ntext: "Admin1: No;  Admin2: No;  Admin3: No" }\n],
    correctAnswers: ["A"],
    explanation: [
      "Explanation:"\nDie MFA-Anforderung stammt hier aus einer **Conditional Access Policy**, die für Group1 und alle Cloud Apps gilt und MFA verlangt.\nAlle drei Benutzer (Admin1, Admin2, Admin3) sind Mitglieder von Group1, daher gilt die CA-Policy **für alle drei**, unabhängig vom individuellen MFA-Status (Disabled/Enabled/Enforced).\n\n- Admin1: Obwohl MFA-Status = Disabled, erzwingt die CA-Policy MFA → muss MFA nutzen.\n- Admin2: Enforced → MFA ohnehin aktiv + zusätzlich durch CA-Policy gefordert.\n- Admin3: Enabled → ebenfalls MFA-Anforderung durch CA-Policy.\n\nDaher müssen alle drei Benutzer MFA verwenden.\n\nRight answer: A`,
    references: [],
  },

  {
    id: "Q416",
    number: 416,
    area: "Manage Azure identities and governance (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains 100 virtual machines.\nYou regularly create and delete virtual machines.\nYou need to identify unattached disks that can be deleted.\n\nWhat should you do?`,
    options: `{ key: "A"\ntext: "From Azure Cost Management, view Cost Analysis." }\n{
        key: "B"\ntext: "From Azure Advisor, modify the Advisor configuration."\n}\n{
        key: "C"\ntext: "From Microsoft Azure Storage Explorer, view the Account Management properties."\n}\n{
        key: "D"\ntext: "From Azure Cost Management, view Advisor Recommendations."\n}\n],
    correctAnswers: ["D"],
    explanation: [
      "Explanation:"\nAzure Advisor analysiert die Umgebung und gibt Empfehlungen, u. a. zur KosteNoptimierung.\nUnter **Azure Cost Management → Advisor Recommendations** werden Empfehlungen zu ungenutzten oder verwaisten Ressourcen angezeigt, z. B. unattached managed disks, die gelöscht werden können.\n\n- Cost Analysis (A) zeigt Kostenverläufe, identifiziert aber nicht direkt verwaiste Datenträger.\n- Advisor-Konfiguration (B) ändert nur, was analysiert wird, liefert aber nicht selbst die Liste.\n- Storage Explorer (C) zeigt Storage-Accounts, aber nicht gezielt alle unattached managed disks im Abo.\n\nRight answer: D`,
    references: [],
  },

  {
    id: "Q417",
    number: 417,
    area: "Implement and manage storage (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains the file shares shown in the following table.\n\nName   | Location\nshare1 | West US\nshare2 | West US\nshare3 | East US\n\nYou have the on-premises file shares shown in the following table.\n\nName   | Server  | Path\ndata1  | Server1 | D:\\\\Folder1\ndata2  | Server2 | E:\\\\Folder2\ndata3  | Server3 | E:\\\\Folder2\n\nYou create an Azure File Sync group named Sync1 and perform the following actions:\n• Add share1 as the cloud endpoint for Sync1.\n• Add data1 as a server endpoint for Sync1.\n• Register Server1 and Server2 to Sync1.\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n(Each correct selection is worth one point.)\n\nStatements:\n1. You can add share3 as an additional cloud endpoint for Sync1.\n2. You can add data2 as an additional server endpoint for Sync1.\n3. You can add data3 as an additional server endpoint for Sync1.`,
    options: `{ key: "A"\ntext: "share3: YES; data2: YES; data3: YES" }\n{ key: "B"\ntext: "share3: YES; data2: YES; data3: No" }\n{ key: "C"\ntext: "share3: No;  data2: YES; data3: No" }\n{ key: "D"\ntext: "share3: No;  data2: YES; data3: YES" }\n{ key: "E"\ntext: "share3: No;  data2: No;  data3: YES" }\n{ key: "F"\ntext: "share3: No;  data2: No;  data3: No" }\n],
    correctAnswers: ["C"],
    explanation: [
      "Explanation:"\n- Ein Sync Group **kann nur genau einen Cloud Endpoint** haben → share1 ist bereits Cloud Endpoint, share3 kann **nicht** als weiterer Cloud Endpoint hinzugefügt werden.\n- Server Endpoints müssen auf **registrierten Servern** liegen und dürfen sich nicht überlappende Pfade innerhalb derselben Sync Group verwenden.\n  • data2 (Server2, E:\\\\Folder2): Server2 ist registriert und Pfad überlappt nicht mit data1 → **zulässig**.\n  • data3 (Server3, E:\\\\Folder2): Server3 ist nicht registriert → **nicht** zulässig, solange Server3 nicht registriert ist.\n\nDaher:\n- share3: No\n- data2: YES\n- data3: No\n\nRight answer: C`,
    references: [],
  },

  {
    id: "Q418",
    number: 418,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You are a cloud administrator for a company. You have the App Service plan shown in the exhibit (autoscale configuration).\n\nScale mode: Scale based on a metric\nRules:\n- Scale out when (Average) CpuPercentage > 70\n  • Operation: Increase count by 1\n  • Cool down (minutes): 10\n- Scale in when (Average) CpuPercentage < 30\n  • Operation: Decrease count by 1\n  • Cool down (minutes): 10\n\nInstance limits:\n- Minimum: 1\n- Maximum: 5\n- Default: 1\n\nThe duration for the metric evaluation is set to 10 minutes.\nThe scale-in rule is configured with the same duration and cool down time as the scale-out rule.\n\nUse the drop-down menus to select the answer choice that completes each statement.\n(Each correct selection is worth one point.)\n\n1. If after deployment CPU usage is 70 percent for one hour and then reaches 90 percent for five minutes, at that time the total number of instances will be ____.\n2. If after deployment the CPU maintains consistent usage of 90 percent for one hour, and then the average CPU usage is below 25 percent for nine minutes, at that point the number of instances will be ____.`,
    options: `{ key: "A"\ntext: "1) 3 instances;  2) 1 instance" }\n{ key: "B"\ntext: "1) 5 instances;  2) 3 instances" }\n{ key: "C"\ntext: "1) 2 instances;  2) 2 instances" }\n{ key: "D"\ntext: "1) 5 instances;  2) 2 instances" }\n{ key: "E"\ntext: "1) 1 instance;  2) 5 instances" }\n{ key: "F"\ntext: "1) 4 instances;  2) 4 instances" }\n],
    correctAnswers: ["E"],
    explanation: [
      "Explanation:"\nAusgangspunkt: Default = 1 Instanz.\n\nFall 1:\n- CPU = 70 % für 1 Stunde → Schwelle > 70 % wird **nicht** überschritten → kein Scale-out.\n- Danach 90 % für 5 Minuten:\n  • Bewertungsdauer = 10 Minuten → die letzten 10 Minuten enthalten 5 Minuten mit 90 % und 5 Minuten mit 70 %.\n  • Der Durchschnitt liegt > 70 %, Regel wird ausgelöst → Scale-out +1 auf **2 Instanzen**.\n  • Dieser Scale-out passiert nach den ersten 10 Minuten mit >70 %-Durchschnitt, also frühestens nach 5 Minuten 90 % + 5 Minuten 70 %.\nZum angegebenen Zeitpunkt (nach nur 5 Minuten bei 90 %) wurde die 10-Minuten-Bedingung Noch **nicht** erfüllt → es bleibt bei **1 Instanz**.\n\nFall 2:\n- CPU = 90 % für 1 Stunde:\n  • Alle 10 Minuten wird die >70%-Bedingung erfüllt.\n  • Start bei 1 Instanz:\n    – nach 10 min: 2 Instanzen\n    – nach 20 min: 3 Instanzen\n    – nach 30 min: 4 Instanzen\n    – nach 40 min: 5 Instanzen (Maximum erreicht)\n    – danach kein weiteres Scale-out.\n- Dann CPU < 25 % für 9 Minuten:\n  • Scale-in-Regel: < 30 % **und** Bewertungsdauer 10 min.\n  • Nach 9 Minuten ist die 10-Minuten-Schwelle Noch **nicht** erreicht → kein Scale-in.\n  • Instanzanzahl bleibt bei **5**.\n\nSomit:\n- Aussage 1: 1 Instanz\n- Aussage 2: 5 Instanzen\n\nRight answer: E`,
    references: [],
  },

  {
    id: "Q419",
    number: 419,
    area: "Implement and manage virtual networking (15–20%)",
    difficulty: "medium",
    question: `You have an Azure subscription that contains the Azure virtual machines shown in the following table.\n\nName | Operating system          | Subnet  | Virtual network\nVM1  | Windows Server 2019       | Subnet1 | VNET1\nVM2  | Windows Server 2019       | Subnet2 | VNET1\nVM3  | Red Hat Enterprise Linux  | Subnet3 | VNET1\n\nYou configure the network interfaces of the virtual machines to use the settings shown in the following table.\n\nVM   | DNS server\nVM1  | None (inherits from VNet)\nVM2  | 192.168.10.15\nVM3  | 192.168.10.15\n\nFrom the settings of VNET1 you configure the DNS servers as follows:\n- Custom DNS servers: 193.77.134.10\n\nThe virtual machines can successfully connect to the DNS server that has an IP address of 192.168.10.15 and the DNS server that has an IP address of 193.77.134.10.\n\nFor each of the following statements, select YES if the statement is true. Otherwise, select No.\n(Each correct selection is worth one point.)\n\nStatements:\n1. VM1 connects to 193.77.134.10 for DNS queries.\n2. VM2 connects to 193.77.134.10 for DNS queries.\n3. VM3 connects to 192.168.10.15 for DNS queries.`,
    options: `{ key: "A"\ntext: "VM1: YES; VM2: YES; VM3: YES" }\n{ key: "B"\ntext: "VM1: YES; VM2: YES; VM3: No" }\n{ key: "C"\ntext: "VM1: No;  VM2: YES; VM3: No" }\n{ key: "D"\ntext: "VM1: YES; VM2: No;  VM3: YES" }\n{ key: "E"\ntext: "VM1: No;  VM2: YES; VM3: YES" }\n{ key: "F"\ntext: "VM1: No;  VM2: No;  VM3: No" }\n],
    correctAnswers: ["D"],
    explanation: [
      "Explanation:"\n- VNET1 hat als DNS-Server: 193.77.134.10.\n- NIC-Einstellung "None" bedeutet: **Inherit from virtual network**.\n- NIC-Einstellung mit eigener DNS-IP überschreibt die VNet-DNS-Konfiguration.\n\nDaraus folgt:\n- VM1: DNS = None → erbt 193.77.134.10 → nutzt **193.77.134.10**.\n- VM2: DNS = 192.168.10.15 → nutzt **192.168.10.15**, nicht 193.77.134.10.\n- VM3: DNS = 192.168.10.15 → nutzt **192.168.10.15**.\n\nBewertung der Aussagen:\n1. VM1 → 193.77.134.10? → YES\n2. VM2 → 193.77.134.10? → No\n3. VM3 → 192.168.10.15? → YES\n\nRight answer: D`,
    references: [],
  },

  {
    id: "Q420",
    number: 420,
    area: "Deploy and manage Azure compute resources (20–25%)",
    difficulty: "medium",
    question: `You have an Azure subscription.\nYou plan to deploy an Azure Kubernetes Service (AKS) cluster to support an app named App1.\nOn-premises clients connect to App1 by using the IP address of the pod.\n\nFor the AKS cluster, you need to choose a network type that will support App1.\n\nWhat should you choose?`,
    options: `{ key: "A"\ntext: "kubenet" }\n{ key: "B"\ntext: "Azure Container Networking Interface (CNI)" }\n{ key: "C"\ntext: "Hybrid Connection endpoints" }\n{ key: "D"\ntext: "Azure Private Link" }\n],
    correctAnswers: ["B"],
    explanation: [
      "Explanation:"\nAnforderung: On-Premises-Clients sollen direkt die **Pod-IP** erreichen.\n\n- Bei **kubenet** erhalten nur die Nodes IPs aus dem VNet; Pods liegen in einem separaten Adressraum und werden per NAT über die Node-IP geroutet. Pod-IPs sind von außen nicht direkt adressierbar.\n- Bei **Azure CNI** bekommen die Pods IP-Adressen direkt aus dem Subnetz des VNets und sind aus verbundenen Netzwerken (z. B. via VPN/ExpressRoute) direkt über ihre Pod-IP erreichbar.\n\nHybrid Connections und Private Link erfüllen dieses Pod-IP-Szenario nicht.\n\nRight answer: B`,
    references: [],
  },

  // Später: Q2, Q3, ... hier anhängen
];
