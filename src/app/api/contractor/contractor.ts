export type Contractor = {
    id: string;
    slug: string;
    name: string;
    specialty: string;
    servicesAmount: number;
    rating: number;
    location: string;
    profile: {
        imageUrl: string;
        bio: string;
    };
    price: 250;
};
