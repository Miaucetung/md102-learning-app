// ============================================================================
// Enterprise IT Training Platform - Conditional Access Scenarios
// ============================================================================
// Real-world scenarios for Conditional Access & MFA training
// ============================================================================

import type { EnterpriseScenario } from "@/types";

export const conditionalAccessScenarios: EnterpriseScenario[] = [
  // =========================================================================
  // SCENARIO 1: Compromised Account Response (BEGINNER - FREE)
  // =========================================================================
  {
    id: "ca-compromised-account-response",
    slug: "compromised-account-response",
    title: "Responding to a Compromised Admin Account",
    description:
      "An IT admin's account shows signs of compromise from an unusual location. You must secure the account and prevent further damage while investigating.",
    category: "conditional-access",
    subcategory: "risk-policies",
    difficulty: "beginner",
    tier: "free",
    estimatedMinutes: 15,
    prerequisites: [],
    skillTags: [
      "Conditional Access",
      "Sign-in Risk",
      "MFA",
      "Account Security",
      "Incident Response",
    ],

    environment: {
      name: "Contoso Ltd.",
      domain: "contoso.onmicrosoft.com",
      customDomain: "contoso.com",
      userCount: 250,
      licenseType: "E5",
      region: "West Europe",
      existingPolicies: [
        {
          id: "ca-baseline-mfa",
          name: "Require MFA for Admins",
          type: "conditional-access",
          status: "enabled",
          description: "MFA required for all admin roles",
        },
        {
          id: "ca-block-legacy",
          name: "Block Legacy Authentication",
          type: "conditional-access",
          status: "enabled",
          description: "Blocks legacy auth protocols",
        },
      ],
      existingUsers: [
        {
          id: "user-1",
          displayName: "Alex Chen",
          upn: "alex.chen@contoso.com",
          role: "admin",
          department: "IT",
          location: "Munich, Germany",
          licenses: ["E5"],
          mfaStatus: "enforced",
          deviceCount: 2,
        },
        {
          id: "user-2",
          displayName: "Sarah Miller",
          upn: "sarah.miller@contoso.com",
          role: "user",
          department: "Sales",
          location: "Berlin, Germany",
          licenses: ["E3"],
          mfaStatus: "enabled",
          deviceCount: 1,
        },
      ],
      existingGroups: [
        {
          id: "grp-admins",
          name: "IT Administrators",
          type: "security",
          memberCount: 5,
          description: "All IT admin accounts",
        },
      ],
      existingDevices: [
        {
          id: "dev-1",
          name: "DESKTOP-ALEX01",
          type: "windows",
          complianceStatus: "compliant",
          owner: "alex.chen@contoso.com",
          enrollmentType: "corporate",
        },
      ],
    },

    context: {
      situation:
        "It's Monday morning at 8:30 AM. Your security dashboard shows a high-risk sign-in alert for Alex Chen, a Global Administrator. The sign-in originated from Moscow, Russia at 3:00 AM local time - while Alex was confirmed to be at home in Munich.",
      problem:
        "Alex's admin credentials appear to be compromised. The attacker successfully signed in and may have access to critical admin functions. You need to contain the breach immediately while preserving forensic evidence.",
      objective:
        "Secure Alex's account, block the attacker's access, and implement controls to prevent similar incidents. You must act quickly but methodically.",
      urgency: "critical",
      stakeholders: [
        {
          name: "Alex Chen",
          role: "Global Administrator",
          concern:
            "I didn't sign in from Moscow. Someone must have stolen my password!",
        },
        {
          name: "Lisa Park",
          role: "CISO",
          concern:
            "We need to know exactly what the attacker accessed. Don't destroy any evidence.",
        },
        {
          name: "Thomas Weber",
          role: "CEO",
          concern:
            "Is our company data safe? Can this happen to other accounts?",
        },
      ],
    },

    decisionPoints: [
      {
        id: "dp-1",
        order: 1,
        question:
          "What is your FIRST action to contain this security incident?",
        context:
          "The attacker may still have an active session. Every minute counts.",
        options: [
          {
            id: "opt-1a",
            label: "Reset Alex's password immediately",
            description: "Force a password change to invalidate credentials",
            action: "Reset-MgUserPassword",
            isOptimal: false,
            score: 60,
            consequenceId: "con-1a",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1b",
            label: "Revoke all active sessions and refresh tokens",
            description:
              "Invalidate all existing sessions while preserving the ability to investigate",
            action: "Revoke-MgUserSignInSession",
            isOptimal: true,
            score: 100,
            consequenceId: "con-1b",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1c",
            label: "Block Alex's account entirely",
            description: "Disable sign-in to prevent any further access",
            action: "Block sign-in",
            isOptimal: false,
            score: 40,
            consequenceId: "con-1c",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1d",
            label: "Wait for more evidence before taking action",
            description: "Gather more information to confirm the compromise",
            action: "Monitor only",
            isOptimal: false,
            score: 0,
            consequenceId: "con-1d",
            nextDecisionId: null,
          },
        ],
        hints: [
          "Consider what allows the attacker to maintain access",
          "Think about business continuity - Alex needs to work too",
        ],
      },
      {
        id: "dp-2",
        order: 2,
        question:
          "The attacker's session is now terminated. What's your next priority?",
        context:
          "Alex confirms they never signed in from Russia. You need to prevent re-entry while allowing Alex to regain access.",
        options: [
          {
            id: "opt-2a",
            label: "Reset password and require MFA re-registration",
            description:
              "Force new password and re-enrollment of authentication methods",
            action: "Reset password + Require MFA re-reg",
            isOptimal: true,
            score: 100,
            consequenceId: "con-2a",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2b",
            label: "Just reset the password",
            description:
              "Simple password reset should be enough since MFA is already enabled",
            action: "Reset password only",
            isOptimal: false,
            score: 50,
            consequenceId: "con-2b",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2c",
            label: "Enable passwordless authentication",
            description:
              "Move directly to FIDO2 or Windows Hello to eliminate password risk",
            action: "Enable passwordless",
            isOptimal: false,
            score: 30,
            consequenceId: "con-2c",
            nextDecisionId: "dp-3",
          },
        ],
        hints: [
          "The attacker may have registered their own MFA device",
          "Consider all authentication factors that could be compromised",
        ],
      },
      {
        id: "dp-3",
        order: 3,
        question:
          "How will you prevent similar compromises for all admin accounts?",
        context:
          "The CISO wants systemic protections, not just fixes for Alex's account.",
        options: [
          {
            id: "opt-3a",
            label:
              "Create a Conditional Access policy requiring compliant devices for admin access",
            description:
              "Restrict admin sign-ins to Intune-managed, compliant devices only",
            action: "CA Policy: Require compliant device for admins",
            isOptimal: true,
            score: 100,
            consequenceId: "con-3a",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3b",
            label: "Enable Identity Protection with automatic risk remediation",
            description:
              "Let Azure AD automatically block or require MFA for risky sign-ins",
            action: "Enable Identity Protection",
            isOptimal: false,
            score: 70,
            consequenceId: "con-3b",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3c",
            label: "Create Named Locations and block sign-ins from Russia",
            description: "Geo-block countries where you don't have employees",
            action: "Block countries via Named Location",
            isOptimal: false,
            score: 40,
            consequenceId: "con-3c",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3d",
            label: "Require hardware security keys for all admins",
            description: "Mandate FIDO2 keys as the only authentication method",
            action: "Require FIDO2",
            isOptimal: false,
            score: 60,
            consequenceId: "con-3d",
            nextDecisionId: "dp-4",
          },
        ],
        hints: [
          "Think about what unique factor could not have been stolen remotely",
          "Consider defense in depth - multiple controls are better than one",
        ],
      },
      {
        id: "dp-4",
        order: 4,
        question:
          "The CEO asks about break-glass accounts. How should you ensure emergency access?",
        context:
          "If Conditional Access locks out all admins, you need a way to recover.",
        options: [
          {
            id: "opt-4a",
            label:
              "Create 2 emergency access accounts excluded from all CA policies",
            description:
              "Cloud-only accounts with strong passwords stored securely offline",
            action: "Create break-glass accounts",
            isOptimal: true,
            score: 100,
            consequenceId: "con-4a",
            nextDecisionId: null,
          },
          {
            id: "opt-4b",
            label: "Give the CEO's assistant Global Admin rights as backup",
            description: "Someone trusted should have backup access",
            action: "Assign additional GA",
            isOptimal: false,
            score: 20,
            consequenceId: "con-4b",
            nextDecisionId: null,
          },
          {
            id: "opt-4c",
            label: "Contact Microsoft Support for emergency access",
            description: "Microsoft can help recover tenant access if needed",
            action: "Rely on MS Support",
            isOptimal: false,
            score: 40,
            consequenceId: "con-4c",
            nextDecisionId: null,
          },
        ],
        hints: [
          "Break-glass accounts need to bypass CA but still be secure",
          "Consider: What if CA misconfiguration locks everyone out at 2 AM?",
        ],
      },
    ],

    consequences: {
      "con-1a": {
        id: "con-1a",
        type: "partial",
        title: "Password Reset - Partial Containment",
        outcome:
          "You reset Alex's password. However, the attacker still has an active session for the next hour until their access token expires. They continue browsing the admin center.",
        businessImpact:
          "The attacker had an additional 45 minutes to explore admin settings and potentially modify configurations.",
        technicalReason:
          "Password reset doesn't immediately invalidate existing OAuth tokens. Access tokens remain valid until they expire (typically 1 hour). Session tokens must be explicitly revoked.",
        visualization: {
          type: "terminal",
          content: `PS> Reset-MgUserPassword -UserId "alex.chen@contoso.com"
Password reset successful.

# But checking audit log shows:
PS> Get-MgAuditLogSignIn -Filter "userId eq 'alex-guid'" | Select TimeGenerated, Status
TimeGenerated        Status
08:45:00            Success  # Attacker still active with old token!
08:52:00            Success  # Still browsing admin portals
09:15:00            Failed   # Finally blocked when token expired`,
          caption:
            "The attacker maintained access for 45 minutes after password reset",
        },
      },
      "con-1b": {
        id: "con-1b",
        type: "success",
        title: "Sessions Revoked - Immediate Containment",
        outcome:
          "All active sessions and refresh tokens are immediately invalidated. The attacker is kicked out within seconds. Alex will need to sign in again, but the threat is contained.",
        businessImpact:
          "Minimal damage. The attacker's session was terminated before they could make significant changes. You preserved audit logs for investigation.",
        technicalReason:
          "Revoke-MgUserSignInSession invalidates all refresh tokens immediately. While access tokens technically remain valid briefly, the next API call requiring token refresh will fail. This is the fastest way to terminate an active attack.",
        visualization: {
          type: "terminal",
          content: `PS> Revoke-MgUserSignInSession -UserId "alex.chen@contoso.com"
All sessions revoked successfully.

# Immediate audit log impact:
PS> Get-MgAuditLogSignIn -Filter "userId eq 'alex-guid'" | Select TimeGenerated, Status
TimeGenerated        Status
08:31:00            Failed   # Attacker immediately blocked!
08:31:05            Failed   # Retry also fails
# Investigation can proceed safely`,
          caption:
            "Attacker kicked out immediately - threat contained in under 1 minute",
        },
      },
      "con-1c": {
        id: "con-1c",
        type: "partial",
        title: "Account Blocked - Overkill with Side Effects",
        outcome:
          "Alex's account is completely blocked. The attacker can't access anything, but neither can Alex. This creates operational problems and requires IT to manually unblock the account later.",
        businessImpact:
          "The threat is contained, but Alex (a Global Admin) can't do their job. Critical admin tasks are delayed. The CEO asks why we blocked our own team.",
        technicalReason:
          "Blocking sign-in is a heavy-handed approach. It's appropriate for terminated employees or confirmed malicious insiders, but for a compromised legitimate user, session revocation is more surgical and allows faster recovery.",
      },
      "con-1d": {
        id: "con-1d",
        type: "disaster",
        title: "Critical Error - Attacker Continues Unimpeded",
        outcome:
          "While you gather evidence, the attacker creates a new admin account, modifies Conditional Access policies to exclude themselves, and sets up mail forwarding rules to exfiltrate data.",
        businessImpact:
          "Major breach. Customer data exposed, regulatory notification required, significant financial and reputational damage. The CISO is furious.",
        technicalReason:
          "In security incidents, speed is critical. A confirmed high-risk sign-in from an impossible location IS sufficient evidence. 'Contain first, investigate second' is the correct approach.",
      },
      "con-2a": {
        id: "con-2a",
        type: "success",
        title: "Complete Credential Reset",
        outcome:
          "Alex resets their password and must re-register all MFA methods. Any rogue authenticator apps or phone numbers the attacker may have added are wiped. Alex sets up fresh MFA on their verified corporate device.",
        businessImpact:
          "Complete credential refresh. Even if the attacker had registered their own MFA device, they can no longer use it. Alex is back to work within 15 minutes.",
        technicalReason:
          "Attackers who gain initial access often register their own MFA methods as persistence mechanisms. Requiring re-registration ensures only the legitimate user's devices are enrolled. MgUserAuthenticationMethod cmdlets can force this.",
        visualization: {
          type: "terminal",
          content: `PS> # Reset password
Reset-MgUserPassword -UserId "alex.chen@contoso.com"

PS> # Require MFA re-registration
Set-MgUserAuthenticationRequirement -UserId "alex.chen@contoso.com" \`
  -RequireReregisterAuthenticator $true

# Alex signs in:
# 1. Password prompt (new password)
# 2. "Additional information required" - forced MFA enrollment
# 3. Registers Microsoft Authenticator fresh
# 4. Access restored with clean auth methods`,
        },
      },
      "con-2b": {
        id: "con-2b",
        type: "partial",
        title: "Password-Only Reset - Persistent Backdoor",
        outcome:
          "Alex resets their password and signs in with their MFA app. Unknown to you, during the compromise window, the attacker registered a second Authenticator app. They can still generate valid MFA codes.",
        businessImpact:
          "False sense of security. Three days later, the attacker uses their registered MFA app to sign in again. The compromise response has to start over.",
        technicalReason:
          "MFA registration persists across password resets. Attackers commonly register backup MFA methods as persistence. Always review and reset authentication methods after a compromise.",
      },
      "con-2c": {
        id: "con-2c",
        type: "failure",
        title: "Premature Passwordless Migration",
        outcome:
          "You try to enroll Alex in FIDO2, but realize the corporate security keys haven't been deployed yet. Alex can't sign in at all until you revert. Meanwhile, the attacker's potentially-registered MFA is never addressed.",
        businessImpact:
          "Operational disruption. Alex is locked out for 2 hours while you procure and configure a security key. The underlying persistence mechanism was never addressed.",
        technicalReason:
          "Passwordless is excellent security but requires infrastructure preparation. During incident response, use proven methods first, then plan migration after the incident is resolved.",
      },
      "con-3a": {
        id: "con-3a",
        type: "success",
        title: "Defense in Depth - Device Compliance",
        outcome:
          "New CA policy requires admin sign-ins only from Intune-compliant devices. Even with stolen credentials AND MFA, attackers can't sign in from their own machines.",
        businessImpact:
          "Systemic protection achieved. Future credential theft is significantly harder to exploit. Admin accounts now have multiple layers of protection.",
        technicalReason:
          "Device compliance creates a 'something you have' factor tied to corporate hardware. Attackers would need to either compromise a physical corporate device or register their device in Intune (which would be visible and require approval). This blocks most remote attacks.",
        visualization: {
          type: "terminal",
          content: `# Conditional Access Policy Configuration:
Name: "Require Compliant Device for Admins"

Assignments:
  Users: Include "Directory Roles" > Global Admin, User Admin, etc.
  Cloud apps: All cloud apps

Conditions:
  Device platforms: Any device

Access Controls:
  Grant: Require device to be marked as compliant

# Result: Stolen credentials alone are now useless
# Attacker must also have physical access to compliant device`,
        },
      },
      "con-3b": {
        id: "con-3b",
        type: "partial",
        title: "Identity Protection - Reactive Defense",
        outcome:
          "Identity Protection will detect and respond to future risky sign-ins. However, it's reactive - the attack still gets attempted, and depending on risk detection timing, some access may occur before blocking.",
        businessImpact:
          "Improved detection but not prevention. You're now better at catching attacks but haven't eliminated the attack surface. The CISO asks 'Why can attackers still try?'",
        technicalReason:
          "Identity Protection is excellent for risk detection and automated response, but it evaluates risk at sign-in time. Device compliance prevents sign-in attempts from unmanaged devices entirely - true prevention vs. detection.",
      },
      "con-3c": {
        id: "con-3c",
        type: "failure",
        title: "Geographic Blocking - Easily Bypassed",
        outcome:
          "You block Russia, but the attacker simply uses a VPN exit node in Germany. Geographic blocking creates false sense of security while attackers trivially bypass it.",
        businessImpact:
          "Minimal security improvement. Within days, you see more compromise attempts from 'trusted' locations. The geographic approach doesn't address the fundamental vulnerability.",
        technicalReason:
          "IP-based geographic blocking is trivially bypassed with VPNs, Tor, or compromised machines in 'trusted' countries. It can help reduce noise from opportunistic attacks but provides no defense against targeted attackers.",
      },
      "con-3d": {
        id: "con-3d",
        type: "partial",
        title: "FIDO2 Keys - Good But Incomplete",
        outcome:
          "Hardware security keys would be excellent, but deploying them to all admins takes weeks. You order keys, but in the meantime, admins remain vulnerable with weaker MFA methods.",
        businessImpact:
          "Long-term improvement planned, but no immediate protection. The window of vulnerability remains open during procurement and deployment.",
        technicalReason:
          "FIDO2 is phishing-resistant and highly secure, but requires physical hardware distribution, user training, and backup planning. Device compliance can be implemented immediately with existing managed devices.",
      },
      "con-4a": {
        id: "con-4a",
        type: "success",
        title: "Break-Glass Accounts Configured",
        outcome:
          "You create two cloud-only emergency accounts (emergency-admin-01 and emergency-admin-02) excluded from all CA policies. Passwords are 25+ characters, stored in a physical safe, and monitored by Azure AD alerts.",
        businessImpact:
          "Emergency access guaranteed. Even if CA misconfiguration locks out all admins, you have a documented, secure recovery path. Compliance teams approve the documented emergency access procedure.",
        technicalReason:
          "Break-glass accounts are Microsoft's recommended practice. They should be: (1) Cloud-only (no AD sync), (2) Excluded from ALL CA policies, (3) Not used day-to-day, (4) Monitored for any sign-in, (5) Passwords stored offline/physical safe.",
        visualization: {
          type: "terminal",
          content: `# Break-glass account setup:
PS> New-MgUser -DisplayName "Emergency Admin 01" \`
    -UserPrincipalName "emergency-admin-01@contoso.onmicrosoft.com" \`
    -AccountEnabled $true \`
    -PasswordProfile @{
        Password = "Store-This-25-Char-Password-In-Physical-Safe!"
        ForceChangePasswordNextSignIn = $false
    }

# Assign Global Admin role:
PS> New-MgRoleAssignment -PrincipalId $user.Id -RoleDefinitionId "Global Admin GUID"

# Exclude from ALL Conditional Access policies:
# Edit each CA policy > Users > Exclude > Add break-glass accounts

# Set up monitoring:
PS> New-MgActivityAlertRule -Name "Break-glass sign-in alert" \`
    -Conditions @{ UserIds = @("emergency-admin-01-guid") }`,
        },
      },
      "con-4b": {
        id: "con-4b",
        type: "disaster",
        title: "Security Violation - Unauthorized Access",
        outcome:
          "The CEO's assistant now has God-mode access to the entire tenant. They accidentally delete a SharePoint site. HR discovers an admin browsing salary data. The audit trail is a mess.",
        businessImpact:
          "Major security and compliance violation. Assigning permanent Global Admin to non-IT staff violates least-privilege principles and creates insider threat risks.",
        technicalReason:
          "Global Admin is the most powerful role. It should only be assigned to trained IT staff who need it. For break-glass purposes, use dedicated accounts that are never for daily use and have strong monitoring.",
      },
      "con-4c": {
        id: "con-4c",
        type: "failure",
        title: "External Dependency - Dangerous Gap",
        outcome:
          "At 2 AM on a Saturday, CA misconfiguration locks all admins out. Microsoft Support takes 4 hours to respond (after business hours). Critical systems are unreachable during an ongoing incident.",
        businessImpact:
          "Extended outage. The company had no self-recovery capability for their own tenant. Business operations halted while waiting for external support.",
        technicalReason:
          "Microsoft Support can help with tenant recovery, but response times vary. Emergency access accounts provide immediate self-service recovery. You should have both - break-glass for fast recovery, and know how to engage Microsoft Support as escalation.",
      },
    },

    solutionPath: [
      {
        order: 1,
        title: "Immediate Containment - Revoke Sessions",
        description:
          "Revoke all active sessions and refresh tokens to immediately terminate the attacker's access.",
        navigation: [
          "Entra Admin Center",
          "Users",
          "Alex Chen",
          "Revoke sessions",
        ],
        command: {
          type: "powershell",
          code: 'Revoke-MgUserSignInSession -UserId "alex.chen@contoso.com"',
          output: "All sessions revoked successfully.",
        },
        tip: "This is faster than password reset and doesn't require coordination with the user.",
      },
      {
        order: 2,
        title: "Reset Credentials Completely",
        description:
          "Reset password AND require re-registration of all MFA methods to eliminate any attacker-registered authentication.",
        command: {
          type: "powershell",
          code: `# Reset password
Reset-MgUserPassword -UserId "alex.chen@contoso.com"

# Require MFA re-registration
Set-MgUserAuthenticationRequirement -UserId "alex.chen@contoso.com" -RequireReregisterAuthenticator $true`,
        },
        warning:
          "User must register MFA from a trusted, known device - verify with them directly.",
      },
      {
        order: 3,
        title: "Create Device Compliance Policy",
        description:
          "Create a Conditional Access policy requiring compliant devices for all privileged role sign-ins.",
        navigation: [
          "Entra Admin Center",
          "Protection",
          "Conditional Access",
          "Create new policy",
        ],
        tip: "Start in Report-only mode and validate before enforcing to avoid lockouts.",
      },
      {
        order: 4,
        title: "Configure Break-Glass Accounts",
        description:
          "Create two cloud-only emergency accounts excluded from CA, with monitored sign-ins.",
        command: {
          type: "powershell",
          code: `New-MgUser -DisplayName "Emergency Admin 01" \`
    -UserPrincipalName "emergency-01@contoso.onmicrosoft.com" \`
    -AccountEnabled $true \`
    -PasswordProfile @{ Password = "SecureRandomPassword123!" }`,
        },
        warning:
          "Store passwords offline in a physical safe. Never use these for daily work.",
      },
    ],

    explanation: {
      why: "This scenario demonstrates the critical importance of rapid incident response and defense-in-depth. A compromised admin account is one of the most dangerous security incidents, as attackers gain access to tenant-wide controls. Speed of containment directly correlates with damage limitation.",
      how: "The response follows the 'Contain, Eradicate, Recover' incident response model. Session revocation provides immediate containment without user coordination. Complete credential reset eliminates persistence mechanisms. Device compliance creates systemic protection for all privileged accounts.",
      deepDive:
        "Modern identity attacks often involve MFA bypass through techniques like MFA fatigue, SIM swapping, or registering their own MFA devices during the initial access window. Simply resetting passwords leaves these persistence mechanisms in place. The combination of session revocation, credential reset, MFA re-enrollment, and device compliance creates multiple defensive layers that dramatically raise the bar for attackers.",
      misconceptions: [
        "Password reset immediately terminates all access - FALSE, tokens remain valid briefly",
        "MFA makes accounts unhackable - FALSE, MFA can be bypassed or attacker can register their own",
        "Geographic blocking is effective security - FALSE, trivially bypassed with VPNs",
        "Break-glass accounts are a security risk - FALSE, properly managed they're essential",
      ],
      references: [
        {
          title: "Respond to compromised user accounts",
          url: "https://learn.microsoft.com/en-us/security/operations/compromised-account",
          type: "docs",
        },
        {
          title: "Conditional Access: Require compliant devices",
          url: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-policy-compliant-device",
          type: "learn",
        },
        {
          title: "Emergency access accounts in Azure AD",
          url: "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access",
          type: "docs",
        },
      ],
    },

    relatedScenarios: [
      "ca-policy-design-basics",
      "defender-incident-investigation",
      "identity-mfa-rollout",
    ],

    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    version: "1.0.0",
    author: "Enterprise Training Team",
  },

  // =========================================================================
  // SCENARIO 2: MFA Enforcement Rollout (INTERMEDIATE - FREE)
  // =========================================================================
  {
    id: "ca-mfa-rollout-planning",
    slug: "mfa-rollout-planning",
    title: "Planning a Company-Wide MFA Rollout",
    description:
      "Your company needs to enable MFA for all users by end of quarter. You must plan the rollout to minimize disruption while achieving security goals.",
    category: "conditional-access",
    subcategory: "mfa-config",
    difficulty: "intermediate",
    tier: "free",
    estimatedMinutes: 20,
    prerequisites: ["ca-compromised-account-response"],
    skillTags: [
      "MFA",
      "Conditional Access",
      "Change Management",
      "User Communication",
      "Phased Rollout",
    ],

    environment: {
      name: "Fabrikam Inc.",
      domain: "fabrikam.onmicrosoft.com",
      customDomain: "fabrikam.com",
      userCount: 1500,
      licenseType: "E3",
      region: "East US",
      existingPolicies: [
        {
          id: "ca-admin-mfa",
          name: "Require MFA for Admins",
          type: "conditional-access",
          status: "enabled",
          description: "Current: Admins only have MFA",
        },
      ],
      existingUsers: [
        {
          id: "user-1",
          displayName: "Manufacturing Floor",
          upn: "shared-floor@fabrikam.com",
          role: "user",
          department: "Manufacturing",
          location: "Factory Floor",
          licenses: ["F3"],
          mfaStatus: "disabled",
          deviceCount: 0,
        },
        {
          id: "user-2",
          displayName: "Field Technicians",
          upn: "tech-group@fabrikam.com",
          role: "user",
          department: "Field Services",
          location: "Mobile",
          licenses: ["E3"],
          mfaStatus: "disabled",
          deviceCount: 1,
        },
        {
          id: "user-3",
          displayName: "Office Staff",
          upn: "office@fabrikam.com",
          role: "user",
          department: "Corporate",
          location: "HQ",
          licenses: ["E3"],
          mfaStatus: "disabled",
          deviceCount: 2,
        },
      ],
      existingGroups: [
        {
          id: "grp-mfg",
          name: "Manufacturing Users",
          type: "security",
          memberCount: 200,
          description: "Factory floor workers with shared workstations",
        },
        {
          id: "grp-field",
          name: "Field Technicians",
          type: "security",
          memberCount: 150,
          description: "Mobile workers often in low-connectivity areas",
        },
        {
          id: "grp-office",
          name: "Office Staff",
          type: "security",
          memberCount: 1150,
          description: "Primary office workers",
        },
      ],
      existingDevices: [],
    },

    context: {
      situation:
        "The board mandated MFA for all users after a competitor suffered a breach. You have 12 weeks to achieve 100% MFA coverage across 1,500 users in diverse environments: office workers, manufacturing floor, and mobile field technicians.",
      problem:
        "Each user group has different challenges. Factory workers share workstations without smartphones. Field technicians often work in areas with poor connectivity. Forcing MFA overnight would cripple operations.",
      objective:
        "Design a phased MFA rollout plan that achieves 100% coverage while maintaining business operations and user satisfaction.",
      urgency: "medium",
      stakeholders: [
        {
          name: "Board of Directors",
          role: "Governance",
          concern: "We need MFA everywhere. Compliance auditors are asking.",
        },
        {
          name: "Manufacturing Manager",
          role: "Operations",
          concern:
            "My floor workers share stations and don't have company phones.",
        },
        {
          name: "Field Services Director",
          role: "Operations",
          concern: "My technicians work in areas with spotty cell coverage.",
        },
      ],
    },

    decisionPoints: [
      {
        id: "dp-1",
        order: 1,
        question:
          "How will you handle MFA for the 200 manufacturing floor workers who share workstations?",
        context:
          "These workers clock in at shared terminals. They don't have corporate smartphones and personal phone use is prohibited on the floor.",
        options: [
          {
            id: "opt-1a",
            label: "Issue FIDO2 security keys to each worker",
            description:
              "Hardware tokens that work without phones or connectivity",
            action: "Deploy FIDO2 keys",
            isOptimal: true,
            score: 100,
            consequenceId: "con-1a",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1b",
            label: "Require them to use personal phones with Authenticator app",
            description: "Most workers have personal smartphones",
            action: "Personal device MFA",
            isOptimal: false,
            score: 30,
            consequenceId: "con-1b",
            nextDecisionId: "dp-2",
          },
          {
            id: "opt-1c",
            label: "Exempt manufacturing from MFA",
            description: "They access limited systems, risk is lower",
            action: "MFA exemption",
            isOptimal: false,
            score: 0,
            consequenceId: "con-1c",
            nextDecisionId: null,
          },
          {
            id: "opt-1d",
            label: "Use Windows Hello for Business on shared workstations",
            description: "Biometric authentication at the workstation",
            action: "Windows Hello shared",
            isOptimal: false,
            score: 50,
            consequenceId: "con-1d",
            nextDecisionId: "dp-2",
          },
        ],
      },
      {
        id: "dp-2",
        order: 2,
        question:
          "What MFA method will you recommend for the 150 field technicians who work in low-connectivity areas?",
        context:
          "These workers use company smartphones but often work in rural areas or basements with no cellular or WiFi coverage.",
        options: [
          {
            id: "opt-2a",
            label:
              "Microsoft Authenticator with offline TOTP codes (Software token)",
            description:
              "Authenticator can generate codes without connectivity",
            action: "Authenticator TOTP",
            isOptimal: true,
            score: 100,
            consequenceId: "con-2a",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2b",
            label: "Push notifications via Authenticator app",
            description: "Simple approve/deny on phone",
            action: "Push notifications",
            isOptimal: false,
            score: 40,
            consequenceId: "con-2b",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2c",
            label: "SMS-based MFA",
            description: "Codes sent via text message",
            action: "SMS MFA",
            isOptimal: false,
            score: 20,
            consequenceId: "con-2c",
            nextDecisionId: "dp-3",
          },
          {
            id: "opt-2d",
            label: "FIDO2 security keys for field workers too",
            description: "Same solution as manufacturing",
            action: "FIDO2 for field",
            isOptimal: false,
            score: 70,
            consequenceId: "con-2d",
            nextDecisionId: "dp-3",
          },
        ],
      },
      {
        id: "dp-3",
        order: 3,
        question: "What's the optimal rollout sequence for the three groups?",
        context:
          "You can't deploy MFA to 1,500 users simultaneously. Which group should go first?",
        options: [
          {
            id: "opt-3a",
            label:
              "Office Staff (1,150) → Field Techs (150) → Manufacturing (200)",
            description: "Largest group first to cover most users quickly",
            action: "Largest first",
            isOptimal: false,
            score: 50,
            consequenceId: "con-3a",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3b",
            label:
              "Manufacturing (200) → Field Techs (150) → Office Staff (1,150)",
            description: "Start with challenging groups, learn and refine",
            action: "Hardest first",
            isOptimal: false,
            score: 40,
            consequenceId: "con-3b",
            nextDecisionId: "dp-4",
          },
          {
            id: "opt-3c",
            label:
              "IT Pilot (50) → Office Staff (1,150) → Field Techs (150) → Manufacturing (200)",
            description:
              "Internal pilot first, then easy groups, then complex ones",
            action: "Pilot-then-scale",
            isOptimal: true,
            score: 100,
            consequenceId: "con-3c",
            nextDecisionId: "dp-4",
          },
        ],
      },
      {
        id: "dp-4",
        order: 4,
        question:
          "How will you handle users who don't complete MFA registration?",
        context:
          "Some users will ignore communications and not register. You need to enforce completion.",
        options: [
          {
            id: "opt-4a",
            label:
              "Use Conditional Access in Report-only mode, then enforce gradually",
            description:
              "Monitor compliance, give warnings, then enforce per group",
            action: "Gradual enforcement",
            isOptimal: true,
            score: 100,
            consequenceId: "con-4a",
            nextDecisionId: null,
          },
          {
            id: "opt-4b",
            label: "Hard cutoff date with immediate enforcement",
            description: "After deadline, no MFA = no access",
            action: "Hard cutoff",
            isOptimal: false,
            score: 30,
            consequenceId: "con-4b",
            nextDecisionId: null,
          },
          {
            id: "opt-4c",
            label: "Manager accountability - users without MFA reported weekly",
            description:
              "Make managers responsible for their teams' compliance",
            action: "Manager reporting",
            isOptimal: false,
            score: 60,
            consequenceId: "con-4c",
            nextDecisionId: null,
          },
        ],
      },
    ],

    consequences: {
      "con-1a": {
        id: "con-1a",
        type: "success",
        title: "FIDO2 Keys - Optimal for Shared Workstations",
        outcome:
          "FIDO2 keys provide passwordless, phishing-resistant authentication. Workers tap their key at any workstation to sign in. No phones needed, works offline, and is more secure than SMS or app-based MFA.",
        businessImpact:
          "Manufacturing operations continue smoothly. Workers appreciate the simple tap-to-login experience. Security is actually improved beyond basic MFA.",
        technicalReason:
          "FIDO2/WebAuthn keys are tied to the physical device, work offline, and are phishing-resistant - attackers cannot replay credentials. They're ideal for shared workstations where per-user devices (like phones) aren't practical.",
      },
      "con-1b": {
        id: "con-1b",
        type: "failure",
        title: "Personal Phones - Policy and Privacy Issues",
        outcome:
          "Union representatives push back - workers shouldn't need personal devices for work. Privacy concerns arise about company apps on personal phones. Several workers don't have smartphones. HR gets involved.",
        businessImpact:
          "Project delayed by 4 weeks for policy negotiations. Legal review required. Some workers remain unable to authenticate.",
        technicalReason:
          "Requiring personal devices for work authentication is increasingly problematic due to privacy regulations (GDPR) and labor agreements. Company should provide authentication methods.",
      },
      "con-1c": {
        id: "con-1c",
        type: "disaster",
        title: "MFA Exemption - Audit Failure",
        outcome:
          "The compliance auditor discovers 200 users without MFA. The board-mandated security control is not fully implemented. Audit findings include 'material weakness in access controls.'",
        businessImpact:
          "Failed compliance audit. Board loses confidence in IT leadership. The exemption must be remediated immediately under pressure.",
        technicalReason:
          "The board mandate was 100% MFA. Exemptions create gaps that attackers target specifically. 'Shadow IT' and exception-based attacks are common breach vectors.",
      },
      "con-1d": {
        id: "con-1d",
        type: "partial",
        title: "Windows Hello - Shared PC Complications",
        outcome:
          "Windows Hello for Business can work on shared PCs with 'shared device mode,' but requires additional configuration. Each worker must enroll biometrics on each workstation they use, which is cumbersome with 50+ shared stations.",
        businessImpact:
          "Partial success - works but creates enrollment burden. Workers frustrated by needing to set up fingerprint on multiple machines.",
        technicalReason:
          "Windows Hello is designed for personal device scenarios. Shared device mode exists but isn't as seamless. FIDO2 keys provide the same security benefits with simpler deployment for shared scenarios.",
      },
      "con-2a": {
        id: "con-2a",
        type: "success",
        title: "TOTP Codes - Works Offline",
        outcome:
          "Field technicians use Microsoft Authenticator to generate time-based codes that work without any network connection. They can authenticate in basements, rural areas, anywhere.",
        businessImpact:
          "Field operations continue uninterrupted. Technicians report high satisfaction with the solution. Zero support tickets related to connectivity.",
        technicalReason:
          "TOTP (Time-based One-Time Password) codes are generated locally using the current time and a shared secret. No network connectivity required - just synchronized clocks (devices handle this automatically).",
        visualization: {
          type: "diagram",
          content: `
TOTP Code Generation (Offline):

 [Authenticator App]     [Entra ID Server]
         │                       │
    Shared Secret           Shared Secret
         │                       │
    Current Time            Current Time
         │                       │
    ┌────┴────┐             ┌────┴────┐
    │ HMAC-SHA │             │ HMAC-SHA │
    │   Hash   │             │   Hash   │
    └────┬────┘             └────┬────┘
         │                       │
    6-digit code            6-digit code
     "847293"                "847293"
         │                       │
         └───────MATCH!──────────┘
          (No network needed)
`,
          caption:
            "TOTP codes are generated independently on both devices using time synchronization",
        },
      },
      "con-2b": {
        id: "con-2b",
        type: "failure",
        title: "Push Notifications Fail Offline",
        outcome:
          "First field deployment day: 12 technicians locked out of systems while working in a building basement. Push notifications require active internet connection to receive approval requests.",
        businessImpact:
          "Critical service calls delayed. Customer complaints. Emergency workaround needed (temporary bypass) creating security gaps.",
        technicalReason:
          "Push notifications are 'online' MFA - they require connectivity between the phone and Azure to deliver the approval request. In disconnected scenarios, they simply don't work.",
      },
      "con-2c": {
        id: "con-2c",
        type: "failure",
        title: "SMS MFA - Security and Connectivity Problems",
        outcome:
          "SMS requires cellular signal. In rural areas and buildings, texts don't arrive. Additionally, SMS is the weakest MFA method - SIM swapping attacks are common.",
        businessImpact:
          "Double failure: doesn't solve connectivity problem AND introduces security weakness. CISO concerned about using known-vulnerable MFA method.",
        technicalReason:
          "NIST and Microsoft recommend against SMS MFA due to SIM swapping vulnerabilities. It's also dependent on cellular connectivity, making it unsuitable for offline scenarios.",
      },
      "con-2d": {
        id: "con-2d",
        type: "partial",
        title: "FIDO2 - Works but Not Ideal for Mobile Workers",
        outcome:
          "FIDO2 keys work offline and are very secure. However, field technicians using phones and tablets find hardware keys cumbersome - they need USB-C adapters, keys get lost in the field, etc.",
        businessImpact:
          "Functional but not optimal. High rate of lost keys (replacement costs). Workers prefer the phone-based solution they already carry.",
        technicalReason:
          "FIDO2 is excellent for desktop scenarios. For mobile workers who already have company phones, software TOTP via Authenticator provides equivalent offline capability without additional hardware.",
      },
      "con-3a": {
        id: "con-3a",
        type: "partial",
        title: "Largest First - High Risk Start",
        outcome:
          "Rolling out to 1,150 users simultaneously overwhelms the help desk. Common issues aren't documented yet. Support queues hit 4+ hour wait times in week one.",
        businessImpact:
          "User frustration high. Productivity dip. Leadership questions the project management approach.",
        technicalReason:
          "Large-scale simultaneous rollouts amplify any issues. Better to discover and document problems with smaller groups, build support resources, then scale.",
      },
      "con-3b": {
        id: "con-3b",
        type: "failure",
        title: "Hardest First - Extended Timeline",
        outcome:
          "Manufacturing FIDO2 deployment takes 6 weeks instead of planned 2 weeks - unexpected workstation compatibility issues. Field tech TOTP rollout finds additional edge cases. By the time you reach office staff, you're already behind schedule.",
        businessImpact:
          "Project runs over timeline. Board mandate deadline missed. Complex deployments should not precede validation with simpler groups.",
        technicalReason:
          "IT best practice: pilot with tech-savvy users (IT team), validate with representative easy group, then tackle complex edge cases with lessons learned.",
      },
      "con-3c": {
        id: "con-3c",
        type: "success",
        title: "Pilot-Then-Scale - Controlled Rollout",
        outcome:
          "IT pilot uncovers 3 undocumented issues with legacy apps. Office rollout is smooth using documented workarounds. Field and manufacturing benefit from refined processes and trained support staff.",
        businessImpact:
          "On-time, on-budget delivery. Progressive learning reduces issues at each phase. Support team fully prepared by final phase.",
        technicalReason:
          "Phased rollout with pilot is change management best practice. Each phase builds documentation, trains support, and validates assumptions before broader deployment.",
      },
      "con-4a": {
        id: "con-4a",
        type: "success",
        title: "Gradual Enforcement - Balanced Approach",
        outcome:
          "Report-only mode shows 94% of users would pass. Two weeks of targeted communication to the 6% laggards. Switch to enforce with grace period for remaining stragglers. 100% compliant with minimal disruption.",
        businessImpact:
          "Smooth transition. Laggards identified early. No emergency lockouts. Compliance achieved with user goodwill intact.",
        technicalReason:
          "Report-only mode is critical for Conditional Access deployment. It shows exactly what would happen without actually blocking users. This enables data-driven communication and identifies issues before enforcement.",
      },
      "con-4b": {
        id: "con-4b",
        type: "failure",
        title: "Hard Cutoff - Operational Crisis",
        outcome:
          "Deadline hits. 85 users (including 3 executives) are locked out. Emergency exemptions created. Trust in IT damaged. 'MFA lockout' becomes a meme in company Slack.",
        businessImpact:
          "Significant business disruption. IT credibility damaged. Emergency exceptions create security gaps that persist.",
        technicalReason:
          "Hard cutoffs without monitoring create predictable chaos. Change management requires visibility into readiness and graduated enforcement.",
      },
      "con-4c": {
        id: "con-4c",
        type: "partial",
        title: "Manager Accountability - Incomplete Solution",
        outcome:
          "Weekly reports help, but some managers ignore them. Without technical enforcement, the 'long tail' of laggards persists. 100% compliance never fully achieved.",
        businessImpact:
          "Good progress but not complete. Audit finds 2% non-compliant after 16 weeks. Requires additional technical controls.",
        technicalReason:
          "Organizational pressure helps but is insufficient alone. Technical controls (Conditional Access enforcement) combined with organizational accountability is the complete solution.",
      },
    },

    solutionPath: [
      {
        order: 1,
        title: "Assessment and Planning",
        description:
          "Identify user groups, their authentication challenges, and appropriate MFA methods for each.",
        tip: "Create a matrix: User Group → Device Type → Connectivity → Recommended MFA Method",
      },
      {
        order: 2,
        title: "IT Pilot (Weeks 1-2)",
        description:
          "Roll out to IT department first. Document issues, create support guides, train help desk.",
        command: {
          type: "powershell",
          code: `# Create pilot CA policy in Report-only mode
New-MgIdentityConditionalAccessPolicy -DisplayName "MFA Pilot - IT Only" \`
    -State "enabledForReportingButNotEnforced" \`
    -Conditions @{
        Users = @{ IncludeGroups = @("IT-Department-Group-ID") }
        Applications = @{ IncludeApplications = @("All") }
    } \`
    -GrantControls @{ BuiltInControls = @("mfa") }`,
        },
      },
      {
        order: 3,
        title: "Office Staff Rollout (Weeks 3-6)",
        description:
          "Deploy to main office users with Authenticator app. Enforce after 2-week registration period.",
      },
      {
        order: 4,
        title: "Field Technicians (Weeks 7-9)",
        description:
          "Deploy TOTP-capable Authenticator setup. Ensure offline code generation is tested.",
        tip: "Have technicians test offline codes in the office before field deployment.",
      },
      {
        order: 5,
        title: "Manufacturing (Weeks 10-12)",
        description:
          "Deploy FIDO2 security keys. One-on-one enrollment during shift changes.",
        warning:
          "Ensure workstations support FIDO2 (Windows 10 1903+ or compatible browsers).",
      },
    ],

    explanation: {
      why: "Different user populations require different MFA solutions. A one-size-fits-all approach will fail for edge cases like shared workstations and offline scenarios. Successful MFA rollouts recognize and address these variations.",
      how: "By analyzing user groups' specific constraints (device availability, connectivity, workflow), matching appropriate MFA methods, and using phased rollout with pilot validation, organizations achieve security goals without operational disruption.",
      deepDive:
        "The shift from 'MFA is optional' to 'MFA is mandatory' is a significant change management challenge. Technical implementation is only part of the solution - communication, training, support readiness, and gradual enforcement are equally critical. Report-only mode in Conditional Access is essential for validating policies before enforcement.",
      misconceptions: [
        "All MFA methods are equally secure - FALSE, SMS is weakest",
        "MFA requires internet connectivity - FALSE, TOTP/FIDO2 work offline",
        "Users will self-enroll if given enough time - FALSE, enforcement needed",
        "Shared workstations can't have MFA - FALSE, FIDO2 keys solve this",
      ],
      references: [
        {
          title: "Plan a phased MFA deployment",
          url: "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-getstarted",
          type: "learn",
        },
        {
          title: "FIDO2 security keys",
          url: "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passwordless#fido2-security-keys",
          type: "docs",
        },
      ],
    },

    relatedScenarios: [
      "ca-compromised-account-response",
      "ca-policy-troubleshooting",
      "identity-passwordless-migration",
    ],

    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
    version: "1.0.0",
  },
];
