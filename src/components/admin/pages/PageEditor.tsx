import React, { useState } from 'react';
import { ContentObject, Page } from '../../../types/api_object_types';
import callApi from '../../../api/main';
import { Row, Col, Container, Button } from 'react-bootstrap';
import PageNotFound from '../../../pages/PageNotFound';
import {
    ContentTreeAddIdContext,
    ContentTreeContext,
    EditorialModeContext,
    LocaleContext,
    locales,
    useCTReducer
} from '../../../contexts';
import PageTypeLoader from '../../PageTypeLoader';
import LocaleSelector from '../../LocaleSelector';
import PageMetaForm from './PageMetaForm';
import { AdminLocation } from '../../../types/admin_components';
import CenteredLoadingBar from '../../CenteredLoadingBar';
import useSWR from 'swr';

type PageEditorProps = {
    setLocationHook: (props: AdminLocation) => void,
    id: string,
    page?: Page,
}

type PageEditorMVProps = {
    setLocationHook: (props: AdminLocation) => void,
    id: string,
    page: Page,
}

/*
 * Helper components
 * (Should probably be moved to a separate file)
 */

/**
 * Wrapper for PageMetaForm that controls whether the form is shown or not.
 * @param pageData
 * @param setPageData
 * @returns
 */
function PageMetaFormWrapper({ pageData, setPageData }:{pageData: Page, setPageData: (page: Page) => void}): JSX.Element {
    const [showMetaInfo, setShowMetaInfo] = useState(false);
    return (
        <Row>
            <Col>
                <Row className={!showMetaInfo ? 'd-none' : ''}>
                    <Col>
                        <PageMetaForm
                            page={pageData}
                            setPageHook={(page: Page) => setPageData(page)}
                        />
                    </Col>
                </Row>
                <Row className='text-center'>
                    <div
                        className='w-100 d-flex flex-column'
                        onClick={() => setShowMetaInfo(!showMetaInfo)}
                        style={{ cursor: 'click' }}
                    >
                        {showMetaInfo ? '' : 'Redigera meta-info'}
                        <span
                            className={'fa fa-angle-' + (showMetaInfo ? 'up' : 'down')}
                        />
                        {showMetaInfo ? 'Stäng' : ''}
                    </div>
                </Row>
            </Col>
        </Row>
    );
}

/**
 * The main view for the page editor. Provides interactive content editing as well as a form for metadata.
 * @param setPagesLocation: Hook to navigate within the Pages admin-app.
 * @param id: Id of the page. Currently as string.
 * @param page: The page object. Must be passed.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PageEditorMainView({ setLocationHook, id, page }: PageEditorMVProps) {
    // Local context for editing
    const [pageLocale, setPageLocale] = useState(locales.sv);

    // State of the saved data (that should have been sent to server).
    const [pageDataHasChanged, setPageDataHasChanged] = useState(false);
    const [pageData, setPageData] = useState<Page>(page);

    // Use the CTReducer to allow for child components to update the content tree.
    // Use this state when passing down content to children.
    // Alter postDispatchHook so that any updates to tree triggers an hasChanged=True state change.
    const [content, dispatch, addId, decrementAddIdHook] = useCTReducer({
        content: (pageLocale === locales.sv ? pageData.contentSv : pageData.contentEn),
        postDispatchHook: () => {
            setPageDataHasChanged(true);
        }
    });

    // Save the current content to the "saved" pageData state.
    // TODO: Upload to server in this hook.
    function saveContent() {
        pageLocale === locales.sv
            ? setPageData({ ...pageData, contentSv: content as ContentObject })
            : setPageData({ ...pageData, contentEn: content as ContentObject });
        setPageDataHasChanged(false);
    }

    // Send page with updated content down for rendering in children.
    // TODO: Make sure to use SWR-mutate for this as well.
    const pageWithNewContent = { ...pageData };
    if (content) {
        if (pageLocale === locales.sv) {
            pageWithNewContent.contentSv = content;
        } else {
            pageWithNewContent.contentEn = content;
        }
    }

    return (
        <Container fluid>
            <div style={{ height: '100px' }}/>
            <Row className='justify-content-center'>
                <Col xs={10} xl={8} className='pl-5'>
                    {/* Title and save */}
                    <Row className='mb-4 justify-content-between'>
                        <h1>Redigera sida</h1>
                        <div className='d-flex flex-row'>
                            <div className='my-auto'>
                                    Språk: <LocaleSelector localeState={pageLocale} setLocaleHook={setPageLocale}/>
                            </div>
                            <div className='mx-4'/>
                            <Button className='my-auto' onClick={saveContent} disabled={!pageDataHasChanged}>
                                    Spara
                            </Button>
                        </div>
                    </Row>

                    {/* Page meta info */}
                    <PageMetaFormWrapper pageData={pageData} setPageData={setPageData}/>

                    {/* Horizontal line */}
                    <Row className='justify-content-center my-5'>
                        <div className='border border-bottom' style={{ width: '85%' }}/>
                    </Row>

                    {/* Page */}
                    <Row className='zoom-xs-10 zoom-xl-8'>
                        <LocaleContext.Provider value={pageLocale}>
                            <EditorialModeContext.Provider value={true}>
                                <ContentTreeContext.Provider value={dispatch}>
                                    <ContentTreeAddIdContext.Provider value={{
                                        id: addId,
                                        decrementHook: decrementAddIdHook
                                    }}>
                                        <PageTypeLoader page={pageWithNewContent} />
                                    </ContentTreeAddIdContext.Provider>
                                </ContentTreeContext.Provider>
                            </EditorialModeContext.Provider>
                        </LocaleContext.Provider>
                    </Row>
                </Col>
            </Row>
            <div style={{ height: '100px' }}/>
        </Container>
    );
}

/**
 * Editor component for a single page. Puts the page in editorial mode and has a menu to change non-content values.
 * @param setPagesLocation: Hook to navigate within the Pages admin-app.
 * @param id: Id of the page. Currently as string.
 * @param page: The page object. Can be passed if already fetched.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PageEditor({ setLocationHook, id, page }: PageEditorProps) {
    // This component is really just a wrapper for PageEditorMainView, since dynamic API calling is easier this way.

    const { data } = useSWR([id], () => callApi({ path: 'pages/' + id }), {});

    // TODO: Handle errors.
    if (data === undefined) return (<CenteredLoadingBar/>);
    else if (data.code === 404) return (<PageNotFound/>);
    // else if (loadingState === 'error') return (<Container><Row className='justify-content-center mt-6'><h3>Något blev fel.</h3></Row></Container>);
    else return (<PageEditorMainView id={id} page={data.data as unknown as Page} setLocationHook={setLocationHook}/>);
}
