import React from 'react';

import {createDevTools} from 'redux-devtools';
// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
        defaultIsVisible={true}>
        <FilterMonitor>
            <LogMonitor/>
        </FilterMonitor>
    </DockMonitor>
);
export default DevTools;
