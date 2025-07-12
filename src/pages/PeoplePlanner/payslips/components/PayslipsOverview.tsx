import { DollarSign, Calendar, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PayslipsOverview = () => {
  const stats = [
    {
      title: 'Latest Payslip',
      value: 'December 2023',
      subtext: 'Available now',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'On time'
    },
    {
      title: 'Gross Pay (Dec)',
      value: '£2,850.00',
      subtext: 'before deductions',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+5% from Nov'
    },
    {
      title: 'Net Pay (Dec)',
      value: '£2,280.00',
      subtext: 'take home pay',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'After tax & NI'
    },
    {
      title: 'Available Payslips',
      value: '12',
      subtext: 'this year',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: 'All accessible'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mb-1">{stat.subtext}</p>
            <p className="text-xs text-gray-400">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};