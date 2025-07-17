import https from 'https';
import querystring from 'querystring';

const Languages = {
  "af": "Afrikaans",
  "sq": "Albanian",
  "ar": "Arabic",
  "az": "Azerbaijani",
  "eu": "Basque",
  "bn": "Bengali",
  "be": "Belarusian",
  "bg": "Bulgarian",
  "ca": "Catalan",
  "zh-cn": "Chinese Simplified",
  "zh-tw": "Chinese Traditional",
  "hr": "Croatian",
  "cs": "Czech",
  "da": "Danish",
  "nl": "Dutch",
  "en": "English",
  "eo": "Esperanto",
  "et": "Estonian",
  "tl": "Filipino",
  "fi": "Finnish",
  "fr": "French",
  "gl": "Galician",
  "ka": "Georgian",
  "de": "German",
  "el": "Greek",
  "gu": "Gujarati",
  "ht": "Haitian Creole",
  "iw": "Hebrew",
  "hi": "Hindi",
  "hu": "Hungarian",
  "is": "Icelandic",
  "id": "Indonesian",
  "ga": "Irish",
  "it": "Italian",
  "ja": "Japanese",
  "kn": "Kannada",
  "ko": "Korean",
  "la": "Latin",
  "lv": "Latvian",
  "lt": "Lithuanian",
  "mk": "Macedonian",
  "ms": "Malay",
  "mt": "Maltese",
  "no": "Norwegian",
  "fa": "Persian",
  "pl": "Polish",
  "pt": "Portuguese",
  "ro": "Romanian",
  "ru": "Russian",
  "sr": "Serbian",
  "sk": "Slovak",
  "sl": "Slovenian",
  "es": "Spanish",
  "sw": "Swahili",
  "sv": "Swedish",
  "ta": "Tamil",
  "te": "Telugu",
  "th": "Thai",
  "tr": "Turkish",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "vi": "Vietnamese",
  "cy": "Welsh",
  "yi": "Yiddish"
};

export async function POST(request) {
  const { from, to, texts } = await request.json();

  // Validate input
  if (!from || !to || !texts || texts.length === 0) {
    return new Response('Missing required parameters', { status: 400 });
  }

  if (!(from in Languages)) {
    return new Response(`Cannot translate from unknown language: ${from}`, { status: 400 });
  }

  if (!(to in Languages)) {
    return new Response(`Cannot translate to unknown language: ${to}`, { status: 400 });
  }

  // Make translation requests for each text
  const translatedTexts = await Promise.all(
    texts.map(async (text) => {
      const path = `/translate_a/single?client=gtx&ie=UTF-8&oe=UTF-8&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text.trim())}`;

      const options = {
        host: 'translate.google.com',
        port: 443,
        path,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
      };

      return new Promise((resolve, reject) => {
        https.get(options, (response) => {
          let content = '';
          response.on('data', chunk => content += chunk);
          response.on('end', () => {
            try {
              const json = JSON.parse(content);
              console.log('Translation Response:', json); // Log the response structure

              if (json && json[0] && json[0][0]) {
                // Extract the translation text (index 0,0) and discard extra data
                let translatedText = json[0][0][0];

                // Handle special characters if needed (example for Urdu characters)
                translatedText = translatedText.replace('%', '%');  // Replace special characters as needed

                resolve(translatedText);
              } else {
                resolve(null); // Handle the error case if translation is not found
              }
            } catch (error) {
              console.error('Error parsing response:', error);
              resolve(null); // Return null if there's an error with the translation
            }
          });
        }).on('error', (error) => {
          console.error('Request error:', error);
          reject(error);
        });
      });
    })
  );

  // Return the list of translations, ensuring they are in the correct order
  return new Response(JSON.stringify({ translations: translatedTexts.filter(Boolean) }), { status: 200 });
}
