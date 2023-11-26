import { useEffect, useState } from "react";
import AcaoDTO from './../../dto/AcaoDTO';
import axios from "axios";
import { API_TOKEN, BRAPIAPI_ACOES_BASE_URL, BRAPIAPI_CRYPTO_BASE_URL } from "../../../config";
import { ListaValores } from "../../components/ListaValores/ListaValores";

import './style.css';
import { Header } from "../../components/Header/Header";

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
            <Header />
            <ul className="flex flex-wrap px-5 pt-10 w-full justify-around bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 className="block w-full text-center text-5xl font-suez text-blue-800">AÇÕES DA BOLSA</h1>
                <ListaValores valores={acaoDTO} />
            </ul>
            <ul className="flex flex-wrap px-5 w-full justify-evenly border-t-2 bg-white border border-gray-300 shadow dark:bg-gray-800">
                <h1 className="block w-full text-center text-5xl pt-10 pb-2 font-suez md:text-blue-800">CRYPTOS</h1>
                <ListaValores valores={cryptoDTO} />
            </ul>
            <ul className="flex flex-wrap px-5 w-full justify-evenly border-t-2 bg-gray-200 border border-gray-300 shadow dark:bg-gray-800">
                <h1 className="block w-full text-center text-5xl pt-10 font-suez text-blue-800">FUNDOS DE INVESTIMENTOS IMOBILIÁRIOS</h1>
                <ListaValores valores={fiisDTO} />
            </ul>
        </div>
    )
}

export default Home;