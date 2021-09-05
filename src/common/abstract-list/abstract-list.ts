export class AbstractList {

    private list: any[];

    constructor(list: any[]) {
        this.list = list;
    }

    get length() {
        return this.list.length;
    }

    peekFront() {
        return (this.length) ? this.list[0] : undefined;
    }

    peekBack() {
        return (this.length) ? this.list[this.length-1] : undefined;
    }

    popOffFront() {
        return this.list.shift();
    }

    popOffBack() {
        return this.list.pop();
    }

    appendToFront(item: any) {
        this.list.unshift(item);
    }

    appendToBack(item: any) {
        this.list.push(item);
    }

    flush() {
        this.list = [];
    }

    dump() {
        return this.list;
    }
}