
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_TOKEN, BRAPIAPI_ACOES_BASE_URL } from '../../../config';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import allAcoesDTO from '../../dto/AllAcaoDTO';
import Pagination from '../Pagination/Pagination';

let pageSize = 10;

export const ListarTodasAcoes = () => {

    const [allAcoesDTO, setAllAcoesDTO] = useState<allAcoesDTO[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return allAcoesDTO.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, allAcoesDTO]);

    useEffect(() => {

        const buscarTodasAcoes = async () => {
            try {
                const response = await axios.get(`${BRAPIAPI_ACOES_BASE_URL}/list?sortBy=close&sortOrder=desc&token=${API_TOKEN}`);
                const { data } = response;
                let acoesRetorno: any[] = [];

                data.stocks.map((acao: any) => {
                    if (!acao.stock.includes('11')) {
                        acoesRetorno.push(acao);
                    }
                });

                const acoesDTO: allAcoesDTO[] = acoesRetorno.map((acoes: any) => ({
                    sigla: acoes.stock,
                    nome: acoes.name,
                    setor: acoes.sector,
                    image: acoes.logo,
                }))

                setAllAcoesDTO(acoesDTO);
            } catch (err) {
                console.log(err);
            }
        }

        console.log("user")
        buscarTodasAcoes();
    }, []);


    return (
        <div className='h-screen flex flex-col bg-gray-200'>
            <Header />
            <div className="flex h-screen flex-wrap w-full justify-evenly  bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {currentTableData.map((acao: allAcoesDTO, index: number) => (
                    <li key={index} className="flex items-center justify-evenly w-2/5 mx-2 h-18 bg-blue-500 my-3 list-none rounded-xl">
                        <a href="#" className='mx-1 justify-center items-center'>
                            <img className="w-14 rounded-full" src={acao.image} />
                        </a>
                        <div className="flex w-96 items-center rounded-sm">
                            <div className='w-full items-center'>
                                <a href="#">
                                    <h5 className="flex text-xl font-bold tracking-tight text-white dark:text-white">{acao.sigla}
                                    </h5>
                                </a>
                                <div className='flex justify-start items-center'>
                                    <p className="text-sm w-36 text-white">{acao.nome}</p>
                                    <p className="text-xs w-44 text-white">Setor: {acao.setor ? acao.setor : 'Indefinido'}</p>
                                </div>
                            </div>
                            <Link to="#" className="inline-flex items-center text-center w-12 h-12 px-4 py-2 ms-2 text-sm font-medium text-blue-500 bg-white rounded-lg">
                                <svg className="rtl:rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </li>
                ))}
                <div className='block w-full my-2'>
                    <Pagination
                        currentPage={currentPage}
                        totalCount={allAcoesDTO.length}
                        pageSize={pageSize}
                        siblingCount={1}
                        onPageChange={(page: number) => setCurrentPage(page)}
                    />
                </div>
            </div>

        </div>
    )
}