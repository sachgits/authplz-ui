import React from 'react';

import { SecondFactorPicker } from './SecondFactorPicker';

// import AuthPlz from '../AuthPlz'

const SecondFactorPage = () =>
    <div>
        <SecondFactorPicker u2f totp backup />
    </div>;

export default SecondFactorPage;
