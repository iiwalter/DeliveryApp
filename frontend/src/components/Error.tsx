interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => (
  <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg opacity-100">
    <span>Erro: {message}</span>
  </div>
);
