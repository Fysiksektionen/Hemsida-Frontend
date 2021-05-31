import React, { useContext, useState } from 'react';
import { Col, Modal, Image, Row, Button } from 'react-bootstrap';
import defaultLogo from '../../mediafiles/placeholder_images/Fysiksektionen_logo.svg';
import img1 from '../../mediafiles/placeholder_images/news_placeholder.jpg';
import img2 from '../../mediafiles/placeholder_images/news_placeholder1.jpg';
import img3 from '../../mediafiles/placeholder_images/news_placeholder2.jpg';
import img4 from '../../mediafiles/placeholder_images/ERI_vertical_RGB.png';
import { ContentTreeContext } from '../../contexts';
import { ContentImage } from '../../types/api_object_types';
import SingleImageDropUpload from './SingleImageDropUpload';

type ImageCOEProps = {
    show: boolean,
    setShow: (image: boolean) => void,
    content: ContentImage
}

/**
 * Popup image-picker for a ContentImage.
 * @param show Weather to show the popup or not
 * @param setShow Hook to alter show/hide
 * @param content The ContentImage to edit
 * @constructor
 */
export default function ImageCOE({ show, setShow, content }: ImageCOEProps) {
    const [images, setImages] = useState([defaultLogo, img1, img2, img3, img4]);
    const [selectedImageIdx, setSelectedImageIdx] = useState(-1);

    const CTDispatcher = useContext(ContentTreeContext);

    function updateImage(imgHref: string) {
        const newImage = { ...content, image: { ...content.image, href: imgHref } };
        CTDispatcher({ id: content.id, value: newImage });
    }

    return (
        <Modal
            show={show}
            onHide={() => { setShow(false); }}
            size="xl"
            aria-labelledby="image-picker"
            centered
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="image-picker">Välj en bild</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="h-100 mt-4">
                    <Col>
                        <Row>
                            <Col xs={4} className="py-2">
                                <SingleImageDropUpload onUpload={(imgs: File[]) => { setImages([...images, ...imgs.map((img) => URL.createObjectURL(img))]); }} dropZoneProps={{}}></SingleImageDropUpload>
                            </Col>

                            {images.map((imgSrc, index) => (
                                <Col key={index} xs={2} className={'my-auto' + (index === selectedImageIdx ? ' border' : '')}>
                                    <Image className="m-2" fluid={true} src={imgSrc} onClick={() => { setSelectedImageIdx(index); }} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs={3} className="border-left">
                        <h3>Egenskaper:</h3>
                        <p style={{ overflowWrap: 'anywhere' }}>
                            {selectedImageIdx > -1 && (<>Filnamn: {images[selectedImageIdx]}</>)}
                        </p>
                        <Button onClick={() => { updateImage(images[selectedImageIdx]); setShow(false); }}>Välj</Button>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
