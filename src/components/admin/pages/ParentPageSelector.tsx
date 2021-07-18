import React, { ChangeEvent } from 'react';
import { Col, Form } from 'react-bootstrap';
import useSWR from 'swr';
import { api } from '../../../api/main';
import { Page, MinimalPage } from '../../../types/api_object_types';

type MinimalPage2 = MinimalPage & {name: string}

export default function ParentPageSelector(props: {page: Page, setPageHook: (page: Page) => void}) {
    // const [loadingState, setLoadingState] = useState<loadingStates>('preparing');

    // TODO: add error handling
    const minSiteList: MinimalPage2[] = [];

    const { data, error } = useSWR(['pages/'], (path) => api.get<Page[]>({ path: path, validator: 'Page[]' }), {});
    if (data) {
        for (const site of data.data) {
            // TODO: Ideally, TypeScript would do the type casting, but idk how it's done. Using "as MinimalPage2" really only checks if it contains all properties, and does not remove excessive ones.
            // This has the effect of potentially sending the entire parent as a Page (not MinimalPage) when saving. We could ignore this if we get confirmation that the backend does filtering.
            minSiteList.push({
                id: site.id,
                detailUrl: site.detailUrl,
                name: site.name
            } as MinimalPage2);
        }
    }

    return (
        <Form.Group controlId="parent" as={Col} md={4}>
            <Form.Label>{(data === undefined) ? 'Loading parent pages...' : (error !== undefined ? 'Error' : 'Parent page')}</Form.Label>
            {
                (// TODO: Make type checks here more rigorous
                    <Form.Control
                        as='select'
                        defaultValue={props.page.parent.name}
                        onChange={(event: ChangeEvent<any>) => {
                            props.setPageHook({
                                ...props.page,
                                parent: minSiteList[event.target.value] as MinimalPage
                            });
                        }}
                    >
                        {
                            Object.entries(minSiteList).map((entry, index) => (
                                <option key={index} value={(entry[0])}>{(entry[1] as unknown as MinimalPage2).name}</option>
                            ))
                        }
                    </Form.Control>
                )
            }
        </Form.Group>);
}
