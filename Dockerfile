# Задаем базовый образ
FROM node:16-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем исходный код в контейнер
COPY ./jest.config.ts .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./restart.json .
COPY ./src ./src/.
COPY ./tsconfig.build.json .
COPY ./tsconfig.json .
COPY ./.eslintignore .
COPY ./.eslintrc.json .
COPY ./.prettierignore .
COPY ./.prettierrc .

# Устанавливаем зависимости (если есть)
RUN npm install

RUN npm run build

# Задаем команду, которая будет запускаться при старте контейнера
CMD ["node", "build/index.js"]
