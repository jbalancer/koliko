# koliko

👋 _Skinport and Payment APIs_

## Install

Before, you need to install: Redis, PostgreSQL. And run next command:

```shell
npm install
```

## Usage

Without watch mode:
```shell
npm start
```

Watch mode:
```shell
npm run dev
```

## Description

- ENV: `.env.example`
- App config: `src/shared/configs/global.config.ts`
- Swagger: `http://localhost:8000/docs`

> [!IMPORTANT]
> В таблице БД баланс имеет тип BIGINT, клиенту позволено отправлять сумму списания и в DOUBLE как есть, на бэке полученная сумма умножается на 100 (значение 100 можно изменить в объекте конфигурации) и дальнейшея работа проводится с целым числом. Сделано это для обеспечения безопасности и максимальной точности математических операций. Если в дальнейшем появится эндпоинт для получения баланса, то нужно будет делить значение на 100 перед отдачей.
