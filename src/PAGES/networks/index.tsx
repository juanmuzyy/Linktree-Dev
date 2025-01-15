import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";


import { db } from "../../services/firebaseConnection";
import {
setDoc, // criar um novo documento, o bom dele que se eu criar um outro, vai criar duplicado, vai fazer um update em cima da onde esta sendo feito o cadastro 
doc,
getDoc

} from 'firebase/firestore'
export function Networks(){
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")

    useEffect(() => { // deixando fixo o preenchimento dos input e verificando que nao esta vazio
        function loadingLinks(){
        const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setFacebook(snapshot.data()?.facebook)
                setInstagram(snapshot.data()?.instagram)
                setLinkedin(snapshot.data()?.linkedin)
            }
        })
        }
        loadingLinks();
    }, [])
    

    function handleRegister(e: FormEvent){  // criando esse grupo la no banco de dados 
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,
            linkedin: linkedin,

        }).then(() => {
            console.log("Adicionado com SUCESSO!!")

        }).catch((error) => {
            console.log("Error ao adicionar no banco" + error)
        })
        
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
           <Header/>

           <h1 className="text-white text-2xl font-medium mt-8 mb-4" >Minhas redes Socias</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2 ">Link facebook</label>

                <Input type="url"
                 placeholder="Digite a url..."
                 value={facebook}
                 onChange={(e) => setFacebook(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2 ">Link Instagram</label>
                <Input type="url"
                 placeholder="Digite a url..."
                 value={instagram}
                 onChange={(e) => setInstagram(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2 ">Link Linkedin</label>
                <Input type="url"
                 placeholder="Digite a url..."
                 value={linkedin}
                 onChange={(e) => setLinkedin(e.target.value)}/>
                 <button type="submit" className="text-white bg-blue-600 rounded-md p-2 mt-5 items-center justify-center flex mb-7 font-medium ">
                        Salvar Links
                 </button>
            </form>
      
        </div>
    )
}