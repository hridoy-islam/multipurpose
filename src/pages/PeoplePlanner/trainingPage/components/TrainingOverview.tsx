import { BookOpen, Clock, Award, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TrainingOverview = () => {
  const stats = [
    {
      title: 'Due Training',
      value: '3',
      subtext: 'requiring attention',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '2 overdue'
    },
    {
      title: 'In Progress',
      value: '2',
      subtext: 'partially completed',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      trend: 'Average 65% complete'
    },
    {
      title: 'Completed This Year',
      value: '12',
      subtext: 'training modules',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+3 from last year'
    },
    {
      title: 'Available Training',
      value: '8',
      subtext: 'optional modules',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '4 new this month'
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