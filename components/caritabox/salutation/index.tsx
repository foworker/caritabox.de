"use client";
import { useCallback, useEffect } from "react";
import { useCartStore } from "@/hooks";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SalutationProps = {
  type: "Versicherter" | "Pflegeperson";
};

export const Salutation = ({ type }: SalutationProps) => {
  const { setCareerData, setInsuranceData } = useCartStore();

  const handleChange = useCallback(
    (value: string) => {
      if (type === "Versicherter") {
        setInsuranceData({ ["salutation"]: value });
      }
      if (type === "Pflegeperson") {
        setCareerData({ ["salutation"]: value });
      }
    },
    [setCareerData, setInsuranceData, type],
  );

  useEffect(() => {
    handleChange(type);
  }, [handleChange, type]);

  return (
    <div>
      <p className="mb-2">Anrede</p>
      <RadioGroup
        defaultValue="Frau"
        className="flex flex-row space-x-2"
        onValueChange={(value) => handleChange(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Frau" id="frau" />
          <Label className="text-sm" htmlFor="frau">
            Frau
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Herr" id="herr" />
          <Label className="text-sm" htmlFor="herr">
            Herr
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Keine Angabe" id="keine-angabe" />
          <Label className="text-sm" htmlFor="keine-angabe">
            Keine Angabe
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
