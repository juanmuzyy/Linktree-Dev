import { Link } from "react-router-dom";

export function ErrorPage(){
    return(
        <div className="flex flex-col w-full min-h-screen justify-center items-center text-white">
            <h1 className="text-6xl mb-5 font-medium">404</h1>
            <h1 className="font-bold text-4xl mb-4">Página não encotrada</h1>
            <p className="italic text-xl mb-4">Você esta tetando acessar uma página que não existe!!</p>

            <Link className="bg-gray-50/20 py-1 px-4 rounded-md" to="/">
                Voltar para Home
            </Link>
        </div>
    )
}