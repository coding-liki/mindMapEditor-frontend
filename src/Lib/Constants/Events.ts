// export interface EventInterface{
//     getName(): string;
// }

export interface Event {
    name: string;
}

/************** Page events *************/
export const PAGE_ENABLED_BEFORE = 'pageEnabledBefore';
export const PAGE_DISABLED_BEFORE = 'pageDisabledBefore';
export const PAGE_ENABLED_AFTER = 'pageEnabledAfter';
export const PAGE_DISABLED_AFTER = 'pageDisabledAfter';
export const PAGE_SET_NAME = 'pageSetName';
export class PageEnabledBefore implements Event {
    name = PAGE_ENABLED_BEFORE;

    pageName: string;

    constructor(pageName: string) {
        this.pageName = pageName;
    }
}

export class PageDisabledBefore implements Event {
    name: string = PAGE_DISABLED_BEFORE;

    pageName: string;

    constructor(pageName: string) {
        this.pageName = pageName;
    }
}

export class PageEnabledAfter implements Event {
    name: string = PAGE_ENABLED_AFTER;

    pageName: string;

    constructor(pageName: string) {
        this.pageName = pageName;
    }
}

export class PageDisabledAfter implements Event {
    name: string = PAGE_DISABLED_AFTER;

    pageName: string;

    constructor(pageName: string) {
        this.pageName = pageName;
    }
}

export class PageSetName implements Event{
    name: string = PAGE_SET_NAME;

    pageVisibleName: string;
    constructor(pageVisibleName: string) {
        this.pageVisibleName = pageVisibleName;
    }
}
/*****************************************/