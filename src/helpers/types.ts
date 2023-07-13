/* eslint-disable no-unused-vars */
export interface PersonData {
    name: string,
    description: string,
    category: string,
    picture: string,
    lastUpdated: string,
    votes: {
        positive: number,
        negative: number
    },
}

export interface CardProps extends PersonData {
    dataState: PersonData[],
    setDataState: (value: PersonData[])=>void
}

export enum displayView {
    // In this part, gives an error of eslint, that is a false positive, cause we are using the enum in the Content.tsx
    LIST = 'list',
    GRID = 'grid'
}
