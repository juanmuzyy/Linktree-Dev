import { Social } from "../../components/Social"
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa"
import { db } from "../../services/firebaseConnection"
import {
    getDocs,
     collection,
      orderBy,
       query,
        doc,
         getDoc,
} from 'firebase/firestore'
import { useEffect, useState } from "react"



interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}


interface SocialLinksProps{
    facebook: string;
    instagram: string;
    linkedin: string;
}

export function Home(){

    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()


    useEffect(() => {
        function loadLinks(){
            const linksRef = collection(db, "Links")
            const queryRef = query(linksRef, orderBy("created", "asc"))
            

            getDocs(queryRef)
            .then((snapshot)=>{
                let lista = [] as LinkProps[];

                snapshot.forEach((doc)=>{
                    lista.push({
                        id: doc.id,
                        name: doc.data()?.name,
                        url: doc.data()?.url,
                        bg: doc.data()?.bg,
                        color: doc.data()?.color,
                    })
                })
                setLinks(lista)
            })
        }
        loadLinks()
    }, [])

    useEffect(()=> {
        function loadSocialLinks(){
            
        const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setSocialLinks({
                    facebook: snapshot.data()?.facebook,
                    instagram: snapshot.data()?.instagram,
                    linkedin: snapshot.data()?.linkedin
                })
            }
        })
        }
        loadSocialLinks();
    }, [])




    return(
        <div className="flex flex-col w-full py-4 items-center justify-center" >
            {/* <img className="rounded-full" src="./public/fotoPerfil.jpg" width={100}  /> */}
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-10" >DevMuzy</h1>
            <span className="text-gray-50 mb-5 mt-2">Veja meus Links 👇 </span>
            
            
            <main className="flex flex-col w-11/12 max-w-xl text-center ">
                {links.map((link) => (
                      <section style={{backgroundColor: link.bg}} key={link.id} className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer ">
                      <a href={link.url} target="_blank">
                          <p  style={{color: link.color}} className="md:text-lg text-base ">{link.name}</p>
                      </a>
                  </section>
                ))}
               
               {
                socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4 ">
                    <Social url={socialLinks?.linkedin}>
                            <FaLinkedin size={35} color="#fff"/>
                            
                    </Social>
                    <Social url="">
                        <FaGithub size={35} color="#fff"/>
                    </Social>
                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="#fff"/>
                    </Social>

            </footer>
                )
               }
            </main>


       </div>
    )
}