import icon from "../assets/icon.png";

export const Header = () => {
  return (
    <header className="flex items-center p-4 bg-black">
      <img src={icon} alt="Logo" className="h-20 w-20 mr-10 ml-4" />
      <h1 className="text-pink-500 text-2xl font-semibold">
        Cadastro de entrega para clientes
      </h1>
    </header>
  );
};

