import React, { useState } from 'react';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Nahraďte svým veřejným klíčem Stripe
const stripePromise = loadStripe('pk_test_51O7zL2K5z9xY7z8z9xY7z8z9xY7z8z9xY7z8z9xY7z8z9xY7z8z9');

const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [styles, setStyles] = useState({ fontSize: '16px', color: '#000000', backgroundColor: '#ffffff', width: 'auto', height: 'auto' });
  const [products, setProducts] = useState([
    { id: 1, name: 'Produkt 1', price: 29.99, description: 'Popis produktu 1' },
    { id: 2, name: 'Produkt 2', price: 49.99, description: 'Popis produktu 2' },
  ]);

  // Přidání textového prvku
  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'text',
      content: 'Nový text',
      x: 10,
      y: 10,
      styles: { ...styles },
    };
    setElements([...elements, newElement]);
  };

  // Přidání obrázku
  const addImageElement = () => {
    const url = prompt('Vložte URL obrázku nebo nahrajte soubor:');
    if (url) {
      const newElement = {
        id: Date.now(),
        type: 'image',
        content: url,
        x: 10,
        y: 10,
        styles: { width: '200px', height: 'auto', ...styles },
      };
      setElements([...elements, newElement]);
    }
  };

  // Přidání formuláře
  const addFormElement = () => {
    const newElement = {
      id: Date.now(),
      type: 'form',
      content: {
        fields: [
          { type: 'text', label: 'Jméno', value: '' },
          { type: 'email', label: 'E-mail', value: '' },
          { type: 'textarea', label: 'Zpráva', value: '' },
        ],
      },
      x: 10,
      y: 10,
      styles: { ...styles, width: '300px', padding: '10px', border: '1px solid #ccc' },
    };
    setElements([...elements, newElement]);
  };

  // Načtení šablon
  const loadTemplate = (templateType) => {
    let templateElements = [];
    switch (templateType) {
      case 'portfolio':
        templateElements = [
          { id: Date.now(), type: 'text', content: 'Moje portfolio', x: 50, y: 50, styles: { fontSize: '32px', color: '#000000' } },
          { id: Date.now() + 1, type: 'image', content: 'https://via.placeholder.com/300', x: 50, y: 100, styles: { width: '300px', height: 'auto' } },
        ];
        break;
      case 'blog':
        templateElements = [
          { id: Date.now(), type: 'text', content: 'Vítejte na mém blogu', x: 50, y: 50, styles: { fontSize: '32px', color: '#000000' } },
          { id: Date.now() + 1, type: 'text', content: 'Článek 1', x: 50, y: 100, styles: { fontSize: '20px', color: '#666666' } },
        ];
        break;
      case 'eshop':
        templateElements = [
          { id: Date.now(), type: 'text', content: 'Náš e-shop', x: 50, y: 50, styles: { fontSize: '32px', color: '#000000' } },
          { id: Date.now() + 1, type: 'product', content: products[0], x: 50, y: 100, styles: { width: '200px', padding: '10px', border: '1px solid #ccc' } },
        ];
        break;
      default:
        break;
    }
    setElements(templateElements);
  };

  // Přetažení prvku
  const handleDrag = (id, e) => {
    e.preventDefault();
    const updatedElements = elements.map((el) =>
      el.id === id ? { ...el, x: e.clientX - 50, y: e.clientY - 20 } : el
    );
    setElements(updatedElements);
  };

  // Výběr prvku
  const selectElement = (id) => {
    const element = elements.find((el) => el.id === id);
    setSelectedElement(element);
    setStyles(element.styles);
  };

  // Aktualizace stylů
  const updateStyles = (key, value) => {
    const updatedStyles = { ...styles, [key]: value };
    setStyles(updatedStyles);
    if (selectedElement) {
      const updatedElements = elements.map((el) =>
        el.id === selectedElement.id ? { ...el, styles: updatedStyles } : el
      );
      setElements(updatedElements);
    }
  };

  // Uložení designu
  const saveDesign = () => {
    localStorage.setItem('webBuilderDesign', JSON.stringify(elements));
  };

  // Načtení designu
  const loadDesign = () => {
    const saved = localStorage.getItem('webBuilderDesign');
    if (saved) setElements(JSON.parse(saved));
  };

  // Export stránky jako HTML
  const exportPage = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .canvas-element { position: absolute; padding: 8px; border: 1px solid #e5e7eb; }
            .form-element { display: flex; flex-direction: column; }
            .form-element input, .form-element textarea { margin: 5px 0; padding: 5px; }
            .product-element { display: flex; flex-direction: column; align-items: center; }
            ${elements.map((el) => `#el-${el.id} { left: ${el.x}px; top: ${el.y}px; ${Object.entries(el.styles).map(([k, v]) => `${k}: ${v};`).join(' ')} }`).join(' ')}
          </style>
        </head>
        <body>
          ${elements.map((el) => {
            if (el.type === 'text') {
              return `<div id="el-${el.id}" class="canvas-element">${el.content}</div>`;
            } else if (el.type === 'image') {
              return `<img id="el-${el.id}" class="canvas-element" src="${el.content}" style="${Object.entries(el.styles).map(([k, v]) => `${k}: ${v};`).join(' ')}" />`;
            } else if (el.type === 'form') {
              return `
                <form id="el-${el.id}" class="canvas-element form-element">
                  ${el.content.fields.map((field) => `
                    <label>${field.label}</label>
                    ${field.type === 'textarea' ? `<textarea>${field.value}</textarea>` : `<input type="${field.type}" value="${field.value}" />`}
                  `).join('')}
                  <button type="submit">Odeslat</button>
                </form>`;
            } else if (el.type === 'product') {
              return `
                <div id="el-${el.id}" class="canvas-element product-element">
                  <h3>${el.content.name}</h3>
                  <p>${el.content.description}</p>
                  <p>Cena: $${el.content.price}</p>
                  <button onclick="alert('Přesměrování na platbu...')">Koupit</button>
                </div>`;
            }
            return '';
          }).join('')}
        </body>
      </html>
    `;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webpage.html';
    a.click();
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Moderní Web Builder</h1>

          {/* Panel nástrojů */}
          <div className="flex justify-between mb-6 flex-wrap gap-4">
            <div className="space-x-2">
              <button
                onClick={addTextElement}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Přidat text
              </button>
              <button
                onClick={addImageElement}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
              >
                Přidat obrázek
              </button>
              <button
                onClick={addFormElement}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Přidat formulář
              </button>
              <button
                onClick={() => loadTemplate('portfolio')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Portfolio šablona
              </button>
              <button
                onClick={() => loadTemplate('blog')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Blog šablona
              </button>
              <button
                onClick={() => loadTemplate('eshop')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                E-shop šablona
              </button>
              <button
                onClick={saveDesign}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Uložit design
              </button>
              <button
                onClick={loadDesign}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Načíst design
              </button>
              <button
                onClick={exportPage}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Exportovat HTML
              </button>
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm">Velikost písma</label>
                <input
                  type="text"
                  value={styles.fontSize}
                  onChange={(e) => updateStyles('fontSize', e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="16px"
                />
              </div>
              <div>
                <label className="block text-sm">Barva textu</label>
                <input
                  type="color"
                  value={styles.color}
                  onChange={(e) => updateStyles('color', e.target.value)}
                  className="border rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Barva pozadí</label>
                <input
                  type="color"
                  value={styles.backgroundColor}
                  onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                  className="border rounded"
                />
              </div>
            </div>
          </div>

          {/* Plátno */}
          <div
            className="relative bg-gray-200 border border-gray-300 rounded-lg h-[600px] w-full overflow-auto"
            style={{ position: 'relative' }}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                draggable
                onDrag={(e) => handleDrag(element.id, e)}
                onClick={() => selectElement(element.id)}
                className="absolute p-2 border border-gray-300 rounded bg-white cursor-move select-none"
                style={{
                  left: element.x,
                  top: element.y,
                  ...element.styles,
                }}
              >
                {element.type === 'text' && (
                  <div contentEditable suppressContentEditableWarning>
                    {element.content}
                  </div>
                )}
                {element.type === 'image' && (
                  <img src={element.content} alt="Uploaded" style={element.styles} />
                )}
                {element.type === 'form' && (
                  <form className="flex flex-col gap-2">
                    {element.content.fields.map((field, index) => (
                      <div key={index}>
                        <label>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            defaultValue={field.value}
                            className="border rounded w-full p-2"
                          />
                        ) : (
                          <input
                            type={field.type}
                            defaultValue={field.value}
                            className="border rounded w-full p-2"
                          />
                        )}
                      </div>
                    ))}
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                      Odeslat
                    </button>
                  </form>
                )}
                {element.type === 'product' && (
                  <div className="flex flex-col items-center">
                    <h3>{element.content.name}</h3>
                    <p>{element.content.description}</p>
                    <p>Cena: ${element.content.price}</p>
                    <CheckoutForm product={element.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default App;