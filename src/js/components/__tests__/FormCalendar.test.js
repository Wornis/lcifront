import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import FormCalendar from 'Components/Form/FormCalendar';
import format from "date-fns/format";

describe('Test FormCalendar component', () => {
    it('Renders correctly', () => {
        const wrapper = createShallow()(
            <FormCalendar
                onChangeDate={() => {}}
                selectedDate={format(new Date(2018, 3, 25), 'yyyy-MM-dd')}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('Successfully calling onChange on changing', () => {
        const doneChange = jest.fn();
        const wrapper = createShallow()(
            <FormCalendar
                onChangeDate={doneChange}
                selectedDate={format(new Date(), 'yyyy-MM-dd')}
            />
        );
        wrapper.find(`#formCalendarDatePicker`).simulate('change', new Date());
        expect(doneChange).toBeCalledWith(format(new Date(), 'yyyy-MM-dd'));
    });
});