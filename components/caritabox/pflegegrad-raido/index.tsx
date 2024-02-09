"use client";
import { useCartStore } from "@/hooks";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CareLevelProps =
  | "Pflegegrad 1"
  | "Pflegegrad 2"
  | "Pflegegrad 3"
  | "Pflegegrad 4"
  | "Pflegegrad 5"
  | undefined;

export const PflegegradRadioButtons = () => {
  const { setInsuranceData } = useCartStore();

  const handleChange = (value: string) => {
    setInsuranceData({ ["careLevel"]: value });
  };

  return (
    <div>
      <p>Pflegegrad</p>
      <RadioGroup
        defaultValue="Pflegegrad 1"
        className="mt-4 grid w-max grid-cols-3 gap-4 md:grid-cols-5"
        onValueChange={(value) => handleChange(value)}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="rounded-md bg-slate-200 p-4 dark:bg-slate-800/80">
              <RadioGroupItem
                value={`Pflegegrad ${index + 1}`}
                id={`pflegegrad-${index + 1}`}
                className="mr-2 bg-white dark:bg-slate-800/80"
              />
              <Label
                htmlFor={`pflegegrad-${index + 1}`}
                className="cursor-pointer text-muted-foreground"
              >
                Pflegegrad {index + 1}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
