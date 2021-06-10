import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';
// import { APIResponse } from '../types/general';
import { LocaleContext, locales } from '../contexts';
import { Page } from '../types/api_object_types';

// Import fake data
import { pathToId, emptyPage } from '../mock_data/mock_PageTypeLoader';
import { Container, Row } from 'react-bootstrap';
import callApi from '../api/main';
import { APIResponse } from '../types/general';

type PageTypeLoaderProps = {
    page?: Page
}

function loadPage(page: Page): JSX.Element {
    // If defined in pageTypeMap, render page. Else give PageNotFound.
    // TODO: Add more checks
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

    const pageId: number = (page !== undefined && page.id !== undefined) ? page.id : ((location.pathname in pathToId) ? pathToId[location.pathname] : 0);
    // TODO: Perhaps use useEffect instead of keeping track of an isLoading variable (used for re-render loop prevention).
    if (isLoading) { callApi({ path: '/pages/' + pageId, getParams: {} }).then((response: APIResponse<Page>) => { setPageData(response.data); setIsLoading(false); }); }

    // TODO: Add loader/spinner
    return (
        <>
            {!isLoading && loadPage(pageData)}
            {isLoading &&
                <LocaleContext.Consumer>
                    {locale =>
                        <div id="dynamic_page_content" className='w-100'>
                            <Container>
                                <Row className='justify-content-center'>
                                    <h3>{(locale === locales.sv ? 'Laddar...' : 'Loading...')}</h3>
                                </Row>
                            </Container>
                        </div>
                    }
                </LocaleContext.Consumer>
            }
        </>
    );
}
