// layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";
import { loadHyperV, HYPERV_TOTAL } from "@/lib/stepsHyperV";
