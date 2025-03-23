const user = {
    name: 'Juan Pérez',
    email: 'juanperez@email.com',
  };
  
  const userVideos = [
    {
      id: 1,
      title: 'Acto del Bicentenario en Sucre',
      thumbnail: '/images/sucre.jpg',
    },
  ];
  
  const userAudios = [
    {
      id: 1,
      title: 'Testimonio de mi abuelo',
      audioUrl: '/audios/testimonio-1.mp3',
    },
  ];
  
  const userPosts = [
    {
      id: 1,
      text: 'Orgulloso de ser parte de los 200 años de Bolivia 🇧🇴',
      imageUrl: '/images/publi-1.jpg',
    },
  ];
  
  const Profile = () => {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-purple-500 mb-6">Mi perfil</h1>
  
        {/* Info del usuario */}
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <p className="text-lg text-gray-700 font-semibold">👤 {user.name}</p>
          <p className="text-gray-500">✉️ {user.email}</p>
        </div>
  
        {/* Videos */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-pink-500 mb-4">Mis videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow hover:shadow-md transition">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-pink-500">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Audios */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-green-500 mb-4">Mis testimonios</h2>
          <div className="space-y-4">
            {userAudios.map((audio) => (
              <div key={audio.id} className="bg-white rounded-xl shadow p-4">
                <p className="font-semibold text-green-600">{audio.title}</p>
                <audio controls className="w-full mt-2">
                  <source src={audio.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        </section>
  
        {/* Publicaciones */}
        <section>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Mis publicaciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={post.imageUrl} alt="Post" className="w-full h-64 object-cover" />
                <div className="p-4">
                  <p className="text-gray-700 text-sm">{post.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };
  
  export default Profile;
  