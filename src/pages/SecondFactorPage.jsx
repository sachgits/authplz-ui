import React from 'react';

import Centerer from '../components/Centerer';
import SecondFactorPicker from '../components/SecondFactorPicker';

// import AuthPlz from '../AuthPlz'

const SecondFactorPage = () =>
    <Centerer>
        <SecondFactorPicker u2f totp backup />
    </Centerer>;

export default SecondFactorPage;
