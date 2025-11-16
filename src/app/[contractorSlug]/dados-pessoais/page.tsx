import { FunctionComponent } from "react";
import { PersonalDataEdit } from "./_components/PersonalDataEdit";

type PersonalDataProps = { params: { contractorSlug: string } };

const PersonalData: FunctionComponent<PersonalDataProps> = ({ params }) => (
    <main className="flex flex-col w-full mb-5">
        <PersonalDataEdit slug={params.contractorSlug} />
    </main>
);

export default PersonalData;
