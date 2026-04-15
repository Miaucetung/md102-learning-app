// ============================================================================
// Enterprise IT Training Platform - Identity & Access Scenarios
// ============================================================================
// Real-world scenarios for Entra ID identity management training
// ============================================================================

import type { EnterpriseScenario } from "@/types";

export const identityAccessScenarios: EnterpriseScenario[] = [
  // =========================================================================
  // SCENARIO: Emergency User Offboarding (BEGINNER - FREE)
  // =========================================================================
  {
    id: "identity-emergency-offboarding",
    slug: "emergency-user-offboarding",
    title: "Emergency Employee Offboarding",
    description:
      "An employee has been terminated effective immediately. HR calls at 4:30 PM demanding immediate access revocation while preserving data for legal hold.",
    category: "identity-access",
    subcategory: "user-lifecycle",
    difficulty: "beginner",
    tier: "free",
    estimatedMinutes: 15,
    prerequisites: [],
    skillTags: [
      "User Management",
      "Access Revocation",
      "Compliance",
      "Legal Hold",
      "Incident Response",
    ],

    environment: {
      name: "Woodgrove Bank",
      domain: "woodgrovebank.onmicrosoft.com",
      customDomain: "woodgrovebank.com",
      userCount: 800,
      licenseType: "E5",
      region: "East US",
      existingPolicies: [
        {
          id: "ca-mfa-all",
          name: "Require MFA for All Users",
          type: "conditional-access",
          status: "enabled",
          description: "All users must use MFA",
        },
        {
          id: "dlp-financial",
          name: "Financial Data Protection",
          type: "compliance",
          status: "enabled",
          description: "Monitors financial document sharing",
        },
      ],
      existingUsers: [
        {
          id: "user-term",
          displayName: "Michael Torres",
          upn: "michael.torres@woodgrovebank.com",
          role: "user",
          department: "Loan Processing",
          location: "New York",
          licenses: ["E5"],
          mfaStatus: "enforced",
          deviceCount: 3,
        },
        {
          id: "user-mgr",
          displayName: "Jennifer Adams",
          upn: "jennifer.adams@woodgrovebank.com",
          role: "user",
          department: "Loan Processing",
          location: "New York",
          licenses: ["E5"],
          mfaStatus: "enforced",
          deviceCount: 2,
        },
      ],
      existingGroups: [
        {
          id: "grp-loan",
          name: "Loan Processing Team",
          type: "m365",
          memberCount: 25,
          description: "Access to loan processing apps and SharePoint",
        },
      ],
      existingDevices: [
        {
          id: "dev-laptop",
          name: "LAPTOP-MTORRES",
          type: "windows",
          complianceStatus: "compliant",
          owner: "michael.torres@woodgrovebank.com",
          enrollmentType: "corporate",
        },
        {
          id: "dev-phone",
          name: "iPhone-Michael",
          type: "ios",
          complianceStatus: "compliant",
          owner: "michael.torres@woodgrovebank.com",
          enrollmentType: "corporate",
        },
      ],
    },

    context: {
      situation:
        "It's 4:30 PM on Friday. HR calls to inform you that Michael Torres from Loan Processing has been terminated for policy violations. He was escorted from the building 10 minutes ago but may still have his laptop and phone.",
      problem:
        "Michael has access to sensitive customer financial data. Legal has flagged this as a potential litigation matter, so all his data must be preserved while access is revoked immediately. He's been with the company for 5 years and has extensive access.",
      objective:
        "Revoke all access immediately while preserving his mailbox and OneDrive for legal discovery. Ensure he cannot access any company resources from any device.",
      urgency: "critical",
      stakeholders: [
        {
          name: "HR Director",
          role: "Human Resources",
          concern:
            "This termination is hostile. We need to ensure he cannot access or delete anything.",
        },
        {
          name: "Legal Counsel",
          role: "Legal Department",
          concern:
            "We may face litigation. All his emails and files must be preserved for eDiscovery.",
        },
        {
          name: "CISO",
          role: "Security",
          concern:
            "He has access to 5,000+ customer loan records. Verify all access is terminated.",
        },
      ],
    },

    decisionPoints: [
      {
        id: "dp-1",
        order: 1,
        question:
          "What is your FIRST action to prevent Michael from accessing company resources?",
        context:
          "Michael left the building 10 minutes ago. He may be in his car trying to download files.",
        options: [
          {
            id: "opt-1a",
            label: "Block sign-in and revoke all sessions",
            description:
              "Immediately disable the account and invalidate all active sessions",
            action: "Block + Revoke sessions",
            isOptimal: true,
            score: 100,
            consequenceId: "con-1a",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1b",
            label: "Reset the password first",
            description: "Change password so current credentials don't work",
            action: "Password reset",
            isOptimal: false,
            score: 50,
            consequenceId: "con-1b",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1c",
            label: "Delete the user account entirely",
            description: "Remove the account from Entra ID",
            action: "Delete user",
            isOptimal: false,
            score: 0,
            consequenceId: "con-1c",
            nextDecisionId: null,
          },
          {
            id: "opt-1d",
            label: "Remove from all groups first",
            description: "Revoke group-based access before blocking",
            action: "Remove group memberships",
            isOptimal: false,
            score: 30,
            consequenceId: "con-1d",
            nextDecisionId: "dp-2",
          },
        ],
        hints: [
          "Speed is critical - what causes immediate access loss?",
          "Remember: existing sessions may remain active without action",
        ],
      },
      {
        id: "dp-2",
        order: 2,
        question:
          "Legal requires a litigation hold on Michael's data. How do you preserve his mailbox and OneDrive?",
        context:
          "Michael's account is now blocked, but his data must be preserved for at least 2 years for potential litigation.",
        options: [
          {
            id: "opt-2a",
            label:
              "Convert mailbox to shared mailbox and apply litigation hold",
            description:
              "Preserve email access for manager while retaining all data",
            action: "Shared mailbox + Litigation hold",
            isOptimal: true,
            score: 100,
            consequenceId: "con-2a",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2b",
            label: "Export all data to PST and delete the account",
            description: "Download everything and remove the account",
            action: "Export and delete",
            isOptimal: false,
            score: 30,
            consequenceId: "con-2b",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2c",
            label: "Just apply litigation hold to the mailbox",
            description: "Litigation hold preserves the mailbox",
            action: "Litigation hold only",
            isOptimal: false,
            score: 60,
            consequenceId: "con-2c",
            nextDecisionId: "dp-3",
          },
        ],
        hints: [
          "Consider both preservation and business continuity needs",
          "His manager may need access to ongoing work emails",
        ],
      },
      {
        id: "dp-3",
        order: 3,
        question:
          "Michael had corporate devices enrolled in Intune. What action do you take on his devices?",
        context:
          "He has a company laptop (LAPTOP-MTORRES) and a company iPhone. Both are Intune-enrolled corporate devices.",
        options: [
          {
            id: "opt-3a",
            label: "Remote wipe all corporate devices",
            description: "Factory reset both devices immediately",
            action: "Remote wipe",
            isOptimal: true,
            score: 100,
            consequenceId: "con-3a",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3b",
            label: "Retire devices (remove corporate data only)",
            description:
              "Remove company apps and data but preserve personal data",
            action: "Retire devices",
            isOptimal: false,
            score: 40,
            consequenceId: "con-3b",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3c",
            label: "Wait for devices to be returned",
            description: "Legal may want to examine the devices",
            action: "Wait for return",
            isOptimal: false,
            score: 20,
            consequenceId: "con-3c",
            nextDecisionId: "dp-4",
          },
        ],
        hints: [
          "These are corporate-owned devices, not BYOD",
          "Consider: what if he refuses to return equipment?",
        ],
      },
      {
        id: "dp-4",
        order: 4,
        question:
          "How do you ensure Michael doesn't have any residual access through shared accounts or delegated permissions?",
        context:
          "During his 5 years, Michael may have been granted access to shared mailboxes, SharePoint sites, or service accounts.",
        options: [
          {
            id: "opt-4a",
            label:
              "Run access review to identify all delegated permissions and shared access",
            description:
              "Use audit logs and access review tools to find all access points",
            action: "Complete access review",
            isOptimal: true,
            score: 100,
            consequenceId: "con-4a",
            nextDecisionId: null,
          },
          {
            id: "opt-4b",
            label: "Ask his manager what Michael had access to",
            description: "Manager should know team resources",
            action: "Ask manager",
            isOptimal: false,
            score: 40,
            consequenceId: "con-4b",
            nextDecisionId: null,
          },
          {
            id: "opt-4c",
            label: "Blocking the account is sufficient",
            description: "Delegated access requires a working account anyway",
            action: "No additional action",
            isOptimal: false,
            score: 50,
            consequenceId: "con-4c",
            nextDecisionId: null,
          },
        ],
        hints: [
          "Some delegated access may not require the original account",
          "Service accounts or shared credentials might exist",
        ],
      },
    ],

    consequences: {
      "con-1a": {
        id: "con-1a",
        type: "success",
        title: "Immediate Access Revocation",
        outcome:
          "Michael's sign-in is blocked and all sessions revoked. His Outlook, Teams, and OneDrive sessions terminate within minutes. Any active sync stops immediately.",
        businessImpact:
          "Complete access termination achieved in under 5 minutes. Security team confirms no data access after 4:35 PM.",
        technicalReason:
          "Blocking sign-in prevents new authentications. Revoking sessions invalidates all refresh tokens, causing active sessions to terminate when they next check token validity (typically within minutes).",
        visualization: {
          type: "terminal",
          content: `PS> # Block sign-in
Update-MgUser -UserId "michael.torres@woodgrovebank.com" -AccountEnabled $false

PS> # Revoke all sessions
Revoke-MgUserSignInSession -UserId "michael.torres@woodgrovebank.com"

# Audit log shows:
4:32 PM - Account disabled
4:32 PM - Sessions revoked
4:35 PM - Last successful token refresh (failed)
4:36 PM - OneDrive sync terminated
4:37 PM - Outlook mobile disconnected`,
        },
      },
      "con-1b": {
        id: "con-1b",
        type: "partial",
        title: "Password Reset - Delayed Termination",
        outcome:
          "Password is reset, but Michael's existing sessions remain active for up to an hour. Audit log shows he accessed and downloaded 3 files after your password reset.",
        businessImpact:
          "Potential data exfiltration. Legal asks why files were accessed after termination was communicated. You have to explain the gap.",
        technicalReason:
          "Password reset only affects future sign-ins. Existing OAuth tokens remain valid. You must revoke sessions to terminate active access immediately.",
      },
      "con-1c": {
        id: "con-1c",
        type: "disaster",
        title: "User Deleted - Legal Violation",
        outcome:
          "You delete the user account. Within 30 minutes, legal calls asking for Michael's emails. The mailbox is gone. OneDrive is in the recycle bin with a 93-day deletion countdown. Compliance officer is furious.",
        businessImpact:
          "Legal hold violated. Potential spoliation of evidence in litigation. Compliance issues. You spend the next 4 hours with legal trying to recover data.",
        technicalReason:
          "Deleting a user enters a soft-delete period, but mailbox and OneDrive content begin deletion timers. For legal holds, you must preserve first, then handle the account.",
      },
      "con-1d": {
        id: "con-1d",
        type: "partial",
        title: "Group Removal - Access Persists",
        outcome:
          "You remove Michael from all groups, but direct permissions on SharePoint sites and delegated mailbox access remain. He still has active sessions accessing the loan processing site.",
        businessImpact:
          "Incomplete revocation. Audit shows continued access to sensitive documents via direct permissions that weren't removed.",
        technicalReason:
          "Group removal only affects group-based access. Direct permissions, delegated access, and active sessions are unaffected. Block + Revoke is the only complete immediate solution.",
      },
      "con-2a": {
        id: "con-2a",
        type: "success",
        title: "Complete Data Preservation",
        outcome:
          "Mailbox converted to shared mailbox (no license needed). Litigation hold applied - nothing can be deleted. Manager Jennifer has access to respond to urgent customer emails. OneDrive preserved with legal hold.",
        businessImpact:
          "Legal is satisfied. Business continuity maintained. License can be reassigned. All data preserved indefinitely.",
        technicalReason:
          "Shared mailbox conversion preserves all content without requiring a license. Litigation hold prevents any deletion, even by admins. This is the standard practice for terminated employees in regulated industries.",
      },
      "con-2b": {
        id: "con-2b",
        type: "failure",
        title: "PST Export - Compliance Gap",
        outcome:
          "PST export takes 6 hours. During this time, the soft-deleted mailbox processes under standard retention. Some auto-deleted items are lost. Legal says PST files may not be admissible as they break chain of custody.",
        businessImpact:
          "Evidence potentially compromised. Legal considers this a spoliation risk. Compliance team documents the incident.",
        technicalReason:
          "PST exports are not legally defensible for eDiscovery - they break the chain of custody. In-place holds are the proper legal preservation mechanism that maintains evidentiary integrity.",
      },
      "con-2c": {
        id: "con-2c",
        type: "partial",
        title: "Litigation Hold Only - License Cost",
        outcome:
          "Litigation hold applied, but the blocked user account keeps consuming an E5 license forever. OneDrive is preserved but becoming a shared mailbox wasn't done, so manager can't access ongoing work.",
        businessImpact:
          "$432/year in license costs continues indefinitely. Manager has to manually handle customer emails, causing delays.",
        technicalReason:
          "User mailboxes require licenses. Shared mailboxes don't. Converting to shared mailbox before removing the license preserves content while freeing the license for a new employee.",
      },
      "con-3a": {
        id: "con-3a",
        type: "success",
        title: "Devices Wiped Successfully",
        outcome:
          "Remote wipe command sent. Laptop wipes when it next connects to internet (already done - Michael tried to sync files, triggering the wipe). iPhone wiped within minutes via MDM push.",
        businessImpact:
          "Corporate data on devices eliminated. Even if Michael keeps the hardware, it's now factory reset. IT requests device return for reuse.",
        technicalReason:
          "Intune remote wipe for corporate devices is a full factory reset. For corporate-owned devices, this is appropriate. The wipe is delivered via MDM channel and executes even if user tries to cancel.",
      },
      "con-3b": {
        id: "con-3b",
        type: "partial",
        title: "Retire Only - Data May Remain",
        outcome:
          "Retire removes corporate apps and profiles, but cached data in the file system may persist. Offline files from OneDrive are still on the laptop's hard drive.",
        businessImpact:
          "Potential data exposure if device is sold or discarded improperly. For a termination-for-cause scenario, full wipe is safer.",
        technicalReason:
          "Retire is designed for BYOD scenarios where personal data must be preserved. For corporate-owned devices in hostile terminations, full wipe eliminates all risk.",
      },
      "con-3c": {
        id: "con-3c",
        type: "failure",
        title: "Waiting - Extended Exposure",
        outcome:
          "Michael doesn't return the devices. Over the next 2 weeks, you notice failed sign-ins from his devices - he's trying to access systems. Eventually, the devices are reported stolen, but data exposure window was 14+ days.",
        businessImpact:
          "Extended risk exposure. If he had extracted data offline, there's no way to recover it. CISO documents this as a security incident.",
        technicalReason:
          "Terminated employees, especially hostile ones, should never retain corporate devices any longer than necessary. Remote wipe capability exists precisely for this scenario.",
      },
      "con-4a": {
        id: "con-4a",
        type: "success",
        title: "Complete Access Review - Full Revocation",
        outcome:
          "Access review identifies: 3 shared mailboxes, 2 SharePoint site direct permissions, 1 Power BI workspace membership, and a Teams channel ownership. All removed. No residual access confirmed.",
        businessImpact:
          "Complete offboarding. Security team validates no access paths remain. Compliance checklist completed.",
        technicalReason:
          "Users accumulate access over time through various mechanisms. Automated access reviews using Graph API or Access Reviews feature ensure complete identification and revocation.",
        visualization: {
          type: "terminal",
          content: `PS> # Find all delegated mailbox access
Get-EXOMailboxPermission -Identity * | Where-Object { $_.User -like "*michael.torres*" }

PS> # Find SharePoint site permissions
$sites = Get-SPOSite -Limit All
foreach ($site in $sites) {
    Get-SPOUser -Site $site.Url | Where-Object { $_.LoginName -like "*michael.torres*" }
}

PS> # Check Power BI workspaces
Get-PowerBIWorkspace | Get-PowerBIWorkspaceUser | Where-Object { $_.User -like "*michael*" }

# Results:
# - Loan Processing Shared Mailbox (full access)
# - Customer Files SharePoint Site (direct edit)
# - Regional Loan Reports SharePoint Site (direct view)
# - Loan Department Power BI Workspace (member)
# All access removed.`,
        },
      },
      "con-4b": {
        id: "con-4b",
        type: "partial",
        title: "Manager Knowledge Gap",
        outcome:
          "Manager mentions the shared mailbox but forgets about the SharePoint site Michael created 3 years ago. That site continues to have Michael's manager-granted permissions. It's discovered during next quarter's audit.",
        businessImpact:
          "Incomplete offboarding. Audit finding. Manual review is never complete without systematic tools.",
        technicalReason:
          "Human memory is unreliable for access management. Organizations accumulate hundreds of permission grants over time. Only systematic review (Graph API, Access Reviews) ensures completeness.",
      },
      "con-4c": {
        id: "con-4c",
        type: "partial",
        title: "Blocked Account - Sufficient for Most",
        outcome:
          "Michael's blocked account prevents most access, but a service account password he knows from a legacy automation project is discovered 3 months later when that automation fails. The password is changed, but risk existed.",
        businessImpact:
          "Near miss. Service account access could have been exploited. Complete offboarding includes service accounts, shared credentials, and delegated access.",
        technicalReason:
          "Blocking the user account blocks their personal identity. It doesn't automatically revoke knowledge they have of other credentials, API keys, or shared accounts they may have accessed.",
      },
    },

    solutionPath: [
      {
        order: 1,
        title: "Immediate: Block Account and Revoke Sessions",
        description:
          "Block sign-in to prevent new access. Revoke all sessions to terminate existing access. This should happen within minutes of the termination notification.",
        command: {
          type: "powershell",
          code: `# Block sign-in
Update-MgUser -UserId "michael.torres@woodgrovebank.com" -AccountEnabled $false

# Revoke all sessions immediately
Revoke-MgUserSignInSession -UserId "michael.torres@woodgrovebank.com"`,
        },
        warning: "Do this BEFORE anything else. Every minute of delay is risk.",
      },
      {
        order: 2,
        title: "Preserve: Legal Hold and Mailbox Conversion",
        description:
          "Apply litigation hold to preserve all data for legal. Convert to shared mailbox to free the license while preserving content.",
        navigation: [
          "Exchange Admin Center",
          "Recipients",
          "Mailboxes",
          "Michael Torres",
          "Litigation hold: Enable",
        ],
        command: {
          type: "powershell",
          code: `# Apply litigation hold
Set-Mailbox "michael.torres@woodgrovebank.com" -LitigationHoldEnabled $true -LitigationHoldDuration 730

# Convert to shared mailbox after removing license
Set-Mailbox "michael.torres@woodgrovebank.com" -Type Shared`,
        },
      },
      {
        order: 3,
        title: "Wipe Devices",
        description:
          "Send remote wipe command to all enrolled corporate devices.",
        navigation: [
          "Intune Admin Center",
          "Devices",
          "All devices",
          "Filter by user",
          "Wipe",
        ],
        tip: "For corporate devices, full wipe is appropriate. For BYOD, Retire removes only corporate data.",
      },
      {
        order: 4,
        title: "Complete Access Review",
        description:
          "Run comprehensive audit to identify and remove all delegated permissions, shared access, and group memberships.",
        command: {
          type: "powershell",
          code: `# Run offboarding access review script
./Invoke-TerminatedUserAccessReview.ps1 -UserPrincipalName "michael.torres@woodgrovebank.com" -RemoveAllAccess`,
        },
      },
    ],

    explanation: {
      why: "Emergency offboarding for hostile terminations requires immediate action to prevent data loss or theft. Unlike planned departures, there's no transition period. Every minute of access after termination is risk.",
      how: "The sequence is: Contain (block+revoke), Preserve (legal hold), Secure (wipe devices), Verify (access review). This ensures no gaps while meeting legal requirements.",
      deepDive:
        "Financial services organizations face regulatory requirements for data preservation combined with immediate access termination. The solution must balance both: litigation hold preserves everything while account blocking prevents access. Shared mailbox conversion is a key technique that frees licenses while maintaining accessibility for business continuity.",
      misconceptions: [
        "Deleting the user is the fastest way to remove access - FALSE, it deletes required data",
        "Password reset terminates all access - FALSE, existing sessions persist",
        "Blocked accounts can't access anything - FALSE, shared credentials may exist",
        "Legal holds are only for lawsuits - FALSE, they're for any potential legal matter",
      ],
      references: [
        {
          title: "Revoke user access in an emergency",
          url: "https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access",
          type: "docs",
        },
        {
          title: "Convert a mailbox to a shared mailbox",
          url: "https://learn.microsoft.com/en-us/microsoft-365/admin/email/convert-user-mailbox-to-shared-mailbox",
          type: "docs",
        },
        {
          title: "Create a litigation hold",
          url: "https://learn.microsoft.com/en-us/purview/ediscovery-create-a-litigation-hold",
          type: "docs",
        },
      ],
    },

    relatedScenarios: [
      "ca-compromised-account-response",
      "exchange-shared-mailbox-setup",
      "intune-device-wipe-scenarios",
    ],

    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    version: "1.0.0",
  },
];
