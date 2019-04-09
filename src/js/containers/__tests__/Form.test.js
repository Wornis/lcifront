/* eslint-disable no-undef */
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import FormCalendar from '../../components/Form/FormCalendar';
import Form from '../Form';

const testSelectedDate = '2019-03-25';

const getFormWrapper = () => createShallow()(<Form/>);

const getFormCalenderWrapper = () => createShallow()(
    <FormCalendar
        selectedDate={testSelectedDate}
        onChangeDate={() => {}}
    />
);

describe('Test Form component', () => {
    it('renders correctly', () => {
        expect(getFormWrapper()).toMatchSnapshot();
    });
});

describe('Test FormCalendar component', () => {
    it('renders correctly', () => {
        expect(getFormCalenderWrapper()).toMatchSnapshot();
    });
});


