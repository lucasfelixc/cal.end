import { FunctionComponent } from "react";
import { AddressDataEdit } from "./_components/AddressDataEdit";

type AddressProps = { params: { contractorSlug: string } };

const Address: FunctionComponent<AddressProps> = ({ params }) => (
    <main className="flex flex-col w-full mb-5">
        <AddressDataEdit slug={params.contractorSlug} />
    </main>
);

export default Address;
