import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

export default class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, 'd MMM yyyy', { locale: this.locale });
    }
}
