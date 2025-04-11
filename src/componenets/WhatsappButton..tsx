
const WhatsAppButton = () => {
  const phoneNumber = "923125430959"; // Replace with your number

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 flex items-center justify-center"
    >
      {/* <MessageCircle size={28} /> */}
      <img src="w.png" alt="" className="w-10 h-10" />
    </a>
  );
};

export default WhatsAppButton;
