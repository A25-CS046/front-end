import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Shield,
  Wrench,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useUsers } from "@/hooks/useUsers";
import UserFormDialog from "@/components/UserFormDialog";

export default function UserManagement() {
  // API hook
  const {
    users,
    pagination,
    filters,
    isLoading,
    error,
    refetch,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    setSearch,
    setRoleFilter,
    setStatusFilter,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers({ initialLimit: 10 });

  // Local state for search debounce
  const [searchInput, setSearchInput] = useState("");

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  // Handlers
  const handleAddUser = useCallback(
    async (formData) => {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Name, email, and password are required");
        return;
      }

      const result = await createUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        role: formData.role,
        specialization: formData.specialization || null,
        password: formData.password,
      });

      if (result.success) {
        toast.success("User created successfully!");
        setIsAddDialogOpen(false);
      } else {
        toast.error(result.error?.message || "Failed to create user");
      }
    },
    [createUser]
  );

  const handleEditUser = useCallback(
    async (formData) => {
      if (!selectedUser) return;

      const result = await updateUser(selectedUser.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        role: formData.role,
        specialization: formData.specialization || null,
      });

      if (result.success) {
        toast.success("User updated successfully!");
        setIsEditDialogOpen(false);
        setSelectedUser(null);
      } else {
        toast.error(result.error?.message || "Failed to update user");
      }
    },
    [selectedUser, updateUser]
  );

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const result = await deleteUser(selectedUser.id);

    if (result.success) {
      toast.success("User deleted successfully!");
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    } else {
      toast.error(result.error?.message || "Failed to delete user");
    }
  };

  const openEditDialog = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Stats
  const totalUsers = pagination.total || users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const supervisorCount = users.filter((u) => u.role === "supervisor").length;
  const technicianCount = users.filter((u) => u.role === "technician").length;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            User Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={refetch}
            variant="outline"
            className="border-slate-300 dark:border-slate-600"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-200">
            {error.message || "Failed to load users"}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-linear-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Total Users
            </p>
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalUsers}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            {activeUsers} Active
          </p>
        </Card>

        <Card className="bg-linear-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Supervisors
            </p>
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {supervisorCount}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Admin Role
          </p>
        </Card>

        <Card className="bg-linear-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Technicians
            </p>
            <Wrench className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {technicianCount}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            Field Team
          </p>
        </Card>

        <Card className="bg-linear-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This Page
            </p>
            <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {users.length}
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            Page {pagination.page} of {pagination.totalPages || 1}
          </p>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
          </div>
          <Select
            value={filters.role || "all"}
            onValueChange={(value) =>
              setRoleFilter(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="technician">Technician</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              setStatusFilter(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="text-slate-700 dark:text-slate-400">
                  User
                </TableHead>
                <TableHead className="text-slate-700 dark:text-slate-400">
                  Contact
                </TableHead>
                <TableHead className="text-slate-700 dark:text-slate-400">
                  Role
                </TableHead>
                <TableHead className="text-slate-700 dark:text-slate-400">
                  Specialization
                </TableHead>
                <TableHead className="text-slate-700 dark:text-slate-400">
                  Status
                </TableHead>
                <TableHead className="text-slate-700 dark:text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-400" />
                    <p className="mt-2 text-slate-500">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Users className="w-8 h-8 mx-auto text-slate-400" />
                    <p className="mt-2 text-slate-500">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {user.email}
                          </span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {user.phone}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "supervisor"
                            ? "border-blue-500/30 text-blue-600 dark:text-blue-400"
                            : "border-amber-500/30 text-amber-600 dark:text-amber-400"
                        }
                      >
                        {user.role === "supervisor" ? (
                          <Shield className="w-3 h-3 mr-1" />
                        ) : (
                          <Wrench className="w-3 h-3 mr-1" />
                        )}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-700 dark:text-slate-300">
                        {user.specialization || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.status === "active" ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-emerald-600 dark:text-emerald-400">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-500">
                            Inactive
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(user)}
                          className="text-blue-500 hover:bg-blue-500/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(user)}
                          disabled={user.status === "inactive"}
                          className={
                            user.status === "inactive"
                              ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                              : "text-red-500 hover:bg-red-500/10"
                          }
                          title={
                            user.status === "inactive"
                              ? "User already inactive"
                              : "Delete user"
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {users.length} of {pagination.total} users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={!hasPrevPage || isLoading}
                className="border-slate-300 dark:border-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <span className="text-sm text-slate-600 dark:text-slate-400 px-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={!hasNextPage || isLoading}
                className="border-slate-300 dark:border-slate-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Add User Dialog - Separate component with its own state */}
      <UserFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        mode="create"
        onSubmit={handleAddUser}
        isLoading={isLoading}
      />

      {/* Edit User Dialog - Separate component with its own state */}
      <UserFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        initialData={selectedUser}
        onSubmit={handleEditUser}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400">
              Delete User
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-700 dark:text-slate-300">
              Are you sure you want to delete{" "}
              <strong>{selectedUser?.name}</strong>?
            </p>
            <p className="text-sm text-slate-500 mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-slate-300 dark:border-slate-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isLoading}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
