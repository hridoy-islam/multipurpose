import ErrorMessage from '@/components/shared/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axiosInstance from '@/lib/axios';
import { employmentTypes } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';
import { useSelector } from 'react-redux';

type Inputs = {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salaryrange: number;
  skillsRequired: string;
  applicationDeadline: Date;
  postedBy: string;
  status: string;
};

export default function CreateVacancy() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const response = await axiosInstance.post(`/hr/vacancy`, data);
    console.log(response);
  };

  const [selectedType, setSelectedType] = useState('');

  // watch input value by passing the name of it

  const { user } = useSelector((state: any) => state.auth);
  console.log(user._id);
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="flex flex-col space-y-2 p-2 md:p-2">
      <div className="flex flex-row space-x-6 rounded-lg bg-white p-2 shadow-sm">
        <div className=" mx-auto basis-5/6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5 pb-2">
              <div>
                <Label>Title</Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                />
                <ErrorMessage message={errors.title?.message?.toString()} />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  id="description"
                  {...register('description', {
                    required: 'Description is required'
                  })}
                ></Textarea>
                <ErrorMessage
                  message={errors.description?.message?.toString()}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  id="location"
                  {...register('location', {
                    required: 'Location is required'
                  })}
                />
                <ErrorMessage message={errors.location?.message?.toString()} />
              </div>

              <div>
                <Label>EmploymentType</Label>
                <Controller
                  name="employmentType"
                  control={control}
                  rules={{ required: 'Employment Type is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="employmentType">
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <ErrorMessage
                  message={errors.employmentType?.message?.toString()}
                />
              </div>

              <div>
                <Label>Salary Range</Label>
                <Input
                  id="salaryrange"
                  {...register('salaryrange', {
                    required: 'Salary Range is required'
                  })}
                />
                <ErrorMessage
                  message={errors.salaryrange?.message?.toString()}
                />
              </div>

              <div>
                <Label>Skills</Label>
                <Input
                  id="skillsRequired"
                  {...register('skillsRequired', {
                    required: 'Skills are required'
                  })}
                />
                <ErrorMessage
                  message={errors.skillsRequired?.message?.toString()}
                />
              </div>

              <div>
                <Label>Application Deadline</Label>
                <Input
                  type="date"
                  id="applicationDeadline"
                  {...register('applicationDeadline', {
                    required: 'Application Deadline are required'
                  })}
                />
                <ErrorMessage
                  message={errors.applicationDeadline?.message?.toString()}
                />
              </div>
              <div>
                <Label>Posted By</Label>
                <Input
                  id="postedBy"
                  value={user._id}
                  {...register('postedBy', {
                    required: 'Posted By is required'
                  })}
                />
                <ErrorMessage message={errors.postedBy?.message?.toString()} />
              </div>

              <div>
                <Label>Status</Label>
                <Input
                  id="status"
                  {...register('status', {
                    required: 'Status By is required'
                  })}
                />
                <ErrorMessage message={errors.status?.message?.toString()} />
              </div>

              <input
                type="submit"
                className="w-32 border-none  bg-supperagent text-white hover:bg-supperagent/90"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
