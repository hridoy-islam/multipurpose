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

// Zod validation schema for the contact information form
const contactSchema = z.object({
  // homePhone: z.string().optional(),
  // mobilePhone: z.string().optional(),
  // otherPhone: z.string().optional(),
  // email: z.string().email({ message: 'Please enter a valid email address' }),
  // address: z.string().min(1, { message: 'Address is required' }),
  // cityOrTown: z.string().min(1, { message: 'City or Town is required' }),
  // stateOrProvince: z
  //   .string()
  //   .min(1, { message: 'State or Province is required' }),
  // postCode: z.string().min(1, { message: 'Post Code is required' }),
  // country: z.string().min(1, { message: 'Country is required' })

  homePhone: z
    .string()
    .regex(/^[\d+\-\s().]+$/, { message: 'Invalid phone number' })
    .optional(),
  mobilePhone: z
    .string()
    .regex(/^[\d+\-\s().]+$/, { message: 'Invalid phone number' })
    .optional(),
  otherPhone: z
    .string()
    .regex(/^[\d+\-\s().]+$/, { message: 'Invalid phone number' })
    .optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().trim().min(1, { message: 'Address is required' }),
  cityOrTown: z.string().trim().min(1, { message: 'City or Town is required' }),
  stateOrProvince: z
    .string()
    .trim()
    .min(1, { message: 'State or Province is required' }),
  postCode: z.string().trim().min(1, { message: 'Post Code is required' }),
  country: z.string().trim().min(1, { message: 'Country is required' })
});

type ContactData = z.infer<typeof contactSchema>;

interface ContactStepProps {
  defaultValues?: Partial<ContactData>;
  onSaveAndContinue: (data: ContactData) => void;
  onSave: (data: ContactData) => void;
}

export function ContactStep({
  defaultValues,
  onSaveAndContinue,
  onSave
}: ContactStepProps) {
  const form = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      homePhone: defaultValues?.homePhone || '',
      mobilePhone: defaultValues?.mobilePhone || '',
      otherPhone: defaultValues?.otherPhone || '',
      email: defaultValues?.email || '',
      address: defaultValues?.address || '',
      cityOrTown: defaultValues?.cityOrTown || '',
      stateOrProvince: defaultValues?.stateOrProvince || '',
      postCode: defaultValues?.postCode || '',
      country: defaultValues?.country || ''
    }
  });

  function onSubmit(data: ContactData) {
    onSaveAndContinue(data);
    console.log(data);
  }

  function handleSave() {
    const data = form.getValues();
    onSave(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Contact Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="homePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobilePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Address Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cityOrTown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City or Town</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stateOrProvince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State or Province</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <div className="flex justify-end space-x-4 pb-4 pr-6">
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
      </form>
    </Form>
  );
}
