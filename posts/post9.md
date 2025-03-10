# **Large Language Models (LLMs) என்றால் என்ன?**

மனிதர்கள் ஒரு உரையாடலில் ஈடுபடும் போது, அவர்கள் முன்பு பேசிய விஷயங்களை நினைவில் வைத்துக்கொள்கிறார்கள். உதாரணமாக, நீங்கள் ஒரு உணவகத்தில் உணவு ஆர்டர் செய்யும் போது, முதலில் **“இந்த உணவகத்தில் 100 ரூபாய்க்குள் என்ன உணவு கிடைக்கும்?”** என்று கேட்டால், உணவக ஊழியர் அதற்கேற்ப ஒரு பதில் கூறுவார். 

பின்னர் நீங்கள் **“அதில் எதாவது காரமான உணவுகள் உள்ளதா?”** என்று கேட்டால், அவர் உங்கள் முதல் கேள்வியையும் கருத்தில் கொண்டு, **100 ரூபாய்க்குள் காரமான உணவுகள்** என்னென்ன இருக்கின்றன என்பதைச் சொல்வார். 

அதாவது, **மனிதர்கள் உரையாடலில் ஒரு தொடர்ச்சியை வைத்திருக்கிறார்கள்**. ஒரு உரையாடலில் நாம் முன்பு கூறிய விஷயங்களை நினைவில் வைத்துக்கொள்கிறோம், மேலும் அதைப் பொறுத்து அடுத்த பதிலை வழங்குகிறோம். 

நவீன மென்பொருட்கள் மற்றும் **Natural Language Processing, NLP** முன்னேறிய பிறகு, **மனிதர்களைப் போல பதிலளிக்க** தொழில்நுட்பம் வளர்ந்துள்ளது. **Large Language Models (LLMs)** என்பது இதன் ஒரு முக்கிய கூறாகும். 

இவை **புத்தகங்கள், ஆராய்ச்சி கட்டுரைகள், இணையதளங்கள், மற்றும் பல பெரிய தரவுத்தொகுப்புகள்** கொண்டு பயிற்சி பெற்றுள்ளன. **LLMs-ன் வேலை என்ன?**

1. **மொழியை புரிந்துகொள்ளுதல்** – பயனர் என்ன கேட்கிறார்கள் என்பதைப் புரிந்துகொள்வது. 
2. **பதில்களை உருவாக்குதல்** – தரவுத்தொகுப்புகளை அடிப்படையாகக் கொண்டு உகந்த பதிலை உருவாக்குதல். 
3. **Context (சூழ்நிலை) அடிப்படையில் முடிவெடுக்குதல்** – பேச்சின் தொடர்ச்சியைப் பேணுதல். 

> **உதாரணம்:**
> **மாணவர்கள்:** “AI, எனக்கு Differential Equations குறித்த தகவல் வேண்டும்.”
> **மென்பொருள்:** “Differential Equations என்பது calculus-இன் ஒரு பகுதி… நீங்கள் எந்தப் பிரிவில் உதவியை எதிர்பார்க்கிறீர்கள்?”

#### **LLM-களில் நினைவாற்றல் (Memory) எப்படி வேறுபடுகிறது?**

மனிதர்கள் பேசும்போது, அவர்கள் முன்பு பேசிய தகவல்களை நினைவில் வைத்துக்கொள்கிறார்கள். ஒரு உணவகத்தில் உணவு ஆர்டர் செய்யும் போது, ஊழியர் உங்கள் முந்தைய கேள்விகளை கருத்தில் கொண்டு பதிலளிப்பார். ஆனால் **LLMs-க்கு இயல்பாக நினைவாற்றல் இல்லை**. 

#### **மனித நினைவாற்றல் vs LLM-களின் நினைவாற்றல்**

| **மனிதன்**                                             | **LLM**                                            |
| ----------------------------------------------------- | -------------------------------------------------- |
| முன்னதாக பேசிய உரையாடலை நினைவில் வைத்துக்கொள்கிறான்         | ஒவ்வொரு கேள்வியையும் தனிப்பட்டதாக பார்க்கிறது             |
| பேசும் போது முன்பு கேட்ட தகவல்களை இணைத்து பதிலளிக்க முடியும் | முந்தைய உரையாடலை தனியாக வழங்காவிட்டால் நினைவில் கொள்ளாது |

#### **உரையாடல்களை தொடர்ந்தும் வைத்திருப்பது எப்படி?**

மனிதர்களைப் போல் **மென்பொருள்களும் ஒரே conversation-ஐ தொடர** உதவ, நாம் முந்தைய உரையாடல்களை **message list-ல் சேமித்து**, ஒவ்வொரு முறையும் அந்த **முழு உரையாடலை அனுப்ப வேண்டும்**. 

> **எளிய மொழியில்:** இந்த மாடல்களை ஒரு புதிய நண்பராக கற்பனை செய்யலாம். நீங்கள் ஒரு பழைய நிகழ்வை அவரிடம் சொன்னால், அவர் அதனை மறந்து விடுவார். ஆனால், நீங்கள் ஒவ்வொரு முறையும் அதைப் பற்றி நினைவூட்டினால், அவர் அதை மீண்டும் கவனத்தில் கொள்வார். 

> **இயற்கையாக நினைவாற்றல் இல்லாத மென்பொருட்களில், முந்தைய உரையாடலை செயற்கையாக சேர்த்து வழங்க வேண்டும்.**

#### **LLM-களின் பயன்பாடுகள்:**

 

**Chatbots உருவாக்கல்** – வாடிக்கையாளர்களுடன் உரையாட மென்பொருள்களை அமைத்தல்,
**மனித மொழியை Data Query-களாக மாற்றுதல்** – Data retrieval-க்கு மென்பொருள்களை பயன்படுத்துதல்,
**புதிய கட்டுரைகள், தகவல்கள் உருவாக்குதல்** – Automatic content generation,
**Text Summarization** – நீளமான உரையை சுருக்கமாக மாற்றுதல் 

> **உதாரணம்:** ஒரு வாடிக்கையாளர் ஒரு chatbot-ஐ கேட்டால்: “இன்று 100 ரூபாய்க்குள் என்ன உணவு கிடைக்கும்?” மென்பொருள் **உணவுப்பட்டியலை பார்க்கும், கணக்கிடும், பதிலளிக்கும்.**

