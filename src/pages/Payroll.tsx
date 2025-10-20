import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Download, 
  Calculator,
  DollarSign,
  FileText,
  Calendar
} from 'lucide-react';

// Mock payroll data
const payrollRecords = [
  {
    id: 1,
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    month: 'March 2024',
    basicSalary: 75000,
    allowances: 5000,
    overtime: 1200,
    deductions: 8500,
    netPay: 72700,
    status: 'Paid',
    paidDate: '2024-03-31'
  },
  {
    id: 2,
    employeeName: 'Sarah Johnson', 
    employeeId: 'EMP002',
    month: 'March 2024',
    basicSalary: 65000,
    allowances: 4000,
    overtime: 800,
    deductions: 7200,
    netPay: 62600,
    status: 'Paid',
    paidDate: '2024-03-31'
  },
  {
    id: 3,
    employeeName: 'Mike Wilson',
    employeeId: 'EMP003',
    month: 'April 2024',
    basicSalary: 50000,
    allowances: 3000,
    overtime: 600,
    deductions: 5800,
    netPay: 47800,
    status: 'Processing',
    paidDate: null
  },
  {
    id: 4,
    employeeName: 'Emily Brown',
    employeeId: 'EMP004',
    month: 'April 2024',
    basicSalary: 55000,
    allowances: 3500,
    overtime: 0,
    deductions: 6100,
    netPay: 52400,
    status: 'Pending',
    paidDate: null
  }
];

const payrollSummary = {
  totalEmployees: 342,
  totalGrossPay: 2847230,
  totalDeductions: 287430,
  totalNetPay: 2559800,
  processingMonth: 'April 2024'
};

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('april-2024');
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground mt-2">
            Process and manage employee payroll records
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={isProcessModalOpen} onOpenChange={setIsProcessModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Process Payroll
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Process Monthly Payroll</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="payrollMonth">Select Month</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month to process" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="april-2024">April 2024</SelectItem>
                      <SelectItem value="may-2024">May 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Employees:</span>
                    <span className="font-medium">342</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Gross Pay:</span>
                    <span className="font-medium">$2,847,230</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Deductions:</span>
                    <span className="font-medium">$287,430</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>Estimated Net Pay:</span>
                    <span>$2,559,800</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsProcessModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsProcessModalOpen(false)}>
                  Process Payroll
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Payroll Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Employees
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {payrollSummary.totalEmployees}
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Gross Pay
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${payrollSummary.totalGrossPay.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <Calculator className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Deductions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${payrollSummary.totalDeductions.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <FileText className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Net Pay
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${payrollSummary.totalNetPay.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="april-2024">April 2024</SelectItem>
                <SelectItem value="march-2024">March 2024</SelectItem>
                <SelectItem value="february-2024">February 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Basic Salary</TableHead>
                <TableHead>Allowances</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.employeeName}</div>
                      <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.month}</TableCell>
                  <TableCell>${record.basicSalary.toLocaleString()}</TableCell>
                  <TableCell>${record.allowances.toLocaleString()}</TableCell>
                  <TableCell>${record.overtime.toLocaleString()}</TableCell>
                  <TableCell>${record.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">${record.netPay.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        record.status === 'Paid' ? 'default' :
                        record.status === 'Processing' ? 'secondary' : 'outline'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Payslip
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}