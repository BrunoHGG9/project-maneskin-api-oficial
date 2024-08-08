import React from 'react';
import Card from '../../components/Cards/Index'; // Importar o componente Card

function MusicAll() {
    const handleAddToPlaylist = (id) => {
        let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
        if (!playlist.includes(id)) {
            playlist.push(id);
            localStorage.setItem('playlist', JSON.stringify(playlist));
        }
    };

    return (
        <div>
            <h1>Todas as Músicas</h1>
            <Card onAddToPlaylist={handleAddToPlaylist} />
        </div>
    );
}

export default MusicAll;
