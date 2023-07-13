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
