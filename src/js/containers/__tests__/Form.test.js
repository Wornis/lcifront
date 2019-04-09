import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Form from '../Form';

const getFormWrapper = () => createShallow()(<Form/>);

describe('Test Form component', () => {
    it('renders correctly', () => {
        expect(getFormWrapper()).toMatchSnapshot();
    });
});


