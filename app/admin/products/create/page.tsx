"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { PageHeader } from "@/app/components";
import { FileUpload } from "@/components/caritabox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzoneUpload } from "@/hooks";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  optionGroups: z.array(z.string()).nullable(),
});
const optionGroups = [
  {
    id: "6547976ba0254d99bbe769d8",
    label: "Größe",
  },
  {
    id: "654797cca0254d99bbe769da",
    label: "Material",
  },
] as const;

const ProductCreate = () => {
  const router = useRouter();
  const productImage = useDropzoneUpload();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      price: "",
      unit: "",
      optionGroups: [],
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
      const response = await axios.post("/api/products", values);
      router.push("/admin/products");
      toast.success("Product created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <PageHeader title="Add new product" />
      <section className="gradient-section">
        <div className="container mx-auto px-4 pb-10 lg:px-44">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-8"
            >
              <div className="relative">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Product Image
                </Label>
                {productImage.url ? (
                  <div className="flex h-60">
                    <Image
                      alt="Upload"
                      fill
                      className="rounded-md object-contain"
                      src={productImage.url}
                    />
                  </div>
                ) : (
                  <FileUpload
                    endpoint="productImage"
                    onChange={(url) => {
                      if (url) {
                        form.setValue("imageUrl", url);
                        productImage.setUrl(url);
                      }
                    }}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Sample Product'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Sample Product Description'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        disabled={isSubmitting}
                        placeholder="e.g. 19,90"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Required to calculate the quantity of the product in the
                      basket!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Unit</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 10 Unit, 25 Stück etc"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is shown in the description field when adding the
                      produc to the basket.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="optionGroups"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Option Groups</FormLabel>
                      <FormDescription>
                        Choose if there are product options.
                      </FormDescription>
                    </div>
                    {optionGroups.map((group) => (
                      <FormField
                        key={group.id}
                        control={form.control}
                        name="optionGroups"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={group.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(group.id)}
                                  onCheckedChange={(checked) => {
                                    const newValue = Array.isArray(field.value)
                                      ? field.value
                                      : [];
                                    return checked
                                      ? field.onChange([...newValue, group.id])
                                      : field.onChange(
                                          newValue.filter(
                                            (value) => value !== group.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {group.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
      <div className="mb-5" />
    </>
  );
};

export default ProductCreate;
