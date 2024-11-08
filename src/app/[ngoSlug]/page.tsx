import {FunctionComponent} from 'react';
import {DonateValueStep} from './_components/DonateValueStep';

type HomeProps = {params: {ngoSlug: string}};

const Home: FunctionComponent<HomeProps> = ({params}: HomeProps) => (
    <DonateValueStep params={params} />
);

export default Home;
