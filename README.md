# Stock Prediction Website

## LEGAL DISCLAIMER

This project is for education purpose only. This project and available API's is for personal use only. The data collected using [yfinance](https://pypi.org/project/yfinance/) is under Yahoo!'s terms and conditions.

## Links

website: [https://stock-predictor-react.netlify.app/](https://stock-predictor-react.netlify.app/)

API: [Endpoint](https://stock-prediction-flask.onrender.com/predict) [Documentation](https://github.com/vasup86/stock-prediction-api)

Website is hosted on netlify and backend is hosted on Render.

## Introduction

Personal project that enables users to get stock prediction data for the next 30 days. The project is based on Meta's [Prophet](https://facebook.github.io/prophet/) project. The project uses upto 5 year's worth of opening price data for a stock and predicts the opening price for the next 30 days. The website displays the price graph of last 6 month and the prediction. Users can graph multiple graphs and thier predictions.

## User Guide

### Home

User can enter stock ticker in the autocomplete input box. The autocomplete will suggest options based on input. Due to the [limitations](#Limitations) mentioned below, the users will still be able to enter manual inputs and will not be restricted to the available dropdown options.

### Graph

The graph will show the price for the last 6 months and the 30 day predicted price. Users will be able to search and graph multiple stocks on one graph and compare trends and prices.

## Installation Guide

- Clone the repository
- The master branch is the most stable branch at any given time, ensure you're working from it.
- Run `npm insstall` to install all dependencies
- Run `npm run dev` to start local server.

## Technologies Used

- Reactjs
- Redux
- Material UI
- Vite

## Limitations

The autocomplete only suggests stocks listed on `NASDAQ Global Select` and `New York Stock Exchange`, due to the limitation on Redux store memory. The full list of options cannot be used currently. The autocomplete will allow the user to enter stock tickers such as `AAPL` or `MSFT` manually.
