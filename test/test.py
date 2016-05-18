print("Hello")
import urllib
import BeautifulSoup

url = raw_input("Enter URL: ")

html = urllib.urlopen(url).read()
soup = BeautifulSoup(html)

tags = soup('a')
for tag in tags:
    print tag.get('href', None)