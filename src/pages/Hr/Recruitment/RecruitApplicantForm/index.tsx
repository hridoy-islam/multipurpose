import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { StepsIndicator } from './Components/step-indicator';
import { formSteps } from './Components/form-steps';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { GeneralInformation } from './Components/general-info-steps';
import { EqualityInfomation } from './Components/equality-info-steps';
import ReviewStep from './Components/review-step';
import { useNavigate, useParams } from 'react-router-dom';

import axiosInstance from '@/lib/axios';

const RecruitApplicantForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  console.log(formData);

  const { toast } = useToast();

  // Allow navigation to any step regardless of completion status
  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const markStepAsCompleted = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps((prev) => [...prev, stepId]);
    }
  };

  const handleGeneralInformationSave = (data: any) => {
    setFormData((prev) => ({ ...prev, GeneralInformation: data }));
    console.log('Saving personal details:', data);
  };

  const handleGeneralInformationSaveAndContinue = (data: any) => {
    setFormData((prev) => ({ ...prev, GeneralInformation: data }));
    markStepAsCompleted(1);
    setCurrentStep(2);
  };

  const handleEqualityInformationSave = (data: any) => {
    setFormData((prev) => ({ ...prev, EqualityInformation: data }));
    console.log('Saving personal details:', data);
  };

  const handleEqualityInformationSaveAndContinue = (data: any) => {
    setFormData((prev) => ({ ...prev, EqualityInformation: data }));
    markStepAsCompleted(2);
    setCurrentStep(3);
  };

  const { id } = useParams();
  const navigate = useNavigate();

  // submit full application
  const handleSubmit = async () => {
    // Check if all required steps are completed before final submission
    const requiredSteps = [1, 2]; // All steps except the final Terms & Submit
    const missingSteps = requiredSteps.filter(
      (step) => !completedSteps.includes(step)
    );

    if (missingSteps.length > 0) {
      // Get the names of the missing steps
      const missingStepNames = missingSteps.map(
        (stepId) =>
          formSteps.find((step) => step.id === stepId)?.label ||
          `Step ${stepId}`
      );

      toast({
        title: 'Incomplete Application',
        description: `Please complete the following sections before submitting: ${missingStepNames.join(', ')}`,
        variant: 'destructive'
      });

      // Navigate to the first incomplete step
      setCurrentStep(missingSteps[0]);
      return;
    }

    const flatData = {
      ...formData.GeneralInformation,
      ...formData.EqualityInformation
    };

    flatData.applicantId = id;

    flatData.status = 'applied';
    const response = await axiosInstance.post(`/hr/recruitment`, flatData);
    console.log(response);
    navigate(`/admin/hr/view-applicant/${id}`);

    // All steps are complete, proceed with submission
    console.log('Submitting form data:', formData);
    setFormSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <GeneralInformation
            defaultValues={formData.GeneralInformation}
            onSaveAndContinue={handleGeneralInformationSaveAndContinue}
            onSave={handleGeneralInformationSave}
          />
        );
      case 2:
        return (
          <EqualityInfomation
            defaultValues={formData.EqualityInfomation}
            onSaveAndContinue={handleEqualityInformationSaveAndContinue}
            onSave={handleEqualityInformationSave}
          />
        );
      case 3:
        return <ReviewStep formData={formData} onSubmit={handleSubmit} />;

      default:
        return (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <h2 className="mb-4 text-xl font-semibold">Step {currentStep}</h2>
            <p className="mb-4 text-gray-600">
              This step is not implemented yet.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  markStepAsCompleted(currentStep);
                  setCurrentStep((prev) =>
                    Math.min(formSteps.length, prev + 1)
                  );
                }}
              >
                Save & Continue
              </Button>
            </div>
          </div>
        );
    }
  };

  if (formSubmitted) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <AlertCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Success!</AlertTitle>
        <AlertDescription className="text-green-700">
          Your application has been submitted successfully. We will contact you
          shortly.
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="mx-auto w-full ">
      <h1 className="mb-3 text-2xl font-semibold ">Recruit Applicant</h1>

      <Card>
        <StepsIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          steps={formSteps}
          onStepClick={handleStepClick}
        />

        {renderStep()}
      </Card>
    </div>
  );
};

export default RecruitApplicantForm;
