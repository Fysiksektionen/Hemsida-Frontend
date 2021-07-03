import { List, ListItem } from '@material-ui/core';
import React from 'react';
import useSWR from 'swr';
import { api } from '../api/main';
import NewsArticle from '../components/news/NewsArticle';
import { MenuItem, SidebarMenu } from '../components/SidebarMenu';
import { ContentObject } from '../types/api_object_types';
import { NewsPageMinimal } from '../types/news';

const months: string[] = [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December'
];

const getMonthYearString = (item: Date) => (
    months[item.getMonth()] + ' ' + item.getFullYear()
);

const NUM_RECENT_MONTHS = 10;

const getRecentMonths = (): Date[] => {
    const now = new Date();
    const recentMonths: Date[] = [];
    const mostRecent = { month: now.getMonth(), year: now.getFullYear() };
    let i: number;
    for (i = 0; i < NUM_RECENT_MONTHS; ++i) {
        recentMonths.push(new Date(mostRecent.year, mostRecent.month));
        mostRecent.month -= 1;
        if (mostRecent.month === -1) {
            mostRecent.month = 11;
            mostRecent.year -= 1;
        }
    }

    return recentMonths;
};

export const HEADER_HEIGHT = '150px';

function NewsFeedPageMainView(props: (ContentObject & {newsArticles: NewsPageMinimal[]})) {
    // assumes newsArticles is sorted by date
    const recentMonths = getRecentMonths();
    const menuItems: MenuItem[] = [];
    recentMonths.forEach((monthYear) => {
        menuItems.push({
            id: getMonthYearString(monthYear),
            title: getMonthYearString(monthYear)
        });
    });

    let usedMonth = (recentMonths[0].getMonth() + 1) % 12;

    props.newsArticles.forEach(article => {
        const articleDate = new Date(article.publishedAt);
        if (articleDate.getMonth() < usedMonth || (articleDate.getMonth() === 11 && usedMonth === 0)) {
            usedMonth = articleDate.getMonth();
            menuItems.forEach(item => {
                if (item.title === getMonthYearString(articleDate)) {
                    item.refsTo = article.id.toString();
                }
            });
        }
    });

    menuItems.unshift({
        id: 'mostRecentNews',
        title: 'Senaste nytt',
        refsTo: 'news-header'
    });

    return (
        <SidebarMenu menuItems={menuItems}>
            <h1
                id="news-header"
                className="py-2 mt-2"
                style={{ scrollMarginTop: HEADER_HEIGHT }}
            >
        Nyheter
            </h1>
            <List>
                {props.newsArticles.map(article =>
                    <ListItem
                        id={article.id.toString()}
                        key={article.id}
                        className="py-2"
                        style={{ scrollMarginTop: HEADER_HEIGHT }} // 150px == height of page header
                    >
                        <NewsArticle {...article}/>
                    </ListItem>
                )}
            </List>
        </SidebarMenu>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NewsFeedPage(props: ContentObject) {
    // TODO: add error handling
    const { data } = useSWR(['/news/'], (path) => api.get<NewsPageMinimal[]>({ path: path, validator: 'NewsPageMinimal[]' }), {});
    return NewsFeedPageMainView({ ...props, newsArticles: data !== undefined ? data.data : [] });
}
