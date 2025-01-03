import React, { useState } from "react";
import loginImg from "../assets/daniel-korpai-HyTwtsk8XqA-unsplash.jpg";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/firebaseConection";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

function Login() {
    const [displayLogin, setDisplayLogin] = useState(true);
    const [displaySinginup, setDisplaySignUp] = useState(false);
    const [loginPasswordInput, setLoginPasswordInput] = useState("");
    const [loginEmailInput, setLoginEmailInput] = useState("");
    const [isLoginFormValid, setIsLoginFormValid] = useState(true);
    const [singUpEmailInput, setSingUpEmailInput] = useState("");
    const [singUpPasswordInput, setSingUpPasswordInput] = useState("");
    const [isSingUpFormValid, setIsSingUpFormValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const erroAlert = (
        <p className="flex justify-center text-red-300">
            Preencha todos os campos e tente novamente!
        </p>
    )
      const handleDisplayCreateAccount = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        event.preventDefault();
    
        setDisplayLogin(false);
        setDisplaySignUp(true);
      };
    
      const handleDisplayLogin = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        event.preventDefault();
    
        setDisplayLogin(true);
        setDisplaySignUp(false);
      };

      const handleExecutLogin = async (event: React.MouseEvent<HTMLFormElement, MouseEvent> ) =>{
        setIsLoading(true);
        event.preventDefault();

        loginEmailInput.trim().length > 0 && loginPasswordInput.trim().length > 0 ? setIsLoginFormValid(true):
         setIsLoginFormValid(false);

         await signInWithEmailAndPassword(auth, loginEmailInput, loginPasswordInput).then(
            () =>{
                toast.success("Bem vindo de volta");
                setDisplayLogin(true);
                setDisplaySignUp(false);
                setIsLoading(false);
            }
         ).catch((err: {code: string}) =>{
            setIsLoading(false);
            if(err.code === "auth/wrong-password"){
                toast.error("Senha incorreta!");
            }else if(err.code === "auth/user-not-found"){
                toast.error("Email não existe, crie sua conta!");
            }else{
                toast.error("Erro ao realizar Login!");
            }
            
            setIsSingUpFormValid(false);
         });

         console.log("Dados do Input", {
            email: loginEmailInput,
            password: loginPasswordInput,
         });

         setLoginEmailInput("");
         setLoginPasswordInput("");
      };

      const handleInputForm =(event: React.FormEvent<HTMLInputElement>, state: React.Dispatch<React.SetStateAction<string>>) =>{
        const eventTarget = event.currentTarget as HTMLInputElement;
        const eventValue = eventTarget.value;

        eventValue && state(eventValue);
      }
      
      const handleExecutSingUp = async (event: React.MouseEvent<HTMLFormElement, MouseEvent> ) =>{
        setIsLoading(true);
        event.preventDefault();

        singUpEmailInput.trim().length > 0 && singUpPasswordInput.trim().length > 0 ? setIsSingUpFormValid(true):
        setIsSingUpFormValid(false);

        await createUserWithEmailAndPassword(auth, singUpEmailInput, singUpPasswordInput).then(()=>{
            setDisplayLogin(true);
            setDisplaySignUp(false);
            setIsLoading(false);
            toast.success("Usuário Criado!");            
            
        }).catch((err: {code: string}) => {
            if(err.code === "auth/weak-password"){
                toast.error("Senha muito fraca, ultiliza outra!");
            }else if(err.code === "auth/email-already-is-use"){
                toast.error("Email já cadastrado!");
            }else{
                toast.error("Erro ao criar o usuário!");}
            
            setIsLoading(false);
            setIsSingUpFormValid(false);
        });

         setSingUpEmailInput("");
         setSingUpPasswordInput("");
      };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full z-10">
            <div className="hidden sm:block">
                <img
                    className="w-full h-screen object-cover"
                    src={loginImg}
                    alt="Imagem de um notebook"
                />
            </div>

            <div className="flex flex-col justify-center">
                <div className="flex flex-col justify-center itens-center mb-14">
                    <h1 className="text-4xl text-orange-500 text-center font-semibold">
                        Tech Space 👨‍💻
                    </h1>
                </div>

                {displayLogin &&(
                    <form onSubmit={handleExecutLogin} className="max-w-[400px] w-full mx-auto bg-purple-600 p-8 rounded-lg">
                    <h2 className="text-4xl dark:text-white font-bold text-center">
                        Login
                    </h2>
                    <div className="flex flex-col text-white py-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className={`rounded-lg mt-2 p-2 ${
                                isLoginFormValid ?  `bg-purple-700 focus:bg-purple-800`: 
                                `bg-red-700 focus:bg-red-800`
                            } focus:bg-orange-700 focus:outline-none focus:placeholder-transparent border-2 border-purple-800`}
                            placeholder="Digite seu email"
                            value={loginEmailInput}
                            onChange={(e) => handleInputForm(e, setLoginEmailInput)}
                        />
                    </div>
                    <div className="flex flex-col text-white py-2">
                        <label>Senha</label>
                        <input
                            type="password"
                            className={`rounded-lg mt-2 p-2 ${
                                isLoginFormValid ?  `bg-purple-700 focus:bg-purple-800`: 
                                `bg-red-700 focus:bg-red-800`
                            } focus:bg-orange-700 focus:outline-none focus:placeholder-transparent border-2 border-purple-800`}
                            placeholder="Digite sua senha"
                            value={loginPasswordInput}
                            onChange={(e) => handleInputForm(e, setLoginPasswordInput)}
                            maxLength={10}
                            minLength={6}
                        />
                    </div>

                    <div className="flex justify-center text-white py-2 hover:cursor-pointer hover:animate-pulse">
                        <button  type="button" onClick={(event) => handleDisplayCreateAccount(event)}>
                            Criar Conta</button>
                    </div>
                    {!isLoginFormValid  && erroAlert}
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full my-5 py-2 bg-orange-500 shadow-lg enabled:hover:shadow-orange-500/40 text-white font-semibold disabled:bg-orange-400 disable:shadow-none enabled:shadow-orange-500/50"
                    >{isLoading ? "Carregando...": "Fazer Login"}
                    </button>
                </form>
                )}

                {displaySinginup &&(
                    <form  onSubmit={handleExecutSingUp} className="max-w-[400px] w-full mx-auto bg-purple-600 p-8 rounded-lg">
                        <h2 className="text-4xl dark:text-white font-bold text-center">Criar Conta</h2>

                        <div className="flex flex-col text-white py-2">
                            <label>Email</label>
                            <input
                            type="email"
                            className={`rounded-lg mt-2 p-2 ${
                               isSingUpFormValid ?  `bg-purple-700 focus:bg-purple-800`: 
                                `bg-red-700 focus:bg-red-800`
                            } focus:bg-orange-700 focus:outline-none focus:placeholder-transparent border-2 border-purple-800`}
                            placeholder="Digite seu email"
                            value={singUpEmailInput}
                            onChange={(e) => handleInputForm(e, setSingUpEmailInput)}
                            />                            
                        </div>

                        <div className="flex flex-col text-white py-2">
                            <label>Senha</label>
                            <input
                            type="password"
                            className={`rounded-lg mt-2 p-2 ${
                                isSingUpFormValid ?  `bg-purple-700 focus:bg-purple-800`: 
                                `bg-red-700 focus:bg-red-800`
                            } focus:bg-orange-700 focus:outline-none focus:placeholder-transparent border-2 border-purple-800`}
                            placeholder="Crie a sua senha de 6 a 10 caracteres" maxLength={10} minLength={6}
                            value={singUpPasswordInput}
                            onChange={(e) => handleInputForm(e, setSingUpPasswordInput)}
                            />                            
                        </div>
                        {!isSingUpFormValid && erroAlert}

                        <div className="flex justify-center py-2 text-white hover:cursor-pointer hover: animate-pulse">
                            <button onClick={(event) => handleDisplayLogin(event)} type="button" >Fazer Login</button>
                        </div>
                        <button disabled={isLoading} type="submit" className="w-full my-5 py-2 bg-orange-500 shadow-lg enabled:hover:shadow-orange-500/40 text-white font-semibold rounded-lg disabled:bg-orange-400 disabled:shadow-none enabled:shadow-orange-500/50">{isLoading ? "Carregando...": "Criar Conta"}</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;