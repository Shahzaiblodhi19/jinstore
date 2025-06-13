'use client';

import React, { useState, useEffect, useRef } from "react";
import Divider from '@mui/material/Divider';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Languages = {
  "en": "English",
  "es": "español",
  "ar": "العربية",
  "de": "Deutsch",
  "iw": "עברית",           // ✅ Use modern ISO 639-1 code
  "ko": "한국어",
  "pt": "português",
  "zh-cn": "中文 (简体)",
  "zh-tw": "中文 (繁體)"
};

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },               // English
  { code: 'EUR', symbol: '€', name: 'Euro' },                    // Spanish & German
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },             // Arabic
  { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },      // Hebrew
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },        // Korean
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },         // Portuguese
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan (Renminbi)' }, // Simplified Chinese
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },     // Traditional Chinese
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },         // PKR
];
// From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221
function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="100%" stopColor="#FFB709" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress size={28} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}

export default function Header() {
  const [language, setLanguage] = useState('en'); // Default language: en
  const [loading, setLoading] = useState(false); // Track loading state
  const [translations, setTranslations] = useState([]); // Store translations
  const [Currencyloading, setCurrencyloading] = useState(false); // Track loading state
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(1);
  const [rawPrices, setRawPrices] = useState([]);

  // Helper to get currency symbol by code
  const getSymbol = (code) => currencies.find(c => c.code === code)?.symbol || '';

  // On mount, read raw prices (without symbols) from DOM and store in state
  useEffect(() => {
    const priceElements = document.querySelectorAll('#price');
    const amounts = Array.from(priceElements).map(el => {
      const text = el.textContent.trim();
      // Remove any non-numeric chars except dot
      const cleaned = text.replace(/,/g, '').replace(/[^0-9.]/g, '');
      return parseFloat(cleaned);
    });
    setRawPrices(amounts);
  }, []);

  // When rawPrices or selectedCurrency changes, update the DOM prices with symbol
  useEffect(() => {
    if (rawPrices.length === 0) return;

    const priceElements = document.querySelectorAll('#price');

    if (selectedCurrency === 'USD') {
      // Reset to raw USD prices with symbol
      priceElements.forEach((el, i) => {
        el.textContent = getSymbol(selectedCurrency) + rawPrices[i].toFixed(2);
      });
      setConversionRate(1);
      return;
    }

    // Fetch conversion rates and update prices with symbol
    setCurrencyloading(true);
    (async () => {
      try {
        const res = await fetch('/api/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: 'USD',
            to: selectedCurrency,
            amounts: rawPrices,
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Conversion failed');
          setCurrencyloading(false);
          return;
        }

        priceElements.forEach((el, i) => {
          el.textContent = getSymbol(selectedCurrency) + data.results[i].toFixed(2);
        });

        setConversionRate(data.rate);
      } catch (err) {
        alert('Error fetching conversion');
      }
      setCurrencyloading(false);
    })();
  }, [selectedCurrency, rawPrices]);

  const handleTranslate = async (selectedLanguage = language) => {
    setLoading(true);
    setTranslations([]);

    const textNodes = [];
    const walk = (node) => {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.nodeValue.trim() !== '' &&
        !node.parentElement.hasAttribute('data-no-translate')
      ) {
        textNodes.push(node);
      } else {
        node.childNodes.forEach(walk);
      }
    };


    walk(document.body);

    // Store original text only once
    textNodes.forEach((node) => {
      const el = node.parentElement;
      if (!el.dataset.originalText) {
        el.dataset.originalText = node.nodeValue.trim();
      }
    });


    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'en', // Always translate from English source
          to: selectedLanguage,
          texts: textNodes.map(node => node.parentElement.dataset.originalText), // Always translate original text
        }),
      });

      const data = await res.json();
      const translatedTexts = data.translations;

      if (translatedTexts.length !== textNodes.length) {
        console.error('Translation mismatch:', data);
        return;
      }

      textNodes.forEach((node, index) => {
        node.nodeValue = translatedTexts[index];
      });

      setTranslations(translatedTexts);
      setLoading(false);
    } catch (error) {
      console.error('Error during translation:', error);
      alert('Something went wrong with translation.');
    } finally {
      setLoading(false);
    }
  };
  const boxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShowSelector(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const currencyRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrencySelector(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const [showSelector, setShowSelector] = useState(false);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const usdCurrency = currencies.find(c => c.code === 'USD');


  return (
    <header className="bg-white py-3 text-white border-b border-[#E5E7EB]">
      <div className="flex items-center justify-between container">
        <div className="flex items-center gap-4">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]">
              About Us
            </a>
            <a href="/" className="text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]">
              My Account
            </a>
            <a href="/" className="text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]">
              Wishlist
            </a>
          </div>

          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ backgroundColor: '#E5E7EB', height: '15px' }}
          />

          {/* Centered delivery time */}
          <div className="text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
            We deliver to you every day from{" "}
            <span className="text-[#EA580C] font-[700]">7:00 to 23:00</span>
          </div>
        </div>

        {/* Right side: Language & Currency */}
        <div className="flex items-center space-x-4">
          <div className="relative inline-block">
            <span
              ref={boxRef}
              data-no-translate="true"   // Mark so your translate code skips it
              className="bg-transparent flex items-center gap-1 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
              onClick={() => setShowSelector(!showSelector)}
            >
              {Languages[language]}
              <svg style={{ transform: showSelector ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease-in-out' }} xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                <path
                  d="M1 3L4 6.5L7 3"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="relative">

              <div
                ref={boxRef}
                className={`absolute left-0 mt-4 transition-all duration-300 ease-in-out transform ${showSelector ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                  } z-50 bg-white border-2 border-[#E5E7EB] shadow-md w-57`}
              >
                {loading ? (
                  <div className="w-full flex justify-center items-center h-36">
                    <GradientCircularProgress />
                  </div>
                ) : (
                  <>
                    <FormControl
                      component="fieldset"
                      className="w-full scrollbar"
                      style={{
                        maxHeight: '800px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin', // Firefox
                        scrollbarColor: '#634C9F transparent', // Firefox
                      }}
                    >
                      {/* Header and English (outside RadioGroup, but same logic) */}
                      <div className="border-b border-[#E5E7EB] p-3">
                        <span
                          className="text-[#6B7280] font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px]"
                        >
                          Change language
                        </span>

                        <span
                          data-no-translate="true"
                          className="mt-2 flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                          onClick={() => {
                            setLanguage('en');
                            handleTranslate('en');
                          }}
                        >
                          <Radio
                            checked={language === 'en'}
                            value="en"
                            name="language-selector"
                            onChange={(e) => {
                              setLanguage(e.target.value);
                              handleTranslate(e.target.value);
                            }}
                            size="small"
                            sx={{
                              padding: 0,
                              color: '#aaa',
                              '&.Mui-checked': {
                                color: '#634C9F',
                              },
                              '.hm:hover &': {
                                color: '#634C9F',
                              },
                            }}
                          />
                          {'English - (en)'}
                        </span>

                      </div>

                      {/* Other Languages in RadioGroup */}
                      <RadioGroup
                        value={language}
                        onChange={(e) => {
                          const selectedLang = e.target.value;
                          if (selectedLang !== "loading") {
                            setLanguage(selectedLang);
                            handleTranslate(selectedLang);
                          }
                        }}
                        aria-label="language"
                        name="language-selector"
                        className="flex flex-col px-3 py-3 gap-2"
                      >
                        {(
                          Object.entries(Languages)
                            .filter(([code]) => code !== 'en') // Skip English
                            .map(([code, name]) => (
                              <span
                                className="flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                                key={code}
                                onClick={() => {
                                  setLanguage(code);
                                  handleTranslate(code);
                                }}
                              >
                                <Radio
                                  checked={language === code}
                                  value={code}
                                  size="small"
                                  name="language-selector"
                                  sx={{
                                    padding: 0,
                                    color: '#aaa',
                                    '&.Mui-checked': {
                                      color: '#634C9F',
                                    },
                                    '.hm:hover &': {
                                      color: '#634C9F',
                                    },
                                  }}
                                />
                                {name} - {`(${code})`}
                              </span>
                            ))
                        )}
                      </RadioGroup>
                    </FormControl>
                    <div className="border-t border-[#E5E7EB] pt-2 pb-4 px-3 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
                      You are Shopping on <span className="text-[#634C9F] font-[600]"> Jin Store </span>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>

          <div className="relative inline-block">
            <span
              ref={currencyRef}
              data-no-translate="true"   // Mark so your translate code skips it
              className="bg-transparent flex items-center gap-1 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
              onClick={() => setShowCurrencySelector(!showCurrencySelector)}
            >
              {selectedCurrency}
              <svg style={{ transform: showCurrencySelector ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease-in-out' }} xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                <path
                  d="M1 3L4 6.5L7 3"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="relative">

              <div
                ref={currencyRef}
                className={`absolute left-0 mt-4 transition-all duration-300 ease-in-out transform ${showCurrencySelector ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                  } z-50 bg-white border-2 border-[#E5E7EB] shadow-md w-57`}
              >
                {Currencyloading ? (
                  <div className="w-full flex justify-center items-center h-36">
                    <GradientCircularProgress />
                  </div>
                ) : (
                  <>
                    <FormControl
                      component="fieldset"
                      className="w-full scrollbar"
                      style={{
                        maxHeight: '800px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin', // Firefox
                        scrollbarColor: '#634C9F transparent', // Firefox
                      }}
                    >
                      {/* Header and English (outside RadioGroup, but same logic) */}
                      <div className="border-b border-[#E5E7EB] p-3">
                        <span
                          className="text-[#6B7280] font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px]"
                        >
                          Change Currency
                        </span>

                        {usdCurrency && (
                          <span
                            data-no-translate="true"
                            className="mt-2 flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                            onClick={() => setSelectedCurrency(usdCurrency.code)}
                          >
                            <Radio
                              checked={selectedCurrency === usdCurrency.code}
                              value={usdCurrency.code}
                              name="currency-selector"
                              onChange={(e) => setSelectedCurrency(e.target.value)}
                              size="small"
                              sx={{
                                padding: 0,
                                color: '#aaa',
                                '&.Mui-checked': {
                                  color: '#634C9F',
                                },
                                '.hm:hover &': {
                                  color: '#634C9F',
                                },
                              }}
                            />
                            {`${usdCurrency.code} - (${usdCurrency.symbol})`}
                          </span>
                        )}


                      </div>

                      {/* Other Languages in RadioGroup */}
                      <RadioGroup
                        value={selectedCurrency}
                        onChange={(e) => {
                          const selectedCurrency = e.target.value;
                          if (selectedCurrency !== "loading") {
                            setSelectedCurrency(selectedCurrency);
                          }
                        }}
                        aria-label="language"
                        name="language-selector"
                        className="flex flex-col px-3 py-3 gap-2"

                      >
                        {currencies
                          .filter(c => c.code !== 'USD') // ✅ Skip USD
                          .map(c => (
                            <span
                              key={c.code}
                              className="flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                              onClick={() => {
                                setSelectedCurrency(c.code);
                              }}
                              data-no-translate="true"
                            >
                              <Radio
                                checked={selectedCurrency === c.code}
                                value={c.code}
                                size="small"
                                name="currency-selector"
                                sx={{
                                  padding: 0,
                                  color: '#aaa',
                                  '&.Mui-checked': {
                                    color: '#634C9F',
                                  },
                                  '.hm:hover &': {
                                    color: '#634C9F',
                                  },
                                }}
                              />
                              {`${c.code}`} -  {`(${c.symbol})`}
                            </span>
                          ))}

                      </RadioGroup>
                    </FormControl>
                    <div className="border-t border-[#E5E7EB] pt-2 pb-4 px-3 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
                      You are Shopping on <span className="text-[#634C9F] font-[600]"> Jin Store </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Order Tracking Link */}
          <a href="/" className="text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer">
            Order Tracking
          </a>
        </div>
      </div>
    </header>
  );
}
