// page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { HYPERV_STEPS } from "@/lib/stepsHyperV";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { get as readMap, set as saveMap } from "@/lib/progress";
