import { ContentDict, ContentImage, ContentText } from '../../api_object_types';

/**
 * ContentTrees of the site object
 */

export type SiteBannerCT = ContentDict & {
    items: {
        name: ContentText,
        logo: ContentImage
    }
}

export type SiteFooterCT = ContentDict & {
    items: {
        webmaster: ContentText,
        currYear: ContentText,
        address: ContentText
    }
}
