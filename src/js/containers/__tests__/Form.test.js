import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Form from '../Form';
import format from "date-fns/format";

/* The dive()method returns the rendered non-DOM child of the current wrapper.
That becomes useful if your component wraps another component in something like a div element,
and what you're interested in testing is that inner component. */
const getFormWrapper = () => createShallow()(<Form/>).dive();

const initialState = {
    espValue: '',
    trValue: '',
    cbValue: '',
    totalValue: '',
    dateValue: format(new Date(), 'yyyy-MM-dd'),
    place: 'none',
    submitted: false,
    errors: {
        espValue: false,
        trValue: false,
        cbValue: false
    }
};

describe('Test Form component', () => {
    it('Renders correctly', () => {
        const wrapper = getFormWrapper();
        expect(wrapper).toMatchSnapshot();
    });

    it('Mount with correct initial state', () => {
        const wrapper = getFormWrapper();
        expect(wrapper.state()).toEqual(initialState);
    });

    it('Successfully handle onChangeValue with correct value', () => {
        const wrapper = getFormWrapper();
        const id = 'espValue';
        const value = '10.21';
        wrapper.find(`#${id}`).simulate('change', {target: { id, value }});
        expect(wrapper.state().errors[id]).toBeFalsy();
        expect(wrapper.state()[id]).toEqual(value);
    });

    it('Successfully handle onChangeValue with incorrect value', () => {
        const wrapper = getFormWrapper();
        const id = 'trValue';
        const value = '10.215'; // Only 2 numbers accepted after '.'
        wrapper.find(`#${id}`).simulate('change', {target: { id, value }});
        expect(wrapper.state().errors[id]).toBeTruthy();
        expect(wrapper.state()[id]).toEqual(value);
    });

});


