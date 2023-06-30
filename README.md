# Librom App

## Description
The Librom App is an immersive, interactive experience inspired by the game Soul Sacrifice. This application allows users to create their own text on by defining the content of the book, called "Librom," using a structured JSON file named `Book.json`.

## Setup
```
npm install
npm start
```

## Book.json Structure
The `Book.json` file is a crucial component of the Librom app. This file provides the content of the Librom, including the text that appears on each page and accompanying audio and artwork.

Here's the required structure for the `Book.json` file:

```json
{
    "pages": [
        {
            "texts": [
                {
                    "text": "string",
                    "sound": "string",
                    "order": "integer",
                    "from": "string",
                    "style": {
                        "gridColumn": "string",
                        "gridColumnStart": "string",
                        "gridRowStart": "string"
                    },
                    "coloredLetters": [
                        {
                            "from": "integer",
                            "to": "integer",
                            "color": "string"
                        }
                    ]
                }
            ],
            "arts": [
                {
                    "path": "string",
                    "sound": "string",
                    "order": "integer",
                    "style": {
                        "margin": "string",
                        "padding": "string",
                        "gridColumn": "string",
                        "gridColumnStart": "string",
                        "gridRowStart": "string"
                    }
                }
            ]
        }
    ]
}
```

## Key Descriptions

```json
{
    "pages": [
        {
            "texts": [
                {
                    "text": "The actual text content to be displayed.",
                    "sound": "A string representing the path to the audio file that accompanies the text.",
                    "order": "An integer defining the order in which the text will appear.",
                    "from": "A string indicating where the text should originate from on the page, either 'top' or 'bottom'.",
                    "style": {
                        "gridColumn": "A string indicating the grid column for the text placement.",
                        "gridColumnStart": "A string indicating where the text grid column should start.",
                        "gridRowStart": "A string indicating where the text grid row should start."
                    },
                    "coloredLetters": [
                        {
                            "from": "An integer defining the start of the text range to color.",
                            "to": "An integer defining the end of the text range to color.",
                            "color": "A string representing the color to be applied to the text range."
                        }
                    ]
                }
            ],
            "arts": [
                {
                    "path": "A string representing the path to the image file.",
                    "sound": "A string representing the path to the audio file that accompanies the artwork.",
                    "order": "An integer defining the order in which the artwork will appear.",
                    "style": {
                        "margin": "A string representing the CSS margin property for the artwork.",
                        "padding": "A string representing the CSS padding property for the artwork.",
                        "gridColumn": "A string indicating the grid column for the artwork placement.",
                        "gridColumnStart": "A string indicating where the artwork grid column should start.",
                        "gridRowStart": "A string indicating where the artwork grid row should start."
                    }
                }
            ]
        }
    ]
}
