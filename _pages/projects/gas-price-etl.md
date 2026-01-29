---
layout: project
title: "Gasoline Price ETL & Dashboard"
permalink: /projects/gas-price-etl/
summary: "An end-to-end ETL pipeline and interactive dashboard for tracking and analyzing gasoline price trends, helping businesses monitor fuel costs and make data-driven decisions."
tech:
  - Python
  - PostgreSQL
  - Apache Airflow
  - Tableau
  - Docker
---

## Overview

An end-to-end **ETL pipeline** and interactive **dashboard** for tracking and analyzing gasoline price trends. This project helps small businesses monitor fuel costs and make data-driven decisions.

## Dataset

- **Source**: EIA (U.S. Energy Information Administration) API
- **Frequency**: Weekly updates
- **Coverage**: National and regional gasoline prices

## Architecture

### Extract
- Pull data from EIA REST API
- Handle pagination and rate limits

### Transform
- Clean and normalize price data
- Calculate rolling averages and trends
- Aggregate by region and fuel type

### Load
- Store in PostgreSQL database
- Maintain historical records

### Visualize
- Tableau dashboard for real-time monitoring
- Trend analysis and forecasting views

## Key Features

- Automated daily data refresh
- Historical price comparison
- Regional price differential analysis
- Price forecasting using time-series models
