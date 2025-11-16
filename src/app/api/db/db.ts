import type { Contractor } from "../contractor/contractor";

type DB = {
    contractors: Contractor[];
};

export let db: DB = {
    contractors: [
        {
            id: "1",
            slug: "jeovanio-sousa-eletricista",
            name: "Jeovanio Sousa",
            specialty: "Eletricista",
            rating: 4.9,
            servicesAmount: 150,
            price: 250,
            location: "João Pessoa, PB",
            profile: {
                imageUrl: "https://example.com/images/john-doe.jpg",
                bio: "Eletricista experiente com mais de 15 anos de atuação na área. Dedico-me sempre a entregar um serviço de qualidade com comunicação clara e produtividade alta.",
            },
        },
    ],
};
