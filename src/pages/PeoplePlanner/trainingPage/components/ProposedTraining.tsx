import { BookOpen, User, Calendar, ThumbsUp, ThumbsDown, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProposedTraining = () => {
  const proposedTraining = [
    {
      id: 1,
      title: 'Advanced Sales Techniques',
      type: 'optional',
      assignedBy: 'Sarah Johnson',
      assignedDate: '2 days ago',
      status: 'pending',
      description: 'Learn advanced sales strategies and customer psychology',
      estimatedTime: '3 hours',
      benefits: ['Increase sales performance', 'Better customer relationships', 'Career advancement'],
      deadline: 'Complete by Jan 15, 2024'
    },
    {
      id: 2,
      title: 'Leadership Development',
      type: 'optional',
      assignedBy: 'Mike Chen',
      assignedDate: '1 week ago',
      status: 'accepted',
      description: 'Develop leadership skills and team management capabilities',
      estimatedTime: '4 hours',
      benefits: ['Leadership skills', 'Team management', 'Promotion readiness'],
      deadline: 'Complete by Feb 1, 2024'
    },
    {
      id: 3,
      title: 'Digital Marketing Basics',
      type: 'optional',
      assignedBy: 'Lisa Wong',
      assignedDate: '3 days ago',
      status: 'pending',
      description: 'Understanding digital marketing strategies and social media',
      estimatedTime: '2 hours',
      benefits: ['Digital skills', 'Marketing knowledge', 'Cross-department collaboration'],
      deadline: 'Complete by Jan 30, 2024'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          Proposed Training
          <Badge className="bg-blue-100 text-blue-800 ml-2">
            {proposedTraining.filter(t => t.status === 'pending').length} Pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proposedTraining.map((training) => (
            <div key={training.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{training.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{training.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Assigned by {training.assignedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {training.assignedDate}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Deadline:</strong> {training.deadline}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Estimated Time:</strong> {training.estimatedTime}
                  </p>
                </div>
                <Badge className={getStatusColor(training.status)}>
                  {training.status}
                </Badge>
              </div>
              
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h5>
                <div className="flex flex-wrap gap-1">
                  {training.benefits.map((benefit, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  View Details
                </Button>
                
                {training.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-red-600 hover:bg-red-700 text-white border-none">
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      Decline
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Accept
                    </Button>
                  </div>
                )}
                
                {training.status === 'accepted' && (
                  <Button size="sm">
                    Start Training
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};