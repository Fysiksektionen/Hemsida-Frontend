import { ContentDict, ContentImage, ContentList, ContentMenu, ContentText } from '../../api_object_types';
import { RichTextBlock } from '../blocks';

/**
 * ContentTrees of the site object
 */

export type SiteHeaderCT = ContentDict & {
    items: {
        logo: ContentImage
        midMenu: ContentMenu
        mainMenu: ContentMenu
    }
}

export type SiteFooterQuickAccessMenuCT = ContentDict & {
    items: {
        header: RichTextBlock & { attributes: { richTextEditorType: 'none' } }
        info: RichTextBlock & { attributes: { richTextEditorType: 'body-text' } }
    }
}

export type SiteFooterCT = ContentDict & {
    items: {
        address: ContentText,
        quickAccess: ContentList & {
            items: SiteFooterQuickAccessMenuCT[]
        }
    }
}
