
/**
 *# ContentTrees used in pageTemplates. Commented sections use the related pageType as title.
 */

/* -----------------------
         frontpage
 ------------------------- */
import { ContentDict } from '../content_object_types';

export type OrangeInfoBoxCT = ContentDict<
    {
        title: RichTextBlock,
        text: RichTextBlock,
        button: ContentText & {
            attributes: {
                link: string
            }
        }
    },
    {
        color: string
    }
>;

export type FrontPageItems = {
    orangeBoxes: newContentList<OrangeInfoBoxCT>,
    sponsorLogo: ContentImage
}

export type FrontPageCT = newContentDict<FrontPageItems>;

/* -----------------------
           namnd
 ------------------------- */
export type NamndPageCT = ContentDict & {
    items: {
        title: HeadingBlock,
        content: BlockFeed
    }
}
