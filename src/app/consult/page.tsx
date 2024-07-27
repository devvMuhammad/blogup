"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  consultation: z.string().min(10, "Please provide more details"),
  agreeToPolicy: z
    .boolean()
    .default(false)
    .refine((val) => val === true, "You must agree to the policy"),
});
type TFormSchema = z.infer<typeof formSchema>;

export default function Component() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: TFormSchema) => {
    toast({
      title: "Your consulation has been booked!",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  return (
    <Card className="mt-20 max-w-2xl mx-auto p-6 sm:p-8 md:p-10 border-0 sm:border">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">SEO Consultation</CardTitle>
        <CardDescription>
          Fill out the form below to schedule a consultation with our SEO
          experts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
          className="grid gap-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input id="name" {...register("name")} placeholder="John Doe" />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="company" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="company"
              {...register("company")}
              placeholder="Acme Inc."
              className=" w-full"
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">
                {errors.company.message}
              </p>
            )}
          </div>
          {/* </div> */}
          <div className="space-y-1">
            <Label htmlFor="consultation" className="text-sm font-medium">
              Consultation Request
            </Label>
            <Textarea
              id="consultation"
              rows={5}
              {...register("consultation")}
              placeholder="Tell us about your SEO needs..."
            />
            {errors.consultation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.consultation.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Controller
                name="agreeToPolicy"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Checkbox
                    id="agreeToPolicy"
                    value={String(value)}
                    onCheckedChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {/* <Checkbox id="agreeToPolicy" {...register("agreeToPolicy")} /> */}
              <Label htmlFor="agreeToPolicy" className="text-sm font-medium">
                I agree to the company policy
              </Label>
            </div>
            {errors.agreeToPolicy && (
              <p className="text-red-500 text-xs">
                {errors.agreeToPolicy.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
