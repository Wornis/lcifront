import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '90%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        margin: 'auto'
    }
});

const style = {
    cell: {
        textAlign:'center',
        fontWeight: 'bold',
        padding: '1px',
    }
};

const createData = (name, calories, fat, carbs, protein) => {
    return {name, calories, fat, carbs, protein};
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class ComptaTotalTable extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <Table padding={"none"}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{...style.cell}}>Emplacement</TableCell>
                            <TableCell style={{...style.cell, backgroundColor: '#dff0d8'}}>Especes</TableCell>
                            <TableCell style={{...style.cell, backgroundColor: '#fcf8e3'}}>Tickets Restaurants</TableCell>
                            <TableCell style={{...style.cell, backgroundColor: '#f2dede'}}>Cartes Bancaires</TableCell>
                            <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>Total</TableCell>
                            <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>Nb services</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{textAlign:'center'}}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell style={{...style.cell, backgroundColor: '#dff0d8'}}>{row.calories}</TableCell>
                                <TableCell style={{...style.cell, backgroundColor: '#fcf8e3'}}>{row.fat}</TableCell>
                                <TableCell style={{...style.cell, backgroundColor: '#f2dede'}}>{row.carbs}</TableCell>
                                <TableCell style={{...style.cell, backgroundColor: '#f5f5f5'}}>{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

ComptaTotalTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComptaTotalTable);