import React, { ChangeEvent, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import callApi from '../../../api/main';
import { Page, MinimalPage } from '../../../types/api_object_types';

type MinimalPage2 = MinimalPage & {name: string}
type loadingStates = 'preparing' | 'waiting' | MinimalPage2[] | 'error';

export default function ParentPageSelector(props: {page: Page, setPageHook: (page: Page) => void}) {
    const [loadingState, setLoadingState] = useState<loadingStates>('preparing');

    // TODO: This is called twice. It's may be a problem with the parent component (PageEditor) reloading too many times.
    if (loadingState === 'preparing') {
        // TODO: Implement more rigorous type-checks (that is, get rid of the "unknown" type conversion below).
        callApi({ path: 'pages/', getParams: {} }).then((resp) => {
            console.log('ParentPageSelector got response from API.');
            const minSiteList: MinimalPage2[] = [];

            if (resp.code === 200) {
                for (const site of resp.data) {
                    // TODO: Ideally, TypeScript would do the type casting, but idk how it's done. Using "as MinimalPage2" really only checks if it contains all properties, and does not remove excessive ones.
                    minSiteList.push({
                        id: site.id,
                        IDDetail: site.IDDetail,
                        detailUrl: site.detailUrl,
                        name: site.name
                    } as unknown as MinimalPage2);
                }
            }
            if (minSiteList.length > 0) {
                setLoadingState(minSiteList);
                console.log(minSiteList);
            } else {
                setLoadingState('error');
            }
        });
        setLoadingState('waiting');
    }

    return (
        <Form.Group controlId="parent" as={Col} md={4}>
            <Form.Label>{(loadingState === 'preparing' || loadingState === 'waiting') ? 'Loading parent pages...' : (loadingState === 'error' ? 'Error' : 'Parent page')}</Form.Label>
            {typeof loadingState !== 'string'
                ? (// TODO: Make type checks here more rigorous
                    <Form.Control
                        as='select'
                        defaultValue={props.page.parent.name}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                parent: (loadingState as unknown as MinimalPage2[])[event.target.value] as MinimalPage
                            });
                        }}
                    >
                        {
                            Object.entries(loadingState).map((entry, index) => (
                                <option key={index} value={(entry[0])}>{(entry[1] as unknown as MinimalPage2).name}</option>
                            ))
                        }
                    </Form.Control>)
                : (<></>)}
        </Form.Group>);
}
