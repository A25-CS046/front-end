import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ClipboardList,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

const machines = [
  {
    id: "M-001",
    name: "Hydraulic Press A",
    location: "Production Floor A, Bay 2",
  },
  { id: "M-002", name: "CNC Mill B", location: "Production Floor A, Bay 5" },
  { id: "M-003", name: "Conveyor C", location: "Warehouse, Section C" },
  { id: "M-004", name: "Turbine D", location: "Production Floor B, Bay 12" },
  { id: "M-005", name: "Compressor E", location: "Utility Room, Level 1" },
];

const technicians = [
  {
    id: "TECH-001",
    name: "Ahmad Zulkifli",
    specialization: "Mechanical",
    workload: 5,
  },
  {
    id: "TECH-002",
    name: "Siti Nurhaliza",
    specialization: "Electrical",
    workload: 3,
  },
  {
    id: "TECH-003",
    name: "Budi Santoso",
    specialization: "Hydraulic",
    workload: 7,
  },
  {
    id: "TECH-004",
    name: "Dewi Lestari",
    specialization: "Pneumatic",
    workload: 4,
  },
];

const initialTickets = [
  {
    id: "TKT-2024-001",
    title: "Bearing Replacement",
    machine: "Turbine D",
    machineId: "M-004",
    location: "Production Floor B, Bay 12",
    priority: "high",
    status: "in-progress",
    assignedTo: [
      { id: "TECH-001", name: "Ahmad Zulkifli" },
      { id: "TECH-002", name: "Siti Nurhaliza" },
    ],
    description:
      "Replace worn bearings showing excessive vibration - Complex task requiring mechanical and electrical expertise",
    dueDate: "2024-11-02",
    createdAt: "2024-10-28",
    estimatedTime: "4 hours",
    parts: ["SKF Bearing 6308-2RS", "Lubricant"],
  },
  {
    id: "TKT-2024-002",
    title: "Electrical Inspection",
    machine: "CNC Mill B",
    machineId: "M-002",
    location: "Production Floor A, Bay 5",
    priority: "medium",
    status: "assigned",
    assignedTo: [{ id: "TECH-002", name: "Siti Nurhaliza" }],
    description: "Check electrical connections and wiring",
    dueDate: "2024-11-05",
    createdAt: "2024-10-29",
    estimatedTime: "2 hours",
    parts: ["Multimeter", "Wire Connectors"],
  },
  {
    id: "TKT-2024-003",
    title: "Hydraulic Fluid Change",
    machine: "Hydraulic Press A",
    machineId: "M-001",
    location: "Production Floor A, Bay 2",
    priority: "low",
    status: "completed",
    assignedTo: [{ id: "TECH-003", name: "Budi Santoso" }],
    description: "Scheduled hydraulic fluid replacement",
    dueDate: "2024-10-28",
    createdAt: "2024-10-25",
    estimatedTime: "2 hours",
    parts: ["Hydraulic Oil ISO 46", "Filter Cartridge"],
  },
  {
    id: "TKT-2024-004",
    title: "Major System Overhaul",
    machine: "Compressor E",
    machineId: "M-005",
    location: "Utility Room, Level 1",
    priority: "high",
    status: "assigned",
    assignedTo: [
      { id: "TECH-001", name: "Ahmad Zulkifli" },
      { id: "TECH-003", name: "Budi Santoso" },
      { id: "TECH-004", name: "Dewi Lestari" },
    ],
    description: "Complete system overhaul requiring multi-discipline team",
    dueDate: "2024-11-08",
    createdAt: "2024-10-30",
    estimatedTime: "8 hours",
    parts: ["Compressor Parts Kit", "Hydraulic Components", "Pneumatic Seals"],
  },
];

export default function TicketAssignment() {
  const [tickets, setTickets] = useState(initialTickets);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    title: "",
    machineId: "",
    priority: "medium",
    technicianIds: [],
    description: "",
    estimatedTime: "",
    parts: "",
  });

  const filteredTickets =
    filterStatus === "all"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filterStatus);

  const handleToggleTechnician = (techId) => {
    setFormData((prev) => ({
      ...prev,
      technicianIds: prev.technicianIds.includes(techId)
        ? prev.technicianIds.filter((id) => id !== techId)
        : [...prev.technicianIds, techId],
    }));
  };

  const handleCreateTicket = () => {
    const selectedMachine = machines.find((m) => m.id === formData.machineId);
    const selectedTechs = technicians.filter((t) =>
      formData.technicianIds.includes(t.id)
    );

    if (!selectedMachine || selectedTechs.length === 0 || !date) {
      toast.error(
        "Please fill all required fields and select at least one technician"
      );
      return;
    }

    const newTicket = {
      id: `TKT-2024-${String(tickets.length + 1).padStart(3, "0")}`,
      title: formData.title,
      machine: selectedMachine.name,
      machineId: selectedMachine.id,
      location: selectedMachine.location,
      priority: formData.priority,
      status: "assigned",
      assignedTo: selectedTechs.map((t) => ({ id: t.id, name: t.name })),
      description: formData.description,
      dueDate: format(date, "yyyy-MM-dd"),
      createdAt: format(new Date(), "yyyy-MM-dd"),
      estimatedTime: formData.estimatedTime,
      parts: formData.parts
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
    };

    setTickets([newTicket, ...tickets]);
    setIsCreateDialogOpen(false);
    setFormData({
      title: "",
      machineId: "",
      priority: "medium",
      technicianIds: [],
      description: "",
      estimatedTime: "",
      parts: "",
    });
    setDate(undefined);

    const techNames = selectedTechs.map((t) => t.name).join(", ");
    toast.success(`Ticket created and assigned to ${techNames}!`);
  };

  const handleCancelTicket = (id) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: "cancelled" } : ticket
    );
    setTickets(updatedTickets);
    toast.success("Ticket cancelled");
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/10";
      case "medium":
        return "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10";
      case "low":
        return "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      case "in-progress":
        return "border-blue-500/30 text-blue-600 dark:text-blue-400";
      case "assigned":
        return "border-purple-500/30 text-purple-600 dark:text-purple-400";
      case "pending":
        return "border-slate-500/30 text-slate-600 dark:text-slate-400";
      case "cancelled":
        return "border-red-500/30 text-red-600 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            Ticket Assignment
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Create and assign work tickets to technicians
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-blue-600 dark:text-emerald-400">
                Create New Ticket
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Ticket Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Bearing Replacement"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="machine">Machine</Label>
                  <Select
                    value={formData.machineId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, machineId: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                      <SelectValue placeholder="Select machine" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                      {machines.map((machine) => (
                        <SelectItem
                          key={machine.id}
                          value={machine.id}
                          className="text-slate-900 dark:text-slate-100"
                        >
                          {machine.name} ({machine.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                      <SelectItem
                        value="high"
                        className="text-slate-900 dark:text-slate-100"
                      >
                        High Priority
                      </SelectItem>
                      <SelectItem
                        value="medium"
                        className="text-slate-900 dark:text-slate-100"
                      >
                        Medium Priority
                      </SelectItem>
                      <SelectItem
                        value="low"
                        className="text-slate-900 dark:text-slate-100"
                      >
                        Low Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <Label>Assign To (Select one or more technicians)</Label>
                </div>
                <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50 max-h-48 overflow-y-auto">
                  {technicians.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center space-x-2 py-2"
                    >
                      <Checkbox
                        id={tech.id}
                        checked={formData.technicianIds.includes(tech.id)}
                        onCheckedChange={() => handleToggleTechnician(tech.id)}
                        className="border-slate-400 dark:border-slate-600"
                      />
                      <label
                        htmlFor={tech.id}
                        className="text-sm text-slate-900 dark:text-slate-100 cursor-pointer flex-1"
                      >
                        <span className="font-medium">{tech.name}</span>
                        <span className="text-slate-600 dark:text-slate-400 ml-2">
                          {tech.specialization} • {tech.workload} active tasks
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                {formData.technicianIds.length > 0 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                    {formData.technicianIds.length} technician(s) selected
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated-time">Estimated Time</Label>
                <Input
                  id="estimated-time"
                  placeholder="e.g., 4 hours"
                  value={formData.estimatedTime}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedTime: e.target.value })
                  }
                  className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the maintenance task in detail..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parts">Required Parts (comma separated)</Label>
                <Textarea
                  id="parts"
                  placeholder="e.g., SKF Bearing 6308-2RS, Lubricant, Seals Kit"
                  value={formData.parts}
                  onChange={(e) =>
                    setFormData({ ...formData, parts: e.target.value })
                  }
                  className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateTicket}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Create & Assign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-slate-500/10 to-slate-600/5 border-slate-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Total Tickets
            </p>
            <ClipboardList className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <p className="text-slate-900 dark:text-slate-100">{tickets.length}</p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Assigned
            </p>
            <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-slate-900 dark:text-slate-100">
            {tickets.filter((t) => t.status === "assigned").length}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              In Progress
            </p>
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-slate-900 dark:text-slate-100">
            {tickets.filter((t) => t.status === "in-progress").length}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Completed
            </p>
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-slate-900 dark:text-slate-100">
            {tickets.filter((t) => t.status === "completed").length}
          </p>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cancelled
            </p>
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-slate-900 dark:text-slate-100">
            {tickets.filter((t) => t.status === "cancelled").length}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
            className={
              filterStatus === "all"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            All
          </Button>
          <Button
            variant={filterStatus === "assigned" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("assigned")}
            className={
              filterStatus === "assigned"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            Assigned
          </Button>
          <Button
            variant={filterStatus === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("in-progress")}
            className={
              filterStatus === "in-progress"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            In Progress
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("completed")}
            className={
              filterStatus === "completed"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            Completed
          </Button>
          <Button
            variant={filterStatus === "cancelled" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("cancelled")}
            className={
              filterStatus === "cancelled"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            Cancelled
          </Button>
        </div>
      </Card>

      {/* Tickets List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-slate-900 dark:text-slate-100">
                    {ticket.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPriorityColor(ticket.priority)}`}
                  >
                    {ticket.priority}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {ticket.machine} ({ticket.machineId})
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Ticket ID: {ticket.id}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Assigned To ({ticket.assignedTo.length} tech
                    {ticket.assignedTo.length > 1 ? "s" : ""})
                  </p>
                  {ticket.assignedTo.map((tech, idx) => (
                    <p
                      key={tech.id}
                      className="text-sm text-slate-700 dark:text-slate-300"
                    >
                      {tech.name}
                      {idx < ticket.assignedTo.length - 1 && (
                        <span className="text-slate-500">, </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Location
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {ticket.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CalendarIcon className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Due Date
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {format(new Date(ticket.dueDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Estimated Time
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {ticket.estimatedTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Description
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {ticket.description}
              </p>
            </div>

            {/* Required Parts */}
            {ticket.parts.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Required Parts
                </p>
                <div className="flex flex-wrap gap-2">
                  {ticket.parts.map((part, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                    >
                      {part}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {ticket.status !== "completed" && ticket.status !== "cancelled" && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelTicket(ticket.id)}
                  className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-500/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Ticket
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
