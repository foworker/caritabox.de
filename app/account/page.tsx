import { PageHeader } from "@/app/components";

import { getCurrentUser } from "@/libs";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <PageHeader title="Kundenkonto" />
      {!currentUser?.password && (
        <section className="gradient-section">
          <div className="container mx-auto px-4 py-10 lg:px-44">
            <h3 className="mb-8 text-3xl font-medium tracking-tight">
              My Account
            </h3>

            <div>
              <p>password input</p>
              <input type="text" placeholder="password" />
              <p>button</p>
            </div>
          </div>
        </section>
      )}
      <section className="gradient-section">
        <div className="container mx-auto px-4 py-10 lg:px-44">
          <h3 className="mb-8 text-3xl font-medium tracking-tight">
            my orders
          </h3>
          <div>order list. click to detail</div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
