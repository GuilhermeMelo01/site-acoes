import { useEffect, useState } from "react";
import AcaoDTO from './../../dto/AcaoDTO';
import axios from "axios";
import { API_TOKEN, BRAPIAPI_ACOES_BASE_URL, BRAPIAPI_CRYPTO_BASE_URL } from "../../../config";
import { ListaValores } from "../../components/ListaValores/ListaValores";

import './style.css';

function Home() {

    const [acaoDTO, setAcaoDTO] = useState<AcaoDTO[]>([]);
    const [cryptoDTO, setCryptoDTO] = useState<AcaoDTO[]>([]);
    const [fiisDTO, setFIIsDTO] = useState<AcaoDTO[]>([]);


    useEffect(() => {
        const buscarAcoesDestaque = async () => {
            try {
                const response = await axios.get(`${BRAPIAPI_ACOES_BASE_URL}/PETR4,MGLU3,VALE3,HAPV3,AMER3,BBDC4?range=1y&interval=1d&fundamental=true&dividends=true&token=${API_TOKEN}`);
                const { data } = response;
                const extractedData: AcaoDTO[] = data.results.map((stock: any) => ({
                    sigla: stock.symbol,
                    nome: stock.longName,
                    cotacao: stock.regularMarketPrice,
                    variacaoPercentual: stock.regularMarketChangePercent,
                    image: stock.logourl
                }));
                setAcaoDTO(extractedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const buscarCryptosDestaques = async () => {
            try {
                const response = await axios.get(`${BRAPIAPI_CRYPTO_BASE_URL}?coin=BTC,ETC,ADA,BNB,USDT,XRP&token=${API_TOKEN}`);
                const { data } = response;
                const cryptos: AcaoDTO[] = data.coins.map((crypto: any) => ({
                    sigla: crypto.coin,
                    nome: crypto.coinName,
                    cotacao: crypto.regularMarketPrice,
                    variacaoPercentual: crypto.regularMarketChange,
                    image: crypto.coinImageUrl
                }));

                setCryptoDTO(cryptos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const buscarFIIsDestaques = async () => {
            try {
                const response = await axios.get(`${BRAPIAPI_ACOES_BASE_URL}/FNAM11,KLBN11,BPAC11,TAEE11,SMAL11,IGTI11?range=1y&interval=1d&fundamental=true&dividends=true&token=${API_TOKEN}`);
                const { data } = response;

                console.log(data);
                const fiis: AcaoDTO[] = data.results.map((fiis: any) => ({
                    sigla: fiis.symbol,
                    nome: fiis.longName,
                    cotacao: fiis.regularMarketPrice,
                    variacaoPercentual: fiis.regularMarketChangePercent,
                    image: fiis.logourl
                }));

                setFIIsDTO(fiis);
            } catch (error) {
                console.log(error);
            }
        }

        buscarAcoesDestaque();
        buscarCryptosDestaques();
        buscarFIIsDestaques();
    }, []);

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Milionários</span>
                    </a>
                    <div className="flex md:order-2">
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div>
                        <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div>
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ações</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cryptos Moedas</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">FIIs</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cotação</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Noticias</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <ul className="flex flex-wrap px-5 pt-10 w-full justify-around bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="block w-full text-center text-5xl font-suez text-blue-700">AÇÕES DA BOLSA</h1>
                <ListaValores valores={acaoDTO} />
            </ul>
            <ul className="flex flex-wrap px-5 w-full justify-evenly border-t-2 bg-white border border-gray-300 shadow dark:bg-gray-800">
                <h1 className="block w-full text-center text-5xl pt-10 pb-2 font-suez md:text-blue-600">CRYPTOS</h1>
                <ListaValores valores={cryptoDTO} />
            </ul>
            <ul className="flex flex-wrap px-5 w-full justify-evenly border-t-2 bg-gray-200 border border-gray-300 shadow dark:bg-gray-800">
                <h1 className="block w-full text-center text-5xl pt-10 font-suez md:text-blue-600">FUNDOS DE INVESTIMENTOS</h1>
                <ListaValores valores={fiisDTO} />
            </ul>
        </div>
    )
}

export default Home;