import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccompaniments } from '../hooks/useAccompaniments';
import { AccompanimentCard } from '../components/accompaniments/AccompanimentCard';

export function MyAccompaniments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'scheduled' | 'history'>('scheduled');
  const { scheduledAccompaniments, historyAccompaniments, tabs } = useAccompaniments();

  const displayAccompaniments = activeTab === 'scheduled' 
    ? scheduledAccompaniments 
    : historyAccompaniments;

  const handleSearchClick = () => {
    navigate('/search-accompaniments');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Acompañamientos</h1>
        <button 
          onClick={handleSearchClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Buscar Próximo</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 font-medium text-base transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accompaniments List */}
      <div className="flex-1 overflow-y-auto -mx-8 -mb-8">
        {displayAccompaniments.length > 0 ? (
          <div>
            {displayAccompaniments.map((accompaniment) => (
              <AccompanimentCard key={accompaniment.id} accompaniment={accompaniment} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No hay acompañamientos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}