## இயல் மொழி தெளிதல் - Natural Language Processing (NLP)  

NLP என்பது கணினிகள் மனித மொழியைப் புரிந்து கொள்ளவும், செயல்படவும் உதவும் ஒரு தொழில்நுட்பம்.  மனித மொழி மிகவும் சிக்கலானது. இது வார்த்தைகள், இலக்கண விதிகள், மற்றும் சூழல் அடிப்படையிலான அர்த்தங்களைக் கொண்டுள்ளது. கணினிகள் இந்த மொழியைப் புரிந்து கொள்ள, பல  படிநிலைகளைப் பயன்படுத்துகின்றன:  

NLP-இன் வளர்ச்சி பல தசாப்தங்களாக நீண்டு வந்துள்ளது. மொழியியல் விதிகளை (Rule-Based Systems 1950s - 1980s) அடிப்படையாகக் கொண்டு, கணினிகள் உரையைப் புரிந்து கொள்ள முயற்சித்தன. உதாரணமாக,  ELIZA (1966) முதல் சாட்பாட்.   புள்ளியியல் முறைகள் (Statistical NLP 1990s - 2000s) மூலம், கணினிகள் உரையைப் பகுப்பாய்வு செய்யத் தொடங்கின. Hidden Markov Models (HMMs), Machine Translation.  Machine Learning (2010s) அல்காரிதம்கள் (எ.கா., SVM, Random Forest) NLP பணிகளுக்குப் பயன்படுத்தப்பட்டன.  எடுத்துக்காட்டாக Sentiment Analysis, Text Classification. Deep Learning மற்றும் Transformer (2017 - தற்போது) மாதிரிகள் (எ.கா., BERT, GPT) NLP-இல் புரட்சியை ஏற்படுத்தியுள்ளன.  இந்த கட்டுரையில், NLP-இன் முக்கிய கருத்துக்களைப் பற்றி மிகவும் விரிவாகப் பார்ப்போம் மற்றும் Python-ஐப் பயன்படுத்தி ஒவ்வொரு கருத்தையும் நடைமுறையில் செய்து பார்ப்போம். 

## 1. Tokenization   
Tokenization என்பது உரையை சிறிய பகுதிகளாக (வார்த்தைகள், வாக்கியங்கள், அல்லது எழுத்துகள்) பிரிக்கும் செயல்முறை. இது NLP-இன் முதல் படியாகும். Tokenization உரையை கணினிகள் புரிந்து கொள்ளும் வகையில் எளிதாக்குகிறது.  

1. **Word Tokenization:** உரையை வார்த்தைகளாக பிரிக்கிறது.  
   - உரை: "I love NLP."  
   - Tokenization: ["I", "love", "NLP", "."]  

2. **Sentence Tokenization:** உரையை வாக்கியங்களாக பிரிக்கிறது.  
   - உரை: "Hello! How are you? I hope you are doing well."  
   - Tokenization: ["Hello!", "How are you?", "I hope you are doing well."]  

உரையை சிறிய பகுதிகளாக பிரிப்பது, கணினிகள் உரையை பகுப்பாய்வு செய்ய உதவுகிறது. இது உரை தரவுகளை எளிதாக்குகிறது மற்றும் பிற NLP பணிகளுக்கு அடிப்படையாகும்.   

```python
from nltk.tokenize import word_tokenize, sent_tokenize

# உரை (Text)
text = "Hello! How are you? I hope you are doing well."

# வார்த்தைகளாக துண்டாக்கம் (Word Tokenization)
words = word_tokenize(text)
print("Words:", words)

# வாக்கியங்களாக துண்டாக்கம் (Sentence Tokenization)
sentences = sent_tokenize(text)
print("Sentences:", sentences)
```

**Output:**  
```
Words: ['Hello', '!', 'How', 'are', 'you', '?', 'I', 'hope', 'you', 'are', 'doing', 'well', '.']
Sentences: ['Hello!', 'How are you?', 'I hope you are doing well.']
```

---

## 2. Stop Words Removal
Stop Words என்பது மொழியில் அடிக்கடி வரும் ஆனால் முக்கியமில்லாத சொற்கள். எடுத்துக்காட்டாக, "the", "is", "in", "and" போன்றவை. இவை உரையின் பொருளை பாதிக்காது, ஆனால் NLP மாதிரிகளின் செயல்திறனை குறைக்கும்.  

**எடுத்துக்காட்டு:**  
- உரை: "This is a simple example."  
- Stop Words Removal: ["This", "simple", "example", "."]  

தரவு செயலாக்கத்தை வேகமாக்குகிறது. மாதிரிகளின் துல்லியத்தை மேம்படுத்துகிறது.  

```python
from nltk.corpus import stopwords

# உரை (Text)
text = "This is a simple example of removing stop words."

# Stop words-ஐப் பெறுதல்
stop_words = set(stopwords.words('english'))

# Tokenization
words = word_tokenize(text)

# Stop words-ஐ நீக்குதல்
filtered_words = [word for word in words if word.lower() not in stop_words]
print("Filtered Words:", filtered_words)
```

**Output:**  
```
Filtered Words: ['This', 'simple', 'example', 'removing', 'stop', 'words', '.']
```

---

## 3. Stemming (வேர்ச்சொல் பிரித்தல்)  
Stemming என்பது வார்த்தையின் மூல வடிவத்தைப் பிரிக்கும் செயல்முறை. இது சொல்லின் பொருளை மாற்றாமல், அதன் அடிப்படை வடிவத்தைக் கொடுக்கும்.  

**எடுத்துக்காட்டு:**  
- "running" -> "run"  
- "jumps" -> "jump"  

உரையில் உள்ள வார்த்தைகளை ஒரே மாதிரியாக மாற்றுகிறது. தரவு செயலாக்கத்தை எளிதாக்குகிறது.  

```python
from nltk.stem import PorterStemmer

# உரை (Text)
words = ["running", "jumps", "easily", "fairly"]

# Stemmer
stemmer = PorterStemmer()

# Stemming
stemmed_words = [stemmer.stem(word) for word in words]
print("Stemmed Words:", stemmed_words)
```

**Output:**  
```
Stemmed Words: ['run', 'jump', 'easili', 'fairli']
```

---

## 4. Lemmatization   
Lemmatization என்பது Stemming-ஐப் போலவே, ஆனால் சொல்லின் சரியான வடிவத்தைப் பிரிக்கும். இது சொல்லின் பொருளை மாற்றாமல், அதன் அகராதி வடிவத்தைக் கொடுக்கும்.  

**எடுத்துக்காட்டு:**  

- "running" -> "run"   

  Stemming-ஐ விட துல்லியமானது. சொல்லின் பொருளை பாதுகாக்கிறது.  

```python
from nltk.stem import WordNetLemmatizer

# உரை (Text)
words = ["running", "jumps", "easily", "better"]

# Lemmatizer
lemmatizer = WordNetLemmatizer()

# Lemmatization
lemmatized_words = [lemmatizer.lemmatize(word) for word in words]
print("Lemmatized Words:", lemmatized_words)
```

**Output:**  
```
Lemmatized Words: ['running', 'jump', 'easily', 'better']
```

---

## 5. Part-of-Speech Tagging   
POS Tagging என்பது வார்த்தைகளின் வகையை (பெயர்ச்சொல், வினைச்சொல், உரிச்சொல்) கண்டறியும் செயல்முறை.  

**எடுத்துக்காட்டு:**  
- "I love NLP."  
- POS Tags: [('I', 'PRP'), ('love', 'VBP'), ('NLP', 'NNP'), ('.', '.')]  

உரையின் கட்டமைப்பை புரிந்து கொள்ள உதவுகிறது.  பிற NLP பணிகளுக்கு பயனுள்ளது.   

```python
from nltk import pos_tag

# உரை (Text)
text = "I love learning NLP."

# Tokenization
words = word_tokenize(text)

# POS Tagging
pos_tags = pos_tag(words)
print("POS Tags:", pos_tags)
```

**Output:**  
```
POS Tags: [('I', 'PRP'), ('love', 'VBP'), ('learning', 'VBG'), ('NLP', 'NNP'), ('.', '.')]
```

---

## 6. Named Entity Recognition (NER) 
NER என்பது உரையில் உள்ள முக்கியமான பெயர்களை (நபர்கள், இடங்கள், நிறுவனங்கள்) அங்கீகரிக்கும் செயல்முறை.  

**எடுத்துக்காட்டு:**  
- உரை: "Apple is located in Cupertino."  
- NER: Apple (ORG), Cupertino (LOC)  

உரையில் உள்ள முக்கிய தகவல்களை பிரித்தெடுக்க உதவுகிறது. இது தரவு பகுப்பாய்வுக்கு பயனுள்ளது.  

```python
import spacy

# spaCy மாதிரியை ஏற்றுதல்
nlp = spacy.load("en_core_web_sm")

# உரை (Text)
text = "Apple is located in Cupertino."

# NER
doc = nlp(text)
for ent in doc.ents:
    print(ent.text, ent.label_)
```

**Output:**  
```
Apple ORG
Cupertino GPE
```

---

## 7. Sentiment Analysis 
Sentiment Analysis என்பது உரையில் உள்ள உணர்ச்சிகளைப் பகுப்பாய்வு செய்யும் செயல்முறை. இது பொதுவாக நேர்மறை, எதிர்மறை, அல்லது நடுநிலை என வகைப்படுத்தப்படுகிறது.  

**எடுத்துக்காட்டு:**  
- உரை: "I love this product!"  
- Sentiment: Positive  

### Why Use Sentiment Analysis?  
- வாடிக்கையாளர் கருத்துகளை பகுப்பாய்வு செய்ய உதவுகிறது.  
- சமூக ஊடக தரவுகளை புரிந்து கொள்ள உதவுகிறது.  

### Python Example  

```python
from textblob import TextBlob

# உரை (Text)
text = "I love this product!"

# Sentiment Analysis
blob = TextBlob(text)
sentiment = blob.sentiment
print("Sentiment:", sentiment)
```

**Output:**  

```
Sentiment: Sentiment(polarity=0.625, subjectivity=0.6)
```

அதாவது, **Polarity** என்பது உரையின் உணர்வை (Positive/Negative/Neutral) அளவிடும் ஒரு மதிப்பு ஆகும்.

Polarity மதிப்பு **-1 முதல் +1** வரை இருக்கும்.

**+1:** Highly Positive

**0**: Neutral

**-1:** Highly Negative

இங்கு, **Polarity = 0.625** என்பதால், இந்த உரை Positive உணர்வைக் காட்டுகிறது.

**Subjectivity** என்பது உரையில் உள்ள தனிப்பட்ட (Personal) கருத்துகள் மற்றும் உணர்வுகளின் அளவை காண்பிக்கும் ஒரு மதிப்பு ஆகும்.

Subjectivity மதிப்பு **0 முதல் 1** வரை இருக்கும்:

**0:** Completely Objective

**1:** Completely Subjective

இங்கு, **Subjectivity = 0.6** என்பதால், இந்த உரை Subjective கருத்துகளுடன் அதிகமாக இருக்கிறது. இது உரை எழுதுபவரின் தனிப்பட்ட சிந்தனை மற்றும் உணர்ச்சியை அதிகமாக பிரதிபலிக்கிறது.



Code: [Colab Notebook](https://colab.research.google.com/drive/1kjYcGSH0bqGhV7jPeZ5wx2oaXu4sCUQB?usp=sharing)