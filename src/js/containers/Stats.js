import React from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts'

class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {datas: [], year: ''};
    }

    render() {
        return (
            <div className='container'>
                <div className='col-lg-12 col-md-12'>
                    <h2>Evolution du chiffre d'affaire sur l'année {this.state.year} </h2>
                    <LineChart
                        style={{backgroundColor: '#F8F8F8'}}
                        width={1250}
                        height={300}
                        data={this.state.datas}
                    >
                        <XAxis dataKey="mois"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{r: 8}} strokeWidth={3}/>
                    </LineChart>
                </div>
            </div>
        )
    }
}

export default Stats;