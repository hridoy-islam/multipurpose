import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';
const demographicinfoSchema = z
  .object({
    // Demographic Information
    gender: z.string().min(1, "Gender is required"),
    maritalStatus: z.string().min(1, "Marital status is required"),
    ethnicOrigin: z.string().optional(),
  
    hasDisability: z.boolean(),
    disabilityDetails: z.string().optional(),
    needsReasonableAdjustment: z.boolean(),
    reasonableAdjustmentDetails: z.string().optional(),
  })
  .refine(
    (data) => {
      // Simple check: if the user has a disability, disability details must be filled in
      if (data.hasDisability && !data.disabilityDetails) {
        return false; // Require disability details if hasDisability is true
      }
      
      // Simple check: if the user needs a reasonable adjustment, the details must be filled in
      if (data.needsReasonableAdjustment && !data.reasonableAdjustmentDetails) {
        return false; // Require reasonable adjustment details if needsReasonableAdjustment is true
      }

      return true; // If both checks pass, return true
    },
    {
      message: 'Please provide disability details or reasonable adjustment details if required.',
      path: ['disabilityDetails', 'reasonableAdjustmentDetails'], // Error message points to the relevant fields
    }
  );
type DemographyData = z.infer<typeof demographicinfoSchema>;


interface AddressStepProps {
  defaultValues?: Partial<DemographyData>;
  onSaveAndContinue: (data: DemographyData) => void;
  onSave: (data: DemographyData) => void;
  onBack: () => void; // Add this prop for the back button
}

// List of countries for the dropdown
const countries = [
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'in', label: 'India' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'cn', label: 'China' },
  { value: 'jp', label: 'Japan' }
  // Add more countries as needed
];

export function DemographicInfoStep({
  defaultValues,
  onSaveAndContinue,
  onSave,
  onBack
}: AddressStepProps) {
  const form = useForm<DemographyData>({
    resolver: zodResolver(demographicinfoSchema),
     defaultValues : {
      gender: defaultValues?.gender || 'Male', // Default gender is 'Male'
      maritalStatus: defaultValues?.maritalStatus || 'Single', // Default marital status is 'Single'
      ethnicOrigin: defaultValues?.ethnicOrigin || '', // Default ethnic origin is empty
      hasDisability: defaultValues?.hasDisability || false, // Default for disability is false
      disabilityDetails: defaultValues?.disabilityDetails || '', // Default disability details are empty
      needsReasonableAdjustment: defaultValues?.needsReasonableAdjustment || false, // Default for adjustment is false
      reasonableAdjustmentDetails: defaultValues?.reasonableAdjustmentDetails || '', // Default adjustment details are empty
    }
    
  });



  // Update postal address fields when sameAsResidential changes
  // const handleSameAddressChange = (checked: boolean) => {
  //   form.setValue('sameAsResidential', checked);

  //   if (checked) {
  //     // Copy residential address to postal address
  //     form.setValue(
  //       'postalAddressLine1',
  //       form.getValues('residentialAddressLine1')
  //     );
  //     form.setValue(
  //       'postalAddressLine2',
  //       form.getValues('residentialAddressLine2')
  //     );
  //     form.setValue('postalCity', form.getValues('residentialCity'));
  //     form.setValue('postalPostCode', form.getValues('residentialPostCode'));
  //     form.setValue('postalCountry', form.getValues('residentialCountry'));
  //   }
  // };

  const hasDisability = form.watch('hasDisability');
  const needsAdjustment = form.watch('needsReasonableAdjustment');

  function onSubmit(data: DemographyData) {
    onSaveAndContinue(data);
    console.log(data)
  }

  function handleSave() {
    const data = form.getValues();
    onSave(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent  className='space-y-4'>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Demographic Information */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ethnicOrigin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethnic Origin</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ethnic background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disability Information
            <FormField
              control={form.control}
              name="hasDisability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a disability?</FormLabel>
                  <FormControl>
                    <Select  onValueChange={(value) => field.onChange(value === "1")} value={field.value ? "1" : "0"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disabilityDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disability Details</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="If yes, please specify" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

             {/* 1) Disability toggle */}
             <FormField
              control={form.control}
              name="hasDisability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a disability?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(v === '1')}
                      value={field.value ? '1' : '0'}
                    >
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 2) Show this only when hasDisability === true */}
            {hasDisability && (
              <FormField
                control={form.control}
                name="disabilityDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disability Details</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="If yes, please specify" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}


            {/* 3) Reasonable adjustment toggle */}
            <FormField
              control={form.control}
              name="needsReasonableAdjustment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Need Reasonable Adjustment?</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(v) => field.onChange(v === '1')}
                      value={field.value ? '1' : '0'}
                    >
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Yes</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4) Show this only when needsReasonableAdjustment === true */}
            {needsAdjustment && (
              <FormField
                control={form.control}
                name="reasonableAdjustmentDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adjustment Details</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="If yes, please specify" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          
          <div className="flex justify-between">
          <Button
            type="button" // ✅ Prevents form submission
            className="border-none bg-black text-white hover:bg-black/90"
            onClick={(e) => {
              e.preventDefault(); // ✅ Prevent default form behavior
              onBack();
            }}
          >
            Back
          </Button>

              <Button
                type="submit"
                className=" bg-supperagent text-white hover:bg-supperagent/90"
              >
                Save 
              </Button>
            </div>
        </CardContent>
      </form>
    </Form>
  );
}
