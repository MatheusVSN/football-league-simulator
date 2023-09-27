# FOOTBALL LEAGUE SIMULATOR
This is a project where you can create your own football universe and watch its story! You can follow over 10 South American countries, each with 2 divisions. Perhaps you can even see a bottom division 2 team eventually becoming one of the best 👀

## Features
- Creating your own universe with a unique campaign
- Rating modes
    - Fixed: Teams will not suffer any overall rating changes after the end of a season
    - Semi-random: Teams can suffer a overall rating change, but will have a fixed value where it cannot be lower or higher than  
    - Random: Teams can suffer a overall rating change without any limitations
- 10 south american countries to follow, each of them having 2 divisions


### Environment variables
| Variable | Description |
| -------- | ----------- |
| `DATABASE_URL` | MongoDB database URL string |
| `NEXTAUTH_SECRET` | Authentication secret |

Use the `.env.example` file as a template for your own `.env` file.	

## Getting started
Make sure you have [Node.js](https://nodejs.org/en/) installed on your machine, then clone this repository and run the following commands:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies used
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
