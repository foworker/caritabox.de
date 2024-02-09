"use client";
import { useProducts } from "@/hooks";
import { FormSteps, FormStepCircle } from "./_components";
import { Spinner } from "@/components/caritabox";

const BestellenPage = () => {
  const { loading, products } = useProducts();
  return (
    <>
      <section className="-mt-12">
        <div className="container mx-auto flex flex-col space-y-8 px-4 lg:px-0">
          <h2 className="pb-12 pt-24 text-4xl font-medium tracking-tight">
            Caritabox beantragen
          </h2>
          <div className="rounded-md bg-slate-200/60 pb-9 pl-8 pr-14 pt-4 dark:bg-slate-800">
            <div className="flex items-center">
              <FormStepCircle label="Pflegetüte" count={1} />
              <FormStepCircle label="Versicherter" count={2} />
              <FormStepCircle label="Pflegeperson" count={3} />
              <FormStepCircle label="Zusammenfassung" count={4} line={false} />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10 px-4 lg:px-0">
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <Spinner />
          </div>
        )}
        {products.length > 0 && <FormSteps products={products} />}
      </section>
    </>
  );
};

export default BestellenPage;
