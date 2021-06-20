import React, { ChangeEvent } from 'react';
import { Page } from '../../../types/api_object_types';
import { Col, Form } from 'react-bootstrap';
import pageTypeMap from '../../../pages/PageTypeMap';
import ParentPageSelector from './ParentPageSelector';

export default function PageMetaForm(props: {page: Page, setPageHook: (page: Page) => void}) {
    return (
        <div>
            <Form onSubmit={() => {}}>
                <Form.Group controlId="slug" as={Col} md={4}>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        defaultValue={props.page.slug}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                slug: event.target.value
                            });
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="pageType" as={Col} md={4}>
                    <Form.Label>Page type</Form.Label>
                    <Form.Control
                        as='select'
                        defaultValue={props.page.pageType}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                pageType: event.target.value
                            });
                        }}
                    >
                        {Object.keys(pageTypeMap).map((pageType, index) => (
                            <option key={index}>{pageType}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <ParentPageSelector page = {props.page} setPageHook = {props.setPageHook}/>{/* TODO: Automatic "broadcasting" of props would be cooler... */}
            </Form>
        </div>
    );
}
