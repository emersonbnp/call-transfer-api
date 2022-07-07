export class Pagination {
    public constructor ({number, size}) {
        this.pageNumber = number
        this.pageSize = size
    }
    readonly pageNumber: number
    readonly pageSize: number
}