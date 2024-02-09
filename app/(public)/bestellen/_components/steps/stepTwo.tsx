import { ChangeEvent } from "react";

import { useCartStore } from "@/hooks";

import { Seperator } from "@/components/ui/seperator";

import { Salutation } from "@/components/caritabox/salutation";
import { StepInput } from "@/components/caritabox/step-input";
import { CareInsuranceModal } from "@/components/caritabox/care-modal";
import { PflegegradRadioButtons } from "@/components/caritabox/pflegegrad-raido";

import StepButtons from "../buttons";

const StepTwo = () => {
  const { insuranceData, setInsuranceData } = useCartStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInsuranceData({ [name]: value });
  };

  const requiredFields = Object.values(insuranceData);
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm text-muted-foreground">
        Bitte geben Sie hier die Daten der pflegebedürftigen Person an.
      </p>
      <Seperator />
      <Salutation type="Versicherter" />
      <div className="grid grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
        <div>
          <StepInput
            value={insuranceData.firstName}
            id="firstName"
            name="firstName"
            label="Vorname"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.lastName}
            id="lastName"
            name="lastName"
            label="Nachname"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.street}
            id="street"
            name="street"
            label="Straße"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.houseNumber}
            id="houseNumber"
            name="houseNumber"
            label="Hausnummer"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.postCode}
            id="postCode"
            name="postCode"
            label="PLZ"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.city}
            id="city"
            name="city"
            label="Ort"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.birthDate}
            id="birthDate"
            name="birthDate"
            label="Geburtsdatum"
            type="date"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.phone}
            id="phone"
            name="phone"
            label="Telefonnummer"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <StepInput
            value={insuranceData.email}
            id="email"
            name="email"
            label="E-Mail-Adresse"
            type="email"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
        <div className="flex flex-col space-y-2">
          <div>Pflegekasse</div>
          <div className="flex flex-row items-center space-x-2">
            <div className="mr-3 text-sm">
              {insuranceData.insuranceCompany
                ? insuranceData.insuranceCompany
                : "Bitte Pflegekasse wählen"}
            </div>
            <CareInsuranceModal />
          </div>
        </div>
        <div>
          <StepInput
            id="insuranceNumber"
            name="insuranceNumber"
            label="Versichertennummer"
            value={insuranceData.insuranceNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <PflegegradRadioButtons />
      <StepButtons disabled={!isComplete} />
    </div>
  );
};

export default StepTwo;
