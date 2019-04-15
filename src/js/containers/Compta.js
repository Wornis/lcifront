import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ComptaTable from "Components/Compta/ComptaTable";
import ComptaTotalTable from "Components/Compta/ComptaTotalTable";

class Compta extends React.Component {

    constructor() {
        super();
        this.state = {
            tabValue: 0
        }
    }

    handleChange = (event, tabValue) =>
        this.setState({tabValue});

    render() {
        return (
            <div>
                <AppBar position="static"
                        style={{width: 'fit-content', margin: 'auto', marginTop: 25}}
                >
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleChange}
                        centered
                    >
                        <Tab label="Les comptes"/>
                        <Tab label="Les totaux"/>
                    </Tabs>
                </AppBar>
                {this.state.tabValue === 0 && <ComptaTable/>}
                {this.state.tabValue === 1 && <ComptaTotalTable/>}
            </div>
        );
    }
}

export default Compta;
