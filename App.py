import requests

URL = "file:///Users/airy/Desktop/ConradTFv3/handpose/src/App.html"
page = requests.get(URL)

print(page.text)