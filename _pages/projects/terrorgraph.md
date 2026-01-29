---
layout: single
title: "TerrorGraph - Global Terrorism Database"
permalink: /projects/terrorgraph/
author_profile: true
---

## Overview

**TerrorGraph** is a graph database project that models and analyzes the **Global Terrorism Database (GTD)** using Neo4j. The project uncovers network relationships between terrorist organizations, attack patterns, and geographic clusters.

---

## Dataset

- **Source**: Global Terrorism Database (START Consortium)
- **Records**: 200,000+ terrorist incidents (1970-2020)
- **Attributes**: Attack type, target, weapons, perpetrators, location, casualties

---

## Graph Model

The Neo4j graph model includes:

- **Nodes**:
  - Organizations
  - Attacks
  - Locations (Countries, Cities)
  - Target Types
  - Weapon Types

- **Relationships**:
  - `PERPETRATED_BY` - Links attacks to organizations
  - `OCCURRED_IN` - Geographic connections
  - `USED_WEAPON` - Attack-weapon relationships
  - `TARGETED` - Attack-target relationships

---

## Analysis Queries

1. **Organization Networks**
   - Identify groups with similar attack patterns
   - Find geographic overlap between organizations

2. **Temporal Analysis**
   - Track organization activity over time
   - Detect seasonal patterns in attack frequency

3. **Target Analysis**
   - Most targeted sectors by region
   - Weapon preference by organization type

---

## Key Insights

- Revealed hidden connections between seemingly unrelated groups
- Identified geographic hotspots and temporal patterns
- Enabled network-based threat assessment

---

## Tools & Technologies

- `Neo4j` Graph Database
- `Cypher` Query Language
- `Python` with `py2neo`
- `NetworkX` for additional graph analysis
- `Plotly` for interactive visualizations
