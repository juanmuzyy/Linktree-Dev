import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import {
    addDoc, // adicionar um documento dentro de uma coleção, gera um ADD aleatorio 
    collection, // 
    onSnapshot, // faz com que a alretação aconteça em tempo real 
    query, // fazer uma buscar personalizada ou ordenação
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'


import { FiTrash } from "react-icons/fi";

interface LinkProps{
    id: string;
    name: string;
    titulo: string
    url: string;
    bg: string;
    color: string;

}

export function Admin(){
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("")
    

    const [textColorInput, setTextColorInput] = useState("#fff")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#000") 

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => { //Aula 51 buscando links do banco de dados
        const linksRef = collection(db, "Links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                id: doc.id,
                name: doc.data().name,
                titulo: doc.data().titulo,
                url: doc.data().url,
                bg: doc.data().bg,
                color: doc.data().color
                })
            })
            setLinks(lista) // busco tudo no meu banco, organizo dentro de array que chamei de "Lista" ai passo para minha useState

        })
        return () => { // component vai ser demontado 
            unsub();
        }
    }, [])
    
    async function handleRegister(e:FormEvent){
       e.preventDefault() 

       if(nameInput === "" || urlInput === ""){
        alert("Preencha todos os campos!!")
        return;
       }
        // Dessa forma estamos cadastrando uma colletion no nosso banco, uma nova "pasta"
        addDoc(collection(db, "Links"), {
        name: nameInput,
      
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date() // so pra gente saber quando foi criado esse link 
       })
       .then(() => {
        setNameInput("")
        setUrlInput("")
       
            console.log("Cadastrado com sucesso ")
       }).catch((error) => (
        console.log("Erro ao cadastrar no banco " + error )
       ))
    }
    
   async function handleDeleteLink(id: string){

    const docRef = doc(db, "Links", id)
    await deleteDoc(docRef)

    }

    return(
        <div className="flex items-center flex-col min-h-screen pb=7 px-2">
            <Header/>
            <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-5 w-full max-w-xl">
            
                <label className="text-white font-medium mt-2 mb-2"htmlFor="">Nome do link</label>
                <Input
                placeholder="Digite o nome do Link " 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)} />
                <label className="text-white font-medium mt-2 mb-2"htmlFor="">URL do link</label>
                <Input
                type="url"
                placeholder="Digite a URL do Link " 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)} />

                <section className="flex my-4 gap-5 ">
                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2"htmlFor="">Cor do Link</label>
                    <input type="color" value ={textColorInput} onChange={(e) => setTextColorInput(e.target.value)} />
                    
                    </div>
                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2"htmlFor="">Fundo do Link</label>
                    <input type="color" value ={backgroundColorInput} onChange={(e) => setBackgroundColorInput(e.target.value)} />
                    
                    </div>
                </section>

               {nameInput !== '' && (
                 <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-r-md">
                 <label className="text-white font-medium mt-2 mb-3">live view</label>
                 <article className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                 style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput}}>
                     <p className="font-medium" style={{color: textColorInput }}>{nameInput}</p>
                 </article>
                 </div>
               )}

                <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                    Cadastrar
                </button>

            </form>

               <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

            {links.map((link) => (
                   <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 select-none " style={{backgroundColor: link.bg, color: link.color}} >
                   <p>{link.name}</p>
                   <div>
                       <button onClick={() => handleDeleteLink(link.id)} className="border border-dashed p-1 rounded bg-neutral-900">
                           <FiTrash size={18} color="#fff"/>
                       </button>
                   </div>
                  </article>
            ))}
        </div>
    )
}