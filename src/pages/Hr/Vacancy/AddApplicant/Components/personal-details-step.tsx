import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { CalendarIcon, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useSelector } from 'react-redux';
import { ImageUploader } from '@/components/shared/image-uploader';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const personalDetailsSchema = z.object({
  profilePictureUrl: z.string().url().optional(),
  title: z.string().min(1, { message: 'Please select a title' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  initial: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),

  nationalInsuranceNumber: z.string().optional(),
  nhsNumber: z.string().optional(),

  applicationDate: z.date({ required_error: 'Application date is required' }),
  availableFromDate: z.date({
    required_error: 'Available from date is required'
  }),

  employmentType: z
    .string()
    .min(1, { message: 'Please select employment type' }),
  position: z.string().min(1, { message: 'Position is required' }),
  source: z.string().min(1, { message: 'Source is required' }),
  branch: z.string().min(1, { message: 'Branch location is required' })
});

type PersonalDetailsData = z.infer<typeof personalDetailsSchema>;

interface PersonalDetailsStepProps {
  defaultValues?: Partial<PersonalDetailsData>;
  onSaveAndContinue: (data: PersonalDetailsData) => void;
  onSave: (data: PersonalDetailsData) => void;
}

export function PersonalDetailsStep({
  defaultValues,
  onSaveAndContinue,
  onSave
}: PersonalDetailsStepProps) {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { user } = useSelector((state: any) => state.auth);
  const [profileData, setProfileData] = useState<PersonalDetailsData | null>(
    null
  );
  const [uploadOpen, setUploadOpen] = useState(false);

  const { id } = useParams();

  const form = useForm<PersonalDetailsData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      firstName: defaultValues?.firstName || '',
      initial: defaultValues?.initial || '',
      lastName: defaultValues?.lastName || '',
      dateOfBirth: defaultValues?.dateOfBirth || new Date(),
      nationalInsuranceNumber: defaultValues?.nationalInsuranceNumber || '',
      nhsNumber: defaultValues?.nhsNumber || '',
      applicationDate: defaultValues?.applicationDate || new Date(),
      availableFromDate: defaultValues?.availableFromDate || new Date(),
      employmentType: defaultValues?.employmentType || '',
      position: defaultValues?.position || '',
      source: defaultValues?.source || '',
      branch: defaultValues?.branch || ''
    }
  });

  function onSubmit(data: PersonalDetailsData) {
    data.profilePictureUrl = photoFile
      ? URL.createObjectURL(photoFile)
      : undefined;
    onSaveAndContinue(data);
    console.log(data);
  }

  function handleSave() {
    const data = form.getValues() as PersonalDetailsData;
    data.profilePictureUrl = photoFile
      ? URL.createObjectURL(photoFile)
      : undefined;
    onSave(data);
  }

  const handleUploadComplete = (data) => {
    setUploadOpen(false);
  };


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <h1 className=" text-2xl text-supperagent">Personal Details</h1>
            {/* Profile Picture Upload */}
            <div className="flex basis-1/6 items-center justify-start">
              <div className="relative h-48 w-48 overflow-hidden">
                <img
                  src={
                    profileData?.imageUrl ||
                    'https://kzmjkvje8tr2ra724fhh.lite.vusercontent.net/placeholder.svg'
                  }
                  alt={`${user?.name}`}
                  className="h-full w-full object-contain"
                />

                <Button
                  size="icon"
                  variant="theme"
                  onClick={() => setUploadOpen(true)}
                  className="absolute bottom-2 right-2 z-10"
                >
                  <Camera className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Title */}

            {/* Name Fields */}
            <div className=" grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Miss">Miss</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="initial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={
                          field.value
                            ? moment(field.value).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Other Fields */}
            <h1 className=" text-2xl text-supperagent">Official Numbers</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nationalInsuranceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National Insurance Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nhsNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NHS Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Application Details */}
            <h1 className=" text-2xl text-supperagent">Application Details</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="applicationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={
                          field.value
                            ? moment(field.value).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availableFromDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available From Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        value={
                          field.value
                            ? moment(field.value).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Temp">Temp</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                className="border-none bg-supperagent text-white hover:bg-supperagent/90"
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                type="submit"
                className="border border-supperagent text-supperagent"
              >
                Save & Continue
              </Button>
            </div>
          </CardContent>
        </form>
      </Form>


      <ImageUploader
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUploadComplete={handleUploadComplete}
        entityId={id}
      />
    </>
  );
}
