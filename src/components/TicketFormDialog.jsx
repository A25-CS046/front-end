import { useState, useEffect } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

/**
 * Ticket Form Dialog with isolated form state
 * Prevents parent re-renders when typing
 */
export default function TicketFormDialog({
  open,
  onOpenChange,
  onSubmit,
  machines = [],
  technicians = [],
}) {
  const [formData, setFormData] = useState({
    title: "",
    machineId: "",
    priority: "medium",
    technicianIds: [],
    description: "",
    estimatedTime: "",
    parts: "",
  });
  const [date, setDate] = useState("");

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        machineId: "",
        priority: "medium",
        technicianIds: [],
        description: "",
        estimatedTime: "",
        parts: "",
      });
      setDate("");
    }
  }, [open]);

  const handleToggleTechnician = (techId) => {
    setFormData((prev) => ({
      ...prev,
      technicianIds: prev.technicianIds.includes(techId)
        ? prev.technicianIds.filter((id) => id !== techId)
        : [...prev.technicianIds, techId],
    }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, dueDate: date });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-600 dark:text-emerald-400">
            Create New Ticket
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Ticket Title <span className="text-red-500">*</span>
            </Label>
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
              <Label htmlFor="machine">
                Machine <span className="text-red-500">*</span>
              </Label>
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
              <Label>
                Assign To <span className="text-red-500">*</span>
                <span className="font-normal text-slate-500 ml-1">
                  (Select one or more technicians)
                </span>
              </Label>
            </div>
            <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50 max-h-48 overflow-y-auto">
              {technicians.map((tech) => (
                <div key={tech.id} className="flex items-center space-x-2 py-2">
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
            <Label htmlFor="due-date">
              Due Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="due-date"
              type="date"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
            />
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
            onClick={() => onOpenChange(false)}
            className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Create & Assign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
