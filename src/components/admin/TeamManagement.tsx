"use client";

// ============================================================================
// Enterprise IT Training Platform - Team Management
// ============================================================================
// Components for managing teams and team members
// ============================================================================

import type { Team, User, UserRole } from "@/types";
import {
  AlertCircle,
  ChevronDown,
  Filter,
  Mail,
  MoreVertical,
  Search,
  Shield,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

// ============================================================================
// Team List
// ============================================================================

interface TeamListProps {
  teams: Team[];
  onSelectTeam: (teamId: string) => void;
  onCreateTeam: () => void;
}

export function TeamList({ teams, onSelectTeam, onCreateTeam }: TeamListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Teams</h2>
        <button
          onClick={onCreateTeam}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          <Users className="w-4 h-4" />
          Create Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onSelectTeam(team.id)}
            className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                {team.memberIds.length} members
              </span>
            </div>
            <h3 className="font-semibold text-white mb-1">{team.name}</h3>
            {team.description && (
              <p className="text-sm text-slate-400 line-clamp-2">
                {team.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Team Members Table
// ============================================================================

interface TeamMembersTableProps {
  members: User[];
  onInvite: () => void;
  onRemove: (userId: string) => void;
  onChangeRole: (userId: string, role: UserRole) => void;
}

export function TeamMembersTable({
  members,
  onInvite,
  onRemove,
  onChangeRole,
}: TeamMembersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const roleColors: Record<UserRole, string> = {
    admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    manager: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    member: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    viewer: "bg-slate-600/20 text-slate-500 border-slate-600/30",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value as UserRole | "all")
              }
              className="appearance-none pl-10 pr-8 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={onInvite}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-sm text-slate-400">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                      roleColors[member.role]
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{
                          width: `${
                            ((member.progress?.scenariosCompleted || 0) /
                              Math.max(
                                member.progress?.scenariosAvailable || 1,
                                1,
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-slate-400">
                      {member.progress?.scenariosCompleted || 0}/
                      {member.progress?.scenariosAvailable || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-400">
                    {member.lastActiveAt
                      ? new Date(member.lastActiveAt).toLocaleDateString()
                      : "Never"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === member.id ? null : member.id,
                        )
                      }
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>

                    {openMenuId === member.id && (
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-slate-800 border border-slate-700 shadow-xl z-10">
                        <div className="p-1">
                          <button
                            onClick={() => {
                              onChangeRole(member.id, "admin");
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg"
                          >
                            <Shield className="w-4 h-4" />
                            Make Admin
                          </button>
                          <button
                            onClick={() => {
                              onChangeRole(member.id, "manager");
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg"
                          >
                            <Users className="w-4 h-4" />
                            Make Manager
                          </button>
                          <button
                            onClick={() => {
                              onRemove(member.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-700 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Invite Modal
// ============================================================================

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (emails: string[], role: UserRole) => void;
  teams: Team[];
}

export function InviteModal({
  isOpen,
  onClose,
  onInvite,
  teams,
}: InviteModalProps) {
  const [emails, setEmails] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("member");
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const emailList = emails
      .split(/[,\n]/)
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    const invalidEmails = emailList.filter(
      (e) => !e.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    );

    if (invalidEmails.length > 0) {
      setError(`Invalid email(s): ${invalidEmails.join(", ")}`);
      return;
    }

    if (emailList.length === 0) {
      setError("Please enter at least one email address");
      return;
    }

    onInvite(emailList, selectedRole);
    setEmails("");
    setSelectedRole("member");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <Mail className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Invite Team Members
            </h2>
            <p className="text-sm text-slate-400">
              Send invitations to join your organization
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Emails */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Addresses
            </label>
            <textarea
              value={emails}
              onChange={(e) => {
                setEmails(e.target.value);
                setError("");
              }}
              placeholder="Enter emails separated by commas or new lines..."
              className="w-full h-32 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="member">Member - Can complete scenarios</option>
              <option value="manager">Manager - Can view team progress</option>
              <option value="admin">Admin - Full access</option>
            </select>
          </div>

          {/* Team */}
          {teams.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Add to Team (Optional)
              </label>
              <select
                value={selectedTeamId}
                onChange={(e) => setSelectedTeamId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">No team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Invitations
          </button>
        </div>
      </div>
    </div>
  );
}
