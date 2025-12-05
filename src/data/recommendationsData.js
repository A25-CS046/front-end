const mockRecommendations = [
  {
    id: "rec-001",
    machineId: "TUR-004",
    machineName: "Turbine D",
    severity: "critical",
    category: "overheating",
    prediction:
      "Mesin #TUR-004 kemungkinan mengalami overheating critical dalam 3 hari",
    timeframe: "3 hari",
    confidence: 89,
    details:
      "Model AI mendeteksi pola peningkatan suhu bearing konsisten 72 jam.",
    recommendedActions: [
      "Segera inspect bearing assembly",
      "Reduce load ke 75%",
      "Schedule thermal imaging",
    ],
    estimatedDowntime: "4-6 jam",
    estimatedCost: "$2,500 - $4,000",
    predictedFailureDate: new Date(Date.now() + 3 * 86400000),
    currentMetrics: {
      temperature: 87,
      vibration: 4.2,
      current: 12.8,
    },
    status: "new",
    createdAt: new Date(),
    aiModel: "AEGIS-Thermal-v2.1",
  },
  {
    id: "rec-002",
    machineId: "CNC-002",
    machineName: "CNC Mill B",
    severity: "high",
    category: "vibration",
    prediction:
      "Spindle misalignment terdeteksi, kemungkinan failure dalam 7 hari",
    timeframe: "7 hari",
    confidence: 76,
    details:
      "Vibration pattern menunjukkan early-stage spindle misalignment. Frekuensi harmonik meningkat 28% dalam 5 hari terakhir.",
    recommendedActions: [
      "Schedule spindle alignment check",
      "Monitor vibration setiap shift",
      "Reduce spindle speed ke 80% capacity",
    ],
    estimatedDowntime: "2-3 jam",
    estimatedCost: "$800 - $1,200",
    predictedFailureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    currentMetrics: {
      vibration: 3.8,
      temperature: 45,
    },
    status: "new",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    aiModel: "AEGIS-Vibration-v1.8",
  },
  {
    id: "rec-003",
    machineId: "PUMP-007",
    machineName: "Hydraulic Pump C",
    severity: "medium",
    category: "wear",
    prediction: "Seal degradation terdeteksi, service required dalam 14 hari",
    timeframe: "14 hari",
    confidence: 82,
    details:
      "Pressure fluctuation dan minor leakage pattern indicate seal wear. Historical data suggest optimal maintenance window adalah sekarang.",
    recommendedActions: [
      "Order replacement seal kit",
      "Schedule maintenance window",
      "Monitor pressure variance daily",
    ],
    estimatedDowntime: "1-2 jam",
    estimatedCost: "$300 - $500",
    status: "acknowledged",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    aiModel: "AEGIS-Hydraulic-v1.5",
  },
];

export default mockRecommendations;
