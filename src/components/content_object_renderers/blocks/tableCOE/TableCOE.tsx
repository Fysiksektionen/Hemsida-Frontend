import React, { useContext, useState } from 'react';
import { TableBlock, TableCell, TableRow } from '../../../../types/content_objects/blocks';
import { mockText } from '../../../../mock_data/mock_utils';
import { ContentTreeContext, getUniqueId } from '../../../../contexts';
import { Col, Row } from 'react-bootstrap';
import TableButtons from './TableButtons';
import CheckboxList from './CheckboxList';
import RichTextCOR from '../RichTextCOR';

type TableProps = {
    table: TableBlock,
    edit: boolean
}

export function makeDefaultCell(): TableCell {
    const txt = mockText('<p>Skriv här!</p>', getUniqueId());
    txt.attributes = {
        blockType: 'heading',
        richTextEditorType: 'only-marks'
    };
    return txt as TableCell;
}

/**
 * Right now the TableCell type is equal to richtext type so this function does not do much. But if the TableCell becomes
 * more specialized then we only have to tweak this function.
 * @param props
 * @constructor
 */
function MakeRichText(props: {cell: TableCell}) {
    return <RichTextCOR content={props.cell}/>;
}

/**
 * Performs deep clone of the table
 * @param table
 */
function cloneTable(table: TableBlock): TableBlock {
    return JSON.parse(JSON.stringify(table));
}

function RenderRow(props: {cells: TableRow}) {
    const cols = props.cells.items.map(cell => {
        return <td key={cell.id}><MakeRichText cell={cell}/></td>;
    });
    return (
        <tr>
            {cols}
        </tr>
    );
}

/**
 * Appends tableCells to cells if the list contains fewer cells than nrOfCells specifies.
 * @param cells
 * @param nrOfCells
 */
function fillMissing(cells: TableCell[], nrOfCells: number) {
    if (cells.length < nrOfCells) {
        const nrOfMissingCells = nrOfCells - cells.length;
        for (let i = 0; i < nrOfMissingCells; i++) {
            cells.push(makeDefaultCell());
        }
    }
}

/**
 * Creates tableCell list of default cells
 * @param length
 */
function makeRow(length: number): TableCell[] {
    const cells: TableCell[] = [];
    for (let i = 0; i < length; i++) {
        cells.push(makeDefaultCell());
    }
    return cells;
}

/**
 * Renders an editable table with various css stylings.
 * @param props
 * @constructor
 */
export default function TableCOE(props: TableProps) {
    const rows = props.table.items;
    // Security measure to make sure each row is width long. Maybe it would be good to trip lists that are too long or
    // maybe this feature is unnecessary.
    fillMissing(rows[rows.length - 1].items, props.table.attributes.width);

    const CTDispatcher = useContext(ContentTreeContext);

    // ---- Functions that dispatch and updates the table ----
    /**
     * Dispatches a table with one less column
     */
    function removeCol() {
        if (props.table.attributes.width > 1) {
            const newTable: TableBlock = cloneTable(props.table);
            newTable.attributes.width--;
            for (let i = 0; i < newTable.items.length; i++) {
                newTable.items[i].items.pop();
            }
            CTDispatcher({ id: newTable.id, value: newTable });
        }
    }

    /**
     * Dispatches a table with one more column
     */
    function addCol() {
        const newTable: TableBlock = cloneTable(props.table);
        newTable.attributes.width++;
        for (let i = 0; i < newTable.items.length; i++) {
            newTable.items[i].items.push(makeDefaultCell());
        }
        CTDispatcher({ id: newTable.id, value: newTable });
    }

    /**
     * Dispatches a table with one more row
     */
    function addRow() {
        const newTable: TableBlock = cloneTable(props.table);
        newTable.attributes.height++;
        const newCells = makeRow(newTable.attributes.width);
        const newRow: TableRow = {
            items: newCells,
            detailUrl: '',
            attributes: {},
            dbType: 'list',
            id: getUniqueId()
        };
        newTable.items.push(newRow);
        CTDispatcher({ id: newTable.id, value: newTable });
    }

    /**
     * Dispatches a table with one less row
     */
    function removeRow() {
        if (props.table.attributes.height > 1) {
            const newTable: TableBlock = cloneTable(props.table);
            newTable.attributes.height--;
            newTable.items.pop();
            CTDispatcher({ id: newTable.id, value: newTable });
        }
    }

    /**
     * Dispatches a new table with new css classes
     * @param newClasses set of css classes that should be active
     */
    function updateCssClasses(newClasses: Set<string>) {
        const newTable: TableBlock = cloneTable(props.table);
        // Active css classes are saved as a dict since dicts are more standard to serialize which is when stored in
        // a database.
        const newClassesDict : {[_: string]: null} = {};
        newClasses.forEach(value => { newClassesDict[value] = null; });
        newTable.attributes.cssClasses = newClassesDict;
        CTDispatcher({ id: newTable.id, value: newTable });
    }
    /// ---- End of dispatch functions ----

    const [focused, setFocus] = useState(false);
    /**
     * Only sets focus state to false if the table lost focus to an element that is not a child
     * @param e
     */
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const currentTarget = e.currentTarget;
        // Check the newly focused element in the next tick of the event loop
        setTimeout(() => {
            // Check if the new activeElement is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
                setFocus(false);
            }
        }, 0);
    };

    const JSXRows = rows.map(row => <RenderRow key={row.id} cells={row}/>);
    const tableCss = 'table ' + Object.keys(props.table.attributes.cssClasses).join(' ');

    // Key specifies the css class to have in a checkbox and the value specifies if the default value is checked or not
    const checkBoxCssClasses: {[cssName: string]: boolean} = {
        'table-dark': false,
        'table-hover': false,
        'table-striped': false,
        'table-bordered': false,
        'table-sm': false
    };
    const checkBoxNames = {
        'table-dark': 'dark mode',
        'table-hover': 'hover',
        'table-striped': 'striped',
        'table-bordered': 'framed',
        'table-sm': 'smaller'
    };

    // Set checkbox checked if the css class already is on the table
    Object.keys(checkBoxCssClasses).forEach(value => {
        if (value in props.table.attributes.cssClasses) {
            checkBoxCssClasses[value] = true;
        }
    });

    const [checkState, setCheck] = useState<{[cssClass: string]: boolean}>(checkBoxCssClasses);
    return (
        <>
            <div onFocus={() => setFocus(true)} onBlur={handleBlur} tabIndex={0}>
                <Row>
                    <Col className="col-12">
                        <div className=".table-responsive">
                            <table className={tableCss}>
                                <tbody>
                                    {JSXRows}
                                </tbody>
                            </table>
                        </div>
                        {(props.edit && focused) &&
                            <Row className="justify-content-center mx-2">
                                <Col className="col-12 px-0">
                                    <TableButtons addRow={addRow} removeRow={removeRow}
                                        addCol={addCol} removeCol={removeCol}/>
                                </Col>
                                <Col className="col-12">
                                    <CheckboxList checkboxState={checkState} stateCallback={
                                        (e) => {
                                            const selectedEntries = Object.entries(e).filter(([, checked]) => checked);
                                            const cssClassNames = selectedEntries.map(([value]) => value);
                                            updateCssClasses(new Set(cssClassNames));
                                            setCheck(e);
                                        }}
                                    boxLabels={checkBoxNames}/>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </div>
        </>
    );
}
