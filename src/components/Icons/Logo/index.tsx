import Image from "next/image";
import { FunctionComponent } from "react";

export const Logo: FunctionComponent = () => (
    <div
        role="img"
        aria-label="Logo do calend"
        className="flex items-center gap-2"
    >
        <Image
            src="/img/logo.svg"
            alt="Logo do calend"
            width={55}
            height={21}
        />
    </div>
);
