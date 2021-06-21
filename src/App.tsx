import React, { useState } from 'react';
import useSWR from 'swr';
import { Locale, LocaleContext, locales } from './contexts';
import Header from './components/Header';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
import { Site } from './types/api_object_types';
import Admin from './components/admin/Admin';
import PageTypeLoader from './components/PageTypeLoader';
import './App.css';
import callApi from './api/main';

function App() {
    const [locale, setLocale] = useState<Locale>(locales.sv);

    // TODO: user error handling and rigorous typing.
    const { data /*, error */ } = useSWR(['/site/'], (path) => callApi({ path: path, getParams: {} }), {});
    const siteData = (data === undefined) ? undefined : (data as any).data as Site;

    return (
        <div className="App">
            <LocaleContext.Provider value={locale}>
                <Switch>
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
