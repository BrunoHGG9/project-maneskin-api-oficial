import React, { useState, useEffect } from 'react';
import musicas from '../../assets/maneskin.json'; // Caminho atualizado
import './MusicRandom.css'; // Importar estilo para o componente
import { FaPlay, FaHeart } from 'react-icons/fa';

function MusicRandom() {
    const [musicList, setMusicList] = useState([]);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [playlist, setPlaylist] = useState(() => {
        const savedPlaylist = localStorage.getItem('playlist');
        return savedPlaylist ? JSON.parse(savedPlaylist) : [];
    });

    useEffect(() => {
        setMusicList(musicas.musicas);
    }, []);

    const handleRandomMusic = () => {
        if (musicList.length > 0) {
            const randomIndex = Math.floor(Math.random() * musicList.length);
            setCurrentMusic(musicList[randomIndex]);
        }
    };

    const handleAddToPlaylist = () => {
        if (currentMusic) {
            const updatedPlaylist = [...playlist, currentMusic.id];
            setPlaylist(updatedPlaylist);
            localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
        }
    };

    const handlePlayClick = (iframeLink) => {
        setCurrentMusic(prev => ({ ...prev, link_iframe: iframeLink }));
    };

    return (
        <div className="music-random">
            <h1>Música Aleatória</h1>
            <button className="random-music-button" onClick={handleRandomMusic}>
                Mostrar Música Aleatória
            </button>
            <div className="music-card-container music-random-container">
                {currentMusic && (
                    <div className="music-card">
                        <img src={currentMusic.link_imagem} alt={currentMusic.titulo} className="music-image" />
                        <div className="music-content">
                            <h2 className="music-title">{currentMusic.titulo}</h2>
                            <div className="music-info">
                                <div className="music-info-left">
                                    <p>Álbum: {currentMusic.album}</p>
                                    <p>Idioma: {currentMusic.idioma}</p>
                                    <p>Lançamento: {currentMusic.lancamento}</p>
                                </div>
                                <div className="music-info-right">
                                    <p>Quantidade tocada: {currentMusic.quantidade_tocada}</p>
                                    <p>Avaliação do público: {currentMusic.avaliacao_publico}</p>
                                    {currentMusic.premiacao !== "N/A" && (
                                        <p>Premiação: {currentMusic.premiacao}</p>
                                    )}
                                </div>
                            </div>
                            <div className="music-actions">
                                <button className="play-button" onClick={() => handlePlayClick(currentMusic.link_iframe)}>
                                    <FaPlay />
                                </button>
                                <button 
                                    className={`playlist-button ${playlist.includes(currentMusic.id) ? 'active' : ''}`}
                                    onClick={handleAddToPlaylist}
                                >
                                    <FaHeart />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {currentMusic && (
                <>
                    <div className="music-player">
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={`${currentMusic.link_iframe}?autoplay=1`}
                            width="100%"
                            height="80"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title="Spotify Player"
                        ></iframe>
                    </div>
                    <button className="add-to-playlist-button" onClick={handleAddToPlaylist}>
                        Adicionar à Playlist
                    </button>
                </>
            )}
        </div>
    );
}

export default MusicRandom;
