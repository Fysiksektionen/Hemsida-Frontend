import React from 'react';
import useSWR from 'swr';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';
// import { APIResponse } from '../types/general';
import { LocaleContext, locales } from '../contexts';
import { Page } from '../types/api_object_types';
import CenteredLoadingBar from './CenteredLoadingBar';
import { CenteredError } from './Centered';

// Import fake data
import { get as callApi } from '../api/main';

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

// TODO: The below 2 functions check if page === undefined, but we may have the case when the content is empty when only an id is provided. We should check for it.
function ExternalPageRenderer({ page }:PageTypeLoaderProps): JSX.Element {
    const location = useLocation();
    const apiPath = (page !== undefined && page.id > 0) ? page.id : '/resolve-url/?path=' + location.pathname;
    const { data, error } = useSWR([apiPath], (apiPath) => callApi<Page>({ path: apiPath, validator: 'Page' }), {});

    if (error !== undefined) {
        if (error.code === 404) {
            return <PageNotFound/>;
        } else {
            return <CenteredError message = {error.message} />;
        }
    } else {
        if (data === undefined) {
            return <CenteredLoadingBar/>;
        } else {
            return loadPage(data.data);
        };
    }
}

/**
 * Component loading correct component depending on current URL.
 *
 * @returns {JSX} Div containing correct component for URL or PageNotFound
 *  component if no matching component was found.
 */
export default function PageTypeLoader({ page }: PageTypeLoaderProps): JSX.Element {
    if (page !== undefined) {
        return loadPage(page);
    } else {
        return (<ExternalPageRenderer/>);
    }
}
