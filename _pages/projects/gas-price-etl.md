---
layout: project
title: "Gasoline Price ETL & Dashboard"
permalink: /projects/gas-price-etl/
summary: "End-to-end ETL pipeline and interactive dashboard for tracking gasoline price trends, helping businesses monitor fuel costs."
tech:
  - Python
  - PostgreSQL
  - Apache Airflow
  - Tableau
---

## Overview

An automated data pipeline that extracts gasoline price data from the U.S. Energy Information Administration API, transforms it for analysis, and loads it into a PostgreSQL database. The data powers an interactive Tableau dashboard for monitoring fuel cost trends.

## Architecture

**Extract** — Pull weekly data from EIA REST API with pagination and rate limit handling.

**Transform** — Clean and normalize prices, calculate rolling averages, aggregate by region and fuel type.

**Load** — Store in PostgreSQL with historical records for trend analysis.

**Visualize** — Tableau dashboard with real-time monitoring and forecasting views.

## Features

- Automated weekly data refresh via Apache Airflow
- Historical price comparison across regions
- Regional price differential analysis
- Time-series forecasting for price predictions

## Outcome

The dashboard helps businesses track fuel costs and identify optimal purchasing windows, providing data-driven insights for operational planning.
