import React, { MouseEventHandler } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

type settingsCallbacks = {
    addRow: MouseEventHandler<HTMLElement>,
    removeRow: MouseEventHandler<HTMLElement>,
    addCol: MouseEventHandler<HTMLElement>,
    removeCol: MouseEventHandler<HTMLElement>,
}

export default function TableButtons(props: settingsCallbacks) {
    return (
        <>
            <Row className="justify-content-between">
                <Col className="col-auto">
                    <Button className="mr-1" onClick={props.addRow}>
                    Add row
                    </Button>
                    <Button className="ml-1" onClick={props.removeRow}>
                    Remove row
                    </Button>
                </Col>
                <Col className="col-auto">
                    <Button className="mr-1" onClick={props.addCol}>
                    Add col
                    </Button>
                    <Button className="ml-1" onClick={props.removeCol}>
                    Remove col
                    </Button>
                </Col>
            </Row>
        </>);
}
