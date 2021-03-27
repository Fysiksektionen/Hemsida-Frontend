import React from 'react';
import { useLocation } from 'react-router-dom';
import pageTypeMap from '../pages/PageTypeMap';
import PageNotFound from '../pages/PageNotFound';
import { Page } from '../types/api_object_types';

// Import fake data
import { emptyResp, pathToResp } from '../mock_data/mock_PageTypeLoader';
import { APIResponse } from '../types/general';

export default function PageTypeLoader() {
    /**
     * Component loading correct component depending on current URL.
     *
     * @returns {JSX} Div containing correct component for URL or PageNotFound
     *  component if no matching component was found.
     */

    const location = useLocation();

    // Call /api/resolve-url?path=<path>
    // const res = callAPI("/resolve-url", GET={path: params.path})
    // Fake for now...
    let res: APIResponse<Page>;
    if (location.pathname in pathToResp) {
        res = pathToResp[location.pathname];
    } else {
        res = emptyResp;
    }
    // End of fake

    // If defined in pageTypeMap, render page. Else give PageNotFound.
    if (res.data.pageType in pageTypeMap) {
        return (
            <div id="dynamic_page_content">
                {pageTypeMap[res.data.pageType](res.data)}
            </div>
        );
    } else {
        return <PageNotFound />;
    }
}
