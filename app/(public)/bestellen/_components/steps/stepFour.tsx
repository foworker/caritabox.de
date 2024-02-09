import dayjs from "dayjs";

import { useCartStore } from "@/hooks";

import { Label } from "@/components/ui/label";
import { Seperator } from "@/components/ui/seperator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ClientSignature } from "@/components/caritabox/signature";

import StepButtons from "../buttons";
import Image from "next/image";

const StepFour = () => {
  const { insuranceData, careerData, cart } = useCartStore();
  return (
    <div className="flex flex-col space-y-6">
      <p className="text-sm text-muted-foreground">
        Bitte unterschreiben Sie nach Prüfung Ihrer Angaben. Die Unterschrift
        benötigen wir für die Beantragung bei Ihrer Pflegekasse.
      </p>
      <Seperator />
      <div className="grid grid-cols-2 gap-6 md:gap-x-8 md:gap-y-6">
        <div className="flex flex-col space-y-6 text-sm">
          <h3 className="text-xl">Pflegebedürftige Person</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>
              {insuranceData.salutation} {insuranceData.firstName}{" "}
              {insuranceData.lastName}
            </p>
            <p>
              {insuranceData.postCode} {insuranceData.street}{" "}
              {insuranceData.houseNumber}
            </p>
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p>geb. am {dayjs(insuranceData.birthDate).format("DD.MM.YYYY")}</p>
            <p>{insuranceData.careLevel}</p>
            <p>
              {insuranceData.insuranceCompany} {insuranceData.insuranceNumber}
            </p>
          </div>
          <p className="text-muted-foreground">Tel: {insuranceData.phone}</p>
          <p className="text-muted-foreground">
            {insuranceData.insuranceCompany}
          </p>
        </div>
        <div className="flex flex-col space-y-6 text-sm">
          <h3 className="text-xl">Ihre Pflegehilfsmittel</h3>
          {cart.map((product) => (
            <div
              key={product.id}
              className="mb-4 flex flex-row items-center justify-between gap-x-4"
            >
              <div>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={68}
                  height={68}
                  className="rounded-sm"
                />
              </div>
              <div className="flex-1">{product.title}</div>
              <div>
                {product.qty * product.count} {product.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Seperator />
      <div className="flex flex-col space-y-6">
        <h3 className="text-xl">
          An welche Adresse sollen die Pflegehilfsmittel geliefert werden?
        </h3>
        <RadioGroup className="text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="insurance" id="career" />
            <Label htmlFor="career">
              {insuranceData.salutation} {insuranceData.firstName}{" "}
              {insuranceData.lastName} {insuranceData.street}{" "}
              {insuranceData.houseNumber} {insuranceData.city}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="career" id="career" />
            <Label htmlFor="career">
              {careerData.salutation} {careerData.firstName}{" "}
              {careerData.lastName} {careerData.street} {careerData.houseNumber}{" "}
              {careerData.city}
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Seperator />
      <ClientSignature />
      <StepButtons disabled={false} />
    </div>
  );
};

export default StepFour;
