import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Calendar, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'Total Employees',
    value: '342',
    change: '+12 this month',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Monthly Payroll',
    value: '$847,230',
    change: '+8.2% from last month',
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    title: 'Attendance Rate',
    value: '94.5%',
    change: '+1.2% from last month', 
    icon: Calendar,
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  {
    title: 'Avg. Overtime',
    value: '12.4hrs',
    change: '-2.1hrs from last month',
    icon: Clock,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted'
  }
];

const recentActivities = [
  { action: 'Payroll processed for March 2024', user: 'System', time: '2 hours ago', status: 'completed' },
  { action: 'New employee Sarah Johnson added', user: 'HR Manager', time: '4 hours ago', status: 'info' },
  { action: 'Overtime request approved for John Smith', user: 'Team Lead', time: '6 hours ago', status: 'approved' },
  { action: 'Leave request pending for Alex Brown', user: 'Employee', time: '1 day ago', status: 'pending' },
];

const upcomingTasks = [
  { task: 'Review pending leave requests', priority: 'high', dueDate: 'Today' },
  { task: 'Process quarterly bonuses', priority: 'medium', dueDate: 'Tomorrow' },
  { task: 'Update employee handbook', priority: 'low', dueDate: 'This week' },
  { task: 'Conduct payroll audit', priority: 'high', dueDate: 'Next week' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your payroll today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-success' :
                    activity.status === 'approved' ? 'bg-primary' :
                    activity.status === 'pending' ? 'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user} • {activity.time}</p>
                  </div>
                  <Badge variant={
                    activity.status === 'completed' ? 'default' :
                    activity.status === 'pending' ? 'secondary' : 'outline'
                  } className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-destructive' :
                      task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' :
                    task.priority === 'medium' ? 'secondary' : 'outline'
                  }>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}