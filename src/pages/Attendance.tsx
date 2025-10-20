import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Download
} from 'lucide-react';

// Mock attendance data
const attendanceOverview = [
  { label: 'Present Today', value: 324, icon: CheckCircle, color: 'text-success', bgColor: 'bg-success/10' },
  { label: 'Absent Today', value: 12, icon: XCircle, color: 'text-destructive', bgColor: 'bg-destructive/10' },
  { label: 'Late Arrivals', value: 6, icon: AlertCircle, color: 'text-warning', bgColor: 'bg-warning/10' },
  { label: 'On Leave', value: 8, icon: Clock, color: 'text-muted-foreground', bgColor: 'bg-muted' },
];

const leaveRequests = [
  {
    id: 1,
    employeeName: 'Sarah Johnson',
    type: 'Annual Leave',
    startDate: '2024-04-15',
    endDate: '2024-04-19',
    days: 5,
    status: 'Pending',
    reason: 'Family vacation'
  },
  {
    id: 2,
    employeeName: 'Mike Wilson',
    type: 'Sick Leave',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    days: 3,
    status: 'Approved',
    reason: 'Medical appointment'
  },
  {
    id: 3,
    employeeName: 'Emily Brown',
    type: 'Personal Leave',
    startDate: '2024-04-20',
    endDate: '2024-04-20',
    days: 1,
    status: 'Rejected',
    reason: 'Personal matters'
  },
  {
    id: 4,
    employeeName: 'David Lee',
    type: 'Annual Leave',
    startDate: '2024-04-25',
    endDate: '2024-04-30',
    days: 6,
    status: 'Approved',
    reason: 'Planned vacation'
  }
];

const recentAttendance = [
  { employee: 'John Smith', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9.0', status: 'Present' },
  { employee: 'Sarah Johnson', checkIn: '09:15 AM', checkOut: '06:15 PM', hours: '9.0', status: 'Late' },
  { employee: 'Mike Wilson', checkIn: '08:45 AM', checkOut: '05:45 PM', hours: '9.0', status: 'Present' },
  { employee: 'Emily Brown', checkIn: '-', checkOut: '-', hours: '0.0', status: 'Absent' },
  { employee: 'David Lee', checkIn: '09:00 AM', checkOut: '06:30 PM', hours: '9.5', status: 'Present' },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState('april-2024');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance & Leave</h1>
          <p className="text-muted-foreground mt-2">
            Track employee attendance and manage leave requests
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="april-2024">April 2024</SelectItem>
              <SelectItem value="march-2024">March 2024</SelectItem>
              <SelectItem value="february-2024">February 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {attendanceOverview.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {item.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${item.bgColor}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Attendance Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-success"></div>
                <span>Present Days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-destructive"></div>
                <span>Absent Days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded bg-warning"></div>
                <span>Leave Days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAttendance.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{record.employee}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>{record.hours}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          record.status === 'Present' ? 'default' :
                          record.status === 'Late' ? 'secondary' : 'destructive'
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employeeName}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        request.status === 'Approved' ? 'default' :
                        request.status === 'Pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                  <TableCell>
                    {request.status === 'Pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-success hover:text-success">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">94.5%</div>
            <div className="text-sm text-muted-foreground">This Month</div>
            <div className="text-xs text-muted-foreground mt-1">Average Attendance</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">2.1%</div>
            <div className="text-sm text-muted-foreground">Late Arrivals</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">156</div>
            <div className="text-sm text-muted-foreground">Leave Days Used</div>
            <div className="text-xs text-muted-foreground mt-1">This quarter</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}