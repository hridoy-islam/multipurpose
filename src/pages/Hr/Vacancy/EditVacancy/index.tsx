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
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

export default function EditVacancy() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();

  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    const response = await axiosInstance.patch(`/hr/vacancy/${id}`, data);
    if (response) {
      navigate(`/admin/hr/vacancy`);
    }
    console.log(response);
  };

  const [editVacancy, setEditVacancy] = useState('');

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await axiosInstance.get(`/hr/vacancy/${id}`);
        console.log(response.data.data);
        setEditVacancy(response.data.data);
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      }
    };

    fetchVacancy();
  }, [id]);

  console.log(editVacancy)

  // watch input value by passing the name of it

  const { user } = useSelector((state: any) => state.auth);
  console.log(user._id);

  const rawNegotiable = watch('salaryRange.negotiable');
  const negotiable = rawNegotiable === 'true';

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="flex flex-col space-y-2 p-2 md:p-2">
      <h1 className="text-2xl font-semibold">Edit Vacancy</h1>
      <div className="flex flex-row space-x-6 rounded-lg bg-white p-4 shadow-sm">
        <div className=" w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 items-center gap-5 pb-2">
              <div>
                <Label>Title</Label>
                <Input
                  id="title"
                  defaultValue={editVacancy.title}
                  {...register('title', { required: 'Title is required' })}
                />
                <ErrorMessage message={errors.title?.message?.toString()} />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  id="location"
                  defaultValue={editVacancy.location}
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
                  defaultValue={editVacancy.employmentType}
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
                <Label>Skills</Label>
                <Input
                  id="skillsRequired"
                  defaultValue={editVacancy.skillsRequired}
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
                  defaultValue={editVacancy.applicationDeadline}
                  {...register('applicationDeadline', {
                    required: 'Application Deadline are required'
                  })}
                />
                <ErrorMessage
                  message={errors.applicationDeadline?.message?.toString()}
                />
              </div>

              {/* <div>
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Status Type is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">active</SelectItem>
                        <SelectItem value="closed">closed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />          
                <ErrorMessage message={errors.status?.message?.toString()} />
              </div> */}

              <div>
                <Label>Description</Label>
                <Textarea
                  id="description"
                  defaultValue={editVacancy.description}
                  className=" resize-y rounded-lg border border-gray-300  p-3 text-sm shadow-sm"
                  {...register('description', {
                    required: 'Description is required'
                  })}
                ></Textarea>
                <ErrorMessage
                  message={errors.description?.message?.toString()}
                />
              </div>

              <div>
                <Label>Salary Range</Label>

                <div>
                  <label className="mb-1 block text-sm">
                    Is the salary negotiable?
                  </label>
                  <div className="mb-4 flex gap-4">
                    <label className="flex items-center gap-2">
                      <Input
                        type="radio"
                        value="true"
                        defaultValue={editVacancy?.salaryRange?.negotiable}
                        {...register('salaryRange.negotiable', {
                          required: true
                        })}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <Input
                        type="radio"
                        value="false"
                        defaultValue={editVacancy?.salaryRange?.negotiable}
                        {...register('salaryRange.negotiable', {
                          required: true
                        })}
                      />
                      No
                    </label>
                  </div>

                  {negotiable === false && (
                    <div className="flex items-center gap-3">
                      <label className="mb-1 block font-medium">Min</label>
                      <Input
                        type="number"
                        defaultValue={editVacancy?.salaryRange?.min}
                        className="mb-2 w-full border px-2 py-1"
                        {...register('salaryRange.min', {
                          valueAsNumber: true,
                          required: 'Minimum salary is required'
                        })}
                      />
                      {errors.salaryRange?.min && (
                        <p className="text-sm text-red-500">
                          {errors.salaryRange.min.message}
                        </p>
                      )}

                      <label className="mb-1 block font-medium">Max</label>
                      <Input
                        type="number"
                        defaultValue={editVacancy?.salaryRange?.max}
                        className="mb-2 w-full border px-2 py-1"
                        {...register('salaryRange.max', {
                          valueAsNumber: true,
                          required: 'Maximum salary is required'
                        })}
                      />
                      {errors.salaryRange?.max && (
                        <p className="text-sm text-red-500">
                          {errors.salaryRange.max.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className=" border-none bg-supperagent text-white hover:bg-supperagent/90"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
