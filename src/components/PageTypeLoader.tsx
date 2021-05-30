import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';
// import { APIResponse } from '../types/general';
import { LocaleContext, locales } from '../contexts';
import { Page } from '../types/api_object_types';
import { apiRootUrl } from '../config';

// Import fake data
import { emptyResp, pathToResp, pathToId, emptyPage } from '../mock_data/pages/mock_PageTypeLoader';
import { Col, Container, Row } from 'react-bootstrap';

const pathlib = require('path');

type PageTypeLoaderProps = {
    page?: Page
}

// Helper dummy
function loadPage(page: Page): JSX.Element {
    // If defined in pageTypeMap, render page. Else give PageNotFound.
    if (page !== undefined && page.pageType in pageTypeMap) {
        return (
            <LocaleContext.Consumer>
                {locale =>
                    <div id="dynamic_page_content" className='w-100'>
                        {
                            page !== undefined
                                ? pageTypeMap[page.pageType]((locale === locales.sv ? page.contentSv : page.contentEn))
                                : <></>
                        }
                    </div>
                }
            </LocaleContext.Consumer>
        );
    } else {
        return <PageNotFound />;
    }
}

/**
 * Component loading correct component depending on current URL.
 *
 * @returns {JSX} Div containing correct component for URL or PageNotFound
 *  component if no matching component was found.
 */
export default function PageTypeLoader({ page }: PageTypeLoaderProps): JSX.Element {
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [pageData, setPageData] = useState(emptyPage);

    const pageId: number = (page !== undefined && page.id !== undefined) ? page.id : ((location.pathname in pathToResp) ? pathToId[location.pathname] : 0);
    useEffect(() => {
        const path: string = apiRootUrl + pathlib.join('/', 'pages', pageId.toString());
        console.log('Fetching: ' + path);
        fetch(path, {})
            .then((res) => res.json())
            .then((response) => {
                setPageData(response.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [pageId]);

    // TODO: perhaps "Laddar..." shouldn't be hard-coded.
    return (
        <>
            {!isLoading && loadPage(pageData)}
            {isLoading &&
                <LocaleContext.Consumer>
                    {locale =>
                        <div id="dynamic_page_content" className='w-100'>
                            <Container>
                                <Row className='justify-content-center'>
                                    <Col xl={8} md={10} xs={11}>
                                        <h1>{locale === locales.sv ? 'Laddar...' : 'Loading...'}</h1>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    }
                </LocaleContext.Consumer>
            }
        </>
    );
}
