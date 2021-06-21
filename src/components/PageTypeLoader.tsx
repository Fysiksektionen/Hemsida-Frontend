import React from 'react';
import useSWR from 'swr';
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

// TODO: The below 2 functions check if page === undefined, but we may have the case when the content is empty. We should check for it.
function ExternalPageRenderer({ page }:PageTypeLoaderProps): JSX.Element {
    const location = useLocation();
    const pageId: number = (page !== undefined && page.id !== undefined) ? page.id : ((location.pathname in pathToId) ? pathToId[location.pathname] : 0);
    // TODO: user error handling.
    const { data /*, error */ } = useSWR([pageId], (pageId) => callApi({ path: '/pages/' + pageId, getParams: {} }), {});
    return (
        <>
            {(data !== undefined) && loadPage(data.data)}
            {(data === undefined) && (<div id="dynamic_page_content" className='w-100'><CenteredLoadingBar/></div>)}
        </>
    );
}

/**
 * Component loading correct component depending on current URL.
 *
 * @returns {JSX} Div containing correct component for URL or PageNotFound
 *  component if no matching component was found.
 */
export default function PageTypeLoader({ page }: PageTypeLoaderProps): JSX.Element {
    if (page !== undefined) {
        if (page === emptyPage) {
            console.log('PageTypeLoader got an emptyPage. This is probably not intended.');
        }
        console.log('PTL-PageR:');
        console.log(page);
        return loadPage(page);
    } else {
        return (<ExternalPageRenderer/>);
    }
}
