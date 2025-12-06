export const allMachines = [
  {
    id: "M-001",
    name: "Hydraulic Press A",
    health: 92,
    rul: 245,
    status: "healthy",
    location: "Floor 1-A",
  },
  {
    id: "M-002",
    name: "CNC Mill B",
    health: 78,
    rul: 124,
    status: "warning",
    location: "Floor 1-B",
  },
  {
    id: "M-003",
    name: "Conveyor System C",
    health: 95,
    rul: 312,
    status: "healthy",
    location: "Floor 2-A",
  },
  {
    id: "M-004",
    name: "Industrial Turbine D",
    health: 65,
    rul: 45,
    status: "critical",
    location: "Power Unit 1",
  },
  {
    id: "M-005",
    name: "Compressor E",
    health: 88,
    rul: 198,
    status: "healthy",
    location: "Floor 2-C",
  },
  {
    id: "M-006",
    name: "Welding Robot F",
    health: 72,
    rul: 98,
    status: "warning",
    location: "Floor 1-C",
  },
  {
    id: "M-007",
    name: "Lathe Machine G",
    health: 94,
    rul: 287,
    status: "healthy",
    location: "Floor 1-A",
  },
];

export const teamPerformance = [
  { name: "Week 1", completed: 12, efficiency: 85 },
  { name: "Week 2", completed: 15, efficiency: 88 },
  { name: "Week 3", completed: 11, efficiency: 82 },
  { name: "Week 4", completed: 18, efficiency: 92 },
];

export const stats = {
  total: allMachines.length,
  healthy: allMachines.filter((m) => m.status === "healthy").length,
  warning: allMachines.filter((m) => m.status === "warning").length,
  critical: allMachines.filter((m) => m.status === "critical").length,
  avgHealth: Math.round(
    allMachines.reduce((sum, m) => sum + m.health, 0) / allMachines.length
  ),
};

export const machineStatusData = [
  { name: "Healthy", value: stats.healthy, color: "#10b981" },
  { name: "Warning", value: stats.warning, color: "#f59e0b" },
  { name: "Critical", value: stats.critical, color: "#ef4444" },
];
