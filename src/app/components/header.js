"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Divider from "@mui/material/Divider";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Logo from "../assets/logo.svg"; // Adjust the path as needed
import Link from "next/link";

const Languages = {
  en: "English",
  es: "español",
  ar: "العربية",
  de: "Deutsch",
  iw: "עברית", // ✅ Use modern ISO 639-1 code
  ko: "한국어",
  pt: "português",
  "zh-cn": "中文 (简体)",
  "zh-tw": "中文 (繁體)",
};

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" }, // English
  { code: "EUR", symbol: "€", name: "Euro" }, // Spanish & German
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" }, // Arabic
  { code: "ILS", symbol: "₪", name: "Israeli New Shekel" }, // Hebrew
  { code: "KRW", symbol: "₩", name: "South Korean Won" }, // Korean
  { code: "BRL", symbol: "R$", name: "Brazilian Real" }, // Portuguese
  { code: "CNY", symbol: "¥", name: "Chinese Yuan (Renminbi)" }, // Simplified Chinese
  { code: "TWD", symbol: "NT$", name: "New Taiwan Dollar" }, // Traditional Chinese
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" }, // PKR
];
// From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221
function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0} style={{ zIndex: "100" }}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="100%" stopColor="#FFB709" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={28}
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

export default function Header() {
  const [language, setLanguage] = useState("en"); // Default language: en
  const [loading, setLoading] = useState(false); // Track loading state
  const [language2, setLanguage2] = useState("en"); // Default language: en
  const [loading2, setLoading2] = useState(false); // Track loading state
  const [translations, setTranslations] = useState([]); // Store translations
  const [translations2, setTranslations2] = useState([]); // Store translations
  const [Currencyloading, setCurrencyloading] = useState(false); // Track loading state
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [rawPrices, setRawPrices] = useState([]);
  const [Currencyloading2, setCurrencyloading2] = useState(false); // Track loading state
  const [selectedCurrency2, setSelectedCurrency2] = useState("USD");
  const [conversionRate2, setConversionRate2] = useState(1);

  // Helper to get currency symbol by code
  const getSymbol = (code) =>
    currencies.find((c) => c.code === code)?.symbol || "";

  // On mount, read raw prices (without symbols) from DOM and store in state
  useEffect(() => {
    const priceElements = document.querySelectorAll("#price");
    const amounts = Array.from(priceElements).map((el) => {
      const text = el.textContent.trim();
      // Remove any non-numeric chars except dot
      const cleaned = text.replace(/,/g, "").replace(/[^0-9.]/g, "");
      return parseFloat(cleaned);
    });
    setRawPrices(amounts);
  }, []);

  useEffect(() => {
    const priceElements = document.querySelectorAll("#price");
    const amounts = Array.from(priceElements).map((el) => {
      const text = el.textContent.trim();
      // Remove any non-numeric chars except dot
      const cleaned = text.replace(/,/g, "").replace(/[^0-9.]/g, "");
      return parseFloat(cleaned);
    });
    setRawPrices(amounts);
  }, []);

  // When rawPrices or selectedCurrency changes, update the DOM prices with symbol
  useEffect(() => {
    if (rawPrices.length === 0) return;

    const priceElements = document.querySelectorAll("#price");

    if (selectedCurrency === "USD") {
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
        const res = await fetch("/api/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "USD",
            to: selectedCurrency,
            amounts: rawPrices,
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Conversion failed");
          setCurrencyloading(false);
          return;
        }

        priceElements.forEach((el, i) => {
          el.textContent =
            getSymbol(selectedCurrency) + data.results[i].toFixed(2);
        });

        setConversionRate(data.rate);
      } catch (err) {
        alert("Error fetching conversion");
      }
      setCurrencyloading(false);
    })();
  }, [selectedCurrency, rawPrices]);

  useEffect(() => {
    if (rawPrices.length === 0) return;

    const priceElements = document.querySelectorAll("#price");

    if (selectedCurrency2 === "USD") {
      // Reset to raw USD prices with symbol
      priceElements.forEach((el, i) => {
        el.textContent = getSymbol(selectedCurrency2) + rawPrices[i].toFixed(2);
      });
      setConversionRate2(1);
      return;
    }

    // Fetch conversion rates and update prices with symbol
    setCurrencyloading2(true);
    (async () => {
      try {
        const res = await fetch("/api/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "USD",
            to: selectedCurrency2,
            amounts: rawPrices,
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Conversion failed");
          setCurrencyloading2(false);
          return;
        }

        priceElements.forEach((el, i) => {
          el.textContent =
            getSymbol(selectedCurrency2) + data.results[i].toFixed(2);
        });

        setConversionRate2(data.rate);
      } catch (err) {
        alert("Error fetching conversion");
      }
      setCurrencyloading2(false);
    })();
  }, [selectedCurrency2, rawPrices]);

  const handleTranslate = async (selectedLanguage = language) => {
    setLoading(true);
    setTranslations([]);

    const textNodes = [];
    const walk = (node) => {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.nodeValue.trim() !== "" &&
        !node.parentElement.hasAttribute("data-no-translate")
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
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "en", // Always translate from English source
          to: selectedLanguage,
          texts: textNodes.map(
            (node) => node.parentElement.dataset.originalText
          ), // Always translate original text
        }),
      });

      const data = await res.json();
      const translatedTexts = data.translations;

      if (translatedTexts.length !== textNodes.length) {
        console.error("Translation mismatch:", data);
        return;
      }

      textNodes.forEach((node, index) => {
        node.nodeValue = translatedTexts[index];
      });

      setTranslations(translatedTexts);
      setLoading(false);
    } catch (error) {
      console.error("Error during translation:", error);
      alert("Something went wrong with translation.");
    } finally {
      setLoading(false);
    }
  };
  const handleTranslate2 = async (selectedLanguage2 = language2) => {
    setLoading2(true);
    setTranslations2([]);

    const textNodes = [];
    const walk = (node) => {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.nodeValue.trim() !== "" &&
        !node.parentElement.hasAttribute("data-no-translate")
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
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "en", // Always translate from English source
          to: selectedLanguage2,
          texts: textNodes.map(
            (node) => node.parentElement.dataset.originalText
          ), // Always translate original text
        }),
      });

      const data = await res.json();
      const translatedTexts = data.translations;

      if (translatedTexts.length !== textNodes.length) {
        console.error("Translation mismatch:", data);
        return;
      }

      textNodes.forEach((node, index) => {
        node.nodeValue = translatedTexts[index];
      });

      setTranslations2(translatedTexts);
      setLoading2(false);
    } catch (error) {
      console.error("Error during translation:", error);
      alert("Something went wrong with translation.");
    } finally {
      setLoading2(false);
    }
  };
  const [showSelector, setShowSelector] = useState(false);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [showSelector2, setShowSelector2] = useState(false);
  const [showCurrencySelector2, setShowCurrencySelector2] = useState(false);
  const usdCurrency = currencies.find((c) => c.code === "USD");

  const langButtonRef = useRef(null);
  const langDropdownRef = useRef(null);
  const currButtonRef = useRef(null);
  const currDropdownRef = useRef(null);

  const [alignLangRight, setAlignLangRight] = useState(null);
  const [alignCurrRight, setAlignCurrRight] = useState(null);

  const toggleLangSelector = () => {
    if (langButtonRef.current) {
      const rect = langButtonRef.current.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const dropdownWidth = 240;

      const shouldAlignRight = rect.left + dropdownWidth > winWidth;
      setAlignLangRight(shouldAlignRight);
    }
    setTimeout(() => {
      setShowSelector((prev) => !prev);
    }, 0); // Let `alignLangRight` apply first
  };

  const toggleCurrencySelector = () => {
    if (currButtonRef.current) {
      const rect = currButtonRef.current.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const dropdownWidth = 240;

      const shouldAlignRight = rect.left + dropdownWidth > winWidth;
      setAlignCurrRight(shouldAlignRight);
    }
    setTimeout(() => {
      setShowCurrencySelector((prev) => !prev);
    }, 0); // Let `alignCurrRight` apply first
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target)
      ) {
        setShowSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currDropdownRef.current &&
        !currDropdownRef.current.contains(event.target) &&
        currButtonRef.current &&
        !currButtonRef.current.contains(event.target)
      ) {
        setShowCurrencySelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const langButtonRef2 = useRef(null);
  const langDropdownRef2 = useRef(null);
  const currButtonRef2 = useRef(null);
  const currDropdownRef2 = useRef(null);

  const [alignLangRight2, setAlignLangRight2] = useState(null);
  const [alignCurrRight2, setAlignCurrRight2] = useState(null);

  const toggleLangSelector2 = () => {
    if (langButtonRef2.current) {
      const rect = langButtonRef2.current.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const dropdownWidth = 240;

      const shouldAlignRight = rect.left + dropdownWidth > winWidth;
      setAlignLangRight2(shouldAlignRight);
    }
    setTimeout(() => {
      setShowSelector2((prev) => !prev);
    }, 0); // Let `alignLangRight` apply first
  };

  const toggleCurrencySelector2 = () => {
    if (currButtonRef2.current) {
      const rect = currButtonRef2.current.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const dropdownWidth = 240;

      const shouldAlignRight = rect.left + dropdownWidth > winWidth;
      setAlignCurrRight2(shouldAlignRight);
    }
    setTimeout(() => {
      setShowCurrencySelector2((prev) => !prev);
    }, 0); // Let `alignCurrRight` apply first
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langDropdownRef2.current &&
        !langDropdownRef2.current.contains(event.target) &&
        langButtonRef2.current &&
        !langButtonRef2.current.contains(event.target)
      ) {
        setShowSelector2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currDropdownRef2.current &&
        !currDropdownRef2.current.contains(event.target) &&
        currButtonRef2.current &&
        !currButtonRef2.current.contains(event.target)
      ) {
        setShowCurrencySelector2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [mobileNavOpen, setmobileNavOpen] = useState(false);
  const [mobileNavOpen2, setmobileNavOpen2] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [activeNav, setactiveNav] = useState("home");
  const headerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    // GSAP Timeline
    const tl = gsap.timeline();

    // Header slide from top
    tl.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
    );

    // Inner items fade and scale up
    tl.fromTo(
      innerRef.current.children,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
  }, []);
  const leftNavRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      leftNavRef.current.children,
      {
        y: 10,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.4, // optional, for after header anim
      }
    );
  }, []);
  const topBarLinksRef = useRef(null);
  useEffect(() => {
    if (topBarLinksRef.current) {
      gsap.fromTo(
        topBarLinksRef.current.children,
        {
          y: -8,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.6,
        }
      );
    }
  }, []);
  const navLinksRef = useRef([]);
  useEffect(() => {
    gsap.fromTo(
      navLinksRef.current,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);
  const headerRef2 = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef2.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from([leftRef.current, centerRef.current, rightRef.current], {
        opacity: 0,
        y: -30,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    }, headerRef2);

    return () => ctx.revert(); // cleanup
  }, []);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  // Animate with GSAP
  useEffect(() => {
    if (dropdownRef.current) {
      if (categoryOpen) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -10, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            pointerEvents: "auto",
            display: "block",
          }
        );
      } else {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: -10,
          scale: 0.98,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (dropdownRef.current) {
              dropdownRef.current.style.pointerEvents = "none";
              dropdownRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [categoryOpen]);
  const leftLinksRef = useRef([]);
  const rightLinksRef = useRef([]);

  // Animate nav links when activeNav changes
  useEffect(() => {
    gsap.fromTo(
      leftLinksRef.current,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
      }
    );
    gsap.fromTo(
      rightLinksRef.current,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
      }
    );
  }, [activeNav]);
  

  return (
    <>
      <header
        ref={headerRef}
        className="bg-white py-3 text-white border-b border-[#E5E7EB] relative"
      >
        <div
          ref={innerRef}
          className="flex items-center justify-between container relative"
        >
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex lg:hidden justify-between items-center w-full">
              <div className="flex items-center gap-4">
                <button
                  className="block  pl-2 cursor-pointer"
                  onClick={() => setmobileNavOpen(!mobileNavOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000 "
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="18" y2="12" />
                    <line x1="3" y1="18" x2="15" y2="18" />
                  </svg>
                </button>
                <div className="block ">
                  <Image src={Logo} alt="logo" style={{ width: "80%" }} />
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <div className="flex items-center text-[10px] text-gray-800 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 27 26"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_6314_4106)">
                      <path
                        d="M12.9423 11.102C12.1103 11.6393 11.2089 11.908 10.2383 11.908C9.59695 11.908 8.97728 11.7823 8.37928 11.531C7.78128 11.2797 7.25261 10.9287 6.79328 10.478C6.33395 10.0273 5.98295 9.50301 5.74028 8.90501C5.49761 8.30701 5.37628 7.68735 5.37628 7.04601C5.37628 6.04068 5.64928 5.13068 6.19528 4.31601C6.74128 3.50134 7.46061 2.90768 8.35328 2.53501C9.24595 2.16235 10.1949 2.07134 11.2003 2.26201C12.1363 2.43534 12.9596 2.87301 13.6703 3.57501C14.3809 4.27701 14.8273 5.10901 15.0093 6.07101C15.1913 7.03301 15.1003 7.97334 14.7363 8.89201C14.3723 9.81068 13.7743 10.5473 12.9423 11.102ZM11.7463 4.78401C11.2956 4.48935 10.7929 4.34201 10.2383 4.34201C9.51028 4.34201 8.86895 4.60201 8.31428 5.12201C7.79428 5.67668 7.53428 6.31801 7.53428 7.04601C7.53428 7.60068 7.68595 8.10334 7.98928 8.55401C8.29261 9.00468 8.69561 9.33401 9.19828 9.54201C9.70095 9.75001 10.2209 9.80201 10.7583 9.69801C11.2956 9.59401 11.7593 9.34701 12.1493 8.95701C12.5393 8.56701 12.7863 8.10334 12.8903 7.56601C12.9943 7.02868 12.9423 6.50868 12.7343 6.00601C12.5263 5.50335 12.1969 5.09601 11.7463 4.78401ZM3.34828 15.86C4.24961 14.9413 5.29828 14.235 6.49428 13.741C7.69028 13.247 8.93828 13 10.2383 13C11.5383 13 12.7863 13.247 13.9823 13.741C15.1783 14.235 16.2313 14.937 17.1413 15.847C18.0513 16.757 18.7533 17.81 19.2473 19.006C19.7413 20.202 19.9883 21.45 19.9883 22.75C19.9883 23.062 19.8756 23.322 19.6503 23.53C19.4249 23.738 19.1736 23.842 18.8963 23.842H13.4883C13.1936 23.842 12.9379 23.7337 12.7213 23.517C12.5046 23.3003 12.3963 23.0447 12.3963 22.75C12.3963 22.4553 12.5046 22.1997 12.7213 21.983C12.9379 21.7663 13.1936 21.658 13.4883 21.658H17.7523C17.6136 20.7567 17.3276 19.903 16.8943 19.097C16.4609 18.291 15.8976 17.5933 15.2043 17.004C14.5109 16.4147 13.7396 15.9597 12.8903 15.639C12.0409 15.3183 11.1569 15.158 10.2383 15.158C9.31961 15.158 8.43561 15.3183 7.58628 15.639C6.73695 15.9597 5.96561 16.4147 5.27228 17.004C4.57895 17.5933 4.01561 18.291 3.58228 19.097C3.14895 19.903 2.86295 20.7567 2.72428 21.658H6.98828C7.26561 21.658 7.52561 21.762 7.76828 21.97C7.97628 22.2127 8.08028 22.4727 8.08028 22.75C8.08028 23.0273 7.97628 23.2873 7.76828 23.53C7.52561 23.738 7.26561 23.842 6.98828 23.842H1.58028C1.30295 23.842 1.05161 23.738 0.826281 23.53C0.600948 23.322 0.488281 23.062 0.488281 22.75C0.488281 21.45 0.735281 20.2063 1.22928 19.019C1.72328 17.8317 2.42961 16.7787 3.34828 15.86Z"
                        fill="#030712"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6314_4106">
                        <rect
                          width="26"
                          height="26"
                          fill="white"
                          transform="matrix(1 0 0 -1 0.328125 26)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[8px]">
                    Sign In
                    <br />
                    <strong>Account</strong>
                  </span>
                </div>

                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M6.66016 5.40801C5.88016 5.40801 5.15649 5.60301 4.48916 5.99301C3.82182 6.38301 3.29316 6.91168 2.90316 7.57901C2.51316 8.24634 2.31816 8.97001 2.31816 9.75001C2.31816 11.5353 2.82949 13.234 3.85216 14.846C4.68416 16.198 5.84549 17.4633 7.33616 18.642C8.67082 19.734 10.2048 20.696 11.9382 21.528L12.0682 21.58C13.8535 20.7307 15.4482 19.7427 16.8522 18.616L16.8002 18.642C18.2908 17.4633 19.4522 16.198 20.2842 14.846C21.3068 13.234 21.8182 11.5353 21.8182 9.75001C21.8182 8.97001 21.6232 8.24634 21.2332 7.57901C20.8432 6.91168 20.3145 6.38301 19.6472 5.99301C18.9798 5.60301 18.2562 5.40801 17.4762 5.40801C16.7828 5.40801 16.1285 5.55968 15.5132 5.86301C14.8978 6.16634 14.3778 6.58234 13.9532 7.11101C13.5285 7.63968 13.2555 8.23334 13.1342 8.89201C13.0822 9.13468 12.9565 9.33834 12.7572 9.50301C12.5578 9.66768 12.3282 9.75001 12.0682 9.75001C11.8082 9.75001 11.5785 9.66768 11.3792 9.50301C11.1798 9.33834 11.0542 9.13468 11.0022 8.89201C10.8808 8.23334 10.6078 7.63968 10.1832 7.11101C9.75849 6.58234 9.23849 6.16634 8.62316 5.86301C8.00782 5.55968 7.35349 5.40801 6.66016 5.40801ZM12.0682 23.842C11.9122 23.8247 11.7562 23.79 11.6002 23.738C11.5135 23.7033 11.3662 23.634 11.1582 23.53C9.25149 22.6287 7.50949 21.5453 5.93216 20.28L5.98416 20.332C4.30282 19.0147 2.97682 17.576 2.00616 16.016C0.77549 14.04 0.160156 11.9513 0.160156 9.75001C0.160156 8.57134 0.45049 7.48368 1.03116 6.48701C1.61182 5.49034 2.40049 4.70168 3.39716 4.12101C4.39382 3.54034 5.48149 3.25001 6.66016 3.25001C7.75216 3.25001 8.77049 3.49701 9.71516 3.99101C10.6598 4.48501 11.4442 5.15668 12.0682 6.00601V6.03201C12.6922 5.16534 13.4765 4.48501 14.4212 3.99101C15.3658 3.49701 16.3842 3.25001 17.4762 3.25001C18.6548 3.25001 19.7425 3.54034 20.7392 4.12101C21.7358 4.70168 22.5245 5.49034 23.1052 6.48701C23.6858 7.48368 23.9762 8.57134 23.9762 9.75001C23.9762 11.9513 23.3608 14.04 22.1302 16.016C21.1595 17.576 19.8335 19.0147 18.1522 20.332C16.6095 21.5453 14.9368 22.594 13.1342 23.478L12.9782 23.53C12.5622 23.738 12.2588 23.842 12.0682 23.842Z"
                      fill="#030712"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">
                    0
                  </span>
                </div>

                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M22.1822 3.25H1.07016C0.810156 3.28467 0.59349 3.406 0.420156 3.614C0.246823 3.822 0.160156 4.056 0.160156 4.316C0.160156 4.576 0.246823 4.81433 0.420156 5.031C0.59349 5.24767 0.810156 5.37333 1.07016 5.408H5.25616L4.50216 15.002V15.184C4.50216 15.7733 4.71449 16.2803 5.13916 16.705C5.56382 17.1297 6.07082 17.342 6.66016 17.342H19.9462C20.4662 17.342 20.9212 17.1817 21.3112 16.861C21.7012 16.5403 21.9482 16.146 22.0522 15.678L24.2882 5.902C24.3228 5.694 24.3402 5.52933 24.3402 5.408C24.3402 4.80133 24.1322 4.29 23.7162 3.874C23.3002 3.458 22.7888 3.25 22.1822 3.25ZM19.9462 15.158H6.66016L7.41416 5.408H22.1822L19.9462 15.158ZM8.66216 22.75C9.26882 22.75 9.78449 22.5377 10.2092 22.113C10.6338 21.6883 10.8462 21.1727 10.8462 20.566C10.8462 19.9593 10.6338 19.448 10.2092 19.032C9.78449 18.616 9.26882 18.408 8.66216 18.408C8.07282 18.408 7.56582 18.616 7.14116 19.032C6.71649 19.448 6.50416 19.9593 6.50416 20.566C6.50416 21.1727 6.71649 21.6883 7.14116 22.113C7.56582 22.5377 8.07282 22.75 8.66216 22.75ZM18.4122 22.75C19.0188 22.75 19.5345 22.5377 19.9592 22.113C20.3838 21.6883 20.5962 21.1727 20.5962 20.566C20.5962 19.9593 20.3838 19.448 19.9592 19.032C19.5345 18.616 19.0188 18.408 18.4122 18.408C17.8228 18.408 17.3158 18.616 16.8912 19.032C16.4665 19.448 16.2542 19.9593 16.2542 20.566C16.2542 21.1727 16.4665 21.6883 16.8912 22.113C17.3158 22.5377 17.8228 22.75 18.4122 22.75Z"
                      fill="#030712"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Left side */}
            <div
              ref={leftNavRef}
              className="hidden lg:flex items-center space-x-4"
            >
              <Link
                href="/"
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]" +
                  (activeNav === "about" ? " text-[#634C9F]" : "")
                }
                onClick={() => setactiveNav("about")}
              >
                About Us
              </Link>
              <Link
                href="/"
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]" +
                  (activeNav === "account" ? " text-[#634C9F]" : "")
                }
                onClick={() => setactiveNav("account")}
              >
                My Account
              </Link>
              <Link
                href="/"
                onClick={() => setactiveNav("wishlist")}
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]" +
                  (activeNav === "wishlist" ? " text-[#634C9F]" : "")
                }
              >
                Wishlist
              </Link>
            </div>

            <Divider
              className="hidden lg:block"
              orientation="vertical"
              variant="middle"
              sx={{ backgroundColor: "#E5E7EB", height: "15px" }}
            />

            {/* Centered delivery time */}
            <div className=" hidden lg:block text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
              We deliver to you every day from{" "}
              <span className="text-[#EA580C] font-[700]">7:00 to 23:00</span>
            </div>
          </div>

          
        </div>

        <div
          className={`transition-transform duration-300 ease-in-out transform 
  ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} 
  absolute top-0 left-0 lg:hidden bg-white w-65 
  sm:h-[calc(100vh-75px)] h-[calc(100vh-95px)] 
  z-50 shadow-md`}
        >
          <div className="relative px-7 py-4 ">
            <button
              className="absolute cursor-pointer right-2 top-3 p-2 rounded-full hover:bg-red-50 transition-colors"
              aria-label="Close"
              onClick={() => setmobileNavOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex lg:hidden flex-col items-start space-y-4 mb-3">
              <Link
                href="/"
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]" +
                  (activeNav === "about" ? " text-[#634C9F]" : "")
                }
                onClick={() => setactiveNav("about")}
              >
                About Us
              </Link>
              <Link
                href="/"
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]" +
                  (activeNav === "account" ? " text-[#634C9F]" : "")
                }
                onClick={() => setactiveNav("account")}
              >
                My Account
              </Link>
              <Link
                href="/"
                onClick={() => setactiveNav("wishlist")}
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[500] leading-normal tracking-[-0.32px]" +
                  (activeNav === "wishlist" ? " text-[#634C9F]" : "")
                }
              >
                Wishlist
              </Link>
            </div>
            <Divider
              className="block lg:hidden"
              orientation="horizontal"
              variant="start"
              sx={{
                backgroundColor: "#E5E7EB",
                width: "20px",
                height: "1px",
                marginBottom: "10px",
              }}
            />
            <div className=" block lg:hidden text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
              We deliver to you every day from{" "}
              <span className="text-[#EA580C] font-[700]">7:00 to 23:00</span>
            </div>
            <div className="flex lg:hidden flex-col items-start space-y-4 mt-10">
              <div className="relative inline-block">
                <span
                  ref={langButtonRef}
                  data-no-translate="true" // Mark so your translate code skips it
                  className="bg-transparent flex items-center gap-1 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                  onClick={toggleLangSelector}
                >
                  {Languages[language]}
                  <svg
                    style={{
                      transform: showSelector
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                  >
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
                    ref={langDropdownRef}
                    className={`absolute ${
                      alignLangRight === null
                        ? "right-0"
                        : alignLangRight
                        ? "right-0"
                        : "left-0"
                    } mt-4 transition-all duration-300 ease-in-out transform ${
                      showSelector
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    } z-50 bg-white border-1 border-[#E5E7EB]  w-57`}
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
                            maxHeight: "800px",
                            overflowY: "auto",
                            scrollbarWidth: "thin", // Firefox
                            scrollbarColor: "#634C9F transparent", // Firefox
                          }}
                        >
                          {/* Header and English (outside RadioGroup, but same logic) */}
                          <div className="border-b border-[#E5E7EB] p-3">
                            <span className="text-[#6B7280] font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px]">
                              Change language
                            </span>

                            <span
                              data-no-translate="true"
                              className="mt-2 flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                              onClick={() => {
                                setLanguage("en");
                                handleTranslate("en");
                              }}
                            >
                              <Radio
                                checked={language === "en"}
                                value="en"
                                name="language-selector"
                                onChange={(e) => {
                                  setLanguage(e.target.value);
                                  handleTranslate(e.target.value);
                                }}
                                size="small"
                                sx={{
                                  padding: 0,
                                  color: "#aaa",
                                  "&.Mui-checked": {
                                    color: "#634C9F",
                                  },
                                  ".hm:hover &": {
                                    color: "#634C9F",
                                  },
                                }}
                              />
                              {"English - (en)"}
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
                            {Object.entries(Languages)
                              .filter(([code]) => code !== "en") // Skip English
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
                                      color: "#aaa",
                                      "&.Mui-checked": {
                                        color: "#634C9F",
                                      },
                                      ".hm:hover &": {
                                        color: "#634C9F",
                                      },
                                    }}
                                  />
                                  {name} - {`(${code})`}
                                </span>
                              ))}
                          </RadioGroup>
                        </FormControl>
                        <div className="border-t border-[#E5E7EB] pt-2 pb-4 px-3 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
                          You are Shopping on{" "}
                          <span className="text-[#634C9F] font-[600]">
                            {" "}
                            Jin Store{" "}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative inline-block">
                <span
                  ref={currButtonRef}
                  data-no-translate="true" // Mark so your translate code skips it
                  className="bg-transparent flex items-center gap-1 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                  onClick={toggleCurrencySelector}
                >
                  {selectedCurrency}
                  <svg
                    style={{
                      transform: showCurrencySelector
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                  >
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
                    ref={currDropdownRef}
                    className={`absolute ${
                      alignCurrRight === null
                        ? "right-0"
                        : alignCurrRight
                        ? "right-0"
                        : "left-0"
                    } mt-4 transition-all duration-300 ease-in-out transform ${
                      showCurrencySelector
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none invisible"
                    } z-50 bg-white border border-[#E5E7EB] w-57`}
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
                            maxHeight: "800px",
                            overflowY: "auto",
                            scrollbarWidth: "thin", // Firefox
                            scrollbarColor: "#634C9F transparent", // Firefox
                          }}
                        >
                          {/* Header and English (outside RadioGroup, but same logic) */}
                          <div className="border-b border-[#E5E7EB] p-3">
                            <span className="text-[#6B7280] font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px]">
                              Change Currency
                            </span>

                            {usdCurrency && (
                              <span
                                data-no-translate="true"
                                className="mt-2 flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                                onClick={() =>
                                  setSelectedCurrency(usdCurrency.code)
                                }
                              >
                                <Radio
                                  checked={
                                    selectedCurrency === usdCurrency.code
                                  }
                                  value={usdCurrency.code}
                                  name="currency-selector"
                                  onChange={(e) =>
                                    setSelectedCurrency(e.target.value)
                                  }
                                  size="small"
                                  sx={{
                                    padding: 0,
                                    color: "#aaa",
                                    "&.Mui-checked": {
                                      color: "#634C9F",
                                    },
                                    ".hm:hover &": {
                                      color: "#634C9F",
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
                              .filter((c) => c.code !== "USD") // ✅ Skip USD
                              .map((c) => (
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
                                      color: "#aaa",
                                      "&.Mui-checked": {
                                        color: "#634C9F",
                                      },
                                      ".hm:hover &": {
                                        color: "#634C9F",
                                      },
                                    }}
                                  />
                                  {`${c.code}`} - {`(${c.symbol})`}
                                </span>
                              ))}
                          </RadioGroup>
                        </FormControl>
                        <div className="border-t border-[#E5E7EB] pt-2 pb-4 px-3 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
                          You are Shopping on{" "}
                          <span className="text-[#634C9F] font-[600]">
                            {" "}
                            Jin Store{" "}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Order Tracking Link */}
              <Link
                href="/"
                onClick={() => setactiveNav("tracking")}
                className={
                  "text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer" +
                  (activeNav === "tracking" ? " text-[#634C9F]" : "")
                }
              >
                Order Tracking
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container hidden lg:flex relative">
      {/* Right side: Language & Currency */}
          <div
            className="hidden lg:flex items-center space-x-4 absolute right-0 -top-9"
            ref={topBarLinksRef}
          >
            <div className="relative inline-block z-[9999]" >
              <span
                ref={langButtonRef2}
                data-no-translate="true" // Mark so your translate code skips it
                className="bg-transparent flex items-center gap-1 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                onClick={toggleLangSelector2}
              >
                {Languages[language2]}
                <svg
                  style={{
                    transform: showSelector2
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none"
                >
                  <path
                    d="M1 3L4 6.5L7 3"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="relative overflow-visible z-[9999]">
                <div
                  ref={langDropdownRef2}
                  className={`absolute ${
                    alignLangRight2 === null
                      ? "right-0"
                      : alignLangRight2
                      ? "right-0"
                      : "left-0"
                  } mt-4 transition-all duration-300 ease-in-out transform ${
                    showSelector2
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  } z-[9999] bg-white border-1 border-[#E5E7EB]  w-57`}
                  
                  
                >
                  {loading2 ? (
                    <div className="w-full flex justify-center items-center h-36">
                      <GradientCircularProgress />
                    </div>
                  ) : (
                    <>
                      <FormControl
                        component="fieldset"
                        className="w-full scrollbar"
                        style={{
                          maxHeight: "800px",
                          overflowY: "auto",
                          scrollbarWidth: "thin", // Firefox
                          scrollbarColor: "#634C9F transparent", // Firefox
                        }}
                      >
                        {/* Header and English (outside RadioGroup, but same logic) */}
                        <div className="border-b border-[#E5E7EB] p-3">
                          <span className="text-[#6B7280] font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px]">
                            Change language
                          </span>

                          <span
                            data-no-translate="true"
                            className="mt-2 flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                            onClick={() => {
                              setLanguage2("en");
                              handleTranslate2("en");
                            }}
                          >
                            <Radio
                              checked={language2 === "en"}
                              value="en"
                              name="language-selector"
                              onChange={(e) => {
                                setLanguage2(e.target.value);
                                handleTranslate2(e.target.value);
                              }}
                              size="small"
                              sx={{
                                padding: 0,
                                color: "#aaa",
                                "&.Mui-checked": {
                                  color: "#634C9F",
                                },
                                ".hm:hover &": {
                                  color: "#634C9F",
                                },
                              }}
                            />
                            {"English - (en)"}
                          </span>
                        </div>

                        {/* Other Languages in RadioGroup */}
                        <RadioGroup
                          value={language2}
                          onChange={(e) => {
                            const selectedLang2 = e.target.value;
                            if (selectedLang2 !== "loading") {
                              setLanguage2(selectedLang2);
                              handleTranslate2(selectedLang2);
                            }
                          }}
                          aria-label="language"
                          name="language-selector"
                          className="flex flex-col px-3 py-3 gap-2"
                        >
                          {Object.entries(Languages)
                            .filter(([code]) => code !== "en") // Skip English
                            .map(([code, name]) => (
                              <span
                                className="flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                                key={code}
                                onClick={() => {
                                  setLanguage2(code);
                                  handleTranslate2(code);
                                }}
                              >
                                <Radio
                                  checked={language2 === code}
                                  value={code}
                                  size="small"
                                  name="language-selector"
                                  sx={{
                                    padding: 0,
                                    color: "#aaa",
                                    "&.Mui-checked": {
                                      color: "#634C9F",
                                    },
                                    ".hm:hover &": {
                                      color: "#634C9F",
                                    },
                                  }}
                                />
                                {name} - {`(${code})`}
                              </span>
                            ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="border-t border-[#E5E7EB] pt-2 pb-4 px-3 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
                        You are Shopping on{" "}
                        <span className="text-[#634C9F] font-[600]">
                          {" "}
                          Jin Store{" "}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="relative inline-block">
              <span
                ref={currButtonRef2}
                data-no-translate="true" // Mark so your translate code skips it
                className="bg-transparent flex items-center gap-1 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                onClick={toggleCurrencySelector2}
              >
                {selectedCurrency2}
                <svg
                  style={{
                    transform: showCurrencySelector2
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  fill="none"
                >
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
                  ref={currDropdownRef2}
                  className={`absolute ${
                    alignCurrRight2 === null
                      ? "right-0"
                      : alignCurrRight2
                      ? "right-0"
                      : "left-0"
                  } mt-4 transition-all duration-300 ease-in-out transform ${
                    showCurrencySelector2
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none invisible"
                  } z-50 bg-white border border-[#E5E7EB] w-57`}
                >
                  {Currencyloading2 ? (
                    <div className="w-full flex justify-center items-center h-36">
                      <GradientCircularProgress />
                    </div>
                  ) : (
                    <>
                      <FormControl
                        component="fieldset"
                        className="w-full scrollbar"
                        style={{
                          maxHeight: "800px",
                          overflowY: "auto",
                          scrollbarWidth: "thin", // Firefox
                          scrollbarColor: "#634C9F transparent", // Firefox
                        }}
                      >
                        {/* Header and English (outside RadioGroup, but same logic) */}
                        <div className="border-b border-[#E5E7EB] p-3">
                          <span className="text-[#6B7280] font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px]">
                            Change Currency
                          </span>

                          {usdCurrency && (
                            <span
                              data-no-translate="true"
                              className="mt-2 flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                              onClick={() =>
                                setSelectedCurrency2(usdCurrency.code)
                              }
                            >
                              <Radio
                                checked={selectedCurrency2 === usdCurrency.code}
                                value={usdCurrency.code}
                                name="currency-selector"
                                onChange={(e) =>
                                  setSelectedCurrency2(e.target.value)
                                }
                                size="small"
                                sx={{
                                  padding: 0,
                                  color: "#aaa",
                                  "&.Mui-checked": {
                                    color: "#634C9F",
                                  },
                                  ".hm:hover &": {
                                    color: "#634C9F",
                                  },
                                }}
                              />
                              {`${usdCurrency.code} - (${usdCurrency.symbol})`}
                            </span>
                          )}
                        </div>

                        {/* Other Languages in RadioGroup */}
                        <RadioGroup
                          value={selectedCurrency2}
                          onChange={(e) => {
                            const selectedCurrency2 = e.target.value;
                            if (selectedCurrency2 !== "loading") {
                              setSelectedCurrency2(selectedCurrency2);
                            }
                          }}
                          aria-label="language"
                          name="language-selector"
                          className="flex flex-col px-3 py-3 gap-2"
                        >
                          {currencies
                            .filter((c) => c.code !== "USD") // ✅ Skip USD
                            .map((c) => (
                              <span
                                key={c.code}
                                className="flex hm items-center gap-2 group text-[#6B7280] hover:text-[#634C9F] hover:underline font-[Inter] text-[0.85em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer"
                                onClick={() => {
                                  setSelectedCurrency2(c.code);
                                }}
                                data-no-translate="true"
                              >
                                <Radio
                                  checked={selectedCurrency2 === c.code}
                                  value={c.code}
                                  size="small"
                                  name="currency-selector"
                                  sx={{
                                    padding: 0,
                                    color: "#aaa",
                                    "&.Mui-checked": {
                                      color: "#634C9F",
                                    },
                                    ".hm:hover &": {
                                      color: "#634C9F",
                                    },
                                  }}
                                />
                                {`${c.code}`} - {`(${c.symbol})`}
                              </span>
                            ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="border-t border-[#E5E7EB] pt-2 pb-4 px-3 text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px]">
                        You are Shopping on{" "}
                        <span className="text-[#634C9F] font-[600]">
                          {" "}
                          Jin Store{" "}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Order Tracking Link */}
            <Link
              href="/"
              onClick={() => setactiveNav("tracking")}
              className={
                "text-[#6B7280] font-[Inter] text-[0.75em] font-[400] leading-normal tracking-[-0.32px] cursor-pointer" +
                (activeNav === "tracking" ? " text-[#634C9F]" : "")
              }
            >
              Order Tracking
            </Link>
          </div>
          </div>
      <header
        ref={headerRef2}
        className="container py-3 bg-white hidden lg:flex items-center justify-between"
      >
        {/* Left: Logo & Brand */}
        <div ref={leftRef} className="block">
          <Image src={Logo} alt="logo" style={{ width: "100%" }} />
        </div>

        {/* Center: Location + Search */}
        <div
          ref={centerRef}
          className="hidden lg:flex items-center flex-1 mx-8"
        >
          <div className="flex items-center space-x-3 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
            >
              <path
                d="M9.70216 0.403986C7.98616 0.403986 6.39149 0.83732 4.91816 1.70399C3.47949 2.53599 2.33549 3.67132 1.48616 5.10999C0.602156 6.60065 0.160156 8.21265 0.160156 9.94599C0.160156 11.8007 0.792823 13.768 2.05816 15.848C3.01149 17.4253 4.28549 19.02 5.88016 20.632C6.74682 21.4987 7.73482 22.4 8.84416 23.336L9.15616 23.596C9.20816 23.648 9.28616 23.6957 9.39016 23.739C9.49416 23.7823 9.60249 23.804 9.71516 23.804C9.82782 23.804 9.92316 23.791 10.0012 23.765C10.0792 23.739 10.1615 23.6827 10.2482 23.596L10.5602 23.336C11.6695 22.4 12.6575 21.4987 13.5242 20.632C15.1188 19.02 16.3928 17.4253 17.3462 15.848C18.6115 13.768 19.2442 11.8007 19.2442 9.94599C19.2442 8.21265 18.8022 6.60065 17.9182 5.10999C17.0688 3.67132 15.9248 2.53599 14.4862 1.70399C13.0128 0.83732 11.4182 0.403986 9.70216 0.403986ZM9.70216 21.75C8.78349 21.0047 7.84749 20.1467 6.89416 19.176C5.49016 17.7027 4.37216 16.264 3.54016 14.86C2.44816 13.04 1.90216 11.3673 1.90216 9.84199C1.90216 8.42065 2.25749 7.10332 2.96816 5.88999C3.64416 4.71132 4.57149 3.78399 5.75016 3.10799C6.96349 2.39732 8.28082 2.04199 9.70216 2.04199C11.1235 2.04199 12.4408 2.40599 13.6542 3.13399C14.8328 3.82732 15.7688 4.77199 16.4622 5.96799C17.1555 7.16399 17.5022 8.45532 17.5022 9.84199C17.5022 11.4193 16.9562 13.118 15.8642 14.938C15.0322 16.3247 13.9142 17.746 12.5102 19.202C11.5915 20.138 10.6555 20.9873 9.70216 21.75ZM9.70216 5.81199C8.95682 5.81199 8.27216 5.99832 7.64816 6.37099C7.02416 6.74365 6.52582 7.24632 6.15316 7.87899C5.78049 8.51165 5.59416 9.20065 5.59416 9.94599C5.59416 10.6913 5.78049 11.3803 6.15316 12.013C6.52582 12.6457 7.02416 13.144 7.64816 13.508C8.27216 13.872 8.95682 14.054 9.70216 14.054C10.4475 14.054 11.1365 13.8677 11.7692 13.495C12.4018 13.1223 12.9002 12.624 13.2642 12C13.6282 11.376 13.8102 10.6913 13.8102 9.94599C13.8102 9.20065 13.6282 8.51165 13.2642 7.87899C12.9002 7.24632 12.4018 6.74365 11.7692 6.37099C11.1365 5.99832 10.4475 5.81199 9.70216 5.81199ZM9.70216 12.312C9.04349 12.312 8.48016 12.078 8.01216 11.61C7.54416 11.142 7.31016 10.5873 7.31016 9.94599C7.31016 9.51265 7.41849 9.11399 7.63516 8.74999C7.85182 8.38599 8.14216 8.09565 8.50616 7.87899C8.87016 7.66232 9.26882 7.55399 9.70216 7.55399C10.1355 7.55399 10.5342 7.66232 10.8982 7.87899C11.2622 8.09565 11.5525 8.38599 11.7692 8.74999C11.9858 9.11399 12.0942 9.51265 12.0942 9.94599C12.0942 10.5873 11.8602 11.142 11.3922 11.61C10.9242 12.078 10.3608 12.312 9.70216 12.312Z"
                fill="#030712"
              />
            </svg>
            <span className="text-[10px] text-gray-600">
              Deliver to <strong>all</strong>
            </span>
          </div>
          <div className="flex items-center w-full bg-[#F3F4F6] pl-4 pr-3 py-2 rounded-md">
            <input
              type="text"
              placeholder="Search for products, categories or brands..."
              className="flex-1 bg-transparent outline-none text-sm text-black placeholder-[#6B7280] "
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 27 26"
              fill="none"
            >
              <g clipPath="url(#clip0_6314_4098)">
                <path
                  d="M21.4938 22.204L17.3858 18.096C18.0965 17.264 18.6512 16.3237 19.0498 15.275C19.4485 14.2263 19.6478 13.1387 19.6478 12.012C19.6478 10.296 19.2145 8.70134 18.3478 7.228C17.5158 5.78934 16.3805 4.64534 14.9418 3.796C13.4685 2.92934 11.8652 2.496 10.1318 2.496C8.39851 2.496 6.79518 2.92934 5.32184 3.796C3.88318 4.628 2.73918 5.75467 1.88984 7.176C1.02318 8.66667 0.589844 10.2743 0.589844 11.999C0.589844 13.7237 1.02318 15.3227 1.88984 16.796C2.72184 18.2347 3.84851 19.3787 5.26984 20.228C6.76051 21.112 8.37251 21.554 10.1058 21.554C11.2325 21.554 12.3202 21.3547 13.3688 20.956C14.4175 20.5573 15.3578 20.0027 16.1898 19.292L20.2978 23.4C20.3498 23.452 20.4278 23.4997 20.5318 23.543C20.6358 23.5863 20.7398 23.608 20.8438 23.608C20.9478 23.608 21.0518 23.5863 21.1558 23.543C21.2598 23.4997 21.3378 23.452 21.3898 23.4C21.5978 23.192 21.7062 22.984 21.7148 22.776C21.7235 22.568 21.6498 22.3773 21.4938 22.204ZM2.30584 11.908C2.30584 10.4867 2.66118 9.16934 3.37184 7.956C4.06518 6.79467 4.99251 5.86734 6.15384 5.174C7.36718 4.46334 8.68451 4.108 10.1058 4.108C11.5272 4.108 12.8445 4.472 14.0578 5.2C15.2365 5.89334 16.1725 6.838 16.8658 8.034C17.5592 9.23 17.9058 10.53 17.9058 11.934C17.9058 13.338 17.5418 14.6467 16.8138 15.86C16.1205 17.0387 15.1758 17.9747 13.9798 18.668C12.7838 19.3613 11.4925 19.708 10.1058 19.708C8.70184 19.7427 7.38451 19.4047 6.15384 18.694C4.99251 18.018 4.06084 17.0733 3.35884 15.86C2.65684 14.6467 2.30584 13.3293 2.30584 11.908Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_6314_4098">
                  <rect
                    width="26"
                    height="26"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.328125 26)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {/* Right: User actions */}
        <div ref={rightRef} className="flex items-center space-x-5">
          <div className="flex items-center text-[10px] text-gray-800 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 27 26"
              fill="none"
            >
              <g clipPath="url(#clip0_6314_4106)">
                <path
                  d="M12.9423 11.102C12.1103 11.6393 11.2089 11.908 10.2383 11.908C9.59695 11.908 8.97728 11.7823 8.37928 11.531C7.78128 11.2797 7.25261 10.9287 6.79328 10.478C6.33395 10.0273 5.98295 9.50301 5.74028 8.90501C5.49761 8.30701 5.37628 7.68735 5.37628 7.04601C5.37628 6.04068 5.64928 5.13068 6.19528 4.31601C6.74128 3.50134 7.46061 2.90768 8.35328 2.53501C9.24595 2.16235 10.1949 2.07134 11.2003 2.26201C12.1363 2.43534 12.9596 2.87301 13.6703 3.57501C14.3809 4.27701 14.8273 5.10901 15.0093 6.07101C15.1913 7.03301 15.1003 7.97334 14.7363 8.89201C14.3723 9.81068 13.7743 10.5473 12.9423 11.102ZM11.7463 4.78401C11.2956 4.48935 10.7929 4.34201 10.2383 4.34201C9.51028 4.34201 8.86895 4.60201 8.31428 5.12201C7.79428 5.67668 7.53428 6.31801 7.53428 7.04601C7.53428 7.60068 7.68595 8.10334 7.98928 8.55401C8.29261 9.00468 8.69561 9.33401 9.19828 9.54201C9.70095 9.75001 10.2209 9.80201 10.7583 9.69801C11.2956 9.59401 11.7593 9.34701 12.1493 8.95701C12.5393 8.56701 12.7863 8.10334 12.8903 7.56601C12.9943 7.02868 12.9423 6.50868 12.7343 6.00601C12.5263 5.50335 12.1969 5.09601 11.7463 4.78401ZM3.34828 15.86C4.24961 14.9413 5.29828 14.235 6.49428 13.741C7.69028 13.247 8.93828 13 10.2383 13C11.5383 13 12.7863 13.247 13.9823 13.741C15.1783 14.235 16.2313 14.937 17.1413 15.847C18.0513 16.757 18.7533 17.81 19.2473 19.006C19.7413 20.202 19.9883 21.45 19.9883 22.75C19.9883 23.062 19.8756 23.322 19.6503 23.53C19.4249 23.738 19.1736 23.842 18.8963 23.842H13.4883C13.1936 23.842 12.9379 23.7337 12.7213 23.517C12.5046 23.3003 12.3963 23.0447 12.3963 22.75C12.3963 22.4553 12.5046 22.1997 12.7213 21.983C12.9379 21.7663 13.1936 21.658 13.4883 21.658H17.7523C17.6136 20.7567 17.3276 19.903 16.8943 19.097C16.4609 18.291 15.8976 17.5933 15.2043 17.004C14.5109 16.4147 13.7396 15.9597 12.8903 15.639C12.0409 15.3183 11.1569 15.158 10.2383 15.158C9.31961 15.158 8.43561 15.3183 7.58628 15.639C6.73695 15.9597 5.96561 16.4147 5.27228 17.004C4.57895 17.5933 4.01561 18.291 3.58228 19.097C3.14895 19.903 2.86295 20.7567 2.72428 21.658H6.98828C7.26561 21.658 7.52561 21.762 7.76828 21.97C7.97628 22.2127 8.08028 22.4727 8.08028 22.75C8.08028 23.0273 7.97628 23.2873 7.76828 23.53C7.52561 23.738 7.26561 23.842 6.98828 23.842H1.58028C1.30295 23.842 1.05161 23.738 0.826281 23.53C0.600948 23.322 0.488281 23.062 0.488281 22.75C0.488281 21.45 0.735281 20.2063 1.22928 19.019C1.72328 17.8317 2.42961 16.7787 3.34828 15.86Z"
                  fill="#030712"
                />
              </g>
              <defs>
                <clipPath id="clip0_6314_4106">
                  <rect
                    width="26"
                    height="26"
                    fill="white"
                    transform="matrix(1 0 0 -1 0.328125 26)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="text-[10px]">
              Sign In
              <br />
              <strong>Account</strong>
            </span>
          </div>

          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M6.66016 5.40801C5.88016 5.40801 5.15649 5.60301 4.48916 5.99301C3.82182 6.38301 3.29316 6.91168 2.90316 7.57901C2.51316 8.24634 2.31816 8.97001 2.31816 9.75001C2.31816 11.5353 2.82949 13.234 3.85216 14.846C4.68416 16.198 5.84549 17.4633 7.33616 18.642C8.67082 19.734 10.2048 20.696 11.9382 21.528L12.0682 21.58C13.8535 20.7307 15.4482 19.7427 16.8522 18.616L16.8002 18.642C18.2908 17.4633 19.4522 16.198 20.2842 14.846C21.3068 13.234 21.8182 11.5353 21.8182 9.75001C21.8182 8.97001 21.6232 8.24634 21.2332 7.57901C20.8432 6.91168 20.3145 6.38301 19.6472 5.99301C18.9798 5.60301 18.2562 5.40801 17.4762 5.40801C16.7828 5.40801 16.1285 5.55968 15.5132 5.86301C14.8978 6.16634 14.3778 6.58234 13.9532 7.11101C13.5285 7.63968 13.2555 8.23334 13.1342 8.89201C13.0822 9.13468 12.9565 9.33834 12.7572 9.50301C12.5578 9.66768 12.3282 9.75001 12.0682 9.75001C11.8082 9.75001 11.5785 9.66768 11.3792 9.50301C11.1798 9.33834 11.0542 9.13468 11.0022 8.89201C10.8808 8.23334 10.6078 7.63968 10.1832 7.11101C9.75849 6.58234 9.23849 6.16634 8.62316 5.86301C8.00782 5.55968 7.35349 5.40801 6.66016 5.40801ZM12.0682 23.842C11.9122 23.8247 11.7562 23.79 11.6002 23.738C11.5135 23.7033 11.3662 23.634 11.1582 23.53C9.25149 22.6287 7.50949 21.5453 5.93216 20.28L5.98416 20.332C4.30282 19.0147 2.97682 17.576 2.00616 16.016C0.77549 14.04 0.160156 11.9513 0.160156 9.75001C0.160156 8.57134 0.45049 7.48368 1.03116 6.48701C1.61182 5.49034 2.40049 4.70168 3.39716 4.12101C4.39382 3.54034 5.48149 3.25001 6.66016 3.25001C7.75216 3.25001 8.77049 3.49701 9.71516 3.99101C10.6598 4.48501 11.4442 5.15668 12.0682 6.00601V6.03201C12.6922 5.16534 13.4765 4.48501 14.4212 3.99101C15.3658 3.49701 16.3842 3.25001 17.4762 3.25001C18.6548 3.25001 19.7425 3.54034 20.7392 4.12101C21.7358 4.70168 22.5245 5.49034 23.1052 6.48701C23.6858 7.48368 23.9762 8.57134 23.9762 9.75001C23.9762 11.9513 23.3608 14.04 22.1302 16.016C21.1595 17.576 19.8335 19.0147 18.1522 20.332C16.6095 21.5453 14.9368 22.594 13.1342 23.478L12.9782 23.53C12.5622 23.738 12.2588 23.842 12.0682 23.842Z"
                fill="#030712"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">
              0
            </span>
          </div>

          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M22.1822 3.25H1.07016C0.810156 3.28467 0.59349 3.406 0.420156 3.614C0.246823 3.822 0.160156 4.056 0.160156 4.316C0.160156 4.576 0.246823 4.81433 0.420156 5.031C0.59349 5.24767 0.810156 5.37333 1.07016 5.408H5.25616L4.50216 15.002V15.184C4.50216 15.7733 4.71449 16.2803 5.13916 16.705C5.56382 17.1297 6.07082 17.342 6.66016 17.342H19.9462C20.4662 17.342 20.9212 17.1817 21.3112 16.861C21.7012 16.5403 21.9482 16.146 22.0522 15.678L24.2882 5.902C24.3228 5.694 24.3402 5.52933 24.3402 5.408C24.3402 4.80133 24.1322 4.29 23.7162 3.874C23.3002 3.458 22.7888 3.25 22.1822 3.25ZM19.9462 15.158H6.66016L7.41416 5.408H22.1822L19.9462 15.158ZM8.66216 22.75C9.26882 22.75 9.78449 22.5377 10.2092 22.113C10.6338 21.6883 10.8462 21.1727 10.8462 20.566C10.8462 19.9593 10.6338 19.448 10.2092 19.032C9.78449 18.616 9.26882 18.408 8.66216 18.408C8.07282 18.408 7.56582 18.616 7.14116 19.032C6.71649 19.448 6.50416 19.9593 6.50416 20.566C6.50416 21.1727 6.71649 21.6883 7.14116 22.113C7.56582 22.5377 8.07282 22.75 8.66216 22.75ZM18.4122 22.75C19.0188 22.75 19.5345 22.5377 19.9592 22.113C20.3838 21.6883 20.5962 21.1727 20.5962 20.566C20.5962 19.9593 20.3838 19.448 19.9592 19.032C19.5345 18.616 19.0188 18.408 18.4122 18.408C17.8228 18.408 17.3158 18.616 16.8912 19.032C16.4665 19.448 16.2542 19.9593 16.2542 20.566C16.2542 21.1727 16.4665 21.6883 16.8912 22.113C17.3158 22.5377 17.8228 22.75 18.4122 22.75Z"
                fill="#030712"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">
              0
            </span>
          </div>
        </div>
      </header>
      <div className="container mx-auto flex items-center lg:items-end pt-3 relative">
        {/* All Categories */}
        <div
          ref={wrapperRef}
          className="hidden lg:block relative catbtn w-95 hover:bg-gray-100"
        >
          <button
            onClick={() => setCategoryOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={categoryOpen}
            className="flex items-center justify-between px-4.5 py-2.5 w-full"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <g clipPath="url(#clip0_6314_4119)">
                  <path
                    d="M5.83228 2.22802H2.08828C1.70428 2.22802 1.38328 2.34802 1.12528 2.58802C0.867281 2.82802 0.738281 3.13402 0.738281 3.50602V7.25002C0.738281 7.62202 0.870281 7.94002 1.13428 8.20402C1.39828 8.46802 1.71628 8.60002 2.08828 8.60002H5.83228C6.21628 8.60002 6.53728 8.46802 6.79528 8.20402C7.05328 7.94002 7.18228 7.62202 7.18228 7.25002V3.50602C7.18228 3.13402 7.05328 2.82802 6.79528 2.58802C6.53728 2.34802 6.21628 2.22802 5.83228 2.22802ZM5.97628 7.25002C5.97628 7.28602 5.96128 7.31902 5.93128 7.34902C5.90128 7.37902 5.86828 7.39402 5.83228 7.39402H2.08828C2.05228 7.43002 2.01628 7.42702 1.98028 7.38502C1.94428 7.34302 1.92628 7.29802 1.92628 7.25002V3.50602C1.92628 3.45802 1.94428 3.41902 1.98028 3.38902C2.01628 3.35902 2.05228 3.34402 2.08828 3.34402H5.83228C5.86828 3.34402 5.90128 3.35902 5.93128 3.38902C5.96128 3.41902 5.97628 3.45802 5.97628 3.50602V7.25002ZM14.0763 2.22802H10.3323C9.96028 2.22802 9.64228 2.35702 9.37828 2.61502C9.11428 2.87302 8.98228 3.19402 8.98228 3.57802V7.32202C8.98228 7.69402 9.11428 8.01202 9.37828 8.27602C9.64228 8.54002 9.96028 8.67202 10.3323 8.67202H14.0763C14.4603 8.67202 14.7813 8.54002 15.0393 8.27602C15.2973 8.01202 15.4263 7.69402 15.4263 7.32202V3.50602C15.4263 3.13402 15.2973 2.82802 15.0393 2.58802C14.7813 2.34802 14.4603 2.22802 14.0763 2.22802ZM14.2383 7.25002C14.2383 7.28602 14.2233 7.31902 14.1933 7.34902C14.1633 7.37902 14.1243 7.39402 14.0763 7.39402H10.3323C10.2963 7.39402 10.2633 7.37902 10.2333 7.34902C10.2033 7.31902 10.1883 7.28602 10.1883 7.25002V3.50602C10.1883 3.45802 10.2033 3.41902 10.2333 3.38902C10.2633 3.35902 10.2963 3.34402 10.3323 3.34402H14.0763C14.1243 3.34402 14.1633 3.35902 14.1933 3.38902C14.2233 3.41902 14.2383 3.45802 14.2383 3.50602V7.25002ZM14.0763 10.472H10.3323C9.96028 10.472 9.64228 10.601 9.37828 10.859C9.11428 11.117 8.98228 11.438 8.98228 11.822V15.566C8.98228 15.95 9.11428 16.274 9.37828 16.538C9.64228 16.802 9.96028 16.934 10.3323 16.934H14.0763C14.4483 16.934 14.7663 16.802 15.0303 16.538C15.2943 16.274 15.4263 15.95 15.4263 15.566V11.822C15.4263 11.414 15.2973 11.087 15.0393 10.841C14.7813 10.595 14.4603 10.472 14.0763 10.472ZM14.2383 15.494C14.2383 15.53 14.2233 15.566 14.1933 15.602C14.1633 15.638 14.1243 15.656 14.0763 15.656H10.3323C10.2963 15.656 10.2633 15.638 10.2333 15.602C10.2033 15.566 10.1883 15.53 10.1883 15.494V11.75C10.1883 11.714 10.2033 11.681 10.2333 11.651C10.2633 11.621 10.2963 11.606 10.3323 11.606H14.0763C14.1243 11.606 14.1633 11.621 14.1933 11.651C14.2233 11.681 14.2383 11.714 14.2383 11.75V15.494ZM5.83228 10.472H2.08828C1.71628 10.472 1.39828 10.601 1.13428 10.859C0.870281 11.117 0.738281 11.438 0.738281 11.822V15.566C0.738281 15.95 0.870281 16.274 1.13428 16.538C1.39828 16.802 1.71628 16.934 2.08828 16.934H5.83228C6.20428 16.934 6.52228 16.802 6.78628 16.538C7.05028 16.274 7.18228 15.95 7.18228 15.566V11.822C7.18228 11.414 7.05328 11.087 6.79528 10.841C6.53728 10.595 6.21628 10.472 5.83228 10.472ZM5.97628 15.494C5.97628 15.53 5.96128 15.566 5.93128 15.602C5.90128 15.638 5.86828 15.656 5.83228 15.656H2.08828C2.05228 15.656 2.01628 15.638 1.98028 15.602C1.94428 15.566 1.92628 15.53 1.92628 15.494V11.75C1.92628 11.714 1.94428 11.681 1.98028 11.651C2.01628 11.621 2.05228 11.606 2.08828 11.606H5.83228C5.86828 11.606 5.90128 11.621 5.93128 11.651C5.96128 11.681 5.97628 11.714 5.97628 11.75V15.494Z"
                    fill="#030712"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6314_4119">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="matrix(1 0 0 -1 0.589844 18.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="catText">All Categories</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M0.892189 4.9846L5.1226 9.055L9.37589 4.9846C9.54358 4.7865 9.72652 4.7865 9.9247 4.9846C10.1229 5.1523 10.1229 5.3353 9.9247 5.5335L5.39701 10.0154C5.22932 10.1831 5.04638 10.1831 4.8482 10.0154L0.320511 5.5335C0.12233 5.3353 0.12233 5.1523 0.320511 4.9846C0.503448 4.8017 0.694007 4.8017 0.892189 4.9846Z"
                fill="#030712"
              />
            </svg>
          </button>
          <div
            ref={leftNavRef}
            className={`absolute top-8 left-0 mt-2 bg-white border border-[#E5E7EB] w-full z-10 transition-all duration-300 ease-out transform
    ${
      categoryOpen
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
    }`}
          >
            <Link
            ref={navLinksRef}
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4130)">
                    <path
                      d="M14.5793 5.12002C13.3393 4.92002 12.1193 5.18002 11.0793 5.86002C11.3793 5.18002 11.8793 4.56002 12.5393 4.02002C13.3193 3.36002 14.0593 3.06002 14.0593 3.06002C14.3593 2.94002 14.5193 2.60002 14.3993 2.30002C14.2793 1.98002 13.9393 1.84002 13.6393 1.96002C13.5393 2.00002 12.0593 2.58002 10.8993 3.94002C10.8593 3.74002 10.7793 3.52002 10.6993 3.30002C10.0193 1.50002 8.09928 0.600022 8.01928 0.560022C7.87928 0.480022 7.71928 0.480022 7.55928 0.540022C7.39928 0.600022 7.27928 0.720022 7.21928 0.860022C7.19928 0.940022 6.37928 2.88002 7.05928 4.70002C7.13928 4.86002 7.19928 5.02002 7.27928 5.16002C6.67928 5.04002 6.05928 5.02002 5.41928 5.12002C2.65928 5.56002 0.779276 8.22002 1.19928 11.04C1.51928 13.06 1.95928 14.8 2.53928 16.18C3.19928 17.78 4.01928 18.94 4.99928 19.66C5.77928 20.22 6.63928 20.5 7.57928 20.5C7.83928 20.5 8.09928 20.48 8.37928 20.44C8.99928 20.34 9.53928 20.1 9.99928 19.76C10.4593 20.1 10.9993 20.34 11.6393 20.44C12.8793 20.64 14.0193 20.38 14.9993 19.66C15.9793 18.94 16.7993 17.78 17.4593 16.18C18.0393 14.8 18.4993 13.06 18.7993 11.04C19.2393 8.22002 17.3393 5.56002 14.5793 5.12002ZM8.11928 2.00002C8.61928 2.34002 9.27928 2.92002 9.59928 3.72002C9.89928 4.54002 9.79928 5.42002 9.65928 6.00002C9.15928 5.66002 8.49928 5.08002 8.17928 4.26002C7.87928 3.46002 7.97928 2.58002 8.11928 2.00002ZM17.6193 10.86C17.0193 14.84 15.8593 17.54 14.2993 18.68C13.5593 19.22 12.7593 19.4 11.8193 19.26C11.2393 19.16 10.7993 18.94 10.4393 18.54C10.3193 18.42 10.1593 18.36 9.99928 18.36C9.83928 18.36 9.67928 18.42 9.55928 18.54C9.19928 18.94 8.75928 19.16 8.17928 19.26C7.23928 19.4 6.43928 19.22 5.69928 18.68C4.13928 17.54 2.97928 14.84 2.37928 10.86C2.03928 8.68002 3.49928 6.64002 5.61928 6.28002C5.81928 6.26002 6.01928 6.24002 6.21928 6.24002C7.03928 6.24002 7.83928 6.52002 8.51928 7.02002C9.39928 7.70002 10.6193 7.70002 11.4793 7.02002C12.3193 6.38002 13.3593 6.12002 14.3793 6.28002C16.4993 6.64002 17.9593 8.68002 17.6193 10.86Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4130">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Fruits & Vegetables
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4140)">
                    <path
                      d="M8.99942 20.46C7.05942 20.46 5.23942 19.7 3.85942 18.32C3.13942 17.6 2.51942 16.74 2.11942 15.8C1.65942 14.78 1.39942 13.7 1.39942 12.58C1.35942 10.04 2.53942 7.48 4.81942 5.22C5.71942 4.3 7.91942 2.48 10.3994 1.38C13.4794 0.0400001 15.9994 0.24 17.7194 1.94C18.1394 2.36 18.4394 3.04 18.5394 3.76C18.6194 4.38 18.5994 5.32 17.9794 6.3C16.5394 8.62 15.9994 10.48 16.2194 12.3C16.4994 14.54 15.7394 16.74 14.1394 18.34C12.7594 19.7 10.9394 20.46 8.99942 20.46ZM14.0994 1.66C13.1594 1.66 12.0794 1.92 10.8794 2.46C8.55942 3.48 6.49942 5.2 5.63942 6.04C1.35942 10.34 2.07942 14.88 4.67942 17.5C7.05942 19.88 10.9194 19.88 13.3194 17.5C14.6394 16.18 15.2794 14.32 15.0594 12.44C14.7994 10.34 15.3994 8.26 16.9794 5.7C17.7794 4.38 17.2594 3.14 16.8794 2.78C16.1394 2.04 15.2194 1.66 14.0994 1.66ZM8.99942 18.12C7.67942 18.12 6.43942 17.6 5.51942 16.66C4.39942 15.56 3.75942 14.06 3.73942 12.56C3.71942 11.68 3.91942 10.78 4.29942 9.9C4.75942 8.88 5.47942 7.86 6.45942 6.88C8.13942 5.2 11.6194 2.84 14.0994 2.84C14.6394 2.84 15.0794 2.94 15.4794 3.16C15.7994 3.34 16.0394 3.64 16.1394 4C16.2394 4.36 16.1794 4.74 15.9994 5.06L15.9794 5.08C14.2794 7.84 13.6194 10.22 13.8994 12.58C14.0794 14.1 13.5594 15.6 12.4794 16.68C11.5394 17.6 10.3194 18.12 8.99942 18.12ZM14.0994 4.02C12.0794 4.02 8.83942 6.16 7.29942 7.7C6.41942 8.58 5.77942 9.48 5.37942 10.38C5.05942 11.1 4.89942 11.84 4.89942 12.54C4.91942 13.74 5.43942 14.94 6.33942 15.84C7.05942 16.56 7.99942 16.94 8.99942 16.94C9.99942 16.94 10.9394 16.56 11.6594 15.84C12.4794 15.02 12.8794 13.88 12.7394 12.72C12.4194 10.1 13.1394 7.46 14.9794 4.46C15.0194 4.4 15.0194 4.34 14.9994 4.3C14.9994 4.28 14.9794 4.22 14.9194 4.18C14.6994 4.06 14.4394 4.02 14.0994 4.02ZM9.03942 15.16C7.99942 15.16 7.15942 14.32 7.15942 13.28C7.15942 12.24 7.99942 11.4 9.03942 11.4C10.0794 11.4 10.9194 12.24 10.9194 13.28C10.9194 14.32 10.0794 15.16 9.03942 15.16ZM9.03942 12.58C8.65942 12.58 8.33942 12.88 8.33942 13.28C8.33942 13.68 8.65942 13.98 9.03942 13.98C9.41942 13.98 9.75942 13.66 9.75942 13.28C9.75942 12.9 9.43942 12.58 9.03942 12.58Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4140">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Meats & Seafood
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4150)">
                    <path
                      d="M10.6149 3.53675C11.5477 3.8509 12.3201 4.78428 12.6975 5.31264C13.3094 6.16938 13.8049 7.21153 14.1304 8.32645C14.2045 8.5804 14.4366 8.7452 14.6884 8.7452C14.7423 8.7452 14.7972 8.73761 14.8516 8.72175C15.16 8.63172 15.3369 8.30882 15.2469 8.00049C14.8853 6.76162 14.331 5.5984 13.644 4.63655C13.0833 3.85146 12.167 2.83211 10.9861 2.4344C10.6818 2.33185 10.3518 2.49553 10.2493 2.79991C10.1468 3.10434 10.3105 3.43421 10.6149 3.53675Z"
                      fill="black"
                    />
                    <path
                      d="M18.4303 9.21758C18.3841 8.91707 18.114 8.70318 17.8111 8.72621C17.6783 8.73636 17.5586 8.7907 17.4661 8.87412L17.2956 9.02147C16.9538 7.05981 16.1723 5.13402 15.083 3.60897C13.6511 1.60413 11.8452 0.5 9.99798 0.5C8.15092 0.5 6.34512 1.60413 4.91317 3.60906C3.82388 5.13421 3.04242 7.05995 2.70086 9.02152L2.53714 8.87998C2.4438 8.79312 2.32153 8.7364 2.18535 8.72598C1.88227 8.70318 1.61242 8.91707 1.56622 9.21758C1.45227 9.95922 1.39453 10.6966 1.39453 11.4092C1.39453 14.1866 2.26672 16.5175 3.91679 18.1501C5.44841 19.6655 7.60828 20.5 9.99845 20.5C12.3884 20.5 14.5482 19.6655 16.0797 18.1501C17.7298 16.5175 18.6019 14.1866 18.6019 11.4092C18.602 10.6966 18.5442 9.95922 18.4303 9.21758ZM5.85975 4.28509C7.06731 2.59431 8.537 1.66317 9.99798 1.66317C11.4592 1.66317 12.9289 2.59431 14.1365 4.28505C15.257 5.85379 16.0195 7.89408 16.2509 9.92451L15.3183 10.7305L13.038 8.7599C12.8196 8.57119 12.4957 8.57119 12.2773 8.75999L9.99798 10.7304L7.71822 8.75995C7.49987 8.57114 7.17599 8.57114 6.9576 8.75995L4.67779 10.7304L3.74567 9.9247C3.97681 7.89431 4.73925 5.85393 5.85975 4.28509ZM15.2617 17.3232C13.9493 18.6217 12.0802 19.3368 9.9985 19.3368C7.91661 19.3368 6.04735 18.6217 4.73492 17.3232C3.3106 15.9141 2.5577 13.8691 2.5577 11.4092C2.5577 11.0996 2.56961 10.7846 2.59339 10.4661L4.29743 11.9391C4.51578 12.1279 4.83961 12.1279 5.05805 11.9391L7.33786 9.96857L9.61767 11.9391C9.83607 12.1279 10.1599 12.1279 10.3783 11.9391L12.6577 9.96857L14.938 11.9392C15.1564 12.1279 15.4801 12.1279 15.6985 11.9392L17.4031 10.4659C17.4268 10.7845 17.4388 11.0995 17.4388 11.4091C17.4388 13.869 16.686 15.914 15.2617 17.3232Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4150">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Breaksfast & Dairy
              </div>
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4162)">
                    <path
                      d="M16.4808 2.8C14.7408 1.32 12.4408 0.5 10.0008 0.5C7.56078 0.5 5.26078 1.32 3.52078 2.8C1.76078 4.32 0.800781 6.34 0.800781 8.48C0.800781 10.26 1.46078 11.42 2.56078 12.72C3.28078 13.58 3.64078 14.2 3.64078 15.3V18.42C3.64078 19.56 4.58078 20.5 5.72078 20.5H14.2808C15.4208 20.5 16.3608 19.56 16.3608 18.42V15.3C16.3608 14.2 16.7208 13.58 17.4408 12.72C18.5408 11.42 19.2008 10.26 19.2008 8.48C19.2008 6.34 18.2408 4.32 16.4808 2.8ZM16.5408 11.94C15.6608 12.98 15.1608 13.86 15.1608 15.3V18.42C15.1608 18.92 14.7608 19.32 14.2808 19.32H5.72078C5.24078 19.32 4.84078 18.92 4.84078 18.42V15.3C4.84078 13.86 4.34078 12.98 3.46078 11.94C2.50078 10.8 1.98078 9.92 1.98078 8.48C1.98078 4.74 5.58078 1.68 10.0008 1.68C14.4208 1.68 18.0208 4.74 18.0208 8.48C18.0208 9.92 17.5008 10.8 16.5408 11.94ZM6.94078 4.84C5.72078 4.84 4.72078 5.82 4.72078 7.04C4.72078 8.28 5.72078 9.26 6.94078 9.26C8.16078 9.26 9.16078 8.28 9.16078 7.04C9.16078 5.8 8.16078 4.84 6.94078 4.84ZM6.94078 8.08C6.38078 8.08 5.92078 7.62 5.92078 7.04C5.92078 6.48 6.38078 6.02 6.94078 6.02C7.50078 6.02 7.96078 6.48 7.96078 7.04C7.96078 7.62 7.50078 8.08 6.94078 8.08ZM13.4208 4.74C13.1008 4.74 12.8008 5 12.8208 5.34C12.8408 5.66 13.0808 5.92 13.4208 5.92C13.7208 5.92 14.0208 5.66 14.0008 5.34C14.0008 5 13.7408 4.74 13.4208 4.74ZM8.04078 10.96C7.72078 10.96 7.42078 11.24 7.44078 11.56C7.46078 11.88 7.70078 12.16 8.04078 12.16C8.36078 12.16 8.64078 11.88 8.64078 11.56C8.62078 11.24 8.38078 10.96 8.04078 10.96ZM10.0008 14.04C8.88078 14.04 7.96078 14.96 7.96078 16.08C7.96078 17.2 8.88078 18.12 10.0008 18.12C11.1208 18.12 12.0408 17.2 12.0408 16.08C12.0408 14.96 11.1208 14.04 10.0008 14.04ZM10.0008 16.94C9.52078 16.94 9.14078 16.56 9.14078 16.08C9.14078 15.6 9.52078 15.22 10.0008 15.22C10.4808 15.22 10.8608 15.6 10.8608 16.08C10.8608 16.56 10.4808 16.94 10.0008 16.94ZM13.1608 7.8C12.0608 7.8 11.1608 8.7 11.1608 9.8C11.1608 10.9 12.0608 11.8 13.1608 11.8C14.2608 11.8 15.1608 10.92 15.1608 9.8C15.1608 8.68 14.2608 7.8 13.1608 7.8ZM13.1608 10.62C12.7208 10.62 12.3408 10.26 12.3408 9.8C12.3408 9.36 12.7208 9 13.1608 9C13.6008 9 13.9608 9.36 13.9608 9.8C13.9608 10.26 13.6008 10.62 13.1608 10.62Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4162">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Breads & Bakery
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4172)">
                    <path
                      d="M15.1073 7.59833H1.43816C1.04082 7.59833 0.71875 7.9204 0.71875 8.31774V12.946C0.71875 17.1115 4.1075 20.5 8.27273 20.5C12.438 20.5 15.8267 17.1115 15.8267 12.9461V8.31774C15.8267 7.9204 15.5046 7.59833 15.1073 7.59833ZM14.3878 12.9461C14.3878 16.318 11.6446 19.0612 8.2727 19.0612C4.90074 19.0612 2.15762 16.318 2.15762 12.9461V9.0372H14.3879L14.3878 12.9461Z"
                      fill="black"
                    />
                    <path
                      d="M17.0512 10.548H15.1085V11.9868H17.0512C17.7793 11.9868 18.3941 12.6017 18.3941 13.3298C18.3941 14.0578 17.779 14.6727 17.0512 14.6727H14.6289V16.1116H17.0512C18.585 16.1116 19.833 14.8638 19.833 13.3298C19.833 11.7957 18.585 10.548 17.0512 10.548Z"
                      fill="black"
                    />
                    <path
                      d="M8.2741 0.5C7.87676 0.5 7.55469 0.82207 7.55469 1.21941V4.64867C7.55469 5.04602 7.87676 5.36809 8.2741 5.36809C8.67145 5.36809 8.99352 5.04602 8.99352 4.64867V1.21941C8.99352 0.82207 8.67145 0.5 8.2741 0.5Z"
                      fill="black"
                    />
                    <path
                      d="M11.7038 1.65112C11.3064 1.65112 10.9844 1.97319 10.9844 2.37054V5.79979C10.9844 6.19714 11.3064 6.51921 11.7038 6.51921C12.1011 6.51921 12.4232 6.19714 12.4232 5.79979V2.37054C12.4232 1.97315 12.1012 1.65112 11.7038 1.65112Z"
                      fill="black"
                    />
                    <path
                      d="M4.84441 1.65112C4.44707 1.65112 4.125 1.97319 4.125 2.37054V5.79979C4.125 6.19714 4.44707 6.51921 4.84441 6.51921C5.24176 6.51921 5.56383 6.19714 5.56383 5.79979V2.37054C5.56383 1.97315 5.24176 1.65112 4.84441 1.65112Z"
                      fill="black"
                    />
                    <path
                      d="M15.4677 19.0612H0.887383C0.490039 19.0612 0.167969 19.3832 0.167969 19.7806C0.167969 20.1779 0.490039 20.5 0.887383 20.5H15.4677C15.8651 20.5 16.1871 20.1779 16.1871 19.7806C16.1871 19.3832 15.8651 19.0612 15.4677 19.0612Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4172">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Beverages
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4214)">
                    <path
                      d="M18.4124 14.5677L16.3811 13.3949L18.1415 12.3569C18.4661 12.1654 18.5742 11.747 18.3827 11.4223C18.1912 11.0977 17.7729 10.9897 17.4481 11.1811L15.0232 12.611L11.3669 10.5L15.0225 8.38931L17.4482 9.819C17.557 9.88316 17.6764 9.91355 17.7941 9.91355C18.0278 9.91355 18.2554 9.79343 18.3827 9.57749C18.5741 9.2528 18.466 8.83439 18.1413 8.64292L16.3806 7.60526L18.4124 6.43218C18.7389 6.24372 18.8507 5.8263 18.6622 5.49989C18.4738 5.17338 18.0564 5.06154 17.73 5.25009L15.6986 6.42299L15.6801 4.37904C15.6767 4.00212 15.3675 3.69755 14.9915 3.70273C14.6146 3.7061 14.3117 4.01441 14.3152 4.39133L14.3406 7.20695L10.6845 9.31787V5.09639L13.1357 3.71101C13.4639 3.52556 13.5795 3.10923 13.3941 2.781C13.2086 2.45285 12.7922 2.3371 12.4641 2.52265L10.6845 3.52847V1.1825C10.6845 0.805577 10.3789 0.5 10.002 0.5C9.62507 0.5 9.31949 0.805577 9.31949 1.1825V3.52847L7.5399 2.52274C7.21157 2.33719 6.79543 2.45285 6.60988 2.78109C6.42443 3.10923 6.54009 3.52565 6.86823 3.71111L9.3194 5.09648V9.31787L5.66331 7.20695L5.68869 4.39133C5.69215 4.01441 5.38931 3.7061 5.01238 3.70273C5.01029 3.70273 5.00829 3.70273 5.00611 3.70273C4.6321 3.70273 4.32716 4.00422 4.32379 4.37913L4.30532 6.42299L2.27393 5.25009C1.94752 5.06154 1.5301 5.17347 1.34164 5.49989C1.15318 5.8263 1.26502 6.24372 1.59143 6.43218L3.62318 7.60526L1.86225 8.64311C1.53756 8.83448 1.42945 9.25289 1.62083 9.57767C1.74814 9.79361 1.97573 9.91373 2.2095 9.91373C2.32726 9.91373 2.44656 9.88325 2.55539 9.81919L4.98135 8.38949L8.63708 10.5001L4.98072 12.6111L2.55539 11.181C2.23089 10.9896 1.81229 11.0975 1.62083 11.4222C1.42936 11.7469 1.53738 12.1653 1.86207 12.3567L3.62273 13.3948L1.59134 14.5676C1.26493 14.7561 1.15309 15.1735 1.34155 15.4999C1.46795 15.7189 1.69736 15.8413 1.93323 15.8413C2.04898 15.8413 2.16637 15.8118 2.27384 15.7497L4.30523 14.5768L4.3237 16.6209C4.32707 16.9957 4.63201 17.2973 5.00602 17.2973C5.00811 17.2973 5.0102 17.2973 5.01229 17.2972C5.38921 17.2938 5.69206 16.9855 5.6886 16.6086L5.66321 13.7929L9.3194 11.6819V15.9035L6.86823 17.2889C6.54009 17.4744 6.42443 17.8907 6.60988 18.2189C6.73537 18.441 6.9666 18.5657 7.20466 18.5657C7.31841 18.5657 7.43379 18.5372 7.5399 18.4773L9.31949 17.4715V19.8175C9.31949 20.1944 9.62507 20.5 10.002 20.5C10.3789 20.5 10.6845 20.1944 10.6845 19.8175V17.4715L12.4641 18.4773C12.5702 18.5372 12.6855 18.5657 12.7993 18.5657C13.0374 18.5657 13.2686 18.441 13.3941 18.2189C13.5795 17.8908 13.4639 17.4744 13.1357 17.2889L10.6845 15.9035V11.682L14.3406 13.7929L14.3146 16.6085C14.311 16.9854 14.6138 17.2938 14.9907 17.2973C14.9929 17.2974 14.995 17.2974 14.9971 17.2974C15.3711 17.2974 15.676 16.9959 15.6795 16.6211L15.6984 14.5768L17.73 15.7498C17.8375 15.8119 17.9549 15.8414 18.0707 15.8414C18.3065 15.8414 18.5359 15.7189 18.6623 15.5C18.8508 15.1736 18.739 14.7562 18.4124 14.5677Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4214">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Frozen Foods
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4236)">
                    <path
                      d="M19.46 5.36L15.14 1.04C14.8 0.7 14.34 0.5 13.84 0.5C13.36 0.5 12.88 0.7 12.54 1.04L9.42 4.16L6.38 5.16C5.92 5.3 5.6 5.68 5.54 6.16C5.48 6.64 5.68 7.1 6.08 7.36C6.1 7.38 6.14 7.4 6.16 7.42L0.54 13.04C-0.18 13.76 -0.18 14.92 0.54 15.64L4.86 19.96C5.2 20.3 5.66 20.5 6.16 20.5C6.66 20.5 7.12 20.3 7.46 19.96L12.6 14.82C13.06 15.08 13.48 15.32 13.84 15.48C14.02 15.56 14.2 15.62 14.38 15.62C14.56 15.62 14.76 15.56 14.92 15.48C15.28 15.32 15.52 15 15.6 14.62L16.36 11.06L19.46 7.96C20.18 7.24 20.18 6.08 19.46 5.36ZM6.6 19.1C6.48 19.22 6.32 19.3 6.16 19.3C5.98 19.3 5.82 19.22 5.72 19.1L1.4 14.78C1.14 14.54 1.14 14.14 1.4 13.9L7.14 8.16C8 8.86 8.92 9.82 9.22 10.88C9.6 12.24 10.58 13.3 11.6 14.12L6.6 19.1ZM14.42 14.38C14.42 14.38 14.42 14.4 14.4 14.4C14.38 14.4 14.38 14.4 14.36 14.4C13.36 13.92 10.96 12.56 10.38 10.54C9.86 8.74 8.12 7.28 6.74 6.36C6.74 6.36 6.72 6.34 6.74 6.32C6.74 6.3 6.74 6.3 6.76 6.3L9.58 5.38L15.16 10.94L14.42 14.38ZM12.14 6.22L13.84 4.52L15.98 6.66L14.28 8.36L12.14 6.22ZM18.6 7.1L15.82 9.9L15.14 9.22L17.26 7.08C17.38 6.98 17.44 6.82 17.44 6.66C17.44 6.5 17.38 6.34 17.26 6.22L14.28 3.24C14.16 3.12 14 3.06 13.84 3.06C13.68 3.06 13.52 3.12 13.42 3.24L11.28 5.36L10.6 4.68L13.4 1.9C13.52 1.78 13.68 1.7 13.84 1.7C14.02 1.7 14.18 1.78 14.3 1.9L18.6 6.2C18.86 6.46 18.86 6.86 18.6 7.1Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4236">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Biscuits & Snacks
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4243)">
                    <path
                      d="M15.3394 12.76H12.6994C11.6394 12.76 10.6794 13.2 9.97937 13.88V11.64H11.6794C13.5994 11.64 15.1594 10.08 15.1594 8.16C15.1594 7.84 14.8994 7.58 14.5594 7.58H12.2794C11.3794 7.58 10.5794 7.92 9.97937 8.46V7.04L10.5594 6.46C11.2194 5.78 11.5994 4.88 11.5994 3.94C11.5994 2.98 11.2194 2.1 10.5594 1.42L9.79938 0.68C9.57938 0.44 9.19937 0.44 8.97937 0.68L8.21938 1.42C7.53938 2.1 7.17937 2.98 7.17937 3.94C7.17937 4.88 7.53938 5.78 8.21938 6.46L8.79937 7.04V8.46C8.17937 7.92 7.37937 7.58 6.49937 7.58H4.19937C3.87937 7.58 3.61937 7.84 3.61937 8.16C3.61937 10.08 5.17937 11.64 7.07937 11.64H8.79937V13.88C8.09937 13.2 7.13937 12.76 6.07937 12.76H3.43937C3.11937 12.76 2.85938 13.02 2.85938 13.36C2.85938 15.5 4.59938 17.24 6.73938 17.24H8.79937V18.68C8.79937 19 9.05938 19.26 9.37937 19.26C9.69938 19.26 9.97937 19 9.97937 18.68V17.24H12.0194C14.1794 17.24 15.9194 15.5 15.9194 13.36C15.9194 13.02 15.6594 12.76 15.3394 12.76ZM12.2794 8.76H13.8994C13.6394 9.74 12.7394 10.46 11.6794 10.46H10.0394C10.2994 9.48 11.1994 8.76 12.2794 8.76ZM7.07937 10.46C6.01937 10.46 5.11937 9.74 4.85937 8.76H6.49937C7.55937 8.76 8.45937 9.48 8.71937 10.46H7.07937ZM6.73938 16.08C5.43938 16.08 4.35937 15.16 4.07937 13.94H6.07937C7.37937 13.94 8.45937 14.86 8.73938 16.08H6.73938ZM9.37937 5.88C9.19938 5.88 8.33937 5.08 8.33937 3.94C8.33937 2.84 8.99938 2.3 9.37937 1.92C9.75938 2.28 10.4194 2.84 10.4194 3.94C10.4194 5.06 9.57938 5.88 9.37937 5.88ZM12.0194 16.08H10.0394C10.2994 14.86 11.3994 13.94 12.6994 13.94H14.6794C14.4194 15.16 13.3194 16.08 12.0194 16.08Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4243">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Grocery & Staples
              </div>
            </Link>

            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4250)">
                    <path
                      d="M18.7355 19.818L17.1633 10.3778C16.9364 9.01812 15.7709 8.03125 14.3919 8.03125C13.3307 8.03125 12.4674 7.16793 12.4674 6.10676V2.96875C12.4674 1.6075 11.36 0.5 9.99868 0.5C8.63739 0.5 7.52993 1.6075 7.52993 2.96875V6.10676C7.52993 7.16793 6.66661 8.03125 5.60544 8.03125C4.22649 8.03125 3.06094 9.01813 2.83391 10.3786L1.26184 19.818C1.2336 19.9879 1.28153 20.1615 1.39286 20.2929C1.50423 20.4243 1.66766 20.5 1.83985 20.5H18.1575C18.3297 20.5 18.4932 20.4243 18.6045 20.2929C18.7158 20.1615 18.7638 19.9879 18.7355 19.818ZM3.98993 10.5707C4.12219 9.77828 4.80161 9.20312 5.60544 9.20312C7.31278 9.20312 8.7018 7.8141 8.7018 6.10676V2.96875C8.7018 2.25363 9.2836 1.67188 9.99868 1.67188C10.7138 1.67188 11.2956 2.25367 11.2956 2.96875V6.10676C11.2956 7.8141 12.6846 9.20312 14.3919 9.20312C15.1957 9.20312 15.8752 9.77828 16.0073 10.57C16.0537 10.8503 16.1026 11.1451 16.1517 11.4414C15.394 10.86 14.4619 10.5417 13.5039 10.5417H6.49352C5.53548 10.5417 4.60337 10.86 3.84567 11.4414C3.89473 11.1454 3.94356 10.8508 3.98993 10.5707ZM3.35926 14.37C3.61466 12.8307 4.93278 11.7136 6.49348 11.7136H13.5038C15.0645 11.7136 16.3827 12.8307 16.6383 14.3714C16.7929 15.2898 16.9475 16.2145 17.0483 16.8177H2.94899C3.04977 16.2143 3.20454 15.2893 3.35926 14.37ZM2.53122 19.3281L2.75372 17.9896H17.2436L17.4661 19.3281H2.53122Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4250">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Household Needs
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_6314_4257)">
                    <path
                      d="M18.9591 3.76C18.9591 3.04 18.4591 2.04 16.0991 1.3C14.4591 0.78 12.2991 0.5 9.99906 0.5C7.69906 0.5 5.53906 0.78 3.89906 1.3C1.53906 2.04 1.03906 3.04 1.03906 3.76V17.2C1.03906 19.36 5.53906 20.5 9.99906 20.5C14.4591 20.5 18.9591 19.36 18.9591 17.2V3.76ZM17.7791 17.2C17.7791 17.56 17.1591 18.1 15.7391 18.56C15.4791 18.64 15.1991 18.72 14.8991 18.8V17.96C14.8991 17.62 14.6391 17.36 14.2991 17.36C13.9591 17.36 13.7191 17.62 13.7191 17.96V19.04C12.5791 19.22 11.3191 19.32 9.99906 19.32C7.81906 19.32 5.77906 19.06 4.25906 18.56C2.85906 18.1 2.21906 17.56 2.21906 17.2V5.48C3.83906 6.5 6.93906 7.04 9.99906 7.04C11.2791 7.04 12.5391 6.96 13.7191 6.78V7.64C13.7191 7.98 13.9791 8.24 14.2991 8.24C14.6191 8.24 14.8991 7.98 14.8991 7.64V6.56C16.0591 6.3 17.0591 5.94 17.7791 5.48V17.2ZM15.7391 5.1C14.2191 5.6 12.1791 5.86 9.99906 5.86C7.81906 5.86 5.77906 5.6 4.25906 5.1C2.85906 4.64 2.21906 4.1 2.21906 3.76C2.21906 3.42 2.83906 2.86 4.25906 2.42C5.77906 1.94 7.81906 1.68 9.99906 1.68C12.1791 1.68 14.2191 1.94 15.7391 2.42C17.1591 2.86 17.7791 3.42 17.7791 3.76C17.7791 4.1 17.1591 4.64 15.7391 5.1ZM12.4591 2.58C11.7991 2.42 10.9191 2.32 9.99906 2.32C9.07906 2.32 8.19906 2.42 7.53906 2.58C6.61906 2.82 6.15906 3.22 6.15906 3.76C6.15906 4.3 6.61906 4.7 7.53906 4.96C8.19906 5.12 9.07906 5.22 9.99906 5.22C10.9191 5.22 11.7991 5.12 12.4591 4.96C13.3791 4.7 13.8391 4.3 13.8391 3.76C13.8391 3.22 13.3791 2.82 12.4591 2.58ZM9.99906 4.04C8.93906 4.04 8.13906 3.9 7.67906 3.76C8.13906 3.64 8.93906 3.5 9.99906 3.5C11.0791 3.5 11.8591 3.64 12.3191 3.76C11.8591 3.9 11.0791 4.04 9.99906 4.04ZM14.2991 9.44C13.9791 9.44 13.7191 9.7 13.7191 10.04V11.6C13.7191 11.94 13.9791 12.2 14.2991 12.2C14.6191 12.2 14.8991 11.94 14.8991 11.6V10.04C14.8991 9.7 14.6391 9.44 14.2991 9.44ZM14.2991 13.4C13.9791 13.4 13.7191 13.66 13.7191 14V15.56C13.7191 15.9 13.9791 16.16 14.2991 16.16C14.6191 16.16 14.8991 15.9 14.8991 15.56V14C14.8991 13.66 14.6391 13.4 14.2991 13.4Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6314_4257">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Healthcare
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between text-[14px] px-4  py-3 border-b border-[#E5E7EB]  w-full text-[#030712] hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M8.56862 11.5898C8.56862 10.5252 7.70248 9.65906 6.63784 9.65906C5.57321 9.65906 4.70703 10.5252 4.70703 11.5898H5.8789C5.8789 11.1714 6.21938 10.8309 6.63784 10.8309C7.05631 10.8309 7.39675 11.1714 7.39675 11.5898H8.56862Z"
                    fill="black"
                  />
                  <path
                    d="M13.3605 9.65906C12.2958 9.65906 11.4297 10.5252 11.4297 11.5898H12.6016C12.6016 11.1714 12.942 10.8309 13.3605 10.8309C13.7789 10.8309 14.1194 11.1714 14.1194 11.5898H15.2913C15.2913 10.5252 14.4251 9.65906 13.3605 9.65906Z"
                    fill="black"
                  />
                  <path
                    d="M9.99807 15.0188C9.25719 15.0188 8.56252 14.6215 8.18504 13.9819L7.17578 14.5774C7.76298 15.5725 8.84442 16.1906 9.99803 16.1906C11.1516 16.1906 12.2331 15.5725 12.8203 14.5774L11.811 13.9818C11.4336 14.6214 10.7389 15.0188 9.99807 15.0188Z"
                    fill="black"
                  />
                  <path
                    d="M19.2375 9.51438C18.8643 9.14161 18.3957 8.89512 17.887 8.7986C16.7884 5.40378 13.6015 3.0664 10 3.0664H9.60715C8.66374 3.0664 7.89622 2.29884 7.89622 1.35547H6.72435C6.72435 1.99563 6.93435 2.5875 7.2887 3.0664H6.91743C5.97402 3.0664 5.2065 2.29884 5.2065 1.35547H4.03463C4.03463 2.62872 4.86464 3.71107 6.01173 4.09171C4.19752 5.08911 2.77553 6.75142 2.11307 8.7986C1.60437 8.89512 1.13559 9.14169 0.762064 9.51481C0.270636 10.0068 0 10.6604 0 11.3555C0 12.042 0.264825 12.6896 0.74574 13.1792C1.12159 13.5619 1.59626 13.8144 2.11307 13.9124C3.21158 17.3072 6.39842 19.6445 10 19.6445C13.6016 19.6445 16.7884 17.3072 17.8869 13.9124C18.4037 13.8144 18.8784 13.5619 19.2543 13.1792C19.7352 12.6896 20 12.042 20 11.3555C20 10.6604 19.7294 10.0068 19.2375 9.51438ZM17.4253 12.786L16.9855 12.7943L16.8707 13.2189C16.0342 16.3122 13.2089 18.4726 9.99996 18.4726C6.79107 18.4726 3.96578 16.3122 3.12929 13.2189L3.01446 12.7943L2.57473 12.786C1.80117 12.7714 1.17183 12.1297 1.17183 11.3555C1.17183 10.9732 1.32073 10.6136 1.59061 10.3434C1.85382 10.0805 2.20331 9.93185 2.57462 9.9249L3.01442 9.91664L3.12925 9.49201C3.96578 6.39873 6.79111 4.23831 10 4.23831C11.0591 4.23831 11.9207 5.09994 11.9207 6.15904C11.9207 7.21815 11.0591 8.07982 10 8.07982C8.9409 8.07982 8.07926 7.21819 8.07926 6.15908H6.90739C6.90739 7.86436 8.29472 9.25169 10 9.25169C11.7053 9.25169 13.0926 7.86436 13.0926 6.15908C13.0926 5.67378 12.98 5.21445 12.7799 4.80527C14.7453 5.64129 16.289 7.34095 16.8707 9.49205L16.9855 9.91668L17.4253 9.92494C17.7967 9.93189 18.1461 10.0806 18.4089 10.343C18.6793 10.6137 18.8282 10.9732 18.8282 11.3555C18.8281 12.1297 18.1988 12.7714 17.4253 12.786Z"
                    fill="black"
                  />
                </svg>
                Baby & Pregnancy
              </div>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between border-b pl-8 border-[#e5e7eb] w-full">
          {/* Left nav links */}
          <div className="flex items-center gap-6">
            {[
              { label: "Home", key: "home" },
              { label: "Shop", key: "shop" },
              { label: "Fruits & Vegetables", key: "fruitsvegitables" },
              { label: "Beverages", key: "beverges" },
              { label: "Blog", key: "blog" },
              { label: "Contact", key: "contact" },
            ].map((item, index) => (
              <Link
                key={item.key}
                href="/"
                onClick={() => setactiveNav(item.key)}
                className={`navLink ${activeNav === item.key ? "active" : ""}`}
                ref={(el) => (leftLinksRef.current[index] = el)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              onClick={() => setactiveNav("trending")}
              className={`navLink ${activeNav === "trending" ? "active" : ""}`}
              ref={(el) => (rightLinksRef.current[0] = el)}
            >
              Trending Products
            </Link>
            <Link
              href="/"
              onClick={() => setactiveNav("almost-finished")}
              className={`navLink flex items-center gap-1.5 almostFinished ${
                activeNav === "almost-finished" ? "active" : ""
              }`}
              ref={(el) => (rightLinksRef.current[1] = el)}
            >
              Almost Finished
              <span className="saleBadge">SALE</span>
            </Link>
          </div>
        </div>

        <div className="flex lg:hidden items-center bg-[#F3F4F6] pl-4 pr-3 py-2 rounded-md mr-4 w-full">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 bg-transparent outline-none text-sm text-black placeholder-[#6B7280] "
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 27 26"
            fill="none"
          >
            <g clipPath="url(#clip0_6314_4098)">
              <path
                d="M21.4938 22.204L17.3858 18.096C18.0965 17.264 18.6512 16.3237 19.0498 15.275C19.4485 14.2263 19.6478 13.1387 19.6478 12.012C19.6478 10.296 19.2145 8.70134 18.3478 7.228C17.5158 5.78934 16.3805 4.64534 14.9418 3.796C13.4685 2.92934 11.8652 2.496 10.1318 2.496C8.39851 2.496 6.79518 2.92934 5.32184 3.796C3.88318 4.628 2.73918 5.75467 1.88984 7.176C1.02318 8.66667 0.589844 10.2743 0.589844 11.999C0.589844 13.7237 1.02318 15.3227 1.88984 16.796C2.72184 18.2347 3.84851 19.3787 5.26984 20.228C6.76051 21.112 8.37251 21.554 10.1058 21.554C11.2325 21.554 12.3202 21.3547 13.3688 20.956C14.4175 20.5573 15.3578 20.0027 16.1898 19.292L20.2978 23.4C20.3498 23.452 20.4278 23.4997 20.5318 23.543C20.6358 23.5863 20.7398 23.608 20.8438 23.608C20.9478 23.608 21.0518 23.5863 21.1558 23.543C21.2598 23.4997 21.3378 23.452 21.3898 23.4C21.5978 23.192 21.7062 22.984 21.7148 22.776C21.7235 22.568 21.6498 22.3773 21.4938 22.204ZM2.30584 11.908C2.30584 10.4867 2.66118 9.16934 3.37184 7.956C4.06518 6.79467 4.99251 5.86734 6.15384 5.174C7.36718 4.46334 8.68451 4.108 10.1058 4.108C11.5272 4.108 12.8445 4.472 14.0578 5.2C15.2365 5.89334 16.1725 6.838 16.8658 8.034C17.5592 9.23 17.9058 10.53 17.9058 11.934C17.9058 13.338 17.5418 14.6467 16.8138 15.86C16.1205 17.0387 15.1758 17.9747 13.9798 18.668C12.7838 19.3613 11.4925 19.708 10.1058 19.708C8.70184 19.7427 7.38451 19.4047 6.15384 18.694C4.99251 18.018 4.06084 17.0733 3.35884 15.86C2.65684 14.6467 2.30584 13.3293 2.30584 11.908Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_6314_4098">
                <rect
                  width="26"
                  height="26"
                  fill="white"
                  transform="matrix(1 0 0 -1 0.328125 26)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <button
          className="block lg:hidden pl-2 cursor-pointer"
          onClick={() => setmobileNavOpen2(!mobileNavOpen2)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000 "
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="6" y1="12" x2="21" y2="12" />
            <line x1="9" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {/* Always render menu */}
        <div className="fixed inset-0 z-40 lg:hidden pointer-events-none">
          {/* Backdrop (click to close) */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${
              mobileNavOpen2 ? "opacity-100 pointer-events-auto" : "opacity-0"
            }`}
            onClick={() => setmobileNavOpen2(false)}
          ></div>

          {/* Slide-in panel */}
          <div
            className={`fixed top-0 right-0 bg-white w-full 
      h-screen flex flex-col items-center justify-center
      shadow-md z-50 transition-transform duration-300 ease-in-out transform 
      ${mobileNavOpen2 ? "translate-x-0" : "translate-x-full"}
      pointer-events-auto`}
          >
            {/* Close button */}
            <button
              className="absolute right-3 top-4 p-2 rounded-full hover:bg-red-50 transition-colors"
              aria-label="Close"
              onClick={() => setmobileNavOpen2(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Navigation Items */}
            <div className="flex lg:hidden flex-col items-center justify-between gap-6 border-b  border-[#e5e7eb] w-ful z-100 ">
              <div className="flex flex-col items-center gap-6">
                <Link
                  onClick={() => {
                    setactiveNav("home"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={`navLink ${activeNav === "home" ? "active" : ""}`}
                >
                  Home
                </Link>

                <Link
                  onClick={() => {
                    setactiveNav("shop"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={`navLink ${activeNav === "shop" ? "active" : ""}`}
                >
                  Shop
                </Link>

                <Link
                  onClick={() => {
                    setactiveNav("fruitsvegitables"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={`navLink ${
                    activeNav === "fruitsvegitables" ? "active" : ""
                  }`}
                >
                  Fruits & Vegetables
                </Link>

                <Link
                  onClick={() => {
                    setactiveNav("beverges"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={`navLink ${
                    activeNav === "beverges" ? "active" : ""
                  }`}
                >
                  Beverages
                </Link>

                <Link
                  onClick={() => {
                    setactiveNav("blog"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={`navLink ${activeNav === "blog" ? "active" : ""}`}
                >
                  Blog
                </Link>

                <Link
                  onClick={() => {
                    setactiveNav("contact"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={`navLink ${
                    activeNav === "contact" ? "active" : ""
                  }`}
                >
                  Contact
                </Link>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Link
                  href="/"
                  className={`navLink ${
                    activeNav === "trending" ? "active" : ""
                  }`}
                  onClick={() => {
                    setactiveNav("trending"), setmobileNavOpen2(false);
                  }}
                >
                  Trending Products
                </Link>

                <Link
                  onClick={() => {
                    setactiveNav("almost-finished"), setmobileNavOpen2(false);
                  }}
                  href="/"
                  className={
                    "navLink flex items-center gap-1.5 almostFinished " +
                    (activeNav === "almost-finished" ? "active" : "")
                  }
                >
                  Almost Finished
                  <span className="saleBadge">SALE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
