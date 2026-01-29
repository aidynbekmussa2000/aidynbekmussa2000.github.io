---
layout: project
title: "NYC Crime Clustering Analysis"
permalink: /projects/nyc-crime/
summary: "Exploring spatiotemporal crime trends in New York City using unsupervised machine learning to uncover patterns before and after COVID-19."
tech:
  - Python
  - R
  - Scikit-learn
  - GeoPandas
---

## Overview

This project analyzes spatiotemporal crime trends in New York City from 2006 to 2023. Using K-means and hierarchical clustering on NYPD complaint data, I uncovered how crime patterns evolved before and after the COVID-19 pandemic.

## Dataset

- **Source:** NYPD Complaint Historic Data
- **Size:** 8+ million observations
- **Features:** Date, borough, offense category, coordinates, complaint type

## Methodology

**Data Cleaning** — Filtered felonies and misdemeanors, parsed timestamps, removed invalid coordinates.

**Feature Engineering** — Extracted temporal features (hour, weekday, year) and categorized crimes into violent vs. property.

**Clustering** — Applied K-means with elbow method for optimal k, performed hierarchical clustering using Ward's method.

## Key Findings

- Crime density shifted in Manhattan and Brooklyn post-2020
- Identified increase in nighttime assaults and weekend crime spikes
- Property crime clusters redistributed during lockdown periods

## Outcome

The analysis revealed actionable patterns for urban policy and law enforcement resource allocation, demonstrating how machine learning can support public safety decisions.
