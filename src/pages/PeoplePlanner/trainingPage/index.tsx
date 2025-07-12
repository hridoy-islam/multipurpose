import { TrainingHeader } from './components/TrainingHeader';
import { TrainingOverview } from './components/TrainingOverview';
import { DueTraining } from './components/DueTraining';
import { ProposedTraining } from './components/ProposedTraining';
import { TrainingHistory } from './components/TrainingHistory';

export const TrainingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <TrainingHeader /> */}
      
      <main >
        {/* Training Overview Stats */}
        <div className="mb-8">
          <TrainingOverview />
        </div>
        
        {/* Main Training Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Due Training */}
          <DueTraining />
          
          {/* Proposed Training */}
          <ProposedTraining />
        </div>
        
        {/* Training History */}
        <TrainingHistory />
      </main>
    </div>
  );
};