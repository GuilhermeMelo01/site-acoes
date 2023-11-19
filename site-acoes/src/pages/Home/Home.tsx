import { useEffect, useState } from "react";
import AcaoDTO from './../../dto/AcaoDTO';
import axios from "axios";
import { APIBRAPI_BASE_URL, API_TOKEN } from "../../../config";

function Home() {

    const [acaoDTO, setAcaoDTO] = useState<AcaoDTO[]>([]);


    useEffect(() => {
        const fetchStocksData = async () => {
            try {
                const response = await axios.get(`${APIBRAPI_BASE_URL}?limit=10&token=${API_TOKEN}`);
                const { data } = response;
                const extractedData: AcaoDTO[] = data.stocks.map((stock: any) => ({
                    codigo: stock.stock,
                    nome: stock.name,
                    fechamento: stock.close,
                    variacaoPercentual: stock.change,
                    logo: stock.logo
                }));
                setAcaoDTO(extractedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchStocksData();
    }, []);

    return (
        <div className="main-container flex flex-col h-full bg-slate-400">
            <div className="flex justify-center items-center font-russo h-20">
                <h1 className="flex text-6xl text-gray-800">MERCADO <p className="text-lg mt-7 ml-2 font-thin text-blue-600">ações</p></h1>
            </div>
            <div className="flex mt-10 w-full h-full">
                <div className="bg-blue-500 w-3/6 h-full">
                    <h1>ALO</h1>
                </div>
                <div className="flex flex-col h-full">
                    <div className="w-full rounded-lg">
                        <ul className="flex flex-wrap justify-evenly m-5">
                            {acaoDTO.map((acao: AcaoDTO, index: number) => (
                                <li key={index} className="flex items-center p-5 w-80 mb-6 mx-1 bg-slate-300 rounded-3xl">
                                    <div className="w-1/2" ><img src={acao.logo} className="w-32" /></div>
                                    <div className="ml-2">
                                        <p>{acao.codigo}</p>
                                        <p>{acao.nome}</p>
                                        <p>{acao.fechamento}</p>
                                        <p>{acao.variacaoPercentual}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;