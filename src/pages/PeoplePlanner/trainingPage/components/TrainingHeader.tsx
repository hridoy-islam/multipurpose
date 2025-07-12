import { BookOpen, Calendar, Award, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TrainingHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Training Module</h1>
            <p className="text-gray-600">Complete mandatory training and track your progress</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Card className="p-3 bg-orange-50 border-orange-200">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-orange-600" />
                <div className="text-sm">
                  <p className="font-medium text-orange-800">Due Soon</p>
                  <p className="text-orange-600">3 trainings</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-3 bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-green-600" />
                <div className="text-sm">
                  <p className="font-medium text-green-800">Completed</p>
                  <p className="text-green-600">12 this year</p>
                </div>
              </div>
            </Card>
            
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Training</SelectItem>
                  <SelectItem value="mandatory">Mandatory</SelectItem>
                  <SelectItem value="optional">Optional</SelectItem>
                  <SelectItem value="due">Due Soon</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};