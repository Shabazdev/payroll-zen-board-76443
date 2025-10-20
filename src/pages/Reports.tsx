import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// Mock data for reports
const departmentData = [
  { name: 'Engineering', payroll: 450000, employees: 85, percentage: 35 },
  { name: 'Sales', payroll: 280000, employees: 65, percentage: 22 },
  { name: 'Marketing', payroll: 180000, employees: 35, percentage: 14 },
  { name: 'HR', payroll: 120000, employees: 25, percentage: 9 },
  { name: 'Operations', payroll: 95000, employees: 20, percentage: 8 },
];

const monthlyExpenses = [
  { month: 'Jan', amount: 780000, change: 2.5 },
  { month: 'Feb', amount: 820000, change: 5.1 },
  { month: 'Mar', amount: 847000, change: 3.3 },
  { month: 'Apr', amount: 865000, change: 2.1 },
  { month: 'May', amount: 890000, change: 2.9 },
  { month: 'Jun', amount: 912000, change: 2.5 },
];

const attendanceStats = [
  { label: 'Present', value: 88, color: 'bg-success' },
  { label: 'Absent', value: 7, color: 'bg-destructive' },
  { label: 'Late', value: 5, color: 'bg-warning' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track payroll expenses, attendance, and key HR metrics
          </p>
        </div>

        <div className="flex gap-3">
          <Select defaultValue="6-months">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">Last Month</SelectItem>
              <SelectItem value="3-months">Last 3 Months</SelectItem>
              <SelectItem value="6-months">Last 6 Months</SelectItem>
              <SelectItem value="1-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total Payroll
                </p>
                <p className="text-2xl font-bold text-foreground">$5.24M</p>
                <div className="flex items-center text-xs mt-1">
                  <ArrowUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">8.2% from last period</span>
                </div>
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
                  Active Employees
                </p>
                <p className="text-2xl font-bold text-foreground">342</p>
                <div className="flex items-center text-xs mt-1">
                  <ArrowUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">12 new hires</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Avg. Attendance
                </p>
                <p className="text-2xl font-bold text-foreground">94.5%</p>
                <div className="flex items-center text-xs mt-1">
                  <ArrowUp className="h-3 w-3 text-success mr-1" />
                  <span className="text-success">1.2% improvement</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-warning/10">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Cost per Employee
                </p>
                <p className="text-2xl font-bold text-foreground">$15.3K</p>
                <p className="text-xs text-muted-foreground mt-1">Monthly average</p>
              </div>
              <div className="p-3 rounded-full bg-muted">
                <TrendingUp className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Salary Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyExpenses.map((expense, index) => (
                <div key={expense.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{expense.month}</div>
                    <div className="flex-1">
                      <Progress 
                        value={(expense.amount / 1000000) * 100} 
                        className="h-3 w-32"
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${(expense.amount / 1000).toFixed(0)}K</div>
                    <div className={`text-xs flex items-center ${expense.change > 0 ? 'text-success' : 'text-destructive'}`}>
                      {expense.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {expense.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {attendanceStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded ${stat.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{stat.label}</span>
                      <span className="text-sm text-muted-foreground">{stat.value}%</span>
                    </div>
                    <Progress value={stat.value} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">94.5%</div>
                <div className="text-sm text-muted-foreground">Overall Attendance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Payroll Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Department Payroll Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{dept.name}</div>
                    <div className="text-sm text-muted-foreground">{dept.employees} employees</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">${(dept.payroll / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">
                    ${Math.round(dept.payroll / dept.employees).toLocaleString()}/employee
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {dept.percentage}% of total payroll
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">1,240</div>
            <div className="text-sm text-muted-foreground">Total Overtime Hours</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">98.2%</div>
            <div className="text-sm text-muted-foreground">Payroll Accuracy</div>
            <div className="text-xs text-muted-foreground mt-1">Last 6 months</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">4.2</div>
            <div className="text-sm text-muted-foreground">Avg. Processing Days</div>
            <div className="text-xs text-muted-foreground mt-1">Monthly payroll</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}