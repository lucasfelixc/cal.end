import { FunctionComponent } from "react";
import { Checkout as CheckoutStep } from "./_components/Checkout";

type CheckoutProps = { params: { contractorSlug: string } };

const Checkout: FunctionComponent<CheckoutProps> = ({ params }) => (
    <main className="flex flex-col w-full mb-5">
        <CheckoutStep slug={params.contractorSlug} />
    </main>
);

export default Checkout;
