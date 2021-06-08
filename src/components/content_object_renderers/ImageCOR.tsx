import React, { useState } from 'react';
import { EditorialModeContext } from '../../contexts';
import ImageCOE from './ImageCOE';
import { ContentImage } from '../../types/api_object_types';
import { Image } from 'react-bootstrap';
import { ImageProps } from 'react-bootstrap/Image';
import placeholder from '../../mediafiles/placeholder_images/placeholder_image.png';

type ImageCORProps = ImageProps & React.RefAttributes<HTMLImageElement> & {
    content: ContentImage,
}

/**
 * Renders a ContentImage and allows for changing the image using a popup when in EditorialModeContext.
 * @param props: The ContentImage object.
 */
export default function ImageCOR(props: ImageCORProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <EditorialModeContext.Consumer>
            {editing =>
                <div className='w-100'>
                    <ImageCOE content={props.content} show={showModal} setShow={setShowModal} />
                    <Image
                        src={props.content.image.href !== '' ? props.content.image.href : placeholder}
                        // TODO: I suspect that this type casting is discarded at run-time, yielding a content="[Object object]" attribute for the tag.
                        // This is probably not intended
                        {...(props as (ImageProps & React.RefAttributes<HTMLImageElement>))}
                        // TODO: This almost definitely has the same problem as the line above
                        // Basically, there should be a way to restrict what properties can be added as attributes here at render-time.
                        // This is currently only used for setting custom styles through the ImageCOE CSS editor, which are stored in props.content.attributes.style.
                        {...(props.content.attributes as (ImageProps & React.RefAttributes<HTMLImageElement>))}
                        onClick={editing ? () => { setShowModal(true); } : () => {}}
                    />
                </div>
            }
        </EditorialModeContext.Consumer>
    );
}
