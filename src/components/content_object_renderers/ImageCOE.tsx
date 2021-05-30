import React, { useContext } from 'react';
import { Col, Modal, Image, Row, Tabs, Tab } from 'react-bootstrap';
import defaultLogo from '../../mediafiles/placeholder_images/Fysiksektionen_logo.svg';
import img1 from '../../mediafiles/placeholder_images/news_placeholder.jpg';
import img2 from '../../mediafiles/placeholder_images/news_placeholder1.jpg';
import img3 from '../../mediafiles/placeholder_images/news_placeholder2.jpg';
import img4 from '../../mediafiles/placeholder_images/news_placeholder3.jpg';
import { ContentTreeContext } from '../../contexts';
import { ContentImage } from '../../types/api_object_types';
import ImageDropUpload from './ImageDropUpload';

type ImageCOEProps = {
    show: boolean,
    setShow: (image: boolean) => void,
    content: ContentImage
}

function getDummyImages(n: number):string[] {
    function getRandomResolution():string { return Math.floor(Math.random() * 1000 + 100).toString() + 'x' + Math.floor(Math.random() * 500 + 50).toString(); }
    function getRandomColor():string { // https://www.tutorialspoint.com/generating-random-hex-color-in-javascript
        let color = '';
        for (let i = 0; i < 3; i++) {
            const random = Math.random();
            const bit = (random * 16) | 0;
            color += (bit).toString(16);
        };
        return color;
    }
    return [...new Array(n)].map(() => 'https://dummyimage.com/' + getRandomResolution() + '/' + getRandomColor() + '/' + getRandomColor());
}

/**
 * Popup image-picker for a ContentImage.
 * @param show Weather to show the popup or not
 * @param setShow Hook to alter show/hide
 * @param content The ContentImage to edit
 * @constructor
 */
export default function ImageCOE({ show, setShow, content }: ImageCOEProps) {
    const images: string[] = [defaultLogo, img1, img2, img3, img4, ...getDummyImages(50)];

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
                <Tabs
                // id="controlled-tab-example"
                // activeKey={key}
                // onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="files" title="Alla filer">
                        <Row className="justify-content-between h-100 mt-4">
                            {images.map((imgSrc, index) => (
                                <Col key={index} xs={2} className="my-auto">
                                    <Image fluid={true} src={imgSrc} onClick={() => { updateImage(imgSrc); setShow(false); }} />
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey="upload" title="Ladda upp">
                        <ImageDropUpload onUpload={(imgSrc: string) => { updateImage(imgSrc); setShow(false); }}></ImageDropUpload>
                    </Tab>
                    <Tab eventKey="my_files" title="Mina filer" disabled>
                        Varde tomt!
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}
