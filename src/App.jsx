import RaffleWidget from './components/RaffleWidget';

function App() {
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to MumbaiLore</h1>
            <p className="text-center text-gray-600">Scroll to bottom-right to open the Raffle Widget</p>

            <RaffleWidget />
        </div>
    );
}

export default App;
