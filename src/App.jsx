import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicAll from './Pages/MusicAll/Index';
import MusicRandom from './Pages/MusicaRandom/Index';
import MusicPlaylist from './Pages/MusicPlaylist/Index';
import Footer from './components/Footer/Index'; // Importar o Footer
import Header from './components/Header/Index';

function App() {
    return (
        <Router>
            <div className="App">
                    <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<MusicAll />} />
                        <Route path="/random" element={<MusicRandom />} />
                        <Route path="/playlist" element={<MusicPlaylist />} />
                    </Routes>
                </main>
                <Footer /> {/* Adicione o Footer */}
            </div>
        </Router>
    );
}

export default App;
