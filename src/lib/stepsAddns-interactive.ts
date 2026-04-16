// src/lib/stepsAddns-interactive.ts
// Interactive AD/DNS/DHCP Lab Steps

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

export interface QuickCheckData {
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  hint?: string;
}

export type AddnsStep = {
  id: string;
  title: string;
  duration?: string;
  description?: string;
  checklist: string[];
  powershell?: string;
  verify: string[];
  notes?: string[];
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
  quickChecks?: QuickCheckData[];
};

export const ADDNS_MANIFEST_ID = "lab-addns-001";

export const ADDNS_STEPS: AddnsStep[] = [
  {
    id: "ad1",
    title: "Windows Server vorbereiten",
    duration: "~10 min",
    description:
      "Server-Grundkonfiguration: Hostname, statische IP und Updates.",
    checklist: [
      "Windows Server 2022 in VM installiert",
      "Server-Manager geöffnet",
      "Hostname auf 'DC01' setzen",
      "Statische IP-Adresse konfigurieren (z.B. 192.168.1.10)",
      "Windows Updates installieren",
    ],
    powershell: `# Hostname ändern
Rename-Computer -NewName "DC01" -Restart

# IP-Konfiguration prüfen
Get-NetIPAddress -InterfaceAlias "Ethernet"

# Statische IP setzen
New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.10 -PrefixLength 24 -DefaultGateway 192.168.1.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 127.0.0.1`,
    verify: [
      "Hostname ist DC01",
      "Statische IP konfiguriert",
      "Server erreichbar",
    ],
    notes: [
      "DC muss IMMER eine statische IP haben!",
      "DNS-Server auf sich selbst (127.0.0.1) setzen nach AD-Installation",
    ],
    terminalLab: {
      title: "Server-Grundkonfiguration",
      description: "Prüfe und konfiguriere den Server",
      commands: [
        {
          command: "hostname",
          aliases: ["Hostname", "HOSTNAME"],
          output: "DC01",
          explanation: "Zeigt den aktuellen Computernamen an",
        },
        {
          command: "ipconfig",
          aliases: ["IPConfig", "IPCONFIG"],
          output: `Windows-IP-Konfiguration

Ethernet-Adapter Ethernet:

   Verbindungsspezifisches DNS-Suffix:
   IPv4-Adresse  . . . . . . . . . . : 192.168.1.10
   Subnetzmaske  . . . . . . . . . . : 255.255.255.0
   Standardgateway . . . . . . . . . : 192.168.1.1`,
          explanation: "Zeigt die IP-Konfiguration aller Adapter",
        },
        {
          command: "Get-NetIPAddress",
          aliases: ["get-netipaddress"],
          output: `IPAddress         : 192.168.1.10
InterfaceIndex    : 5
InterfaceAlias    : Ethernet
AddressFamily     : IPv4
Type              : Unicast
PrefixLength      : 24
PrefixOrigin      : Manual
SuffixOrigin      : Manual`,
          explanation: "PowerShell-Cmdlet für detaillierte IP-Informationen",
        },
      ],
    },
    commandChallenge: {
      title: "Hostname-Änderung",
      description: "Vervollständige den Befehl zum Ändern des Hostnamens",
      challenges: [
        {
          instruction: "Ändere den Computernamen zu 'DC01' und starte neu:",
          parts: [
            { type: "text", content: "Rename-Computer -" },
            {
              type: "blank",
              content: "___",
              answer: "NewName",
              hint: "Parameter für neuen Namen",
            },
            { type: "text", content: ' "DC01" -' },
            {
              type: "blank",
              content: "___",
              answer: "Restart",
              hint: "Neustart-Parameter",
            },
          ],
          explanation:
            "Rename-Computer ändert den Hostnamen. -Restart führt sofortigen Neustart durch.",
        },
      ],
    },
    quickChecks: [
      {
        question: "Warum braucht ein Domain Controller eine statische IP?",
        options: [
          { key: "A", text: "Für bessere Performance" },
          { key: "B", text: "Clients müssen den DC per DNS finden" },
          { key: "C", text: "DHCP funktioniert nicht auf Servern" },
          { key: "D", text: "Ist nur eine Best Practice, nicht zwingend" },
        ],
        correctAnswer: "B",
        explanation:
          "DNS-Einträge für den DC (SRV-Records) verweisen auf die IP. Ändert sich diese, finden Clients den DC nicht mehr.",
      },
    ],
  },
  {
    id: "ad2",
    title: "AD DS-Rolle installieren",
    duration: "~15 min",
    description:
      "Active Directory Domain Services über Server-Manager oder PowerShell installieren.",
    checklist: [
      "Server-Manager → Rollen und Features hinzufügen",
      "Rolle 'Active Directory-Domänendienste' auswählen",
      "Features/Management Tools mitinstallieren",
      "Installation abschließen (noch kein Promote!)",
    ],
    powershell: `# AD DS Rolle installieren (inkl. Management-Tools)
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Installationsstatus prüfen
Get-WindowsFeature AD-Domain-Services`,
    verify: [
      "Feature AD-Domain-Services installiert",
      "dsa.msc (Active Directory Users & Computers) verfügbar",
      "Gelbe Warnung im Server-Manager sichtbar",
    ],
    notes: [
      "Nach Installation erscheint gelbe Flagge für Promote",
      "Noch kein DC – nur Rolle installiert!",
    ],
    terminalLab: {
      title: "AD DS Installation",
      commands: [
        {
          command:
            "Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools",
          aliases: [
            "install-windowsfeature -name ad-domain-services -includemanagementtools",
          ],
          output: `Success Restart Needed Exit Code      Feature Result
------- -------------- ---------      --------------
True    No             Success        {Active Directory Domain Services, Gro...`,
          explanation:
            "Installiert AD DS und alle zugehörigen Verwaltungstools",
        },
        {
          command: "Get-WindowsFeature AD-Domain-Services",
          aliases: ["get-windowsfeature ad-domain-services"],
          output: `Display Name                                            Name                       Install State
------------                                            ----                       -------------
[X] Active Directory Domain Services                    AD-Domain-Services         Installed`,
          explanation: "[X] zeigt an, dass das Feature installiert ist",
        },
      ],
    },
    commandChallenge: {
      title: "Feature-Installation",
      challenges: [
        {
          instruction: "Installiere AD DS mit Management-Tools:",
          parts: [
            {
              type: "blank",
              content: "___",
              answer: "Install-WindowsFeature",
              hint: "Cmdlet zum Installieren von Features",
            },
            { type: "text", content: " -Name AD-Domain-Services -" },
            {
              type: "blank",
              content: "___",
              answer: "IncludeManagementTools",
              hint: "Parameter für Verwaltungstools",
            },
          ],
          explanation:
            "Install-WindowsFeature installiert Server-Rollen. -IncludeManagementTools fügt GUI-Tools hinzu.",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Was passiert NACH der AD DS-Installation, aber VOR dem Promote?",
        options: [
          { key: "A", text: "Server ist bereits Domain Controller" },
          {
            key: "B",
            text: "Nur die Rolle ist installiert, keine Domain existiert",
          },
          { key: "C", text: "AD-Replikation startet automatisch" },
          { key: "D", text: "DNS wird automatisch konfiguriert" },
        ],
        correctAnswer: "B",
        explanation:
          "Die Rolle allein macht noch keinen DC. Erst der Promote (dcpromo) erstellt die Domain.",
      },
    ],
  },
  {
    id: "ad3",
    title: "Domain Controller promoten",
    duration: "~20 min",
    description:
      "Server zum ersten Domain Controller der neuen Gesamtstruktur promoten.",
    checklist: [
      "Server-Manager → Gelbe Flagge → 'Promote to DC'",
      "Neue Gesamtstruktur erstellen",
      "Root-Domain: mainlab.local",
      "Forest/Domain Functional Level: Windows Server 2016+",
      "DNS-Server automatisch installieren",
      "DSRM-Passwort festlegen",
      "NetBIOS-Name: MAINLAB",
    ],
    powershell: `# DC Promotion mit neuer Forest
Install-ADDSForest \`
  -DomainName "mainlab.local" \`
  -DomainNetbiosName "MAINLAB" \`
  -ForestMode "WinThreshold" \`
  -DomainMode "WinThreshold" \`
  -InstallDns:$true \`
  -SafeModeAdministratorPassword (ConvertTo-SecureString "Pa$$w0rd123!" -AsPlainText -Force) \`
  -Force:$true

# Nach Neustart: Status prüfen
Get-ADDomain
Get-ADForest`,
    verify: [
      "Server startet neu",
      "Login mit MAINLAB\\Administrator",
      "dcdiag ohne kritische Fehler",
      "DNS-Zone mainlab.local existiert",
    ],
    notes: [
      "DSRM-Passwort sicher aufbewahren – Notfallzugang!",
      "Server muss neu starten nach Promote",
    ],
    terminalLab: {
      title: "Domain-Status prüfen",
      commands: [
        {
          command: "Get-ADDomain",
          aliases: ["get-addomain"],
          output: `AllowedDNSSuffixes                 : {}
ChildDomains                       : {}
ComputersContainer                 : CN=Computers,DC=mainlab,DC=local
DeletedObjectsContainer            : CN=Deleted Objects,DC=mainlab,DC=local
DistinguishedName                  : DC=mainlab,DC=local
DNSRoot                            : mainlab.local
DomainControllersContainer         : OU=Domain Controllers,DC=mainlab,DC=local
DomainMode                         : Windows2016Domain
DomainSID                          : S-1-5-21-...
Forest                             : mainlab.local
Name                               : mainlab
NetBIOSName                        : MAINLAB
PDCEmulator                        : DC01.mainlab.local`,
          explanation:
            "Zeigt alle wichtigen Informationen zur aktuellen Domain",
        },
        {
          command: "dcdiag /s:DC01",
          aliases: ["Dcdiag /s:DC01", "DCDIAG /s:DC01"],
          output: `Directory Server Diagnosis
Performing initial setup:
   Trying to find home server...
   Home Server = DC01
   * Identified AD Forest.
   Done gathering initial info.

Doing initial required tests
   Testing server: Default-First-Site-Name\\DC01
      Starting test: Connectivity
         ......................... DC01 passed test Connectivity

Doing primary tests
      Starting test: Advertising
         ......................... DC01 passed test Advertising
      Starting test: FrsEvent
         ......................... DC01 passed test FrsEvent
      Starting test: DFSREvent
         ......................... DC01 passed test DFSREvent`,
          explanation: "DC Diagnostic Tool – prüft AD-Gesundheit",
        },
      ],
    },
    commandChallenge: {
      title: "Forest-Installation",
      challenges: [
        {
          instruction: "Erstelle eine neue Forest mit Domain 'mainlab.local':",
          parts: [
            {
              type: "blank",
              content: "___",
              answer: "Install-ADDSForest",
              hint: "Cmdlet für neue Gesamtstruktur",
            },
            { type: "text", content: ' -DomainName "' },
            {
              type: "blank",
              content: "___",
              answer: "mainlab.local",
              hint: "FQDN der Root-Domain",
            },
            { type: "text", content: '" -InstallDns:$true' },
          ],
          explanation:
            "Install-ADDSForest erstellt eine komplett neue AD-Gesamtstruktur mit dem Server als erstem DC.",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Wofür wird das DSRM-Passwort (Directory Services Restore Mode) benötigt?",
        options: [
          { key: "A", text: "Zum normalen Admin-Login" },
          { key: "B", text: "Für AD-Wiederherstellung wenn AD nicht startet" },
          { key: "C", text: "Zum Zurücksetzen von Benutzerpasswörtern" },
          { key: "D", text: "Für die Replikation zwischen DCs" },
        ],
        correctAnswer: "B",
        explanation:
          "DSRM ist ein spezieller Boot-Modus zur AD-Reparatur. Das Passwort ist der einzige Zugang, wenn AD defekt ist.",
      },
    ],
  },
  {
    id: "ad4",
    title: "DNS-Zonen konfigurieren",
    duration: "~10 min",
    description:
      "Forward- und Reverse-Lookup-Zonen prüfen und Forwarder einrichten.",
    checklist: [
      "DNS-Manager öffnen (dnsmgmt.msc)",
      "Forward-Lookup-Zone mainlab.local prüfen",
      "Reverse-Lookup-Zone erstellen (192.168.1.x)",
      "Forwarder konfigurieren (8.8.8.8, 1.1.1.1)",
      "SRV-Records prüfen (_ldap._tcp, _kerberos._tcp)",
    ],
    powershell: `# DNS-Zonen anzeigen
Get-DnsServerZone

# Reverse-Zone erstellen
Add-DnsServerPrimaryZone -NetworkID "192.168.1.0/24" -ReplicationScope "Domain"

# Forwarder setzen
Set-DnsServerForwarder -IPAddress "8.8.8.8","1.1.1.1"

# SRV-Records prüfen
Get-DnsServerResourceRecord -ZoneName "_msdcs.mainlab.local" -RRType SRV`,
    verify: [
      "Forward-Zone mainlab.local aktiv",
      "Reverse-Zone 1.168.192.in-addr.arpa existiert",
      "nslookup DC01.mainlab.local funktioniert",
      "nslookup 192.168.1.10 gibt DC01 zurück",
    ],
    notes: [
      "Reverse-Zone für PTR-Records (IP → Name)",
      "Ohne Forwarder: Keine Internet-DNS-Auflösung",
    ],
    terminalLab: {
      title: "DNS-Konfiguration",
      commands: [
        {
          command: "Get-DnsServerZone",
          aliases: ["get-dnsserverzone"],
          output: `ZoneName                            ZoneType        IsAutoCreated   IsDsIntegrated  IsReverseLookupZone
--------                            --------        -------------   --------------  -------------------
_msdcs.mainlab.local                Primary         False           True            False
mainlab.local                       Primary         False           True            False
0.in-addr.arpa                      Primary         False           False           True
127.in-addr.arpa                    Primary         False           False           True
255.in-addr.arpa                    Primary         False           False           True`,
          explanation: "Listet alle DNS-Zonen auf dem Server",
        },
        {
          command: "nslookup DC01.mainlab.local",
          aliases: ["Nslookup DC01.mainlab.local"],
          output: `Server:  localhost
Address:  127.0.0.1

Name:    DC01.mainlab.local
Address:  192.168.1.10`,
          explanation: "DNS-Namensauflösung testen",
        },
        {
          command: "Get-DnsServerForwarder",
          aliases: ["get-dnsserverforwarder"],
          output: `UseRootHint        : True
Timeout(s)         : 3
EnableReordering   : True
IPAddress          : {8.8.8.8, 1.1.1.1}`,
          explanation: "Zeigt konfigurierte DNS-Forwarder",
        },
      ],
    },
    quickChecks: [
      {
        question: "Was ist der Zweck einer Reverse-Lookup-Zone?",
        options: [
          { key: "A", text: "Auflösung von Namen zu IP-Adressen" },
          { key: "B", text: "Auflösung von IP-Adressen zu Namen" },
          { key: "C", text: "Backup der Forward-Zone" },
          { key: "D", text: "Speicherung von MX-Records" },
        ],
        correctAnswer: "B",
        explanation:
          "Reverse-Lookup: IP → Name (PTR-Records). Forward-Lookup: Name → IP (A/AAAA-Records).",
      },
    ],
  },
  {
    id: "ad5",
    title: "DHCP-Rolle installieren",
    duration: "~10 min",
    description: "DHCP-Serverrolle installieren und für AD autorisieren.",
    checklist: [
      "Server-Manager → Rollen hinzufügen → DHCP-Server",
      "Installation abschließen",
      "DHCP-Server in AD autorisieren",
      "DHCP-Konsole öffnen (dhcpmgmt.msc)",
    ],
    powershell: `# DHCP-Rolle installieren
Install-WindowsFeature -Name DHCP -IncludeManagementTools

# DHCP-Server in AD autorisieren
Add-DhcpServerInDC -DnsName "DC01.mainlab.local" -IPAddress 192.168.1.10

# Autorisierung prüfen
Get-DhcpServerInDC`,
    verify: [
      "DHCP-Rolle installiert",
      "Server in AD autorisiert (grüner Pfeil)",
      "Keine roten Warnungen in Konsole",
    ],
    notes: [
      "Nicht-autorisierte DHCP-Server werden ignoriert!",
      "Nur Domain-Admins können autorisieren",
    ],
    terminalLab: {
      title: "DHCP-Installation",
      commands: [
        {
          command: "Install-WindowsFeature -Name DHCP -IncludeManagementTools",
          aliases: [
            "install-windowsfeature -name dhcp -includemanagementtools",
          ],
          output: `Success Restart Needed Exit Code      Feature Result
------- -------------- ---------      --------------
True    No             Success        {DHCP Server, DHCP Server Tools}`,
          explanation: "Installiert DHCP-Server und Verwaltungstools",
        },
        {
          command: "Get-DhcpServerInDC",
          aliases: ["get-dhcpserverindc"],
          output: `IPAddress            DnsName
---------            -------
192.168.1.10         DC01.mainlab.local`,
          explanation: "Zeigt in AD autorisierte DHCP-Server",
        },
      ],
    },
    commandChallenge: {
      title: "DHCP-Autorisierung",
      challenges: [
        {
          instruction: "Autorisiere den DHCP-Server in Active Directory:",
          parts: [
            {
              type: "blank",
              content: "___",
              answer: "Add-DhcpServerInDC",
              hint: "Cmdlet zum Hinzufügen",
            },
            { type: "text", content: ' -DnsName "DC01.mainlab.local" -' },
            {
              type: "blank",
              content: "___",
              answer: "IPAddress",
              hint: "IP-Parameter",
            },
            { type: "text", content: " 192.168.1.10" },
          ],
          explanation:
            "Add-DhcpServerInDC registriert den DHCP-Server in AD. Nicht-autorisierte Server vergeben keine Adressen.",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Warum muss ein DHCP-Server in einer AD-Umgebung autorisiert werden?",
        options: [
          { key: "A", text: "Für bessere Performance" },
          { key: "B", text: "Um Rogue-DHCP-Server zu verhindern" },
          { key: "C", text: "Ist nur in Enterprise-Editionen nötig" },
          { key: "D", text: "Für die DNS-Integration" },
        ],
        correctAnswer: "B",
        explanation:
          "AD-Autorisierung verhindert, dass unautorisierte DHCP-Server Clients falsche IPs geben (Sicherheit!).",
      },
    ],
  },
  {
    id: "ad6",
    title: "DHCP-Bereich erstellen",
    duration: "~10 min",
    description: "DHCP-Scope für das Lab-Netzwerk konfigurieren.",
    checklist: [
      "Neuen Bereich erstellen",
      "IP-Bereich: 192.168.1.100 - 192.168.1.200",
      "Subnetzmaske: 255.255.255.0",
      "Ausschlüsse: Keine (Server haben statische IPs)",
      "Lease-Dauer: 8 Tage",
      "DHCP-Optionen: Router (Gateway), DNS-Server",
    ],
    powershell: `# DHCP-Scope erstellen
Add-DhcpServerv4Scope -Name "Lab-Netzwerk" \`
  -StartRange 192.168.1.100 \`
  -EndRange 192.168.1.200 \`
  -SubnetMask 255.255.255.0 \`
  -LeaseDuration 8.00:00:00 \`
  -State Active

# Scope-Optionen setzen
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 \`
  -DnsServer 192.168.1.10 \`
  -DnsDomain "mainlab.local" \`
  -Router 192.168.1.1

# Scope prüfen
Get-DhcpServerv4Scope`,
    verify: [
      "Scope aktiv und grün",
      "IP-Pool korrekt",
      "Optionen (003, 006, 015) gesetzt",
      "Client bekommt IP per DHCP",
    ],
    notes: [
      "Option 003 = Default Gateway",
      "Option 006 = DNS Server",
      "Option 015 = Domain Name",
    ],
    terminalLab: {
      title: "DHCP-Scope verwalten",
      commands: [
        {
          command: "Get-DhcpServerv4Scope",
          aliases: ["get-dhcpserverv4scope"],
          output: `ScopeId         SubnetMask      Name           State    StartRange      EndRange        LeaseDuration
-------         ----------      ----           -----    ----------      --------        -------------
192.168.1.0     255.255.255.0   Lab-Netzwerk   Active   192.168.1.100   192.168.1.200   8.00:00:00`,
          explanation: "Zeigt alle DHCP-Scopes und deren Status",
        },
        {
          command: "Get-DhcpServerv4OptionValue -ScopeId 192.168.1.0",
          aliases: ["get-dhcpserverv4optionvalue -scopeid 192.168.1.0"],
          output: `OptionId   Name            Type       Value                  VendorClass     UserClass       PolicyName
--------   ----            ----       -----                  -----------     ---------       ----------
3          Router          IPv4Address{192.168.1.1}
6          DNS Servers     IPv4Address{192.168.1.10}
15         DNS Domain Name String     {mainlab.local}`,
          explanation: "Zeigt die konfigurierten DHCP-Optionen",
        },
        {
          command: "Get-DhcpServerv4Lease -ScopeId 192.168.1.0",
          aliases: ["get-dhcpserverv4lease -scopeid 192.168.1.0"],
          output: `IPAddress        ScopeId         ClientId             HostName       LeaseExpiryTime
---------        -------         --------             --------       ---------------
192.168.1.100    192.168.1.0     00-15-5d-01-02-03    CLIENT01       28.04.2026 14:30`,
          explanation: "Zeigt aktuelle DHCP-Leases",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Welche DHCP-Option definiert den Default Gateway für Clients?",
        options: [
          { key: "A", text: "Option 003 (Router)" },
          { key: "B", text: "Option 006 (DNS Servers)" },
          { key: "C", text: "Option 015 (DNS Domain Name)" },
          { key: "D", text: "Option 044 (WINS/NBNS Servers)" },
        ],
        correctAnswer: "A",
        explanation:
          "Option 003 = Router/Gateway. Diese IP nutzen Clients für Traffic außerhalb ihres Subnetzes.",
      },
    ],
  },
  {
    id: "ad7",
    title: "OUs und Gruppen erstellen",
    duration: "~15 min",
    description:
      "Organisationseinheiten-Struktur und Sicherheitsgruppen anlegen.",
    checklist: [
      "OU 'MainLab' als Root-OU erstellen",
      "Unter-OUs: Users, Computers, Groups, Servers",
      "Sicherheitsgruppen erstellen: IT-Admins, HR-Users, Finance-Users",
      "GPO-Vererbung für Struktur planen",
    ],
    powershell: `# Root-OU erstellen
New-ADOrganizationalUnit -Name "MainLab" -Path "DC=mainlab,DC=local" -ProtectedFromAccidentalDeletion $true

# Unter-OUs erstellen
$path = "OU=MainLab,DC=mainlab,DC=local"
New-ADOrganizationalUnit -Name "Users" -Path $path
New-ADOrganizationalUnit -Name "Computers" -Path $path
New-ADOrganizationalUnit -Name "Groups" -Path $path
New-ADOrganizationalUnit -Name "Servers" -Path $path

# Sicherheitsgruppen erstellen
New-ADGroup -Name "IT-Admins" -GroupScope Global -GroupCategory Security -Path "OU=Groups,$path"
New-ADGroup -Name "HR-Users" -GroupScope Global -GroupCategory Security -Path "OU=Groups,$path"
New-ADGroup -Name "Finance-Users" -GroupScope Global -GroupCategory Security -Path "OU=Groups,$path"

# Struktur anzeigen
Get-ADOrganizationalUnit -Filter * | Select Name, DistinguishedName`,
    verify: [
      "OU-Struktur in ADUC sichtbar",
      "Gruppen in OU=Groups vorhanden",
      "Schutz vor versehentlichem Löschen aktiv",
    ],
    notes: [
      "Trenne Benutzer/Computer nie in derselben OU",
      "GPOs auf OU-Ebene verknüpfen, nicht auf Domain",
    ],
    terminalLab: {
      title: "AD-Struktur verwalten",
      commands: [
        {
          command: "Get-ADOrganizationalUnit -Filter *",
          aliases: ["get-adorganizationalunit -filter *"],
          output: `DistinguishedName                                 Name
-----------------                                 ----
OU=Domain Controllers,DC=mainlab,DC=local         Domain Controllers
OU=MainLab,DC=mainlab,DC=local                    MainLab
OU=Users,OU=MainLab,DC=mainlab,DC=local           Users
OU=Computers,OU=MainLab,DC=mainlab,DC=local       Computers
OU=Groups,OU=MainLab,DC=mainlab,DC=local          Groups
OU=Servers,OU=MainLab,DC=mainlab,DC=local         Servers`,
          explanation: "Listet alle Organisationseinheiten in der Domain",
        },
        {
          command:
            "Get-ADGroup -Filter * -SearchBase 'OU=Groups,OU=MainLab,DC=mainlab,DC=local'",
          aliases: [
            "get-adgroup -filter * -searchbase 'ou=groups,ou=mainlab,dc=mainlab,dc=local'",
          ],
          output: `DistinguishedName : CN=IT-Admins,OU=Groups,OU=MainLab,DC=mainlab,DC=local
GroupCategory     : Security
GroupScope        : Global
Name              : IT-Admins

DistinguishedName : CN=HR-Users,OU=Groups,OU=MainLab,DC=mainlab,DC=local
GroupCategory     : Security
GroupScope        : Global
Name              : HR-Users`,
          explanation: "Zeigt alle Gruppen in der angegebenen OU",
        },
      ],
    },
    commandChallenge: {
      title: "OU erstellen",
      challenges: [
        {
          instruction: "Erstelle eine neue OU namens 'MainLab':",
          parts: [
            {
              type: "blank",
              content: "___",
              answer: "New-ADOrganizationalUnit",
              hint: "Cmdlet für neue OU",
            },
            {
              type: "text",
              content: ' -Name "MainLab" -Path "DC=mainlab,DC=local"',
            },
          ],
          explanation:
            "New-ADOrganizationalUnit erstellt OUs. -Path gibt den übergeordneten Container an.",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Warum sollte man 'ProtectedFromAccidentalDeletion' für OUs aktivieren?",
        options: [
          { key: "A", text: "Verhindert unbefugten Zugriff" },
          {
            key: "B",
            text: "Verhindert versehentliches Löschen der OU und aller Objekte darin",
          },
          { key: "C", text: "Beschleunigt die Replikation" },
          { key: "D", text: "Ist Pflicht für GPO-Verknüpfung" },
        ],
        correctAnswer: "B",
        explanation:
          "Schutz vor versehentlichem Löschen verhindert, dass OUs mit Hunderten Objekten aus Versehen gelöscht werden.",
      },
    ],
  },
  {
    id: "ad8",
    title: "Benutzer anlegen",
    duration: "~10 min",
    description: "Testbenutzer in den entsprechenden OUs erstellen.",
    checklist: [
      "Benutzer in OU=Users,OU=MainLab erstellen",
      "Mindestens 3 Testuser: user01, user02, user03",
      "Passwort-Einstellungen konfigurieren",
      "Benutzer den Gruppen zuweisen",
    ],
    powershell: `# Einzelnen Benutzer erstellen
$pw = ConvertTo-SecureString "P@ssw0rd!" -AsPlainText -Force
New-ADUser -Name "Max Mustermann" \`
  -SamAccountName "user01" \`
  -UserPrincipalName "user01@mainlab.local" \`
  -GivenName "Max" \`
  -Surname "Mustermann" \`
  -Path "OU=Users,OU=MainLab,DC=mainlab,DC=local" \`
  -AccountPassword $pw \`
  -Enabled $true \`
  -PasswordNeverExpires $true

# Mehrere Benutzer erstellen
$users = @("user01", "user02", "user03")
foreach ($u in $users) {
  New-ADUser -Name $u -SamAccountName $u -UserPrincipalName "$u@mainlab.local" \`
    -Path "OU=Users,OU=MainLab,DC=mainlab,DC=local" \`
    -AccountPassword $pw -Enabled $true
}

# Benutzer zu Gruppe hinzufügen
Add-ADGroupMember -Identity "IT-Admins" -Members "user01"`,
    verify: [
      "Benutzer in ADUC sichtbar",
      "Login mit user01 möglich",
      "Gruppenmitgliedschaft korrekt",
    ],
    notes: [
      "UPN = E-Mail-Format für Login",
      "SamAccountName = NetBIOS-Login (MAINLAB\\user01)",
    ],
    terminalLab: {
      title: "Benutzerverwaltung",
      commands: [
        {
          command:
            "Get-ADUser -Filter * -SearchBase 'OU=Users,OU=MainLab,DC=mainlab,DC=local'",
          aliases: [
            "get-aduser -filter * -searchbase 'ou=users,ou=mainlab,dc=mainlab,dc=local'",
          ],
          output: `DistinguishedName : CN=user01,OU=Users,OU=MainLab,DC=mainlab,DC=local
Enabled           : True
Name              : user01
SamAccountName    : user01
UserPrincipalName : user01@mainlab.local

DistinguishedName : CN=user02,OU=Users,OU=MainLab,DC=mainlab,DC=local
Enabled           : True
Name              : user02
SamAccountName    : user02
UserPrincipalName : user02@mainlab.local`,
          explanation: "Listet alle Benutzer in der angegebenen OU",
        },
        {
          command: "Get-ADGroupMember -Identity 'IT-Admins'",
          aliases: ["get-adgroupmember -identity 'it-admins'"],
          output: `distinguishedName : CN=user01,OU=Users,OU=MainLab,DC=mainlab,DC=local
name              : user01
objectClass       : user
objectGUID        : a1b2c3d4-...
SamAccountName    : user01`,
          explanation: "Zeigt Mitglieder einer AD-Gruppe",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Was ist der Unterschied zwischen SamAccountName und UserPrincipalName?",
        options: [
          {
            key: "A",
            text: "Kein Unterschied, nur unterschiedliche Schreibweisen",
          },
          {
            key: "B",
            text: "SAM ist NetBIOS-Format (DOMAIN\\user), UPN ist E-Mail-Format (user@domain)",
          },
          { key: "C", text: "UPN ist nur für Office 365 relevant" },
          {
            key: "D",
            text: "SAM ist veraltet und sollte nicht mehr verwendet werden",
          },
        ],
        correctAnswer: "B",
        explanation:
          "SamAccountName: MAINLAB\\user01 (Legacy). UPN: user01@mainlab.local (Modern, E-Mail-ähnlich).",
      },
    ],
  },
  {
    id: "ad9",
    title: "Client zur Domain hinzufügen",
    duration: "~10 min",
    description: "Windows 11 Client in die Domain mainlab.local aufnehmen.",
    checklist: [
      "Client-DNS auf DC zeigen (192.168.1.10)",
      "Domain-Join durchführen",
      "Computerkonto in AD prüfen",
      "Login mit Domain-User testen",
    ],
    powershell: `# Auf dem Client: DNS prüfen/setzen
Get-DnsClientServerAddress
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 192.168.1.10

# Domain-Join
Add-Computer -DomainName "mainlab.local" -Credential (Get-Credential) -Restart

# Nach Neustart: Status prüfen
systeminfo | findstr "Domain"
dsregcmd /status`,
    verify: [
      "Computerkonto in AD sichtbar",
      "Client in OU=Computers",
      "Domain-Login funktioniert",
    ],
    notes: [
      "DNS MUSS auf DC zeigen, sonst Domain-Join fehlgeschlagen",
      "Administratorrechte auf Client nötig",
    ],
    terminalLab: {
      title: "Domain-Join prüfen",
      commands: [
        {
          command: "systeminfo | findstr Domain",
          aliases: [
            "Systeminfo | Findstr Domain",
            "SYSTEMINFO | FINDSTR Domain",
          ],
          output: `Domain:                    mainlab.local`,
          explanation: "Zeigt die aktuelle Domain-Mitgliedschaft",
        },
        {
          command: "dsregcmd /status",
          aliases: ["Dsregcmd /status"],
          output: `+----------------------------------------------------------------------+
| Device State                                                         |
+----------------------------------------------------------------------+

             AzureAdJoined : NO
          EnterpriseJoined : NO
              DomainJoined : YES
                DomainName : MAINLAB

+----------------------------------------------------------------------+
| SSO State                                                            |
+----------------------------------------------------------------------+

            AzureAdPrt : NO
         RefreshToken : NO`,
          explanation: "Detaillierter Join-Status (On-Prem AD, Entra, Hybrid)",
        },
        {
          command:
            "Get-ADComputer -Filter * -SearchBase 'OU=Computers,OU=MainLab,DC=mainlab,DC=local'",
          aliases: [
            "get-adcomputer -filter * -searchbase 'ou=computers,ou=mainlab,dc=mainlab,dc=local'",
          ],
          output: `DistinguishedName : CN=CLIENT01,OU=Computers,OU=MainLab,DC=mainlab,DC=local
DNSHostName       : CLIENT01.mainlab.local
Enabled           : True
Name              : CLIENT01
SamAccountName    : CLIENT01$`,
          explanation: "Listet Computer in der angegebenen OU",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Was passiert, wenn der Client beim Domain-Join nicht den DC als DNS-Server nutzt?",
        options: [
          { key: "A", text: "Join funktioniert, aber langsamer" },
          {
            key: "B",
            text: "Join schlägt fehl - Domain kann nicht gefunden werden",
          },
          { key: "C", text: "Client erhält automatisch den richtigen DNS" },
          { key: "D", text: "Der DC ändert den DNS des Clients automatisch" },
        ],
        correctAnswer: "B",
        explanation:
          "Der Client muss SRV-Records (_ldap._tcp.mainlab.local) auflösen können. Ohne internen DNS: keine Auflösung = kein Join.",
      },
    ],
  },
  {
    id: "ad10",
    title: "Erste GPO erstellen",
    duration: "~15 min",
    description: "Gruppenrichtlinie erstellen und auf OU verknüpfen.",
    checklist: [
      "GPMC öffnen (gpmc.msc)",
      "Neue GPO erstellen: 'Wallpaper-Policy'",
      "User Configuration → Desktop → Desktop Wallpaper",
      "GPO auf OU=Users,OU=MainLab verknüpfen",
      "gpupdate /force auf Client ausführen",
    ],
    powershell: `# GPO erstellen
New-GPO -Name "Wallpaper-Policy" -Comment "Setzt Firmen-Wallpaper"

# GPO verknüpfen
New-GPLink -Name "Wallpaper-Policy" -Target "OU=Users,OU=MainLab,DC=mainlab,DC=local"

# Auf Client: GPO anwenden
gpupdate /force
gpresult /r`,
    verify: [
      "GPO in GPMC sichtbar",
      "Verknüpfung auf OU aktiv",
      "gpresult zeigt angewendete GPO",
    ],
    notes: [
      "User Config → gilt für angemeldete Benutzer",
      "Computer Config → gilt für Computer (beim Boot)",
    ],
    terminalLab: {
      title: "GPO-Verwaltung",
      commands: [
        {
          command: "Get-GPO -All",
          aliases: ["get-gpo -all"],
          output: `DisplayName      : Default Domain Policy
DomainName       : mainlab.local
Owner            : MAINLAB\\Domain Admins
GpoStatus        : AllSettingsEnabled

DisplayName      : Default Domain Controllers Policy
DomainName       : mainlab.local
Owner            : MAINLAB\\Domain Admins
GpoStatus        : AllSettingsEnabled

DisplayName      : Wallpaper-Policy
DomainName       : mainlab.local
Owner            : MAINLAB\\Domain Admins
GpoStatus        : AllSettingsEnabled`,
          explanation: "Listet alle GPOs in der Domain",
        },
        {
          command: "gpresult /r",
          aliases: ["Gpresult /r", "GPRESULT /r"],
          output: `COMPUTER SETTINGS
-----------------
    Applied Group Policy Objects
        Default Domain Policy

USER SETTINGS
-------------
    Applied Group Policy Objects
        Wallpaper-Policy
        Default Domain Policy

    The following GPOs were not applied because they were filtered out
        Local Group Policy
            Filtering:  Not Applied (Empty)`,
          explanation: "Zeigt angewendete GPOs für aktuellen User/Computer",
        },
      ],
    },
    commandChallenge: {
      title: "GPO erstellen und verknüpfen",
      challenges: [
        {
          instruction: "Verknüpfe die GPO 'Wallpaper-Policy' mit der Users-OU:",
          parts: [
            {
              type: "blank",
              content: "___",
              answer: "New-GPLink",
              hint: "Cmdlet zum Verknüpfen",
            },
            { type: "text", content: ' -Name "Wallpaper-Policy" -' },
            {
              type: "blank",
              content: "___",
              answer: "Target",
              hint: "Ziel-Parameter",
            },
            {
              type: "text",
              content: ' "OU=Users,OU=MainLab,DC=mainlab,DC=local"',
            },
          ],
          explanation:
            "New-GPLink verknüpft eine GPO mit einer OU, Domain oder Site.",
        },
      ],
    },
    quickChecks: [
      {
        question: "Welcher Befehl aktualisiert GPOs auf einem Client sofort?",
        options: [
          { key: "A", text: "gpedit /refresh" },
          { key: "B", text: "gpupdate /force" },
          { key: "C", text: "gpresult /update" },
          { key: "D", text: "dcgpofix /sync" },
        ],
        correctAnswer: "B",
        explanation:
          "gpupdate /force erzwingt sofortige GPO-Aktualisierung. Ohne /force werden nur geänderte Policies geholt.",
      },
    ],
  },
  {
    id: "ad11",
    title: "AD-Backup einrichten",
    duration: "~15 min",
    description: "Windows Server Backup für System State konfigurieren.",
    checklist: [
      "Windows Server Backup Feature installieren",
      "System State Backup konfigurieren",
      "Backup auf separates Volume oder Netzwerk",
      "Backup manuell testen",
    ],
    powershell: `# Backup Feature installieren
Install-WindowsFeature Windows-Server-Backup

# Backup Policy erstellen
$policy = New-WBPolicy
$backup = New-WBBackupTarget -VolumePath "E:"
Add-WBBackupTarget -Policy $policy -Target $backup
Add-WBSystemState -Policy $policy
Set-WBSchedule -Policy $policy -Schedule 02:00
Set-WBPolicy -Policy $policy

# Manuelles Backup starten
wbadmin start systemstatebackup -backuptarget:E: -quiet`,
    verify: [
      "Backup-Feature installiert",
      "System State Backup läuft",
      "Backup-Dateien auf Ziel vorhanden",
    ],
    notes: [
      "System State = AD-Datenbank + SYSVOL + Registry",
      "Bei 2+ DCs: Nur einer braucht Backup (Replikation)",
    ],
    terminalLab: {
      title: "Backup-Verwaltung",
      commands: [
        {
          command: "Get-WindowsFeature Windows-Server-Backup",
          aliases: ["get-windowsfeature windows-server-backup"],
          output: `Display Name                                            Name                       Install State
------------                                            ----                       -------------
[X] Windows Server Backup                               Windows-Server-Backup      Installed`,
          explanation: "Prüft, ob Windows Server Backup installiert ist",
        },
        {
          command: "wbadmin get versions",
          aliases: ["Wbadmin get versions"],
          output: `wbadmin 1.0 - Backup command-line tool

Backup time: 16.04.2026 02:00
Backup target: E:
Version identifier: 04/16/2026-00:00
Can recover: Application(s), System State`,
          explanation: "Listet verfügbare Backup-Versionen",
        },
      ],
    },
    quickChecks: [
      {
        question:
          "Was ist im 'System State' eines Domain Controllers enthalten?",
        options: [
          { key: "A", text: "Nur die AD-Datenbank (NTDS.dit)" },
          {
            key: "B",
            text: "AD-Datenbank, SYSVOL, Registry, Boot-Dateien, COM+ Registrierung",
          },
          { key: "C", text: "Alle Dateien auf C:" },
          { key: "D", text: "Nur die Gruppenrichtlinien" },
        ],
        correctAnswer: "B",
        explanation:
          "System State umfasst alle kritischen Systemkomponenten, die für AD-Funktion nötig sind.",
      },
    ],
  },
  {
    id: "ad12",
    title: "Zweiten DC hinzufügen",
    duration: "~25 min",
    description:
      "Redundanten Domain Controller für Hochverfügbarkeit einrichten.",
    checklist: [
      "Zweiten Server vorbereiten (DC02)",
      "AD DS Rolle installieren",
      "Als zusätzlichen DC promoten (zur bestehenden Domain)",
      "DNS-Replikation prüfen",
      "FSMO-Rollen verteilen (optional)",
    ],
    powershell: `# Auf DC02: AD DS installieren
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Als DC zur bestehenden Domain promoten
Install-ADDSDomainController \`
  -DomainName "mainlab.local" \`
  -InstallDns:$true \`
  -Credential (Get-Credential) \`
  -SafeModeAdministratorPassword (ConvertTo-SecureString "Pa$$w0rd123!" -AsPlainText -Force)

# Nach Neustart: Replikation prüfen
repadmin /replsummary
Get-ADDomainController -Filter *`,
    verify: [
      "DC02 in AD sichtbar",
      "Beide DCs in DNS registriert",
      "Replikation ohne Fehler",
      "SRV-Records für beide DCs vorhanden",
    ],
    notes: [
      "Mindestens 2 DCs für Produktionsumgebung!",
      "DCs sollten in verschiedenen Sites sein (physisch getrennt)",
    ],
    terminalLab: {
      title: "Multi-DC Verwaltung",
      commands: [
        {
          command: "Get-ADDomainController -Filter *",
          aliases: ["get-addomaincontroller -filter *"],
          output: `ComputerObjectDN           : CN=DC01,OU=Domain Controllers,DC=mainlab,DC=local
DefaultPartition           : DC=mainlab,DC=local
HostName                   : DC01.mainlab.local
IPv4Address                : 192.168.1.10
IsGlobalCatalog            : True
IsReadOnly                 : False
Site                       : Default-First-Site-Name

ComputerObjectDN           : CN=DC02,OU=Domain Controllers,DC=mainlab,DC=local
DefaultPartition           : DC=mainlab,DC=local
HostName                   : DC02.mainlab.local
IPv4Address                : 192.168.1.11
IsGlobalCatalog            : True
IsReadOnly                 : False
Site                       : Default-First-Site-Name`,
          explanation: "Listet alle Domain Controller in der Domain",
        },
        {
          command: "repadmin /replsummary",
          aliases: ["Repadmin /replsummary"],
          output: `Replication Summary Start Time: 2026-04-16 14:30:00

Beginning data collection for replication summary, this may take awhile:
  .....

Source DSA          largest delta    fails/total %%   error
 DC01               00:05:32            0 /   5    0
 DC02               00:05:28            0 /   5    0

Destination DSA     largest delta    fails/total %%   error
 DC01               00:05:32            0 /   5    0
 DC02               00:05:28            0 /   5    0`,
          explanation: "Zusammenfassung der AD-Replikation zwischen allen DCs",
        },
      ],
    },
    quickChecks: [
      {
        question: "Warum braucht man mindestens zwei Domain Controller?",
        options: [
          { key: "A", text: "Für Load Balancing der Anmeldungen" },
          {
            key: "B",
            text: "Hochverfügbarkeit – Fällt DC01 aus, übernimmt DC02",
          },
          { key: "C", text: "Voraussetzung für Gruppenrichtlinien" },
          { key: "D", text: "Nur mit 2 DCs sind Read-Only DCs möglich" },
        ],
        correctAnswer: "B",
        explanation:
          "Redundanz! Mit nur einem DC: fällt er aus, können sich keine User mehr anmelden und es gibt kein AD.",
      },
    ],
  },
];

// Helper functions
export function getAddnsProgress(): number {
  if (typeof window === "undefined") return 0;
  const map = JSON.parse(localStorage.getItem(ADDNS_MANIFEST_ID) || "{}");
  const completed = ADDNS_STEPS.filter((s) => map[s.id]).length;
  return Math.round((completed / ADDNS_STEPS.length) * 100);
}
