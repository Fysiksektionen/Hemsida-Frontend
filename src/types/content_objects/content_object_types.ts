import { Image, Menu, MinimalPage } from '../api_object_types';

type ContentObjectDBType = 'text' | 'image' | 'menu' | 'page' | 'dict' | 'list'

type ContentObjectBase = {
    id: number,
    dbType: ContentObjectDBType,
}

export type ContentObject =
    | ContentText<any>
    | ContentImage<any>
    | ContentMenu<any>
    | ContentPage<any>
    | ContentDict<any>
    | ContentList<any>;

export type ContentText<A = {}> = ContentObjectBase & {
    dbType: 'text',
    text: string,
    attributes: A
}

export type ContentImage<A = {}> = ContentObjectBase & {
    dbType: 'image',
    image: Image,
    attributes: A
}

export type ContentMenu<A = {}> = ContentObjectBase & {
    dbType: 'menu',
    menu: Menu,
    attributes: A
}

export type ContentPage<A = {}> = ContentObjectBase & {
    dbType: 'page',
    page: MinimalPage,
    attributes: A
}

export type ContentDict<T extends NodeJS.Dict<ContentObject>, A = {}> = ContentObjectBase & {
    dbType: 'dict',
    items: T,
    attributes: A
}

export type ContentList<T extends ContentObject, A = {}> = ContentObjectBase & {
    dbType: 'list',
    items: T[],
    attributes: A
}

// -------------------------------------------------------

export type HeadingEditorTypes = 'only-headings' | 'none';
export type HeadingObject = ContentText<{
    blockType: 'heading',
    richTextEditorType: HeadingEditorTypes
}>

export type RichTextEditorTypes = 'capitalized' | 'only-marks' | 'body-text' | 'all' | 'none';
export type RichTextObject = ContentText<{
    blockType: 'bodyText',
    richTextEditorType: RichTextEditorTypes // TODO: Add Capitalized type
}>

export type ContentImagePositionedObject = ContentImage<{
    blockType: 'image',
    alignment: 'left' | 'center' | 'right',
    width: string
}>

export type ColumnsObject = ContentList<BlockFeed, {
    blockType: 'columns'
    sizes: number[]
}>

export type Block = HeadingObject | RichTextObject | ContentImagePositionedObject | ColumnsObject;
export type BlockType = Block['attributes']['blockType'];
export type BlockFeed = ContentList<Block>;
