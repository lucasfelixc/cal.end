"use client";

import { Fragment, FunctionComponent } from "react";
import { ProtectStep } from "@/app/[contractorSlug]/_components/ProtectStep";
import { AddressDataForm } from "./AddressDataForm";

type AddressDataEditProps = { slug: string };

export const AddressDataEdit: FunctionComponent<AddressDataEditProps> = ({
    slug,
}) => (
    <ProtectStep
        slug={slug}
        requiredInfo="user"
        render={
            <Fragment>
                <h2 className="mb-3 text-center font-semibold text-lg text-gray-800 leading-7">
                    Endereço
                </h2>
                <p className="mb-6 text-center text-sm text-gray-500 leading-6">
                    Informe seu endereço abaixo
                </p>
                <AddressDataForm slug={slug} />
            </Fragment>
        }
    />
);
