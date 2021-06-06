import React, { ChangeEventHandler } from 'react';
import { Row } from 'react-bootstrap';

type props = {
    checkboxState: {[cssClass: string]: boolean},
    stateCallback: (newState: {[cssClass: string]: boolean}) => any,
    boxLabels?: {[cssClass: string]: string}
}

function CreateCheckBox(props: {id: string, label: string, callBack: ChangeEventHandler<HTMLInputElement>, checked: boolean}) {
    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" id={props.id} onChange={props.callBack} checked={props.checked} />
            <label className="form-check-label" htmlFor={props.id}>
                <h5>{props.label}</h5></label>
        </div>);
}

/**
 * Renders a list of checkboxes with names using the key names of the checkboxState dict. The values of the dict
 * represents if the checkbox is checked.
 *
 * When a checkbox is checked a call is made to stateCallback with a an updated dict. stateCallback must change the
 * checkboxState for the checkboxes to render properly.
 * @param props
 * @constructor
 */
export default function CheckboxList(props: props) {
    function checkboxChecked(cssClass: string, event: React.ChangeEvent<HTMLInputElement>) {
        const newState = props.checkboxState;
        newState[cssClass] = event.target.checked;
        props.stateCallback(newState);
    }

    const labels = props.boxLabels === undefined ? {} : props.boxLabels;

    const cssClasses = Object.entries(props.checkboxState);
    const checkBoxes = cssClasses.map(([cssClass, checked]) => {
        return (
            <CreateCheckBox key={cssClass} id={cssClass}
                label={ labels[cssClass] ? labels[cssClass] : cssClass }
                callBack={(e) => checkboxChecked(cssClass, e)}
                checked={checked}/>
        );
    });
    return (
        <Row>
            <form>
                {checkBoxes}
            </form>
        </Row>);
}
