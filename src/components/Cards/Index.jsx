import React, { useState, useEffect } from 'react';
import musicas from '../../assets/maneskin.json';
import { FaPlay, FaHeart } from 'react-icons/fa';
import './cards.css';

function Card({ onAddToPlaylist }) {
    const [musicList, setMusicList] = useState([]);
    const [currentMusic, setCurrentMusic] = useState(null);
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        setMusicList(musicas.musicas);
        const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
        setPlaylist(storedPlaylist);
    }, []);

    const handlePlayClick = (link) => {
        setCurrentMusic(link);
    };

    const handleAddToPlaylist = (musica) => {
        let updatedPlaylist;
        const isAlreadyInPlaylist = playlist.includes(musica.id);
        if (isAlreadyInPlaylist) {
            updatedPlaylist = playlist.filter(id => id !== musica.id);
        } else {
            updatedPlaylist = [...playlist, musica.id];
        }
        setPlaylist(updatedPlaylist);
        localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
        onAddToPlaylist(musica.id);
    };

    return (
        <div>
            <div className="music-list">
                {musicList.map((musica) => (
                    <div key={musica.id} className="music-card">
                        <img src={musica.link_imagem} alt={musica.titulo} className="music-image" />
                        <div className="music-content">
                            <h2 className="music-title">
                                {musica.titulo}
                                {musica.premiacao !== "N/A" && (
                                    <span className="music-award"> - {musica.premiacao}</span>
                                )}
                            </h2>
                            <div className="music-info">
                                <div className="music-info-left">
                                    <p>Álbum: {musica.album}</p>
                                    <p>Idioma: {musica.idioma}</p>
                                    <p>Lançamento: <br/>{musica.lancamento}</p>
                                </div>
                                <div className="music-info-right">
                                    <p>Quantidade tocada: {musica.quantidade_tocada}</p>
                                    <p>Avaliação do público: {musica.avaliacao_publico}</p>
                                </div>
                            </div>
                            <div className="music-actions">
                                <button className="play-button" onClick={() => handlePlayClick(musica.link_iframe)}>
                                    <FaPlay />
                                </button>
                                <button 
                                    className={`playlist-button ${playlist.includes(musica.id) ? 'active' : ''}`}
                                    onClick={() => handleAddToPlaylist(musica)}
                                >
                                    <FaHeart />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {currentMusic && (
                <div className="music-player">
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src={`${currentMusic}?autoplay=1`}
                        width="300"
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

export default Card;
