import { Link } from "react-router-dom";
import { VariacaoValor } from "../VariacaoValor/VariacaoValor";
import AcaoDTO from './../../dto/AcaoDTO';

interface ListaValoresProps {
    valores: AcaoDTO[]
}

export const ListaValores: React.FC<ListaValoresProps> = ({ valores }) => {

    return (
        <div className="flex flex-wrap px-5 pt-10 w-full justify-around">
            {valores.map((acao: AcaoDTO, index: number) => (
                <li key={index} className="w-1/4 text p-2 m-5 border-l-2 border-gray-400">
                    <a href="#">
                        <img className="rounded-t-lg w-44" src={acao.image} />
                    </a>
                    <div className="py-5">
                        <a href="#">
                            <h5 className="flex text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{acao.sigla}
                            </h5>
                        </a>
                        <p className=" mb-3 w-80 font-normal text-gray-700 dark:text-gray-400">{acao.nome}</p>
                        <div className="flex mb-3 ">
                            <p className="text-4xl font-bold text-gray-900" >{acao.cotacao.toFixed(2)}<span className="text-sm text-gray-600">R$</span></p>
                            <VariacaoValor variacaoPercentual={acao.variacaoPercentual} />
                        </div>
                        <Link to="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Informações avançadas
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </li>
            ))}
        </div>
    )
}

