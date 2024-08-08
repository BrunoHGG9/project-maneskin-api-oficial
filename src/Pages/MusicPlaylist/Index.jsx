import React, { useState, useEffect } from 'react';
import musicas from '../../assets/maneskin.json'; // Caminho atualizado
import './playlist.css';
import { FaPlay, FaHeart } from 'react-icons/fa';

function MusicPlaylist() {
    const [playlist, setPlaylist] = useState([]);
    const [currentMusic, setCurrentMusic] = useState(null);

    useEffect(() => {
        const fetchMusicDetails = async () => {
            const data = musicas.musicas; // Simulando a leitura do JSON
            const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
            const playlistDetails = data.filter(musica => storedPlaylist.includes(musica.id));
            setPlaylist(playlistDetails);
        };

        fetchMusicDetails();
    }, []);

    const handleDeletePlaylist = () => {
        localStorage.removeItem('playlist');
        setPlaylist([]);
    };

    const handleRemoveFromPlaylist = (id) => {
        const updatedPlaylist = playlist.filter(musica => musica.id !== id);
        setPlaylist(updatedPlaylist);
        localStorage.setItem('playlist', JSON.stringify(updatedPlaylist.map(m => m.id)));
    };

    const handlePlayClick = (link) => {
        setCurrentMusic(link);
    };

    return (
        <div className="music-playlist">
            <h1>Playlist</h1>
            <button onClick={handleDeletePlaylist} className="delete-playlist-button">
                Deletar Playlist
            </button>
            <div className="music-card-container playlist-cont">
                {playlist.length > 0 ? (
                    playlist.map((musica) => (
                        <div key={musica.id} className="music-card">
                            <img src={musica.link_imagem} alt={musica.titulo} className="music-image" />
                            <div className="music-content">
                                <h2 className="music-title">{musica.titulo}</h2>
                                <div className="music-info">
                                    <div className="music-info-left">
                                        <p>Álbum: {musica.album}</p>
                                        <p>Idioma: {musica.idioma}</p>
                                        <p>Lançamento: {musica.lancamento}</p>
                                    </div>
                                    <div className="music-info-right">
                                        <p>Quantidade tocada: {musica.quantidade_tocada}</p>
                                        <p>Avaliação do público: {musica.avaliacao_publico}</p>
                                        {musica.premiacao !== "N/A" && (
                                            <p>Premiação: {musica.premiacao}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="music-actions">
                                    <button className="play-button" onClick={() => handlePlayClick(musica.link_iframe)}>
                                        <FaPlay />
                                    </button>
                                    <button 
                                        className="remove-from-playlist-button"
                                        onClick={() => handleRemoveFromPlaylist(musica.id)}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Sua playlist está vazia.</p>
                )}
            </div>
            {currentMusic && (
                <div className="music-player">
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src={`${currentMusic}?autoplay=1`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify Player"
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default MusicPlaylist;
