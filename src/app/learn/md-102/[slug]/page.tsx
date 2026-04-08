"use client";

import { LearningModule } from "@/components/learning/LearningModule";
import { md102ModuleBySlug } from "@/content/md102";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MD102ModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = md102ModuleBySlug.get(slug);

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Modul nicht gefunden
          </h1>
          <Link
            href="/learn/md-102"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <Link
          href="/learn/md-102"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu MD-102
        </Link>
      </div>

      {/* Module Content */}
      <LearningModule module={module} />
    </div>
  );
}
