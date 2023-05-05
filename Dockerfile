FROM node:18

# Copy code
RUN mkdir /app
WORKDIR /app
COPY . /app

# Config Github access
COPY id_github /root/.ssh/id_rsa
RUN mkdir -p /root/.ssh
RUN chmod 700 /root/.ssh/id_rsa
RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config

# Install the requirements
RUN yarn install --frozen-lockfile

# Start the app
CMD NODE_ENV=production PORT=8080 yarn start

EXPOSE 8080
