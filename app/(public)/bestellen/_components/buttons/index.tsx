"use client";

import { useFormStore } from "@/hooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";

type StepButtonsProps = {
  disabled: boolean;
};

const StepButtons = ({ disabled }: StepButtonsProps) => {
  const step = useFormStore();

  return (
    <div className="mt-4 flex items-center justify-between">
      {step.step > 1 && <Button onClick={step.onHandleBack}>Zurück</Button>}
      {step.step < 4 && (
        <Button
          disabled={disabled}
          onClick={step.onHandleNext}
          className={cn("", step.step === 1 && "w-full")}
        >
          Weiter
        </Button>
      )}
      {step.step === 4 && (
        <Button disabled={disabled} onClick={() => {}} variant="caritabox">
          Kostenlos bestellen
        </Button>
      )}
    </div>
  );
};

export default StepButtons;
