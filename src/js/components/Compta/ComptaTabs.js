import React from 'react';
import ComptaTable from "Components/Compta/ComptaTable";
import ComptaTotalTable from "Components/Compta/ComptaTotalTable";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ComptaSelectDialog from "Components/Compta/ComptaSelectDialog";

export default class ComptaTabs extends React.Component {
    constructor() {
        super();
        this.state = {
            tabValue: 0
        };
    }

    handleChange = (event, tabValue) =>
        this.setState({tabValue});

    render() {
        const {month, year, fetchComptaDatas} = this.props;
        return (
            <div style={{textAlign: 'center', marginTop: 5}}>
                <ComptaSelectDialog
                    month={month}
                    year={year}
                    fetchComptaDatas={fetchComptaDatas}
                />
                <AppBar
                    position="static"
                    style={{width: 'fit-content', margin: 'auto', marginTop: 5}}
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
                {this.state.tabValue === 0 && <ComptaTable recettes={this.props.recettes}/>}
                {this.state.tabValue === 1 && <ComptaTotalTable totaux={this.props.totaux}/>}
            </div>
        );
    }
}
