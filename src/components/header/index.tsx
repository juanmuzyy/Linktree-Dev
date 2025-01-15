import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import {auth} from '../../services/firebaseConnection'
import { signOut } from "firebase/auth"

export function Header(){

     async function handleLogout(){
        await signOut(auth) // se eu colocar um signOut no Auth eu tiro a autenticação do user, assim ele n consegue voltar ao sistema, sem logar de novo

    }
    return(
      <header className="w-full max-w-2xl mt-4 px-1 ">
        <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md p-3">
            <div className="flex gap-6 font-medium">
                <Link to="/">
                    Home
                </Link>
                <Link to="/admin">
                    Links
                </Link>
                <Link to="/admin/social">
                    Redes sociais
                </Link>
            </div>
            <button onClick={handleLogout}>
                <BiLogOut size={28} color="#db2629"/>
            </button>
        </nav>
      </header>
    )
}