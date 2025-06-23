import google.generativeai as genai

# Configure your API key from Google AI Studio
genai.configure(api_key="AIzaSyApamKvjV26c4W-FuVKWgb04GvWbOLr5sA")  # Replace YOUR_API_KEY with actual key

# Instantiate Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

while True:
    # Use a sample prompt
    prompt = input("please write a text prompt: (for quit w : 'q')")
    if prompt == "q":
        break
    else:
        # Generate the response
        response = model.generate_content(prompt)
        # Print the result
        print(response.text)