export default function Pagination({ page, count, total }:{ page: number, count: number, total: number }) {
    const lastPage = Math.max(1, Math.ceil(total / count));

    return <div className="mx-auto py-8 w-fit flex flex-row justify-center items-center gap-6">
        <a href={`?page=${1}&count=${count}`}>
            First
        </a>

        <a href={`?page=${Math.max(1, page - 1)}&count=${count}`}>
            -1
        </a>

        <p>{page}</p>

        <a href={`?page=${Math.min(lastPage, page + 1)}&count=${count}`}>
            +1
        </a>

        <a href={`?page=${lastPage}&count=${count}`}>
            Last
        </a>
    </div>
}