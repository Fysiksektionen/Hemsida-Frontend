import React, { useState } from 'react';
import { Locale, LocaleContext, locales } from './contexts';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Site } from './types/api_object_types';
import Admin from './components/admin/Admin';
import PageTypeLoader from './components/PageTypeLoader';
import './App.css';

// Import fake data
import { mockSiteResp } from './mock_data/mock_site_response';

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);

    // TODO: Replace by server call to /api/site/
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [siteData, setSiteData] = useState<Site>(mockSiteResp.data);

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>
                <Switch>
                    <Route exact={true} path="/admin"><Redirect to={'/admin/pages/'} /></Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route>
                        {siteData &&
                        <Header content={
                            locale === locales.sv
                                ? siteData.headerContentSv
                                : siteData.headerContentEn
                        } setLocale={setLocale} />}
                        <div className="content">
                            <PageTypeLoader />
                        </div>
                        {siteData &&
                        <Footer content={
                            locale === locales.sv
                                ? siteData.footerContentSv
                                : siteData.footerContentEn
                        } />}
                    </Route>

                </Switch>
            </LocaleContext.Provider>
        </div>
    );
}

export default App;
