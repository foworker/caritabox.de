import { useState } from "react";

import { insurances } from "@/mock";
import { useCartStore } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CareInsuranceModal = () => {
  const { setInsuranceData } = useCartStore();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);

  const insuranceList = insurances.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleClick = (value: string) => {
    setInsuranceData({ ["insuranceCompany"]: value });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="caritabox">Auswählen</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm md:max-w-md">
        <DialogHeader>
          <DialogTitle>Pflegekasse auswählen</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6">
          <div className="my-4">
            <Input
              type="text"
              placeholder="Pflegeversicherung suchen"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex max-h-[400px] flex-col space-y-2 overflow-scroll">
            {insuranceList.map((item, index) => (
              <div
                key={index}
                className="mr-2 flex flex-row justify-between text-sm"
              >
                {item}
                <Button variant="caritabox" onClick={() => handleClick(item)}>
                  Auswählen
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
