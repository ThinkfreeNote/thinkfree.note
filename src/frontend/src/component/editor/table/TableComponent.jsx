import React, {useContext, useState} from 'react';
import TableRow from "./TableRow";
import {Table} from "../../../model/Table";
import {TableSelectorSetContext} from "./contexts/TableSelectorProvider";

function TableComponent({data}) {
    const [state, setState] = useState(0);
    const {setCol,setRow} = useContext(TableSelectorSetContext);

    const addColumn = () => {
        if (data instanceof Table) {
            data.addColumn();
            setState(prev => prev + 1);
        }
    }
    const addRow = () => {
        if (data instanceof Table) {
            data.addRow();
            setState(prev => prev + 1);
        }
    }

    const mouseOutHandler =  (e) => {
        setCol(-1);
        setRow(-1);
    }

    return (
        <div className={"table"} onMouseOut={mouseOutHandler}>
            <div style={{position: "relative"}}>
                <table>
                    <thead>
                    </thead>
                    <tbody>
                    {data.contents.map((item, idx) => <TableRow key={item} data={data.rows[item]} rowId={item}
                                                                format={data.format} rowIdx={idx}/>)}
                    </tbody>
                </table>
                <button onClick={addColumn} contentEditable={false} className="btn_add btn_add_column">+</button>
                <button onClick={addRow} contentEditable={false} className="btn_add btn_add_row">+</button>
            </div>
        </div>
    );
}

export default TableComponent;