// src/lib/stepsHyperV.ts
// Interactive Hyper-V Lab Steps with multi-component support

export interface TerminalCommand {
  command: string;
  aliases?: string[];
  output: string;
  hint?: string;
  explanation?: string;
}

export interface CommandPart {
  type: "text" | "blank";
  content: string;
  answer?: string;
  hint?: string;
}

export interface CommandChallengeData {
  instruction: string;
  parts: CommandPart[];
  explanation?: string;
}

export interface GUIStepData {
  id: string;
  title: string;
  description?: string;
  panel: "sidebar" | "main" | "modal";
  icon?: string;
  options: { label: string; isCorrect: boolean; feedback?: string }[];
  successMessage?: string;
}

export interface QuickCheckData {
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  hint?: string;
}

export type HyperVStep = {
  id: string;
  title: string;
  duration?: string;
  description?: string;
  checklist: string[];
  powershell?: string;
  verify: string[];
  notes?: string[];
  // Interactive components
  terminalLab?: {
    title: string;
    description?: string;
    commands: TerminalCommand[];
  };
  commandChallenge?: {
    title: string;
    description?: string;
    challenges: CommandChallengeData[];
  };
  guiSimulator?: {
    title: string;
    description?: string;
    portal: "azure" | "intune" | "entra" | "defender" | "m365";
    steps: GUIStepData[];
  };
  quickChecks?: QuickCheckData[];
};

export const HYPERV_MANIFEST_ID = "lab-hyperv-001";

export const HYPERV_STEPS: HyperVStep[] = [
  {
    id: "t1",
    title: "Host vorbereiten",
    duration: "~10 min",
    description:
      "Überprüfe, ob dein System die Voraussetzungen für Hyper-V erfüllt.",
    checklist: [
      "Windows 11 Pro/Enterprise oder Server installiert",
      "Virtualisierung im BIOS aktiviert",
      "Mindestens 16 GB RAM verfügbar",
    ],
    verify: ["BIOS-Virtualisierung aktiv", "RAM ausreichend"],
    notes: ["Nested Virtualization in VMs erfordert spezielle Konfiguration"],

    // Interactive Terminal Lab
    terminalLab: {
      title: "System-Voraussetzungen prüfen",
      description: "Führe die Befehle aus, um dein System zu überprüfen",
      commands: [
        {
          command: "systeminfo",
          aliases: ["Systeminfo", "SYSTEMINFO"],
          output: `Hostname:                             DESKTOP-LAB01
Betriebssystemname:                   Microsoft Windows 11 Pro
Betriebssystemversion:                10.0.22631 N/A Build 22631
Systemhersteller:                     Microsoft Corporation
Systemmodell:                         Virtual Machine
Systemtyp:                            x64-based PC
Prozessor(en):                        1 Prozessor(en) installiert.
                                      [01]: Intel64 Family 6 Model 85
Gesamter physischer Speicher:         32.768 MB
Verfügbarer physischer Speicher:      24.521 MB`,
          hint: "Zeige die Systeminformationen an",
          explanation:
            "systeminfo zeigt detaillierte Informationen über Hardware und Betriebssystem.",
        },
        {
          command:
            "Get-ComputerInfo | Select-Object HyperVRequirementVMMonitorModeExtensions, HyperVRequirementVirtualizationFirmwareEnabled",
          aliases: [
            "get-computerinfo | select hypervrequirementvmmonitormodeextensions, hypervrequirementvirtualizationfirmwareenabled",
          ],
          output: `HyperVRequirementVMMonitorModeExtensions    : True
HyperVRequirementVirtualizationFirmwareEnabled : True`,
          hint: "Prüfe die Hyper-V Voraussetzungen mit Get-ComputerInfo",
          explanation:
            "Beide Werte müssen 'True' sein, damit Hyper-V funktioniert.",
        },
      ],
    },

    quickChecks: [
      {
        question: "Welche Windows-Edition unterstützt Hyper-V NICHT?",
        options: [
          { key: "A", text: "Windows 11 Pro" },
          { key: "B", text: "Windows 11 Home" },
          { key: "C", text: "Windows 11 Enterprise" },
          { key: "D", text: "Windows Server 2022" },
        ],
        correctAnswer: "B",
        explanation:
          "Windows 11 Home enthält keine Hyper-V Unterstützung. Mindestens Pro ist erforderlich.",
        hint: "Consumer-Versionen sind eingeschränkt",
      },
    ],
  },
  {
    id: "t2",
    title: "Rolle Hyper-V installieren",
    duration: "~5 min",
    description: "Installiere das Hyper-V Feature über PowerShell.",
    checklist: [
      "PowerShell als Admin öffnen",
      "Feature installieren",
      "System neu starten",
    ],
    powershell: `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`,
    verify: ["Hyper-V Manager verfügbar", "Dienste laufen"],
    notes: ["Neustart erforderlich"],

    // Command Challenge - Fill in the blanks
    commandChallenge: {
      title: "Hyper-V Installation",
      description: "Vervollständige die PowerShell-Befehle",
      challenges: [
        {
          instruction:
            "Installiere das Hyper-V Feature mit allen Sub-Features:",
          parts: [
            {
              type: "text",
              content: "Enable-WindowsOptionalFeature -Online -FeatureName ",
            },
            {
              type: "blank",
              content: "",
              answer: "Microsoft-Hyper-V",
              hint: "Das Feature beginnt mit 'Microsoft-'",
            },
            { type: "text", content: " -" },
            {
              type: "blank",
              content: "",
              answer: "All",
              hint: "Parameter für alle Sub-Features",
            },
          ],
          explanation:
            "Mit -All werden auch Hyper-V PowerShell Module und Management Tools installiert.",
        },
        {
          instruction: "Prüfe, ob Hyper-V nach dem Neustart aktiv ist:",
          parts: [
            { type: "text", content: "Get-WindowsOptionalFeature -" },
            {
              type: "blank",
              content: "",
              answer: "Online",
              hint: "Prüft das laufende System",
            },
            {
              type: "text",
              content: " -FeatureName Microsoft-Hyper-V | Select-Object ",
            },
            {
              type: "blank",
              content: "",
              answer: "State",
              hint: "Eigenschaft für den Status",
            },
          ],
          explanation:
            "State sollte 'Enabled' anzeigen wenn Hyper-V erfolgreich installiert wurde.",
        },
      ],
    },

    terminalLab: {
      title: "Hyper-V Dienste prüfen",
      description: "Überprüfe nach dem Neustart die Hyper-V Dienste",
      commands: [
        {
          command: "Get-Service vmms,vmcompute",
          aliases: ["get-service vmms,vmcompute", "Get-Service VMMS,VMCOMPUTE"],
          output: `Status   Name               DisplayName
------   ----               -----------
Running  vmcompute          Hyper-V-Hostcomputedienst
Running  vmms               Hyper-V-Verwaltungsdienst für virtuelle Computer`,
          hint: "Zeige den Status der Hyper-V Dienste vmms und vmcompute",
          explanation:
            "Beide Dienste müssen 'Running' sein damit Hyper-V funktioniert.",
        },
      ],
    },
  },
  {
    id: "t3",
    title: "Virtuelle Switches anlegen",
    duration: "~5 min",
    description: "Erstelle virtuelle Netzwerk-Switches für dein Lab.",
    checklist: [
      "Hyper-V Manager öffnen",
      "Virtual Switch Manager starten",
      "Internen Switch für Lab erstellen",
    ],
    powershell: `New-VMSwitch -Name "LabSwitch" -SwitchType Internal`,
    verify: ["Switch in VM-Konfiguration wählbar"],
    notes: ["Interner Switch für isolierte Labs empfohlen"],

    terminalLab: {
      title: "Virtuelle Switches erstellen",
      description: "Erstelle und konfiguriere virtuelle Netzwerk-Switches",
      commands: [
        {
          command: "New-VMSwitch -Name 'LabSwitch' -SwitchType Internal",
          aliases: [
            "new-vmswitch -name 'labswitch' -switchtype internal",
            'New-VMSwitch -Name "LabSwitch" -SwitchType Internal',
          ],
          output: `Name      SwitchType NetAdapterInterfaceDescription
----      ---------- ------------------------------
LabSwitch Internal`,
          hint: "Erstelle einen internen Switch mit dem Namen 'LabSwitch'",
          explanation:
            "Interne Switches erlauben Kommunikation zwischen VMs und dem Host, aber nicht ins Internet.",
        },
        {
          command: "Get-VMSwitch",
          aliases: ["get-vmswitch"],
          output: `Name         SwitchType NetAdapterInterfaceDescription
----         ---------- ------------------------------
LabSwitch    Internal
Default Switch Internal`,
          hint: "Liste alle virtuellen Switches auf",
          explanation:
            "Der 'Default Switch' wird automatisch von Hyper-V erstellt.",
        },
        {
          command:
            "Get-NetAdapter | Where-Object {$_.Name -like '*LabSwitch*'}",
          aliases: [
            "get-netadapter | where-object {$_.name -like '*labswitch*'}",
          ],
          output: `Name                      InterfaceDescription               ifIndex Status
----                      --------------------               ------- ------
vEthernet (LabSwitch)     Hyper-V Virtual Ethernet Adapter       45 Up`,
          hint: "Zeige den Netzwerkadapter für den LabSwitch",
          explanation:
            "Windows erstellt automatisch einen virtuellen Netzwerkadapter für interne Switches.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Welcher Switch-Typ ermöglicht VMs Internetzugang über den physischen Adapter?",
        options: [
          { key: "A", text: "Internal" },
          { key: "B", text: "External" },
          { key: "C", text: "Private" },
          { key: "D", text: "Default" },
        ],
        correctAnswer: "B",
        explanation:
          "External Switches binden an einen physischen Netzwerkadapter und ermöglichen Internetzugang.",
        hint: "Der Switch muss eine Verbindung zur 'Außenwelt' haben",
      },
    ],
  },
  {
    id: "t4",
    title: "IP-Konfiguration für Lab-Netzwerk",
    duration: "~5 min",
    description: "Konfiguriere eine statische IP-Adresse für das Lab-Netzwerk.",
    checklist: [
      "vEthernet Adapter identifizieren",
      "IP-Adresse zuweisen",
      "Konfiguration überprüfen",
    ],
    powershell: `New-NetIPAddress -InterfaceAlias "vEthernet (LabSwitch)" -IPAddress 192.168.100.1 -PrefixLength 24`,
    verify: ["IP-Adresse korrekt zugewiesen"],
    notes: ["Diese IP wird als Gateway für die VMs dienen"],

    commandChallenge: {
      title: "IP-Konfiguration",
      description: "Vervollständige die Netzwerk-Konfigurationsbefehle",
      challenges: [
        {
          instruction:
            "Weise dem LabSwitch Adapter die IP 192.168.100.1/24 zu:",
          parts: [
            {
              type: "text",
              content:
                'New-NetIPAddress -InterfaceAlias "vEthernet (LabSwitch)" -',
            },
            {
              type: "blank",
              content: "",
              answer: "IPAddress",
              hint: "Parameter für die IP-Adresse",
            },
            { type: "text", content: " 192.168.100.1 -" },
            {
              type: "blank",
              content: "",
              answer: "PrefixLength",
              hint: "Subnetzmaske als Zahl (CIDR)",
            },
            { type: "text", content: " 24" },
          ],
          explanation:
            "Die IP 192.168.100.1 wird das Standard-Gateway für alle VMs im Lab-Netzwerk.",
        },
      ],
    },

    terminalLab: {
      title: "Netzwerk konfigurieren",
      description: "Konfiguriere das IP-Netzwerk für dein Lab",
      commands: [
        {
          command:
            "New-NetIPAddress -InterfaceAlias 'vEthernet (LabSwitch)' -IPAddress 192.168.100.1 -PrefixLength 24",
          aliases: [
            "new-netipaddress -interfacealias 'vethernet (labswitch)' -ipaddress 192.168.100.1 -prefixlength 24",
          ],
          output: `IPAddress         : 192.168.100.1
InterfaceIndex    : 45
InterfaceAlias    : vEthernet (LabSwitch)
AddressFamily     : IPv4
Type              : Unicast
PrefixLength      : 24
PrefixOrigin      : Manual
SuffixOrigin      : Manual
AddressState      : Preferred
ValidLifetime     : Infinite ([TimeSpan]::MaxValue)
PreferredLifetime : Infinite ([TimeSpan]::MaxValue)
SkipAsSource      : False
PolicyStore       : ActiveStore`,
          hint: "Weise dem Adapter eine statische IP zu",
          explanation:
            "Diese IP-Adresse dient als Gateway für alle VMs im Lab-Netzwerk.",
        },
        {
          command:
            "Get-NetIPAddress -InterfaceAlias 'vEthernet (LabSwitch)' -AddressFamily IPv4",
          aliases: [
            "get-netipaddress -interfacealias 'vethernet (labswitch)' -addressfamily ipv4",
          ],
          output: `IPAddress         : 192.168.100.1
InterfaceIndex    : 45
InterfaceAlias    : vEthernet (LabSwitch)
AddressFamily     : IPv4
PrefixLength      : 24`,
          hint: "Überprüfe die zugewiesene IP-Adresse",
          explanation: "Die IP sollte 192.168.100.1 mit PrefixLength 24 sein.",
        },
      ],
    },
  },
  {
    id: "t5",
    title: "Erste VM erstellen",
    duration: "~10 min",
    description: "Erstelle deine erste virtuelle Maschine für das Lab.",
    checklist: [
      "VM-Namen festlegen",
      "Generation 2 auswählen",
      "RAM und vCPUs konfigurieren",
      "VHD erstellen",
    ],
    powershell: `New-VM -Name "DC01" -MemoryStartupBytes 4GB -Generation 2 -NewVHDPath "C:\\Hyper-V\\DC01\\DC01.vhdx" -NewVHDSizeBytes 60GB -SwitchName "LabSwitch"`,
    verify: ["VM im Hyper-V Manager sichtbar", "VM startet ohne Fehler"],
    notes: ["Generation 2 für UEFI und Secure Boot empfohlen"],

    terminalLab: {
      title: "Domain Controller VM erstellen",
      description:
        "Erstelle die erste VM die später als Domain Controller dient",
      commands: [
        {
          command:
            "New-VM -Name 'DC01' -MemoryStartupBytes 4GB -Generation 2 -NewVHDPath 'C:\\Hyper-V\\DC01\\DC01.vhdx' -NewVHDSizeBytes 60GB -SwitchName 'LabSwitch'",
          aliases: [
            "new-vm -name 'dc01' -memorystartupbytes 4gb -generation 2 -newvhdpath 'c:\\hyper-v\\dc01\\dc01.vhdx' -newvhdsizebytes 60gb -switchname 'labswitch'",
          ],
          output: `Name  State CPUUsage(%) MemoryAssigned(M) Uptime   Status     Version
----  ----- ----------- ----------------- ------   ------     -------
DC01  Off   0           0                 00:00:00 Operating normally 10.0`,
          hint: "Erstelle eine Gen2 VM mit 4GB RAM und 60GB VHD",
          explanation:
            "Generation 2 VMs unterstützen UEFI, Secure Boot und schnellere VHDs (VHDX).",
        },
        {
          command: "Set-VMProcessor -VMName 'DC01' -Count 2",
          aliases: ["set-vmprocessor -vmname 'dc01' -count 2"],
          output: "",
          hint: "Weise der VM 2 virtuelle CPUs zu",
          explanation:
            "Für einen Domain Controller sind 2 vCPUs eine gute Basis.",
        },
        {
          command:
            "Get-VM -Name 'DC01' | Select-Object Name,Generation,MemoryStartup,ProcessorCount",
          aliases: [
            "get-vm -name 'dc01' | select-object name,generation,memorystartup,processorcount",
          ],
          output: `Name Generation MemoryStartup ProcessorCount
---- ---------- ------------- --------------
DC01          2    4294967296              2`,
          hint: "Überprüfe die VM-Konfiguration",
          explanation:
            "Die VM hat 4GB RAM (4294967296 Bytes) und 2 Prozessoren.",
        },
      ],
    },

    quickChecks: [
      {
        question:
          "Welche VM-Generation solltest du für neue Windows Server VMs verwenden?",
        options: [
          { key: "A", text: "Generation 1 (BIOS)" },
          { key: "B", text: "Generation 2 (UEFI)" },
          { key: "C", text: "Generation 3 (vTPM)" },
          { key: "D", text: "Keine Präferenz" },
        ],
        correctAnswer: "B",
        explanation:
          "Generation 2 bietet UEFI, Secure Boot, größere VHDs und bessere Performance.",
        hint: "Die modernere Option ist meist besser",
      },
    ],
  },
];

export const HYPERV_TOTAL = HYPERV_STEPS.length;

export function loadHyperV() {
  return { percent: 0 };
}
