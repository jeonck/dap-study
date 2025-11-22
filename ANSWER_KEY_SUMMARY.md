# DAP Practice Questions - Correct Answers Summary

## Overview
Successfully added the `correctAnswer` field to all **135 practice questions** in the DAP (Data Architecture Professional) certification study site.

## File Modified
- **File Path**: `/Users/mac/ws/gemini/dap-study-site/src/data/practiceQuestions.ts`
- **Total Questions**: 135
- **Questions Updated**: 135 (100%)

## Question Categories

The questions cover 6 major DAP certification topics:

### 1. 전사아키텍처 이해 (Enterprise Architecture Understanding)
- **Questions**: 1-20 (20 questions)
- **Topics**: EA concepts, framework, processes, reference models, architecture matrix

### 2. 데이터아키텍처 (Data Architecture)
- **Questions**: 21-40 (20 questions)
- **Topics**: Data management policies, metadata management, data governance, data lifecycle

### 3. 데이터 요건 분석 (Data Requirements Analysis)
- **Questions**: 41-60 (20 questions)
- **Topics**: Requirements gathering, functional/non-functional requirements, conceptual modeling

### 4. 데이터 표준화 (Data Standardization)
- **Questions**: 61-80 (20 questions)
- **Topics**: Standard terms, domains, naming conventions, data dictionary

### 5. 데이터 모델링 (Data Modeling)
- **Questions**: 81-110 (30 questions)
- **Topics**: Conceptual/logical/physical modeling, normalization, entities, relationships

### 6. 데이터베이스 설계 (Database Design) & 품질관리 (Quality Management)
- **Questions**: 111-135 (25 questions)
- **Topics**: Indexing, partitioning, transactions, data quality metrics, profiling

## Answer Determination Methodology

Each correct answer was determined based on:

1. **DAP Certification Standards**: Official DAP knowledge areas and best practices
2. **Enterprise Architecture Principles**: TOGAF, Zachman Framework concepts
3. **Data Architecture Best Practices**: DAMA-DMBOK guidelines
4. **Database Design Principles**: Normalization theory, relational database concepts
5. **Data Quality Standards**: ISO 8000, data quality dimensions

### Important Note
Most questions ask for the **INCORRECT** statement using phrases like:
- "가장 맞지 않은 것" (most incorrect)
- "틀린 것" (wrong one)
- "거리가 먼 것" (furthest from correct)
- "적합하지 않은 것" (not appropriate)

Therefore, the `correctAnswer` index points to the **WRONG** answer option.

## Sample Answers Explained

### Question 1 (correctAnswer: 3)
**Question**: "전사아키텍처의 개념에 대한 설명 중 가장 맞지 않은 것은?"

**Answer 3**: "EA 도입의 핵심은 통합성과 상호운영성의 제고이다. 따라서 **모든 기업은** EA 도입의 핵심 목적으로 통합성과 상호운영성을 설정한다."

**Why Wrong**: The statement is too absolute. Not all enterprises must set integration and interoperability as their core EA objectives - each organization determines EA goals based on their specific business needs.

### Question 5 (correctAnswer: 1)
**Question**: "데이터아키텍처 수립 업무에 대한 설명으로 가장 적절하지 않은 것은?"

**Answer 1**: "개념 데이터 모델은 전사 수준의 데이터 모델로 **중요 일반 속성까지를 도출하여** 표현한 데이터 모델이다。"

**Why Wrong**: Conceptual data models define only entities and relationships, not attributes. Attributes are defined in the logical data model phase.

### Question 13 (correctAnswer: 2)
**Question**: "현행 아키텍처 정보의 구축에 대한 설명 중 가장 적절치 않은 것은?"

**Answer 2**: "현행 아키텍처는 **아키텍처 매트릭스와 무관하게** EA 정보를 구축해도 된다。"

**Why Wrong**: Current architecture must follow the architecture matrix framework for consistency and standardization.

## Verification

✅ All 135 questions have been updated
✅ TypeScript syntax validation passed
✅ correctAnswer field added after options array in each question
✅ userAnswer and isMarked fields preserved

## Format Example

```typescript
{
  "id": 1,
  "category": "전사아키텍처 이해",
  "question": "...",
  "options": [
    "Option 0",
    "Option 1",
    "Option 2",
    "Option 3"
  ],
  "correctAnswer": 3,  // ← ADDED
  "userAnswer": null,
  "isMarked": false
}
```

## Usage

The application can now:
1. Display correct answers after quiz completion
2. Calculate scores automatically
3. Provide immediate feedback on user selections
4. Track performance across different topic areas
5. Generate analytics on commonly missed questions

---
**Generated**: 2025-11-22
**Script**: add_all_answers.py
**Status**: ✅ Complete
