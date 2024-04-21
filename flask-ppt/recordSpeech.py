import speech_recognition as sr
from flask import Flask
from scoreSpeech import scoreSpeech

# Initialize recognizer class (for recognizing the speech)
r = sr.Recognizer()

app = Flask(__name__)

@app.route('/get-speech-scores', methods=['GET'])
def audio_to_text(audio_file_path):
    with sr.AudioFile(audio_file_path) as source:
        audio_text = r.record(source)
    
    # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
    
    try:
        # using google speech recognition
        text = r.recognize_google(audio_text)
        print('Converting audio transcripts into text ...')
        return text

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
        return None

    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return None
    
# Path to your audio file
audio_file = "path_to_your_audio_file.wav"

# Call the function with the path to your audio file
result_text = audio_to_text(audio_file)

scores = []
scores.append([(scoreSpeech(result_text, "correctness")), (scoreSpeech(result_text, "depth of topics")), (scoreSpeech(result_text, "grammar"))])


