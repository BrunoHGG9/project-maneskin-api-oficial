// Route.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MusicAll from './MusicAll';
import MusicRandom from './MusicRandom';
import MusicPlaylist from './MusicPlaylist';

function RouteConfig() {
    return (
        <Routes>
            <Route path="/" element={<MusicAll />} />
            <Route path="/random" element={<MusicRandom />} />
            <Route path="/playlist" element={<MusicPlaylist />} />
        </Routes>
    );
}

export default RouteConfig;
