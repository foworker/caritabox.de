import { ChangeEvent, useState } from "react";

import { useCartStore } from "@/hooks";

import { Salutation } from "@/components/caritabox/salutation";
import { StepInput } from "@/components/caritabox/step-input";
import { Seperator } from "@/components/ui/seperator";
import { Checkbox } from "@/components/ui/checkbox";

import StepButtons from "../buttons";

const StepThree = () => {
  const { careerData, setCareerData, insuranceData } = useCartStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCareerData({ [name]: value });
  };

  const requiredFields = Object.values(careerData);
  const isComplete = requiredFields.every(Boolean);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      setCareerData({ ["street"]: insuranceData.street });
      setCareerData({ ["houseNumber"]: insuranceData.houseNumber });
      setCareerData({ ["postCode"]: insuranceData.postCode });
      setCareerData({ ["city"]: insuranceData.city });
      setCareerData({ ["phone"]: insuranceData.phone });
    }
  };
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm text-muted-foreground">
        Bitte geben Sie hier die Daten der Person an, die sich um die Pflege der
        pflegebedürftigen Person kümmert. Das kann z.B. ein Angehöriger, Freund
        oder Nachbar sein.
      </p>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="useInsured"
          onCheckedChange={(checked: boolean) => handleCheckedChange(checked)}
        />
        <label htmlFor="useInsured" className="text-sm text-muted-foreground">
          Die Pflegeperson ist wohnhaft an der gleichen Adresse wie der
          pflegebedürftige.
        </label>
      </div>
      <Seperator />
      <Salutation type="Pflegeperson" />
      <div className="grid grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
        <div>
          <StepInput
            value={careerData.firstName}
            id="firstName"
            name="firstName"
            label="Vorname"
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={careerData.lastName}
            id="lastName"
            name="lastName"
            label="Nachname"
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={careerData.street}
            id="street"
            name="street"
            label="Straße"
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={careerData.houseNumber}
            id="houseNumber"
            name="houseNumber"
            label="Hausnummer"
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={careerData.postCode}
            id="postCode"
            name="postCode"
            label="PLZ"
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={careerData.city}
            id="city"
            name="city"
            label="Ort"
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={careerData.phone}
            id="phone"
            name="phone"
            label="Telefonnummer"
            onChange={handleChange}
          />
        </div>
      </div>
      <StepButtons disabled={!isComplete} />
    </div>
  );
};

export default StepThree;
