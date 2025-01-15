import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useState, FormEvent } from "react";
import {auth} from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

// Aula 45 ensinando como configurar o cadastro no banco

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate= useNavigate()



    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(email === "" || password === ""){
          toast.warning("Preencha todos os campos") //--------------//-USAR O TOLLER AQUI //-------------------------- 
          return;
        }
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/admin") // replace: substituir o historico de navegação, mandar para pagina admin
          toast.success("Bem vindo ao LinktreeDev")
        })
        .catch((error) =>{
          toast.warning("Falha ao realizar login$")
          console.log(error)
        })
        
        setEmail("")
        setPassword("")
    }
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          <span className="bg-gradient-to-t from-gray-500 to-violet-800 bg-clip-text text-transparent">
            Linktree
          </span>
          <span className="text-white">Dev</span>
        </h1>
      </Link>

      <form onSubmit={handleSubmit} action="" className="w-full max-w-xl flex flex-col px-6">
        <Input placeholder="Digite o seu email..." type="email" value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="********" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="h-9 bg-violet-800 rounded border-0 text-lg font-medium">Acessar</button>
      </form>
    </div>
  );
}
