import useDelete from "../HTTPTest/DELETE";

const FORM_ENDPOINT = "https://gp-api-alpha.vercel.app/conta/remover"; // TODO - update to the correct endpoint

const DeleteForm = () => {
  const additionalData = {
    data: "OK",
  };

  const { handleSubmit, status } = useDelete({
    additionalData,
  });

  return (
    <form action={FORM_ENDPOINT} onSubmit={handleSubmit} method="GET">
      {status !== "loading" && (
        <div className="pt-0 mb-3">
          <button
            className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
            type="submit"
          >
            DELETE
          </button>
        </div>
      )}
    </form>
  );
};

export default DeleteForm;
