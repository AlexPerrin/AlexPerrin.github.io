---
title: Machine Learning Plugin for Snort3 Intrusion Detection System
description: >-
  Snort 3 inspector plugin that integrates XGBoost machine learning models to
  detect network intrusions in real-time. The plugin complements traditional
  signature-based detection by classifying network flows using 80+ statistical
  features, achieving 99.6% accuracy on known attack patterns from the
  CIC-IDS2017 dataset.
image: >-
  @assets/projects/machine-learning-plugin-for-snort3-intrusion-detection-system/image.png
startDate: 2024-01-01
endDate: 2024-02-09
skills:
  - C++
  - Python
  - PyTorch
  - scikit-learn
  - Docker
sourceLink: https://github.com/AlexPerrin/snort3_ml
---
I’ve always been interested in how traditional security tools can be extended with modern techniques. Snort is one of the most widely used intrusion detection systems (IDS), but it relies heavily on static signatures. That works well for known threats, but what about new or evolving ones?

This project explores that question. I built a Snort 3 plugin that integrates a machine learning model into the inspection pipeline, allowing Snort to flag suspicious traffic patterns based on data-driven insights rather than just predefined rules.

## The Problem and Initial Planning

Signature-based IDS like Snort are powerful, but they struggle against novel or obfuscated attacks. The challenge was to see whether machine learning could complement Snort by:

Recognizing attack categories from real flow data
Flagging unusual traffic behavior (anomalies) that rules might miss
Doing so fast enough to keep up with real-time packet inspection
The dataset of choice was CIC-IDS2017, which provides labeled network traffic including benign flows and multiple types of attacks (DoS, PortScan, Brute Force, Botnet, etc.). I used CICFlowMeter to convert packet captures into structured flow features suitable for training models.

### [CICFlowMeter](https://www.unb.ca/cic/research/applications.html#CICFlowMeter)

A tool used to generate the CIC-IDS2017 dataset. Takes an input pcap or network interface and outputs csv containing 80 features related to network flow statistics.

Depends on a depricated jnetpcap java app, need to build in an environment with correct dependencies.

### [Dataset CIC-IDS2017](https://www.unb.ca/cic/datasets/ids-2017.html)

PCAPs as well as CSVs containing labeled data (CICFlowMeter output)

5 seperate days of network traffic, contains a mix of known exploits and benign. Orginal dataset is about ~10GB of pcap per day, use a reduced sample for training

| Label | Count |
|-------|-------|
| BENIGN | 22731 |
| DoS | 19035 |
| PortScan | 7946 |
| BruteForce | 2767 |
| WebAttack | 2180 |
| Bot | 1966 |
| Infiltration | 36 |

### Machine Learning Model

Forked from [Western-OC2-Lab/Intrusion-Detection-System-Using-Machine-Learning](https://github.com/Western-OC2-Lab/Intrusion-Detection-System-Using-Machine-Learning)

### Snort Plugin

Snort defines a plugins API
https://www.snort.org/downloads/snortplus/snort_devel.html

## Data Pipeline

1. **Feature Extraction**
   - PCAPs processed through **CICFlowMeter** → CSV files with ~80 flow features
   - Created a consistent dataset usable both offline and inline within Snort
1. **Model Training**
   - Trained an **XGBoost classifier** on labeled flow data
   - **99.6% accuracy** on signature-based classification tasks
   - Also trained for anomaly detection, with ~88% accuracy but lower precision/recall — showing it’s possible, but needs refinement
1. **Plugin Integration**
   - Wrote a **Snort 3 inspector plugin** that hooks into the pipeline
   - Incoming flows are classified by the trained model, and Snort alerts if traffic is deemed malicious

## Results

### Signiture Detection

| Metric | Value |
|--------|-------|
| Accuracy of XGBoost | 0.9955555555555555 |
| Precision of XGBoost | 0.9957643745143745 |
| Recall of XGBoost | 0.9955555555555555 |
| F1-score of XGBoost | 0.9954610536001841 |

| Class | precision | recall | f1-score | support |
|-------|-----------|--------|----------|---------|
| 0 | 0.95 | 0.88 | 0.91 | 24 |
| 1 | 1.00 | 1.00 | 1.00 | 394 |
| 2 | 1.00 | 0.75 | 0.86 | 4 |
| 3 | 0.92 | 1.00 | 0.96 | 24 |
| 4 | 0.88 | 1.00 | 0.93 | 7 |
| 5 | 1.00 | 1.00 | 1.00 | 11 |
| 6 | 1.00 | 1.00 | 1.00 | 436 |
| accuracy | | | 1.00 | 900 |
| macro avg | 0.96 | 0.95 | 0.95 | 900 |
| weighted avg | 1.00 | 1.00 | 1.00 | 900 |

![Signiture Confusion Matrix](https://github.com/AlexPerrin/snort3_ml/blob/main/figures/sig.png?raw=true)

### Anomoly Detection

| Class | precision | recall | f1-score | support |
|-------|-----------|--------|----------|---------|
| 0 | 0.00 | 0.00 | 0.00 | 8 |
| 1 | 0.88 | 1.00 | 0.93 | 56 |
| accuracy | | | 0.88 | 64 |
| macro avg | 0.44 | 0.50 | 0.47 | 64 |
| weighted avg | 0.77 | 0.88 | 0.82 | 64 |
