import React, { useContext, useState } from 'react';
import { TableBlock, TableCell, TableRow } from '../../types/content_objects/blocks';
import { mockText } from '../../mock_data/mock_utils';
import TextCOR from '../content_object_renderers/TextCOR';
import { ContentTreeContext } from '../../contexts';
import { Row, Col } from 'react-bootstrap';

type TableProps = {
    table: TableBlock,
    edit: boolean
}

function cloneTable(table: TableBlock): TableBlock {
    return JSON.parse(JSON.stringify(table));
}

function renderRow(cells: TableCell[]) {
    const cols = cells.map(cell => {
        if (cell.attributes.headerStyle) {
            return <th><TextCOR textCO={cell}/></th>;
        } else {
            return <td><TextCOR textCO={cell}/></td>;
        }
    });
    return (
        <tr>
            {cols}
        </tr>
    );
}

function fillMissing(cells: TableCell[], nrOfCells: number) {
    if (cells.length < nrOfCells) {
        const nrOfMissingCells = nrOfCells - cells.length;
        for (let i = 0; i < nrOfMissingCells; i++) {
            const text = mockText('-');
            const cell = text as TableCell;
            cells.push(cell);
        }
    }
}

function makeRow(length: number): TableCell[] {
    const cells: TableCell[] = [];
    for (let i = 0; i < length; i++) {
        const text = mockText('-');
        const cell = text as TableCell;
        cells.push(cell);
    }
    return cells;
}

export default function TableCOE(props: TableProps) {
    const rows = props.table.items;
    fillMissing(rows[rows.length - 1].items, props.table.attributes.width);

    const CTDispatcher = useContext(ContentTreeContext);
    const [focused, setFocus] = useState(false);

    function removeCol() {
        const newTable: TableBlock = cloneTable(props.table);
        newTable.attributes.width--;
        for (let i = 0; i < newTable.items.length; i++) {
            newTable.items[i].items.pop();
        }
        CTDispatcher({ id: newTable.id, value: newTable });
    }

    // TODO Funktioner för att lägga till kolumner
    function addCol() {
        const newTable: TableBlock = cloneTable(props.table);
        newTable.attributes.width++;
        for (let i = 0; i < newTable.items.length; i++) {
            newTable.items[i].items.push(mockText('-'));
        }
        CTDispatcher({ id: newTable.id, value: newTable });
    }

    function addRow() {
        const newTable: TableBlock = cloneTable(props.table);
        newTable.attributes.height++;
        const newCells = makeRow(newTable.attributes.width);
        const newRow: TableRow = {
            items: newCells,
            detailUrl: '',
            attributes: {},
            dbType: 'list',
            id: 321
        };
        newTable.items.push(newRow);
        CTDispatcher({ id: newTable.id, value: newTable });
    }

    // TODO What happens when you remove the last row?
    function removeRow() {
        const newTable: TableBlock = cloneTable(props.table);
        newTable.attributes.height--;
        newTable.items.pop();
        CTDispatcher({ id: newTable.id, value: newTable });
    }

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const currentTarget = e.currentTarget;

        // Check the newly focused element in the next tick of the event loop
        setTimeout(() => {
            // Check if the new activeElement is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
                // You can invoke a callback or add custom logic here
                setFocus(false);
            }
        }, 0);
    };

    const JSXRows = rows.map(row => renderRow(row.items));
    return (
        <>
            <div onFocus={() => setFocus(true)} onBlur={handleBlur} tabIndex={0}>
                <Row>
                    <Col className="col-11">
                        <table className="table" >
                            {JSXRows}
                        </table>
                        {(props.edit && focused) &&
                            <>
                                <button onClick={addRow}>
                            Add row
                                </button>
                                <button onClick={removeRow}>
                            Remove row
                                </button>
                            </>
                        }
                    </Col>
                    <Col className="col-1">
                        {(props.edit && focused) &&
                        <>
                            <button onClick={addCol}>
                                Add col
                            </button>
                            <button onClick={removeCol}>
                                Remove col
                            </button>
                        </>
                        }
                    </Col>
                </Row>
            </div>
        </>
    );
}
