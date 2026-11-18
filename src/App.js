import './App.css';
function App() {
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-brand-600">ConectaPlus</h1>
        <p className="text-gray-600">Tailwind v4 está configurado y funcionando correctamente.</p>
        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 bg-brand-500 text-white rounded-full text-sm font-medium">
            Brand Color
          </span>
          <span className="px-3 py-1 bg-telco-green text-white rounded-full text-sm font-medium">
            Telco Green
          </span>
        </div>
      </div>
    </div>
  );
}
export default App;
