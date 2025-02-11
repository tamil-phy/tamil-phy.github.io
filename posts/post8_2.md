# இயல் மொழி தெளிதல் பாகம் 2: எளிய சாட்பாட்(Chatbot) உருவாக்குதல்  
இந்த பயிற்சியில், Python-ஐப் பயன்படுத்தி ஒரு எளிய சாட்பாட்டை உருவாக்குவோம். இந்த சாட்பாட் பயனரின் உரையைப் புரிந்து கொண்டு, பொருத்தமான பதில்களை வழங்கும். இது **Rule-Based Chatbot** என்று அழைக்கப்படுகிறது, ஏனெனில் இது முன்-வரையறுக்கப்பட்ட விதிகளைப் பயன்படுத்தி பதில்களை வழங்குகிறது.  

---

## 1. சாட்பாட் என்றால் என்ன?  
சாட்பாட் என்பது ஒரு மென்பொருள் பயன்பாடு ஆகும், இது மனிதர்களுடன் உரையாடுவதற்காக வடிவமைக்கப்பட்டுள்ளது. இது பயனரின் உரையைப் புரிந்து கொண்டு, பொருத்தமான பதில்களை வழங்குகிறது. சாட்பாட்கள் பொதுவாக **Rule-Based** அல்லது **AI-Based** (Machine Learning/Deep Learning) ஆக இருக்கலாம்.  

**Rule-Based சாட்பாட்கள்** என்பவை முன்னரே வரையறுக்கப்பட்ட விதிகள் மற்றும் வடிவங்களின் அடிப்படையில் செயல்படுகின்றன. இவை எளிய மற்றும் குறிப்பிட்ட பணிகளுக்கு ஏற்றவையாக உள்ளன, ஆனால் சிக்கலான அல்லது மாறுபட்ட உரையாடல்களில் திறன்பெறுவது கடினம்.  

**AI-Based சாட்பாட்கள்** என்பவை இயற்கை மொழி செயலாக்கம் (NLP - Natural Language Processing), இயந்திரக் கற்றல் (Machine Learning), மற்றும் ஆழ்ந்த கற்றல் (Deep Learning) போன்ற முறைகளைப் பயன்படுத்தி உரையைப் புரிந்து கொண்டு, மனிதர்களைப் போன்று பதிலளிக்கும் திறனைக் கொண்டுள்ளன. இவை மிகவும் மேம்பட்டவை மற்றும் சிக்கலான உரையாடல்களைக் கையாளும் திறன் கொண்டவை.  

சாட்பாட்கள் பல்வேறு துறைகளில் பயன்படுத்தப்படுகின்றன, உதாரணமாக, வாடிக்கையாளர் சேவை, உதவி மையங்கள், மருத்துவ ஆலோசனை, கல்வி, மற்றும் தனிப்பயனாக்கப்பட்ட பரிந்துரைகள் போன்றவை. இவை மனிதர்களின் பணியை எளிதாக்கவும், நேரத்தை மிச்சப்படுத்தவும், மற்றும் பயனர் அனுபவத்தை மேம்படுத்தவும் உதவுகின்றன.  

மேலும், சாட்பாட்கள் தொடர்ந்து மேம்படுத்தப்பட்டு வருகின்றன, மேலும் அவை மனிதர்களுடன் மிகவும் இயல்பான மற்றும் புரிந்துணரும் வகையில் உரையாடும் திறனைப் பெறுவதற்காக தொடர்ந்து மேம்படுத்தப்படுகின்றன.

**இந்த பயிற்சியில், நாம் Rule-Based Chatbot-ஐ உருவாக்குவோம்.**  

## 2. தேவையான நூலகங்களை நிறுவுதல்  
நாம் `nltk` (Natural Language Toolkit) நூலகத்தைப் பயன்படுத்துவோம். இது NLP பணிகளுக்கு பயனுள்ளதாக இருக்கும்.  

```bash
pip install nltk
```

---

## 3. Import Libraries  
```python
import nltk
from nltk.chat.util import Chat, reflections
```

---

## 4. விதிகளை வரையறுத்தல்  
Rule-Based Chatbot-இல், நாம் பயனரின் உரையைப் பொறுத்து பதில்களை வழங்கும் விதிகளை வரையறுக்க வேண்டும். இந்த விதிகள் **Regular Expressions (Regex)** மூலம் உரையைப் பொருத்தி, பொருத்தமான பதில்களைத் தேர்ந்தெடுக்கும்.  

```python
pairs = [
    [
        r"hi|hello|hey",
        ["Hello! How can I help you?", "Hi there! What can I do for you?"]
    ],
    [
        r"how are you",
        ["I'm good, thank you! How about you?", "I'm doing well. How can I assist you?"]
    ],
    [
        r"what is your name",
        ["I'm a simple chatbot. You can call me ChatBot!", "I don't have a name, but you can call me ChatBot."]
    ],
    [
        r"bye|goodbye",
        ["Goodbye! Have a great day!", "Bye! Take care!"]
    ],
    [
        r"thank you|thanks",
        ["You're welcome!", "No problem!"]
    ],
    [
        r"(.*) your name (.*)",
        ["I'm just a chatbot. I don't have a name!", "You can call me ChatBot."]
    ],
    [
        r"(.*) help (.*)",
        ["Sure, I can help you. What do you need?", "How can I assist you?"]
    ],
    [
        r"(.*) (age|old) (.*)",
        ["I'm just a program, so I don't have an age!", "I'm ageless!"]
    ],
    [
        r"i am good|i'm good",
        ["That's great to hear!", "Good to know you're doing well!"]
    ],
    [
        r"(.*)",  # Fallback rule
        ["I'm not sure how to respond to that.", "Can you please rephrase?"]
    ]
]

```

---

## 5. சாட்பாட்டை உருவாக்குதல்  
###  இப்போது, நாம் வரையறுத்த விதிகளைப் பயன்படுத்தி சாட்பாட்டை உருவாக்கலாம்.  

```python
# சாட்பாட்டை உருவாக்குதல்
chatbot = Chat(pairs, reflections)

# சாட்பாட்டை இயக்குதல்
def start_chat():
    print("Hello! I'm a simple chatbot. Type 'quit' to exit.")
    while True:
        user_input = input("You: ")  # பயனரின் உரை
        if user_input.lower() == "quit":
            print("ChatBot: Goodbye!")
            break
        response = chatbot.respond(user_input)  # சாட்பாட்டின் பதில்
        print("ChatBot:", response)


```

---

## 6. சாட்பாட்டை இயக்குதல்  
```python
# சாட்பாட்டைத் தொடங்குதல்
start_chat()
```

இந்த குறியீட்டை இயக்கினால், சாட்பாட் பயனருடன் உரையாடத் தொடங்கும்.  

**உரையாடல் எடுத்துக்காட்டு:**  

```
You: Hi  
ChatBot: Hello! How can I help you?  

You: What is your name?  
ChatBot: I'm a simple chatbot. You can call me ChatBot!  

You: How are you?  
ChatBot: I'm good, thank you! How about you?  

You: Bye  
ChatBot: Goodbye! Have a great day!  
```

இந்த சாட்பாட் **Rule-Based** ஆக இருப்பதால், இதற்கு சில வரம்புகள் உள்ளன.

இந்த சாட்பாட் முன்-வரையறுக்கப்பட்ட விதிகளை மட்டுமே புரிந்து கொள்ளும். புதிய உரைகளைப் புரிந்து கொள்ள இயலாது.  இது உரையின் சூழலைப் புரிந்து கொள்ளாது. எடுத்துக்காட்டாக, "How old are you?" மற்றும் "What is your age?" இரண்டும் ஒரே கேள்வியாக இருந்தாலும், இது இரண்டிற்கும் தனித்தனியாக விதிகளை வரையறுக்க வேண்டும்.  

இந்த சாட்பாட் உணர்ச்சிகளைப் புரிந்து கொள்ளாது. எடுத்துக்காட்டாக, "I'm feeling sad" என்ற உரைக்கு பொருத்தமான பதிலை வழங்க இயலாது.  சாட்பாட்க்கு  புதிய தரவுகளைக் கற்றுக்கொள்ளும் திறன் இல்லை. இது முன்-வரையறுக்கப்பட்ட விதிகளை மட்டுமே பின்பற்றும்.   

