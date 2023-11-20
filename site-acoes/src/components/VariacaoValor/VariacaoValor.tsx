import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface VariacaoProps {
    variacaoPercentual: number
}

export const VariacaoValor: React.FC<VariacaoProps> = ({ variacaoPercentual }) => {

    return (
        <div className="flex items-center text-xl mb-5 ml-2">
            {variacaoPercentual < 0 
            ? (
                <>
                    <p className="inline text-red-500">{variacaoPercentual.toFixed(2)}</p>
                    <FaArrowAltCircleDown className="text-red-500 ml-1 mt-0.4" />
                </>
            ) 
            : (
                <>
                    <p className="text-green-500">{variacaoPercentual.toFixed(2)}</p>
                        <FaArrowAltCircleUp className="text-green-500 ml-1" />
                </>
            )}
        </div>
    )

}