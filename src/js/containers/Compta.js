import React, {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ComptaTable from "Components/Compta/ComptaTable";
import ComptaTotalTable from "Components/Compta/ComptaTotalTable";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {fetchComptaDatas} from "Actions/compta";
import {toast} from "react-toastify";

class Compta extends React.Component {
    constructor() {
        super();
        this.state = {
            tabValue: 0
        };
    }

    componentDidMount() {
        this.props.fetchComptaDatas({month:11, year:2016});
    }

    componentWillReceiveProps(nextProps) {
        this.triggerNeededToasts(nextProps);
    }

    triggerNeededToasts = (nextProps) => {
        if (nextProps.error)
            return toast.error(`❌ ${nextProps.error}`);
    };

    handleChange = (event, tabValue) =>
        this.setState({tabValue});

    render() {
        return (
            <>
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
                {this.state.tabValue === 0 && <ComptaTable recettes={this.props.recettes}/>}
                {this.state.tabValue === 1 && <ComptaTotalTable totaux={this.props.totaux}/>}
            </>
        );
    }
}

const mapStateToProps = state => ({...state.compta});

const mapDispatchToProps = dispatch => bindActionCreators({fetchComptaDatas}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Compta);
