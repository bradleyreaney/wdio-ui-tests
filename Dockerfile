FROM ianwalter/puppeteer:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG CHROME_VERSION="97.0.4692.99-1"

RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && apt install -y /tmp/chrome.deb \
  && rm /tmp/chrome.deb

CMD npx wdio