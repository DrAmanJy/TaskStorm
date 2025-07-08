const NeonCard = ({ children }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-cyan-600/30 hover:scale-105 transition duration-300 text-center">
      {children}
    </div>
  );
};

export default NeonCard;
