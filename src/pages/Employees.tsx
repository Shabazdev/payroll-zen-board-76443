import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter
} from 'lucide-react';

// Mock employee data
const employees = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 75000,
    status: 'Active',
    joinDate: '2023-01-15',
    phone: '+1 (555) 123-4567'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 65000,
    status: 'Active',
    joinDate: '2023-03-22',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    salary: 50000,
    status: 'Active',
    joinDate: '2023-06-10',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.brown@company.com',
    department: 'HR',
    position: 'HR Specialist',
    salary: 55000,
    status: 'On Leave',
    joinDate: '2022-11-05',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@company.com',
    department: 'Engineering',
    position: 'DevOps Engineer',
    salary: 80000,
    status: 'Active',
    joinDate: '2023-02-28',
    phone: '+1 (555) 567-8901'
  }
];

type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  status: string;
  joinDate: string;
  phone: string;
};

export default function Employees() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeList, setEmployeeList] = useState(employees);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: ''
  });

  const filteredEmployees = employeeList.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(employeeList.map(emp => emp.department))];

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      department: employee.department,
      salary: employee.salary.toString()
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      setEmployeeList(employeeList.filter(emp => emp.id !== selectedEmployee.id));
      toast({
        title: "Employee deleted",
        description: `${selectedEmployee.name} has been removed from the system.`,
      });
      setIsDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleUpdateEmployee = () => {
    if (selectedEmployee) {
      const updatedEmployee = {
        ...selectedEmployee,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        department: formData.department,
        salary: parseFloat(formData.salary)
      };
      
      setEmployeeList(employeeList.map(emp => 
        emp.id === selectedEmployee.id ? updatedEmployee : emp
      ));
      
      toast({
        title: "Employee updated",
        description: `${formData.name}'s information has been updated successfully.`,
      });
      
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleAddEmployee = () => {
    const newEmployee: Employee = {
      id: Math.max(...employeeList.map(e => e.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      department: formData.department,
      salary: parseFloat(formData.salary),
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setEmployeeList([...employeeList, newEmployee]);
    
    toast({
      title: "Employee added",
      description: `${formData.name} has been added to the system.`,
    });
    
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: ''
    });
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: ''
    });
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members and their information
          </p>
        </div>

        <Button onClick={openAddModal} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  placeholder="Job title"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary</Label>
                <Input 
                  id="salary" 
                  type="number" 
                  placeholder="50000"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>
                Add Employee
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>${employee.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(employee)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(employee)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Full Name</Label>
                <p className="font-medium">{selectedEmployee.name}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{selectedEmployee.email}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Phone</Label>
                <p className="font-medium">{selectedEmployee.phone}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Position</Label>
                <p className="font-medium">{selectedEmployee.position}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Department</Label>
                <p className="font-medium">{selectedEmployee.department}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Annual Salary</Label>
                <p className="font-medium">${selectedEmployee.salary.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Status</Label>
                <Badge variant={selectedEmployee.status === 'Active' ? 'default' : 'secondary'}>
                  {selectedEmployee.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Join Date</Label>
                <p className="font-medium">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Full Name</Label>
              <Input 
                id="editName" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input 
                id="editEmail" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Phone</Label>
              <Input 
                id="editPhone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPosition">Position</Label>
              <Input 
                id="editPosition"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDepartment">Department</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editSalary">Annual Salary</Label>
              <Input 
                id="editSalary" 
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEmployee}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedEmployee?.name} from the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}