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

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import moment from 'moment';

const generalInfoSchema = z.object({
  availableFrom: z.date({
    required_error: 'Available from date is required'
  }),
  startDate: z.date({
    required_error: 'Start date is required'
  }),
  wtrDocumentUrl: z.string().url().optional(),
  area: z.string().min(1, { message: 'Area is required' }),
  isFullTime: z.boolean().optional(),
  carTravelAllowance: z.boolean().optional(),
  employmentType: z.string().min(1, { message: 'Employment type is required' }),
  rightToWork: z.object({
    hasExpiry: z.boolean().refine((val) => val !== undefined, {
      message: 'Right to work expiry is required'
    }),
    expiryDate: z.date().optional()
  }),
  payroll: z.object({
    payrollNumber: z.string().min(1, { message: 'Payroll number is required' }),
    paymentMethod: z.string().min(1, { message: 'Payment method is required' })
  })
});

type GeneralInfoData = z.infer<typeof generalInfoSchema>;

interface GeneralInfoStepProps {
  defaultValues?: Partial<GeneralInfoData>;
  onSaveAndContinue: (data: GeneralInfoData) => void;
  onSave: (data: GeneralInfoData) => void;
}

export function GeneralInformation({
  defaultValues,
  onSaveAndContinue,
  onSave
}: GeneralInfoStepProps) {
  const { user } = useSelector((state: any) => state.auth);

  const { id } = useParams();

  const form = useForm<GeneralInfoData>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      availableFrom: defaultValues?.availableFrom
        ? new Date(defaultValues.availableFrom)
        : new Date(), // z.date() expects a Date, not a string

      startDate: defaultValues?.startDate
        ? new Date(defaultValues.startDate)
        : new Date(), // same reason

      wtrDocumentUrl: defaultValues?.wtrDocumentUrl || '',

      area: defaultValues?.area || '',

      isFullTime: defaultValues?.isFullTime ?? false, // optional boolean

      carTravelAllowance: defaultValues?.carTravelAllowance ?? false, // optional boolean

      employmentType: defaultValues?.employmentType || '',

      rightToWork: {
        hasExpiry: defaultValues?.rightToWork?.hasExpiry ?? false, // required boolean
        expiryDate: defaultValues?.rightToWork?.expiryDate
          ? new Date(defaultValues.rightToWork.expiryDate)
          : undefined // optional date
      },

      payroll: {
        payrollNumber: defaultValues?.payroll?.payrollNumber || '',
        paymentMethod: defaultValues?.payroll?.paymentMethod || ''
      }
    }
  });

  function onSubmit(data: GeneralInfoData) {
    onSaveAndContinue(data);
    console.log(data);
  }

  function handleSave() {
    const data = form.getValues() as GeneralInfoData;
    onSave(data);
  }

  //   const handleUploadComplete = (data) => {
  //     setUploadOpen(false);
  //   };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            {/* Profile Picture Upload */}
            {/* <div className="flex basis-1/6 items-center justify-start">
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
            </div> */}

            {/* Title */}

            {/* Name Fields */}
            <div className=" grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="availableFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available From</FormLabel>
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
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
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
                name="wtrDocumentUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WTR Document</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Convert to URL or handle file upload logic
                            const url = URL.createObjectURL(file);
                            field.onChange(url); // or custom upload handler
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFullTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Time?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <Input
                            type="radio"
                            value="true"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <Input
                            type="radio"
                            value="false"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                          />
                          No
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Other Fields */}
            {/* <h1 className=" text-2xl text-supperagent">Official Numbers</h1> */}
            <div>
              <FormField
                control={form.control}
                name="carTravelAllowance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Travel Allowance?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <Input
                            type="radio"
                            value="true"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <Input
                            type="radio"
                            value="false"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                          />
                          No
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="rightToWork.hasExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Right to Work Has Expiry?</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <Input
                            type="radio"
                            value="true"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <Input
                            type="radio"
                            value="false"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                          />
                          No
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rightToWork.expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Right to Work Expiry Date</FormLabel>
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
                name="payroll.payrollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payroll Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payroll.paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bank Transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="Cheque">Cheque</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
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
    </>
  );
}
