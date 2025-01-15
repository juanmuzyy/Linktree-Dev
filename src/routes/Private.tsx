import { ReactNode, useState, useEffect } from 'react'

import {auth} from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

interface PrivateProps{
    children: ReactNode;
}


export function Private({children}: PrivateProps): any{

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false) // false: nao tem user logado true: tem user logado 
    

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const useData = {
                    uid: user?.uid,
                    email: user?.email,
                    
                }
                localStorage.setItem('@linktree-dev', JSON.stringify(useData))
                setLoading(false)
                setSigned(true)
            }else{
                setLoading(false)
                setSigned(false)

            }
        })
        return () => {
            unsub();
        }
    }, [])
    if(loading){ // quando estiver buscnado nosso componente, nosso conteudo 
        return <div></div> // vai renderizar um componente vazio 
    }
    if(!signed){ // se o usuario nao estiver logado, direciona ele para pagina de login, nesse caso, caso ele queira manipular acessando pelo link em outro navegador
        return <Navigate to="/login"/>
    }

    return children; // se tiver tudo OK, vai levar ela para o children, o conteudo da pagina, deixa redenrizar a pagina de <ADMIN/>
}