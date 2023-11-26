import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DOTS, PaginationDetails, UsePagination } from "../UsePagination/UsePagination";

interface PaginationDetailsProps {
    onPageChange: any,
    totalCount: number,
    siblingCount: number,
    currentPage: number,
    pageSize: number,
}

const Pagination = (props: PaginationDetailsProps) => {

    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = UsePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // Se houver menos que 2 vezes no intervalo de paginação, não renderizamos o componente
    if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-200 px-4 pt-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">{totalCount}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                        <li className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                           style={currentPage == 1 ? {pointerEvents: 'none'} : {pointerEvents: 'all'}} onClick={onPrevious}>
                            <div className="sr-only"></div>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </li>
                        
                        {paginationRange.map(pageNumber => {

                            // Se o pageItem for um PONTO (DOT), renderize o caractere unicode DOTS
                            if (pageNumber === DOTS) {
                                return <li className=" w-12 flex justify-center border-y-2 border-indigo-600200 text-gray-400 font-bold">&#8230;</li>;
                            }

                            // Renderize a amostra de página
                            return (
                                <li className="relative z-10 inline-flex items-center bg-gray-300 px-4 py-2 text-sm font-semibold text-blue-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    aria-current="page"
                                    style={
                                        pageNumber === currentPage
                                            ? { background: '#444', color: "white" }
                                            : { background: '' }
                                    }
                                    onClick={() => onPageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </li>
                            );
                        })}
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div >
    )
};

export default Pagination;