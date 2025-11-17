import { Card, Badge, Progress, Button } from "@/components/ui";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Users,
  Wrench,
  BarChart3,
  XCircle,
  Server,
} from "lucide-react";

import RiskPredictionCards from "./RiskPredictionCards";

// Expanded machine list - 7 machines
const allMachines = [
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

// Calculate statistics
const totalMachines = allMachines.length;
const healthyMachines = allMachines.filter(
  (m) => m.status === "healthy"
).length;
const warningMachines = allMachines.filter(
  (m) => m.status === "warning"
).length;
const criticalMachines = allMachines.filter(
  (m) => m.status === "critical"
).length;
const avgHealth = Math.round(
  allMachines.reduce((sum, m) => sum + m.health, 0) / allMachines.length
);

// Machine status distribution for pie chart
const machineStatusData = [
  { name: "Healthy", value: healthyMachines, color: "#10b981" },
  { name: "Warning", value: warningMachines, color: "#f59e0b" },
  { name: "Critical", value: criticalMachines, color: "#ef4444" },
];

const maintenanceStats = [
  { name: "Completed", value: 45, color: "#10b981" },
  { name: "In Progress", value: 12, color: "#3b82f6" },
  { name: "Scheduled", value: 8, color: "#f59e0b" },
  { name: "Overdue", value: 3, color: "#ef4444" },
];

const teamPerformance = [
  { name: "Week 1", completed: 12, efficiency: 85 },
  { name: "Week 2", completed: 15, efficiency: 88 },
  { name: "Week 3", completed: 11, efficiency: 82 },
  { name: "Week 4", completed: 18, efficiency: 92 },
];

export default function SupervisorDashboard({ onViewMachineDetails }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return (
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        );
      case "warning":
        return (
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        );
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
            {/* Header */}     {" "}
      <div className="flex items-center justify-between">
               {" "}
        <div>
                   {" "}
          <h1 className="text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            Supervisor Dashboard
          </h1>
                   {" "}
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Comprehensive overview and team managementtt
          </p>
                 {" "}
        </div>
               {" "}
        <Button
          onClick={onViewMachineDetails}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
        >
                    <Server className="w-4 h-4 mr-2" />          View Machine
          Details        {" "}
        </Button>
             {" "}
      </div>
            {/* KPI Cards */}     {" "}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
               {" "}
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-emerald-500/10 dark:to-emerald-600/5 border-teal-200 dark:border-emerald-500/20 p-4">
                   {" "}
          <div className="flex items-center justify-between mb-2">
                       {" "}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Total Machines
            </p>
                       {" "}
            <Server className="w-5 h-5 text-teal-600 dark:text-emerald-400" /> 
                   {" "}
          </div>
                   {" "}
          <p className="text-slate-900 dark:text-slate-100">{totalMachines}</p> 
                 {" "}
          <p className="text-xs text-teal-600 dark:text-emerald-400 mt-1">
            All systems monitored
          </p>
                 {" "}
        </Card>
               {" "}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-500/10 dark:to-blue-600/5 border-blue-200 dark:border-blue-500/20 p-4">
                   {" "}
          <div className="flex items-center justify-between mb-2">
                       {" "}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Active Tasks
            </p>
                       {" "}
            <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />     
               {" "}
          </div>
                    <p className="text-slate-900 dark:text-slate-100">20</p>   
               {" "}
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            12 In Progress
          </p>
                 {" "}
        </Card>
               {" "}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-amber-500/10 dark:to-amber-600/5 border-orange-200 dark:border-amber-500/20 p-4">
          Re        {" "}
          <div className="flex items-center justify-between mb-2">
                       {" "}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Team Members
            </p>
                       {" "}
            <Users className="w-5 h-5 text-orange-600 dark:text-amber-400" />   
                 {" "}
          </div>
                    <p className="text-slate-900 dark:text-slate-100">15</p>   
               {" "}
          <p className="text-xs text-orange-600 dark:text-amber-400 mt-1">
            12 On Duty
          </p>
                 {" "}
        </Card>
               {" "}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-500/10 dark:to-purple-600/5 border-purple-200 dark:border-purple-500/20 p-4">
                   {" "}
          <div className="flex items-center justify-between mb-2">
                       {" "}
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Efficiency
            </p>
                       {" "}
            <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                     {" "}
          </div>
                    <p className="text-slate-900 dark:text-slate-100">89%</p>
          section          {" "}
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            +5% vs last week
          </p>
                 {" "}
        </Card>
             {" "}
      </div>
            {/* Machine Status Overview */}     {" "}
      <div>
               {" "}
        <div className="flex items-center justify-between mb-4">
                   {" "}
          <h2 className="text-slate-900 dark:text-slate-100">
            Machine Status Overview
          </h2>
                   {" "}
          <Button
            variant="outline"
            size="sm"
            onClick={onViewMachineDetails}
            className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
                        View Details            {" "}
            <TrendingUp className="w-4 h-4 ml-2" />
            section        {" "}
          </Button>
                 {" "}
        </div>
                {/* Status Summary Cards */}       {" "}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                   {" "}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
                       {" "}
            <div className="flex items-center justify-between mb-3">
                           {" "}
              <div>
                               {" "}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total Machines
                </p>
                               {" "}
                <p className="text-slate-900 dark:text-slate-100 mt-1">
                  {totalMachines}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
                Next              {" "}
                <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" /> 
                           {" "}
              </div>
                         {" "}
            </div>
                        <Progress value={100} className="h-2" />         {" "}
          </Card>
                   {" "}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
                       {" "}
            <div className="flex items-center justify-between mb-3">
                           {" "}
              <div>
                               {" "}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Healthy
                </p>
                               {" "}
                <p className="text-emerald-600 dark:text-emerald-400 mt-1">
                  {healthyMachines}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center">
                               {" "}
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <Progress
              value={(healthyMachines / totalMachines) * 100}
              className="h-2"
            />
            section            {" "}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                           {" "}
              {Math.round((healthyMachines / totalMachines) * 100)}% of total  
                       {" "}
            </p>
                     {" "}
          </Card>
                   {" "}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
                       {" "}
            <div className="flex items-center justify-between mb-3">
                           {" "}
              <div>
                               {" "}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Warning
                </p>
                               {" "}
                <p className="text-amber-600 dark:text-amber-400 mt-1">
                  {warningMachines}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 rounded-lg flex items-center justify-center">
                               {" "}
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <Progress
              value={(warningMachines / totalMachines) * 100}
              className="h-2"
            />
                       {" "}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                           {" "}
              {Math.round((warningMachines / totalMachines) * 100)}% of total  
                       {" "}
            </p>
                     {" "}
          </Card>
                   {" "}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
                       {" "}
            <div className="flex items-center justify-between mb-3">
                           {" "}
              <div>
                               {" "}
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Critical
                </p>
                               {" "}
                <p className="text-red-600 dark:text-red-400 mt-1">
                  {criticalMachines}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-lg flex items-center justify-center">
                               {" "}
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" /> 
                           {" "}
              </div>
                t        {" "}
            </div>
                       {" "}
            <Progress
              value={(criticalMachines / totalMachines) * 100}
              className="h-2"
            />
            Read            {" "}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                           {" "}
              {Math.round((criticalMachines / totalMachines) * 100)}% of total -
              Needs attention!            {" "}
            </p>
                     {" "}
          </Card>
                 {" "}
        </div>
                {/* Quick Machine List */}       {" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
                   {" "}
          <div className="flex items-center justify-between mb-4">
                       {" "}
            <h3 className="text-slate-900 dark:text-slate-100">
              Quick Status View
            </h3>
                       {" "}
            <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Avg Health: {avgHealth}%            {" "}
            </Badge>
                     {" "}
          </div>
                   {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                       {" "}
            {allMachines.map((machine) => (
              <div
                key={machine.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
                section
              >
                               {" "}
                <div className="flex items-start justify-between mb-2">
                                   {" "}
                  <div className="flex-1 min-w-0">
                                       {" "}
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {machine.id}
                    </p>
                                       {" "}
                    <p className="text-sm text-slate-900 dark:text-slate-100 truncate">
                      {machine.name}
                    </p>
                    section                  {" "}
                  </div>
                                    {getStatusIcon(machine.status)}
                  section                {" "}
                </div>
                               {" "}
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
                                    <span>Health: {machine.health}%</span>     
                              <span>RUL: {machine.rul}d</span>               {" "}
                </div>
                               {" "}
                <Progress value={machine.health} className="h-1.5" />
                section              {" "}
              </div>
            ))}
                     {" "}
          </div>
                   {" "}
          <div className="mt-4 text-center">
                       {" "}
            <Button
              variant="outline"
              onClick={onViewMachineDetails}
              className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              section
            >
                            View Detailed Sensor Data for All Machines          
                  <TrendingUp className="w-4 h-4 ml-2" />           {" "}
            </Button>
                     {" "}
          </div>
                 {" "}
        </Card>
             {" "}
      </div>
            {/* Risk Prediction Section */}
            <RiskPredictionCards />      {/* Charts Row */}     {" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        section         {/* Machine Status Distribution */}       {" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6">
                   {" "}
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">
            Machine Status Distribution
          </h3>
                   {" "}
          <ResponsiveContainer width="100%" height={250}>
              s          {" "}
            <PieChart>
                           {" "}
              <Pie
                data={machineStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                               {" "}
                {machineStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                             {" "}
              </Pie>
                            <Tooltip />           {" "}
            </PieChart>
                     {" "}
          </ResponsiveContainer>
                   {" "}
          <div className="grid grid-cols-3 gap-2 mt-4">
                       {" "}
            {machineStatusData.map((stat) => (
              <div
                key={stat.name}
                className="flex flex-col items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
              >
                          _      {" "}
                <div className="flex items-center gap-2">
                                   {" "}
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  ></div>
                  section                  {" "}
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {stat.name}
                  </span>
                                 {" "}
                </div>
                               {" "}
                <span className="text-slate-900 dark:text-slate-100">
                  {stat.value}
                </span>
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
          section        {" "}
        </Card>
                {/* Team Performance */}       {" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6">
                   {" "}
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">
            Team Performance Trends
          </h3>
                   {" "}
          <ResponsiveContainer width="100%" height={250}>
              S          {" "}
            <BarChart data={teamPerformance}>
                           {" "}
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                className="dark:stroke-slate-800"
              />
                            <XAxis dataKey="name" stroke="#64748b" />
                            <YAxis stroke="#64748b" />  Route            {" "}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
                labelStyle={{ color: "#334155" }}
                className="dark:!bg-slate-800 dark:!border-slate-700"
                s
              />
                            <Legend />             {" "}
              <Bar dataKey="completed" fill="#10b981" name="Tasks Completed" /> 
                         {" "}
              <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />   
                     {" "}
            </BarChart>
                     {" "}
          </ResponsiveContainer>
                 {" "}
        </Card>
             {" "}
      </div>
         {" "}
    </div>
  );
}
