import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
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
        //wrapper.setState({dateValue: '2019-04-13'}); // Same selectedDate than snapshot
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
        wrapper.find(`#${id}`).simulate('change', {target: {id, value}});
        expect(wrapper.state().errors[id]).toBeFalsy();
        expect(wrapper.state()[id]).toEqual(value);
    });

    it('Successfully handle onChangeValue with incorrect value', () => {
        const wrapper = getFormWrapper();
        const id = 'trValue';
        const value = '10.215'; // Only 2 numbers accepted after '.'
        wrapper.find(`#${id}`).simulate('change', {target: {id, value}});
        expect(wrapper.state().errors[id]).toBeTruthy();
        expect(wrapper.state()[id]).toEqual(value);
    });

    it('Successfully handle onChangeValue with correct value when before value was errored', () => {
        const wrapper = getFormWrapper();
        const id = 'espValue';
        wrapper.find(`#${id}`).simulate('change', {target: {id, value: '10.251'}}); //Incorrect value
        expect(wrapper.state().errors[id]).toBeTruthy();
        wrapper.find(`#${id}`).simulate('change', {target: {id, value: '10.25'}});
        expect(wrapper.state().errors[id]).toBeFalsy();
    });

    it('Successfully handle submit with correct values', () => {
        const wrapper = getFormWrapper();
        const value = '10.25';
        wrapper.find('#espValue').simulate('change', {target: {id: 'espValue', value}});
        wrapper.find('#trValue').simulate('change', {target: {id: 'trValue', value}});
        wrapper.find('#cbValue').simulate('change', {target: {id: 'cbValue', value}});
        wrapper.find('#submit_form').simulate('click');
        const exceptedState = {
            ...initialState,
            espValue: '10.25',
            trValue: '10.25',
            cbValue: '10.25',
            totalValue: '30.75',
            submitted: true
        };
        expect(wrapper.state()).toEqual(exceptedState);
    });

    it('Successfully handle submit with an incorrect value', () => {
        const wrapper = getFormWrapper();
        wrapper.find('#espValue').simulate('change', {target: {id: 'espValue', value: '10.25'}});
        wrapper.find('#trValue').simulate('change', {target: {id: 'trValue', value: '10.25'}});
        wrapper.find('#cbValue').simulate('change', {target: {id: 'cbValue', value: '10.251'}}); //Incorrect value
        wrapper.find('#submit_form').simulate('click');
        const exceptedState = {
            ...initialState,
            espValue: '10.25',
            trValue: '10.25',
            cbValue: '10.251',
            totalValue: '',
            errors: {
                espValue: false,
                trValue: false,
                cbValue: true
            }

        };
        expect(wrapper.state()).toEqual(exceptedState);
    });

    it('Successfully handle submit with an empty value', () => {
        const wrapper = getFormWrapper();
        wrapper.find('#espValue').simulate('change', {target: {id: 'espValue', value: '10.25'}});
        wrapper.find('#trValue').simulate('change', {target: {id: 'trValue', value: '10.25'}});
        wrapper.find('#cbValue').simulate('change', {target: {id: 'cbValue', value: ''}}); //Empty value
        wrapper.find('#submit_form').simulate('click');
        const exceptedState = {
            ...initialState,
            espValue: '10.25',
            trValue: '10.25',
            cbValue: '',
            totalValue: '20.50',
            errors: {
                espValue: false,
                trValue: false,
                cbValue: true
            }

        };
        expect(wrapper.state()).toEqual(exceptedState);
    });

    it('Successfully handle onDateChange', () =>  {
        const wrapper = getFormWrapper();
        const formattedDate = format(new Date(2018, 3, 28), 'yyyy-MM-dd');
        wrapper.instance().onChangeDate(formattedDate);
        expect(wrapper.state().dateValue).toEqual(formattedDate)
    });

    it('Successfully handle onChange of Select component of place', () =>  {
        const wrapper = getFormWrapper();
        wrapper.find('#select_form').simulate('change', {target: {value: 'Bièvres'}});
        expect(wrapper.state().place).toEqual('Bièvres')
    });

});


