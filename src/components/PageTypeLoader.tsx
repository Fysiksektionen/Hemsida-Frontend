import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';
// import { APIResponse } from '../types/general';
import { LocaleContext, locales } from '../contexts';
import { Page } from '../types/api_object_types';
import CenteredLoadingBar from './CenteredLoadingBar';

// Import fake data
import { pathToId, emptyPage } from '../mock_data/mock_PageTypeLoader';
import callApi from '../api/main';
import { APIResponse } from '../types/general';

type PageTypeLoaderProps = {
    page?: Page
}

function loadPage(pageData: Page): JSX.Element {
    // If defined in pageTypeMap, render page. Else give PageNotFound.
    // TODO: Add more checks

    if (pageData !== undefined && pageData.pageType in pageTypeMap) {
        return (
            <LocaleContext.Consumer>
                {locale =>
                    <div id="dynamic_page_content" className='w-100'>
                        {
                            pageData !== undefined
                                ? pageTypeMap[pageData.pageType]((locale === locales.sv ? pageData.contentSv : pageData.contentEn))
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
    if (isLoading && page === undefined) {
        console.log('PageTypeLoader calling API. '); callApi({ path: '/pages/' + pageId, getParams: {} }).then((response: APIResponse<Page>) => { setPageData(response.data); setIsLoading(false); });
    }

    return (
        <>
            {(page !== undefined) && loadPage(page)}
            {(!isLoading && page === undefined) && loadPage(pageData)}
            {(isLoading && page === undefined) && (
                <div id="dynamic_page_content" className='w-100'>
                    <CenteredLoadingBar/>
                </div>
            )}
        </>
    );
}
