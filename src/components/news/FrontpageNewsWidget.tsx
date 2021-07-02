import React from 'react';
import NewsItemCompact from './NewsItemCompact';
import NewsFeedTiny from './NewsFeedTiny';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OffsetTitle from '../OffsetTitle';
import useSWR from 'swr';
import { NewsPageMinimal } from '../../types/news';
import { api } from '../../api/main';

export default function NewsWidget() {
    // TODO: add error handling and validation
    const { data } = useSWR(['/news/'], (path) => api.get<NewsPageMinimal[]>({ path: path, validator: 'none' }), {});

    // TODO: Check if news response is empty
    // TODO: double-check that data.data.length works properly below.
    return (data !== undefined && data.data.length > 0)
        ? (
            <Col xs={12} xl={10}>
                <OffsetTitle title="Nyheter" offsetLeft={2}>
                    <Row>
                        <Col className="col-7 pr-0"> <NewsItemCompact {... data.data[0]}/> </Col>
                        <Col className="col-5 pl-0"> <NewsFeedTiny items={data.data.slice(1, Math.min(4, data.data.length))}/> </Col>
                    </Row>
                </OffsetTitle>
            </Col>
        )
        : <></>;
}
