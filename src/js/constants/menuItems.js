import React from 'react';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import MultilineChart from '@material-ui/icons/MultilineChart';
import List from '@material-ui/icons/List';

export default [
    {
        label: 'Formulaire',
        pathname: '/',
        getIcon: () => <Create/>
    },
    {
        label: 'Comptabilité',
        pathname: '/compta',
        getIcon: () => <List/>
    },
    {
        label: 'Statistiques',
        pathname: '/stats',
        getIcon: () => <MultilineChart/>
    },
    {
        label: 'Calendrier',
        pathname: '/calendar',
        getIcon: () => <CalendarToday/>
    }
];
