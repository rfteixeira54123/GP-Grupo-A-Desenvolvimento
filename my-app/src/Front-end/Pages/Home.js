
import Admin from "./Admin/Base";
import Eleitor from "./Eleitor/Base";

const Home = ({option}) =>{
    if(option)
        return (<Eleitor />);
    else
        return(<Admin />);
};

Home.defaultProps = {
    option: true
};

export default Home;