import usePost from "../HTTPTest/POST";

const FORM_ENDPOINT = "https://gp-api-alpha.vercel.app/eleicao/votar"; 

const PostForm = () => {
  const Data = {
    "Nome":"Miguel",
    "Email":"miguel@gmail.com",
    "Palavra-Passe":123,
    "estado":1,
    "acessibilidade":"ok?"
  };

  const token = "Token_Admin" // "Token_Aluno"
  
  const { handleSubmit, status } = usePost({
    additionalData,
  });

  return (
    <form action={FORM_ENDPOINT} onSubmit={handleSubmit} method="POST">
      {status !== "loading" && (
        <div className="pt-0 mb-3">
          <button
            className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
            type="submit"
          >
            POST
          </button>
        </div>
      )}
    </form>
  );
};

export default PostForm;
