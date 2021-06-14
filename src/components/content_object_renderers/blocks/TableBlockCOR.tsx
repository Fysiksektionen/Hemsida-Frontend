import React from 'react';
import { TableBlock } from '../../../types/content_objects/blocks';
import { EditorialModeContext } from '../../../contexts';
import TableCOE from './tableCOE/TableCOE';

// TODO Should be able to specify relative width maybe. So maybe not w-100.
export default function TableBlockCOR({ content }: {content: TableBlock}) {
    return (
        <div className='w-100'>
            <EditorialModeContext.Consumer>
                {edit => <TableCOE table={content} edit={edit}/>}
            </EditorialModeContext.Consumer>
        </div>
    );
}
