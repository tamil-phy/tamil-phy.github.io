# அகர முதலே Python :  பகுதி 1 - பைதானில்  எண்கள் (Numeric Data Types) 

எண்கள் இல்லாமல் வாழ்க்கையை கற்பனை செய்துபார்த்துள்ளீர்களா? நம் அன்றாட வாழ்வின் ஒவ்வொரு அம்சமும் எண்களைச் சுற்றியே வருகிறது.  

"தினமும் காலை 6 கிலோ மீட்டர் மற்றும் மாலை 6 கிலோ மீட்டர் நடைபயிற்சி செய்வது நல்லதா?"  
"இந்த மாதம் எத்தனை ரூபாய் சேமித்தேன்?"  
"ஒரு நிமிடத்தில் 10 மெசேஜ்கள் வந்துவிட்டன!"  

இவை அனைத்தும் எண்களின் மொழியில் பேசுகின்றன. கணிதம் படிக்கும் முதல் நாளிலிருந்து, எண்கள் நம் வாழ்வின் அடிப்படைக் கட்டமைப்பாகவே இருக்கின்றன. ஒரு சாதாரண கால்குலேட்டரில் தொடங்கி, அணு ஆராய்ச்சி வரை - எல்லாமே எண்களின் ஆதாரத்தில் தான் நிற்கின்றன.  

 அதேபோல், Programming-இல் கூட, **எண்கள் என்பது ஒரு அடிப்படை “building block”**. நீங்கள் எப்படி வீட்டுக்கு ஒரு foundation தேவைப்படுகிறதோ, அப்படியே ஒரு software-க்கும் எண்களின் மேலான புரிதல் தேவைப்படுகிறது.

நீங்கள் ஒரு **billing system** உருவாக்குகிறீர்கள் என்று எடுத்துக்கொள்ளுங்கள். அதில் கணக்கீடுகள், GST, rounding, discounts எல்லாம் number-ஐ வைத்து தான் நடக்கிறது. இல்லையென்றால், ஒரு simple **calculator app**-ஐ Python-ல் எழுதுகிறீர்கள். அதை decimal, integer, percentage எல்லாம் தெரியாமல் எப்படி வடிவமைக்க முடியும்? அல்லது, நீங்கள் ஒரு ஆராய்ச்சியாளர் ஆக இருந்தால் ஒரு **physics simulation** அல்லது **machine learning model** train பண்ணப்போகிறீர்கள் என்றால் உங்கள் வெற்றி சார்ந்துள்ளது **floating-point precision**, **data type conversion**, **modular arithmetic** போன்ற concepts-ஐ நீங்கள் எவ்வளவு தெளிவாக புரிந்துகொள்கிறீர்கள் என்பதிலேயே இருக்கும்.

### ஆனால் ஒரு சிக்கல் என்ன தெரியுமா?

நம்மில் பலர் Programming-ஐ கற்றுக்கொள்வதற்கு முன்பு, “எண்கள் என்றால் என்ன பெரிய விஷயம்?” என நினைக்கிறோம். ஆனால் Python போன்ற மொழிகளில், **ஒவ்வொரு எண்ணுக்கும் ஒரு வகை** (data type) உண்டு. இவையெல்லாம் பொதுவாக int, float, complex என்ற மூன்று வகைகளாகப் பிரிக்கப்படுகின்றன. ஒவ்வொன்றும் தனித்தன்மை வாய்ந்தது. நீங்கள் யாராக இருந்தாலும்—

- ஒரு student,

- ஒரு self-learner,

- ஒரு future data scientist,

  இந்த மூன்று வகைகளும் உங்கள் Python பயணத்தில் இது உங்கள் கூடவே வரும். ஒரு programmer நல்ல problem solver ஆகவேண்டும் என்றால், நல்ல அடித்தளப் புரிதல் (foundation) அவசியம். இந்த பகுதியில் நாம் அந்த Foundation-ஐ தான் கற்கப்போகிறோம். 

## **1. int – முழு எண்கள் (Whole Numbers)**

int என்றாலே நமக்கு பொதுவாக புரியும் 1, 2, -10, 0, 2000 போன்ற முழு எண்கள். அதாவது புள்ளி எதுவும் இல்லாத எண்கள். அதைப்போல, Python ஒரு வயதை, ஒரு வருடத்தை, ஒரு பொருளின் எண்ணிக்கையை int வகையைக் கொண்டு represent செய்யும்.

```
age = 32
temperature = -5
population = 1400000000
```

இந்த code-ல் நம்முடைய வயதையும் (positive integer), வெப்பநிலையும் (negative integer), இந்தியாவின் மக்கள் தொகையையும் (ஒரு பெரிய integer) Python store செய்கிறது.

பைதானில்  int வகையில் **வரம்பில்லா** (unbounded) எண்களை சேமிக்க முடியும்.  அதாவது பைதானில்  integer-க்கு **எந்த limit-யும் இல்ல**. இதை பார்த்தால் வியக்கும்:

```
print(999**999)
```

இந்த expression literally ஒரு *monster number* produce பண்ணும். ஒரு traditional programming language-ல் இதை செய்ய முயற்சித்தால் overflow error வரும். பைதானில்  மட்டும் memory இருக்கிற வரைக்கும் int expand ஆகும்!

### **Python-இன் இரகசியங்கள்**

நம்முடைய எண்ணிக்கை முறை — அதாவது **1, 2, 3…9, 10, 11…** — எல்லாம் **decimal system**, அல்லது **base-10** என்றே அடிப்படையாகக் கொண்டு அமைகின்றன. ஏன் 10? நம்மிடம் 10 விரல்கள் இருப்பதாலா?  அதற்காகவா decimal system? ஆமாம், சிலரின் கூற்றுப்படி, **மனிதர்கள் decimal system-ஐ history-யிலேயே ஏற்றுக்கொண்டது “counting fingers” மூலமாக**தான்.

ஆனால் computers அப்படியில்லை. நாம் எப்படி மனிதர்கள் என்றால் decimal system-ஐ default-ஆ நினைக்கிறோமோ, computers-க்கு அது **binary system (base-2)** தான். Computer என்பது hardware + electricity + logic gates. இதில் ஓர் அளவில் எல்லாமே “**ON or OFF**”, “**1 or 0**” என்ற binary language-ஆகவே இயங்குகிறது.

இதில் 10 digits இல்ல. **இரண்டு மட்டுமே: 0 மற்றும் 1.**

அதனால்தான்:

- Computer-க்கு நேரடி decimal (10) புரிவதில்லை.
- Binary (2), Octal (8), Hexadecimal (16) ஆகிய மாறான base-களில் convert பண்ணி தான் உபயோகிக்க வேண்டும்.

Python இவை எல்லாவற்றையும் Built-in-ஆ support செய்கிறது! நாம் Python-இல் எந்த base-ல் integer represent செய்ய வேண்டும் என்று சொல்ல Python-க்கு “**prefix**” மூலம் தெரிவிக்கலாம்.

| **Format**      | **Prefix** | **Example** | **Output** |
| --------------- | ---------- | ----------- | ---------- |
| Binary (base 2) | 0b         | 0b1010      | 10         |
| Octal (base 8)  | 0o         | 0o12        | 10         |
| Hex (base 16)   | 0x         | 0xA         | 10         |

```
print(0b1010)   # Binary: 1010 = 10
print(0o12)     # Octal:  1*8 + 2 = 10
print(0xA)      # Hex:    A = 10 in decimal
```

நீங்கள் ஒரு beginner-ஆ இருந்தால் இதைப் பார்த்து, “நமக்கு ஏன் இதெல்லாம்?” என்று தோன்றலாம். ஆனால்:

- **Binary**: Bit-level programming, memory layout, permissions
- **Octal**: Unix permissions (chmod 755 = rwxr-xr-x)
- **Hexadecimal**: Color codes in HTML (#FF5733), memory addresses, error codes, machine instructions

இதோ ஒரு கற்பனை:

நீங்கள் ஒரு embedded systems engineer ஆக வேலை பார்க்கிறீர்கள். ஒரு sensor microchip உங்களுக்கு ஒரு 8-bit value அனுப்புகிறது: 0x3F. அதனை read செய்ய, mask செய்ய, slice செய்ய—all these operations **hex**-இல் தான் புரிய வைக்கும்.

### **Hexadecimal கொஞ்சம் cool-ஆ இருக்கும்தான்:**

Hex (base 16) என்பது:

- 0–9 வரைக்கும் usual digits
- 10–15 = A, B, C, D, E, F

அதாவது:

```
print(0xF)   # 15
print(0x1F)  # 31  → (1×16) + (15×1)
```

இதை ஒவ்வொரு நேரமும் நேரில் பயன்படுத்த மாட்டீங்க. ஆனால்

- ஒரு நாள் low-level debugging செய்யும் போது,
- உங்கள் system-ல் memory leak வரும்போது,
- அல்லது browser-இல் color customization செய்யும்போது

இந்த base system-கள் உங்கள் வாழ்க்கையை எளிதாக்கும். Python இதை நீங்களே கையாள தெரிந்து கொள்ளும்படி design பண்ணிருக்கிறது.

## **2. float – தசம எண்கள் (Numbers with Decimal Points)**

நம்முடைய வாழ்க்கையில் **decimal values** இல்லாமலே ஒரு நாளும் செல்ல முடியாது.

**“ஒரு பவுன் இன்று எவ்வளவு?”**, **“வெப்பநிலை இன்று 36.6°C இருக்கு”**, **“பெட்ரோல் ₹103 ஆகிவிட்டது!”** — decimal இல்லாமல் இவை அனைத்தும் அரைச்சொல்லா போலத் தோன்றும். இது போல decimal எண்கள் நம்முடைய நாள் தோறும் உரையாடல்களில் அடிக்கடி வந்துகொண்டே இருக்கின்றன.

பைதானில்  decimal numbers-ஐ float type-ல் represent செய்கின்றோம்:

```
height = 5.8
weight = 72.3
pi = 3.14159
```

இவை எல்லாம் float, அதாவது *floating-point numbers*. இதில் ஒரு சிக்கல் உள்ளது 

```
print(0.1 + 0.2)
```

Output:

```
0.30000000000000004
```

ஏன் இப்படியொரு திடுக்கிடும் ஒரு விடையை தருகிறது?

பைதானில்  float என்பது computer hardware-இன் **binary floating-point**-ஐ அடிப்படையாக கொண்டு உள்ளது. இதில் சில values (போல் 0.1, 0.2) **சரியாக represent ஆக முடியாது**. அது தான் rounding errors ஏற்படவும் காரணம்.

தீர்வு decimal: module 

நாள் தோறும் decimal எண்கள் உபயோகிக்கப்படுகிறது — பொருளாதாரம், வெப்பநிலை, எடை, விலை ஆகிய அனைத்திலும். ஆனால் நீங்கள் ஒரு **accountant**, **app developer** அல்லது **scientist** என்றால், decimal-ஐ அதிகக் கண்டிப்புடன், மிகச் சரியாக கணக்கிட வேண்டி வரும். அதற்காக Python-ல் ஒரு சிறப்பான சாதனம் இருக்கிறது: decimal module.

```
from decimal import Decimal

print(Decimal('0.1') + Decimal('0.2'))  # Output: 0.3
```

float-ல வரும் சிறிய தவறுகளைத் தவிர்க்க, இந்த Decimal Module மிகவும் பயனுள்ளதாக இருக்கும்.

## 3. complex – கலப்பு எண்கள் (Real + Imaginary Numbers)

எண்கள்” என்றால் என்ன நினைப்போம்? 

₹10, -5, 0, 3.14, 100 — இவை எல்லாம் நமக்கு தெரிந்த மிகவும் சாதாரணமான எண்கள். இவைகளை எல்லாம் **real numbers** என்பார்கள். ஆனால் சில நேரங்களில், குறிப்பாக Physics-ல் electric circuits, waves, அல்லது quantum mechanics போன்ற விஷயங்களைப் படித்திருந்தால், imaginary number (i) பற்றி கேட்டிருப்பீர்கள். சில கணக்குகளில் “negative-லிருந்து square root எடுப்பது” போன்று கேள்விகள் வரும். இதை தீர்க்க imaginary numbers தேவைப்படும்.

**உதாரணம்:**

x * x = -1 என்று ஒரு சமீப காலத்தில் உங்களுக்குத் தேவைப்பட்டால், எதை square செய்த்தாலும் negative வரவே மாட்டேங்குதா? அதுக்கு தான் கணிதத்தில் ஒரு புதிய வகை எண் கண்டுபிடிக்கப்பட்டது:

**imaginary number** என்று சொல்வார்கள், அதாவது i = √-1.

பைதானில்  imaginary numbers-ஐ j என்று எழுதுகிறோம்.

```
z = 3 + 4j
```

இதில்:

- 3 → real part
- 4j → imaginary part

 நீங்கள் இப்படிப் ஒரு number கொடுத்தால்:

```
print(z.real)  # 3.0
print(z.imag)  # 4.0
```

Python இதில் expert. அதை நேரடியாகப் பிரித்து analysis பண்ண முடியும். வேறு மொழிகளில் இதற்கு பெரிய setup தேவைப்படும். இது ஒரு complex number. இதில் **real part = 3**, **imaginary part = 4**. Python இதையெல்லாம் அப்படியே native-ஆ handle பண்ணும்.

C, Java போன்ற மொழிகளில் இதற்கு external libraries தேவைப்படும். Python உங்களுக்காக அதை சுலபமாகத்தான் வைத்திருக்கிறது.

#### பொதுவான கணக்கீடுகள் (Common Numeric Operations)

| **செயல்**          | **எடுத்துக்காட்டு** | **விளக்கம்**                |
| ----------------- | ---------------- | ------------------------- |
| கூட்டல் +           | 5 + 2.0          | 7.0 (float + int → float) |
| வகுத்தல் /          | 7 / 2            | 3.5                       |
| Floor Division // | 7 // 2           | 3                         |
| Modulus %         | 7 % 2            | 1 (மீதம்)                   |
| Power **          | 2 ** 3           | 8                         |

```
print(type(5 + 2.0))  # <class 'float'>
```

இந்த example-ஐ நீங்க miss பண்ணக்கூடாது — பைதானில்  operation செய்த பிறகு result-ஐ **பெரிய data type**-ஆ convert பண்ணும்.

## **Data Type Conversion – மாறுவது நம் தன்மை!**

```
int("42")       # string to int
float("3.14")   # string to float
str(99)         # int to string
```

**Input எப்போதும் string** ஆக வரும். நாம்தான் அதை appropriate type-ஆ convert பண்ணணும்.

ஆனால் கீழே பாருங்க:

```
int("3.5")  # ❌ Error: cannot convert float string to int directly
```



int("3.5") பண்ணும்போது **Python error கொடுக்கும்**, ஏனெனில் "3.5" என்பது **float format-ல உள்ள string**. அதை **direct-ஆ integer-ஆக convert** பண்ண முடியாது. 

சரியான வழி

```
int(float("3.5"))  # ✅ Output: 3
```

- Pythonல int() கண்டிப்பா இருக்கு — அது "3" மாதிரி pure integer string-ஐ மட்டும் convert பண்ணும்.

- "3.5" மாதிரி decimal இருக்கும்போது, float() மூலமாக convert பண்ணி, பிறகு int() பண்ணவேண்டும்.

  (இது .5 portion-ஐ truncate பண்ணி integer-ஆக் மாற்றும்.)

அடுத்த பகுதியில், நம்முடைய கற்றலை Number Guessing Game ஒன்றின் மூலம் validate பண்ணுவோம்:



