import React from 'react';

const VerifyInstructions: React.FC = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-green-800 mb-2">Jak weryfikować?</h3>
      <ul className="text-sm text-green-700 space-y-1">
        <li>• Sprawdź zdjęcia i opis drzewa</li>
        <li>• Oceń czy dane są poprawne i kompletne</li>
        <li>• Zagłosuj za zatwierdzeniem lub odrzuceniem</li>
        <li>• Dodaj komentarz lub legendę z dodatkowymi informacjami</li>
      </ul>
    </div>
  );
};

export default VerifyInstructions;
