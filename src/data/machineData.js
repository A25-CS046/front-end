export const machines = [
  {
    id: "M-001",
    name: "Hydraulic Press A",
    type: "Hydraulic Press",
    location: "Floor 1-A",
    manufacturer: "Bosch",
    model: "HPR-5000",
    health: 92,
    rul: 245,
    status: "healthy",
    installDate: "2021-03-15",
    lastMaintenance: "2024-10-15",
  },
  {
    id: "M-002",
    name: "CNC Mill B",
    type: "CNC Machine",
    location: "Floor 1-B",
    manufacturer: "Haas",
    model: "VF-4",
    health: 78,
    rul: 124,
    status: "warning",
    installDate: "2020-06-20",
    lastMaintenance: "2024-09-28",
  },
  {
    id: "M-003",
    name: "Conveyor System C",
    type: "Conveyor",
    location: "Floor 2-A",
    manufacturer: "Siemens",
    model: "CONV-2000",
    health: 95,
    rul: 312,
    status: "healthy",
    installDate: "2022-01-10",
    lastMaintenance: "2024-11-01",
  },
  {
    id: "M-004",
    name: "Industrial Turbine D",
    type: "Turbine",
    location: "Power Unit 1",
    manufacturer: "GE",
    model: "GT-3500",
    health: 65,
    rul: 45,
    status: "critical",
    installDate: "2019-08-05",
    lastMaintenance: "2024-10-10",
  },
  {
    id: "M-005",
    name: "Compressor E",
    type: "Air Compressor",
    location: "Floor 2-C",
    manufacturer: "Atlas Copco",
    model: "GA-90",
    health: 88,
    rul: 198,
    status: "healthy",
    installDate: "2021-11-22",
    lastMaintenance: "2024-10-20",
  },
  {
    id: "M-006",
    name: "Welding Robot F",
    type: "Robotic Welder",
    location: "Floor 1-C",
    manufacturer: "KUKA",
    model: "KR-1000",
    health: 72,
    rul: 98,
    status: "warning",
    installDate: "2020-04-18",
    lastMaintenance: "2024-09-15",
  },
  {
    id: "M-007",
    name: "Lathe Machine G",
    type: "Lathe",
    location: "Floor 1-A",
    manufacturer: "DMG MORI",
    model: "NLX-2500",
    health: 94,
    rul: 287,
    status: "healthy",
    installDate: "2022-05-30",
    lastMaintenance: "2024-10-25",
  },
];

export const generateSensorData = (machineId, health) => {
  const baseVibration = health > 85 ? 2.2 : health > 70 ? 3.5 : 4.8;
  const baseTemp = health > 85 ? 70 : health > 70 ? 78 : 88;
  const baseCurrent = health > 85 ? 13 : health > 70 ? 15 : 17;

  const vibrationData = [];
  const temperatureData = [];
  const currentData = [];

  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0") + ":00";
    const variance = Math.random() * 0.5 - 0.25;

    vibrationData.push({
      time: hour,
      value: +(baseVibration + variance).toFixed(2),
      threshold: 4.0,
    });
    temperatureData.push({
      time: hour,
      value: +(baseTemp + Math.random() * 10 - 5).toFixed(1),
      threshold: 85,
    });
    currentData.push({
      time: hour,
      value: +(baseCurrent + Math.random() * 2 - 1).toFixed(2),
      threshold: 16,
    });
  }

  return { vibrationData, temperatureData, currentData };
};
