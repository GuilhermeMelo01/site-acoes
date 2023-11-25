
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_TOKEN, BRAPIAPI_ACOES_BASE_URL } from '../../../config';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import allAcoesDTO from '../../dto/AllAcaoDTO';

export const ListarTodasAcoes = () => {

    const [allAcoesDTO, setAllAcoesDTO] = useState<allAcoesDTO[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const buscarTodasAcoes = async () => {
            try{
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
            }catch(err){
                console.log(err);
            }
        }

        console.log("user")
        buscarTodasAcoes();
    }, [])

    return (
        <div>
            <Header />
            <div className="flex flex-wrap pt-10 w-full justify-evenly bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {allAcoesDTO.map((acao: allAcoesDTO, index: number) => (
                    <li key={index} className="flex w-1/3 mx-1 px-2 bg-blue-300 my-5 py-1 list-none rounded-xl">
                        <a href="#" className='mx-1'>
                            <img className="w-16 rounded-full" src={acao.image} />
                        </a>
                        <div className="flex w-96 items-center rounded-sm">
                            <div className='h-max w-full'>
                                <a href="#">
                                    <h5 className="flex text-xl font-bold tracking-tight text-gray-900 dark:text-white">{acao.nome}
                                    </h5>
                                </a>
                                <div className='flex justify-between'>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{acao.sigla}</p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">Setor: {acao.setor ? acao.setor : 'Indefinido'}</p>
                                </div>
                            </div>
                            <Link to="#" className="inline-flex items-center text-center w-12 h-12 px-4 py-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="rtl:rotate-180 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    )

}