
import Admin from "./Admin/Base";
import Eleitor from "./Eleitor/Base";

const Home = () =>{

    // Decide se exibe páginas de eleitor (true) ou administrador (false).
    let option = false;

    if(option)
        return (<Eleitor />);
    else
        return(<Admin />);
};

export default Home;