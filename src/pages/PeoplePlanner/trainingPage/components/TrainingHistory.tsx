import { Award, Calendar, Clock, Download, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const TrainingHistory = () => {
  const completedTraining = [
    {
      id: 1,
      title: 'Customer Service Fundamentals',
      completedDate: 'Dec 15, 2023',
      duration: '2 hours',
      score: '95%',
      certificate: true,
      type: 'mandatory',
      instructor: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Workplace Safety Basics',
      completedDate: 'Dec 10, 2023',
      duration: '1.5 hours',
      score: '88%',
      certificate: true,
      type: 'mandatory',
      instructor: 'Mike Chen'
    },
    {
      id: 3,
      title: 'Product Knowledge: Electronics',
      completedDate: 'Dec 5, 2023',
      duration: '3 hours',
      score: '92%',
      certificate: true,
      type: 'optional',
      instructor: 'Lisa Wong'
    },
    {
      id: 4,
      title: 'Time Management Skills',
      completedDate: 'Nov 28, 2023',
      duration: '1 hour',
      score: '90%',
      certificate: false,
      type: 'optional',
      instructor: 'David Smith'
    },
    {
      id: 5,
      title: 'Communication Excellence',
      completedDate: 'Nov 20, 2023',
      duration: '2.5 hours',
      score: '96%',
      certificate: true,
      type: 'mandatory',
      instructor: 'Sarah Johnson'
    }
  ];

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 90) return 'text-green-600';
    if (numScore >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTypeColor = (type: string) => {
    return type === 'mandatory' 
      ? 'bg-red-100 text-red-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-green-500" />
          Training History
          <Badge className="bg-green-100 text-green-800 ml-2">
            {completedTraining.length} Completed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">Training Performance</h4>
                <p className="text-sm text-green-600">Average Score: 92.2% • 4 Certificates Earned</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export History
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Certificate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTraining.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.title}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(training.type)}>
                      {training.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {training.completedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      {training.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getScoreColor(training.score)}`}>
                      {training.score}
                    </span>
                  </TableCell>
                  <TableCell>{training.instructor}</TableCell>
                  <TableCell>
                    {training.certificate ? (
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};