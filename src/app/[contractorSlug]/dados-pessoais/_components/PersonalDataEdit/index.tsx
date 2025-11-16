"use client";

import { Fragment, FunctionComponent } from "react";
import { ProtectStep } from "@/app/[contractorSlug]/_components/ProtectStep";
import { PersonalDataForm } from "./PersonalDataForm";

type PersonalDataEditProps = { slug: string };

export const PersonalDataEdit: FunctionComponent<PersonalDataEditProps> = ({
    slug,
}) => (
    <ProtectStep
        slug={slug}
        requiredInfo="service"
        render={
            <Fragment>
                <h2 className="mb-3 text-center font-semibold text-lg text-gray-800 leading-7">
                    Dados pessoais
                </h2>
                <p className="mb-6 text-center text-sm text-gray-500 leading-6">
                    Informe seus dados abaixo
                </p>
                <PersonalDataForm slug={slug} />
            </Fragment>
        }
    />
);
