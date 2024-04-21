import os
import openai
openai.api_key = #Enter key

def get_user_prompt():
    return input("Say a fact: ")

def get_type():
    return input("Enter a type: ")

def scoreText(textSegment, scoreType):
    tokenCount = 1
    gradeCompletion = openai.chat.completions.create(
        model = "gpt-3.5-turbo-0125",
        messages = [
            {"role": "user", "content": "Give a number between 1 and 10 grading the " + scoreType + " of the following statement: " + textSegment}
        ],
        max_tokens=tokenCount,
        n = 1,
        stop = None,
        temperature = 0.7,
    )
    tokenCount = 110 - (10*(int(gradeCompletion.choices[0].message.content)+1))
    adviceCompletion = openai.chat.completions.create(
        model = "gpt-3.5-turbo-0125",
        messages = [
            {"role": "user", "content": "Provide an explanation less than " + str(tokenCount) + " words on how " + scoreType + " the following statement is or how to improve it: " + textSegment}
        ],
        max_tokens=tokenCount,
        n = 1,
        stop = None,
        temperature = 0.7,
    )
    return([gradeCompletion.choices[0].message.content, adviceCompletion.choices[0].message.content])

def main():
    print("'exit' to quit.")

    while True:
        scoreType = get_type()
        textSegment = get_user_prompt()
        if textSegment.lower() == "exit":
            print("Program terminated.")
            break
        
        response = scoreText(textSegment, scoreType)
        print("ChatGPT Grade of " + scoreType + ": " + response[0])
        print("ChatGPT Advice of " + scoreType + ": " + response[1])

if __name__ == "__main__":
    main()
