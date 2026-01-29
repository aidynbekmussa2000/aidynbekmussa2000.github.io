---
layout: project
title: "NYC Crime Clustering Analysis"
permalink: /projects/nyc-crime/
summary: "Exploring spatiotemporal crime trends in New York City from 2006 to 2023 using unsupervised machine learning to uncover how crime patterns evolved before and after the COVID-19 pandemic."
tech:
  - Python
  - R
  - Scikit-learn
  - GeoPandas
---

## Overview

This project explores spatiotemporal crime trends in New York City from 2006 to 2023 using **unsupervised machine learning**. The aim is to uncover how crime patterns evolved before and after the COVID-19 pandemic.

We applied **K-means and hierarchical clustering** to complaint-level NYPD data and visualized borough-specific changes using R.

## Dataset

- **Source**: NYPD Complaint Historic Data
- **Scope**: Over 8 million observations
- **Features used**:
  - Date of crime
  - Borough
  - Offense category
  - Latitude/Longitude
  - Complaint type

## Methodology

### Data Cleaning
- Filtered felonies/misdemeanors
- Parsed timestamps
- Removed NA coordinates

### Feature Engineering
- Extracted hour, weekday, year
- Categorized crimes (violent vs. property)

### Clustering
- Applied K-means (elbow method for k)
- Performed hierarchical clustering with Ward's method
- Standardized features for comparison

## Key Findings

- Crime in **Manhattan** and **Brooklyn** showed a shift in density post-2020
- Clusters highlighted **increase in nighttime assaults** and **weekend crime spikes**
- Pandemic led to redistribution of property crime clusters, likely due to lockdown and reduced mobility

## Outcome

This clustering-based analysis revealed actionable patterns for urban policy and law enforcement allocation. It demonstrates how machine learning can aid public safety decisions.
