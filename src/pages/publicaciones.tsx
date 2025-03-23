const publicaciones = [
    {
      id: 1,
      author: 'Ana Chuquimia',
      text: '¡Orgullosa de celebrar los 200 años de nuestra amada Bolivia! 🇧🇴✨',
      imageUrl: '/images/publi-1.jpg',
    },
    {
      id: 2,
      author: 'René Quispe',
      text: 'Mi abuelita me enseñó a tejer desde niño. Estas fotos son su legado ❤️',
      imageUrl: '/images/publi-2.jpg',
    },
    {
      id: 3,
      author: 'Soledad Rivera',
      text: 'Una caminata en el Valle de la Luna 🏜️',
      imageUrl: '/images/publi-3.jpg',
    },
  ];
  
  const Publicaciones = () => {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-blue-500 mb-8 text-center">
          Publicaciones de la comunidad
        </h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {publicaciones.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={post.imageUrl}
                alt="Publicación"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">{post.author}</p>
                <p className="text-gray-700 text-base">{post.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Publicaciones;
  